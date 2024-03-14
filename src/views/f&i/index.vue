<template lang="pt-br">
    <SidebarVue ref="sidebar" />
    <NavgatorFI ref="navgator" :barraTitulo="' F&I - Dashboard'" :titulo="'dashboard'"/>

       <div class="card-container"> 
        <div class="rf_bg_form rf_texto rf_margin ">
      <div class="container-fluid px-4 py-5" id="icon-grid">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4
            g-4
            py-5
          ">
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/f&i/estoque_acessorio" class="nav-link p-2">
                  <i class="bi bi-person-gear"> Estoque Acessórios</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/f&i/cadastro_acessorio" class="nav-link p-2">
                  <i class="bi bi-person-vcard"> Cadastro Acessórios</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/f&i/cadastro_pacotes" class="nav-link p-2">
                  <i class="bi bi-buildings"> Cadastro Pacotes</i>
                </router-link>
              </h3>
            </div>
          </div>

          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/f&i/cadastro_revisao" class="nav-link p-2">
                  <i class="bi bi-person-gear"> Cadastro Revisão</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/f&i/cadastro_seguro" class="nav-link p-2">
                  <i class="bi bi-person-gear"> Cadastro Seguros</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/f&i/cadastro_kits" class="nav-link p-2">
                  <i class="bi bi-cash-coin"> Cadastro Kits</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/f&i/kits_modelo" class="nav-link p-2">
                  <i class="bi bi-cash-coin"> Kits Modelo</i>
                </router-link>
              </h3>
            </div>
          </div>

          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/f&i/vendas_f&i" class="nav-link p-2">
                  <i class="bi bi-person-gear"> Vendas F&I</i>
                </router-link>
              </h3>
            </div>
          </div>         
        </div>
      </div>
    </div>

    <RodapeVue />
       </div>
   
</template>

<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import NavgatorFI from "../../components/menu/NavgatorFI.vue";
import RodapeVue from "../../components/menu/Rodape.vue";

export default {
  name: "Dashboard F&I",

  components: {
    SidebarVue,
    NavgatorFI,
    RodapeVue
  },
}
</script>
