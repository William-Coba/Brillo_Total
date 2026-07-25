<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ── Slider de textos ──────────────────────────────
const textos = ['DALE VIDA A TUS PISOS', 'YA LLEGAMOS A TI', '¡ES HORA DE BRILLAR!']
const textoActual = ref(textos[0])
let intervalo = null

onMounted(() => {
  let i = 0
  intervalo = setInterval(() => {
    i = (i + 1) % textos.length
    textoActual.value = textos[i]
  }, 4000)
})

onUnmounted(() => clearInterval(intervalo))

// ── Datos de servicios ────────────────────────────
const servicios = [
  { titulo: 'Pulida de Pisos',    desc: 'Mármol, Granito y Mosaico con acabados espejo.' },
  { titulo: 'Brillo Profesional', desc: 'Con máquinas especializadas de alto rendimiento.' },
  { titulo: 'Mantenimiento',      desc: 'Preventivo y correctivo para mayor durabilidad.' },
  { titulo: 'Atención',           desc: 'Hogares, oficinas y locales comerciales.' },
]

// ── Galería estilo Google Photos ──────────────────
const galeria = [
  { imagen: '/imagenes/Screenshot_20251027-105902.Fotos.png',       etiqueta: 'Antes',   tipo: 'antes'   },
  { imagen: '/imagenes/Screenshot_20251027-110011.Fotos~2.png',     etiqueta: 'Después', tipo: 'despues' },
  { imagen: '/imagenes/carrusel2.png',                               etiqueta: 'Brillo',  tipo: 'brillo'  },
  { imagen: '/imagenes/8.jpeg',                                      etiqueta: 'Proceso', tipo: 'proceso' },
  { imagen: '/imagenes/imagen_paginas.jpg',                          etiqueta: 'Antes',   tipo: 'antes'   },
  { imagen: '/imagenes/WhatsApp Image 2025-12-08 at 2.04.11 PM.jpeg', etiqueta: 'Después', tipo: 'despues' },
]

// ── Lightbox ──────────────────────────────────────
const fotoAbierta = ref(null)
function abrir(foto) { fotoAbierta.value = foto }
function cerrar()    { fotoAbierta.value = null }

// Navegar entre fotos con lightbox abierto
function anterior() {
  const i = galeria.indexOf(fotoAbierta.value)
  fotoAbierta.value = galeria[(i - 1 + galeria.length) % galeria.length]
}
function siguiente() {
  const i = galeria.indexOf(fotoAbierta.value)
  fotoAbierta.value = galeria[(i + 1) % galeria.length]
}

// Link WhatsApp flotante
const msgWA = encodeURIComponent('¡Hola! Me interesa cotizar un servicio de pulimiento de pisos.')
const linkWA = `https://wa.me/573004795925?text=${msgWA}`
</script>

