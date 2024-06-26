<template>
  <SidebarVue ref="sidebar" />
  <NavgatorDk
    ref="navgator"
    :barraTitulo="' Veículos com reserva'"
    :titulo="'veículos com reserva'"
  />

  <!--Bloco do Filtro-->
  <div class="card card-filtro">
    <div class="row g-2 p-2">
      <div class="card-title rf_texto gy-4">
        <i class="bi bi-funnel fs-5 icone_filtro"
          ><span class="texto_filtro">Filtro</span></i
        >
      </div>
    </div>
    <div class="row g-2 p-2">
      <div class="col-3 col-md-4">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroPlaca"
            @input="filtrarVeiculos"
          />
          <label class="rf_texto">Placa</label>
        </div>
      </div>
      <div class="col-3 col-md-4">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroNumero"
            @input="filtrarVeiculos"
          />
          <label class="rf_texto">Número</label>
        </div>
      </div>

      <div class="col-2 col-md-4">
        <div class="input-group-append">
          <button
            class="btn btn-lg btn-filtro"
            type="button"
            @click="
              page = 1;
              retrievePropostas();
            "
          >
            <span class="rf_texto_btn">Atualizar Lista</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Tabelas-->
  <div class="card card-tabela g-2 p-2 rf_margin">
    <table class="table rf_texto_desk">
      <thead>
        <tr>
          <th scope="col" class="rf_header_table">Estoque</th>
          <th scope="col" class="rf_header_table">Loja</th>
          <th scope="col" class="rf_header_table">Cat.</th>
          <th scope="col" class="rf_header_table">Chassis</th>
          <th scope="col" class="rf_header_table">Modelo</th>
          <th scope="col" class="rf_header_table">R$ PPS</th>
          <th scope="col" class="rf_header_table">Dias Est.</th>
          <th scope="col" class="rf_header_table">Cor</th>
          <th scope="col" class="rf_header_table">Marca</th>
          <th scope="col" class="rf_header_table">Ano Mod</th>
          <th scope="col" class="rf_header_table">Ano Fab</th>
          <th scope="col" class="rf_header_table">KM</th>
          <th scope="col" class="rf_header_table">Placa</th>
          <th scope="col" class="rf_header_table">Comb</th>
          <th scope="col" class="rf_header_table">Reservado</th>
          <th scope="col" class="rf_header_table">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in veiculos" :key="item.id" class="table-linha">
          <td class="rf_header_table">{{ item.situacaoestoque }}</td>
          <td class="rf_header_table">{{ item.descricaoreduzida }}</td>
          <td class="rf_header_table">{{ item.estadoveiculo }}</td>
          <td class="rf_header_table">{{ item.chassi }}</td>
          <td class="rf_header_table">{{ item.modelo }}</td>
          <td class="rf_header_table">{{ item.valortotalvenda }}</td>
          <td class="rf_header_table">{{ item.diasestoque }}</td>
          <td class="rf_header_table">{{ item.cor }}</td>
          <td class="rf_header_table">{{ item.marca }}</td>
          <td class="rf_header_table">{{ item.anomodelo }}</td>
          <td class="rf_header_table">{{ item.anofabricacao }}</td>
          <td class="rf_header_table">{{ item.quilometragem }}</td>
          <td class="rf_header_table">{{ item.placa }}</td>
          <td class="rf_header_table">{{ item.combustivel }}</td>
          <td class="rf_header_table">{{ item.pessoavendedor }}</td>

          <td>
            <button
              type="button"
              class="btn-desk"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="edit_proposta(item)"
            >
              <i class="bi bi-file-lock"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pagination v-if="propostas_at.length" :offset="totalPages_4" :total="totalItems_4" :limit="pageSize_4"
                 @change-page="handlePageChangeProposta" /> -->
  </div>

  <div v-if="abrir_modal">
    <Message :msg="msg" v-show="msg" />
  </div>

  <!-- Modal para edição -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-pencil-square fs-5 icone_kit"
              ><span class="texto_kit"
                >Alterar Veículo da Proposta</span
              ></i
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
          <div class="row g-2 p-2">
            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_id"              
                />
                <label class="rf_texto">Nº Proposta</label>
              </div>
            </div>     
            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_numero_veiculo"    
                  disabled          
                />
                <label class="rf_texto">Nº Veículo</label>
              </div>
            </div>     
          </div>
          <div
            class="row g-2 p-2">
            <div class="col-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_chassis"
                  disabled
                />
                <label class="rf_texto">Chassis</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_modelo_veiculo"
                  disabled
                />
                <label class="rf_texto">Modelo Veículo</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_cor"
                  disabled
                />
                <label class="rf_texto">Cor</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_pps_valor"
                  disabled
                  @input="edit_pps_valor = formatarValor(edit_pps_valor)"
                />
                <label class="rf_texto">Preço de Compra</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_valor_veiculo"
                  disabled
                  @input="
                    edit_valor_veiculo = formatarValor(edit_valor_veiculo)
                  "
                />
                <label class="rf_texto">Preço de Venda</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_dias_em_etoque"
                  disabled
                  autocomplete="off"
                />
                <label class="rf_texto">Dias em estoque</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_marca"
                  disabled
                  autocomplete="off"
                />
                <label class="rf_texto">Marca</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_ano_modelo"
                  disabled
                  autocomplete="off"
                />
                <label class="rf_texto">Ano Modelo</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_ano_fabricacao"
                  disabled
                  autocomplete="off"
                />
                <label class="rf_texto">Ano Fabricação</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_kilometragem"
                  disabled
                  autocomplete="off"
                />
                <label class="rf_texto">Quilometragem</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_placa"
                  disabled
                  autocomplete="off"
                />
                <label class="rf_texto">Placa</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_combustivel"
                  disabled
                  autocomplete="off"
                />
                <label class="rf_texto">Combustível</label>
              </div>
            </div>

            <div class="col-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control rf_bg_form rf_texto"
                  v-model="edit_custo_contabil"
                  disabled
                  autocomplete="off"
                />
                <label class="rf_texto">Custo Contábil</label>
              </div>
            </div>
            <div class="col-12">
              <div class="form-floating">
                <textarea
                  v-model="edit_observacao"
                  required
                  class="form-control rf_bg_form rf_texto"
                ></textarea>
                <label class="rf_texto">observação</label>
              </div>
            </div>
          </div>
         
           
        
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="update_veiculo()"    
            :disabled="chk_id_proposta"       
            data-bs-dismiss="modal"
            class="btn btn-modal btn-lg p-1 mt-1"
          >
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

