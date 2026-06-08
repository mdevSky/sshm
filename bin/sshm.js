#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import os from "os";
import path from "path";
import { spawn } from "child_process";
import { json } from "stream/consumers";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const libDir = path.join(__dirname, "../lib");

const program = new Command();

const CONFIG_DIR = path.join(os.homedir(), ".sshm");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

function ensureConfig() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }

  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, "{}");
  }
}

function loadConfig() {
  ensureConfig();
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
}


async function loadPlugins() {
  try {
    const files = fs.readdirSync(libDir).filter(file => file.endsWith('.js'));
    
    for (const file of files) {
        if (file.endsWith('.js')) {
            const plugin = await import(`${libDir}/${file}`);
            if(!globalThis.plugins) globalThis.plugins = {}
            globalThis.plugins[plugin.default.command] = plugin.default;
        }
    }

    return true
  } catch (e) {
    console.log(e);
    return false
  }
    
}

await loadPlugins();

function saveConfig(data) {
  ensureConfig();

  fs.writeFileSync(
    CONFIG_FILE,
    JSON.stringify(data, null, 2)
  );
}

program
  .name("sshm")
  .description("Simple SSH Manager\nBy MufniDev")
  .version("1.0.0");


// =====================
// ADD
// =====================

program
  .command("add <name> <userhost>")
  .option("--port <port>", "SSH Port", "22")
  .option("--password <password>", "SSH Password")
  .description("Add SSH connection")
  .action((name, userhost, options) => {
    globalThis.plugins["add"](saveConfig, loadConfig, name, userhost, options)
  });


// =====================
// LIST
// =====================
program
  .command("list")
  .description("Show all SSH connections")
  .action(() => {
    globalThis.plugins["list"](loadConfig);
  });


// =====================
// OPEN
// =====================
console.log("Open connection")
program
  .command("open <name>")
  .description("Open SSH connection")
  .action((name) => {
    globalThis.plugins["open"](loadConfig, spawn, name);
  });


// =====================
// REMOVE
// =====================

program
  .command("remove <name>")
  .description("Remove SSH connection")
  .action((name) => {
    globalThis.plugins["remove"](saveConfig, loadConfig, name);
   });


// =====================
// DEFAULT LIST
// =====================

if (process.argv.length <= 2) {
  process.argv.push("list");
}

program.parse();