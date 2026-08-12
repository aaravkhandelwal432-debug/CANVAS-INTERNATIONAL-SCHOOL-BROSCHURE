# Canvas International Pre School - Interactive 3D Brochure Website

Welcome to the official repository for the **Canvas International Pre School** interactive brochure website, tailored for the Dausa, Rajasthan campuses.

✨ **[Click Here for the Live Deployment!](https://aaravkhandelwal432-debug.github.io/CANVAS-INTERNATIONAL-SCHOOL-BROSCHURE/)** ✨

---

## 🎨 Theme & Aesthetics
The website is styled around Canvas's signature kid-friendly, playful branding:
- **Primary Palette:** A cheerful combination of bright pink (`#FF4B91`) and golden yellow (`#FFCD38`) with soft pastel gradients.
- **Typography:** Uses Google Fonts' **Fredoka** for playful rounded headings and **Outfit** for clean body readability.
- **Components:** Soft glassmorphism panel styles (`backdrop-filter`) and smooth transitions.

---

## 🚀 Key Features

### 1. Interactive 3D Background (Three.js)
- A dynamic, interactive 3D background featuring floating alphabet blocks spelling **C-A-N-V-A-S** and **P-L-A-Y**.
- The blocks rotate gently and tilt interactively to follow your cursor moves (mouse-parallax).

### 2. 3D Flipping Brochure Booklet
- A realistic 3D paper booklet using **CSS 3D Transforms** (`preserve-3d`, `rotateY`).
- Flipping booklet covers:
  - **Spread 0:** Cover Page ("Welcome to Canvas Dausa").
  - **Spread 1:** About Us & Program list (Playgroup, Nursery, LKG, UKG).
  - **Spread 2:** Campus Photo Gallery & Google Reviews (5.0 ★ rating).
  - **Spread 3:** Contact info & double-branch inquiry form.

### 3. Dual Campuses Support
Features info and maps navigation links for both Dausa campuses:
- **Raja Colony Campus:** Located behind Durga Mandir.
- **Teacher's Colony Campus:** Located at Gupteshwar Road (Tudiyana).
- Includes a drop-down campus selector on the admission inquiry form.

### 4. Portability & Universal Device Compatibility
Designed to work seamlessly across different form-factors:
- 📱 **Mobile & Portrait Tablets:** Collapses the 3D book into a vertical stream of cards with oversized touch targets. Supports touch swipes (Left/Right) for landscape tablets.
- 💻 **Laptops:** Automatically scales the 3D wrapper dimensions using resize calculation triggers to prevent horizontal page overflow.
- 📺 **Smart TVs:** Full support for remote control D-pad arrows. Keyboard Left/Right keys flip pages, and base typography auto-scales on large viewports (1080p/4K).

---

## 🛠️ Technology Stack
- **Structure:** Semantic HTML5
- **Styling:** Custom Vanilla CSS3 (with View-Timeline Scroll-Driven Animations & `@supports` checks)
- **Logic:** Vanilla JavaScript (ES6+)
- **3D Engine:** Three.js (via CDN)

---

## 💻 Local Setup & Development
No build pipeline or npm installation is required. To run the site locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/aaravkhandelwal432-debug/CANVAS-INTERNATIONAL-SCHOOL-BROSCHURE.git
   cd CANVAS-INTERNATIONAL-SCHOOL-BROSCHURE
   ```

2. Spin up a lightweight local server:
   - **Python:**
     ```bash
     python3 -m http.server 8080
     ```
   - **Node.js (http-server):**
     ```bash
     npx http-server -p 8080
     ```

3. Open your browser and navigate to:
   👉 **`http://localhost:8080`**
