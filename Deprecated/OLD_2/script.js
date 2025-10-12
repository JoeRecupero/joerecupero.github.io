let unlockedSections = new Set();

function toggleSection(id, logic) {
  const input1 = document.getElementById(`${logic.toLowerCase()}1`).checked;
  const input2 = document.getElementById(`${logic.toLowerCase()}2`).checked;

  let result = false;
  if (logic === "AND") result = input1 && input2;
  if (logic === "OR") result = input1 || input2;
  if (logic === "NAND") result = !(input1 && input2);

  const section = document.getElementById(id);
  const wire = document.getElementById(`wire-${id}`);

  if (result) {
    section.classList.remove("hidden");
    section.classList.add("highlight");
    wire.classList.add("active");
    unlockedSections.add(id);
  } else {
    section.classList.add("hidden");
    section.classList.remove("highlight");
    wire.classList.remove("active");
    unlockedSections.delete(id);
  }

  const backBtn = document.getElementById("backToGates");
if (unlockedSections.size >= 2) {
    backBtn.classList.remove("hidden");
} else {
    backBtn.classList.add("hidden");
}
}

// Make logic gates draggable inside canvas
document.querySelectorAll(".logic-gate").forEach(gate => {
  gate.onmousedown = function (e) {
    const canvas = document.getElementById("logic-canvas");
    const startX = e.clientX - gate.offsetLeft;
    const startY = e.clientY - gate.offsetTop;

    function drag(e) {
      let x = e.clientX - startX;
      let y = e.clientY - startY;

      // Constrain inside canvas
      const maxX = canvas.clientWidth - gate.offsetWidth;
      const maxY = canvas.clientHeight - gate.offsetHeight;
      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      gate.style.left = `${x}px`;
      gate.style.top = `${y}px`;
    }

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", drag);
    }, { once: true });
  };
});