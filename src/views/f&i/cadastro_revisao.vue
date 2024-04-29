<template>
  <SidebarVue ref="sidebar" />
  <NavgatorFI
    ref="navgator"
    :barraTitulo="' F&I - Revisão Programada'"
    :titulo="'revisão'"
  />

  <div class="card card-filtro">
    <form @submit.prevent="onSubmit" id="form">
      <div class="row g-2 p-2">
        <div class="card-title rf_texto gy-4">
          <i class="bi bi-car-front fs-5 icone_filtro"
            ><span class="texto_filtro">Família / Modelo</span></i
          >
        </div>
        <!--Família-->
        <div class="col-2">
          <div class="form-floating">
            <select
              class="form-select rf_bg_form rf_texto"
              v-model="selected_familia_veiculo_escolhido"
              required
              @change="selecionarModelo"
            >
              <option v-for="item in familias" :value="item.id" :key="item.id">
                {{ item.descricao }}
              </option>
            </select>
            <label class="rf_texto">Família</label>
          </div>
        </div>
        <!--Modelos-->
        <div class="col-12">
          <div class="box-conversao rf_texto_desk">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkboxTodos"
                v-model="marcarTodos"
              />
              <label class="form-check-label" for="checkboxTodos"
                >Marcar Todos</label
              >
            </div>
            <div
              class="form-check form-check-inline"
              v-for="item in modelo_veiculo_escolhido"
              :key="item.id"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :id="item.id"
                :value="item.id"
                v-model="selectedModelos"
              />
              <label class="form-check-label" :for="item.id">{{
                item.descricao
              }}</label>
            </div>
          </div>
        </div>
        <div class="card-title gy-4">
          <i class="bi bi-speedometer2 fs-5 icone_filtro"
            ><span class="texto_filtro">Dados da Revisão</span></i
          >
        </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="descricao"
            />
            <label class="rf_texto">Descrição</label>
          </div>
        </div>
        <div class="col-2">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="valor"
              @input="valor = formatarValor(valor)"
            />
            <label class="rf_texto">Valor</label>
          </div>
        </div>
        <div class="col-2">
          <div class="form-floating">
            <div class="form-floating">
              <select
                class="form-select rf_bg_form rf_texto_desk"
                v-model="status"
                required
              >
                <option
                  v-for="it in status_list"
                  :value="it.value"
                  :key="it.id"
                >
                  {{ it.type }}
                </option>
              </select>
              <label class="rf_texto_desk">Status</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="observacao"
            />
            <label class="rf_texto">Observação</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <button type="submit" class="btn btn-lg btn-filtro">
              <span class="rf_texto_btn">Cadastrar</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!--Bloco do Filtro-->
  <div class="card card-filtro">
    <div class="row g-2 p-2">
      <div class="card-title gy-4">
        <i class="bi bi-funnel fs-5 icone_filtro"
          ><span class="texto_filtro">Filtro</span></i
        >
      </div>
    </div>
    <div class="row g-2 p-2">
      <div class="col">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroDescricao"
          />
          <label class="rf_texto">Descrição</label>
        </div>
      </div>

      <div class="col-1">
        <div class="form-floating">
          <select
            class="form-select rf_bg_form rf_texto"
            v-model="pageSize"
            @change="handlePageSizeChange(pageSize)"
          >
            <option v-for="size in pageSizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
          <label class="rf_texto">Itens pág.</label>
        </div>
      </div>
      <div class="col-2">
        <div class="input-group-append">
          <button
            class="btn btn-lg btn-filtro"
            type="button"
            @click="
              page = 1;
              retrieveRevisoes();
            "
          >
            <span class="rf_texto_btn">Pesquisar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Tabela-->
  <div class="card card-tabela g-2 p-2 rf_margin">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Descrição</th>
          <th scope="col">Modelo</th>
          <th scope="col">Valor</th>
          <th scope="col">Status</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in revisoes" :key="item.id" class="table-linha">
          <td>{{ item.codigo }}</td>
          <td>{{ item.descricao }}</td>
          <td>{{ item.revisoes_modelo.descricao }}</td>
          <td>{{ this.currency(item.valor) }}</td>
          <td>{{ item.status === 1 ? "Habilitado" : "Desabilitado" }}</td>
          <td>
            <button
              class="dropdown-toggle-icon"
              data-bs-toggle="modal"
              data-bs-target="#ModalRevisoes"
              @click="carregar_modal_editar(item)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-if="revisoes.length"
      :offset="totalPages"
      :total="totalItems"
      :limit="pageSize"
      @change-page="handlePageChange"
    />
  </div>
  <!--Modal Pacotes-->
  <div
    class="modal fade"
    id="ModalRevisoes"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-tools fs-5 icone_kit"
              ><span class="texto_kit">Editar Acessórios</span></i
            >
          </div>
          <button
            class="btn btn-modal btn-lg p-1 mt-1"
            type="button"
            data-bs-target="#ModalProposta"
            data-bs-toggle="modal"
            aria-label="Close"
          >
            Sair
          </button>
        </div>
        <div class="modal-body">
          <div class="">
            <div class="card">
              <div class="row g-2 p-2">
                <!--Descrição-->
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control rf_bg_form rf_texto_desk"
                      v-model="descricao_editar"
                      required
                    />
                    <label class="rf_texto_desk">Descrição</label>
                  </div>
                </div>
                <!--% Desconto-->
                <div class="col-2">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control rf_bg_form rf_texto_desk"
                      v-model="valor_editar"
                      @input="valor_editar = formatarValor(valor_editar)"
                      required
                    />
                    <label class="rf_texto_desk">Valor</label>
                  </div>
                </div>
              </div>
              <div class="row g-2 p-2">
                <!--Observação-->
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control rf_bg_form rf_texto_desk"
                      v-model="observacao_editar"
                    />
                    <label class="rf_texto_desk">Observação</label>
                  </div>
                </div>
                <div class="col-2">
                  <div class="form-floating">
                    <div class="form-floating">
                      <select
                        class="form-select rf_bg_form rf_texto_desk"
                        v-model="status_editar"
                        required
                      >
                        <option
                          v-for="it in status_list"
                          :value="it.value"
                          :key="it.id"
                        >
                          {{ it.type }}
                        </option>
                      </select>
                      <label class="rf_texto_desk">Status</label>
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  <div class="form-floating">
                    <div class="form-floating">
                      <select
                        class="form-select rf_bg_form rf_texto_desk"
                        v-model="alterar_todos_editar"
                        required
                      >
                        <option
                          v-for="it in alterar_todos"
                          :value="it.value"
                          :key="it.id"
                        >
                          {{ it.type }}
                        </option>
                      </select>
                      <label class="rf_texto_desk">Alterar Todos</label>
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  <div class="form-floating">
                    <button
                      type="submit"
                      class="btn btn-lg btn-filtro"
                      @click="update_revisoes"
                    >
                      <span class="rf_texto_btn">Editar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="abrir_modal">
    <Message :msg="msg" v-show="msg" />
  </div>

  <RodapeVue />
