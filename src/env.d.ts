/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface window {
  gsap: typeof import("gsap");
}
