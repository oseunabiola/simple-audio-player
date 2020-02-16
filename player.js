const _ = (selector) => {
    return document.querySelector(selector);
};


let audioFile = '';
_('button').addEventListener('click', (e)=>{
    e.preventDefault();
    filePath = 'audio_files/' + _('[name=file]').files[0].name;
    audioFile = new Audio(filePath);
    togglePlayPause();
});

_('.seeker').addEventListener('change', ()=>{
    jumpTo(_('.seeker').value);
});

_('.volume-level').addEventListener('change', ()=>{
    audioFile.volume = _('.volume-level').value;
    if(audioFile.muted) {
        audioFile.muted = false;
        _(".mute").classList.remove('fa-volume-mute');
        _(".mute").classList.add('fa-volume-up');
    }
});

_('.mute').addEventListener('click', ()=>{
    if(!audioFile.muted) {
        audioFile.muted = true;
        _(".mute").classList.remove('fa-volume-up');
        _(".mute").classList.add('fa-volume-mute');
    } else {
        audioFile.muted = false;
        _(".mute").classList.remove('fa-volume-mute');
        _(".mute").classList.add('fa-volume-up');
    }
});

_('.stop').addEventListener('click', ()=>{
    audioFile.pause();
    audioFile.currentTime = 0;
    _(".play-pause").classList.remove('fa-pause-circle');
    _(".play-pause").classList.add('fa-play-circle');
});

_('.rewind').addEventListener('click', ()=>{
    audioFile.currentTime = audioFile.currentTime - 5;
});

_('.forward').addEventListener('click', ()=>{
    audioFile.currentTime = audioFile.currentTime + 5;
});

const togglePlayPause = ()=> {
    if(audioFile.paused) {
        audioFile.play();
        _(".play-pause").classList.remove('fa-play-circle');
        _(".play-pause").classList.add('fa-pause-circle');
    } else {
        audioFile.pause();
        _(".play-pause").classList.remove('fa-pause-circle');
        _(".play-pause").classList.add('fa-play-circle');;
    }
    
    audioFile.addEventListener('loadeddata',()=>{
        _('.duration').textContent = formatDuration(audioFile.duration);
        _('.seeker').max = Math.floor(audioFile.duration);
    });

    audioFile.addEventListener('ended',()=>{
        audioFile.currentTime = 0;
        _(".play-pause").classList.remove('fa-pause-circle');
        _(".play-pause").classList.add('fa-play-circle');
    });

    audioFile.volume = _('.volume-level').value;

    setInterval(()=>{
        _('.current-time').textContent = formatDuration(audioFile.currentTime);
        _('.seeker').value = Math.floor(audioFile.currentTime);
    }, 1000);
};
_(".play-pause").addEventListener('click', ()=>{
    // if(!audioFile.src) {
    //     audioFile.src = filePath;
    // };
    togglePlayPause();
});
const jumpTo = (c)=> {
    audioFile.currentTime = c;
};

const formatDuration = (duration)=> {
    let hrs = Math.floor(duration/3600);
    let mins = Math.floor(duration / 60);
    let secs = Math.floor(duration % 60);
    let timeString = '';
    hrs = (hrs < 10 && hrs > 0) ? hrs = '0' + hrs : hrs;
    mins = (mins < 10) ? mins = '0' + mins : mins;
    secs = (secs < 10) ? secs = '0' + secs : secs;
    timeString =  (hrs === 0) ? mins + ":" + secs : hrs + ":" + mins + ":" + secs;
    return timeString;
};