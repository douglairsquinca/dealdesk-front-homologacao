<template>
  <SidebarVue ref="sidebar" />
  <Navgator ref="navgator" :barraTitulo="' Administração - Bancos'" :titulo="'bancos'" />

  <!-- Formulário de Cadastro-->
  <div class="card card-filtro">
    <form @submit.prevent="onSubmit">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Cadastrar Banco</span></i>
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
              <button type="submit" class="btn btn-lg btn-filtro">
                <span class="rf_texto_btn">Cadastrar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
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
          <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; retrieveBancos();">
            <span class="rf_texto_btn">Pesquisar</span>
          </button>
        </div>
      </div>


    </div>
  </div>
  <!--Tabelas-->
  <div class="card card-tabela g-2 p-2 rf_margin">
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
        <tr v-for="item in bancos" :key="item.id" class="table-linha">
          <td class="rf_header_table">{{ item.nome }}</td>
          <td class="rf_header_table">{{ item.codigo }}</td>
          <td class="rf_header_table">{{ item.tacOnRebate_desc }}</td>
          <td class="rf_header_table">{{ item.status_desc }}</td>
          <td>
            <button type="button" class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
              @click="editar_banco(item)">
              <i class="bi bi-pencil-square"></i>
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
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-pencil-square fs-5 icone_kit"><span class="texto_kit">Editar Banco</span></i>
          </div>
          <button class="btn btn-modal btn-lg p-1 mt-1" type="button" data-bs-target="#ModalProposta"
            data-bs-toggle="modal" aria-label="Close"> Sair </button>
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
          <button type="button" @click="update()" data-bs-dismiss="modal" class="btn btn-modal btn-lg p-1 mt-1">
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

</template>
<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import Pagination from "../../components/Pagination.vue";
import userService from "../../services/user.service";
import Message from "../../components/modal/Message.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import Navgator from "../../components/menu/Navgator.vue";
import axios from "axios";

export default {
  name: "Bancos",
  components: {
    SidebarVue,
    Pagination,
    Navgator,
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
      console.log("Estou aqui!")

      try {
        const token = this.$store.state.auth.user.accessToken;

        const headers = {
          "x-access-token": token,
        };
        const dados = {
          id: this.edit_id,
          nome: this.edit_nome,
          status: this.edit_status,
          tacOnRebate: this.edit_rebate,
          codigo: this.edit_codigo
        };


        const response = await axios
          .put(`${process.env.VUE_APP_API_URL}bancos/${this.edit_id}`,
            dados,
            { headers }
          );

        if (response.data.StatusOk == 200) {
          this.abrir_modal = true;
          this.msg = response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);

          this.retrieveBancos();
        }

      } catch (error) {
        if (error.response.status === 404) {
          console.error("Recurso não encontrado. Verifique o endpoint da API.");
        } else {
          console.error(error);
        }
      }




    },
  }
};
</script>
