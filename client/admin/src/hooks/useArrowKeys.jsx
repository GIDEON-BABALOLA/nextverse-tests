import { useEffect } from 'react';
const ArrowKeyDetector = ({backBtn, upBtn, nextBtn, downBtn }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          backBtn()
          break;
        case 'ArrowUp':
          upBtn()
          break;
        case 'ArrowRight':
          nextBtn()
          break;
        case 'ArrowDown':
          downBtn();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [backBtn, nextBtn, upBtn, downBtn]);

return <div></div>;
}

export default ArrowKeyDetector;
