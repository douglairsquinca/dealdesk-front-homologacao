<template>
  <div>
    <SidebarVue ref="sidebar" />


    <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
      <div class="container-fluid">
        <div><i class="bi  bi-file-earmark-text fs-5"> Veículos Vendidos Aguardando Faturamento </i></div>
      </div>
    </nav>

    <!--Tabelas-->
    <div class="card rf_bg_form g-2 p-2 rf_margin">


      <table class="table border-dark rf_texto">
        <thead>
          <tr>
            <th scope="col" class="rf_header_table">Nº Proposta</th>
            <th scope="col" class="rf_header_table">Loja</th>

            <th scope="col" class="rf_header_table">Modelo</th>
            <th scope="col" class="rf_header_table">Chassis</th>
            <th scope="col" class="rf_header_table">Placa</th>
            <th scope="col" class="rf_header_table">Número</th>
            <th scope="col" class="rf_header_table">Cod. Empresa</th>
            <th scope="col" class="rf_header_table">Data Atendimento</th>
            <th scope="col" class="rf_header_table">Status</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="item in veiculos" :key="item.id">
            <td class="rf_header_table">{{ item.id }}</td>
            <td class="rf_header_table">{{ item.loja }}</td>
            <td class="rf_header_table">{{ item.modelo }}</td>
            <td class="rf_header_table">{{ item.chassis }}</td>
            <td class="rf_header_table">{{ item.placa }}</td>
            <td class="rf_header_table">{{ item.numero }}</td>
            <td class="rf_header_table">{{ item.id_empresa }}</td>
            <td class="rf_header_table">{{ item.data_atendimento }}</td>
            <td class="rf_header_table">{{ item.status }}</td>

            <td>
              <button type="button" class="btn btn-secondary btn-sm rf_btn" data-bs-toggle="modal" data-bs-target="#exampleModal"
               @click="edit_proposta(item)">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-lock"
                  viewBox="0 0 16 16">
                  <path
                    d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224zM6.105 8.125A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3c0-.042.02-.107.105-.175z" />
                  <path
                    d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                </svg>

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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content rf_bg_form rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Alterar veículo ou status da proposta</h1>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <div class="col-4">
                <div class="mt-2">
                  <span class="rf_texto">Escolha o tipo de Alteração</span>
                  <div class="input-group mt-2">
                    <select class="form-select" v-model="selected_alteracao" @change="selecionar_alteracao()">                     
                      <option value="venda_perdida">Venda Perdida</option>
                      <option value="alterar_veiculo">Alterar Veículo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-2 p-2" v-if="selected_alteracao === 'venda_perdida'">
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_id" disabled />
                  <label class="rf_texto">Nº Proposta</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <textarea v-model="edit_observacao" class="form-control rf_bg_form rf_texto"></textarea>
                  <label class="rf_texto">observação</label>
                </div>
              </div>
            </div>

            <div class="row g-2 p-2" v-if="selected_alteracao === 'alterar_veiculo'">
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_id" disabled />
                  <label class="rf_texto">Nº Proposta</label>
                </div>
              </div>
              
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_numero_veiculo" required
                    autocomplete="off" />
                  <label class="rf_texto">Número</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_id_empresa" required
                    autocomplete="off" />
                  <label class="rf_texto">Número Empresa</label>
                </div>
              </div>   
              <div class="col-2 mt-3">
                <div class="form-floating">
                  <button type="button" @click="buscar_veiculo()"  class="btn btn-secondary">
                    Buscar Veículo
                  </button>
                </div>
              </div>

            </div>
            <div class="row g-2 p-2" v-if="selected_alteracao === 'alterar_veiculo'">
              <div class="col-3">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_chassis" disabled/>
                  <label class="rf_texto">Chassis</label>
                </div>
              </div>
              <div class="col-3">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_modelo_veiculo" disabled />
                  <label class="rf_texto">Modelo Veículo</label>
                </div>
              </div>
              <div class="col-3">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_cor" disabled />
                  <label class="rf_texto">Cor</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_pps_valor" disabled
                    @input="edit_pps_valor = formatarValor(edit_pps_valor)" />
                  <label class="rf_texto">Preço de Compra</label>
                </div>
              </div>              
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_valor_veiculo" disabled
                    @input="edit_valor_veiculo = formatarValor(edit_valor_veiculo)" />
                  <label class="rf_texto">Preço de Venda</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_dias_em_etoque" disabled
                    autocomplete="off" />
                  <label class="rf_texto">Dias em estoque</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_marca" disabled
                    autocomplete="off" />
                  <label class="rf_texto">Marca</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_ano_modelo" disabled
                    autocomplete="off" />
                  <label class="rf_texto">Ano Modelo</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_ano_fabricacao" disabled
                    autocomplete="off" />
                  <label class="rf_texto">Ano Fabricação</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_kilometragem" disabled
                    autocomplete="off" />
                  <label class="rf_texto">Quilometragem</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_placa" disabled
                    autocomplete="off" />
                  <label class="rf_texto">Placa</label>
                </div>
              </div>              
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_combustivel" disabled
                    autocomplete="off" />
                  <label class="rf_texto">Combustível</label>
                </div>
              </div>
              
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_custo_contabil" disabled
                    autocomplete="off" />
                  <label class="rf_texto">Custo Contábil</label>
                </div>
              </div>              
            </div>
            <div class="row g-2 p-2" v-if="selected_alteracao === 'alterar_veiculo'">
              <div class="col">
                <div class="form-floating">
                  <textarea v-model="edit_observacao" required class="form-control rf_bg_form rf_texto"></textarea>
                  <label class="rf_texto">observação</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Fechar
            </button>
            <button type="button" @click="update_veiculo()" :disabled="edit_observacao.length <= 20" data-bs-dismiss="modal"  class="btn btn-secondary">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>

    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3"></ul>
      <p class="text-center rf_texto">© 2023 Rfmobi Solution</p>
    </footer>
  </div>
