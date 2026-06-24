document.addEventListener("DOMContentLoaded", function() {
  // 헤더 불러오기
  fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-loader').innerHTML = data;
    })
    .catch(error => console.error('헤더 로드 실패:', error));

  // 푸터 불러오기
  fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-loader').innerHTML = data;
    })
    .catch(error => console.error('푸터 로드 실패:', error));

  // 💡 [추가] 개인정보처리방침 독립 파일 불러오기
  fetch('components/privacy.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('board-privacy').innerHTML = data;
    })
    .catch(error => console.error('개인정보처리방침 로드 실패:', error));
});
// 섹션 전환 함수 (기존 기능 그대로 유지)
function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(sec => sec.classList.remove('active'));

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  
  if (sectionId.startsWith('intro-')) {
    heroTitle.innerHTML = '<span class="highlight">C</span>OMPANY INFO';
    heroDesc.textContent = "홈앤로지스틱스를 소개해 드립니다.";
  } else if (sectionId.startsWith('business-')) {
    heroTitle.innerHTML = '<span class="highlight">B</span>USINESS AREA';
    heroDesc.textContent = "비즈니스 핵심 역량을 확인하실 수 있습니다.";
  } else if (sectionId.startsWith('board-')) {
    heroTitle.innerHTML = '<span class="highlight">M</span>EDIA CENTER';
    heroDesc.textContent = "홈앤로지스틱스의 최신 정보를 전합니다.";
  } else {
    heroTitle.innerHTML = '<span class="highlight">H</span>OME &amp; <span class="highlight">L</span>OGISTICS';
    heroDesc.textContent = "신뢰와 가치를 연결하는 최고의 물류 파트너";
  }

  if(sectionId !== 'main-home') {
    window.scrollTo({ top: 380, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}