</template>

<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import NavgatorFI from "../../components/menu/NavgatorFI.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import TokenService from "../../services/token.service";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Message from "../../components/modal/Message.vue";
import Pagination from "../../components/Pagination.vue";

export default {
  name: "Dashboard F&I",

  components: {
    SidebarVue,
    Pagination,
    NavgatorFI,
    Message,
    RodapeVue,
  },
  data() {
    return {
      //Dados do Acessório

      status_list: [
        { value: 0, type: "Desabilitado" },
        { value: 1, type: "Habilitado" },
      ],
      alterar_todos: [
        { value: 0, type: "Sim" },
        { value: 1, type: "Não" },
      ],
      modelo_veiculo_escolhido: [],
      selected_familia_veiculo_escolhido: [],
      familia_veiculo_escolhido: "",
      familias: [],
      marcarTodos: true,
      selectedModelos: [],
      checando_acessorio: true,
      revisoes: [],

      status: 1,
      descricao: "",
      valor: "",
      modelo_id: "",
      observacao: "",
      codigo:"",

      //Filtro
      filtroDescricao: "",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 50,

      //Dados do Token
      company_id: "",
      user_log: "",
      abrir_modal: false,
      msg: "",

      //Modal Editar
      edit_id: "",
      descricao_editar: "",
      valor_editar: "",
      modelo_id_editar: "",
      observacao_editar: "",
      status_editar: "",
      alterar_todos_editar: 1,
    };
  },
  computed: {},
  mounted() {
    this.getToken();
    this.retrieveFamilia();
    this.retrieveRevisoes();
    //this.retrieveMaoObra();
  },
  watch: {
    marcarTodos(newVal) {
      if (newVal) {
        this.selectedModelos = this.modelo_veiculo_escolhido.map(
          (item) => item.id
        );
      } else {
        this.selectedModelos = [];
      }
    },
    selectedModelos(newVal) {
      if (
        this.marcarTodos &&
        newVal.length !== this.modelo_veiculo_escolhido.length
      ) {
        this.marcarTodos = false;
      }
    },

    modelo_veiculo_escolhido: {
      handler(newList) {
        this.selectedModelos = newList.map((item) => item.id);
        // this.selectedTipoVeiculo = [0, 1]
        // //this.relatorio_conversao_vendas();
        // this.propostas_mes();
      },
      immediate: true, // Para executar a função ao criar o componente
    },
  },
  methods: {
    getToken() {
      const accessToken = TokenService.getLocalAccessToken();
      TokenService.getLocalRefreshToken();
      const user_log = TokenService.getUser();
      const decodedToken = jwt_decode(accessToken);
      this.company_id = decodedToken.company;
      this.user_log = user_log.id;
    },

    //Funções
    handlePageChange(value) {
      this.page = value;
      this.retrieveRevisoes();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveRevisoes();
    },
    formatarValor(valor) {
      if (!valor) return "";
      valor = valor.toString().replace(/\D/g, "");
      valor = (valor / 100).toFixed(2).replace(".", ",");
      valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return valor;
    },
    currency(number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(number);
    },
    //Carregando modelo de veículos
    carregar_modal_editar(item) {
      console.log("Intens para editar", item);
      this.edit_id = item.id;
      this.descricao_editar = item.descricao;
      this.modelo_id_editar = item.modelo_id;     
      this.valor_editar = this.currency(item.valor);
      this.observacao_editar = item.observacao;
      this.status_editar = item.status;
      this.codigo = item.codigo
    },
    async buscar_acessorio() {
      console.log("Buscar acessorio");
      await axios
        .get(`${process.env.VUE_APP_API_URL}acessorio_modelo`, {
          params: { codigo_mercadoria: this.codigo_peca },
        })
        .then((response) => {
          if (response.data.statusOk == false) {
            this.checando_acessorio = false;
            this.abrir_modal = true;
            this.msg = response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
          this.descricao_peca = response.data.descricao_mercadoria;
          console.log("Acessorio", response.data);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        });
    },
    async selecionarModelo() {
      //Carregar apenas estoque de venda futura
      if (this.familias) {
        console.log("Buscando modelos de veículos");
        await axios
          .get(`${process.env.VUE_APP_API_URL}modelos`, {
            params: {
              familiaVeiculoId: this.selected_familia_veiculo_escolhido,
            },
          })
          .then((response) => {
            this.modelo_veiculo_escolhido = response.data.rows;
            console.log(response.data.rows);
            this.retrieveAcessorios();
          })
          .catch((error) => {
            if (error.response.status == 400) {
              this.abrir_modal = true;
              this.msg = error.response.data.message;
              setTimeout(() => (this.abrir_modal = false), 1000);
            }
          });
      } else {
        this.modelo_veiculo_escolhido = [];
      }
    },
    async retrieveFamilia() {
      await axios
        .get(`${process.env.VUE_APP_API_URL}familia_fei`, {
          params: { empresa_id: this.company_id },
        })
        .then((response) => {
          this.familias = response.data.rows;
          console.log("Familias", response.data);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        });
    },
    async retrieveMaoObra() {
      console.log("Enviando dados da Mão de Obra");

      await axios
        .get(`${process.env.VUE_APP_API_URL}mao_de_obra`)
        .then((response) => {
          this.mao_obra = response.data;
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i]["descricao"] == "INSTALAÇÃO") {
              this.valor_tmo_instalacao = response.data[i]["valor"];
            }
            if (response.data[i]["descricao"] == "PINTURA") {
              this.valor_tmo_pintura = response.data[i]["valor"];
            }
          }
          console.log("Mão de Obra ----------------------", response.data);
          console.log("Valor da Instação", this.valor_tmo_instalacao);
          console.log("Valor da Pintura", this.valor_tmo_pintura);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        });
    },
    async retrieveRevisoes() {
      console.log("Buscando lista de acessórios");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}listar_revisoes`,
          {
            params: {
              modelo_id: this.selectedModelos,
              descricao: this.filtroDescricao,

              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        console.log("Dados dos acessorios", response.data);
        // Faça algo com os dados aqui, como atribuir a uma variável de componente
        this.revisoes = response.data.revisoes; // exemplo de atribuição
        this.totalPages = response.data.totalPages;
        this.totalItems = response.data.totalItems;
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 1000);
        }
      }
    },
    async update_revisoes() {
      console.log("Alterando uma revisão");
      try {
        const id = this.edit_id;
        const dados = {
          id: id,
          descricao: this.descricao_editar,          
          // modelo: this.modelo_id_editar,          
          valor: this.valor_editar,
          observacao: this.observacao_editar,
          status: this.status_editar,
          alterar_todos: this.alterar_todos_editar,
          codigo: this.codigo
        };
        await axios
          .put(
            `${process.env.VUE_APP_API_URL}listar_revisoes/${id}`,
            dados,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.data.StatusOk == 200) {
              this.abrir_modal = true;
              this.msg = response.data.message;
              setTimeout(() => (this.abrir_modal = false), 1000);
              location.reload();
            }
            if (response.data.StatusOk == 204) {
              this.abrir_modal = true;
              this.msg = response.data.message;
              setTimeout(() => (this.abrir_modal = false), 1000);
            }
          });
      } catch (error) {
        this.abrir_modal = true;
        this.msg = "Houve um erro: " + error;
        setTimeout(() => (this.abrir_modal = false), 1000);
      }
    },

    async onSubmit() {
      await fetch(`${process.env.VUE_APP_API_URL}revisoes`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descricao: this.descricao,
          valor: this.valor,
          modelo_id: this.selectedModelos,
          observacao: this.observacao,
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
          console.log("Resposta", resposta);
          if (resposta.StatusOk == 200) {
            this.abrir_modal = true;
            this.msg = resposta.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
            window.location.reload();
          }
          if (resposta.StatusOk == 204) {
            this.abrir_modal = true;
            this.msg = resposta.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
            //this.resetForm();
            // this.retrieveCliente();
          }
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.log("Erro do servidor:", error.response.data.message);
            this.abrir_modal = true;
            this.msg =
              "Houve um erro no servidor: " + error.response.data.message;
          } else {
            console.log("Erro desconhecido:", error);
            this.abrir_modal = true;
            this.msg =
              "Houve um erro desconhecido. Por favor, contate o administrador.";
          }
          setTimeout(() => (this.abrir_modal = false), 1000);
        });
    },
  },
};
</script>
<style scoped>
.pagina-especifica-multiselect .multiselect {
  position: relative;
}

.pagina-especifica-multiselect .selected-models {
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 5px;
  overflow-y: auto;
  max-height: 200px; /* Altura máxima da lista de seleção */
}

.pagina-especifica-multiselect .placeholder {
  color: #c016b2;
}

.pagina-especifica-multiselect .selected-item {
  display: flex;
  align-items: center;
}

.pagina-especifica-multiselect .selected-item label {
  margin-left: 5px;
}

.pagina-especifica-multiselect .dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ced4da;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  z-index: 1000;
  display: none;
}
.pagina-especifica-multiselect .dropdown.open {
  display: block;
}
.pagina-especifica-multiselect .options {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  max-height: 200px; /* Altura máxima da lista de opções */
  overflow-y: auto;
}

.pagina-especifica-multiselect .options li {
  padding: 5px;
}

.pagina-especifica-multiselect .dropdown input[type="checkbox"] {
  margin-right: 5px;
}
</style>
