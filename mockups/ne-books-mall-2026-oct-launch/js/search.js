/* GNB 검색창 레이어 팝업 — 클릭 시 인기 검색어, 입력 시 자동완성(교재명 리스트 + 미리보기) */
(function(){
  // 자동완성 교재 데이터 (와이어프레임용 샘플)
  var BOOKS=[
    {title:"세 마리 토끼 잡는 초등 독서논술 A단계 세트", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"세 마리 토끼 잡는 초등 독서논술 A1", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"세 마리 토끼 잡는 초등 독서논술 A2", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"세 마리 토끼 잡는 초등 독서논술 A3", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"세 마리 토끼 잡는 초등 독서논술 A4", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"세 마리 토끼 잡는 초등 독서논술 A5", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"세 마리 토끼 잡는 초등 독서논술 B단계 세트", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"세 마리 토끼 잡는 초등 독서논술 B1", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"세 마리 토끼 잡는 초등 독서논술 B2", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"세 마리 토끼 잡는 초등 독서논술 B3", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"Phonics Code 1 : Student Book", img:"assets/best_1.png", url:"교재상세.html"},
    {title:"능률 VOCA 어원편", img:"assets/best_2.png", url:"교재상세.html"},
    {title:"Bricks Reading 150 Level 1", img:"assets/best_3.png", url:"교재상세.html"},
    {title:"Grammar Zone 기본편 1", img:"assets/best_4.png", url:"교재상세.html"},
    {title:"리딩튜터 입문", img:"assets/best_5.png", url:"교재상세.html"},
    {title:"주니어 리딩튜터 1", img:"assets/best_2.png", url:"교재상세.html"},
    {title:"중등 영어문법 3800제", img:"assets/best_3.png", url:"교재상세.html"},
    {title:"워드마스터 중등 베이직", img:"assets/best_4.png", url:"교재상세.html"}
  ];
  var POPULAR=["능률VOCA","Course book","E-book","단어장","영어문법","중등문법","리딩튜터","중등독해","주니어 리딩튜터","grammar"];

  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

  /* [10월반영] 장바구니 담기(목업) — 헤더 장바구니 뱃지 증가 + 토스트 안내 */
  function addToCart(book){
    var badge=document.querySelector('.cart-badge');
    if(badge){
      var n=(parseInt(badge.getAttribute('data-count'),10)||0)+1;
      badge.setAttribute('data-count',n); badge.textContent=n; badge.hidden=false;
    }
    showToast('장바구니에 담았어요'+(book&&book.title?' · '+book.title:''));
  }
  var toastT;
  function showToast(msg){
    var t=document.getElementById('sa-toast');
    if(!t){ t=document.createElement('div'); t.id='sa-toast'; t.className='sa-toast'; document.body.appendChild(t); }
    t.textContent=msg;
    t.classList.add('show');
    clearTimeout(toastT); toastT=setTimeout(function(){ t.classList.remove('show'); },1800);
  }

  function initSearch(box, opts){
    opts=opts||{};
    var input=box.querySelector('.search-input');
    var pop=box.querySelector('.search-pop');
    var icon=box.querySelector('.search-ic');
    if(!input||!pop) return;

    function renderPopular(){
      pop.classList.remove('wide');
      var html='<p class="sp-head">인기 검색어</p><ol class="sp-pop">';
      POPULAR.forEach(function(k,idx){
        html+='<li><a href="리스트_교재구매.html"><span class="rk">'+(idx+1)+'</span>'+esc(k)+'</a></li>';
      });
      html+='</ol><p class="sp-note">* 최근 10일간 인기 검색어 입니다.</p>';
      pop.innerHTML=html;
    }

    function renderAuto(q){
      var matches=BOOKS.filter(function(b){return b.title.toLowerCase().indexOf(q.toLowerCase())>=0;});
      if(!matches.length){
        pop.classList.remove('wide');
        pop.innerHTML='<p class="sp-empty">\''+esc(q)+'\'에 대한 검색 결과가 없습니다.</p>';
        return;
      }
      pop.classList.add('wide');
      /* GNB(헤더) 검색에서만 장바구니 버튼 노출 — 폼 내 교재선택(onSelect)에서는 제외 */
      var showCart=!opts.onSelect;
      var list=matches.map(function(b,i){
        return '<li class="it'+(i===0?' on':'')+'" data-i="'+i+'"><a href="'+b.url+'">'+esc(b.title)+'</a></li>';
      }).join('');
      var first=matches[0];
      /* 미리보기 이미지에만 장바구니 버튼(관심 시리즈 원형 버튼 스타일) */
      var pvCart=showCart?'<button class="sa-pv-cart" type="button" aria-label="장바구니 담기"><img src="assets/ic_cart_black.svg" alt="장바구니"></button>':'';
      pop.innerHTML='<div class="sa-wrap">'
        +'<ul class="sa-list">'+list+'</ul>'
        +'<div class="sa-preview"><div class="sa-pv-card"><img src="'+first.img+'" alt="">'+pvCart+'</div>'
        +'<p class="sa-pv-name">'+esc(first.title)+'</p></div>'
        +'</div>';
      var items=[].slice.call(pop.querySelectorAll('.sa-list .it'));
      var pvImg=pop.querySelector('.sa-pv-card img');
      var pvName=pop.querySelector('.sa-pv-name');
      var curBook=first;
      items.forEach(function(li){
        li.addEventListener('mouseenter',function(){
          items.forEach(function(x){ x.classList.remove('on'); });
          li.classList.add('on');
          var b=matches[+li.getAttribute('data-i')];
          pvImg.src=b.img; pvName.textContent=b.title; curBook=b;
        });
        if(opts.onSelect){
          li.querySelector('a').addEventListener('click',function(e){ e.preventDefault(); opts.onSelect(matches[+li.getAttribute('data-i')]); });
        }
      });
      /* [10월반영] 미리보기 이미지의 장바구니 버튼 */
      var pvCartBtn=pop.querySelector('.sa-pv-cart');
      if(pvCartBtn){ pvCartBtn.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); addToCart(curBook); }); }
      if(opts.onSelect){
        var pv=pop.querySelector('.sa-preview'); pv.style.cursor='pointer';
        pv.addEventListener('click',function(){ opts.onSelect(curBook); });
      }
    }

    function refresh(){
      var q=input.value.trim();
      if(q){ renderAuto(q); pop.hidden=false; }
      else if(opts.noPopular){ pop.hidden=true; }
      else { renderPopular(); pop.hidden=false; }
    }
    function openPop(){ refresh(); }
    function closePop(){ pop.hidden=true; }

    /* 검색 실행: GNB 검색(폼용 교재검색 제외)은 결과 리스트로 이동 */
    function submitSearch(){
      if(opts.onSelect) return; // 폼 내 교재명 검색은 이동하지 않음
      var q=input.value.trim();
      if(!q){ input.focus(); return; }
      location.href='리스트_교재구매.html?q='+encodeURIComponent(q);
    }
    input.addEventListener('focus',openPop);
    input.addEventListener('click',openPop);
    input.addEventListener('input',openPop);
    input.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); submitSearch(); } else if(e.key==='Escape'){ closePop(); input.blur(); } });
    if(icon) icon.addEventListener('click',function(){ if(input.value.trim()) submitSearch(); else input.focus(); });
    document.addEventListener('click',function(e){ if(!box.contains(e.target)) closePop(); });
  }

  /* 인풋 오른쪽 X(clear) 버튼 자동 부착 — .iq-clear 인풋 */
  function enhanceClear(){
    [].forEach.call(document.querySelectorAll('input.iq-clear'),function(inp){
      if(inp.closest('.iq-inx-wrap')) return;
      var wrap=document.createElement('span');
      wrap.className='iq-inx-wrap'+((inp.classList.contains('full')||inp.classList.contains('search-input'))?' block':'');
      inp.parentNode.insertBefore(wrap,inp); wrap.appendChild(inp);
      var x=document.createElement('button'); x.type='button'; x.className='iq-inx'; x.setAttribute('aria-label','지우기');
      wrap.appendChild(x);
      function upd(){ wrap.classList.toggle('has-val', inp.value.trim()!==''); }
      inp.addEventListener('input',upd);
      x.addEventListener('mousedown',function(e){ e.preventDefault(); });
      x.addEventListener('click',function(){ inp.value=''; upd(); inp.dispatchEvent(new Event('input',{bubbles:true})); inp.focus(); });
      upd();
    });
  }

  function boot(){
    [].forEach.call(document.querySelectorAll('.search'),function(b){ initSearch(b); });
    /* 교재명 검색: 선택 시 셀렉트+인풋+검색버튼 → 커버+교재명+삭제 로 전환 */
    [].forEach.call(document.querySelectorAll('.bk-search'),function(b){
      var field=b.closest('.iq-field');
      var bookname=field?field.querySelector('.iq-bookname'):null;
      var selected=field?field.querySelector('.iq-bk-selected'):null;
      initSearch(b,{noPopular:true, onSelect:function(book){
        if(selected){
          var img=selected.querySelector('.iq-bk-cover img'); if(img) img.src=book.img;
          var t=selected.querySelector('.iq-bk-title'); if(t) t.textContent=book.title;
          if(bookname) bookname.hidden=true; selected.hidden=false;
        }
        var pop=b.querySelector('.search-pop'); if(pop) pop.hidden=true;
      }});
      if(selected){
        var del=selected.querySelector('.iq-bk-del');
        if(del) del.addEventListener('click',function(){
          selected.hidden=true; if(bookname) bookname.hidden=false;
          var inp=b.querySelector('.search-input');
          if(inp){ inp.value=''; var w=inp.closest('.iq-inx-wrap'); if(w) w.classList.remove('has-val'); }
          var pop=b.querySelector('.search-pop'); if(pop) pop.hidden=true;
        });
      }
    });
    enhanceClear();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
