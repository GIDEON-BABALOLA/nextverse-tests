import "../../styles/components/Home/popularstories.css"

const PopularStories = () => {
  const featuredStories = [
    {
      key : 1,
      title: 'The Journey of a Lifetime',
      excerpt: 'Join me on a thrilling adventure through the mountains and valleys of Nepal.'
    },
    {
      key : 2,
      title: 'Overcoming Adversity',
      excerpt: 'Read how I overcame a life-changing illness and found strength within.'
    },
    {
      key :3,
      title: 'Love at First Sight',
      excerpt: 'A heartwarming tale of two souls destined to be together.'
    },
    {
      key : 4,
      title: 'The Art of Mindfulness',
      excerpt: 'Discover the transformative power of mindfulness in this inspiring story.'
    }
  ];
  return (
   <>
    <section className="popular-stories-featured-stories">
      <h2>Popular Stories</h2>
      <div className="popular-stories-story-grid">
      {featuredStories.map((item) => (
       <div className="popular-stories-story-card" key={item.key}>
<h3>{item.title}</h3>
<p>{item.excerpt}</p>
</div>
      ))
      }
         {/* Featured stories will be dynamically added here  */}
      </div>
    </section>
   </>
  )
}

export default PopularStories