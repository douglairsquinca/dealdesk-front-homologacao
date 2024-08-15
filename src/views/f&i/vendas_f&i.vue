<template>
  <SidebarVue ref="sidebar" />
  <NavgatorFI
    ref="navgator"
    :barraTitulo="' F&I - Vendas'"
    :titulo="'vendas'"
  />

  <!--Bloco do Filtro-->
  <div class="card card-filtro"> 
    <div class="row g-2 p-2">
      <div class="card-title gy-4">
        <i class="bi bi-funnel fs-5 icone_filtro"
          ><span class="texto_filtro">Filtro</span></i
        >
      </div>
    </div>
    <div class="row g-2 p-2">
      <div class="col-2">
        <div class="d-flex justify-content-between mb-3">
          <select
            class="form-select rf_bg_form rf_texto"
            v-model="selectedFilter"
            @change="filtrarPropostas()"
          >
            <option value="">Selecione um filtro</option>
            <option value="Dia">Diário</option>
            <option value="Todos">Todos</option>
            <option value="Em Atendimento">Em Atendimento</option>
            <option value="Venda Finalizada">Venda Finalizada</option>
            <option value="Venda Perdida">Venda Perdida</option>
            <option value="Pesquisar por Período">Pesquisar por Período</option>
          </select>
        </div>
      </div>
      <div v-if="selectedFilter === 'Pesquisar por Período'">
        <div class="input-group">
          <input type="date" class="form-control" v-model="startDate" />
          <span class="input-group-text">até</span>
          <input type="date" class="form-control" v-model="endDate" />
          <button class="btn btn-secondary" @click="filterByPeriod">
            Filtrar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="card card-tabela g-2 p-2 rf_margin">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col">Nº Atendimento</th>
          <th scope="col">Vendedor</th>
          <th scope="col">Cliente</th>
          <th scope="col">Veículo</th>
          <th scope="col">Data</th>
          <th scope="col">Status</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in vendas" :key="item.id" class="table-linha"
        :class="
          item.status === 'Em Atendimento'
              ? css
              : item.status === 'Aguardando Atendimento'
              ? css1
              : item.status === 'Venda Finalizada'
              ? css2
              : item.status === 'Venda Perdida'
              ? css3              
              : ''
          ">
          <td class="rf_header_table">{{ item.atendimento_id }}</td>
          <td class="rf_header_table">{{ item.pos_venda_proposta.vendedores.username }}</td>
          <td class="rf_header_table">{{ item.pos_venda_proposta.clientes.nome }}</td>
          <td class="rf_header_table">{{ item.pos_venda_proposta.proposta_veiculo.modelo_veiculo }}</td>
          <td class="rf_header_table">{{ this.formatarData(item.createdAt) }}</td>
          <td class="rf_header_table">{{ item.status }}</td>
          <td>
            <!-- <button
              type="button"
              class="dropdown-toggle-icon"
              v-bind:disabled="
                item.status === 'Venda Finalizada' || item.status === 'Venda Perdida'
              "
            >
              
              <router-link
                class="nav-link active"
                :to="`/f&i/vendas_fei_detalhe/${item.id}`"
              >
              <i class="bi bi bi-basket"></i>
              </router-link>
            </button> -->
            <button
              type="button"
              class="btn-desk p-1"
              v-bind:disabled="
                item.status === 'Venda Finalizada' ||
                item.status === 'Venda Perdida'
              "
            >
              <router-link
                class="nav-link active"
                 :to="`/f&i/vendas_fei_detalhe/${item.id}`"
              >
              <i class="bi bi bi-basket"></i>
              </router-link>
            </button>
            <button
              type="button"
              class="btn-desk"
              v-bind:disabled="
                item.status === 'Aguardando' ||
                item.status === 'Em Atendimento' 
                
              "
            >
              <router-link
                class="nav-link active"
                :to="`/f&i/reimprimirMenu/${item.id}`"
              >
                <i class="bi bi-printer"></i>
              </router-link>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pagination
        v-if="vendas.length"
        :offset="totalPages"
        :total="totalItems"
        :limit="pageSize"
        @change-page="handlePageChange"
      /> -->
  </div>
  <RodapeVue />
