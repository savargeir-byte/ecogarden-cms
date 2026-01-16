export default function Hero() {
  return (
    <section className="bg-eco-light">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Vistvænar lausnir fyrir garð og ræktun
          </h1>
          <p className="mt-6 text-lg">
            Umhverfisvænar vörur fyrir heimili, bændur og fagfólk.
          </p>
          <button className="mt-8 bg-eco-green text-white px-6 py-3 rounded">
            Skoða vörur
          </button>
        </div>
        <div className="bg-white rounded-xl h-64 shadow" />
      </div>
    </section>
  );
}
