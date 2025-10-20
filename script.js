// WEBGL BOOTSTRAP TWGL.js
let glcanvas;
let gl;
let programInfo;
let bufferInfo;
let isRendering = false;

// Initialize WebGL resources
function initWebGL() {
  // Get canvas element
  glcanvas = document.getElementById("canvas");
  if (!glcanvas) {
    console.error("Canvas element not found");
    return false;
  }

  // Get WebGL context
  gl = glcanvas.getContext("webgl2");
  if (!gl) {
    console.error("WebGL2 not supported on this device/browser");
    alert("WebGL2 not supported on this device/browser.");
    return false;
  }

  try {
    // Create shader program
    programInfo = twgl.createProgramInfo(gl, ["vertexShader", "fragmentShader"]);
    
    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
    };
    
    bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
    console.log("WebGL initialized successfully");
    return true;
  } catch (error) {
    console.error("Failed to initialize WebGL:", error);
    return false;
  }
}

// Mouse interaction variables (removed for original shader)

/*================================
=     Responsive Resize Setup    =
================================*/

// Dynamically adjust resolution for mobile/desktop
function resizeCanvas(gl) {
  let scale = 1.0;

  // Reduce internal resolution on smaller screens for better FPS
  if (window.innerWidth < 768) {
    scale = 0.6; // 60% of full res on mobile
  }

  const dpr = window.devicePixelRatio * scale;
  const displayWidth = Math.floor(gl.canvas.clientWidth * dpr);
  const displayHeight = Math.floor(gl.canvas.clientHeight * dpr);

  if (gl.canvas.width !== displayWidth || gl.canvas.height !== displayHeight) {
    gl.canvas.width = displayWidth;
    gl.canvas.height = displayHeight;
  }
}

// Run resize on window resize
window.addEventListener("resize", () => resizeCanvas(gl));

/*================================
=        Mouse Interaction       =
================================*/

// Mouse interaction removed to keep original shader

/*================================
=          Render Loop           =
================================*/
const render = (time) => {
  // Check if WebGL context is still valid
  if (!gl || gl.isContextLost()) {
    console.warn("WebGL context lost, attempting to restore...");
    restoreWebGL();
    return;
  }

  try {
    resizeCanvas(gl);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const uniforms = {
      u_time: time * 0.001,
      u_resolution: [gl.canvas.width, gl.canvas.height],
    };

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);

    isRendering = true;
    requestAnimationFrame(render);
  } catch (error) {
    console.error("Render error:", error);
    isRendering = false;
    // Try to restore after a short delay
    setTimeout(() => {
      if (!isRendering) {
        restoreWebGL();
      }
    }, 1000);
  }
};

// Restore WebGL context
function restoreWebGL() {
  console.log("Attempting to restore WebGL context...");
  
  // Recreate WebGL context
  gl = glcanvas.getContext("webgl2");
  
  if (!gl) {
    console.error("Failed to restore WebGL context");
    return;
  }
  
  // Reinitialize WebGL resources
  if (initWebGL()) {
    console.log("WebGL context restored successfully");
    isRendering = false;
    requestAnimationFrame(render);
  } else {
    console.error("Failed to reinitialize WebGL resources");
  }
}

/*================================
=        Portfolio Features      =
================================*/

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe project cards and other elements
  const animatedElements = document.querySelectorAll('.project-card, .contact-content');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Liquid glass hover effects - Subtle Balatro-style
function initLiquidGlassEffects() {
  const liquidGlass = document.querySelector('.liquid-glass');
  
  // Skip on mobile/touch devices
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return;
  }
  
  if (liquidGlass) {
    liquidGlass.addEventListener('mousemove', (e) => {
      const rect = liquidGlass.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Very subtle rotation based on mouse position
      const rotateX = (y - centerY) / 30; // Reduced from 10 to 30 for subtlety
      const rotateY = (centerX - x) / 30; // Reduced from 10 to 30 for subtlety
      
      liquidGlass.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    liquidGlass.addEventListener('mouseleave', () => {
      liquidGlass.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
    });
  }
}

// Parallax effect for hero section - DISABLED
function initParallaxEffect() {
  // Parallax effects removed - hero section is now static
  return;
}

/*================================
=        Context Loss Handling   =
================================*/

// Handle WebGL context loss events
function setupContextLossHandlers() {
  if (glcanvas) {
    glcanvas.addEventListener('webglcontextlost', (event) => {
      console.warn("WebGL context lost");
      event.preventDefault();
      isRendering = false;
    });

    glcanvas.addEventListener('webglcontextrestored', (event) => {
      console.log("WebGL context restored");
      restoreWebGL();
    });
  }
}

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    isRendering = false;
  } else if (!isRendering) {
    // Restart rendering when tab becomes visible
    requestAnimationFrame(render);
  }
});

// Handle page focus/blur
window.addEventListener('focus', () => {
  if (!isRendering) {
    requestAnimationFrame(render);
  }
});

window.addEventListener('blur', () => {
  // Keep rendering but reduce priority
});

/*================================
=           DOM READY            =
================================*/
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing...");
  
  // Check if TWGL is loaded
  if (typeof twgl === 'undefined') {
    console.error("TWGL library not loaded!");
    return;
  }
  
  // Initialize WebGL first
  if (initWebGL()) {
    console.log("WebGL initialized, starting render loop");
    setupContextLossHandlers();
    resizeCanvas(gl);
    requestAnimationFrame(render);
  } else {
    console.error("Failed to initialize WebGL");
  }
  
  // Initialize portfolio features
  initSmoothScrolling();
  initScrollAnimations();
  initLiquidGlassEffects();
  initParallaxEffect();
  
  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
