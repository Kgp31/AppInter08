// Variables globales
const btnSearch = document.getElementById('btnSearch');
const inputSearch = document.getElementById('searchArtista');
const musicContainer = document.querySelector('.musicaArtista');
const loadingIndicator = document.querySelector('.loading');
let playlist = null;

btnSearch.addEventListener('click', () => {
    const artist = inputSearch.value;
    if (artist.trim().length > 0) {
        searchArtist(artist);
    }
});

const searchArtist = async (name) => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${name}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b5e30799e9msh599e4d63e425c2bp1c8811jsn7e457496f486',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        showLoading(true);
        const response = await fetch(url, options);
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        console.error('Error fetching the artist data:', error);
        displayError('Error fetching the artist data. Please try again later.');
    } finally {
        showLoading(false);
    }
};

const displayResults = (data) => {
    musicContainer.innerHTML = ''; // Limpiar resultados anteriores

    if (data && data.data && data.data.length > 0) {
        data.data.forEach(track => {
            const trackElement = document.createElement('div');
            trackElement.classList.add('track');
            trackElement.innerHTML = `
                <img src="${track.album.cover}" alt="${track.title}">
                <div class="track-info">
                    <h3>${track.title}</h3>
                    <p>${track.artist.name}</p>
                </div>
            `;
            trackElement.addEventListener('click', () => {
                selectTrack(track);
            });
            musicContainer.appendChild(trackElement);
        });
    } else {
        musicContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    }
};

const selectTrack = (track) => {
    const selectedTrackImg = document.getElementById('selected-track-img');
    const selectedTrackContainer = document.querySelector('.selected-track');

    selectedTrackImg.src = track.album.cover;
    selectedTrackImg.alt = track.title;
    selectedTrackContainer.style.display = 'flex';
};

const displayError = (message) => {
    musicContainer.innerHTML = `<p class="error">${message}</p>`;
};

const showLoading = (isLoading) => {
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
};

// Añadir funcionalidad a los botones de reproducción
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');

playBtn.addEventListener('click', () => {
    // Lógica para reproducir la canción
    console.log('Reproduciendo canción');
});

pauseBtn.addEventListener('click', () => {
    // Lógica para pausar la canción
    console.log('Pausando canción');
});
