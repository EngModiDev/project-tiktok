# 3D Interactive Periodic Table

An interactive, high-performance 3D Periodic Table of Elements featuring four dynamic layouts: **Table**, **Sphere**, **Helix**, and **Grid**. Built with vanilla HTML, CSS, GSAP, and 3D CSS transforms, this project automatically scales to fit any screen size, making it perfect for both desktop displays and portrait-oriented mobile viewing (such as TikTok videos).

---

## 👨‍💻 Creator & Copyright Info

*   **Lead Developer:** `modi`
*   **TikTok Account:** [@MJcoders](https://www.tiktok.com/@MJcoders)
*   **GitHub Profile:** [EngModiDev](https://github.com/EngModiDev)
*   **Copyright License:** © [modi@mhmwd_](mailto:modi@mhmwd_)

---

## 🚀 Key Features

*   **Dynamic 3D Layouts:** Instantly transition elements between 4 different arrangements in physical 3D space.
*   **Responsive Auto-Fit:** Intelligently measures screen aspect ratios and scales the 3D scene so that it remains fully visible on mobile screens (TikTok format) and widescreen monitors.
*   **Physics-style Rotation:** Drag-to-rotate interaction allows users to spin the entire 3D scene dynamically with smooth deceleration.
*   **High Performance:** Built on GSAP (GreenSock Animation Platform) and hardware-accelerated CSS 3D Transforms (`will-change: transform` and `force3D: true`).

---

# 📖 Line-by-Line Code Explanation

---

## 1. HTML File (`index.html`)

The HTML file acts as the structural foundation of the project. It sets up the viewport, references external styles/libraries, houses the layout controls, and establishes a blueprint (template) for the chemical elements.

```html
<!DOCTYPE html>
```
*   **Line Explanation:** Declares that this document is written in HTML5. It tells the web browser how to parse and render the page properly.

```html
<html lang="en">
```
*   **Line Explanation:** The root tag containing all webpage content. The `lang="en"` attribute specifies that the primary language of the page is English.

```html
<head>
  <meta charset="UTF-8">
```
*   **Line Explanation:** opens the `<head>` section which holds invisible page metadata. `<meta charset="UTF-8">` ensures that special symbols, characters, and global scripts are decoded without encoding bugs.

```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
```
*   **Line Explanation:** Essential for mobile responsiveness. It forces the width of the webpage to match the actual width of the physical screen and sets the initial zoom level to 100%.

```html
  <title>Periodic Table - Auto Fit Layout</title>
```
*   **Line Explanation:** Defines the text displayed on the web browser tab.

```html
  <link rel="stylesheet" href="style.css">
```
*   **Line Explanation:** Links the external CSS stylesheet (`style.css`) to apply styling to our elements, colors, and layout structure.

```html
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
</head>
```
*   **Line Explanation:** Imports the **GSAP (GreenSock Animation Platform)** library from a secure Content Delivery Network (CDN). GSAP handles all the mathematical calculations and smooth animations in 3D space. Finally, `</head>` closes the metadata section.

```html
<body>
```
*   **Line Explanation:** Opens the structural body of the webpage where all visible items are placed.

```html
  <div class="controls">
    <div class="controls-group">
```
*   **Line Explanation:** Creates a container element (`controls`) and an inner grouping wrapper (`controls-group`) to hold and align our navigational menu buttons.

```html
      <button class="button is-active toggle" id="table">Table</button>
      <button class="button toggle" id="sphere">Sphere</button>
      <button class="button toggle" id="helix">Helix</button>
      <button class="button toggle" id="grid">Grid</button>
    </div>
  </div>
```
*   **Line Explanation:** Creates four interactive button elements. Each has a class of `button` (for visual styling) and `toggle` (for identification in JavaScript). The `table` button has the class `is-active` because it starts selected. Each button has a unique `id` specifying its respective layout shape.

```html
  <div class="watermark">
    <div class="brand-name">modi</div>
    <div class="tiktok">TikTok: @MJcoders</div>
    <div class="github">GitHub: EngModiDev</div>
    <div class="copy">© modi@mhmwd_</div>
  </div>
```
*   **Line Explanation:** Houses the brand watermark displayed on screen to establish proof of creation and copyright. Includes the creator name, TikTok handle, GitHub, and copyright tag.

```html
  <div id="scene">
    <div id="scene-content"></div>
  </div>
```
*   **Line Explanation:** 
    *   `#scene` is the outer container acting as the physical 3D viewing box (providing depth perspective).
    *   `#scene-content` is the inner coordinates container. All chemical element cards are dynamically placed inside this div. Rotating this single element rotates the entire 3D universe.

```html
  <template id="element-template">
    <div class="element">
      <div class="element-number"></div>
      <div class="element-symbol"></div>
      <div class="element-title"></div>
    </div>
  </template>
```
*   **Line Explanation:** The `<template>` tag holds HTML markup that is not rendered on page load. Instead, JavaScript clones this blueprint 118 times to generate identical physical DOM cards containing placeholders for an element's atomic number, chemical symbol, and full name.

```html
  <script src="script.js"></script>
</body>
</html>
```
*   **Line Explanation:** Links the JavaScript file (`script.js`) to parse the program logic right before closing the HTML body.

---

## 2. CSS Stylesheet (`style.css`)

The CSS code styles the UI elements and establishes the 3D rendering context using hardware-accelerated layout rules.

```css
:root {
  --bg: #060812;
  --panel: #0f1724;
  --accent: #66d0ff;
  --muted: #9fb7d8;
}
```
*   **Line Explanation:** Defines CSS global variables (design tokens). This makes colors easily reusable across the entire codebase. `--bg` is dark blue/black, `--panel` is element card background, `--accent` is high-tech cyan, and `--muted` is light gray-blue.

```css
body {
  margin: 0;
  background-color: var(--bg);
  color: #e6eef8;
  font-family: 'Inter', Roboto, Arial, sans-serif;
  overflow: hidden;
  height: 100vh;
}
```
*   **Line Explanation:** Resets default browser margins to `0`. It applies our dark background, sets the default text color, selects a modern sans-serif font stack, disables scrollbars (`overflow: hidden`), and locks the window height to exactly the viewport height.

```css
.controls {
  position: absolute;
  top: 25px;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
}
```
*   **Line Explanation:** Positions the button interface container globally over the viewport. It sits `25px` from the top, is forced on top of other elements using `z-index: 100`, and centers itself horizontally by shifting left by 50% and translating backward by -50% of its own width.

```css
.button {
  background: var(--panel);
  border: 1px solid rgba(38, 53, 74, 0.9);
  color: var(--accent);
  padding: 10px 18px;
  margin: 0 6px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  transition: background-color 0.2s, color 0.2s, transform 0.15s;
  text-transform: capitalize;
}
```
*   **Line Explanation:** Styles the control buttons with rounded borders, internal padding, modern heavy typography (`font-weight: 700`), and a hand pointer cursor. The `transition` ensures animations for color changes and clicks feel fluid.

```css
.button.is-active, .button:hover {
  background: var(--accent);
  color: var(--bg);
  box-shadow: 0 0 15px rgba(102,208,255,0.35);
}
```
*   **Line Explanation:** Whenever a button has the `.is-active` class or is hovered over by a pointer, its background becomes cyan, its text color changes to dark blue, and a high-tech outer glow (neon drop shadow) is added.

```css
.button:active {
  transform: scale(0.95);
}
```
*   **Line Explanation:** Shrinks the button slightly (to 95% of its normal scale) when pressed to provide tactile interaction feedback.

```css
.watermark {
  position: absolute;
  bottom: 25px;
  right: 25px;
  text-align: right;
  z-index: 100;
  pointer-events: none;
  background: rgba(15, 23, 36, 0.6);
  padding: 15px 20px;
  border-radius: 12px;
  border: 1px solid rgba(38, 53, 74, 0.5);
  backdrop-filter: blur(4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
```
*   **Line Explanation:** Positions the visual credit watermark in the bottom-right corner. It uses a translucent glass-morphism panel effect with a blurred background (`backdrop-filter: blur(4px)`). `pointer-events: none` makes the card physically invisible to mouse clicks so users can click/drag the 3D scene directly through it.

```css
.brand-name {
  font-size: 24px;
  font-weight: 900;
  color: var(--accent);
  margin-bottom: 5px;
  text-shadow: 0 0 10px rgba(102,208,255,0.4);
}
```
*   **Line Explanation:** Sizes and styles the creator name (`modi`) using an ultra-bold thickness (`font-weight: 900`) and a custom glowing shadow effect.

```css
.tiktok, .github {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 3px;
}
```
*   **Line Explanation:** Sets the text sizing and weights for the TikTok and GitHub handle displays.

```css
.copy {
  font-size: 11px;
  color: var(--muted);
  margin-top: 8px;
  font-weight: 500;
}
```
*   **Line Explanation:** Small styling block for the copyright line (`© modi@mhmwd_`).

```css
#scene {
  width: 100vw;
  height: 100vh;
  perspective: 3000px;
  overflow: hidden;
  touch-action: none;
}
```
*   **Line Explanation:** The main physical viewport container. `perspective: 3000px` is the key property enabling 3D: it acts as a virtual camera lens, where objects further away in the Z-axis appear visually smaller. `touch-action: none` stops default mobile gestures (like scrolling or refreshing) from interfering with dragging and rotating.

```css
#scene-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-style: preserve-3d;
  will-change: transform;
}
```
*   **Line Explanation:** Placed directly in the center of the viewport. `transform-style: preserve-3d` tells the browser that child elements nested inside this container must retain their 3D $X, Y, Z$ positions instead of being flattened. `will-change: transform` pre-renders the element onto the computer's GPU for maximum processing speed.

```css
.element {
  position: absolute;
  left: -60px;
  top: -70px;
  width: 120px;
  height: 140px;
  background: linear-gradient(180deg, rgba(15,23,36,0.95), rgba(7,12,22,0.95));
  border: 1px solid rgba(38, 53, 74, 0.8);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  will-change: transform;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
```
*   **Line Explanation:** Standardizes the chemical card design. By assigning `left: -60px` and `top: -70px` (which are exactly half of the card's width and height), we ensure that the exact mathematical center of each card aligns with its virtual pivot point. Uses flexbox to vertically center the interior content and prevents text-selection highlighting.

```css
.element-number { font-size: 26px; font-weight: 800; color: #ffffff; }
.element-symbol { font-size: 20px; font-weight: 800; color: var(--accent); margin-top: 6px; }
.element-title { font-size: 11px; color: var(--muted); margin-top: 6px; font-weight: 600; }
```
*   **Line Explanation:** Quick styles defining typography sizes, tracking, colors, and margins for the interior text elements (atomic number, chemical symbol, and element name).

```css
.element:hover {
  border-color: var(--accent);
  box-shadow: 0 0 25px rgba(102,208,255,0.4);
}
```
*   **Line Explanation:** Adds a glowing, illuminated effect to an individual card's border when hovered over by a user.

```css
@media (max-width: 700px) {
  .watermark { bottom: 15px; right: 15px; padding: 10px 15px; }
  .brand-name { font-size: 18px; }
  .tiktok, .github { font-size: 12px; }
}
```
*   **Line Explanation:** Responsive breakpoint rule. If the viewer is on a narrow viewport (like a mobile phone, tablet, or a portrait layout), the watermark automatically shrinks to prevent blocking the central 3D visual elements.

---

## 3. JavaScript Logic (`script.js`)

This file contains the core engine. It manages the database, instantiates cards, computes the mathematical coordinates of the layouts, coordinates GSAP animations, handles auto-scaling, and manages trackball scene rotation.

```javascript
const sceneContent = document.getElementById('scene-content');
const template = document.getElementById('element-template');
```
*   **Line Explanation:** Queries the DOM to reference our central 3D wrapper (`#scene-content`) and the blueprint card model (`#element-template`).

```javascript
const rawData = "1,H,Hydrogen;2,He,Helium;3,Li,Lithium;...;118,Og,Oganesson";
```
*   **Line Explanation:** A compact, compressed raw string of all 118 real elements formatted as `Number,Symbol,Name` and separated by semicolons. This format keeps file sizes small.

```javascript
const elements = rawData.split(';').map(item => {
  const [num, sym, name] = item.split(',');
  return { number: num, symbol: sym, name: name };
});
```
*   **Line Explanation:** Parses the flat database string:
    1.  `.split(';')` splits the giant string into an array of 118 smaller string blocks.
    2.  `.map(...)` iterates through each block.
    3.  `item.split(',')` splits each block by commas into structural variables using array destructuring (`num`, `sym`, `name`).
    4.  Returns a structured array of JSON objects: `{ number, symbol, name }`.

```javascript
const cardElements = [];
const layouts = { table: [], sphere: [], helix: [], grid: [] };
```
*   **Line Explanation:**
    *   `cardElements` is an empty array that will store direct JavaScript references to the physical HTML elements created on the page.
    *   `layouts` is an object that will hold array records of calculated 3D coordinates ($x, y, z$ coordinates and rotations) for each of the four structural views.

```javascript
elements.forEach((data) => {
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector('.element');
```
*   **Line Explanation:** Loops through each element object in the parsed dataset. `template.content.cloneNode(true)` makes a deep copy of the template HTML code in memory, and we extract a reference to the card div (`.element`).

```javascript
  card.querySelector('.element-number').textContent = data.number;
  card.querySelector('.element-symbol').textContent = data.symbol;
  card.querySelector('.element-title').textContent = data.name;
```
*   **Line Explanation:** Fills the element's parsed information (atomic number, abbreviation symbol, full name) into their corresponding nodes inside the cloned template card.

```javascript
  gsap.set(card, {
    x: (Math.random() - 0.5) * 4000,
    y: (Math.random() - 0.5) * 4000,
    z: (Math.random() - 0.5) * 4000,
    rotationX: (Math.random() - 0.5) * 90,
    rotationY: (Math.random() - 0.5) * 90
  });
```
*   **Line Explanation:** Sets an initial random starting position for each element. This scatters the 118 elements across a large 3D coordinate space ($X, Y, Z$ positions and rotations between $-2000$ and $2000$). When the page loads, the elements fly into position from this random starting field.

```javascript
  sceneContent.appendChild(card);
  cardElements.push(card);
```
*   **Line Explanation:** Appends the cloned card node to the active scene in the DOM, then pushes its reference to the global `cardElements` array for later manipulation.

```javascript
  card.addEventListener('pointerenter', () => {
    gsap.to(card, { scale: 1.15, borderColor: '#66d0ff', zIndex: 10, duration: 0.3, ease: "back.out(2)" });
  });
  card.addEventListener('pointerleave', () => {
    gsap.to(card, { scale: 1, borderColor: 'rgba(38, 53, 74, 0.8)', zIndex: 1, duration: 0.2 });
  });
});
```
*   **Line Explanation:** Binds hover events. When a pointer rolls onto a card, GSAP scales it up by 15%, lights up the borders in cyan, and raises its depth stacking priority (`zIndex: 10`) using a quick, springy animation curve (`back.out(2)`). When the pointer leaves, it animates back to its default state.

```javascript
(function generateLayouts() {
  const cols = 18, gapX = 140, gapY = 160;
  const radius = 800, l = cardElements.length;
  const hRadius = 700, separation = 20;
  const gX = 5, gY = 5, spacing = 350;
```
*   **Line Explanation:** An Immediately Invoked Function Expression (IIFE) that runs immediately to calculate coordinates. It defines mathematical parameters: 18 columns for the standard Periodic Table layout, radial sizes for the sphere and helix layouts, and grid intervals.

```javascript
  cardElements.forEach((_, i) => {
```
*   **Line Explanation:** Loops through all cards to calculate their unique spatial coordinate object based on their index `i`.

```javascript
    // Table
    layouts.table.push({
      x: (i % cols - cols / 2 + 0.5) * gapX,
      y: (Math.floor(i / cols) - 3) * gapY,
      z: -200, rX: 0, rY: 0, rZ: 0
    });
```
*   **Line Explanation:** Computes standard flat table coordinates.
    *   `i % cols` returns the column index (0 to 17).
    *   `i / cols` calculates the row index.
    *   Subtracting `cols / 2` and `3` centers the entire table layout around the original mathematical coordinate point `(0,0,0)`.

```javascript
    // Sphere
    const phi = Math.acos(-1 + (2 * i) / l);
    const theta = Math.sqrt(l * Math.PI) * phi;
    layouts.sphere.push({
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
      rX: 0, rY: theta * (180 / Math.PI), rZ: 0
    });
```
*   **Line Explanation:** Distributes the 118 elements evenly across a 3D sphere using the **Spherical Fibonacci Grid** algorithm.
    *   `phi` computes the latitude angle, and `theta` computes the longitude angle.
    *   Translates these spherical angles to Cartesian coordinates ($X, Y, Z$) using trigonometry [see math breakdown below].
    *   Sets each card's visual yaw rotation (`rY`) so that every card directly faces away from the center of the sphere.

```javascript
    // Helix
    const hTheta = i * 0.25 + Math.PI;
    layouts.helix.push({
      x: hRadius * Math.cos(hTheta),
      y: -(i * separation) + (l * separation) / 2,
      z: hRadius * Math.sin(hTheta),
      rX: 0, rY: (-hTheta + Math.PI / 2) * (180 / Math.PI), rZ: 0
    });
```
*   **Line Explanation:** Distributes elements along a spiral helix path.
    *   The spiral angle `hTheta` increases with each element, placing them in a circle around the vertical axis.
    *   The vertical height `y` decreases linearly with the index `i` to distribute the cards top-to-bottom.
    *   Each card's yaw rotation is calculated so that the cards face outward from the cylinder's center axis.

```javascript
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
```
*   **Line Explanation:** Maps the 118 cards into a block grid layout:
    *   Computes coordinates on a 3D grid layout ($5 \times 5 \times 5$).
    *   Calculates relative column `x`, flat grid row `y`, and deep depth tier `z`.
    *   Centers the final block matrix by subtracting `2` from each coordinate parameter, then scales the coordinates up by `spacing` to prevent visual overlapping.

```javascript
function transformTo(layoutName) {
  const targetLayout = layouts[layoutName];
  if (!targetLayout) return;
```
*   **Line Explanation:** Declares the master transformation function. It grabs the targeted mathematical array layout. If a layout name that does not exist is requested, it exits early to prevent application crashes.

```javascript
  document.querySelectorAll('.toggle').forEach(b => b.classList.remove('is-active'));
  document.getElementById(layoutName).classList.add('is-active');
```
*   **Line Explanation:** Code cleanup: loops through all navigation layout buttons, removes their highlight class `.is-active`, then queries the specific active button and adds the `.is-active` style back onto it.

```javascript
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
```
*   **Line Explanation:** Animates every individual chemical card from its current coordinate position to its target coordinates:
    *   Coordinates the animation to target coordinates `x, y, z` and rotations `rotationX, rotationY, rotationZ`.
    *   Sets a transition time of 1.5 seconds using a polished start-stop curve (`expo.inOut`).
    *   Applies a staggered layout delay (`i * 0.012` seconds) so cards fly sequentially one after another to create a beautiful fluid wave animation.
    *   `force3D: true` forces rendering onto the GPU, and `overwrite: "auto"` interrupts any active animations if a user quickly switches layouts.

```javascript
setTimeout(() => transformTo('table'), 300);
```
*   **Line Explanation:** Adds a slight initial delay (300ms) upon loading the page before animating the scattered elements into the default **Table** layout.

```javascript
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', (e) => transformTo(e.currentTarget.id));
});
```
*   **Line Explanation:** Selects all buttons containing the class `.toggle`, and binds a click event listener to run `transformTo` with the clicked button's `id` as the target layout name.

```javascript
function autoFitScene() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  let dynamicScale = 1;
```
*   **Line Explanation:** Defines the viewport auto-scaling function. It reads the window's current pixel dimensions (`w` and `h`), and establishes a default base scale value of `1`.

```javascript
  if (h > w) {
    dynamicScale = w / 2600;
  } else {
    dynamicScale = Math.min(w / 3000, h / 1200);
  }
```
*   **Line Explanation:** Responsive auto-scaling logic:
    *   If the window height is greater than the width (`h > w` - portrait orientation, typical of mobile devices and TikTok videos), it scales the scene down relative to the width to prevent cards from clipping off the sides.
    *   If the window is in landscape orientation (desktop screen), it sets the scale to the minimum required relative scale to fit both height and width.

```javascript
  dynamicScale = Math.max(0.3, Math.min(dynamicScale, 1));
  
  gsap.set(sceneContent, { scale: dynamicScale });
}
```
*   **Line Explanation:** Clamps the scale value so it never drops below `0.3` (preventing it from becoming too small) and never exceeds `1.0` (preventing it from becoming too large). It then uses GSAP to apply this dynamic scaling directly to the parent `#scene-content` element.

```javascript
window.addEventListener('resize', autoFitScene);
autoFitScene();
```
*   **Line Explanation:** Listens for window resizing to run the scaling function, then runs `autoFitScene()` immediately on load to set the initial scale.

```javascript
let isDown = false, sX = 0, sY = 0, rotX = 0, rotY = 0;
```
*   **Line Explanation:** Instantiates variables to track dragging states and rotations:
    *   `isDown`: Trackball click active flag.
    *   `sX`, `sY`: Stores the coordinates of the mouse cursor or touch point when dragging begins.
    *   `rotX`, `rotY`: Keeps track of the cumulative rotation values on the X and Y axes.

```javascript
window.addEventListener('pointerdown', (e) => { 
  isDown = true; 
  sX = e.clientX; 
  sY = e.clientY; 
});
```
*   **Line Explanation:** Listens for mouse or touch presses down. It sets `isDown` to true to indicate dragging has started and records the initial client coordinate positions.

```javascript
window.addEventListener('pointerup', () => { 
  isDown = false; 
});
```
*   **Line Explanation:** Resets `isDown` to `false` when the user releases their click/touch, stopping the scene rotation.

```javascript
window.addEventListener('pointermove', (e) => {
  if (!isDown) return;
  const dx = e.clientX - sX;
  const dy = e.clientY - sY;
  sX = e.clientX; 
  sY = e.clientY;
```
*   **Line Explanation:** Trackball interaction calculation:
    *   If the user isn't clicking/dragging (`isDown` is false), the function exits.
    *   Computes the delta change (`dx`, `dy`) between the current drag position and the previous cursor update.
    *   Updates the starting coordinates `sX` and `sY` with the new cursor position to prepare for the next frame calculation.

```javascript
  rotY += dx * 0.15;
  rotX -= dy * 0.15;
```
*   **Line Explanation:** Updates rotation values based on drag distance. Dragging horizontally (`dx`) rotates the scene around the Y-axis (`rotY`), while dragging vertically (`dy`) rotates the scene around the X-axis (`rotX`). `0.15` acts as a sensitivity multiplier to keep the rotation smooth and controllable.

```javascript
  rotX = Math.max(-70, Math.min(70, rotX));
```
*   **Line Explanation:** Clamps vertical rotation (`rotX`) between `-70` and `70` degrees to prevent the 3D scene from flipping upside down, keeping the visual presentation upright.

```javascript
  gsap.to(sceneContent, { 
    rotationY: rotY, 
    rotationX: rotX, 
    duration: 0.6, 
    ease: "power2.out",
    force3D: true 
  });
});
```
*   **Line Explanation:** Smoothly animates the entire 3D wrapper (`sceneContent`) to the target rotation values. Using a duration of `0.6` with a `power2.out` easing curve creates a smooth momentum effect, so the scene gently glides to a stop after dragging.

---

# 📐 Mathematical Layout Breakdown

### 1. Sphere Layout (Spherical Fibonacci Grid)
To arrange elements in a sphere without clustering them at the poles, we use a Fibonacci spiral distribution:
$$\phi_i = \arccos\left(-1 + \frac{2 \cdot i}{N}\right)$$
$$\theta_i = \sqrt{N \cdot \pi} \cdot \phi_i$$

Where:
*   $i$ is the index of the element.
*   $N$ is the total number of elements ($118$).
*   $\phi_i$ represents the polar angle (latitude), ranging from $0$ to $\pi$.
*   $\theta_i$ represents the azimuthal angle (longitude).

We convert these spherical angles into Cartesian $X, Y, Z$ coordinates using:
$$X = R \cdot \cos(\theta) \cdot \sin(\phi)$$
$$Y = R \cdot \sin(\theta) \cdot \sin(\phi)$$
$$Z = R \cdot \cos(\phi)$$

### 2. Helix (Spiral Cylinder)
For the helix structure, elements are placed on a cylindrical spiral path where the angle scales with the index and the height changes linearly:
$$\theta_i = i \cdot 0.25 + \pi$$
$$X_i = R_{helix} \cdot \cos(\theta_i)$$
$$Y_i = -(i \cdot \text{separation}) + \text{offset}$$
$$Z_i = R_{helix} \cdot \sin(\theta_i)$$

This creates a spiral staircase effect where elements spiral around the central axis.

---

## 🛠️ How to Run Locally

1. Clone or download these three files (`index.html`, `style.css`, and `script.js`) and place them in the same directory.
2. Open `index.html` directly in any web browser, or run a local server (like VS Code's **Live Server** extension) to view and interact with the 3D scene.
