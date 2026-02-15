import fs from "node:fs";
import path from "node:path";

const ARCHITECTURE_PATH = path.resolve(process.cwd(), "..", "ARCHITECTURE.md");

const SYSTEM_NODES = [
  {
    id: "channels",
    name: "Channel Integrations",
    focus: "Telegram is the primary inbound channel.",
    details: [
      "Telegram, Discord, Slack, and Email adapters",
      "Inbound events normalized before orchestration",
    ],
  },
  {
    id: "message-bus",
    name: "MessageBus",
    focus: "Lane-aware queue for system, session, and background traffic.",
    details: [
      "system lane priority: 0",
      "session lane priority: 10",
      "release_session() guard in finally blocks",
    ],
  },
  {
    id: "dispatcher",
    name: "AgentLoop Dispatcher",
    focus: "Runs the 6-phase orchestration cycle.",
    details: [
      "PARSE -> DECIDE -> ACKNOWLEDGE -> SUPERVISE -> SYNTHESIZE -> DELIVER",
      "Runtime awareness: workers, budget, and recent topics",
      "Self-knowledge carve-out for direct system answers",
    ],
  },
  {
    id: "subagent-manager",
    name: "Subagent Manager",
    focus: "Executes up to 12 workers concurrently.",
    details: [
      "Model routing by task complexity",
      "Cross-batch merge before final synthesis",
      "Worker key-path map reduces path guessing",
    ],
  },
  {
    id: "tooling",
    name: "Tools and Providers",
    focus: "Dispatcher exposes 13 tools; workers receive a 7-tool subset.",
    details: [
      "Codex-first pipeline for coding tasks",
      "Web search/fetch, exec, filesystem, and scheduler integration",
      "Metacognition budget controls and degrade mode",
    ],
  },
  {
    id: "reports",
    name: "Reports and Observability",
    focus: "Synthesized output is persisted for traceability.",
    details: [
      "Saved under memory/reports/{timestamp}/",
      "/healthz, /metrics, /status, /habitat3d endpoints",
      "Runtime metrics stored in ~/.hachi/observability/",
    ],
  },
];

const SYSTEM_EDGES = [
  { from: "Channel Integrations", to: "MessageBus", label: "User events" },
  { from: "MessageBus", to: "AgentLoop Dispatcher", label: "Session lane payloads" },
  { from: "AgentLoop Dispatcher", to: "Subagent Manager", label: "spawn() tasks" },
  { from: "Subagent Manager", to: "Tools and Providers", label: "Tool execution" },
  { from: "Subagent Manager", to: "Reports and Observability", label: "Batch results" },
  { from: "AgentLoop Dispatcher", to: "Channel Integrations", label: "Final response" },
];

const MESSAGE_FLOW_STEPS = [
  "User prompt enters the MessageBus session lane.",
  "Dispatcher builds runtime context and decides whether to spawn workers.",
  "Spawned workers execute in the background with model-tier routing.",
  "Large batches suppress noisy intermediate updates.",
  "Final worker completion triggers cross-batch merge and synthesis.",
  "Synthesis and per-topic reports are written to memory/reports/{timestamp}/.",
  "Dispatcher sends one combined response back to the channel.",
];

const CAPABILITY_LAYERS = [
  {
    name: "Layer 0: Infrastructure",
    highlights: [
      "Lane-aware queue",
      "Session serialization",
      "WAL crash recovery",
      "Orphan guard timer",
    ],
  },
  {
    name: "Layer 1: Agent Core",
    highlights: [
      "Meta-orchestrator loop",
      "Parallel spawn up to 12",
      "Runtime awareness injection",
      "Cross-batch synthesis",
    ],
  },
  {
    name: "Layer 2: Planning",
    highlights: ["Task DAG decomposition", "Dependency-aware scheduler"],
  },
  {
    name: "Layer 3: Metacognition",
    highlights: [
      "Progress monitor",
      "Resource accountant",
      "Strategy selector",
      "Budget surfaced in runtime context",
    ],
  },
  {
    name: "Layer 4: Codex Integration",
    highlights: [
      "Codex-first routing for coding tasks",
      "4-slot concurrency semaphore",
      "Timeout chain alignment",
      "Fallback to native worker execution",
    ],
  },
];

function createSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readArchitectureMarkdown() {
  try {
    return fs.readFileSync(ARCHITECTURE_PATH, "utf8");
  } catch {
    return "";
  }
}

function parseMetadata(markdown) {
  return {
    generatedAt: markdown.match(/^Generated:\s*(.+)$/m)?.[1]?.trim() ?? "Unavailable",
    sourceRoot: markdown.match(/^Source root:\s*(.+)$/m)?.[1]?.trim() ?? "Unavailable",
  };
}

function parseRuntimeFlow(markdown) {
  const flowBlock = markdown.match(/^Flow:\s*\n((?:\s{2,}.+\n?)+)/m)?.[1] ?? "";

  return flowBlock
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function parseSectionIndex(markdown) {
  return [...markdown.matchAll(/^##\s+(\d+)\.\s+(.+)$/gm)].map((match) => ({
    number: Number(match[1]),
    title: match[2].trim(),
    slug: createSlug(`${match[1]}-${match[2]}`),
  }));
}

function extractSection(markdown, sectionNumber) {
  const sectionRegex = new RegExp(
    `^##\\s+${sectionNumber}\\.\\s+(.+)\\n([\\s\\S]*?)(?=^##\\s+\\d+\\.\\s+|\\Z)`,
    "m",
  );
  const match = markdown.match(sectionRegex);

  if (!match) {
    return {
      title: "",
      body: "",
    };
  }

  return {
    title: match[1].trim(),
    body: match[2].trimEnd(),
  };
}

export function getArchitectureSnapshot() {
  const markdown = readArchitectureMarkdown();
  const sections = parseSectionIndex(markdown);
  const wiringDiagram = extractSection(markdown, 17);
  const messageFlowSection = extractSection(markdown, 18);

  return {
    sourcePath: ARCHITECTURE_PATH,
    sourceLoaded: markdown.length > 0,
    metadata: parseMetadata(markdown),
    runtimeFlow: parseRuntimeFlow(markdown),
    sections,
    sectionCount: sections.length,
    wiringDiagram,
    messageFlowSection,
    systemNodes: SYSTEM_NODES,
    systemEdges: SYSTEM_EDGES,
    messageFlowSteps: MESSAGE_FLOW_STEPS,
    capabilityLayers: CAPABILITY_LAYERS,
  };
}
