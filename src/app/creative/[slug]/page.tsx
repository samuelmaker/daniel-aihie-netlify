import DateFormatter from "@/components/DateFormatter";
import Layout from "@/components/Layout";
import { loadEditBySlug } from "@/libs/getData";
import markdownToHtml from "@/libs/markdownToHtml";
import { absoluteUrl } from "@/libs/utils";
import { Metadata } from "next";
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
      <div className="pt-8 md:pt-16">
        <div className="w-full relative max-w-2xl mx-auto px-4">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-blue-500 transform scale-[1] bg-blue-500 rounded-full blur-3xl" />
          <div className="relative h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
            <Image
              alt={creative.title}
              src={creative?.headerImg || creative.thumbnail}
              width={800}
              height={400}
              className="object-cover mx-auto"
              priority
            />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5">
        <article className="py-16 md:py-32 article-box">
          <h1
            data-aos="fade-down"
            className="font-primary text-2xl font-bold md:text-4xl mb-2"
          >
            {creative.title}
          </h1>
          <div
            data-aos="fade-down"
            className="md:mb-12 text-slate-600 capitalize font-openSauceSans font-medium"
          >
            Written on <DateFormatter dateString={creative.date} /> by{" "}
            {creative?.author || ""}.
          </div>
          <hr
            data-aos="fade-down"
            className="border-neutral-800 mt-5 md:mt-10 mb-5 md:mb-10"
          />
          <div className="max-w-2xl mx-auto">
            <div
              data-aos="fade-down"
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
