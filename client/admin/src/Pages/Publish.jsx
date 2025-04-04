import Publish from "../components/Publish/Publish"
import "../styles/components/Publish/publish.css"

const PublishPage = () => {
  return (
  <>
  <main className="litenote-publish-body">
  <section className="litenote-publish-submit-story">
      <Publish />
  </section>
  </main>
  </>
  )
}

export default PublishPage