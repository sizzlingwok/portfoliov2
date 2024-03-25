import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export const Refresh = () => {
  useEffect(() => {
    ScrollTrigger.refresh(true);
  }, []);
};

export const Project = (event, path) => {
  if (Astro.url.pathname === "/") {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: ".project-wrapper" },
      ease: "power3.out",
    });

    if (path === Astro.url.pathname) {
      event.preventDefault();
    }
  }
};

export const Landingtext = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(".hoverword", {
      opacity: 1,
      visibility: "visible",
    });

    const wordElements = gsap.utils.toArray(".hoverword");
    wordElements.forEach((element) => {
      const textsplit = new SplitType(element, {
        types: "lines, words",
        tagName: "span",
      });

      tl.from(textsplit.words, {
        y: 25,
        opacity: 0,
        duration: 2,
        stagger: 0.03,
        ease: "power3.out",
        delay: -0.5,
      });
    });

    tl.fromTo(
      ".hoverline",
      { y: 25, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 2,
        stagger: 0.1,
        ease: "back.out",
        onStart: () => {
          gsap.set(".hoverline", { opacity: 1, visibility: "visible" });
        },
      },
      "-=2"
    );
    return () => tl.revert();
  }, []);
};

export const AboutHeader = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    const wordElements = document.querySelectorAll(".hoverword");
    const letterElements = gsap.utils.toArray(".splitletter");
    const slideupElements = gsap.utils.toArray(".slideup");

    tl.to(".hoverword", {
      opacity: 1,
      visibility: "visible",
    });

    wordElements.forEach((element) => {
      const textsplit = new SplitType(element, {
        types: "lines, words",
        tagName: "span",
      });

      tl.from(textsplit.words, {
        y: 25,
        opacity: 0,
        duration: 2,
        stagger: 0.01,
        ease: "power3.out",
        delay: -0.5,
      });
    });

    tl.fromTo(
      ".hoverline",
      { y: 25, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 2,
        stagger: 0.1,
        ease: "back.out",
        onStart: () => {
          gsap.set(".hoverline", { opacity: 1, visibility: "visible" });
        },
      },
      "-=2"
    );

    letterElements.forEach((element) => {
      const staggerValue = element.classList.contains("short") ? 0.03 : 0.05;
      const textsplit = new SplitType(element, {
        types: "chars",
        tagName: "span",
      });
      const letters = textsplit.chars;

      gsap.to(element, { opacity: 1, visibility: "visible" });

      gsap.fromTo(
        letters,
        { x: -5, opacity: 0, rotateX: 50 },
        {
          x: 0,
          rotateX: 0,
          opacity: 1,
          duration: 2,
          stagger: staggerValue,
          ease: "power3.out",
        }
      );
    });

    slideupElements.forEach((element) => {
      gsap.fromTo(
        element,
        { y: "2rem", opacity: 0 },
        {
          y: 0,
          visibility: "visible",
          opacity: 1,
          duration: 2,
          ease: "power2.out",
        }
      );
    });
    return () => tl.revert();
  }, []);
};

export const SlideUp = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".slideup", { opacity: 0 });

      gsap.fromTo(
        ".slideup",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out" }
      );
    });
    ScrollTrigger.refresh(true);

    return () => ctx.revert();
  }, []);
};

