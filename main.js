document.addEventListener("DOMContentLoaded", function() {
    // 1. 개인정보처리방침 데이터 가져오기
    fetch('privacy.html')
        .then(response => response.text())
        .then(data => {
            const target = document.getElementById('board-privacy');
            if(target) target.innerHTML = data;
        })
        .catch(err => console.error("데이터 로드 실패:", err));

    // 2. 페이지 시작 시 메인 홈 보여주기
    initSection('main-home');
});

// 글 보기 화면 전환 전, 돌아갈 목록 위치를 저장해두는 변수
let lastBoardSection = 'main-home';

// 섹션 전환 함수 (메뉴 클릭 시 호출)
function showSection(sectionId) {
    history.pushState({ sectionId: sectionId }, '', '');
    initSection(sectionId);
}

// 화면 전환 및 배너 변경 핵심 로직
function initSection(sectionId) {
    // 모든 섹션 숨기기
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // 타겟 섹션 보이기
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    // 배너 텍스트 업데이트
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    
    if (heroTitle) {
        if (sectionId.startsWith('intro-')) heroTitle.innerHTML = '<span class="highlight">C</span>OMPANY';
        else if (sectionId.startsWith('board-')) heroTitle.innerHTML = '<span class="highlight">C</span>OMMUNITY';
        else heroTitle.innerHTML = '<span class="highlight">H</span>OME &amp; <span class="highlight">L</span>OGISTICS';
    }
    
    // 스크롤 이동
    if (sectionId !== 'main-home') window.scrollTo({ top: 380, behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 게시글 상세보기 (게시판 목록 / 메인 미니리스트에서 호출)
function viewPost(type, title, date, content) {
    // 현재 어떤 게시판에서 글을 눌렀는지 기억해둔다 (목록으로 버튼에서 사용)
    const current = document.querySelector('.content-section.active');
    if (current && current.id !== 'board-view') {
        lastBoardSection = current.id;
    }

    const viewType = document.getElementById('view-type');
    const viewTitle = document.getElementById('view-title');
    const viewDate = document.getElementById('view-date');
    const viewContent = document.getElementById('view-content');

    if (viewType) viewType.textContent = type;
    if (viewTitle) viewTitle.textContent = title;
    if (viewDate) viewDate.textContent = date;
    if (viewContent) viewContent.textContent = content;

    showSection('board-view');
}

// 게시글 상세보기에서 "목록으로" 버튼 클릭 시 호출
function goBackBoard() {
    showSection(lastBoardSection || 'main-home');
}
