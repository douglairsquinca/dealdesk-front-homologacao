<template>
 
    <SidebarVue />
    <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
      <div class="container-fluid">
        <div><i class="bi bi-sliders fs-5"> Administração - Clientes </i></div>
        <div>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link class="nav-link rf_texto active" to="/admin"
                >Dashboard /</router-link
              >
            </li>
            <li class="nav-item">
              <a class="nav-link rf_texto disabled">Clientes</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!--Formulário de Cadastro -->

    <div class="card rf_bg_form rf_margin">
      <form @submit.prevent="onSubmit" id="form">
        <div class="row g-2 p-2">
          <div class="card-title rf_texto gy-4">
            <i class="bi bi-person-fill-add fs-5"> Cadastrar Cliente </i>
          </div>
        </div>
        <div class="row g-2 p-2">
          <!--Nome-->
          <div class="col">
            <div class="form-floating">
              <input
                type="text"
                class="form-control rf_bg_form rf_texto"
                v-model="nome"
                required
                autocomplete="off"
              />
              <label class="rf_texto">Nome</label>
            </div>
          </div>
          <!--CPF/CNPJ-->
          <div class="col-2">
            <div class="form-floating">
              <input
                type="text"
                class="form-control rf_bg_form rf_texto"
                v-model="cpfCnpj"
                v-on:blur="vData"
                autocomplete="off"
              />
              <label class="rf_texto">CPF/CNPJ</label>
            </div>
          </div>
          <!--Data Nascimento-->
          <div class="col-2">
            <div class="form-floating">
              <input
                type="date"
                class="form-control rf_bg_form rf_texto"
                v-model="dataNascimento"
                autocomplete="off"
              />
              <label class="rf_texto">Data Nascimento</label>
            </div>
          </div>
          <!--Email-->
          <div class="col-2">
            <div class="form-floating">
              <input
                type="email"
                class="form-control rf_bg_form rf_texto"
                v-model="email"
                autocomplete="off"
                ref="f_email"
                v-on:blur="validateEmail(email)"
              />
              <label class="rf_texto">Email</label>
            </div>
          </div>
        </div>
        <div class="row g-2 p-2">
          <!--Endereço-->
          <div class="col">
            <div class="form-floating">
              <input
                type="text"
                class="form-control rf_bg_form rf_texto"
                v-model="endereco"
                autocomplete="off"
              />
              <label class="rf_texto">Endereço</label>
            </div>
          </div>
          <!--Complemento-->
          <div class="col-2">
            <div class="form-floating">
              <input
                type="text"
                class="form-control rf_bg_form rf_texto"
                v-model="complemento"
                autocomplete="off"
              />
              <label class="rf_texto">Complemento</label>
            </div>
          </div>
          <!--UF-->
          <div class="col-1">
            <div class="form-floating">
              <input
                v-model="uf"
                class="form-control rf_bg_form rf_texto"
                list="datalistOptions"
                id="estado"
                autocomplete="off"
              />

              <label class="rf_texto">UF</label>
              <datalist id="datalistOptions">
                <option
                  v-for="opt in estados"
                  :data-value="opt.id"
                  :value="opt.sigla"
                  :key="opt.id"
                ></option>
              </datalist>
            </div>
          </div>
          <!--Cidade-->
          <div class="col-2">
            <div class="form-floating">
              <input
                v-model="cidade"
                class="form-control rf_bg_form rf_texto"
                list="datalistCidades"
                id="estado"
                autocomplete="off"
              />

              <label class="rf_texto">Cidade</label>
              <datalist id="datalistCidades">
                <option
                  v-for="opt in cidades"
                  :data-value="opt.id"
                  :value="opt.nome"
                  :key="opt.id"
                ></option>
              </datalist>
            </div>
          </div>
          <!--Bairro-->
          <div class="col-2">
            <div class="form-floating">
              <input
                type="text"
                class="form-control rf_bg_form rf_texto"
                v-model="bairro"
                autocomplete="off"
              />
              <label class="rf_texto">Bairro</label>
            </div>
          </div>
          <!--CEP-->
          <div class="col-1">
            <div class="form-floating">
              <input
                type="text"
                class="form-control rf_bg_form rf_texto"
                v-model="cep"
                autocomplete="off"
              />
              <label class="rf_texto">CEP</label>
            </div>
          </div>
        </div>
        <div class="row g-2 p-2">
          <!--Celular-->
          <div class="col-2">
            <div class="form-floating">
              <input
                type="text"
                class="form-control rf_bg_form rf_texto"
                v-model="celular"
                v-on:blur="vCel"
                autocomplete="off"
              />
              <label for="valid_celular" class="rf_texto">Celular</label>
              <div class="invalid-feedback">O campo celular é obrigatório!</div>
            </div>
          </div>
          <!--Telefone-->
          <div class="col-2">
            <div class="form-floating">
              <input
                type="text"
                class="form-control rf_bg_form rf_texto"
                autocomplete="off"
                v-model="telefone"
                v-on:blur="vTel"
              />
              <label class="rf_texto">Telefone</label>
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
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="search_nome" />
              <label class="rf_texto">Nome</label>
            </div>
          </div>
          <div class="col-3">
            <div class="form-floating">             
              <input
                type="text"
                class="form-control rf_bg_form rf_texto"
                v-model="search_cpf"
                v-on:blur="vData"
                autocomplete="off"
              />
              <label class="rf_texto">CPF/CNPJ</label>
            </div>
          </div>
          <div class="col-2">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="search_tel" />
              <label class="rf_texto">Telefone</label>
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
          <div class="col-2">
            <div class="input-group-append">
              <button class="btn btn-lg btn-secondary mt-2" type="button" @click="page = 1; retrieveCliente();">
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
            <th scope="col">CPF/CNPJ</th>
            <th scope="col">Telefone</th>
            <th scope="col">Celular</th>
            <th scope="col">Email</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in clientes" :key="item.nome">
            <td>{{ item.nome }}</td>
            <td>{{ item.cpfCnpj }}</td>
            <td>{{ item.tel }}</td>
            <td>{{ item.cel }}</td>
            <td>{{ item.email }}</td>
            <td>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="editar_cliente(item)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination
        v-if="clientes.length"
        :offset="totalPages"
        :total="totalItems"
        :limit="pageSize"
        @change-page="handlePageChange"
      />
    </div>

    <!-- Modal para edição -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content rf_bg_form rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Editar Cliente
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <select
                    v-model="edit_pessoa"
                    class="form-control rf_bg_form rf_texto"
                  >
                    <option value="Fisica">Física</option>
                    <option value="Juridica">Jurídica</option>
                  </select>
                  <label class="rf_texto">Pessoa</label>
                </div>
              </div>
              <!--Nome-->
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="edit_nome"
                    id="valid_editNome"
                    required
                  />
                  <label for="valid_editNome" class="rf_texto">Nome</label>
                  <div class="invalid-feedback">
                    O campo nome é obrigatório!
                  </div>
                </div>
              </div>
              <!--CPF/CNPJ-->
              <div class="col-2">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="edit_cpfCnpj"
                    v-on:blur="vData"
                  />
                  <label for="valid_editCpfCnpj" class="rf_texto"
                    >CPF/CNPJ</label
                  >
                </div>
              </div>
              <!--Data Nascimento-->
              <div class="col-2">
                <div class="form-floating">
                  <input
                    type="date"
                    class="form-control rf_bg_form rf_texto"
                    v-model="edit_dataNascimento"
                  />
                  <label for="valid_editDataNascimento" class="rf_texto"
                    >Data Nascimento</label
                  >
                  <div class="invalid-feedback">
                    O campo data nascimento é obrigatório!
                  </div>
                </div>
              </div>
              <!--Email-->
              <div class="col-3">
                <div class="form-floating">
                  <input
                    type="email"
                    class="form-control rf_bg_form rf_texto"
                    v-model="edit_email"
                    v-on:blur="email"
                  />
                  <label class="rf_texto">Email</label>
                </div>
              </div>
            </div>
            <div class="row g-2 p-2">
              <!--Endereço-->
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="edit_endereco"
                    id="valid_editEndereco"
                    required
                  />
                  <label for="valid_editEndereco" class="rf_texto"
                    >Endereço</label
                  >
                  <div class="invalid-feedback">
                    O campo endereço é obrigatório!
                  </div>
                </div>
              </div>
              <!--Complemento-->
              <div class="col-2">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="edit_complemento"
                    id="valid_editComplemento"
                    required
                  />
                  <label for="valid_editComplemento" class="rf_texto"
                    >Complemento</label
                  >
                  <div class="invalid-feedback">
                    O campo complemento é obrigatório!
                  </div>
                </div>
              </div>
              <!--Telefone-->
              <div class="col-2">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="edit_telefone"
                    v-on:blur="vTel"
                  />
                  <label class="rf_texto">Telefone</label>
                </div>
              </div>
              <!--Celular-->
              <div class="col-2">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="edit_celular"
                    v-on:blur="vCel"
                  />
                  <label class="rf_texto">Celular</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Sair
            </button>
            <button
              type="button"
              @click="update()"
              data-bs-dismiss="modal"
              class="btn btn-secondary"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Button trigger modal -->

    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3"></ul>
      <p class="text-center rf_texto">© 2023 Rfmobi Solution</p>
    </footer>
 
