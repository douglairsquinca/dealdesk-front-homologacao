<template>
    <SidebarVue ref="sidebar" />
  <Navgator ref="navgator" :barraTitulo="' Administração - Cor Veículo'" :titulo="'cor'" />

    <!--Formulário de Cadastro -->

    <div class="card card-filtro">
      <form @submit.prevent="onSubmit" class="needs-validation" novalidate="true">
        <div class="row g-2 p-2">
          <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Cadastrar Cor</span></i>
        </div>
        </div>
        <div class="row g-2 p-2">
          <!--Descrição-->
          <div class="col-md-4">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="descricao" id="valid_descricao"
                required />
              <label for="valid_cnpj" class="rf_texto">Descrição</label>
              <div class="invalid-feedback">O campo CNPJ é obrigatório!</div>
            </div>
          </div>
          <!--Status-->
          <div class="col-md-3">
            <div class="form-floating">
              <select class="form-select rf_bg_form rf_texto" v-model="status" id="valid_status" required>
                <option value="0">Desabilitado</option>
                <option value="1">Habilitado</option>
              </select>
              <label for="valid_status" class="rf_texto">Status</label>
              <div class="invalid-feedback">
                Selecione um status, esse campo é obrigatório!
              </div>
            </div>
          </div>
          <div class="col-md-2 p-2">
            <div class="form-floating">
              <button type="submit" :disabled="btn_cadastrar" class="btn btn-lg btn-filtro">
                <span class="rf_texto_btn">Cadastrar</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div v-if="abrir_modal">
        <Message :msg="msg" v-show="msg" />
      </div>
    </div>
      <!--Bloco do Filtro-->
    <div class="card card-filtro">
      <div class="row g-2 p-2">
        <div class="card-title rf_texto gy-4">
        <i class="bi bi-funnel fs-5 icone_filtro"><span class="texto_filtro">Filtro</span></i>
      </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col-4">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchTitle" />
            <label class="rf_texto">Descrição</label>
          </div>
        </div> 
        
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="searchStatus">
              <option value="">------</option>
              <option value="0">Desabilitado</option>
              <option value="1">Habilitado</option>
            </select>
            <label class="rf_texto">Status</label>
          </div>
        </div>       
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="pageSize" @change="handlePageSizeChange(pageSize)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
            <label class="rf_texto">Itens Pág.</label>
          </div>
        </div>
        <div class="col-1">
          <div class="input-group-append">
            <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; retrieveCores();">
              <span class="rf_texto_btn">Pesquisar</span>
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
            <th scope="col">Descrição</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cores" :key="item.descricao" class="table-linha">
            <td>{{ item.descricao }}</td>
            <td>{{ getStatus(item.status) }}</td>
            <td>
              <button type="button" class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_cor(item)">
                <i class="bi bi-pencil-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination v-if="cores.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
        @change-page="handlePageChange" />
    </div>

    <!-- Modal para edição -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content card-container rf_texto">
          <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-pencil-square fs-5 icone_kit"><span class="texto_kit">Editar Cor</span></i>
          </div>
          <button class="btn btn-modal btn-lg p-1 mt-1" type="button" data-bs-target="#ModalProposta"
            data-bs-toggle="modal" aria-label="Close"> Sair </button>
        </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_descricao"
                    id="valid_descricao" required />
                  <label for="valid_descricao" class="rf_texto">Descrição</label>
                  <div class="invalid-feedback">
                    O campo Descrição é obrigatório!
                  </div>
                </div>
              </div>
              <!--Status-->
              <div class="col-md-3">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="edit_status" id="valid_status" required>
                    <option value="0">Desabilitado</option>
                    <option value="1">Habilitado</option>
                  </select>
                  <label for="valid_status" class="rf_texto">Status</label>
                  <div class="invalid-feedback">
                    Selecione um status, esse campo é obrigatório!
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">   
            <button type="button" @click="update()" data-bs-dismiss="modal" class="btn btn-modal btn-lg p-1 mt-1">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Button trigger modal -->

    <RodapeVue />
</template>
<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import axios from "axios";
//import DataService from "../../services/DataService";
import userService from "../../services/user.service";
import Pagination from "../../components/Pagination.vue";
import Message from "../../components/modal/Message.vue";
import RodapeVue from "../../components/menu/Rodape.vue";

export default {
  name: "Usuários",
  components: {
    SidebarVue,
    Pagination,
    Message,
    RodapeVue
  },
  data() {
    return {
      cores: [],

      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,
      //Campos Cadastro
      user_id: "",
      descricao: "",
      status: "",
      btn_cadastrar: false,

      /// Campos Modal Editar
      edit_id: "",      
      edit_descricao: "",
      edit_status: "",

      //Params
      searchTitle: "",
      searchStatus:"",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35,50,10],
      pageSize: 10,
    };
  },
  mounted() {
    this.retrieveCores();
  },
  methods: {
    resetForm() {
      (this.descricao = ""), (this.status = "");
    },
    getStatus(status) {
      return status === 0 ? 'Desabilitado' : 'Habilitado';
    },
    async onSubmit() {
      try {
        console.log("Aqui")
        const resp = await fetch(`${process.env.VUE_APP_API_URL}cor`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descricao: this.descricao,
            status: this.status,
          }),
        })
          .then((data) => {
            if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();
          })
          .then((resposta) => {
            if (resposta.StatusOk == 200) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 4000);
              this.resetForm();
              this.retrieveCores();
            }
            if (resposta.StatusOk == 204) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 4000);
            }
          })
          .catch((error) => {
            if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        } 
          });
        console.log(resp)
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        } 
      }
    },
    //Buscar dados no banco de dados
    getRequestParams(searchTitle, page, pageSize, searchStatus) {
      let params = {};
      if (searchTitle) {
        params["nome"] = searchTitle;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      if (searchStatus){
        params["status"] = searchStatus
      }
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveCores();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveCores();
    },
    async retrieveCores() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize,
          this.searchStatus
        );
        userService.getCores(params).then((response) => {
          const { cores, totalPages, totalItems } = response.data;
          this.cores = cores;
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

    async editar_cor(item) {
      (this.edit_id = item.id),
        (this.edit_descricao = item.descricao),
        (this.edit_status = item.status);
    },
    async update() {
      const token = this.$store.state.auth.user.accessToken;
      //const id_userCad = this.$store.state.auth.user.id;
      const headers = {
        "x-access-token": token,
      };
      const dados = {
        id: this.edit_id,
        descricao: this.edit_descricao,
        status: this.edit_status,
      };

      const response = await axios.put(
        `${process.env.VUE_APP_API_URL}cor/${this.edit_id}`,
        dados,
        { headers }
      );
      if (response.data.StatusOk == 200) {
        this.abrir_modal = true;
              this.msg = response.data.message;
              setTimeout(() => (this.abrir_modal = false), 4000);
              this.resetForm();
              this.retrieveCores();
      }
    },
  },
};
</script>
  
