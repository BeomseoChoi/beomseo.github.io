document.addEventListener("DOMContentLoaded", function(){
    const navLinks = document.querySelectorAll(".nav-link");
    setActiveNavLink();
    for (let navLink of navLinks){
        navLink.addEventListener("click", function(){
            inactiveNavLinks();
            navLink.classList.add("active")
        })
    }
})

function inactiveNavLinks(){
    const navLinks = document.querySelectorAll(".nav-link");
    for (let navLink of navLinks){
        navLink.classList.remove("active");
    }
}
function setActiveNavLink() {
    const navLinks = document.querySelectorAll(".nav-link");
    const currentPath = normalizePath(window.location.pathname);

    navLinks.forEach(navLink => {
        const linkPath = normalizePath(new URL(navLink.href).pathname);
        console.log(currentPath, linkPath);
        if (linkPath === currentPath) {
            console.log(linkPath);
            navLink.classList.add("active");
        }
    });
}

// 마지막 슬래시를 제거하는 함수
function normalizePath(path) {
    return path.endsWith('/') ? path.slice(0, -1) : path;
}