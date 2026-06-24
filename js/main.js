document.addEventListener("DOMContentLoaded", function() {
    // 1. 개인정보처리방침 데이터 가져오기
    fetch('components/privacy.html')
        .then(response => response.text())
        .then(data => {
            const target = document.getElementById('board-privacy');
            if(target) target.innerHTML = data;
        })
        .catch(err => console.error("데이터 로드 실패:", err));

    // 2. 페이지 시작 시 메인 홈 보여주기
    initSection('main-home');
});

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