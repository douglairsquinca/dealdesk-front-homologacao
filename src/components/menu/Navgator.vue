<template>
  <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
    <div class="container-fluid">
      <div>
        <i class="bi bi-sliders fs-5"> {{ titulo }} </i>
      </div>
      <div>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <router-link class="nav-link rf_texto active" to="/admin"
              >Dashboard /</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link rf_texto disabled">{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: ["barra_titulo", "titulo"],
  created() {
    this.item = this.barra_titulo;
   // this.titulo = this.titulo;
  },
};
</script>