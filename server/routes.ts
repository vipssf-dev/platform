import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Serve DFD diagram HTML file
  app.get("/dfd-diagram.html", (_req, res) => {
    const devPath = path.resolve(process.cwd(), "client/public/dfd-diagram.html");
    const prodPath = path.resolve(__dirname, "public/dfd-diagram.html");
    
    if (fs.existsSync(devPath)) {
      res.sendFile(devPath);
    } else if (fs.existsSync(prodPath)) {
      res.sendFile(prodPath);
    } else {
      res.status(404).send("File not found");
    }
  });

  return httpServer;
}
