console.log("Hello from JavaScript!");

// Add this at the start of your script
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Add at the start of your script
document.addEventListener('click', function initAudio() {
    audioContext.resume();
    document.removeEventListener('click', initAudio);
});

// Function to handle button click
function handleButtonClick() {
    alert("Button clicked!");
}

function selectOption(choice) {
    const responseDiv = document.getElementById('response');
    const buttons = document.querySelectorAll('button');
    let message = '';
    
    // Disable buttons temporarily
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.5';
    });
    
    if (choice === 'Great') {
        message = `
            <div class="response-content">
                <h3>That's wonderful to hear, Aaron Sir!</h3>
                <div class="mood-meter">
                    <div class="meter-fill"></div>
                </div>
                <div class="interactive-buttons">
                    <button onclick="playAnimation('dance')">Dance</button>
                    <button onclick="playAnimation('celebrate')">Celebrate</button>
                </div>
            </div>
        `;
    } else if (choice === 'Very Great') {
        message = `
            <div class="response-content">
                <h3>Excellent! That's amazing, Aaron Sir!</h3>
                <div class="mood-meter super-mood">
                    <div class="meter-fill"></div>
                </div>
                <div class="fireworks"></div>
                <div class="interactive-buttons">
                    <button onclick="playAnimation('party')">Party</button>
                    <button onclick="playAnimation('superCelebrate')">Super Celebration</button>
                </div>
            </div>
        `;
    }
    
    // Add response with animation
    responseDiv.innerHTML = message;
    responseDiv.style.display = 'block';
    createParticles();
    
    // Re-enable original buttons
    setTimeout(() => {
        buttons.forEach(btn => {
            if (!btn.closest('.interactive-buttons')) {
                btn.style.pointerEvents = 'auto';
                btn.style.opacity = '1';
            }
        });
    }, 1000);
}

function playAnimation(type) {
    const container = document.querySelector('.container');
    stopAllMusic(); // Stop any playing music
    
    switch(type) {
        case 'dance':
            container.style.animation = 'dance 1s infinite';
            createMusicNotes();
            playMusic(type);
            break;
        case 'celebrate':
            createConfetti();
            playMusic(type);
            break;
        case 'party':
            createConfetti();
            createMusicNotes();
            container.style.animation = 'party 1.5s infinite';
            playMusic(type);
            break;
        case 'superCelebrate':
            createFireworks();
            container.style.animation = 'superCelebrate 2s infinite';
            playMusic(type);
            break;
    }
    
    setTimeout(() => {
        container.style.animation = 'float 6s ease-in-out infinite';
    }, 3000);
}

function createMusicNotes() {
    const notes = ['♪', '♫', '♬', '♩'];
    for (let i = 0; i < 20; i++) {
        const note = document.createElement('div');
        note.className = 'music-note';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.cssText = `
            --x: ${(Math.random() - 0.5) * 200}px;
            left: ${Math.random() * 100}vw;
            text-shadow: 0 0 5px #fff, 0 0 10px #ff4da6;
            font-size: ${24 + Math.random() * 12}px;
        `;
        document.body.appendChild(note);
        setTimeout(() => note.remove(), 2000);
    }
}

function createFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            document.body.appendChild(firework);
            setTimeout(() => firework.remove(), 1000);
        }, i * 300);
    }
}

