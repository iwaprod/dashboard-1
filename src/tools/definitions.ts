/** Schémas JSON des outils exposés à l'agent. */

export interface ToolDefinition {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

export const toolDefinitions: ToolDefinition[] = [
  {
    name: "write_file",
    description:
      "Create a new file or fully overwrite an existing one with the given content. Use for new files, or when most of an existing file changes. Parent directories are created automatically.",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Project-relative path, e.g. src/components/Hero.tsx" },
        content: { type: "string", description: "Full file content." },
      },
      required: ["path", "content"],
      additionalProperties: false,
    },
  },
  {
    name: "line_replace",
    description:
      "Replace one exact block of text in an existing file. `search` must match the current file content exactly (including indentation) and be unique. For long blocks you may keep only the first and last lines and put a line containing exactly '...' in between; the middle is matched lazily. Preferred over write_file for small edits.",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Project-relative path of an existing file." },
        search: { type: "string", description: "Exact text to find (supports one '...' ellipsis line)." },
        replace: { type: "string", description: "Replacement text." },
      },
      required: ["path", "search", "replace"],
      additionalProperties: false,
    },
  },
  {
    name: "rename_file",
    description: "Rename or move a file within the project. Remember to update imports referencing it.",
    input_schema: {
      type: "object",
      properties: {
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["from", "to"],
      additionalProperties: false,
    },
  },
  {
    name: "delete_file",
    description: "Delete a file from the project. Remember to remove imports referencing it.",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string" },
      },
      required: ["path"],
      additionalProperties: false,
    },
  },
  {
    name: "read_file",
    description: "Read the current content of a project file.",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string" },
      },
      required: ["path"],
      additionalProperties: false,
    },
  },
  {
    name: "search_files",
    description: "Search the project files with a regular expression. Returns matching lines with file paths and line numbers.",
    input_schema: {
      type: "object",
      properties: {
        pattern: { type: "string", description: "JavaScript regular expression." },
        glob: { type: "string", description: "Optional substring filter on file paths, e.g. 'src/components'." },
      },
      required: ["pattern"],
      additionalProperties: false,
    },
  },
  {
    name: "add_dependency",
    description: "Add an npm dependency to the project (updates package.json and installs it). Use exact package names, optionally with a version like 'react-router-dom@6'.",
    input_schema: {
      type: "object",
      properties: {
        package: { type: "string" },
      },
      required: ["package"],
      additionalProperties: false,
    },
  },
  {
    name: "remove_dependency",
    description: "Remove an npm dependency from the project.",
    input_schema: {
      type: "object",
      properties: {
        package: { type: "string" },
      },
      required: ["package"],
      additionalProperties: false,
    },
  },
  {
    name: "read_console_logs",
    description: "Read recent output of the project's dev server (Vite) to debug build or runtime errors. Returns the last lines of logs.",
    input_schema: {
      type: "object",
      properties: {
        lines: { type: "number", description: "How many trailing lines to return (default 80)." },
      },
      additionalProperties: false,
    },
  },
];
