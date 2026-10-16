import { Specimen, DepthStrata, TrenchNode } from '../types/abyssal';

export const SPECIMENS: Specimen[] = [
  {
    id: 'specimen-01',
    catalogNumber: 'HAD-SYPH-092',
    scientificName: 'Bathyphysa siberogae',
    commonName: 'Flying Spaghetti Siphonophore',
    strata: 'Bathypelagic',
    depthRange: '2,400 - 3,900 m',
    pressure: '240 - 390 ATM',
    emissionWavelength: '468 nm (Electric Cyan)',
    biolumeType: 'Colonial Phototrophic Pulsing',
    discoveryYear: 1884,
    location: 'Izu-Ogasawara Trench, Northwest Pacific',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    description: 'A colossal rhizophysid siphonophore composed of thousands of highly specialized cloned zooids that function as a single nomadic superorganism drifting through bathyal currents.',
    vitalStats: [
      { label: 'Colony Length', value: 'Up to 3.2 meters' },
      { label: 'Photocyte Matrix', value: 'Pteropodial cluster' },
      { label: 'Hydrostatic Resistance', value: '41.2 MPa' },
      { label: 'Metabolic Decay Rate', value: '0.008 μmol O₂/g/h' },
    ],
    biochemistry: {
      compound: 'Coelenterazine Derivative',
      coFactor: 'Calcium-activated photoprotein',
      quantumYield: '0.23 Φ',
      purpose: 'Predatory lure and predatory alarm distraction',
    },
    fieldNotes: 'During ROV dive 412, specimen hovered motionless at 3,420m depth. When disturbed by sub thruster wake, its gastrozooid branches propagated synchronized waves of neon cyan photoluminescence along a 2-meter axis.'
  },
  {
    id: 'specimen-02',
    catalogNumber: 'HAD-LOPH-114',
    scientificName: 'Melanocetus johnsonii',
    commonName: 'Humpback Blackdevil Anglerfish',
    strata: 'Abyssopelagic',
    depthRange: '3,800 - 5,200 m',
    pressure: '380 - 520 ATM',
    emissionWavelength: '475 nm (Aquamarine Luminescence)',
    biolumeType: 'Symbiotic Esca Photophoric Culture',
    discoveryYear: 1864,
    location: 'Challenger Deep Ridge, Mariana Basin',
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80',
    description: 'Possesses an ultra-black dermis that absorbs 99.8% of incident ambient light, rendering its predatory silhouette completely invisible save for the glowing esca tipped with symbiote vibrio bacteria.',
    vitalStats: [
      { label: 'Max Specimen Size', value: '18.5 cm (Female)' },
      { label: 'Dermal Reflectance', value: '0.044% (Ultra-Black)' },
      { label: 'Bacterial Density', value: '1.4 × 10¹⁰ cells/ml' },
      { label: 'Jaw Expansion Ratio', value: '2.8× Cranial Volume' },
    ],
    biochemistry: {
      compound: 'FMNH₂ + Myristic Aldehyde',
      coFactor: 'Bacterial Luciferase',
      quantumYield: '0.19 Φ',
      purpose: 'Apex bait lure in zero-light bathypelagic strata',
    },
    fieldNotes: 'Submersible sonar recorded intermittent photic signaling at 4,610m. The luminous esca flickered at 1.8 Hz, drawing hadal euphausiids directly toward the needle-toothed mandibular cavern.'
  },
  {
    id: 'specimen-03',
    catalogNumber: 'HAD-SCYPH-205',
    scientificName: 'Atolla wyvillei',
    commonName: 'Coronate Crown Jellyfish',
    strata: 'Abyssopelagic',
    depthRange: '4,000 - 6,100 m',
    pressure: '400 - 610 ATM',
    emissionWavelength: '462 nm (Bioluminescent Alarm Flash)',
    biolumeType: 'Marginal Ring Flash (Burglar Alarm)',
    discoveryYear: 1880,
    location: 'Kermadec Trench System, South Pacific',
    image: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=1200&q=80',
    description: 'Renowned for its dramatic pinwheel flash sequence. When grasped by a predator, it triggers circular cascading flashes intended to illuminate the attacker and attract secondary tertiary apex predators.',
    vitalStats: [
      { label: 'Bell Diameter', value: '17.4 cm' },
      { label: 'Hypertrophied Tentacle', value: '1 elongated (up to 4.5×)' },
      { label: 'Flash Velocity', value: '45 cm/s circular wave' },
      { label: 'Pigmentation', value: 'Deep Purpurin Porphyrin' },
    ],
    biochemistry: {
      compound: 'Coelenterazine (Bound to Renilla GFP)',
      coFactor: 'Mg²⁺ / Ca²⁺ cascade',
      quantumYield: '0.31 Φ',
      purpose: 'Anti-predatory optical beacon ("Burglar Alarm")',
    },
    fieldNotes: 'Upon laser scanning contact at 5,190m, bell initiated clockwise luminous burst sequence at 3.2 rev/s, generating high-lux flashes visible through 20 meters of abyssal obscurity.'
  },
  {
    id: 'specimen-04',
    catalogNumber: 'HAD-LIPAR-008',
    scientificName: 'Pseudoliparis swirei',
    commonName: 'Mariana Hadal Snailfish',
    strata: 'Hadalpelagic',
    depthRange: '6,898 - 8,178 m',
    pressure: '690 - 820 ATM',
    emissionWavelength: '512 nm (Sub-dermal Chemosensory Glow)',
    biolumeType: 'Endogenous Visceral Translucence',
    discoveryYear: 2014,
    location: 'Mariana Trench, Challenger Deep Rim',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    description: 'The deepest-dwelling vertebrate on planet Earth. Translucent flesh devoid of skeletal calcification, reinforced with trimethylamine N-oxide (TMAO) osmolyte molecules that prevent protein collapse.',
    vitalStats: [
      { label: 'Maximum Verified Depth', value: '8,178 m' },
      { label: 'Cellular TMAO Level', value: '185 mmol/kg tissue' },
      { label: 'Bone Structure', value: 'Cartilaginous non-calcified' },
      { label: 'Apex Ranking', value: 'Dominant Hadal Invertebrate Hunter' },
    ],
    biochemistry: {
      compound: 'TMAO / Scyllo-inositol',
      coFactor: 'Chaperone protein stabilizing complex',
      quantumYield: 'Endogenous diffuse luminescence',
      purpose: 'Structural integrity preservation at 800+ bar',
    },
    fieldNotes: 'Baited lander cameras at 7,966m recorded small schools navigating pitch-black trench floor gravel, feeding on hadal amphipods with astonishing agility under 80 megapascals.'
  },
  {
    id: 'specimen-05',
    catalogNumber: 'HAD-ISOP-401',
    scientificName: 'Bathynomus giganteus',
    commonName: 'Abyssal Deep-Sea Giant Isopod',
    strata: 'Hadal / Abyssal Floor',
    depthRange: '2,500 - 9,800 m',
    pressure: '250 - 980 ATM',
    emissionWavelength: '495 nm (Chemosensitive Ocular Luster)',
    biolumeType: 'Retro-reflective Tapetum Lucidum',
    discoveryYear: 1879,
    location: 'Philippine Basin & San Cristobal Trench',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80',
    description: 'An ancient benthic scavenger exemplifying deep-sea gigantism. Equipped with fourteen segmented periopods and compound eyes boasting over 4,000 hexagonal facets tuned to capture single photons.',
    vitalStats: [
      { label: 'Carapace Length', value: '37.8 cm' },
      { label: 'Ocular Facet Count', value: '4,028 Hexagonal ommatidia' },
      { label: 'Fasting Endurance', value: 'Up to 5 years (Hypometabolic)' },
      { label: 'Exoskeleton Shielding', value: 'Calcite-chitin matrix' },
    ],
    biochemistry: {
      compound: 'Luciferin-6-sulfate reservoir',
      coFactor: 'ATP synthase coupled trigger',
      quantumYield: '0.14 Φ',
      purpose: 'Benthic foraging and carcass localization',
    },
    fieldNotes: 'Specimen observed excavating sulfurous sediment around methane seep at 6,400m. Its tapetum eyes reflected the submarine searchlight with an eerie iridescent emerald sheen.'
  }
];

