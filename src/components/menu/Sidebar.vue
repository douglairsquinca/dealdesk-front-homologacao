<template>
  <nav class="navbar navbar-expand-lg nav-container"
    :class="{ 'header_dark': theme === 'dark', 'header_light': theme === 'light' }">
    <div class="container-fluid">
      <a class="navbar-brand">
        <img src="../../assets/logo.png" alt="Deal Desk" class="logo" />
      </a>

      <div class="collapse navbar-collapse " id="navbarNavDarkDropdown">
        <ul class="navbar-nav">
          <li id="rf_parametros" class="nav-item dropdown">
            <button @click="setActive('parametros')"
              :class="{ 'btn': true, 'btn-menu': true, 'btn-active': active === 'parametros' }" class="dropdown-toggle"
              data-bs-toggle="dropdown" aria-expanded="true"> Parâmetros </button>
            <ul class="dropdown-menu dropdown-menu-dark " data-bs-popper="static">
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/acessorios" class="nav-link p-2">
                  Acessórios </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/clientes" class="nav-link p-2">
                  Clientes </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/empresas" class="nav-link p-2">
                  Empresas </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/midias" class="nav-link p-2">
                  Mídias </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/usuarios" class="nav-link p-2">
                  Usuários </a></li>
              <li class="nav-item m-1">
                <hr class="dropdown-divider">
              </li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/bancos" class="nav-link p-2">
                  Bancos </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/custos_variaveis"
                  class="nav-link p-2"> Custos Variáveis </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/taxas" class="nav-link p-2"> Taxas
                </a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/combustiveis"
                  class="nav-link p-2"> Combustíveis </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/cor_veiculos"
                  class="nav-link p-2"> Cor Veículo </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/familia_veiculos"
                  class="nav-link p-2"> Família Veículos </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/marca_veiculos"
                  class="nav-link p-2"> Marca Veículos </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/modelo_veiculos"
                  class="nav-link p-2"> Modelo Veículos </a></li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/estoque_veiculos"
                  class="nav-link p-2"> Sincronizar Estoque </a>
              </li>
              <li class="nav-item m-1"><a @click="setActive('parametros')" href="/admin/tipo_pagamento"
                  class="nav-link p-2"> Tipo Pagamento</a>
              </li>
              <li class="nav-item"><a @click="setActive('parametros')" href="/admin/veiculos_vendido_estoque"
                  class="nav-link p-2"> Aguardando Faturamento
                </a>
              </li>
              <li class="nav-item"><a @click="setActive('parametros')" href="/admin/veiculos_reserva"
                  class="nav-link p-2"> Veículos com Reserva
                </a>
              </li>
              <!-- <li class="nav-item"><a href="/admin/situacao_veiculo" class="nav-link p-2"> Situação Veículo </a></li> -->
            </ul>
          </li>

          <li id="rf_atendimentos" class="nav-item dropdown">
            <button @click="setActive('atendimentos')"
              :class="{ 'btn': true, 'btn-menu': true, 'btn-active': active === 'atendimentos' }" class="dropdown-toggle"
              data-bs-toggle="dropdown" aria-expanded="true"> Atendimento </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li class="nav-item"><a @click="setActive('atendimentos')" href="/atendimento/dashboard"
                  class="nav-link p-2"> Dashboard </a></li>
              <li class="nav-item"><a @click="setActive('atendimentos')" href="/atendimento/proposta"
                  class="nav-link p-2"> Novo Atendimento </a></li>
            </ul>
          </li>
          <li id="rf_gerenciamento" class="nav-item dropdown"><button @click="setActive('gerenciamentos')"
              :class="{ 'btn': true, 'btn-menu': true, 'btn-active': active === 'gerenciamentos' }"
              class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"> Gerenciamento </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li class="nav-item"><a @click="setActive('gerenciamentos')" href="/desk/index" class="nav-link p-2"> Desk
                </a></li>
              <li class="nav-item"><a @click="setActive('gerenciamentos')" href="/desk/reabrirProposta"
                  class="nav-link p-2"> Reabrir Atendimentos </a></li>
              <!-- <li class="nav-item"><a @click="setActive('gerenciamentos')" href="/desk/relatorio" class="nav-link p-2">
                  Relatórios </a></li>
              <li class="nav-item"><a @click="setActive('gerenciamentos')" href="/desk/situacaoGeral"
                  class="nav-link p-2"> Situação Geral </a></li> -->
              <li class="nav-item"><a @click="setActive('gerenciamentos')" href="/desk/vendidosEstoque"
                  class="nav-link p-2"> Aguardando Faturamento </a></li>
            </ul>
          </li>
          <li id="rf_f&i" class="nav-item dropdown"><button @click="setActive('f&i')"
              :class="{ 'btn': true, 'btn-menu': true, 'btn-active': active === 'f&i' }" class="dropdown-toggle"
              data-bs-toggle="dropdown" aria-expanded="true"> F&I </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/index" class="nav-link p-2"> Dashboard </a></li>
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/modelos_fei" class="nav-link p-2"> Modelo F&I Estoque </a></li>
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/estoque_acessorio" class="nav-link p-2"> Estoque Acessórios </a></li>
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/cadastro_acessorio" class="nav-link p-2"> Cadastro Acessórios </a></li>
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/cadastro_pacotes" class="nav-link p-2"> Cadastro Pacotes </a></li>
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/cadastro_revisao" class="nav-link p-2"> Cadastro Revisão </a></li>
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/cadastro_seguro" class="nav-link p-2"> Cadastro Seguro </a></li>
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/cadastro_kits" class="nav-link p-2"> Cadastro Kits </a></li>
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/kits_modelo" class="nav-link p-2"> Kits Modelo </a></li>
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/vendas_f&i" class="nav-link p-2"> Vendas F&I </a></li>
              <li class="nav-item"><a @click="setActive('f&i')" href="/f&i/reabrir_atendimento" class="nav-link p-2"> Reabrir Atendimento </a></li>
            </ul>
          </li>
          <li id="rf_relatorios" class="nav-item dropdown">
            <button @click="setActive('relatorios')"
                    :class="{ 'btn': true, 'btn-menu': true, 'btn-active': active === 'relatorios' }"
                    class="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="true">
              Relatórios Desk
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">        
              <li class="nav-item"><a @click="setActive('gerenciamentos')" href="/desk/relatorio" class="nav-link p-2">
                 Fluxo de Lojas </a></li>
              <li class="nav-item"><a @click="setActive('gerenciamentos')" href="/desk/situacaoGeral"
                  class="nav-link p-2"> Situação Geral </a></li>
            </ul>
          </li>
          <li id="rf_relatorios_fei" class="nav-item dropdown">
            <button @click="setActive('relatorios_fei')"
                    :class="{ 'btn': true, 'btn-menu': true, 'btn-active': active === 'relatorios_fei' }"
                    class="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="true">
              Relatórios F&I
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">        
              <li class="nav-item"><a @click="setActive('relatorios_fei')" href="/f&i/fluxo_lojas" class="nav-link p-2">
                 Fluxo de Lojas </a></li>
              
            </ul>
          </li>

        </ul>
      </div>

      <div id="rf_profile" v-if="currentUser">
    <ul class="nav nav-item justify-content-end">
      <!-- Botão 1 -->
      <li class="nav-item dropdown">
        <button class="dropdown-toggle-icon" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-brightness-high"></i>
        </button>
      </li>
      <!-- Botão 2 -->
      <li class="nav-item dropdown">
        <button class="dropdown-toggle-icon" data-bs-toggle="dropdown" aria-expanded="true">
          <i class="bi bi-shop"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end rf-dropdown-menu rf-profile-dropdown-menu">
          <!-- Conteúdo do dropdown -->
          <li class="nav-item">
            <router-link to="" class="nav-link">
              <font-awesome-icon icon="user" />
              {{ empresaPrincipal.nome }}
            </router-link>
          </li>
        </ul>
      </li>
      <!-- Botão 3 -->
      <li class="nav-item dropdown">
        <button class="dropdown-toggle-icon" data-bs-toggle="dropdown" aria-expanded="true">
          <i class="bi bi-person-circle"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end rf-dropdown-menu rf-profile-dropdown-menu">
          <!-- Conteúdo do dropdown -->
          <li class="nav-item ">
            <router-link to="/profile" class="nav-link">
              <div class="rf-profile-content">
                <font-awesome-icon icon="user" style="margin-right: 5px;" /> 
                {{ currentUser.username }}
              </div>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link " @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" /> Sair
            </a>
          </li>
        </ul>
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
      theme: 'light',
      active: null
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
  created() {
    // Recuperar o estado do botão ativo do armazenamento local ao carregar a página
    this.active = localStorage.getItem('activeMenu') || null;
  },
  methods: {
    setActive(section) {
      this.active = section;
      // Atualizar o estado do botão ativo no armazenamento local
      localStorage.setItem('activeMenu', section);
      // Fechar o dropdown após clicar em um item da lista
      const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
      dropdownToggles.forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
    },
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
