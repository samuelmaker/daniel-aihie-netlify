import ContentGrid from "@/components/ContentGrid";
import Layout from "@/components/Layout";
import { fetchPosts } from "@/libs/getData";
import path from "path";

const editsDirectory = path.join(process.cwd(), "decap_cms/content/edits");

const Edits = async () => {
  const { allEdits } = await getData();

  return (
    <Layout className="bg-secondary text-black">
      <div>
        <div className="max-w-6xl mx-auto px-5">
          {allEdits.length > 0 && (
            <ContentGrid
              title="Edits"
              items={allEdits}
              collection="edits"
              priority
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Edits;

const getData = async () => {
  const allEdits = fetchPosts(editsDirectory);

  return {
    allEdits,
  };
};
