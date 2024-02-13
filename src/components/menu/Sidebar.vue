<template>
  <nav class="navbar navbar-expand-lg navbar-dark"
    :class="{ 'header_dark': theme === 'dark', 'header_light': theme === 'light' }">
    <div class="container-fluid">
      <a class="navbar-brand logo">
        <img src="../../assets/logo.png" alt="Bootstrap" width="137" height="50" />
      </a> 

      <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
        <ul class="navbar-nav">
          <li id="rf_parametros" class="nav-item dropdown"><button class="btn btn-dark dropdown-toggle show"
              data-bs-toggle="dropdown" aria-expanded="true"> Parâmetros </button>
            <ul class="dropdown-menu dropdown-menu-dark " data-bs-popper="static">
              <li class="nav-item m-1"><a href="/admin/acessorios" class="nav-link p-2"> Acessórios </a></li>
              <li class="nav-item m-1"><a href="/admin/clientes" class="nav-link p-2"> Clientes </a></li>
              <li class="nav-item m-1"><a href="/admin/empresas" class="nav-link p-2"> Empresas </a></li>
              <li class="nav-item m-1"><a href="/admin/midias" class="nav-link p-2"> Mídias </a></li>
              <li class="nav-item m-1"><a href="/admin/usuarios" class="nav-link p-2"> Usuários </a></li>
              <li class="nav-item m-1">
                <hr class="dropdown-divider">
              </li>
              <li class="nav-item m-1"><a href="/admin/bancos" class="nav-link p-2"> Bancos </a></li>
              <li class="nav-item m-1"><a href="/admin/custos_variaveis" class="nav-link p-2"> Custos Variáveis </a></li>
              <li class="nav-item m-1"><a href="/admin/taxas" class="nav-link p-2"> Taxas </a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li class="nav-item m-1"><a href="/admin/combustiveis" class="nav-link p-2"> Combustíveis </a></li>
              <li class="nav-item m-1"><a href="/admin/cor_veiculos" class="nav-link p-2"> Cor Veículo </a></li>
              <li class="nav-item m-1"><a href="/admin/familia_veiculos" class="nav-link p-2"> Família Veículos </a></li>
              <li class="nav-item m-1"><a href="/admin/marca_veiculos" class="nav-link p-2"> Marca Veículos </a></li>
              <li class="nav-item m-1"><a href="/admin/modelo_veiculos" class="nav-link p-2"> Modelo Veículos </a></li>
              <li class="nav-item m-1"><a href="/admin/estoque_veiculos" class="nav-link p-2"> Sincronizar Estoque </a>
              </li>
              <li class="nav-item"><a href="/admin/veiculos_vendido_estoque" class="nav-link p-2"> Aguardando Faturamento
                </a></li>
              <li class="nav-item"><a href="/admin/situacao_veiculo" class="nav-link p-2"> Situação Veículo </a></li>
            </ul>
          </li>
          
          <li id="rf_atendimentos" class="nav-item dropdown"><button class="btn btn-dark dropdown-toggle"
              data-bs-toggle="dropdown" aria-expanded="false"> Atendimento </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li class="nav-item"><a href="/atendimento/dashboard" class="nav-link p-2"> Dashboard </a></li>
              <li class="nav-item"><a href="/atendimento/proposta" class="nav-link p-2"> Novo Atendimento </a></li>
            </ul>
          </li>
          <li id="rf_gerenciamento" class="nav-item dropdown"><button class="btn btn-dark dropdown-toggle"
              data-bs-toggle="dropdown" aria-expanded="false"> Gerenciamento </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li class="nav-item"><a href="/desk/index" class="nav-link p-2"> Desk </a></li>
              <li class="nav-item"><a href="/desk/reabrirProposta" class="nav-link p-2"> Reabrir Atendimentos </a></li>
              <li class="nav-item"><a href="/desk/relatorio" class="nav-link p-2"> Relatórios </a></li>
              <li class="nav-item"><a href="/desk/situacaoGeral" class="nav-link p-2"> Situação Geral </a></li>
              <li class="nav-item"><a href="/desk/vendidosEstoque" class="nav-link p-2"> Aguardando Faturamento </a></li>
            </ul>
          </li>
        </ul>
      </div>

      <div id="rf_profile" v-if="currentUser">
        <ul class="nav nav-item justify-content-end rf_texto">

          <!-- <li class="nav-item ">
            <router-link to="" id="theme-style" class="nav-link " @click="toggleTheme">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-half"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
              </svg>
              Mudar Tema
            </router-link>


          </li> -->
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
      end_logo: '@/assets/logo.png',
      theme: 'light'
    }

  },
  mounted() {
    //this.retrieveEmpresas();
    this.getToken();
    // let darkModeFromStorage = localStorage.getItem('darkMode');
    // this.darkMode = darkModeFromStorage ? darkModeFromStorage === 'true' : false;
    // document.getElementById('theme-style').href = this.darkMode ? '../../assets/styles/light-theme.css' : '../../assets/styles/dark-theme.css';
    // this.logo()
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
        this.theme = 'light'
        console.log("Usar logo claro");
      } else {
        console.log("Usar logo Escuro");
        this.theme = 'dark'
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
