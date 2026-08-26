module.exports = async function handler(req, res) {
  const n = Number(req.query.number || 1);
  if (!Number.isInteger(n) || n < 1 || n > 150) return res.status(400).json({ error: 'Psalm number must be 1–150' });
  const tref = `Psalms.${n}`;
  const headers = { 'User-Agent': 'A-Medida-do-Louvor/1.0', 'Accept': 'application/json' };
  const validVerses = value => {
    const arr = typeof value === 'string' ? [value] : value;
    if (!Array.isArray(arr)) return null;
    const cleaned = arr.map(v => typeof v === 'string' ? v.trim() : '').filter(Boolean);
    return cleaned.length ? cleaned : null;
  };
  const send = (verses, source, apiVersion) => {
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json({ verses, source, apiVersion });
  };

  try {
    const url = `https://www.sefaria.org/api/v3/texts/${encodeURIComponent(tref)}?version=source&return_format=text_only`;
    const r = await fetch(url, { headers, signal: AbortSignal.timeout(7000) });
    if (!r.ok) throw new Error(`Sefaria v3 ${r.status}`);
    const data = await r.json();
    const text = validVerses(data?.versions?.[0]?.text);
    if (!text) throw new Error('No source text in v3 response');
    return send(text, 'Sefaria Texts API · source language', 'v3');
  } catch (firstError) {
    try {
      // Endpoint legado mantido somente como fallback operacional caso a v3 esteja temporariamente indisponível.
      const fallback = `https://www.sefaria.org/api/texts/${encodeURIComponent(tref)}?context=0&commentary=0&pad=0`;
      const r2 = await fetch(fallback, { headers, signal: AbortSignal.timeout(7000) });
      if (!r2.ok) throw new Error(`Sefaria legacy ${r2.status}`);
      const data2 = await r2.json();
      const text = validVerses(data2?.he);
      if (!text) throw new Error('No Hebrew text in legacy response');
      return send(text, 'Sefaria Texts API · fallback legado', 'legacy-v1');
    } catch (_secondError) {
      return res.status(502).json({ error: 'Unable to retrieve Hebrew text' });
    }
  }
};
