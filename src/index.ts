import { config } from "./config.js";
import { createApp } from "./server/app.js";

const { app, devServers } = createApp();

const server = app.listen(config.port, () => {
  console.log(`OpenLovable engine · http://localhost:${config.port}`);
  console.log(`  modèle : ${config.model}${config.mockLLM ? " (MOCK)" : ""}`);
  console.log(`  projets : ${config.workspaceDir}`);
});

const shutdown = () => {
  devServers.stopAll();
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 3000).unref();
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
