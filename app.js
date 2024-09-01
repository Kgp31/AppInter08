// Variables globales
const btnSearch = document.getElementById('btnSearch');
const inputSearch = document.getElementById('searchArtista');
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
        const response = await fetch(url, options);
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        console.error('Error fetching the artist data:', error);
    }
};

const displayResults = (data) => {
    const musicContainer = document.querySelector('.musicaArtista');
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
            musicContainer.appendChild(trackElement);
        });
    } else {
        musicContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    }
};
