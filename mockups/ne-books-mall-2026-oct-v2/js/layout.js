/* 공용 레이아웃 — 헤더(GNB) + 푸터를 각 페이지의 자리표시자에 주입.
   각 페이지: <div id="site-header"></div> ... <div id="site-footer"></div> + <script src="js/layout.js" defer></script>
   (defer 라 DOM 파싱 후 실행되며, 기존 페이지의 인라인 GNB 스크립트는 헤더 주입 전 실행돼 자동 종료됨) */
(function(){
  var HEADER = `<header class="lheader">
    <div class="container">
      <div class="header-top">
        <a class="logo" href="index.html"><img src="assets/header_logo_dark.png" alt="NE_Books"></a>
        <a class="teacher-switch" href="index-teacher.html" style="margin-left:12px;flex:none;display:inline-flex;align-items:center;gap:5px;padding:8px 14px;border:1px solid #2272dd;border-radius:999px;background:#eaf2fe;color:#2272dd;font-size:13px;font-weight:700;white-space:nowrap;text-decoration:none;">&#128218; 선생님 화면</a>
        <div class="m-loc"><a class="m-loc-home" href="index.html" aria-label="홈"><img src="assets/ic_home_sub.svg" alt="홈"></a><button class="m-loc-btn" type="button" aria-expanded="false"><span class="m-loc-name"></span><span class="m-loc-caret"></span></button></div>
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
            <a href="#" class="gnb-study">학습자료실</a>
            <a href="리스트_교재구매.html" class="gnb-mall" aria-label="교재몰"><span class="gnb-roll"><span class="gr-track"><span class="gr-i">교재몰</span><span class="gr-i sub">지금 바로구매</span></span></span></a>
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

  /* [10월반영] 공용 장바구니 저장소 (localStorage) + 헤더 뱃지 동기화 — 검색결과↔장바구니 연동 */
  window.NECart = (function(){
    var KEY='ne_cart';
    function read(){ try{ return JSON.parse(localStorage.getItem(KEY))||{}; }catch(e){ return {}; } }
    function persist(o){ try{ localStorage.setItem(KEY, JSON.stringify(o)); }catch(e){} syncBadge(); }
    function setQty(item, qty){ var c=read(); if(qty>0){ c[item.id]=Object.assign({}, item, {qty:qty}); } else { delete c[item.id]; } persist(c); }
    function add(item, n){ var c=read(); var cur=c[item.id]; var q=(cur?cur.qty:0)+(n||1); c[item.id]=Object.assign({}, item, {qty:q}); persist(c); }
    function remove(id){ var c=read(); delete c[id]; persist(c); }
    function write(o){ persist(o); }
    function items(){ var c=read(), a=[]; for(var k in c){ a.push(c[k]); } return a; }
    function totalQty(){ var c=read(), n=0; for(var k in c){ n+=(c[k].qty||0); } return n; }
    function syncBadge(){ var b=document.querySelector('.cart-badge'); if(!b) return; var n=totalQty(); b.setAttribute('data-count', n); b.textContent=n; b.hidden=(n<=0); }
    return {KEY:KEY, read:read, write:write, setQty:setQty, add:add, remove:remove, items:items, totalQty:totalQty, syncBadge:syncBadge};
  })();
  window.NECart.syncBadge();

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

  /* ===== 장바구니 수량 뱃지 ===== */
  /* [10월반영] 실제 장바구니(NECart, localStorage) 총 수량을 표시. window.CART_COUNT로 강제 지정 가능. */
  (function(){
    var badge=document.querySelector('.cart-badge'); if(!badge) return;
    var n=(typeof window.CART_COUNT==='number') ? window.CART_COUNT : (window.NECart ? window.NECart.totalQty() : 0);
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
  var closeT;
  function openFor(a){
    var name=a.classList.contains('gnb-mall')?'교재몰':a.textContent.trim();
    var mega=(name==='학습자료실'||name==='교재몰');
    var BR='';   /* GNB 드롭다운 '신간 출시' 프로모션 배너 제거 */
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
    a.addEventListener('click',function(e){ if(a.classList.contains('gnb-mall')||MENU[a.textContent.trim()]){ e.preventDefault(); openFor(a); } });
  });
  gnb.addEventListener('mouseleave',function(){ closeT=setTimeout(hideGnb,160); });
  gnb.addEventListener('mouseenter',function(){ clearTimeout(closeT); });
  document.addEventListener('click',function(e){ if(!gnb.contains(e.target)) hideGnb(); });
})();
