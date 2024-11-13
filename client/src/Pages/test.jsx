useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Popular Stories Is Being Observed");

          // Determine selected category
          let selectedCategory = Object.keys(tabs).find((key) => tabs[key] === true);
          if (selectedCategory === "nonfiction") {
            selectedCategory = "non-fiction";
          }

          // Update the category and page in pageStatus
          setPageStatus((prevState) => ({
            ...prevState,
            category: selectedCategory,
            page,
          }));

          // Fetch stories for the current page
          const newStories = await fetchStories(selectedCategory, page);
          setStories((prevStories) => [...prevStories, ...newStories]);

          // Check if there is more data to load
          if (newStories.length === 0) {
            setHasMore(false);
            observer.unobserve(entry.target); // Stop observing if no more data
          } else {
            setPage((prevPage) => prevPage + 1); // Increment page number
          }

          observer.unobserve(entry.target); // Re-observe after data fetch
        }
      },
      { threshold: 0.1 } // 10% of the element needs to be visible
    );

    if (explorePageRef.current) {
      observer.observe(explorePageRef.current);
    }

    return () => {
      if (explorePageRef.current) {
        observer.unobserve(explorePageRef.current);
      }
    };
  }, [tabs, page, fetchStories]);