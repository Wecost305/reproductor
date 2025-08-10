document.addEventListener('DOMContentLoaded', ( ) => {
    // --- INICIO DE LA MODIFICACIÓN ---
    // Ahora, el campo 'file' contiene la URL completa de cada canción desde Cloudinary.
    // ¡IMPORTANTE! Debes reemplazar estas URLs de ejemplo con las tuyas.
    const playlistData = [
        { 
            title: "El Hombre Delgado Que No Flaqueará Jamás", 
            duration: "05:10", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787425/01-el-hombre-delgado_ui6on2.mp3" 
        },
        { 
            title: "Porque Las Cosas Cambian", 
            duration: "04:20", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787424/02-porque-las-cosas-cambian_jnmz8o.mp3" 
        },
        { 
            title: "Bujías Para El Dolor", 
            duration: "04:35", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787431/03-bujias-para-el-dolor_po5ji7.mp3" 
        },
        { 
            title: "Si No Fuera Por Ti", 
            duration: "04:30", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787418/04-si-no-fuera-por-ti_jfdsgq.mp3" 
        },
        { 
            title: "Hay Muy Poca Gente", 
            duration: "04:45", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787430/05-hay-muy-poca-gente_fwneqn.mp3" 
        },
        { 
            title: "El Porqué de Tus Silencios", 
            duration: "04:50", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787429/06-el-porque-de-tus-silencios_qva7t1.mp3" 
        },
        { 
            title: "Doscientos Huesos y un Collar de Calaveras", 
            duration: "04:15", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787461/07-doscientos-huesos_vdgqef.mp3" 
        },
        { 
            title: "Irremediablemente Cotidiano", 
            duration: "05:05", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787468/08-irremediablemente-cotidiano_xouqwb.mp3" 
        },
        { 
            title: "Esto Es Hellville", 
            duration: "02:40", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787460/09-esto-es-hellville_hvineq.mp3" 
        },
        { 
            title: "La Herida Secreta", 
            duration: "04:00", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787466/10-la-herida-secreta_d4axkb.mp3" 
        },
        { 
            title: "Aqui", 
            duration: "05:22", 
            file: "https://res.cloudinary.com/deqkg7aia/video/upload/v1754787471/11-Aqui_zvnvkz.mp3" 
        }
    ];
    // --- FIN DE LA MODIFICACIÓN ---

    const audioPlayer = document.getElementById('audio-player' );
    const playlistElement = document.getElementById('playlist');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSongTitleElement = document.querySelector('.current-song-title');

    let currentSongIndex = 0;
    let isPlaying = false;

    function loadPlaylist() {
        playlistElement.innerHTML = ''; // Limpiar la lista por si acaso
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

    function loadSong(index) {
        const song = playlistData[index];
        currentSongIndex = index;
        // --- MODIFICACIÓN CLAVE ---
        // Ahora, en lugar de construir una ruta, asignamos directamente la URL completa.
        audioPlayer.src = song.file; 
        currentSongTitleElement.textContent = song.title;
        updateActiveSong();
    }
    
    function playCurrentSong() {
        isPlaying = true;
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function pauseCurrentSong() {
        isPlaying = false;
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    function togglePlayPause() {
        if (!audioPlayer.src) { // Si no hay ninguna canción cargada, carga la primera
            playSong(0);
        } else if (isPlaying) {
            pauseCurrentSong();
        } else {
            playCurrentSong();
        }
    }

    function playSong(index) {
        loadSong(index);
        playCurrentSong();
    }

    function playPrevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlistData.length) % playlistData.length;
        playSong(currentSongIndex);
    }

    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlistData.length;
        playSong(currentSongIndex);
    }
    
    function updateActiveSong() {
        const listItems = document.querySelectorAll('#playlist li');
        listItems.forEach(item => item.classList.remove('active'));
        if (listItems[currentSongIndex]) {
            listItems[currentSongIndex].classList.add('active');
        }
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