<template>
  <SidebarVue ref="sidebar" />
  <NavgatorFI
    ref="navgator"
    :barraTitulo="' F&I - Modelo F&I Estoque'"
    :titulo="'modelos'"
  />
  <!--Bloco do Filtro Associação-->
  <div class="card card-filtro">
    <div class="row g-2 p-2">
      <div class="card-title gy-4">
        <i class="bi bi-funnel fs-5 icone_filtro"
          ><span class="texto_filtro">Filtro - Estoque Associação</span></i
        >
      </div>
    </div>
    <div class="row g-2 p-2">
      <div class="col-2">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroModeloCodigo"
          />
          <label class="rf_texto">Código</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroModeloDescricao"
          />
          <label class="rf_texto">Descrição</label>
        </div>
      </div>

      <div class="col-1">
        <div class="form-floating">
          <select
            class="form-select rf_bg_form rf_texto"
            v-model="pageSize_a"
            @change="handlePageSizeChangeAssociacao(pageSize_a)"
          >
            <option v-for="size in pageSizes_a" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
          <label class="rf_texto">Itens pág.</label>
        </div>
      </div>
      <div class="col-1">
        <div class="form-floating">
          <button
            type="submit"
            class="btn btn-lg btn-filtro"
            @click="retrieveEstoqueAssociacao"
          >
            <span class="rf_texto_btn">Pesquisar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Bloco da Tabela-->
  <div class="card card-tabela g-2 p-2 rf_margin">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in estoque_associacao"
          :key="item.id"
          class="table-linha"
        >
          <td>{{ item.modelo_codigo }}</td>
          <td>{{ item.modelo_descricao }}</td>

          <td>
            <button
              class="dropdown-toggle-icon"
              data-bs-target="#excluiModal"
              data-bs-toggle="modal"
              @click="remover_item_associacao(item)"
            >
              <i class="bi bi-trash3"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-if="estoque_associacao.length"
      :offset="totalPages_a"
      :total="totalItems_a"
      :limit="pageSize_a"
      @change-page="handlePageChangeAssociacao"
    />
  </div>

  <!--Formulário de Cadastro-->
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
        <div class="col-2">
          <div class="form-floating">
            <select
              class="form-select rf_bg_form rf_texto"
              v-model="selected_modelo_veiculo_escolhido"
              @change="carregar_modeloCodigo(selected_modelo_veiculo_escolhido)"
            >
              <option
                v-for="item in modelo_veiculo_escolhido"
                :value="item.codigo"
                :key="item.id"
              >
                {{ item.descricao }}
              </option>
            </select>
            <label class="rf_texto">Modelo</label>
          </div>
        </div>
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"
            ><span class="texto_filtro">Associação Estoque / Modelo</span></i
          >
        </div>
      </div>
      <div class="row g-2 p-2">
        <!--Código da Peça-->
        <div class="col-1">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="modelo_codigo"
              required
              disabled
            />
            <label class="rf_texto">Código</label>
          </div>
        </div>
        <!--Descrição-->
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="modelo_descricao"
              disabled
              required
            />
            <label class="rf_texto">Descrição</label>
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
          ><span class="texto_filtro">Filtro - Estoque</span></i
        >
      </div>
    </div>
    <div class="row g-2 p-2">
      <div class="col">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroModeloEstoque"
          />
          <label class="rf_texto">Modelo Estoque</label>
        </div>
      </div>
      <div class="col-2">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroMarcaEstoque"
          />
          <label class="rf_texto">Marca</label>
        </div>
      </div>
      <div class="col-2">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroAnoModFabEstoque"
          />
          <label class="rf_texto">Ano Fab/Mod</label>
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
      <div class="col-1">
        <div class="form-floating">
          <button
            type="submit"
            class="btn btn-lg btn-filtro"
            @click="retrieveEstoque"
          >
            <span class="rf_texto_btn">Pesquisar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Bloco da Tabela-->
  <div class="card card-tabela g-2 p-2 rf_margin">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col">Modelo</th>
          <th scope="col">Marca</th>
          <th scope="col">Ano Mod/Fab</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in estoque" :key="item.id" class="table-linha">
          <td>{{ item.modelo }}</td>
          <td>{{ item.marca }}</td>
          <td>{{ item.anomodfabr }}</td>
          <td>
            <button
              class="dropdown-toggle-icon"
              @click="carregar_modeloDescricao(item)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-if="estoque.length"
      :offset="totalPages"
      :total="totalItems"
      :limit="pageSize"
      @change-page="handlePageChange"
    />
  </div>
  <!-- Modal -->
  <!--Modal Exclusao-->
  <div
    class="modal fade"
    id="excluiModal"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-tools fs-5 icone_kit"
              ><span class="texto_kit">Exclusão</span></i
            >
          </div>
        </div>
        <div class="modal-body">
          <div class="row g-2 p-2">
            <span class="texto_kit">Deseja remover o item?</span>    
          </div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col-6">
              <button
                type="button"
                class="btn btn-lg btn-filtro"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn btn-lg btn-filtro"
                data-bs-dismiss="modal"
                @click="confirmarRemocao"
              >
                Confirmar
              </button>
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
      item: [
        { value: 0, type: "Interno" },
        { value: 1, type: "Externo" },
      ],
      cortesia: [
        { value: 0, type: "Sim" },
        { value: 1, type: "Não" },
      ],
      status: [
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
      estoque_pecas: [],

      mao_obra: [],
      item_descricao: "",
      cortesia_descricao: "",
      modelo_id: "",
      codigo_peca: "",
      descricao_peca: "",
      mao_obra_id: 1,
      preco_base: "",
      tmo_instalacao: 0,
      tmo_pintura: 0,
      valor_tmo_instalacao: "",
      valor_tmo_pintura: "",
      preco_final: "",
      observacao: "",

      //Filtro
      filtroCodigo: "",
      filtroDescricao: "",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 50,

      page_a: 1,
      totalPages_a: 0,
      totalItems_a: 0,
      pageSizes_a: [5, 10, 15, 35, 50, 100],
      pageSize_a: 50,


      //Dados do Token
      company_id: "",
      user_log: "",
      abrir_modal: false,
      msg: "",

      //Modal Editar
      edit_id: "",
      item_editar: "",
      cortesia_editar: "",
      modelo_id_editar: "",
      codigo_peca_editar: "",
      descricao_peca_editar: "",
      preco_base_editar: "",
      preco_final_editar: "",
      observacao_editar: "",
      status_editar: "",
      alterar_todos_editar: 1,

      //Campos do Estoque
      estoque: [],
      estoque_associacao: [],
      modelo_estoque: "",
      marca_estoque: "",
      anoModFab: "",
      filtroAnoModFabEstoque: "",
      filtroModeloEstoque: "",
      filtroMarcaEstoque: "",
      filtroModeloCodigo: "",
      filtroModeloDescricao: "",
      selected_modelo_veiculo_escolhido: "",
      modelo_codigo: "",
      modelo_descricao: "",
      id_modelo_fei_estoque: "",
      status_modelo_fei_estoque:"",
    };
  },
  computed: {},
  mounted() {
    this.getToken();
    this.retrieveFamilia();
    this.retrieveEstoqueAssociacao();
    this.retrieveEstoque();
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
      this.retrieveEstoque();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveEstoque();
    },
    handlePageChangeAssociacao(value) {
      this.page = value;
      this.retrieveEstoqueAssociacao();
    },
    handlePageSizeChangeAssociacao(size) {
      this.pageSize_a = size;
      this.page_a = 1;
      this.retrieveEstoqueAssociacao();
    },

    remover_item_associacao(item){
      this.id_modelo_fei_estoque = item.id;
      this.status_modelo_fei_estoque = 0;
    },
    async confirmarRemocao() {
      const id = this.id_modelo_fei_estoque;     
      const status =  this.status_modelo_fei_estoque
      try {
        await fetch(
          `${process.env.VUE_APP_API_URL}listar_modelos_fei_estoque/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,           
              status: status,
            }),
          }
        )
          .then((data) => {
            if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();
          })
          .then((resposta) => {
            console.log("Resposta da atualização", resposta);
            if (resposta.StatusOk === 200) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 4000);
              this.retrieveEstoqueAssociacao();
              
            }
          });
      } catch (error) {
        console.error("Verificando log", error.message);

        if (error.response && error.response.status === 500) {
          this.abrir_modal = true;
          this.msg = "Erro interno do servidor";
          setTimeout(() => (this.abrir_modal = false), 4000);
        } else {
          // Tratar outros erros
          this.abrir_modal = true;
          (this.msg = "Erro:"), error.message;
          (this.msg = "Status:"), error.response.status;
          (this.msg = "Dados:"), error.response.data;
          (this.msg = "Cabeçalhos:"), error.response.headers;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },

    carregar_modal_editar(item) {
      console.log("Intens para editar", item);
      this.edit_id = item.id;
      this.item_editar = item.item;
      this.cortesia_editar = item.cortesia;
      this.modelo_id_editar = item.modelo_id;
      this.codigo_peca_editar = item.codigo_mercadoria;
      this.descricao_peca_editar = item.descricao_mercadoria;
      this.preco_base_editar = this.currency(item.preco_base);
      this.preco_final_editar = this.currency(item.preco_final);
      this.observacao_editar = item.observacao;
      this.status_editar = item.status;
    },
    carregar_modeloCodigo(item) {
      console.log("Modelo para editar", item);
      this.modelo_codigo = item;
    },
    carregar_modeloDescricao(item) {
      console.log(item);
      this.modelo_descricao = item.modelo;
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
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
          this.descricao_peca = response.data.descricao_mercadoria;
          console.log("Acessorio", response.data);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
        });
    },
    async selecionarModelo() {
      //Carregar apenas estoque de venda futura
      if (this.familias) {
        console.log("Buscando modelos de veículos");
        await axios
          .get(`${process.env.VUE_APP_API_URL}modelos_fei`, {
            params: {
              familiaVeiculoId: this.selected_familia_veiculo_escolhido,
            },
          })
          .then((response) => {
            this.modelo_veiculo_escolhido = response.data.rows;
            console.log(response.data.rows);
          })
          .catch((error) => {
            if (error.response.status == 400) {
              this.abrir_modal = true;
              this.msg = error.response.data.message;
              setTimeout(() => (this.abrir_modal = false), 4000);
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
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
        });
    },
    async retrieveEstoque() {
      await axios
        .get(`${process.env.VUE_APP_API_URL}listar_modelos_fei_estoque`, {
          params: {
            modelo_estoque: this.filtroModeloEstoque,
            marca_estoque: this.filtroMarcaEstoque,
            anoModFab: this.filtroAnoModFabEstoque,
            page: this.page - 1,
            size: this.pageSize,
          },
        })
        .then((response) => {
          this.estoque = response.data.modelos_fei;
          this.totalPages = response.data.totalPages;
          this.totalItems = response.data.totalItems;
          console.log(
            "Estoque ---------------------------------------------------------",
            response.data
          );
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
        });
    },
    async retrieveEstoqueAssociacao() {
      await axios
        .get(
          `${process.env.VUE_APP_API_URL}listar_modelos_fei_estoque_associacao`,
          {
            params: {
              modelo_codigo: this.filtroModeloCodigo,
              modelo_descricao: this.filtroModeloDescricao,
              page: this.page_a - 1,
              size: this.pageSize_a,
            },
          }
        )
        .then((response) => {
          this.estoque_associacao = response.data.modelos_fei;
          this.totalPages_a = response.data.totalPages;
          this.totalItems_a = response.data.totalItems;
          console.log(
            "Estoque Associacao---------------------------------------------------------",
            response.data
          );
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
        });
    },

    async onSubmit() {
      await fetch(`${process.env.VUE_APP_API_URL}modelo_fei_estoque`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelo_descricao: this.modelo_descricao,
          modelo_codigo: this.modelo_codigo,
          status: 1,
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
            setTimeout(() => (this.abrir_modal = false), 4000);
            window.location.reload();
          }
          if (resposta.StatusOk == 204) {
            this.abrir_modal = true;
            this.msg = resposta.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
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
          setTimeout(() => (this.abrir_modal = false), 4000);
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
