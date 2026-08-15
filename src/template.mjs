export const telegramIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="telegram-icon"><path d="M21.5 3.4 18.4 20c-.2 1.2-.9 1.5-1.8.9l-4.7-3.5-2.3 2.2c-.2.3-.5.5-1 .5l.3-4.8 8.8-8c.4-.3-.1-.5-.6-.2L6.2 14 1.5 12.5c-1-.3-1-1 .2-1.5L20 4c.8-.3 1.6.2 1.5-.6Z"/></svg>`;
export const arrowIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="arrow-icon"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;
export const star = (className="") => `<span class="star ${className}" aria-hidden="true"></span>`;
export const telegram = (className="") => `<a class="telegram-button ${className}" href="https://t.me/lorgina" target="_blank" rel="noreferrer" aria-label="Написать Светлане в Telegram">${telegramIcon}<span>Написать в Telegram</span></a>`;
export const header = `<header class="site-header shell"><a href="@@BASE@@" class="wordmark" aria-label="На главную">Portfolio</a><nav aria-label="Основная навигация"><a href="@@BASE@@#about">Обо мне</a><a href="@@BASE@@#projects">Проекты</a><a href="@@BASE@@#experience">Опыт</a></nav>${telegram("header-telegram")}</header>`;
export const footer = `<footer class="footer" id="contact"><div class="shell footer-inner"><div><p class="footer-kicker">Открыта к новым проектам</p><h2>Давайте создавать<br><span>понятные смыслы</span></h2></div><div class="footer-action">${telegram()}<p>Светлана Мальченкова · Москва · 2026</p></div></div>${star("footer-star")}</footer>`;
const siteUrl = "https://malchenkovasvetlana-eng.github.io/svetlana-malchenkova-portfolio/";
const escapeAttribute = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

export function document(title, description, body, depth = "", pathname = "") {
  const base = depth || "./";
  const canonical = `${siteUrl}${pathname}`;
  body = body.replaceAll("@@BASE@@", base).replace("<main", '<main id="main-content"');
  if (depth) body = body.replaceAll('href="/#', `href="${depth}#`);

  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0d0d11"><meta name="description" content="${escapeAttribute(description)}"><meta property="og:type" content="website"><meta property="og:locale" content="ru_RU"><meta property="og:title" content="${escapeAttribute(title)}"><meta property="og:description" content="${escapeAttribute(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${siteUrl}images/portrait/svetlana-hero.webp"><title>${title}</title><link rel="canonical" href="${canonical}"><link rel="icon" href="${depth}favicon.svg"><link rel="stylesheet" href="${depth}styles.css"><script src="${depth}app.js" defer></script></head><body><a class="skip-link" href="#main-content">Перейти к содержимому</a>${body}</body></html>`;
}
