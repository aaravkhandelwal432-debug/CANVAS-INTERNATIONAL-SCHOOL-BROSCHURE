// --- PAGE FLIP LOGIC ---

let currentSpread = 0; // Spreads: 0 (Cover), 1 (About/Programs), 2 (Gallery/Reviews), 3 (Contact)
const pages = [
  document.getElementById('page-1'),
  document.getElementById('page-2'),
  document.getElementById('page-3')
];

const totalSpreads = 4;
const currentPageNumSpan = document.getElementById('current-page-num');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const navBtns = document.querySelectorAll('.nav-btn');

// Update booklet state visually
function updateBook() {
  // Clamp values
  if (currentSpread < 0) currentSpread = 0;
  if (currentSpread >= totalSpreads) currentSpread = totalSpreads - 1;

  // Apply flips based on current spread
  pages.forEach((page, index) => {
    if (index < currentSpread) {
      page.classList.add('flipped');
    } else {
      page.classList.remove('flipped');
    }
  });

  // Manage Z-Indices during flips to prevent overlapping glitch
  if (currentSpread === 0) {
    pages[0].style.zIndex = "6";
    pages[1].style.zIndex = "5";
    pages[2].style.zIndex = "4";
  } else if (currentSpread === 1) {
    pages[0].style.zIndex = "6";
    pages[1].style.zIndex = "5";
    pages[2].style.zIndex = "4";
  } else if (currentSpread === 2) {
    pages[0].style.zIndex = "4";
    pages[1].style.zIndex = "6";
    pages[2].style.zIndex = "5";
  } else if (currentSpread === 3) {
    pages[0].style.zIndex = "4";
    pages[1].style.zIndex = "5";
    pages[2].style.zIndex = "6";
  }

  // Update Page Number Display in footer
  // Spreads map to page indices: 
  // Spread 0: Page 1 (Cover)
  // Spread 1: Pages 2 & 3
  // Spread 2: Pages 4 & 5
  // Spread 3: Page 6 (Contact Cover)
  if (currentSpread === 0) {
    currentPageNumSpan.textContent = "1";
  } else if (currentSpread === 1) {
    currentPageNumSpan.textContent = "2-3";
  } else if (currentSpread === 2) {
    currentPageNumSpan.textContent = "4-5";
  } else {
    currentPageNumSpan.textContent = "6";
  }

  // Enable/Disable controls
  prevBtn.disabled = (currentSpread === 0);
  nextBtn.disabled = (currentSpread === totalSpreads - 1);

  // Update Nav bar buttons active states
  navBtns.forEach((btn, index) => {
    btn.classList.remove('active');
  });

  // Map spread to header buttons
  // Buttons: 0 (Cover), 1 (About Us), 2 (Programs), 3 (Gallery), 4 (Reviews), 5 (Contact)
  if (currentSpread === 0) {
    navBtns[0].classList.add('active');
  } else if (currentSpread === 1) {
    navBtns[1].classList.add('active'); // Highlight About Us by default on spread 1
  } else if (currentSpread === 2) {
    navBtns[3].classList.add('active'); // Highlight Gallery by default on spread 2
  } else {
    navBtns[5].classList.add('active'); // Highlight Contact on spread 3
  }
}

// Controller Button click events
prevBtn.addEventListener('click', () => {
  if (currentSpread > 0) {
    currentSpread--;
    updateBook();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSpread < totalSpreads - 1) {
    currentSpread++;
    updateBook();
  }
});

// Inner hints / page clicks flipping
document.querySelector('.flip-btn').addEventListener('click', () => {
  currentSpread = 1;
  updateBook();
});

document.querySelectorAll('.next-hint').forEach((el, index) => {
  el.addEventListener('click', () => {
    currentSpread++;
    updateBook();
  });
});

document.querySelectorAll('.prev-hint').forEach((el, index) => {
  el.addEventListener('click', () => {
    currentSpread--;
    updateBook();
  });
});

