<template>
  <SidebarVue ref="sidebar" />
  <Navgator ref="navgator" :barraTitulo="' Administração - Família Veículo'" :titulo="'família'" />

  <div class="card card-filtro">
    <form @submit.prevent="onSubmit" id="form">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Cadastrar Familia</span></i>
        </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="codigo" />
            <label class="rf_texto">Código</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="descricao" required
              autocomplete="off" />
            <label class="rf_texto">Descrição</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="vendaFutura" required>
              <option value="0">Não</option>
              <option value="1">Sim</option>
            </select>
            <label for="valid_status" class="rf_texto">Venda Futura</label>

          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="venda_fei" required>
              <option value="0">Não</option>
              <option value="1">Sim</option>
            </select>
            <label for="valid_status" class="rf_texto">Venda F&I</label>

          </div>
        </div>
        <div class="col-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="status" id="valid_status" required>
              <option value="0">Desabilitado</option>
              <option value="1">Habilitado</option>
            </select>
            <label for="valid_status" class="rf_texto">Status</label>
          </div>
        </div>
        <div class="col-2">
          <div class="form-floating">
            <input v-model="marcaSelecionada" class="form-control rf_bg_form rf_texto" list="datalistMarcas" id="marca"
              autocomplete="off" />

            <label class="rf_texto">Marcas</label>
            <datalist id="datalistMarcas">
              <option v-for="marca in marcas" :data-id="marca.id" :value="marca.descricao" :key="marca.id">
              </option>
            </datalist>
          </div>
        </div>
      </div>
      <div class="col-1 p-2">
        <div class="form-floating">
          <button type="submit" class="btn btn-lg btn-filtro">
            <span class="rf_texto_btn">Cadastrar</span>
          </button>
        </div>
      </div>
    </form>
    <div v-if="abrir_modal">
      <Message :msg="msg" v-show="msg" />
    </div>
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
          <select class="form-select rf_bg_form rf_texto" v-model="searchVendaFutura">
            <option value="">-----</option>
            <option value="0">Não</option>
            <option value="1">Sim</option>
          </select>
          <label class="rf_texto">Venda Futura</label>
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
          <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; retrieveFamilias();">
            <span class="rf_texto_btn">Pesquisar</span>
          </button>
        </div>
      </div>


    </div>
  </div>
  <!--Tabelas-->
  <div class="card card-tabela g-2 p-2 rf_margin">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Descrição</th>
          <th scope="col">Venda Futura</th>
          <th scope="col">Venda F&I</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in familias" :key="item.descricao" class="table-linha">
          <td>{{ item.codigo }}</td>
          <td>{{ item.descricao }}</td>
          <td>{{ getVendaFut(item.vendaFutura) }}</td>
          <td>{{ getVendaFei(item.venda_fei) }}</td>
          <td>{{ getStatus(item.status) }}</td>
          <td>
            <button type="button" class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
              @click="editar_familia(item)">
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination v-if="familias.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
      @change-page="handlePageChange" />
  </div>
  <!-- Modal para edição -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-pencil-square fs-5 icone_kit"><span class="texto_kit">Editar Familia</span></i>
          </div>
          <button class="btn btn-modal btn-lg p-1 mt-1" type="button" data-bs-target="#ModalProposta"
            data-bs-toggle="modal" aria-label="Close"> Sair </button>
        </div>
        <div class="modal-body">
          <div class="row g-2 p-2">
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_codigo" />
                <label for="valid_descricao" class="rf_texto">Código</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_descricao"
                  id="valid_descricao" required />
                <label for="valid_descricao" class="rf_texto">Descrição</label>
                <div class="invalid-feedback">
                  O campo Descrição é obrigatório!
                </div>
              </div>
            </div>
          </div>
          <div class="row g-2 p-2">
            <div class="col-3">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_vendaFutura">
                  <option value="0">Não</option>
                  <option value="1">Sim</option>
                </select>
                <label class="rf_texto">Venda Futura</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_venda_fei">
                  <option value="0">Não</option>
                  <option value="1">Sim</option>
                </select>
                <label class="rf_texto">Venda F&I</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input type="text" list="marcas" v-model="selectedOption.descricao" @change="updateSelectedOption"
                  class="form-control rf_bg_form rf_texto">
                <label class="rf_texto">Marcas</label>
                <datalist id="marcas">
                  <option v-for="option in marcas" :value="option.descricao" :selected="selectedOption.id === option.id"
                    :key="option.id">{{ option.descricao }}</option>
                </datalist>

              </div>
            </div>

            <div class="col-3">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_status" id="valid_status" required>
                  <option value="0">Desabilitado</option>
                  <option value="1">Habilitado</option>
                </select>
                <label for="valid_status" class="rf_texto">Status</label>
                <div class="invalid-feedback">
                  Selecione um status, esse campo é obrigatório!
                </div>
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
  <RodapeVue />

