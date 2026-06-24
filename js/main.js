document.addEventListener("DOMContentLoaded", function() {
    // 1. 개인정보처리방침
    fetch('components/privacy.html')
        .then(response => response.text())
        .then(data => {
            const target = document.getElementById('board-privacy');
            if(target) target.innerHTML = data;
        })
        .catch(error => console.error('내용 로드 실패:', error));
});

// 섹션 전환 함수가 어디서든 호출될 수 있도록 전역으로 선언합니다.
window.showSection = function(sectionId, isPopstate = false) {
    if (!isPopstate) history.pushState({ sectionId: sectionId }, '', '');
    
    // 로직 호출 전 요소 존재 확인
    const target = document.getElementById(sectionId);
    if (target) {
        initSection(sectionId);
    } else {
        console.error('섹션을 찾을 수 없습니다:', sectionId);
    }
};

function initSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');
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