// Nav menu clicks
navBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const pageTarget = parseInt(e.currentTarget.getAttribute('data-page'));
    
    // Map individual pages to spreads
    if (pageTarget === 0) currentSpread = 0; // Cover
    else if (pageTarget === 1 || pageTarget === 2) currentSpread = 1; // About or Programs
    else if (pageTarget === 3 || pageTarget === 4) currentSpread = 2; // Gallery or Reviews
    else currentSpread = 3; // Contact
    
    updateBook();
    
    // Highlight exact clicked button
    navBtns.forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
  });
});

// Initialize book state
updateBook();

// Dynamic scale controller for seamless laptop/tablet display
function handleScaling() {
  const wrapper = document.querySelector('.brochure-3d-wrapper');
  if (!wrapper) return;
  const width = window.innerWidth;
  if (width > 960) {
    // Scale brochure to fit width nicely without overflow
    const scale = Math.min((width - 40) / 960, 1);
    wrapper.style.transform = `scale(${scale})`;
  } else {
    // Mobile flattens it vertically, scale not required
    wrapper.style.transform = '';
  }
}
window.addEventListener('resize', handleScaling);
window.addEventListener('load', handleScaling);
handleScaling();

// TV remote / Keyboard focus arrow navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    if (currentSpread > 0) {
      currentSpread--;
      updateBook();
    }
  } else if (e.key === 'ArrowRight') {
    if (currentSpread < totalSpreads - 1) {
      currentSpread++;
      updateBook();
    }
  }
});

// Touch swipe gestures for tactile phone/tablet experience
let touchStartX = 0;
let touchEndX = 0;
const bookElement = document.getElementById('brochure-book');

bookElement.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

bookElement.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const swipeDistance = touchStartX - touchEndX;
  const swipeThreshold = 60; // minimum swipe pixels
  
  // Make sure we are in desktop layout (book is block display)
  if (window.innerWidth > 960) {
    if (swipeDistance > swipeThreshold) {
      // Swiped left -> next page
      if (currentSpread < totalSpreads - 1) {
        currentSpread++;
        updateBook();
      }
    } else if (swipeDistance < -swipeThreshold) {
      // Swiped right -> prev page
      if (currentSpread > 0) {
        currentSpread--;
        updateBook();
      }
    }
  }
}, { passive: true });


// --- FLOATING BACKGROUND BUBBLES ---

