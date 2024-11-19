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
    const currentPath = getPathNameByIndex(window.location.pathname, 0);

    navLinks.forEach(navLink => {
        const linkPath = getPathNameByIndex(new URL(navLink.href).pathname, 0);
        if (linkPath === currentPath) {
            navLink.classList.add("active");
        }
    });
}

function getPathNameByIndex(path, index) {
    const parts = path.split('/').filter(part => part !== "");
    return parts.length > 0 ? parts[index] : "";
}