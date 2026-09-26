#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const skillsRoot = path.join(packageRoot, 'skills');
const referencesRoot = path.join(packageRoot, 'references');

const SKILLS = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

function usage(exitCode = 0) {
  console.log(`
SAIF Skills CLI

Usage:
  saif-skills install [options]
  saif-skills doctor [options]
  saif-skills list
  saif-skills where [options]
  saif-skills uninstall [options]
  saif-skills self-test

Install options:
  --platform <claude|claude-code|codex>  Target agent. Default: claude
  --global                   Install in your user home directory
  --target <path>            Explicit skills directory (overrides platform/global)
  --only <a,b,c>             Install only selected skills
  --force                    Replace existing SAIF skill folders/files

Default targets:
  Claude local:  ./.claude/skills
  Claude global: ~/.claude/skills
  Codex local:   ./.codex/skills
  Codex global:  ~/.codex/skills

Examples:
  npx @blackice2090/saif-skills install
  npx @blackice2090/saif-skills install --global
  npx @blackice2090/saif-skills install --platform codex --global
  npx @blackice2090/saif-skills install --target ./agent-skills
  npx @blackice2090/saif-skills doctor --global
`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const out = { command: argv[0] || 'help', platform: 'claude', global: false, force: false, target: null, only: null };
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--global') out.global = true;
    else if (arg === '--force') out.force = true;
    else if (arg === '--platform') out.platform = argv[++i];
    else if (arg === '--target') out.target = argv[++i];
    else if (arg === '--only') out.only = argv[++i];
    else if (arg === '-h' || arg === '--help') usage(0);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (out.platform === 'claude-code') out.platform = 'claude';
  if (!['claude', 'codex'].includes(out.platform)) throw new Error(`Unsupported platform: ${out.platform}`);
  return out;
}

function expandHome(p) {
  if (!p) return p;
  if (p === '~') return os.homedir();
  if (p.startsWith(`~${path.sep}`) || p.startsWith('~/') || p.startsWith('~\\')) {
    return path.join(os.homedir(), p.slice(2));
  }
  return p;
}

function resolveTarget(opts) {
  if (opts.target) return path.resolve(expandHome(opts.target));
  const folder = opts.platform === 'codex' ? '.codex' : '.claude';
  const base = opts.global ? os.homedir() : process.cwd();
  return path.join(base, folder, 'skills');
}

function selectedSkills(opts) {
  if (!opts.only) return SKILLS;
  const requested = opts.only.split(',').map((s) => s.trim()).filter(Boolean);
  const unknown = requested.filter((s) => !SKILLS.includes(s));
  if (unknown.length) throw new Error(`Unknown skill(s): ${unknown.join(', ')}`);
  return requested;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest, force) {
  if (fs.existsSync(dest) && !force) {
    throw new Error(`Destination already exists: ${dest}\nRe-run with --force to replace SAIF files.`);
  }
  if (fs.existsSync(dest) && force) fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
}

function copyReferences(target, force) {
  const dest = path.join(target, 'references');
  ensureDir(dest);
  for (const entry of fs.readdirSync(referencesRoot, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const srcFile = path.join(referencesRoot, entry.name);
    const destFile = path.join(dest, entry.name);
    if (fs.existsSync(destFile) && !force) {
      const a = fs.readFileSync(srcFile);
      const b = fs.readFileSync(destFile);
      if (Buffer.compare(a, b) !== 0) {
        throw new Error(`Reference already exists with different content: ${destFile}\nUse --force to replace it.`);
      }
      continue;
    }
    fs.copyFileSync(srcFile, destFile);
  }
}

function install(opts) {
  const target = resolveTarget(opts);
  const skills = selectedSkills(opts);
  ensureDir(target);
  copyReferences(target, opts.force);
  for (const skill of skills) {
    copyDir(path.join(skillsRoot, skill), path.join(target, skill), opts.force);
  }
  console.log(`✓ Installed ${skills.length} SAIF skill(s)`);
  console.log(`  Target: ${target}`);
  console.log(`  Skills: ${skills.join(', ')}`);
  console.log(`  Shared references: ${path.join(target, 'references')}`);
  console.log('\nRun "saif-skills doctor" with the same target options to verify the install.');
}

function doctor(opts) {
  const target = resolveTarget(opts);
  let ok = true;
  console.log(`Checking: ${target}`);
  for (const skill of SKILLS) {
    const file = path.join(target, skill, 'SKILL.md');
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✓' : '✗'} ${skill}/SKILL.md`);
    if (!exists) ok = false;
  }
  const refs = ['official_submission_rules.md', 'judge_video_notes.md', 'project_readiness_model.md', 'source_map.md'];
  for (const ref of refs) {
    const file = path.join(target, 'references', ref);
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✓' : '✗'} references/${ref}`);
    if (!exists) ok = false;
  }
  if (!ok) {
    console.error('\nInstall is incomplete.');
    process.exitCode = 1;
  } else {
    console.log('\n✓ SAIF skills installation is complete.');
  }
}

function uninstall(opts) {
  const target = resolveTarget(opts);
  for (const skill of SKILLS) {
    fs.rmSync(path.join(target, skill), { recursive: true, force: true });
  }
  fs.rmSync(path.join(target, 'references'), { recursive: true, force: true });
  console.log(`✓ Removed SAIF skills from ${target}`);
}

function selfTest() {
  let ok = true;
  for (const skill of SKILLS) {
    const file = path.join(skillsRoot, skill, 'SKILL.md');
    if (!fs.existsSync(file)) {
      console.error(`Missing: ${file}`);
      ok = false;
      continue;
    }
    const text = fs.readFileSync(file, 'utf8');
    if (!text.startsWith('---\n') || !text.includes('\nname:') || !text.includes('\ndescription:')) {
      console.error(`Invalid SKILL.md frontmatter: ${file}`);
      ok = false;
    }
  }
  for (const ref of ['official_submission_rules.md', 'judge_video_notes.md', 'project_readiness_model.md', 'source_map.md']) {
    if (!fs.existsSync(path.join(referencesRoot, ref))) {
      console.error(`Missing reference: ${ref}`);
      ok = false;
    }
  }
  if (!ok) process.exit(1);
  console.log(`✓ Self-test passed: ${SKILLS.length} skills + shared references.`);
}

try {
  const opts = parseArgs(process.argv.slice(2));
  switch (opts.command) {
    case 'install': install(opts); break;
    case 'doctor': doctor(opts); break;
    case 'list': console.log(SKILLS.join('\n')); break;
    case 'where': console.log(resolveTarget(opts)); break;
    case 'uninstall': uninstall(opts); break;
    case 'self-test': selfTest(); break;
    case 'help': usage(0); break;
    default: usage(1);
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
