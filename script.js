/* ==========================================================================
   Suriya Raja — Living Marble 3D Portfolio JavaScript
   Enhanced High-Visibility WebGL Marble Shader | GSAP Split Text Entrance
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. THREE.JS LIVING MARBLE 3D CANVAS ---
  initLivingMarbleScene();

  // --- 2. GSAP ENTRANCE TIMELINE ---
  initGSAPAnimations();

  // --- 3. UI & SCROLL INTERACTION ---
  initNavigation();
  initProjectFiltersAndModal();
  initScrollObserver();
  initContactForm();
});

/* ==========================================================================
   1. Three.js Living Marble Stone WebGL Scene (High-Visibility Metallic Marble)
   ========================================================================== */
function initLivingMarbleScene() {
  const container = document.getElementById('marble-canvas');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  container.appendChild(renderer.domElement);

  // Living Marble Sphere Geometry
  const geometry = new THREE.IcosahedronGeometry(1.75, 64);
  const positionAttribute = geometry.attributes.position;
  
  // Cache initial vertex positions
  const originalPositions = new Float32Array(positionAttribute.array.length);
  for (let i = 0; i < positionAttribute.array.length; i++) {
    originalPositions[i] = positionAttribute.array[i];
  }

  // High-Visibility Marble Material: Polished Slate/Obsidian Marble with Silver-Cyan Metallic Sheen
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x1e2638),        // Lighter slate-blue marble color
    emissive: new THREE.Color(0x0a101d),     // Subtle inner radiance
    roughness: 0.12,                         // High gloss
    metalness: 0.65,                         // Metallic reflections
    clearcoat: 1.0,                          // Deep lacquer finish
    clearcoatRoughness: 0.04,
    reflectivity: 1.0,
    flatShading: false
  });

  const marbleMesh = new THREE.Mesh(geometry, material);
  scene.add(marbleMesh);

  // Wireframe Accent Mesh Layer (adds glowing marble vein grid lines over the stone)
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x38bdf8),
    wireframe: true,
    transparent: true,
    opacity: 0.08
  });
  const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
  marbleMesh.add(wireframeMesh);

  // Lighting Rig — Bright, multi-directional colored spot & point lights to create high-visibility specular highlights
  const ambientLight = new THREE.AmbientLight(0x334155, 1.8);
  scene.add(ambientLight);

  // Primary White Key Light
  const mainLight = new THREE.SpotLight(0xffffff, 4.5);
  mainLight.position.set(6, 8, 8);
  mainLight.angle = 0.5;
  mainLight.penumbra = 0.8;
  scene.add(mainLight);

  // Vibrant Electric Cyan Rim Light
  const lightCyan = new THREE.PointLight(0x00f0ff, 6.0, 25);
  lightCyan.position.set(-6, 4, 4);
  scene.add(lightCyan);

  // Brilliant Silver Specular Light
  const lightSilver = new THREE.PointLight(0xffffff, 4.5, 25);
  lightSilver.position.set(6, -4, 4);
  scene.add(lightSilver);

  // Royal Violet Edge Highlight
  const lightViolet = new THREE.PointLight(0xa855f7, 4.0, 25);
  lightViolet.position.set(0, 6, -5);
  scene.add(lightViolet);

  // Procedural 3D Noise function for organic marble wave distortion
  function noise3D(x, y, z, time) {
    const freq = 2.0;
    return Math.sin(x * freq + time) * 
           Math.cos(y * freq + time * 0.9) * 
           Math.sin(z * freq + time * 1.3) * 0.35;
  }

  // Mouse Parallax tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 1.0;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 1.0;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    const time = elapsedTime * 1.3;

    // Smooth Mouse Lerp
    targetX += (mouseX - targetX) * 0.07;
    targetY += (mouseY - targetY) * 0.07;

    // Mesh rotation
    marbleMesh.rotation.x = elapsedTime * 0.12 + targetY;
    marbleMesh.rotation.y = elapsedTime * 0.16 + targetX;

    // Vertex displacement logic (Living Stone Ripple)
    const positions = positionAttribute.array;
    for (let i = 0; i < positions.length; i += 3) {
      const ox = originalPositions[i];
      const oy = originalPositions[i + 1];
      const oz = originalPositions[i + 2];

      const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const nx = ox / len;
      const ny = oy / len;
      const nz = oz / len;

      const displacement = noise3D(nx, ny, nz, time);
      const newRadius = 1.75 + displacement;

      positions[i] = nx * newRadius;
      positions[i + 1] = ny * newRadius;
      positions[i + 2] = nz * newRadius;
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();

    // Orbiting light sources for dynamic specular reflections
    lightCyan.position.x = Math.sin(elapsedTime * 0.7) * 6;
    lightCyan.position.z = Math.cos(elapsedTime * 0.7) * 6;

    lightSilver.position.x = Math.cos(elapsedTime * 0.5) * 6;
    lightSilver.position.y = Math.sin(elapsedTime * 0.5) * 6;

    renderer.render(scene, camera);
  }

  animate();

  // Window Resize Handler
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth || window.innerWidth;
    const newHeight = container.clientHeight || window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

