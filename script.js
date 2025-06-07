// Time update
function updateTime() {
    const now = new Date();
    const options = { 
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    };
    
    document.getElementById('current-date').textContent = now.toLocaleDateString('vi-VN', options) + ' ICT';
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('current-time').innerHTML = `${hours}:${minutes}<span class="seconds">:${seconds}</span>`;
}

setInterval(updateTime, 1000);
updateTime();

// Copy email function
function copyEmail() {
    const email = 'luongcongtruong2007@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    });
}

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Load saved theme or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Scroll to Top
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// YouTube Player
let player;
const playlist = [
    '713huzVp0dY',
    'FN7ALfpGxiI',
    // Add more video IDs
];
let currentVideoIndex = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: playlist[currentVideoIndex],
        playerVars: {
            'autoplay': 0,
            'controls': 0,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    updateSongTitle();
    const volumeSlider = document.getElementById('volume-slider');
    volumeSlider.value = player.getVolume();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNext();
    }
    updatePlayButton();
}

// Playback Controls
document.getElementById('play-btn').addEventListener('click', togglePlay);
document.getElementById('next-btn').addEventListener('click', playNext);
document.getElementById('prev-btn').addEventListener('click', playPrev);
document.getElementById('loop-btn').addEventListener('click', toggleLoop);
document.getElementById('volume-slider').addEventListener('input', (e) => {
    player.setVolume(e.target.value);
});

function togglePlay() {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
    updatePlayButton();
}

function playNext() {
    currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
    player.loadVideoById(playlist[currentVideoIndex]);
    updateSongTitle();
}

function playPrev() {
    currentVideoIndex = (currentVideoIndex - 1 + playlist.length) % playlist.length;
    player.loadVideoById(playlist[currentVideoIndex]);
    updateSongTitle();
}

function toggleLoop() {
    const loopBtn = document.getElementById('loop-btn');
    const isLooping = loopBtn.classList.toggle('active');
    // Implementation depends on your needs
}

function updatePlayButton() {
    const playBtn = document.getElementById('play-btn');
    const icon = playBtn.querySelector('i');
    icon.className = player.getPlayerState() === YT.PlayerState.PLAYING ? 
        'fas fa-pause' : 'fas fa-play';
}

function updateSongTitle() {
    const titleElement = document.getElementById('song-title');
    // You can maintain a separate list of titles or fetch from YouTube API
    titleElement.textContent = 'Now playing: Video ' + (currentVideoIndex + 1);
}

// Progress Bar
setInterval(() => {
    if (player && player.getCurrentTime) {
        const progress = (player.getCurrentTime() / player.getDuration()) * 100;
        document.querySelector('.progress').style.width = `${progress}%`;
    }
}, 1000);

// Add loading animation to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.interest-card, .social-card, .info-cards > *');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
});

// Modal handling
const modal = document.getElementById('interestsModal');
const avatar = document.getElementById('profileAvatar');
const closeBtn = document.querySelector('.close-btn');

avatar.addEventListener('click', () => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Modal content switching
const defaultContent = document.getElementById('defaultContent');
const novelsContent = document.getElementById('novelsContent');
const audioCard = document.querySelector('[data-content="novels"]');
const backBtn = document.querySelector('.back-btn');
const modalContent = document.querySelector('.modal-content');

function showNovelsContent() {
    defaultContent.classList.add('hidden');
    novelsContent.classList.add('active');
    modalContent.classList.add('novels-view');
}

function showDefaultContent() {
    defaultContent.classList.remove('hidden');
    novelsContent.classList.remove('active');
    modalContent.classList.remove('novels-view');
}

audioCard.addEventListener('mouseenter', showNovelsContent);
backBtn.addEventListener('click', showDefaultContent);

// Handle mouse leaving the modal
document.querySelector('.modal-content').addEventListener('mouseleave', (e) => {
    // Check if the mouse is completely outside the modal
    const rect = e.target.getBoundingClientRect();
    if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
    ) {
        showDefaultContent();
    }
}); 