</template>
<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import userService from "../../services/user.service";
//import Pagination from "../../components/Pagination.vue";
import { VueMaskDirective } from 'vue-the-mask';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';
import axios from "axios";

import TokenService from "../../services/token.service";
import jwt_decode from 'jwt-decode';
import Message from "../../components/modal/Message.vue";


export default {
  name: "Usuários",

  components: {
    SidebarVue,
    //Pagination,
    Message,


  },
  directives: {
    mask: VueMaskDirective
  },
  data() {
    return {
    verificar_veiculo:[],
    abrir_modal: false ,
    veiculos:"",
    selected_alteracao: 'venda_perdida',
    msg:"",  

    edit_id:"",
    edit_venda_futura :"",
    edit_id_empresa :"",
    edit_chassis :"",
    edit_modelo_veiculo :"",
    edit_pps_valor :"",
    edit_valor_veiculo :"",
    edit_dias_em_etoque :"",
    edit_marca :"",
    edit_ano_modelo :"",
    edit_ano_fabricacao :"",
    edit_kilometragem :"",
    edit_placa :"",
    edit_combustivel :"",
    edit_numero_veiculo :"",
    edit_custo_contabil :"",
    edit_observacao: "",
    
    obs_check: true

      
      
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
    selecionar_alteracao(){
      if(this.selected_alteracao === "venda_perdida"){
        this.tipo_alteracao = this.selected_alteracao;
        this.form_1 = true;
        this.form_2 = false;
      } else if(this.selected_alteracao === "alterar_veiculo"){
        this.tipo_alteracao = this.selected_alteracao;
        this.form_1 = false;
        this.form_2 = true;
      }
    },  

    async edit_proposta(item) {
      console.log(item)
      this.edit_id = item.id;
      this.edit_id_veiculo_proposta = item.id_veiculo_proposta;
      this.edit_venda_futura = item.venda_futura;
      this.edit_id_empresa = item.id_empresa;
      this.edit_chassis = item.chassis;
      this.edit_modelo_veiculo = item.modelo;
      this.edit_pps_valor = this.currency(item.pps_valor);
      this.edit_valor_veiculo = this.currency(item.valor_veiculo);
      this.edit_dias_em_etoque = item.dias_em_estoque;
      this.edit_marca = item.marca;
      this.edit_ano_modelo = item.ano_modelo;
      this.edit_ano_fabricacao = item.ano_fabricacao;
      this.edit_kilometragem = item.kilometragem;
      this.edit_placa = item.placa;
      this.edit_combustivel = item.combustivel;
      this.edit_numero_veiculo = item.numero;
      this.edit_custo_contabil = this.currency(item.custo_contabil);
      this.edit_cor = item.cor;
      


      // try {
      //     const id = this.searchProposta;
      //     const response = await fetch(
      //         `${process.env.VUE_APP_API_URL}update_proposta/${id}`,
      //         {
      //             method: "PUT",
      //             headers: {
      //                 "Content-Type": "application/json",
      //             },
      //             body: JSON.stringify({
      //                 id: id
      //             }),
      //         }
      //     );
      //     if (response.status == 200) {
      //         this.abrir_modal = true;
      //         this.msg = "Proposta reaberta com sucesso!";
      //         setTimeout(() => (this.abrir_modal = false), 4000);
      //         window.location.reload();
      //     } else {
      //         this.abrir_modal = true;
      //         this.msg = "Proposta não encontrada";
      //         setTimeout(() => (this.abrir_modal = false), 4000);
      //     }

      // } catch (error) {
      //     console.log(error)
      //     this.abrir_modal = true;
      //     this.msg = error;
      //     setTimeout(() => (this.abrir_modal = false), 4000);

      // }
    },

    async buscar_veiculo(){
      console.log("Buscar dadoa do veículo")
      const params = {        
        numero : this.edit_numero_veiculo,
        empresa : this.edit_id_empresa      
      }
      const dados_veiculo = await axios.get(`${process.env.VUE_APP_API_URL}buscar_veiculo`,{
        params
      });
      console.log(dados_veiculo.data);
      if (dados_veiculo.data.length > 0) {
        this.edit_chassis = dados_veiculo.data[0].chassi,
        this.edit_modelo_veiculo = dados_veiculo.data[0].modelo,
        this.edit_pps_valor = this.currency(dados_veiculo.data[0].valortotalentrada),
        this.edit_valor_veiculo = this.currency(dados_veiculo.data[0].valortotalvenda),
        this.edit_dias_em_etoque = dados_veiculo.data[0].diasestoque,
        this.edit_marca = dados_veiculo.data[0].marca,
        this.edit_ano_modelo = dados_veiculo.data[0].anomodelo,
        this.edit_ano_fabricacao = dados_veiculo.data[0].anofabricacao,
        this.edit_kilometragem = dados_veiculo.data[0].quilometragem
        this.edit_placa = dados_veiculo.data[0].placa,
        this.edit_combustivel = dados_veiculo.data[0].combustivel,
        this.edit_custo_contabil = this.currency(dados_veiculo.data[0].valorcustocontabil)
        this.edit_categoria = dados_veiculo.data[0].estadoveiculo  

      }else{
        this.abrir_modal = true;
            this.msg = "Veículo não encontrado!"
            setTimeout(() => (this.abrir_modal = false), 4000);
      }



      
    },

    async update_veiculo(){
      console.log("Alterando dados dos veículos")
      const id_veiculo_proposta = this.edit_id_veiculo_proposta;
      const id_proposta = this.edit_id;

      if(this.selected_alteracao === 'venda_perdida'){
        console.log("Alterar status para venda perdida")
        await fetch(`${process.env.VUE_APP_API_URL}trocar_status_proposta/${id_proposta}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id_proposta,        
          observacao: this.edit_observacao,     
          
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
        });
        
      } else{

        await fetch(`${process.env.VUE_APP_API_URL}alterar_veiculo/${id_veiculo_proposta}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id_veiculo_proposta,
          numero_veiculo : this.edit_numero_veiculo,
          empresa : this.edit_id_empresa,
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
          venda_futura: this.edit_venda_futura
          
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
        });
      }     

    
    },

    formatarValor(valor) {
      this.entrada_1_original = this.entrada_1;
      this.entrada_2_original = this.entrada_2;
      this.entrada_3_original = this.entrada_3;

      if (!valor) return '';
      valor = valor.toString().replace(/\D/g, '');
      valor = (valor / 100).toFixed(2).replace('.', ',');
      valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return valor;
    },

    filtrarPropostas() {
      if (this.selectedFilter === 'Venda Finalizada') {
        // console.log("Filtar propostas em Finalizadas! ------------------------------------------------------------------------------------------------------------------ 0006")
        this.status_proposta = this.selectedFilter
        this.retrievePropostas();
      } else if (this.selectedFilter === 'Venda Perdida') {
        this.status_proposta = this.selectedFilter
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas perdiadas! ------------------------------------------------------------------------------------------------------------------ 0007")
      }
      if (this.searchProposta) {
        this.status_proposta === 'Ordem'
        this.retrievePropostas();
      }
    },
    filterByPeriod() {
      this.data_ini = this.startDate
      this.data_fim = this.endDate
      this.status_proposta = "Pesquisa Periodo"
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

        const array_h_2 = this.propostas_at.map(proposta => {
          const horas_chegada = proposta["horas_chegada"] || "00";
          const minutos_chegada = proposta["minutos_chegada"] || "00";
          const horas_atendimento = proposta["horas_atendimento"] || "00";
          const minutos_atendimento = proposta["minutos_atendimento"] || "00";

          if (
            proposta["status"] === "Atendimento" ||
            proposta["status"] === "Atendimento Excedido"
          ) {
            const totalSegundosAtendimento = elapsedSeconds + parseInt(horas_atendimento) * 3600 + parseInt(minutos_atendimento) * 60;
            tempo_atendimento = new Date(totalSegundosAtendimento * 1000).toISOString().substr(11, 8);
            tempo_espera = "00:00";
          }

          if (proposta["status"] === "Aguardando Atendimento") {
            const totalSegundosEspera = elapsedSeconds + parseInt(horas_chegada) * 3600 + parseInt(minutos_chegada) * 60;
            tempo_espera = new Date(totalSegundosEspera * 1000).toISOString().substr(11, 8);
            tempo_atendimento = "00:00";
          }

          if (proposta["status"] === "Venda Finalizada" || proposta["status"] === "Venda Perdida") {
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

    getRequestParamsProposta(searchProposta, page, pageSize, empresa_id, status_proposta, data_ini, data_fim) {
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
        params["status_proposta"] = status_proposta
      }
      if (data_ini) {
        params["data_ini"] = data_ini
      }
      if (data_fim) {
        params["data_fim"] = data_fim
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

          return { id: response.data[0].proposta_id, quantidade: response.data[0].count };

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
        this.tempoFormatado = '00:00:00'; // Mostrar 00:00:00 quando for nulo
        return;
      }

      const duracaoMilissegundos = dayjs(this.tempoDeAtendimento).valueOf();
      const duracaoSegundos = Math.floor(duracaoMilissegundos / 1000);

      const horas = Math.floor(duracaoSegundos / 3600);
      const minutos = Math.floor((duracaoSegundos % 3600) / 60);
      const segundos = Math.floor(duracaoSegundos % 60);

      this.tempoFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    },
    async retrievePropostas() {

      try {
        const verificar_veiculo = await axios.get(`${process.env.VUE_APP_API_URL}veiculo_vendido_estoque`);
        let array_verificar_veiculo_2 = [];
        console.log(verificar_veiculo.data.veiculoEstoque)
        for await (const dados of verificar_veiculo.data.veiculoEstoque) {
          const createdAtDate = new Date(dados["horario_termino_atendimento"]);
          const formattedCreatedAt = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;

          console.log(dados)

          const array_verificar_veiculo_1 = {
            id: dados["id"],
            id_veiculo_proposta: dados["proposta_veiculo"]["id"],
            loja: dados["empresa_proposta"]["nome"],
            venda_futura: dados["proposta_veiculo"]["venda_futura"],
            id_empresa: dados["proposta_veiculo"]["empresa"],
            chassis: dados["proposta_veiculo"]["chassis"],
            modelo: dados["proposta_veiculo"]["modelo_veiculo"],
            pps_valor: dados["proposta_veiculo"]["pps_valor"],
            valor_veiculo: dados["proposta_veiculo"]["valor_veiculo"],
            dias_em_estoque: dados["proposta_veiculo"]["dias_em_estoque"],
            marca: dados["proposta_veiculo"]["marca"],
            ano_modelo: dados["proposta_veiculo"]["ano_modelo"],
            ano_fabricacao: dados["proposta_veiculo"]["ano_fabricacao"],
            kilometragem: dados["proposta_veiculo"]["kilometragem"],
            placa: dados["proposta_veiculo"]["placa"],
            combustivel: dados["proposta_veiculo"]["combustivel"],
            numero: dados["proposta_veiculo"]["numero_veiculo"],
            custo_contabil: dados["proposta_veiculo"]["valorCustoContabil"],
            data_atendimento: formattedCreatedAt,
            status: dados["status_proposta"],
            cor: dados["proposta_veiculo"]["cor"]

          };
          array_verificar_veiculo_2.push(array_verificar_veiculo_1)
        }

        this.veiculos = array_verificar_veiculo_2
        console.log(this.veiculos)

      } catch (error) {
        console.log(error)
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
      
<style>
@import "../../assets/styles/rfCss.css";
</style>