<template>
  <!-- ── HERO ── -->
  <header class="hero">
    <div class="slide slide-1"></div>
    <div class="slide slide-2"></div>
    <div class="slide slide-3"></div>
    <div class="hero-overlay"></div>
    <div class="hero-texto">
      <span class="texto-animado">{{ textoActual }}</span>
    </div>
  </header>

  <main class="fondopantalla">

    <!-- ── SERVICIOS ── -->
    <section class="servicios">
      <h2>¿Qué ofrecemos?</h2>
      <div class="servicios-grid">
        <div v-for="s in servicios" :key="s.titulo" class="servicio-card">
          <h3>{{ s.titulo }}</h3>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ── GALERÍA ESTILO GOOGLE PHOTOS ── -->
    <section class="galeria-section">
      <h2 class="titulo-seccion">Nuestros Trabajos</h2>
      <p class="subtitulo-seccion">Resultados reales en cada proyecto</p>

      <div class="galeria-grid">
        <div
          v-for="(foto, index) in galeria"
          :key="index"
          class="galeria-item"
          :class="{ destacada: index === 0 || index === 3 }"
          @click="abrir(foto)"
        >
          <img :src="foto.imagen" :alt="foto.etiqueta" />
          <div class="galeria-overlay">
            <span class="galeria-etiqueta" :class="foto.tipo">{{ foto.etiqueta }}</span>
            <span class="ver-icono">🔍</span>
          </div>
        </div>
      </div>

      <div class="galeria-footer">
        <RouterLink to="/galeria" class="btn-vermas">
          Ver galería completa →
        </RouterLink>
      </div>
    </section>

  </main>

  <!-- ── FOOTER ── -->
  <footer>
    <div class="footer-contenido">
      <div class="marca">
        <h3>Brillo Total Express</h3>
        <p>Dando brillo a cada espacio, con pasión y profesionalismo.</p>
      </div>
      <div class="contacto">
        <h4>Contacto Directo</h4>
        <address>
          📧 <a href="mailto:brillototalexpress@gmail.com">brillototalexpress@gmail.com</a><br />
          📱 <a href="tel:+573004795925">+57 300 479 5925</a>
        </address>
      </div>
      <div class="redes">
        <h4>Síguenos</h4>
        <img
          src="/imagenes/WhatsApp Image 2025-12-08 at 3.37.03 PM.jpeg"
          alt="QR WhatsApp Brillo Total"
          class="qr"
        />
        <p>Escanea y escríbenos</p>
      </div>
    </div>
    <div class="pie">
      <p>&copy; 2025 Brillo Total Express — Barranquilla, Atlántico</p>
    </div>
  </footer>

  <!-- ── BOTÓN FLOTANTE WHATSAPP ── -->
<a :href="linkWA" target="_blank" rel="noopener" class="wa-flotante" title="Escríbenos por WhatsApp">
  <svg viewBox="0 0 32 32" class="wa-svg">
    <path fill="#fff" d="M16 3C9.373 3 4 8.373 4 15c0 2.385.663 4.61 1.806 6.52L4 29l7.7-1.78A12.94 12.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a10.93 10.93 0 01-5.27-1.35l-.38-.22-3.94.91.95-3.81-.25-.4A9.96 9.96 0 016 15C6 9.477 10.477 5 16 5zm-2.45 5c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.97 2.63 1.1 2.81c.14.18 1.88 2.98 4.63 4.06.65.28 1.15.45 1.54.57.65.2 1.24.17 1.71.1.52-.08 1.6-.65 1.83-1.28.22-.63.22-1.17.15-1.28-.07-.1-.25-.17-.52-.3-.27-.14-1.6-.79-1.85-.88-.25-.1-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.34-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.61-1.47-.84-2.01-.22-.52-.44-.45-.61-.46-.16 0-.34-.02-.52-.02z"/>
  </svg>
</a>
  <!-- ── LIGHTBOX ── -->
  <Transition name="fade">
    <div v-if="fotoAbierta" class="lightbox" @click="cerrar">
      <button class="lb-cerrar" @click="cerrar">✕</button>
      <button class="lb-nav lb-prev" @click.stop="anterior">‹</button>
      <button class="lb-nav lb-next" @click.stop="siguiente">›</button>
      <div class="lb-contenido" @click.stop>
        <img :src="fotoAbierta.imagen" :alt="fotoAbierta.etiqueta" />
        <span class="galeria-etiqueta" :class="fotoAbierta.tipo">
          {{ fotoAbierta.etiqueta }}
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* ── HERO ── */
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  animation: fadeSlides 12s infinite;
}
.slide-1 { background-image: url('/imagenes/imagen_paginas.jpg'); animation-delay: 0s; }
.slide-2 { background-image: url('/imagenes/WhatsApp Image 2025-12-08 at 2.05.37 PM (2).jpeg'); animation-delay: 4s; }
.slide-3 { background-image: url('/imagenes/WhatsApp Image 2025-12-08 at 2.04.11 PM.jpeg'); animation-delay: 8s; }

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.92), rgba(10,10,10,0.5));
  z-index: 5;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom right, transparent 49%, var(--negro-suave) 50%);
  z-index: 15;
}

