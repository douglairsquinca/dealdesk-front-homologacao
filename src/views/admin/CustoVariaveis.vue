<template>
  <SidebarVue ref="sidebar" />
  <Navgator ref="navgator" :barraTitulo="' Administração - Custos Variáveis'" :titulo="'custo variável'" />

  <!--Formulário de Cadastro -->

  <div class="card card-filtro">
    <form @submit.prevent="onSubmit">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Cadastrar Custo Variável</span></i>
        </div>
      </div>
      <div class="row g-2 p-2">
        <!--Descrição-->
        <div class="col">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="descricao" required />
            <label class="rf_texto">Descrição</label>
          </div>
        </div>
        <!--Veiculos-->
        <div class="col-1">
          <div class="form-check form-check-inline  rf_texto">
            <input class="form-check-input" type="checkbox" v-model="aplicaVeiculoNovo" />
            <label class="form-check-label" for="inlineCheckbox1">Veículo Novo</label>
          </div>
          <div class="form-check form-check-inline  rf_texto">
            <input class="form-check-input" type="checkbox" v-model="aplicaVeiculoUsado" />
            <label class="form-check-label" for="inlineCheckbox2">Veículo Usado</label>
          </div>
        </div>
        <!--Aplica após qtd dias-->
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="aplicaAposQtdDias" required />
            <label for="valid_cnpj" class="rf_texto">Aplicar após</label>
            <div class="invalid-feedback">O campo CNPJ é obrigatório!</div>
          </div>
        </div>
        <!--Tipo de Valor-->
        <div class="col-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="tipoValor" @change="resetValor" required>
              <option value="0">Monetário</option>
              <option value="1">Percentual</option>
            </select>
            <label for="valid_tipoValor" class="rf_texto">Tipo de Valor</label>

          </div>
        </div>
        <!--Valor Base-->
        <div class="col-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="valorBase" id="valid_valorBase" required>
              <option value="0">Valor de Compra</option>
              <option value="1">Valor de Venda</option>
              <option value="2">Ganho</option>
            </select>
            <label for="valid_valorBase" class="rf_texto">Valor Base</label>
          </div>
        </div>
        <!--Valor-->
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="valor"
              @input="aplicarFormatacaoMonetaria" required />
            <label for="valid_valor" class="rf_texto">Valor</label>
          </div>
        </div>
        <!--Status-->
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="status" required>
              <option value="0">Desabilitado</option>
              <option value="1">Habilitado</option>
            </select>
            <label for="valid_status" class="rf_texto">Status</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
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
      <div class="col-4">
        <div class="form-floating">
          <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchTitle" />
          <label class="rf_texto">Descrição</label>
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
          <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; retrieveCusto();">
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
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo Valor</th>
          <th scope="col">Valor Base</th>
          <th scope="col">Veículo Novo</th>
          <th scope="col">Veículo Usado</th>
          <th scope="col">Aplica juros</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in JSON.parse(JSON.stringify(custo_variaveis))" :key="item.index" class="table-linha">
          <td>{{ item.descricao }}</td>
          <td>{{ item.valor }}</td>
          <td>{{ item.tipoValor }}</td>
          <td>{{ item.valorBase }}</td>
          <td>{{ item.aplica_novo }}</td>
          <td>{{ item.aplica_usado }}</td>
          <td>{{ item.pro_rata }}</td>
          <td>{{ item.status }}</td>
          <td>
            <button type="button" class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
              @click="editar_custo(item)">
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination v-if="custo_variaveis.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
      @change-page="handlePageChange" />
  </div>

  <!-- Modal para edição -->
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-pencil-square fs-5 icone_kit"><span class="texto_kit">Editar Custo</span></i>
          </div>
          <button class="btn btn-modal btn-lg p-1 mt-1" type="button" data-bs-target="#ModalProposta"
            data-bs-toggle="modal" aria-label="Close"> Sair </button>
        </div>
        <div class="modal-body">
          <div class="row g-2 p-2">
            <!--Descrição-->
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_descricao" required />
                <label for="valid_descricao" class="rf_texto">Descrição</label>

              </div>
            </div>
            <!--Veiculos-->
            <div class="col-2">
              <div class="form-check form-check-inline  rf_texto">
                <input class="form-check-input" type="checkbox" v-model="edit_aplicaVeiculoNovo" />
                <label class="form-check-label" for="inlineCheckbox1">Veículo Novo</label>
              </div>
              <div class="form-check form-check-inline  rf_texto">
                <input class="form-check-input" type="checkbox" v-model="edit_aplicaVeiculoUsado" />
                <label class="form-check-label" for="inlineCheckbox2">Veículo Usado</label>
              </div>
            </div>
          </div>
          <div class="row g-2 p-2">
            <!--Aplica após qtd dias-->
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_aplicaAposQtdDias" required />
                <label for="valid_cnpj" class="rf_texto">Aplicar após</label>
              </div>
            </div>
            <!--Tipo de Valor-->
            <div class="col-2">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_tipoValor" @change="resetEditValor"
                  required>
                  <option value="0">Monetário</option>
                  <option value="1">Percentual</option>
                </select>
                <label for="valid_tipoValor" class="rf_texto">Tipo de Valor</label>

              </div>
            </div>
            <!--Valor Base-->
            <div class="col-2">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_valorBase" required>
                  <option value="0">Valor de Compra</option>
                  <option value="1">Valor de Venda</option>
                  <option value="2">Ganho</option>
                </select>
                <label for="valid_valorBase" class="rf_texto">Valor Base</label>
              </div>
            </div>
            <!--Valor-->
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_valor"
                  @input="edit_aplicarFormatacaoMonetaria" required />
                <label for="valid_valor" class="rf_texto">Valor</label>

              </div>
            </div>
            <!--Status-->
            <div class="col-2">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_status" required>
                  <option value="false">Desabilitado</option>
                  <option value="true">Habilitado</option>
                </select>
                <label for="valid_status" class="rf_texto">Status</label>

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
  <!-- Button trigger modal -->

  <RodapeVue />
