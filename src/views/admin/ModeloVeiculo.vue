<template>
  <SidebarVue ref="sidebar" />
  <Navgator ref="navgator" :barraTitulo="' Administração - Modelo Veículo'" :titulo="'modelo'" />

  <div class="card card-filtro">
    <form @submit.prevent="onSubmit" id="form">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Cadastrar Modelo</span></i>
        </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="codigo" required />
            <label class="rf_texto">Código</label>
          </div>
        </div>
        <div class="col-6">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="descricao" required
              autocomplete="off" />
            <label class="rf_texto">Descrição</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="edicao" />
            <label class="rf_texto">Edição</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="cilindro" />
            <label class="rf_texto">Cilindro</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="potencia" />
            <label class="rf_texto">Potência</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="precoForcado" />
            <label class="rf_texto">Preço Forçado</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="custoMarcacao"
              @input="custoMarcacao = formatarValor(custoMarcacao)" />
            <label class="rf_texto">Custo Marcação</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="precoVenda"
              @input="precoVenda = formatarValor(precoVenda)" />
            <label class="rf_texto">Preço Venda</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="anoFabricacao" required
              autocomplete="off" />
            <label class="rf_texto">Ano Fabricação</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="anoModelo" required
              autocomplete="off" />
            <label class="rf_texto">Ano Modelo</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="vendaFutura" id="valid_status" required>
              <option value="0">Não</option>
              <option value="1">Sim</option>
            </select>
            <label class="rf_texto">Venda Futura</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="status" id="valid_status" required>
              <option value="0">Desabilitado</option>
              <option value="1">Habilitado</option>
            </select>
            <label for="valid_status" class="rf_texto">Status</label>
            <div class="invalid-feedback">
              Selecione um status, esse campo é obrigatório!
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="form-floating">
            <input v-model="familiaSelecionada" class="form-control rf_bg_form rf_texto" list="datalistFamilia"
              id="familia" autocomplete="off" required />

            <label class="rf_texto">Família</label>
            <datalist id="datalistFamilia">
              <option v-for="familia in familias" :data-id="familia.id" :value="familia.descricao" :key="familia.id">
              </option>
            </datalist>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input v-model="combustivelSelecionado" class="form-control rf_bg_form rf_texto" list="datalistCombustivel"
              id="combustivel" autocomplete="off" required />

            <label class="rf_texto">Combustível</label>
            <datalist id="datalistCombustivel">
              <option v-for="comb in combustiveis" :data-id="comb.id" :value="comb.descricao" :key="comb.id"></option>
            </datalist>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="tipo_empresa" required>
              <option value="1">Quatro Rodas</option>
              <option value="2">Duas Rodas</option>
            </select>
            <label class="rf_texto">Tipo Empresa</label>
          </div>
        </div>
        <div class="col-1">
        <div class="finput-group-append">
          <button type="submit" class="btn btn-lg btn-filtro">
            <span class="rf_texto_btn">Cadastrar</span>
          </button>
        </div>
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
      <div class="col">
        <div class="form-floating">
          <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchTitle" />
          <label class="rf_texto">Descrição</label>
        </div>
      </div>
      <div class="col-1">
        <div class="form-floating">
          <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchAnoFab" />
          <label class="rf_texto">Ano Fab.</label>
        </div>
      </div>
      <div class="col-1">
        <div class="form-floating">
          <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchAnoMod" />
          <label class="rf_texto">Ano Modelo</label>
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
          <input v-model="searchFamiliaSelecionada" class="form-control rf_bg_form rf_texto" list="datalistFamilia"
            id="familia" autocomplete="off" required />

          <label class="rf_texto">Família</label>
          <datalist id="datalistFamilia">
            <option v-for="familia in familias" :data-id="familia.id" :value="familia.descricao" :key="familia.id">
            </option>
          </datalist>
        </div>
      </div>
      <!-- <div class="col-1">
        <div class="form-floating">
          <input v-model="searchCombustivelSelecionado" class="form-control rf_bg_form rf_texto"
              list="datalistCombustivel" id="combustivel" autocomplete="off" required /> 

          <label class="rf_texto">Combustível</label> 
          <datalist id="datalistCombustivel">
              <option v-for="comb in combustiveis" :data-id="comb.id" :value="comb.descricao" :key="comb.id"></option>
            </datalist> 
          <datalist id="datalistCombustivel">
            <option v-for="comb in combustiveisFiltrados" :data-id="comb.id" :value="comb.descricao" :key="comb.id">
            </option>
          </datalist>

        </div>
      </div> -->

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
          <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; retrieveModelos();">
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
          <th scope="col">Edição</th>
          <th scope="col">Cilindro</th>
          <th scope="col">Potência</th>
          <th scope="col">Preço Forçado</th>
          <th scope="col">Preço Venda</th>
          <th scope="col">Ano Fabricação</th>
          <th scope="col">Ano Modelo</th>
          <th scope="col">Venda Futura</th>
          <th scope="col">Familia</th>
          <th scope="col">Combustível</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in modelos" :key="item.descricao" class="table-linha">
          <td>{{ item.codigo }}</td>
          <td>{{ item.descricao }}</td>
          <td>{{ item.edicao }}</td>
          <td>{{ item.cilindro }}</td>
          <td>{{ item.potencia }}</td>
          <td>{{ item.precoForcado }}</td>
          <td>{{ currency(item.precoVenda) }}</td>
          <td>{{ item.anoFabricacao }}</td>
          <td>{{ item.anoModelo }}</td>
          <td>{{ getVendaFut(item.vendaFutura) }}</td>
          <td>{{ item.familia_veiculo.descricao }}</td>
          <td>{{ item.combustivel_veiculo.descricao }}</td>
          <td>{{ getStatus(item.status) }}</td>

          <td>
            <button type="button" class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
              @click="editar_modelo(item)">
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination v-if="modelos.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
      @change-page="handlePageChange" />
  </div>
  <!-- Modal para edição -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-pencil-square fs-5 icone_kit"><span class="texto_kit">Editar Modelo</span></i>
          </div>
          <button class="btn btn-modal btn-lg p-1 mt-1" type="button" data-bs-target="#ModalProposta"
            data-bs-toggle="modal" aria-label="Close"> Sair </button>
        </div>
        <div class="modal-body">
          <div class="row g-2 p-2">
            <div class="col-1">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_id" disabled />
                <label class="rf_texto">ID</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_codigo" required />
                <label class="rf_texto">Código</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_descricao" required
                  autocomplete="off" />
                <label class="rf_texto">Descrição</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_edicao" />
                <label class="rf_texto">Edição</label>
              </div>
            </div>
          </div>
          <div class="row g-2 p-2">
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_cilindro" />
                <label class="rf_texto">Cilindro</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_potencia" />
                <label class="rf_texto">Potência</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_precoForcado" />
                <label class="rf_texto">Preço Forçado</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_precoVenda"
                  @input="edit_precoVenda = formatarValor(edit_precoVenda)" />
                <label class="rf_texto">Preço Venda</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_anoFabricacao" required
                  autocomplete="off" />
                <label class="rf_texto">Ano Fabricação</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_anoModelo" required
                  autocomplete="off" />
                <label class="rf_texto">Ano Modelo</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_vendaFutura" id="valid_status" required>
                  <option value="0">Não</option>
                  <option value="1">Sim</option>
                </select>
                <label class="rf_texto">Venda Futura</label>
              </div>
            </div>
            <div class="col-2">
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
            <div class="col-2">
              <div class="form-floating">
                <input type="text" list="datalistFamilia" v-model="selectedOption.descricao"
                  @change="updateSelectedOption" class="form-control rf_bg_form rf_texto" />
                <label class="rf_texto">Família</label>

                <datalist id="datalistFamilia">
                  <option>{{ this.edit_familia }}</option>
                  <option v-for="familia in familias" :value="familia.descricao"
                    :selected="selectedOption.id === familia.id" :key="familia.id">{{ familia.descricao }}</option>
                </datalist>
              </div>
            </div>

            <div class="col-2">
              <div class="form-floating">
                <input type="text" list="datalistCombustivel" v-model="selectedOptionCombustivel.descricao"
                  @change="updateSelectedOptionCombustivel" class="form-control rf_bg_form rf_texto" />
                <label class="rf_texto">Combustível</label>

                <datalist id="datalistCombustivel">
                  <option>{{ this.edit_combustivel }}</option>
                  <option v-for="comb in combustiveis" :value="comb.descricao"
                    :selected="selectedOptionCombustivel.id === comb.id" :key="comb.id">{{ comb.descricao }}</option>
                </datalist>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_tipo_empresa" id="valid_status" required>
                  <option value="1">Quatro Rodas</option>
                  <option value="2">Duas Rodas</option>
                </select>
                <label for="valid_status" class="rf_texto">Tipo Empresa</label>
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
import SidebarVue from "../../components/menu/Sidebar.vue";
import axios from "axios";
import userService from "../../services/user.service";
import Pagination from "../../components/Pagination.vue";
import Message from "../../components/modal/Message.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import Navgator from "../../components/menu/Navgator.vue";


