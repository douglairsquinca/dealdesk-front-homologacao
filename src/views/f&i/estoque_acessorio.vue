<template>
  <SidebarVue ref="sidebar" />
  <NavgatorFI
    ref="navgator"
    :barraTitulo="' F&I - Estoque Acessórios'"
    :titulo="'estoque'"
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
      <div class="col-1">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroCodigo"
           
          />
          <label class="rf_texto">Código</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroDescricao"
           
          />
          <label class="rf_texto">Descrição</label>
        </div>
      </div>
      <div class="col-2">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroEmpresa"
           
          />
          <label class="rf_texto">Empresa</label>
        </div>
      </div>
      
      <div class="col-1">
        <div class="form-floating">
          <select
            class="form-select rf_bg_form rf_texto"
            v-model="pageSize"
            @change="handlePageSizeChange(pageSize)"
          >
            <option v-for="size in pageSizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
          <label class="rf_texto">Itens pág.</label>
        </div>
      </div>
      <div class="col-1">
        <div class="input-group-append">
          <button
            class="btn btn-lg btn-filtro"
            type="button"
            @click="
              page = 1;
              listar_estoque_acessorios();
            "
          >
          <i class="bi bi-search texto_filtro_btn"></i>
          </button>
        </div>
      </div>

      <div class="col-1">
        <div class="input-group-append">
          <button
            class="btn btn-lg btn-filtro"
            type="button"
            @click="
              page = 1;
              sincronizar_estoque();
            "
          >
            <i class="bi bi-arrow-repeat texto_filtro_btn"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="card card-tabela">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Descrição</th>
          <th scope="col">Empresa</th>
          <th scope="col">Saldo Disponível</th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="item in estoque_pecas"
            :key="item.codigo_mercadoria"
            class="table-linha"
          >
            <td>{{ item.codigo_mercadoria }}</td>
            <td>{{ item.descricao_mercadoria }}</td>
            <td>{{ item.empresa_reduzida }}</td>
            <td>{{ item.total_saldo_disponivel }}</td>
          </tr>
      </tbody>
    </table>
    <pagination
      v-if="estoque_pecas.length"
      :offset="totalPages"
      :total="totalItems"
      :limit="pageSize"
      @change-page="handlePageChange"
    />
  </div>

  <RodapeVue />
</template>

<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import NavgatorFI from "../../components/menu/NavgatorFI.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import axios from "axios";
import Pagination from "../../components/Pagination.vue";
//import Message from "../../components/modal/Message.vue";

export default {
  name: "Dashboard F&I",

  components: {
    SidebarVue,
    NavgatorFI,
    Pagination,
    //Message,
    RodapeVue,
  },
  data() {
    return {
      estoque_pecas: [],
      //filtro
      filtroCodigo: "",
      filtroDescricao: "",
      filtroEmpresa: "",
      saldo_disponivel: "",
      estoqueFiltrados: [],

      //Parametros
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 50,

      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,
      dialog: false,
    };
  },
  mounted() {
    this.listar_estoque_acessorios();
  },
  methods: {
    //Parametros
    getRequestParams(filtroCodigo, filtroDescricao, filtroEmpresa, page, pageSize) {
      let params = {};
      if (filtroCodigo ) {
        params["codigo_mercadoria"] = filtroCodigo;
      }
      if (filtroDescricao ) {
        params["descricao_mercadoria"] = filtroDescricao;
      }
      if (filtroEmpresa ) {
        params["empresa_reduzida"] = filtroEmpresa;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.listar_estoque_acessorios();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.listar_estoque_acessorios();
    },
    async sincronizar_estoque() {
      try {
        const params = this.getRequestParams(this.page, this.pageSize);
        const itens_estoque = await axios.get(
          `${process.env.VUE_APP_API_URL}estoque_acessorios`,
          { params }
        );
        console.log("Listar peças em estoque", itens_estoque);
      } catch (error) {
        console.log("Erro ao sincronizar o estoque", error);
      }
    },
    async listar_estoque_acessorios() {
      try {
        const params = this.getRequestParams(this.filtroCodigo,this.filtroDescricao, this.filtroEmpresa, this.page, this.pageSize);
        const itens_estoque = await axios.get(
          `${process.env.VUE_APP_API_URL}listar_acessorios`,
          { params }
        );
        this.estoque_pecas = itens_estoque.data.estoqueAcessorios;
        this.totalPages = itens_estoque.data.totalPages;
        this.totalItems = itens_estoque.data.totalItems;
        console.log("Listar peças em estoque", itens_estoque);
      } catch (error) {
        console.log("Erro ao listar peças em estoque", error);
      }
    },
 
  },
};
</script>
