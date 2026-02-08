import * as StepsManager from "./services/data/StepsManager.js";
import * as StepPlanningManager from "./services/data/StepPlanningManager.js";
import TemplateEditor from "./ui/TemplateEditor.js";
import { loginWithGoogle, logout, onAuthChanged } from "./auth.js";
import csvExporter from "./services/csvExport.js";

import StepsRenderer from "./ui/StepsRenderer.js";
import PlanningRenderer from "./ui/PlanningRenderer.js";

class App {
  constructor() {
    this.currentTab = "steps";
    this.isDataInitialized = false;

    this.stepsManager = StepsManager;
    this.stepPlanningManager = StepPlanningManager;

    this.templateEditor = new TemplateEditor(this.stepPlanningManager);

    this.stepsRenderer = new StepsRenderer(this.stepsManager);
    this.planningRenderer = new PlanningRenderer(this.stepPlanningManager);

    this.initialize();
  }

  async initialize() {
    document.addEventListener("DOMContentLoaded", () => {
      this.setupAuthUI();
      this.listenForAuthChanges();
    });
  }

  setupAuthUI() {
    const loginBtn = document.getElementById("googleLoginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    loginBtn?.addEventListener("click", async () => {
      try {
        await loginWithGoogle();
      } catch (error) {
        alert("Login fehlgeschlagen: " + error.message);
      }
    });

    const demoBtn = document.getElementById("demoLoginBtn");
    demoBtn?.addEventListener("click", async () => {
      const demoUser = {
        uid: "demo-user",
        email: "demo@example.com",
        displayName: "Demo User",
      };

      this.stepsManager.setUser(demoUser);
      this.stepPlanningManager.setUser(demoUser);

      const loginScreen = document.getElementById("loginScreen");
      const appContainer = document.getElementById("appContainer");
      const userEmail = document.getElementById("userEmail");

      if (loginScreen) loginScreen.style.display = "none";
      if (appContainer) appContainer.style.display = "block";
      if (userEmail) userEmail.textContent = demoUser.displayName;

      await this.loadUserData();
    });

    logoutBtn?.addEventListener("click", async () => {
      if (confirm("Möchtest du dich wirklich ausloggen?")) {
        await logout();
      }
    });
  }

  listenForAuthChanges() {
    const loginScreen = document.getElementById("loginScreen");
    const appContainer = document.getElementById("appContainer");
    const userEmail = document.getElementById("userEmail");

    onAuthChanged(async (user) => {
      if (user) {
        this.stepsManager.setUser(user);
        this.stepPlanningManager.setUser(user);

        if (loginScreen) loginScreen.style.display = "none";
        if (appContainer) appContainer.style.display = "block";
        if (userEmail)
          userEmail.textContent =
            user.email || user.displayName || "Angemeldet";

        await this.loadUserData();
      } else {
        this.stepsManager.reset();
        this.stepPlanningManager.reset();
        this.isDataInitialized = false;

        if (appContainer) appContainer.style.display = "none";
        if (loginScreen) loginScreen.style.display = "flex";
        if (userEmail) userEmail.textContent = "";
      }
    });
  }

  async loadUserData() {
    try {
      await Promise.all([
        this.stepsManager.loadSteps(),
        this.stepPlanningManager.init(),
      ]);

      this.isDataInitialized = true;

      this.switchTab(this.currentTab || "steps");
    } catch (error) {
      console.error("Failed to load user data:", error);
      alert("Daten konnten nicht geladen werden. Bitte versuche es erneut.");
    }
  }

  switchTab(tab) {
    this.currentTab = tab;

    document.querySelectorAll(".nav-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === tab);
    });

    const stepsContainer = document.getElementById("stepsContainer");
    const stepPlanningContainer = document.getElementById(
      "stepPlanningContainer",
    );

    if (stepsContainer) stepsContainer.style.display = "none";
    if (stepPlanningContainer) stepPlanningContainer.style.display = "none";

    if (tab === "steps") {
      if (stepsContainer) stepsContainer.style.display = "block";
      this.stepsRenderer.render();
    } else if (tab === "stepPlanning") {
      if (stepPlanningContainer) stepPlanningContainer.style.display = "block";
      this.planningRenderer.render();
    }
  }

  getCurrentTab() {
    return this.currentTab;
  }

  exportAllData() {
    const allData = [];

    const stepsData = this.stepsManager.getData();
    if (stepsData) {
      stepsData.forEach((step) => {
        allData.push({
          type: "step",
          id: step.id || "",
          date: step.date,
          steps: step.steps || 0,
          goal: step.goal || 0,
        });
      });
    }

    const templates = this.stepPlanningManager.getTemplates();
    if (templates) {
      templates.forEach((template) => {
        allData.push({
          type: "template",
          id: template.id || "",
          name: template.name || "",
          targetSteps: template.targetSteps || 0,
          notes: template.notes || "",
          color: template.color || "",
          weightChangePerDay: template.weightChangePerDay || 0,
        });
      });
    }

    const plannedDays = this.stepPlanningManager.getPlannedDays();
    if (plannedDays) {
      Object.entries(plannedDays).forEach(([date, goal]) => {
        allData.push({
          type: "goal",
          date: date,
          steps: goal.steps || 0,
          templateId: goal.templateId || "",
          templateName: goal.templateName || "",
        });
      });
    }

    if (allData.length === 0) {
      alert("Keine Daten zum Exportieren vorhanden");
      return;
    }

    csvExporter.export(allData, "all-stepplanner-data");
  }
}

const app = new App();

window.AuthService = { loginWithGoogle, logout, onAuthChanged };

window.App = app;

export default app;