export const ProjectSlideUp = () => {
  useEffect(() => {
    const createTimeline = (projectSlideUpSelector) => {
      const tl = gsap.timeline({ paused: true });

      const staggerValue = (element) =>
        element.classList.contains("short") ? 0.03 : 0.05;

      const letterElements = gsap.utils.toArray(
        `${projectSlideUpSelector} .splitletter`
      );
      letterElements.forEach((element) => {
        const textSplit = new SplitType(element, { types: "chars" });
        const letters = textSplit.chars;

        gsap.set(letters, { opacity: 0 });
        tl.fromTo(
          letters,
          { x: -5, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 2,
            stagger: staggerValue(element),
            ease: "power3.out",
          },
          0
        );
      });

      const wordElements = gsap.utils.toArray(
        `${projectSlideUpSelector} .splitword`
      );
      wordElements.forEach((element) => {
        const staggerValue = (element) =>
          element.classList.contains("extend")
            ? 0.06
            : element.classList.contains("long")
              ? 0.04
              : 0.02;

        const textSplit = new SplitType(element, { types: "words" });
        const words = textSplit.words;

        gsap.set(words, { opacity: 0 });
        tl.fromTo(
          words,
          { x: -5, rotationX: 100, opacity: 0 },
          {
            x: 0,
            rotationX: 0,
            opacity: 1,
            duration: 2,
            stagger: staggerValue(element),
            ease: "power3.out",
          },
          0
        );
      });

      gsap.set(projectSlideUpSelector, { opacity: 0 });
      tl.fromTo(
        projectSlideUpSelector,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
        0
      );

      ScrollTrigger.create({
        trigger: projectSlideUpSelector,
        start: "top 75%",
        onEnter: () => tl.play(),
        scrub: true,
      });

      return tl;
    };

    const project1 = createTimeline(".projectslideup1");
    const project2 = createTimeline(".projectslideup2");
    const project3 = createTimeline(".projectslideup3");

    return () => {
      project1.revert();
      project2.revert();
      project3.revert();
    };
  }, []);
};

export const WorkSlideUp = () => {
  useEffect(() => {
    const createTimeline = (workSlideUpSelector) => {
      const tl = gsap.timeline({ paused: true });

      const staggerValue = (element) =>
        element.classList.contains("short") ? 0.03 : 0.05;

      const letterElements = gsap.utils.toArray(
        `${workSlideUpSelector} .splitletter`
      );
      letterElements.forEach((element) => {
        const textSplit = new SplitType(element, { types: "chars" });
        const letters = textSplit.chars;

        gsap.set(letters, { opacity: 0 });
        tl.fromTo(
          letters,
          { x: -5, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 2,
            stagger: staggerValue(element),
            ease: "power3.out",
          },
          0
        );
      });

      const wordElements = gsap.utils.toArray(
        `${workSlideUpSelector} .splitword`
      );
      wordElements.forEach((element) => {
        const staggerValue = (element) =>
          element.classList.contains("home")
            ? 0.08
            : element.classList.contains("extend")
              ? 0.06
              : element.classList.contains("long")
                ? 0.04
                : 0.02;

        const textSplit = new SplitType(element, { types: "words" });
        const words = textSplit.words;

        gsap.set(words, { opacity: 0 });
        tl.fromTo(
          words,
          { x: -5, rotationX: 100, opacity: 0 },
          {
            x: 0,
            rotationX: 0,
            opacity: 1,
            duration: 2,
            stagger: staggerValue(element),
            ease: "expo.out",
          },
          0
        );
      });

      gsap.set(workSlideUpSelector, { opacity: 0 });
      tl.fromTo(
        workSlideUpSelector,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
        0
      );

      ScrollTrigger.create({
        trigger: workSlideUpSelector,
        start: "top 75%",
        onEnter: () => tl.play(),
        scrub: true,
      });

      return tl;
    };

    const work1 = createTimeline(".workslideup1");
    const work2 = createTimeline(".workslideup2");
    const work3 = createTimeline(".workslideup3");
    const work4 = createTimeline(".workslideup4");

    return () => {
      work1.revert();
      work2.revert();
      work3.revert();
      work4.revert();
    };
  }, []);
};

export const ExpandDivider = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateIn = (divider) => {
        return gsap.fromTo(
          divider,
          { width: "0%", transformOrigin: "left", opacity: 0 },
          {
            width: "100%",
            opacity: 1,
            duration: 2,
            ease: "power3.out",
            overwrite: true,
          }
        );
      };

      gsap.utils.toArray(".divider").forEach((divider) => {
        gsap.set(divider, { opacity: 0 });
        ScrollTrigger.create({
          trigger: divider,
          start: "-150vh bottom",
          onEnter: () => {
            animateIn(divider);
          },
          scrub: true,
        });
      });
    });

    return () => ctx.revert();
  }, []);
};

