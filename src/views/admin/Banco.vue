<template>
  <div>
    <SidebarVue />
    <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
      <div class="container-fluid">
        <div><i class="bi bi-sliders fs-5"> Administração - Bancos </i></div>
        <div>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link class="nav-link rf_texto active" to="/admin">Dashboard /</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link rf_texto_a disabled">Bancos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Formulário de Cadastro-->
    <div class="card rf_bg_form rf_margin">
      <form @submit.prevent="onSubmit">
        <div class="row g-2 p-2">
          <div class="card-title rf_texto gy-4">
            <i class="bi bi-person-fill-add fs-5"> Cadastrar Banco </i>
          </div>
          <div class="row g-2 p-2">
            <div class="col-1">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="id" autocomplete="off" required />
                <label for="valid_banco" class="rf_texto">Id do Banco</label>

              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="nome" autocomplete="off" required />
                <label for="valid_banco" class="rf_texto">Nome do Banco</label>
                <div class="invalid-feedback">O campo nome é obrigatório!</div>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="status" required>
                  <option value="0">Desabilitado</option>
                  <option value="1">Habilitado</option>
                </select>
                <label for="valid_empresa" class="rf_texto">Status</label>
                <div class="invalid-feedback">
                  Selecione uma empresa, esse campo é obrigatório!
                </div>
              </div>
            </div>
            <div class="col-1">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="rebate" id="valid_rebate" required>
                  <option value="0">Não</option>
                  <option value="1">Sim</option>
                </select>
                <label for="valid_funcao" class="rf_texto">Rebate</label>
                <div class="invalid-feedback">
                  Selecione uma função, esse campo é obrigatório!
                </div>
              </div>
            </div>
            <div class="col-1">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="codigo" autocomplete="off"
                  required />
                <label for="valid_codigo" class="rf_texto">Código</label>
                <div class="invalid-feedback">O campo nome é obrigatório!</div>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <button type="submit" class="btn btn-secondary btn-lg mt-2">Cadastrar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <!--Bloco do Filtro-->
      <div class="rf_margin">
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
              <button class="btn btn-lg btn-secondary mt-2" type="button" @click="page = 1; retrieveBancos();">
                Pesquisar
              </button>
            </div>
          </div>


        </div>
      </div>
     
    </div>
     <!--Tabelas-->
     <div class="card rf_bg_form g-2 p-2 rf_margin">
        <table class="table border-dark rf_texto">
          <thead>
            <tr>
              <th scope="col" class="rf_header_table">Nome</th>
              <th scope="col" class="rf_header_table">Código</th>
              <th scope="col" class="rf_header_table">Rebate</th>
              <th scope="col" class="rf_header_table">Status</th>
              <th scope="col" class="rf_header_table">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bancos" :key="item.id">
              <td class="rf_header_table">{{ item.nome }}</td>
              <td class="rf_header_table">{{ item.codigo }}</td>
              <td class="rf_header_table">{{ item.tacOnRebate_desc }}</td>
              <td class="rf_header_table">{{ item.status_desc }}</td>
              <td>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  @click="editar_banco(item)">
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
        <pagination v-if="bancos.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
          @change-page="handlePageChange" />
      </div>
    <!-- Modal para edição -->

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content rf_bg_form rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Editar Banco
            </h1>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_id" required />
                  <label class="rf_texto">Id do Banco</label>

                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_nome" required />
                  <label class="rf_texto">Nome do Banco</label>

                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="edit_status" required>
                    <option value="0">Desabilitado</option>
                    <option value="1">Habilitado</option>
                  </select>
                  <label class="rf_texto">Status</label>

                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="edit_rebate" required>
                    <option value="0">Não</option>
                    <option value="1">Sim</option>
                  </select>
                  <label class="rf_texto">Rebate</label>

                </div>
              </div>
              <div class="col-1">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_codigo" required />
                  <label class="rf_texto">Código</label>

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
    <div v-if="abrir_modal">
      <Message :msg="msg" v-show="msg" />
    </div>
    <RodapeVue />
  </div>
</template>
<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import Pagination from "../../components/Pagination.vue";
import userService from "../../services/user.service";
import Message from "../../components/modal/Message.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import axios from "axios";
//import axios from "axios";
export default {
  name: "Bancos",
  components: {
    SidebarVue,
    Pagination,
    Message,
    RodapeVue
  },
  data() {
    return {
      bancos: [],
      msg: "",
      abrir_modal: false,

      id: "",
      nome: "",
      codigo: "",
      status: [
        { text: "Habilitado", value: "1" },
        { text: "Desabilitado", value: "0" },
      ],
      rebate: [
        { text: "Sim", value: "1" },
        { text: "Não", value: "0" },
      ],
      edit_id: "",
      edit_nome: "",
      edit_codigo: "",
      edit_status: "",

      //Params
      searchTitle: "",
      searchStatus: "",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 10,
    };
  },
  mounted() {
    this.retrieveBancos();
  },
  methods: {
    async onSubmit() {

      await fetch(`${process.env.VUE_APP_API_URL}bancos`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
          nome: this.nome,
          tacOnRebate: this.rebate,
          codigo: this.codigo,
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
          console.log(resposta);
          if (resposta.StatusOk == 200) {
            this.abrir_modal = true;
            this.msg = resposta.message;
            setTimeout(() => (this.abrir_modal = false), 4000);

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
      if (searchStatus) {
        params["status"] = searchStatus;
      }
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveBancos();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveBancos();
    },
    async retrieveBancos() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize,
          this.searchStatus
        );
        userService.getBancos(params).then((response) => {
          var dados = [];
          var status;
          var rebate;
          const { name, totalPages, totalItems } = response.data;

          this.totalPages = totalPages;
          this.totalItems = totalItems;

          for (var i = 0; i < name.length; i++) {
            if (name[i].status == 0) {
              status = "Desabilitado"
            } else {
              status = "Habilitado"
            }
            if (name[i].tacOnRebate == 0) {
              rebate = "Não"
            } else {
              rebate = "Sim"
            }
            const dados2 = {
              id: name[i].id,
              nome: name[i].nome,
              status_desc: status,
              status_cod: name[i].status,
              codigo: name[i].codigo,
              tacOnRebate_desc: rebate,
              tacOnRebate_cod: name[i].tacOnRebate
            }
            dados.push(dados2)
          }

          this.bancos = dados
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async editar_banco(item) {
      this.edit_id = item.id;
      this.edit_nome = item.nome;
      this.edit_status = item.status_cod;
      this.edit_codigo = item.codigo;
      this.edit_rebate = item.tacOnRebate_cod;
      console.log(item);
    },
    async update() {
      const token = this.$store.state.auth.user.accessToken;

      const headers = {
        "x-access-token": token,
      };
      const dados = {
        id: this.edit_id,
        status: this.edit_status,
        tacOnRebate: this.edit_rebate,
        codigo: this.edit_codigo
      };

      await axios
        .put(`${process.env.VUE_APP_API_URL}/bancos/${this.edit_id}`, dados, {
          headers,
        })
        .then((resposta) => {
          const resp = JSON.stringify(resposta.status);

          if (resp == 200) {
            this.abrir_modal = true;
            this.msg = resposta.data.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
            this.retrieveBancos();
          }
          if (resp == 204) {
            this.abrir_modal = true;
            this.msg = resposta.data.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        });
    },
  }
};
</script>

