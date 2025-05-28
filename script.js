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

    // Show/hide back to gates button
    const backBtn = document.getElementById("backToGates");
    if (unlockedSections.size >= 2) {
        backBtn.classList.remove("hidden");
    } else {
        backBtn.classList.add("hidden");
    }
}