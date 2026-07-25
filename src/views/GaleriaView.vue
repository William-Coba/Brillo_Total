<script setup>
import { ref, computed } from 'vue'

const trabajos = [
  {
    imagen: '/imagenes/Screenshot_20251027-105902.Fotos.png',
    titulo: 'Casa — Piso Mármol',
    categoria: 'marmol',
    etiqueta: 'Antes',
    tipo: 'antes',
    descripcion: 'Piso opaco y rayado antes del proceso de pulimiento.',
  },
  {
    imagen: '/imagenes/Screenshot_20251027-110011.Fotos~2.png',
    titulo: 'Casa — Piso Mármol',
    categoria: 'marmol',
    etiqueta: 'Después',
    tipo: 'despues',
    descripcion: 'Brillo espejo y color completamente restaurado.',
  },
  {
    imagen: '/imagenes/carrusel2.png',
    titulo: 'Local Comercial — Mármol',
    categoria: 'marmol',
    etiqueta: 'Brillo',
    tipo: 'brillo',
    descripcion: 'Acabado resistente al tráfico intenso.',
  },
  {
    imagen: '/imagenes/8.jpeg',
    titulo: 'Apartamento — Mármol',
    categoria: 'marmol',
    etiqueta: 'Proceso',
    tipo: 'proceso',
    descripcion: 'Proceso de pulimiento en apartamento con desgaste localizado.',
  },
  {
    imagen: '/imagenes/imagen_paginas.jpg',
    titulo: 'Oficina — Granito',
    categoria: 'granito',
    etiqueta: 'Después',
    tipo: 'despues',
    descripcion: 'Granito pulido con acabado brillante de alta duración.',
  },
  {
    imagen: '/imagenes/WhatsApp Image 2025-12-08 at 2.04.11 PM.jpeg',
    titulo: 'Casa — Granito',
    categoria: 'granito',
    etiqueta: 'Antes',
    tipo: 'antes',
    descripcion: 'Estado inicial con manchas y pérdida de brillo.',
  },
  {
    imagen: '/imagenes/WhatsApp Image 2025-12-08 at 2.05.37 PM (2).jpeg',
    titulo: 'Local — Mosaico',
    categoria: 'mosaico',
    etiqueta: 'Después',
    tipo: 'despues',
    descripcion: 'Mosaico restaurado con protección especial.',
  },
  {
    imagen: '/imagenes/Screenshot_20251027-105902.Fotos.png',
    titulo: 'Conjunto — Mosaico',
    categoria: 'mosaico',
    etiqueta: 'Brillo',
    tipo: 'brillo',
    descripcion: 'Brillo uniforme en zonas comunes de conjunto residencial.',
  },
]

// ── Categorías con etiqueta visual ───────────────
const categorias = [
  { valor: 'todos',   label: 'Todos',   count: trabajos.length },
  { valor: 'marmol',  label: 'Mármol',  count: trabajos.filter(t => t.categoria === 'marmol').length },
  { valor: 'granito', label: 'Granito', count: trabajos.filter(t => t.categoria === 'granito').length },
  { valor: 'mosaico', label: 'Mosaico', count: trabajos.filter(t => t.categoria === 'mosaico').length },
]

const filtroActivo = ref('todos')
const busqueda     = ref('')

const trabajosFiltrados = computed(() => {
  let lista = filtroActivo.value === 'todos'
    ? trabajos
    : trabajos.filter(t => t.categoria === filtroActivo.value)

  if (busqueda.value.trim()) {
    const q = busqueda.value.toLowerCase()
    lista = lista.filter(t =>
      t.titulo.toLowerCase().includes(q) ||
      t.descripcion.toLowerCase().includes(q) ||
      t.etiqueta.toLowerCase().includes(q)
    )
  }
  return lista
})

// Agrupar por filas de 4 para poner separador entre grupos
const filas = computed(() => {
  const resultado = []
  const lista = trabajosFiltrados.value
  for (let i = 0; i < lista.length; i += 4) {
    resultado.push(lista.slice(i, i + 4))
  }
  return resultado
})

// ── Lightbox ──────────────────────────────────────
const fotoAbierta = ref(null)
const indexAbierto = ref(0)

function abrir(foto, index) {
  fotoAbierta.value = foto
  indexAbierto.value = index
}

function cerrar() { fotoAbierta.value = null }

function anterior() {
  const lista = trabajosFiltrados.value
  indexAbierto.value = (indexAbierto.value - 1 + lista.length) % lista.length
  fotoAbierta.value = lista[indexAbierto.value]
}

function siguiente() {
  const lista = trabajosFiltrados.value
  indexAbierto.value = (indexAbierto.value + 1) % lista.length
  fotoAbierta.value = lista[indexAbierto.value]
}

// Cerrar con teclado
import { onMounted, onUnmounted } from 'vue'

function onTecla(e) {
  if (!fotoAbierta.value) return
  if (e.key === 'Escape')     cerrar()
  if (e.key === 'ArrowLeft')  anterior()
  if (e.key === 'ArrowRight') siguiente()
}

