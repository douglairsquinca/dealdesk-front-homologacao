<template>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid navgator-container">
        <div>
          <!-- <i class="bi bi-sliders fs-5"></i> -->
          <i class="bi bi-gear dd-fonte-navgator">{{ barraTitulo }}</i>
        </div>
        <div>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link :to="'/f&i/vendas_fei_detalhe/' + id" class="nav-link dd-fonte-navgator-dashboard active">
                Dashboard /
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link dd-fonte-navgator-dashboard disabled">{{ titulo }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    props: ["barraTitulo", "titulo", "id"],
  };
  </script>
  