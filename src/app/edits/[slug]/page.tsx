import ContentGrid from "@/components/ContentGrid";
import DateFormatter from "@/components/DateFormatter";
import Layout from "@/components/Layout";
import { listEditsContent, loadEditBySlug } from "@/libs/edits";
import markdownToHtml from "@/libs/markdownToHtml";
import { absoluteUrl } from "@/libs/utils";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Params {
  params: {
    slug: string;
  };
}
export const generateMetadata = async (params: Params): Promise<Metadata> => {
  const { edit, content } = await getData(params);

  if (!edit) {
    return {};
  }

  return {
    title: edit.title,
    description: content,
    openGraph: {
      title: edit.title,
      description: content,
      type: "article",
      url: absoluteUrl(`/edits/${edit.slug}`),
      images: [
        {
          url: absoluteUrl(edit?.thumbnail || "/images/og-image.png"),
          width: 1200,
          height: 630,
          alt: edit.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: edit.title,
      description: content,
      images: absoluteUrl(edit?.thumbnail || "/images/og-image.png"),
    },
  };
};

const Edit = async (params: Params) => {
  const { edit, moreedits, content } = await getData(params);
  console.log(content);

  return (
    <Layout className="bg-secondary text-black">
      <div className="max-w-6xl mx-auto px-5">
        <article className="mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative mb-2 md:mb-4 sm:mx-0 aspect-square">
              <Image
                alt={edit.title}
                src={edit.thumbnail ?? ""}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div>
              <h1 className="font-primary text-2xl font-bold md:text-4xl mb-2">
                {edit.title}
              </h1>
              {/* <div className="hidden md:block md:mb-8 text-slate-600">
                Launched on <DateFormatter dateString={edit.publishedAt} />{" "}
                {edit?.author?.name ? `by ${edit?.author?.name}` : null}.
              </div>
              <div className="inline-block p-4 border mb-8 font-semibold text-lg rounded shadow">
                {edit.description}
              </div> */}
              <div className="max-w-2xl mx-auto">
                <div
                  className="prose lg:prose-xl"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        </article>
        <div className="">
          {moreedits.length > 0 && (
            <ContentGrid
              title="Other edits"
              items={moreedits}
              collection="edits"
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Edit;

const getData = async ({ params }: Params) => {
  // const db = await load();
  // const edit = await db
  //   .find<Edit>({ collection: "edits", slug: params.slug }, [
  //     "title",
  //     "publishedAt",
  //     "description",
  //     "slug",
  //     "author",
  //     "content",
  //     "coverImage",
  //   ])
  //   .first();
  // if (!edit) {
  //   notFound();
  // }
  // const content = await markdownToHtml(edit.content);
  // const moreedits = await db
  //   .find({ collection: "edits", slug: { $ne: params.slug } }, [
  //     "title",
  //     "slug",
  //     "coverImage",
  //   ])
  //   .toArray();
  // return {
  //   edit,
  //   content,
  //   moreedits,
  // };
  const edit = loadEditBySlug(params.slug);
  if (!edit) {
    notFound();
  }
  const content = await markdownToHtml(edit.content);
  const moreedits = listEditsContent().filter((it) => it.slug !== params.slug);
  return {
    edit,
    content,
    moreedits,
  };
};

// export const generateStaticParams = () => {
//   const posts = listEditsContent();
//   return posts.map((slug) => ({ slug }));
// };

export const getStaticPaths = async () => {
  const edits = listEditsContent();
  const paths = edits.map((edit) => ({
    params: { slug: edit.slug },
  }));
  return { paths, fallback: false };
};
