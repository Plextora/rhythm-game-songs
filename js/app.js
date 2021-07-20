// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
{
	name: "Sidetracked Day",
	artist: "VINXIS",
	image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ff4.bcbits.com%2Fimg%2Fa3760213901_10.jpg&f=1&nofb=1",
	path: "https://plextora.github.io/rhythm-game-songs/Songs/Sidetracked%20Day.mp3"
},
{
	name: "Crack Traxxxx",
	artist: "Lite Show Magic",
	image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FwExQLV7Ndps%2Fhqdefault.jpg&f=1&nofb=1",
	path: "https://plextora.github.io/rhythm-game-songs/Songs/Crack%20Traxxxx.mp3"
},
{
	name: "君のせい",
	artist: "the peggies",
	image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fd2HmJGrVbxc%2Fmaxresdefault.jpg&f=1&nofb=1",
	path: "https://plextora.github.io/rhythm-game-songs/Songs/the%20peggies%20-%20Kimi%20no%20Sei.mp3",
},
{
    name: "ヒトリゴト",
    artist: "ClariS",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FzyDEPvZ2_Yg%2Fmaxresdefault.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/Hitorigoto.mp3",
},
{
    name: "Asphyxia",
    artist: "Cö shu Nie",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FZB9UvUJL_lE%2Fmaxresdefault.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/Asphyxia.mp3",
},
{
    name: "Image Material",
    artist: "Tatsh",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fx0H_WPzoTb0%2Fmaxresdefault.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/image-material.mp3",
},
{
    name: "Anoneanoneanoneanoneanoneanoneanoneanone Kouji ga Okureteruno",
    artist: "Light",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fb8tqrfxDiBQ%2Fhqdefault.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/Anoneanoneanone%20Kouji%20ga%20Okureteruno.mp3",
},
{
    name: "Marisa wa Taihen na Mono wo Nusunde Ikimashita",
    artist: "IOSYS",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Ft2scvPPFGH8%2Fmaxresdefault.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/Marisa%20wa%20Taihen%20na%20Mono%20wo%20Nusunde%20Ikimashita.mp3",
},
{
    name: "U.N. Owen Was Her",
    artist: "Nico Nico Douga",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.youtube.com%2Fvi%2FVIop055eJhU%2F0.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/U.N.%20Owen%20Was%20Her.mp3",
},
{
    name: "初音ミクの消失",
    artist: "cosMo@BousouP feat.Hatsune Miku",
    image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-bHpdzY0wQ_w%2FU594NLreYsI%2FAAAAAAAAAyk%2Fcj37IGu-vns%2Fw1200-h630-p-k-nu%2FMiku-Hatsune-Miku-no-Shoushitsu.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/shousitu.mp3",
},
{
    name: "Atama no Taisou",
    artist: "Hatsune Miku",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FgvJ7L_g28ng%2Fmaxresdefault.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/atama%20no%20taisou.mp3",
},
{
    name: "Rubik's Cube",
    artist: "Nanahoshi Kangengakudan feat. Hatsune Miku",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FN1gnMW7cXzs%2Fmaxresdefault.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/Rubik's%20Cube.mp3",
},
{
    name: "Blastix Riotz",
    artist: "かめりあ",
    image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fp.eagate.573.jp%2Fgame%2Fbemani%2Ffansite%2Fp%2Fimages%2Fmusic%2F201508_jk%2F201508_sv_13.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/Camellia%20-%20Blastix%20Riotz.mp3",
},
{
    name: "第三空中実験",
    artist: "黒魔",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FROZJJEBa7E4%2Fmaxresdefault.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/Chroma%20-%20Third%20aerial%20experiment.mp3",
},
{
    name: "Louder than steel",
    artist: "ryu5150",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0WZ0zdDLALk%2Fmaxresdefault.jpg&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/ryu5150%20-%20Louder%20than%20steel.mp3",
},
{
    name: "Bad Elixir",
    artist: "xi",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.cytoid.io%2Flevels%2Fbundles%2FmbkrnQT3H1XLdmahE3T8NOl6mqpj71k4k26LoJYiKBMW2RJqKOd4L6imMZh2BIUQ90%2Fbg_gamever.png&f=1&nofb=1",
    path: "https://plextora.github.io/rhythm-game-songs/Songs/xi%20-%20Bad%20Elixir.mp3",
},
];

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    
    function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    // Construct a color withe the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // Set the background to the new color
    document.body.style.background = bgColor;
    }
    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    
    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;
        
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;
        
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
        }
        
        function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }

        function seekTo() {
            // Calculate the seek position by the
            // percentage of the seek slider
            // and get the relative duration to the track
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            // Set the current track position to the calculated seek position
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            // Set the volume according to the
            // percentage of the volume slider set
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Display the updated duration
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
            
            // Load the first track in the tracklist
loadTrack(track_index);
