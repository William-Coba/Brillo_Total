<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav class="menu" :class="{ scrolled }">
    <div class="menu-container">
      <img src="/public/logo.png" alt="Logo Brillo Total" class="logo" />
      <ul class="menu-opciones">
        <li><RouterLink to="/">Inicio</RouterLink></li>
        <li><RouterLink to="/servicios">Servicios</RouterLink></li>
        <li><RouterLink to="/galeria">Galería</RouterLink></li>
        <li><RouterLink to="/contacto">Contacto</RouterLink></li>
      </ul>
    </div>
  </nav>

  <RouterView />
</template>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 18px 0;
  background: transparent;
  transition: var(--transition);
  display: flex;
  justify-content: center;
}

.menu.scrolled {
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.menu-container {
  width: 95%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  max-width: 72px;
  filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
  animation: aparecer 1s ease-out, pulso 4s infinite 1s;
  transition: var(--transition);
}

.logo:hover {
  transform: scale(1.12);
  filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.9));
}

.menu-opciones {
  display: flex;
  gap: 32px;
  list-style: none;
}

.menu-opciones a {
  color: var(--oro-clasico);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  transition: var(--transition);
}

.menu-opciones a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--beige-marmol);
  transition: var(--transition);
  transform: translateX(-50%);
}

.menu-opciones a:hover,
.menu-opciones a.router-link-exact-active {
  color: var(--beige-marmol);
}

.menu-opciones a:hover::after,
.menu-opciones a.router-link-exact-active::after {
  width: 70%;
}

@media (max-width: 768px) {
  .menu { padding: 12px 0; }

  .menu-container {
    padding: 0 16px;
    width: 100%;
  }

  .logo { max-width: 48px; }

  .menu-opciones {
    gap: 10px;
  }

  .menu-opciones a {
    font-size: 0.78rem;
    letter-spacing: 0;
  }
}
</style>