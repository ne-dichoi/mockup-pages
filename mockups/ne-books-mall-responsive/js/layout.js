/* 공용 레이아웃 — 헤더(GNB) + 푸터를 각 페이지의 자리표시자에 주입.
   각 페이지: <div id="site-header"></div> ... <div id="site-footer"></div> + <script src="js/layout.js" defer></script>
   (defer 라 DOM 파싱 후 실행되며, 기존 페이지의 인라인 GNB 스크립트는 헤더 주입 전 실행돼 자동 종료됨) */
(function(){
  var HEADER = `<header class="lheader">
    <div class="container">
      <div class="header-top">
        <a class="logo" href="index.html"><img src="assets/header_logo_dark.png" alt="NE_Books"></a>
        <div class="search">
          <input type="text" class="search-input" placeholder="검색어를 입력해 주세요." autocomplete="off">
          <button type="button" class="search-ic ico" aria-label="검색"><img src="assets/ds_ic_search.svg" alt=""></button>
          <div class="search-pop" hidden></div>
        </div>
        <div class="head-icons">
          <a class="head-ic" href="index.html"><span class="ico"><img src="assets/ic_login_d.svg" alt=""></span><span>로그인</span></a>
          <div class="head-ic-wrap">
            <a class="head-ic" href="마이페이지.html"><span class="ico"><img src="assets/ic_my_d.svg" alt=""></span><span>MY</span></a>
            <div class="my-drop" role="menu">
              <a href="마이페이지.html#home">홈</a>
              <a href="마이페이지.html#orders">주문내역</a>
              <a href="마이페이지.html#points">포인트</a>
              <a href="고객센터.html#errata">교재 오류정정</a>
              <a href="마이페이지.html#wish">찜</a>
              <a href="마이페이지.html#qna">문의/답변</a>
              <a href="마이페이지.html#review">후기</a>
              <a href="마이페이지.html#event">이벤트/세미나</a>
              <a href="index.html" class="logout">로그아웃</a>
            </div>
          </div>
          <a class="head-ic" href="장바구니.html"><span class="ico"><img src="assets/ic_bag.svg" alt=""><span class="cart-badge" data-count="0" hidden>0</span></span><span>장바구니</span></a>
          <div class="head-ic-wrap">
            <a class="head-ic" href="고객센터.html"><span class="ico"><img src="assets/ic_customer_d.svg" alt=""></span><span>고객센터</span></a>
            <div class="my-drop cs-drop" role="menu">
              <a href="고객센터.html#notice">공지사항</a>
              <a href="고객센터.html#faq">FAQ</a>
              <a href="고객센터.html#event">이벤트/신간·개정/세미나</a>
              <a href="고객센터.html#errata">교재 오류정정</a>
              <a href="고객센터.html#qna">1:1문의</a>
              <a href="고객센터.html#branch">지사안내</a>
            </div>
          </div>
        </div>
      </div>
      <div class="gnb">
        <div class="gnb-in">
          <button type="button" class="ico menu" aria-label="전체메뉴 열기" aria-expanded="false" aria-controls="mobileDrawer"><img src="assets/ds_ic_menu.svg" alt=""></button>
          <nav>
            <a href="리스트_교재구매.html">ELT</a>
            <a href="#">초/중등</a>
            <a href="#">고등</a>
            <a href="#">교과서/자습서</a>
            <a href="#">수험/일반</a>
            <a href="#">수학/국어</a>
            <a href="#">학습자료실</a>
            <a href="#">도서몰</a>
          </nav>
        </div>
        <div class="gnb-drop" id="gnbDrop">
          <div class="gd-cats"></div>
          <div class="gd-brands">
            <a class="gd-btn blue" href="#">Come on Series <span>&#8250;</span></a>
            <a class="gd-btn navy" href="oxford.html">Oxford <span>&#8250;</span></a>
          </div>
        </div>
      </div>
    </div>
  </header>`;
  var FOOTER = `<footer class="footer">
    <div class="container">
      <div class="foot-top">
        <div class="foot-nav">
          <a href="#">개인정보처리방침</a><a href="#">이용약관</a><a href="#">이메일무단수집거부</a><a href="#">지사안내</a>
        </div>
        <div class="foot-right">
          <span class="ch">Ch</span>
          <span class="yt ico"><img src="assets/footer_youtube.svg" alt="유튜브"></span>
          <span class="fam">FAMILY SITE <span class="ic ico"><img src="assets/footer_familysite.svg" alt=""></span></span>
        </div>
      </div>
      <div class="foot-main">
        <div class="foot-info">
          <p>㈜NE능률 (03925) 서울특별시 마포구 월드컵북로 396(상암동) 누리꿈스퀘어 비즈니스타워 10층 <span class="sep">|</span> 대표이사 : 이정진 <span class="sep">|</span> 대표번호 : 02-2014-7114 <span class="lk">사업별 고객센터 안내</span></p>
          <p>팩스 : 02-337-4956 <span class="sep">|</span> 고객센터 : 1833-8368 <span class="sep">|</span> 사업자등록번호 : 105-81-65267 <span class="sep">|</span> 통신판매신고번호 : 제2004-02120호 <span class="lk">정보조회</span></p>
          <p>개인정보 보호책임자(CPO) : 선민재(necpo@neungyule.com)</p>
          <p>Copyright ⓒ NE Neungyule, Inc. All Rights Reserved</p>
        </div>
        <div class="foot-logo"><img src="assets/footer_logo.png" alt="NE능률"></div>
      </div>
    </div>
  </footer>`;
  var h=document.getElementById('site-header'); if(h) h.innerHTML=HEADER;
  var f=document.getElementById('site-footer'); if(f) f.innerHTML=FOOTER;

  /* ===== 모바일 전체메뉴 드로어 (햄버거) =====
     공통 헤더의 ≡ 버튼 클릭 → 좌측 드로어 열림. 전 GNB 항목 + 하위메뉴 노출.
     항목 링크는 실제 페이지(리스트_교재구매.html)로 이동 가능. 닫기: X·배경·ESC. */
  (function(){
    var toggle=document.querySelector('.gnb-in .menu'); if(!toggle) return;
    var DRAWER_MENU=[
      {name:'ELT', sub:['Coursebook','Phonics','Readers','Reading','Listening','Speaking','Writing','Grammar','Vocabulary']},
      {name:'초/중등', sub:['중학내신','고등선행','어휘','Phonics','쓰기','독해','듣기','문법/구문']},
      {name:'고등', sub:['어휘','독해','듣기','문법/구문','수능대비','고교내신']},
      {name:'교과서/자습서', sub:['중학영어 교과서','고등영어 교과서','수학 교과서','중국어/일본어']},
      {name:'수험/일반', sub:['TOEIC','TOEIC S/W','TOEFL/OPIC/TEPS','FLEX','일반영어']},
      {name:'수학/국어', sub:['유아','초등','중등','고등']},
      {name:'학습자료실', sub:['ELT자료','초/중등교재 자료','고등교재 자료','교과서/자습서 자료']},
      {name:'도서몰', sub:['ELT','초/중등','고등영어 교과서','교과서/자습서','수험/일반']}
    ];
    var LINK='리스트_교재구매.html';
    var sections=DRAWER_MENU.map(function(m){
      return '<div class="md-sec"><a class="md-cat" href="'+LINK+'">'+m.name+'</a>'
        +'<div class="md-subs">'+m.sub.map(function(s){ return '<a class="md-sub" href="'+LINK+'">'+s+'</a>'; }).join('')+'</div></div>';
    }).join('');
    var drawer=document.createElement('div');
    drawer.className='mdrawer';
    drawer.id='mobileDrawer';
    drawer.hidden=true;
    drawer.innerHTML='<div class="md-backdrop" data-close></div>'
      +'<nav class="md-panel" role="dialog" aria-modal="true" aria-label="전체메뉴">'
      +'<div class="md-head"><span class="md-title">전체메뉴</span>'
      +'<button type="button" class="md-x" data-close aria-label="메뉴 닫기">&times;</button></div>'
      +'<div class="md-body">'+sections+'</div></nav>';
    document.body.appendChild(drawer);

    var lastFocus=null;
    function openDrawer(){
      lastFocus=document.activeElement;
      drawer.hidden=false;
      /* reflow 후 transition 발동 */
      void drawer.offsetWidth;
      drawer.classList.add('open');
      toggle.setAttribute('aria-expanded','true');
      document.body.style.overflow='hidden';
      var firstLink=drawer.querySelector('.md-x'); if(firstLink) firstLink.focus();
    }
    function closeDrawer(){
      drawer.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
      var onEnd=function(){ drawer.hidden=true; drawer.removeEventListener('transitionend',onEnd); };
      drawer.addEventListener('transitionend',onEnd);
      /* transition이 없을 경우 대비 */
      setTimeout(function(){ if(!drawer.classList.contains('open')) drawer.hidden=true; },300);
      if(lastFocus && lastFocus.focus) lastFocus.focus();
    }
    toggle.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation();
      if(drawer.classList.contains('open')) closeDrawer(); else openDrawer(); });
    drawer.addEventListener('click',function(e){ if(e.target.hasAttribute('data-close')) closeDrawer(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape' && drawer.classList.contains('open')) closeDrawer(); });
  })();

  /* ===== 장바구니 수량 뱃지 (상품이 담기면 N 표시) ===== */
  /* 페이지에서 window.CART_COUNT = N 으로 실제 수량을 넣을 수 있음. 미지정 시 데모값 2. */
  (function(){
    var badge=document.querySelector('.cart-badge'); if(!badge) return;
    var n=(typeof window.CART_COUNT==='number') ? window.CART_COUNT : 2;
    if(n>0){ badge.textContent=(n>99?'99+':n); badge.setAttribute('data-count',n); badge.hidden=false; }
    else { badge.hidden=true; }
  })();

  /* ===== 로케이션 (페이지별 depth 이름을 여기서 수정) ===== */
  var CATEGORIES={
    'ELT':['Coursebook','Phonics','Readers','Reading','Listening','Speaking','Writing','Grammar','Vocabulary']
  };
  var PAGES={
    '리스트_교재구매.html':{type:'cat', d1:'ELT', d2:'Coursebook', tag:'NE Build & Grow English Website'},
    '리스트_학습자료.html':{type:'cat', d1:'ELT', d2:'Coursebook', tag:'NE Build & Grow English Website'},
    '교재상세.html':{type:'cat', d1:'ELT', d2:'Coursebook'},
    '장바구니.html':{type:'simple', title:'장바구니', crumb:['장바구니']},
    '주문결제.html':{type:'simple', title:'주문 / 결제', crumb:['주문 / 결제']},
    '주문완료.html':{type:'simple', title:'주문 / 결제', crumb:['주문 / 결제']},
    '마이페이지.html':{type:'simple', title:'마이페이지', crumb:['마이페이지','홈']},
    '주문상세.html':{type:'simple', title:'주문내역', crumb:['마이페이지','주문내역']},
    '문의답변상세.html':{type:'simple', title:'문의/답변', crumb:['마이페이지','문의/답변']},
    '고객센터.html':{type:'simple', title:'공지사항', crumb:['고객센터','공지사항']},
    '공지사항상세.html':{type:'simple', title:'공지사항', crumb:['고객센터','공지사항']},
    '오류정정상세.html':{type:'simple', title:'교재 오류정정', crumb:['고객센터','교재 오류정정']},
    '비회원문의.html':{type:'simple', title:'1:1 문의', crumb:['고객센터','1:1 문의']},
    '이벤트상세.html':{type:'simple', title:'이벤트 / 신간·개정 / 세미나', crumb:['고객센터','이벤트 / 신간·개정 / 세미나']},
    '신간개정상세.html':{type:'simple', title:'이벤트 / 신간·개정 / 세미나', crumb:['고객센터','이벤트 / 신간·개정 / 세미나']},
    '세미나상세.html':{type:'simple', title:'이벤트 / 신간·개정 / 세미나', crumb:['고객센터','이벤트 / 신간·개정 / 세미나']}
  };
  (function(){
    var el=document.getElementById('site-location'); if(!el) return;
    var file=decodeURIComponent((location.pathname.split('/').pop()||''));
    var p=PAGES[file]; if(!p) return;
    var crumb='<a class="home ico" href="index.html"><img src="assets/ic_home.svg" alt="홈"></a>';
    var left;
    if(p.type==='cat'){
      var opts=(CATEGORIES[p.d1]||[]).map(function(o){ return '<a href="리스트_교재구매.html">'+o+'</a>'; }).join('');
      crumb+='<span class="sep">·</span><a href="리스트_교재구매.html">'+p.d1+'</a>'
        +'<span class="sep">·</span><span class="cur-wrap" id="bcCat"><button type="button" class="cur">'+p.d2+' <span class="caret">&#9662;</span></button><div class="cur-menu">'+opts+'</div></span>';
      left='<h1 class="ph-title">'+p.d2+'</h1>'+(p.tag?'<span class="ph-tag">'+p.tag+'</span>':'');
    } else {
      crumb+=p.crumb.map(function(c,i){ return '<span class="sep">·</span>'+((i===p.crumb.length-1)?'<span class="cur">'+c+'</span>':'<a href="#">'+c+'</a>'); }).join('');
      left='<h1 class="ph-title">'+p.title+'</h1>';
    }
    el.innerHTML='<section class="pagehead"><div class="container cart-head-row"><div class="ph-left">'+left+'</div><div class="crumb">'+crumb+'</div></div></section>';
    var wrap=document.getElementById('bcCat');
    if(wrap){
      var btn=wrap.querySelector('.cur');
      btn.addEventListener('click',function(e){ e.stopPropagation(); wrap.classList.toggle('open'); });
      document.addEventListener('click',function(e){ if(!wrap.contains(e.target)) wrap.classList.remove('open'); });
      document.addEventListener('keydown',function(e){ if(e.key==='Escape') wrap.classList.remove('open'); });
    }
  })();

  /* GNB 메가메뉴 드롭다운 */
  var gnb=document.querySelector('.gnb'); if(!gnb) return;
  var drop=document.getElementById('gnbDrop'); if(!drop) return;
  var items=[].slice.call(gnb.querySelectorAll('nav a'));
  var MENU={
    'ELT':['Coursebook','Phonics','Readers','Reading','Listening','Speaking','Writing','Grammar','Vocabulary'],
    '초/중등':['중학내신','고등선행','어휘','Phonics','쓰기','독해','듣기','문법/구문','TOEFL/TEPS/NELT'],
    '고등':['어휘','독해','듣기','문법/구문','수능대비','고교내신','단기특강','TOEFL/TEPS/NELT'],
    '교과서/자습서':['중학영어 교과서','고등영어 교과서','수학 교과서','중국어/일본어'],
    '수험/일반':['TOEIC','TOEIC Speaking/Writing','TOEFL/OPIC/TEPS','FLEX','일반영어'],
    '수학/국어':['유아','초등','중등','고등'],
    '학습자료실':['서브메인','ELT자료','초/중등교재 자료','고등교재 자료','교과서/자습서 자료','수험/일반 자료','수학/국어 자료'],
    '도서몰':['ELT','초/중등','고등영어 교과서','교과서/자습서','수험/일반','교구/부가상품','세트/패키지','온라인 서비스/이용권']
  };
  var closeT;
  function openFor(a){
    var name=a.textContent.trim();
    var mega=(name==='학습자료실'||name==='도서몰');
    var BR='<div class="gd-brands"><a class="gd-btn blue" href="#">Come on Series <span>&#8250;</span></a><a class="gd-btn navy" href="oxford.html">Oxford <span>&#8250;</span></a></div>';
    if(mega){
      var COLS=[['ELT','Coursebook','Phonics','Reading','Readers','Listening','Speaking','Grammar','Writing','Vocabulary'],['초등/중등','중학 내신','고등 선행','파닉스','어휘','쓰기','독해','듣기','문법/구분','TOEFL/TEPS/NELT'],['고등','어휘','독해','듣기','문법/구분','수능 대비','고교 내신','단기 특강','TOEFL/TEPS/NELT'],['교과서/자습서','중학영어 교과서','고등영어 교과서','수학 교과서','중국어/일본어'],['수험/일반','TOEIC','TOEIC SPEAKING|/WRITING','TOEFL/OPIC/TEPS','FLEX','일반영어'],['수학/국어','유아','초등','중등','고등']];
      drop.innerHTML=COLS.map(function(c){ return '<div class="gd-col"><p class="gd-col-t">'+c[0]+'</p><div class="items">'+c.slice(1).map(function(i){ return '<a href="리스트_교재구매.html">'+i.replace('|','<br>')+'</a>'; }).join('')+'</div></div>'; }).join('')+BR;
      drop.classList.add('mega');
    } else {
      var list=MENU[name]; if(!list){ hideGnb(); return; }
      drop.innerHTML='<div class="gd-cats">'+list.map(function(t){ return '<a href="리스트_교재구매.html">'+t+'</a>'; }).join('')+'</div>'+BR;
      drop.classList.remove('mega');
    }
    items.forEach(function(x){ x.classList.toggle('on',x===a); });
    drop.classList.add('open');
    if(mega){ var gw=gnb.getBoundingClientRect().width; var ml=Math.round((gw-drop.offsetWidth)/2); drop.style.left=(ml>0?ml:0)+'px'; }
    else{
      var gr=gnb.getBoundingClientRect(), ir=a.getBoundingClientRect();
      var left=Math.round(ir.left-gr.left-24);
      var maxLeft=Math.round(gr.width-drop.offsetWidth);
      if(left>maxLeft) left=maxLeft; if(left<0) left=0;
      drop.style.left=left+'px';
    }
  }
  function hideGnb(){ drop.classList.remove('open'); items.forEach(function(x){ x.classList.remove('on'); }); }
  items.forEach(function(a){
    a.addEventListener('mouseenter',function(){ clearTimeout(closeT); openFor(a); });
    a.addEventListener('click',function(e){ if(MENU[a.textContent.trim()]){ e.preventDefault(); openFor(a); } });
  });
  gnb.addEventListener('mouseleave',function(){ closeT=setTimeout(hideGnb,160); });
  gnb.addEventListener('mouseenter',function(){ clearTimeout(closeT); });
  document.addEventListener('click',function(e){ if(!gnb.contains(e.target)) hideGnb(); });
})();
