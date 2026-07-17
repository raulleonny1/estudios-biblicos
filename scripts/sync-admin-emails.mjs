#!/usr/bin/env node
/**
 * Sincroniza la lista de admins en firestore.rules / storage.rules
 * desde config/admin-emails.json + NEXT_PUBLIC_ADMIN_EMAILS (.env.local).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const emailsFile = resolve(root, "config/admin-emails.json");
const envLocal = resolve(root, ".env.local");

function normalize(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function loadEmails() {
  const fromFile = JSON.parse(readFileSync(emailsFile, "utf8"));
  const set = new Set(fromFile.map(normalize).filter(Boolean));

  if (existsSync(envLocal)) {
    const envText = readFileSync(envLocal, "utf8");
    const match = envText.match(/^NEXT_PUBLIC_ADMIN_EMAILS=(.*)$/m);
    if (match) {
      match[1]
        .split(",")
        .map(normalize)
        .filter(Boolean)
        .forEach((email) => set.add(email));
    }
  }

  return Array.from(set).sort();
}

function toRulesArray(emails) {
  return `[${emails.map((email) => `'${email}'`).join(", ")}]`;
}

function patchConfiguredAdminEmails(filePath, emailsLiteral) {
  const source = readFileSync(filePath, "utf8");
  const next = source.replace(
    /request\.auth\.token\.email\.lower\(\) in \[[^\]]*\]/,
    `request.auth.token.email.lower() in ${emailsLiteral}`
  );
  if (next === source && !source.includes("request.auth.token.email.lower() in")) {
    throw new Error(`No se encontró el bloque de emails admin en ${filePath}`);
  }
  writeFileSync(filePath, next);
}

const emails = loadEmails();
if (emails.length === 0) {
  throw new Error("No hay emails de admin configurados.");
}

const literal = toRulesArray(emails);
patchConfiguredAdminEmails(resolve(root, "firestore.rules"), literal);

const storagePath = resolve(root, "storage.rules");
if (existsSync(storagePath)) {
  const storageSource = readFileSync(storagePath, "utf8");
  if (storageSource.includes("request.auth.token.email.lower() in")) {
    patchConfiguredAdminEmails(storagePath, literal);
  }
}

console.log(`Admins sincronizados en reglas: ${emails.join(", ")}`);
