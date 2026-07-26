<script setup>
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'

// ── Credenciales EmailJS ──────────────────────────
const SERVICE_ID  = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_PUBLIC_KEY

// ── Estado del formulario ─────────────────────────
const nombre   = ref('')
const telefono = ref('')
const correo   = ref('')
const mensaje  = ref('')

const tocado = ref({
  nombre: false, telefono: false, correo: false, mensaje: false
})

// ── Validaciones ──────────────────────────────────
const errores = computed(() => ({
  nombre:   nombre.value.trim().length < 2 ? 'Ingresa tu nombre completo.' : '',
  telefono: !/^\d{7,15}$/.test(telefono.value.trim()) ? 'Solo números, mínimo 7 dígitos.' : '',
  correo:   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim()) ? 'Ingresa un correo válido.' : '',
  mensaje:  mensaje.value.trim().length < 10 ? 'Mínimo 10 caracteres.' : '',
}))

const formularioValido = computed(() =>
  Object.values(errores.value).every(e => e === '')
)

function marcarTocado(campo) {
  tocado.value[campo] = true
}

// ── Envío real con EmailJS ────────────────────────
const enviado    = ref(false)
const enviando   = ref(false)
const errorEnvio = ref(false)

async function enviarFormulario() {
  Object.keys(tocado.value).forEach(k => (tocado.value[k] = true))
  if (!formularioValido.value) return

  enviando.value   = true
  errorEnvio.value = false

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        nombre:   nombre.value,
        telefono: telefono.value,
        correo:   correo.value,
        mensaje:  mensaje.value,
      },
      PUBLIC_KEY
    )

    enviado.value = true
    nombre.value = telefono.value = correo.value = mensaje.value = ''
    Object.keys(tocado.value).forEach(k => (tocado.value[k] = false))

  } catch (error) {
    console.error('Error EmailJS:', error)
    errorEnvio.value = true
  } finally {
    enviando.value = false
  }
}

// ── WhatsApp ──────────────────────────────────────
const msgWA  = encodeURIComponent('¡Hola! Me interesa cotizar un servicio de pulimiento de pisos.')
const linkWA = `https://wa.me/573004795925?text=${msgWA}`
</script>

<template>
  <main class="pagina-contacto">

    <!-- ── HERO CONTACTO ── -->
    <div class="hero-contacto">
      <div class="hero-linea-top"></div>
      <h1>Hablemos</h1>
      <p>Cotización sin costo · Respuesta en menos de 24 horas</p>
      <div class="hero-linea-bottom"></div>
    </div>

    <!-- ── CUERPO ── -->
    <div class="cuerpo">

      <!-- Columna izquierda — info -->
      <aside class="info-lateral">

        <div class="info-bloque">
          <span class="info-linea-izq"></span>
          <h2>Contáctanos directo</h2>
        </div>

        <a href="tel:+573004795925" class="tarjeta-contacto">
          <span class="tc-icono">📱</span>
          <div>
            <strong>Llámanos</strong>
            <p>+57 300 479 5925</p>
          </div>
        </a>

        <a href="mailto:brillototalexpress@gmail.com" class="tarjeta-contacto">
          <span class="tc-icono">📧</span>
          <div>
            <strong>Correo</strong>
            <p>brillototalexpress@gmail.com</p>
          </div>
        </a>

        <a :href="linkWA" target="_blank" rel="noopener" class="tarjeta-contacto wa">
          <svg viewBox="0 0 32 32" class="wa-svg">
            <path fill="currentColor" d="M16 3C9.373 3 4 8.373 4 15c0 2.385.663 4.61 1.806 6.52L4 29l7.7-1.78A12.94 12.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a10.93 10.93 0 01-5.27-1.35l-.38-.22-3.94.91.95-3.81-.25-.4A9.96 9.96 0 016 15C6 9.477 10.477 5 16 5zm-2.45 5c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.97 2.63 1.1 2.81c.14.18 1.88 2.98 4.63 4.06.65.28 1.15.45 1.54.57.65.2 1.24.17 1.71.1.52-.08 1.6-.65 1.83-1.28.22-.63.22-1.17.15-1.28-.07-.1-.25-.17-.52-.3-.27-.14-1.6-.79-1.85-.88-.25-.1-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.34-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.61-1.47-.84-2.01-.22-.52-.44-.45-.61-.46-.16 0-.34-.02-.52-.02z"/>
          </svg>
          <div>
            <strong>WhatsApp</strong>
            <p>Chat directo</p>
          </div>
        </a>

        <!-- QR -->
        <div class="qr-bloque">
          <img
            src="/imagenes/WhatsApp Image 2025-12-08 at 3.37.03 PM.jpeg"
            alt="QR WhatsApp"
            class="qr"
          />
          <p>Escanea y escríbenos</p>
        </div>

      </aside>

      <!-- Columna derecha — formulario -->
      <div class="form-columna">

        <!-- Éxito -->
        <div v-if="enviado" class="aviso-exito">
          <span>✅</span>
          <h3>¡Mensaje enviado!</h3>
          <p>Nos pondremos en contacto muy pronto.</p>
          <button class="btn-nuevo" @click="enviado = false">Enviar otro</button>
        </div>

        <form v-else class="form" @submit.prevent="enviarFormulario" novalidate>

          <div class="form-titulo">
            <span class="info-linea-izq"></span>
            <h2>Solicita tu cotización</h2>
          </div>

          <!-- Nombre -->
          <div class="campo" :class="{ error: tocado.nombre && errores.nombre }">
            <label for="nombre">Nombre completo</label>
            <input
              id="nombre"
              v-model="nombre"
              type="text"
              placeholder="Ej: Juan Pérez"
              @blur="marcarTocado('nombre')"
            />
            <span v-if="tocado.nombre && errores.nombre" class="msj-error">
              {{ errores.nombre }}
            </span>
          </div>

          <!-- Teléfono + Correo en fila -->
          <div class="campo-fila">
            <div class="campo" :class="{ error: tocado.telefono && errores.telefono }">
              <label for="telefono">Teléfono</label>
              <input
                id="telefono"
                v-model="telefono"
                type="tel"
                placeholder="3004795925"
                @blur="marcarTocado('telefono')"
              />
              <span v-if="tocado.telefono && errores.telefono" class="msj-error">
                {{ errores.telefono }}
              </span>
            </div>
            <div class="campo" :class="{ error: tocado.correo && errores.correo }">
              <label for="correo">Correo</label>
              <input
                id="correo"
                v-model="correo"
                type="email"
                placeholder="tucorreo@gmail.com"
                @blur="marcarTocado('correo')"
              />
              <span v-if="tocado.correo && errores.correo" class="msj-error">
                {{ errores.correo }}
              </span>
            </div>
          </div>

          <!-- Mensaje -->
          <div class="campo" :class="{ error: tocado.mensaje && errores.mensaje }">
            <label for="mensaje">¿En qué podemos ayudarte?</label>
            <textarea
              id="mensaje"
              v-model="mensaje"
              rows="5"
              placeholder="Cuéntanos el tipo de piso, el área y el servicio que necesitas..."
              @blur="marcarTocado('mensaje')"
            ></textarea>
            <span v-if="tocado.mensaje && errores.mensaje" class="msj-error">
              {{ errores.mensaje }}
            </span>
          </div>

          <!-- Error de envío -->
          <p v-if="errorEnvio" class="msj-error-envio">
            ❌ No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.
          </p>

          <button type="submit" class="btn-enviar" :disabled="enviando">
            {{ enviando ? 'Enviando...' : 'Enviar solicitud' }}
          </button>

        </form>
      </div>


       
      </div>


  </main>
