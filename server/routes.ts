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
    const filePath = path.resolve(__dirname, "../client/public/dfd-diagram.html");
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      const prodPath = path.resolve(__dirname, "public/dfd-diagram.html");
      if (fs.existsSync(prodPath)) {
        res.sendFile(prodPath);
      } else {
        res.status(404).send("File not found");
      }
    }
  });

  return httpServer;
}
