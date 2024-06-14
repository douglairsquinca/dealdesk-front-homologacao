<template>
    <SidebarVue ref="sidebar" />
    <NavgatorFI
      ref="navgator"
      :barraTitulo="' F&I - Reabrir Atendimento'"
      :titulo="'vendas'"
      :id ="id_rota"
    />
    <div class="card card-filtro card-vendas">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"
            ><span class="texto_filtro"
              ><strong>Dados do Atendimento</strong></span
            ></i
          >
        </div>
      </div>
      <div class="g-1 p-1">
      <div class="col row">
        <div class="col-2 col-md-3 mt-2">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="searchProposta"
            />
            <label class="rf_texto">Nº Atendimento</label>
          </div>
        </div>
        <div class="col-2 col-md-3 mt-2">
          <div class="input-group-append">
            <button
              class="btn btn-lg btn-desk-filtro"
              type="button"
               @click="(status_proposta = 'Ordem'), filtrarPropostas()"
  
            >
              <span class="rf_texto_btn">Pesquisar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
      <div class="row g-2 p-2">   
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              disabled
              class="form-control rf_bg_form rf_texto"
              v-model="id_proposta"
            />
            <label class="rf_texto">Nº Atendimento </label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              disabled
              class="form-control rf_bg_form rf_texto"
              v-model="vendedor"
            />
            <label class="rf_texto">Vendedor</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              disabled
              class="form-control rf_bg_form rf_texto"
              v-model="cliente"
            />
            <label class="rf_texto">Cliente</label>
          </div>
          
        </div>
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              disabled
              class="form-control rf_bg_form rf_texto"
              v-model="data_atendimento"
            />
            <label class="rf_texto">Data Atendimento</label>
          </div>
          
        </div>
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              disabled
              class="form-control rf_bg_form rf_texto"
              v-model="status"
            />
            <label class="rf_texto">Status</label>
          </div>
          
        </div>
        <div class="col-2 ">
          <div class="input-group-append">
            <button
              class="btn btn-lg btn-desk-filtro"
              type="button"
              @click="reabrir()"
            >
              <span class="rf_texto_btn">Reabrir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Mensagens do Sistema-->
    <div v-if="abrir_modal">
      <Message :msg="msg" v-show="msg" />
    </div>
    <RodapeVue />
  </template>
  
  <script>
  import SidebarVue from "../../components/menu/Sidebar.vue";
  import NavgatorFI from "../../components/menu/NavgatorFIDetalhes.vue";
  import userService from "../../services/user.service";
  import RodapeVue from "../../components/menu/Rodape.vue";
  import TokenService from "../../services/token.service";
  import jwt_decode from "jwt-decode";
  import axios from "axios";
  //import Pagination from "../../components/Pagination.vue";
  import Message from "../../components/modal/Message.vue";
  import dayjs from "dayjs";
  import "dayjs/locale/pt-br";
  import "dayjs/plugin/utc";
  import "dayjs/plugin/timezone";

  
  export default {
    name: "Vendas F&I",
    components: {
      SidebarVue,
      NavgatorFI,
      RodapeVue,
      Message,
     // Pagination,
    },
    data() {
      return {
      searchProposta:"",
      vendedor: "",
      cliente: "",
      data_atendimento: "",
      status:"",
       //Dados da Mensagem
       abrir_modal: false,
      msg: "", 

      };
    },
    mounted() {
      this.getToken();

    },
    methods: {
      getToken() {
        const accessToken = TokenService.getLocalAccessToken();
        TokenService.getLocalRefreshToken();
        const user_log = TokenService.getUser();
        const decodedToken = jwt_decode(accessToken);
        this.company_id = decodedToken.company;
        this.user_log = user_log.id;
        this.id_rota = this.$route.params.id;
      },
      async update_proposta(item) {
      console.log(item);
      try {
        const id = this.searchProposta;
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}update_proposta/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
            }),
          }
        );
        if (response.status == 200) {
          this.abrir_modal = true;
          this.msg = "Proposta reaberta com sucesso!";
          setTimeout(() => (this.abrir_modal = false), 4000);
          window.location.reload();
        } else {
          this.abrir_modal = true;
          this.msg = "Proposta não encontrada";
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      } catch (error) {
        console.log(error);
        this.abrir_modal = true;
        this.msg = error;
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
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

    validando_tempo() {
      let startTime = null;
      let tempo_atendimento;
      let tempo_espera;
      let avaliacao;

      const updateTimes = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsedSeconds = Math.floor((timestamp - startTime) / 1000);

        const array_h_2 = this.propostas_at.map((proposta) => {
          const horas_chegada = proposta["horas_chegada"] || "00";
          const minutos_chegada = proposta["minutos_chegada"] || "00";
          const horas_atendimento = proposta["horas_atendimento"] || "00";
          const minutos_atendimento = proposta["minutos_atendimento"] || "00";

          if (
            proposta["status"] === "Atendimento" ||
            proposta["status"] === "Atendimento Excedido"
          ) {
            const totalSegundosAtendimento =
              elapsedSeconds +
              parseInt(horas_atendimento) * 3600 +
              parseInt(minutos_atendimento) * 60;
            tempo_atendimento = new Date(totalSegundosAtendimento * 1000)
              .toISOString()
              .substr(11, 8);
            tempo_espera = "00:00";
          }

          if (proposta["status"] === "Aguardando Atendimento") {
            const totalSegundosEspera =
              elapsedSeconds +
              parseInt(horas_chegada) * 3600 +
              parseInt(minutos_chegada) * 60;
            tempo_espera = new Date(totalSegundosEspera * 1000)
              .toISOString()
              .substr(11, 8);
            tempo_atendimento = "00:00";
          }

          if (
            proposta["status"] === "Venda Finalizada" ||
            proposta["status"] === "Venda Perdida"
          ) {
            tempo_espera = "00:00";
            tempo_atendimento = "00:00";
          }

          if (proposta["avaliacao"] == 0) {
            avaliacao = "Não";
          }

          if (proposta["avaliacao"] == 1) {
            avaliacao = "Sim";
          }

          return {
            ...proposta,
            tempo_atendimento,
            tempo_espera,
            avaliacao,
          };
        });

        this.propostas_at = array_h_2;
        requestAnimationFrame(updateTimes);
      };

      requestAnimationFrame(updateTimes);
    },

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
    async getQuantidadePropostaMenu(propostaIDs) {
      try {
        const quantidadePromises = propostaIDs.map(async (id) => {
          const response = await userService.getQuantidadePropostaMenuByID(id);

          return {
            id: response.data[0].proposta_id,
            quantidade: response.data[0].count,
          };
        });

        return await Promise.all(quantidadePromises);
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
        return [];
      }
    },
    formatarTempo(tempoDeAtendimento) {
      if (!tempoDeAtendimento) {
        this.tempoFormatado = "00:00:00"; // Mostrar 00:00:00 quando for nulo
        return;
      }

      const duracaoMilissegundos = dayjs(this.tempoDeAtendimento).valueOf();
      const duracaoSegundos = Math.floor(duracaoMilissegundos / 1000);

      const horas = Math.floor(duracaoSegundos / 3600);
      const minutos = Math.floor((duracaoSegundos % 3600) / 60);
      const segundos = Math.floor(duracaoSegundos % 60);

      this.tempoFormatado = `${horas.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    },
    async retrievePropostas() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}reabrir_proposta_fei`,
          {
            params: {
              id: this.searchProposta,      
            },
          }
        );
      const vendedor = response.data.menu_pos_venda_detalhada[0].vendedor_fei.username;
      const cliente = response.data.pos_venda_proposta.clientes.nome;
      const data_atendimento = response.data.menu_pos_venda_detalhada[0].data;
      const status = response.data.status;
      this.vendedor = vendedor;
      this.cliente = cliente;
      this.data_atendimento = data_atendimento;
      this.status = status;
      this.id_proposta = response.data.atendimento_id;
       console.log("Informações da proposta", response.data);
        
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async reabrir(){
      try {
    const response = await fetch(
      `${process.env.VUE_APP_API_URL}atualizar_reabertura/${this.id_proposta}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id_proposta,     
     
        }),
      }
    );

    console.log("resposta da atualização", response.statusText);

    if (response.ok) {
      this.abrir_modal = true;
      this.msg = "Status do atendimento foi alterado para Em Atendimento!";
      setTimeout(() => {
        this.abrir_modal = false;
        this.$router.push('/f&i/vendas_f&i'); // Redireciona após fechar o modal
      }, 4000);
    }
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    // Trate o erro de acordo, por exemplo, mostrando uma mensagem de erro ao usuário
  }
  
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
  
  <style></style>
  