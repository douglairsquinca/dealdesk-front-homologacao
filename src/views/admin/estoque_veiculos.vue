<template>
  <SidebarVue ref="sidebar" />
  <Navgator ref="navgator" :barraTitulo="' Administração - Estoque de Veículos'" :titulo="'estoque'" />

  <!--Bloco do Filtro-->
  <div class="card card-filtro">
    <div class="row g-2 p-2">
      <div class="card-title rf_texto gy-4">
        <i class="bi bi-funnel fs-5 icone_filtro"><span class="texto_filtro">Filtro</span></i>
      </div>
    </div>
    <div class="row g-2 p-2">
      <div class="col-3">
        <div class="form-floating">
          <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
          <label class="rf_texto">Placa</label>
        </div>
      </div>
      <div class="col-3">
        <div class="form-floating">
          <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroChassi" @input="filtrarVeiculos" />
          <label class="rf_texto">Chassi</label>
        </div>
      </div>
      <div class="col-1">
        <div class="form-floating">
          <select class="form-select rf_bg_form rf_texto" v-model="tipoVeiculo">
            <option value="NOVO">Novo</option>
            <option value="USADO">Usado</option>
          </select>
          <label class="rf_texto">Tipo Veículo</label>

        </div>
      </div>

      <div class="col-1">
        <div class="form-floating">
          <select class="form-select rf_bg_form rf_texto" v-model="pageSize" @change="handlePageSizeChange(pageSize)">
            <option v-for="size in pageSizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
          <label class="rf_texto">Itens pág.</label>
        </div>
      </div>
      <div class="col-1">
        <div class="input-group-append">
          <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; retrieveEstoque();">
            <span class="rf_texto_btn">Pesquisar</span>
          </button>
        </div>
      </div>
      <div class="col-2">
        <div class="input-group-append">
          <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; sincronizarEstoque();">
            <span class="rf_texto_btn">Sincronizar Estoque</span>
          </button>
        </div>
      </div>
      <div class="col-2">
        <div class="input-group-append">
          <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; sincronizarEstoqueOracle();">
            <span class="rf_texto_btn">Sincronizar Estoque Oracle</span>
          </button>
        </div>
      </div>


    </div>
  </div>
  <!--Tabelas-->
  <div class="card card-tabela g-2 p-2 rf_margin">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col">Loja</th>
          <th scope="col">Tipo Veículo</th>
          <th scope="col">Marca</th>
          <th scope="col">Modelo</th>
          <th scope="col">Ano Fab.</th>
          <th scope="col">Ano Mod.</th>
          <th scope="col">Placa</th>
          <th scope="col">Chassi</th>
          <th scope="col">Combustível</th>
          <th scope="col">Cor</th>
          <th scope="col">Dias Estoque</th>

        </tr>
      </thead>
      <tbody>
        <template v-if="veiculosFiltrados.length === 0">
          <tr v-for="item in estoque" :key="item.modelo">
            <td>{{ item.codigoempresa }}</td>
            <td>{{ item.estadoveiculo }}</td>
            <td>{{ item.marca }}</td>
            <td>{{ item.modelo }}</td>
            <td>{{ item.anofabricacao }}</td>
            <td>{{ item.anomodelo }}</td>
            <td>{{ item.placa }}</td>
            <td>{{ item.chassi }}</td>
            <td>{{ item.combustivel }}</td>
            <td>{{ item.cor }}</td>
            <td>{{ item.diasestoque }}</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="item in veiculosFiltrados" :key="item.modelo">
            <td>{{ item.codigoempresa }}</td>
            <td>{{ item.estadoveiculo }}</td>
            <td>{{ item.marca }}</td>
            <td>{{ item.modelo }}</td>
            <td>{{ item.anofabricacao }}</td>
            <td>{{ item.anomodelo }}</td>
            <td>{{ item.placa }}</td>
            <td>{{ item.chassi }}</td>
            <td>{{ item.combustivel }}</td>
            <td>{{ item.cor }}</td>
            <td>{{ item.diasestoque }}</td>
          </tr>
        </template>

      </tbody>
    </table>
    <pagination v-if="estoque.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
      @change-page="handlePageChange" />
  </div>
  <div v-if="abrir_modal">
    <Message :msg="msg" v-show="msg" />
  </div>
  <RodapeVue />
