import ContentGrid from "@/components/ContentGrid";
import Layout from "@/components/Layout";
import { fetchPosts } from "@/libs/getData";
import path from "path";

const creativeDirectory = path.join(
  process.cwd(),
  "decap_cms/content/creative"
);

const Creative = async () => {
  const { allCreatives } = await getData();

  return (
    <Layout className="bg-secondary text-black">
      <div>
        <div className="max-w-6xl mx-auto px-5">
          {allCreatives.length > 0 && (
            <ContentGrid
              title="Creative"
              items={allCreatives}
              collection="creative"
              priority
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Creative;

const getData = async () => {
  const allCreatives = fetchPosts(creativeDirectory);

  return {
    allCreatives,
  };
};
