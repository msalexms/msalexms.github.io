/**
 * useActivity.js
 *
 * Lee una sola vez /data/activity.json (commits reales de los repos de AMS Tech,
 * generado en build por scripts/fetchActivity.js) y lo comparte entre componentes.
 * Devuelve null mientras carga o si no hay datos.
 */

import { useEffect, useState } from 'react';

let cache;

export function useActivity() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let off = false;
    cache ??= fetch('/data/activity.json')
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
    cache.then((j) => {
      if (!off && j?.commits?.length) setData(j);
    });
    return () => {
      off = true;
    };
  }, []);

  return data;
}
