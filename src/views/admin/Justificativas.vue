<template>
    <div class="container rf_container">
      <SidebarVue />
      <section class="bg-dark text-secondary px-4 py-5 text-center">
        <div class="container py-5">
          <h1 class="rf_texto">Justificativas</h1>
        </div>
      </section>
      <RodapeVue/>
    </div>
  </template>
  <script>
  import SidebarVue from "../../components/menu/Sidebar.vue";
  import RodapeVue from "../../components/menu/Rodape.vue";
  export default {
    components: {
      SidebarVue,
      RodapeVue
    },
  };
  </script>
  
