<template>
    <div>
        <SidebarVue />
        <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
            <div class="container-fluid">
                <div><i class="bi bi-sliders fs-5"> Relatório Mensal - Desk </i></div>
                <div>
                    <ul class="nav justify-content-end">
                        <li class="nav-item">
                            <router-link class="nav-link active rf_texto" to="/desk/index">Fechar Menu</router-link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
        <div class="card rf_bg_form  mt-4 p-2">
            <div class="row g-2 p-2">
                <div class="col-2">
                    <div class="mt-2">
                        <span class="rf_texto">Referência</span>
                        <div class="input-group mt-2">
                            <select class="form-select" v-model="selectedFilter" @change="filtarRelatorios()">
                                <option value="hoje">Hoje</option>
                                <option value="ontem">Ontem</option>
                                <option value="mes_atual">Mês Atual</option>
                                <option value="mes_anterior">Mês Anterior</option>
                                <option value="personalizado">Personalizado</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="mt-2">
                        <div v-if="selectedFilter === 'personalizado'">
                            <span class="rf_texto">Selecione as datas</span>
                            <div class="input-group mt-2">
                                <input type="date" class="form-control" v-model="startDate" />
                                <span class="input-group-text">até</span>
                                <input type="date" class="form-control" v-model="endDate" />
                                <button class="btn btn-secondary" @click="filterByPeriod">Filtrar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="mt-2">
                        <span class="rf_texto">Tipo Loja</span>
                        <div class="input-group mt-2">
                            <select class="form-select" v-model="selectedTipoLoja" @change="getEmpresas()">
                                <option value=1>Quatro Rodas</option>
                                <option value=2>Duas Rodas</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <label class="text-info p-2">Lojas</label>
                    <div class="d-flex justify-content-between mb-1">
                        <div class="p-2 rf_texto">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="checkboxTodos" v-model="marcarTodos">
                                <label class="form-check-label" for="checkboxTodos">Marcar Todos</label>
                            </div>
                            <div class="form-check form-check-inline" v-for="item in lista_empresas" :key="item.id">
                                <input class="form-check-input" type="checkbox" :id="item.id" :value="item.id"
                                    v-model="selectedEmpresas">
                                <label class="form-check-label" :for="item.id">{{ item.nome }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group p-2">
                        <button class="btn btn-secondary btn-block mt-2 " @click="propostas_mes">
                            <span>Pesquisar</span>
                        </button>
                    </div>
                </div>

                <!-- <div class="col">
                    <div class="card car shadow-sm text-center rf_texto rf_border " style="margin-right:0.5rem">
                        <div class=" card-header bg-dark">Lucro Operacional</div>
                        <div class="card-body bg-success ">
                            <h5 class="card-title">{{ lucro_operacional }}</h5>
                            <p>Total</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm text-center rf_texto rf_border" style="margin-right:0.5rem">
                        <div class=" card-header bg-dark">Lucro Gerencial</div>
                        <div class="card-body bg-success ">
                            <h5 class="card-title">{{ lucro_gerencial }}</h5>
                            <p>Total</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm text-center rf_texto rf_border" style="margin-right:0.5rem">
                        <div class=" card-header bg-dark">Lucro Financiamento</div>
                        <div class="card-body bg-success ">
                            <h5 class="card-title">{{ lucro_financiamento }}</h5>
                            <p>Total</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm text-center rf_texto rf_border">
                        <div class=" card-header bg-dark">Lucro Final</div>
                        <div class="card-body bg-success ">
                            <h5 class="card-title">{{ lucro_final }}</h5>
                            <p>Total</p>
                        </div>
                    </div>
                </div> -->
            </div>
            <!--Situação Geral-->
            <div class="row g-2 p-2">
                <!--Veículos Novos-->
                <div class="col">
                    <div class="card shadow-sm text-center rf_texto rf_border" style="margin-right:0.5rem">
                        <div class=" card-header bg-dark ">Novos</div>
                        <!--Passagens-->
                        <div class="card-body bg-primary ">
                            <p>Passagens - {{ total_passagem_zero }}</p>
                            <p>Novas - {{ total_passagem_zero_novas }} | Retorno - {{ total_passagem_zero_retorno }}</p>
                        </div>
                        <!--Em Atendimento-->
                        <div class="card-body bg-secondary">
                            <p>Em Atendimento</p>
                            <p> {{ total_em_atendimento_zero }} ({{ total_em_atendimento_zero_porcentagem }} %) </p>
                        </div>
                        <!--Venda Efetuada-->
                        <div class="card-body bg-success ">
                            <p> Venda Efetuada - {{ total_vendas_finalizadas_zero }}
                                ({{ total_vendas_finalizadas_zero_porcentagem }}%)</p>
                            <p>Novos - {{ total_vendas_finalizadas_zero_novos }} ({{
                                total_vendas_finalizadas_zero_novos_porcentagem
                            }}%) | Retorno - {{ total_vendas_finalizadas_zero_retorno }} ({{
    total_vendas_finalizadas_zero_retorno_porcentagem }}%)</p>
                        </div>                      
                        <!--Venda Perdida-->    
                        <div class="card-body bg-danger ">
                            <p>Venda Perdida</p>
                            <p>{{ total_vendas_perdidas_zero }} ({{ total_vendas_perdidas_zero_porcentagem }} %)</p>

                        </div>
                    </div>
                </div>
                <!--Veículos Usados-->
                <div class="col">
                    <div class="card shadow-sm text-center rf_texto rf_border">
                        <div class=" card-header bg-dark ">Usados</div>
                        <!--Passagem-->
                        <div class="card-body bg-primary ">
                            <p>Passagens - {{ total_passagem_usado }}</p>
                            <p>Novas - {{ total_passagem_usado_novas }} | Retorno - {{ total_passagem_usado_retorno }}</p>

                        </div>
                        <!-- Em Atendimento-->
                        <div class="card-body bg-secondary">
                            <p>Em Atendimento</p>
                            <p> {{ total_em_atendimento_usados }} ({{ total_em_atendimento_usados_porcentagem }} %) </p>

                        </div>
                        <!-- Venda Efetuada -->
                        <div class="card-body bg-success ">
                            <p> Venda Efetuada - {{ total_vendas_finalizadas_usado }}
                                ({{ total_vendas_finalizadas_usado_porcentagem }}%)</p>
                            <p>Novos - {{ total_vendas_finalizadas_usado_novos }} ({{
                                total_vendas_finalizadas_usado_novos_porcentagem
                            }}%) | Retorno - {{ total_vendas_finalizadas_usado_retorno }} ({{
    total_vendas_finalizadas_usado_retorno_porcentagem }}%)</p>
                        </div>
                        <!-- Venda Perdida-->
                        <div class="card-body bg-danger ">
                            <p>Venda Perdida</p>
                            <p>{{ total_vendas_perdidas_usados }} ({{ total_vendas_perdidas_usados_porcentagem }}%) </p>

                        </div>
                    </div>
                </div>
            </div>

            <!--Quadro por Empresa-->
            <div class="row p-2 mt-5">
                <div class="col-4" v-for="(item, index) in resumosPorEmpresa" :key="index">
                    <div class=" card-header bg-dark rf_texto text-center mt-2">{{ item.nome }}</div>
                    <div class="row mt-2">
                        <!--Veículos Novos-->
                        <div class="col">
                            <div class="card shadow-sm text-center rf_texto rf_border">
                                <div class=" card-header bg-dark ">Novos</div>
                                <div class="card-body bg-success ">
                                    <p> Vendidos - {{ item.total_vendas_finalizadas_zero }}
                                        ({{ item.total_vendas_finalizadas_zero_porcentagem }}%)</p>
                                    <p>Novos - {{ item.total_vendas_finalizadas_zero_novos }} ({{
                                        item.total_vendas_finalizadas_zero_novos_porcentagem
                                    }}%) | Retorno - {{ item.total_vendas_finalizadas_zero_retorno }} ({{
    item.total_vendas_finalizadas_zero_retorno_porcentagem }}%)</p>
                                </div>
                                <div class="card-body bg-primary ">
                                    <p>Passagens - {{ item.total_passagem_zero }}</p>
                                    <p>Novas - {{ item.total_passagem_zero_novas }} | Retorno - {{
                                        item.total_passagem_zero_retorno }}
                                    </p>

                                </div>
                                <div class="card-body bg-secondary">
                                    <p>Em Atendimento</p>
                                    <p> {{ item.total_em_atendimento_zero }} ({{ item.total_em_atendimento_zero_porcentagem
                                    }} %)
                                    </p>

                                </div>
                                <div class="card-body bg-danger ">
                                    <p>Perdidas</p>
                                    <p>{{ item.total_vendas_perdidas_zero }} ({{ item.total_vendas_perdidas_zero_porcentagem
                                    }} %)
                                    </p>

                                </div>
                            </div>
                        </div>
                        <!--Veículos Usados-->
                        <div class="col">
                            <div class="card shadow-sm text-center rf_texto rf_border">
                                <div class=" card-header bg-dark ">Usados</div>
                                <div class="card-body bg-success ">
                                    <p> Vendidos - {{ item.total_vendas_finalizadas_usado }}
                                        ({{ item.total_vendas_finalizadas_usado_porcentagem }}%)</p>
                                    <p>Novos - {{ item.total_vendas_finalizadas_usado_novos }} ({{
                                        item.total_vendas_finalizadas_usado_novos_porcentagem
                                    }}%) | Retorno - {{ item.total_vendas_finalizadas_usado_retorno }} ({{
    item.total_vendas_finalizadas_usado_retorno_porcentagem }}%)</p>
                                </div>
                                <div class="card-body bg-primary ">
                                    <p>Passagens - {{ item.total_passagem_usado }}</p>
                                    <p>Novas - {{ item.total_passagem_usado_novas }} | Retorno - {{
                                        item.total_passagem_usado_retorno
                                    }}</p>

                                </div>
                                <div class="card-body bg-secondary">
                                    <p>Em Atendimento</p>
                                    <p> {{ item.total_em_atendimento_usados }} ({{
                                        item.total_em_atendimento_usados_porcentagem }}
                                        %)
                                    </p>

                                </div>
                                <div class="card-body bg-danger ">
                                    <p>Perdidas</p>
                                    <p>{{ item.total_vendas_perdidas_usados }} ({{
                                        item.total_vendas_perdidas_usados_porcentagem
                                    }}%)
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>

        <RodapeVue />
    </div>
</template>
<script>

import SidebarVue from "../../components/menu/Sidebar.vue";
import axios from "axios";
import TokenService from "../../services/token.service";
import jwt_decode from 'jwt-decode';
import RodapeVue from "../../components/menu/Rodape.vue";

export default {
    components: {
        SidebarVue,
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
            conversao_vendas: [],
            total_atendimentos: "",
            total_vendas: "",
            selectedFilter: 'hoje',
            startDate: '',
            endDate: '',

            //Dados do Login
            user_id: "",
            company_id: "",
            lista_empresas: [],
            resumosPorEmpresa: [],
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
            selectedTipoLoja: 1,
            selectedTipoVeiculo: [],
            marcarNovo: false,
            marcarUsado: false,
            referencia: "",
            filtroSelecionadoLabel: 'Loja',
            selectedRelatorio: 'venda_conversao',
            tipo_relatorio: 'venda_conversao',
            vendas_perdidas: [],
            vendas_modelo: [],
            total_vendas_modelo: '',
            total_convesao_perc: 0.00

        }
    },
    mounted() {
        this.getToken();
        this.getEmpresas();
        this.propostas_mes();



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

        lista_empresas: {
            handler(newList) {

                this.selectedEmpresas = newList.map(item => item.id);
                this.selectedTipoVeiculo = [0, 1]
                //this.relatorio_conversao_vendas();
                this.propostas_mes();
            },
            immediate: true, // Para executar a função ao criar o componente
        },

    },
    created() {
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
        getRequestParams(EmpresasSelecionadas, page, pageSize, empresa_id, usuario_id, data_ini, data_fim, referencia) {
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
            if (referencia) {
                params["referencia"] = referencia
            }


            return params;
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
                data_ini: this.startDate,
                data_fim: this.endDate,
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

                    this.propostas_mes_empresa();
                    this.resumo_gerencial();

                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status == 400) {
                        this.abrir_modal = true;
                        this.msg = error.response.data.message;
                    }
                })


        },
        async propostas_mes_empresa() {
            const params = {
                empresa_id: this.company_id,
                user_id: this.user_id,
                data_ini: this.startDate,
                data_fim: this.endDate,
                referencia: this.selectedFilter,
                empresas: this.selectedEmpresas
            }
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}propostas_mes_empresa`, {
                    params
                });
                const resumos = response.data;

                // Criar um objeto para armazenar os resumos por ID da empresa
                const resumosPorEmpresa = {};

                // Iterar sobre o array de resumos e organizar por ID da empresa
                resumos.forEach(resumo => {
                    const empresaId = resumo.id_empresa;
                    resumosPorEmpresa[empresaId] = resumo;
                    // this.resumosPorEmpresa = resumosPorEmpresa[empresaId];
                });

                this.resumosPorEmpresa = resumos;
                // Agora resumosPorEmpresa contém os resumos organizados por ID da empresa
                console.log(this.resumosPorEmpresa);

                // Você pode acessar os resumos de uma empresa específica assim:
                const empresaIdDesejado = 16;
                const resumoDaEmpresaDesejada = resumosPorEmpresa[empresaIdDesejado];

                console.log(empresaIdDesejado);
                console.log(resumoDaEmpresaDesejada);

            } catch (error) {
                if (error.response.status === 400) {
                    this.abrir_modal = true;
                    this.msg = error.response.data.message;
                }
            }

            // await axios.get(`${process.env.VUE_APP_API_URL}propostas_mes_empresa`, {
            //     params
            // })
            //     .then(response => {
            //         console.log(response.data)
            //         const res = response.data

            //         //Restultado operacional
            //         this.lucro_operacional = JSON.parse(JSON.stringify(res['total_lucro_operacional_veiculos_usados']));
            //         this.lucro_gerencial = JSON.parse(JSON.stringify(res['total_lucro_gerencial_veiculos_usados']));
            //         this.lucro_financiamento = JSON.parse(JSON.stringify(res['total_lucro_financiamento_veiculos_usados']));
            //         this.lucro_final = JSON.parse(JSON.stringify(res['total_lucro_final_veiculos_usados']));



            //         this.total_passagem_zero = JSON.parse(JSON.stringify(res['total_passagem_zero']));
            //         this.total_passagem_zero_retorno = JSON.parse(JSON.stringify(res['total_passagem_zero_retorno']));
            //         this.total_passagem_zero_novas = JSON.parse(JSON.stringify(res['total_passagem_zero_novas']));
            //         this.total_em_atendimento_zero = JSON.parse(JSON.stringify(res['total_em_atendimento_zero']));
            //         this.total_em_atendimento_zero_porcentagem = JSON.parse(JSON.stringify(res['total_em_atendimento_zero_porcentagem'])).toFixed(2);
            //         this.total_vendas_perdidas_zero = JSON.parse(JSON.stringify(res['total_vendas_perdidas_zero']));
            //         this.total_vendas_perdidas_zero_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_perdidas_zero_porcentagem'])).toFixed(2);
            //         this.total_vendas_finalizadas_zero = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero']));
            //         this.total_vendas_finalizadas_zero_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_porcentagem'])).toFixed(2);

            //         this.total_vendas_finalizadas_zero_novos = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_novos']));
            //         this.total_vendas_finalizadas_zero_novos_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_novos_porcentagem'])).toFixed(2);
            //         this.total_vendas_finalizadas_zero_retorno = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_retorno']));
            //         this.total_vendas_finalizadas_zero_retorno_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_retorno_porcentagem'])).toFixed(2);


            //         this.total_passagem_usado = JSON.parse(JSON.stringify(res['total_passagem_usado']));
            //         this.total_passagem_usado_retorno = JSON.parse(JSON.stringify(res['total_passagem_usado_retorno']));
            //         this.total_passagem_usado_novas = JSON.parse(JSON.stringify(res['total_passagem_usado_novas']));
            //         this.total_em_atendimento_usados = JSON.parse(JSON.stringify(res['total_em_atendimento_usados']));
            //         this.total_em_atendimento_usados_porcentagem = JSON.parse(JSON.stringify(res['total_em_atendimento_usados_porcentagem'])).toFixed(2);
            //         this.total_vendas_perdidas_usados = JSON.parse(JSON.stringify(res['total_vendas_perdidas_usados']));
            //         this.total_vendas_perdidas_usados_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_perdidas_usados_porcentagem'])).toFixed(2);
            //         this.total_vendas_finalizadas_usado = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado']));
            //         this.total_vendas_finalizadas_usado_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_porcentagem'])).toFixed(2);
            //         this.total_vendas_finalizadas_usado_novos = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_novos']));
            //         this.total_vendas_finalizadas_usado_novos_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_novos_porcentagem'])).toFixed(2);
            //         this.total_vendas_finalizadas_usado_retorno = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_retorno']));
            //         this.total_vendas_finalizadas_usado_retorno_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_retorno_porcentagem'])).toFixed(2);



            //     })
            //     .catch(error => {
            //         if (error.response.status == 400) {
            //             this.abrir_modal = true;
            //             this.msg = error.response.data.message;
            //         }
            //     })


        },

        async getEmpresas() {
            console.log("Buscando Empresas")
            const user_id = this.user_id
            // Limpar o array antes de buscar novas empresas

            await axios.get(`${process.env.VUE_APP_API_URL}user_empresas`, {
                params: { id: user_id }
            })
                .then(response => {
                    // Filtrar as empresas com base no selectedTipoLoja
                    this.lista_empresas = response.data.filter(empresa => {
                        if (this.selectedTipoLoja == 1) {
                            console.log("Quatro Rodas")
                            return empresa.tipo_empresa === 1;
                        } else if (this.selectedTipoLoja == 2) {
                            console.log("Duas Rodas")
                            return empresa.tipo_empresa === 2;
                        }

                        // Se não for 1 nem 2, não filtra
                        return true;
                    });
                })
                .catch(error => {
                    if (error.response.status == 400) {
                        this.abrir_modal = true;
                        this.msg = error.response.data.message;
                    }
                })

        },
        async resumo_gerencial() {
            console.log("Aqui Resumo");
            await fetch(`${process.env.VUE_APP_API_URL}taxas/resumo_gerencial`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    empresas: this.selectedEmpresas,
                }),
            })
                .then((data) => {
                    if (!data.ok) {
                        throw Error(data.status);
                    }
                    return data.json();
                })
                .then((resposta) => {

                    if (resposta["tipo_veiculo"] == "NOVO") {
                        this.Lucro_Bruto = resposta["Lucro_Bruto_Zero"];
                        this.Lucro_Operacional = resposta["Lucro_Operacional_Zero"];
                        this.Lucro_liquido = resposta["Lucro_liquido_Zero"];

                    }
                    if (resposta["tipo_veiculo"] == "USADO") {
                        this.Lucro_Bruto = resposta["Lucro_Bruto"];
                        this.Lucro_Operacional = resposta["Lucro_Operacional"];
                        this.Lucro_liquido = resposta["Lucro_liquido"];
                    }
                    (this.Valor_Sugerido = resposta["Valor_Sugerido"]),
                        (this.Valor_Custo_variaveis = resposta["Valor_Custo_variaveis"]),
                        (this.Valor_Itens_Acessorios = resposta["Valor_Itens_Acessorios"]);
                    this.Valor_Total_Venda = resposta["Valor_Total_Venda"];
                    this.Valor_Avaliado = resposta["Valor_Avaliado"];
                    this.Valor_Itens_Avaliacao_db = resposta["Valor_Itens_Avaliacao_db"];
                    this.Valor_Itens_Avaliacao_cr = resposta["Valor_Itens_Avaliacao_cr"];
                    this.Valor_Avaliacao_Final = resposta["Valor_Avaliacao_Final"];

                    this.Valor_Resultado_Financiamento =
                        resposta["Valor_Resultado_Financiamento"];

                    this.Valor_Entrada = resposta["Valor_Entrada"];
                    this.Valor_Financiado = resposta["Valor_Financiado"];
                    this.Quantidade_Meses = resposta["Quantidade_Meses"];

                    this.Valor_Entrada_1 = resposta["Valor_Entrada_1"];
                    this.Valor_Financiado_1 = resposta["Valor_Financiado_1"];
                    this.Quantidade_Meses_1 = resposta["Quantidade_Meses_1"];

                    this.Valor_Entrada_2 = resposta["Valor_Entrada_2"];
                    this.Valor_Financiado_2 = resposta["Valor_Financiado_2"];
                    this.Quantidade_Meses_2 = resposta["Quantidade_Meses_2"];

                    this.Valor_Entrada_3 = resposta["Valor_Entrada_3"];
                    this.Valor_Financiado_3 = resposta["Valor_Financiado_3"];
                    this.Quantidade_Meses_3 = resposta["Quantidade_Meses_3"];

                    this.Pmt = resposta["Pmt"];
                    this.parcela_1_1 = resposta["Pmt_1"];
                    this.parcela_2_1 = resposta["Pmt_2"];
                    this.parcela_3_1 = resposta["Pmt_3"];
                    this.parcela_1_2 = resposta["Pmt_4"];
                    this.parcela_2_2 = resposta["Pmt_5"];
                    this.parcela_3_2 = resposta["Pmt_6"];
                    this.parcela_1_3 = resposta["Pmt_7"];
                    this.parcela_2_3 = resposta["Pmt_8"];
                    this.parcela_3_3 = resposta["Pmt_9"];
                    if (resposta["Parcela1"]) {
                        console.log("Existe uma parcela")
                        this.parcela_1 = resposta["Parcela1"];
                        this.bloquear_entrada = true;
                    }

                    this.parcela_2 = resposta["Parcela2"];

                    this.parcela_3 = resposta["Parcela3"];

                    let v_entrada_1 = resposta["Entrada1"];
                    let v_entrada_2 = resposta["Entrada2"];
                    let v_entrada_3 = resposta["Entrada3"];
                    this.entrada_1 = this.currency(v_entrada_1);
                    this.entrada_2 = this.currency(v_entrada_2);
                    this.entrada_3 = this.currency(v_entrada_3);
                    this.adicional = resposta["Valor_Adicional"];
                    this.desconto = resposta["Valor_Desconto"]


                    if (resposta["incluir_acessorios"] == "1") {
                        console.log(
                            "Somar Acessorios ---------------------------------------------------------------------------"
                        );
                        this.incluir_acessorios = true;
                    } else {
                        this.incluir_acessorios = false;
                        console.log(
                            "Não Somar Acessorios ---------------------------------------------------------------------------"
                        );
                    }
                    if (resposta["Valor_Resultado_Financiamento"] != "") {
                        this.btn_gerar_menu = false;
                        this.btn_1 = false;
                        this.btn_finalizar_venda = false;
                    }

                    console.log(resposta);
                });
        },


        currency(number) {
            return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
            }).format(number);
        },
    }
};
</script>