export const DEPTH_STRATA: DepthStrata[] = [
  {
    id: 'strata-01',
    name: 'Epipelagic Zone',
    depthRange: '0 - 200 m',
    lux: '100,000 - 100 Lux',
    atmospheres: '1 - 20 ATM',
    temperature: '28°C to 15°C',
    keyFeature: 'The Sunlight Domain. Solar radiation fuels photosynthetic phytoplankton foundations.',
    fauna: ['Pelagic sharks', 'Cetaceans', 'Tuna', 'Diatom blooms']
  },
  {
    id: 'strata-02',
    name: 'Mesopelagic Zone',
    depthRange: '200 - 1,000 m',
    lux: '100 - 0.001 Lux',
    atmospheres: '20 - 100 ATM',
    temperature: '15°C to 4°C',
    keyFeature: 'The Twilight Domain. The threshold where blue-green wavelengths make their final fade.',
    fauna: ['Lanternfish', 'Vampire Squid', 'Hatchetfish', 'Pyrosomes']
  },
  {
    id: 'strata-03',
    name: 'Bathypelagic Zone',
    depthRange: '1,000 - 4,000 m',
    lux: '0 Lux (Zero Solar Light)',
    atmospheres: '100 - 400 ATM',
    temperature: '4°C to 2°C',
    keyFeature: 'The Midnight Domain. 90% of all organisms generate their own endogenous cold light.',
    fauna: ['Siphonophores', 'Sperm whales (diving)', 'Gulper eels', 'Bioluminescent jellyfish']
  },
  {
    id: 'strata-04',
    name: 'Abyssopelagic Zone',
    depthRange: '4,000 - 6,000 m',
    lux: 'Absolute Darkness',
    atmospheres: '400 - 600 ATM',
    temperature: '2°C to 1°C',
    keyFeature: 'The Abyssal Plains. Extreme hydrostatic pressure, soft pelagic ooze, marine snow drifts.',
    fauna: ['Blackdevil Anglerfish', 'Tripod fish', 'Dumbo octopus', 'Grenadiers']
  },
  {
    id: 'strata-05',
    name: 'Hadalpelagic Zone',
    depthRange: '6,000 - 11,034 m',
    lux: 'Void Black',
    atmospheres: '600 - 1,100 ATM',
    temperature: '1.2°C to 4°C (Hydrothermal)',
    keyFeature: 'The Hadal Trenches. V-shaped tectonic subduction canyons bearing Earth’s most resilient life.',
    fauna: ['Mariana Snailfish', 'Giant Amphipods', 'Xenophyophores', 'Tubeworms']
  }
];

