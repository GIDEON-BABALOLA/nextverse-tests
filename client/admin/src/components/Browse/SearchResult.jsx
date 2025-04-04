const SearchResult = () => {
    // Sample data for stories
const stories = [
    {
      title: 'The Endless Journey',
      excerpt: 'A thrilling tale of adventure and self-discovery.',
      category: 'Adventure'
    },
    {
      title: 'Love Conquers All',
      excerpt: 'A heartwarming romance that will melt your heart.',
      category: 'Romance'
    },
    {
      title: 'The Untold Truth',
      excerpt: 'A powerful memoir that exposes the harsh realities of life.',
      category: 'Memoir'
    },
    {
      title: 'The Mythical Realm',
      excerpt: 'Enter a world of fantasy and magic in this captivating novel.',
      category: 'Fiction'
    },
    {
      title: 'The Science Behind Miracles',
      excerpt: 'Explore the fascinating world of science through real-life stories.',
      category: 'Non-Fiction'
    }
  ];
  return (
    <>
    {stories.map((story) => (
      <div className="litenote-browse-story-card" key={story.title}>
<h3>{story.title}</h3>
<p>{story.excerpt}</p>
        </div>
    ))}
    </>
  )
}

export default SearchResult