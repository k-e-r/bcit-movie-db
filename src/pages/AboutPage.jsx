import { PageLayout } from "../components/common/PageLayout";
import { TmdbAttribution } from "../components/icons/TmbdIcon";

export const AboutPage = () => {
  return (
    <PageLayout
      title="ABOUT"
      description="This web serves as a comprehensive Movie Database where users can explore the latest cinematic releases and manage their personal watch-lists. The platform allows users to browse movies categorized by popularity, ratings, and release schedules."
    >
      <div className="flex flex-col items-center gap-3 text-xs md:text-sm text-gray-600">
        <TmdbAttribution />
        <p>
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
      </div>
    </PageLayout>
  );
};