export const TRENCH_NODES: TrenchNode[] = [
  {
    id: 'challenger',
    name: 'Challenger Deep (Mariana Trench)',
    ocean: 'Northwest Pacific Ocean',
    maxDepth: '-10,928 m',
    coordinates: '11°22.4′N, 142°35.5′E',
    x: 68,
    y: 48,
    activeSurvey: 'Benthic Rover Survey IV [Online]'
  },
  {
    id: 'tonga',
    name: 'Horizon Deep (Tonga Trench)',
    ocean: 'South Pacific Ocean',
    maxDepth: '-10,823 m',
    coordinates: '23°15.5′S, 174°43.6′W',
    x: 84,
    y: 72,
    activeSurvey: 'Seismic Telemetry Node [Standby]'
  },
  {
    id: 'puerto-rico',
    name: 'Milwaukee Deep (Puerto Rico Trench)',
    ocean: 'Atlantic Ocean',
    maxDepth: '-8,376 m',
    coordinates: '19°45.0′N, 66°30.0′W',
    x: 28,
    y: 44,
    activeSurvey: 'Deep Ocean Lander 02 [Collecting]'
  },
  {
    id: 'kermadec',
    name: 'Scholl Deep (Kermadec Trench)',
    ocean: 'Southwest Pacific Ocean',
    maxDepth: '-10,047 m',
    coordinates: '31°12.0′S, 177°30.0′W',
    x: 82,
    y: 84,
    activeSurvey: 'Autonomous Glider B-8 [Ascending]'
  },
  {
    id: 'java',
    name: 'Diamantina Deep (Java Trench)',
    ocean: 'Eastern Indian Ocean',
    maxDepth: '-7,290 m',
    coordinates: '10°19.0′S, 109°58.0′E',
    x: 55,
    y: 65,
    activeSurvey: 'Chemosynthetic Array [Active]'
  }
];
