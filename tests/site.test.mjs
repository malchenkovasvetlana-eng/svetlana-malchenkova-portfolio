import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(target) : entry.name.endsWith(".html") ? [target] : [];
  }));
  return nested.flat();
}

test("build contains homepage, 9 cases and fallback page", async () => {
  const files = await htmlFiles(dist);
  assert.equal(files.length, 11);
  assert.equal(files.filter((file) => file.includes(`${path.sep}projects${path.sep}`)).length, 9);
});

test("every page has one h1, metadata and image alternatives", async () => {
  for (const file of await htmlFiles(dist)) {
    const html = await readFile(file, "utf8");
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, file);
    assert.match(html, /<meta name="description"/i, file);
    assert.match(html, /<link rel="canonical"/i, file);
    assert.doesNotMatch(html, /<img(?![^>]*\balt=)[^>]*>/i, file);
    assert.doesNotMatch(html, /mailto:|tel:/i, file);
  }
});

test("all relative links and assets resolve", async () => {
  for (const file of await htmlFiles(dist)) {
    const html = await readFile(file, "utf8");
    const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
    for (const reference of references) {
      if (/^(?:https?:|#)/.test(reference)) continue;
      const clean = reference.split("#")[0];
      if (!clean) continue;
      let target = path.resolve(path.dirname(file), clean);
      if (clean.endsWith("/")) target = path.join(target, "index.html");
      await access(target);
    }
  }
});

test("homepage exposes all projects and Telegram contact", async () => {
  const html = await readFile(path.join(dist, "index.html"), "utf8");
  assert.equal((html.match(/class="project-card /g) ?? []).length, 9);
  assert.ok((html.match(/https:\/\/t\.me\/lorgina/g) ?? []).length >= 3);
});
