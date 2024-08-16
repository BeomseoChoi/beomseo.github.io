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

});
