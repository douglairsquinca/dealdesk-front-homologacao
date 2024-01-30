<template>
  <div>
    <SidebarVue />
    <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
      <div class="container-fluid">
        <div><i class="bi bi-sliders fs-5"> Administração - Empresas </i></div>
        <div>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link class="nav-link rf_texto active" to="/admin">Dashboard /</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link rf_texto_a disabled">Empresas</a>
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
            <i class="bi bi-person-fill-add fs-5"> Cadastrar Empresa </i>
          </div>
        </div>
        <div class="row g-2 p-2">
          <!--Nome-->
          <div class="col-md">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="nome" id="valid_nome" required />
              <label for="valid_nome" class="rf_texto">Nome</label>
              <div class="invalid-feedback">O campo nome é obrigatório!</div>
            </div>
          </div>
          <!--CNPJ-->
          <div class="col-md-2">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="cnpj" v-on:blur="vData" />
              <label class="rf_texto">CNPJ</label>

            </div>
          </div>
          <!--Endereço-->
          <div class="col-md-4">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="endereco" id="valid_endereco"
                required />
              <label for="valid_endereco" class="rf_texto">Endereço</label>
              <div class="invalid-feedback">
                O campo endereço é obrigatório!
              </div>
            </div>
          </div>
          <!--Complemento-->
          <div class="col-md-2">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="complemento" id="valid_complemento"
                required />
              <label for="valid_complemento" class="rf_texto">Complemento</label>
              <div class="invalid-feedback">
                O campo complemento é obrigatório!
              </div>
            </div>
          </div>
        </div>
        <div class="row g-2 p-2">
          <!--Cidade-->
          <div class="col-md-2">
            <div class="form-floating">
              <input v-model="cidadeSelecionada" class="form-control rf_bg_form rf_texto" list="datalistCidades" id="estado"
                autocomplete="off">

              <label class="rf_texto">Cidade</label>
              <datalist id="datalistCidades">
                <option v-for="opt in cidades" :data-value="opt.id" :value="opt.nome" :key="opt.id"></option>
              </datalist>
            </div>
          </div>
          <!--Bairro-->
          <div class="col-md-2">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="bairro"  autocomplete="off" />
              <label for="valid_bairro" class="rf_texto">Bairro</label>           
            </div>
          </div>
          <!--UF-->
          <div class="col">
            <div class="form-floating">
              <input v-model="uf" class="form-control rf_bg_form rf_texto" list="datalistOptions" id="estado"
                autocomplete="off">

              <label class="rf_texto">UF</label>
              <datalist id="datalistOptions">
                <option v-for="opt in estados" :data-value="opt.id" :value="opt.sigla" :key="opt.id"></option>
              </datalist>
            </div>
          </div>
          <!--CEP-->
          <div class="col-md-1">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="cep" id="valid_cep"/>
              <label for="valid_cep" class="rf_texto">CEP</label>
         
            </div>
          </div>
          <!--Telefone-->
          <div class="col-md-2">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="telefone" v-on:blur="vTel" />
              <label class="rf_texto">Telefone</label>

            </div>
          </div>
          <!--Celular-->
          <div class="col-md-2">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="celular" v-on:blur="vCel" />
              <label class="rf_texto">Celular</label>

            </div>
          </div>
          <!--Email-->
          <div class="col-md-2">
            <div class="form-floating">
              <input type="email" class="form-control rf_bg_form rf_texto" v-model="email"
                v-on:blur="validateEmail(email)" />
              <label for="valid_email" class="rf_texto">Email</label>             
            </div>
          </div>
        </div>
        <div class="row g-2 p-2">
          <!--Qtd-Usuários-->
          <div class="col-md-2">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="qtd_usuarios" id="valid_qtdUsuarios"/>
              <label for="valid_qtdUsuarios" class="rf_texto">Qtd. Usuários</label>
            </div>
          </div>
          <div class="col-2">
            <div class="form-floating">
              <select class="form-select rf_bg_form rf_texto" v-model="tipo_empresa" required>
                <option value="1">Quatro Rodas</option>
                <option value="2">Duas Rodas</option>
              </select>
              <label class="rf_texto">Tipo Empresa</label>
            </div>
          </div>
          <!--Data Contrato-->
          <!-- <div class="col-md-2">
            <div class="form-floating">
              <input type="date" class="form-control rf_bg_form rf_texto" v-model="data_contrato" id="valid_dataContrato"
                required />
              <label for="valid_dataContrato" class="rf_texto">Data Contrato</label>
              <div class="invalid-feedback">
                O campo data contrato é obrigatório!
              </div>
            </div>
          </div> -->
          
          <!--Observação-->
          <div class="col-md">
            <div class="form-floating">
              <input type="text" class="form-control rf_bg_form rf_texto" v-model="obs" id="valid_obs"/>
              <label for="valid_obs" class="rf_texto">Observação</label>            
            </div>
          </div>
        </div>
        <div class="col-md p-2">
          <div class="form-floating">
            <button type="submit" :disabled="btn_cadastrar" class="btn btn-secondary">
              Cadastrar
            </button>
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
            <label class="rf_texto">Nome</label>
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
       
        <div class="col-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="searchTipoEmpresas">
              <option value="">------</option>
              <option value="1">Quatro Rodas</option>
              <option value="2">Duas Rodas</option>
            </select>
            <label class="rf_texto">Tipo Empresa</label>
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
            <button class="btn btn-lg btn-secondary mt-2" type="button" @click="page = 1; retrieveEmpresa();">
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
            <th scope="col">CNPJ</th>
            <th scope="col">Endereço</th>
            <th scope="col">Telefone</th>
            <th scope="col">Status</th>
            <th scope="col">Tipo Empresa</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in empresas" :key="item.nome">
            <td>{{ item.nome }}</td>
            <td>{{ item.cnpj }}</td>
            <td>{{ item.endereco }}</td>
            <td>{{ item.tel }}</td>
            <td>{{ getStatus(item.status) }}</td>
            <td>{{ getTipoEmpresa(item.tipo_empresa) }}</td>

            <td>
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_empresa(item)">
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
      <pagination v-if="empresas.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
        @change-page="handlePageChange" />
    </div>

    <!-- Modal para edição -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content rf_bg_form rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Empresa</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <!--Nome-->
              <div class="col-md">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_nome" />
                  <label class="rf_texto">Nome</label>

                </div>
              </div>
              <!--CNPJ-->
              <div class="col-md-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_cnpj" />
                  <label class="rf_texto">CNPJ</label>

                </div>
              </div>
              <!--Endereço-->
              <div class="col-md-4">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_endereco" />
                  <label class="rf_texto">Endereço</label>

                </div>
              </div>
              <!--Complemento-->
              <div class="col-md-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_complemento" />
                  <label class="rf_texto">Complemento</label>

                </div>
              </div>
            </div>
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <input type="text" list="datalistCidades" v-model="selectedOption.nome" @change="updateSelectedOption"
                    class="form-control rf_bg_form rf_texto">
                  <label class="rf_texto">Cidade</label>
                  <datalist id="datalistCidades">
                    <option v-for="option in cidades" :value="option.nome" :selected="selectedOption.id === option.id"
                      :key="option.id">{{ option.nome }}</option>
                  </datalist>

                </div>
              </div>

              <!--Bairro-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_bairro" />
                  <label for="valid_bairro" class="rf_texto">Bairro</label>


                </div>
              </div>
              <!--UF-->
              <div class="col-1">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="edit_uf" required>
                    <option v-for="item in estados" :value="item.id" :key="item.id">
                      {{ item.sigla }}
                    </option>
                  </select>
                  <label for="valid_status" class="rf_texto">UF</label>

                </div>
              </div>
              <!--CEP-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_cep" />
                  <label class="rf_texto">CEP</label>

                </div>
              </div>
              <!--Telefone-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_telefone" />
                  <label class="rf_texto">Telefone</label>

                </div>
              </div>
              <!--Celular-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_celular" />
                  <label for="valid_celular" class="rf_texto">Celular</label>

                </div>
              </div>
            </div>
            <div class="row g-2 p-2">
              <!--Email-->
              <div class="col">
                <div class="form-floating">
                  <input type="email" class="form-control rf_bg_form rf_texto" v-model="edit_email" />
                  <label for="valid_email" class="rf_texto">Email</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="edit_tipo_empresa" required>
                    <option value="1">Quatro Rodas</option>
                    <option value="2">Duas Rodas</option>
                  </select>
                  <label class="rf_texto">Tipo Empresa</label>
                </div>
              </div>
              <div class="col-3">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="edit_status" id="valid_status" required>
                    <option value="false">Desabilitado</option>
                    <option value="true">Habilitado</option>
                  </select>
                  <label class="rf_texto">Status</label>

                </div>
              </div>
              <!--Qtd-Usuários-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_qtdUsuarios" />
                  <label for="valid_qtdUsuarios" class="rf_texto">Qtd. Usuários</label>

                </div>
              </div>
              <!--Data Contrato-->
              <!-- <div class="col-3">
                <div class="form-floating">
                  <input type="date" class="form-control rf_bg_form rf_texto" v-model="edit_dataContrato" />
                  <label class="rf_texto">Data Contrato</label>

                </div>
              </div> -->
            </div>
            <div class="row g-2 p-2">

              <!--Observação-->
              <div class="col-md">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_obs" />
                  <label class="rf_texto">Observação</label>

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
      empresas: [],
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

      selectedOption: { id: null, nome: '' },
      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,

      //Campos Cadastro
      user_id: "",
      nome: "",
      cnpj: "",
      endereco: "",
      complemento: "",
      cidadeSelecionada: "",
      cidadeId:"",
      bairro: "",
      uf: "",
      cep: "",
      telefone: "",
      celular: "",
      email: "",
      qtd_usuarios: "",
      data_contrato: "",
      expira_contrato: "",
      tipo_empresa:"",
      obs: "",

      btn_cadastrar: false,

      /// Campos Modal Editar
      edit_id: "",
      edit_nome: "",
      edit_cnpj: "",
      edit_endereco: "",
      edit_complemento: "",
      edit_cidade: "",
      edit_bairro: "",
      edit_uf: "",
      edit_cep: "",
      edit_telefone: "",
      edit_celular: "",
      edit_email: "",
      edit_qtdUsuarios: "",
      edit_dataContrato: "",
      edit_tipo_empresa: "",
      edit_obs: "",

      show1: false,
      //Params
      searchTitle: "",
      searchStatus: "",
      searchTipoEmpresas:"",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35,50,100],
      pageSize: 100,

      OpenClose: this.visible,
    };
  },
  watch:{
    cidadeSelecionada: function (novaCidade) {
      const cidade = this.cidades.find(m => m.nome === novaCidade);
      this.cidadeId = cidade ? cidade.id : null;   
    },
  },
  mounted() {
    this.retrieveEmpresa();
    this.retrieveCidade();
  },
  computed: {
    selectedOptionId() {
      return this.selectedOption.id || null;
    },
  },
  methods: {
    getStatus(status) {
      return status === 0 ? 'Desabilitado' : 'Habilitado';
    },
    getTipoEmpresa(tipo_empresa) {
      return tipo_empresa === 1 ? 'Quatro Rodas' : 'Duas Rodas';
    },
    async onSubmit() {
      const id_userCad = this.$store.state.auth.user.id;
      await fetch(`${process.env.VUE_APP_API_URL}empresa`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_user_cad: id_userCad,
          nome: this.nome,
          cnpj: this.cnpj,
          endereco: this.endereco,
          complemento: this.complemento,
          bairro: this.bairro,
          cep: this.cep,
          tel: this.telefone,
          cel: this.celular,
          email: this.email,
          cidade_id: this.cidadeId,
          qtd_usuarios: this.qtd_usuarios,
          data_contrato: this.data_contrato,
          expira_contrato: this.expira_contrato,
          tipo_empresa: this.tipo_empresa,	
          obs: this.obs,

        }),
      })
      .then((data)=>{
        if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();
      })
      .then((resposta) =>{
        if (resposta.StatusOk == 200) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 4000);
              location.reload();
              
            }
            if (resposta.StatusOk == 204) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 4000);
            }
      })


      // Resetting Values

      this.nome = "";
      this.cnpj = "",
        this.endereco = "",
        this.complemento = "",
        this.cidade = "",
        this.bairro = "",
        this.uf = "",
        this.cep = "",
        this.telefone = "",
        this.celular = "",
        this.email = "",
        this.qtd_usuarios = "",
        this.data_contrato = "",
        this.expira_contrato = "",
        this.obs = ""
    },

    //Buscar dados no banco de dados
    getRequestParams(searchTitle, page, pageSize, searchStatus, searchTipoEmpresas) {
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
      if (searchTipoEmpresas) {
        params["tipo_empresa"] = searchTipoEmpresas;
      }
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveEmpresa();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveEmpresa();
    },
    async retrieveEmpresa() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize,
          this.searchStatus,
          this.searchTipoEmpresas
        );
        userService.getEmpresas(params).then((response) => {
          const { empresas, totalPages, totalItems } = response.data;
          this.empresas = empresas;
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

    async editar_empresa(item) {
      (this.edit_id = item.id),
        (this.edit_nome = item.nome),
        (this.edit_cnpj = item.cnpj),
        (this.edit_endereco = item.endereco),
        (this.edit_complemento = item.complemento),
        this.selectedOption.nome = item.cidade.nome,
        (this.edit_cidade = item.cidade_id),
        (this.edit_bairro = item.bairro),
        (this.edit_uf = item.cidade.estado_id),
        (this.edit_cep = item.cep),
        (this.edit_telefone = item.tel),
        (this.edit_celular = item.cel);
        (this.edit_email = item.email),
        (this.edit_qtdUsuarios = item.qtd_usuarios),
        //(this.edit_dataCadastro = new Date().toISOString()),
        (this.edit_obs = item.obs)
        this.edit_status = item.status
        this.edit_tipo_empresa = item.tipo_empresa
      console.log("Valores da Empresas")
      console.log(item);

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
        nome: this.edit_nome,
        cnpj: this.edit_cnpj,
        endereco: this.edit_endereco,
        complemento: this.edit_complemento,
        cidade: this.edit_cidade,
        bairro: this.edit_bairro,
        uf: this.edit_uf,
        cep: this.edit_cep,
        telefone: this.edit_telefone,
        celular: this.edit_celular,
        email: this.edit_email,
        qtd_usuarios: this.edit_qtdUsuarios,
        dataCadastro: this.edit_dataCadastro,
        obs: this.edit_obs,
        tipo_empresa: this.edit_tipo_empresa
      };

      const response = await axios.put(
        `${process.env.VUE_APP_API_URL}empresa/${this.edit_id}`,
        dados,
        { headers }
      );
     
      if (response.data.StatusOk == 200) {
        this.abrir_modal = true;
        this.msg = "Atualizado com sucesso!";
        setTimeout(() => (this.abrir_modal = false), 4000);
        location.reload();
      }
    },

    vData() {
      var cnpj = this.cnpj;
      var edit_cnpj = this.edit_cnpj;
      if (this.formata_cpf_cnpj(cnpj) == false) {
        console.log("Formato incorreto")
        this.cnpj = "";

      } else {
        this.cnpj = this.formata_cpf_cnpj(cnpj);
      }

      if (this.formata_cpf_cnpj(edit_cnpj) == false) {
        console.log("Formato incorreto")
        this.edit_cnpj = "";

      } else {
        this.edit_cnpj = this.formata_cpf_cnpj(edit_cnpj);
      }
    },
    vTel() {
      const tel = this.telefone;
      this.telefone = this.formata_tel(tel)

      const edit_tel = this.edit_telefone
      this.edit_telefone = this.formata_tel(edit_tel)
    },
    vCel() {
      const cel = this.celular;
      this.celular = this.formata_tel(cel)

      const edit_cel = this.edit_celular;

      this.edit_celular = this.formata_tel(edit_cel)
    },

    //Funções de validação
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
    verifica_tel(valor) {
      // Garante que o valor é uma string
      valor = valor.toString();

      // Remove caracteres inválidos do valor
      valor = valor.replace(/[^0-9]/g, "");

      // Verifica CPF
      if (valor.length === 10) {
        return "TELEFONE";
      }

      // Verifica CNPJ
      else if (valor.length === 11) {
        return "CELULAR";
      }

      // Não retorna nada
      else {
        return false;
      }
    },
    formata_tel(valor) {
      // O valor formatado
      var formatado = false;

      // Verifica se é CPF ou CNPJ
      var valida = this.verifica_tel(valor);

      // Garante que o valor é uma string
      valor = valor.toString();

      // Remove caracteres inválidos do valor
      valor = valor.replace(/[^0-9]/g, "");

      // Valida CPF
      if (valida === "TELEFONE") {
        // Verifica se o CPF é válido

        // Formata o CPF ###.###.###-##
        formatado = valor.substr(0, 2) + " ";
        formatado += valor.substr(2, 4) + "-";
        formatado += valor.substr(6, 4) + "";

      }

      // Valida CNPJ
      else if (valida === "CELULAR") {
        // Verifica se o CNPJ é válido

        // Formata o CNPJ ##.###.###/####-##
        formatado = valor.substr(0, 2) + " ";
        formatado += valor.substr(2, 5) + "-";
        formatado += valor.substr(7, 4) + "";

      } else {
        formatado = valor;

        // this.dialog = true,
        // this.modal = true,
        // this.message = "Formato do Telefone está incorreto!"
        // console.log(this.dialog);
      }

      console.log(formatado);

      // Retorna o valor
      return formatado;
    },
    verifica_cpf_cnpj(valor) {
      // Garante que o valor é uma string
      valor = valor.toString();

      // Remove caracteres inválidos do valor
      valor = valor.replace(/[^0-9]/g, "");

      // Verifica CPF
      if (valor.length === 11) {
        return "CPF";
      }

      // Verifica CNPJ
      else if (valor.length === 14) {
        return "CNPJ";
      }

      // Não retorna nada
      else {
        return false;
      }
    },
    calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {
      // Garante que o valor é uma string
      digitos = digitos.toString();

      // Faz a soma dos dígitos com a posição
      // Ex. para 10 posições:
      //   0    2    5    4    6    2    8    8   4
      // x10   x9   x8   x7   x6   x5   x4   x3  x2
      //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
      for (var i = 0; i < digitos.length; i++) {
        // Preenche a soma com o dígito vezes a posição
        soma_digitos = soma_digitos + digitos[i] * posicoes;

        // Subtrai 1 da posição
        posicoes--;

        // Parte específica para CNPJ
        // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
        if (posicoes < 2) {
          // Retorno a posição para 9
          posicoes = 9;
        }
      }

      // Captura o resto da divisão entre soma_digitos dividido por 11
      // Ex.: 196 % 11 = 9
      soma_digitos = soma_digitos % 11;

      // Verifica se soma_digitos é menor que 2
      if (soma_digitos < 2) {
        // soma_digitos agora será zero
        soma_digitos = 0;
      } else {
        // Se for maior que 2, o resultado é 11 menos soma_digitos
        // Ex.: 11 - 9 = 2
        // Nosso dígito procurado é 2
        soma_digitos = 11 - soma_digitos;
      }

      // Concatena mais um dígito aos primeiro nove dígitos
      // Ex.: 025462884 + 2 = 0254628842
      var cpf = digitos + soma_digitos;

      // Retorna
      return cpf;
    },
    valida_cpf(valor) {
      // Garante que o valor é uma string
      valor = valor.toString();

      // Remove caracteres inválidos do valor
      valor = valor.replace(/[^0-9]/g, "");

      // Captura os 9 primeiros dígitos do CPF
      // Ex.: 02546288423 = 025462884
      var digitos = valor.substr(0, 9);

      // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
      var novo_cpf = this.calc_digitos_posicoes(digitos);

      // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
      novo_cpf = this.calc_digitos_posicoes(novo_cpf, 11);

      // Verifica se o novo CPF gerado é idêntico ao CPF enviado
      if (novo_cpf === valor) {
        // CPF válido
        return true;
      } else {
        // CPF inválido
        return false;
      }
    },
    valida_cnpj(valor) {
      // Garante que o valor é uma string
      valor = valor.toString();

      // Remove caracteres inválidos do valor
      valor = valor.replace(/[^0-9]/g, "");

      // O valor original
      var cnpj_original = valor;

      // Captura os primeiros 12 números do CNPJ
      var primeiros_numeros_cnpj = valor.substr(0, 12);

      // Faz o primeiro cálculo
      var primeiro_calculo = this.calc_digitos_posicoes(
        primeiros_numeros_cnpj,
        5
      );

      // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
      var segundo_calculo = this.calc_digitos_posicoes(primeiro_calculo, 6);

      // Concatena o segundo dígito ao CNPJ
      var cnpj = segundo_calculo;

      // Verifica se o CNPJ gerado é idêntico ao enviado
      if (cnpj === cnpj_original) {
        return true;
      }

      // Retorna falso por padrão
      return false;
    },
    valida_cpf_cnpj(valor) {
      // Verifica se é CPF ou CNPJ
      var valida = this.verifica_cpf_cnpj(valor);

      // Garante que o valor é uma string
      valor = valor.toString();

      // Remove caracteres inválidos do valor
      valor = valor.replace(/[^0-9]/g, "");

      // Valida CPF
      if (valida === "CPF") {
        // Retorna true para cpf válido
        return this.valida_cpf(valor);
      }

      // Valida CNPJ
      else if (valida === "CNPJ") {
        // Retorna true para CNPJ válido
        return this.valida_cnpj(valor);
      }

      // Não retorna nada
      else {
        return false;
      }
    },
    formata_cpf_cnpj(valor) {
      // O valor formatado
      var formatado = false;

      // Verifica se é CPF ou CNPJ
      var valida = this.verifica_cpf_cnpj(valor);

      // Garante que o valor é uma string
      valor = valor.toString();

      // Remove caracteres inválidos do valor
      valor = valor.replace(/[^0-9]/g, "");

      // Valida CPF
      if (valida === "CPF") {
        // Verifica se o CPF é válido
        if (this.valida_cpf(valor)) {
          // Formata o CPF ###.###.###-##
          formatado = valor.substr(0, 3) + ".";
          formatado += valor.substr(3, 3) + ".";
          formatado += valor.substr(6, 3) + "-";
          formatado += valor.substr(9, 2) + "";
        }
      }

      // Valida CNPJ
      else if (valida === "CNPJ") {
        // Verifica se o CNPJ é válido
        if (this.valida_cnpj(valor)) {
          // Formata o CNPJ ##.###.###/####-##
          formatado = valor.substr(0, 2) + ".";
          formatado += valor.substr(2, 3) + ".";
          formatado += valor.substr(5, 3) + "/";
          formatado += valor.substr(8, 4) + "-";
          formatado += valor.substr(12, 14) + "";
        }
      }

      // Retorna o valor
      return formatado;
    },
  },
};
</script>
  
