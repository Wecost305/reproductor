document.addEventListener('DOMContentLoaded', () => {
    const playlistData = [
        { title: "El Hombre Delgado Que No Flaqueará Jamás", duration: "05:10", file: "01-el-hombre-delgado.mp3" },
        { title: "Porque Las Cosas Cambian", duration: "04:20", file: "02-porque-las-cosas-cambian.mp3" },
        { title: "Bujías Para El Dolor", duration: "04:35", file: "03-bujias-para-el-dolor.mp3" },
        { title: "Si No Fuera Por Ti", duration: "04:30", file: "04-si-no-fuera-por-ti.mp3" },
        { title: "Hay Muy Poca Gente", duration: "04:45", file: "05-hay-muy-poca-gente.mp3" },
        { title: "El Porqué de Tus Silencios", duration: "04:50", file: "06-el-porque-de-tus-silencios.mp3" },
        { title: "Doscientos Huesos y un Collar de Calaveras", duration: "04:15", file: "07-doscientos-huesos.mp3" },
        { title: "Irremediablemente Cotidiano", duration: "05:05", file: "08-irremediablemente-cotidiano.mp3" },
        { title: "Esto Es Hellville", duration: "02:40", file: "09-esto-es-hellville.mp3" },
        { title: "La Herida Secreta", duration: "04:00", file: "10-la-herida-secreta.mp3" },
        {title: "Aqui", duration: "05:22", file: "11-Aqui.mp3" }
    ];

    const audioPlayer = document.getElementById('audio-player');
    const playlistElement = document.getElementById('playlist');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSongTitleElement = document.querySelector('.current-song-title');

    let currentSongIndex = 0;
    let isPlaying = false;

    // Cargar la lista de canciones en el HTML
    function loadPlaylist() {
        playlistData.forEach((song, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;
            li.innerHTML = `
                <span class="song-title">${index + 1}. ${song.title}</span>
                <span class="song-duration">${song.duration}</span>
            `;
            li.addEventListener('click', () => {
                playSong(index);
            });
            playlistElement.appendChild(li);
        });
    }

    // Cargar una canción específica
    function loadSong(index) {
        const song = playlistData[index];
        currentSongIndex = index;
        audioPlayer.src = `audio/${song.file}`;
        currentSongTitleElement.textContent = song.title;
        updateActiveSong();
    }
    
    // Reproducir la canción actual
    function playCurrentSong() {
        isPlaying = true;
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    // Pausar la canción actual
    function pauseCurrentSong() {
        isPlaying = false;
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    // Reproducir o pausar
    function togglePlayPause() {
        if (isPlaying) {
            pauseCurrentSong();
        } else {
            playCurrentSong();
        }
    }

    // Función principal para reproducir una canción del listado
    function playSong(index) {
        loadSong(index);
        playCurrentSong();
    }

    // Canción anterior
    function playPrevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlistData.length) % playlistData.length;
        playSong(currentSongIndex);
    }

    // Siguiente canción
    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlistData.length;
        playSong(currentSongIndex);
    }
    
    // Actualizar visualmente la canción activa en la lista
    function updateActiveSong() {
        const listItems = document.querySelectorAll('#playlist li');
        listItems.forEach(item => item.classList.remove('active'));
        listItems[currentSongIndex].classList.add('active');
    }

    // Event Listeners
    playBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPrevSong);
    nextBtn.addEventListener('click', playNextSong);
    audioPlayer.addEventListener('ended', playNextSong);

    // Inicializar
    loadPlaylist();
    loadSong(0); // Carga la primera canción pero no la reproduce
});