</template>
<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
//import userService from "../../services/user.service";
import NavgatorFI from "../../components/menu/NavgatorFI.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import axios from "axios";
import TokenService from "../../services/token.service";
import jwt_decode from "jwt-decode";
//import Pagination from "../../components/Pagination.vue";


export default {
  name: "Dashboard F&I",

  components: {
    SidebarVue,
    NavgatorFI,
    RodapeVue,


  },
  data() {
    return {
      modal_fi: false,
      selectedFilter: "",    

      vendas: [],

      sortColumn: "", // Coluna atualmente classificada
      sortOrder: 1,
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 50,
      company_id: "",
      user_log: "",
      msg: "",
      abrir_modal: false,
      css: null,
      css1: null,
      css2: null,
      css3: null,
      css4: null,

     
    };
  },

  mounted() {
    this.getToken();
    this.retrievePropostas();
    this.status();
  },
  methods: {
    status(){
      this.css = "cor_fei_em_atendimento";
      this.css1 = "cor_fei_aguardando_atendimento";
      this.css2 = "cor_fei_venda_finalizada";
      this.css3 = "cor_fei_venda_perdida";
    },
    formatarData(item){
      const createdAtDate = new Date(item);
      const formattedCreatedAt = `${createdAtDate.getDate()}/${
        createdAtDate.getMonth() + 1
      }/${createdAtDate.getFullYear()}`;
      return formattedCreatedAt;
    },
    getToken() {
      const accessToken = TokenService.getLocalAccessToken();
      TokenService.getLocalRefreshToken();
      const user_log = TokenService.getUser();
      const decodedToken = jwt_decode(accessToken);
      this.company_id = decodedToken.company;
      this.user_log = user_log.id;
    },

    filtrarPropostas() {
      if (this.selectedFilter === "Em Atendimento") {
        // console.log("Filtar propostas em atendimento! ------------------------------------------------------------------------------------------------------------------ 0005")
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
      } else if (this.selectedFilter === "Venda Finalizada") {
        // console.log("Filtar propostas em Finalizadas! ------------------------------------------------------------------------------------------------------------------ 0006")
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
      } else if (this.selectedFilter === "Venda Perdida") {
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas perdiadas! ------------------------------------------------------------------------------------------------------------------ 0007")
      } else if (this.selectedFilter === "Todos") {
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas perdiadas! ------------------------------------------------------------------------------------------------------------------ 0007")
      } else if (this.selectedFilter === "Dia") {
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas
      }
    },
    filterByPeriod() {
      this.data_ini = this.startDate;
      this.data_fim = this.endDate;
      this.status_proposta = "Pesquisa Periodo";
      this.retrievePropostas();
    },
    getRequestParamsProposta(
      searchProposta,
      page,
      pageSize,
      empresa_id,
      status_proposta,
      data_ini,
      data_fim,
      tipo_veiculo
    ) {
      let params = {};
      if (searchProposta) {
        params["nome"] = searchProposta;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      if (empresa_id) {
        params["empresa_id"] = empresa_id;
      }
      if (status_proposta) {
        params["status_proposta"] = status_proposta;
      }
      if (data_ini) {
        params["data_ini"] = data_ini;
      }
      if (data_fim) {
        params["data_fim"] = data_fim;
      }
      if (tipo_veiculo) {
        params["tipo_veiculo"] = tipo_veiculo;
      }

      return params;
    },
    handlePageChangeProposta(value) {
      this.page = value;
      this.retrievePropostas();
    },
    handlePageSizeChangeProposta(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrievePropostas();
    },
    async retrievePropostas() {
      try {
        const params = this.getRequestParamsProposta(
          this.searchProposta,
          this.page,
          this.pageSize,
          this.company_id,
          this.status_proposta,
          this.data_ini,
          this.data_fim,
          this.tipo_veiculo
        );
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}listar_pos_venda`,
          {
            params
          }
        );

        console.log("Lista de propostas", response.data);
        // Faça algo com os dados aqui, como atribuir a uma variável de componente
        this.vendas = response.data.vendas; // exemplo de atribuição
        this.totalPages = response.data.totalPages;
        this.totalItems = response.data.totalItems;
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },   

  },
};
</script>
