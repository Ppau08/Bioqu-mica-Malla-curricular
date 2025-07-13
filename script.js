const materias = [
  {
    nombre: "Química General",
    año: 1,
    cuatrimestre: 1,
    correlativas: [],
  },
  {
    nombre: "Álgebra y Geometría Analítica",
    año: 1,
    cuatrimestre: 1,
    correlativas: [],
  },
  {
    nombre: "Cálculo Diferencial e Integral",
    año: 1,
    cuatrimestre: 2,
    correlativas: [],
  },
  {
    nombre: "Biología General y Celular",
    año: 1,
    cuatrimestre: 2,
    correlativas: [],
  },
  {
    nombre: "Química Inorgánica",
    año: 1,
    cuatrimestre: 2,
    correlativas: ["Química General"],
  }

const estados = {}; // Guardamos estado de materias

function toggleEstado(materia) {
  const estadoActual = estados[materia.nombre];
  if (!estadoActual) {
    estados[materia.nombre] = "regularizada";
  } else if (estadoActual === "regularizada") {
    estados[materia.nombre] = "aprobada";
  } else {
    delete estados[materia.nombre];
  }
  renderMalla();
}

function renderMalla() {
  const contenedor = document.getElementById("malla-grid");
  contenedor.innerHTML = "";

  const maxAño = Math.max(...materias.map(m => m.año));

  for (let año = 1; año <= maxAño; año++) {
    const divAño = document.createElement("div");
    divAño.className = "columna-año";
    divAño.innerHTML = `<h2>Año ${año}</h2>`;

    for (let cuatri = 1; cuatri <= 2; cuatri++) {
      const divCuatri = document.createElement("div");
      divCuatri.className = "cuatrimestre";
      divCuatri.innerHTML = `<h3>${cuatri}º Cuatrimestre</h3>`;

      materias
        .filter(m => m.año === año && m.cuatrimestre === cuatri)
        .forEach(m => {
          const divMateria = document.createElement("div");
          divMateria.className = `materia ${m.categoria}`;
          divMateria.textContent = m.nombre;
          divMateria.dataset.nombre = m.nombre;

          if (estados[m.nombre] === "regularizada") {
            divMateria.classList.add("regularizada");
          }
          if (estados[m.nombre] === "aprobada") {
            divMateria.classList.add("aprobada");
          }

          divMateria.onclick = () => toggleEstado(m);
          divCuatri.appendChild(divMateria);
        });

      divAño.appendChild(divCuatri);
    }

    contenedor.appendChild(divAño);
  }
}

renderMalla();