onMounted(()  => window.addEventListener('keydown', onTecla))
onUnmounted(() => window.removeEventListener('keydown', onTecla))

// ── índice global por fila + posición ────────────
function indexGlobal(filaIndex, posIndex) {
  return filaIndex * 4 + posIndex
}
</script>

<template>
  <main class="pagina-galeria">

    <!-- Encabezado -->
    <div class="encabezado">
      <h1>Nuestra Galería</h1>
      <p>Resultados reales. Cada foto es un piso transformado.</p>
    </div>
<!-- Filtros + Buscador -->
<div class="controles">
  <div class="buscador">
    <input
      v-model="busqueda"
      type="text"
      placeholder="Buscar trabajo..."
      class="input-busqueda"
    />
    <span v-if="busqueda" class="limpiar" @click="busqueda = ''">✕</span>
  </div>
  <div class="filtros">
    <button
      v-for="cat in categorias"
      :key="cat.valor"
      class="btn-filtro"
      :class="{ activo: filtroActivo === cat.valor }"
      @click="filtroActivo = cat.valor"
    >
      {{ cat.label }}
      <span class="count">{{ cat.count }}</span>
    </button>
  </div>
</div>

    <!-- Grid por filas con separador dorado -->
    <section class="galeria-contenido">

      <div v-if="trabajosFiltrados.length === 0" class="sin-resultados">
        <p>No hay trabajos con ese filtro.</p>
        <button class="btn-filtro activo" @click="filtroActivo = 'todos'; busqueda = ''">
          Ver todos
        </button>
      </div>

      <template v-for="(fila, fi) in filas" :key="fi">

        <!-- Separador dorado entre filas (no antes de la primera) -->
        <div v-if="fi > 0" class="separador-fila">
          <span class="sep-linea"></span>
          <span class="sep-label">{{ fi + 1 }} / {{ filas.length }}</span>
          <span class="sep-linea"></span>
        </div>

        <!-- Fila de 4 columnas -->
        <div class="fila-grid">
          <div
            v-for="(foto, pi) in fila"
            :key="foto.titulo + pi"
            class="foto-item"
            @click="abrir(foto, indexGlobal(fi, pi))"
          >
            <img :src="foto.imagen" :alt="foto.titulo" />
            <div class="foto-overlay">
              <span class="foto-etiqueta" :class="foto.tipo">{{ foto.etiqueta }}</span>
              <div class="foto-info">
                <p class="foto-titulo">{{ foto.titulo }}</p>
                <p class="foto-desc">{{ foto.descripcion }}</p>
              </div>
            </div>
          </div>
        </div>

      </template>

    </section>

  </main>

  <!-- Lightbox -->
  <Transition name="fade">
    <div v-if="fotoAbierta" class="lightbox" @click="cerrar">
      <button class="lb-cerrar" @click="cerrar">✕</button>
      <button class="lb-nav lb-prev" @click.stop="anterior">‹</button>
      <button class="lb-nav lb-next" @click.stop="siguiente">›</button>
      <div class="lb-contenido" @click.stop>
        <img :src="fotoAbierta.imagen" :alt="fotoAbierta.titulo" />
        <div class="lb-info">
          <span class="foto-etiqueta" :class="fotoAbierta.tipo">{{ fotoAbierta.etiqueta }}</span>
          <h3>{{ fotoAbierta.titulo }}</h3>
          <p>{{ fotoAbierta.descripcion }}</p>
          <p class="lb-contador">
            {{ indexAbierto + 1 }} / {{ trabajosFiltrados.length }}
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.pagina-galeria {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 80px;
  background: var(--negro-profundo);
}

/* ── Encabezado ── */
.encabezado {
  text-align: center;
  padding: 50px 20px 40px;
  background: var(--negro-suave);
  border-bottom: 1px solid rgba(212,175,55,0.15);
  position: relative;
}

/* Línea dorada brillante en el centro */
.encabezado::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg,
    transparent,
    var(--oro-clasico),
    #fff8dc,
    var(--oro-clasico),
    transparent
  );
  filter: drop-shadow(0 0 6px rgba(212,175,55,0.8));
}

.encabezado h1 {
  color: var(--oro-clasico);
  font-size: clamp(2.2rem, 6vw, 3.2rem);
  margin-bottom: 12px;
}

.encabezado p {
  color: var(--gris-plata);
  font-size: 1.05rem;
}

