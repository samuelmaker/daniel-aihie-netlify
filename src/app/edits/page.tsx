import ContentGrid from "@/components/ContentGrid";
import Layout from "@/components/Layout";
import { listEditsContent } from "@/libs/edits";

const Edits = async () => {
  const { allEdits } = await getData();

  console.log(allEdits);

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
  // const db = await load();

  // const allEdits = await db
  //   .find({ collection: "edits" }, ["publishedAt", "slug", "coverImage"])
  //   .sort({ publishedAt: -1 })
  //   .toArray();

  const allEdits = listEditsContent(1, 10);

  return {
    allEdits,
  };
};
