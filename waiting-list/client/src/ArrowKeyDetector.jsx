import { useEffect } from 'react';

function ArrowKeyDetector({ backBtn, nextBtn}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          backBtn()
          break;
        case 'ArrowUp':
          console.log('Up arrow key pressed');
          break;
        case 'ArrowRight':
          nextBtn()
          break;
        case 'ArrowDown':
          console.log('Down arrow key pressed');
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
  }, [backBtn, nextBtn]);

  return <div></div>;
}

export default ArrowKeyDetector;
