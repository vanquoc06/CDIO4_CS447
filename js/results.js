// Results page JS - AI terminal feed
const terminal = document.getElementById('ai-terminal');
if (terminal) {
    const logs = [
        "> TRACK TEMP: 48.2°C",
        "> DOWNFORCE ADJUSTMENT: +1.2%",
        "> FUEL MIX: STRATEGY 3 ACTIVE",
        "> DRIVER VITAL: HR 162 BPM (STEADY)",
        "> G-FORCE PEAK: 5.4G (TURN 8)",
        "> DRS ENABLED: SECTOR 2",
        "> CALCULATING DELTA TO P2...",
        "> GAP: -1.242s (GAINING)"
    ];
    let logIndex = 0;
    setInterval(() => {
        const p = document.createElement('p');
        p.textContent = logs[logIndex % logs.length];
        p.className = 'text-secondary-fixed-dim';
        terminal.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight;
        logIndex++;
        if (terminal.children.length > 30) terminal.removeChild(terminal.firstChild);
    }, 2000);
}
