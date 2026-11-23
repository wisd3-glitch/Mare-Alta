import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BOOK_OF_WEEK_ID } from "@/data/catalog";
import { BookCover } from "./BookCover";
import { getBook } from "@/data/catalog";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";

const SLIDES = [
  {
    id: "week",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Warm wooden shelves filled with books",
    kicker: "Livro da semana · Book of the week",
    title: "The Salt Ledger",
    deck: "Books chosen by people who have read them.",
    cta: "See why we chose it",
    showCover: true,
  },
  {
    id: "thursday",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "A long library aisle in the evening",
    kicker: "Quinta à noite · Thursday night",
    title: "The room fills up.",
    deck: "Two local authors. Fifteen minutes each. Then the questions. Free, upstairs.",
    cta: "See the evening",
    showCover: false,
  },
  {
    id: "picks",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "A yellow tram on a Lisbon street",
    kicker: "Escolhas da casa · Staff picks",
    title: "Six books we will not stop recommending.",
    deck: "Notes from the people behind the till, not from a catalogue.",
    cta: "Read the notes",
    showCover: false,
  },
];

export function Hero() {
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const week = getBook(BOOK_OF_WEEK_ID);

  useEffect(() => {
    setReady(true);
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const first = SLIDES[0];

  if (!ready) {
    return (
      <section className="ma-hero" aria-label="Featured">
        <article className="ma-hero__slide">
          <img className="ma-hero__img" src={first.image} alt={first.imageAlt} />
          <div className="ma-hero__shade" />
          <SlideCopy slide={first} week={week} />
        </article>
      </section>
    );
  }

  return (
    <section className="ma-hero" aria-label="Featured">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        loop
        speed={reduceMotion ? 0 : 700}
        autoplay={
          reduceMotion
            ? false
            : { delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
        pagination={{ clickable: true }}
        a11y={{ enabled: true }}
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <article className="ma-hero__slide">
              <img className="ma-hero__img" src={slide.image} alt={slide.imageAlt} />
              <div className="ma-hero__shade" />
              <SlideCopy slide={slide} week={week} />
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function SlideCopy({
  slide,
  week,
}: {
  slide: (typeof SLIDES)[number];
  week: ReturnType<typeof getBook>;
}) {
  return (
    <div className="ma-wrap ma-hero__copy">
      <div className={slide.showCover ? "ma-hero__split" : "ma-hero__center"}>
        <div>
          <p className="ma-hero__kicker">{slide.kicker}</p>
          <h1 className="ma-hero__title">{slide.title}</h1>
          <p className="ma-hero__deck">{slide.deck}</p>
          {slide.id === "week" ? (
            <Link
              to="/book/$bookId"
              params={{ bookId: BOOK_OF_WEEK_ID }}
              className="ma-btn ma-btn--ink"
            >
              {slide.cta}
            </Link>
          ) : null}
          {slide.id === "thursday" ? (
            <Link to="/events" className="ma-btn ma-btn--ink">
              {slide.cta}
            </Link>
          ) : null}
          {slide.id === "picks" ? (
            <Link to="/staff-picks" className="ma-btn ma-btn--ink">
              {slide.cta}
            </Link>
          ) : null}
        </div>
        {slide.showCover && week ? (
          <div className="ma-hero__book">
            <BookCover book={week} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