</template>

<style scoped>
.pagina-contacto {
  min-height: 100vh;
  padding-top: 100px;
  background: var(--negro-profundo);
}

/* ── HERO ── */
.hero-contacto {
  text-align: center;
  padding: 60px 20px 50px;
  background: var(--negro-suave);
  position: relative;
}

.hero-linea-top,
.hero-linea-bottom {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(212,175,55,0.6),
    #fff8dc,
    rgba(212,175,55,0.6),
    transparent
  );
  filter: drop-shadow(0 0 6px rgba(212,175,55,0.7));
}

.hero-linea-top    { top: 0; }
.hero-linea-bottom { bottom: 0; }

.hero-contacto h1 {
  color: var(--oro-clasico);
  font-size: clamp(2.4rem, 6vw, 3.6rem);
  margin-bottom: 12px;
}

.hero-contacto p {
  color: var(--gris-plata);
  font-size: 1.05rem;
  letter-spacing: 0.5px;
}

/* ── CUERPO ── */
.cuerpo {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 0;
  max-width: 1200px;
  margin: 60px auto 80px;
  padding: 0 24px;
  align-items: start;
}

/* ── INFO LATERAL ── */
.info-lateral {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 48px;
  border-right: 1px solid rgba(212,175,55,0.12);
  position: sticky;
  top: 120px;
}

