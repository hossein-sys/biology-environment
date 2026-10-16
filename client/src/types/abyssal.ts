export interface Specimen {
  id: string;
  catalogNumber: string;
  scientificName: string;
  commonName: string;
  strata: string;
  depthRange: string;
  pressure: string;
  emissionWavelength: string;
  biolumeType: string;
  discoveryYear: number;
  location: string;
  image: string;
  description: string;
  vitalStats: {
    label: string;
    value: string;
  }[];
  biochemistry: {
    compound: string;
    coFactor: string;
    quantumYield: string;
    purpose: string;
  };
  fieldNotes: string;
}

export interface DepthStrata {
  id: string;
  name: string;
  depthRange: string;
  lux: string;
  atmospheres: string;
  temperature: string;
  keyFeature: string;
  fauna: string[];
}

export interface TrenchNode {
  id: string;
  name: string;
  ocean: string;
  maxDepth: string;
  coordinates: string;
  x: number; // percentage in canvas
  y: number; // percentage in canvas
  activeSurvey: string;
}
