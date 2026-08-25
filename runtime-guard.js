// Resiliência de produção para o Atlas dos Salmos.
// Mantém a interface utilizável quando o host estático perde a função /api/psalm
// e torna erros de inicialização visíveis em vez de deixar apenas o esqueleto da página.
(function(){
  const nativeFetch = window.fetch.bind(window);

  async function sefariaFallback(url){
    let parsed;
    try { parsed = new URL(url, window.location.href); } catch { return null; }
    if (parsed.pathname !== '/api/psalm') return null;

    const n = Number(parsed.searchParams.get('number') || 1);
    if (!Number.isInteger(n) || n < 1 || n > 150) return null;
    const tref = `Psalms.${n}`;

    try {
      const v3 = `https://www.sefaria.org/api/v3/texts/${encodeURIComponent(tref)}?version=source&return_format=text_only`;
      const r = await nativeFetch(v3, { mode:'cors', credentials:'omit' });
      if (!r.ok) throw new Error(`Sefaria v3 ${r.status}`);
      const d = await r.json();
      let verses = d?.versions?.[0]?.text;
      if (typeof verses === 'string') verses = [verses];
      if (!Array.isArray(verses) || !verses.length) throw new Error('Sefaria v3 sem texto');
      return new Response(JSON.stringify({verses,source:'Sefaria Texts API v3 · fallback direto'}), {
        status:200,
        headers:{'Content-Type':'application/json; charset=utf-8'}
      });
    } catch (firstError) {
      const v1 = `https://www.sefaria.org/api/texts/${encodeURIComponent(tref)}?context=0&commentary=0&pad=0`;
      const r = await nativeFetch(v1, { mode:'cors', credentials:'omit' });
      if (!r.ok) throw firstError;
      const d = await r.json();
      let verses = d?.he;
      if (typeof verses === 'string') verses = [verses];
      if (!Array.isArray(verses) || !verses.length) throw firstError;
      return new Response(JSON.stringify({verses,source:'Sefaria Texts API v1 · fallback direto'}), {
        status:200,
        headers:{'Content-Type':'application/json; charset=utf-8'}
      });
    }
  }

  window.fetch = async function(resource, options){
    const url = typeof resource === 'string' ? resource : resource?.url;
    if (url && /\/api\/psalm(?:\?|$)/.test(new URL(url, window.location.href).pathname + new URL(url, window.location.href).search)) {
      try {
        const local = await nativeFetch(resource, options);
        if (local.ok) return local;
        const fallback = await sefariaFallback(url);
        return fallback || local;
      } catch (localError) {
        try {
          const fallback = await sefariaFallback(url);
          if (fallback) return fallback;
        } catch {}
        throw localError;
      }
    }
    return nativeFetch(resource, options);
  };

  function showBootError(message){
    const panel = document.getElementById('hebrewPanel');
    if (panel) panel.innerHTML = `<div class="error"><b>A página não conseguiu inicializar.</b><br>${String(message || 'Falha ao carregar os módulos da aplicação.')}<br><small>Atualize a página. Se persistir, esta mensagem identifica uma falha de carregamento e não perda do conteúdo dos Salmos.</small></div>`;
  }

  window.addEventListener('error', function(event){
    if (event?.target?.tagName === 'SCRIPT') {
      showBootError(`Falha ao carregar o módulo: ${event.target.src || 'script desconhecido'}`);
    }
  }, true);

  window.addEventListener('unhandledrejection', function(event){
    const reason = event?.reason?.message || event?.reason || 'erro assíncrono desconhecido';
    if (!document.querySelector('#steps .step')) showBootError(reason);
  });

  window.setTimeout(function(){
    const listReady = document.querySelectorAll('#psalmList .psalm-item').length > 0;
    const stepsReady = document.querySelectorAll('#steps .step').length > 0;
    if (!listReady || !stepsReady) showBootError('Os módulos foram carregados, mas a interface não terminou a inicialização.');
  }, 8000);
})();
