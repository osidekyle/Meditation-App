const app = () =>{
    const song = document.querySelector('.song');
    const play= document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");


    //Sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Get length of outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength)
    //Duration
    let fakeDuration=600;



    outline.style.strokeDasharray=outlineLength;
    outline.style.strokeDashoffset=outlineLength;

    //Pick different sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click',function(){
            song.src=this.getAttribute('data-sound');
            video.src=this.getAttribute('data-video');
            checkPlaying(song);
        })
    })

    //play sound
    play.addEventListener("click",()=>{
        checkPlaying(song);
    });

    //Select time
    timeSelect.forEach(option=>{
        option.addEventListener('click',function(){
            fakeDuration = this.getAttribute('data-time');
            song.currentTime=0;
            timeDisplay.textContent=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
        });
    });

    //Create function to stop and play sounds
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            play.src="svg/pause.svg"
            video.play()
        }
        else{
            song.pause()
            play.src="svg/play.svg"
            video.pause()
        }
    }

//Animate circle
song.ontimeupdate = ()=>{
    let currentTime=song.currentTime;
    
    let elapsed = fakeDuration-currentTime;
    console.log(elapsed)
    let seconds=Math.floor(elapsed % 60);
    let minutes= Math.floor(elapsed/60);


    //Animate circle
    let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
    outline.style.strokeDashoffset=progress;
    //
    timeDisplay.textContent=`${minutes}:${seconds}`;

    if(currentTime>=fakeDuration){
        song.pause();
        song.currentTime=0;
        play.src="svg/play.svg"
        video.pause();

    }
}
};

app();