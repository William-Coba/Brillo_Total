<script setup>
const experiencias = [
  {
    tipo: 'Residencial',
    color: 'res',
    superficie: 'Piso de Mármol',
    icono: '✦',
    resultado: 'Piso completamente opaco y rayado restaurado a brillo espejo en una sola jornada. El cliente quedó sorprendido con el acabado final.',
    detalles: ['Área: 80 m²', 'Duración: 1 día', 'Acabado: Espejo'],
  },
  {
    tipo: 'Comercial',
    color: 'com',
    superficie: 'Piso de Granito',
    icono: '◈',
    resultado: 'Local comercial con tráfico intenso diario. Aplicamos sellado de alto rendimiento que mantiene el brillo por más de 12 meses.',
    detalles: ['Área: 200 m²', 'Duración: 2 días', 'Sellado: Premium'],
  },
  {
    tipo: 'Residencial',
    color: 'res',
    superficie: 'Piso de Mosaico',
    icono: '❖',
    resultado: 'Mosaico con décadas de uso y desgaste profundo. Recuperamos el color original y aplicamos protección especial antideslizante.',
    detalles: ['Área: 120 m²', 'Duración: 1 día', 'Protección: Antideslizante'],
  },
  {
    tipo: 'Conjunto',
    color: 'con',
    superficie: 'Zonas Comunes',
    icono: '◉',
    resultado: 'Pulimiento completo de pasillos, lobby y escaleras de conjunto residencial. Acabado uniforme en todas las zonas comunes.',
    detalles: ['Área: 450 m²', 'Duración: 3 días', 'Acabado: Profesional'],
  },
]

</script>

<template>
  <main class="pagina-servicios">

    <!-- Encabezado -->
    <div class="encabezado">
      <h1>Nuestros Servicios</h1>
      <p>Soluciones profesionales para darle vida y brillo a cada superficie.</p>
    </div>


    <!-- ── EXPERIENCIAS ── -->
<section class="experiencias">
  <div class="exp-linea-top"></div>
  <h2>Lo que hemos logrado</h2>
  <p class="exp-subtitulo">Resultados reales en cada proyecto que tomamos</p>

  <div class="exp-grid">
    <div class="exp-card" v-for="exp in experiencias" :key="exp.tipo">
      <div class="exp-header">
        <span class="exp-tipo" :class="exp.color">{{ exp.tipo }}</span>
        <span class="exp-superficie">{{ exp.superficie }}</span>
      </div>
      <div class="exp-resultado">
        <span class="exp-icono">{{ exp.icono }}</span>
        <p>{{ exp.resultado }}</p>
      </div>
      <div class="exp-detalles">
        <span v-for="d in exp.detalles" :key="d" class="exp-tag">{{ d }}</span>
      </div>
    </div>
  </div>

  <div class="exp-linea-bottom"></div>


  <!-- CTA -->
    <section class="cta">
      <h2>¿Listo para ver el cambio?</h2>
      <p>Solicita tu cotización sin costo. Respondemos en menos de 24 horas.</p>
      <RouterLink to="/contacto" class="btn-cta">Solicitar cotización</RouterLink>
    </section>
    
</section>

  </main>
</template>

<style scoped>
.pagina-servicios {
  min-height: 100vh;
  padding-top: 100px;
  background: var(--negro-profundo);
}

/* ── Encabezado ── */
.encabezado {
  text-align: center;
  padding: 60px 20px 50px;
  background: var(--negro-suave);
  border-bottom: 1px solid rgba(212,175,55,0.15);
}

.encabezado h1 {
  color: var(--oro-clasico);
  font-size: clamp(2.2rem, 6vw, 3.2rem);
  margin-bottom: 16px;
}

.encabezado p {
  color: var(--gris-plata);
  font-size: 1.1rem;
  max-width: 500px;
  margin: auto;
}

/* ── Grid de servicios ── */
.grid-servicios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
  max-width: 1100px;
  margin: 60px auto;
  padding: 0 24px;
}

.card {
  background: rgba(18,18,18,0.8);
  border: 1px solid rgba(212,175,55,0.2);
  border-radius: 22px;
  padding: 36px 28px;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card:hover {
  transform: translateY(-10px);
  border-color: rgba(212,175,55,0.5);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.card-icono {
  font-size: 2rem;
  color: var(--oro-clasico);
  line-height: 1;
}

.card h2 {
  color: var(--beige-marmol);
  font-size: 1.4rem;
}

.card-desc {
  color: var(--gris-plata);
  font-size: 0.97rem;
  line-height: 1.7;
  flex: 1;
}

.card-detalles {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin-top: 6px;
}

.card-detalles li {
  background: rgba(212,175,55,0.1);
  border: 1px solid rgba(212,175,55,0.25);
  color: var(--oro-clasico);
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
}

/* ── Proceso ── */
.proceso-general {
  background: var(--negro-suave);
  padding: 80px 24px;
  text-align: center;
}

.proceso-general h2 {
  color: var(--oro-clasico);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  margin-bottom: 50px;
}

.pasos {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  max-width: 1000px;
  margin: auto;
}

.paso {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  max-width: 200px;
  padding: 0 16px;
}

.paso-num {
  font-size: 2.4rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: var(--oro-clasico);
  opacity: 0.5;
  line-height: 1;
}

.paso h3 {
  color: var(--beige-marmol);
  font-size: 1.1rem;
}

.paso p {
  color: var(--gris-plata);
  font-size: 0.9rem;
  line-height: 1.6;
}

.paso-linea {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--oro-clasico), transparent);
  flex-shrink: 0;
  margin-bottom: 60px;
}