function createBubbles() {
  const container = document.getElementById('bubbles');
  const colors = ['#FFCD38', '#FF4B91', '#8B5CF6', '#FFE699', '#FFECF4'];
  const count = 15;
  
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    const size = Math.random() * 60 + 20; // 20px to 80px
    const left = Math.random() * 100; // 0% to 100%
    const delay = Math.random() * 10;
    const duration = Math.random() * 10 + 10; // 10s to 20s
    
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.animationDuration = `${duration}s`;
    
    // Randomize background color accents slightly
    const color = colors[Math.floor(Math.random() * colors.length)];
    bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.1) 60%, ${color}22 100%)`;
    
    container.appendChild(bubble);
  }
}
createBubbles();


// --- THREE.JS INTERACTIVE 3D TOY BLOCKS SCENE ---

let scene, camera, renderer;
const blocks = [];
const letters = ['C', 'A', 'N', 'V', 'A', 'S', 'P', 'L', 'A', 'Y'];
const blockColors = [
  0xFFCD38, // Yellow
  0xFF4B91, // Pink
  0x8B5CF6, // Purple
  0xFF9F43, // Orange
  0x10ADFF  // Teal
];

// Helper to draw letter texture on canvas
function createLetterTexture(letter, bgColorString, textColorString) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  // Fill solid canvas background
  ctx.fillStyle = bgColorString;
  ctx.fillRect(0, 0, 256, 256);
  
  // Outer frame border
  ctx.strokeStyle = textColorString;
  ctx.lineWidth = 16;
  ctx.strokeRect(16, 16, 224, 224);
  
  // Inner frame border
  ctx.strokeStyle = textColorString;
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, 192, 192);
  
  // Draw Letter text
  ctx.fillStyle = textColorString;
  ctx.font = 'bold 140px "Fredoka", "Helvetica Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 128, 128);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function initThree() {
  const canvas = document.getElementById('three-bg');
  
  scene = new THREE.Scene();
  
  // Camera Setup
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 22;
  camera.position.y = 2;
  
  // Renderer Setup
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Lights Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xffecf4, 0.4);
  fillLight.position.set(-5, -5, -2);
  scene.add(fillLight);

  // Generate 3D Alphabet blocks
  const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  
  // Canvas Colors
  const pastelColors = ['#FFCD38', '#FF4B91', '#8B5CF6', '#FF9F43', '#10ADFF'];
  
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const bgColor = pastelColors[i % pastelColors.length];
    
    // Create materials for each face of the block
    const materials = [];
    const mainTexture = createLetterTexture(letter, bgColor, '#FFFFFF');
    const faceTexture = createLetterTexture('★', bgColor, '#FFFFFF'); // Decorative star faces
    
    // 6 faces: Right, Left, Top, Bottom, Front, Back
    for (let f = 0; f < 6; f++) {
      // Front and back display the actual letter, others show a star
      const texture = (f === 4 || f === 5) ? mainTexture : faceTexture;
      materials.push(new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.3,
        metalness: 0.1
      }));
    }
    
    const block = new THREE.Mesh(boxGeometry, materials);
    
    // Distribute blocks randomly across the canvas
    block.position.x = (Math.random() - 0.5) * 25;
    block.position.y = (Math.random() - 0.5) * 12 + 1;
    block.position.z = (Math.random() - 0.5) * 10 - 2;
    
    // Give each block a unique rotation speed and floating speed offset
    block.rotation.x = Math.random() * Math.PI;
    block.rotation.y = Math.random() * Math.PI;
    
    block.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.008,
      rotSpeedY: (Math.random() - 0.5) * 0.008,
      rotSpeedZ: (Math.random() - 0.5) * 0.008,
      floatSpeed: Math.random() * 0.01 + 0.005,
      floatOffset: Math.random() * Math.PI * 2,
      baseY: block.position.y,
      baseX: block.position.x,
      targetRotX: 0,
      targetRotY: 0
    };
    
    scene.add(block);
    blocks.push(block);
  }
  
  // Track cursor coordinates
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onWindowResize);
  
  // Render loop
  animate();
}

let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

function onMouseMove(event) {
  // Normalize coordinates: -1 to +1
  targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
  targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Smoothly lerp mouse movements for nice drag/parallax
  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;
  
  const time = Date.now() * 0.001;
  
  blocks.forEach(block => {
    // 1. Slow rotation
    block.rotation.x += block.userData.rotSpeedX;
    block.rotation.y += block.userData.rotSpeedY;
    block.rotation.z += block.userData.rotSpeedZ;
    
    // 2. Slow floating wave (using Sine wave)
    block.position.y = block.userData.baseY + Math.sin(time * 2 + block.userData.floatOffset) * 0.5;
    
    // 3. Mouse Parallax - push blocks slightly away or rotate them facing the cursor
    block.position.x = block.userData.baseX + (mouseX * 2.5) * (1 + block.position.z * 0.05);
    
    // Add extra rotation tilt matching cursor
    block.rotation.x += (mouseY * 0.002);
    block.rotation.y += (mouseX * 0.002);
  });
  
  // Rotate whole camera slightly according to mouse
  camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
  camera.position.y += (-mouseY * 1.5 + 2 - camera.position.y) * 0.03;
  camera.lookAt(0, 1, -2);
  
  renderer.render(scene, camera);
}

// Initialize Three scene on load
window.addEventListener('load', () => {
  initThree();
});


// --- FORM INTERACTION ---

function handleInquirySubmit(event) {
  event.preventDefault();
  
  // Reset Form
  document.getElementById('inquiry-form').reset();
  
  // Trigger success modal
  const modal = document.getElementById('success-modal');
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('success-modal');
  modal.classList.remove('active');
}


// --- GALLERY LIGHTBOX ---

function openLightbox(imgSrc, title) {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  
  lightboxImg.src = imgSrc;
  lightboxTitle.textContent = title;
  lightbox.classList.add('active');
}

function closeLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  lightbox.classList.remove('active');
}


// --- SCROLL ANIMATION FALLBACK ---

// For browsers without CSS view-timeline support (e.g. Firefox)
if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
  const cards = document.querySelectorAll('.info-card');
  
  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Apply manual class to fade/slide in cards
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Set initial hidden styles and observe
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    cardObserver.observe(card);
  });
}
