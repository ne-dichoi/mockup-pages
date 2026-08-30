/* 공용 레이아웃 — 헤더(GNB) + 푸터를 각 페이지의 자리표시자에 주입.
   각 페이지: <div id="site-header"></div> ... <div id="site-footer"></div> + <script src="js/layout.js" defer></script>
   (defer 라 DOM 파싱 후 실행되며, 기존 페이지의 인라인 GNB 스크립트는 헤더 주입 전 실행돼 자동 종료됨) */
(function(){
  var NE_MEGA3D=null;   /* GNB·햄버거 공용 3뎁스 데이터(아래 GNB 블록에서 채움) */
  var NE_MEGA_NEW=null; /* 신간 라벨 표시할 시리즈 집합(아래 GNB 블록에서 채움) */
  /* 시리즈명 뒤에 붙일 신간 라벨(깜빡이는 빨강 아웃라인 알약) */
  function neNewLabel(s){ return (NE_MEGA_NEW && NE_MEGA_NEW[s]) ? '<span class="mega-new">신간</span>' : ''; }
  var HEADER = `<header class="lheader">
    <div class="container">
      <div class="header-top">
        <a class="logo" href="index.html"><img src="assets/header_logo_dark.png" alt="NE_Books"></a>
        <div class="m-loc"><a class="m-loc-home" href="index.html" aria-label="홈"><img src="assets/ic_home_sub.svg" alt="홈"></a><button class="m-loc-btn" type="button" aria-expanded="false"><span class="m-loc-name"></span><span class="m-loc-caret"></span></button></div>
        <div class="search">
          <input type="text" class="search-input" placeholder="검색어를 입력해 주세요." autocomplete="off">
          <button type="button" class="search-ic ico" aria-label="검색"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="#1D1717" stroke-width="2"/><path d="M16.5 16.5l4.5 4.5" stroke="#1D1717" stroke-width="2" stroke-linecap="round"/></svg></button>
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
        <button class="m-menu only-mo" type="button" aria-label="전체메뉴"><img src="assets/ic_menu_line.svg" alt="전체메뉴"></button>
        <button class="m-catclose only-mo" type="button" aria-label="카테고리 닫기"></button>
      </div>
      <div class="gnb">
        <div class="gnb-in">
          <span class="ico menu"><img src="assets/ds_ic_menu.svg" alt="전체메뉴"></span>
          <nav>
            <a href="리스트_교재구매.html">ELT</a>
            <a href="#">초/중등</a>
            <a href="#">고등</a>
            <a href="#">교과서/자습서</a>
            <a href="#">수험/일반</a>
            <a href="#">수학/국어</a>
            <a href="#" class="gnb-blue">학습자료실</a>
            <a href="리스트_교재구매.html" class="gnb-blue gnb-mall" aria-label="교재몰"><span class="gnb-roll"><span class="gr-track"><span class="gr-i">교재몰</span><span class="gr-i sub">지금 바로구매</span></span></span></a>
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
    <!-- 모바일 서브페이지 카테고리 드롭다운 -->
    <div class="mcat" id="mCat" aria-hidden="true">
      <div class="mcat-dim"></div>
      <nav class="mcat-panel" aria-label="카테고리 목록">
        <a class="mcat-item" href="리스트_교재구매.html">Coursebook</a>
        <a class="mcat-item" href="리스트_교재구매.html">Phonics</a>
        <a class="mcat-item" href="리스트_교재구매.html">Readers</a>
        <a class="mcat-item" href="리스트_교재구매.html">Reading</a>
        <a class="mcat-item" href="리스트_교재구매.html">Listening</a>
        <a class="mcat-item" href="리스트_교재구매.html">Speaking</a>
        <a class="mcat-item" href="리스트_교재구매.html">Writing</a>
        <a class="mcat-item" href="리스트_교재구매.html">Grammar</a>
        <a class="mcat-item" href="리스트_교재구매.html">Vocabulary</a>
      </nav>
    </div>
  </header>
  <div class="m-drawer" id="mDrawer" aria-hidden="true">
    <div class="md-dim"></div>
    <div class="md-panel">
    <div class="md-top">
      <a class="md-home" href="index.html" aria-label="홈"><img src="assets/ic_home_sub.svg" alt=""></a>
      <span class="md-auth"><a href="index.html">로그인</a></span>
      <div class="md-top-ic">
        <button class="md-search" type="button" aria-label="검색"><img src="assets/ds_ic_search.svg" alt=""></button>
        <a class="md-cart" href="장바구니.html" aria-label="장바구니"><img src="assets/ic_bag.svg" alt=""></a>
        <button class="md-x" type="button" aria-label="닫기"></button>
      </div>
    </div>
    <div class="md-quick">
      <a class="md-q" href="리스트_교재구매.html"><span class="md-q-ic"><img src="assets/ic_float_recommend.svg" alt=""></span><span class="md-q-t">교재 추천</span></a>
      <a class="md-q" href="마이페이지.html#wish"><span class="md-q-ic"><img src="assets/ic_heart.svg" alt=""></span><span class="md-q-t">찜</span></a>
      <a class="md-q" href="마이페이지.html#orders"><span class="md-q-ic"><img src="assets/ic_res_doc.svg" alt=""></span><span class="md-q-t">주문내역</span></a>
      <a class="md-q" href="고객센터.html#qna"><span class="md-q-ic"><img src="assets/ic_11.svg" alt=""></span><span class="md-q-t">1:1문의</span></a>
    </div>
    <div class="md-body">
      <div class="md-cats" id="mdCats"></div>
      <div class="md-subs" id="mdSubs"></div>
    </div>
    </div>
  </div>
  <div class="msearch" id="mSearch" hidden aria-hidden="true">
    <div class="msearch-bar">
      <div class="msearch-field">
        <input type="text" class="msearch-input" placeholder="상품 검색" autocomplete="off">
        <button type="button" class="msearch-go" aria-label="검색"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7.25" stroke="#1d1717" stroke-width="1.8"/><path d="M16.5 16.5l4 4" stroke="#1d1717" stroke-width="1.8" stroke-linecap="round"/></svg></button>
      </div>
      <button type="button" class="msearch-cancel">취소</button>
    </div>
    <div class="msearch-hot">
      <div class="msearch-hot-head"><h3>인기 검색어</h3><span class="msearch-hot-note">* 최근 10일간 인기 검색어 입니다.</span></div>
      <ol class="msearch-hot-list">
        <li><span class="rk">1</span><a href="리스트_교재구매.html">능률VOCA</a></li>
        <li><span class="rk">2</span><a href="리스트_교재구매.html">Course book</a></li>
        <li><span class="rk">3</span><a href="리스트_교재구매.html">E-book</a></li>
        <li><span class="rk">4</span><a href="리스트_교재구매.html">단어장</a></li>
        <li><span class="rk">5</span><a href="리스트_교재구매.html">영어문법</a></li>
        <li><span class="rk">6</span><a href="리스트_교재구매.html">중등문법</a></li>
        <li><span class="rk">7</span><a href="리스트_교재구매.html">리딩튜터</a></li>
        <li><span class="rk">8</span><a href="리스트_교재구매.html">중등독해</a></li>
        <li><span class="rk">9</span><a href="리스트_교재구매.html">주니어 리딩튜터</a></li>
        <li><span class="rk">10</span><a href="리스트_교재구매.html">grammar</a></li>
      </ol>
    </div>
    <ul class="msearch-results" hidden></ul>
  </div>`;
  var FOOTER = `<footer class="footer">
    <div class="container">
      <div class="foot-pc only-pc">
        <div class="foot-top">
          <div class="foot-nav">
            <a href="#">개인정보처리방침</a><a href="#">이용약관</a><a href="#">이메일무단수집거부</a><a href="#">지사안내</a>
          </div>
          <div class="foot-right">
            <span class="fam">FAMILY SITE <span class="ic ico"><img src="assets/footer_familysite.svg" alt=""></span></span>
          </div>
        </div>
        <div class="foot-main">
          <div class="foot-info">
            <p>㈜NE능률 (03925) 서울특별시 마포구 월드컵북로 396(상암동) 누리꿈스퀘어 비즈니스타워 10층<span class="sep">|</span>대표이사 : 이정진<span class="sep">|</span>대표번호 : 02-2014-7114<span class="lk">사업별 고객센터 안내</span></p>
            <p>팩스 : 02-337-4956<span class="sep">|</span>고객센터 : 1833-8368<span class="sep">|</span>사업자등록번호 : 105-81-65267<span class="sep">|</span>통신판매신고번호 : 제2004-02120호<span class="lk">정보조회</span></p>
            <p>개인정보 보호책임자(CPO) : 선민재(necpo@neungyule.com)</p>
            <p>Copyright ⓒ NE Neungyule, Inc. All Rights Reserved</p>
          </div>
          <div class="foot-logo"><img src="assets/footer_logo.png" alt="NE능률"></div>
        </div>
      </div>
      <div class="foot-mo only-mo">
        <div class="fm-top">
          <div class="fm-logo"><img src="assets/footer_logo.png" alt="NE능률"></div>
          <span class="fm-fam">FAMILY SITE <span class="ic ico"><img src="assets/footer_familysite.svg" alt=""></span></span>
        </div>
        <div class="fm-nav">
          <a href="#">개인정보처리방침</a><a href="#">이용약관</a><a href="#">이메일무단수집거부</a><a href="#">지사안내</a>
        </div>
        <div class="fm-info">
          <p>㈜NE능률 (03925) 서울특별시 마포구 월드컵북로 396(상암동) 누리꿈스퀘어 비즈니스타워 10층</p>
          <p>대표이사 : 이정진</p>
          <p>대표번호 : 02-2014-7114 <a class="lk" href="#">사업별 고객센터 안내</a></p>
          <p>팩스 : 02-337-4956</p>
          <p>고객센터 : 1833-8368</p>
          <p>사업자등록번호 : 105-81-65267</p>
          <p>통신판매신고번호 : 제2004-02120호 <a class="lk" href="#">정보조회</a></p>
          <p>개인정보 보호책임자(CPO) : 선민재(necpo@neungyule.com)</p>
        </div>
        <div class="fm-copy">Copyright ⓒ NE Neungyule, Inc. All Rights Reserved</div>
      </div>
    </div>
  </footer>`;
  var h=document.getElementById('site-header'); if(h) h.innerHTML=HEADER;
  var f=document.getElementById('site-footer'); if(f) f.innerHTML=FOOTER;

  /* ===== 모바일 GNB 자동 숨김/표시 (아래로 스크롤=숨김, 위로 스크롤=표시+그림자 고정) ===== */
  (function(){
    var header=document.getElementById('site-header');
    if(!header) return;
    var mq=window.matchMedia('(max-width:767px)');
    var lastY=window.pageYOffset||0, ticking=false;
    function setStick(){
      /* sticky 서브탭(교재상세 등)이 항상 '보이는 헤더' 바로 아래에 붙도록: 헤더 숨김=0, 표시=74 */
      document.documentElement.style.setProperty('--m-stick', header.classList.contains('hdr-hidden') ? '0px' : '74px');
    }
    function apply(){
      ticking=false;
      if(!mq.matches){ header.classList.remove('hdr-hidden','hdr-shown'); document.documentElement.style.setProperty('--m-stick','74px'); return; }
      /* 모바일 전체메뉴(드로어) 열림 중에는 헤더(햄버거) 계속 노출 유지 */
      if(header.classList.contains('drawer-open')){ header.classList.remove('hdr-hidden'); lastY=window.pageYOffset||0; setStick(); return; }
      var y=window.pageYOffset||0;
      var goingDown = y>lastY;
      if(y>80 && goingDown){ header.classList.add('hdr-hidden'); }
      else if(!goingDown || y<=80){ header.classList.remove('hdr-hidden'); }
      header.classList.toggle('hdr-shown', y>4 && !header.classList.contains('hdr-hidden'));
      lastY = y<0 ? 0 : y;
      setStick();
    }
    window.addEventListener('scroll',function(){ if(!ticking){ requestAnimationFrame(apply); ticking=true; } },{passive:true});
    window.addEventListener('resize',apply);
    apply();
  })();

  /* ===== PC GNB 고정 (아래로=상단행 접고 메뉴 고정, 위로=전체 노출) — 전 페이지 =====
     헤더를 fixed로 두고 body 상단 여백을 헤더 높이만큼 확보 → 접혀도 콘텐츠 리플로우 없음(떨림 방지) */
  (function(){
    var header=document.getElementById('site-header'); if(!header) return;
    var mq=window.matchMedia('(min-width:1024px)');
    var lastY=window.pageYOffset||0, ticking=false;
    var fullH=145, gnbH=58;
    /* sticky 서브탭/사이드가 항상 '현재 헤더 높이' 바로 아래에 붙도록 --stick-top 갱신
       (헤더가 위로 스크롤 시 펼쳐져도 탭이 덮이지 않게) */
    function setStick(){
      if(!mq.matches){ document.body.style.removeProperty('--stick-top'); return; }
      var h=header.classList.contains('pc-collapsed')?gnbH:fullH;
      document.body.style.setProperty('--stick-top', h+'px');
    }
    function measure(){
      if(!mq.matches){ document.body.style.removeProperty('--hdr-h'); document.body.style.removeProperty('--gnb-h'); document.body.style.removeProperty('--stick-top'); return; }
      header.classList.remove('pc-collapsed');
      var lh=header.querySelector('.lheader');
      var gnb=header.querySelector('.gnb');
      fullH=lh?Math.round(lh.getBoundingClientRect().height):145;
      if(gnb) gnbH=Math.round(gnb.getBoundingClientRect().height);
      document.body.style.setProperty('--hdr-h', fullH+'px');
      document.body.style.setProperty('--gnb-h', gnbH+'px');
      setStick();
    }
    function apply(){
      ticking=false;
      if(!mq.matches){ header.classList.remove('pc-collapsed'); lastY=window.pageYOffset||0; setStick(); return; }
      var y=window.pageYOffset||0; if(y<0) y=0;
      if(y<=100){ header.classList.remove('pc-collapsed'); lastY=y; setStick(); return; }
      var dy=y-lastY;
      /* 방향 데드존(10px): 미세 스크롤로 토글이 튀지 않도록 */
      if(dy>10){ header.classList.add('pc-collapsed'); lastY=y; setStick(); }
      else if(dy<-10){ header.classList.remove('pc-collapsed'); lastY=y; setStick(); }
    }
    /* 서브탭 클릭 시: 헤더를 접힌 상태로 고정하고 스크롤 기준선을 목적지로 맞춰
       이후 stray 스크롤 이벤트로 다시 펼쳐지지 않게 함(오프셋 어긋남 방지) */
    window.__pcHeaderStick={
      collapsedTop:function(){ return mq.matches?gnbH:0; },
      collapseTo:function(y){
        if(!mq.matches) return;
        header.classList.add('pc-collapsed');
        lastY=y;
        setStick();
      }
    };
    window.addEventListener('scroll',function(){ if(!ticking){ requestAnimationFrame(apply); ticking=true; } },{passive:true});
    window.addEventListener('resize',function(){ measure(); apply(); });
    measure(); apply();
  })();

  /* ===== 모바일 서브페이지 GNB 카테고리 드롭다운 (Coursebook ∨ 클릭 → 펼침) ===== */
  (function(){
    var header=document.getElementById('site-header');
    var mcat=document.getElementById('mCat');
    var btn=header&&header.querySelector('.m-loc-btn');
    if(!header||!mcat||!btn) return;
    var dim=mcat.querySelector('.mcat-dim');
    var closeBtn=header.querySelector('.m-catclose');
    var nameEl=header.querySelector('.m-loc-name');
    function markActive(){
      /* data-active 가 지정되면 그 값으로 포커스(예: 마이페이지 탭 전환 시 GNB명과 별개로 활성 메뉴 지정) */
      var override=mcat.getAttribute('data-active');
      var cur=(override!=null?override:((nameEl&&nameEl.textContent)||'')).trim().toLowerCase();
      mcat.querySelectorAll('.mcat-item').forEach(function(a){
        a.classList.toggle('on', a.textContent.trim().toLowerCase()===cur);
      });
    }
    function open(){ markActive(); header.classList.remove('hdr-hidden'); mcat.classList.add('open'); header.classList.add('mcat-open'); mcat.setAttribute('aria-hidden','false'); btn.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; }
    function close(){ mcat.classList.remove('open'); header.classList.remove('mcat-open'); mcat.setAttribute('aria-hidden','true'); btn.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }
    btn.addEventListener('click',function(e){ e.preventDefault(); mcat.classList.contains('open')?close():open(); });
    if(dim) dim.addEventListener('click',close);
    if(closeBtn) closeBtn.addEventListener('click',close);
    /* 카테고리 항목 터치 → 해당 메뉴로 이동하면서 펼침 패널도 닫기(현재 페이지와 동일 URL이라 리로드가 없어도 닫힘). 항목은 페이지별로 재생성되므로 위임 처리 */
    mcat.addEventListener('click',function(e){ if(e.target.closest('.mcat-item')) close(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&mcat.classList.contains('open')) close(); });
  })();

  /* ===== 모바일 통합검색 진입화면 (GNB 검색 아이콘 → 오른쪽에서 슬라이드 인) ===== */
  (function(){
    var header=document.getElementById('site-header'); if(!header) return;
    var ms=document.getElementById('mSearch'); if(!ms) return;
    var input=ms.querySelector('.msearch-input');
    var hot=ms.querySelector('.msearch-hot');
    var results=ms.querySelector('.msearch-results');
    function isMobile(){ return window.matchMedia('(max-width:1023px)').matches; }
    /* 자동완성 샘플 교재 데이터 */
    var BOOKS=['능률VOCA 어원편','능률VOCA 수능완성','능률VOCA 고교필수','Grammar Zone 기본편 1','Grammar Zone 입문편','리딩튜터 입문','주니어 리딩튜터','주니어 능률VOCA','Bricks Reading 150 Level 1','중학영문법 3800제','수능특강 영어','세 마리 토끼 잡는 초등 독서논술 A1','올클 중등 국어 문법','중등독해 완성','영어문법 총정리'];
    function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
    function renderResults(q){
      if(!q){ if(results){ results.hidden=true; results.innerHTML=''; } if(hot) hot.hidden=false; return; }
      if(hot) hot.hidden=true; if(!results) return; results.hidden=false;
      var list=BOOKS.filter(function(b){return b.toLowerCase().indexOf(q.toLowerCase())>=0;});
      if(!list.length){ results.innerHTML='<li class="msearch-empty">\''+esc(q)+'\'에 대한 검색 결과가 없습니다.</li>'; return; }
      results.innerHTML=list.map(function(b){ return '<li><a href="검색결과.html?q='+encodeURIComponent(b)+'">'+esc(b)+'</a></li>'; }).join('');
    }
    if(input) input.addEventListener('input',function(){ renderResults(input.value.trim()); });
    function open(){ ms.hidden=false; ms.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; if(input) input.value=''; renderResults(''); requestAnimationFrame(function(){ ms.classList.add('open'); }); setTimeout(function(){ try{ input.focus(); }catch(e){} },300); }
    function close(){ ms.classList.remove('open'); ms.setAttribute('aria-hidden','true'); document.body.style.overflow=''; setTimeout(function(){ ms.hidden=true; },300); }
    /* 상단 GNB 검색 아이콘(모바일): 데스크톱 검색동작(search.js)을 가로채 진입화면 오픈 */
    var topIc=header.querySelector('.search-ic');
    if(topIc){ topIc.addEventListener('click',function(e){ if(isMobile()){ e.preventDefault(); e.stopImmediatePropagation(); open(); } },true); }
    /* 전체메뉴 드로어 내 검색 버튼: 드로어 닫고 진입화면 오픈 */
    var drawerBtn=document.querySelector('.md-search');
    if(drawerBtn){ drawerBtn.addEventListener('click',function(e){ e.preventDefault(); var x=document.querySelector('.md-x'); if(x) x.click(); open(); }); }
    var cancel=ms.querySelector('.msearch-cancel'); if(cancel) cancel.addEventListener('click',close);
    var go=ms.querySelector('.msearch-go'); if(go) go.addEventListener('click',function(){ if(input&&input.value.trim()) location.href='검색결과.html?q='+encodeURIComponent(input.value.trim()); else if(input) input.focus(); });
    if(input){ input.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); if(input.value.trim()) location.href='검색결과.html?q='+encodeURIComponent(input.value.trim()); } else if(e.key==='Escape'){ close(); } }); }
    window.addEventListener('resize',function(){ if(!isMobile() && ms.classList.contains('open')) close(); });
  })();

  /* ===== 모바일 전체메뉴 드로어 (햄버거 → 좌 카테고리 / 우 하위목록) ===== */
  (function(){
    /* 교재 카테고리(ELT~수학/국어) — key=MEGA3D키, label=표시명. 3뎁스는 NE_MEGA3D 공용 데이터 사용 */
    var BOOKCATS=[
      {key:'ELT', label:'ELT'},
      {key:'초/중등', label:'초등/중등'},
      {key:'고등', label:'고등 영어'},
      {key:'교과서/자습서', label:'교과서/자습서'},
      {key:'수험/일반', label:'수험/일반'},
      {key:'수학/국어', label:'수학/국어'}
    ];
    var CS_LINKS=['고객센터.html#notice','고객센터.html#faq','고객센터.html#event','고객센터.html#errata','고객센터.html#qna','고객센터.html#branch'];
    var MY_LINKS=['마이페이지.html','마이페이지.html#orders','마이페이지.html#points','마이페이지.html#wish','마이페이지.html#qna','마이페이지.html#review','마이페이지.html#event','index.html'];
    var MENU=BOOKCATS.concat([
      {label:'학습자료실', all:true},
      {label:'교재몰', all:true},
      {label:'고객센터', subs:['공지사항','FAQ','이벤트/신간·개정/세미나','교재 오류정정','1:1문의','지사안내'], links:CS_LINKS},
      {label:'마이페이지', subs:['홈','주문내역','포인트','찜','문의/답변','후기','이벤트/세미나','로그아웃'], links:MY_LINKS}
    ]);
    var drawer=document.getElementById('mDrawer'); if(!drawer) return;
    var catsEl=drawer.querySelector('#mdCats'), subsEl=drawer.querySelector('#mdSubs');
    var menuBtn=document.querySelector('.m-menu'), closeBtn=drawer.querySelector('.md-close');
    var closeX=drawer.querySelector('.md-x');
    var siteHeader=document.getElementById('site-header');
    var active=0;
    function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
    /* 2뎁스 아코디언(헤더=2뎁스, 본문=3뎁스 시리즈, 기본 펼침) */
    function acc(catKey, sub){
      var arr=((NE_MEGA3D||{})[catKey]||{})[sub]||[];
      return '<div class="md-acc open"><button type="button" class="md-acc-h">'+esc(sub)+'<span class="md-acc-ic" aria-hidden="true"></span></button>'
        +'<div class="md-acc-body">'+arr.map(function(s){ return '<a class="md-sub" href="리스트_교재구매.html?d1='+encodeURIComponent(catKey)+'&d2='+encodeURIComponent(sub)+'&series='+encodeURIComponent(s)+'">'+esc(s)+neNewLabel(s)+'</a>'; }).join('')+'</div></div>';
    }
    function render(){
      catsEl.innerHTML=MENU.map(function(m,i){ return '<button type="button" class="md-cat'+(i===active?' on':'')+'" data-i="'+i+'">'+esc(m.label)+'</button>'; }).join('');
      var m=MENU[active];
      if(m.key && NE_MEGA3D && NE_MEGA3D[m.key]){
        /* 카테고리(ELT~수학/국어): 각 2뎁스를 아코디언으로, 3뎁스 시리즈 노출 */
        subsEl.innerHTML=Object.keys(NE_MEGA3D[m.key]).map(function(sub){ return acc(m.key, sub); }).join('');
      } else if(m.all){
        /* 학습자료실·도서몰: ELT~수학/국어 전체를 카테고리별 아코디언(2뎁스만) */
        subsEl.innerHTML=BOOKCATS.map(function(c){
          var subs=Object.keys((NE_MEGA3D||{})[c.key]||{});
          return '<div class="md-acc open"><button type="button" class="md-acc-h">'+esc(c.label)+'<span class="md-acc-ic" aria-hidden="true"></span></button>'
            +'<div class="md-acc-body">'+subs.map(function(s){ return '<a class="md-sub" href="리스트_교재구매.html?d1='+encodeURIComponent(c.key)+'&d2='+encodeURIComponent(s)+'">'+esc(s)+'</a>'; }).join('')+'</div></div>';
        }).join('');
      } else {
        var links=m.links;
        subsEl.innerHTML=(m.subs||[]).map(function(s,i){ return '<a class="md-sub" href="'+(links?links[i]:'리스트_교재구매.html')+'">'+esc(s)+'</a>'; }).join('');
      }
    }
    catsEl.addEventListener('click',function(e){ var b=e.target.closest('.md-cat'); if(!b)return; active=+b.dataset.i; render(); subsEl.scrollTop=0; });
    /* 아코디언 헤더 → 접기/펼치기 · 하위 링크 클릭 → 드로어 닫기(같은 페이지 해시 이동도 닫힘 반영) */
    subsEl.addEventListener('click',function(e){
      var h=e.target.closest('.md-acc-h'); if(h){ h.parentElement.classList.toggle('open'); return; }
      if(e.target.closest('.md-sub')) close(); /* 링크 기본 이동은 그대로 진행 */
    });
    function open(){ render(); /* GNB 블록이 채운 NE_MEGA3D 반영 */ drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; document.documentElement.style.overflow='hidden'; /* 스크롤 주체가 html이라 배경 잠금은 html에도 필요(왼쪽 카테고리 드래그 시 배경 스크롤/비침 방지) */
      if(siteHeader){ siteHeader.classList.remove('hdr-hidden'); siteHeader.classList.add('drawer-open'); } }
    function close(){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); document.body.style.overflow=''; document.documentElement.style.overflow='';
      if(siteHeader) siteHeader.classList.remove('drawer-open'); }
    if(menuBtn) menuBtn.addEventListener('click',open);
    /* PC GNB 전체메뉴(햄버거) 아이콘 클릭 → 동일 드로어(좌측 슬라이드) */
    var pcMenuBtn=document.querySelector('.gnb-in .ico.menu');
    if(pcMenuBtn){ pcMenuBtn.style.cursor='pointer'; pcMenuBtn.addEventListener('click',open); }
    if(closeBtn) closeBtn.addEventListener('click',close);
    if(closeX) closeX.addEventListener('click',close);
    var dim=drawer.querySelector('.md-dim'); if(dim) dim.addEventListener('click',close);
    document.addEventListener('keydown',function(e){ if(e.key==='Escape' && drawer.classList.contains('open')) close(); });
    render();
  })();

  /* ===== 장바구니 수량 뱃지 + 담기 헬퍼 (localStorage 로 페이지 간 유지) ===== */
  /* 뱃지 = 실제 장바구니 상품 수. 기본 3(장바구니 기본상품 3개). 리스트/상세에서 담은 상품은 ne_cart_added 에 저장 → 장바구니 페이지가 렌더 후 실제 수로 갱신. */
  (function(){
    var CKEY='ne_cart_count', AKEY='ne_cart_added';
    function readCount(){ var v=parseInt(localStorage.getItem(CKEY),10); if(isNaN(v)) v=(typeof window.CART_COUNT==='number')?window.CART_COUNT:3; return v<0?0:v; }
    function added(){ try{ return JSON.parse(localStorage.getItem(AKEY))||[]; }catch(e){ return []; } }
    function saveAdded(a){ try{ localStorage.setItem(AKEY,JSON.stringify(a||[])); }catch(e){} }
    function paint(n){
      var badge=document.querySelector('.cart-badge'); if(!badge) return;
      if(n>0){ badge.textContent=(n>99?'99+':n); badge.setAttribute('data-count',n); badge.hidden=false; }
      else { badge.textContent='0'; badge.setAttribute('data-count',0); badge.hidden=true; }
    }
    window.neCartCount=readCount;
    window.neCartAddedList=added;
    window.neCartSaveAdded=function(a){ saveAdded(a); };
    window.neCartSetCount=function(n){ n=n<0?0:n; try{ localStorage.setItem(CKEY,n); }catch(e){} paint(n); return n; };
    /* item(객체) 전달 시 추가목록에 담고, 항상 카운트 +1 */
    window.neCartAdd=function(item){ var n=readCount()+1; if(item&&typeof item==='object'){ var a=added(); a.push(item); saveAdded(a); } try{ localStorage.setItem(CKEY,n); }catch(e){} paint(n); return n; };
    window.neCartPaint=function(){ paint(readCount()); };
    paint(readCount());
  })();

  /* ===== 찜(위시리스트) 저장 헬퍼 (localStorage) ===== */
  (function(){
    var KEY='ne_wish';
    function list(){ try{ return JSON.parse(localStorage.getItem(KEY))||[]; }catch(e){ return []; } }
    function save(a){ try{ localStorage.setItem(KEY, JSON.stringify(a||[])); }catch(e){} }
    window.neWishList=list;
    window.neWishHas=function(id){ return list().some(function(x){ return x.id===id; }); };
    window.neWishAdd=function(item){ var a=list(); if(!a.some(function(x){return x.id===item.id;})){ a.unshift(item); save(a); } return true; };
    window.neWishRemove=function(id){ save(list().filter(function(x){ return x.id!==id; })); return false; };
    window.neWishToggle=function(item){ return window.neWishHas(item.id) ? window.neWishRemove(item.id) : window.neWishAdd(item); };
  })();

  /* ===== 로케이션 (페이지별 depth 이름을 여기서 수정) ===== */
  var CATEGORIES={
    'ELT':['Coursebook','Phonics','Readers','Reading','Listening','Speaking','Writing','Grammar','Vocabulary'],
    '초/중등':['중학내신','고등선행','어휘','Phonics','쓰기','독해','듣기','문법/구문','TOEFL/TEPS/NELT'],
    '고등':['어휘','독해','듣기','문법/구문','수능대비','고교내신','단기특강','TOEFL/TEPS/NELT'],
    '교과서/자습서':['중학영어 교과서','고등영어 교과서','수학 교과서','중국어/일본어'],
    '수험/일반':['TOEIC','TOEIC Speaking/Writing','TOEFL/OPIC/TEPS','FLEX','일반영어'],
    '수학/국어':['유아','초등','중등','고등'],
    '학습자료실':['서브메인','ELT자료','초/중등교재 자료','고등교재 자료','교과서/자습서 자료','수험/일반 자료','수학/국어 자료'],
    '도서몰':['ELT','초/중등','고등영어 교과서','교과서/자습서','수험/일반','교구/부가상품','세트/패키지','온라인 서비스/이용권']
  };
  /* 마이페이지 계열 모바일 펼침메뉴(캐럿 드롭다운) 항목 */
  var MY_MENU=[['홈','마이페이지.html'],['주문내역','마이페이지.html#orders'],['포인트','마이페이지.html#points'],['찜','마이페이지.html#wish'],['문의/답변','마이페이지.html#qna'],['후기','마이페이지.html#review'],['이벤트/세미나','마이페이지.html#event']];
  /* 고객센터 계열 모바일 펼침메뉴(캐럿 드롭다운) 항목 */
  var CS_MENU=[['공지사항','고객센터.html#notice'],['FAQ','고객센터.html#faq'],['이벤트/신간·개정/세미나','고객센터.html#event'],['교재 오류정정','고객센터.html#errata'],['1:1 문의','고객센터.html#qna'],['지사안내','고객센터.html#branch']];
  var PAGES={
    '리스트_교재구매.html':{type:'cat', d1:'ELT', d2:'Coursebook', tag:'NE Build & Grow English Website'},
    '리스트_학습자료.html':{type:'cat', d1:'ELT', d2:'Coursebook', tag:'NE Build & Grow English Website'},
    '교재상세.html':{type:'cat', d1:'ELT', d2:'Coursebook'},
    '장바구니.html':{type:'simple', title:'장바구니', crumb:['장바구니'], noMenu:true},
    '주문결제.html':{type:'simple', title:'주문 / 결제', crumb:['주문 / 결제'], noMenu:true},
    '주문완료.html':{type:'simple', title:'주문 / 결제', crumb:['주문 / 결제'], noMenu:true},
    '마이페이지.html':{type:'simple', title:'마이페이지', crumb:['마이페이지','홈'], menu:MY_MENU},
    '주문상세.html':{type:'simple', title:'주문내역', crumb:['마이페이지','주문내역'], menu:MY_MENU},
    '문의답변상세.html':{type:'simple', title:'문의/답변', crumb:['마이페이지','문의/답변'], menu:MY_MENU},
    '후기작성.html':{type:'simple', title:'후기', crumb:['마이페이지','후기'], menu:MY_MENU},
    '후기수정.html':{type:'simple', title:'후기', crumb:['마이페이지','후기'], menu:MY_MENU},
    '고객센터.html':{type:'simple', title:'공지사항', crumb:['고객센터','공지사항'], menu:CS_MENU},
    '공지사항상세.html':{type:'simple', title:'공지사항', crumb:['고객센터','공지사항'], menu:CS_MENU},
    '오류정정상세.html':{type:'simple', title:'교재 오류정정', crumb:['고객센터','교재 오류정정'], menu:CS_MENU},
    '비회원문의.html':{type:'simple', title:'1:1 문의', crumb:['고객센터','1:1 문의'], menu:CS_MENU},
    '이벤트상세.html':{type:'simple', title:'이벤트/신간·개정/세미나', crumb:['고객센터','이벤트/신간·개정/세미나'], menu:CS_MENU},
    '신간개정상세.html':{type:'simple', title:'이벤트/신간·개정/세미나', crumb:['고객센터','이벤트/신간·개정/세미나'], menu:CS_MENU},
    '세미나상세.html':{type:'simple', title:'이벤트/신간·개정/세미나', crumb:['고객센터','이벤트/신간·개정/세미나'], menu:CS_MENU}
  };
  (function(){
    var el=document.getElementById('site-location'); if(!el) return;
    var file=decodeURIComponent((location.pathname.split('/').pop()||''));
    var p=PAGES[file];
    /* 한글 파일명 유니코드 정규화(NFC/NFD) 불일치 대비: 정규화 후 재매칭 (GitHub Pages 등) */
    if(!p && file && file.normalize){
      var fN=file.normalize('NFC');
      for(var _k in PAGES){ if(_k.normalize && _k.normalize('NFC')===fN){ p=PAGES[_k]; break; } }
    }
    if(!p){
      /* PAGES 매칭 실패 시: 하드코딩된 pagehead의 ph-title로 모바일 서브GNB(홈+타이틀)만이라도 복구 */
      var _ht=el.querySelector('.ph-title'), _lh=document.querySelector('.lheader'), _mn=_lh&&_lh.querySelector('.m-loc-name');
      if(_ht&&_mn){ _mn.textContent=_ht.textContent.trim(); _lh.classList.add('has-loc'); }
      return;
    }
    var crumb='<a class="home ico" href="index.html"><img src="assets/ic_home.svg" alt="홈"></a>';
    var left; var curName=''; var curD1='';
    if(p.type==='cat'){
      /* GNB에서 넘어온 카테고리(?d1=&d2=)를 반영. 없으면 기본값(ELT/Coursebook) */
      var qs=new URLSearchParams(location.search);
      var d1=qs.get('d1')||p.d1;
      var d2=qs.get('d2')||(qs.get('d1')?((CATEGORIES[d1]||[p.d2])[0]):p.d2);
      curName=d2; curD1=d1;
      var opts=(CATEGORIES[d1]||[]).map(function(o){ return '<a href="리스트_교재구매.html?d1='+encodeURIComponent(d1)+'&d2='+encodeURIComponent(o)+'">'+o+'</a>'; }).join('');
      crumb+='<span class="sep">·</span><a href="리스트_교재구매.html?d1='+encodeURIComponent(d1)+'">'+d1+'</a>'
        +'<span class="sep">·</span><span class="cur-wrap" id="bcCat"><button type="button" class="cur">'+d2+' <span class="caret">&#9662;</span></button><div class="cur-menu">'+opts+'</div></span>';
      left='<h1 class="ph-title">'+d2+'</h1>'+(p.tag?'<a class="ph-tag" href="https://www.nebuildandgrow.com/pages/" target="_blank" rel="noopener">'+p.tag+'</a>':'');
    } else {
      curName=p.title;
      crumb+=p.crumb.map(function(c,i){
        if(i<p.crumb.length-1) return '<span class="sep">·</span><a href="#">'+c+'</a>';
        /* 마지막 크럼: 페이지에 menu가 있으면 ELT처럼 펼침 드롭다운(형제 섹션 이동) */
        if(p.menu){
          var opts2=p.menu.map(function(m){ return '<a href="'+m[1]+'">'+m[0]+'</a>'; }).join('');
          return '<span class="sep">·</span><span class="cur-wrap" id="bcCat"><button type="button" class="cur">'+c+' <span class="caret">&#9662;</span></button><div class="cur-menu">'+opts2+'</div></span>';
        }
        return '<span class="sep">·</span><span class="cur">'+c+'</span>';
      }).join('');
      left='<h1 class="ph-title">'+p.title+'</h1>';
    }
    /* 인기교재 NE차트: ELT·초/중등·고등·수학/국어 하위 진입 시에만 노출(PRD) */
    var nechart=document.querySelector('.nechart');
    if(nechart){
      var NECHART_D1=['ELT','초/중등','고등','수학/국어'];
      nechart.style.display=(p.type==='cat' && NECHART_D1.indexOf(curD1)>=0) ? '' : 'none';
    }
    el.innerHTML='<section class="pagehead"><div class="container cart-head-row"><div class="ph-left">'+left+'</div><div class="crumb">'+crumb+'</div></div></section>';
    /* 모바일 서브 헤더(로케이션형): 홈 + 카테고리명 */
    var lh=document.querySelector('.lheader')||document.querySelector('.header');
    var mname=lh&&lh.querySelector('.m-loc-name');
    if(mname){ mname.textContent=curName; lh.classList.add('has-loc');
      if(p.noMenu) lh.classList.add('loc-nomenu'); /* 결제 플로우(장바구니·주문결제·주문완료): 화살표·펼침메뉴 제거 */ }
    /* 모바일 펼침메뉴(#mCat) 내용: cat 페이지는 진입 카테고리(d1)의 형제, simple 페이지는 지정 menu로 교체 */
    var mcatPanel2=document.querySelector('#mCat .mcat-panel');
    if(mcatPanel2 && p.type==='cat'){
      mcatPanel2.innerHTML=(CATEGORIES[curD1]||[]).map(function(o){ return '<a class="mcat-item" href="리스트_교재구매.html?d1='+encodeURIComponent(curD1)+'&d2='+encodeURIComponent(o)+'">'+o+'</a>'; }).join('');
    }
    if(p.menu){
      var mcatPanel=document.querySelector('#mCat .mcat-panel');
      if(mcatPanel) mcatPanel.innerHTML=p.menu.map(function(m){ return '<a class="mcat-item" href="'+m[1]+'">'+m[0]+'</a>'; }).join('');
    }
    var wrap=document.getElementById('bcCat');
    if(wrap){
      var btn=wrap.querySelector('.cur');
      btn.addEventListener('click',function(e){ e.stopPropagation(); wrap.classList.toggle('open'); });
      document.addEventListener('click',function(e){ if(!wrap.contains(e.target)) wrap.classList.remove('open'); });
      document.addEventListener('keydown',function(e){ if(e.key==='Escape') wrap.classList.remove('open'); });
    }
  })();

  /* 인기교재 NE차트: 윈도우 팝업 형태 새창으로 오픈 */
  (function(){
    var nechart=document.querySelector('.nechart');
    if(!nechart) return;
    nechart.addEventListener('click',function(e){
      e.preventDefault();
      var url=nechart.getAttribute('href');
      var w=900,h=800;
      var left=Math.round((window.screen.width-w)/2), top=Math.round((window.screen.height-h)/2);
      window.open(url,'ne_book_top10','width='+w+',height='+h+',left='+left+',top='+top+',scrollbars=yes,resizable=yes');
    });
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
  /* GNB 3뎁스(카테고리→2뎁스→시리즈) : type4 콘텐츠 반영. 햄버거 메뉴와 공용(NE_MEGA3D) */
  /* 신간 출시된 시리즈(펼침메뉴에서 '신간' 라벨 표시) */
  NE_MEGA_NEW={'Oxford Show&Tell':1,'Learn English with Dora':1};
  var MEGA3D=NE_MEGA3D={
    'ELT':{
      'Coursebook':['Oxford Show&Tell','Oxford Discover','English Time','Magic Time','Oxford Pic, Dic.','Up & Away in Eng.','Starlight','Grammar For Schools','Shine On!','Learn English with Dora','Come On Everyone','Buzz','Beehive American','Shine On! Plus','Toy Team Plus','Blue Dot','Little Blue Dot'],
      'Phonics':['Phonics Show','Come On, Phonics','Phonics Code'],
      'Reading':['Reading Comprehension','Reading Skills','Contents Area Reading','Curriculum Integration Reading','Reading Sketch','Reading Sense','Reading Source','Reading Sponge','Read Up','Reading Peak','Reading Clue','Read & Retell','The Basic Way','Read to Reach','The Best Way','Subject Link','Subject Link (2nd Edition)','Insight Link','Easy Link','Read It'],
      'Readers':['Dolphins Readers','Classic Tales','Dominoes','Reading Stars','Fly Frog','Show Time'],
      'Listening':['Listening Season','Listening Planner','Listening Seed','Listening Stage','Listening Stage Plus'],
      'Speaking':['Everyone, Speak!','Speaking Stage'],
      'Grammar':['The Grammar Lab','Grammar For Schools','Grammar Space','Grammar in Focus','Grammar in Mind','Grammar Effect','Grammar Ten','Grammar Stage','요즘 초등 영문법'],
      'Writing':['Write Right','Write It!'],
      'Vocabulary':['요즘 초등 영단어','Word Up']
    },
    '초/중등':{
      '중학내신':['1316 팬클럽','능률중학영어','능률 중학영어듣기','쓰기로 마스터하는 중학 서술형','자습서','평가문제집/내신백신'],
      '고등선행':['첫 번째 수능 영어'],
      '어휘':['능률VOCA 중등','능률VOCA 초등','능률VOCA 어원','초등영어 단어가 된다','초등영어 사이트 워드가 된다'],
      'Phonics':['초등영어 파닉스가 된다','초등영어 사이트 워드가 된다'],
      '쓰기':['달곰한 Sentence Writing','Writing Builder','쓰기로 마스터하는 중학서술형'],
      '독해':['초등영어 리딩이 된다','열중 16강 독해+문법','주니어 리딩튜터','1316 Reading','정말 기특한 구문독해','Reading Forward','리딩튜터','Reading Expert','리딩버디','Reading Inside','Junior Reading Expert','RADIX READING for the TOEFL iBT','* 원서형 교재','첫 번째 수능 영어 (첫수)','주니어 리딩튜터 스타터','수능 딥독','달곰한 Literacy Reading'],
      '듣기':['Junior Listening Expert','1316 Listening','주니어 리스닝튜터','능률 중학영어 듣기 모의고사','리스닝버디','초등영어 리스닝튜터','RADIX LISTENING for the TOEFL iBT','* 원서형 교재','능률 초등영어 듣기 모의고사'],
      '문법/구문':['초등 Grammar Inside','초등영어 문법이 된다','Grammar zone','문마중(문제로 마스터하는 중학 영문법)','Grammar Inside','열중 16강 문법','그래머 버디','Grammar Bean','고득점 독해를 위한 중학 구문 마스터','원리를 더한 영문법','중학영문법 총정리 모의고사','1316 Grammar','능률중학영어','천문장','NELT 문법 실전 모의고사','중학영문법 Link','Grammar Ten','Grammar Effect'],
      'TOEFL/TEPS/NELT':['RADIX (for the TOEFL iBT)','TEPS BY STEP','NELT']
    },
    '고등':{
      '어휘':['능률VOCA 고등','다빈출코드','능률VOCA 어원','특급 수능·EBS 기출 VOCA'],
      '독해':['Advanced Reading Expert','Reading Expert','리딩튜터','빠른독해 바른독해','능률 고급영문독해','기본을 강하게 잡아주는 고등영어 (독해)','다빈출코드 (독해)','The 상승 (독해)','수능유형 PICK (독해)','특급 독해','얇고 빠른 미니 모의고사','이명학의 리드미컬'],
      '듣기':['리스닝튜터','Listening Expert','수능만만 (듣기)','특급 듣기','다빈출코드 (듣기)','수능유형 PICK (듣기)'],
      '문법/구문':['기본을 강하게 잡아주는 고등영어 (문법)','The 상승','Grammar zone','문마고(문제로 마스터하는 고등 영문법)','필히 통하는 고등영문법','다빈출코드','올클 수능 어법','능률기본영어','필히 통하는 고등 서술형','수능 구문 빅데이터','천문장','특급 어법','NELT 문법 실전 모의고사'],
      '수능대비':['얇고 빠른 미니 모의고사','수능만만','수능 1 Up','다빈출코드','능률기본영어','맞수','잡아라! 유형','The 상승','특별한 1등급 커리타기 특급','수능구문 빅데이터','EBS 수능특강 변형문제','섹션뽀개기','수능유형 PICK'],
      '고교내신':['자습서','내신 100신 기출 예상 문제집','내신평정 평가문제집','내신 기출 예상문제집'],
      '단기특강':['맞수'],
      'TOEFL/TEPS/NELT':['NELT','TEPS BY STEP']
    },
    '교과서/자습서':{
      '중학영어 교과서':['교과서','자습서','문제집','1학년','2학년','3학년'],
      '고등영어 교과서':['2022 개정 교과서','2022 개정 자습서','2015 개정 교과서','2015 개정 자습서','문제집','심화영어','영어권문화/진로영어','고등영어(김)','고등영어1','고등영어2','기본영어','English Critical Reading','실용영어','고등영어(양)','영어 독해와작문','영어회화','수학'],
      '수학 교과서':['교과서','자습서/문제집'],
      '중국어/일본어':['자습서','교과서']
    },
    '수험/일반':{
      'TOEIC':['토마토 TOEIC LC','토마토 TOEIC RC','토마토 TOEIC 실전','토마토 TOEIC Voca','TOEIC 입문','33토익 실전','33토익','토마토 토익','토마토 TOEIC DIRECT','토마토 COMPACT','토마토 TOEIC','토마토 BASIC','토마토 INTENSIVE','토마토 TOEIC FINISH 1000제','토마토 COMBO'],
      'TOEIC SPEAKING/WRITING':['입문','중급/고급','토마토 TOEIC','토마토 WRITING FLOW','토마토 SPEAKING'],
      'TOEFL/OPIC/TEPS':['토마토 TOEFL 입문','토마토 TOEFL 중급/고급','토마토 TOEFL 실전/Voca','토마토 TOEFL iBT'],
      'FLEX':['FLEX 영어수험서'],
      '일반영어':['TOMATALK','능률롱맨','사전에 길이 있다','능률 JUNIOR','능률한영사전','The Grammar Guide','토마토 GRAMMARing']
    },
    '수학/국어':{
      '유아':['사고셈','세 마리 토끼 잡는 독서 논술','세 마리 토끼 잡는 초등 어휘','세 마리 토끼 잡는 급수 한자','세 마리 토끼 잡는 역사 탐험'],
      '초등':['달곰한 계산력','사고셈','월등한 개념 수학','수능까지 이어지는 초등 고학년 수학','수학의 고수','세 마리 토끼 잡는 초등 어휘','세 마리 토끼 잡는 독서 논술','세 마리 토끼 잡는 초등 한국사','세 마리 토끼 잡는 급수 한자','세 마리 토끼 잡는 초등 독해력','세 마리 토끼 잡는 쓰기','달곰한 문해력 초등 독해','달곰한 문해력 초등 어휘','달곰한 문해력 기본서','달곰한 문해력 초등 문법'],
      '중등':['중등 각','월등한 개념 수학','월등한 개념 수학 기본+','월등한 개념 수학 실력+','유형 더블','수학에 심장을 달다','수학의 고수','테크닉','한 번에 수능까지 완성하는 중학국어'],
      '고등':['고등 각','수능 기출 각','스코어','HIGH-END (내신)','HIGH-END (수능)','수능엔유형','시험직전R','해설의 역습','EBS 수능특강 변형문제']
    }
  };
  function gEsc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function build3d(cat,t2){
    var arr=(MEGA3D[cat]||{})[t2]||[];
    /* 행 우선(가로 한 줄 먼저 채우고 다음 줄) — grid row-flow가 처리 */
    return arr.map(function(s){ return '<a href="리스트_교재구매.html?d1='+encodeURIComponent(cat)+'&d2='+encodeURIComponent(t2)+'&series='+encodeURIComponent(s)+'">'+gEsc(s)+neNewLabel(s)+'</a>'; }).join('');
  }
  var closeT;
  function openFor(a){
    var name=a.textContent.trim();
    if(a.classList.contains('gnb-mall')) name='교재몰';   /* 롤링 텍스트라 이름 정리 */
    var isBlue=a.classList.contains('gnb-blue');
    var mega=isBlue||name==='학습자료실'||name==='도서몰';   /* 학습자료실·교재몰은 멀티컬럼 메가 */
    var tmega=!!MEGA3D[name];   /* 카테고리(ELT 등) = 3뎁스 tmega */
    var BR='<div class="gd-brands"><a class="gd-btn blue" href="#">Come on Series <span>&#8250;</span></a><a class="gd-btn navy" href="oxford.html">Oxford <span>&#8250;</span></a></div>';
    if(tmega){
      var t2s=Object.keys(MEGA3D[name]);
      var first=t2s[0];
      drop.innerHTML='<div class="gd-2depth">'
        +t2s.map(function(t2,idx){ return '<a class="t2d'+(idx===0?' t2d-on':'')+'" data-t2="'+gEsc(t2)+'" href="리스트_교재구매.html?d1='+encodeURIComponent(name)+'&d2='+encodeURIComponent(t2)+'">'+gEsc(t2)+'</a>'; }).join('')
        +'</div>'
        +'<div class="gd-3grid" id="gnbMega3d">'+build3d(name,first)+'</div>';
      drop.classList.add('tmega'); drop.classList.remove('mega');
      drop.querySelectorAll('.t2d').forEach(function(t2a){
        t2a.addEventListener('mouseenter',function(){
          drop.querySelectorAll('.t2d').forEach(function(x){ x.classList.remove('t2d-on'); });
          t2a.classList.add('t2d-on');
          var el3=document.getElementById('gnbMega3d'); if(el3) el3.innerHTML=build3d(name, t2a.getAttribute('data-t2'));
        });
      });
      items.forEach(function(x){ x.classList.toggle('on',x===a); });
      drop.classList.add('open');
      drop.style.width='';
      var vwT=window.innerWidth, MT=16, grT=gnb.getBoundingClientRect(), irT=a.getBoundingClientRect();
      var leftT=Math.round(irT.left-grT.left-24);
      var maxLeftT=Math.round(vwT-drop.offsetWidth-MT);
      if(leftT>maxLeftT) leftT=maxLeftT; if(leftT<MT) leftT=MT;
      drop.style.left=leftT+'px';
      return;
    }
    if(mega){
      var COLS=[['ELT','Coursebook','Phonics','Reading','Readers','Listening','Speaking','Grammar','Writing','Vocabulary'],['초등/중등','중학 내신','고등 선행','파닉스','어휘','쓰기','독해','듣기','문법/구분','TOEFL/TEPS/NELT'],['고등','어휘','독해','듣기','문법/구분','수능 대비','고교 내신','단기 특강','TOEFL/TEPS/NELT'],['교과서/자습서','중학영어 교과서','고등영어 교과서','수학 교과서','중국어/일본어'],['수험/일반','TOEIC','TOEIC SPEAKING|/WRITING','TOEFL/OPIC/TEPS','FLEX','일반영어'],['수학/국어','유아','초등','중등','고등']];
      drop.innerHTML=COLS.map(function(c){ return '<div class="gd-col"><p class="gd-col-t">'+c[0]+'</p><div class="items">'+c.slice(1).map(function(i){ var t=i.replace('|',''); return '<a href="리스트_교재구매.html?d1='+encodeURIComponent(name)+'&d2='+encodeURIComponent(t)+'">'+i.replace('|','<br>')+'</a>'; }).join('')+'</div></div>'; }).join('')+BR;
      drop.classList.add('mega');
    } else {
      var list=MENU[name]; if(!list){ hideGnb(); return; }
      drop.innerHTML='<div class="gd-cats">'+list.map(function(t){ return '<a href="리스트_교재구매.html?d1='+encodeURIComponent(name)+'&d2='+encodeURIComponent(t)+'">'+t+'</a>'; }).join('')+'</div>'+BR;
      drop.classList.remove('mega');
    }
    items.forEach(function(x){ x.classList.toggle('on',x===a); });
    drop.classList.add('open');
    var vw=window.innerWidth, M=16; /* 좌우 최소 여백 */
    if(mega){
      /* 메가: 내비(.gnb-in) 폭에 맞춰 화면을 채우고 컬럼은 flex로 넓게 분배 */
      var grm=gnb.getBoundingClientRect(), inEl=gnb.querySelector('.gnb-in'), inm=inEl.getBoundingClientRect();
      drop.style.width=Math.round(inm.width)+'px';
      drop.style.left=Math.round(inm.left-grm.left)+'px';
    }
    else{
      drop.style.width='';
      var gr=gnb.getBoundingClientRect(), ir=a.getBoundingClientRect();
      var left=Math.round(ir.left-gr.left-24);
      var maxLeft=Math.round(vw-drop.offsetWidth-M); /* 우측 여백 확보(뷰포트 기준) */
      if(left>maxLeft) left=maxLeft; if(left<M) left=M;
      drop.style.left=left+'px';
    }
  }
  function hideGnb(){ drop.classList.remove('open'); items.forEach(function(x){ x.classList.remove('on'); }); }
  items.forEach(function(a){
    a.addEventListener('mouseenter',function(){ clearTimeout(closeT); openFor(a); });
    a.addEventListener('click',function(e){ if(MENU[a.textContent.trim()] && !a.classList.contains('gnb-blue')){ e.preventDefault(); openFor(a); } });
  });
  /* 현재 카테고리 페이지면 해당 GNB 메뉴에 선택(빨강 밑줄) 상태 유지 */
  (function(){
    var f=decodeURIComponent((location.pathname.split('/').pop()||''));
    var activeCat=new URLSearchParams(location.search).get('d1');
    if(!activeCat && /(리스트_교재구매|리스트_학습자료|교재상세)/.test(f)) activeCat='ELT';
    if(activeCat){ items.forEach(function(a){ if(!a.classList.contains('gnb-blue') && a.textContent.trim()===activeCat) a.classList.add('active'); }); }
  })();
  gnb.addEventListener('mouseleave',function(){ closeT=setTimeout(hideGnb,160); });
  gnb.addEventListener('mouseenter',function(){ clearTimeout(closeT); });
  document.addEventListener('click',function(e){ if(!gnb.contains(e.target)) hideGnb(); });
})();

