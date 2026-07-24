import { TmdbAttribution } from "../components/icons/TmbdIcon";

export const AboutPage = () => {
  return (
    <>
      <h1>ABOUT</h1>
      <p>This web serves as a comprehensive Movie Database where users can explore the latest cinematic releases and manage their personal watch-lists. The platform allows users to browse movies categorized by popularity, ratings, and release schedules.</p>

      <div>
        <TmdbAttribution />
        <p>
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
      </div>

    </>
  )
}
