const LETTERS = "SFPLAYGROUND".split("");
const PHOTOS = [
  "/v1-experience/assets/film-v5/still-05.webp",
  "/v1-experience/assets/film-v5/still-02.webp",
  "/v1-experience/assets/film-v5/still-04.webp",
  "/v1-experience/assets/film-v5/still-01.webp",
  "/v1-experience/assets/film-v5/still-08.webp",
  "/v1-experience/assets/film-v5/still-07.webp",
];

export default function EventWordmark() {
  return (
    <section className="bg-white px-4 pb-0 pt-14 md:px-8 md:pt-20" aria-label="SFPlayground">
      <h2
        aria-label="SFPLAYGROUND"
        className="mx-auto flex max-w-[1600px] justify-center overflow-hidden font-oswald text-[clamp(2rem,10.6vw,11rem)] font-bold leading-none tracking-[-0.035em]"
      >
        {LETTERS.map((letter, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="bg-cover bg-center bg-clip-text text-transparent"
            style={{ backgroundImage: `url("${PHOTOS[index % PHOTOS.length]}")` }}
          >
            {letter}
          </span>
        ))}
      </h2>
    </section>
  );
}
