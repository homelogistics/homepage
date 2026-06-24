document.addEventListener("DOMContentLoaded", function() {
    // 개인정보처리방침만 불러옵니다.
    fetch('components/privacy.html')
        .then(response => response.text())
        .then(data => {
            const target = document.getElementById('board-privacy');
            if(target) target.innerHTML = data;
        })
        .catch(error => console.error('로드 실패:', error));

    // 메인 홈 화면 세팅
    initSection('main-home');
});

// 섹션 전환 함수 (모든 클릭 이벤트가 이 함수를 호출합니다)
function showSection(sectionId) {
    initSection(sectionId);
    history.pushState({ sectionId: sectionId }, '', '');
}

function initSection(sectionId) {
    // 1. 섹션 전환
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');

    // 2. 제목 변경
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    
    if (sectionId.startsWith('intro-')) {
        heroTitle.innerHTML = '<span class="highlight">C</span>OMPANY';
        if(heroDesc) heroDesc.textContent = "회사소개";
    } else if (sectionId.startsWith('board-')) {
        heroTitle.innerHTML = '<span class="highlight">C</span>OMMUNITY';
        if(heroDesc) heroDesc.textContent = "알림마당";
    } else {
        heroTitle.innerHTML = '<span class="highlight">H</span>OME &amp; <span class="highlight">L</span>OGISTICS';
        if(heroDesc) heroDesc.textContent = "신뢰와 가치를 연결하는 최고의 물류 파트너";
    }

    // 3. 스크롤 위치
    if(sectionId !== 'main-home') window.scrollTo({ top: 380, behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
}