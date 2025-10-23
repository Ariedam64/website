export interface ModuleData {
  key: string;
  labelKey: string;
  objectiveKey: string;
  techKey: string;
  featuresKey: string;
  limitsKey: string;
  images?: string[];
  repoUrl?: string;
}

export const mayayaModule: ModuleData[] = [
  
  {
    key: "python",
    labelKey: "portfolio.projects.mayaya.modules.python.label",
    objectiveKey: "portfolio.projects.mayaya.modules.python.objective",
    techKey: "portfolio.projects.mayaya.modules.python.tech",
    featuresKey: "portfolio.projects.mayaya.modules.python.features",
    limitsKey: "portfolio.projects.mayaya.modules.python.limits",
    images: [
              "/img/mayaya_python1.png",
              "/img/mayaya_python2.png",
              "/img/mayaya_python3.png",
              "/img/mayaya_python4.png",
              "/img/mayaya_python5.png"
            ],
    repoUrl: "https://github.com/Ariedam64/bp_bot_python",
  },
  {
    key: "node",
    labelKey: "portfolio.projects.mayaya.modules.node.label",
    objectiveKey: "portfolio.projects.mayaya.modules.node.objective",
    techKey: "portfolio.projects.mayaya.modules.node.tech",
    featuresKey: "portfolio.projects.mayaya.modules.node.features",
    limitsKey: "portfolio.projects.mayaya.modules.node.limits",
    images: [
              "/img/mayaya_nodegif.gif",
              "/img/mayaya_node1.png",
              "/img/mayaya_node2.png",
            ],
    repoUrl: "https://github.com/Ariedam64/Bombparty-Bot",
  },
    {
    key: "overlay",
    labelKey: "portfolio.projects.mayaya.modules.overlay.label",
    objectiveKey: "portfolio.projects.mayaya.modules.overlay.objective",
    techKey: "portfolio.projects.mayaya.modules.overlay.tech",
    featuresKey: "portfolio.projects.mayaya.modules.overlay.features",
    limitsKey: "portfolio.projects.mayaya.modules.overlay.limits",
    images: [
              "/img/mayaya_overlay1.png",
              "/img/mayaya_overlay2.png",
              "/img/mayaya_overlay3.png",
              "/img/mayaya_overlay4.png",
              "/img/mayaya_overlay5.png",
            ],
    repoUrl: "https://www.tampermonkey.net/script_installation.php#url=https://github.com/Ariedam64/overlayStats_Bp/raw/refs/heads/main/overlay.user.js",
  }
];

export const arieModule: ModuleData[] = [
  {
    key: "node",
    labelKey: "portfolio.projects.arie.modules.node.label",
    objectiveKey: "portfolio.projects.arie.modules.node.objective",
    techKey: "portfolio.projects.arie.modules.node.tech",
    featuresKey: "portfolio.projects.arie.modules.node.features",
    limitsKey: "portfolio.projects.arie.modules.node.limits",
    images: [
              "/img/arie.gif",
              "/img/arie1.png",
              "/img/arie2.png",
              "/img/arie3.png",
              "/img/arie4.png",
              "/img/arie5.png",
            ],
    repoUrl: "https://github.com/Ariedam64/Discord-Bot",
  }
];

export const snapscoreModule: ModuleData[] = [
  {
    key: "mobile",
    labelKey: "portfolio.projects.snapscore.modules.mobile.label",
    objectiveKey: "portfolio.projects.snapscore.modules.mobile.objective",
    techKey: "portfolio.projects.snapscore.modules.mobile.tech",
    featuresKey: "portfolio.projects.snapscore.modules.mobile.advantages",
    limitsKey: "portfolio.projects.snapscore.modules.mobile.limits",
    images: [],
    repoUrl: "",
  },
    {
    key: "web",
    labelKey: "portfolio.projects.snapscore.modules.web.label",
    objectiveKey: "portfolio.projects.snapscore.modules.web.objective",
    techKey: "portfolio.projects.snapscore.modules.web.tech",
    featuresKey: "portfolio.projects.snapscore.modules.web.advantages",
    limitsKey: "portfolio.projects.snapscore.modules.web.limits",
    images: [],
    repoUrl: "",
  },
    {
    key: "puppeteer",
    labelKey: "portfolio.projects.snapscore.modules.puppeteer.label",
    objectiveKey: "portfolio.projects.snapscore.modules.puppeteer.objective",
    techKey: "portfolio.projects.snapscore.modules.puppeteer.tech",
    featuresKey: "portfolio.projects.snapscore.modules.puppeteer.advantages",
    limitsKey: "portfolio.projects.snapscore.modules.puppeteer.limits",
    images: ["/img/snapchat2.png","/img/snapchat1.png"],
    repoUrl: "https://github.com/Ariedam64/SnapScore-V2",
  },
];
