<template>
  <nav class="navbar navbar-expand-lg navbar-dark ">
    <div class="container-fluid">
      <a class="navbar-brand logo">
        <img :src="end_logo"  alt="Bootstrap" width="137" height="50" />
      </a>

      <button class="navbar-toggler" style="margin-left: 2rem" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">

        <ul class="navbar-nav">
         
          <li id="rf_parametros" class="nav-item dropdown">
            <button v-if="showAdminBoard" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
              aria-expanded="false">
              <!--Colocar um icone aqui-->
              Parâmetros
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li class="nav-item m-1">
                <router-link :to="{ name: 'acessorios' }" class="nav-link p-2">
                  <!-- <font-awesome-icon icon="user" /> -->
                  Acessórios
                </router-link>
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/clientes" class="nav-link p-2">
                  <!-- <font-awesome-icon icon="user" /> -->
                  Clientes
                </router-link>
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/empresas" class="nav-link p-2">
                  <!-- <font-awesome-icon icon="user" /> -->
                  Empresas
                </router-link>
              </li>

              <li class="nav-item m-1">
                <router-link to="/admin/midias" class="nav-link p-2">
                  <!-- <font-awesome-icon icon="user" /> -->
                  Mídias
                </router-link>
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/usuarios" class="nav-link p-2">
                  <!-- <font-awesome-icon icon="user" /> -->
                  Usuários
                </router-link>
              </li>

              <li class="nav-item m-1">
                <hr class="dropdown-divider" />
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/bancos" class="nav-link p-2">
                  <!-- <font-awesome-icon icon="user" /> -->
                  Bancos
                </router-link>
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/custos_variaveis" class="nav-link p-2">
                  <!-- <font-awesome-icon icon="user" /> -->
                  Custos Variáveis
                </router-link>
              </li>

              <li class="nav-item m-1">
                <router-link to="/admin/taxas" class="nav-link p-2">
                  Taxas
                </router-link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/combustiveis" class="nav-link p-2">
                  Combustíveis
                </router-link>
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/cor_veiculos" class="nav-link p-2">
                  Cor Veículo
                </router-link>
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/familia_veiculos" class="nav-link p-2">
                  Família Veículos
                </router-link>
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/marca_veiculos" class="nav-link p-2">
                  Marca Veículos
                </router-link>
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/modelo_veiculos" class="nav-link p-2">
                  Modelo Veículos
                </router-link>
              </li>
              <li class="nav-item m-1">
                <router-link to="/admin/estoque_veiculos" class="nav-link p-2">
                  Sincronizar Estoque
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/veiculos_vendido_estoque" class="nav-link p-2">
                  Aguardando Faturamento
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/situacao_veiculo" class="nav-link p-2">
                  Situação Veículo
                </router-link>
              </li>
            </ul>
          </li>
          <li id="rf_atendimentos" class="nav-item dropdown">
            <button v-if="showAtendimentoBoard" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
              aria-expanded="false">
              Atendimento
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li class="nav-item">
                <router-link to="/atendimento/dashboard" class="nav-link p-2">
                  Dashboard
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/atendimento/proposta" class="nav-link p-2">
                  Novo Atendimento
                </router-link>
              </li>
            </ul>
          </li>
          <li id="rf_gerenciamento" class="nav-item dropdown">
            <button v-if="showModeratorBoard" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
              aria-expanded="false">
              Gerenciamento
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li class="nav-item">
                <router-link to="/desk/index" class="nav-link p-2">
                  Desk
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/desk/reabrirProposta" class="nav-link p-2">
                  Reabrir Proposta
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/desk/relatorio" class="nav-link p-2">
                  Relatórios
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/desk/situacaoGeral" class="nav-link p-2">
                  Situação Geral
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/desk/vendidosEstoque" class="nav-link p-2">
                  Aguardando Faturamento
                </router-link>
              </li>
              

            </ul>
          </li>
          
        </ul>
      </div>
      <div id="rf_profile" v-if="currentUser">
        <ul class="nav nav-item justify-content-end rf_texto">

          <li class="nav-item ">
            <router-link to="" id="theme-style" class="nav-link " @click="toggleTheme">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-half"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
              </svg>
              Mudar Tema
            </router-link>


          </li>
          <li class="nav-item ">
            <router-link to="" class="nav-link ">
              <font-awesome-icon icon="user" />
              {{ empresaPrincipal.nome }}
            </router-link>

          </li>
          <li class="nav-item ">
            <router-link to="/profile" class="nav-link rf_texto">
              <font-awesome-icon icon="user" />
              {{ currentUser.username }}
            </router-link>
          </li>
          <li class="nav-item ">
            <a class="nav-link rf_texto" @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" /> Sair
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import userService from "../../services/user.service";
import TokenService from "../../services/token.service";
import jwt_decode from 'jwt-decode';


