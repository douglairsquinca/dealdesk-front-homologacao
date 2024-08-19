<template>

  <SidebarVue ref="sidebar" />
  <Navgator ref="navgator" :barraTitulo="' Administração - Dashboard'" :titulo="'dashboard'" />

  <!--Formulário de Cadastro -->

  <!-- <div class="card rf_bg_form rf_texto rf_margin"> -->
  <div class="card-container ">
    <div class="rf_bg_form rf_texto rf_margin ">
      <div class="container-fluid px-4 py-5" id="icon-grid">
        <div class="row  row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4
            g-4
            py-5
          ">
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/acessorios" class="nav-link p-2">
                  <i class="bi bi-person-gear texto"> Acessórios</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/clientes" class="nav-link p-2">
                  <i class="bi bi-person-vcard  texto"> Clientes</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/empresas" class="nav-link p-2">
                  <i class="bi bi-buildings texto"> Empresas</i>
                </router-link>
              </h3>
            </div>
          </div>

          <!-- <div class="col d-flex align-items-start">
            <div>
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/funcoes" class="nav-link p-2">
                  <i class="bi bi-person-gear"> Funções</i>
                </router-link>                
              </h3>
            </div>
          </div> -->
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/midias" class="nav-link p-2">
                  <i class="bi bi-person-gear texto"> Mídias</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/usuarios" class="nav-link p-2">
                  <i class="bi bi-person-gear texto"> Usuários</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/bancos" class="nav-link p-2">
                  <i class="bi bi-cash-coin  texto"> Bancos</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/custos_variaveis" class="nav-link p-2">
                  <i class="bi bi-cash-coin texto"> Custos Variáveis</i>
                </router-link>
              </h3>
            </div>
          </div>

          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/taxas" class="nav-link p-2">
                  <i class="bi bi-person-gear texto"> Importar Taxas</i>
                </router-link>
              </h3>
            </div>
          </div>

          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/combustiveis" class="nav-link p-2">
                  <i class="bi bi-ev-station texto"> Combustíveis</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/cor_veiculos" class="nav-link p-2">
                  <i class="bi bi-car-front-fill texto"> Cor Veículo</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/familia_veiculos" class="nav-link p-2">
                  <i class="bi bi-car-front-fill texto"> Família Veículos</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/marca_veiculos" class="nav-link p-2">
                  <i class="bi bi-car-front-fill texto"> Marca Veículos</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/modelo_veiculos" class="nav-link p-2">
                  <i class="bi bi-car-front-fill texto"> Modelo Veículos</i>
                </router-link>
              </h3>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="card-menu">
              <h3 class="fw-bold mb-0 fs-4">
                <router-link to="/admin/estoque_veiculos" class="nav-link p-2">
                  <i class="bi bi-car-front-fill texto"> Sincronizar Estoque</i>
                </router-link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <Rodape />


</template>

<script>
import UserService from "../services/user.service";
//import EventBus from "../common/EventBus";
import SidebarVue from "./menu/Sidebar.vue";
import Rodape from "./menu/Rodape.vue";
import Navgator from "./menu/Navgator.vue";

export default {
  components: {
    SidebarVue,
    Navgator,
    Rodape
  },
  data() {
    return {
      content: "",
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.currentTheme;
    },
  },
  mounted() {
    
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log("Erro de login", error)
        if (error.response && error.response.status === 403) {
          console.log("Entrei no IF")
          this.$store.dispatch("auth/logout");
          this.$router.push("/login");
        }
      }
    );
  },
};
</script>
