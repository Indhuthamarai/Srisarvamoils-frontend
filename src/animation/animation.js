// animations.js
import gsap from "gsap";

// Global timeline
const tl = gsap.timeline();

// Preloader Animation
export const preLoaderAnim = () => {
  tl.to("body", { duration: 0.1, css: { overflowY: "hidden" }, ease: "power3.inOut" })
    .to(".landing", { duration: 0.05, css: { overflowY: "hidden", height: "90vh" } })
    .to(".texts-container", { duration: 0, opacity: 1, ease: "Power3.easeOut" })
    .from(".texts-container span", { duration: 1.5, delay: 1, y: 70, skewY: 10, stagger: 0.4, ease: "Power3.easeOut" })
    .to(".texts-container span", { duration: 1, y: 70, skewY: -20, stagger: 0.2, ease: "Power3.easeOut" })
    .to(".landing", { duration: 0.05, css: { overflowY: "hidden", height: "unset" } })
    .to("body", { duration: 0.1, css: { overflowY: "scroll" }, ease: "power3.inOut" })
    .from(".landing__top .sub", { duration: 1, opacity: 0, y: 80, ease: "expo.easeOut" })
    .to(".preloader", { duration: 1.5, height: "0vh", ease: "Power3.easeOut", onComplete: mobileLanding })
    .from(".landing__main .text", { duration: 2, y: 10, opacity: 0, stagger: { amount: 2 }, ease: "power3.easeInOut" })
    .from(".links .item", { duration: 0.5, opacity: 0, delay: window.innerWidth < 763 ? -3 : -0.6, stagger: { amount: 0.5 }, ease: "expo.easeOut", onComplete: animateMainShape })
    .from(".main-circle", { duration: 1, opacity: 0, ease: "power3.easeInOut", onComplete: animateShapes })
    .from(".shapes .shape", { duration: 1, opacity: 0, delay: -1, ease: "power3.easeInOut", stagger: 1 })
    .to(".preloader", { duration: 0, css: { display: "none" } });
};

export const mobileLanding = () => {
  if (window.innerWidth < 763) {
    tl.from(".landing__main2", { duration: 1, opacity: 0, y: 80, ease: "expo.easeOut" });
  }
};

// Infinite animation for background shapes
const animateShapes = () => {
  gsap.timeline({ repeat: -1 })
    .to(".shapes .shape", { duration: 4, rotate: 360, delay: -1, ease: "power3.easeInOut", stagger: 2 })
    .to(".shapes .shape-3", { duration: 1, rotate: 360, delay: -2, ease: "power3.easeInOut" })
    .to(".shapes .shape", { duration: 3, rotate: 0, ease: "power3.easeInOut", stagger: 1 })
    .to(".shapes .shape", { duration: 1, opacity: 0, delay: -1, ease: "power3.easeInOut", stagger: 1 })
    .to(".shapes .shape", { duration: 1.5, opacity: 1, ease: "power3.easeInOut", stagger: 1 });
};

// Infinite motion for the main circular element
const animateMainShape = () => {
  gsap.timeline({ repeat: -1 })
    .to(".shapes .main-circle", { duration: 6, x: -30, y: -50, ease: "expo.easeOut" })
    .to(".shapes .main-circle", { duration: 6, x: -30, y: 50, ease: "expo.easeOut" })
    .to(".shapes .main-circle", { duration: 4, x: 0, y: 0, ease: "expo.easeOut" });
};

// Fade Up Animation
export const fadeUp = (el, delay = 0) => {
  tl.from(el, { y: 150, duration: 1, delay, opacity: 0, ease: "power3.Out" });
};

// Fade In Animation
export const fadeIn = (el) => {
  gsap.to(el, { duration: 2, opacity: 1, y: -60, ease: "power4.out" });
};

// Fade Out Animation
export const fadeOut = (el) => {
  gsap.to(el, { duration: 1, opacity: 0, y: -20, ease: "power4.out" });
};

// Header Animation
export const headerAnim = () => {
  tl.from(".header", {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "power4.out"
  });
};

// Hero Animation
export const heroAnim = () => {
  tl.from(".hero-title span", {
    duration: 1.2,
    y: 100,
    opacity: 0,
    skewY: 10,
    stagger: 0.3,
    ease: "power4.out"
  })
    .from(".hero-description", {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power3.out"
    }, "-=1")
    .from(".hero-cta", {
      duration: 1,
      opacity: 0,
      y: 30,
      ease: "power3.out"
    }, "-=0.8");
};

// Section Fade-In
export const sectionFadeIn = (el, delay = 0) => {
  gsap.from(el, {
    duration: 1,
    opacity: 0,
    y: 80,
    delay,
    ease: "power3.out"
  });
};

// Card Zoom-In
export const cardZoom = (el, delay = 0) => {
  gsap.from(el, {
    scale: 0.8,
    opacity: 0,
    delay,
    duration: 1,
    ease: "back.out(1.7)"
  });
};

// Image Reveal
export const revealImage = (el, delay = 0) => {
  gsap.from(el, {
    clipPath: "inset(100% 0% 0% 0%)",
    duration: 1.2,
    delay,
    ease: "power4.out"
  });
};

// Footer Animation
export const footerAnim = () => {
  tl.from(".footer", {
    duration: 1,
    opacity: 0,
    y: 100,
    ease: "power3.out"
  });
};