.hero-texto {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.texto-animado {
  display: block;
  color: var(--beige-marmol);
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 6vw, 4rem);
  letter-spacing: 2px;
  text-shadow: 0 0 8px rgba(212,175,55,0.7);
  animation: textEntrada 0.8s ease-out;
}

.hero-wa {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #25d366;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  padding: 14px 30px;
  border-radius: 50px;
  transition: var(--transition);
  box-shadow: 0 6px 20px rgba(37,211,102,0.35);
}

.hero-wa:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(37,211,102,0.5);
  background: #1ebe5d;
}

/* ── FONDO CON TEXTURA ── */
.fondopantalla {
  background-color: var(--negro-profundo);
  background-image:
    linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── SERVICIOS ── */
.servicios {
  padding: 90px 20px 120px;
  text-align: center;
  background: var(--negro-suave);
  clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
}

.servicios h2 {
  color: var(--oro-clasico);
  font-size: clamp(2rem, 5vw, 2.8rem);
  margin-bottom: 50px;
}

.servicios h2::before {
  content: '✦';
  display: block;
  color: var(--oro-clasico);
  font-size: 1rem;
  margin-bottom: 10px;
  opacity: 0.6;
  letter-spacing: 8px;
}

.servicios h2::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: var(--oro-clasico);
  margin: 12px auto 0;
  border-radius: 3px;
}

.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 28px;
  max-width: 1100px;
  margin: auto;
}

.servicio-card {
  background: rgba(20,20,20,0.65);
  backdrop-filter: blur(8px);
  padding: 34px 28px;
  border-radius: 20px;
  border: 1px solid rgba(212,175,55,0.25);
  border-top: 2px solid rgba(212,175,55,0.4);
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
  transition: var(--transition);
}

.servicio-card:hover {
  transform: translateY(-10px);
  border-color: rgba(212,175,55,0.5);
}

.servicio-card h3 {
  color: var(--oro-clasico);
  margin-bottom: 12px;
  font-size: 1.4rem;
}

.servicio-card p { color: var(--gris-plata); }

/* ── GALERÍA ESTILO GOOGLE PHOTOS ── */
.galeria-section {
  padding: 100px 20px 80px;
  margin-top: -40px;
}

.titulo-seccion {
  color: var(--oro-clasico);
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  text-align: center;
  margin-bottom: 8px;
}

.titulo-seccion::before {
  content: '✦';
  display: block;
  font-size: 1rem;
  margin-bottom: 10px;
  opacity: 0.6;
  letter-spacing: 8px;
}

.subtitulo-seccion {
  text-align: center;
  color: var(--gris-plata);
  font-size: 1rem;
  margin-bottom: 36px;
}

/* Grid tipo masonry / Google Photos */
.galeria-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 260px);
  gap: 6px;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
}

/* Primera foto ocupa 2 filas */
.galeria-item.destacada:first-child {
  grid-row: span 2;
}

/* Cuarta foto también ocupa 2 filas */
.galeria-item.destacada:last-of-type {
  grid-row: span 2;
}

.galeria-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #111;
}

.galeria-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}

.galeria-item:hover img {
  transform: scale(1.08);
}

.galeria-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10,10,10,0);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 14px;
  transition: var(--transition);
}

.galeria-item:hover .galeria-overlay {
  background: rgba(10,10,10,0.45);
}

.ver-icono {
  font-size: 1.4rem;
  opacity: 0;
  transition: var(--transition);
  transform: scale(0.8);
}

.galeria-item:hover .ver-icono {
  opacity: 1;
  transform: scale(1);
}

.galeria-etiqueta {
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0;
  transition: var(--transition);
}

.galeria-item:hover .galeria-etiqueta {
  opacity: 1;
}