</template>
<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import userService from "../../services/user.service";
import Pagination from "../../components/Pagination.vue";
import Message from "../../components/modal/Message.vue";
import TokenService from "../../services/token.service";
import jwt_decode from 'jwt-decode';
import RodapeVue from "../../components/menu/Rodape.vue";
import Navgator from "../../components/menu/Navgator.vue";

export default {
  components: {
    SidebarVue,
    Navgator,
    Pagination,
    Message,
    RodapeVue
  },
  data() {
    return {
      estoque: [],
      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,

      tipoVeiculo: "",

      //Params
      filtroPlaca: '', // Filtro para a placa
      filtroChassi: '', // Filtro para o número
      filtroCategoria: '',// Filtro para a categoria
      veiculosFiltrados: [],
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [25, 50, 75, 100],
      pageSize: 25,
      company_id: "",

    };
  },
  mounted() {
    this.getToken();
    this.retrieveEstoque();
  },
  methods: {
    getToken() {
      const accessToken = TokenService.getLocalAccessToken();

      // Obter o token de atualização (refresh token)
      TokenService.getLocalRefreshToken();

      // Obter o usuário completo (incluindo os tokens) se necessário
      TokenService.getUser();

      const decodedToken = jwt_decode(accessToken);

      this.company_id = decodedToken.company;


    },
    getStatus(status) {
      return status === 0 ? 'Desabilitado' : 'Habilitado';
    },
    getVendaFut(vendaFutura) {
      return vendaFutura === 0 ? 'Não' : 'Sim';
    },

    filtrarVeiculos() {
      // Acessar o array subjacente usando Array.from() ou spread operator
      const estoqueArray = Array.from(this.estoque); // ou const estoqueArray = [...this.estoque];

      // Verificar se ambos os filtros estão vazios
      if (!this.filtroPlaca && !this.filtroChassi) {
        // Se ambos estiverem vazios, mostrar todos os veículos
        this.veiculos = estoqueArray;
        return;
      }
      // Aplicar os filtros
      let veiculosFiltrados = estoqueArray.filter(estoque => {
        let passouFiltroPlaca = true;
        let passouFiltroNumero = true;

        // Aplicar filtro da placa, se fornecido
        if (this.filtroPlaca) {
          passouFiltroPlaca = estoque.placa.toLowerCase().includes(this.filtroPlaca.toLowerCase());
        }

        // Aplicar filtro do número, se fornecido
        if (this.filtroChassi) {
          passouFiltroNumero = estoque.chassi.toLowerCase().includes(this.filtroChassi.toLowerCase());
        }


        // Retornar verdadeiro se o veículo passar por todos os filtros
        return passouFiltroPlaca && passouFiltroNumero;
      });

      // Atualizar os dados da tabela com os veículos filtrados
      this.estoque = veiculosFiltrados;
    },

    getRequestParams(
      searchPlaca,
      searchChassi,
      tipoVeiculo,
      page,
      pageSize,
      company_id
    ) {
      let params = {};

      if (tipoVeiculo) {
        params["tipoVeiculo"] = tipoVeiculo;
      }

      if (searchPlaca) {
        params["placa"] = searchPlaca;
      }
      if (searchChassi) {
        params["chassi"] = searchChassi;
      }

      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      if (company_id) {
        params["empresa_id"] = company_id;
      }
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveEstoque();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveEstoque();
    },

    async retrieveEstoque() {
      try {
        const params = this.getRequestParams(

          this.searchPlaca,
          this.searchChassi,
          this.tipoVeiculo,
          this.page,
          this.pageSize,
          this.company_id
        );
        userService.getEstoqueVeiculo(params).then((response) => {
          const { veiculoEstoque, totalPages, totalItems } = response.data;
          this.estoque = veiculoEstoque;
          this.totalPages = totalPages;
          this.totalItems = totalItems;
          this.veiculosFiltrados = [];
          console.log(response.data);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },

    async sincronizarEstoque() {
      try {
        userService.getEstoqueSincronizar().then((response) => {
          const { message } = response.data;
          this.abrir_modal = true;
          this.msg = message;
          setTimeout(() => (this.abrir_modal = false), 4000);
          this.retrieveEstoque();

        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async sincronizarEstoqueOracle() {
      try {
        userService.getEstoqueSincronizarOracle().then((response) => {
          const { message } = response.data;
          this.abrir_modal = true;
          this.msg = message;
          setTimeout(() => (this.abrir_modal = false), 4000);
          //this.retrieveEstoque();

        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    }

  }
};
</script>