@media (max-width: 700px) {
  .paso-linea { display: none; }
  .pasos { flex-direction: column; gap: 36px; }
  .paso { max-width: 100%; }
}

/* ── CTA ── */
.cta {
  text-align: center;
  padding: 80px 20px;
  background: var(--negro-profundo);
}

.cta h2 {
  color: var(--beige-marmol);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  margin-bottom: 14px;
}

.cta p {
  color: var(--gris-plata);
  margin-bottom: 32px;
  font-size: 1rem;
}

.btn-cta {
  display: inline-block;
  background: linear-gradient(135deg, var(--oro-clasico), var(--oro-oscuro));
  color: #0a0a0a;
  padding: 16px 42px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1.05rem;
  transition: var(--transition);
  box-shadow: 0 6px 20px rgba(212,175,55,0.3);
}

.btn-cta:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(212,175,55,0.5);
}
/* ── EXPERIENCIAS ── */
.experiencias {
  padding: 80px 24px;
  background: var(--negro-profundo);
  position: relative;
  text-align: center;
}

/* Línea dorada brillante arriba */
.exp-linea-top,
.exp-linea-bottom {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(212,175,55,0.6),
    #fff8dc,
    rgba(212,175,55,0.6),
    transparent
  );
  filter: drop-shadow(0 0 6px rgba(212,175,55,0.6));
}

.exp-linea-top    { top: 0; }
.exp-linea-bottom { bottom: 0; }

.experiencias h2 {
  color: var(--oro-clasico);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  margin-bottom: 10px;
}

.experiencias h2::before {
  content: '✦';
  display: block;
  font-size: 1rem;
  margin-bottom: 10px;
  opacity: 0.6;
  letter-spacing: 8px;
  color: var(--oro-clasico);
}

.exp-subtitulo {
  color: var(--gris-plata);
  font-size: 1rem;
  margin-bottom: 48px;
}

.exp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  text-align: left;
}

.exp-card {
  background: rgba(18,18,18,0.8);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

/* Línea dorada izquierda en cada card */
.exp-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 20%;
  bottom: 20%;
  width: 2px;
  background: linear-gradient(to bottom,
    transparent,
    var(--oro-clasico),
    transparent
  );
  filter: drop-shadow(0 0 4px rgba(212,175,55,0.6));
}

.exp-card:hover {
  transform: translateY(-6px);
  border-color: rgba(212,175,55,0.2);
  box-shadow: 0 16px 36px rgba(0,0,0,0.4);
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exp-tipo {
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.exp-tipo.res { background: rgba(212,175,55,0.15); color: var(--oro-clasico); border: 1px solid rgba(212,175,55,0.3); }
.exp-tipo.com { background: rgba(139,195,74,0.12); color: var(--verde-esmeralda); border: 1px solid rgba(139,195,74,0.3); }
.exp-tipo.con { background: rgba(100,149,237,0.12); color: #7ab4f5; border: 1px solid rgba(100,149,237,0.25); }

.exp-superficie {
  color: var(--gris-plata);
  font-size: 0.88rem;
}

.exp-resultado {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.exp-icono {
  color: var(--oro-clasico);
  font-size: 1.2rem;
  margin-top: 2px;
  flex-shrink: 0;
  opacity: 0.7;
}

.exp-resultado p {
  color: #d5d1cc;
  font-size: 0.95rem;
  line-height: 1.7;
}

.exp-detalles {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.exp-tag {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--gris-plata);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
}
@media (max-width: 600px) {
  .encabezado { padding: 44px 16px 32px; }
  .encabezado h1 { font-size: 1.8rem; }
  .encabezado p  { font-size: 0.88rem; }

  .exp-grid { gap: 14px; }

  .exp-card { padding: 20px 16px; }

  .exp-resultado p { font-size: 0.88rem; }

  .exp-tag { font-size: 0.75rem; padding: 3px 10px; }

  .pasos { gap: 24px; }
  .paso  { max-width: 100%; padding: 0 8px; }
  .paso-num { font-size: 1.8rem; }
  .paso h3  { font-size: 1rem; }
  .paso p   { font-size: 0.85rem; }

  .cta { padding: 50px 16px; }
  .btn-cta { font-size: 0.95rem; padding: 14px 28px; }
}

@media (max-width: 400px) {
  .exp-card { padding: 16px 14px; }
  .exp-tipo { font-size: 0.72rem; }
  .exp-superficie { font-size: 0.78rem; }
}
</style>