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
  { id: "exams-qs", name: "تسليم الأسئلة", url: "https://exams-qs.riyadhplatform.tech" },
  { id: "exam-followup", name: "متابعة الاختبارات", url: "https://exam-followup.riyadhplatform.tech" },
  { id: "exam-analysis", name: "تحليل النتائج", url: "https://exam-analysis.riyadhplatform.tech" },
  { id: "school-timetables", name: "الجداول المدرسية", url: "https://school-timetables.riyadhplatform.tech" },
  { id: "portfolio", name: "ملفات الإنجاز", url: "https://portfolio.riyadhplatform.tech" },
  { id: "records", name: "سجلات المتابعة", url: "https://records.riyadhplatform.tech" },
  { id: "supervision", name: "الأعمال التحريرية", url: "https://supervision.riyadhplatform.tech" },
  { id: "supervision-visit", name: "الزيارات الفنية", url: "https://supervision-visit.riyadhplatform.tech" },
  { id: "activities", name: "النشاط الطلابي", url: "https://activities.riyadhplatform.tech" },
  { id: "counselor", name: "التوجيه الطلابي", url: "https://counselor.riyadhplatform.tech" },
  { id: "health", name: "الإشراف الصحي", url: "https://health.riyadhplatform.tech" },
  { id: "bus", name: "مخالفات الحافلات", url: "https://bus.riyadhplatform.tech" }
];

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
      const data = await response.json();
      return {
        systemId: system.id,
        systemName: system.name,
        totalTasks: data.totalTasks || 0,
        completedTasks: data.completedTasks || 0,
        pendingTasks: data.pendingTasks || 0,
        completionRate: data.completionRate || 0,
        lastUpdated: data.lastUpdated || new Date().toISOString(),
        status: 'online' as const
      };
    }
    throw new Error('Failed to fetch');
  } catch (error) {
    return {
      systemId: system.id,
      systemName: system.name,
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      completionRate: 0,
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
      const totalTasks = systemsStats.reduce((sum, s) => sum + s.totalTasks, 0);
      const completedTasks = systemsStats.reduce((sum, s) => sum + s.completedTasks, 0);
      
      res.json({
        systems: systemsStats,
        overallStats: {
          totalSystems: EXTERNAL_SYSTEMS.length,
          onlineSystems: onlineSystems.length,
          totalTasks,
          completedTasks,
          overallCompletionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
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
