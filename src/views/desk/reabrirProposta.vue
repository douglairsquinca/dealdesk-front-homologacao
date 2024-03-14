<template>

        <SidebarVue ref="sidebar" />
  <NavgatorDk ref="navgator" :barraTitulo="' Lista de Propostas'" :titulo="'lista'" />




        <!--Tabelas-->
        <div class="card card-filtro g-2 p-2 rf_margin">

            <div class="g-1 p-1">
                <div class="col row">
                    <div class="col-2 mt-2">
                        <div class="form-floating">
                            <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchProposta" />
                            <label class="rf_texto">Nº Ordem</label>
                        </div>
                    </div>
                    <div class="col-2 mt-2">
                        <div class="input-group-append">
                            <button class="btn btn-lg btn-desk-filtro" type="button"
                                @click="status_proposta = 'Ordem', filtrarPropostas()">
                                <span class="rf_texto_btn">Pesquisar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <table class="table rf_texto_desk">
                <thead>
                    <tr>
                        <th scope="col" class="rf_header_table">Nº Ordem</th>
                        <th scope="col" class="rf_header_table">Vendedor</th>
                        <th scope="col" class="rf_header_table">Cliente</th>
                        <th scope="col" class="rf_header_table">Modelo</th>
                        <th scope="col" class="rf_header_table">Total Atendimento</th>
                        <th scope="col" class="rf_header_table">Data Atendimento</th>
                        <th scope="col" class="rf_header_table">Status</th>
                        <th scope="col" class="rf_header_table">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in propostas_at" :key="item.id" :class="item.status === 'Venda Finalizada'
                        ? css3
                        : item.status === 'Venda Perdida'
                            ? css4
                            : ''
                        ">
                        <td class="rf_header_table">{{ item.id }}</td>
                        <td class="rf_header_table">{{ item.vendedor }}</td>
                        <td class="rf_header_table">{{ item.cliente }}</td>
                        <td class="rf_header_table">{{ item.modelo }}</td>
                        <td class="rf_header_table">{{ item.total_atendimento }}</td>
                        <td class="rf_header_table">{{ item.data_atendimento }}</td>
                        <td class="rf_header_table">{{ item.status }}</td>

                        <td>
                            <button type="button" class="btn btn-secondary btn-sm rf_btn" @click="update_proposta(item.id)">

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-file-lock" viewBox="0 0 16 16">
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

       <RodapeVue/>

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


import TokenService from "../../services/token.service";
import jwt_decode from 'jwt-decode';
import Message from "../../components/modal/Message.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import NavgatorDk from "../../components/menu/NavgatorDk.vue";