export default {
  name: "Modelo",
  components: {
    SidebarVue,
    Navgator,
    Pagination,
    Message,
    RodapeVue
  },
  data() {
    return {
      modelos: [],
      familiaSelecionada: '',
      selectedOption: { id: null, descricao: '' },
      selectedOptionCombustivel: { id: null, descricao: '' },
      familias: [],
      combustiveis: [],
      valor: 0,
      msg: null,
      abrir_modal: null,

      //Campos de cadastro
      codigo: "",
      descricao: "",
      edicao: "",
      cilindro: 0,
      potencia: 0,
      precoForcado: 0,
      precoVenda: 0,
      custoMarcacao: 0,
      anoFabricacao: "",
      anoModelo: "",
      vendaFutura: "",
      status: "",
      familiaVeiculoId: "",
      editfamiliaVeiculoId: "",
      combustivelVeiculoId: "",
      combustivelSelecionado: "",
      tipo_empresa: "",

      //Campos de edição
      edit_id: "",
      edit_codigo: "",
      edit_edicao: "",
      edit_cilindro: "",
      edit_potencia: "",
      edit_precoForcado: "",
      edit_precoVenda: "",
      edit_anoFabricacao: "",
      edit_anoModelo: "",
      edit_vendaFutura: "",
      edit_status: "",
      edit_familiaVeiculoId: "",
      edit_combustivelVeiculoId: "",
      edit_descricao: "",
      edit_combustivel: "",
      edit_tipo_empresa: "",


      edit_familia: "",

      //Filtros
      searchTitle: "",
      searchAnoFab: "",
      searchAnoMod: "",
      searchVendaFutura: "",
      searchStatus: "",
      searchFamiliaSelecionada: "",
      searchFamiliaSelecionadaId: "",
      searchCombustivelSelecionado: "",
      searchCombustivelSelecionadoId: "",


      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35],
      pageSize: 10,

    };
  },
  watch: {
    familiaSelecionada: function (novaFamilia) {
      const familia = this.familias.find(m => m.descricao === novaFamilia);
      this.familiaVeiculoId = familia ? familia.id : null;

    },
    searchFamiliaSelecionada: function (novaFamilia) {
      const familia = this.familias.find(m => m.descricao === novaFamilia);
      this.searchFamiliaSelecionadaId = familia ? familia.id : null;
    },
    combustivelSelecionado: function (novoCombustivel) {
      const combustivel = this.combustiveis.find(m => m.descricao === novoCombustivel);
      this.combustivelVeiculoId = combustivel ? combustivel.id : null;
      this.searchCombustivelSelecionadoId = combustivel ? combustivel.id : null;
    },
    searchCombustivelSelecionado: function (novoCombustivel) {
      const combustivel = this.combustiveis.find(m => m.descricao === novoCombustivel);
      this.searchCombustivelSelecionadoId = combustivel ? combustivel.id : null;
    },

  },
  mounted() {
    this.retrieveModelos()
    this.retrieveFamilias();
    this.retrieveCombustiveis();
  },
  methods: {
    currency(number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(number);
    },
    formatarValor(valor) {
      if (!valor) return '';
      valor = valor.toString().replace(/\D/g, '');
      valor = (valor / 100).toFixed(2).replace('.', ',');
      valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return valor;
    },
    clearSelection() {
      this.selectedOption = {};
      this.selectedOptionCombustivel = {};
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

    async onSubmit() {
      try {

        await fetch(`${process.env.VUE_APP_API_URL}modelo`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigo: this.codigo,
            descricao: this.descricao,
            edicao: this.edicao,
            cilindro: this.cilindro,
            potencia: this.potencia,
            precoForcado: this.precoForcado,
            precoVenda: this.precoVenda,
            custoMarcacao: this.custoMarcacao,
            vendaFutura: this.vendaFutura,
            anoFabricacao: this.anoFabricacao,
            anoModelo: this.anoModelo,
            status: this.status,
            familiaVeiculoId: this.familiaVeiculoId,
            combustivelVeiculoId: this.combustivelVeiculoId,
            tipo_empresa: this.tipo_empresa
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
              window.location.reload();
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
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }

    },
    //Buscar dados no banco de dados
    getRequestParams(searchTitle, page, pageSize, searchAnoFab, searchAnoMod, searchVendaFutura, searchStatus, searchFamiliaSelecionadaId, searchCombustivelSelecionadoId) {
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
      if (searchAnoFab) {
        params["anoFab"] = searchAnoFab;
      }
      if (searchAnoMod) {
        params["anoMod"] = searchAnoMod;
      }
      if (searchVendaFutura) {
        params["vendaFutura"] = searchVendaFutura;
      }
      if (searchStatus) {
        params["status"] = searchStatus;
      }
      if (searchFamiliaSelecionadaId) {
        params["familia"] = searchFamiliaSelecionadaId;
      }
      if (searchCombustivelSelecionadoId) {
        params["combustivel"] = searchCombustivelSelecionadoId;
      }
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveModelos();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveModelos();
    },
    async retrieveModelos() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize,
          this.searchAnoFab,
          this.searchAnoMod,
          this.searchVendaFutura,
          this.searchStatus,
          this.searchFamiliaSelecionadaId,
          this.searchCombustivelSelecionadoId
        );
        userService.getModelo(params).then((response) => {
          const { modelo_veiculo, totalPages, totalItems } = response.data;
          this.modelos = modelo_veiculo;
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
    async retrieveFamilias() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getFamilia_at(params).then((response) => {
          const { familia_veiculo, totalPages, totalItems } = response.data;
          this.familias = familia_veiculo;
          //this.edit_familia = familia_veiculo[0].id;
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

    async retrieveCombustiveis() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getCombustiveis(params).then((response) => {
          const { combustivel, totalPages, totalItems } = response.data;
          this.combustiveis = combustivel.filter(comb => comb.status === 1);
          this.totalPages = totalPages;
          this.totalItems = totalItems;

        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },


    async editar_modelo(item) {
      console.log("Dados para edição");
      console.log(item)
      this.edit_id = item.id,
        this.edit_codigo = item.codigo,
        this.edit_descricao = item.descricao,
        this.edit_edicao = item.edicao,
        this.edit_cilindro = item.cilindro,
        this.edit_potencia = item.potencia,
        this.edit_precoForcado = item.precoForcado,
        this.edit_precoVenda = this.currency(item.precoVenda),
        this.edit_anoFabricacao = item.anoFabricacao,
        this.edit_anoModelo = item.anoModelo,
        this.edit_vendaFutura = item.vendaFutura,
        this.selectedOption.descricao = item.familia_veiculo.descricao,
        this.edit_familiaVeiculoId = item.familiaVeiculoId,
        this.edit_combustivelVeiculoId = item.combustivelVeiculoId,
        this.selectedOptionCombustivel.descricao = item.combustivel_veiculo.descricao
      this.edit_status = item.status;
      this.edit_tipo_empresa = item.tipo_empresa
      this.updateSelectedOption();
      this.updateSelectedOptionCombustivel();
    },
    updateSelectedOption() {
      const selectedOption = this.familias.find(option => option.descricao === this.selectedOption.descricao);
      if (selectedOption) {
        this.selectedOption = { id: selectedOption.id, descricao: selectedOption.descricao };
      } else {
        this.selectedOption = { id: this.edit_familiaVeiculoId, descricao: '' };
      }
    },
    updateSelectedOptionCombustivel() {
      const selectedOption = this.combustiveis.find(option => option.descricao === this.selectedOptionCombustivel.descricao);
      if (selectedOption) {
        this.selectedOptionCombustivel = { id: selectedOption.id, descricao: selectedOption.descricao };
      } else {
        this.selectedOptionCombustivel = { id: this.edit_combustivelVeiculoId, descricao: '' };
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
        edicao: this.edit_edicao,
        cilindro: this.edit_cilindro,
        potencia: this.edit_potencia,
        precoForcado: this.edit_precoForcado,
        precoVenda: this.edit_precoVenda,
        custoMarcacao: this.custoMarcacao,
        vendaFutura: this.edit_vendaFutura,
        anoFabricacao: this.edit_anoFabricacao,
        anoModelo: this.edit_anoModelo,
        status: this.edit_status,
        familiaVeiculoId: this.selectedOption.id,
        combustivelVeiculoId: this.selectedOptionCombustivel.id,
        tipo_empresa: this.edit_tipo_empresa

      };
      console.log(dados)

      const response = await axios.put(
        `${process.env.VUE_APP_API_URL}modelo/${this.edit_id}`,
        dados,
        { headers }
      );
      console.log(response.data.StatusOk)
      if (response.data.StatusOk == 200) {
        this.abrir_modal = true;
        this.msg = response.data.message;
        setTimeout(() => (this.abrir_modal = false), 4000);
        // this.resetForm();
        // this.retrieveFamilias();
        window.location.reload();
      }
      return console.log(response.data);
    },

  }
};
</script>
