/**
 * fetchActivity.js
 *
 * Descarga en build el último trabajo real de los repos de AMS Tech y lo guarda
 * en public/data/activity.json. Así la web muestra datos verdaderos sin hacer
 * peticiones a GitHub desde el navegador del visitante (privacidad + sin límites
 * de la API). Si falla la red, se conserva el JSON anterior y el build sigue.
 *
 * El workflow reconstruye a diario para que los datos no caduquen.
 */

import fs from 'fs';
import path from 'path';

const OWNER = 'msalexms';
const REPOS = ['lenspipe', 'circuitbin', 'MoM', 'fin-cli', 'rtl-sdr-analyzer'];
const OUT = path.resolve('public/data/activity.json');

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'portfolio-build',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function repoCommits(repo) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/commits?per_page=4`, { headers });
  if (!res.ok) throw new Error(`${repo}: HTTP ${res.status}`);
  const list = (await res.json()).filter((c) => !c.commit.message.startsWith('Merge'));
  return list.map((c) => ({
    repo,
    sha: c.sha.slice(0, 7),
    message: c.commit.message.split('\n')[0].slice(0, 90),
    date: c.commit.author?.date ?? c.commit.committer?.date,
    url: c.html_url,
  }));
}

try {
  let failed = 0;
  const all = (
    await Promise.all(
      REPOS.map((r) =>
        repoCommits(r).catch((e) => {
          failed += 1;
          console.warn('[activity]', e.message);
          return [];
        })
      )
    )
  ).flat();
  // Una actualización incompleta (límite de la API, red caída) no debe pisar un JSON bueno
  if (failed > 0 && fs.existsSync(OUT)) throw new Error(`${failed} repo(s) fallaron; se conserva el JSON anterior`);
  if (all.length === 0) throw new Error('sin datos');
  all.sort((a, b) => new Date(b.date) - new Date(a.date));
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), commits: all.slice(0, 6) }, null, 2));
  console.log(`[activity] ${Math.min(6, all.length)} commits guardados`);
} catch (e) {
  console.warn('[activity] no se pudo actualizar, se conserva el anterior:', e.message);
}
