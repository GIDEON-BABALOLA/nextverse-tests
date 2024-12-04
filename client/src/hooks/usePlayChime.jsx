export const usePlayChime = () => {
    const playChime = () => {
        const audio = new Audio("https://res.cloudinary.com/doctr0fct/video/upload/v1733257995/Assets/audio/chime_mbdgti.mp3")
        audio.play()
    }
    return { playChime }
}