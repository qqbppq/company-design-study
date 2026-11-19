/* Static renderer. No build tools, tracking, API keys or server required. */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const lines = value => esc(value).replace(/\n/g, '<br>');
  const href = value => /^(https?:\/\/|mailto:|\.\.?\/|#)/i.test(value || '') ? esc(value) : '#main';
  const imageURL = value => /^(https?:\/\/|\.\.?\/)/i.test(value || '') ? value : '';
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M12 6l6 6-6 6"/></svg>';
  const chevron = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>';
  const button = (label, url, cls = '') => `<a class="split-button ${cls}" href="${href(url)}"><span>${esc(label)}</span><span class="button-icon">${arrow}</span></a>`;
  const eyebrow = text => `<p class="eyebrow">${esc(text)}</p>`;
  const paragraphs = values => (values || []).map(text => `<p>${lines(text)}</p>`).join('');
  const link = item => `<a href="${href(item.href)}">${esc(item.label)}</a>`;
  const portrait = (p, small = false) => p.image ? `<div class="portrait ${small ? 'portrait-small' : ''} ${p.diptych ? 'diptych' : ''} ${p.position === 'right' ? 'portrait-right' : ''}"><img src="${esc(imageURL(p.image))}" alt="${esc(p.name)} — sample portrait" loading="lazy" width="1774" height="887"></div>` : '<div class="portrait portrait-empty" aria-label="Photo placeholder"></div>';
  const credit = p => `<div class="credit"><span>${esc(p.name)}</span><span>${esc(p.role)}</span></div>`;
  let config = window.SITE_CONFIG;
  if (!config) return;
  let activeAnimations = [];
  function media(image, video, alt, cls = '', eager = false) {
    const img = imageURL(image);
    if (video && imageURL(video)) return `<video class="${cls}" autoplay muted loop playsinline preload="none" ${img ? `poster="${esc(img)}"` : ''} aria-label="${esc(alt)}"><source src="${esc(imageURL(video))}" type="video/mp4"></video>`;
    return img ? `<img class="${cls}" src="${esc(img)}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} width="1586" height="992">` : '';
  }
  function header(c) {
    const logo = c.brand.logo ? `<img src="${esc(imageURL(c.brand.logo))}" alt="${esc(c.brand.name)}">` : `<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 4h6v7h10v9h-6v-7H4z"/></svg></span><span class="brand-name">${esc(c.brand.name)}</span>${c.brand.suffix ? `<span class="brand-suffix">${esc(c.brand.suffix)}</span>` : ''}`;
    return `<header class="site-header"><a class="brand" href="./index.html" aria-label="${esc(c.brand.name)} home">${logo}</a><button class="menu-toggle" aria-controls="main-navigation" aria-expanded="false"><span>${esc(c.labels.menu)}</span><span class="menu-bars" aria-hidden="true"></span></button><nav id="main-navigation" class="main-nav" aria-label="Main navigation">${c.navigation.map((n,i) => n.children ? `<div class="nav-dropdown"><button class="nav-item dropdown-toggle" aria-expanded="false" aria-controls="nav-sub-${i}">${esc(n.label)}${chevron}</button><div class="dropdown-panel" id="nav-sub-${i}">${n.children.map(link).join('')}</div></div>` : `<a class="nav-item" href="${href(n.href)}">${esc(n.label)}</a>`).join('')}</nav></header>`;
  }
  function newsCard(n) {
    return `<a class="news-card" href="./page.html?view=article&amp;id=${encodeURIComponent(n.id)}"><div class="news-image">${media(n.image,'','Abstract illustration')}<span class="news-icon">${arrow}</span></div><p class="eyebrow">${esc(n.category)}</p><h3>${esc(n.title)}</h3><span class="news-date">${esc(n.date)}</span></a>`;
  }
  function home(c) {
    const h = c.home;
    const n = c.news[0];
    return `<main id="main">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-media">${media(h.hero.image,h.hero.video,h.hero.imageAlt,'hero-art',true)}</div>
        <div class="hero-copy"><h1 id="hero-title">${lines(h.hero.title)}</h1><p>${esc(h.hero.description)}</p>${button(h.hero.button,h.hero.href)}</div>
        ${n ? `<aside class="latest-card"><div class="latest-heading">${eyebrow(c.labels.latest)}<a class="text-link" href="./page.html?view=news">${esc(c.labels.viewAll)}${arrow}</a></div><a class="latest-story" href="./page.html?view=article&amp;id=${encodeURIComponent(n.id)}"><span>${esc(n.title)}</span><span class="square-icon">${arrow}</span></a></aside>` : ''}
        <button class="motion-toggle" aria-pressed="false" title="Pause decorative motion"><span class="pause-symbol" aria-hidden="true">Ⅱ</span><span class="sr-only">Pause decorative motion</span></button>
      </section>
      <section class="discovery section-space">
        <div class="discovery-row page-width">
          <div class="discovery-visual">${h.intro.image || h.intro.video ? media(h.intro.image,h.intro.video,'Abstract visual') : '<canvas class="molecule-canvas" aria-label="Slowly rotating abstract point cloud"></canvas>'}</div>
          <div class="body-copy reveal">${eyebrow(h.intro.eyebrow)}${paragraphs(h.intro.paragraphs)}${button(h.intro.button,h.intro.href)}</div>
        </div>
        <figure class="quote-card reveal"><div><blockquote>“${esc(h.quote.text)}”</blockquote>${credit(h.quote)}</div>${portrait(h.quote)}</figure>
      </section>
      <section class="mission-section">${media(h.mission.image,'','Abstract organic shapes','mission-art')}
        <div class="mission-card reveal">${eyebrow(h.mission.eyebrow)}<h2>${esc(h.mission.title)}</h2><div class="mission-copy" id="mission-copy">${paragraphs(h.mission.paragraphs)}</div><button class="expand-mission" aria-controls="mission-copy" aria-expanded="false" aria-label="${esc(h.mission.expand)}"><span aria-hidden="true">+</span></button></div>
      </section>
      <section class="centered-quote section-space reveal"><blockquote>“${esc(h.centeredQuote.text)}”</blockquote>${portrait(h.centeredQuote,true)}${credit(h.centeredQuote)}</section>
      <section class="story-section"><div class="story-inner page-width"><div class="body-copy reveal">${eyebrow(h.story.firstLabel)}<p>${esc(h.story.firstText)}</p>${eyebrow(h.story.secondLabel)}${paragraphs(h.story.paragraphs)}${button(h.story.button,h.story.href)}</div><div class="story-visual">${media(h.story.image,h.story.video,'Abstract illustration of connected ideas')}<div class="fine-grid" aria-hidden="true"></div></div></div></section>
      <section class="team-quote page-width section-space reveal"><div><blockquote>“${esc(h.teamQuote.text)}”</blockquote>${credit(h.teamQuote)}</div><a class="team-link" href="${href(h.teamQuote.href)}"><span>${esc(h.teamQuote.link)}</span><span class="square-icon">${arrow}</span></a></section>
      <section class="cta-section page-width reveal"><div class="cta-art">${media(h.cta.image,'','Abstract molecular illustration')}</div><div class="cta-copy"><h2>${lines(h.cta.title)}</h2>${button(h.cta.button,h.cta.href)}</div></section>
      <section class="explore-grid section-space" aria-label="Explore">${h.cards.map(n=>`<a class="explore-card reveal" href="${href(n.href)}">${eyebrow(n.label)}<h2>${esc(n.title)}</h2><span class="square-icon">${arrow}</span></a>`).join('')}</section>
      <section class="news-section page-width section-space" aria-labelledby="latest-title"><h2 class="eyebrow" id="latest-title">${esc(c.labels.latest)}</h2><div class="news-grid">${c.news.slice(0,3).map(newsCard).join('')}</div><div class="news-actions">${button(c.labels.moreNews,'./page.html?view=news')}</div></section>
    </main>`;
  }
  function page(c, view, id) {
    if (view === 'article') {
      const article = c.news.find(n=>n.id===id);
      if (!article) return missing();
      document.title = `${article.title} — ${c.brand.name}`;
      return `<main id="main" class="inner-page"><article><div class="article-heading">${eyebrow(article.category)}<h1>${esc(article.title)}</h1><p class="article-date">${esc(article.date)}</p></div><div class="article-image page-width">${media(article.image,'','Article illustration','',true)}</div><div class="article-body">${paragraphs(article.body)}${button(c.labels.back,'./page.html?view=news')}</div></article></main>`;
    }
    const p = c.pages[view];
    if (!p) return missing();
    document.title = `${p.eyebrow} — ${c.brand.name}`;
    return `<main id="main" class="inner-page"><section class="page-heading page-width">${eyebrow(p.eyebrow)}<h1>${lines(p.title)}</h1><p>${esc(p.lead)}</p></section>
      ${p.image ? `<div class="page-feature page-width">${media(p.image,'','Abstract artwork','',true)}</div>` : ''}
      ${p.body ? `<div class="article-body">${paragraphs(p.body)}</div>` : ''}
      ${p.sections ? `<section class="page-sections page-width">${p.sections.map(s=>`<article><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p></article>`).join('')}</section>` : ''}
      ${p.people ? `<section class="people-grid page-width">${p.people.map(person=>`<figure>${portrait(person)}<figcaption><h2>${esc(person.name)}</h2><p>${esc(person.role)}</p></figcaption></figure>`).join('')}</section>` : ''}
      ${p.contact ? `<div class="page-contact article-body">${c.footer.email ? button(c.footer.email,`mailto:${c.footer.email}`) : `<p>${esc(c.footer.emptyContact)}</p>`}</div>` : ''}
      ${p.button ? `<div class="article-body">${button(p.button,p.href)}</div>` : ''}
      ${view === 'news' ? `<section class="news-grid page-width">${c.news.map(newsCard).join('')}</section>` : ''}
    </main>`;
  }
  function missing() { return `<main class="inner-page" id="main"><div class="page-heading page-width">${eyebrow('Page not found')}<h1>This page has moved.</h1>${button('Back to home','./index.html')}</div></main>`; }
  function footer(c) {
    const mails = [...new Set([c.footer.email,c.footer.pressEmail,c.footer.partnerEmail].filter(Boolean))];
    return `<footer class="site-footer"><div class="footer-grid"><div class="footer-copyright">© ${new Date().getFullYear()} ${esc(c.footer.copyright)}<div class="footer-symbol" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 4h6v7h10v9h-6v-7H4z"/></svg></div></div><nav class="footer-navigation" aria-label="Footer navigation">${c.footer.links.map(link).join('')}</nav><div class="footer-contact"><p class="mono">${esc(c.labels.contact)}</p>${mails.length ? mails.map(mail=>`<a href="mailto:${esc(mail)}">${esc(mail)}</a>`).join('') : `<span>${esc(c.footer.emptyContact)}</span>`}<div class="social-links">${c.footer.socials.map(link).join('')}</div></div><div class="footer-info"><p class="mono">${esc(c.labels.info)}</p>${c.footer.info.map(link).join('')}<button class="back-top" type="button">Back to top ↑</button></div></div>${c.study.enabled ? `<p class="footer-study">${esc(c.study.text)} <a href="${href(c.study.reference)}" target="_blank" rel="noopener noreferrer">Reference website</a></p>` : ''}</footer>${c.study.enabled ? `<button class="study-badge" type="button" aria-haspopup="dialog">${esc(c.study.label)}</button><dialog class="study-dialog"><button class="dialog-close" type="button" aria-label="Close">×</button>${eyebrow('Independent design study')}<h2>このサンプルについて</h2><p>${esc(c.study.text)}</p><a href="${href(c.study.reference)}" target="_blank" rel="noopener noreferrer">参考サイトを見る</a></dialog>` : ''}`;
  }
  function applyTheme(c) {
    Object.entries(c.theme).forEach(([key,value])=>{
      if (key==='imageHue') document.documentElement.style.setProperty('--image-hue', `${Number(value)||0}deg`);
      else if (/^#[\da-f]{6}$/i.test(value)) document.documentElement.style.setProperty(`--${key}`,value);
    });
    document.documentElement.lang = c.language || 'en';
    document.title = c.brand.title;
    document.querySelector('meta[name="description"]').content = c.brand.description;
    document.querySelector('meta[name="theme-color"]').content = c.theme.mint;
    document.querySelector('meta[name="robots"]').content = c.study.enabled ? 'noindex,nofollow' : 'index,follow';
  }
  function render(c) {
    config=c;
    activeAnimations.forEach(dispose=>dispose()); activeAnimations=[];
    applyTheme(c);
    const params = new URLSearchParams(location.search);
    const view = params.get('view');
    document.getElementById('app').innerHTML = header(c)+(view ? page(c,view,params.get('id')) : home(c))+footer(c);
    document.body.classList.toggle('has-study',c.study.enabled);
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.toggle('motion-off',!c.motion.enabled||reduced);
    attach(c);
    if (window.startSiteMotion) activeAnimations.push(window.startSiteMotion(c));
  }
  function attach(c) {
    const menu = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const setMenu = open => {menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);document.body.classList.toggle('menu-open',open);};
    menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
    const closeDropdowns=()=>document.querySelectorAll('.dropdown-toggle').forEach(x=>{x.setAttribute('aria-expanded','false');x.parentElement.classList.remove('is-open');});
    document.querySelectorAll('.dropdown-toggle').forEach(toggle=>{
      toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';closeDropdowns();toggle.setAttribute('aria-expanded',String(open));toggle.parentElement.classList.toggle('is-open',open);});
    });
    const escape=e=>{if(e.key==='Escape'){closeDropdowns();if(nav.classList.contains('is-open')){setMenu(false);menu.focus();}}};
    const clickOutside=e=>{if(!e.target.closest('.nav-dropdown'))closeDropdowns();};
    document.addEventListener('keydown',escape);document.addEventListener('click',clickOutside);
    activeAnimations.push(()=>{document.removeEventListener('keydown',escape);document.removeEventListener('click',clickOutside);});
    document.querySelector('.expand-mission')?.addEventListener('click',e=>{
      const b=e.currentTarget,open=b.getAttribute('aria-expanded')!=='true';
      b.setAttribute('aria-expanded',String(open));b.closest('.mission-card').classList.toggle('expanded',open);b.querySelector('span').textContent=open?'−':'+';
      b.setAttribute('aria-label',open?c.labels.readLess:c.home.mission.expand);
    });
    const dialog=document.querySelector('.study-dialog');
    document.querySelector('.study-badge')?.addEventListener('click',()=>dialog.showModal());
    document.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
    dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
    document.querySelector('.back-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:document.documentElement.classList.contains('motion-off')?'instant':'smooth'}));
    const motionButton=document.querySelector('.motion-toggle');
    const syncMotion=()=>{const paused=document.documentElement.classList.contains('motion-off');if(motionButton){motionButton.setAttribute('aria-pressed',String(paused));motionButton.title=paused?'Play decorative motion':'Pause decorative motion';motionButton.querySelector('.pause-symbol').textContent=paused?'▷':'Ⅱ';motionButton.querySelector('.sr-only').textContent=motionButton.title;}document.querySelectorAll('video').forEach(v=>{if(paused)v.pause();else v.play().catch(()=>{});});};
    motionButton?.addEventListener('click',()=>{document.documentElement.classList.toggle('motion-off');syncMotion();});syncMotion();
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));activeAnimations.push(()=>io.disconnect());
    document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('image-unavailable');img.alt='Image unavailable — check its path in site.config.js';}));
  }
  render(config);
  // Only the adjacent, explicitly opened editor may update this preview.
  window.addEventListener('message',e=>{
    if(window.parent===window || e.source!==window.parent || e.data?.type!=='site-editor-preview')return;
    if(location.protocol!=='file:' && e.origin!==location.origin)return;
    if(e.data.config?.version===1 && e.data.config?.home && e.data.config?.brand)render(e.data.config);
  });
  window.addEventListener('pagehide',()=>activeAnimations.forEach(dispose=>dispose()),{once:true});
})();
