<template>
  <div>
    <SidebarVue />
    <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
      <div class="container-fluid">
        <div><i class="bi bi-sliders fs-5"> Administração - Cor Veículo </i></div>
        <div>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link class="nav-link rf_texto active" to="/admin">Dashboard /</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link rf_texto_a disabled">Cor Veículo</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!--Formulário de Cadastro -->

    <div class="card rf_bg_form rf_margin">
      <form @submit.prevent="onSubmit" class="needs-validation" novalidate="true">
        <div class="row g-2 p-2">
          <div class="card-title rf_texto gy-4">
            <i class="bi bi-person-fill-add fs-5"> Cadastrar Cor </i>
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
              <button type="submit" :disabled="btn_cadastrar" class="btn btn-lg btn-secondary">
                Cadastrar
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
    <div class="card rf_bg_form rf_margin">
      <div class="row g-2 p-2">
        <div class="card-title rf_texto gy-4">
          <i class="bi bi-person-fill-add fs-5"> Filtros </i>
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
            <button class="btn btn-lg btn-secondary mt-2" type="button" @click="page = 1; retrieveCores();">
              Pesquisar
            </button>
          </div>
        </div>


      </div>
    </div>
    <!--Tabelas-->
    <div class="card rf_bg_form g-2 p-2 rf_margin">
      <table class="table rf_texto">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cores" :key="item.descricao">
            <td>{{ item.descricao }}</td>
            <td>{{ getStatus(item.status) }}</td>
            <td>
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_cor(item)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil"
                  viewBox="0 0 16 16">
                  <path
                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
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
        <div class="modal-content rf_bg_form rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Cor</h1>
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
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Fechar
            </button>
            <button type="button" @click="update()" data-bs-dismiss="modal" class="btn btn-secondary">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Button trigger modal -->

    <RodapeVue />
  </div>
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
  
