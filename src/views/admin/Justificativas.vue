<template>
    <div class="container rf_container">
      <SidebarVue />
      <section class="bg-dark text-secondary px-4 py-5 text-center">
        <div class="container py-5">
          <h1 class="rf_texto">Justificativas</h1>
        </div>
      </section>
      <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3"></ul>
        <p class="text-center rf_texto">© 2023 Rfmobi Solution</p>
      </footer>
    </div>
  </template>
  <script>
  import SidebarVue from "../../components/menu/Sidebar.vue";
  export default {
    components: {
      SidebarVue,
    },
  };
  </script>
  
  <style>
  @import "../../assets/styles/rfCss.css";
  </style>