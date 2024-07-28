import chime from "../assets/chime.mp3"
export const usePlayChime = () => {
    const playChime = () => {
        const audio = new Audio(chime)
        audio.play()
    }
    return { playChime }
}