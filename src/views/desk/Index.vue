<template>
  <SidebarVue ref="sidebar" />
  <NavgatorDk
    ref="navgator"
    :barraTitulo="' Administração - Desk'"
    :titulo="'desk'"
  />

  <!--Gráficos Veículos Novos-->
  <div class="card card-filtro g-2 p-2">
    <div class="card-title gy-4">
      <i class="bi bi-car-front fs-5 fs-5 icone_filtro"
        ><span class="texto_filtro">Veículos Novos</span></i
      >
    </div>
  </div>
  <div class="card card-filtro mt-4 p-2">
    <!--Rodapé Gráfico-->
    <div class="row">
      <div id="chart">
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
  <!--Tabelas-->
  <div class="card card-tabela g-2 p-2 rf_margin">
    <div class="d-flex justify-content-between mb-3">
      <div>
        <select
          class="form-select rf_bg_form rf_texto"
          v-model="selectedFilter"
          @change="filtrarPropostas()"
        >
          <option value="">Selecione um filtro</option>
          <option value="Dia">Diário</option>
          <option value="Todos">Todos</option>
          <option value="Em Atendimento">Em Atendimento</option>
          <option value="Venda Finalizada">Venda Finalizada</option>
          <option value="Venda Perdida">Venda Perdida</option>
          <option value="Pesquisar por Período">Pesquisar por Período</option>
        </select>
      </div>
      <div v-if="selectedFilter === 'Pesquisar por Período'">
        <div class="input-group">
          <input
            type="date"
            class="form-control rf_bg_form rf_texto"
            v-model="startDate"
          />
          <span class="input-group-text">até</span>
          <input
            type="date"
            class="form-control rf_bg_form rf_texto"
            v-model="endDate"
          />
          <button
            class="btn btn-lg btn-desk-filtro-vendas"
            @click="filterByPeriod"
          >
            <span class="rf_texto_btn">Filtrar</span>
          </button>
        </div>
      </div>
    </div>
    <table class="table rf_texto_desk">
      <thead>
        <tr>
          <th scope="col" class="rf_header_table">Nº Atendimento</th>
          <th scope="col" class="rf_header_table">Vendedor</th>
          <th scope="col" class="rf_header_table">Cliente</th>
          <th scope="col" class="rf_header_table">Modelo</th>
          <th scope="col" class="rf_header_table">Tempo Espera</th>
          <th scope="col" class="rf_header_table">Tempo Atendimento</th>
          <th scope="col" class="rf_header_table">Total Atendimento</th>
          <th scope="col" class="rf_header_table">Data Atendimento</th>
          <th scope="col" class="rf_header_table">Gerados</th>
          <th scope="col" class="rf_header_table">Retorno</th>
          <th scope="col" class="rf_header_table">Status</th>
          <th scope="col" class="rf_header_table">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in propostasFiltradasNovo"
          :key="item.id"
          class="table-linha"
          :class="
            item.status === 'Atendimento'
              ? css
              : item.status === 'Atendimento Excedido'
              ? css1
              : item.status === 'Aguardando Atendimento'
              ? css2
              : item.status === 'Venda Finalizada'
              ? css3
              : item.status === 'Venda Perdida'
              ? css4
              : ''
          "
        >
          <td class="rf_header_table">{{ item.id }}</td>
          <td class="rf_header_table">{{ item.vendedor }}</td>
          <td class="rf_header_table">{{ item.cliente }}</td>
          <td class="rf_header_table">{{ item.modelo }}</td>
          <td class="rf_header_table">{{ item.tempo_espera }}</td>
          <td class="rf_header_table">{{ item.tempo_atendimento }}</td>
          <td class="rf_header_table">{{ item.total_atendimento }}</td>
          <td class="rf_header_table">{{ item.data_atendimento }}</td>
          <td class="rf_header_table">{{ item.quantidade_proposta_menu }}</td>
          <td class="rf_header_table">{{ item.retorno }}</td>

          <td class="rf_header_table">{{ item.status }}</td>

          <td>
            <button
              type="button"
              class="btn-desk"
              data-bs-target="#ModalDuplicacao"
              data-bs-toggle="modal"
              v-if="item_duplicado === 1"
            >
              <i class="bi bi-ev-front-fill"></i>
            </button>

            <button
              type="button"
              class="btn-desk"
              v-bind:disabled="
                item.status === 'Venda Finalizada' ||
                item.status === 'Venda Perdida'
              "
              @click="redirecionar(item.id)"
            >
              <!-- <router-link
                class="nav-link active"
                :to="`/desk/menu/proposta/${item.id}`"
              > -->
                <i class="bi bi-pencil-square"></i>
              <!-- </router-link> -->
            </button>

            <button
              type="button"
              class="btn-desk"
              v-bind:disabled="
                item.status === 'Atendimento' ||
                item.status === 'Aguardando Atendimento' ||
                item.status === 'Atendimento Excedido'
              "
            >
              <router-link
                class="nav-link active"
                :to="`/desk/menu/reimprimir/${item.id}`"
              >
                <i class="bi bi-printer"></i>
              </router-link>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-if="propostas_at.length"
      :offset="totalPages_4"
      :total="totalItems_4"
      :limit="pageSize_4"
      @change-page="handlePageChangeProposta"
    />
  </div>

  <!--Gráficos Veículos Usados-->
  <div class="card card-filtro g-2 p-2">
    <div class="card-title gy-4">
      <i class="bi bi-car-front fs-5 fs-5 icone_filtro"
        ><span class="texto_filtro">Veículos Usados</span></i
      >
    </div>
  </div>
  <div class="card card-filtro mt-4 p-2">
    <div class="row">
      <div id="chart_usado">
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series_usado"
        ></apexchart>
      </div>
    </div>
  </div>

  <!--Tabelas-->
  <div class="card card-tabela g-2 p-2 rf_margin">
    <div class="d-flex justify-content-between mb-3">
      <div>
        <select
          class="form-select rf_bg_form rf_texto"
          v-model="selectedFilter"
          @change="filtrarPropostas()"
        >
          <option value="">Selecione um filtro</option>
          <option value="Dia">Diário</option>
          <option value="Todos">Todos</option>
          <option value="Em Atendimento">Em Atendimento</option>
          <option value="Venda Finalizada">Venda Finalizada</option>
          <option value="Venda Perdida">Venda Perdida</option>
          <option value="Pesquisar por Período">Pesquisar por Período</option>
        </select>
      </div>
      <div v-if="selectedFilter === 'Pesquisar por Período'">
        <div class="input-group">
          <input
            type="date"
            class="form-control rf_bg_form rf_texto"
            v-model="startDate"
          />
          <span class="input-group-text rf-texto">até</span>
          <input
            type="date"
            class="form-control rf_bg_form rf_texto"
            v-model="endDate"
          />
          <button
            class="btn btn-lg btn-desk-filtro-vendas"
            @click="filterByPeriod"
          >
            <span class="rf_texto_btn">Filtrar</span>
          </button>
        </div>
      </div>
    </div>
    <table class="table rf_texto_desk">
      <thead>
        <tr>
          <th scope="col" class="rf_header_table">Nº Atendimento</th>
          <th scope="col" class="rf_header_table">Vendedor</th>
          <th scope="col" class="rf_header_table">Cliente</th>
          <th scope="col" class="rf_header_table">Modelo</th>
          <th scope="col" class="rf_header_table">Tempo Espera</th>
          <th scope="col" class="rf_header_table">Tempo Atendimento</th>
          <th scope="col" class="rf_header_table">Total Atendimento</th>
          <th scope="col" class="rf_header_table">Data Atendimento</th>
          <th scope="col" class="rf_header_table">Gerados</th>
          <th scope="col" class="rf_header_table">Retorno</th>
          <th scope="col" class="rf_header_table">Status</th>
          <th scope="col" class="rf_header_table">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in propostasFiltradasUsado"
          :key="item.id"
          class="table-linha"
          :class="
            item.status === 'Atendimento'
              ? css
              : item.status === 'Atendimento Excedido'
              ? css1
              : item.status === 'Aguardando Atendimento'
              ? css2
              : item.status === 'Venda Finalizada'
              ? css3
              : item.status === 'Venda Perdida'
              ? css4
              : ''
          "
        >
          <td class="rf_header_table">{{ item.id }}</td>
          <td class="rf_header_table">{{ item.vendedor }}</td>
          <td class="rf_header_table">{{ item.cliente }}</td>
          <td class="rf_header_table">{{ item.modelo }}</td>
          <td class="rf_header_table">{{ item.tempo_espera }}</td>
          <td class="rf_header_table">{{ item.tempo_atendimento }}</td>
          <td class="rf_header_table">{{ item.total_atendimento }}</td>
          <td class="rf_header_table">{{ item.data_atendimento }}</td>
          <td class="rf_header_table">{{ item.quantidade_proposta_menu }}</td>
          <td class="rf_header_table">{{ item.retorno }}</td>
          <td class="rf_header_table">{{ item.status }}</td>

          <td>
            <button
              type="button"
              class="btn-desk"
              v-bind:disabled="
                item.status === 'Venda Finalizada' ||
                item.status === 'Venda Perdida'
              "
            >
              <router-link
                class="nav-link active"
                :to="`/desk/menu/proposta/${item.id}`"
              >
                <i class="bi bi-pencil-square"></i>
              </router-link>
            </button>

            <button
              type="button"
              class="btn-desk"
              v-bind:disabled="
                item.status === 'Atendimento' ||
                item.status === 'Aguardando Atendimento' ||
                item.status === 'Atendimento Excedido'
              "
            >
              <router-link
                class="nav-link active"
                :to="`/desk/menu/reimprimir/${item.id}`"
              >
                <i class="bi bi-printer"></i>
              </router-link>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-if="propostas_at.length"
      :offset="totalPages_4"
      :total="totalItems_4"
      :limit="pageSize_4"
      @change-page="handlePageChangeProposta"
    />
  </div>
  <div v-if="abrir_modal">
    <Message :msg="msg" v-show="msg" />
  </div>

  <div v-if="abrir_modal_reimpressao">
    <div
      class="modal d-block py-5"
      tabindex="-1"
      role="dialog"
      id="Modal_Mensagem"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rf_bg_form">
          <div class="modal-header bg-dark rf_border">
            <h5 class="modal-title fs-5 rf_texto" id="staticBackdropLabel">
              <i class="bi bi-info-square"> Reimpressão do Menu</i>
            </h5>
          </div>
          <div class="modal-body bg-secondary text-center">
            <p class="fs-6 fw-bold">
              O sistema está buscando os dados do menu gerado para reimpressão.
              Aguarde!
            </p>
            <button
              class="btn btn-dark m-1"
              :disabled="liberar_impressao"
              data-bs-toggle="modal"
              data-bs-target="#ModalGerarMenu"
              @click="chamar_modal()"
            >
              GERAR MENU
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="ModalDuplicacao"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content bg-dark rf_texto">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
            Veículo em outros atendimentos
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card rf_bg_form g-2 p-2 rf_margin">
            <table class="table border-dark rf_texto">
              <thead>
                <tr>
                  <th scope="col" class="rf_header_table">Nº Proposta</th>
                  <th scope="col" class="rf_header_table">Empresa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in duplicatas" :key="item.id">
                  <td class="rf_header_table">{{ item.id_proposta_2 }}</td>
                  <td class="rf_header_table">{{ item.nome_empresa }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Modal Gerar Menu-->
  <div
    class="modal fade"
    id="ModalGerarMenu"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
            Menu Gerado
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card mt-3 rf_texto_pdf" ref="contentToPrint">
            <div class="col">
              <div class="row g-2 p-2">
                <div class="col-4">
                  <div class="card">
                    <div class="card-header rf_card_header">
                      Informações do Cliente
                    </div>
                    <div class="rf_card_pdf">
                      <div>
                        <div class="col"><strong>Cliente</strong></div>
                        <div class="col">
                          <span class="">{{ g_menu_cliente }}</span>
                        </div>
                      </div>
                      <div>
                        <div class="col"><strong>CPF/CNPJ</strong></div>
                        <div class="col">
                          <span class="">{{ g_menu_cpfCnpj }}</span>
                        </div>
                      </div>
                      <div>
                        <div class="col"><strong>Telefone</strong></div>
                        <div class="col">
                          <span class="">{{ g_menu_fone }}</span>
                        </div>
                      </div>
                      <div>
                        <div class="col"><strong>Telefone 2</strong></div>
                        <div class="col">
                          <span class="">{{ g_menu_fone2 }}</span>
                        </div>
                      </div>
                      <div>
                        <div class="col"><strong>Email</strong></div>
                        <div class="col">
                          <span class="">{{ g_menu_email }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-4">
                  <div class="card">
                    <div class="card-header rf_card_header">
                      Informações da Proposta
                    </div>
                    <div class="rf_card_pdf">
                      <div>
                        <div class="col"><strong>Gerente</strong></div>
                        <div class="col">
                          <span class="">{{ g_menu_gerente }}</span>
                        </div>
                      </div>
                      <div>
                        <div class="col"><strong>Vendedor</strong></div>
                        <div class="col">
                          <span class="">{{ g_menu_vendedor }}</span>
                        </div>
                      </div>
                      <div>
                        <div class="col"><strong>Negociação</strong></div>
                        <div class="col">
                          <span class="">{{ g_menu_negociacao }}</span>
                        </div>
                      </div>
                      <div>
                        <div class="col"><strong>Data</strong></div>
                        <div class="col">
                          <span class="">{{ g_menu_data_negociacao }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-4">
                  <div class="card">
                    <div class="card-header rf_card_header">Acessórios</div>
                    <div class="rf_container_menu">
                      <ul
                        class="list-group"
                        v-for="item in itens_acessorios"
                        :key="item.id"
                      >
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {{ item.descricao }}
                          <span class="">{{ item.valor }}</span>
                        </li>
                      </ul>
                    </div>
                    <ul class="list-group">
                      <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span class="badge text-bg-danger">{{ msg }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row g-2 p-2">
                <div class="col-4">
                  <div class="card">
                    <div class="card-header rf_card_header">Veículo</div>
                    <div class="rf_card_pdf">
                      <div class="row">
                        <div class="col">
                          <div class="col-4"><strong>Marca</strong></div>
                          <div class="col-4">
                            <span class="">{{ g_menu_marca }}</span>
                          </div>
                        </div>
                        <div class="col">
                          <div class="col"><strong>Modelo</strong></div>
                          <div class="col">
                            <span class="">{{ g_menu_modelo }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="col-4"><strong>Cor</strong></div>
                          <div class="col">
                            <span class="">{{ g_menu_cor }}</span>
                          </div>
                        </div>
                        <div class="col">
                          <div class="col"><strong>Placa</strong></div>
                          <div class="col">
                            <span class="">{{ g_menu_placa }}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col"><strong>Chassi</strong></div>
                        <div class="col">
                          <span class="">{{ g_menu_chassi }}</span>
                        </div>
                      </div>
                      <div>
                        <div class="row">
                          <div class="col">
                            <div class="col-6"><strong>Ano Modelo</strong></div>
                            <div class="col-6">
                              <span class="">{{ g_menu_ano_modelo }}</span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="col-6"><strong>Ano Modelo</strong></div>
                            <div class="col-6">
                              <span class="">{{ g_menu_ano_fab }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-4">
                  <div class="card">
                    <div class="card-header rf_card_header">
                      Resumo da Compra
                    </div>
                    <div class="rf_card_pdf">
                      <div class="row">
                        <div class="col">
                          <div class="col-7">
                            <strong>Valor Sugerido</strong>
                          </div>
                          <div class="col-6">
                            <span class="">{{ g_menu_val_sugerido }}</span>
                          </div>
                        </div>
                        <div class="col">
                          <div class="col"><strong>Valor Desconto</strong></div>
                          <div class="col-6">
                            <span class="">{{ g_menu_val_desconto }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="col">
                            <strong>Valor Total Acessórios</strong>
                          </div>
                          <div class="col">
                            <span class="">{{ g_menu_total_acessorios }}</span>
                          </div>
                        </div>
                        <div class="col">
                          <div class="col">
                            <strong>Tipo de Pagamento</strong>
                          </div>
                          <div class="col-6">
                            <span class="">{{ tipoPagamento }}</span>
                          </div>
                        </div>
                      </div>
                      <div></div>
                      <div>
                        <div class="col">
                          <strong>Valor Total Veículo</strong>
                        </div>
                        <div class="col">
                          <span class="">{{ g_menu_val_veiculo }}</span>
                        </div>
                      </div>
                      <div>
                        <div class="col"><strong>Total Financiado</strong></div>
                        <div class="col">
                          <span class="">{{ Valor_Financiado }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-4">
                  <div class="card">
                    <div class="card-header rf_card_header">
                      Veículo de Troca
                    </div>
                    <div class="rf_card_pdf">
                      <div>
                        <div class="row">
                          <div class="col-6">
                            <div class="col"><strong>Marca</strong></div>
                            <div class="col">
                              <span class="">{{ g_menu_marca_avaliacao }}</span>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="col"><strong>Placa</strong></div>
                            <div class="col">
                              <span class="">{{ g_menu_placa_avaliacao }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="row">
                          <div class="col-6">
                            <div class="col"><strong>Modelo</strong></div>
                            <div class="col">
                              <span class="">{{ g_menu_modelo_avalicao }}</span>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="col"><strong>Ano</strong></div>
                            <div class="col">
                              <span class="">{{
                                g_menu_ano_modelo_avaliacao
                              }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="row">
                          <div class="col-6">
                            <div class="col">
                              <strong>Valor itens Av. (-)</strong>
                            </div>
                            <div class="col">
                              <span class="">{{
                                g_menu_itens_avaliacao_db
                              }}</span>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="col">
                              <strong>Valor itens Av. (+)</strong>
                            </div>
                            <div class="col">
                              <span class="">{{
                                g_menu_itens_avaliacao_cr
                              }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="row">
                          <div class="col-6">
                            <div class="col">
                              <strong>Valor Avaliado</strong>
                            </div>
                            <div class="col">
                              <span class="">{{ g_menu_valor_avaliado }}</span>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="col">
                              <strong>Valor Final Av.</strong>
                            </div>
                            <div class="col">
                              <span class="">{{
                                g_menu_valor_avaliacao_final
                              }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row g-2 p-2">
              <div class="col">
                <div class="card">
                  <div class="card-header rf_card_header">Entrada</div>
                  <div class="rf_card_pdf">
                    <div>
                      <div class="col">
                        <strong> {{ Valor_Entrada_1 }}</strong>
                      </div>
                    </div>
                    <div>
                      <div class="col">
                        <strong> {{ Valor_Entrada_2 }}</strong>
                      </div>
                    </div>
                    <div>
                      <div class="col">
                        <strong> {{ Valor_Entrada_3 }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="card-header rf_card_header">Total Financiado</div>
                  <div class="rf_card_pdf">
                    <div>
                      <div class="col">
                        <strong> {{ Valor_Financiado_1 }}</strong>
                      </div>
                    </div>
                    <div>
                      <div class="col">
                        <strong> {{ Valor_Financiado_2 }}</strong>
                      </div>
                    </div>
                    <div>
                      <div class="col">
                        <strong> {{ Valor_Financiado_3 }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="card-header rf_card_header">
                    {{ parcela_1 }} Meses
                  </div>
                  <div class="rf_card_pdf">
                    <div>
                      <div class="col">
                        <strong> {{ parcela_1_1 }}</strong>
                      </div>
                    </div>
                    <div>
                      <div class="col">
                        <strong> {{ parcela_2_1 }}</strong>
                      </div>
                    </div>
                    <div>
                      <div class="col">
                        <strong> {{ parcela_3_1 }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="card-header rf_card_header">
                    {{ parcela_2 }} Meses
                  </div>
                  <div class="rf_card_pdf">
                    <div>
                      <div class="col">
                        <strong> {{ parcela_1_2 }}</strong>
                      </div>
                    </div>
                    <div>
                      <div class="col">
                        <strong> {{ parcela_2_2 }}</strong>
                      </div>
                    </div>
                    <div>
                      <div class="col">
                        <strong> {{ parcela_3_2 }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="card-header rf_card_header">
                    {{ parcela_3 }} Meses
                  </div>
                  <div class="rf_card_pdf">
                    <div>
                      <div class="col">
                        <strong> {{ parcela_1_3 }}</strong>
                      </div>
                    </div>
                    <div>
                      <div class="col">
                        <strong> {{ parcela_2_3 }}</strong>
                      </div>
                    </div>
                    <div>
                      <div class="col">
                        <strong> {{ parcela_3_3 }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-2 p-2">
              <div class="col">
                <span>
                  * O preço sugerido é válido enquanto durarem os veículos em
                  estoque.</span
                >
                <br />
                <span>** Despesa Operacional para preparação do veículo</span>
                <br />
                <!-- <span>A contratação de seguros é opcional, sendo possível a desistência do
                    contrato em até 7 (sete) dias corridos com a devolução integral do
                    valor pago.</span> -->
                <br />
                <span
                  >É proibido condicionar desconto de bem à aquisição de
                  seguro.</span
                >
                <br />
              </div>
            </div>
            <div class="row g-2 p-2 mt-4">
              <div class="col rf_assinatura">
                <span>Gerente: {{ g_menu_gerente }}</span>
              </div>
              <div class="col rf_assinatura">
                <span>Cliente: {{ g_menu_cliente }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-target="#ModaProposta"
            data-bs-toggle="modal"
          >
            Fechar
          </button>
          <button class="btn btn-secondary" @click="generatePdf">
            IMPRIMIR
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
import { VueMaskDirective } from "vue-the-mask";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import "dayjs/plugin/utc";
import "dayjs/plugin/timezone";

import html2pdf from "html2pdf.js";
import TokenService from "../../services/token.service";
import jwt_decode from "jwt-decode";
import Message from "../../components/modal/Message.vue";
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
import moment from "moment";
import RodapeVue from "../../components/menu/Rodape.vue";
import NavgatorDk from "../../components/menu/NavgatorDk.vue";

export default {
  name: "Usuários",

  components: {
    SidebarVue,
    NavgatorDk,
    Pagination,
    Message,
    apexchart: VueApexCharts,
    RodapeVue,
  },
  directives: {
    mask: VueMaskDirective,
  },
  data() {
    return {
      selectedFilter: "",
      startDate: "",
      endDate: "",
      adicional: "",

      message: "",
      dialog: "",
      abrir_modal: false,
      // info_adicionais: "",

      // linhaSelecionada: null,
      // linhaSelecionada2: null,
      // linhaSelecionada3: null,
      // linhaSelecionada4: null,
      css: null,
      css1: null,
      css2: null,
      css3: null,
      css4: null,
      // btn_avaliacao: true,

      //Tabela Proposta
      id_proposta: "", // Armazena o id da Proposta
      propostas_at: [],
      // itens_veiculo: [],
      // estoque_veiculo: [],
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
      darkMode: false,

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
      pageSizes_1: [
        { value: 10 },
        { value: 25 },
        { value: 50 },
        { value: 75 },
        { value: 100 },
      ],
      pageSize_1: 5,
      //////////////////////
      //Paginação Entrada 2
      page_2: 1,
      totalPages_2: 0,
      totalItems_2: 0,
      pageSizes_2: [
        { value: 10 },
        { value: 25 },
        { value: 50 },
        { value: 75 },
        { value: 100 },
      ],
      pageSize_2: 5,
      //////////////////////

      //Paginação Entrada 3
      page_3: 1,
      totalPages_3: 0,
      totalItems_3: 0,
      pageSizes_3: [
        { value: 10 },
        { value: 25 },
        { value: 50 },
        { value: 75 },
        { value: 100 },
      ],
      pageSize_3: 5,
      //////////////////////

      //Paginação Tabela de Proposta
      page_4: 1,
      totalPages_4: 0,
      totalItems_4: 0,
      pageSizes_4: [
        { value: 10 },
        { value: 25 },
        { value: 50 },
        { value: 75 },
        { value: 100 },
      ],
      pageSize_4: 100,
      //////////////////////

      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [
        { value: 10 },
        { value: 25 },
        { value: 50 },
        { value: 75 },
        { value: 100 },
      ],
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
      cortesia: "",
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
      user_log: "",
      botoes: [
        { id: 1, icone: "bi bi-printer", texto: "Imprimir" },
        { id: 2, icone: "bi bi-file-lock", texto: "Abrir Arquivo" },
      ],

      abrir_modal_reimpressao: false,
      liberar_impressao: true,
      tipoPagamento: "",
      g_menu_fone2: "",
      g_menu_placa: "",
      duplicatas: [],
      item_duplicado: 0,
      janeiro: [
        "01/01",
        "02/01",
        "03/01",
        "04/01",
        "05/01",
        "06/01",
        "07/01",
        "08/01",
        "09/01",
        "10/01",
        "11/01",
        "12/01",
        "13/01",
        "14/01",
        "15/01",
        "16/01",
        "17/01",
        "18/01",
        "19/01",
        "20/01",
        "21/01",
        "22/01",
        "23/01",
        "24/01",
        "25/01",
        "26/01",
        "27/01",
        "28/01",
        "29/01",
        "30/01",
        "31/01",
      ],
      fevereiro: [
        "01/02",
        "02/02",
        "03/02",
        "04/02",
        "05/02",
        "06/02",
        "07/02",
        "08/02",
        "09/02",
        "10/02",
        "11/02",
        "12/02",
        "13/02",
        "14/02",
        "15/02",
        "16/02",
        "17/02",
        "18/02",
        "19/02",
        "20/02",
        "21/02",
        "22/02",
        "23/02",
        "24/02",
        "25/02",
        "26/02",
        "27/02",
        "28/02",
      ],
      marco: [
        "01/03",
        "02/03",
        "03/03",
        "04/03",
        "05/03",
        "06/03",
        "07/03",
        "08/03",
        "09/03",
        "10/03",
        "11/03",
        "12/03",
        "13/03",
        "14/03",
        "15/03",
        "16/03",
        "17/03",
        "18/03",
        "19/03",
        "20/03",
        "21/03",
        "22/03",
        "23/03",
        "24/03",
        "25/03",
        "26/03",
        "27/03",
        "28/03",
        "29/03",
        "30/03",
        "31/03",
      ],
      abril: [
        "01/04",
        "02/04",
        "03/04",
        "04/04",
        "05/04",
        "06/04",
        "07/04",
        "08/04",
        "09/04",
        "10/04",
        "11/04",
        "12/04",
        "13/04",
        "14/04",
        "15/04",
        "16/04",
        "17/04",
        "18/04",
        "19/04",
        "20/04",
        "21/04",
        "22/04",
        "23/04",
        "24/04",
        "25/04",
        "26/04",
        "27/04",
        "28/04",
        "29/04",
        "30/04",
      ],
      maio: [
        "01/05",
        "02/05",
        "03/05",
        "04/05",
        "05/05",
        "06/05",
        "07/05",
        "08/05",
        "09/05",
        "10/05",
        "11/05",
        "12/05",
        "13/05",
        "14/05",
        "15/05",
        "16/05",
        "17/05",
        "18/05",
        "19/05",
        "20/05",
        "21/05",
        "22/05",
        "23/05",
        "24/05",
        "25/05",
        "26/05",
        "27/05",
        "28/05",
        "29/05",
        "30/05",
        "31/05",
      ],
      junho: [
        "01/06",
        "02/06",
        "03/06",
        "04/06",
        "05/06",
        "06/06",
        "07/06",
        "08/06",
        "09/06",
        "10/06",
        "11/06",
        "12/06",
        "13/06",
        "14/06",
        "15/06",
        "16/06",
        "17/06",
        "18/06",
        "19/06",
        "20/06",
        "21/06",
        "22/06",
        "23/06",
        "24/06",
        "25/06",
        "26/06",
        "27/06",
        "28/06",
        "29/06",
        "30/06",
      ],
      julho: [
        "01/07",
        "02/07",
        "03/07",
        "04/07",
        "05/07",
        "06/07",
        "07/07",
        "08/07",
        "09/07",
        "10/07",
        "11/07",
        "12/07",
        "13/07",
        "14/07",
        "15/07",
        "16/07",
        "17/07",
        "18/07",
        "19/07",
        "20/07",
        "21/07",
        "22/07",
        "23/07",
        "24/07",
        "25/07",
        "26/07",
        "27/07",
        "28/07",
        "29/07",
        "30/07",
        "31/07",
      ],
      agosto: [
        "01/08",
        "02/08",
        "03/08",
        "04/08",
        "05/08",
        "06/08",
        "07/08",
        "08/08",
        "09/08",
        "10/08",
        "11/08",
        "12/08",
        "13/08",
        "14/08",
        "15/08",
        "16/08",
        "17/08",
        "18/08",
        "19/08",
        "20/08",
        "21/08",
        "22/08",
        "23/08",
        "24/08",
        "25/08",
        "26/08",
        "27/08",
        "28/08",
        "29/08",
        "30/08",
        "31/08",
      ],
      setembro: [
        "01/09",
        "02/09",
        "03/09",
        "04/09",
        "05/09",
        "06/09",
        "07/09",
        "08/09",
        "09/09",
        "10/09",
        "11/09",
        "12/09",
        "13/09",
        "14/09",
        "15/09",
        "16/09",
        "17/09",
        "18/09",
        "19/09",
        "20/09",
        "21/09",
        "22/09",
        "23/09",
        "24/09",
        "25/09",
        "26/09",
        "27/09",
        "28/09",
        "29/09",
        "30/09",
      ],
      outubro: [
        "01/10",
        "02/10",
        "03/10",
        "04/10",
        "05/10",
        "06/10",
        "07/10",
        "08/10",
        "09/10",
        "10/10",
        "11/10",
        "12/10",
        "13/10",
        "14/10",
        "15/10",
        "16/10",
        "17/10",
        "18/10",
        "19/10",
        "20/10",
        "21/10",
        "22/10",
        "23/10",
        "24/10",
        "25/10",
        "26/10",
        "27/10",
        "28/10",
        "29/10",
        "30/10",
        "31/10",
      ],
      novembro: [
        "01/11",
        "02/11",
        "03/11",
        "04/11",
        "05/11",
        "06/11",
        "07/11",
        "08/11",
        "09/11",
        "10/11",
        "11/11",
        "12/11",
        "13/11",
        "14/11",
        "15/11",
        "16/11",
        "17/11",
        "18/11",
        "19/11",
        "20/11",
        "21/11",
        "22/11",
        "23/11",
        "24/11",
        "25/11",
        "26/11",
        "27/11",
        "28/11",
        "29/11",
        "30/11",
      ],
      dezembro: [
        "01/12",
        "02/12",
        "03/12",
        "04/12",
        "05/12",
        "06/12",
        "07/12",
        "08/12",
        "09/12",
        "10/12",
        "11/12",
        "12/12",
        "13/12",
        "14/12",
        "15/12",
        "16/12",
        "17/12",
        "18/12",
        "19/12",
        "20/12",
        "21/12",
        "22/12",
        "23/12",
        "24/12",
        "25/12",
        "26/12",
        "27/12",
        "28/12",
        "29/12",
        "30/12",
        "31/12",
      ],
      mes_atual: "",

      series: [],
      series_usado: [],

      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "80%",
            endingShape: "rounded",
            dataLabels: {
              position: "center",
            },
          },
        },
        dataLabels: {
          enabled: true,
        },

        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          title: {
            text: "Atendimentos",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
        legend: {
          position: "bottom", // Posição da legenda
          markers: {
            fillColors: [], // Cores correspondentes às séries
          },
        },
      },
    };
  },
  computed: {
    propostasFiltradasNovo() {
      return this.propostas_at.filter((item) => item.tipo_veiculo === 0);
    },
    propostasFiltradasUsado() {
      return this.propostas_at.filter((item) => item.tipo_veiculo === 1);
    },
  },
  created() {
    const accessToken = TokenService.getLocalAccessToken();
    const decodedToken = jwt_decode(accessToken);
    this.empresaID = decodedToken.company;
    const user_log = TokenService.getUser();
    this.user_log = user_log.id;
    this.timestampInicioEdicao = new Date();

  },

  mounted() {
    let dataAtual = new Date();
    let numeroDoMes = dataAtual.getMonth() + 1;
    if (numeroDoMes == 1) {
      this.chartOptions.xaxis.categories = this.janeiro;
    }
    if (numeroDoMes == 2) {
      this.chartOptions.xaxis.categories = this.fevereiro;
    }
    if (numeroDoMes == 3) {
      this.chartOptions.xaxis.categories = this.marco;
    }
    if (numeroDoMes == 4) {
      this.chartOptions.xaxis.categories = this.abril;
    }
    if (numeroDoMes == 5) {
      this.chartOptions.xaxis.categories = this.maio;
    }
    if (numeroDoMes == 6) {
      this.chartOptions.xaxis.categories = this.junho;
    }
    if (numeroDoMes == 7) {
      this.chartOptions.xaxis.categories = this.julho;
    }
    if (numeroDoMes == 8) {
      this.chartOptions.xaxis.categories = this.agosto;
    }
    if (numeroDoMes == 9) {
      this.chartOptions.xaxis.categories = this.setembro;
    }
    if (numeroDoMes == 10) {
      this.chartOptions.xaxis.categories = this.outubro;
    }
    if (numeroDoMes == 11) {
      this.chartOptions.xaxis.categories = this.novembro;
    }
    if (numeroDoMes == 12) {
      this.chartOptions.xaxis.categories = this.dezembro;
    }

    this.getToken();
    this.retrievePropostas();
    this.graficos();
    this.graficos_usados();

    // let darkModeFromStorage = localStorage.getItem("darkMode");
    // this.darkMode = darkModeFromStorage
    //   ? darkModeFromStorage === "true"
    //   : false;
  },
  methods: {
    async graficos() {
      await axios
        .get(`${process.env.VUE_APP_API_URL}grafico`, {
          params: { empresa_id: this.empresaID },
        })
        .then((response) => {
          const dados = response.data;
          console.log(dados);

          // Crie um objeto para armazenar as contagens por dia
          let contagensPorDia = {};

          // Processar cada array de dados
          for (let arrayNome in dados) {
            let arrayDados = dados[arrayNome];

            // Processar cada item no array de dados
            for (let item of arrayDados) {
              let data = moment(item.createdAt).format("YYYY-MM-DD");

              // Inicializar a contagem para esta data, se necessário
              if (!contagensPorDia[data]) {
                contagensPorDia[data] = {};
              }

              // Adicionar a contagem ao total para esta data
              contagensPorDia[data][arrayNome] =
                (contagensPorDia[data][arrayNome] || 0) + item.count;
            }
          }

          // Agora contagensPorDia contém a contagem total de cada tipo de dado para cada dia
          console.log(contagensPorDia);

          // Crie um array com todas as datas do mês atual
          let dataAtual = new Date();
          let primeiroDiaDoMes = new Date(
            dataAtual.getFullYear(),
            dataAtual.getMonth(),
            1
          );
          let ultimoDiaDoMes = new Date(
            dataAtual.getFullYear(),
            dataAtual.getMonth() + 1,
            0
          );

          let datasDoMes = [];
          for (
            let dia = primeiroDiaDoMes;
            dia <= ultimoDiaDoMes;
            dia.setDate(dia.getDate() + 1)
          ) {
            let dataFormatada = new Date(dia).toISOString().slice(0, 10);
            datasDoMes.push(dataFormatada);
          }

          console.log(datasDoMes);
          // Preencha as datas que estão faltando no array com a contagem como 0
          let processarDados = (nomeArray) => {
            return datasDoMes.map((data) => {
              let entradaExistente = contagensPorDia[data]
                ? contagensPorDia[data][nomeArray]
                : 0;
              return entradaExistente;
            });
          };

          // let cliente_novo_novo = datasDoMes.map(data => {
          //     let entradaExistente = contagensPorDia.cliente_novo_novo.find(entrada => entrada.date === moment(data).format('YYYY-MM-DD'));
          //     return entradaExistente ? entradaExistente : {date: moment(data).format('YYYY-MM-DD'), count: 0};
          // });
          // let cliente_retorno_novo = datasDoMes.map(data => {
          //     let entradaExistente = contagensPorDia.cliente_retorno_novo.find(entrada => entrada.date === moment(data).format('YYYY-MM-DD'));
          //     return entradaExistente ? entradaExistente : {date: moment(data).format('YYYY-MM-DD'), count: 0};
          // });

          // let total_atendimentos = datasDoMes.map(data => {
          //     let entradaExistente = contagensPorDia.total_atendimentos.find(entrada => entrada.date === moment(data).format('YYYY-MM-DD'));
          //     return entradaExistente ? entradaExistente : {date: moment(data).format('YYYY-MM-DD'), count: 0};
          // });

          // let venda_finalizada_novo = datasDoMes.map(data => {
          //     let entradaExistente = contagensPorDia.venda_finalizada_novo.find(entrada => entrada.date === moment(data).format('YYYY-MM-DD'));
          //     return entradaExistente ? entradaExistente : {date: moment(data).format('YYYY-MM-DD'), count: 0};
          // });

          // let venda_perdida_novo = datasDoMes.map(data => {
          //     let entradaExistente = contagensPorDia.venda_perdida_novo.find(entrada => entrada.date === moment(data).format('YYYY-MM-DD'));
          //     return entradaExistente ? entradaExistente : {date: moment(data).format('YYYY-MM-DD'), count: 0};
          // });

          // let series = [
          //     {
          //         name: 'Clientes Novos',
          //         data: cliente_novo_novo.map(item => item.count)
          //     },
          //      {
          //        name: 'Clientes Retorno',
          //        data: cliente_retorno_novo.map(item => item.count)
          //      },

          //      {
          //        name: 'Vendas Finalizadas',
          //        data: venda_finalizada_novo.map(item => item.count)
          //      },

          //      {
          //        name: 'Vendas Perdidas',
          //        data: venda_perdida_novo.map(item => item.count)
          //      },
          //      {
          //        name: 'Atendimentos',
          //        data: total_atendimentos.map(item => item.count)
          //      }
          // ];

          let series = [
            {
              name: "Clientes Novos",
              data: processarDados("cliente_novo_novo"),
            },
            {
              name: "Clientes Retorno",
              data: processarDados("cliente_retorno_novo"),
            },
            {
              name: "Vendas Finalizadas",
              data: processarDados("venda_finalizada_novo"),
            },
            {
              name: "Vendas Perdidas",
              data: processarDados("venda_perdida_novo"),
            },
            {
              name: "Atendimentos",
              data: processarDados("total_atendimentos"),
            },
          ];
          console.log(series);
          // Atualizar o gráfico com os novos dados
          this.updateChart(series);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async graficos_usados() {
      await axios
        .get(`${process.env.VUE_APP_API_URL}grafico_usado`, {
          params: { empresa_id: this.empresaID },
        })
        .then((response) => {
          const dados = response.data;
          console.log(dados);

          // Crie um objeto para armazenar as contagens por dia
          let contagensPorDia = {};

          // Processar cada array de dados
          for (let arrayNome in dados) {
            let arrayDados = dados[arrayNome];

            // Processar cada item no array de dados
            for (let item of arrayDados) {
              let data = moment(item.createdAt).format("YYYY-MM-DD");

              // Inicializar a contagem para esta data, se necessário
              if (!contagensPorDia[data]) {
                contagensPorDia[data] = {};
              }

              // Adicionar a contagem ao total para esta data
              contagensPorDia[data][arrayNome] =
                (contagensPorDia[data][arrayNome] || 0) + item.count;
            }
          }

          // Agora contagensPorDia contém a contagem total de cada tipo de dado para cada dia
          console.log(contagensPorDia);

          // Crie um array com todas as datas do mês atual
          let dataAtual = new Date();
          let primeiroDiaDoMes = new Date(
            dataAtual.getFullYear(),
            dataAtual.getMonth(),
            1
          );
          let ultimoDiaDoMes = new Date(
            dataAtual.getFullYear(),
            dataAtual.getMonth() + 1,
            0
          );

          let datasDoMes = [];
          for (
            let dia = primeiroDiaDoMes;
            dia <= ultimoDiaDoMes;
            dia.setDate(dia.getDate() + 1)
          ) {
            let dataFormatada = new Date(dia).toISOString().slice(0, 10);
            datasDoMes.push(dataFormatada);
          }

          console.log(datasDoMes);
          // Preencha as datas que estão faltando no array com a contagem como 0
          let processarDados = (nomeArray) => {
            return datasDoMes.map((data) => {
              let entradaExistente = contagensPorDia[data]
                ? contagensPorDia[data][nomeArray]
                : 0;
              return entradaExistente;
            });
          };

          // let cliente_novo_novo = datasDoMes.map(data => {
          //     let entradaExistente = contagensPorDia.cliente_novo_novo.find(entrada => entrada.date === moment(data).format('YYYY-MM-DD'));
          //     return entradaExistente ? entradaExistente : {date: moment(data).format('YYYY-MM-DD'), count: 0};
          // });
          // let cliente_retorno_novo = datasDoMes.map(data => {
          //     let entradaExistente = contagensPorDia.cliente_retorno_novo.find(entrada => entrada.date === moment(data).format('YYYY-MM-DD'));
          //     return entradaExistente ? entradaExistente : {date: moment(data).format('YYYY-MM-DD'), count: 0};
          // });

          // let total_atendimentos = datasDoMes.map(data => {
          //     let entradaExistente = contagensPorDia.total_atendimentos.find(entrada => entrada.date === moment(data).format('YYYY-MM-DD'));
          //     return entradaExistente ? entradaExistente : {date: moment(data).format('YYYY-MM-DD'), count: 0};
          // });

          // let venda_finalizada_novo = datasDoMes.map(data => {
          //     let entradaExistente = contagensPorDia.venda_finalizada_novo.find(entrada => entrada.date === moment(data).format('YYYY-MM-DD'));
          //     return entradaExistente ? entradaExistente : {date: moment(data).format('YYYY-MM-DD'), count: 0};
          // });

          // let venda_perdida_novo = datasDoMes.map(data => {
          //     let entradaExistente = contagensPorDia.venda_perdida_novo.find(entrada => entrada.date === moment(data).format('YYYY-MM-DD'));
          //     return entradaExistente ? entradaExistente : {date: moment(data).format('YYYY-MM-DD'), count: 0};
          // });

          // let series = [
          //     {
          //         name: 'Clientes Novos',
          //         data: cliente_novo_novo.map(item => item.count)
          //     },
          //      {
          //        name: 'Clientes Retorno',
          //        data: cliente_retorno_novo.map(item => item.count)
          //      },

          //      {
          //        name: 'Vendas Finalizadas',
          //        data: venda_finalizada_novo.map(item => item.count)
          //      },

          //      {
          //        name: 'Vendas Perdidas',
          //        data: venda_perdida_novo.map(item => item.count)
          //      },
          //      {
          //        name: 'Atendimentos',
          //        data: total_atendimentos.map(item => item.count)
          //      }
          // ];

          let series = [
            {
              name: "Clientes Novos",
              data: processarDados("cliente_novo_novo"),
            },
            {
              name: "Clientes Retorno",
              data: processarDados("cliente_retorno_novo"),
            },
            {
              name: "Vendas Finalizadas",
              data: processarDados("venda_finalizada_novo"),
            },
            {
              name: "Vendas Perdidas",
              data: processarDados("venda_perdida_novo"),
            },
            {
              name: "Atendimentos",
              data: processarDados("total_atendimentos"),
            },
          ];
          console.log(series);
          // Atualizar o gráfico com os novos dados
          this.updateChart_usado(series);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async redirecionar(id){
      try{
        await this.atualizar_gerente(id);
        this.$router.push(`/desk/menu/proposta/${id}`);
      }catch(error){
        console.error('Erro ao atualizar os dados:', error);
      }
    },
    async atualizar_gerente(id){
        try{
          await fetch(
          `${process.env.VUE_APP_API_URL}proposta_update_gerente/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gerente_id: this.user_log,
            }),
          }
        )
        }catch (error) {
        console.error('Erro ao atualizar os dados:', error);
        throw error; // Lance o erro para ser capturado no handleClick
      }
    },

    updateChart(series) {
      // Atualizar as opções do gráfico com os novos dados
      this.series = series;
    },
    updateChart_usado(series) {
      // Atualizar as opções do gráfico com os novos dados
      this.series_usado = series;
    },
    async reimprimirMenu(item) {
      //console.log(`Botão "${item}" foi clicado.`);
      this.abrir_modal_reimpressao = true;
      setTimeout(() => (this.liberar_impressao = false), 5000);
      try {
        const id = item;

        const response = await fetch(
          `${process.env.VUE_APP_API_URL}gerar_menu/${id}`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
            }),
          }
        );

        if (!response.ok) {
          throw Error(response.status);
        } else {
          const data = await response.json();
          const createdAt = data?.data?.rows[0]?.createdAt;

          console.log(data);

          const cliente = data?.data?.rows[0]?.clientes || {};
          const veiculo = data?.data?.rows[0]?.proposta_veiculo || {};
          const veiculoAvaliacao = data?.data?.rows[0]?.veiculos_usados || {};

          // Informações do Cliente
          this.g_menu_cliente = cliente.nome ?? "";
          this.g_menu_cpfCnpj = cliente.cpfCnpj ?? "";
          this.g_menu_fone = cliente.tel ?? "";
          this.g_menu_fone2 = cliente.cel ?? "";
          this.g_menu_email = cliente.email ?? "";

          // Informações da Proposta
          this.g_menu_gerente = data?.data?.rows[0]?.gerentes?.username ?? "";
          this.g_menu_vendedor =
            data?.data?.rows[0]?.vendedores?.username ?? "";
          this.g_menu_negociacao = data?.data?.rows[0]?.id ?? "";
          this.g_menu_data_negociacao = createdAt
            ? new Date(createdAt).toLocaleDateString("pt-BR")
            : "";

          // Opções de Compra
          this.g_menu_val_sugerido = this.currency(
            parseFloat(
              data?.data?.rows[0]?.proposta_veiculo.valor_veiculo ?? 0
            ) +
              parseFloat(data?.data?.rows[0]?.custos_variaveis ?? 0) +
              parseFloat(data?.data?.rows[0]?.adicional ?? 0)
          );
          this.g_menu_val_desconto = this.currency(
            data?.data?.rows[0]?.desconto ?? 0
          );
          // this.g_menu_val_veiculo = this.currency(
          //   parseFloat(data?.data?.rows[0]?.val_sugerido_venda ?? 0) +
          //   parseFloat(data?.data?.rows[0]?.custos_variaveis ?? 0) +
          //   parseFloat(data?.data?.rows[0]?.acessorios ?? 0) +
          //   parseFloat(data?.data?.rows[0]?.adicional ?? 0)
          // );
          this.g_menu_val_veiculo = this.currency(
            parseFloat(
              data?.data?.rows[0]?.proposta_veiculo.valor_veiculo ?? 0
            ) +
              parseFloat(data?.data?.rows[0]?.custos_variaveis ?? 0) +
              parseFloat(data?.data?.rows[0]?.adicional ?? 0) -
              parseFloat(data?.data?.rows[0]?.desconto ?? 0)
          );
          this.g_menu_total_financiado = this.currency(
            parseFloat(data?.data?.rows[0]?.val_financiamento ?? 0) +
              parseFloat(data?.data?.rows[0]?.val_entrada_financiamento ?? 0)
          );

          // Dados veiculo compra
          this.g_menu_marca = veiculo.marca ?? "";
          this.g_menu_modelo = veiculo.modelo_veiculo ?? "";
          this.g_menu_cor = veiculo.cor ?? "";
          this.g_menu_chassi = veiculo.chassis ?? "";
          this.g_menu_ano_modelo = veiculo.ano_modelo ?? "";
          this.g_menu_ano_fab = veiculo.ano_fabricacao ?? "";
          this.g_menu_placa = veiculo.placa ?? "";

          // Dados veiculo troca
          this.g_menu_marca_avaliacao =
            veiculoAvaliacao.modeloVeiculo?.familiaVeiculo?.marcaVeiculo
              ?.descricao ?? "";
          this.g_menu_placa_avaliacao = veiculoAvaliacao.placa ?? "";
          this.g_menu_modelo_avaliacao =
            veiculoAvaliacao.modeloVeiculo?.descricao ?? "";
          this.g_menu_ano_modelo_avaliacao = veiculoAvaliacao.anoModelo ?? "";
          this.g_menu_valor_avaliado = this.Valor_Avaliado ?? 0;
          this.g_menu_itens_avaliacao_db = this.Valor_Itens_Avaliacao_db ?? 0;
          this.g_menu_itens_avaliacao_cr = this.Valor_Itens_Avaliacao_cr ?? 0;
          this.g_menu_valor_avaliacao_final = this.Valor_Avaliacao_Final ?? 0;

          // Acessorios
          this.g_menu_total_acessorios = this.Valor_Itens_Acessorios;
          this.itens_acessorios =
            data?.data?.rows[0]?.acessorios_proposta ?? [];

          if (this.incluir_acessorios == true) {
            this.msg = "Valor incluso no financiamento!";
          } else {
            this.msg = "Valor não incluso no financiamento!";
          }
        }

        const menu_gerado = await fetch(
          `${process.env.VUE_APP_API_URL}taxas/resumo_reimpressao`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              proposta_id: id,
            }),
          }
        );

        if (menu_gerado.status == 204) {
          console.log(menu_gerado.status);
          this.abrir_modal_reimpressao = false;
          (this.liberar_impressao = true), (this.abrir_modal = true);
          this.msg = "Nenhum menu foi gerado para esse atendimento!";
          setTimeout(() => (this.abrir_modal = false), 5000);
        } else {
          const resposta = await menu_gerado.json();
          this.Valor_Avaliado = resposta["Valor_Avaliado"];
          this.Valor_Itens_Avaliacao_db = resposta["Valor_Itens_Avaliacao_db"];
          this.Valor_Itens_Avaliacao_cr = resposta["Valor_Itens_Avaliacao_cr"];
          this.Valor_Avaliacao_Final = resposta["Valor_Avaliacao_Final"];

          this.Valor_Financiado = resposta["Valor_Financiado"];

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
          this.parcela_1 = resposta["Parcela1"];
          this.parcela_2 = resposta["Parcela2"];
          this.parcela_3 = resposta["Parcela3"];
        }
      } catch (error) {
        console.log(error.data);
        // this.abrir_modal = true;
        //  // this.msg = error.response.data.message;
        //   setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
    chamar_modal() {
      this.abrir_modal_reimpressao = false;
      this.liberar_impressao = true;
    },
    generatePdf() {
      // console.log("Imprimir ----------------------------------------------------------------------------------------------------------------- 0001")
      const options = {
        margin: [0, 0],
        filename: "meu-pdf.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { format: "a4", orientation: "landscape" },
        pagebreak: { mode: "avoid-all" },
        enableLinks: true,
      };
      setTimeout(() => {
        html2pdf().from(this.$refs.contentToPrint).set(options).save();
      }, 500);
      //html2pdf().from(this.$refs.contentToPrint).set(options).save();
    },
    mostrarBotoes() {
      this.botoesVisiveis = !this.botoesVisiveis;
    },
    acaoBotao(botao) {
      // Adicione a ação desejada para cada botão aqui
      console.log(`Botão "${botao.texto}" foi clicado.`);
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
      if (this.selectedFilter === "Em Atendimento") {
        // console.log("Filtar propostas em atendimento! ------------------------------------------------------------------------------------------------------------------ 0005")
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
      } else if (this.selectedFilter === "Venda Finalizada") {
        // console.log("Filtar propostas em Finalizadas! ------------------------------------------------------------------------------------------------------------------ 0006")
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
      } else if (this.selectedFilter === "Venda Perdida") {
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas perdiadas! ------------------------------------------------------------------------------------------------------------------ 0007")
      } else if (this.selectedFilter === "Todos") {
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas perdiadas! ------------------------------------------------------------------------------------------------------------------ 0007")
      } else if (this.selectedFilter === "Dia") {
        this.status_proposta = this.selectedFilter;
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas
      }
    },
    filterByPeriod() {
      this.data_ini = this.startDate;
      this.data_fim = this.endDate;
      this.status_proposta = "Pesquisa Periodo";
      this.retrievePropostas();
    },

    progressBar() {
      var bar_novos_usados = document.getElementById("clientes_novos_usados");
      bar_novos_usados.style.width = this.qtd_clientes_novos_u + "%";

      var bar_retorno_usados = document.getElementById(
        "clientes_retorno_usados"
      );
      bar_retorno_usados.style.width = this.qtd_clientes_retorno_u + "%";

      var bar_venda_perdidas_usados = document.getElementById(
        "vendas_perdidas_usados"
      );
      bar_venda_perdidas_usados.style.width = this.qtd_vendas_perdidas_u + "%";

      var bar_total_vendas_usados = document.getElementById(
        "total_vendas_usados"
      );
      bar_total_vendas_usados.style.width = this.qtd_vendas_realizadas_u + "%";

      var bar_novos_zero = document.getElementById("clientes_novos_zero");
      bar_novos_zero.style.width = this.qtd_clientes_novos_n + "%";

      var bar_retorno_zero = document.getElementById("clientes_retorno_zero");
      bar_retorno_zero.style.width = this.qtd_clientes_retorno_n + "%";

      var bar_venda_perdidas_zero = document.getElementById(
        "vendas_perdidas_zero"
      );
      bar_venda_perdidas_zero.style.width = this.qtd_vendas_perdidas_n + "%";

      var bar_total_vendas_zero = document.getElementById("total_vendas_zero");
      bar_total_vendas_zero.style.width = this.qtd_vendas_realizadas_n + "%";
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

    async propostas_dia() {
      fetch(`${process.env.VUE_APP_API_URL}propostas_dia`)
        .then((res) => res.json())
        .then((res) => {
          console.log(
            "------------------------------------------------------------------------------------------------------------------ 0019"
          );
          console.log(res);
          this.qtd_clientes_novos_n = res["Clientes_Novos_VN"];
          this.qtd_clientes_retorno_n = res["Clientes_Retorno_VN"];
          this.qtd_vendas_perdidas_n = res["Vendas_Perdidas_VN"];
          this.qtd_vendas_realizadas_n = res["Vendas_Finalizadas_VN"];
          this.qtd_clientes_novos_u = res["Clientes_Novos_VU"];
          this.qtd_clientes_retorno_u = res["Clientes_Retorno_VU"];
          this.qtd_vendas_perdidas_u = res["Vendas_Perdidas_VU"];
          this.qtd_vendas_realizadas_u = res["Vendas_Finalizadas_VU"];

          this.qtd_clientes_novos_n_int = res["Clientes_Novos_VN_INT"];
          this.qtd_clientes_retorno_n_int = res["Clientes_Retorno_VN_INT"];
          this.qtd_vendas_perdidas_n_int = res["Vendas_Perdidas_VN_INT"];
          this.qtd_vendas_realizadas_n_int = res["Vendas_Finalizadas_VN_INT"];
          this.qtd_clientes_novos_u_int = res["Clientes_Novos_VU_INT"];
          this.qtd_clientes_retorno_u_int = res["Clientes_Retorno_VU_INT"];
          this.qtd_vendas_perdidas_u_int = res["Vendas_Perdidas_VU_INT"];
          this.qtd_vendas_realizadas_u_int = res["Vendas_Finalizadas_VU_INT"];
          this.total_vendas_usados = res["total_vendas_usados"];
          this.total_vendas_clientes_novos = res["total_vendas_clientes_novos"];
          this.total_vendas_clientes_retorno =
            res["total_vendas_clientes_retorno"];
          this.total_vendas_perdidas_usados =
            res["total_vendas_perdidas_usados"];
          this.progressBar();
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        });
    },

    async propostas_mes() {
      fetch(`${process.env.VUE_APP_API_URL}propostas_mes`)
        .then((res) => res.json())
        .then((res) => {
          console.log(
            "------------------------------------------------------------------------------------------------------------------0020"
          );
          console.log(res);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        });
    },

    getRequestParamsProposta(
      searchProposta,
      page,
      pageSize,
      empresa_id,
      status_proposta,
      data_ini,
      data_fim,
      tipo_veiculo
    ) {
      let params = {};
      if (searchProposta) {
        params["nome"] = searchProposta;
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
      if (tipo_veiculo) {
        params["tipo_veiculo"] = tipo_veiculo;
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
        this.tipo_veiculo = "NOVO";
        const params = this.getRequestParamsProposta(
          this.searchProposta,
          this.page_4,
          this.pageSize_4,
          this.empresaID,
          this.status_proposta,
          this.data_ini,
          this.data_fim,
          this.tipo_veiculo
        );

        const response = await userService.getPropostaCliente(params);
        console.log("Dados vindo da consulta - 00001 ")
        console.log(response);
     
        const { propostas } = response.data;
        const propostaIDs = propostas.map((proposta) => proposta.id);
        const quantidadePropostaMenu = await this.getQuantidadePropostaMenu(
          propostaIDs
        );

        //**Verificar se o mesmo veículo está sendo vendido e avisar ou se o mesmo já foi vendido não deixar finalizar a venda */
        const verificar_veiculo = await axios.get(
          `${process.env.VUE_APP_API_URL}proposta_menu_duplicatas`,
          {
            params,
          }
        );
        console.log(verificar_veiculo.data);
        this.duplicatas = verificar_veiculo.data;

        let array_proposta_2 = [];
        let tempo_espera;
        let tempo_atendimento;
        let segundos_chegada;
        let minutos_chegada;
        let horas_chegada;
        let segundos_atendimento;
        let minutos_atendimento;
        let horas_atendimento;
        let diferenca_chegada;
        let diferenca_atendimento;
        let gerente;
        let status;

        const now = new Date();
        const hora_server = new Date(
          now.getFullYear() +
            "-" +
            (now.getMonth() + 1) +
            "-" +
            now.getDate() +
            " " +
            now.getHours() +
            ":" +
            now.getMinutes() +
            ":" +
            now.getSeconds()
        );

        for await (const proposta of propostas) {
          const horario_chegada = new Date(proposta["horario_chegada"]);
          const horario_ini_atendimento = new Date(
            proposta["horario_inicio_atendimento"]
          );
          const hora_inicio = new Date(
            horario_ini_atendimento.getFullYear() +
              "-" +
              (horario_ini_atendimento.getMonth() + 1) +
              "-" +
              horario_ini_atendimento.getUTCDate() +
              " " +
              horario_ini_atendimento.getUTCHours() +
              ":" +
              horario_ini_atendimento.getMinutes() +
              ":" +
              horario_ini_atendimento.getSeconds()
          );
          const hora_chegada = new Date(
            horario_chegada.getFullYear() +
              "-" +
              (horario_chegada.getMonth() + 1) +
              "-" +
              horario_chegada.getUTCDate() +
              " " +
              horario_chegada.getUTCHours() +
              ":" +
              horario_chegada.getMinutes() +
              ":" +
              horario_chegada.getSeconds()
          );
          const createdAtDate = new Date(proposta["createdAt"]);
          const formattedCreatedAt = `${createdAtDate.getDate()}/${
            createdAtDate.getMonth() + 1
          }/${createdAtDate.getFullYear()}`;

          status = "";

          console.log(verificar_veiculo.data.length);
          if (verificar_veiculo.data.length > 0) {
            console.log("Existe dados duplicados");

            for (const verificarItem of verificar_veiculo.data) {
              if (verificarItem.id_proposta_1 == proposta.id) {
                this.item_duplicado = 1;
              }
            }
          }

          if (proposta["status_proposta"] === "Atendimento") {
            diferenca_atendimento = Math.abs(
              hora_server.getTime() - hora_inicio.getTime()
            );
            segundos_atendimento = parseInt(
              (diferenca_atendimento / 1000) % 100
            );
            minutos_atendimento = parseInt(
              (diferenca_atendimento / (1000 * 60)) % 60
            );
            horas_atendimento = parseInt(
              diferenca_atendimento / (1000 * 60 * 60)
            );
            horas_atendimento =
              horas_atendimento < 10
                ? "0" + horas_atendimento
                : horas_atendimento;
            minutos_atendimento =
              minutos_atendimento < 10
                ? "0" + minutos_atendimento
                : minutos_atendimento;
            segundos_atendimento =
              segundos_atendimento < 10
                ? "0" + segundos_atendimento
                : segundos_atendimento;

            tempo_espera = "00:00";
            tempo_atendimento = horas_atendimento + ":" + minutos_atendimento;

            if (diferenca_atendimento > 2700000) {
              this.css1 = "cor_atendimento_apos_45min";
              status = "Atendimento Excedido";
            } else {
              this.css = "cor_atendimento";
              status = "Atendimento";
            }
          }

          if (proposta["status_proposta"] === "Aguardando Atendimento") {
            diferenca_chegada = Math.abs(
              hora_server.getTime() - hora_chegada.getTime()
            );
            segundos_chegada = parseInt((diferenca_chegada / 1000) % 100);
            minutos_chegada = parseInt((diferenca_chegada / (1000 * 60)) % 60);
            horas_chegada = parseInt(diferenca_chegada / (1000 * 60 * 60));
            horas_chegada =
              horas_chegada < 10 ? "0" + horas_chegada : horas_chegada;
            minutos_chegada =
              minutos_chegada < 10 ? "0" + minutos_chegada : minutos_chegada;
            segundos_chegada =
              segundos_chegada < 10 ? "0" + segundos_chegada : segundos_chegada;

            tempo_espera = horas_chegada + ":" + minutos_chegada;
            tempo_atendimento = "00:00";

            this.css2 = "cor_aguardando_atendimento";
            status = "Aguardando Atendimento";
          }

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

          // Adicione a quantidade da proposta_menu com base no id da proposta
          const quantidade =
            quantidadePropostaMenu.find((item) => item.id == proposta.id)
              ?.quantidade || 0;
          // const quantidade = quantidadePropostaMenu.find((item) => {
          //     console.log('item.id:', item.id); // Imprime o valor de item.id para depurar
          //     return item.id === proposta.id;
          //   })?.quantidade || 0;

          let tempo_total = proposta["total_tempo_atendimento"];

          if (tempo_total == null) {
            tempo_total = "00:00:00";
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
            percentual_lucro: parseFloat(
              (proposta["lucro_operacional"] / proposta["val_sugerido_venda"]) *
                100
            ).toFixed(2),
            monetario_margem: this.currency(proposta["lucro_final"]),
            percentual_margem: parseFloat(
              (proposta["lucro_final"] / proposta["val_sugerido_venda"]) * 100
            ).toFixed(2),
            modelo: proposta["proposta_veiculo"]
              ? proposta["proposta_veiculo"]["modelo_veiculo"]
              : "N/A",
            tempo_espera: tempo_espera,
            tempo_atendimento: tempo_atendimento,
            total_atendimento: tempo_total, // Utilize o valor retornado pelo servidor

            gerados: "",
            motivo_perda: "",
            horas_chegada: horas_chegada,
            minutos_chegada: minutos_chegada,
            segundos_chegada: segundos_chegada,
            horas_atendimento: horas_atendimento,
            minutos_atendimento: minutos_atendimento,
            segundos_atendimento: segundos_atendimento,

            cpfCnpj: proposta["clientes"]["cpfCnpj"],
            nome: proposta["clientes"]["nome"],
            email: proposta["clientes"]["email"],
            tel: proposta["clientes"]["tel"],
            quantidade_proposta_menu: quantidade,
            tipo_veiculo: proposta["tipo_veiculo"],
            data_atendimento: formattedCreatedAt,
          };

          array_proposta_2.push(array_proposta_1);
        }
        console.log(array_proposta_2);
        // Atualiza a tabela somente uma vez após o processamento
        this.propostas_at = array_proposta_2;
        this.validando_tempo();
      } catch (error) {
        console.log(error);
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