export default {
    name: "Usuários",

    components: {
        SidebarVue,
        NavgatorDk,
        //Pagination,
        Message,
        RodapeVue


    },
    directives: {
        mask: VueMaskDirective
    },
    data() {
        return {
            selectedFilter: '',
            //searchTerm: '',
            startDate: '',
            endDate: '',
            adicional: "",

            message: "",
            dialog: "",
            abrir_modal: false,
            info_adicionais: "",

            linhaSelecionada: null,
            linhaSelecionada2: null,
            linhaSelecionada3: null,
            linhaSelecionada4: null,
            css: null,
            css1: null,
            css2: null,
            css3: null,
            css4: null,
            btn_avaliacao: true,

            //Tabela Proposta
            id_proposta: "", // Armazena o id da Proposta
            propostas_at: [],
            itens_veiculo: [],
            estoque_veiculo: [],
            acessorios: [],
            itens_acessorios: [],
            marcas_estoque: [],
            modelos_estoque: [],
            cores_estoque: [],
            familia: [],
            desconto: "",
            acrescimo: "",
            searchTitle: "",
            searchChassi: "",
            searchPlaca: "",
            searchValIni: "",
            searchValFin: "",
            searchMarca: "",
            searchAnoMod: "",
            searchAnoFab: "",
            searchCor: "",
            tipoVeiculo: "",
            tipo_veiculo_escolhido: "",
            familia_veiculo_escolhido: "",
            modelo_veiculo_escolhido: "",

            searchCodigo: "",
            searchDescricao: "",
            inserir_veiculo: true,

            item_p_avaliacao: "",
            valor_p_avaliacao: "",
            items_avaliacao: [{ value: "Débito" }, { value: "Crédito" }],
            valid: false,

            searchProposta: "",

            tipo: "",

            //Campo do Financiamento
            itens_financiamento: [
                { value: 12 },
                { value: 24 },
                { value: 36 },
                { value: 48 },
                { value: 60 },
            ],
            plano_financiamento: [{ value: "SIM" }, { value: "NAO" }],
            tipo_financiamento: [{ value: "NOVO" }, { value: "USADO" }],
            tabela_financiamento: [{ value: "SIM" }, { value: "NAO" }],
            spf_financiamento: [{ value: "SIM" }, { value: "NAO" }],
            param_financiamento: [
                { value: "% ENTRADA MIN" },
                { value: "R$ ENTRADA MIN" },
                { value: "RENTABILIDADE" },
                { value: "PMT" },
                { value: "COEF" },
            ],
            razao_financiamento: "",
            plano: "",
            tabela_1: [],
            tabela_2: [],
            tabela_3: [],

            orderBy: 0,
            orderBy_2: 0,
            orderBy_3: 0,
            sortBy: "",
            sortBy_2: "",
            sortBy_3: "",
            sortDesc: 0,
            sortDesc_2: 0,
            sortDesc_3: 0,

            //Paginação Entrada 1
            page_1: 1,
            totalPages_1: 0,
            totalItems_1: 0,
            pageSizes_1: [{ value: 10 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }],
            pageSize_1: 5,
            //////////////////////
            //Paginação Entrada 2
            page_2: 1,
            totalPages_2: 0,
            totalItems_2: 0,
            pageSizes_2: [{ value: 10 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }],
            pageSize_2: 5,
            //////////////////////

            //Paginação Entrada 3
            page_3: 1,
            totalPages_3: 0,
            totalItems_3: 0,
            pageSizes_3: [{ value: 10 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }],
            pageSize_3: 5,
            //////////////////////

            //Paginação Tabela de Proposta
            page_4: 1,
            totalPages_4: 0,
            totalItems_4: 0,
            pageSizes_4: [{ value: 10 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }],
            pageSize_4: 100,
            //////////////////////

            page: 1,
            totalPages: 0,
            totalItems: 0,
            pageSizes: [{ value: 10 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }],
            pageSize: 5,

            //Campos ref ao cliente
            cliente_id: "",
            cpfCnpj: "",
            cliente: "",
            clientes: "",
            email: "",
            tel: "",
            obs: "",
            model: null,
            model2: null,
            model3: null,
            model4: null,
            descriptionLimit: 60,
            descriptionLimit2: 60,
            descriptionLimit3: 60,
            descriptionLimit4: 60,
            entries: [],
            entries2: [],
            entries3: [],
            entries4: [],
            modelo: [],
            marca: [],
            isLoading: false,
            search: null,
            isLoading4: false,
            search4: null,
            totalItems4: null,
            isLoading3: false,
            search3: null,
            totalItems3: null,
            isLoading2: false,
            search2: null,
            totalItems2: null,

            //Campos Veículo para troca
            marca_avaliacao: "",
            marca_avaliacao_desc: "",
            modelo_avaliacao: "",
            familia_avaliacao: "",
            familia_avaliacao_desc: "",
            placa_avaliacao: "",
            valor_avaliacao: "",
            kilometragem: "",
            anoModelo_avaliacao: "",
            anoFabricacao_avaliacao: "",
            dialog_avaliacao: false,
            avaliacoes: "",
            info_avaliacao: "",
            hab_avaliacao: true,
            ativar_placa: false,
            desativar_placa: true,

            //Campos Veículo compra
            chassi_proposta: "",
            marca_proposta: "",
            modelo_proposta: "",
            cor_proposta: "",
            anoModelo_proposta: "",
            anoFabricacao_proposta: "",
            combustivel_proposta: "",
            numero_veiculo_proposta: "",
            propostaVeiculo_id: "",
            inserir_acessorios: true,

            venda_futura: "",
            empresa: "",
            categoria: "",
            pps_valor: "",
            valor_veiculo: "",
            dias_em_estoque: "",
            placa: "",
            status_veiculo: "",

            //Acessorios
            descricaoAcessorio: "",
            valorAcessorio: "",
            custoAcessorio: "",

            ///Modais
            hab_cliente: true,
            modal: false,
            modal_estoque: false,
            modal_itens_avaliacao: false,
            modal_itens_acessorios: false,
            modal_ranqueamento: false,
            modal_gerar_menu_desk: false,
            modal_proposta: false,

            //Campos para calcular as parcelas
            parcela: "",
            parcela_1: 12,
            parcela_2: 24,
            parcela_3: 36,
            entrada_1: "",
            entrada_2: "",
            entrada_3: "",
            entrada_1_original: "",
            entrada_2_original: "",
            entrada_3_original: "",
            id_coluna: "",
            valor_total: "",
            parcelamento: [],
            parcelamento_1: [],
            parcelamento_2: [],
            parcelamento_3: [],
            valor_financiado: "",
            valor_entrada: "",
            valor_financiado_2: "",
            valor_entrada_2: "",
            valor_financiado_3: "",
            valor_entrada_3: "",
            Valor_Entrada_2: "",
            Valor_Entrada_3: "",
            Valor_Financiado_2: "",
            Valor_Financiado_3: "",

            //Campos Filtro Ranqueamento
            filtro_tipo_veiculo: "",
            filtro_tipo_tabela: "SIM",
            filtro_spf: "SIM",
            filtro_param: "RENTABILIDADE",

            //Primeira coluna botões
            parcela_1_1: 0.0,
            parcela_2_1: 0.0,
            parcela_3_1: 0.0,
            //Segunda Coluna botões
            parcela_1_2: 0.0,
            parcela_2_2: 0.0,
            parcela_3_2: 0.0,
            //Terceira Coluna botões
            parcela_1_3: 0.0,
            parcela_2_3: 0.0,
            parcela_3_3: 0.0,

            //Resumo
            //Valores do veículo
            Valor_Sugerido: 0.0,
            Valor_Custo_variaveis: 0.0,
            Valor_Itens_Acessorios: 0.0,
            Valor_Total_Venda: 0.0,

            //Valores da Avaliação
            Valor_Avaliado: 0.0,
            Valor_Itens_Avaliacao_db: 0.0,
            Valor_Itens_Avaliacao_cr: 0.0,
            Valor_Avaliacao_Final: 0.0,

            //Resultado Operacional / Gerencial
            Lucro_Bruto: 0.0,
            Lucro_Operacional: 0.0,
            Lucro_liquido: 0.0,
            Valor_Resultado_Financiamento: 0.0,

            //Informações Financiamento
            Valor_Entrada: 0.0,
            Valor_Financiado: 0.0,
            Quantidade_Meses: 0.0,
            Pmt: 0.0,

            //Gráficos Desk Veiculos Novos
            qtd_clientes_novos_n: 0,
            qtd_clientes_retorno_n: 0,
            qtd_vendas_perdidas_n: 0,
            qtd_vendas_realizadas_n: 0,
            qtd_clientes_novos_n_int: 0,
            qtd_clientes_retorno_n_int: 0,
            qtd_vendas_perdidas_n_int: 0,
            qtd_vendas_realizadas_n_int: 0,

            //Gráfico Desk Veículos Usados
            qtd_clientes_novos_u: 0,
            qtd_clientes_retorno_u: 0,
            qtd_vendas_perdidas_u: 0,
            qtd_vendas_realizadas_u: 0,
            qtd_clientes_novos_u_int: 0,
            qtd_clientes_retorno_u_int: 0,
            qtd_vendas_perdidas_u_int: 0,
            qtd_vendas_realizadas_u_int: 0,

            inserir_item_avaliacao: true,
            btn_ranquear: true,
            btn_1: true,
            btn_2: true,
            btn_3: true,
            btn_gerar_menu: true,
            btn_finalizar_venda: true,
            cortesia: '',
            money: {
                decimal: ",",
                thousands: ".",
                prefix: "R$ ",
                suffix: " #",
                precision: 2,
                masked: false,
            },
            icon_1: "",
            icon_2: "",
            icon_3: "",
            icon_4: "",
            icon_5: "",
            icon_6: "",
            icon_7: "",
            icon_8: "",
            icon_9: "",
            icon_10: "",
            icon_11: "",
            btn_filtro_1: "",
            btn_filtro_2: "",
            btn_filtro_3: "",
            btn_filtro_4: "",
            btn_filtro_5: "",
            btn_filtro_6: "",
            btn_filtro_7: "",
            btn_filtro_8: "",
            btn_filtro_9: "",
            btn_filtro_10: "",
            btn_filtro_11: "",

            incluir_acessorios: true,

            //Gerar Menu
            //informações cliente
            dados_menu: "",
            g_menu_cliente: "",
            g_menu_cpfCnpj: "",
            g_menu_fone: "",
            g_menu_email: "",
            //informações proposta
            g_menu_gerente: "",
            g_menu_vendedor: "",
            g_menu_vendedor_id: "",
            g_menu_negociacao: "",
            g_menu_data_negociacao: "",
            //opções de compra
            g_menu_val_sugerido: "",
            g_menu_val_desconto: "",
            g_menu_val_veiculo: "",
            g_menu_total_financiado: "",
            //Dados veiculo compra
            g_menu_marca: "",
            g_menu_modelo: "",
            g_menu_cor: "",
            g_menu_chassi: "",
            g_menu_km: "",
            g_menu_ano_modelo: "",
            g_menu_ano_fab: "",
            //Dados veiculo troca
            g_menu_marca_avaliacao: "",
            g_menu_placa_avaliacao: "",
            g_menu_modelo_avalicao: "",
            g_menu_ano_modelo_avaliacao: "",
            g_menu_valor_avaliado: "",
            g_menu_itens_avaliacao_db: "",
            g_menu_itens_avaliacao_cr: "",
            g_menu_valor_avaliacao_final: "",
            //Acessorios
            g_menu_total_acessorios: "",
            total_vendas_usados: "",
            total_vendas_clientes_novos: "",
            total_vendas_clientes_retorno: "",
            total_vendas_perdidas_usados: "",

            atendimento_atrasado: "",
            atendimento_pontual: "",
            dialog_incluir_acessorios: false,
            message_incluir_acessorios: "",
            msg: "",

            abrir_modal_desconto: false,
            abrir_modal_acrescimo: false,
            open_proposta: true,
            id_cliente: "",

            Valor_Financiado_1: "",
            Valor_Entrada_1: "",
            handlePageChange: "",
            items: [],
            user_logado: "",
            empresaID: "",
            status_proposta: "",
            data_ini: "",
            data_fim: "",
            entrada_1_perc: "",
            entrada_2_perc: "",
            entrada_3_perc: "",
            valor_sugerido_original: "",
            valor_custo_contabil: "",
            tipo_veiculo: "",
            botoesVisiveis: false,
            botoes: [
                { id: 1, icone: 'bi bi-printer', texto: 'Imprimir' },
                { id: 2, icone: 'bi bi-file-lock', texto: 'Abrir Arquivo' },
            ],

            abrir_modal_reimpressao: false,
            liberar_impressao: true,
            tipoPagamento: "",
            g_menu_fone2: "",
            g_menu_placa: ""
        };
    },

    created() {
        const accessToken = TokenService.getLocalAccessToken();
        const decodedToken = jwt_decode(accessToken);
        this.empresaID = decodedToken.company;
    },


    mounted() {
        this.getToken();
        //this.retrievePropostas();
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
        async update_proposta(item) {
            console.log(item)
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
                            id: id
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
                console.log(error)
                this.abrir_modal = true;
                this.msg = error;
                setTimeout(() => (this.abrir_modal = false), 4000);

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


                const params = this.getRequestParamsProposta(
                    this.searchProposta,
                    this.page_4,
                    this.pageSize_4,
                    this.empresaID,
                    this.status_proposta,
                    this.data_ini,
                    this.data_fim,
                );

                const response = await userService.getReabrirPropostaCliente(params);

                const { propostas } = response.data;


                let array_proposta_2 = [];

                let tempo_atendimento;

                let segundos_atendimento;
                let minutos_atendimento;
                let horas_atendimento;

                let gerente;
                let status;


                for await (const proposta of propostas) {
                    console.log('proposta.id:', proposta.id);

                    const createdAtDate = new Date(proposta["createdAt"]);
                    const formattedCreatedAt = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;


                    status = "";



                    if (proposta["status_proposta"] === "Venda Finalizada") {
                        this.css3 = "cor_venda_finalizada";
                        status = "Venda Finalizada";
                    }
                    if (proposta["status_proposta"] === "Venda Perdida") {
                        this.css4 = "cor_venda_perdida";
                        status = "Venda Perdida";
                    }
                    if (proposta["gerentes"] === null) {
                        gerente = this.$store.state.auth.user.id;
                    }

                    this.g_menu_vendedor_id = proposta["vendedor_id"];
                    let tempo_total = proposta["total_tempo_atendimento"];
                    console.log(tempo_total)
                    if (tempo_total == null) {
                        tempo_total = "00:00:00"
                    }


                    const array_proposta_1 = {
                        acessorios: proposta["acessorios"],
                        adicional: proposta["adicional"],
                        avaliacao: proposta["avaliacao"],
                        avaliacaoVeiculo_id: proposta["avaliacaoVeiculo_id"],
                        avaliacoes_veiculo: proposta["avaliacoes_veiculo"],
                        cliente_id: proposta["cliente_id"],
                        cliente: proposta["clientes"]["nome"],
                        cortesia: proposta["cortesia"],
                        custos_variaveis: proposta["avaliacao"],
                        desconto: proposta["avaliacao"],
                        empresa_id: proposta["empresa_id"],
                        gerente_id: proposta["gerente_id"],
                        gerente: gerente,
                        id: proposta["id"],
                        info_adicional: proposta["obs"],
                        id_vendedor_fila: proposta["id_vendedor_fila"],
                        impostos: proposta["impostos"],
                        justificativa: proposta["justificativa"],
                        midia_id: proposta["midia_id"],
                        modelo_id: proposta["modelo_id"],
                        modelo_veiculos: proposta["modelo_veiculos"],
                        obs: proposta["obs"],
                        propostaVeiculo_id: proposta["propostaVeiculo_id"],
                        proposta_veiculo: proposta["proposta_veiculo"],
                        retorno: proposta["retorno"],
                        status: status,
                        tipo_pagamento: proposta["tipo_pagamento"],
                        user_id: proposta["user_id"],
                        usuarios: proposta["usuarios"],
                        veiculoUsado_id: proposta["veiculoUsado_id"],
                        veiculos_usados: proposta["veiculos_usados"],
                        vendedor_id: proposta["vendedor_id"],
                        vendedor: proposta["vendedores"]["username"],
                        monetario_lucro: this.currency(proposta["lucro_operacional"]),
                        percentual_lucro: parseFloat((proposta["lucro_operacional"] / proposta["val_sugerido_venda"]) * 100).toFixed(2),
                        monetario_margem: this.currency(proposta["lucro_final"]),
                        percentual_margem: parseFloat((proposta["lucro_final"] / proposta["val_sugerido_venda"]) * 100).toFixed(2),
                        modelo: proposta["proposta_veiculo"] ? proposta["proposta_veiculo"]["modelo_veiculo"] : 'N/A',

                        tempo_atendimento: tempo_atendimento,
                        total_atendimento: tempo_total, // Utilize o valor retornado pelo servidor

                        gerados: "",
                        motivo_perda: "",

                        horas_atendimento: horas_atendimento,
                        minutos_atendimento: minutos_atendimento,
                        segundos_atendimento: segundos_atendimento,

                        cpfCnpj: proposta["clientes"]["cpfCnpj"],
                        nome: proposta["clientes"]["nome"],
                        email: proposta["clientes"]["email"],
                        tel: proposta["clientes"]["tel"],
                        tipo_veiculo: proposta["tipo_veiculo"],
                        data_atendimento: formattedCreatedAt
                    };

                    array_proposta_2.push(array_proposta_1);
                }

                this.propostas_at = array_proposta_2;
                this.validando_tempo();
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


    },
};
</script>
      
