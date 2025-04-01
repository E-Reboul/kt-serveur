import express from "express";
import dotenv from "dotenv";

import { testDirectConnection } from "./src/configs/database";
import router from "./src/routes";

const PORT = process.env.PORT || 6525;

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(express.json()); 

app.use(router);

async function startServer() {
  try {
    // Si le test échoue, une erreur sera levée et le serveur ne démarrera pas
      await testDirectConnection();
      // Sinon, le serveur démarrera sur le port spécifié
      app.listen(PORT, (e?: Error) => {
          if (e) {
              console.error(`Failed to start server:`, e.message);
              process.exit(1);
          } else {
              console.log(`Server is running on port ${PORT}`);
          }
      });
  } catch (e) {
      console.error(`${(e as Error).message}`);
      process.exit(1);
  };
};

startServer();

export default app;