/* ==========================================================================
   2. GSAP Entrance Timeline
   ========================================================================== */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline();

  // 1. Reveal Horizontal Grid Lines
  tl.to('.grid-line', {
    scaleX: 1,
    duration: 1.4,
    ease: 'expo.inOut',
    stagger: 0.2
  });

  // 2. Reveal Hero Characters ("SURIYA" and "RAJA")
  tl.to('.hero-char', {
    y: 0,
    opacity: 1,
    duration: 1.1,
    stagger: 0.04,
    ease: 'power3.out'
  }, '-=0.9');

  // 3. Reveal Details & Nav Fade-up
  tl.fromTo('.fade-up', 
    { y: 25, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.12 },
    '-=0.6'
  );
}

/* ==========================================================================
   3. Navigation Controls
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Navbar Scroll Backdrop Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Drawer Toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 220;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Project Filtering and P-T-R-L Preview Modal
   ========================================================================== */
function initProjectFiltersAndModal() {
  // Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  // Modal Setup
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  if (!modalBackdrop) return;

  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalProblem = document.getElementById('modal-problem');
  const modalTechDesc = document.getElementById('modal-technology');
  const modalResult = document.getElementById('modal-result');
  const modalLearning = document.getElementById('modal-learning');
  const modalTechTags = document.getElementById('modal-tech');
  const modalGithub = document.getElementById('modal-github');
  const modalDemo = document.getElementById('modal-demo');

  // Attach Click Listener to Project Cards & Detail Buttons
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Allow external github link clicks to open normally without modal
      if (e.target.closest('a[target="_blank"]')) return;

      const title = card.getAttribute('data-title');
      const img = card.querySelector('img')?.src;
      const problem = card.getAttribute('data-problem') || 'Solving workflow bottlenecks.';
      const techDesc = card.getAttribute('data-technology') || 'Built with modern languages and frameworks.';
      const result = card.getAttribute('data-result') || 'Achieved high accuracy and efficient system operation.';
      const learning = card.getAttribute('data-learning') || 'Deepened understanding of software design principles.';
      const tech = card.getAttribute('data-tech')?.split(',') || [];
      const github = card.getAttribute('data-github') || 'https://github.com/suriya-raja';
      const demo = card.getAttribute('data-demo') || '#';

      if (modalTitle) modalTitle.textContent = title;
      if (modalImg) modalImg.src = img;
      if (modalProblem) modalProblem.textContent = problem;
      if (modalTechDesc) modalTechDesc.textContent = techDesc;
      if (modalResult) modalResult.textContent = result;
      if (modalLearning) modalLearning.textContent = learning;

      if (modalTechTags) {
        modalTechTags.innerHTML = tech.map(t => `<span class="skill-tag">${t.trim()}</span>`).join('');
      }

      if (modalGithub) modalGithub.href = github;
      if (modalDemo) modalDemo.href = demo;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   5. Scroll Observer for Section Animations
   ========================================================================== */
function initScrollObserver() {
  const elements = document.querySelectorAll('.animate-up');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. Contact Form Submission & Toast
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = 'Transmitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast('Transmission received! Suriya will respond promptly.');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1200);
  });
}

function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <span style="color: #38bdf8; font-weight: 700;">✓</span>
    <span>${message}</span>
  `;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.75rem',
    borderRadius: '12px',
    fontFamily: "'Manrope', sans-serif",
    fontSize: '0.9rem',
    color: '#ffffff',
    background: 'rgba(15, 15, 20, 0.95)',
    border: '1px solid rgba(56, 189, 248, 0.3)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    zIndex: '10000',
    transform: 'translateY(20px)',
    opacity: '0',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
