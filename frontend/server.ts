import "zone.js/node";

import { ngExpressEngine } from "@nguniversal/express-engine";
import * as express from "express";
import { join } from "path";

import { AppServerModule } from "./src/main.server";
import { APP_BASE_HREF } from "@angular/common";
import { existsSync } from "fs";

// L'application Express est exportée afin qu'elle puisse être utilisée par des fonctions serverless.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), "dist/frontend/browser");
  const indexHtml = existsSync(join(distFolder, "index.original.html")) ? "index.original.html" : "index";

  // Notre moteur d'express Universal (trouvé à https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    "html",
    ngExpressEngine({
      bootstrap: AppServerModule
    })
  );

  server.set("view engine", "html");
  server.set("views", distFolder);

  // Exemple de points d'API REST Express
  // server.get('/api/**', (req, res) => { });
  // Servir les fichiers statiques depuis /browser
  server.get(
    "*.*",
    express.static(distFolder, {
      maxAge: "1y"
    })
  );

  // Toutes les routes régulières utilisent le moteur Universal
  server.get("*", (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Démarrer le serveur Node
  const server = app();
  server.listen(port, () => {
    console.log(`Serveur Node Express en écoute sur http://localhost:${port}`);
  });
}

// Webpack remplacera 'require' par '__webpack_require__'
// '__non_webpack_require__' est un proxy vers 'require' de Node
// Le code ci-dessous garantit que le serveur est lancé uniquement en dehors de l'exécution du bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || "";
if (moduleFilename === __filename || moduleFilename.includes("iisnode")) {
  run();
}

export * from "./src/main.server";
