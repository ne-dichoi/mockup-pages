/* 공용 레이아웃 — 헤더(GNB) + 푸터를 각 페이지의 자리표시자에 주입.
   각 페이지: <div id="site-header"></div> ... <div id="site-footer"></div> + <script src="js/layout.js" defer></script>
   (defer 라 DOM 파싱 후 실행되며, 기존 페이지의 인라인 GNB 스크립트는 헤더 주입 전 실행돼 자동 종료됨) */
(function(){
  var HEADER = `<header class="lheader">
    <div class="container">
      <div class="header-top">
        <div class="logo-wrap">
          <a class="logo" href="index.html"><img src="assets/header_logo_dark.png" alt="NE_Books"></a>
          <!-- [임시/검토용] B2C·B2B 목업 빠른 전환 버튼 — 실제 배포 시 제거 -->
          <a class="t1dev-switch only-pc" id="devViewSwitch" href="index-teacher.html">선생님 화면 보기</a>
          <!-- [임시/검토용] 선생님 페이지 바로가기 — 선생님 화면에서만 노출 -->
          <span class="t1dev-nav only-pc" id="devNav" hidden>
            <a href="리스트_교재구매_선생님.html">교재목록</a>
            <a href="교재상세_선생님.html">교재상세</a>
            <a href="마이페이지.html#orders">주문내역</a>
          </span>
        </div>
        <div class="m-loc"><a class="m-loc-home" href="index.html" aria-label="홈"><img src="assets/ic_home_sub.svg" alt="홈"></a><button class="m-loc-btn" type="button" aria-expanded="false"><span class="m-loc-name"></span><span class="m-loc-caret"></span></button></div>
        <!-- [항목1] 통합검색영역: 검색창 + 우측 버튼(맞춤교재찾기·추천커리큘럼), 빨간 라인으로 영역 강조. 일반몰·선생님몰 공통 헤더 -->
        <div class="search-wrap">
          <div class="search">
            <input type="text" class="search-input" placeholder="필요한 교재, 3초 안에 찾기!" autocomplete="off">
            <button type="button" class="search-ic ico" aria-label="검색"><img src="assets/ds_ic_search_red.svg" alt=""></button>
            <div class="search-pop" hidden></div>
          </div>
          <div class="search-extra only-pc">
            <a class="se-btn" href="https://nebooks.co.kr/nepick/index.asp" target="_blank" rel="noopener">맞춤교재찾기</a>
            <a class="se-btn" href="index.html#courseSec">추천커리큘럼</a>
          </div>
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
            <a class="c-blue" href="#">학습자료실</a>
            <a class="c-red gnb-mall" href="#" data-cat="교재몰" aria-label="교재몰"><span class="gnb-roll"><span class="gr-track"><span class="gr-i">교재몰</span><span class="gr-i sub">지금 바로구매</span></span></span></a>
          </nav>
        </div>
        <div class="gnb-drop" id="gnbDrop">
          <div class="gd-cats"></div>
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
  </div>`;
  var FOOTER = `<footer class="footer">
    <div class="container">
      <div class="foot-pc only-pc">
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

  /* [임시/검토용] 현재 보고 있는 화면이 선생님(B2B) 목업이면 "일반몰 보기"로, 아니면 "선생님 화면 보기"로 전환 */
  (function(){
    var btn=document.getElementById('devViewSwitch'); if(!btn) return;
    var file=decodeURIComponent(location.pathname.split('/').pop()||'');
    var isTeacher=(file.indexOf('선생님')>=0)||file==='index-teacher.html';
    btn.textContent=isTeacher?'일반몰':'선생님 화면 보기';
    btn.href=isTeacher?'index.html':'index-teacher.html';
    var nav=document.getElementById('devNav'); if(nav && isTeacher) nav.hidden=false;
  })();

  /* ===== 모바일 GNB 자동 숨김/표시 (아래로 스크롤=숨김, 위로 스크롤=표시+그림자 고정) ===== */
  (function(){
    var header=document.getElementById('site-header');
    if(!header) return;
    var mq=window.matchMedia('(max-width:767px)');
    var lastY=window.pageYOffset||0, ticking=false;
    function apply(){
      ticking=false;
      if(!mq.matches){ header.classList.remove('hdr-hidden','hdr-shown'); return; }
      var y=window.pageYOffset||0;
      var goingDown = y>lastY;
      if(y>80 && goingDown){ header.classList.add('hdr-hidden'); }
      else if(!goingDown || y<=80){ header.classList.remove('hdr-hidden'); }
      header.classList.toggle('hdr-shown', y>4 && !header.classList.contains('hdr-hidden'));
      lastY = y<0 ? 0 : y;
    }
    window.addEventListener('scroll',function(){ if(!ticking){ requestAnimationFrame(apply); ticking=true; } },{passive:true});
    window.addEventListener('resize',apply);
    apply();
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

  /* ===== 모바일 전체메뉴 드로어 (햄버거 → 좌 카테고리 / 우 하위목록) ===== */
  (function(){
    /* 교재 카테고리(ELT~수학/국어) — 학습자료실·도서몰은 이 전체를 아코디언으로 노출 */
    var BOOKCATS=[
      {name:'ELT', subs:['Coursebook','Phonics','Reading','Readers','Listening','Speaking','Grammar','Writing','Vocabulary']},
      {name:'초등/중등', subs:['중학내신','고등선행','어휘','Phonics','쓰기','독해','듣기','문법/구문','TOEFL/TEPS/NELT']},
      {name:'고등', subs:['어휘','독해','듣기','문법/구문','수능대비','고교내신','단기특강','TOEFL/TEPS/NELT']},
      {name:'교과서/자습서', subs:['중학영어 교과서','고등영어 교과서','수학교과서','중국어/일본어']},
      {name:'수험/일반', subs:['TOEIC','TOEIC SPEAKING/WRITING','TOEFL/OPIC/TEPS','FLEX','일반영어']},
      {name:'수학/국어', subs:['유아','초등','중등','고등']}
    ];
    var CS_LINKS=['고객센터.html#notice','고객센터.html#faq','고객센터.html#event','고객센터.html#errata','고객센터.html#qna','고객센터.html#branch'];
    var MY_LINKS=['마이페이지.html','마이페이지.html#orders','마이페이지.html#points','마이페이지.html#wish','마이페이지.html#qna','마이페이지.html#review','마이페이지.html#event'];
    var MENU=BOOKCATS.concat([
      {name:'학습자료실', accordion:true},
      {name:'교재몰', accordion:true},
      {name:'고객센터', subs:['공지사항','FAQ','이벤트/신간·개정/세미나','교재 오류정정','1:1문의','지사안내'], links:CS_LINKS},
      {name:'마이페이지', subs:['홈','주문내역','포인트','찜','문의/답변','후기','이벤트/세미나'], links:MY_LINKS}
    ]);
    var drawer=document.getElementById('mDrawer'); if(!drawer) return;
    var catsEl=drawer.querySelector('#mdCats'), subsEl=drawer.querySelector('#mdSubs');
    var menuBtn=document.querySelector('.m-menu'), closeBtn=drawer.querySelector('.md-close');
    var closeX=drawer.querySelector('.md-x');
    var siteHeader=document.getElementById('site-header');
    var active=0;
    function esc(s){ return s; }
    function render(){
      catsEl.innerHTML=MENU.map(function(m,i){ return '<button type="button" class="md-cat'+(i===active?' on':'')+'" data-i="'+i+'">'+m.name+'</button>'; }).join('');
      var m=MENU[active];
      if(m.accordion){
        /* 학습자료실·도서몰: ELT~수학/국어 전체를 아코디언(기본 펼침, 접기 가능) */
        subsEl.innerHTML=BOOKCATS.map(function(c){
          return '<div class="md-acc open"><button type="button" class="md-acc-h">'+c.name+'<span class="md-acc-ic" aria-hidden="true"></span></button>'
            +'<div class="md-acc-body">'+c.subs.map(function(s){ return '<a class="md-sub" href="리스트_교재구매.html">'+s+'</a>'; }).join('')+'</div></div>';
        }).join('');
      } else {
        var links=m.links;
        subsEl.innerHTML=m.subs.map(function(s,i){ return '<a class="md-sub" href="'+(links?links[i]:'리스트_교재구매.html')+'">'+s+'</a>'; }).join('');
      }
    }
    catsEl.addEventListener('click',function(e){ var b=e.target.closest('.md-cat'); if(!b)return; active=+b.dataset.i; render(); subsEl.scrollTop=0; });
    /* 아코디언 헤더 → 접기/펼치기 · 하위 링크 클릭 → 드로어 닫기(같은 페이지 해시 이동도 닫힘 반영) */
    subsEl.addEventListener('click',function(e){
      var h=e.target.closest('.md-acc-h'); if(h){ h.parentElement.classList.toggle('open'); return; }
      if(e.target.closest('.md-sub')) close(); /* 링크 기본 이동은 그대로 진행 */
    });
    function open(){ drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
      if(siteHeader){ siteHeader.classList.remove('hdr-hidden'); siteHeader.classList.add('drawer-open'); } }
    function close(){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); document.body.style.overflow='';
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
    /* 모바일 서브 헤더(로케이션형): 홈 + 카테고리명 */
    var lh=document.querySelector('.lheader')||document.querySelector('.header');
    var mname=lh&&lh.querySelector('.m-loc-name');
    if(mname){ mname.textContent=(p.type==='cat'?p.d2:p.title); lh.classList.add('has-loc');
      if(p.noMenu) lh.classList.add('loc-nomenu'); /* 결제 플로우(장바구니·주문결제·주문완료): 화살표·펼침메뉴 제거 */ }
    /* 모바일 펼침메뉴(#mCat) 내용: 페이지별 메뉴 지정 시 교체(마이페이지 계열=마이페이지 탭 목록) */
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
    '교재몰':['ELT','초/중등','고등영어 교과서','교과서/자습서','수험/일반','교구/부가상품','세트/패키지','온라인 서비스/이용권']
  };
  /* 선생님몰 3depth(교재 시리즈) 데이터 — mall-type2 메가메뉴 스타일 */
  var isTeacher = /index-teacher|선생님/.test(decodeURIComponent(location.pathname));
  /* 2depth 라벨(카테고리별) — mall-type2 동일 */
  var T2DEPTH={
    'ELT':['Coursebook','Phonics','Readers','Reading','Listening','Speaking','Writing','Grammar','Vocabulary'],
    '초/중등':['중학내신','고등선행','어휘','Phonics','쓰기','독해','듣기','문법/구문','TOEFL/TEPS/NELT'],
    '고등':['어휘','독해','듣기','문법/구문','수능대비','고교내신','단기특강','TOEFL/TEPS/NELT'],
    '교과서/자습서':['중학영어 교과서','고등영어 교과서','수학 교과서','중국어/일본어'],
    '수험/일반':['TOEIC','TOEIC SPEAKING/WRITING','TOEFL/OPIC/TEPS','FLEX','일반영어'],
    '수학/국어':['유아','초등','중등','고등']
  };
  /* 3depth 시리즈(카테고리 → 2depth → 시리즈) — mall-type2 동일 */
  var T3DEPTH={
    'ELT':{
      'Coursebook':['Oxford Show&Tell','Oxford Discover','English Time','Magic Time','Oxford Pic, Dic.','Up & Away in Eng.','Starlight','Grammar For Schools','Shine On!','Learn English with Dora','Come On Everyone','Buzz','Beehive American','Shine On! Plus','Toy Team Plus','Blue Dot','Little Blue Dot'],
      'Phonics':['Phonics Show','Come On, Phonics','Phonics Code'],
      'Readers':['Dolphins Readers','Classic Tales','Dominoes','Reading Stars','Fly Frog','Show Time'],
      'Reading':['Reading Comprehension','Reading Skills','Contents Area Reading','Curriculum Integration Reading','Reading Sketch','Reading Sense','Reading Source','Reading Sponge','Read Up','Reading Peak','Reading Clue','Read & Retell','The Basic Way','Read to Reach','The Best Way','Subject Link','Subject Link (2nd Edition)','Insight Link','Easy Link','Read It'],
      'Listening':['Listening Season','Listening Planner','Listening Seed','Listening Stage','Listening Stage Plus'],
      'Speaking':['Everyone, Speak!','Speaking Stage'],
      'Writing':['Write Right','Write It!'],
      'Grammar':['The Grammar Lab','Grammar For Schools','Grammar Space','Grammar in Focus','Grammar in Mind','Grammar Effect','Grammar Ten','Grammar Stage','요즘 초등 영문법'],
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
  var TPROMO={img:'banner_books.png', tit:'교사 인증가 안내', desc:'학원·학교 채택 시 전용가 적용', href:'교재상세_선생님.html'};
  var closeT;
  function openTeacherMega(a, name){
    var TL='리스트_교재구매_선생님.html';
    var two=T2DEPTH[name]||MENU[name]||[];
    var d3map=T3DEPTH[name]||{};
    var cols='<div class="gd-col"><p class="gd-col-t">'+name+'</p><div class="items">'
      +two.map(function(t){ return '<a class="t2d" href="'+TL+'">'+t+'</a>'; }).join('')+'</div></div>';
    var threed='<div class="gd-3depth" id="tmega3d"></div>';
    var promo='<a class="gd-promo" href="'+TPROMO.href+'"><span class="img" style="background-image:url(\'assets/'+TPROMO.img+'\')"></span>'
      +'<span class="tit">'+TPROMO.tit+'</span><span class="desc">'+TPROMO.desc+'</span></a>';
    drop.innerHTML='<div class="tmega-cols">'+cols+'</div>'+threed+promo;
    drop.classList.remove('mega'); drop.classList.add('tmega');
    items.forEach(function(x){ x.classList.toggle('on',x===a); });
    drop.classList.add('open');
    /* 2depth hover → 3depth 시리즈 노출(첫 2depth 기본 선택) */
    var box=drop.querySelector('#tmega3d'), links=[].slice.call(drop.querySelectorAll('.t2d'));
    function show3(x){
      var lbl=x.textContent.trim(), list=d3map[lbl]||[];
      box.innerHTML='<h5>'+lbl+'</h5>'+list.map(function(s){ return '<a href="'+TL+'">'+s+'</a>'; }).join('');
      links.forEach(function(y){ y.classList.toggle('t2d-on',y===x); });
    }
    links.forEach(function(x){ x.addEventListener('mouseenter',function(){ show3(x); }); });
    if(links.length) show3(links[0]);
    var gw=gnb.getBoundingClientRect().width; var ml=Math.round((gw-drop.offsetWidth)/2); drop.style.left=(ml>0?ml:0)+'px';
  }
  function openFor(a){
    var name=a.getAttribute('data-cat')||a.textContent.trim();
    var mega=(name==='학습자료실'||name==='교재몰');
    /* 선생님 페이지: 학습자료실·교재몰은 일반몰(oct-launch)과 동일한 6단 카테고리 메가, 그 외 카테고리만 3depth 메가 */
    if(isTeacher && !mega){ openTeacherMega(a,name); return; }
    var LL = isTeacher ? '리스트_교재구매_선생님.html' : '리스트_교재구매.html';
    var BR=''; /* [일반몰] GNB 드롭다운의 Come on Series·Oxford 브랜드 버튼 삭제(요청) */
    /* GNB 드롭다운 레이어 우측 이벤트 프로모 배너 */
    var GPROMO='<a class="gd-promo" href="이벤트상세.html"><span class="img" style="background-image:url(\'assets/banner_books.png\'),linear-gradient(160deg,#1f9d63,#137a45)"></span><span class="tit">신간 출시, 지금 만나보세요</span><span class="desc">새롭게 출간된 교재를 가장 먼저 확인하세요 &#8250;</span></a>';
    if(mega){
      var COLS=[['ELT','Coursebook','Phonics','Reading','Readers','Listening','Speaking','Grammar','Writing','Vocabulary'],['초등/중등','중학 내신','고등 선행','파닉스','어휘','쓰기','독해','듣기','문법/구분','TOEFL/TEPS/NELT'],['고등','어휘','독해','듣기','문법/구분','수능 대비','고교 내신','단기 특강','TOEFL/TEPS/NELT'],['교과서/자습서','중학영어 교과서','고등영어 교과서','수학 교과서','중국어/일본어'],['수험/일반','TOEIC','TOEIC SPEAKING|/WRITING','TOEFL/OPIC/TEPS','FLEX','일반영어'],['수학/국어','유아','초등','중등','고등']];
      drop.innerHTML=COLS.map(function(c){ return '<div class="gd-col"><p class="gd-col-t">'+c[0]+'</p><div class="items">'+c.slice(1).map(function(i){ return '<a href="'+LL+'">'+i.replace('|','<br>')+'</a>'; }).join('')+'</div></div>'; }).join('')+BR+GPROMO;
      drop.classList.remove('tmega'); drop.classList.add('mega');
    } else {
      var list=MENU[name]; if(!list){ hideGnb(); return; }
      drop.innerHTML='<div class="gd-cats">'+list.map(function(t){ return '<a href="'+LL+'">'+t+'</a>'; }).join('')+'</div>'+BR+GPROMO;
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
    a.addEventListener('click',function(e){ if(MENU[a.getAttribute('data-cat')||a.textContent.trim()]){ e.preventDefault(); openFor(a); } });
  });
  gnb.addEventListener('mouseleave',function(){ closeT=setTimeout(hideGnb,160); });
  gnb.addEventListener('mouseenter',function(){ clearTimeout(closeT); });
  document.addEventListener('click',function(e){ if(!gnb.contains(e.target)) hideGnb(); });
})();