/* ── Controles ── */
.controles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 1200px;
  margin: 36px auto 0;
  padding: 0 24px;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.btn-filtro {
  background: transparent;
  border: 1.5px solid rgba(212,175,55,0.25);
  color: var(--gris-plata);
  padding: 9px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-filtro:hover {
  border-color: var(--oro-clasico);
  color: var(--oro-clasico);
}

.btn-filtro.activo {
  background: var(--oro-clasico);
  border-color: var(--oro-clasico);
  color: #0a0a0a;
  font-weight: 600;
}

.count {
  background: rgba(0,0,0,0.2);
  padding: 1px 7px;
  border-radius: 10px;
  font-size: 0.78rem;
}

.btn-filtro.activo .count {
  background: rgba(0,0,0,0.15);
}

/* Buscador */
.buscador {
  position: relative;
  width: 380px;
  max-width: 100%;
}

.input-busqueda {
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(212,175,55,0.2);
  border-radius: 30px;
  padding: 10px 40px 10px 18px;
  color: var(--beige-marmol);
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: var(--transition);
}

.input-busqueda::placeholder { color: var(--gris-acero); }

.input-busqueda:focus {
  border-color: var(--oro-clasico);
  background: rgba(212,175,55,0.05);
}

.limpiar {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gris-acero);
  cursor: pointer;
  font-size: 0.85rem;
  transition: var(--transition);
}

.limpiar:hover { color: var(--oro-clasico); }

/* ── Galería ── */
.galeria-contenido {
  max-width: 1200px;
  margin: 36px auto 0;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Separador dorado entre filas */
.separador-fila {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 28px 0;
}

.sep-linea {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(212,175,55,0.6),
    #fff8dc,
    rgba(212,175,55,0.6),
    transparent
  );
  filter: drop-shadow(0 0 4px rgba(212,175,55,0.5));
}

.sep-label {
  color: rgba(212,175,55,0.5);
  font-size: 0.75rem;
  letter-spacing: 2px;
  font-weight: 500;
  white-space: nowrap;
}

/* Grid de 4 columnas */
.fila-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

/* Foto individual */
.foto-item {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
  background: #111;
}

.foto-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}

.foto-item:hover img {
  transform: scale(1.08);
}

.foto-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 50%);
  opacity: 0;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
}

.foto-item:hover .foto-overlay {
  opacity: 1;
}

.foto-etiqueta {
  align-self: flex-start;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.foto-etiqueta.antes   { background: var(--gris-acero); color: #fff; }
.foto-etiqueta.despues { background: var(--verde-esmeralda); color: #0a0a0a; }
.foto-etiqueta.brillo  { background: var(--oro-clasico); color: #0a0a0a; }
.foto-etiqueta.proceso { background: #7a7a7a; color: #fff; }

.foto-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.foto-titulo {
  color: var(--beige-marmol);
  font-size: 0.85rem;
  font-weight: 600;
}

.foto-desc {
  color: var(--gris-plata);
  font-size: 0.75rem;
  line-height: 1.4;
}

/* Sin resultados */
.sin-resultados {
  text-align: center;
  padding: 80px 20px;
  color: var(--gris-plata);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* ── Lightbox ── */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(5,5,5,0.97);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.lb-cerrar {
  position: absolute;
  top: 20px;
  right: 24px;
  background: transparent;
  border: 1.5px solid rgba(255,255,255,0.2);
  color: var(--beige-marmol);
  font-size: 1.2rem;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-cerrar:hover {
  border-color: var(--oro-clasico);
  color: var(--oro-clasico);
}

.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--beige-marmol);
  font-size: 2.5rem;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-nav:hover {
  background: rgba(212,175,55,0.12);
  border-color: var(--oro-clasico);
  color: var(--oro-clasico);
}

.lb-prev { left: 20px; }
.lb-next { right: 20px; }

.lb-contenido {
  max-width: 860px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lb-contenido img {
  width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 10px;
}

.lb-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 4px;
}

.lb-info h3 {
  color: var(--beige-marmol);
  font-size: 1.1rem;
}

.lb-info p {
  color: var(--gris-plata);
  font-size: 0.92rem;
}

.lb-contador {
  color: rgba(212,175,55,0.5) !important;
  font-size: 0.8rem !important;
  margin-top: 4px;
}

/* ── Transición ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Responsive ── */@media (max-width: 900px) {
  .fila-grid { grid-template-columns: repeat(3, 1fr); }
  .controles { flex-direction: column; align-items: center; }
  .buscador  { width: 100%; }
}

@media (max-width: 600px) {
  .encabezado { padding: 36px 16px 28px; }
  .encabezado h1 { font-size: 1.7rem; }
  .encabezado p  { font-size: 0.88rem; }

  .controles { padding: 0 12px; margin-top: 24px; }

  .filtros { gap: 8px; }
  .btn-filtro { font-size: 0.78rem; padding: 7px 14px; }
  .count { font-size: 0.7rem; }

  .input-busqueda { font-size: 0.85rem; padding: 9px 36px 9px 14px; }

  .fila-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3px;
  }

  .foto-titulo { font-size: 0.78rem; }
  .foto-desc   { display: none; }

  .galeria-contenido { padding: 0 10px; }

  .separador-fila { padding: 18px 0; }
  .sep-label { font-size: 0.7rem; }

  .lb-nav { display: none; }

  .lb-contenido img { max-height: 65vh; }
  .lb-info h3 { font-size: 0.95rem; }
  .lb-info p  { font-size: 0.82rem; }
}

@media (max-width: 400px) {
  .fila-grid { grid-template-columns: repeat(2, 1fr); gap: 2px; }
  .foto-item { aspect-ratio: 1/1; }
}
</style>