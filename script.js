// WEBGL BOOTSTRAP TWGL.js
const glcanvas = document.getElementById("canvas");
const gl = glcanvas.getContext("webgl2");

if (!gl) {
  alert("WebGL2 not supported on this device/browser.");
}

// Create shader program
const programInfo = twgl.createProgramInfo(gl, ["vertexShader", "fragmentShader"]);

const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
};

const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

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
=          Render Loop           =
================================*/
const render = (time) => {
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

  requestAnimationFrame(render);
};

/*================================
=           DOM READY            =
================================*/
window.addEventListener("DOMContentLoaded", () => {
  resizeCanvas(gl);
  requestAnimationFrame(render);
});
