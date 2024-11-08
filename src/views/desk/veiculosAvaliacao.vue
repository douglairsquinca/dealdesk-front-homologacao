<template>
  <SidebarVue ref="sidebar" />
  <NavgatorDk ref="navgator" :barraTitulo="' Relatório Mensal - Desk'" :titulo="'relatório'" />

  <div class="card card-filtro">
    <div class="row g-2 p-2">
      <div class="card-title rf_texto gy-4">
        <i class="bi bi-funnel fs-5 icone_filtro"><span class="texto_filtro">Parâmetros do Relatório</span></i>
      </div>
      <div class="row p-2">
        <div class="col-2 col-md-4">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto_desk" v-model="selectedRelatorio" @change="selecionarRelatorios()">
              <option value="finalizadas">Finalizadas</option>
            </select>
            <label class="rf_texto"><strong>Escolha o tipo de Relatório</strong></label>
          </div>
        </div>
        <div class="col-2 col-md-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto_desk" v-model="selectedFilter" @change="filtarRelatorios()">
              <option value="hoje">Hoje</option>
              <option value="ontem">Ontem</option>
              <option value="mes_atual">Mês Atual</option>
              <option value="mes_anterior">Mês Anterior</option>
              <option value="personalizado">Personalizado</option>
            </select>
            <label class="rf_texto"><strong>Referência</strong></label>
          </div>
        </div>
        <div class="col-5">
          <div v-if="selectedFilter === 'personalizado'">
            <div class="input-group btn-entre-data">
              <input type="date" class="form-control rf_bg_form rf_texto " v-model="startDate" />
              <span class="input-group-text">até</span>
              <input type="date" class="form-control rf_bg_form rf_texto" v-model="endDate" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--Tabelas-->
  <div class="card card-tabela g-2 p-2 ">
    <div class="row g-2 p-2">
      <div class="col-12">
        <div class="card-title rf_texto gy-4">
          <i class="bi bi-shop fs-5 icone_filtro"><span class="texto_filtro">Lojas</span></i>
        </div>
        <div class="">
          <div class="box-conversao rf_texto_desk">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="checkboxTodos" v-model="marcarTodos">
              <label class="form-check-label" for="checkboxTodos">Marcar Todos</label>
            </div>
            <div class="form-check form-check-inline" v-for="item in lista_empresas" :key="item.id">
              <input class="form-check-input" type="checkbox" :id="item.id" :value="item.id" v-model="selectedEmpresas">
              <label class="form-check-label" :for="item.id">{{ item.nome }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-2 p-2">
      <div class="col-1 col-md-3">
        <div class="form-floating">
          <button class="btn btn-lg btn-filtro" @click="relatorio_avaliacoes_finalizadas()">
            <span class="rf_texto_btn">Pesquisar</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row g-2 p-2">
      <div class="card-title rf_texto gy-4">
          <i class="bi bi-printer fs-5 icone_filtro"><span class="texto_filtro">Imprimir Relatórios</span></i>
        </div>
      <div class="col-1 col-md-2">
        <button class="btn btn-lg btn-filtro" @click="exportToXLSX">
          <i class="bi bi-filetype-xlsx dropdown-toggle-icon-desk"></i>
        </button>
      </div>
    </div>

    <table id="tabela_conversao" class="table rf_texto_desk" ref="contentToPrint" style="margin-top: 16px">
      <thead>
        <tr>
          <th scope="col" class="rf_header_table">Proposta</th>
          <th scope="col" class="rf_header_table">Cliente</th>
          <th scope="col" class="rf_header_table">Data do atendimento</th>
          <th scope="col" class="rf_header_table">Valor avaliado</th>
          <th scope="col" class="rf_header_table">Quilometragem</th>

          <th scope="col" class="rf_header_table">Placa</th>
          <th scope="col" class="rf_header_table">Modelo</th>
          <th scope="col" class="rf_header_table">Marca</th>
          <th scope="col" class="rf_header_table">Cor</th>
          <th scope="col" class="rf_header_table">Ano</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in avaliacoes_finalizadas" :key="item.id" class="table-linha">
          <td class="rf_header_table">{{ item.id ?? '-' }}</td>
          <td class="rf_header_table">{{ item.clientes?.nome ?? '-' }}</td>
          <td class="rf_header_table">{{ formattedDate(item.updatedAt) ?? '-' }}</td>
          <td class="rf_header_table">{{ currency(item.proposta_avaliacao_veiculo[0]?.precoAvaliacao) ?? '-' }}</td>
          <td class="rf_header_table">{{ formatInt(item.proposta_avaliacao_veiculo[0]?.kilometragem) ?? '-' }}</td>

          <td class="rf_header_table">{{ item.proposta_avaliacao_veiculo[0]?.veiculo_usado_avaliacao.placa ?? '-' }}</td>
          <td class="rf_header_table">{{ item.proposta_avaliacao_veiculo[0]?.veiculo_usado_avaliacao.modelo ?? '-' }}</td>
          <td class="rf_header_table">{{ item.proposta_avaliacao_veiculo[0]?.veiculo_usado_avaliacao.marca ?? '-' }}</td>
          <td class="rf_header_table">{{ item.proposta_avaliacao_veiculo[0]?.veiculo_usado_avaliacao.cor ?? '-' }}</td>
          <td class="rf_header_table">{{ item.proposta_avaliacao_veiculo[0]?.veiculo_usado_avaliacao.anoModelo ?? '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <RodapeVue />

</template>
<script>

import SidebarVue from "../../components/menu/Sidebar.vue";
import axios from "axios";
import TokenService from "../../services/token.service";
import jwt_decode from 'jwt-decode';
import XLSX from 'xlsx/dist/xlsx.full.min';
import RodapeVue from "../../components/menu/Rodape.vue";
import NavgatorDk from "../../components/menu/NavgatorDk.vue";

export default {
  components: {
    SidebarVue,
    NavgatorDk,
    RodapeVue
  },
  data() {
    return {
      lucro_operacional: "",
      lucro_gerencial: "",
      lucro_financiamento: "",
      lucro_final: "",

      total_passagem_zero: "",
      total_passagem_zero_retorno: "",
      total_passagem_zero_novas: "",
      total_em_atendimento_zero: "",
      total_em_atendimento_zero_porcentagem: "",
      total_vendas_perdidas_zero: "",
      total_vendas_perdidas_zero_porcentagem: "",
      total_vendas_finalizadas_zero: "",
      total_vendas_finalizadas_zero_porcentagem: "",
      total_vendas_finalizadas_zero_novos: "",
      total_vendas_finalizadas_zero_novos_porcentagem: "",
      total_vendas_finalizadas_zero_retorno: "",
      total_vendas_finalizadas_zero_retorno_porcentagem: "",

      total_passagem_usado: "",
      total_passagem_usado_retorno: "",
      total_passagem_usado_novas: "",
      total_em_atendimento_usados: "",
      total_em_atendimento_usados_porcentagem: "",
      total_vendas_perdidas_usados: "",
      total_vendas_perdidas_usados_porcentagem: "",
      total_vendas_finalizadas_usado: "",
      total_vendas_finalizadas_usado_porcentagem: "",
      total_vendas_finalizadas_usado_novos: "",
      total_vendas_finalizadas_usado_novos_porcentagem: "",
      total_vendas_finalizadas_usado_retorno: "",
      total_vendas_finalizadas_usado_retorno_porcentagem: "",
      avaliacoes_finalizadas: [],
      total_atendimentos: "",
      total_vendas: "",
      selectedFilter: 'hoje',
      startDate: '',
      endDate: '',

      //Dados do Login
      user_id: "",
      company_id: "",
      lista_empresas: [],
      selectedEmpresas: [],
      selectedEmpresasFiltradas: [],
      selectedEmpresasFiltradasIds: [],
      selectedTipoConversaoIds: [],
      selectedTipoVeiculoIds: [],
      marcarTodos: true,
      marcarTodosVeiculos: true,
      tipo_veiculo: [
        { nome: 'Novos', value: 0 },
        { nome: 'Usados', value: 1 }
      ],
      tipo_conversao: [],
      selectedTipoConversao: 1,
      selectedTipoVeiculo: [],
      atendimentos: [],
      marcarNovo: false,
      marcarUsado: false,
      referencia: "",
      filtroSelecionadoLabel: 'Loja',
      selectedRelatorio: 'finalizadas',
      tipo_relatorio: 'finalizadas',
      vendas_perdidas: [],
      vendas_modelo: [],
      total_vendas_modelo: '',
      total_convesao_perc: 0.00

    }
  },
  mounted() {
    this.getToken();
    this.getEmpresas();
    //this.propostas_mes()

  },
  watch: {
    marcarTodos(newVal) {
      if (newVal) {
        this.selectedEmpresas = this.lista_empresas.map(item => item.id);
      } else {
        this.selectedEmpresas = [];
      }
    },
    selectedEmpresas(newVal) {
      if (this.marcarTodos && newVal.length !== this.lista_empresas.length) {
        this.marcarTodos = false;
      }
    },
    marcarTodosVeiculos(newVal) {
      if (newVal) {
        this.selectedTipoVeiculo = this.tipo_veiculo.map(item => item.value);
      } else {
        this.selectedTipoVeiculo = [];
      }
    },
    selectedTipoVeiculo(newVal) {
      if (this.marcarTodosVeiculos && newVal.length !== this.tipo_veiculo.length) {
        this.marcarTodosVeiculos = false;
      }
    },
    selectedTipoConversao(newVal) {
      if (newVal == 1) {
        this.filtroSelecionadoLabel = 'Loja'
      } else if (newVal == 2) {
        this.filtroSelecionadoLabel = 'Vendedor'
      } else if (newVal == 3) {
        this.filtroSelecionadoLabel = 'Veículo'
      }
    },
    lista_empresas: {
      handler(newList) {

        this.selectedEmpresas = newList.map(item => item.id);
        this.selectedTipoVeiculo = [0, 1]
        // this.propostas_mes();
      },
      immediate: true, // Para executar a função ao criar o componente
    },

  },
  created() {
    this.tipo_conversao = [
      { nome: 'Loja', value: 1 },
      { nome: 'Vendedor', value: 2 },
      { nome: 'Veículo', value: 3 }
    ]
  },
  methods: {
    exportToXLSX() {
      const table = document.getElementById('tabela_conversao');
      const rows = table.querySelectorAll('tr');
      const data = [];

      rows.forEach((row) => {
        const rowData = [];
        const cells = row.querySelectorAll('td, th');
        cells.forEach((cell) => {
          rowData.push(cell.innerText);
        });
        data.push(rowData);
      });

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Dados');
      XLSX.writeFile(wb, 'avaliacoes_finalizadas.xlsx');
    },
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
    getRequestParams(EmpresasSelecionadas, page, pageSize, empresa_id, usuario_id, data_ini, data_fim, tipo_veiculo, tipo_conversao, referencia) {
      let params = {};
      if (EmpresasSelecionadas) {
        params["ids"] = EmpresasSelecionadas;
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
      if (usuario_id) {
        params["usuario_id"] = usuario_id
      }
      if (data_ini) {
        params["data_ini"] = data_ini
      }
      if (data_fim) {
        params["data_fim"] = data_fim
      }
      if (tipo_veiculo) {
        params["tipo_veiculo"] = tipo_veiculo
      }
      if (tipo_conversao) {
        params["tipo_conversao"] = tipo_conversao
      }
      if (referencia) {
        params["referencia"] = referencia
      }
      return params;
    },
    selecionarRelatorios() {
      if (this.selectedRelatorio === "finalizadas") {
        this.tipo_relatorio = this.selectedRelatorio;
      }

    },
    filtarRelatorios() {
      if (this.selectedFilter === "hoje") {
        this.referencia = this.selectedFilter
      } else if (this.selectedFilter === "ontem") {
        this.referencia = this.selectedFilter
      } else if (this.selectedFilter === "mes_atual") {
        this.referencia = this.selectedFilter
      } else if (this.selectedFilter === "mes_anterior") {
        this.referencia = this.selectedFilter
      }
    },

    async propostas_mes() {
      const params = {
        empresa_id: this.company_id,
        user_id: this.user_id,
        referencia: this.selectedFilter,
        empresas: this.selectedEmpresas
      }

      await axios.get(`${process.env.VUE_APP_API_URL}propostas_mes`, {
        params
      })
        .then(response => {
          console.log(response.data)
          const res = response.data

          //Restultado operacional
          this.lucro_operacional = JSON.parse(JSON.stringify(res['total_lucro_operacional_veiculos_usados']));
          this.lucro_gerencial = JSON.parse(JSON.stringify(res['total_lucro_gerencial_veiculos_usados']));
          this.lucro_financiamento = JSON.parse(JSON.stringify(res['total_lucro_financiamento_veiculos_usados']));
          this.lucro_final = JSON.parse(JSON.stringify(res['total_lucro_final_veiculos_usados']));

          this.total_passagem_zero = JSON.parse(JSON.stringify(res['total_passagem_zero']));
          this.total_passagem_zero_retorno = JSON.parse(JSON.stringify(res['total_passagem_zero_retorno']));
          this.total_passagem_zero_novas = JSON.parse(JSON.stringify(res['total_passagem_zero_novas']));
          this.total_em_atendimento_zero = JSON.parse(JSON.stringify(res['total_em_atendimento_zero']));
          this.total_em_atendimento_zero_porcentagem = JSON.parse(JSON.stringify(res['total_em_atendimento_zero_porcentagem']));
          this.total_vendas_perdidas_zero = JSON.parse(JSON.stringify(res['total_vendas_perdidas_zero']));
          this.total_vendas_perdidas_zero_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_perdidas_zero_porcentagem']));
          this.total_vendas_finalizadas_zero = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero']));
          this.total_vendas_finalizadas_zero_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_porcentagem']));

          this.total_vendas_finalizadas_zero_novos = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_novos']));
          this.total_vendas_finalizadas_zero_novos_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_novos_porcentagem']));
          this.total_vendas_finalizadas_zero_retorno = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_retorno']));
          this.total_vendas_finalizadas_zero_retorno_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_retorno_porcentagem']));

          this.total_passagem_usado = JSON.parse(JSON.stringify(res['total_passagem_usado']));
          this.total_passagem_usado_retorno = JSON.parse(JSON.stringify(res['total_passagem_usado_retorno']));
          this.total_passagem_usado_novas = JSON.parse(JSON.stringify(res['total_passagem_usado_novas']));
          this.total_em_atendimento_usados = JSON.parse(JSON.stringify(res['total_em_atendimento_usados']));
          this.total_em_atendimento_usados_porcentagem = JSON.parse(JSON.stringify(res['total_em_atendimento_usados_porcentagem']));
          this.total_vendas_perdidas_usados = JSON.parse(JSON.stringify(res['total_vendas_perdidas_usados']));
          this.total_vendas_perdidas_usados_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_perdidas_usados_porcentagem']));
          this.total_vendas_finalizadas_usado = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado']));
          this.total_vendas_finalizadas_usado_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_porcentagem']));
          this.total_vendas_finalizadas_usado_novos = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_novos']));
          this.total_vendas_finalizadas_usado_novos_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_novos_porcentagem']));
          this.total_vendas_finalizadas_usado_retorno = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_retorno']));
          this.total_vendas_finalizadas_usado_retorno_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_retorno_porcentagem']));

        })
        .catch(error => {
          console.log(error)
        })
    },
    limpar_tabela() {
      console.log("Limpar Tabela")
      this.avaliacoes_finalizadas = [];
      this.total_atendimentosNovos = "";
      this.total_vendasNovos = "";
      this.total_conversao_percNovos = "";
      this.total_atendimentosUsados = "";
      this.total_vendasUsados = "";
      this.total_conversao_percUsados = "";
      this.total_atendimentos = "";
      this.total_vendas = "";
      this.total_conversao_perc = "";
    },
    async relatorio_avaliacoes_finalizadas() {
      console.log("Avaliações finalizadas")

      const params = this.getRequestParams(
        this.selectedEmpresas,
        this.page,
        this.pageSize,
        this.company_id,
        this.user_id,
        this.startDate,
        this.endDate,
        this.selectedTipoVeiculo,
        this.selectedTipoConversao,
        this.selectedFilter,
      );

      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}relatorio_avaliacoes_finalizadas`, {
          params
        });
        console.log("Relatorio Desk", response.data.rows)

        this.avaliacoes_finalizadas = response.data.rows

        console.log(this.avaliacoes_finalizadas)

      } catch (error) {
        console.log(error)
        this.abrir_modal = true;
        this.msg = error
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
    async getEmpresas() {
      console.log("Buscando Empresas")
      const user_id = this.user_id
      await axios.get(`${process.env.VUE_APP_API_URL}user_empresas`, {
        params: { id: user_id }
      })
        .then(response => {
          this.lista_empresas = response.data;
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
    },

    currency(num) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(num);
    },
    formatInt(num) {
      return String(num)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') || '-';
    },
    formattedDate(item) {
      const date = new Date(item);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  }
};
</script>
