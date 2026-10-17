import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { no: "01", title: "ROOT", copy: "The clean burn begins underground. Organic ginger is harvested at peak bite, then pressed before its brightness fades." },
  { no: "02", title: "PRESS", copy: "Cold pressure keeps the aromatic oils vivid. Nothing powdered. Nothing disguised. Just the root doing what it does best." },
  { no: "03", title: "SPARK", copy: "Fine bubbles lift ginger, lime peel and pink peppercorn into a dry, electric finish." },
];

function splitWords(text) {
  return text.split(" ").map((word, i) => <span className="word-mask" aria-hidden="true" key={`${word}-${i}`}><span>{word}&nbsp;</span></span>);
}

function App() {
  const root = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.9 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        gsap.timeline({ defaults: { ease: "power4.out" } })
          .from(".brand, .nav-links, .nav-buy", { y: -24, autoAlpha: 0, duration: .8, stagger: .08 })
          .from(".hero-line > span", { yPercent: 120, duration: 1.05, stagger: .08 }, .15)
          .from(".bottle-actor", { yPercent: 20, scale: .82, autoAlpha: 0, duration: 1.25 }, .25)
          .from(".hero-meta, .scroll-note", { y: 20, autoAlpha: 0, duration: .7, stagger: .08 }, .65);

        const panels = gsap.utils.toArray(".journey-panel");
        gsap.set(panels.slice(1), { autoAlpha: 0 });
        const journey = gsap.timeline({
          scrollTrigger: { trigger: ".journey", start: "top top", end: "bottom bottom", scrub: 1.05 }
        });
        journey
          .to(".bottle-actor", { x: 0, y: "-1vh", rotation: 90, scale: .88, ease: "none" }, 0)
          .to(panels[0], { autoAlpha: 0, y: -50, ease: "none" }, 0)
          .to(panels[1], { autoAlpha: 1, ease: "none" }, .12)
          .to(".journey-stage", { backgroundColor: "#11110f", color: "#ece8de", ease: "none" }, .18)
          .to(".bottle-actor", { x: 0, y: "1vh", rotation: 180, scale: .78, ease: "none" }, .25)
          .to(panels[1], { autoAlpha: 0, y: -40, ease: "none" }, .33)
          .to(panels[2], { autoAlpha: 1, ease: "none" }, .43)
          .to(".journey-stage", { backgroundColor: "#d7ff1f", color: "#11110f", ease: "none" }, .48)
          .to(".bottle-actor", { x: 0, y: "-2vh", rotation: 270, scale: .94, ease: "none" }, .5)
          .to(panels[2], { autoAlpha: 0, y: -50, ease: "none" }, .64)
          .to(panels[3], { autoAlpha: 1, ease: "none" }, .72)
          .to(".journey-stage", { backgroundColor: "#ece8de", ease: "none" }, .75)
          .to(".bottle-actor", { x: "-16vw", y: 0, rotation: 360, scale: .82, ease: "none" }, .68);

        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          gsap.from(el, { y: 42, autoAlpha: 0, filter: "blur(8px)", duration: 1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 84%", once: true } });
        });

        gsap.to(".ingredients-image", { yPercent: -8, ease: "none", scrollTrigger: { trigger: ".ingredients", start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.fromTo(".pour-image", { scale: 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".pour", start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.from(".cta-word", { yPercent: 110, stagger: .06, ease: "power4.out", duration: 1, scrollTrigger: { trigger: ".final-cta", start: "top 72%", once: true } });
      }, root);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
      return () => {
        window.removeEventListener("load", refresh);
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis?.destroy();
      };
    }
    return () => lenis?.destroy();
  }, []);

  return <div ref={root}>
    <a className="skip-link" href="#story">Skip to story</a>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="SPICE home">SPICE</a>
      <nav className="nav-links" aria-label="Primary">
        <a href="#story">Story</a><a href="#ingredients">Ingredients</a><a href="#pour">Serve</a>
      </nav>
      <a className="nav-buy" href="#buy">Get SPICE <span>↗</span></a>
    </header>

    <main>
      <section className="journey" id="top">
        <div className="journey-stage">
          <div className="grain" aria-hidden="true" />
          <img className="bottle-actor" src="/assets/spice-bottle-transparent-v2.png" alt="Chilled amber bottle of SPICE organic ginger ale" />
          <div className="journey-panel hero-panel">
            <h1 aria-label="Bite bright">
              <span className="hero-line"><span>BITE</span></span>
              <span className="hero-line"><span>BRIGHT</span></span>
            </h1>
            <div className="hero-meta">ORGANIC GINGER ALE<br/>250 ML · DRY FINISH</div>
            <div className="scroll-note"><span>SCROLL TO<br/>TASTE THE STORY</span><i>↓</i></div>
          </div>
          {chapters.map((chapter, index) => <article className={`journey-panel chapter chapter-${index + 1}`} id={index === 0 ? "story" : undefined} key={chapter.no}>
            <div className="chapter-index">{chapter.no} / 03</div>
            <h2 aria-label={chapter.title}>{chapter.title}</h2>
            <p>{chapter.copy}</p>
          </article>)}
        </div>
      </section>

      <section className="ingredients" id="ingredients">
        <img className="ingredients-image" src="/assets/ingredients-hero.png" alt="Fresh ginger, lime peel, leaves and pink peppercorn" loading="lazy" />
        <div className="ingredients-copy" data-reveal>
          <div className="section-no">04 / INSIDE</div>
          <h2 aria-label="Nothing to hide">{splitWords("NOTHING TO HIDE")}</h2>
          <p>Organic ginger. Fresh lime peel. Pink peppercorn. Sparkling water. A short list with a long finish.</p>
          <ul><li><span>72%</span> cold-pressed ginger extract</li><li><span>0</span> artificial flavorings</li><li><span>1</span> very lively root</li></ul>
        </div>
      </section>

      <section className="manifesto">
        <p className="section-no" data-reveal>05 / THE METHOD</p>
        <h2 data-reveal>We keep the heat.<br/><em>Lose the noise.</em></h2>
        <div className="method-grid" data-reveal>
          <article><b>01</b><h3>PRESS</h3><p>Fresh roots are cold-pressed in small batches.</p></article>
          <article><b>02</b><h3>BLEND</h3><p>Lime and peppercorn sharpen the natural warmth.</p></article>
          <article><b>03</b><h3>SPARK</h3><p>Fine carbonation makes the finish clean and dry.</p></article>
        </div>
      </section>

      <section className="pour" id="pour">
        <img className="pour-image" src="/assets/pour-hero.png" alt="SPICE ginger ale pouring over ice" loading="lazy" />
        <div className="pour-copy" data-reveal><div className="section-no">06 / THE POUR</div><h2>LOUD ROOT.<br/><span>QUIET LUXURY.</span></h2><p>Serve ice-cold. Drink slowly. Let the ginger arrive twice.</p></div>
      </section>

      <section className="final-cta" id="buy">
        <div className="cta-top"><span>ORGANIC · DRY · FIERY</span><span>SHIPS IN 6 × 250 ML</span></div>
        <a href="mailto:hello@drinkspice.example" aria-label="Get SPICE">
          <span className="cta-mask"><span className="cta-word">GET</span></span>
          <span className="cta-mask"><span className="cta-word lime">SPICE</span></span>
          <i>↗</i>
        </a>
      </section>
    </main>

    <footer><a className="brand" href="#top">SPICE</a><p>Fictional brand concept. Original imagery generated for this experience.</p><p>© 2026 SPICE</p></footer>
  </div>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
