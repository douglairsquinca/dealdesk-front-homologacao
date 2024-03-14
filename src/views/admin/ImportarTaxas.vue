<template>
  <SidebarVue ref="sidebar" />
  <Navgator ref="navgator" :barraTitulo="' Administração - Taxas'" :titulo="'taxas'" />

  <div class="card card-filtro">
    <div class="row g-2 p-2">
      <p class="h-6 rf_texto">Validade das Taxas - <strong>{{ validade }}</strong></p>
      <div class="col-3">
        <div class="form-floating">
          <div class="input-group-append mt-2">
            <input type="file" class="form-control rf_bg_form rf_texto" name="file" ref="files" />
          </div>
        </div>
      </div>
      <div class="col-1">
        <div class="input-group-append ">
          <button class="btn btn-lg btn-filtro" for="inputGroupFile02" @click="importar">
            <span class="rf_texto_btn">Importar</span>
          </button>
        </div>
        <div v-if="abrir_modal">
          <Message :msg="msg" v-show="msg" />
        </div>
      </div>
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
          <input type="text" class="form-control rf_bg_form rf_texto" v-model="desc_taxa" />
          <label class="rf_texto">Plano</label>
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
          <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; retrieveTaxas();">
            <span class="rf_texto_btn">Pesquisar</span>
          </button>
        </div>
      </div>


    </div>
  </div>
  <!--Tabelas-->
  <div class="card card-tabela g-2 p-2 rf_margin">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col">Financeira</th>
          <th scope="col">Plano</th>
          <th scope="col">Retorno</th>
          <th scope="col">Ano Inicial</th>
          <th scope="col">Ano Final</th>
          <th scope="col">Parcelas</th>
          <th scope="col">TAC</th>
          <th scope="col">TACdev</th>
          <th scope="col">Retorno %</th>
          <th scope="col">Entrada</th>
          <th scope="col">Coeficiente</th>
          <th scope="col">Coef. Rebate</th>
          <th scope="col">Validade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" item in itens " :key="item.id" class="table-linha">
          <td>{{ item.taxas_bancos.nome }}</td>
          <td>{{ item.Name }}</td>
          <td>{{ item.ReturnType }}</td>
          <td>{{ item.StartYear }}</td>
          <td>{{ item.EndYear }}</td>
          <td>{{ item.Installments }}</td>
          <td>{{ item.TAC }}</td>
          <td>{{ item.TACdev }}</td>
          <td>{{ item.ReturnPercentage }}</td>
          <td>{{ item.Input }}</td>
          <td>{{ item.Coefficient }}</td>
          <td>{{ item.RebateCoefficient }}</td>
          <td>{{ item.Validity }}</td>
          <td>
            <button type="button" class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
              @click="editar_taxa(item)">
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>


        </tr>
      </tbody>
    </table>
    <pagination v-if="itens.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
      @change-page="handlePageChange" />
  </div>
  <!-- Modal para edição -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-pencil-square fs-5 icone_kit"><span class="texto_kit">Editar Taxa</span></i>
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
                <select class="form-select rf_bg_form rf_texto" v-model="edit_idSalesSector" id="valid_status" required>
                  <option value="1">Novo</option>
                  <option value="2">Usado</option>
                </select>
                <label for="valid_status" class="rf_texto">Categoria</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_Name" required
                  autocomplete="off" />
                <label class="rf_texto">Plano</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_ReturnType" />
                <label class="rf_texto">Tipo Retorno</label>
              </div>
            </div>
          </div>
          <div class="row g-2 p-2">
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_StartYear" />
                <label class="rf_texto">Ano Inicial</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_EndYear" />
                <label class="rf_texto">Ano Final</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_Installments" />
                <label class="rf_texto">Parcelas</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_Validity" />
                <label class="rf_texto">Validade</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" list="datalistBanco" v-model="selectedOptionBanco.banco"
                  @change="updateSelectedOptionBanco" class="form-control rf_bg_form rf_texto" />
                <label class="rf_texto">Banco</label>

                <datalist id="datalistBanco">
                  <option>{{ this.edit_idBank }}</option>
                  <option v-for="banco in bancos" :value="banco.nome" :selected="selectedOptionBanco.id === banco.id"
                    :key="banco.id">{{ banco.nome }}</option>
                </datalist>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_TAC" />
                <label class="rf_texto">TAC</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_TACdev" />
                <label class="rf_texto">TACdev</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_ReturnPercentage" />
                <label class="rf_texto">Retorno %</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_Plus" />
                <label class="rf_texto">Plus</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_Input" />
                <label class="rf_texto">Entrada</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_Coefficient" />
                <label class="rf_texto">Coeficiente</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_Rebate" />
                <label class="rf_texto">Rebate</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_RebateCoefficient" />
                <label class="rf_texto">Coeficiente Rebate</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_SpfCoefficient" />
                <label class="rf_texto">Spf Coeficiente</label>
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
import userService from "../../services/user.service";
import Pagination from "../../components/Pagination.vue";
import axios from "axios";
import Message from "../../components/modal/Message.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import Navgator from "../../components/menu/Navgator.vue";

