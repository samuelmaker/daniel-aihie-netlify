import ContentGrid from "@/components/ContentGrid";
import DateFormatter from "@/components/DateFormatter";
import Layout from "@/components/Layout";
import { fetchPosts, loadEditBySlug } from "@/libs/getData";
import markdownToHtml from "@/libs/markdownToHtml";
import { absoluteUrl } from "@/libs/utils";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import path from "path";

const editsDirectory = path.join(process.cwd(), "decap_cms/content/edits");

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
          url: absoluteUrl(edit?.thumbnail || "/assets/images/og-image.png"),
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
      images: absoluteUrl(edit?.thumbnail || "/assets/images/og-image.png"),
    },
  };
};

const Edit = async (params: Params) => {
  const { edit, moreEdits, content } = await getData(params);

  return (
    <Layout className="bg-secondary text-black">
      <div className="pt-8 md:pt-16">
        <div className="w-full relative max-w-sm mx-auto px-4">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-green-500 to-teal-500 transform scale-[1] bg-green-500 rounded-full blur-3xl" />
          <div className="relative h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
            <Image
              alt={edit.title}
              src={edit?.headerImg || edit.thumbnail}
              width={600}
              height={400}
              className="object-cover mx-auto"
              priority
            />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5">
        <article className="py-16 md:py-32 article-box">
          <div className="text-center md:text-left flex flex-col justify-center items-center md:justify-normal md:items-start">
            <h1
              data-aos="fade-down"
              className="font-primary text-2xl font-bold md:text-4xl mb-2"
            >
              {edit.title}
            </h1>
            <div
              data-aos="fade-down"
              className="md:mb-12 text-slate-600 capitalize font-openSauceSans font-medium"
            >
              Launched on <DateFormatter dateString={edit.date} />{" "}
              {edit?.author ? `by ${edit?.author}` : null}.
            </div>

            <div className="max-w-2xl mx-auto">
              <div
                data-aos="fade-down"
                className="prose lg:prose-xl font-openSauceSans font-medium"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </article>
        <div>
          {moreEdits.length > 0 && (
            <div className="mt-8">
              <ContentGrid
                title="Other edits"
                items={moreEdits}
                collection="edits"
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Edit;

const getData = async ({ params }: Params) => {
  const edit = loadEditBySlug(editsDirectory, params.slug);
  if (!edit) {
    notFound();
  }
  const content = await markdownToHtml(edit.content);
  const moreEdits = fetchPosts(editsDirectory).filter(
    (it) => it.slug !== params.slug
  );
  return {
    edit,
    content,
    moreEdits,
  };
};