//import Pagination from "../../components/Pagination.vue";
import { VueMaskDirective } from "vue-the-mask";

import "dayjs/locale/pt-br";
import "dayjs/plugin/utc";
import "dayjs/plugin/timezone";
import axios from "axios";

import TokenService from "../../services/token.service";
import jwt_decode from "jwt-decode";
import Message from "../../components/modal/Message.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import NavgatorDk from "../../components/menu/NavgatorDk.vue";

export default {
  name: "Veiculos Reserva",

  components: {
    SidebarVue,
    NavgatorDk,
    //Pagination,
    Message,
    RodapeVue,
  },
  directives: {
    mask: VueMaskDirective,
  },
  data() {
    return {
      veiculos: [],
      verificar_veiculo: [],
      abrir_modal: false,

      selected_alteracao: "venda_perdida",
      msg: "",

      edit_id: "",
      edit_venda_futura: "",
      edit_id_empresa: "",
      edit_chassis: "",
      edit_modelo_veiculo: "",
      edit_pps_valor: "",
      edit_valor_veiculo: "",
      edit_dias_em_etoque: "",
      edit_marca: "",
      edit_ano_modelo: "",
      edit_ano_fabricacao: "",
      edit_kilometragem: "",
      edit_placa: "",
      edit_combustivel: "",
      edit_numero_veiculo: "",
      edit_custo_contabil: "",
      edit_observacao: "",

      obs_check: true,
      filtroPlaca: "", // Filtro para a placa
      filtroNumero: "", // Filtro para o número
      filtroCategoria: "", // Filtro para a categoria
      veiculosFiltrados: [],
      chk_id_proposta: false
    };
  },

  created() {
    const accessToken = TokenService.getLocalAccessToken();
    const decodedToken = jwt_decode(accessToken);
    this.empresaID = decodedToken.company;
  },

  mounted() {
    this.getToken();
    this.retrievePropostas();
  },
  methods: {
    getToken() {
      const accessToken = TokenService.getLocalAccessToken();

      // Obter o token de atualização (refresh token)
      TokenService.getLocalRefreshToken();

      // Obter o usuário completo (incluindo os tokens) se necessário
      TokenService.getUser();

      const decodedToken = jwt_decode(accessToken);
      console.log(decodedToken);
      this.company_id = decodedToken.company;
      this.user_id = decodedToken.id;
    },
    selecionar_alteracao() {
      if (this.selected_alteracao === "venda_perdida") {
        this.tipo_alteracao = this.selected_alteracao;
        this.form_1 = true;
        this.form_2 = false;
      } else if (this.selected_alteracao === "alterar_veiculo") {
        this.tipo_alteracao = this.selected_alteracao;
        this.form_1 = false;
        this.form_2 = true;
      }
    },
    async edit_proposta(item) {
      console.log(item);   
    
      this.edit_categoria = item.estadoveiculo;
      this.edit_chassis = item.chassi;
      this.edit_modelo_veiculo = item.modelo;
      this.edit_pps_valor = this.currency(item.valortotalentrada);
      this.edit_valor_veiculo = this.currency(item.valortotalvenda);
      this.edit_dias_em_etoque = item.diasestoque;
      this.edit_marca = item.marca;
      this.edit_ano_modelo = item.anomodelo;
      this.edit_ano_fabricacao = item.anofabricacao;
      this.edit_kilometragem = item.quilometragem;
      this.edit_placa = item.placa;
      this.edit_combustivel = item.combustivel;
      this.edit_cor = item.cor;
      this.edit_numero_veiculo = item.numero;
      this.edit_custo_contabil = this.currency(item.valorcustocontabil);
      this.edit_id_empresa = item.codigoempresa;
      
     
      
      
      
       
     },

    async buscar_veiculo() {
      console.log("Buscar dadoa do veículo");
      const params = {
        numero: this.edit_numero_veiculo,
        empresa: this.edit_id_empresa,
      };
      const dados_veiculo = await axios.get(
        `${process.env.VUE_APP_API_URL}buscar_veiculo`,
        {
          params,
        }
      );
      console.log(dados_veiculo.data);
      if (dados_veiculo.data.length > 0) {
        (this.edit_chassis = dados_veiculo.data[0].chassi),
          (this.edit_modelo_veiculo = dados_veiculo.data[0].modelo),
          (this.edit_pps_valor = this.currency(
            dados_veiculo.data[0].valortotalentrada
          )),
          (this.edit_valor_veiculo = this.currency(
            dados_veiculo.data[0].valortotalvenda
          )),
          (this.edit_dias_em_etoque = dados_veiculo.data[0].diasestoque),
          (this.edit_marca = dados_veiculo.data[0].marca),
          (this.edit_ano_modelo = dados_veiculo.data[0].anomodelo),
          (this.edit_ano_fabricacao = dados_veiculo.data[0].anofabricacao),
          (this.edit_kilometragem = dados_veiculo.data[0].quilometragem);
        (this.edit_placa = dados_veiculo.data[0].placa),
          (this.edit_combustivel = dados_veiculo.data[0].combustivel),
          (this.edit_custo_contabil = this.currency(
            dados_veiculo.data[0].valorcustocontabil
          ));
        this.edit_categoria = dados_veiculo.data[0].estadoveiculo;
      } else {
        this.abrir_modal = true;
        this.msg = "Veículo não encontrado!";
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },

    async update_veiculo() {
      console.log("Alterando dados dos veículos");
      
      const id_proposta = this.edit_id;
      if(id_proposta == null){
        this.abrir_modal = true;
        this.msg = "Preencha o nº Proposta";
        setTimeout(() => (this.abrir_modal = false), 4000);
        this.chk_id_proposta = true;
        return;
      }

    await fetch(
        `${process.env.VUE_APP_API_URL}alterar_veiculo_reservado/${id_proposta}`,
        {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id_proposta,
            numero_veiculo: this.edit_numero_veiculo,
            empresa: this.edit_id_empresa,
            categoria: this.edit_categoria,
            chassis: this.edit_chassis,
            modelo_veiculo: this.edit_modelo_veiculo,
            pps_valor: this.edit_pps_valor,
            valor_veiculo: this.edit_valor_veiculo,
            dias_em_estoque: this.edit_dias_em_etoque,
            marca: this.edit_marca,
            ano_modelo: this.edit_ano_modelo,
            ano_fabricacao: this.edit_ano_fabricacao,
            kilometragem: this.edit_kilometragem,
            placa: this.edit_placa,
            combustivel: this.edit_combustivel,
            cor: this.edit_cor,
            valorCustoContabil: this.edit_custo_contabil,
            observacao: this.edit_observacao,
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
        if (resposta.StatusOk == 200) {
            this.abrir_modal = true;
            this.msg = resposta.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
            window.location.reload();
        }
        });
      
    },

    formatarValor(valor) {
      this.entrada_1_original = this.entrada_1;
      this.entrada_2_original = this.entrada_2;
      this.entrada_3_original = this.entrada_3;

      if (!valor) return "";
      valor = valor.toString().replace(/\D/g, "");
      valor = (valor / 100).toFixed(2).replace(".", ",");
      valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return valor;
    },

    filtrarPropostas() {
      if (this.selectedFilter === "Venda Finalizada") {
        // console.log("Filtar propostas em Finalizadas! ------------------------------------------------------------------------------------------------------------------ 0006")
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
      } else if (this.selectedFilter === "Venda Perdida") {
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas perdiadas! ------------------------------------------------------------------------------------------------------------------ 0007")
      }
      if (this.searchProposta) {
        this.status_proposta === "Ordem";
        this.retrievePropostas();
      }
    },
    filterByPeriod() {
      this.data_ini = this.startDate;
      this.data_fim = this.endDate;
      this.status_proposta = "Pesquisa Periodo";
      this.retrievePropostas();
    },

    //////////////////////Proposta//////////////////////////////////////////////////////////////////////

    getRequestParamsProposta(
      searchProposta,
      page,
      pageSize,
      empresa_id,
      status_proposta,
      data_ini,
      data_fim
    ) {
      let params = {};
      if (searchProposta) {
        params["id"] = searchProposta;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      if (empresa_id) {
        params["empresa_id"] = empresa_id;
      }
      if (status_proposta) {
        params["status_proposta"] = status_proposta;
      }
      if (data_ini) {
        params["data_ini"] = data_ini;
      }
      if (data_fim) {
        params["data_fim"] = data_fim;
      }

      return params;
    },
    handlePageChangeProposta(value) {
      this.page_4 = value;
      this.retrievePropostas();
    },
    handlePageSizeChangeProposta(size) {
      this.pageSize_4 = size;
      this.page_4 = 1;
      this.retrievePropostas();
    },

    async retrievePropostas() {
      try {
        const verificar_veiculo = await axios.get(
          `${process.env.VUE_APP_API_URL}veiculo_reserva`,
          {
            params: { id: this.empresaID },
          }
        );

        //   let array_verificar_veiculo_2 = [];

        //  for await (const dados of verificar_veiculo.data.veiculoEstoque) {
        //      const createdAtDate = new Date(dados["horario_termino_atendimento"]);
        //      const formattedCreatedAt = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;

        //      console.log(dados)

        //      const array_verificar_veiculo_1 = {
        //          id: dados["id"],
        //          loja: dados["empresa_proposta"]["nome"],
        //          modelo: dados["proposta_veiculo"]["modelo_veiculo"],
        //          chassi: dados["proposta_veiculo"]["chassi"],
        //          placa: dados["proposta_veiculo"]["placa"],
        //          numero: dados["proposta_veiculo"]["numero_veiculo"],
        //          data_atendimento: formattedCreatedAt,
        //          status: dados["status_proposta"]
        //      };
        //      array_verificar_veiculo_2.push(array_verificar_veiculo_1)
        //  }

        this.veiculos = verificar_veiculo.data.dadosAPI;
        console.log("Veículos com reserva", this.veiculos);
      } catch (error) {
        console.log(error);
      }
    },
    filtrarVeiculos() {
      // Aplicar os filtros
      let veiculosFiltrados = this.veiculos.filter((veiculo) => {
        let passouFiltroPlaca = true;
        let passouFiltroNumero = true;
        let passouFiltroCategoria = true;

        // Aplicar filtro da placa, se fornecido
        if (this.filtroPlaca) {
          passouFiltroPlaca = veiculo.placa
            .toLowerCase()
            .includes(this.filtroPlaca.toLowerCase());
        }

        // Aplicar filtro do número, se fornecido
        if (this.filtroNumero) {
          passouFiltroNumero = veiculo.numero
            .toString()
            .includes(this.filtroNumero);
        }

        // Aplicar filtro da categoria, se fornecido
        if (this.filtroCategoria) {
          passouFiltroCategoria = veiculo.categoria
            .toLowerCase()
            .includes(this.filtroCategoria.toLowerCase());
        }

        // Retornar verdadeiro se o veículo passar por todos os filtros
        return passouFiltroPlaca && passouFiltroNumero && passouFiltroCategoria;
      });

      // Atualizar os dados da tabela com os veículos filtrados
      this.veiculos = veiculosFiltrados;
    },

    currency(number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(number);
    },
  },
};
</script>