export default {
  components: {
    SidebarVue,
    Navgator,
    Pagination,
    Message,
    RodapeVue

  },
  data: () => ({
    form: { file: null },
    itens: [],
    bancos: [],
    validade: "",
    msg: null,
    abrir_modal: null,
    selectedOptionBanco: { id: null, banco: '' },
    desc_taxa: "",

    edit_id: "",
    edit_Name: "",
    edit_idSalesSector: "",
    edit_ReturnType: "",
    edit_StartYear: "",
    edit_EndYear: "",
    edit_Installments: "",
    edit_Validity: "",
    edit_idBank: "",
    edit_TAC: "",
    edit_TACdev: "",
    edit_ReturnPercentage: "",
    edit_Plus: "",
    edit_Input: "",
    edit_Coefficient: "",
    edit_Rebate: "",
    edit_RebateCoefficient: "",
    edit_SpfCoefficient: "",


    page: 1,
    totalPages: 0,
    totalItems: 0,
    pageSizes: [25, 50, 75, 100],
    pageSize: 25,

  }),
  created() {
    this.retrieveTaxas();
    this.retrieveBancos();
  },
  methods: {
    getRequestParams(desc_taxa, banco_taxa, page, pageSize) {
      let params = {};
      if (desc_taxa) {
        params["nome"] = desc_taxa;
      }
      if (banco_taxa) {
        params["banco"] = banco_taxa;
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
      this.retrieveTaxas();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveTaxas();
    },
    async retrieveTaxas() {
      try {
        const params = this.getRequestParams(
          this.desc_taxa,
          this.banco_taxa,
          this.page,
          this.pageSize
        );
        userService.getTaxasAll(params).then((response) => {
          const { parcelas, totalPages, totalItems } = response.data;
          this.itens = parcelas;
          this.totalPages = totalPages;
          this.totalItems = totalItems;
          this.validade = parcelas[0].Validity;


        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async retrieveBancos() {
      try {
        const bancos = await axios.get(`${process.env.VUE_APP_API_URL}get_bancos`);
        this.bancos = bancos.data.rows
        console.log(this.bancos)
      } catch (error) {

        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    updateSelectedOptionBanco() {
      const selectedOption = this.bancos.find(option => option.nome === this.selectedOptionBanco.banco);
      if (selectedOption) {
        this.selectedOptionBanco = { id: selectedOption.id, banco: selectedOption.nome };
      } else {
        this.selectedOptionBanco = { id: this.edit_idBank, nome: '' };
      }
      console.log(this.selectedOptionBanco);
    },
    async editar_taxa(item) {
      console.log("Dados para edição");
      console.log(item.taxas_bancos.nome)
      this.edit_id = item.id,
        this.edit_Name = item.Name,
        this.edit_idSalesSector = item.IdSalesSector,
        this.edit_ReturnType = item.ReturnType,
        this.edit_StartYear = item.StartYear,
        this.edit_EndYear = item.EndYear,
        this.edit_Installments = item.Installments,
        this.edit_Validity = item.Validity,
        this.edit_idBank = item.IdBank,
        this.selectedOptionBanco.banco = item.taxas_bancos.nome,
        this.edit_TAC = item.TAC,
        this.edit_TACdev = item.TACdev,
        this.edit_ReturnPercentage = item.ReturnPercentage,
        this.edit_Plus = item.Plus,
        this.edit_Input = item.Input,
        this.edit_Coefficient = item.Coefficient,
        this.edit_Rebate = item.Rebate,
        this.edit_RebateCoefficient = item.RebateCoefficient,
        this.edit_SpfCoefficient = item.SpfCoefficient
      this.updateSelectedOptionBanco();
    },
    async update() {
      const token = this.$store.state.auth.user.accessToken;
      const headers = {
        "x-access-token": token,
      };
      const dados = {
        id: this.edit_id,
        Name: this.edit_Name,
        IdSalesSector: this.edit_idSalesSector,
        ReturnType: this.edit_ReturnType,
        StartYear: this.edit_StartYear,
        EndYear: this.edit_EndYear,
        FinancingPlanType: 1,
        Spf: 1,
        Installments: this.edit_Installments,
        Validity: this.edit_Validity,
        IdBank: this.edit_idBank,
        TAC: this.edit_TAC,
        TACdev: this.edit_TACdev,
        ReturnPercentage: this.edit_ReturnPercentage,
        Plus: this.edit_Plus,
        Input: this.edit_Input,
        Coefficient: this.edit_Coefficient,
        Rebate: this.edit_Rebate,
        RebateCoefficient: this.edit_RebateCoefficient,
        SpfCoefficient: this.edit_SpfCoefficient


      };
      console.log(dados)

      const response = await axios.put(
        `${process.env.VUE_APP_API_URL}taxas/${this.edit_id}`,
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
        //window.location.reload();
      }
      return console.log(response.data);
    },

    async importar() {
      console.log("Importar taxas")
      let dataForm = new FormData();

      for (let file of this.$refs.files.files) {
        dataForm.append(`file`, file);
      }
      let res = await fetch(`${process.env.VUE_APP_API_URL}taxas/upload`, {
        method: "POST",

        body: dataForm,
      });
      let data = await res.json();
      if (data.StatusOk == 200) {
        this.abrir_modal = true;
        this.msg = data.message;
        setTimeout(() => (this.abrir_modal = false), 4000);
      } else {
        this.abrir_modal = true;
        this.msg = data.message;
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
  },
};
</script>
