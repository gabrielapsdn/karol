const $ = (selector) => document.querySelector(selector);
const toast = $('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

const startDate = new Date(2026, 3, 30);
function updateDaysTogether() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.max(0, Math.floor((today - startDate) / 86400000));
  $('#daysTogether').textContent = days.toLocaleString('pt-BR');
}
updateDaysTogether();

const heroPhoto = $('#heroPhoto');
const photoFrame = $('.photo-frame');
heroPhoto.addEventListener('load', () => photoFrame.classList.add('has-photo'));
heroPhoto.addEventListener('error', () => {
  photoFrame.classList.remove('has-photo');
});
if (heroPhoto.complete && heroPhoto.naturalWidth) photoFrame.classList.add('has-photo');

function spotifyEmbedUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    if (!['open.spotify.com', 'www.open.spotify.com'].includes(url.hostname)) return null;
    const match = url.pathname.match(/^\/(playlist|album|track|episode|show)\/([a-zA-Z0-9]+)\/?$/);
    if (!match) return null;
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
  } catch {
    return null;
  }
}

const playlistInput = $('#playlistUrl');
const defaultPlaylist = 'https://open.spotify.com/playlist/4I4ZeW2VxNBsDpxUD0jpdp';
const savedPlaylist = localStorage.getItem('ourSpotifyPlaylist') || defaultPlaylist;
playlistInput.value = savedPlaylist;
function loadPlaylist() {
  const embedUrl = spotifyEmbedUrl(playlistInput.value.trim());
  if (!embedUrl) {
    showToast('Cole um link válido de playlist, álbum ou música do Spotify.');
    return;
  }
  localStorage.setItem('ourSpotifyPlaylist', playlistInput.value.trim());
  $('#spotifyEmbed').innerHTML = `<iframe title="Player do Spotify" src="${embedUrl}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
  $('#spotifyCard').classList.add('has-embed');
}
$('#loadPlaylist').addEventListener('click', loadPlaylist);
playlistInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') loadPlaylist();
});
loadPlaylist();

$('#heartButton').addEventListener('click', (event) => {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = ['♥', '♡', '💗'][Math.floor(Math.random() * 3)];
  heart.style.left = `${event.clientX}px`;
  heart.style.top = `${event.clientY}px`;
  document.body.append(heart);
  setTimeout(() => heart.remove(), 1600);
  showToast('mandando todo o meu amor para você ♡');
});

