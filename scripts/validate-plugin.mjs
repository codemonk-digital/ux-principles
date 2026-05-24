import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pluginName = "ux-principles";
const pluginRoot = path.join(root, "plugins", pluginName);
const skillDir = path.join(pluginRoot, "skills", pluginName);
const skillPath = path.join(skillDir, "SKILL.md");

const failures = [];

function fail(message) {
  failures.push(message);
}

function readJson(relativePath) {
  const fullPath = path.join(root, relativePath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (error) {
    fail(`${relativePath} is missing or invalid JSON: ${error.message}`);
    return {};
  }
}

function expectFile(relativePath) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    fail(`${relativePath} is missing`);
  }
}

function expectEqual(actual, expected, label) {
  if (actual !== expected) {
    fail(`${label} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

expectFile("SKILL.md");
expectFile("plugins/README.md");
expectFile("plugins/ux-principles/README.md");
expectFile("plugins/ux-principles/skills/ux-principles/SKILL.md");

const codexPlugin = readJson("plugins/ux-principles/.codex-plugin/plugin.json");
expectEqual(codexPlugin.name, pluginName, "Codex plugin name");
expectEqual(codexPlugin.skills, "./skills/", "Codex plugin skills path");

const claudePlugin = readJson("plugins/ux-principles/.claude-plugin/plugin.json");
expectEqual(claudePlugin.name, pluginName, "Claude plugin name");

const codexMarketplace = readJson(".agents/plugins/marketplace.json");
const codexEntry = codexMarketplace.plugins?.find((plugin) => plugin.name === pluginName);
if (!codexEntry) {
  fail("Codex marketplace is missing ux-principles");
} else {
  expectEqual(codexEntry.source?.path, "./plugins/ux-principles", "Codex marketplace source path");
}

const claudeMarketplace = readJson(".claude-plugin/marketplace.json");
const claudeEntry = claudeMarketplace.plugins?.find((plugin) => plugin.name === pluginName);
if (!claudeEntry) {
  fail("Claude marketplace is missing ux-principles");
} else {
  expectEqual(claudeEntry.source, "./plugins/ux-principles", "Claude marketplace source path");
}

if (fs.existsSync(skillPath)) {
  const skillContent = fs.readFileSync(skillPath, "utf8");
  const frontmatterMatch = skillContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    fail("Skill is missing YAML frontmatter");
  } else if (!frontmatterMatch[1].match(/^name:\s*ux-principles\s*$/m)) {
    fail("Skill frontmatter name must match skills/ux-principles");
  }

  const rootSkill = fs.readFileSync(path.join(root, "SKILL.md"), "utf8");
  if (skillContent !== rootSkill) {
    fail("Root SKILL.md and plugin skill SKILL.md are out of sync");
  }
}

const pluginsReadme = fs.existsSync(path.join(root, "plugins", "README.md"))
  ? fs.readFileSync(path.join(root, "plugins", "README.md"), "utf8")
  : "";
if (!pluginsReadme.includes("`ux-principles`")) {
  fail("plugins/README.md catalog is missing `ux-principles`");
}

if (failures.length > 0) {
  console.error("Plugin validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Plugin validation passed.");
