<template>
  <div id="app-container">
    <header class="app-header">
      <h1>Hello World App</h1>
      <nav class="app-nav" aria-label="Main navigation">
        <router-link to="/" class="nav-link">Home</router-link>
      </nav>
    </header>
    <main class="app-main" role="main">
      <router-view />
    </main>
    <footer class="app-footer">
      <p>&copy; 2024 Hello World App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.app-header {
  background-color: #42b883;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.app-nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover,
.nav-link:focus {
  background-color: rgba(255, 255, 255, 0.2);
}

.app-main {
  min-height: calc(100vh - 140px);
  padding: 2rem;
}

.app-footer {
  background-color: #35495e;
  color: white;
  text-align: center;
  padding: 1rem;
}

@media (max-width: 600px) {
  .app-header {
    flex-direction: column;
    text-align: center;
  }
  
  .app-main {
    padding: 1rem;
  }
}
</style>
