// Supercar Inventory Dataset
// All 14 Brands requested: BMW, Ferraries, Mercedes benz, Toyota, Nissan, Ford, Honda, Tesla, BYD, Subaru, Suzuki, Mazda, Izusu, Audi

const CARS_DATABASE = [
  {
    id: "ferrari-sf90",
    name: "Ferrari SF90 Stradale Assetto Fiorano",
    brand: "Ferraries",
    price: 3850000,
    topSpeed: "340 km/h",
    acceleration: "2.5s (0-100)",
    horsepower: "986 HP",
    transmission: "8-Speed Dual Clutch",
    engine: "4.0L Twin-Turbo V8 Hybrid",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=80",
    isPopular: true,
    badge: "Hypercar Flagship",
    description: "The pinnacle of Maranello engineering. Tri-motor plug-in hybrid architecture delivering blistering lap times and pure Italian emotion.",
    colors: [
      { name: "Rosso Corsa Red", hex: "#d40000" },
      { name: "Giallo Modena Yellow", hex: "#ffd700" },
      { name: "Nero Daytona Black", hex: "#111111" },
      { name: "Bianco Avus White", hex: "#f0f0f0" }
    ]
  },
  {
    id: "mercedes-amg-one",
    name: "Mercedes-AMG ONE Hypercar",
    brand: "Mercedes benz",
    price: 3200000,
    topSpeed: "352 km/h",
    acceleration: "2.7s (0-100)",
    horsepower: "1049 HP",
    transmission: "7-Speed Automated Manual",
    engine: "1.6L Turbocharged V6 Formula 1 Hybrid",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80",
    isPopular: true,
    badge: "F1 Technology",
    description: "Real Formula 1 championship powertrain brought straight to the open highway. Carbon monocoque with active aerodynamic flaps.",
    colors: [
      { name: "Petronas Silver & Teal", hex: "#95a5a6" },
      { name: "Obsidian Metallic Black", hex: "#1a1a1a" },
      { name: "Selenite Magno Grey", hex: "#4b4f56" }
    ]
  },
  {
    id: "ford-gt-carbon",
    name: "Ford GT Liquid Carbon Heritage",
    brand: "Ford",
    price: 2150000,
    topSpeed: "347 km/h",
    acceleration: "3.0s (0-100)",
    horsepower: "660 HP",
    transmission: "7-Speed Dual Clutch",
    engine: "3.5L Twin-Turbo EcoBoost V6",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=80",
    isPopular: true,
    badge: "Le Mans Champion",
    description: "Crafted entirely with exposed carbon fiber bodywork and lightweight titanium exhaust system born from 24 Hours of Le Mans victory.",
    colors: [
      { name: "Liquid Raw Carbon", hex: "#2b2b2b" },
      { name: "Gulf Racing Blue & Orange", hex: "#4ba3e3" },
      { name: "Frozen White", hex: "#ffffff" }
    ]
  },
  {
    id: "byd-yangwang-u9",
    name: "BYD Yangwang U9 DiSus-X",
    brand: "BYD",
    price: 1650000,
    topSpeed: "375 km/h",
    acceleration: "2.36s (0-100)",
    horsepower: "1287 HP",
    transmission: "Single-Speed Quad Motor",
    engine: "Quad Electric Motors (e4 Platform)",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    isPopular: true,
    badge: "Electric Hypercar",
    description: "Next-generation electric hypercar equipped with revolutionary DiSus-X intelligent body control system, quad motor torque vectoring and track jumps.",
    colors: [
      { name: "Galactic Vermilion Red", hex: "#c0392b" },
      { name: "Neon Cyber Silver", hex: "#bdc3c7" },
      { name: "Midnight Nebula Purple", hex: "#4a235a" }
    ]
  },
  {
    id: "tesla-roadster",
    name: "Tesla Roadster SpaceX Edition",
    brand: "Tesla",
    price: 1500000,
    topSpeed: "400+ km/h",
    acceleration: "1.9s (0-100)",
    horsepower: "1350 HP",
    transmission: "All-Wheel Drive Electric",
    engine: "Tri-Motor AWD with Cold Gas Thrusters",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=80",
    isPopular: true,
    badge: "Fastest Electric",
    description: "The quickest accelerating supercar on Earth with SpaceX cold-gas thruster package, panoramic glass roof and unmatched 1000 km range.",
    colors: [
      { name: "Deep Crimson Red", hex: "#8e001c" },
      { name: "Stealth Satin Black", hex: "#1f1f1f" },
      { name: "Pearl White Multi-Coat", hex: "#f9f9f9" }
    ]
  },
  {
    id: "audi-r8-gt",
    name: "Audi R8 V10 GT RWD Limited",
    brand: "Audi",
    price: 1250000,
    topSpeed: "320 km/h",
    acceleration: "3.4s (0-100)",
    horsepower: "612 HP",
    transmission: "7-Speed S Tronic",
    engine: "5.2L Naturally Aspirated V10",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=80",
    isPopular: true,
    badge: "Naturally Aspirated V10",
    description: "The farewell edition of the legendary mid-engine German supercar. Pure rear-wheel drive thrills with motorsport aerodynamics.",
    colors: [
      { name: "Suzuka Grey Matte", hex: "#7f8c8d" },
      { name: "Mythos Black Metallic", hex: "#121212" },
      { name: "Tango Red Metallic", hex: "#b03a2e" }
    ]
  },
  {
    id: "honda-nsx-type-s",
    name: "Honda NSX Type S Twin-Turbo",
    brand: "Honda",
    price: 980000,
    topSpeed: "308 km/h",
    acceleration: "2.9s (0-100)",
    horsepower: "600 HP",
    transmission: "9-Speed Dual Clutch",
    engine: "3.5L Twin-Turbo V6 Hybrid SH-AWD",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80",
    isPopular: false,
    badge: "Super Hybrid",
    description: "Limited to 350 units worldwide. Carbon fiber roof, Sport Hybrid Super Handling All-Wheel Drive and lightning throttle response.",
    colors: [
      { name: "Gotham Gray Matte", hex: "#566573" },
      { name: "Thermal Orange Pearl", hex: "#e67e22" },
      { name: "Indy Yellow Pearl", hex: "#f4d03f" }
    ]
  },
  {
    id: "bmw-m8-competition",
    name: "BMW M8 Competition Gran Coupe",
    brand: "BMW",
    price: 890000,
    topSpeed: "305 km/h",
    acceleration: "3.2s (0-100)",
    horsepower: "617 HP",
    transmission: "8-Speed M Steptronic",
    engine: "4.4L M TwinPower Turbo V8",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80",
    isPopular: true,
    badge: "Luxury Grand Tourer",
    description: "Luxury meets explosive dynamics. M xDrive with switchable 2WD drift mode, carbon-ceramic brakes and bespoke executive interior.",
    colors: [
      { name: "Isle of Man Green", hex: "#1e8449" },
      { name: "Marina Bay Blue", hex: "#2980b9" },
      { name: "Dravit Grey Metallic", hex: "#34495e" },
      { name: "Alpine White", hex: "#ffffff" }
    ]
  },
  {
    id: "nissan-gtr-nismo",
    name: "Nissan GT-R NISMO Special Edition",
    brand: "Nissan",
    price: 820000,
    topSpeed: "330 km/h",
    acceleration: "2.8s (0-100)",
    horsepower: "600 HP",
    transmission: "6-Speed Dual Clutch",
    engine: "3.8L Twin-Turbo VR38DETT V6",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80",
    isPopular: true,
    badge: "Godzilla Track Beast",
    description: "The ultimate Japanese icon. GT3 race-spec turbochargers, carbon fiber hood, roof, and Brembo carbon-ceramic matrix braking.",
    colors: [
      { name: "NISMO Stealth Gray", hex: "#626567" },
      { name: "Solid White with Red Accents", hex: "#f2f3f4" },
      { name: "Ultimate Metal Silver", hex: "#95a5a6" }
    ]
  },
  {
    id: "mazda-rx-vision",
    name: "Mazda RX-Vision Rotary Concept",
    brand: "Mazda",
    price: 650000,
    topSpeed: "315 km/h",
    acceleration: "3.5s (0-100)",
    horsepower: "520 HP",
    transmission: "6-Speed Sequential",
    engine: "Skyactiv-R Quad-Rotor Rotary",
    image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1600&q=80",
    isPopular: false,
    badge: "Rotary Legend",
    description: "KODO soul in motion design celebrating the timeless rotary heritage. Screaming 9,500 RPM redline and immaculate front-mid-engine balance.",
    colors: [
      { name: "Soul Red Crystal", hex: "#900c3f" },
      { name: "Machine Grey Metallic", hex: "#2c3e50" },
      { name: "Snowflake White Pearl", hex: "#ecf0f1" }
    ]
  },
  {
    id: "toyota-gr-supra-gt4",
    name: "Toyota GR Supra GT4 100 Edition",
    brand: "Toyota",
    price: 490000,
    topSpeed: "300 km/h",
    acceleration: "3.7s (0-100)",
    horsepower: "450 HP",
    transmission: "7-Speed Sport Automatic",
    engine: "3.0L Inline-6 Twin-Scroll Turbo",
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=1600&q=80",
    isPopular: false,
    badge: "Gazoo Racing",
    description: "Collector-grade track weapon engineered by TOYOTA GAZOO Racing. Carbon aero front splitter, swan-neck wing and Akrapovic exhaust.",
    colors: [
      { name: "Plasma Orange Special", hex: "#d35400" },
      { name: "Matte Storm Grey", hex: "#424949" },
      { name: "Prominence Red", hex: "#c0392b" }
    ]
  },
  {
    id: "subaru-wrx-sti-s209",
    name: "Subaru WRX STI S209 Hyper Blue",
    brand: "Subaru",
    price: 360000,
    topSpeed: "280 km/h",
    acceleration: "4.1s (0-100)",
    horsepower: "341 HP",
    transmission: "6-Speed Close-Ratio Manual",
    engine: "2.5L Turbocharged Boxer-4 EJ25",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=80",
    isPopular: false,
    badge: "Rally Heritage",
    description: "STI bespoke widebody limited series with forged BBS wheels, Brembo 6-piston monoblocks, water spray intercooler and symmetrical AWD.",
    colors: [
      { name: "World Rally Blue Pearl", hex: "#0b5394" },
      { name: "Crystal White Pearl", hex: "#f7f9f9" },
      { name: "Magnetite Grey", hex: "#3b3f46" }
    ]
  },
  {
    id: "suzuki-vision-gt",
    name: "Suzuki Vision GT Supercar",
    brand: "Suzuki",
    price: 280000,
    topSpeed: "295 km/h",
    acceleration: "3.6s (0-100)",
    horsepower: "432 HP",
    transmission: "6-Speed Paddle Sequential",
    engine: "1.3L Hayabusa Inline-4 + Triple Electric Motors",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80",
    isPopular: false,
    badge: "Hayabusa Hybrid",
    description: "Combining legendary Suzuki Hayabusa motorcycle high-revving engine with tri-motor hybrid drive in an ultralight carbon roadster chassis.",
    colors: [
      { name: "Champion Yellow #4", hex: "#f1c40f" },
      { name: "Speedy Blue Metallic", hex: "#1f618d" },
      { name: "Super Black Pearl", hex: "#17202a" }
    ]
  },
  {
    id: "isuzu-arctic-420r",
    name: "Isuzu D-Max Arctic 420R Hyper-Truck",
    brand: "Izusu",
    price: 240000,
    topSpeed: "250 km/h",
    acceleration: "4.8s (0-100)",
    horsepower: "420 HP",
    transmission: "8-Speed Heavy Duty Sport Auto",
    engine: "3.0L Bi-Turbo Twin-Charged Diesel-Electric",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    bannerImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80",
    isPopular: false,
    badge: "Hyper Off-Roader",
    description: "Bespoke trophy edition super-truck with Fox Racing bypass dampers, flared carbon fenders, aggressive aero snorkel, and 420 horsepower.",
    colors: [
      { name: "Valencia Orange Matte", hex: "#d35400" },
      { name: "Basalt Black Mica", hex: "#212f3d" },
      { name: "Desert Sand Storm", hex: "#d4ac0d" }
    ]
  }
];

// Helper functions for data access
function getAllCars() {
  return [...CARS_DATABASE];
}

function getCarById(id) {
  return CARS_DATABASE.find(c => c.id === id) || CARS_DATABASE[0];
}

function getAllBrands() {
  const brands = [...new Set(CARS_DATABASE.map(c => c.brand))];
  return brands.sort();
}
