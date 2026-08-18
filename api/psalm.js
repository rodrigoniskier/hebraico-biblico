module.exports = async function handler(req, res) {
  const n = Number(req.query.number || 1);
  if (!Number.isInteger(n) || n < 1 || n > 150) return res.status(400).json({ error: 'Psalm number must be 1–150' });
  const tref = `Psalms.${n}`;
  try {
    const url = `https://www.sefaria.org/api/v3/texts/${encodeURIComponent(tref)}?version=source&return_format=text_only`;
    const r = await fetch(url, { headers: { 'User-Agent': 'A-Medida-do-Louvor/1.0' } });
    if (!r.ok) throw new Error(`Sefaria v3 ${r.status}`);
    const data = await r.json();
    let text = data?.versions?.[0]?.text;
    if (typeof text === 'string') text = [text];
    if (!Array.isArray(text) || !text.length) throw new Error('No source text in v3 response');
    return res.status(200).json({ verses: text, source: 'Sefaria Texts API v3 · source language' });
  } catch (firstError) {
    try {
      const fallback = `https://www.sefaria.org/api/texts/${encodeURIComponent(tref)}?context=0&commentary=0&pad=0`;
      const r2 = await fetch(fallback, { headers: { 'User-Agent': 'A-Medida-do-Louvor/1.0' } });
      if (!r2.ok) throw new Error(`Sefaria v1 ${r2.status}`);
      const data2 = await r2.json();
      let text = data2?.he;
      if (typeof text === 'string') text = [text];
      if (!Array.isArray(text) || !text.length) throw new Error('No Hebrew text in fallback response');
      return res.status(200).json({ verses: text, source: 'Sefaria Texts API v1 fallback' });
    } catch (secondError) {
      return res.status(502).json({ error: 'Unable to retrieve Hebrew text', details: [firstError.message, secondError.message] });
    }
  }
}
