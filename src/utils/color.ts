import { rgba } from "color2k";

export type RGBA = [number, number, number, number]

/**
 * Mixes two colors together. Taken from the color2k library.
 */
export function mixRgba(color1: RGBA, color2: RGBA, weight: number): string {
  const normalize = (n: number, index: number) =>
    // 3rd index is alpha channel which is already normalized
    index === 3 ? n : n / 255;

  const [r1, g1, b1, a1] = color1.map(normalize);
  const [r2, g2, b2, a2] = color2.map(normalize);

  // The formula is copied from the original Sass implementation:
  // http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method
  const alphaDelta = a2 - a1;
  const normalizedWeight = weight * 2 - 1;
  const combinedWeight =
    normalizedWeight * alphaDelta === -1
      ? normalizedWeight
      : normalizedWeight + alphaDelta / (1 + normalizedWeight * alphaDelta);
  const weight2 = (combinedWeight + 1) / 2;
  const weight1 = 1 - weight2;

  const r = (r1 * weight1 + r2 * weight2) * 255;
  const g = (g1 * weight1 + g2 * weight2) * 255;
  const b = (b1 * weight1 + b2 * weight2) * 255;
  const a = a2 * weight + a1 * (1 - weight);

  return rgba(r, g, b, a);
}