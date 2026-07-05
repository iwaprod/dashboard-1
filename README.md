# OpenLovable Engine

Reconstruction complète du **système** de création de sites par IA de [lovable.dev](https://lovable.dev) — le moteur, sans l'interface (elle viendra dans un second temps).

Un utilisateur décrit un site en langage naturel ; un agent IA (Claude) génère et modifie un vrai projet **Vite + React + TypeScript + Tailwind**, avec prévisualisation live, historique de versions restaurable et auto-correction des erreurs de build.

## Architecture

```
                 POST /api/projects/:id/chat  (SSE)
  Client ─────────────────────────────────────────────► Serveur Express
                                                             │
                                                     ┌───────▼────────┐
                                                     │ Orchestrateur  │  boucle agentique
                                                     │ (agent/)       │  LLM ⇄ outils
                                                     └───┬───────┬────┘
                        ┌────────────────────────────────┘       │
                ┌───────▼────────┐                        ┌──────▼───────┐
                │ Client LLM     │  Claude API            │ Outils       │  write_file, line_replace,
                │ (llm/)         │  streaming + cache     │ (tools/)     │  add_dependency, logs…
                └────────────────┘                        └──────┬───────┘
                                                                 │
                                                     ┌───────────▼──────────────┐
                                                     │ Projet (workspace/<id>)  │
                                                     │ · template Vite/React/TW │
                                                     │ · git = snapshots        │
                                                     │ · .openlovable/ = chat   │
                                                     │ · vite dev = preview     │
                                                     └──────────────────────────┘
```

### Composants

| Répertoire | Rôle |
|---|---|
| `src/agent/orchestrator.ts` | Boucle agentique : message utilisateur → appels LLM/outils en boucle → vérification de build (`tsc`) → auto-correction (jusqu'à `OPENLOVABLE_MAX_FIX_ATTEMPTS`) → snapshot git → persistance. |
| `src/llm/client.ts` | Client Claude (streaming SSE, thinking adaptatif, prompt caching sur le prompt statique) + client **mock** pour tester sans clé API. |
| `src/prompts/system.ts` | Le « cerveau » : prompt système type Lovable (stack imposée, règles d'architecture/design, règles d'usage des outils) + injection de l'état courant du projet à chaque tour. |
| `src/tools/` | Outils exposés à l'agent : `write_file`, `line_replace` (édition chirurgicale avec ellipse `...`), `rename_file`, `delete_file`, `read_file`, `search_files`, `add_dependency`, `remove_dependency`, `read_console_logs`. Chemins confinés au projet. |
| `src/projects/` | Cycle de vie des projets (création depuis `template/`, slug + id), contexte injecté au modèle (arborescence + contenus avec budget de tokens), persistance du chat, snapshots git (1 commit par tour, restauration à tout moment). |
| `src/preview/` | Un serveur `vite dev` par projet (port dédié, logs capturés pour l'agent) + vérification de build `tsc --noEmit`. |
| `src/server/app.ts` | API HTTP (Express) avec streaming SSE des événements de l'agent. |
| `template/` | Squelette des projets générés : Vite + React 18 + TypeScript + Tailwind + React Router. |

## API

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/api/projects` | Créer un projet `{name}` (copie du template, `npm install`, git init) |
| `GET` | `/api/projects` · `/api/projects/:id` | Lister / lire |
| `DELETE` | `/api/projects/:id` | Supprimer |
| `POST` | `/api/projects/:id/chat` | **Parler à l'agent** `{message}` — réponse en SSE : `assistant_text_delta`, `tool_call`, `tool_result`, `build_check`, `fix_attempt`, `snapshot`, `turn_end`… |
| `GET` | `/api/projects/:id/messages` | Historique du chat |
| `GET` | `/api/projects/:id/files` · `/files/*` | Arborescence / contenu d'un fichier |
| `GET` | `/api/projects/:id/snapshots` | Historique des versions |
| `POST` | `/api/projects/:id/snapshots/:commit/restore` | Restaurer une version |
| `POST` | `/api/projects/:id/preview/start` · `/stop` | Démarrer/arrêter la preview Vite (`{url}`) |
| `GET` | `/api/projects/:id/preview/logs` | Logs du serveur de dev |
| `POST` | `/api/projects/:id/build-check` | Vérification `tsc` manuelle |

## Démarrage

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # ou `ant auth login`
npm run dev                            # API sur http://localhost:3080
```

Exemple de session :

```bash
# 1. Créer un projet
curl -s -X POST localhost:3080/api/projects -H 'content-type: application/json' \
  -d '{"name": "Portfolio photographe"}'
# → {"id":"portfolio-photographe-a1b2c3", ...}

# 2. Demander un site (flux SSE)
curl -N -X POST localhost:3080/api/projects/portfolio-photographe-a1b2c3/chat \
  -H 'content-type: application/json' \
  -d '{"message": "Crée un portfolio élégant pour une photographe de mariage, avec galerie et page contact"}'

# 3. Prévisualiser
curl -s -X POST localhost:3080/api/projects/portfolio-photographe-a1b2c3/preview/start
# → {"port":4300,"url":"http://localhost:4300"}
```

## Configuration

| Variable | Défaut | Rôle |
|---|---|---|
| `ANTHROPIC_API_KEY` | — | Clé API Claude |
| `OPENLOVABLE_MODEL` | `claude-opus-4-8` | Modèle de l'agent |
| `OPENLOVABLE_MOCK` | `0` | `1` = client LLM simulé (tests sans clé) |
| `OPENLOVABLE_WORKSPACE` | `./workspace` | Répertoire des projets |
| `OPENLOVABLE_MAX_ITERATIONS` | `40` | Itérations max de la boucle agentique par tour |
| `OPENLOVABLE_MAX_FIX_ATTEMPTS` | `2` | Tentatives d'auto-correction après erreurs de build |
| `PORT` | `3080` | Port de l'API |

## Tests

```bash
npm run typecheck   # tsc --noEmit
npm run smoke       # test de bout en bout en mode mock (création, tour d'agent,
                    # persistance, snapshots + restauration, outils, sécurité chemins)
```

## Choix de conception (fidèles à Lovable)

- **Édition chirurgicale** : `line_replace` (équivalent de `lov-line-replace`) impose une correspondance exacte et unique, avec ellipse `...` pour les longs blocs — moins de tokens et moins de risques que la réécriture complète.
- **Contexte projet à chaque tour** : l'agent reçoit l'arborescence et le contenu des fichiers (budgété) en bloc système volatile, tandis que le prompt statique est mis en cache (`cache_control`) pour réduire coûts et latence.
- **Boucle d'auto-correction** : après chaque tour avec éditions, `tsc --noEmit` tourne ; les erreurs repartent vers l'agent (2 tentatives par défaut), comme le « try to fix » de Lovable.
- **Versions restaurables** : chaque tour = un commit git dans le projet ; l'API expose l'historique et la restauration, comme l'historique d'édits de Lovable.
- **Un tour à la fois par projet** (verrou), résultats d'outils parallèles regroupés dans un seul message, historique rejouable au format API brut (blocs `tool_use`/`tool_result`/`thinking` conservés).

## Interface web

Une interface type Lovable est servie par le même serveur sur `http://localhost:3080/` (`public/`, SPA sans build) :

- **Dashboard** : barre latérale complète (Dashboard, Search `Ctrl K`, Resources, Connectors, All projects, Starred, Created by me, Shared with me, Recents, cartes Share/Upgrade), hero dégradé « What's the vision ? », barre de prompt avec menu **Build ▾** (projet vierge ou modèle), onglets *My projects / Recently viewed / Lovable templates*, recherche.
- **Galerie de modèles** : **34 templates fonctionnels** (`catalog/`) — chacun est une vraie app React prête à ouvrir : Inspo Canvas, Lovable Slides, Maison, Brand Kit, Jordan Studio, Expense, EventFlow, Atlas CRM, Launchlist, The Journal, Pulse, Welcome Back, Atelier, Bistro Lumière, FORM, Haven Realty, Wanderlog, CourseCraft, Wavelength, Curriculum, Linkhub, Docs, Changelog, Statuswatch, Kanban Flow, Margins, Companion, Habit Loop, Recipe Box, Workfolio, Commons, Coming Soon, NOVAE, Léa & Marius.
- **Espace projet** : chat streamé (puces d'outils, statut build, versions), aperçu Vite live, explorateur de code, historique git restaurable, épinglage ★.

### API modèles

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/templates` | Catalogue des 34 modèles |
| `POST` | `/api/projects` `{name, templateId?}` | Créer un projet, éventuellement depuis un modèle |
| `PATCH` | `/api/projects/:id` `{starred?, opened?}` | Épingler / marquer comme ouvert |
