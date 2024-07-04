import DateFormatter from "@/components/DateFormatter";
import Layout from "@/components/Layout";
import { fetchPosts, loadEditBySlug } from "@/libs/getData";
import markdownToHtml from "@/libs/markdownToHtml";
import { absoluteUrl } from "@/libs/utils";
import { GetStaticPaths, Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import path from "path";

const creativeDirectory = path.join(
  process.cwd(),
  "decap_cms/content/creative"
);

interface Params {
  params: {
    slug: string;
  };
}
export const generateMetadata = async (params: Params): Promise<Metadata> => {
  const { creative, content } = await getData(params);

  if (!creative) {
    return {};
  }

  return {
    title: creative.title,
    description: content,
    openGraph: {
      title: creative.title,
      description: content,
      type: "article",
      url: absoluteUrl(`/creative/${creative.slug}`),
      images: [
        {
          url: absoluteUrl(
            creative?.thumbnail || "/assets/images/og-image.png"
          ),
          width: 1200,
          height: 630,
          alt: creative.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: creative.title,
      description: content,
      images: absoluteUrl(creative?.thumbnail || "/assets/images/og-image.png"),
    },
  };
};

const Creative = async (params: Params) => {
  const { creative, content } = await getData(params);
  return (
    <Layout className="bg-secondary text-black">
      <div className="max-w-6xl mx-auto px-5">
        <article className="py-32 article-box">
          <div className="relative mb-2 md:mb-4 sm:mx-0 w-full h-52 md:h-96">
            <Image
              alt={creative.title}
              src={creative?.thumbnail || ""}
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          <h1 className="font-primary text-2xl font-bold md:text-4xl mb-2">
            {creative.title}
          </h1>
          <div className="hidden md:block md:mb-12 text-slate-600 capitalize font-openSauceSans font-medium">
            Written on <DateFormatter dateString={creative.date} /> by{" "}
            {creative?.author || ""}.
          </div>
          <hr className="border-neutral-200 mt-10 mb-10" />
          <div className="max-w-2xl mx-auto">
            <div
              className="prose lg:prose-xl font-openSauceSans font-medium"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Creative;

const getData = async ({ params }: Params) => {
  const creative = loadEditBySlug(creativeDirectory, params.slug);
  if (!creative) {
    notFound();
  }
  const content = await markdownToHtml(creative.content);

  return {
    creative,
    content,
  };
};
