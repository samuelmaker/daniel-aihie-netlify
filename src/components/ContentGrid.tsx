import Image from "next/image";
import Link from "next/link";

type Props = {
  collection: "creative" | "edits";
  title?: string;
  items: any[];
  priority?: boolean;
};

const ContentGrid = ({ title, items, collection, priority = false }: Props) => {
  return (
    <section id={collection} className="py-6 md:py-12">
      <h2 className="mb-8 text-5xl md:text-6xl font-extenda font-bold tracking-wider text-center uppercase text-primary">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-1 ">
        {items.map((item, id) => (
          <Link key={item.slug} href={`/${collection}/${item.slug}`}>
            <div className="cursor-pointer  md:w-full scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu transition duration-100 motion-reduce:hover:scale-100 hover:shadow overflow-hidden ">
              <div className="sm:mx-0">
                <Image
                  src={item.thumbnail ?? ""}
                  alt={`Cover Image for ${item.title}`}
                  className="object-cover  w-full h-full md:h-96"
                  width={680}
                  height={400}
                  priority={priority && id <= 2}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContentGrid;