function createParticles() {
    const container = document.querySelector('.container');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${getRandomColor()};
            border-radius: 50%;
            pointer-events: none;
            animation: particle 1s ease-out forwards;
            left: ${50 + (Math.random() - 0.5) * 100}%;
            top: ${50 + (Math.random() - 0.5) * 100}%;
        `;
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#ff8e53', '#4ecdc4', '#45b7d1', '#96c93d'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add this CSS to your style.css
const style = document.createElement('style');
style.textContent = `
    @keyframes particle {
        0% {
            transform: scale(0) translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: scale(1) translate(
                ${(Math.random() - 0.5) * 200}px,
                ${(Math.random() - 0.5) * 200}px
            );
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add this function to create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d', '#ff8e53', '#fff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${3 + Math.random() * 2}s linear forwards;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

function playMusic(type) {
    switch(type) {
        case 'dance':
            playMelody([
                // Happy dance tune
                {note: 440, duration: 0.2},  // A4
                {note: 440, duration: 0.2},  // A4
                {note: 494, duration: 0.2},  // B4
                {note: 523, duration: 0.4},  // C5
                {note: 523, duration: 0.2},  // C5
                {note: 494, duration: 0.2},  // B4
                {note: 440, duration: 0.4},  // A4
                {note: 392, duration: 0.4},  // G4
                {note: 440, duration: 0.6},  // A4
            ]);
            break;
        case 'celebrate':
            playMelody([
                // Triumphant melody
                {note: 523, duration: 0.2},  // C5
                {note: 659, duration: 0.2},  // E5
                {note: 784, duration: 0.4},  // G5
                {note: 784, duration: 0.2},  // G5
                {note: 880, duration: 0.4},  // A5
                {note: 784, duration: 0.6},  // G5
                {note: 659, duration: 0.4},  // E5
                {note: 523, duration: 0.8},  // C5
            ]);
            break;
        case 'party':
            playMelody([
                // Upbeat party sequence
                {note: 587, duration: 0.2},  // D5
                {note: 587, duration: 0.2},  // D5
                {note: 784, duration: 0.2},  // G5
                {note: 784, duration: 0.2},  // G5
                {note: 880, duration: 0.2},  // A5
                {note: 784, duration: 0.2},  // G5
                {note: 698, duration: 0.2},  // F5
                {note: 659, duration: 0.2},  // E5
                {note: 587, duration: 0.4},  // D5
                {note: 523, duration: 0.2},  // C5
                {note: 587, duration: 0.6},  // D5
            ]);
            break;
        case 'superCelebrate':
            playMelody([
                // Epic celebration theme
                {note: 523, duration: 0.2},  // C5
                {note: 659, duration: 0.2},  // E5
                {note: 784, duration: 0.2},  // G5
                {note: 1047, duration: 0.4}, // C6
                {note: 988, duration: 0.2},  // B5
                {note: 880, duration: 0.2},  // A5
                {note: 784, duration: 0.2},  // G5
                {note: 880, duration: 0.2},  // A5
                {note: 988, duration: 0.4},  // B5
                {note: 1047, duration: 0.8}, // C6
            ]);
            break;
    }
}

function playMelody(notes) {
    let timeOffset = 0;
    notes.forEach(({note, duration}) => {
        setTimeout(() => playNote(note, duration), timeOffset * 1000);
        timeOffset += duration;
    });
}

function stopAllMusic() {
    const audios = ['danceMusic', 'celebrateMusic', 'partyMusic', 'superMusic'];
    audios.forEach(id => {
        const audio = document.getElementById(id);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

// Update playNote to make sounds smoother
function playNote(frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    // Smoother attack and release
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + duration - 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Add these functions to your existing script.js
const gradeSlider = document.getElementById('gradeSlider');
const gradeValue = document.getElementById('gradeValue');

gradeSlider.addEventListener('input', function() {
    gradeValue.textContent = this.value + '%';
});

function submitGrade() {
    const currentValue = parseInt(gradeSlider.value);
    if (currentValue < 100) {
        // Add maximizing animation
        gradeSlider.classList.add('slider-maximizing');
        
        // Create sparkles
        createSparkles();
        
        // Play ascending tone
        playAscendingTone();
        
        // Animate to 100
        let value = currentValue;
        const interval = setInterval(() => {
            if (value < 100) {
                value += 1;
                gradeSlider.value = value;
                gradeValue.textContent = value + '%';
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    gradeSlider.classList.remove('slider-maximizing');
                    showMaximizedMessage();
                }, 1000);
            }
        }, 20);
    }
}

function createSparkles() {
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'particle';
        sparkle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: gold;
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${50 + (Math.random() - 0.5) * 100}%;
            animation: sparkle 1s ease-out forwards;
        `;
        document.querySelector('.slider-container').appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

function playAscendingTone() {
    const duration = 1000;
    const startFreq = 200;
    const endFreq = 800;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(endFreq, audioContext.currentTime + duration/1000);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration/1000);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration/1000);
}

function showMaximizedMessage() {
    const message = document.createElement('div');
    message.className = 'maximized-message';
    message.textContent = "Perfect Score! As it should be! 🌟";
    message.style.cssText = `
        color: gold;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-top: 10px;
        animation: fadeIn 0.5s ease-out;
    `;
    document.querySelector('.grading-section').appendChild(message);
}
