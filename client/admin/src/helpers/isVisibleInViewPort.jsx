export const isVisibleInViewport = (element, threshold) => {
    if (!element) return false; // Ensure the element exists to avoid errors

    const rect = element.getBoundingClientRect();
    const elementHeight = rect.height;

    // Calculate the required visible height (80% of the element's height)
    const visibleHeightThreshold = elementHeight * threshold;

    return (
        rect.top >= -visibleHeightThreshold && // Allow some part of the element to be above the viewport
        rect.left >= 0 &&
        rect.bottom - visibleHeightThreshold <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
