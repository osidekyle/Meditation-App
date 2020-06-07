const app = () =>{
    const song = document.querySelector('.song');
    const play= document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");


    //Sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //Time display
    const timeDisplay = document.querySelector('.time-display');
    //Get length of outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength)
    //Duration
    let fakeDuration=600;



    outline.style.strokeDasharray=outlineLength;
    outline.style.strokeDashoffset=outlineLength;



    //play sound
    play.addEventListener("click",()=>{
        checkPlaying(song);
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
    let seconds=Math.floor(elapsed % 60);
    let minutes= Math.floor(elapsed/60);


    //Animate circle
    let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
    outline.style.strokeDashoffset=progress;
    //
    timeDisplay.textContent=`${minutes}:${seconds}`;
}
};

app();