export const SplitWordHeader = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordElements = gsap.utils.toArray(".splitwordheader");
      const letterElements = gsap.utils.toArray(".splitletter");
      const descriptionElements = gsap.utils.toArray(".project-details");
      const slideupElements = gsap.utils.toArray(".slideup");

      wordElements.forEach((element) => {
        const textsplit = new SplitType(element, {
          types: "words",
          tagName: "span",
        });

        gsap.to(element, { opacity: 1, visibility: "visible" });
        gsap.fromTo(
          textsplit.words,
          {
            x: -5,
            rotationX: 100,
            opacity: 0,
          },
          {
            x: 0,
            rotationX: 0,
            opacity: 1,
            duration: 2,
            stagger: 0.02,
            ease: "expo.out",
          }
        );
      });

      letterElements.forEach((element) => {
        const staggerValue = element.classList.contains("short") ? 0.03 : 0.05;
        const textsplit = new SplitType(element, {
          types: "chars",
          tagName: "span",
        });
        const letters = textsplit.chars;

        gsap.to(element, { opacity: 1, visibility: "visible" });

        gsap.fromTo(
          letters,
          { x: -5, opacity: 0, rotateX: 50 },
          {
            x: 0,
            rotateX: 0,
            opacity: 1,
            duration: 2,
            stagger: staggerValue,
            ease: "power3.out",
          }
        );
      });

      descriptionElements.forEach((element, index) => {
        gsap.set(element, { opacity: 0, y: 25 });

        gsap.to(element, {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 1.5,
          ease: "power2.out",
          delay: 0.15 * index + 0.2,
        });
      });

      slideupElements.forEach((element) => {
        gsap.fromTo(
          element,
          { y: "2rem", opacity: 0 },
          {
            y: 0,
            visibility: "visible",
            opacity: 1,
            duration: 2,
            ease: "power2.out",
          }
        );
      });
      return () => ctx.revert();
    });
  }, []);
};

export const SplitWord = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".splitword");

      elements.forEach((element) => {
        const staggerValue = element.classList.contains("extend")
          ? 0.06
          : element.classList.contains("long")
            ? 0.04
            : 0.02;

        const textsplit = new SplitType(element, {
          types: "words",
          tagName: "span",
        });

        // Set initial state
        gsap.set(textsplit.words, {
          opacity: 0,
          x: -5,
          rotationX: 100,
        });

        ScrollTrigger.create({
          trigger: element,
          start: "top bottom",
          scrub: true,
          onEnter: () => {
            gsap.to(element, { opacity: 1, visibility: "visible" });
            gsap.fromTo(
              textsplit.words,
              {
                x: -5,
                rotationX: 100,
                opacity: 0,
              },
              {
                x: 0,
                rotationX: 0,
                opacity: 1,
                duration: 2,
                stagger: staggerValue,
                ease: "power3.out",
                overwrite: true,
              }
            );
          },
        });
      });

      return () => ctx.revert();
    });
  }, []);
};

export const SplitLetter = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".splitletter");
      elements.forEach((element) => {
        const staggerValue = element.classList.contains("short") ? 0.03 : 0.05;
        const textsplit = new SplitType(element, {
          types: "chars",
          tagName: "span",
        });
        const letters = textsplit.chars;
        gsap.fromTo(
          letters,
          { x: -5, opacity: 0, rotateX: 50 },
          {
            x: 0,
            rotateX: 0,
            opacity: 1,
            duration: 2,
            stagger: staggerValue,
            ease: "power3.out",
          }
        );
      });
      return () => ctx.revert();
    });
  }, []);
};
