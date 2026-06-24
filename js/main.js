document.addEventListener("DOMContentLoaded", function() {
    // 1. 개인정보처리방침 불러오기
    fetch('components/privacy.html')
        .then(response => response.text())
        .then(data => {
            const target = document.getElementById('board-privacy');
            if(target) target.innerHTML = data;
        })
        .catch(error => console.error('내용 로드 실패:', error));

    // 2. 페이지 첫 로드 시 메인 홈 세팅
    initSection('main-home');
});

// 섹션 전환 함수
function showSection(sectionId, isPopstate = false) {
    if (!isPopstate) history.pushState({ sectionId: sectionId }, '', '');
    initSection(sectionId);
}

// 화면 전환 핵심 로직
function initSection(sectionId) {
    // 1. 모든 섹션 숨기기
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // 2. 선택한 섹션 보이기
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // 3. 탑 배너 변경
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    
    if (sectionId.startsWith('intro-')) {
        if(heroTitle) heroTitle.innerHTML = '<span class="highlight">C</span>OMPANY';
        if(heroDesc) heroDesc.textContent = "회사소개";
    } else if (sectionId.startsWith('board-')) {
        if(heroTitle) heroTitle.innerHTML = '<span class="highlight">C</span>OMMUNITY';
        if(heroDesc) heroDesc.textContent = "알림마당";
    } else {
        if(heroTitle) heroTitle.innerHTML = '<span class="highlight">H</span>OME &amp; <span class="highlight">L</span>OGISTICS';
        if(heroDesc) heroDesc.textContent = "신뢰와 가치를 연결하는 최고의 물류 파트너";
    }

    // 4. 스크롤 위치 조절
    if(sectionId !== 'main-home') window.scrollTo({ top: 380, behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 상세 페이지 함수
function viewPost(type, title, date, content) {
    const viewTitle = document.getElementById('view-title');
    if(viewTitle) viewTitle.textContent = title;
    showSection('board-view');
}