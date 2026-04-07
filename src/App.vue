<template>
  <div id="app">
    <!-- Navbar centrado y estilizado -->
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/create" class="nav-link">Create Conflict</router-link>
    </nav>

    <!-- Aquí se renderizan tus vistas -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.navbar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 0;
  background-color: #f9fafb;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border-radius: 12px;
  margin-bottom: 2rem;
  font-family: 'Inter', sans-serif;
}

.nav-link {
  text-decoration: none;
  font-weight: 500;
  font-size: 1.05rem;
  color: #3b82f6;
  transition: all 0.2s;
  position: relative;
}

.nav-link:hover {
  color: #1d4ed8;
  transform: translateY(-2px);
}

.nav-link.router-link-active::after {
  content: '';
  display: block;
  height: 3px;
  width: 100%;
  background-color: #3b82f6;
  border-radius: 2px;
  margin-top: 4px;
}
</style>