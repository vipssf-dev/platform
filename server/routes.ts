import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

const EXTERNAL_SYSTEMS = [
  { id: "financial", name: "النظام المالي", url: "https://financial.riyadhplatform.tech" },
  { id: "tasks", name: "متابعة المهام", url: "https://tasks.riyadhplatform.tech" },
  { id: "learning", name: "مصادر التعلم", url: "https://learning.riyadhplatform.tech" },
  { id: "maintenance", name: "المبنى المدرسي", url: "https://maintenance.riyadhplatform.tech" },
  { id: "activities", name: "النشاط الطلابي", url: "https://activities.riyadhplatform.tech" },
  { id: "counselor", name: "التوجيه الطلابي", url: "https://counselor.riyadhplatform.tech" },
  { id: "health", name: "الإشراف الصحي", url: "https://health.riyadhplatform.tech" },
  { id: "bus", name: "مخالفات الحافلات", url: "https://bus.riyadhplatform.tech" },
  { id: "special-edu", name: "صعوبات التعلم", url: "https://special-edu.riyadhplatform.tech" }
];

interface SystemMetric {
  label: string;
  value: string | number;
  color?: string;
}

async function fetchSystemStats(system: typeof EXTERNAL_SYSTEMS[0]) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${system.url}/api/stats`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeout);
    
    if (response.ok) {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        return {
          systemId: system.id,
          systemName: system.name,
          metrics: data.metrics || [],
          lastUpdated: data.lastUpdated || new Date().toISOString(),
          status: 'online' as const
        };
      }
      return {
        systemId: system.id,
        systemName: system.name,
        metrics: [],
        lastUpdated: new Date().toISOString(),
        status: 'online' as const
      };
    }
    throw new Error('Failed to fetch');
  } catch (error) {
    return {
      systemId: system.id,
      systemName: system.name,
      metrics: [],
      lastUpdated: new Date().toISOString(),
      status: 'offline' as const
    };
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // KPI Stats API - fetches from all external systems
  app.get("/api/kpi/stats", async (_req, res) => {
    try {
      const systemsStats = await Promise.all(
        EXTERNAL_SYSTEMS.map(system => fetchSystemStats(system))
      );
      
      const onlineSystems = systemsStats.filter(s => s.status === 'online');
      
      res.json({
        systems: systemsStats,
        overallStats: {
          totalSystems: EXTERNAL_SYSTEMS.length,
          onlineSystems: onlineSystems.length
        },
        lastFetch: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch KPI stats' });
    }
  });

  // Serve DFD diagram HTML files
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

  app.get("/dfd-diagram-ar.html", (_req, res) => {
    const cwd = process.cwd();
    const devPath = path.join(cwd, "client/public/dfd-diagram-ar.html");
    const prodPath = path.join(cwd, "dist/public/dfd-diagram-ar.html");
    
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