export default {
  data() {
    return {
      selectedEmpresa: null,
      optionsEmpresa: [],
      empresaPrincipal: { id: null, nome: '' },
      usuario: [],
      dados_user: "",
      company_id: "",
      darkMode: false,
      end_logo:""
    }

  },
  mounted() {
    //this.retrieveEmpresas();
    this.getToken();
    let darkModeFromStorage = localStorage.getItem('darkMode');
    this.darkMode = darkModeFromStorage ? darkModeFromStorage === 'true' : false;
    document.getElementById('theme-style').href = this.darkMode ? '../../assets/styles/light-theme.css' : '../../assets/styles/dark-theme.css';
    this.logo()
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    showAdminBoard() {
      if (this.currentUser && this.currentUser["funcoes"]) {
        return this.currentUser["funcoes"].includes("Função: ADMINISTRADOR");
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser["funcoes"]) {
        return this.currentUser["funcoes"].includes("Função: GERENTE");
      }

      return false;
    },
    showAtendimentoBoard() {
      if (this.currentUser && this.currentUser["funcoes"]) {
        return this.currentUser["funcoes"].includes("Função: RECEPÇÃO");
      }

      return false;
    },
  },
  methods: {
    toggleTheme() {
      this.darkMode = !this.darkMode;
      document.getElementById('theme-style').href = this.darkMode ? '../../assets/styles/light-theme.css' : '../../assets/styles/dark-theme.css';
      console.log(this.darkMode);
      localStorage.setItem('darkMode', this.darkMode.toString());
      this.logo()
    },
    logo() {
      if (this.darkMode) {
        this.end_logo = require('@/assets/logo.png');
        console.log("Usar logo claro");
      } else {
        console.log("Usar logo Escuro");
        this.end_logo = require('@/assets/logo_branco.png');
      }
    },
    getToken() {
      const accessToken = TokenService.getLocalAccessToken();

      // Obter o token de atualização (refresh token)
      TokenService.getLocalRefreshToken();

      // Obter o usuário completo (incluindo os tokens) se necessário
      TokenService.getUser();

      const decodedToken = jwt_decode(accessToken);

      this.company_id = decodedToken.company;
      this.retrieveEmpresas(this.company_id);

    },
    retrieveEmpresas(company_id) {
      userService.getEmpresaId(company_id).then((response) => {
        const dados = response.data;
        console.log(this.currentUser);
        this.empresaPrincipal = { id: dados.id, nome: dados.nome }
      }).catch((error) => {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      })

      // userService.getUserId(this.currentUser.id).then((response) =>{
      //   const dados = response.data;
      //   console.log(dados);
      //   const empresa_id = response.data.empresa_id;
      //   this.empresa = dados.empresa.find(empresa => empresa.id === empresa_id);     

      //   this.empresaPrincipal = {id:this.empresa.id, nome: this.empresa.nome}

      // })


      // this.selectedEmpresa = this.currentUser.empresas[0].nome,
      // this.optionsEmpresa = this.currentUser.empresas
      // this.empresaPrincipal = {id:this.currentUser.empresas[0].id, nome: this.currentUser.empresas[0].nome}
      //this.empresaPrincipal = {id:this.empresa.id, nome: this.empresa.nome}
    },



    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
