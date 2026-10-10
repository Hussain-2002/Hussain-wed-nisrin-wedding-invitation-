"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArabicNames } from "@/components/ArabicNames";
import { CityStamps, CornerMarks, Khatam, WaxSeal } from "@/components/CardExtras";
import { Countdown } from "@/components/Countdown";
import { FireworksGate } from "@/components/FireworksGate";
import { ThaalSeat } from "@/components/ThaalSeat";
import { blessings, couple, events, journey, music, wedding } from "@/lib/wedding";

function guestFromParams(params: ReturnType<typeof useSearchParams>) {
  const raw = params.get("name")?.trim();
  if (!raw) return "";
  const spaced = raw.replace(/\+/g, " ");
  try {
    return decodeURIComponent(spaced);
  } catch {
    return spaced;
  }
}

export function Invitation() {
  const params = useSearchParams();
  const guest = guestFromParams(params);
  const [open, setOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [musicArmed, setMusicArmed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrolled = useRef(false);
  const to = params.get("to");

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setMusicArmed(true);
    audio.volume = 0.55;
    audio
      .play()
      .then(() => setMusicOn(true))
      .catch(() => setMusicOn(false));
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }
    audio
      .play()
      .then(() => setMusicOn(true))
      .catch(() => setMusicOn(false));
  };

  useEffect(() => {
    if (!open || !to || scrolled.current) return;
    const timer = window.setTimeout(() => {
      scrolled.current = true;
      document.getElementById(to)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [open, to]);

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <audio ref={audioRef} src={music.src} loop preload="auto" playsInline />

      {!open ? (
        <FireworksGate
          guestName={guest || undefined}
          onIgnite={startMusic}
          onOpened={() => setOpen(true)}
        />
      ) : null}

      {musicArmed ? (
        <button
          type="button"
          className={`music-toggle ${musicOn ? "is-on" : ""}`}
          aria-pressed={musicOn}
          aria-label={musicOn ? "Pause the music" : "Play the music"}
          onClick={toggleMusic}
        >
          {musicOn ? (
            <span className="music-bars" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5.5v13l11-6.5-11-6.5z" />
            </svg>
          )}
        </button>
      ) : null}

      <div
        className={`relative mx-auto min-h-dvh w-full max-w-3xl px-5 pb-20 pt-10 sm:px-8 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        } transition-opacity duration-700`}
      >
        <p className="text-center text-[0.7rem] uppercase tracking-[0.28em] text-gold/80">
          {couple.monogram}
        </p>
        {guest ? (
          <p className="mt-3 text-center text-sm tracking-[0.14em] text-ivory/80">
            For {guest}
          </p>
        ) : null}

        <section className="rise-in mt-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-ivory/55">
            With the grace of Allah, they invite you
          </p>
          <ArabicNames className="mt-5 text-4xl text-gold sm:text-5xl" />
          <h1 className="mt-2 font-script leading-none text-[4.4rem] text-ivory sm:text-[6rem]">
            {couple.him}
            <span className="mx-3 inline-block font-script text-4xl text-gold sm:text-5xl">
              {couple.and}
            </span>
            {couple.her}
          </h1>
          <Khatam className="khatam--light" />
          <p className="mx-auto mt-2 max-w-md font-display text-2xl text-gold">
            {wedding.rangeLabel}
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-ivory/50">
            Ujjain · Chechat · Indore
          </p>
        </section>

        <section className="mt-14">
          <Countdown />
          <p className="mt-4 text-center text-xs uppercase tracking-[0.25em] text-ivory/40">
            Until the first evening in Ujjain
          </p>
        </section>

        <section className="paper relative mt-16 overflow-hidden rounded-[1.8rem] px-6 py-12 sm:px-10">
          <CornerMarks />
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic mb-4 text-center text-[1.15rem] leading-loose text-[#8a5a22]"
          >
            {blessings.bismillah}
          </p>
          <p
            lang="ar"
            dir="rtl"
            className="mx-auto max-w-md text-center font-arabic text-[1.05rem] leading-9 text-ink/80"
          >
            {blessings.verse}
          </p>
          <p className="mx-auto mt-3 max-w-md text-center font-display text-lg italic leading-snug text-ink/60">
            {blessings.verseEn}
          </p>
          <p className="mt-2 text-center text-[0.62rem] uppercase tracking-[0.22em] text-[#8a5a22]">
            {blessings.verseRef}
          </p>
          <Khatam />
          <div className="mx-auto w-52 overflow-hidden rounded-[1.5rem] border-[3px] border-[#c4a15a]/55 bg-[#efe2cf] shadow-[0_12px_28px_rgba(80,40,24,0.18)] sm:w-64">
            <Image
              src="/couple-portrait.jpg"
              alt="Hussain and Nisrin"
              width={420}
              height={560}
              className="h-auto w-full object-cover object-[center_20%]"
              priority
            />
          </div>

          <ArabicNames className="mt-7 text-[2.15rem] text-[#6b1d33] sm:text-5xl" />
          <p className="mt-1 text-center font-script text-4xl text-ink/80">
            {couple.him} {couple.and} {couple.her}
          </p>

          {guest ? (
            <p className="mt-6 text-center text-[0.7rem] uppercase tracking-[0.22em] text-wine">
              This invitation is reserved for
              <span className="mt-2 block font-display text-4xl tracking-normal text-ink">
                {guest}
              </span>
            </p>
          ) : null}

          <p className="mx-auto mt-6 max-w-md text-center text-sm leading-7 text-[#0e6b4a]">
            With the grace of Allah, and with the raza and dua mubarak{" "}
            <span className="whitespace-nowrap">of Aqa Moula</span>
          </p>
          <p
            lang="ar"
            dir="rtl"
            className="mx-auto mt-6 max-w-md text-center font-arabic text-lg leading-9 text-ink/75"
          >
            يسعدهما دعوتكم لشهود عقد النكاح والاحتفال معهما
          </p>
          <p className="mt-4 font-display text-xl leading-relaxed text-ink/80 sm:text-2xl">
            Together with their families, Hussain and Nisrin ask for your presence and
            your duas — six days, three cities, one nikah.
          </p>
          <p className="mt-5 text-sm leading-7 text-ink/65">
            The week begins with istiqbal in Ujjain, gathers the family in Chechat,
            returns to Ujjain for the aqd and ziyaafat, then closes with valima in
            Indore. Come for the days you can. Your dua is the barakat they want most.
          </p>
          <CityStamps />
          <WaxSeal />
        </section>

        <section className="mt-16">
          <p className="text-center text-[0.7rem] uppercase tracking-[0.32em] text-gold/70">
            The journey
          </p>
          <h2 className="mt-2 text-center font-display text-4xl text-ivory">
            Three cities, one week
          </h2>
          <ol className="mt-10">
            {journey.map((stop, index) => (
              <li key={`${stop.city}-${stop.days}`} className="relative flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-wine text-sm text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < journey.length - 1 ? (
                    <span className="mt-1 w-px flex-1 bg-gradient-to-b from-emerald to-transparent" />
                  ) : null}
                </div>
                <div className="pt-1.5">
                  <p className="text-xs uppercase tracking-[0.22em] text-ivory/45">{stop.days}</p>
                  <p className="font-display text-3xl text-ivory">{stop.city}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8" id="main-events">
          <p className="text-center text-[0.7rem] uppercase tracking-[0.32em] text-gold/70">
            The celebrations
          </p>
          <h2 className="mt-2 text-center font-display text-4xl text-ivory">
            Six days in August
          </h2>
          <ul className="mt-10 space-y-4">
            {events.map((event) => (
              <li
                key={event.date}
                className={`rounded-3xl border p-5 backdrop-blur-sm ${
                  "accent" in event && event.accent
                    ? "border-emerald/45 bg-emerald/10"
                    : "border-white/8 bg-night-soft/70"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald">
                      {event.weekday} · {event.city}
                    </p>
                    {"subtitle" in event && event.subtitle ? (
                      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-gold/80">
                        {event.subtitle}
                      </p>
                    ) : null}
                    <h3 className="mt-1 font-display text-3xl text-ivory">{event.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ivory/60">{event.note}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-4xl leading-none text-gold">{event.day}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-ivory/40">
                      Aug
                    </p>
                  </div>
                </div>
                <a
                  href={event.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-xs uppercase tracking-[0.22em] text-gold/80 underline-offset-4 hover:underline"
                >
                  Directions
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 text-center" id="thaal">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold/70">The thaal</p>
          <h2 className="mt-2 font-display text-4xl text-ivory">Your place at our thaal</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-ivory/60">
            The food is laid and the circle is set. One place is waiting, just for you.
          </p>
          <ThaalSeat name={guest} />
          <p
            lang="ar"
            dir="rtl"
            className="mx-auto mt-8 max-w-md font-arabic text-lg leading-9 text-gold/90"
          >
            {blessings.dua}
          </p>
          <p className="mx-auto mt-2 max-w-sm font-display text-lg italic leading-snug text-ivory/55">
            {blessings.duaEn}
          </p>
        </section>

        <footer className="mt-16 text-center">
          <p lang="ar" dir="rtl" className="font-arabic text-2xl text-gold">
            {blessings.nikah}
          </p>
          <ArabicNames className="mt-2 text-3xl text-gold" />
          <p className="mt-1 font-script text-4xl text-gold">Hussain & Nisrin</p>
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-ivory/45">
            Wasalaam · with mohabbat and dua
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-ivory/40">
            Ujjain · Chechat · Indore · 2027
          </p>
        </footer>
      </div>
    </main>
  );
}
