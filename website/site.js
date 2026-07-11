(function(){
  var LOGO = '<svg viewBox="0 0 110 133" aria-hidden="true"><path fill="currentColor" d="M58.8,38.61l39.68-15.07c.8.6,1.56,1.48,1.93,2.42.29.74.76,2.23.2,2.84l-33.5,18.01c.1.24,2.21.66,2.64.76,14.6,3.43,29.37,6.15,44.07,9.15.21.03.34.13.46.3.83,1.19.46,6.42-1.4,6.51-14.91-1.43-29.87-2.4-44.82-3.41l35.8,35.91c-.58,2.36-2.53,5.23-5.18,5.09l-22.15-17.11-17.15-12.38c3.09,15.53,6.74,30.93,10.38,46.34.18.79-.66,1.53-1.26,1.94-1.23.83-4.84,1.91-5.77.36-5.52-15.48-10.88-31.03-17.23-46.18-5.16,13.04-9.74,26.31-14.46,39.51-1.02,1.62-5.36.05-6.25-1.44l9.86-45.05-13.19,9.74-14.41,11.25c-1.63.83-4.72-2.86-3.67-4.14,9.4-8.83,18.66-17.83,27.49-27.23l-27.47,2.24c-1.3-.04-1.75-2.99-1.11-3.93l31.22-6.9-20.63-10.69c-1.44-.53-.12-3.03.81-3.29l23.97,8.98-11.48-20.62c.15-.75,2.19-2.19,2.88-1.26,3.24,4.56,6.44,9.14,9.77,13.63,1.05,1.41,2.18,3.11,3.31,4.42.12.14,0,.36.43.24l1.89-27.64c1.05-.77,3.12-.77,3.35.79.49,7.91.8,15.84,1.37,23.74.02.28-.15.55.28.47,3.35-4.45,6.77-8.85,10.06-13.34,3.49-4.75,6.85-9.66,10.36-14.37,1.23-.38,4.13,1.48,3.56,2.99-4.1,7.49-8.52,14.82-12.59,22.33-.23.43-2.2,3.92-2.04,4.09Z"/></svg>';
  var ARROW = '<svg class="arrow" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18"/></svg>';
  var CHEV = '<svg class="lchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
  var LANGS = [['en','English','EN'],['zh-TW','繁體中文','繁中'],['ko','한국어','한국어'],['es','Español','ES'],['ar','العربية','عربي']];
  function langMenu(){ return LANGS.map(function(l){ return '<a href="#" data-l="'+l[0]+'"'+(l[0]==='en'?' class="on"':'')+'>'+l[1]+'</a>'; }).join(''); }
  var LANG = '<div class="lang"><button class="langbtn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Change language">'+GLOBE+'<span class="langcur">EN</span>'+CHEV+'</button><div class="langmenu" role="menu">'+langMenu()+'</div></div>';

  var nav = document.getElementById('site-nav');
  if(nav){
    nav.outerHTML =
    '<nav>'+
      '<div class="wrap navin">'+
        '<a class="brand" href="preview-home.html"><img class="brandlogo" src="logo-slima.png" alt="Slima"></a>'+
        '<ul class="navlinks">'+
          '<li><a href="writing-studio.html">Writing</a></li>'+
          '<li><a href="script-studio.html">Script</a></li>'+
          '<li><a href="beta-reader.html">Beta readers</a></li>'+
          '<li><a href="pricing.html">Plans</a></li>'+
          '<li class="navdd">'+
            '<button class="navdd-btn" type="button" aria-haspopup="true" aria-expanded="false">Resources <svg class="ddchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>'+
            '<div class="navmenu" role="menu">'+
              '<div class="navmenu-inner">'+
                '<div class="nm-col"><span class="nm-h">Read</span>'+
                  '<a href="resources.html"><b>Resource hub</b><small>Insights, tutorials, and updates</small></a>'+
                  '<a href="changelog.html"><b>Changelog</b><small>What is new in Slima</small></a>'+
                '</div>'+
                '<div class="nm-col"><span class="nm-h">Learn</span>'+
                  '<a href="academy.html"><b>Academy</b><small>Tutorials and craft lessons</small></a>'+
                  '<a href="docs.html"><b>Help center</b><small>Docs for every feature</small></a>'+
                  '<a href="contact.html"><b>Contact</b><small>Talk to a human</small></a>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</li>'+
        '</ul>'+
        '<div class="navright">'+
          LANG+
          '<a class="btn btn-dark navcta" href="https://app.slima.ai">Open studio '+ARROW+'</a>'+
          '<button class="navtoggle" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>'+
        '</div>'+
      '</div>'+
      '<div class="navmobile">'+
        '<a href="writing-studio.html">Writing Studio</a>'+
        '<a href="script-studio.html">Script Studio</a>'+
        '<a href="beta-reader.html">Beta Readers</a>'+
        '<a href="mcp.html">Slima MCP</a>'+
        '<a href="pricing.html">Plans</a>'+
        '<a href="resources.html">Resources</a>'+
        '<a href="academy.html">Academy</a>'+
        '<a href="docs.html">Help center</a>'+
        '<a href="changelog.html">Changelog</a>'+
        '<a href="about.html">About</a>'+
        '<a href="https://discord.gg/slima" target="_blank" rel="noopener">Community</a>'+
        '<a href="contact.html">Contact</a>'+
        '<a href="download-mac.html">Download for Mac</a>'+
        '<a href="download-windows.html">Download for Windows</a>'+
        '<a class="btn btn-dark" href="https://app.slima.ai">Open studio</a>'+
        '<div class="langrow">'+LANGS.map(function(l){return '<a href="#" data-l="'+l[0]+'"'+(l[0]==="en"?" class=\"on\"":"")+'>'+l[2]+'</a>';}).join('')+'</div>'+
      '</div>'+
    '</nav>';
  }

  var footer = document.getElementById('site-footer');
  if(footer){
    footer.outerHTML =
    '<footer><div class="wrap">'+
      '<div class="fgrid">'+
        '<div><div class="bd"><img class="brandlogo flip" src="logo-slima.png" alt="Slima"></div><p style="font-size:13.5px;max-width:30ch">The writing app for long projects, from first line to last.</p>'+
          '<div class="fdl">'+
            '<a href="download-mac.html"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.04c-.03-2.71 2.21-4.01 2.31-4.07-1.26-1.84-3.22-2.09-3.92-2.12-1.67-.17-3.26.98-4.1.98-.84 0-2.15-.96-3.54-.93-1.82.03-3.5 1.06-4.44 2.69-1.89 3.29-.48 8.16 1.36 10.83.9 1.31 1.97 2.77 3.38 2.72 1.36-.05 1.87-.88 3.51-.88 1.64 0 2.1.88 3.54.85 1.46-.02 2.39-1.33 3.28-2.65 1.03-1.51 1.46-2.97 1.48-3.05-.03-.01-2.84-1.09-2.87-4.32zM14.34 4.07c.74-.9 1.24-2.15 1.1-3.4-1.07.04-2.36.71-3.13 1.61-.69.8-1.29 2.07-1.13 3.29 1.19.09 2.41-.61 3.16-1.5z"/></svg> Download for Mac</a>'+
            '<a href="download-windows.html"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.6l7.5-1v7.1H3V5.6zM3 13.3h7.5v7.1L3 19.4v-6.1zM11.3 4.4L21 3v8.7h-9.7V4.4zM11.3 12.5H21V21l-9.7-1.3v-7.2z"/></svg> Download for Windows</a>'+
          '</div>'+
          '<a class="fmail" href="mailto:service@slima.ai">service@slima.ai</a>'+
        '</div>'+
        '<div><h4>Product</h4><ul><li><a href="writing-studio.html">Writing Studio</a></li><li><a href="script-studio.html">Script Studio</a></li><li><a href="beta-reader.html">Beta Readers</a></li><li><a href="ai-continuity-checker.html">Continuity checker</a></li><li><a href="mcp.html">Slima MCP</a></li><li><a href="pricing.html">Plans</a></li></ul></div>'+
        '<div><h4>For writers</h4><ul><li><a href="for-novelists.html">Novelists</a></li><li><a href="for-screenwriters.html">Screenwriters</a></li><li><a href="for-researchers.html">Researchers</a></li><li><a href="for-teams.html">Teams</a></li></ul></div>'+
        '<div><h4>Compare</h4><ul><li><a href="best-novel-writing-software.html">Best novel writing software</a></li><li><a href="scrivener-alternative.html">Scrivener alternative</a></li><li><a href="slima-vs-sudowrite.html">Slima vs Sudowrite</a></li><li><a href="slima-vs-novelcrafter.html">Slima vs NovelCrafter</a></li><li><a href="novelai-alternative.html">NovelAI alternative</a></li><li><a href="final-draft-alternative.html">Final Draft alternative</a></li><li><a href="notion-vs-obsidian-for-research.html">Notion vs Obsidian</a></li></ul></div>'+
        '<div><h4>Guides</h4><ul><li><a href="how-to-organize-a-novel.html">Organize a novel</a></li><li><a href="how-to-keep-track-of-characters-in-a-novel.html">Track your characters</a></li><li><a href="how-to-get-feedback-on-your-novel.html">Get novel feedback</a></li><li><a href="how-to-finish-writing-a-book.html">Finish your book</a></li><li><a href="how-to-write-a-tv-series-bible.html">Write a series bible</a></li><li><a href="how-to-outline-a-screenplay.html">Outline a screenplay</a></li><li><a href="how-to-organize-research-for-a-thesis.html">Organize thesis research</a></li><li><a href="how-to-structure-a-dissertation.html">Structure a dissertation</a></li></ul></div>'+
        '<div><h4>Company</h4><ul><li><a href="about.html">About</a></li><li><a href="https://discord.gg/slima" target="_blank" rel="noopener">Community</a></li><li><a href="partners.html">Partners</a></li><li><a href="contact.html">Contact</a></li></ul></div>'+
        '<div><h4>Resources</h4><ul><li><a href="resources.html">Resource hub</a></li><li><a href="academy.html">Academy</a></li><li><a href="docs.html">Help center</a></li><li><a href="changelog.html">Changelog</a></li></ul></div>'+
      '</div>'+
      '<div class="fbar"><span>© 2026 Slima</span><span class="fsoc"><a href="https://discord.gg/slima" target="_blank" rel="noopener">Discord</a><a href="https://x.com/slima_ai" target="_blank" rel="noopener">X</a><a href="https://youtube.com/@slima" target="_blank" rel="noopener">YouTube</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></span></div>'+
    '</div></footer>';
  }

  var navEl=document.querySelector('nav');
  if(navEl){
    var heroEl=document.querySelector('.a-hero, .hero');
    function navScroll(){
      navEl.classList.toggle('scrolled', (window.scrollY||window.pageYOffset) > 8);
    }
    navScroll();
    window.addEventListener('scroll', navScroll, {passive:true});
    window.addEventListener('resize', navScroll);
  }

  var tg=document.querySelector('.navtoggle'), mm=document.querySelector('.navmobile');
  if(tg&&mm){ tg.addEventListener('click',function(){ var open=mm.classList.toggle('open'); tg.setAttribute('aria-expanded',open?'true':'false'); tg.setAttribute('aria-label',open?'Close menu':'Open menu'); }); }

  var lb=document.querySelector('.langbtn'), lmenu=document.querySelector('.langmenu');
  if(lb&&lmenu){
    lb.addEventListener('click',function(e){ e.stopPropagation(); var o=lmenu.classList.toggle('open'); lb.setAttribute('aria-expanded',o?'true':'false'); });
    document.addEventListener('click',function(){ lmenu.classList.remove('open'); lb.setAttribute('aria-expanded','false'); });
  }
  function setLang(code){
    var m={'en':'EN','zh-TW':'繁中','ko':'한국어','es':'ES','ar':'عربي'};
    var cur=document.querySelector('.langcur'); if(cur)cur.textContent=m[code]||code.toUpperCase();
    document.documentElement.setAttribute('dir', code==='ar'?'rtl':'ltr');
    document.querySelectorAll('.lang [data-l], .langrow [data-l]').forEach(function(a){ a.classList.toggle('on', a.getAttribute('data-l')===code); });
  }
  document.querySelectorAll('.lang [data-l], .langrow [data-l]').forEach(function(a){
    a.addEventListener('click',function(ev){ ev.preventDefault(); setLang(a.getAttribute('data-l')); if(lmenu)lmenu.classList.remove('open'); });
  });

  function boomerang(v){
    if(!v) return;
    v.removeAttribute('loop'); v.muted=true; v.playsInline=true;
    var reversing=false,last=null;
    function step(ts){ if(!reversing) return; if(last===null)last=ts; var dt=(ts-last)/1000; last=ts;
      v.currentTime=Math.max(0,v.currentTime-dt);
      if(v.currentTime<=0.03){reversing=false;last=null;v.play().catch(function(){});return;} requestAnimationFrame(step); }
    v.addEventListener('ended',function(){reversing=true;last=null;v.pause();requestAnimationFrame(step);});
    v.play().catch(function(){});
  }
  document.querySelectorAll('.hero-bg video, video.loopv').forEach(boomerang);

  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('play');});},{threshold:0.35});
    document.querySelectorAll('.mock').forEach(function(m){io.observe(m);});

    /* reveal-on-scroll for standard content blocks */
    var rev=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rev.unobserve(e.target);}});},{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
    document.querySelectorAll('.sec .head, .frow, .grid3>*, .steps>*, .prices>*, .fq, .post, .dcard, .stat, .persona, .cmp>*, .tabstrip>*, .pop>*').forEach(function(el){ el.classList.add('reveal'); rev.observe(el); });
  } else { document.querySelectorAll('.mock').forEach(function(m){m.classList.add('play');}); }

  document.querySelectorAll('.fq .q').forEach(function(q){
    q.addEventListener('click',function(){ q.parentElement.classList.toggle('closed'); var p=q.querySelector('.p'); if(p)p.textContent=q.parentElement.classList.contains('closed')?'+':'–'; });
  });
})();
