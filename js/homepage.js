// TRANG CHỦ - Homepage JavaScript
// Simple parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('section img');
    if(heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});
