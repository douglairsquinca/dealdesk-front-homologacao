<template>
  <SidebarVue ref="sidebar" />
  <NavgatorFI
    ref="navgator"
    :barraTitulo="' F&I - Acessórios'"
    :titulo="'acessórios'"
  />
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
          <i class="bi bi-journal-text fs-5 icone_filtro"
            ><span class="texto_filtro">Dados do Acessório</span></i
          >
        </div>
      </div>
      <div class="row g-2 p-2">
        <!--Tipo de Item-->
        <div class="col-1">
          <div class="form-floating">
            <div class="form-floating">
              <select
                class="form-select rf_bg_form rf_texto"
                v-model="item_descricao"
                required
              >
                <option v-for="it in item" :value="it.type" :key="it.id">
                  {{ it.type }}
                </option>
              </select>
              <label class="rf_texto">Item</label>
            </div>
          </div>
        </div>
        <!--Cortesia-->
        <div class="col-1">
          <div class="form-floating">
            <div class="form-floating">
              <select
                class="form-select rf_bg_form rf_texto"
                v-model="cortesia_descricao"
                required
              >
                <option v-for="it in cortesia" :value="it.type" :key="it.id">
                  {{ it.type }}
                </option>
              </select>
              <label class="rf_texto">Cortesia</label>
            </div>
          </div>
        </div>
        <!--Código da Peça-->
        <div class="col-1">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="codigo_peca"
              required
              v-on:blur="buscar_acessorio"
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
              v-model="descricao_peca"
              required
              :disabled="checando_acessorio"
            />
            <label class="rf_texto">Descrição</label>
          </div>
        </div>
        <!--Mão de Obra-->
        <!-- <div class="col-1">
          <div class="form-floating">
            <select
              class="form-select rf_bg_form rf_texto_desk"
              v-model="mao_obra_id"
              
            >
            <option v-for="mdo in mao_obra" :key="mdo.id" :value="mdo.id">
                {{ mdo.descricao }}
              </option>
            </select>
            <label class="rf_texto_desk">Mão de Obra</label>
          </div>
        </div> -->
      </div>
      <!--Preço Base-->
      <div class="row g-2 p-2">
        <div class="col-1">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="preco_base"
              @input="preco_base = formatarValor(preco_base)"
              required
            />
            <label class="rf_texto">Preço Base</label>
          </div>
        </div>
        <!--Tempo de Instalação-->
        <!-- <div class="col-1">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="tmo_instalacao"
              v-on:input="formatarTmoInstalacao"
              v-on:blur="calcular_preco_final"        
            />
            <label class="rf_texto">Tmo Instalação</label>
          </div>
        </div> -->
        <!--Tempo de Pintura-->
        <!-- <div class="col-1">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="tmo_pintura"  
              v-on:input="formatarTmoPintura"
              v-on:blur="calcular_preco_final"            
            />
            <label class="rf_texto">Tmo Pintura</label>
          </div>
        </div> -->
        <!--Preço Final-->
        <div class="col-1">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="preco_final"
              @input="preco_final = formatarValor(preco_final)"
              required
            />
            <label class="rf_texto">Preço Final</label>
          </div>
        </div>
        <!--Observação-->
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
      <div class="col-1">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroCodigo"          
          />
          <label class="rf_texto">Código</label>
        </div>
      </div>
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
      <div class="col-1">
          <div class="form-floating">
            <button type="submit" class="btn btn-lg btn-filtro" @click="retrieveAcessorios">
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
          <th scope="col">Modelo</th>
          <th scope="col">Preço Base</th>
          <th scope="col">Preço Final</th>
          <th scope="col">Status</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in estoque_pecas"
          :key="item.codigo_mercadoria"
          class="table-linha"
        >
          <td>{{ item.codigo_mercadoria }}</td>
          <td>{{ item.descricao_mercadoria }}</td>
          <td>{{ item.acessorios_modelo.descricao }}</td>
          <td>{{ this.currency(item.preco_base) }}</td>
          <td>{{ this.currency(item.preco_final) }}</td>
          <td>{{ item.status === 1 ? 'Habilitado' : 'Desabilitado' }}</td>
          <td>
            <button
              class="dropdown-toggle-icon"
              data-bs-toggle="modal"
              data-bs-target="#ModalItensAcessorios"
              @click="carregar_modal_editar(item)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      </tbody>     
    </table>
    <pagination
        v-if="estoque_pecas.length"
        :offset="totalPages"
        :total="totalItems"
        :limit="pageSize"
        @change-page="handlePageChange"
      />
    
  </div>
  <!-- Modal -->
  <!--Modal Acessórios-->
  <div
    class="modal fade"
    id="ModalItensAcessorios"
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
                <!--Tipo de Item-->
                <div class="col-1">
                  <div class="form-floating">
                    <div class="form-floating">
                      <select
                        class="form-select rf_bg_form rf_texto_desk"
                        v-model="item_editar"
                        required
                      >
                        <option
                          v-for="it in item"
                          :value="it.type"
                          :key="it.id"
                        >
                          {{ it.type }}
                        </option>
                      </select>
                      <label class="rf_texto_desk">Item</label>
                    </div>
                  </div>
                </div>
                <!--Cortesia-->
                <div class="col-1">
                  <div class="form-floating">
                    <div class="form-floating">
                      <select
                        class="form-select rf_bg_form rf_texto_desk"
                        v-model="cortesia_editar"
                        required
                      >
                        <option
                          v-for="it in cortesia"
                          :value="it.type"
                          :key="it.id"
                        >
                          {{ it.type }}
                        </option>
                      </select>
                      <label class="rf_texto_desk">Cortesia</label>
                    </div>
                  </div>
                </div>
                <!--Código da Peça-->
                <div class="col-2">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control rf_bg_form rf_texto_desk"
                      v-model="codigo_peca_editar"
                      required
                      v-on:blur="buscar_acessorio"
                    />
                    <label class="rf_texto_desk">Código</label>
                  </div>
                </div>
                <!--Descrição-->
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control rf_bg_form rf_texto_desk"
                      v-model="descricao_peca_editar"
                      required
                    />
                    <label class="rf_texto_desk">Descrição</label>
                  </div>
                </div>
              </div>
              <div class="row g-2 p-2">
                <div class="col-2">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control rf_bg_form rf_texto_desk"
                      v-model="preco_base_editar"
                      @input="
                        preco_base_editar = formatarValor(preco_base_editar)
                      "
                      required
                    />
                    <label class="rf_texto_desk">Preço Base</label>
                  </div>
                </div>

                <!--Preço Final-->
                <div class="col-2">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control rf_bg_form rf_texto_desk"
                      v-model="preco_final_editar"
                      @input="
                        preco_final_editar = formatarValor(preco_final_editar)
                      "
                      required
                    />
                    <label class="rf_texto_desk">Preço Final</label>
                  </div>
                </div>
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
              </div>
              <div class="row g-2 p-2">
                <div class="col-2">
                  <div class="form-floating">
                    <div class="form-floating">
                      <select
                        class="form-select rf_bg_form rf_texto_desk"
                        v-model="status_editar"
                        required
                      >
                        <option
                          v-for="it in status"
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
                      @click="update_acessorio"
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
      estoque_pecas:[],

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
    };
  },
  computed: {},
  mounted() {
    this.getToken();
    this.retrieveFamilia();
    this.retrieveAcessorios();
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
      this.retrieveAcessorios();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveAcessorios();
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
    //Será implementado quando necessitar na parte de parametros
    // calcular_preco_final(){
    //   console.log("Calcular preço final");
    //   var valor_final
    //   var valor_tmo_instalacao
    //   var valor_tmo_pintura

    //   var valor_base = parseFloat(this.preco_base.replace(/[^\d,]+/g, '').replace(",", "."));
    //   if(this.tmo_instalacao == 0){
    //     valor_tmo_instalacao = (this.tmo_instalacao * this.valor_tmo_instalacao);
    //   }else{
    //     valor_tmo_instalacao = (parseFloat(this.tmo_instalacao.replace(/[^\d,]+/g, '').replace(",", ".")) * this.valor_tmo_instalacao);
    //   }
    //   if(this.tmo_pintura == 0){
    //     valor_tmo_pintura = (this.tmo_pintura * this.valor_tmo_pintura);
    //   }else{
    //     valor_tmo_pintura = (parseFloat(this.tmo_pintura.replace(/[^\d,]+/g, '').replace(",", ".")) * this.valor_tmo_pintura);
    //   }

    //   console.log(valor_base);
    //   console.log(valor_tmo_instalacao);
    //   console.log(valor_tmo_pintura);

    //   valor_final = (valor_base + valor_tmo_instalacao + valor_tmo_pintura) ;
    //   this.preco_final = this.currency(valor_final);
    //   console.log(valor_final);
    // },
    // formatarTmoInstalacao() {
    //   // Remove todos os pontos do valor
    //   let valor = this.tmo_instalacao.replace(/\./g, '');
    //   // Substitui a vírgula por ponto
    //   valor = valor.replace('.', ',');
    //   // Atualiza o valor formatado
    //   this.tmo_instalacao = valor;
    // },
    // formatarTmoPintura() {
    //   // Remove todos os pontos do valor
    //   let valor = this.tmo_pintura.replace(/\./g, '');
    //   // Substitui a vírgula por ponto
    //   valor = valor.replace('.', ',');
    //   // Atualiza o valor formatado
    //   this.tmo_pintura = valor;
    // },

    //Carregando modelo de veículos
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
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
        });
    },
    async retrieveAcessorios() {
      console.log("Buscando lista de acessórios");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}listar_acessorios_modelo`,
          {
            params: {
              modelo_id: this.selectedModelos,
              codigo_mercadoria: this.filtroCodigo,
              descricao_mercadoria: this.filtroDescricao,
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        console.log("Dados dos acessorios", response.data);
        // Faça algo com os dados aqui, como atribuir a uma variável de componente
        this.estoque_pecas = response.data.acessorio_modelo; // exemplo de atribuição
        this.totalPages = response.data.totalPages;
        this.totalItems = response.data.totalItems;
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    async update_acessorio() {
      console.log("Alterando um acessório");
      try {
        const acessorio_id = this.edit_id;
        const dados = {
          id: acessorio_id,
          item: this.item_editar,
          cortesia: this.cortesia_editar,
          modelo: this.modelo_id_editar,
          codigo_mercadoria: this.codigo_peca_editar,
          descricao_mercadoria: this.descricao_peca_editar,
          preco_base: this.preco_base_editar,
          preco_final: this.preco_final_editar,
          observacao: this.observacao_editar,
          status: this.status_editar,
          alterar_todos: this.alterar_todos_editar,
        };
        await axios
          .put(
            `${process.env.VUE_APP_API_URL}listar_acessorios_modelo/${acessorio_id}`,
            dados,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data)
            if (response.data.StatusOk == 200) {
              this.abrir_modal = true;
              this.msg = response.data.message;
              setTimeout(() => (this.abrir_modal = false), 4000);
              location.reload();
            }
            if (response.data.StatusOk == 204) {
              this.abrir_modal = true;
              this.msg = response.data.message;
              setTimeout(() => (this.abrir_modal = false), 4000);
            }
          });
      } catch (error) {
        this.abrir_modal = true;
        this.msg = "Houve um erro: " + error;
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },

    async onSubmit() {
      await fetch(`${process.env.VUE_APP_API_URL}acessorio_modelo`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: this.item_descricao,
          cortesia: this.cortesia_descricao,
          modelo_id: this.selectedModelos,
          codigo_mercadoria: this.codigo_peca,
          descricao_mercadoria: this.descricao_peca,
          mao_de_obra_id: this.mao_obra_id,
          preco_base: this.preco_base,
          tempo_instalacao: this.tmo_instalacao,
          tempo_pintura: this.tmo_pintura,
          preco_final: this.preco_final,
          observacao: this.observacao,
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
