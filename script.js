// --- CARGAR PROGRESO ---
function cargarProgreso() {
  const guardado = localStorage.getItem("progresoMaterias");
  if (!guardado) return;

  const estados = JSON.parse(guardado);

  Object.keys(estados).forEach(id => {
    const div = document.getElementById(id);
    if (!div) return;

    div.classList.remove("estado-1", "estado-2");

    if (estados[id] === 1) {
      div.classList.add("estado-1");
    } else if (estados[id] === 2) {
      div.classList.add("estado-2");
    }
  });
}

// --- GUARDAR PROGRESO ---
function guardarProgreso() {
  const estados = {};

  document.querySelectorAll(".materia").forEach(m => {
    if (m.classList.contains("estado-2")) {
      estados[m.id] = 2;
    } else if (m.classList.contains("estado-1")) {
      estados[m.id] = 1;
    } else {
      estados[m.id] = 0;
    }
  });

  localStorage.setItem("progresoMaterias", JSON.stringify(estados));
}

// --- CARGAR AUTOMÁTICAMENTE AL ENTRAR ---
document.addEventListener("DOMContentLoaded", () => {
  cargarProgreso();
  actualizarHabilitaciones();
});
