document.addEventListener('DOMContentLoaded', function() {
    const navs = document.querySelectorAll('.nav-link');
    const contentDiv = document.getElementById('content');

    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
            })
            .catch(error => console.error('Error loading content:', error));
    }

    function handleTabClick(event) {
        event.preventDefault();
        const url = this.getAttribute('data-tab');
        const path = this.getAttribute('href');
        
        history.pushState(null, null, path);
        loadContent(url);
    }

    navs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });

    // 초기 로드 시 /home으로 리디렉션
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        history.replaceState(null, null, '/home');
        loadContent('/pages/home/home.html');
    } else {
        console.log("refresh")
        // 새로고침 시 현재 경로에 해당하는 페이지를 로드
        const currentTab = Array.from(navs).find(tab => tab.getAttribute('href') === window.location.pathname);
        console.log("currentTab:", currentTab)
        if (currentTab) {
            const temp = currentTab.getAttribute('data-tab')
            console.log("data-tab:", temp)
            loadContent(temp);
        }
    }

    // 브라우저 뒤로가기/앞으로가기 버튼을 눌렀을 때 페이지 로드
    window.addEventListener('popstate', function() {
        const currentTab = Array.from(navs).find(tab => tab.getAttribute('href') === window.location.pathname);
        if (currentTab) {
            loadContent(currentTab.getAttribute('data-tab'));
        }
    });
});
