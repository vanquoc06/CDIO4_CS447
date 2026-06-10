// NEWS PAGE JavaScript

// Button press animation for parallelogram elements
const parallelogramButtons = document.querySelectorAll('.parallelogram');
parallelogramButtons.forEach(button => {
    button.addEventListener('mousedown', () => button.classList.add('scale-95'));
    button.addEventListener('mouseup', () => button.classList.remove('scale-95'));
    button.addEventListener('mouseleave', () => button.classList.remove('scale-95'));
});

// Pause and resume the news ticker on hover
const ticker = document.querySelector('.ticker');
if (ticker) {
    ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
    ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}