.info-bloque {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.info-bloque h2 {
  color: var(--beige-marmol);
  font-size: 1.3rem;
}

/* Línea dorada vertical izquierda */
.info-linea-izq {
  display: inline-block;
  width: 3px;
  height: 28px;
  border-radius: 3px;
  background: linear-gradient(to bottom,
    transparent,
    var(--oro-clasico),
    transparent
  );
  filter: drop-shadow(0 0 4px rgba(212,175,55,0.7));
  flex-shrink: 0;
}

.tarjeta-contacto {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(212,175,55,0.12);
  border-radius: 14px;
  padding: 16px 18px;
  transition: var(--transition);
  cursor: pointer;
}

.tarjeta-contacto:hover {
  border-color: rgba(212,175,55,0.4);
  background: rgba(212,175,55,0.06);
  transform: translateX(4px);
}

.tarjeta-contacto.wa:hover {
  border-color: rgba(37,211,102,0.4);
  background: rgba(37,211,102,0.06);
}

.tc-icono {
  font-size: 1.5rem;
  line-height: 1;
}

.wa-svg {
  width: 28px;
  height: 28px;
  color: #25d366;
  flex-shrink: 0;
}

.tarjeta-contacto strong {
  display: block;
  color: var(--oro-clasico);
  font-size: 0.88rem;
  margin-bottom: 3px;
}

.tarjeta-contacto p {
  color: var(--gris-plata);
  font-size: 0.85rem;
}

.qr-bloque {
  text-align: center;
  margin-top: 8px;
  padding: 16px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(212,175,55,0.1);
  border-radius: 14px;
}

.qr {
  width: 90px;
  height: 90px;
  border-radius: 10px;
  margin: 0 auto 8px;
  display: block;
  box-shadow: 0 0 14px rgba(212,175,55,0.3);
  transition: var(--transition);
}

.qr:hover { transform: scale(1.06); }

.qr-bloque p {
  color: var(--gris-plata);
  font-size: 0.82rem;
}

/* ── FORMULARIO ── */
.form-columna {
  padding-left: 48px;
}

.form-titulo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.form-titulo h2 {
  color: var(--beige-marmol);
  font-size: 1.3rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.campo-fila {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.campo label {
  color: var(--beige-marmol);
  font-size: 0.9rem;
  font-weight: 500;
}

.campo input,
.campo textarea {
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 13px 16px;
  color: var(--beige-marmol);
  font-size: 0.97rem;
  font-family: 'Poppins', sans-serif;
  outline: none;
  resize: none;
  transition: var(--transition);
}

.campo input:focus,
.campo textarea:focus {
  border-color: var(--oro-clasico);
  background: rgba(212,175,55,0.04);
  box-shadow: 0 0 0 3px rgba(212,175,55,0.08);
}

.campo.error input,
.campo.error textarea {
  border-color: #e05252;
}

.msj-error {
  color: #e05252;
  font-size: 0.82rem;
}

.btn-enviar {
  background: linear-gradient(135deg, var(--oro-clasico), var(--oro-oscuro));
  color: #0a0a0a;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 6px 20px rgba(212,175,55,0.25);
  letter-spacing: 0.4px;
  margin-top: 4px;
}

.btn-enviar:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(212,175,55,0.45);
}

.btn-enviar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ── ÉXITO ── */
.aviso-exito {
  background: rgba(139,195,74,0.07);
  border: 1.5px solid var(--verde-esmeralda);
  border-radius: 18px;
  padding: 50px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.aviso-exito span { font-size: 2.8rem; }
.aviso-exito h3 { color: var(--verde-esmeralda); font-size: 1.4rem; }
.aviso-exito p  { color: var(--gris-plata); }

.btn-nuevo {
  background: transparent;
  border: 1.5px solid var(--oro-clasico);
  color: var(--oro-clasico);
  padding: 10px 26px;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.92rem;
  cursor: pointer;
  margin-top: 8px;
  transition: var(--transition);
}

.btn-nuevo:hover {
  background: var(--oro-clasico);
  color: #0a0a0a;
}

/* ── RESPONSIVE ── */
@media (max-width: 860px) {
  .cuerpo {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 16px;
    margin-top: 36px;
  }

  .info-lateral {
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid rgba(212,175,55,0.12);
    padding-bottom: 28px;
    position: static;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .info-bloque { grid-column: 1 / -1; }
  .qr-bloque   { display: none; }
  .form-columna { padding-left: 0; }
}

@media (max-width: 600px) {
  .hero-contacto { padding: 44px 16px 36px; }
  .hero-contacto h1 { font-size: 2rem; }
  .hero-contacto p  { font-size: 0.88rem; }
  .hero-linea-top,
  .hero-linea-bottom { width: 85%; }
  .info-lateral { grid-template-columns: 1fr; }
  .tarjeta-contacto { padding: 12px 14px; }
  .tarjeta-contacto strong { font-size: 0.82rem; }
  .tarjeta-contacto p { font-size: 0.78rem; }
  .tc-icono { font-size: 1.2rem; }
  .wa-svg { width: 22px; height: 22px; }
  .campo-fila { grid-template-columns: 1fr; }
  .campo label { font-size: 0.85rem; }
  .campo input,
  .campo textarea { font-size: 0.9rem; padding: 11px 14px; }
  .btn-enviar { font-size: 0.92rem; padding: 14px; }
  .form-titulo h2,
  .info-bloque h2 { font-size: 1.1rem; }
}

@media (max-width: 400px) {
  .cuerpo { padding: 0 12px; }
  .hero-contacto h1 { font-size: 1.7rem; }
}

.msj-error-envio {
  color: #e05252;
  font-size: 0.88rem;
  text-align: center;
  padding: 10px;
  background: rgba(224,82,82,0.07);
  border-radius: 8px;
  border: 1px solid rgba(224,82,82,0.2);
}
</style>