export default async function playAudio(audioSrc) {
    const audio = new Audio();
    audio.src = audioSrc;
    audio.preload = 'auto';
    audio.controls = false;
    audio.play();

}