async function initMalla() {
  const data = await fetch('./data/data_CARR.json').then(res => res.json());
  const colors = await fetch('./data/colors_CARR.json').then(res => res.json());

  const header = document.querySelector('.malla-header');
  const body = document.querySelector('.malla-body');

  const semestres = Object.keys(data).sort();

  // Cabeceras
  semestres.forEach(s => {
    const col = document.createElement('div');
    col.className = 'semestre-col';
    col.innerText = `Sem ${s.slice(1)}`;
    header.appendChild(col);
  });

  // Ramos
  semestres.forEach(s => {
    data[s].forEach(r => {
      const [nombre, sigla, crUSM, crSCT, cat, prereq, paridad] = r;
      const div = document.createElement('div');
      div.className = `ramo-cell cat-${cat}`;
      div.dataset.prereq = prereq.length > 0 ? prereq.join(',') : '';
      div.innerHTML = `<strong>${sigla}</strong>${nombre}`;
      body.appendChild(div);
    });
  });

  // Filtros
  document.querySelectorAll('button[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      document.querySelectorAll('.ramo-cell').forEach(c => {
        if (f === 'all') c.style.display = 'block';
        else if (f === 'prereq') c.style.display = c.dataset.prereq ? 'block' : 'none';
        else if (f === 'by-cat') c.style.display = c.classList.contains('cat-LAB') ? 'block' : 'none'; // cambiar por lógica deseada
      });
    });
  });
}

initMalla();
