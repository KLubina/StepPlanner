/**
 * Mock step templates for demo mode.
 * These represent typical activity profiles a user might create.
 */

export const mockTemplates = [
  {
    id: "tmpl_ruhe",
    name: "Ruhetag",
    targetSteps: 2000,
    color: "#a55eea",
    notes: "Bewusste Erholung – Couch-Tag oder Krankheit.",
    weightChangePerDay: 0.15,
  },
  {
    id: "tmpl_leicht",
    name: "Leichter Tag",
    targetSteps: 5000,
    color: "#4ecdc4",
    notes: "Büro-Alltag, wenig Bewegung geplant.",
    weightChangePerDay: 0.05,
  },
  {
    id: "tmpl_normal",
    name: "Normaler Tag",
    targetSteps: 8000,
    color: "#667eea",
    notes: "Durchschnittlicher Alltag mit Spaziergang.",
    weightChangePerDay: -0.02,
  },
  {
    id: "tmpl_aktiv",
    name: "Aktiver Tag",
    targetSteps: 10000,
    color: "#f7b731",
    notes: "Sport oder ausgedehnte Spaziergänge eingeplant.",
    weightChangePerDay: -0.05,
  },
  {
    id: "tmpl_intensiv",
    name: "Intensiver Tag",
    targetSteps: 15000,
    color: "#fc5c65",
    notes: "Wanderung, langer Lauf oder sehr aktiver Tag.",
    weightChangePerDay: -0.12,
  },
];