/* 모바일: 지정 위치의 커스텀 셀렉트(.oh-sel)를 폰 네이티브 <select> 오버레이로 대체
   (고객센터 이벤트·교재오류정정 교재선택, 마이페이지 포인트·문의답변 기간) */
(function(){
  var SEL='#cc-event .oh-sel, #errataFilter .oh-sel, #tab-points .oh-sel, #tab-qna .oh-sel';
  function attach(sel){
    if(sel.getAttribute('data-nsel')) return;
    var menu=sel.querySelector('.oh-sel-menu'), lb=sel.querySelector('.oh-sel-lb');
    if(!menu||!lb) return;
    var opts=[].slice.call(menu.querySelectorAll('a'));
    if(!opts.length) return;
    var ns=document.createElement('select');
    ns.className='oh-nsel';
    ns.setAttribute('aria-label', lb.textContent.trim());
    opts.forEach(function(a,i){
      var o=document.createElement('option');
      o.value=String(i); o.textContent=a.textContent.trim();
      if(a.classList.contains('on')) o.selected=true;
      ns.appendChild(o);
    });
    ns.addEventListener('change',function(){
      var a=opts[ns.selectedIndex]; if(!a) return;
      lb.textContent=a.textContent.trim();
      opts.forEach(function(x){ x.classList.remove('on'); });
      a.classList.add('on');
      a.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));
    });
    sel.classList.add('oh-sel--native');
    sel.appendChild(ns);
    sel.setAttribute('data-nsel','1');
  }
  function boot(){ [].forEach.call(document.querySelectorAll(SEL),attach); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();

/* 첨부파일: 파일 선택 시 파일명 + 삭제(×) 노출 (1:1문의 회원·비회원 등 자체 input 없는 .iq-file 대상) */
(function(){
  var DEL='<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
  function wire(box){
    if(box.querySelector('input[type="file"]')) return; /* 자체 처리(후기작성 등)는 제외 */
    var btn=box.querySelector('.iq-file-btn'), nm=box.querySelector('.iq-file-name');
    if(!btn||!nm||box.getAttribute('data-file-wired')) return;
    box.setAttribute('data-file-wired','1');
    var inp=document.createElement('input'); inp.type='file'; inp.hidden=true; box.appendChild(inp);
    function clear(){ nm.classList.remove('has-file'); nm.innerHTML=''; inp.value=''; }
    function show(fn){
      nm.classList.add('has-file');
      nm.innerHTML='<span class="iq-file-fn"></span><button type="button" class="iq-file-del">삭제 '+DEL+'</button>';
      nm.querySelector('.iq-file-fn').textContent=fn;
      nm.querySelector('.iq-file-del').addEventListener('click',clear);
    }
    btn.addEventListener('click',function(){ inp.click(); });
    inp.addEventListener('change',function(){ var f=inp.files&&inp.files[0]; if(f) show(f.name); else clear(); });
  }
  function boot(){ [].forEach.call(document.querySelectorAll('.iq-file'),wire); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();

/* ===== 서브페이지 PC/태블릿 오른쪽 퀵 플로팅 =====
   - 상단: 레벨차트/맞춤형/교재가이드 3개 패널(.floating 재사용, 수학교재안내 제외)
   - 하단: 고객센터 FAB + 맨위로. FAB를 누르면 상담 알약(1:1문의/문자상담/채팅상담/FAQ)이 펼쳐지고
           그동안 3개 패널은 숨겨짐. 다시 닫으면 패널 재노출.
   메인(index/메인_*)은 이미 인라인 .floating이 있으므로 주입하지 않음. */
(function(){
  function boot(){
    if(document.querySelector('.floating')) return;               // 메인 페이지엔 이미 존재 → 스킵
    if(document.getElementById('subFloat')) return;
    var wrap=document.createElement('div'); wrap.id='subFloat';
    wrap.innerHTML=
      '<div class="qcs-dim"></div>'+
      '<div class="qfloat">'+
        '<div class="floating">'+
          '<a class="float-card" href="맞춤교재추천.html"><span class="ico"><img src="assets/ic_float_recommend.svg" alt=""></span><span>맞춤형 교재추천</span></a>'+
          '<a class="float-card" href="교재레벨차트.html"><span class="ico"><img src="assets/ic_float_level.svg" alt=""></span><span>교재 레벨 차트</span></a>'+
          '<a class="float-card" href="교재가이드.html"><span class="ico"><img src="assets/ic_float_guide.svg" alt=""></span><span>교재 가이드 다운</span></a>'+
        '</div>'+
        '<div class="qcs-menu">'+
          '<a class="qcs-item" href="고객센터.html#qna"><span class="t">1:1문의</span><span class="ic"><img src="assets/ic_11.svg" alt=""></span></a>'+
          '<a class="qcs-item qcs-sms" href="고객센터.html#qna"><span class="t">문자상담</span><span class="ic"><img src="assets/ic_sms.svg" alt=""></span></a>'+
          '<a class="qcs-item" href="고객센터.html#qna"><span class="t">채팅상담</span><span class="ic"><img src="assets/ic_chat.svg" alt=""></span></a>'+
          '<a class="qcs-item" href="고객센터.html#faq"><span class="t">FAQ</span><span class="ic"><img src="assets/ic_faq.svg" alt=""></span></a>'+
        '</div>'+
        '<button type="button" class="qcs-fab" aria-label="상담 메뉴" aria-expanded="false"><img class="ic-chat" src="assets/ic_qfab_chat.svg" alt="상담"><img class="ic-x" src="assets/ic_qfab_close.svg" alt="닫기"></button>'+
        '<button type="button" class="qcs-top" aria-label="맨 위로"><svg viewBox="0 0 24 24" fill="none"><path d="M12 19V6M6 12l6-6 6 6" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'+
      '</div>';
    document.body.appendChild(wrap);

    var qfloat=wrap.querySelector('.qfloat');
    var fab=wrap.querySelector('.qcs-fab');
    var dim=wrap.querySelector('.qcs-dim');
    var top=wrap.querySelector('.qcs-top');
    /* 결제 플로우(장바구니·주문결제·주문완료): 맨위로 버튼만 노출, 나머지 퀵(패널·상담 FAB·채널·딤) 미노출 — PC·모바일 공통 */
    if(/(장바구니|주문결제|주문완료)\.html([?#]|$)/.test(decodeURIComponent(location.pathname||''))){
      ['.floating','.qcs-menu','.qcs-fab','.qcs-dim'].forEach(function(sel){ var el=wrap.querySelector(sel); if(el) el.style.display='none'; });
    }
    function openCS(){ qfloat.classList.add('open'); dim.classList.add('on'); fab.setAttribute('aria-expanded','true'); }
    function closeCS(){ qfloat.classList.remove('open'); dim.classList.remove('on'); fab.setAttribute('aria-expanded','false'); }
    fab.addEventListener('click',function(){ qfloat.classList.contains('open')?closeCS():openCS(); });
    dim.addEventListener('click',closeCS);
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&qfloat.classList.contains('open')) closeCS(); });

    /* 맨위로: 살짝 내렸을 때만 노출 + 부드럽게 상단 이동 */
    function onScroll(){ if((window.pageYOffset||document.documentElement.scrollTop||0)>240) top.classList.add('show'); else top.classList.remove('show'); }
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();
    top.addEventListener('click',function(){
      var start=window.pageYOffset||document.documentElement.scrollTop||0, t0=null;
      function step(ts){ if(t0===null)t0=ts; var p=Math.min((ts-t0)/450,1); var e=1-Math.pow(1-p,3); window.scrollTo(0,Math.round(start*(1-e))); if(p<1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();

/* ===== 학습자료 다운로드 팝업 =====
   오픈 위치: 리스트_학습자료 다운로드 아이콘(.pres-item[개수]) / 교재상세 상단 우측 아이콘(.res-chip) /
   학습자료 선택·전체 다운로드 버튼(.rt-actions a). 가운데 테이블은 외부 솔루션 영역(목업은 정적 표 사용). */
(function(){
  var ROWS='<div class="rgrid-row"><span class="c-chk"><input type="checkbox" class="rchk"></span><span class="c-gu"><span class="gubun all">전체</span></span><span class="c-ty">정답지</span><span class="c-nm">L1 정답 및 해설</span><span class="c-dl"><img src="assets/ic_download.svg" alt="다운로드"></span></div>'
    +'<div class="rgrid-row"><span class="c-chk"><input type="checkbox" class="rchk"></span><span class="c-gu"><span class="gubun member">회원</span></span><span class="c-ty">워크시트</span><span class="c-nm">Unit 1~5 워크시트</span><span class="c-dl"><img src="assets/ic_download.svg" alt="다운로드"></span></div>'
    +'<div class="rgrid-row"><span class="c-chk"><input type="checkbox" class="rchk"></span><span class="c-gu"><span class="gubun member">회원</span></span><span class="c-ty">정답지</span><span class="c-nm">L1 정답 및 해설</span><span class="c-dl"><img src="assets/ic_download.svg" alt="다운로드"></span></div>';
  var TEACHER='<div class="teacher-banner"><div class="tb-rows">'
    +'<div class="tb-row"><span class="c-chk"><input type="checkbox" class="rchk" disabled aria-hidden="true" tabindex="-1"></span><span class="c-gu"><span class="gubun teacher">선생님</span></span><span class="c-ty">선생님자료</span><span class="c-nm">어휘리스트, MP3, 정답 &amp; 해설, 워크시트 등</span></div>'
    +'<div class="tb-row"><span class="c-chk"><input type="checkbox" class="rchk" disabled aria-hidden="true" tabindex="-1"></span><span class="c-gu"><span class="gubun teacher">선생님</span></span><span class="c-ty">E-book</span><span class="c-nm">온라인 교재 서비스</span></div>'
    +'<div class="tb-row"><span class="c-chk"><input type="checkbox" class="rchk" disabled aria-hidden="true" tabindex="-1"></span><span class="c-gu"><span class="gubun teacher">선생님</span></span><span class="c-ty">어휘출제마법사</span><span class="c-nm">어휘 문제 출제 서비스</span></div>'
    +'<div class="tb-row"><span class="c-chk"><input type="checkbox" class="rchk" disabled aria-hidden="true" tabindex="-1"></span><span class="c-gu"><span class="gubun teacher">선생님</span></span><span class="c-ty">문법문제뱅크</span><span class="c-nm">문법 문제 출제 서비스</span></div>'
    +'</div><div class="tb-cta"><span class="tb-cta-text">이 교재를 사용하는<br>선생님이라면</span><a class="tb-cta-btn" href="#">NE Tutor 바로가기</a></div></div>';
  var TABS=['전체','Teaching Materials','수업용 PPT','Word Lists · 회원','정답지 · 전체','듣기 MP3 음원','어휘 리스트','단원별 평가지','수행평가 자료','본문 해석 PDF']
    .map(function(t,i){ return '<a'+(i===0?' class="on"':'')+'>'+t+'</a>'; }).join('');
  var HTML='<div class="dl-modal-dim" id="dlModalDim"></div>'
    +'<div class="dl-modal" id="dlModal" role="dialog" aria-modal="true" aria-label="학습자료 다운로드">'
    +'<div class="dl-modal-head"><h2 class="dl-modal-title">학습자료 다운로드</h2><button class="dl-modal-x" type="button" aria-label="닫기">&times;</button></div>'
    +'<div class="dl-modal-body">'
    +'<div class="s-res-head"><div class="s-res-head-l"><div class="rfilter">'+TABS+'</div></div>'
    +'<div class="res-qr"><a class="res-qr-item"><span class="qbox"><img src="assets/ic_res_qr.svg" alt=""></span><span class="qlb">모바일학습</span></a>'
    +'<a class="res-qr-item"><span class="qbox"><img src="assets/ic_res_qr.svg" alt=""></span><span class="qlb">MP3음원</span></a></div></div>'
    +'<div class="rtwrap"><div class="rt-tablewrap"><div class="rgrid">'
    +'<div class="rgrid-head"><span class="c-chk"><input type="checkbox" class="rchk"></span><span class="c-gu">구분</span><span class="c-ty">자료유형</span><span class="c-nm">자료명</span><span class="c-dl">다운로드</span></div>'
    +ROWS+TEACHER
    +'</div></div></div></div>'
    +'<div class="dl-modal-foot"><div class="rt-actions"><a href="#" class="sel"><span class="ico"><img src="assets/ic_download.svg" alt=""></span>선택 다운로드</a>'
    +'<a href="#"><span class="ico"><img src="assets/ic_download.svg" alt=""></span>전체 다운로드</a></div></div>'
    +'</div>';

  var dim, modal, injected=false;
  function inject(){
    if(injected) return;
    var wrap=document.createElement('div'); wrap.innerHTML=HTML;
    while(wrap.firstChild) document.body.appendChild(wrap.firstChild);
    dim=document.getElementById('dlModalDim'); modal=document.getElementById('dlModal');
    dim.addEventListener('click',close);
    modal.querySelector('.dl-modal-x').addEventListener('click',close);
    modal.querySelectorAll('.rfilter a').forEach(function(a){ a.addEventListener('click',function(){ modal.querySelectorAll('.rfilter a').forEach(function(x){x.classList.remove('on');}); a.classList.add('on'); }); });
    modal.querySelectorAll('.dl-modal-foot .rt-actions a').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); toast(a.classList.contains('sel')?'선택한 자료를 다운로드합니다.':'전체 자료를 다운로드합니다.'); }); });
    injected=true;
  }
  function open(){ inject(); dim.classList.add('open'); modal.classList.add('open'); document.body.style.overflow='hidden'; }
  function close(){ if(!modal) return; dim.classList.remove('open'); modal.classList.remove('open'); document.body.style.overflow=''; }

  var toastEl;
  function toast(msg){
    if(!toastEl){ toastEl=document.createElement('div'); toastEl.style.cssText='position:fixed;left:50%;bottom:40px;transform:translateX(-50%);background:rgba(29,23,23,.92);color:#fff;padding:12px 22px;border-radius:999px;font-size:14px;z-index:1300;opacity:0;transition:opacity .2s;pointer-events:none;'; document.body.appendChild(toastEl); }
    toastEl.textContent=msg; toastEl.style.opacity='1';
    clearTimeout(toastEl._t); toastEl._t=setTimeout(function(){ toastEl.style.opacity='0'; },1800);
  }

  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&modal&&modal.classList.contains('open')) close(); });
  document.addEventListener('click',function(e){
    var chip=e.target.closest('.res-chip');
    if(chip){ e.preventDefault(); open(); return; }
    var pres=e.target.closest('.pres-item');
    if(pres && pres.querySelector('.pres-ct')){ e.preventDefault(); open(); return; }
    var act=e.target.closest('.rt-actions a');
    if(act && !act.closest('.dl-modal')){ e.preventDefault(); open(); return; }
  });
})();
