import { ReactLenis } from "@studio-freight/react-lenis";

export const Lenis = () => (
  <ReactLenis
    root
    options={{
      duration: 0.3,
      easing: (t) => 1 - Math.pow(1 - Math.min(1, t), 5),
    }}
  />
);
