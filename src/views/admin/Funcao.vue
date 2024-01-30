<template>
  <div>
    <SidebarVue />
    <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
      <div class="container-fluid">
        <div><i class="bi bi-sliders fs-5"> Administração - Funções </i></div>
        <div>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link class="nav-link rf_texto active" to="/admin">Dashboard /</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link rf_texto disabled">Funções</a>
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
            <i class="bi bi-person-fill-add fs-5"> Cadastrar Função </i>
          </div>
        </div>
        <div class="row g-2 p-2">
          <!--Função-->
          <div class="col-md">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="nome" id="valid_nome" required />
              <label for="valid_nome" class="rf_texto">Nome</label>
              <div class="invalid-feedback">O campo nome é obrigatório!</div>
            </div>
          </div>
          <!--Descrição-->
          <div class="col-md">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="descricao" id="valid_descricao"
                required />
              <label for="valid_cnpj" class="rf_texto">Descrição</label>
              <div class="invalid-feedback">O campo CNPJ é obrigatório!</div>
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
    <!--Tabelas-->
    <div class="card rf_bg_form g-2 p-2 rf_margin">
      <table class="table rf_texto">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in funcoes" :key="item.nome">
            <td>{{ item.nome }}</td>
            <td>{{ item.descricao }}</td>
            <td>{{ item.status }}</td>
            <td>
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_funcao(item)">
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
      <pagination v-if="funcoes.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
        @change-page="handlePageChange" />
    </div>

    <!-- Modal para edição -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content rf_bg_form">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <!--Nome-->
              <div class="col-md">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_nome" id="valid_nome"
                    required />
                  <label for="valid_nome" class="rf_texto">Nome</label>
                  <div class="invalid-feedback">
                    O campo nome é obrigatório!
                  </div>
                </div>
              </div>
              <!--Descrição-->
              <div class="col-md-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_descricao"
                    id="valid_descricao" required />
                  <label for="valid_descricao" class="rf_texto">Descrição</label>
                  <div class="invalid-feedback">
                    O campo Descrição é obrigatório!
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="update()" class="btn btn-primary">
              Save changes
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
      funcoes: [],

      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,

      //Campos Cadastro
      user_id: "",
      nome: "",
      descricao: "",
      status: "",
      btn_cadastrar: false,

      /// Campos Modal Editar
      edit_id: "",
      edit_nome: "",
      edit_descricao: "",
      edit_status: "",

      //Params
      searchTitle: "",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35],
      pageSize: 5,

    };
  },
  mounted() {
    this.retrieveFuncoes();
  },
  methods: {
    async onSubmit() { },

    //Buscar dados no banco de dados
    getRequestParams(searchTitle, page, pageSize) {
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
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveFuncoes();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveFuncoes();
    },
    async retrieveFuncoes() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getFuncoes(params).then((response) => {
          const { funcoes, totalPages, totalItems } = response.data;
          this.funcoes = funcoes;
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

    async editar_funcao(item) {
      (this.edit_id = item.id),
        (this.edit_nome = item.nome),
        (this.edit_descricao = item.descricao),
        (this.edit_status = item.status);
    },
    async update() {
      const token = this.$store.state.auth.user.accessToken;
      const id_userCad = this.$store.state.auth.user.id;
      const headers = {
        "x-access-token": token,
      };
      const dados = {
        id_userCad: id_userCad,
        nome: this.edit_nome,
        descricao: this.edit_descricao,
        status: this.status,
      };

      const response = await axios.patch(
        `${process.env.VUE_APP_API_URL}/funcao/${this.edit_id}`,
        dados,
        { headers }
      );
      if (response.data === "OK") {
        console.log(dados);
        // this.$store.dispatch("auth/logout");
        // this.$router.push("/login");
        return console.log(response.data);
      }
      //return console.log(response.data);
    },
  },
};
</script>
  
