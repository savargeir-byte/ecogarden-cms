import SmartImage from "../SmartImage";

interface SplitImageTextProps {
  data: {
    title: string;
    text: string;
    image: string;
    imageAlt?: string;
    reverse?: boolean;
  };
}

export default function SplitImageText({ data }: SplitImageTextProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className={`max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center ${
        data.reverse ? 'lg:grid-flow-dense' : ''
      }`}>
        <SmartImage
          src={data.image}
          alt={data.imageAlt || data.title}
          width={700}
          height={500}
          className={`rounded-xl shadow-lg object-cover w-full h-[400px] ${
            data.reverse ? 'lg:col-start-2' : ''
          }`}
        />
        <div className={data.reverse ? 'lg:col-start-1 lg:row-start-1' : ''}>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {data.text}
          </p>
        </div>
      </div>
    </section>
  );
}
