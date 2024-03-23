<template>
  <SidebarVue ref="sidebar" />
  <NavgatorAt ref="navgator" :barraTitulo="' Novo Atendimento'" :titulo="'novo atendimento'" />
  <!--Formulário de Cadastro Cliente-->

  <div class="card card-filtro">
    <form @submit.prevent="cadastrar_cliente">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Dados do Cliente</span></i>
        </div>
      </div>
      <div class="row g-2 p-2">
        <!--Telefone-->
        <div class="col-md-2">
          <div class="form-floating">
            <input type="text" class="form-control " :disabled="habilitar_telefone" v-model="tel" v-on:blur="vTel" />
            <label for="valid_nome">Telefone</label>
          </div>
        </div>
        <!--Telefone 2 -->
        <div class="col-md-2">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="cel"
              :style="{ 'border-color': nomeBorderColor }" v-on:blur="vCel" />
            <label for="valid_nome" class="rf_texto">Telefone 2</label>
          </div>
        </div>
        <!--Cliente-->
        <div class="col-md">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="modal_nome"
              :style="{ 'border-color': nomeBorderColor }" v-on:blur="checkForm" required />
            <label for="valid_nome" class="rf_texto">Nome</label>
          </div>
        </div>
        <!--Email-->
        <div class="col-md-3">
          <div class="form-floating">
            <input type="email" class="form-control rf_bg_form rf_texto" v-model="email"
              :style="{ 'border-color': nomeBorderColor }" v-on:blur="validateEmail(email)" />
            <label for="valid_email" class="rf_texto">Email</label>
          </div>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col-2 ">
        <div class="input-group-append">
          <button type="submit" :disabled="habilitar_cadastro" @click="cadastrar_cliente" class="btn btn-lg btn-filtro m-2">
            <span class="rf_texto_btn">Cadastrar</span>
          </button>
        </div>
      </div>
      <div class="col-1 ">
        <div class="input-group-append">
          <button type="submit" :disabled="habilitar_proposta" @click="update_cliente" class="btn btn-lg btn-filtro m-2">
            <span class="rf_texto_btn">Editar</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="abrir_modal">
      <Message :msg="msg" v-show="msg" />
    </div>

    <!-- Modal -->
    <div class="modal" id="modal_cadastrar_cliente">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rf_bg_form">
          <div class="modal-header bg-dark rf_border box-atendimento">
            <h5 class="modal-title fs-5" id="staticBackdropLabel">
              Cadastrar Cliente
            </h5>
          </div>
          <div class="modal-body ">
            <p class="fs-6 fw-bold">Cliente não encontrado na base de dados, deseja cadastrar?</p>
          </div>
          <div class="modal-footer rf_border">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal" @click="modal_cliente">
              Sim
            </button>
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal" @click="close_modal">
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Justificativa -->
    <div class="modal" id="modal_justificar">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content rf_bg_form">
          <div class="modal-header bg-dark rf_border box-atendimento">
            <h5 class="modal-title fs-5 " id="staticBackdropLabel">
              Você está trocando a ordem do vendedor!
            </h5>
          </div>
          <div class="modal-body ">
            <p class="fs-6 fw-bold">Escolha um das justificativas abaixo para prosseguir!</p>
            <div class="form-floating">
              <select class="form-select fw-bold" id="valid_funcao" required v-model="dialog_justificativa">
                <option v-for="item in justificativas" :value="item.id" :key="item.id">
                  {{ item.desc }}
                </option>
              </select>
              <label class="fw-bold">Justificativa</label>
            </div>
          </div>
          <div class="modal-footer rf_border">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal" @click="Justificar">
              Justificar
            </button>
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal" @click="fechar_sem_justificar">
              Fechar sem Justificar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Formulário de Cadastro Proposta-->
  <div class="card card-filtro">
    <form @submit.prevent="onSubmit">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Dados da Proposta</span></i>
        </div>
      </div>
      <div class="row g-2 p-2">
        <!--Vendedor-->
        <div class="col-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" :disabled="input_proposta" v-model="vendedor_inicial"
              v-on:blur="checar_vendedor">
              <option v-for="item in vendedor" :value="item.id" :key="item.id" :class="getStatusClass(item)">
                {{ item.username }}
              </option>
            </select>
            <label class="rf_texto">Vendedor</label>
          </div>
        </div>
        <!--Tipo Veiculo-->
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" :disabled="input_proposta" v-model="tipo_veiculo">
              <option value="0">Novo</option>
              <option value="1">Usado</option>
            </select>
            <label class="rf_texto">Tipo Veículo</label>
          </div>
        </div>
        <!--Midia-->
        <div class="col-md-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto " :disabled="input_proposta" required v-model="midia_id">

              <option v-for="item in midia" :value="item.id" :key="item.id">
                {{ item.descricao }}
              </option>
            </select>
            <label class="rf_texto">Midia</label>
          </div>
        </div>
        <!--Veiculo troca-->
        <div class="col-md-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" id="valid_funcao" :disabled="input_proposta" required
              v-model="searchTroca">
              <option value="0">Não</option>
              <option value="1">Sim</option>
            </select>
            <label class="rf_texto">Veículo Troca</label>
          </div>
        </div>
      </div>
      <div class="row g-2 p-2">
        <!--Observação-->
        <div class="col-md">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" :disabled="input_proposta" v-model="obs" />
            <label class="rf_texto">Observação</label>
          </div>
        </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col-2 ">
          <div class="form-floating">
            <button type="submit" :disabled="habilitar_proposta" class="btn btn-lg btn-filtro ">
              <span class="rf_texto_btn">Abrir Proposta</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!-- <button class="btn" @click="open_modal">open</button> -->
  <RodapeVue />

