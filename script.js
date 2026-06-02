const sceneContent = document.getElementById('scene-content');
const template = document.getElementById('element-template');

// Elements data (118)
const rawData = "1,H,Hydrogen;2,He,Helium;3,Li,Lithium;4,Be,Beryllium;5,B,Boron;6,C,Carbon;7,N,Nitrogen;8,O,Oxygen;9,F,Fluorine;10,Ne,Neon;11,Na,Sodium;12,Mg,Magnesium;13,Al,Aluminum;14,Si,Silicon;15,P,Phosphorus;16,S,Sulfur;17,Cl,Chlorine;18,Ar,Argon;19,K,Potassium;20,Ca,Calcium;21,Sc,Scandium;22,Ti,Titanium;23,V,Vanadium;24,Cr,Chromium;25,Mn,Manganese;26,Fe,Iron;27,Co,Cobalt;28,Ni,Nickel;29,Cu,Copper;30,Zn,Zinc;31,Ga,Gallium;32,Ge,Germanium;33,As,Arsenic;34,Se,Selenium;35,Br,Bromine;36,Kr,Krypton;37,Rb,Rubidium;38,Sr,Strontium;39,Y,Yttrium;40,Zr,Zirconium;41,Nb,Niobium;42,Mo,Molybdenum;43,Tc,Technetium;44,Ru,Ruthenium;45,Rh,Rhodium;46,Pd,Palladium;47,Ag,Silver;48,Cd,Cadmium;49,In,Indium;50,Sn,Tin;51,Sb,Antimony;52,Te,Tellurium;53,I,Iodine;54,Xe,Xenon;55,Cs,Cesium;56,Ba,Barium;57,La,Lanthanum;58,Ce,Cerium;59,Pr,Praseodymium;60,Nd,Neodymium;61,Pm,Promethium;62,Sm,Samarium;63,Eu,Europium;64,Gd,Gadolinium;65,Tb,Terbium;66,Dy,Dysprosium;67,Ho,Holmium;68,Er,Erbium;69,Tm,Thulium;70,Yb,Ytterbium;71,Lu,Lutetium;72,Hf,Hafnium;73,Ta,Tantalum;74,W,Tungsten;75,Re,Rhenium;76,Os,Osmium;77,Ir,Iridium;78,Pt,Platinum;79,Au,Gold;80,Hg,Mercury;81,Tl,Thallium;82,Pb,Lead;83,Bi,Bismuth;84,Po,Polonium;85,At,Astatine;86,Rn,Radon;87,Fr,Francium;88,Ra,Radium;89,Ac,Actinium;90,Th,Thorium;91,Pa,Protactinium;92,U,Uranium;93,Np,Neptunium;94,Pu,Plutonium;95,Am,Americium;96,Cm,Curium;97,Bk,Berkelium;98,Cf,Californium;99,Es,Einsteinium;100,Fm,Fermium;101,Md,Mendelevium;102,No,Nobelium;103,Lr,Lawrencium;104,Rf,Rutherfordium;105,Db,Dubnium;106,Sg,Seaborgium;107,Bh,Bohrium;108,Hs,Hassium;109,Mt,Meitnerium;110,Ds,Darmstadtium;111,Rg,Roentgenium;112,Cn,Copernicium;113,Nh,Nihonium;114,Fl,Flerovium;115,Mc,Moscovium;116,Lv,Livermorium;117,Ts,Tennessine;118,Og,Oganesson";

const elements = rawData.split(';').map(item => {
  const [num, sym, name] = item.split(',');
  return { number: num, symbol: sym, name: name };
});

const cardElements = [];
const layouts = { table: [], sphere: [], helix: [], grid: [] };

// Generate cards
elements.forEach((data) => {
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector('.element');

  card.querySelector('.element-number').textContent = data.number;
  card.querySelector('.element-symbol').textContent = data.symbol;
  card.querySelector('.element-title').textContent = data.name;

  gsap.set(card, {
    x: (Math.random() - 0.5) * 4000,
    y: (Math.random() - 0.5) * 4000,
    z: (Math.random() - 0.5) * 4000,
    rotationX: (Math.random() - 0.5) * 90,
    rotationY: (Math.random() - 0.5) * 90
  });

  sceneContent.appendChild(card);
  cardElements.push(card);

  card.addEventListener('pointerenter', () => {
    gsap.to(card, { scale: 1.15, borderColor: '#66d0ff', zIndex: 10, duration: 0.3, ease: "back.out(2)" });
  });
  card.addEventListener('pointerleave', () => {
    gsap.to(card, { scale: 1, borderColor: 'rgba(38, 53, 74, 0.8)', zIndex: 1, duration: 0.2 });
  });
});

