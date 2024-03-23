<template>
  <SidebarVue ref="sidebar" />
  <NavgatorFI
    ref="navgator"
    :barraTitulo="' F&I - Pacotes'"
    :titulo="'pacotes'"
  />
  <div class="card card-filtro">
    <form @submit.prevent="onSubmit" id="form">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"
            ><span class="texto_filtro">Dados do Pacote</span></i
          >
        </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col-8">
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
            />
            <label class="rf_texto">% Desconto</label>
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
                <option v-for="it in status_list" :value="it.value" :key="it.id">
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
          <th scope="col">Descrição</th>
          <th scope="col">% Desconto</th>
          <th scope="col">Status</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in pacotes"
          :key="item.id"
          class="table-linha"
        >
          <td>{{ item.descricao }}</td>
          <td>{{ item.desconto }}</td>
          <td>{{ item.status === 1 ? 'Habilitado' : 'Desabilitado' }}</td>
          <td>
            <button
              class="dropdown-toggle-icon"
              data-bs-toggle="modal"
              data-bs-target="#ModalPacotes"
              @click="carregar_modal_editar(item)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      </tbody>     
    </table>
    <pagination
        v-if="pacotes.length"
        :offset="totalPages"
        :total="totalItems"
        :limit="pageSize"
        @change-page="handlePageChange"
      />
  </div>
    <!--Modal Pacotes-->
    <div
    class="modal fade"
    id="ModalPacotes"
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
                      required
                    />
                    <label class="rf_texto_desk">% Desconto</label>
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
                    <button
                      type="submit"
                      class="btn btn-lg btn-filtro"
                      @click="update_pacote"
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
      pacotes:[],
      descricao: "",
      valor: "",
      status: 1,
      observacao: "",
      filtroDescricao: "",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 50,

      abrir_modal: false,
      msg: "",
      status_list: [
        { value: 0, type: "Desabilitado" },
        { value: 1, type: "Habilitado" },
      ],

      //Campos Edita
      descricao_editar: "",
      valor_editar: "",
      observacao_editar: "",
      status_editar: "",
      edit_id: "",
    };
  },
  mounted(){
    this.retrievePacotes();
  },
  methods: {
    //Funções
    handlePageChange(value) {
      this.page = value;
      this.retrievePacotes();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrievePacotes();
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
      this.valor_editar = item.desconto;
      this.observacao_editar = item.observacao;
      this.status_editar = item.status;
    },
    async buscar_pacote() {
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

    async retrievePacotes() {
      console.log("Buscando lista de pacotes");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}listar_pacotes`,
          {
            params: {    
              descricao: this.filtroDescricao,
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        console.log("Dados dos pacotes", response.data);
        // Faça algo com os dados aqui, como atribuir a uma variável de componente
        this.pacotes = response.data.pacotes; // exemplo de atribuição
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
    async update_pacote() {
      console.log("Alterando um acessório");
      try {
        const id = this.edit_id;
        const dados = {
          id: id,
          descricao: this.descricao_editar,
          desconto: this.valor_editar,
          status: this.status_editar,
          observacao: this.observacao_editar,
        };
        await axios
          .put(
            `${process.env.VUE_APP_API_URL}listar_pacotes/${id}`,
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
      await fetch(`${process.env.VUE_APP_API_URL}pacotes`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descricao: this.descricao,
          valor: this.valor,
          status: this.status, 
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
