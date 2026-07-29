import { PageLayout } from "../components/common/PageLayout";
import { Button } from "../components/common/Button";

export const NotFoundPage = () => {
    return (
      <PageLayout
        title="404 Page Not Found"
        subtitle="The page you are looking for might have been removed or is temporarily unavailable."
      >

      <Button to="/">
          Back to Home
      </Button>
      </PageLayout>
    );
  }
