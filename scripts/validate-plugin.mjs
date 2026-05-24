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

if (fs.existsSync(path.join(pluginRoot, "plugin.json"))) {
  fail("plugins/ux-principles/plugin.json should not exist; use .codex-plugin/plugin.json and .claude-plugin/plugin.json");
}

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
  } else {
    const frontmatter = frontmatterMatch[1];
    const requiredFrontmatter = [
      [/^name:\s*ux-principles\s*$/m, "Skill frontmatter name must match skills/ux-principles"],
      [/^description:\s*Use this skill when /m, "Skill frontmatter description must start with 'Use this skill when'"],
      [/^license:\s*MIT\s*$/m, "Skill frontmatter license must be MIT"],
      [/^allowed-tools:\s*\[\]\s*$/m, "Skill frontmatter allowed-tools must be []"],
      [/^metadata:\s*$/m, "Skill frontmatter metadata block is missing"],
      /^\s+author:\s*Andrei Gheorghiu \/ codemonk\.digital\s*$/m,
      /^\s+version:\s*"0\.1\.0"\s*$/m,
    ];

    for (const requirement of requiredFrontmatter) {
      const [pattern, message] = Array.isArray(requirement)
        ? requirement
        : [requirement, `Skill frontmatter is missing ${requirement}`];
      if (!pattern.test(frontmatter)) {
        fail(message);
      }
    }
  }

  const requiredSections = [
    "## When to Activate",
    "## Key Principles",
    "## User Work Ownership Examples",
    "## Product Copy Examples",
    "## Verification Checklist",
    "## Platform Notes",
    "## Resources",
  ];

  for (const section of requiredSections) {
    if (!skillContent.includes(section)) {
      fail(`Skill is missing required section: ${section}`);
    }
  }

  for (const exampleMarker of ["BAD:", "GOOD:"]) {
    if (!skillContent.includes(exampleMarker)) {
      fail(`Skill examples are missing marker: ${exampleMarker}`);
    }
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
