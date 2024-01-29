<template>
    <div>
      <SidebarVue />
      <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
        <div class="container-fluid">
          <div><i class="bi bi-sliders fs-5"> Administração - Estoque de Veículo </i></div>
          <div>
            <ul class="nav justify-content-end">
              <li class="nav-item">
                <router-link class="nav-link rf_texto active" to="/admin">Dashboard /</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link rf_texto disabled">Estoque</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="card rf_bg_form rf_margin">
        <div v-if="abrir_modal">
          <Message :msg="msg" v-show="msg" />
        </div>
        <div class="row g-2 p-2">
            <div class="card-title rf_texto gy-4">
              <i class="bi bi-person-fill-add fs-5"> Filtros </i>
            </div>
        </div>
        <div class="row g-2 p-2">
          <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchTitle" />
                <label class="rf_texto">Pesquisar</label>
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
              <button class="btn btn-lg btn-secondary mt-2" type="button" @click="page = 1; retrieveEstoque();">
                Pesquisar
              </button>
            </div>
          </div>
          <div class="col-2">
            <div class="input-group-append">
              <button class="btn btn-lg btn-secondary mt-2" type="button" @click="page = 1; sincronizarEstoque();">
                Sincronizar Estoque
              </button>
            </div>
          </div>
  
        
        </div>
      </div>
      <!--Tabelas-->
      <div class="card rf_bg_form  rf_margin">
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
            <tr v-for="item in estoque" :key="item.modelo">
              <td>{{ item.codigoempresa}}</td>
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
          </tbody>
        </table>
        <pagination v-if="estoque.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
          @change-page="handlePageChange" />
      </div>   
      <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3"></ul>
        <p class="text-center rf_texto">© 2023 Rfmobi Solution</p>
      </footer>
    </div>
  </template>
  <script>
  import SidebarVue from "../../components/menu/Sidebar.vue";
  import userService from "../../services/user.service";
  import Pagination from "../../components/Pagination.vue";
  import Message from "../../components/modal/Message.vue";
  import TokenService from "../../services/token.service";
  import jwt_decode from 'jwt-decode';

  export default {
    components: {
      SidebarVue,
      Pagination,
      Message
    },
    data() {
      return {
        estoque: [],    
        //Mensagens do Sistema
        msg: null,
        abrir_modal: false, 
     
        tipoVeiculo: "", 
   
        //Params
        searchTitle: "",
        page: 1,
        totalPages: 0,
        totalItems: 0,
        pageSizes: [25, 50, 75, 100],
        pageSize: 25,
        company_id:"",
  
      };
    },
    mounted() {
      this.getToken();
      this.retrieveEstoque();
    },
    methods: {  
      getToken(){
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
 
      //Buscar dados no banco de dados
      // getRequestParams(searchTitle, page, pageSize, tipoVeiculo) {
      //   let params = {};
      //   if (searchTitle) {
      //     params["nome"] = searchTitle;
      //   }
      //   if (page) {
      //     params["page"] = page - 1;
      //   }
      //   if (pageSize) {
      //     params["size"] = pageSize;
      //   }
      //   if (tipoVeiculo) {
      //     params["tipoVeiculo"] = tipoVeiculo;
      //   }
     
      //   return params;
      // },
      getRequestParams(
      searchTitle,
      tipoVeiculo,
      page,
      pageSize,
      company_id
    ) {
      let params = {};
      
      if (tipoVeiculo) {
        params["tipoVeiculo"] = tipoVeiculo;
      }
      if (searchTitle) {
        params["nome"] = searchTitle;
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
          this.searchTitle,  
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
            console.log(response.data);
          });
        } catch (error) {
          if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
      }
        }
      },
     
      async sincronizarEstoque(){
        try {      
          userService.getEstoqueSincronizar().then((response) => {
            const {message } = response.data;           
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
      }
  
    }
  };
  </script>
    
  <style>
  @import "../../assets/styles/rfCss.css";
  </style>