</template>
<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import userService from "../../services/user.service";
import Message from "../../components/modal/Message.vue";
import axios from "axios";
import TokenService from "../../services/token.service";
import jwt_decode from 'jwt-decode';
import RodapeVue from "../../components/menu/Rodape.vue";
import NavgatorAt from "../../components/menu/NavgatorAt.vue";


export default {
  name: "Atendimento",
  components: {
    SidebarVue,
    NavgatorAt,
    Message,
    RodapeVue
  },

  data() {
    return {
      company_id: "",
      //Paginação
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35],
      pageSize: 5,

      //Paginação Midia
      page_midia: 1,
      totalPages_midia: 0,
      totalItems_midia: 0,
      pageSizes_midia: 1000,
      pageSize_midia: 1000,

      //Controle
      btn_cadastrar: false,
      btn_editar: false,
      msg: "",
      abrir_modal: false,
      empresa_id: [],

      valid: false,
      vtroca: false,
      reveal: false,
      habilitar: true,
      modelo: [],
      selectedModelo: [],
      marca: [],
      vendedor: [],
      midia: [],
      familia: [],
      selectedFamilia: null,

      modal: false,
      vendedor_inicial: "",
      vend_ini: "",
      status_vendedor: "",

      options: [
        { value: 'Indisponível', text: 'Em Atendimento', color: 'red' },
        { value: 'Disponível', text: 'Disponível', color: 'green' },
      ],

      dialog_just: false,
      dialog_cliente: false,
      dialog_justificativa: 0,
      justificativas: [
        { id: 0, desc: "Cliente solicitou a troca do vendedor" },
        { id: 1, desc: "Vendedor não se encontrava no local" },
      ],
      message: "",
      dialog: "",
      dialog_cad_cliente: false,

      //Campos do Atendimento
      tipo_veiculo: 0,
      // itensRetorno: ["Sim", "Não"],
      // searchVend: 1,
      // itensTipo: [
      //   { desc: "Novos", value: 1 },
      //   { desc: "Usados", value: 0 },
      // ],
      searchTroca: 0,
      troca: [{ desc: "SIM" }, { desc: "NÃO" }],
      user_id: "",
      cliente_id: "",
      clientes: [],
      email: "",
      tel: "",
      cel: "",
      marca_id: "",
      modelo_id: "",
      familia_id: "",
      familia_desc: "",
      midia_id: "",
      obs: "",
      tipo: "",

      modal_nome: "",
      modal_cpfcnpj: "",
      modal_tel: "",
      input_cliente: true,

      descriptionLimit: 60,
      descriptionLimit2: 60,
      descriptionLimit3: 60,
      descriptionLimit4: 60,
      entries: [],
      entries2: [],
      entries3: [],
      entries4: [],
      isLoading: false,
      model: null,
      search: null,
      isLoading2: false,
      model2: null,
      input_cpf_cnpj: null,
      search2: null,
      isLoading3: false,
      model3: null,
      search3: null,
      isLoading4: false,
      model4: null,
      search4: null,

      totalItems2: null,
      totalItems3: null,
      totalItems4: null,

      //Campos cadastro veiculo usado
      placa: "",
      kilometragem: "",
      anoFabricacao: "",
      anoModelo: "",

      //Título e Links de navegação
      item_titulo: "Menu - Novo Atendimento",
      id_vend: 2,
      celBorderColor: "",
      nomeBorderColor: "",
      habilitar_proposta: true,
      habilitar_cadastro: true,
      habilitar_telefone: false,
      retorno: false,
      input_proposta: true

    };
  },
  mounted() {
    this.getToken();
    //this.retrieveMarca();
    //this.retrieveFamilia();
    this.retrieveMidia();
    this.retrieveVendedorDispo();
  },

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    fields2() {
      if (!this.model2) return [];

      return Object.keys(this.model2).map((key) => {
        return {
          key,
          value: this.model2[key] || "n/a",
        };
      });
    },
    fields3() {
      if (!this.model3) return [];

      return Object.keys(this.model3).map((key) => {
        return {
          key,
          value: this.model3[key] || "n/a",
        };
      });
    },
    fields4() {
      if (!this.model4) return [];

      return Object.keys(this.model4).map((key) => {
        return {
          key,
          value: this.model4[key] || "n/a",
        };
      });
    },
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.nome.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + "..."
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    },
    items2() {
      return this.entries2.map((entry) => {
        const Description2 =
          entry.cpfCnpj.length > this.descriptionLimit2
            ? entry.Description2.slice(0, this.descriptionLimit2) + "..."
            : entry.Description2;

        return Object.assign({}, entry, { Description2 });
      });
    },
    items3() {
      return this.entries3.map((entry) => {
        const Description3 =
          entry.descricao.length > this.descriptionLimit3
            ? entry.Description3.slice(0, this.descriptionLimit3) + "..."
            : entry.Description3;

        return Object.assign({}, entry, { Description3 });
      });
    },
    items4() {
      return this.entries4.map((entry) => {
        const Description4 =
          entry.descricao.length > this.descriptionLimit4
            ? entry.Description4.slice(0, this.descriptionLimit4) + "..."
            : entry.Description4;

        return Object.assign({}, entry, { Description4 });
      });
    },
    formularioPreenchido() {
      return this.modal_nome && this.tel && this.midia_id;
    }
  },
  watch: {
    search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(`${process.env.VUE_APP_API_URL}clientes`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const { totalItems, cliente } = res;
          this.count = totalItems;
          this.entries = cliente;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
        .finally(() => (this.isLoading = false));
    },
    search2(val) {
      if (val != null) {
        var valor = val;
      } else {
        console.log(val);
      }

      console.log("items 22222 " + valor);
      // Items have already been loaded
      if (this.items2.length > 0) return;

      // Items have already been requested
      if (this.isLoading2) return;

      this.isLoading2 = true;

      // Lazily load input items
      fetch(`${process.env.VUE_APP_API_URL}clientes`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const { totalItems2, cliente } = res;
          this.count = totalItems2;
          this.entries2 = cliente;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
        .finally(() => (this.isLoading2 = false));
    },
    search3() {
      // Items have already been loaded
      if (this.items3.length > 0) return;

      // Items have already been requested
      if (this.isLoading3) return;

      this.isLoading3 = true;

      // Lazily load input items
      fetch(`${process.env.VUE_APP_API_URL}modelo`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const { totalItems3, modelo_veiculo } = res;
          this.count = totalItems3;
          this.entries3 = modelo_veiculo;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
        .finally(() => (this.isLoading3 = false));
    },
    search4() {
      // Items have already been loaded
      if (this.items4.length > 0) return;

      // Items have already been requested
      if (this.isLoading4) return;

      this.isLoading4 = true;

      // Lazily load input items
      fetch(`${process.env.VUE_APP_API_URL}modelo`)
        .then((res) => res.json())
        .then((res) => {
          const { totalItems4, modelo_veiculo } = res;
          this.count = totalItems4;
          this.entries4 = modelo_veiculo;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
        .finally(() => (this.isLoading4 = false));
    },
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
    getStatusClass(item) {
      const option = this.options.find((o) => o.value === item.status_vendedor)
      return `status-${option.color}`
    },
    open_modal() {
      const switchModal = () => {
        const modal = document.getElementById("modal_cadastrar_cliente");
        modal.style.display = "block";
        // const actualStyle = modal.style.display;
        // if (actualStyle == "block") {
        //   modal.style.display = "none";
        // } else {
        //   modal.style.display = "block";
        // }
      };
      switchModal();
    },
    open_modal_justificar() {
      const switchModal = () => {
        const modal = document.getElementById("modal_justificar");
        modal.style.display = "block";
        // const actualStyle = modal.style.display;
        // if (actualStyle == "block") {
        //   modal.style.display = "none";
        // } else {
        //   modal.style.display = "block";
        // }
      };
      switchModal();
    },
    close_modal() {
      const switchModal = () => {
        const modal = document.getElementById("modal_cadastrar_cliente");
        modal.style.display = "none";
        // const actualStyle = modal.style.display;
        // if (actualStyle == "block") {
        //   modal.style.display = "none";
        // } else {
        //   modal.style.display = "block";
        // }
      };
      switchModal();
    },
    //Habilitar cadastro de Clientes
    modal_cliente() {
      this.input_cliente = false;

      this.nomeBorderColor = "green"; // Por exemplo, a cor verde indica que o campo está habilitado
      this.emailBorderColor = "green";
      this.telBorderColor = "green";
      this.celBorderColor = "green";
      this.habilitar_cadastro = false;
      this.close_modal();
    },
    // habilitar_cadastro() {
    //   this.input_cliente = false;
    //   this.modal_cpfcnpj = "";
    //   // Defina aqui a lógica para mudar as cores das bordas dos campos
    //   this.nomeBorderColor = "green"; // Por exemplo, a cor verde indica que o campo está habilitado
    //   this.emailBorderColor = "green";
    //   this.telBorderColor = "green";
    //   this.celBorderColor = "green";

    // },
    async cadastrar_cliente() {
      try {
        if (this.cel === this.tel) {
          // Exemplo: mudar a cor da borda dos campos para vermelho
          this.celBorderColor = "red";
          this.telBorderColor = "red";
          // Exemplo: exibir mensagem de erro
          this.abrir_modal = true;
          this.msg = "Os campos Telefone e Telefone 2 não podem ser iguais.";
          setTimeout(
            () => (
              (this.abrir_modal = false)
            ),
            4000
          );
          return;
        }

        const response = await fetch(`${process.env.VUE_APP_API_URL}cliente`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: this.$store.state.auth.user.id,
            nome: this.modal_nome,
            tel: this.tel,
            cel: this.cel,
            email: this.email,
          }),
        });
        const dados = await response.json();
        console.log(dados.message)
        if (!response.ok) {
          this.abrir_modal = true;
          this.msg = dados.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        } else {
          this.cliente_id = dados.data.id;
          this.habilitar_cadastro = true;
          this.habilitar_telefone = true;
          this.input_cliente = true;
          this.input_proposta = false;
          this.habilitar_proposta = false;
          this.abrir_modal = true;
          this.msg = dados.message;
          setTimeout(() => (this.abrir_modal = false), 4000);

        }
      } catch (error) {
        console.log(error)
        this.abrir_modal = true;
        this.msg = error.response.data.message;
        setTimeout(() => (this.abrir_modal = false), 4000);
      }


    },

    async update_cliente() {
      try {
        if (this.cel === this.tel) {
          // Exemplo: mudar a cor da borda dos campos para vermelho
          this.celBorderColor = "red";
          this.telBorderColor = "red";
          // Exemplo: exibir mensagem de erro
          this.abrir_modal = true;
          this.msg = "Os campos Telefone e Telefone 2 não podem ser iguais.";
          setTimeout(
            () => (
              (this.abrir_modal = false)
            ),
            4000
          );
          return;
        }
        const token = this.$store.state.auth.user.accessToken;
        const headers = {
          "x-access-token": token,
        };
        const dados = {
          id: this.cliente_id,
          id_userCad: this.$store.state.auth.user.id,
          nome: this.modal_nome,
          telefone: this.tel,
          celular: this.cel,
          email: this.email,
        };

        const response = await axios.put(
          `${process.env.VUE_APP_API_URL}cliente/${this.cliente_id}`,
          dados,
          { headers }
        );
        const resp = JSON.stringify(response.status);
        if (resp == 200) {
          this.abrir_modal = true;
          this.msg = "Cliente atualizado com sucesso!";
          setTimeout(() => (this.abrir_modal = false), 9000);

        }

      } catch (error) {
        console.log(error)
        this.abrir_modal = true;
        this.msg = error.response.data.message;
        setTimeout(() => (this.abrir_modal = false), 4000);
      }

    },
    //Gravar função no banco de dados
    async onSubmit() {
      console.log("Gravando uma Proposta")
      if (this.midia_id) {
        try {
          const id_userCad = this.$store.state.auth.user.id;
          await fetch(`${process.env.VUE_APP_API_URL}proposta`, {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: id_userCad,
              retorno: this.retorno,
              avaliacao: this.searchTroca,
              obs: this.obs,
              justificativa: this.dialog_justificativa,
              id_vendedor_fila: this.vend_ini,
              status_vendedor: this.status_vendedor,
              empresa_id: this.company_id,
              midia_id: this.midia_id,
              vendedor_id: this.vendedor_inicial,
              cliente_id: this.cliente_id,
              tipo_veiculo: this.tipo_veiculo

            }),
          })
            .then((data) => {
              if (!data.ok) {
                if (data.status == 400) {
                  this.abrir_modal = true;
                  this.msg = "O sistema está em atualização. Atualize a página para verificar se terminou!";
                }
                throw Error(data.status);
              }
              return data.json();
            })
            .then((resposta) => {
              if (resposta.StatusOk == 200) {
                this.abrir_modal = true;
                this.msg = resposta.message;
                setTimeout(
                  () => (
                    (this.abrir_modal = false),
                    this.$router.push('/atendimento/dashboard')
                  ),
                  4000
                );
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
        } catch (error) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      } else {
        this.abrir_modal = true;
        this.msg = "O campo mídia é obrigatório!";
        setTimeout(() => (this.abrir_modal = false), 4000);
      }



    },
    //Buscar dados no banco de dados
    getRequestParams(page, pageSize, empresa_id, id_vend) {
      let params = {};
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      if (empresa_id) {
        params["empresa_id"] = empresa_id;
      }
      if (id_vend) {
        params["id_vend"] = id_vend;
      }
      return params;
    },
    getRequestParamsCliente(telefone) {
      let params = {};
      if (telefone) {
        params["telefone"] = telefone;
      }
      return params;
    },
    getRequestParamsMidias(searchTitle, page_midia, pageSize_midia) {
      let params = {};
      if (searchTitle) {
        params["nome"] = searchTitle;
      }
      if (page_midia) {
        params["page"] = page_midia - 1;
      }
      if (pageSize_midia) {
        params["size"] = pageSize_midia;
      }
      return params;
    },

    async retrieveModelo() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getModelo(params).then((response) => {
          const { modelo_veiculo, totalPages } = response.data;
          this.modelo = modelo_veiculo;
          this.totalPages = totalPages;
          console.log(response.data);
        }).catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },

    async retrieveMarca() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getMarca(params).then((response) => {
          const { marcas, totalPages } = response.data;
          this.marca = marcas;
          this.totalPages = totalPages;
          console.log(response.data);
        }).catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async retrieveFamilia() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getFamilia_at(params).then((response) => {
          const { familia_veiculo, totalPages } = response.data;
          this.familia = familia_veiculo;
          this.totalPages = totalPages;
          console.log(response.data);
        }).catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async retrieveMidia() {
      try {
        const params = this.getRequestParamsMidias(
          this.searchTitle,
          this.page_midia,
          this.pageSize_midia
        );
        userService.getMidia(params).then((response) => {
          const { midias } = response.data;

          this.midia = midias;

          console.log(response.data);
        }).catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async retrieveVendedorDispo() {
      try {
        const params = this.getRequestParams(
          this.page,
          this.pageSize,
          this.company_id,
          this.id_vend,
        );
        console.log("Buscando vendedore")
        userService.getVendedorOrdenado(params).then((response) => {
          const { users } = response.data;
          this.vendedor = users;
          let dados_vendedor = [];
          let ven = [];
          let tipo_vend = "";
          let status_vend = "";

          users.forEach(function (item) {
            if (item.tipo_vendedor == 2) {
              tipo_vend = "Ambos";
            }

            // if (item.tipo_vendedor == 1) {
            //   tipo_vend = "Novos";
            // }
            // if (item.tipo_vendedor == 2) {
            //   tipo_vend = "Usados";
            // }
            if (item.status_vendedor == 1) {
              status_vend = "Disponível";
            }
            if (item.status_vendedor == 0) {
              status_vend = "Indisponível";
            }

            dados_vendedor = {
              id: item.id,
              username: item.username,
              tipo_vendedor: tipo_vend,
              status_vendedor: status_vend,
            };

            ven.push(dados_vendedor);
          });

          console.log("Aqui dados do Ven-------------------------------");
          console.log(response.data);

          this.vendedor = ven;
          this.vendedor_inicial = ven[0]["id"];
          this.vend_ini = users[0]['id'];
          this.status_vendedor = ven[0]["status_vendedor"];
          console.log(this.status_vendedor);
          console.log(this.vend_ini);
        }).catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveCidades();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveCidades();
    },
    getDisplayFunction(role) {
      return {
        id: role.id,
        nome: role.name.substr(0, 20) + "...",
        description: role.description.substr(0, 20) + "...",

      };
    },
    validate() {
      this.$refs.form.validate();
    },
    async dados() {
      if (this.selectedFamilia) {
        await axios.get(`${process.env.VUE_APP_API_URL}modelos`, {
          params: { familiaVeiculoId: this.selectedFamilia }
        })
          .then(response => {
            this.modelo = response.data.rows
            console.log(response.data.rows)
          })
          .catch(error => {
            if (error.response.status == 400) {
              this.abrir_modal = true;
              this.msg = error.response.data.message;
            }
          })

        // for (let i = 0; i < this.modelo.length; i++) {
        //   if (this.familia_id == this.modelo[i]["familiaVeiculoId"]) {
        //     console.log(this.modelo[i]);
        //     this.marca_id = this.modelo[i]["familia_veiculo"]["marcaVeiculoId"];
        //     this.familia_desc = this.modelo[i]["familia_veiculo"]["descricao"];
        //     this.familia_id = this.modelo[i]["familiaVeiculoId"];
        //     this.modelo_id = this.modelo[i]["id"];

        //     console.log("Marca----");
        //     console.log(this.marca_id);
        //     console.log("Familia");
        //     console.log(this.familia_desc);
        //     console.log(this.familia_id);
        //     console.log("Modelo");
        //     console.log(this.modelo_id);
        //     //JSON.parse(JSON.stringify(custo_variaveis))
        //   }
        // }
      } else {
        this.modelo = []
      }
      //Validação campo Modelo
      //   if (this.model3 != null) {
      //     this.marca_id = this.model3.marcaVeiculo;
      //     this.familia_desc = this.model3.familiaVeiculo.descricao;
      //     this.familia_id = this.model3.familiaVeiculo.id;
      //     this.modelo_id = this.model3.id;

      //     console.log("Marca----")
      //     console.log(this.marca_id);
      //     console.log("Familia")
      //     console.log(this.familia_desc);
      //     console.log(this.familia_id);
      //     console.log("Modelo");
      //     console.log(this.modelo_id);

      //   }
      if (this.modal_nome != null) {
        console.log(this.modal_nome);
      }
      //pesquisa por cpf ou cnpj
      // if (this.model2 != null) {
      //   console.log(this.model2);
      //  // this.email = this.model2.email;
      //  // this.tel = this.model2.tel;
      //  // this.cel = this.model2.cel;
      //  // this.model = this.model2.nome;
      //   //this.cliente_id = this.model2.id;
      //   //this.buscaVendedor(this.model2.id);
      // }else{
      //   console.log("Vazio")
      // }
      //pesquisa por nome
      if (this.model != null) {
        this.buscaVendedor(this.model.id);
      }
    },

    checar_vendedor() {

      if (this.vendedor_inicial != this.vend_ini) {
        console.log("Diferente");
        this.atualizar_status_vendedor();
        // console.log(item);
        // console.log(this.vendedor_inicial)
        // console.log(this.vendedor)
        this.open_modal_justificar();
        // this.status_vendedor = this.vendedor_inicial.status_vendedor;
        // console.log("Status do vendedo na função checar vendedor")
        console.log(this.status_vendedor)
      }
    },

    atualizar_status_vendedor() {
      const vendedorSelecionado = this.vendedor.find(v => v.id === this.vendedor_inicial)
      if (vendedorSelecionado) {
        this.status_vendedor = vendedorSelecionado.status_vendedor
      }
    },


    Justificar() {
      const switchModal = () => {
        const modal = document.getElementById("modal_justificar");
        modal.style.display = "none";

      };
      switchModal();
    },

    fechar_sem_justificar() {
      const switchModal = () => {
        const modal = document.getElementById("modal_justificar");
        modal.style.display = "none";
        this.retrieveVendedorDispo();

      };
      switchModal();
    },

    async buscaVendedor(id) {
      try {
        userService.getPropostaClienteId(id).then((response) => {
          const result = response.data.count;
          if (this.model != null) {
            return;
          }
          if (this.model2 != null) {
            return;
          }
          if (result > 0) {
            this.modal = true;
            this.dialog = true;
            this.message = "Esse cliente já está em atendimento!";
            this.model = "";
          } else {
            this.modal_cpfcnpj = this.email = this.model.email;
            this.tel = this.model.tel;
            this.cel = this.model.cel;
            this.cliente_id = this.model.id;
            this.model2 = this.items.cpfCnpj;
            this.habilitar = false;
          }
        }).catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },

    vData() {
      var cpf_cnpj = this.modal_cpfcnpj;

      ///Validação do CPF/CNPJ
      if (this.formata_cpf_cnpj(cpf_cnpj)) {
        this.modal_cpfcnpj = this.formata_cpf_cnpj(cpf_cnpj);


        console.log(this.modal_cpfcnpj);
        try {
          const params = this.getRequestParamsCliente(this.modal_cpfcnpj);

          userService.getClientes(params).then((response) => {
            const cliente = response.data;
            console.log("Resultado Clientes");
            console.log(response.data);
            if (response.data == "Não encontrado") {
              this.open_modal();
            }

            if (cliente != null) {
              this.cliente_id = cliente["id"];
              console.log(this.cliente_id);
              try {
                userService
                  .getPropostaClienteId(this.cliente_id)
                  .then((response) => {
                    const result = response.data.count;
                    if (result > 0) {
                      this.modal = true;
                      this.dialog = true;
                      this.message = "Esse cliente já está em atendimento!";
                    } else {
                      this.modal_nome = cliente["nome"];
                      this.email = cliente["email"];
                      this.tel = cliente["tel"];
                      this.cel = cliente["cel"];
                      this.habilitar = false;
                      console.log(response.data);
                    }
                  });
              } catch (error) {
                if (error.response.status == 400) {
                  this.abrir_modal = true;
                  this.msg = error.response.data.message;
                }
              }
            } else {
              this.open_modal();
              console.log("Cliente não cadastrado deseja cadastrar?");
            }
          }).catch((error) => {
            if (error.response.status == 400) {
              this.abrir_modal = true;
              this.msg = error.response.data.message;
            }
          })
        } catch (error) {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        }
      } else {
        this.dialog_cad_cliente = true;
        this.modal = true;
        this.message = "CPF ou CNPJ inválido!";
      }
    },

    vTel() {
      var telefone = this.tel;
      this.tel = this.tel.replace(/\D/g, '');
      if (this.tel.length >= 10 && this.tel.length <= 11) {
        this.tel = this.formata_tel(telefone);
        try {
          const params = this.getRequestParamsCliente(this.tel);
          userService.getClientes(params).then((response) => {
            const cliente = response.data;
            if (response.data == "Não encontrado") {
              this.open_modal();
            } else {
              this.cliente_id = cliente["id"];
              this.modal_nome = cliente["nome"];
              this.email = cliente["email"];
              this.cel = cliente["cel"];
              this.retorno = true;
              this.habilitar_proposta = false;
              this.input_proposta = false;
            }
          })
        } catch (error) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      } else {
        this.abrir_modal = true;
        this.msg = "Número de telefone incorreto";
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
    vCel() {
      var telefone = this.cel;
      console.log(telefone);
      this.cel = this.formata_tel(telefone);
      if (this.tel == this.cel) {
        this.abrir_modal = true;
        this.msg = "Telefones não podem ser iguais!";
        this.cel = "";
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
        //this.cadastrar_cliente();
      }

      // Valida CNPJ
      else if (valida === "CELULAR") {
        // Verifica se o CNPJ é válido

        // Formata o CNPJ ##.###.###/####-##
        formatado = valor.substr(0, 2) + " ";
        formatado += valor.substr(2, 5) + "-";
        formatado += valor.substr(7, 4) + "";
        //this.cadastrar_cliente();
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
    validateEmail(email) {
      console.log("Testando email")
      console.log(email)
      var re = /\S+@\S+\.\S+/;
      if (re.test(email) == false) {
        this.abrir_modal = true;
        this.email = ""
        this.msg = "Digite um email válido, ex: email@email.com!";
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
  },
};
</script>
