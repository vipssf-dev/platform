import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

const EXTERNAL_SYSTEMS = [
  { id: "financial", name: "النظام المالي", url: "https://financial.riyadhplatform.tech", statsEndpoint: "/api/stats" },
  { id: "tasks", name: "متابعة المهام", url: "https://tasks.riyadhplatform.tech", statsEndpoint: "/api/stats" },
  { id: "learning", name: "مصادر التعلم", url: "https://learning.riyadhplatform.tech", statsEndpoint: "/api/stats" },
  { id: "maintenance", name: "المبنى المدرسي", url: "https://maintenance.riyadhplatform.tech", statsEndpoint: "/api/stats" },
  { id: "activities", name: "النشاط الطلابي", url: "https://activities.riyadhplatform.tech", statsEndpoint: "/api/stats" },
  { id: "counselor", name: "التوجيه الطلابي", url: "https://counselor.riyadhplatform.tech", statsEndpoint: "/api/stats" },
  { id: "health", name: "الإشراف الصحي", url: "https://health.riyadhplatform.tech", statsEndpoint: "/api/stats" },
  { id: "bus", name: "مخالفات الحافلات", url: "https://bus.riyadhplatform.tech", statsEndpoint: "/api/stats" },
  { id: "special-edu", name: "صعوبات التعلم", url: "https://special-edu.riyadhplatform.tech", statsEndpoint: "/api/documents" }
];

interface SystemMetric {
  label: string;
  value: string | number;
  color?: string;
}

const SECTION_LABELS: Record<string, string> = {
  monthly_reports: "التقارير الشهرية",
  timetable_sem1: "جدول الفصل الأول",
  timetable_sem2: "جدول الفصل الثاني",
  aoun_support_cards: "بطاقات عَوْن",
  aoun_student_list: "قوائم الطلاب",
  aoun_operational: "الخطة التشغيلية",
  lesson_plans: "خطط الدروس"
};

const EXCLUDED_SECTIONS = new Set(["aoun_student_list", "aoun_operational"]);

function buildSpecialEduMetrics(documents: any[]): SystemMetric[] {
  const sections: Record<string, number> = {};
  documents.forEach((doc: any) => {
    if (!EXCLUDED_SECTIONS.has(doc.section)) {
      sections[doc.section] = (sections[doc.section] || 0) + 1;
    }
  });

  const metrics: SystemMetric[] = [];

  for (const [key, count] of Object.entries(sections)) {
    metrics.push({
      label: SECTION_LABELS[key] || key,
      value: count,
      color: "#7c3aed"
    });
  }

  return metrics;
}

async function fetchSystemStats(system: typeof EXTERNAL_SYSTEMS[0]) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${system.url}${system.statsEndpoint}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeout);
    
    if (response.ok) {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();

        if (system.id === 'special-edu' && Array.isArray(data)) {
          return {
            systemId: system.id,
            systemName: system.name,
            metrics: buildSpecialEduMetrics(data),
            lastUpdated: new Date().toISOString(),
            status: 'online' as const
          };
        }

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

  app.get("/org-chart.html", (_req, res) => {
    const cwd = process.cwd();
    const devPath = path.join(cwd, "client/public/org-chart.html");
    const prodPath = path.join(cwd, "dist/public/org-chart.html");

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