</template>
<script>
import SidebarVue from '../../components/menu/Sidebar.vue';
import axios from "axios";
import userService from "../../services/user.service";
import Pagination from "../../components/Pagination.vue";
import Message from "../../components/modal/Message.vue";
import RodapeVue from "../../components/menu/Rodape.vue";

export default {
  name: "Familia",
  components: {
    SidebarVue,
    Pagination,
    Message,
    RodapeVue
  },
  data() {
    return {
      familias: [],
      marcas: [],
      selectedOption: { id: null, descricao: '' },
      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,

      //Campos de cadastro
      codigo: "",
      descricao: "",
      vendaFutura: "",
      status: "",
      marcaId: null,
      marcaSelecionada: "",
      venda_fei:"",

      //Campos modal editar
      edit_id: "",
      edit_codigo: "",
      edit_descricao: "",
      edit_vendaFutura: "",
      edit_status: "",
      edit_marcaId: null,
      edit_venda_fei: "",


      //Params
      searchTitle: "",
      searchVendaFutura: "",
      searchStatus: "",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 10,

    };
  },
  watch: {
    marcaSelecionada: function (novaMarca) {
      const marca = this.marcas.find(m => m.descricao === novaMarca);
      this.marcaId = marca ? marca.id : null;
    },

  },
  mounted() {
    this.retrieveFamilias();
    this.retrieveMarcas();
  },
  computed: {
    selectedOptionId() {
      return this.selectedOption.id || null;
    },
  },
  methods: {
    clearSelection() {
      this.selectedOption = {};
    },
    resetForm() {
      this.codigo = "",
        this.descricao = "",
        this.vendaFutura = "",
        this.marcaVeiculoId = "",
        this.status = ""
    },
    getStatus(status) {
      return status === 0 ? 'Desabilitado' : 'Habilitado';
    },
    getVendaFut(vendaFutura) {
      return vendaFutura === 0 ? 'Não' : 'Sim';
    },
    getVendaFei(venda_fei) {
      return venda_fei === 0 ? 'Não' : 'Sim';
    },

    async onSubmit() {
      try {

        const resp = await fetch(`${process.env.VUE_APP_API_URL}familia`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigo: this.codigo,
            descricao: this.descricao,
            vendaFutura: this.vendaFutura,
            venda_fei: this.venda_fei,
            marcaId: this.marcaId,
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
              this.retrieveFamilias();
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
        console.log(resp)
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }

    },
    //Buscar dados no banco de dados
    getRequestParams(searchTitle, page, pageSize, searchStatus, searchVendaFutura) {
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
      if (searchVendaFutura) {
        params["vendaFutura"] = searchVendaFutura
      }
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveFamilias();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveFamilias();
    },
    async retrieveFamilias() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize,
          this.searchStatus,
          this.searchVendaFutura
        );
        userService.getFamilia(params).then((response) => {
          const { familia_veiculo, totalPages, totalItems } = response.data;
          this.familias = familia_veiculo;
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
    async retrieveMarcas() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getMarca(params).then((response) => {
          const { rows, totalPages, totalItems } = response.data;
          this.marcas = rows;
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

    async editar_familia(item) {
      console.log(item);
      this.edit_id = item.id,
        this.edit_codigo = item.codigo,
        this.edit_descricao = item.descricao,
        this.edit_vendaFutura = item.vendaFutura,
        this.selectedOption.descricao = item.marca_veiculo.descricao
        this.edit_venda_fei = item.venda_fei,
      this.edit_status = item.status;
    },

    updateSelectedOption() {
      const selectedOption = this.marcas.find(option => option.descricao === this.selectedOption.descricao);
      if (selectedOption) {
        this.selectedOption = { id: selectedOption.id, descricao: selectedOption.descricao };
      } else {
        this.selectedOption = { id: null, descricao: '' };
      }
    },
    async update() {
      const token = this.$store.state.auth.user.accessToken;
      const headers = {
        "x-access-token": token,
      };
      const dados = {
        id: this.edit_id,
        codigo: this.edit_codigo,
        descricao: this.edit_descricao,
        vendaFutura: this.edit_vendaFutura,
        venda_fei: this.edit_venda_fei,
        marcaVeiculoId: this.selectedOption.id,
        status: this.edit_status,
      };
      console.log(dados);

      const response = await axios.put(
        `${process.env.VUE_APP_API_URL}familia/${this.edit_id}`,
        dados,
        { headers }
      );
      console.log(response.data.StatusOk)
      if (response.data.StatusOk == 200) {
        this.abrir_modal = true;
        this.msg = response.data.message;
        setTimeout(() => (this.abrir_modal = false), 4000);
        this.resetForm();
        this.retrieveFamilias();
      }
      return console.log(response.data);
    },

  }
};
</script>