</template>
  <script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import axios from "axios";
//import DataService from "../../services/DataService";
import userService from "../../services/user.service";
import Pagination from "../../components/Pagination.vue";
import Message from "../../components/modal/Message.vue";

export default {
  name: "Usuários",
  components: {
    SidebarVue,
    Pagination,
    Message,
  },
  data() {
    return {
      clientes: [],
      cidades: [],
      estados: [
        { id: 11, sigla: "RO" },
        { id: 12, sigla: "AC" },
        { id: 13, sigla: "AM" },
        { id: 14, sigla: "RR" },
        { id: 15, sigla: "PA" },
        { id: 16, sigla: "AP" },
        { id: 17, sigla: "TO" },
        { id: 21, sigla: "MA" },
        { id: 22, sigla: "PI" },
        { id: 23, sigla: "CE" },
        { id: 24, sigla: "RN" },
        { id: 25, sigla: "PB" },
        { id: 26, sigla: "PE" },
        { id: 27, sigla: "AL" },
        { id: 28, sigla: "SE" },
        { id: 29, sigla: "BA" },
        { id: 31, sigla: "MG" },
        { id: 32, sigla: "ES" },
        { id: 33, sigla: "RJ" },
        { id: 35, sigla: "SP" },
        { id: 41, sigla: "PR" },
        { id: 42, sigla: "SC" },
        { id: 43, sigla: "RS" },
        { id: 50, sigla: "MS" },
        { id: 51, sigla: "MT" },
        { id: 52, sigla: "GO" },
        { id: 53, sigla: "DF" },
      ],
      search_nome:'',
      search_cpf: '',
      search_tel: '',

      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,

      //Campos Cadastro
      user_id: "",
      nome: "",
      cpfCnpj: "",
      dataNascimento: "",
      email: "",
      endereco: "",
      complemento: "",
      cidade: "",
      bairro: "",
      uf: "",
      cep: "",
      telefone: "",
      celular: "",

      /// Campos Modal Editar
      edit_id: "",
      edit_pessoa: "",
      edit_nome: "",
      edit_cpfCnpj: "",
      edit_dataNascimento: "",
      edit_email: "",
      edit_endereco: "",
      edit_complemento: "",
      edit_telefone: "",
      edit_celular: "",
      edit_obs: "",
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
    this.retrieveCliente();
    this.retrieveCidade();
  },
  methods: {
    resetForm() {
      (this.nome = ""),
        (this.cpfCnpj = ""),
        (this.dataNascimento = ""),
        (this.email = ""),
        (this.endereco = ""),
        (this.complemento = ""),
        (this.cidade = ""),
        (this.bairro = ""),
        (this.uf = ""),
        (this.cep = ""),
        (this.telefone = ""),
        (this.celular = "");
    },
    async onSubmit() {
      const id_userCad = this.$store.state.auth.user.id;
      await fetch(`${process.env.VUE_APP_API_URL}cliente`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: id_userCad,
          nome: this.nome,
          cpfCnpj: this.cpfCnpj,
          nascimento: this.dataNascimento,
          endereco: this.endereco,
          complemento: this.complemento,
          bairro: this.bairro,
          cidade: this.cidade,
          uf: this.uf,
          cep: this.cep,
          tel: this.telefone,
          cel: this.celular,
          email: this.email,
          obs: this.obs,
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
            this.retrieveCliente();
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
    getRequestParams(search_nome, search_cpf, search_tel, page, pageSize) {
      let params = {};
      if (search_nome) {
        params["nome"] = search_nome;
      }
      if (search_cpf) {
        params["cpfCnpj"] = search_cpf;
      }
      if (search_tel) {
        params["tel"] = search_tel;
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
      this.retrieveCliente();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveCliente();
    },
    async retrieveCidade() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getCidades(params).then((response) => {
          const { cidade } = response.data;
          this.cidades = cidade;
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        } 
      }
    },
    async retrieveCliente() {
      try {
        const params = this.getRequestParams(
          this.search_nome,
          this.search_cpf,
          this.search_tel,
          this.page,
          this.pageSize
        );
        userService.findClientes(params).then((response) => {
          const { cliente, totalPages, totalItems } = response.data;
          this.clientes = cliente;
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
    async editar_cliente(item) {
      (this.edit_id = item.id),
        (this.edit_pessoa = item.pessoa),
        (this.edit_nome = item.nome),
        (this.edit_cpfCnpj = item.cpfCnpj),
        (this.edit_dataNascimento = item.nascimento),
        (this.edit_endereco = item.endereco),
        (this.edit_complemento = item.complemento),
        (this.edit_telefone = item.tel),
        (this.edit_celular = item.cel);
      (this.edit_email = item.email),
        (this.edit_obs = item.obs),
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
        id: this.edit_id,
        pessoa: this.edit_pessoa,
        nome: this.edit_nome,
        cpfCnpj: this.edit_cpfCnpj,
        dataNascimento: this.edit_dataNascimento,
        email: this.edit_email,
        endereco: this.edit_endereco,
        complemento: this.edit_complemento,
        telefone: this.edit_telefone,
        celular: this.edit_celular,
      };

      const response = await axios.put(
        `${process.env.VUE_APP_API_URL}cliente/${this.edit_id}`,
        dados,
        { headers }
      );
      const resp = JSON.stringify(response.status);
      if (resp == 200) {
        this.abrir_modal = true;
        this.msg = "Cliente atualizado com sucesso!";
        setTimeout(() => (this.abrir_modal = false), 9000);
        location.reload();
      }
      //return console.log(response.data);
    },
    vData() {
      var cpf_cnpj = this.cpfCnpj;
      var edit_cpf_cnpj = this.edit_cpfCnpj;
      if (this.formata_cpf_cnpj(cpf_cnpj) == false) {
        console.log("Formato incorreto");
        this.cpfCnpj = "";
      } else {
        this.cpfCnpj = this.formata_cpf_cnpj(cpf_cnpj);
      }

      if (this.formata_cpf_cnpj(edit_cpf_cnpj) == false) {
        console.log("Formato incorreto");
        this.edit_cpfCnpj = "";
      } else {
        this.edit_cpfCnpj = this.formata_cpf_cnpj(edit_cpf_cnpj);
      }

      if (this.formata_cpf_cnpj(this.search_cpf) == false) {
        console.log("Formato incorreto");
        this.search_cpf = "";
      } else {
        this.search_cpf = this.formata_cpf_cnpj(this.search_cpf);
      }
    },
    vTel() {
      const tel = this.telefone;
      this.telefone = this.formata_tel(tel);

      const edit_tel = this.edit_telefone;
      this.edit_telefone = this.formata_tel(edit_tel);
    },
    vCel() {
      const cel = this.celular;
      this.celular = this.formata_tel(cel);

      const edit_cel = this.edit_celular;

      this.edit_celular = this.formata_tel(edit_cel);
    },

    //Funções de validação
    validateEmail(email) {
      console.log("Testando email")
      console.log(email)
      var re = /\S+@\S+\.\S+/;
       if (re.test(email) == false) {
         this.abrir_modal = true;
         this.email= ""
         this.msg = "Digite um email válido, ex: email@email.com!";
         setTimeout(() => (this.abrir_modal = false), 4000);
       }
    },
    verifica_tel(valor) {     
      valor = valor.toString();      
      valor = valor.replace(/[^0-9]/g, "");      
      if (valor.length === 10) {
        return "TELEFONE";
      }      
      else if (valor.length === 11) {
        return "CELULAR";
      }      
      else {
        return false;
      }
    },
    formata_tel(valor) {     
      var formatado = false;     
      var valida = this.verifica_tel(valor);     
      valor = valor.toString();     
      valor = valor.replace(/[^0-9]/g, "");      
      if (valida === "TELEFONE") {      
        formatado = valor.substr(0, 2) + " ";
        formatado += valor.substr(2, 4) + "-";
        formatado += valor.substr(6, 4) + "";
      }     
      else if (valida === "CELULAR") {        
        formatado = valor.substr(0, 2) + " ";
        formatado += valor.substr(2, 5) + "-";
        formatado += valor.substr(7, 4) + "";
      } else {
        formatado = valor;
      }    
      return formatado;
    },
    verifica_cpf_cnpj(valor) {      
      valor = valor.toString(); 
      valor = valor.replace(/[^0-9]/g, "");
      if (valor.length === 11) {
        return "CPF";
      }  
      else if (valor.length === 14) {
        return "CNPJ";
      }
      else {
        return false;
      }
    },
    calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {     
      digitos = digitos.toString();
      for (var i = 0; i < digitos.length; i++) {      
        soma_digitos = soma_digitos + digitos[i] * posicoes;    
        posicoes--;
        if (posicoes < 2) {        
          posicoes = 9;
        }
      }  
      soma_digitos = soma_digitos % 11;
      if (soma_digitos < 2) {  
        soma_digitos = 0;
      } else {
        soma_digitos = 11 - soma_digitos;
      }
      var cpf = digitos + soma_digitos;
      return cpf;
    },
    valida_cpf(valor) {     
      valor = valor.toString();    
      valor = valor.replace(/[^0-9]/g, "");
      var digitos = valor.substr(0, 9);      
      var novo_cpf = this.calc_digitos_posicoes(digitos);     
      novo_cpf = this.calc_digitos_posicoes(novo_cpf, 11);    
      if (novo_cpf === valor) {       
        return true;
      } else {  
        return false;
      }
    },
    valida_cnpj(valor) {     
      valor = valor.toString();   
      valor = valor.replace(/[^0-9]/g, "");     
      var cnpj_original = valor;    
      var primeiros_numeros_cnpj = valor.substr(0, 12);    
      var primeiro_calculo = this.calc_digitos_posicoes(
        primeiros_numeros_cnpj,
        5
      );    
      var segundo_calculo = this.calc_digitos_posicoes(primeiro_calculo, 6);      
      var cnpj = segundo_calculo;      
      if (cnpj === cnpj_original) {
        return true;
      }    
      return false;
    },
    valida_cpf_cnpj(valor) {
      var valida = this.verifica_cpf_cnpj(valor);    
      valor = valor.toString();    
      valor = valor.replace(/[^0-9]/g, "");
      if (valida === "CPF") {  
        return this.valida_cpf(valor);
      }
      else if (valida === "CNPJ") {      
        return this.valida_cnpj(valor);
      }
      else {
        return false;
      }
    },
    formata_cpf_cnpj(valor) {
      var formatado = false;
      var valida = this.verifica_cpf_cnpj(valor);
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");     
      if (valida === "CPF") {       
        if (this.valida_cpf(valor)) {          
          formatado = valor.substr(0, 3) + ".";
          formatado += valor.substr(3, 3) + ".";
          formatado += valor.substr(6, 3) + "-";
          formatado += valor.substr(9, 2) + "";
        }
      }    
      else if (valida === "CNPJ") {       
        if (this.valida_cnpj(valor)) {         
          formatado = valor.substr(0, 2) + ".";
          formatado += valor.substr(2, 3) + ".";
          formatado += valor.substr(5, 3) + "/";
          formatado += valor.substr(8, 4) + "-";
          formatado += valor.substr(12, 14) + "";
        }
      } 
      return formatado;
    },
  },
};
</script>
  
  <style>
/* @import "../../assets/styles/rfCss.css"; */
</style>