.galeria-etiqueta.antes   { background: var(--gris-acero); color: #fff; }
.galeria-etiqueta.despues { background: var(--verde-esmeralda); color: #0a0a0a; }
.galeria-etiqueta.brillo  { background: var(--oro-clasico); color: #0a0a0a; }
.galeria-etiqueta.proceso { background: #7a7a7a; color: #fff; }

.galeria-footer {
  text-align: center;
  margin-top: 32px;
}

.btn-vermas {
  display: inline-block;
  border: 1.5px solid var(--oro-clasico);
  color: var(--oro-clasico);
  padding: 12px 32px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  transition: var(--transition);
}

.btn-vermas:hover {
  background: var(--oro-clasico);
  color: #0a0a0a;
  transform: translateY(-3px);
}

/* ── BOTÓN FLOTANTE WHATSAPP ── */
.wa-flotante {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 500;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25d366;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(37,211,102,0.5);
  transition: var(--transition);
  overflow: hidden;
}

.wa-flotante:hover {
  transform: scale(1.12) translateY(-3px);
  box-shadow: 0 10px 30px rgba(37,211,102,0.65);
}

.wa-icono {
  font-size: 1.8rem;
  line-height: 1;
}

.wa-svg {
  width: 32px;
  height: 32px;
}
/* ── FOOTER ── */
footer {
  background: var(--negro-suave);
  padding: 50px 20px 30px;
  border-top: 1px solid rgba(212,175,55,0.15);
}

.footer-contenido {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 36px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.marca h3, .contacto h4, .redes h4 {
  color: var(--oro-clasico);
  margin-bottom: 14px;
}

.marca p { color: #dad6d0; line-height: 1.7; }

.contacto address { font-style: normal; line-height: 2; }

.contacto a { color: var(--oro-clasico); transition: var(--transition); }
.contacto a:hover { color: var(--beige-marmol); }

.qr {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  margin: 10px auto;
  display: block;
  box-shadow: 0 0 16px rgba(212,175,55,0.4);
  transition: var(--transition);
}
.qr:hover { transform: scale(1.08); }

.redes p { font-size: 0.9rem; color: #c0bdb8; margin-top: 6px; }

.pie {
  margin-top: 35px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.07);
  text-align: center;
  font-size: 0.9rem;
  color: #9e9b96;
}

/* ── LIGHTBOX ── */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(5,5,5,0.96);
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
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
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
  line-height: 1;
}

.lb-nav:hover {
  background: rgba(212,175,55,0.15);
  border-color: var(--oro-clasico);
  color: var(--oro-clasico);
}

.lb-prev { left: 20px; }
.lb-next { right: 20px; }

.lb-contenido {
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.lb-contenido img {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 12px;
}

/* ── TRANSICIONES ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .hero { height: 100svh; }

  .texto-animado {
    font-size: 1.6rem;
    letter-spacing: 1px;
  }

  .hero-wa {
    font-size: 0.85rem;
    padding: 11px 22px;
  }

  .servicios {
    padding: 50px 14px 80px;
  }

  .servicios-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .servicio-card {
    padding: 18px 14px;
  }

  .servicio-card h3 { font-size: 1rem; }
  .servicio-card p  { font-size: 0.82rem; }

  .galeria-section { padding: 70px 12px 50px; }

  .subtitulo-seccion { font-size: 0.88rem; }

  .galeria-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 140px);
    gap: 4px;
  }

  .galeria-item.destacada:first-child  { grid-row: span 1; }
  .galeria-item.destacada:last-of-type { grid-row: span 1; }

  .btn-vermas {
    font-size: 0.88rem;
    padding: 10px 24px;
  }

  .wa-flotante {
    bottom: 16px;
    right: 16px;
    width: 50px;
    height: 50px;
  }

  .wa-svg { width: 26px; height: 26px; }

  footer { padding: 36px 14px 24px; }
  .marca h3, .contacto h4, .redes h4 { font-size: 1.1rem; }
  .marca p, .contacto address, .redes p { font-size: 0.85rem; }

  .qr { width: 80px; height: 80px; }
}

@media (max-width: 400px) {
  .texto-animado { font-size: 1.3rem; }
  .galeria-grid  { grid-template-rows: repeat(4, 110px); }
  .servicios-grid { grid-template-columns: 1fr; }
}
</style>