// Layouts
(function generateLayouts() {
  const cols = 18, gapX = 140, gapY = 160;
  const radius = 800, l = cardElements.length;
  const hRadius = 700, separation = 20;
  const gX = 5, gY = 5, spacing = 350;

  cardElements.forEach((_, i) => {
    // Table
    layouts.table.push({
      x: (i % cols - cols / 2 + 0.5) * gapX,
      y: (Math.floor(i / cols) - 3) * gapY,
      z: -200, rX: 0, rY: 0, rZ: 0
    });

    // Sphere
    const phi = Math.acos(-1 + (2 * i) / l);
    const theta = Math.sqrt(l * Math.PI) * phi;
    layouts.sphere.push({
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
      rX: 0, rY: theta * (180 / Math.PI), rZ: 0
    });

    // Helix
    const hTheta = i * 0.25 + Math.PI;
    layouts.helix.push({
      x: hRadius * Math.cos(hTheta),
      y: -(i * separation) + (l * separation) / 2,
      z: hRadius * Math.sin(hTheta),
      rX: 0, rY: (-hTheta + Math.PI / 2) * (180 / Math.PI), rZ: 0
    });

    // Grid
    const x = i % gX;
    const y = Math.floor((i % (gX * gY)) / gX);
    const z = Math.floor(i / (gX * gY));
    layouts.grid.push({
      x: (x - 2) * spacing,
      y: (y - 2) * spacing,
      z: (z - 2) * spacing,
      rX: 0, rY: 0, rZ: 0
    });
  });
})();

// Transform function
function transformTo(layoutName) {
  const targetLayout = layouts[layoutName];
  if (!targetLayout) return;

  document.querySelectorAll('.toggle').forEach(b => b.classList.remove('is-active'));
  document.getElementById(layoutName).classList.add('is-active');

  cardElements.forEach((card, i) => {
    const t = targetLayout[i];
    gsap.to(card, {
      x: t.x,
      y: t.y,
      z: t.z,
      rotationX: t.rX || 0,
      rotationY: t.rY || 0,
      rotationZ: t.rZ || 0,
      duration: 1.5,
      ease: "expo.inOut",
      delay: i * 0.012,
      force3D: true,
      overwrite: "auto"
    });
  });
}

// Default layout
setTimeout(() => transformTo('table'), 300);

// Buttons
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', (e) => transformTo(e.currentTarget.id));
});

// Dynamic Camera/Zoom Logic based on Screen Size
function autoFitScene() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  let dynamicScale = 1;

  // If the screen is vertical (like TikTok video aspect ratio)
  if (h > w) {
    dynamicScale = w / 2600; // Shrink enough to fit width
  } else {
    // Standard desktop screen
    dynamicScale = Math.min(w / 3000, h / 1200);
  }
  
  // Apply a minimum and maximum scale to prevent it from getting too small or too large
  dynamicScale = Math.max(0.3, Math.min(dynamicScale, 1));
  
  gsap.set(sceneContent, { scale: dynamicScale });
}

// Call on load and on every window resize
window.addEventListener('resize', autoFitScene);
autoFitScene();

// Scene rotation (Fixed end of code)
let isDown = false, sX = 0, sY = 0, rotX = 0, rotY = 0;

window.addEventListener('pointerdown', (e) => { 
  isDown = true; 
  sX = e.clientX; 
  sY = e.clientY; 
});

window.addEventListener('pointerup', () => { 
  isDown = false; 
});

window.addEventListener('pointermove', (e) => {
  if (!isDown) return;
  const dx = e.clientX - sX;
  const dy = e.clientY - sY;
  sX = e.clientX; 
  sY = e.clientY;
  
  rotY += dx * 0.15;
  rotX -= dy * 0.15;
  
  rotX = Math.max(-70, Math.min(70, rotX));
  
  gsap.to(sceneContent, { 
    rotationY: rotY, 
    rotationX: rotX, 
    duration: 0.6, 
    ease: "power2.out",
    force3D: true 
  });
});