</template>
<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import axios from "axios";
//import DataService from "../../services/DataService";
import userService from "../../services/user.service";
import Pagination from "../../components/Pagination.vue";
import Message from "../../components/modal/Message.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import Navgator from "../../components/menu/Navgator.vue";


export default {
  name: "Usuários",
  components: {
    SidebarVue,
    Navgator,
    Pagination,
    Message,
    RodapeVue
  },
  data() {
    return {
      custo_variaveis: [],

      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,
      //Campos Cadastro   
      descricao: "",
      aplicaVeiculoNovo: true,
      aplicaVeiculoUsado: true,
      aplicaAposQtdDias: 0,
      tipoValor: 0,
      valorBase: 0,
      valor: "",
      status: 1,


      /// Campos Modal Editar
      edit_id: "",
      edit_descricao: "",
      edit_aplicaVeiculoNovo: "",
      edit_aplicaVeiculoUsado: "",
      edit_aplicaAposQtdDias: "",
      edit_tipoValor: "",
      edit_valorBase: "",
      edit_valor: "",
      edit_status: "",

      //Params
      searchTitle: "",
      searchStatus: "",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 10,
    };
  },
  mounted() {
    this.retrieveCusto();
  },
  methods: {
    aplicarFormatacaoMonetaria() {
      console.log(this.tipoValor)
      if (this.tipoValor == "0") {
        this.valor = this.formatarValor(this.valor);
      }
    },
    edit_aplicarFormatacaoMonetaria() {
      console.log(this.tipoValor)
      if (this.tipoValor == "0") {
        this.valor = this.formatarValor(this.edit_valor);
      }
    },
    formatarValor(valor) {
      if (!valor) return '';
      valor = valor.toString().replace(/\D/g, '');
      valor = (valor / 100).toFixed(2).replace('.', ',');
      valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return valor;
    },
    resetValor() {
      this.valor = ""
    },
    resetEditValor() {
      this.edit_valor = ""
    },
    resetForm() {
      this.descricao = "",
        this.aplicaAposQtdDias = 0,
        this.tipoValor = 0,
        this.valorBase = 0,
        this.valor = "",
        this.status = 1;
    },
    async onSubmit() {
      await fetch(`${process.env.VUE_APP_API_URL}custo`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          descricao: this.descricao,
          aplicaVeiculoNovo: this.aplicaVeiculoNovo,
          aplicaVeiculoUsado: this.aplicaVeiculoUsado,
          aplicaAposQtdDias: this.aplicaAposQtdDias,
          tipoValor: this.tipoValor,
          valorBase: this.valorBase,
          valor: this.valor,
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
            this.retrieveCusto();
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
    getRequestParams(searchTitle, page, pageSize, searchStatus) {
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
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveCusto();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveCusto();
    },
    async retrieveCusto() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize,
          this.searchStatus
        );
        userService.getCusto(params).then((response) => {
          const { custo_variavel, totalPages, totalItems } = response.data;
          //this.custo_variavel = custo_variavel;
          this.totalPages = totalPages;
          this.totalItems = totalItems;
          var transf_id = "";
          var transf_descricao = "";
          var transf_valor = "";
          var transf_valor_base = "";
          var transf_valor_tipo = "";
          var transf_veiculo_novo = "";
          var transf_veiculo_usado = "";
          var transf_pro_rata = "";
          var transf_status = "";
          var custo = [];
          var custo_v = [];

          for (var i = 0; i < custo_variavel.length; i++) {
            transf_id = custo_variavel[i]["id"];
            transf_descricao = custo_variavel[i]["descricao"];

            //Verifica valor de Ganho
            if (custo_variavel[i]["valorBase"] == 2) {
              transf_valor_base = "Ganho";
            }
            //Verifica valor de Venda
            if (custo_variavel[i]["valorBase"] == 1) {
              transf_valor_base = "Valor de Venda";
            }
            //Verifica valor de Compra
            if (custo_variavel[i]["valorBase"] == 0) {
              transf_valor_base = "Valor de Compra";
            }
            //Verifica o valor
            if (custo_variavel[i]["tipoValor"] == 0) {
              transf_valor = this.currency(custo_variavel[i]["valor"]);
            } else if (custo_variavel[i]["tipoValor"] == 1) {
              transf_valor = custo_variavel[i]["valor"] + "%";
            }
            //Verifica se aplica a veiculo novo
            if (custo_variavel[i]["tipoValor"] == 1) {
              transf_valor_tipo = "Percentual";
            } else if (custo_variavel[i]["tipoValor"] == 0) {
              transf_valor_tipo = "Monetário";
            }
            //Verifica se aplica a veiculo novo
            if (custo_variavel[i]["aplicaVeiculoNovo"] == 1) {
              transf_veiculo_novo = "Sim";
            } else if (custo_variavel[i]["aplicaVeiculoNovo"] == 0) {
              transf_veiculo_novo = "Não";
            }
            //Verifica se aplica a veiculo usado
            if (custo_variavel[i]["aplicaVeiculoUsado"] == 1) {
              transf_veiculo_usado = "Sim";
            } else if (custo_variavel[i]["aplicaVeiculoUsado"] == 0) {
              transf_veiculo_usado = "Não";
            }
            //Verifica ProRata
            if (custo_variavel[i]["aplicaAposQtdDias"] == 0) {
              transf_pro_rata = "Não";
            } else if (custo_variavel[i]["aplicaAposQtdDias"]) {
              transf_pro_rata = "Sim após - " + custo_variavel[i]["aplicaAposQtdDias"];
            }
            //Veifica o Status
            if (custo_variavel[i]["status"] == 1) {
              transf_status = "Habilitado";
            } else if (custo_variavel[i]["status"] == 0) {
              transf_status = "Desabilitado";
            }
            //Gera um novo array
            custo = {
              id: transf_id,
              descricao: transf_descricao,
              valor: transf_valor,
              tipoValor: transf_valor_tipo,
              tipoValor_cod: custo_variavel[i]["tipoValor"],
              valorBase: transf_valor_base,
              valorBase_cod: custo_variavel[i]["valorBase"],
              aplica_novo: transf_veiculo_novo,
              aplica_novo_cod: custo_variavel[i]["aplicaVeiculoNovo"],
              aplica_usado: transf_veiculo_usado,
              aplica_usado_cod: custo_variavel[i]["aplicaVeiculoUsado"],
              pro_rata: transf_pro_rata,
              pro_rata_cod: custo_variavel[i]["aplicaAposQtdDias"],
              status: transf_status,
              status_cod: custo_variavel[i]["status"]
            };
            custo_v.push(custo);
          }

          this.custo_variaveis = custo_v;

          console.log(this.custo_variaveis);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    currency(number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(number);
    },

    async editar_custo(item) {
      (this.edit_id = item.id),
        (this.edit_descricao = item.descricao),
        (this.edit_aplicaVeiculoNovo = item.aplica_novo_cod),
        (this.edit_aplicaVeiculoUsado = item.aplica_usado_cod),
        (this.edit_aplicaAposQtdDias = item.pro_rata_cod),
        (this.edit_tipoValor = item.tipoValor_cod),
        (this.edit_valorBase = item.valorBase_cod),
        (this.edit_valor = item.valor),
        (this.edit_status = item.status_cod);
      console.log(item)
    },
    async update() {
      const token = this.$store.state.auth.user.accessToken;

      const headers = {
        "x-access-token": token,
      };
      const dados = {
        descricao: this.edit_descricao,
        aplicaVeiculoNovo: this.edit_aplicaVeiculoNovo,
        aplicaVeiculoUsado: this.edit_aplicaVeiculoUsado,
        aplicaAposQtdDias: this.edit_aplicaAposQtdDias,
        tipoValor: this.edit_tipoValor,
        valorBase: this.edit_valorBase,
        valor: this.edit_valor,
        status: this.edit_status,
      };

      const response = await axios.put(
        `${process.env.VUE_APP_API_URL}custo/${this.edit_id}`,
        dados,
        { headers }
      );
      const resp = JSON.stringify(response.status);
      console.log(resp)
      if (resp == 200) {
        this.abrir_modal = true;
        this.msg = "Atualizado com sucesso!";
        setTimeout(() => (this.abrir_modal = false), 2000);
        this.retrieveCusto();
      }
      //return console.log(response.data);
    },
  },
};
</script>
