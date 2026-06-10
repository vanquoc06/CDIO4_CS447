// TRANG LỊCH TRÌNH - Race Calendar JavaScript

// Simple Countdown logic
function updateTimer() {
    const days = document.getElementById('timer-d');
    const hours = document.getElementById('timer-h');
    const minutes = document.getElementById('timer-m');

    let d = parseInt(days.innerText);
    let h = parseInt(hours.innerText);
    let m = parseInt(minutes.innerText);

    setInterval(() => {
        m--;
        if (m < 0) {
            m = 59;
            h--;
        }
        if (h < 0) {
            h = 23;
            d--;
        }
        if (d < 0) d = 0;

        days.innerText = d.toString().padStart(2, '0');
        hours.innerText = h.toString().padStart(2, '0');
        minutes.innerText = m.toString().padStart(2, '0');
    }, 60000);
}

updateTimer();

// Atmospheric effect: Cursor glow for specific technical containers
document.addEventListener('mousemove', (e) => {
    const techCards = document.querySelectorAll('.carbon-texture');
    techCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
