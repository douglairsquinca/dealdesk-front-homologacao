<template>
  <div>
    <SidebarVue />
    <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
      <div class="container-fluid">
        <div><i class="bi bi-sliders fs-5"> Administração - Usuários </i></div>
        <div>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link class="nav-link rf_texto active" to="/admin">Dashboard /</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link rf_texto_a disabled">Usuário</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!--Formulário de Cadastro -->

    <div class="card rf_bg_form rf_margin">
      <form @submit.prevent="onSubmit">
        <div class="row g-2 p-2">
          <div class="card-title rf_texto gy-4">
            <i class="bi bi-person-fill-add fs-5"> Cadastrar Usuário </i>
          </div>
          <div class="col">
            <div class="row">
              <div class="col-4 gy-3">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="empresa" required>
                    <option v-for="empresa in empresas" :value="empresa.id" :key="empresa.id">
                      {{ empresa.nome }}
                    </option>
                  </select>
                  <label class=" rf_texto">Empresa Principal</label>

                </div>
              </div>

              <div class="col-md p-2 mt-4">
                <div class="form-floating">
                  <div class="form-check form-switch rf_texto">
                    <input class="form-check-input" type="checkbox" v-model="hab_empresa">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Habilitar Empresas</label>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="row g-2 p-2">
          <div class="col-6">
            <div class="row g-2">
              <div class="col gy-3">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="username" required />
                  <label class="rf_texto">Nome</label>
                </div>
              </div>
              <div class="col-md gy-3">
                <div class="form-floating">
                  <input type="email" class="form-control rf_bg_form rf_texto" v-model="email" required
                    v-on:blur="validateEmail(email)" />
                  <label class="rf_texto">Email</label>
                </div>
              </div>
            </div>
            <div class="row g-2 mt-3 ">
              <div class="col">
                <div class="form-floating">
                  <input type="password" class="form-control rf_bg_form rf_texto" v-model="password" required />
                  <label class="rf_texto">Senha</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input type="password" class="form-control rf_bg_form rf_texto" v-model="confirmPassword"
                    v-on:blur="checar_senha" required />
                  <label class="rf_texto">Confirmar Senha</label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row g-2 ">
              <div class="col gy-3">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" size="5" style="height: 8.7rem" multiple
                    :disabled="hab_empresa" v-model="empresa_arr">
                    <option v-for="empresa in empresas" :value="empresa.id" :key="empresa.id">
                      {{ empresa.nome }}
                    </option>
                  </select>
                  <label class=" rf_texto">Empresas</label>

                </div>
              </div>
              <div class="col gy-3">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" size="5" style="height: 8.7rem" multiple
                    v-model="funcao" required>
                    <option v-for="funcao in funcoes" :value="funcao.id" :key="funcao.id" @click="abrirModal(funcao)">
                      {{ funcao.nome }}
                    </option>
                  </select>
                  <label class=" rf_texto">Funções</label>

                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="col-md-2 p-2">
          <div v-if="modalAberto">
            <div class="form-floating">
              <select class="form-select rf_bg_form rf_texto" id="valid_funcao" v-model="tipo_vendedor">
                <option value="0">Novo</option>
                <option value="1">Usado</option>
                <option value="2">Ambos</option>
              </select>
              <label class="rf_texto">Tipo Vendedor</label>
            </div>
          </div>
        </div>
        <div class="col-md p-2">
          <div class="form-floating">
            <button type="submit" class="btn btn-secondary">Cadastrar</button>
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
            <button class="btn btn-lg btn-secondary mt-2" type="button" @click="page = 1; retrieveUsuario();">
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
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Empresas</th>
            <th scope="col">Funções</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in usuarios" :key="item.id">
            <td>{{ item.nome }}</td>
            <td>{{ item.email }}</td>
            <td>
              <ul class="scrollable-list">
                <li v-for="empresa in item.empresa" :key="empresa.id">{{ empresa.nome }}</li>
              </ul>
            </td>
            <td>
              <ul class="scrollable-list">
                <li v-for="funcao in item.funcao" :key="funcao.id">{{ funcao.nome }}</li>
              </ul>
            </td>
            <td>{{ item.status }}</td>
            <!-- <td v-for="funcao in item.funcoes[item.id]" :key="funcao.id">{{ funcao.nome }}</td>  -->
            <td>
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_usuario(item)">
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
      <pagination v-if="usuarios.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
        @change-page="handlePageChange" />

    </div>

    <!-- Modal para edição -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content rf_bg_form rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Editar Usuário
            </h1>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <div class="col-1">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" id="edit_id" v-model="edit_id"
                    disabled="true" />
                  <label class="rf_texto">Id</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="edit_status" required>
                    <option value="0">Desabilitado</option>
                    <option value="1">Habilitado</option>
                  </select>
                  <label for="valid_status" class="rf_texto">Status</label>

                </div>
              </div>
            </div>
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <select v-model="editPrincipal_empresa" class="form-select rf_bg_form rf_texto">
                    <option v-for="option in empresas" :value="option.id" :key="option.id">
                      {{ option.nome }}
                    </option>
                  </select>
                  <label class="rf_texto">Empresa Principal</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="edit_status_vendedor" required>
                    <option value="1">Disponível Atend.</option>
                    <option value="2">Indisponível Atend</option>

                  </select>
                  <label for="valid_status" class="rf_texto">Status Vendedor</label>

                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="edit_tipo_vendedor" required>
                    <option value="0">NOVO</option>
                    <option value="1">USADO</option>
                    <option value="2">AMBOS</option>
                  </select>
                  <label for="valid_status" class="rf_texto">Tipo Vendedor</label>

                </div>
              </div>

            </div>
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" id="edit_username"
                    v-model="edit_username" />
                  <label class="rf_texto">Nome</label>
                </div>
              </div>

              <div class="col">
                <div class="form-floating">
                  <input type="email" class="form-control rf_bg_form rf_texto" id="edit_email" v-model="edit_email" />
                  <label class="rf_texto">Email</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input type="password" class="form-control rf_bg_form rf_texto" v-model="edit_password" />
                  <label class="rf_texto">Senha</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input type="password" class="form-control rf_bg_form rf_texto" v-model="edit_confirmPassword" />
                  <label class="rf_texto">Confirmar Senha</label>
                </div>
              </div>
            </div>
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <select v-model="edit_empresa" multiple class="form-select rf_bg_form rf_texto" size="5"
                    style="height: 8.7rem">
                    <option v-for="option in empresas" :value="option.id" :key="option.id">
                      {{ option.nome }}
                    </option>
                  </select>
                  <label class="rf_texto">Empresa</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <select v-model="edit_funcao" multiple class="form-select rf_bg_form rf_texto" size="5"
                    style="height: 8.7rem">
                    <option v-for="option in funcoes" :value="option.id" :key="option.id">
                      {{ option.descricao }}
                    </option>
                  </select>
                  <label class="rf_texto">Função</label>
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
import DataService from "../../services/DataService";
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
      usuarios: [],
      funcoes: [],
      empresas: [],

      modalAberto: false,
      tipo_vendedor: 2,

      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,
      //Campos Cadastro
      user_id: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      empresa_arr: [],
      empresa: "",
      funcao: [],
      status: "",
      btn_cadastrar: false,
      hab_empresa: true,

      /// Campos Modal Editar
      edit_id: "",
      edit_username: "",
      edit_email: "",
      edit_password: "",
      edit_confirmPassword: "",
      editPrincipal_empresa: "",
      edit_empresa: [],
      edit_funcao: [],
      edit_status: 1,
      edit_tipo_vendedor: 2,
      edit_status_vendedor: 1,
      show1: false,
      //Params
      searchTitle: "",
      searchStatus: "",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 10,




      OpenClose: this.visible,
    };
  },
  mounted() {
    this.retrieveUsuario();
    this.retrieveFuncoes();
    this.retrieveEmpresa();

  },

  methods: {
    abrirModal(funcao) {
      console.log(funcao)
      if (funcao.id == 4) {
        this.modalAberto = true;
        this.tipo_vendedor = 2;
      } else {
        this.modalAberto = false;
        this.tipo_vendedor = null;
      }
    },
    async onSubmit() {
      const token = this.$store.state.auth.user.accessToken;
      const id_userCad = this.$store.state.auth.user.id;
      const dados = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.funcao,
        empresaPrincipal_id: this.empresa,
        empresa_id: this.empresa_arr,
        id_userCad: id_userCad,
        tipo_vendedor: this.tipo_vendedor
      };



      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}auth/signup`,
        dados,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      const resp = JSON.stringify(response.status);

      if (resp == 200) {
        this.abrir_modal = true;
        this.msg = response.data.message;
        setTimeout(() => (this.abrir_modal = false), 4000, location.reload());
      }
      if (resp == 204) {
        this.abrir_modal = true;
        this.msg = "Email já cadastrado"
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
    validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      if (re.test(email) == true) {
        this.btn_cadastrar = false;
      } else {
        (this.btn_cadastrar = true),
          this.abrir_modal = true;
        (this.msg = "Digite um email válido, ex: email@email.com!");
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
    checar_senha() {
      if (
        (this.password || this.confirmPassword) &&
        this.password !== this.confirmPassword
      ) {
        this.abrir_modal = true;
        this.msg = "As senhas digitadas não são iguais!";
        setTimeout(() => (this.abrir_modal = false), 4000);
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
      if (searchStatus) {
        params["status"] = searchStatus;
      }
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveUsuario();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveUsuario();
    },
    async retrieveUsuario() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize,
          this.searchStatus
        );
        userService.getUsers(params).then((response) => {
          var dados = [];
          var status;
          //var empresa_principal_nome;
          //const empresa_principal_id;

          const { users, totalPages, totalItems } = response.data;
          this.totalPages = totalPages;
          this.totalItems = totalItems
         
          console.log(response.data)
          
          for (var i = 0; i < users.length; i++) {
            if (users[i].status == 0) {
              status = "Desabilitado"
            } else {
              status = "Habilitado"
            }
            // if(users[i].empresa_id === users[i].empresas.id){
            //   empresa_principal = users[i].empresas.nome
            // }

            const dados2 = {
              id: users[i].id,
              nome: users[i].username,
              email: users[i].email,
              empresa: users[i].empresas,
              funcao: users[i].funcoes,
              status: status,
              //empresa_principal: empresa_principal

            }
            dados.push(dados2)
          }

          this.usuarios = dados;


          console.log(this.usuarios);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async retrieveFuncoes() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        DataService.getFuncoes(params).then((response) => {
          const { funcoes, totalPages } = response.data;
          this.funcoes = funcoes;
          this.totalPages = totalPages;
          console.log(response.data);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async retrieveEmpresa() {
      try {
        DataService.getEmpresas().then((response) => {

          this.empresas = response.data;


        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },

    editar_usuario(item) {
      console.log(item);
      this.edit_id = item.id;
      this.edit_username = item.nome;
      this.edit_email = item.email;
      this.editPrincipal_empresa = item.empresa_id
      this.edit_funcao = [];
      this.edit_empresa = [];


      for (var i = 0; i < item.funcao.length; i++) {
        this.edit_funcao.push(item.funcao[i]['id']);
      }
      for (var a = 0; a < item.empresa.length; a++) {
        this.edit_empresa.push(item.empresa[a]['id']);
      }



    },
    async update() {

      if (
        (this.edit_password || this.edit_confirmPassword) &&
        this.edit_password !== this.edit_confirmPassword
      ) {
        return console.log("Os campos de senha não são iguais!");
      }

      const token = this.$store.state.auth.user.accessToken;
      const id_userCad = this.$store.state.auth.user.id;
      const headers = {
        "x-access-token": token,
      };
      const dados = {
        id: this.edit_id,
        email: this.edit_email,
        username: this.edit_username,
        password: this.edit_password,
        empresa: this.edit_empresa,
        empresa_id: this.editPrincipal_empresa,
        role: this.edit_funcao,
        id_userCad: id_userCad,
        status: this.edit_status,
        tipo_vendedor: this.tipo_vendedor,
        status_vendedor: this.edit_status_vendedor
      };

      console.log(dados)

      const response = await axios.patch(
        `${process.env.VUE_APP_API_URL}users/${this.edit_id}`,
        dados,
        { headers }
      );
      const resp = JSON.stringify(response.status);
      if (resp == 200) {
        this.abrir_modal = true;
        this.msg = "Alteração realizada com sucesso!";
        setTimeout(() => (this.abrir_modal = false), 4000,);
        location.reload();
      }
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style> 
