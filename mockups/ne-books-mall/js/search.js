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

  function initSearch(box){
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
      var list=matches.map(function(b,i){
        return '<li class="it'+(i===0?' on':'')+'" data-i="'+i+'"><a href="'+b.url+'">'+esc(b.title)+'</a></li>';
      }).join('');
      var first=matches[0];
      pop.innerHTML='<div class="sa-wrap">'
        +'<ul class="sa-list">'+list+'</ul>'
        +'<div class="sa-preview"><div class="sa-pv-card"><img src="'+first.img+'" alt=""></div>'
        +'<p class="sa-pv-name">'+esc(first.title)+'</p></div>'
        +'</div>';
      var items=[].slice.call(pop.querySelectorAll('.sa-list .it'));
      var pvImg=pop.querySelector('.sa-pv-card img');
      var pvName=pop.querySelector('.sa-pv-name');
      items.forEach(function(li){
        li.addEventListener('mouseenter',function(){
          items.forEach(function(x){ x.classList.remove('on'); });
          li.classList.add('on');
          var b=matches[+li.getAttribute('data-i')];
          pvImg.src=b.img; pvName.textContent=b.title;
        });
      });
    }

    function refresh(){
      var q=input.value.trim();
      if(q) renderAuto(q); else renderPopular();
    }
    function openPop(){ refresh(); pop.hidden=false; }
    function closePop(){ pop.hidden=true; }

    input.addEventListener('focus',openPop);
    input.addEventListener('click',openPop);
    input.addEventListener('input',openPop);
    input.addEventListener('keydown',function(e){ if(e.key==='Escape'){ closePop(); input.blur(); } });
    if(icon) icon.addEventListener('click',function(){ input.focus(); });
    document.addEventListener('click',function(e){ if(!box.contains(e.target)) closePop(); });
  }

  function boot(){ [].forEach.call(document.querySelectorAll('.search'),initSearch); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
