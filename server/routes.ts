import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Serve DFD diagram HTML file
  app.get("/dfd-diagram.html", (_req, res) => {
    const cwd = process.cwd();
    const devPath = path.join(cwd, "client/public/dfd-diagram.html");
    const prodPath = path.join(cwd, "dist/public/dfd-diagram.html");
    
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
