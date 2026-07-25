import type { GeneratorType } from "../types/game";

export const generatorTypes: GeneratorType[] = [
  {
    id: "compute-generator",
    name: "Compute Generator",
    description: "A small personal node that keeps the room producing Compute while you are away.",
    producedResource: "compute",
    costCompute: 25,
    ratePerHour: 60,
    linkedProductId: "fabricbot"
  }
];
