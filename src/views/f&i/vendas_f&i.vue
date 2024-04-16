<template>
  <SidebarVue ref="sidebar" />
  <NavgatorFI
    ref="navgator"
    :barraTitulo="' F&I - Vendas'"
    :titulo="'vendas'"
  />

  <!--Bloco do Filtro-->
  <div class="card card-filtro">
    <div
      class="modal fade"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel">
              Modal 1
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Show a second modal and hide this one with the button below.
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary"
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
            >
              Open second modal
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModalToggle2"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              Modal 2
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Hide this modal and show the first with the button below.
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
            >
              Back to first
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      class="btn btn-primary"
      data-bs-target="#exampleModalToggle"
      data-bs-toggle="modal"
    >
      Open first modal
    </button>

    <div class="row g-2 p-2">
      <div class="card-title gy-4">
        <i class="bi bi-funnel fs-5 icone_filtro"
          ><span class="texto_filtro">Filtro</span></i
        >
      </div>
    </div>
    <div class="row g-2 p-2">
      <div class="col-2">
        <div class="d-flex justify-content-between mb-3">
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
      </div>
      <div v-if="selectedFilter === 'Pesquisar por Período'">
        <div class="input-group">
          <input type="date" class="form-control" v-model="startDate" />
          <span class="input-group-text">até</span>
          <input type="date" class="form-control" v-model="endDate" />
          <button class="btn btn-secondary" @click="filterByPeriod">
            Filtrar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="card card-tabela g-2 p-2 rf_margin">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col">Nº Atendimento</th>
          <th scope="col">Vendedor</th>
          <th scope="col">Cliente</th>
          <th scope="col">Veículo</th>
          <th scope="col">Data</th>
          <th scope="col">Status</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in vendas" :key="item.id" class="table-linha">
          <td>{{ item.atendimento_id }}</td>
          <td>{{ item.pos_venda_proposta.vendedores.username }}</td>
          <td>{{ item.pos_venda_proposta.clientes.nome }}</td>
          <td>{{ item.pos_venda_proposta.proposta_veiculo.modelo_veiculo }}</td>
          <td>{{ item.createdAt }}</td>
          <td>{{ item.status }}</td>
          <td>
            <button
              class="dropdown-toggle-icon"
         
              :disabled="
                item.status == 'F&I Finalizado' || item.status == 'F&I Perdido'
              "
            >
              
              <router-link
                class="nav-link active"
                :to="`/f&i/vendas_fei_detalhe/${item.id}`"
              >
              <i class="bi bi bi-basket"></i>
              </router-link>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pagination
        v-if="vendas.length"
        :offset="totalPages"
        :total="totalItems"
        :limit="pageSize"
        @change-page="handlePageChange"
      /> -->
  </div>
  <!--Modal Vendas F&I-->
  <div
    class="modal modal-vendas fade"
    id="ModalFI"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="card modal-content rf_texto">
        <div class="modal-header nav-vendas">
          <nav class="navbar navbar-expand-lg">
            <i class="bi bi-gear dd-fonte-navgator"> F&I - Atendimento</i>
          </nav>
        </div>
        <div class="modal-body">
          <!--Dados do Atendimento-->
          <div class="card card-vendas">
            <div class="row g-2 p-2">
              <div class="card-title gy-4">
                <i class="bi bi-journal-text fs-5 icone_filtro"
                  ><span class="texto_filtro"
                    ><strong>Dados do Atendimento</strong></span
                  ></i
                >
              </div>
            </div>
            <div class="row g-2 p-2">
              <div class="col-2">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="n_atendimento"
                  />
                  <label class="rf_texto">Nº Atendimento</label>
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
            </div>
          </div>
          <!--Dados do Veículo-->
          <div class="card card-vendas">
            <div class="row g-2 p-2">
              <div class="card-title gy-4">
                <i class="bi bi-journal-text fs-5 icone_filtro"
                  ><span class="texto_filtro"
                    ><strong>Dados do Veículo</strong></span
                  ></i
                >
              </div>
            </div>
            <div class="row g-2 p-2">
              <div class="col-2">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="marca"
                  />
                  <label class="rf_texto">Marca</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="modelo"
                  />
                  <label class="rf_texto">Modelo</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="cor"
                  />
                  <label class="rf_texto">Cor</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="placa"
                  />
                  <label class="rf_texto">Placa</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="chassi"
                  />
                  <label class="rf_texto">Chassi</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="ano_fabricacao"
                  />
                  <label class="rf_texto">Ano Fabricação</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="ano_modelo"
                  />
                  <label class="rf_texto">Ano Modelo</label>
                </div>
              </div>
            </div>
          </div>
          <!--Dados do Financiamento-->
          <div class="card card-vendas">
            <div class="row g-2 p-2">
              <div class="card-title gy-4">
                <i class="bi bi-journal-text fs-5 icone_filtro"
                  ><span class="texto_filtro"
                    ><strong>Dados do Financiamento</strong></span
                  ></i
                >
              </div>
            </div>
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="total_entrada"
                  />
                  <label class="rf_texto">Total Entrada</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="total_financiado"
                  />
                  <label class="rf_texto">Total Financiamento</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="valor_parcela"
                  />
                  <label class="rf_texto">Valor Parcela</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="qtd_parcela"
                  />
                  <label class="rf_texto">Qtd. Parcela</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="retorno"
                  />
                  <label class="rf_texto">Retorno</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="coeficiente"
                  />
                  <label class="rf_texto">Coeficiente</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    disabled
                    class="form-control rf_bg_form rf_texto"
                    v-model="banco"
                  />
                  <label class="rf_texto">Banco</label>
                </div>
              </div>
            </div>
          </div>

          <!--Quadro dos kits-->
          <div v-if="desabilitar_customizacao">
            <div class="row">
              <!--Quadro Ouro-->
              <div class="card card-ouro col">
                <i class="bi bi-gem card-texto-vendas-ouro"> Pacote Ouro</i>
                <!--Acessórios-->
                <div class="row">
                  <div class="col mt-3"><strong>Acessórios</strong></div>
                  <div class="col-1">
                    <ul class="nav nav-item justify-content-end">
                      <li class="nav-item dropdown">
                        <button
                          class="btn-card-ouro"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <ul
                          class="btn-kits-ouro dropdown-menu dropdown-menu-end"
                        >
                          <!-- Conteúdo do dropdown -->
                          <li
                            class="nav-item"
                            v-for="item in itens_kit_acessorios_ouro"
                            :key="item.id"
                          >
                            <strong
                              ><i class="bi bi-check2-circle p-2">
                                {{ item.descricao }}</i
                              ></strong
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Revisão-->
                <div class="row">
                  <div class="col mt-3"><strong>Revisão pré-paga</strong></div>
                  <div class="col-1">
                    <ul class="nav nav-item justify-content-end">
                      <li class="nav-item dropdown">
                        <button
                          class="btn-card-ouro"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <ul
                          class="btn-kits-ouro dropdown-menu dropdown-menu-end"
                        >
                          <!-- Conteúdo do dropdown -->
                          <li
                            class="nav-item"
                            v-for="item in itens_kit_revisoes_ouro"
                            :key="item.id"
                          >
                            <strong
                              ><i class="bi bi-check2-circle p-2">
                                {{ item.descricao }}</i
                              ></strong
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Seguros-->
                <div class="row">
                  <div class="col mt-3"><strong>Seguros</strong></div>
                  <div class="col-1">
                    <ul class="nav nav-item justify-content-end">
                      <li class="nav-item dropdown">
                        <button
                          class="btn-card-ouro"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <ul
                          class="btn-kits-ouro dropdown-menu dropdown-menu-end"
                        >
                          <!-- Conteúdo do dropdown -->
                          <li
                            class="nav-item"
                            v-for="item in itens_kit_seguros_ouro"
                            :key="item.id"
                          >
                            <strong
                              ><i class="bi bi-check2-circle p-2">
                                {{ item.descricao }}</i
                              ></strong
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Valor-->
                <div class="txt-card-valor"><strong>Valor</strong></div>
                <div class="valor-card-ouro">
                  <strong>{{ this.currency(this.valor_pacote_ouro) }}</strong>
                </div>
              </div>
              <!--Quadro Prata-->
              <div class="card card-prata col">
                <i class="bi bi-gem card-texto-vendas-prata"> Pacote Prata</i>
                <!--Acessórios-->
                <div class="row">
                  <div class="col mt-3"><strong>Acessórios</strong></div>
                  <div class="col-1">
                    <ul class="nav nav-item justify-content-end">
                      <li class="nav-item dropdown">
                        <button
                          class="btn-card-prata"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <ul
                          class="btn-kits-prata dropdown-menu dropdown-menu-end"
                        >
                          <li
                            class="nav-item"
                            v-for="item in itens_kit_acessorios_prata"
                            :key="item.id"
                          >
                            <strong
                              ><i class="bi bi-check2-circle p-2">
                                {{ item.descricao }}</i
                              ></strong
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Revisão-->
                <div class="row">
                  <div class="col mt-3"><strong>Revisão pré-paga</strong></div>
                  <div class="col-1">
                    <ul class="nav nav-item justify-content-end">
                      <li class="nav-item dropdown">
                        <button
                          class="btn-card-prata"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <ul
                          class="btn-kits-prata dropdown-menu dropdown-menu-end"
                        >
                          <li
                            class="nav-item"
                            v-for="item in itens_kit_revisoes_prata"
                            :key="item.id"
                          >
                            <strong
                              ><i class="bi bi-check2-circle p-2">
                                {{ item.descricao }}</i
                              ></strong
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Seguros-->
                <div class="row">
                  <div class="col mt-3"><strong>Seguros</strong></div>
                  <div class="col-1">
                    <ul class="nav nav-item justify-content-end">
                      <li class="nav-item dropdown">
                        <button
                          class="btn-card-prata"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <ul
                          class="btn-kits-prata dropdown-menu dropdown-menu-end"
                        >
                          <!-- Conteúdo do dropdown -->
                          <li
                            class="nav-item"
                            v-for="item in itens_kit_seguros_prata"
                            :key="item.id"
                          >
                            <strong
                              ><i class="bi bi-check2-circle p-2">
                                {{ item.descricao }}</i
                              ></strong
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Valor-->
                <div class="txt-card-valor"><strong>Valor</strong></div>
                <div class="valor-card-prata">
                  <strong>{{ this.currency(this.valor_pacote_prata) }}</strong>
                </div>
              </div>
              <!--Quadro Bronze-->
              <div class="card card-bronze col">
                <i class="bi bi-gem card-texto-vendas-bronze"> Pacote Bronze</i>
                <!--Acessórios-->
                <div class="row">
                  <div class="col mt-3"><strong>Acessórios</strong></div>
                  <div class="col-1">
                    <ul class="nav nav-item justify-content-end">
                      <li class="nav-item dropdown">
                        <button
                          class="btn-card-bronze"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <ul
                          class="btn-kits-bronze dropdown-menu dropdown-menu-end"
                        >
                          <!-- Conteúdo do dropdown -->
                          <li
                            class="nav-item"
                            v-for="item in itens_kit_acessorios_bronze"
                            :key="item.id"
                          >
                            <strong
                              ><i class="bi bi-check2-circle p-2">
                                {{ item.descricao }}</i
                              ></strong
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Revisão-->
                <div class="row">
                  <div class="col mt-3"><strong>Revisão pré-paga</strong></div>
                  <div class="col-1">
                    <ul class="nav nav-item justify-content-end">
                      <li class="nav-item dropdown">
                        <button
                          class="btn-card-bronze"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <ul
                          class="btn-kits-bronze dropdown-menu dropdown-menu-end"
                        >
                          <!-- Conteúdo do dropdown -->
                          <li
                            class="nav-item"
                            v-for="item in itens_kit_revisoes_bronze"
                            :key="item.id"
                          >
                            <strong
                              ><i class="bi bi-check2-circle p-2">
                                {{ item.descricao }}</i
                              ></strong
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Seguros-->
                <div class="row">
                  <div class="col mt-3"><strong>Seguros</strong></div>
                  <div class="col-1">
                    <ul class="nav nav-item justify-content-end">
                      <li class="nav-item dropdown">
                        <button
                          class="btn-card-bronze"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <ul
                          class="btn-kits-bronze dropdown-menu dropdown-menu-end"
                        >
                          <!-- Conteúdo do dropdown -->
                          <li
                            class="nav-item"
                            v-for="item in itens_kit_seguros_bronze"
                            :key="item.id"
                          >
                            <strong
                              ><i class="bi bi-check2-circle p-2">
                                {{ item.descricao }}</i
                              ></strong
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Valor-->
                <div class="txt-card-valor"><strong>Valor</strong></div>
                <div class="valor-card-bronze">
                  <strong>{{ this.currency(this.valor_pacote_bronze) }}</strong>
                </div>
              </div>
              <!--Quadro Customizado-->
              <div class="card card-customizado col">
                <i class="bi bi-gem card-texto-vendas-customizado">
                  Pacote Customizado</i
                >
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-lg btn-filtro btn-customizado"
                    @click="customizado"
                  >
                    CRIAR PACOTE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--Área  de Cadastro do Pacote Personalizado-->
          <div v-if="cadastro">
            <div class="card card-container">
              <div class="row">
                <div class="col-4 d-flex justify-content-center">
                  <div class="card-kit">
                    <div class="card-icon">
                      <i class="bi bi-tools fs-5 icone_filtro"></i>
                      <div class="input-group-append">
                        <button
                          class="btn btn-lg btn-filtro"
                          data-bs-target="#ModalItensAcessorios"
                          data-bs-toggle="modal"                          
                          :disabled="this.habilitar_kits"
                          @click="habilitar_itens_acessorio"
                        >
                          <span class="rf_texto_btn">Incluir</span><br />
                          <span class="rf_texto_btn">Acessórios</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-4 d-flex justify-content-center">
                  <div class="card-kit">
                    <div class="card-icon">
                      <i class="bi bi-journal-text fs-5 icone_filtro"></i>
                      <div class="input-group-append">
                        <button
                          class="btn btn-lg btn-filtro"
                          data-bs-target="#ModalItensSeguros"
                          data-bs-toggle="modal"
                          type="button"
                          :disabled="this.habilitar_kits"
                          @click="habilitar_itens_seguros"
                        >
                          <span class="rf_texto_btn">Incluir</span><br />
                          <span class="rf_texto_btn">Seguros</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-4 d-flex justify-content-center">
                  <div class="card-kit">
                    <div class="card-icon">
                      <i class="bi bi-speedometer2 fs-5 icone_filtro"></i>
                      <div class="input-group-append">
                        <button
                          class="btn btn-lg btn-filtro"
                          data-bs-target="#ModalItensRevisao"
                          data-bs-toggle="modal"
                          type="button"
                          :disabled="this.habilitar_kits"
                          @click="habilitar_itens_revisao"
                        >
                          <span class="rf_texto_btn">Incluir</span><br />
                          <span class="rf_texto_btn">Revisão</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--Tabelas com os itens dos kits-->
            <div class="card card-vendas g-2 p-2">
              <div class="card-title gy-4">
                <i class="bi bi-tools fs-5 icone_kit"
                  ><span class="texto_kit">Acessórios</span></i
                >
              </div>
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col" style="width: 10%">Código</th>
                    <th scope="col" style="width: 45%">Descrição</th>
                    <th scope="col" style="width: 10%">Preço</th>

                    <th scope="col" style="width: 5%">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in itens_kit_acessorios"
                    :key="item.id"
                    class="table-linha"
                  >
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.descricao }}</td>
                    <td>{{ this.currency(item.preco) }}</td>
                    <td style="display: flex">
                      <button
                        @click="exibirModalConfirmacao(item)"
                        data-bs-target="#confirmModal"
                        data-bs-toggle="modal"
                        class="dropdown-toggle-icon p-1"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button
                        class="dropdown-toggle-icon"
                        data-bs-target="#excluiModal"
                        data-bs-toggle="modal"
                        @click="remover_item_acessorio(item)"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card card-vendas g-2 p-2 mt-2">
              <div class="card-title gy-4">
                <i class="bi bi-journal-text fs-5 icone_kit"
                  ><span class="texto_kit">Seguros</span></i
                >
              </div>
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col" style="width: 10%">Código</th>
                    <th scope="col" style="width: 45%">Descrição</th>
                    <th scope="col" style="width: 10%">Preço</th>
                    <th scope="col" style="width: 5%">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in itens_kit_seguros"
                    :key="item.id"
                    class="table-linha"
                  >
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.descricao }}</td>
                    <td>{{ this.currency(item.preco) }}</td>

                    <td style="display: flex">
                      <button
                        @click="exibirModalConfirmacaoSeguro(item)"
                        data-bs-target="#confirmModalSeguro"
                        data-bs-toggle="modal"
                        class="dropdown-toggle-icon p-1"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button
                        class="dropdown-toggle-icon"
                        data-bs-target="#excluiModalSeguro"
                        data-bs-toggle="modal"
                        @click="remover_item_seguro(item)"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card card-vendas g-2 p-2 mt-2">
              <div class="card-title gy-4">
                <i class="bi bi-speedometer2 fs-5 icone_kit"
                  ><span class="texto_kit">Revisão Programada</span></i
                >
              </div>
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col" style="width: 10%">Código</th>
                    <th scope="col" style="width: 45%">Descrição</th>
                    <th scope="col" style="width: 10%">Preço</th>
                    <th scope="col" style="width: 5%">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in itens_kit_revisoes"
                    :key="item.id"
                    class="table-linha"
                  >
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.descricao }}</td>
                    <td>{{ this.currency(item.preco) }}</td>
                    <td style="display: flex">
                      <button
                        @click="exibirModalConfirmacaoRevisao(item)"
                        data-bs-target="#confirmModalRevisao"
                        data-bs-toggle="modal"
                        class="dropdown-toggle-icon p-1"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button
                        class="dropdown-toggle-icon"
                        data-bs-target="#excluiModalRevisao"
                        data-bs-toggle="modal"
                        @click="remover_item_revisao(item)"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card card-vendas g-2 p-2 mt-2">
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col" style="width: 10%" class="rf_texto_tabela">
                      Total
                    </th>
                    <th
                      scope="col"
                      style="width: 45%"
                      class="rf_texto_tabela"
                    ></th>
                    <th scope="col" style="width: 10%" class="rf_texto_tabela">
                      {{ this.currency(this.total_preco) }}
                    </th>
                    <th
                      scope="col"
                      style="width: 5%"
                      class="rf_texto_tabela"
                    ></th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          <div v-if="habilitar_customizacao">
            <!--Informação F&I-->
            <div class="card card-vendas">
              <div class="row g-2 p-2">
                <div class="col-6">
                  <div class="card-title gy-4">
                    <i class="bi bi-journal-text fs-5 icone_filtro"
                      ><span class="texto_filtro"
                        ><strong>Informações F&I</strong></span
                      ></i
                    >
                  </div>
                </div>
                <div class="col-6" style="padding-left: 20px">
                  <div class="card-title gy-4">
                    <div class="form-check form-switch rf_texto mt-3">
                      <input
                        class="form-check-input g-5"
                        type="checkbox"
                        role="switch"
                        v-model="cadastro"
                      />
                      <label class="form-check-label">Mostrar cadastro</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="row g-2 p-2">
                    <div class="col">
                      <div class="form-floating">
                        <input
                          type="text"
                          disabled
                          class="form-control rf_bg_form rf_texto"
                          v-model="valor_financiar"
                        />
                        <label class="rf_texto">Valor a Financiar</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-floating">
                        <input
                          type="text"
                          disabled
                          class="form-control rf_bg_form rf_texto"
                          v-model="valor_pacote_selecionado"
                        />
                        <label class="rf_texto">Valor Pacote</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-floating">
                        <input
                          type="text"
                          disabled
                          class="form-control rf_bg_form rf_texto"
                          v-model="total_financiamento_selecionado"
                        />
                        <label class="rf_texto">Total Financiamento</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-floating">
                        <input
                          type="text"
                          disabled
                          class="form-control rf_bg_form rf_texto"
                          v-model="valor_parcela_selecionada"
                        />
                        <label class="rf_texto">Valor Parcela</label>
                      </div>
                    </div>
                  </div>
                  <table class="table rf_texto">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style="width: 10%"
                          class="rf_texto_tabela"
                        >
                          Pacote Customizado
                        </th>

                        <!--Parcela 1-->
                        <th
                          scope="col"
                          style="width: 5%"
                          class="rf_texto_tabela"
                        >
                          <div class="form-floating">
                            <select
                              class="form-select rf_bg_form rf_texto"
                              v-model="parcela"
                            >
                              <option
                                v-for="item in itens_financiamento"
                                :value="item.value"
                                :key="item.value"
                              >
                                {{ item.value }}
                              </option>
                            </select>
                            <label for="valid_empresa" class="rf_texto"
                              >Parcela</label
                            >
                          </div>
                        </th>
                        <th
                          scope="col"
                          style="width: 5%"
                          class="rf_texto_tabela"
                        >
                          <div class="form-floating">
                            <select
                              class="form-select rf_bg_form rf_texto"
                              v-model="metodo_pagamento"
                            >
                              <option
                                v-for="item in metodo_pagamento_lista"
                                :value="item.value"
                                :key="item.value"
                              >
                                {{ item.descricao }}
                              </option>
                            </select>
                            <label for="valid_empresa" class="rf_texto"
                              >Pagamento
                            </label>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <!--Primeira Linha-->
                      <tr>
                        <td>
                          <div class="d-grid gap-2">
                            <button
                              type="button"
                              class="btn btn-lg btn-desk-filtro rf_texto_btn"
                              :class="{ active: pmtSelected === 4 }"
                              @click="select_pmt(parcela_customizado, 4)"
                            >
                              {{ this.currency(parcela_customizado) }}
                            </button>
                          </div>
                        </td>

                        <td>
                          <div class="d-grid gap-2">
                            <button
                              class="btn btn-lg btn-desk-filtro"
                              type="button"
                              @click="ranquear_customizado()"
                            >
                              <span class="rf_texto_btn">Ranquear</span>
                            </button>
                          </div>
                        </td>
                        <td>
                          <div class="d-grid gap-2">
                            <button
                              class="btn btn-lg btn-desk-filtro"
                              data-bs-toggle="modal"
                              data-bs-target="#ModalGerarMenu"
                              :disabled="habilitar_gerar_menu"
                              @click="limpar_financiamento"
                            >
                              <span class="rf_texto_btn">Gerar Menu</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="row g-2 p-2">
                    <div class="col">
                      <div class="form-floating">
                        <textarea
                          v-model="observacao"
                          class="form-control rf_bg_form rf_texto"
                          style="height: 110px"
                        ></textarea>
                        <label class="rf_texto">Observações</label>
                      </div>
                    </div>
                  </div>
                </div>
                <!--Quadro Customizado-->
                <div class="col-6">
                  <div class="card card-customizado col">
                    <i class="bi bi-gem card-texto-vendas-customizado">
                      Pacote Customizado</i
                    >
                    <!--Acessórios-->
                    <div class="row">
                      <div class="col mt-3"><strong>Acessórios</strong></div>
                      <div class="col-1">
                        <ul class="nav nav-item justify-content-end">
                          <li class="nav-item dropdown">
                            <button
                              class="btn-card-customizado"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                            >
                              <i class="bi bi-eye"></i>
                            </button>
                            <ul
                              class="btn-kits-customizado dropdown-menu dropdown-menu-end"
                            >
                              <!-- Conteúdo do dropdown -->
                              <li
                                class="nav-item"
                                v-for="item in itens_kit_acessorios_bronze"
                                :key="item.id"
                              >
                                <strong
                                  ><i class="bi bi-check2-circle p-2">
                                    {{ item.descricao }}</i
                                  ></strong
                                >
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!--Revisão-->
                    <div class="row">
                      <div class="col mt-3">
                        <strong>Revisão pré-paga</strong>
                      </div>
                      <div class="col-1">
                        <ul class="nav nav-item justify-content-end">
                          <li class="nav-item dropdown">
                            <button
                              class="btn-card-customizado"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                            >
                              <i class="bi bi-eye"></i>
                            </button>
                            <ul
                              class="btn-kits-customizado dropdown-menu dropdown-menu-end"
                            >
                              <!-- Conteúdo do dropdown -->
                              <li
                                class="nav-item"
                                v-for="item in itens_kit_revisoes_bronze"
                                :key="item.id"
                              >
                                <strong
                                  ><i class="bi bi-check2-circle p-2">
                                    {{ item.descricao }}</i
                                  ></strong
                                >
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!--Seguros-->
                    <div class="row">
                      <div class="col mt-3"><strong>Seguros</strong></div>
                      <div class="col-1">
                        <ul class="nav nav-item justify-content-end">
                          <li class="nav-item dropdown">
                            <button
                              class="btn-card-customizado"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                            >
                              <i class="bi bi-eye"></i>
                            </button>
                            <ul
                              class="btn-kits-customizado dropdown-menu dropdown-menu-end"
                            >
                              <!-- Conteúdo do dropdown -->
                              <li
                                class="nav-item"
                                v-for="item in itens_kit_seguros_bronze"
                                :key="item.id"
                              >
                                <strong
                                  ><i class="bi bi-check2-circle p-2">
                                    {{ item.descricao }}</i
                                  ></strong
                                >
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!--Valor-->
                    <div class="txt-card-valor"><strong>Valor</strong></div>
                    <div class="valor-card-customizado">
                      <strong>{{
                        this.currency(this.valor_pacote_customizado)
                      }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="desabilitar_customizacao">
            <div class="card card-vendas">
              <div class="row g-2 p-2">
                <div class="card-title gy-4">
                  <i class="bi bi-journal-text fs-5 icone_filtro"
                    ><span class="texto_filtro"
                      ><strong>Informações F&I</strong></span
                    ></i
                  >
                </div>
              </div>
              <div class="row g-2 p-2">
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      disabled
                      class="form-control rf_bg_form rf_texto"
                      v-model="valor_financiar"
                    />
                    <label class="rf_texto">Valor a Financiar</label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      disabled
                      class="form-control rf_bg_form rf_texto"
                      v-model="valor_pacote_selecionado"
                    />
                    <label class="rf_texto">Valor Pacote</label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      disabled
                      class="form-control rf_bg_form rf_texto"
                      v-model="total_financiamento_selecionado"
                    />
                    <label class="rf_texto">Total Financiamento</label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      disabled
                      class="form-control rf_bg_form rf_texto"
                      v-model="valor_parcela_selecionada"
                    />
                    <label class="rf_texto">Valor Parcela</label>
                  </div>
                </div>
              </div>
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col" style="width: 10%" class="rf_texto_tabela">
                      Pacote Ouro
                    </th>
                    <th scope="col" style="width: 10%" class="rf_texto_tabela">
                      Pacote Prata
                    </th>
                    <th scope="col" style="width: 10%" class="rf_texto_tabela">
                      Pacote Bronze
                    </th>

                    <!--Parcela 1-->
                    <th scope="col" style="width: 5%" class="rf_texto_tabela">
                      <div class="form-floating">
                        <select
                          class="form-select rf_bg_form rf_texto"
                          v-model="parcela"
                        >
                          <option
                            v-for="item in itens_financiamento"
                            :value="item.value"
                            :key="item.value"
                          >
                            {{ item.value }}
                          </option>
                        </select>
                        <label for="valid_empresa" class="rf_texto"
                          >Parcela</label
                        >
                      </div>
                    </th>
                    <th scope="col" style="width: 5%" class="rf_texto_tabela">
                      <div class="form-floating">
                        <select
                          class="form-select rf_bg_form rf_texto"
                          v-model="metodo_pagamento"
                        >
                          <option
                            v-for="item in metodo_pagamento_lista"
                            :value="item.value"
                            :key="item.value"
                          >
                            {{ item.descricao }}
                          </option>
                        </select>
                        <label for="valid_empresa" class="rf_texto"
                          >Pagamento
                        </label>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <!--Primeira Linha-->
                  <tr>
                    <td>
                      <div class="d-grid gap-2">
                        <button
                          type="button"
                          class="btn btn-lg btn-desk-filtro rf_texto_btn"
                          :class="{ active: pmtSelected === 1 }"
                          @click="select_pmt(parcela_ouro, 1)"
                        >
                          {{ this.currency(parcela_ouro) }}
                        </button>
                      </div>
                    </td>
                    <td>
                      <div class="d-grid gap-2">
                        <button
                          type="button"
                          class="btn btn-lg btn-desk-filtro rf_texto_btn"
                          :class="{ active: pmtSelected === 2 }"
                          @click="select_pmt(parcela_prata, 2)"
                        >
                          {{ this.currency(parcela_prata) }}
                        </button>
                      </div>
                    </td>
                    <td>
                      <div class="d-grid gap-2">
                        <button
                          type="button"
                          class="btn btn-lg btn-desk-filtro rf_texto_btn"
                          :class="{ active: pmtSelected === 3 }"
                          @click="select_pmt(parcela_bronze, 3)"
                        >
                          {{ this.currency(parcela_bronze) }}
                        </button>
                      </div>
                    </td>

                    <td>
                      <div class="d-grid gap-2">
                        <button
                          class="btn btn-lg btn-desk-filtro"
                          type="button"
                          @click="ranquear()"
                        >
                          <span class="rf_texto_btn">Ranquear</span>
                        </button>
                      </div>
                    </td>
                    <td>
                      <div class="d-grid gap-2">
                        <button
                          class="btn btn-lg btn-desk-filtro"
                          data-bs-toggle="modal"
                          data-bs-target="#ModalGerarMenu"
                          :disabled="habilitar_gerar_menu"
                          @click="limpar_financiamento"
                        >
                          <span class="rf_texto_btn">Gerar Menu</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!--Ranqueamento F&I Pacote Ouro-->
          <div v-if="quadro_ouro" class="card card-vendas">
            <div class="row g-2 p-2">
              <div class="card-title gy-4">
                <i class="bi bi-journal-text fs-5 icone_filtro"
                  ><span class="texto_filtro">
                    <strong>Ranqueamento Pacote Ouro</strong></span
                  ></i
                >
              </div>
              <div class="card-title gy-4">
                <i class="bi bi-cash-coin fs-5 icone_filtro"
                  ><span class="texto_filtro"
                    >Valor de Entrada:
                    <strong>{{ total_entrada }}</strong>
                  </span></i
                >
                <i class="bi bi-cash-coin p-3 icone_filtro"
                  ><span class="texto_filtro"
                    >Valor Financiado:
                    <strong>{{ total_financiamento_ouro }}</strong>
                  </span></i
                >
              </div>
            </div>
            <div class="d-flex justify-content-center barra_fei">
              <div class="row">
                <div class="col">
                  <button
                    @click="sortTable('Financeira')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>FINANCEIRA</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Plano')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>PLANO</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Ret')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>RET</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('EntMin')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>R$ ENT MIN</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('EntPer')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>% ENT MIN</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Pmt')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>PMT</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Retorno')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>RETORNO</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('TacCob')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>TAC COB</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('TacDev')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>TAC DEV</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Coef')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>COEF</strong>
                  </button>
                </div>
              </div>
            </div>

            <div class="g-2 p-2 mt-3 rf_margin">
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col">Financeira</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Ret</th>
                    <th scope="col">R$ Ent. Min.</th>
                    <th scope="col">% Ent. Min.</th>
                    <th scope="col">Rentabilidade</th>
                    <th scope="col">Rebate</th>
                    <th scope="col">Pmt</th>
                    <th scope="col">Spf</th>
                    <th scope="col">Retorno</th>
                    <th scope="col">Tac. Cob.</th>
                    <th scope="col">Tac. Dev.</th>
                    <th scope="col">Coef.</th>
                    <th scope="col">Parcela</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :class="
                      item.id === pacoteSelecionadoOuro
                        ? 'custom-highlight-row'
                        : ''
                    "
                    @click="rowSelect_ouro(key, item.id, 1)"
                    v-for="(item, key) in parcelamento_ouro"
                    :key="item.id"
                  >
                    <td>{{ item.financeira }}</td>
                    <td>{{ item.plano }}</td>
                    <td>{{ item.ret }}</td>
                    <td>{{ item.entrada_min_valor }}</td>
                    <td>{{ item.entrada_min_porcentagem }}</td>
                    <td>{{ item.rentabilidade_ouro }}</td>
                    <td>{{ item.Rebate }}</td>
                    <td>{{ item.pmt_ouro }}</td>
                    <td>{{ item.spf }}</td>
                    <td>{{ item.retorno }}</td>
                    <td>{{ item.tc_cob }}</td>
                    <td>{{ item.tc_dev }}</td>
                    <td>{{ item.coeficiente }}</td>
                    <td>{{ item.qtd_parcelas }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pagination
              v-if="parcelamento_ouro.length"
              :offset="totalPages_ouro"
              :total="totalItems_ouro"
              :limit="pageSize_ouro"
              @change-page="handlePageChangeEntradaOuro"
            />
          </div>
          <!--Ranqueamento F&I Pacote Prata-->
          <div v-if="quadro_prata" class="card card-vendas">
            <div class="row g-2 p-2">
              <div class="card-title gy-4">
                <i class="bi bi-journal-text fs-5 icone_filtro"
                  ><span class="texto_filtro">
                    <strong>Ranqueamento Pacote Prata</strong></span
                  ></i
                >
              </div>
              <div class="card-title gy-4">
                <i class="bi bi-cash-coin fs-5 icone_filtro"
                  ><span class="texto_filtro"
                    >Valor de Entrada:
                    <strong>{{ total_entrada }}</strong>
                  </span></i
                >
                <i class="bi bi-cash-coin p-3 icone_filtro"
                  ><span class="texto_filtro"
                    >Valor Financiado:
                    <strong>{{ total_financiamento_prata }}</strong>
                  </span></i
                >
              </div>
            </div>

            <div class="d-flex justify-content-center barra_fei">
              <div class="row">
                <div class="col">
                  <button
                    @click="sortTable('Financeira')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>FINANCEIRA</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Plano')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>PLANO</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Ret')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>RET</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('EntMin')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>R$ ENT MIN</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('EntPer')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>% ENT MIN</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Pmt')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>PMT</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Retorno')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>RETORNO</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('TacCob')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>TAC COB</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('TacDev')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>TAC DEV</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Coef')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>COEF</strong>
                  </button>
                </div>
              </div>
            </div>

            <div class="g-2 p-2 mt-3 rf_margin">
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col">Financeira</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Ret</th>
                    <th scope="col">R$ Ent. Min.</th>
                    <th scope="col">% Ent. Min.</th>
                    <th scope="col">Rentabilidade</th>
                    <th scope="col">Rebate</th>
                    <th scope="col">Pmt</th>
                    <th scope="col">Spf</th>
                    <th scope="col">Retorno</th>
                    <th scope="col">Tac. Cob.</th>
                    <th scope="col">Tac. Dev.</th>
                    <th scope="col">Coef.</th>
                    <th scope="col">Parcela</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :class="
                      item.id === pacoteSelecionadoPrata
                        ? 'custom-highlight-row'
                        : ''
                    "
                    @click="rowSelect_prata(key, item.id, 2)"
                    v-for="(item, key) in parcelamento_prata"
                    :key="item.id"
                  >
                    <td>{{ item.financeira }}</td>
                    <td>{{ item.plano }}</td>
                    <td>{{ item.ret }}</td>
                    <td>{{ item.entrada_min_valor }}</td>
                    <td>{{ item.entrada_min_porcentagem }}</td>
                    <td>{{ item.rentabilidade_prata }}</td>
                    <td>{{ item.Rebate }}</td>
                    <td>{{ item.pmt_prata }}</td>
                    <td>{{ item.spf }}</td>
                    <td>{{ item.retorno }}</td>
                    <td>{{ item.tc_cob }}</td>
                    <td>{{ item.tc_dev }}</td>
                    <td>{{ item.coeficiente }}</td>
                    <td>{{ item.qtd_parcelas }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pagination
              v-if="parcelamento_prata.length"
              :offset="totalPages_prata"
              :total="totalItems_prata"
              :limit="pageSize_prata"
              @change-page="handlePageChangeEntradaPrata"
            />
          </div>
          <!--Ranqueamento F&I Pacote Bronze-->
          <div v-if="quadro_bronze" class="card card-vendas">
            <div class="row g-2 p-2">
              <div class="card-title gy-4">
                <i class="bi bi-journal-text fs-5 icone_filtro"
                  ><span class="texto_filtro">
                    <strong>Ranqueamento Pacote Bronze</strong></span
                  ></i
                >
              </div>
              <div class="card-title gy-4">
                <i class="bi bi-cash-coin fs-5 icone_filtro"
                  ><span class="texto_filtro"
                    >Valor de Entrada:
                    <strong>{{ total_entrada }}</strong>
                  </span></i
                >
                <i class="bi bi-cash-coin p-3 icone_filtro"
                  ><span class="texto_filtro"
                    >Valor Financiado:
                    <strong>{{ total_financiamento_bronze }}</strong>
                  </span></i
                >
              </div>
            </div>
            <div class="d-flex justify-content-center barra_fei">
              <div class="row">
                <div class="col">
                  <button
                    @click="sortTable('Financeira')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>FINANCEIRA</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Plano')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>PLANO</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Ret')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>RET</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('EntMin')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>R$ ENT MIN</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('EntPer')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>% ENT MIN</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Pmt')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>PMT</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Retorno')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>RETORNO</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('TacCob')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>TAC COB</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('TacDev')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>TAC DEV</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Coef')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>COEF</strong>
                  </button>
                </div>
              </div>
            </div>

            <div class="g-2 p-2 mt-3 rf_margin">
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col">Financeira</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Ret</th>
                    <th scope="col">R$ Ent. Min.</th>
                    <th scope="col">% Ent. Min.</th>
                    <th scope="col">Rentabilidade</th>
                    <th scope="col">Rebate</th>
                    <th scope="col">Pmt</th>
                    <th scope="col">Spf</th>
                    <th scope="col">Retorno</th>
                    <th scope="col">Tac. Cob.</th>
                    <th scope="col">Tac. Dev.</th>
                    <th scope="col">Coef.</th>
                    <th scope="col">Parcela</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :class="
                      item.id === pacoteSelecionadoBronze
                        ? 'custom-highlight-row'
                        : ''
                    "
                    @click="rowSelect_bronze(key, item.id, 3)"
                    v-for="(item, key) in parcelamento_bronze"
                    :key="item.id"
                  >
                    <td>{{ item.financeira }}</td>
                    <td>{{ item.plano }}</td>
                    <td>{{ item.ret }}</td>
                    <td>{{ item.entrada_min_valor }}</td>
                    <td>{{ item.entrada_min_porcentagem }}</td>
                    <td>{{ item.rentabilidade_bronze }}</td>
                    <td>{{ item.Rebate }}</td>
                    <td>{{ item.pmt_bronze }}</td>
                    <td>{{ item.spf }}</td>
                    <td>{{ item.retorno }}</td>
                    <td>{{ item.tc_cob }}</td>
                    <td>{{ item.tc_dev }}</td>
                    <td>{{ item.coeficiente }}</td>
                    <td>{{ item.qtd_parcelas }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pagination
              v-if="parcelamento_bronze.length"
              :offset="totalPages_bronze"
              :total="totalItems_bronze"
              :limit="pageSize_bronze"
              @change-page="handlePageChangeEntradaBronze"
            />
          </div>
          <!--Ranqueamento F&I Pacote Customizado-->
          <div v-if="quadro_customizado" class="card card-vendas">
            <div class="row g-2 p-2">
              <div class="card-title gy-4">
                <i class="bi bi-journal-text fs-5 icone_filtro"
                  ><span class="texto_filtro">
                    <strong>Ranqueamento Pacote Customizado</strong></span
                  ></i
                >
              </div>
            </div>
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
                  />
                  <label class="rf_texto">Tabela Padrão</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
                  />
                  <label class="rf_texto">Utiliza SPF</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
                  />
                  <label class="rf_texto">Razão Social</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
                  />
                  <label class="rf_texto">Plano</label>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="row">
                <div class="col">
                  <button
                    @click="sortTable('Financeira')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>FINANCEIRA</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Plano')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>PLANO</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Ret')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>RET</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('EntMin')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>R$ ENT MIN</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('EntPer')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>% ENT MIN</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Pmt')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>PMT</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Retorno')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>RETORNO</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('TacCob')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>TAC COB</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('TacDev')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>TAC DEV</strong>
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="sortTable('Coef')"
                    class="txt-table-vendas text-nowrap"
                  >
                    <strong>COEF</strong>
                  </button>
                </div>
              </div>
            </div>

            <div class="g-2 p-2 mt-3 rf_margin">
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col">Financeira</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Ret</th>
                    <th scope="col">R$ Ent. Min.</th>
                    <th scope="col">% Ent. Min.</th>
                    <th scope="col">Rentabilidade</th>
                    <th scope="col">Rebate</th>
                    <th scope="col">Pmt</th>
                    <th scope="col">Spf</th>
                    <th scope="col">Retorno</th>
                    <th scope="col">Tac. Cob.</th>
                    <th scope="col">Tac. Dev.</th>
                    <th scope="col">Coef.</th>
                    <th scope="col">Parcela</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :class="
                      item.id === pacoteSelecionadoCustomizado
                        ? 'custom-highlight-row'
                        : ''
                    "
                    @click="rowSelect_customizado(key, item.id, 4)"
                    v-for="(item, key) in parcelamento_customizado_custom"
                    :key="item.id"
                  >
                    <td>{{ item.financeira }}</td>
                    <td>{{ item.plano }}</td>
                    <td>{{ item.ret }}</td>
                    <td>{{ item.entrada_min_valor }}</td>
                    <td>{{ item.entrada_min_porcentagem }}</td>
                    <td>{{ item.rentabilidade_customizado }}</td>
                    <td>{{ item.Rebate }}</td>
                    <td>{{ item.pmt_customizado }}</td>
                    <td>{{ item.spf }}</td>
                    <td>{{ item.retorno }}</td>
                    <td>{{ item.tc_cob }}</td>
                    <td>{{ item.tc_dev }}</td>
                    <td>{{ item.coeficiente }}</td>
                    <td>{{ item.qtd_parcelas }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pagination
              v-if="parcelamento_customizado.length"
              :offset="totalPages_crustomizado"
              :total="totalItems_customizado"
              :limit="pageSize_customizado"
              @change-page="handlePageChangeEntradaCustomizado"
            />
          </div>
       
          <!-- Modal de confirmação Acessório -->
          <div
            class="modal"
            id="confirmModal"
            tabindex="-1"
            aria-labelledby="confirmModalLabel"
            aria-hidden="true"
            data-bs-dismiss="false"
          >
            <div class="modal-dialog">
              <div class="modal-content card-container rf_texto">
                <div class="modal-header">
                  <div class="card-title gy-4">
                    <i class="bi bi-tools fs-5 icone_kit"
                      ><span class="texto_kit">Ajustar Preço Acessório</span></i
                    >
                  </div>
                </div>
                <div class="modal-body">
                  <div class="row g-2 p-2">
                    <div class="col-2">
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control rf_bg_form rf_texto_desk"
                          v-model="id_kit_acessorio"
                          disabled
                        />
                        <label class="rf_texto_desk">Id</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control rf_bg_form rf_texto_desk"
                          v-model="precoAjustadoAcessorio"
                          @input="
                            precoAjustadoAcessorio = formatarValor(
                              precoAjustadoAcessorio
                            )
                          "
                          required
                        />
                        <label class="rf_texto_desk">Preço Ajustado</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="row">
                    <div class="col-6">
                      <button
                        type="button"
                        class="btn btn-lg btn-filtro"
                        data-bs-dismiss="modal"
                      >
                        Cancelar
                      </button>
                    </div>
                    <div class="col-6">
                      <button
                        type="button"
                        class="btn btn-lg btn-filtro"
                        data-bs-dismiss="modal"
                        @click="confirmarAlteracao"
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="col-1">
            <button
              type="button"
              class="btn btn-lg btn-filtro"
              :disabled="habilitar_finalizar_venda"
              @click="fecharModalFinalizar"
            >
              Finalizar Venda
            </button>
          </div>
          <div class="col-1">
            <button
              type="button"
              class="btn btn-lg btn-filtro"
              :disabled="habilitar_venda_perdida"
              @click="fecharModalPerdido"
            >
              Venda Perdida
            </button>
          </div>
          <div class="col-1">
            <button
              type="button"
              class="btn btn-lg btn-filtro"
              data-bs-dismiss="modal"
              @click="fecharModal()"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--Modais Customizado-->

    <!--Modal Exclusão Acessório-->
    <div
      class="modal"
      id="excluiModal"
      tabindex="-1"
      aria-labelledby="confirmModalLabel"
      aria-hidden="true"
      data-bs-dismiss="false"
    >
      <div class="modal-dialog">
        <div class="modal-content card-container rf_texto">
          <div class="modal-header">
            <div class="card-title gy-4">
              <i class="bi bi-tools fs-5 icone_kit"
                ><span class="texto_kit">Exclusão</span></i
              >
            </div>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <span class="texto_kit">Deseja remover o acessório do Kit?</span>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-lg btn-filtro"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-lg btn-filtro"
                  data-bs-dismiss="modal"
                  @click="confirmarAlteracao"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de confirmação Seguro -->
    <div
      class="modal"
      id="confirmModalSeguro"
      tabindex="-1"
      aria-labelledby="confirmModalLabel"
      aria-hidden="true"
      data-bs-dismiss="false"
    >
      <div class="modal-dialog">
        <div class="modal-content card-container rf_texto">
          <div class="modal-header">
            <div class="card-title gy-4">
              <i class="bi bi-tools fs-5 icone_kit"
                ><span class="texto_kit">Ajustar Preço Seguro</span></i
              >
            </div>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <div class="col-2">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto_desk"
                    v-model="id_kit_seguro"
                    disabled
                  />
                  <label class="rf_texto_desk">Id</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto_desk"
                    v-model="precoAjustadoSeguro"
                    @input="
                      precoAjustadoSeguro = formatarValor(precoAjustadoSeguro)
                    "
                    required
                  />
                  <label class="rf_texto_desk">Preço Ajustado</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-lg btn-filtro"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-lg btn-filtro"
                  data-bs-dismiss="modal"
                  @click="confirmarAlteracaoSeguro"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Modal Exclusão Seguro-->
    <div
      class="modal"
      id="excluiModalSeguro"
      tabindex="-1"
      aria-labelledby="confirmModalLabel"
      aria-hidden="true"
      data-bs-dismiss="false"
    >
      <div class="modal-dialog">
        <div class="modal-content card-container rf_texto">
          <div class="modal-header">
            <div class="card-title gy-4">
              <i class="bi bi-tools fs-5 icone_kit"
                ><span class="texto_kit">Exclusão</span></i
              >
            </div>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <span class="texto_kit">Deseja remover o seguro do Kit?</span>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-lg btn-filtro"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-lg btn-filtro"
                  data-bs-dismiss="modal"
                  @click="confirmarAlteracaoSeguro"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de confirmação Revisao -->
    <div
      class="modal"
      id="confirmModalRevisao"
      tabindex="-1"
      aria-labelledby="confirmModalLabel"
      aria-hidden="true"
      data-bs-dismiss="false"
    >
      <div class="modal-dialog">
        <div class="modal-content card-container rf_texto">
          <div class="modal-header">
            <div class="card-title gy-4">
              <i class="bi bi-tools fs-5 icone_kit"
                ><span class="texto_kit">Ajustar Preço Revisão</span></i
              >
            </div>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <div class="col-2">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto_desk"
                    v-model="id_kit_seguro"
                    disabled
                  />
                  <label class="rf_texto_desk">Id</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto_desk"
                    v-model="precoAjustadoRevisao"
                    @input="
                      precoAjustadoRevisao = formatarValor(precoAjustadoRevisao)
                    "
                    required
                  />
                  <label class="rf_texto_desk">Preço Ajustado</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-lg btn-filtro"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-lg btn-filtro"
                  data-bs-dismiss="modal"
                  @click="confirmarAlteracaoRevisao"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Modal Exclusão Revisão-->
    <div
      class="modal"
      id="excluiModalRevisao"
      tabindex="-1"
      aria-labelledby="confirmModalLabel"
      aria-hidden="true"
      data-bs-dismiss="false"
    >
      <div class="modal-dialog">
        <div class="modal-content card-container rf_texto">
          <div class="modal-header">
            <div class="card-title gy-4">
              <i class="bi bi-tools fs-5 icone_kit"
                ><span class="texto_kit">Exclusão</span></i
              >
            </div>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <span class="texto_kit">Deseja remover a revisão do Kit?</span>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-lg btn-filtro"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-lg btn-filtro"
                  data-bs-dismiss="modal"
                  @click="confirmarAlteracaoRevisao"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div v-if="abrir_modal">
      <Message :msg="msg" v-show="msg" />
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
    <div class="modal-dialog modal-fullscreen rf_modal font-pdf-menu">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mt-3 rf_texto_pdf" ref="contentToPrint">
            <div class="row">
              <div class="col-6">
                <a class="navbar-brand logo">
                  <img
                    src="../../assets/logo.png"
                    alt="Bootstrap"
                    width="100"
                    height="30"
                  />
                </a>
              </div>
              <div class="col-6" style="text-align: right">
                <a class="navbar-brand logo_cliente">
                  <img
                    src="../../assets/logo.png"
                    alt="Bootstrap"
                    height="30"
                  />
                </a>
              </div>
            </div>
            <!--Dados do Veículo-->
            <div class="card card-vendas">
              <div class="row g-2 p-2">
                <div class="col-12">
                  <i class="bi bi-car-front fs-5 icone_filtro_menu"
                    ><span class="texto_filtro_menu"
                      ><strong>Dados do Veículo</strong></span
                    ></i
                  >
                </div>
                <div class="col-2">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Marca</label>
                    <span class="rf_texto_menu">{{ marca }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Modelo</label>
                    <span class="rf_texto_menu">{{ modelo }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Cor</label>
                    <span class="rf_texto_menu">{{ cor }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Placa</label>
                    <span class="rf_texto_menu">{{ placa }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Chassi</label>
                    <span class="rf_texto_menu">{{ chassi }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Ano Fabricação</label>
                    <span class="rf_texto_menu">{{ ano_fabricacao }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Ano Modelo</label>
                    <span class="rf_texto_menu">{{ ano_modelo }}</span>
                  </div>
                </div>
              </div>
              <!--Dados do Financiamento-->

              <div class="row g-2 p-2">
                <div class="col-6">
                  <i class="bi bi-journal-bookmark-fill fs-5 icone_filtro_menu"
                    ><span class="texto_filtro_menu"
                      ><strong>Dados do Financiamento</strong></span
                    ></i
                  >
                </div>
                <div class="col-6">
                  <i class="bi bi-journal-text fs-5 icone_filtro_menu"
                    ><span class="texto_filtro_menu"
                      ><strong>Dados do Atendimento</strong></span
                    ></i
                  >
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Total Entrada</label>
                    <span class="rf_texto_menu">{{ total_entrada }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo">Total Financiamento</label>
                    <span class="rf_texto_menu">{{
                      total_financiamento_selecionado
                    }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Valor Parcela</label>
                    <span class="rf_texto_menu">{{
                      valor_parcela_selecionada
                    }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Qtd. Parcela</label>
                    <span class="rf_texto_menu">{{
                      qtd_parcela_selecionada
                    }}</span>
                  </div>
                </div>

                <div class="col-2">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Banco</label>
                    <span class="rf_texto_menu">{{ banco_selecionado }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Nº Atendimento</label>
                    <span class="rf_texto_menu">{{ n_atendimento }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Vendedor</label>
                    <span class="rf_texto_menu">{{ vendedor }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu">Cliente</label>
                    <span class="rf_texto_menu">{{ cliente }}</span>
                  </div>
                </div>
              </div>
              <!--Dados do Atendimento-->

              <div class="row g-2 p-2">
                <div class="col-7">
                  <i class="bi bi-cash fs-5 icone_filtro_menu">
                    <span class="texto_filtro_menu"
                      ><strong>Forma de Pagamento - </strong
                      >{{
                        metodo_pagamento == "1"
                          ? "Financiamento"
                          : metodo_pagamento == "2"
                          ? "À Vista"
                          : ""
                      }}</span
                    >

                    <span class="texto_filtro_menu"
                      ><strong>Data - </strong
                      >{{ new Date().toLocaleDateString("pt-BR") }}
                      {{
                        new Date().toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      }}</span
                    >
                  </i>
                </div>
              </div>
            </div>

            <!--Quadro dos kits-->
            <div class="row mt-2">
              <!--Quadro Ouro-->
              <div class="card card-ouro col">
                <i class="bi bi-gem card-texto-vendas-ouro"> Pacote Ouro</i>
                <!--Acessórios-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_ouro">
                    <span class="texto_centralizado"
                      ><strong>Acessórios</strong></span
                    >
                  </div>
                  <div class="col-12">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_acessorios_ouro"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Revisão-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_ouro">
                    <span class="texto_centralizado"
                      ><strong>Revisão pré-paga</strong></span
                    >
                  </div>
                  <div class="col-10">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_revisoes_ouro"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Seguros-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_ouro">
                    <span class="texto_centralizado"
                      ><strong>Seguros</strong></span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-7">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_seguros_ouro"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          >
                        </strong>
                      </li>
                    </ul>
                  </div>
                  <div class="col position-relative">
                    <img
                      src="../../assets/economia_ouro.png"
                      alt="Bootstrap"
                      width="150"
                      class="img-fluid"
                    />
                    <div class="texto-sobre-imagem">R$ 3.000,00</div>
                  </div>
                </div>
                <!--Informações-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_ouro texto_pacotes">
                    <span class="esquerda"
                      ><strong>Novo Valor da parcela:</strong></span
                    >
                    <span class="direita"><strong>R$ 1.500,00</strong></span>
                  </div>
                </div>

                <div class="col mt-3 rodape">
                  <div class="col-4 esquerda">
                    <span class="texto_tachado"
                      ><strong class="tachado">De R$ 12.990,00</strong></span
                    ><br />
                    <span class="texto_oferta"
                      ><strong> por R$ 9.990,00</strong></span
                    >
                  </div>
                  <div class="col-8 direita">
                    <span class="texto_oferta"
                      ><strong
                        >Por apenas R$ 5,33 a mais na parcela por dia</strong
                      ></span
                    >
                  </div>
                </div>
              </div>
              <!--Quadro Prata-->
              <div class="card card-prata col">
                <i class="bi bi-gem card-texto-vendas-prata"> Pacote Prata</i>
                <!--Acessórios-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_prata">
                    <span class="texto_centralizado"
                      ><strong>Acessórios</strong></span
                    >
                  </div>
                  <div class="col-12">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_acessorios_prata"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Revisão-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_prata">
                    <span class="texto_centralizado"
                      ><strong>Revisão pré-paga</strong></span
                    >
                  </div>
                  <div class="col-12">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_revisoes_prata"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Seguros-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_prata">
                    <span class="texto_centralizado"
                      ><strong>Seguros</strong></span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-7">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_seguros_prata"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          >
                        </strong>
                      </li>
                    </ul>
                  </div>
                  <div class="col position-relative">
                    <img
                      src="../../assets/economia_prata.png"
                      alt="Bootstrap"
                      width="150"
                      class="img-fluid"
                    />
                    <div class="texto-sobre-imagem">R$ 2.000,00</div>
                  </div>
                </div>
                <!--Informações-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_prata texto_pacotes">
                    <span class="esquerda"
                      ><strong>Novo Valor da parcela:</strong></span
                    >
                    <span class="direita"><strong>R$ 1.500,00</strong></span>
                  </div>
                </div>

                <div class="col mt-3 rodape">
                  <div class="col-4 esquerda">
                    <span class="texto_tachado"
                      ><strong class="tachado">De R$ 12.990,00</strong></span
                    ><br />
                    <span class="texto_oferta"
                      ><strong> por R$ 9.990,00</strong></span
                    >
                  </div>
                  <div class="col-8 direita">
                    <span class="texto_oferta"
                      ><strong
                        >Por apenas R$ 5,33 a mais na parcela por dia</strong
                      ></span
                    >
                  </div>
                </div>
              </div>
              <!--Quadro Bronze-->
              <div class="card card-bronze col">
                <i class="bi bi-gem card-texto-vendas-bronze"> Pacote Bronze</i>
                <!--Acessórios-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_bronze">
                    <span class="texto_centralizado"
                      ><strong>Acessórios</strong></span
                    >
                  </div>
                  <div class="col-12">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_acessorios_bronze"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Revisão-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_bronze">
                    <span class="texto_centralizado"
                      ><strong>Revisão pré-paga</strong></span
                    >
                  </div>
                  <div class="col-12">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_revisoes_bronze"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Seguros-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_bronze">
                    <span class="texto_centralizado"
                      ><strong>Seguros</strong></span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-7">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_seguros_bronze"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          >
                        </strong>
                      </li>
                    </ul>
                  </div>
                  <div class="col position-relative">
                    <img
                      src="../../assets/economia_bronze.png"
                      alt="Bootstrap"
                      width="150"
                      class="img-fluid"
                    />
                    <div class="texto-sobre-imagem">R$ 1.000,00</div>
                  </div>
                </div>
                <!--Informações-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_bronze texto_pacotes">
                    <span class="esquerda"
                      ><strong>Novo Valor da parcela:</strong></span
                    >
                    <span class="direita"><strong>R$ 1.500,00</strong></span>
                  </div>
                </div>

                <div class="col mt-3 rodape">
                  <div class="col-4 esquerda">
                    <span class="texto_tachado"
                      ><strong class="tachado">De R$ 12.990,00</strong></span
                    ><br />
                    <span class="texto_oferta"
                      ><strong> por R$ 9.990,00</strong></span
                    >
                  </div>
                  <div class="col-8 direita">
                    <span class="texto_oferta"
                      ><strong
                        >Por apenas R$ 5,33 a mais na parcela por dia</strong
                      ></span
                    >
                  </div>
                </div>
              </div>
              <!--Quadro Customizado-->
              <div class="card card-customizado col">
                <i class="bi bi-gem card-texto-vendas-customizado">
                  Pacote Customizado</i
                >
                <!--Acessórios-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_customizado">
                    <span class="texto_centralizado"
                      ><strong>Acessórios</strong></span
                    >
                  </div>
                  <div class="col-12">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_acessorios_customizado"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Revisão-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_customizado">
                    <span class="texto_centralizado"
                      ><strong>Revisão pré-paga</strong></span
                    >
                  </div>
                  <div class="col-12">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_revisoes_customizado"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Seguros-->
                <div class="row">
                  <div class="col mt-3 barra_fei_menu_customizado">
                    <span class="texto_centralizado"
                      ><strong>Seguros</strong></span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-7">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_seguros_customizado"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon">{{ item.descricao }}</span></i
                          >
                        </strong>
                      </li>
                    </ul>
                  </div>
                  <div class="col position-relative">
                    <img
                      src="../../assets/economia_customizado.png"
                      alt="Bootstrap"
                      width="150"
                      class="img-fluid"
                    />
                    <div class="texto-sobre-imagem"></div>
                  </div>
                </div>
                <!--Informações-->
                <div class="row">
                  <div
                    class="col mt-3 barra_fei_menu_customizado texto_pacotes"
                  >
                    <span class="esquerda"><strong></strong></span>
                    <span class="direita"><strong></strong></span>
                  </div>
                </div>

                <div class="col mt-3 rodape">
                  <div class="col-4 esquerda">
                    <span class="texto_tachado"
                      ><strong class="tachado"></strong></span
                    ><br />
                    <span class="texto_oferta"><strong> </strong></span>
                  </div>
                  <div class="col-8 direita">
                    <span class="texto_oferta"><strong></strong></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-2 p-2 mt-4">
              <div class="col-12 rodape">
                <span class="texto_cartao"
                  ><strong>ou em até 6x no cartão</strong></span
                >
              </div>
              <div class="col rf_assinatura">
                <span>Gerente: {{ vendedor }}</span>
              </div>
              <div class="col rf_assinatura">
                <span>Cliente: {{ cliente }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="col-1">
            <button
              type="button"
              class="btn btn-lg btn-filtro"
              data-bs-target="#ModaProposta"
              data-bs-toggle="modal"
            >
              Fechar
            </button>
          </div>
          <div class="col-1">
            <button class="btn btn-lg btn-filtro" @click="generatePdf">
              IMPRIMIR
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
     <!--Modal Acessórios-->
     <div
            class="modal fade"
            id="ModalItensAcessorios"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
            tabindex="-1"
            
          >
            <div class="modal-dialog modal-dialog-centered modal-xl">
              <div class="modal-content card-container rf_texto">
                <div class="modal-header">
                  <div class="card-title gy-4">
                    <i class="bi bi-tools fs-5 icone_kit"
                      ><span class="texto_kit">Itens Acessórios</span></i
                    >
                  </div>
                  <button
                    class="btn btn-modal btn-lg p-1 mt-1"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Sair
                  </button>
                </div>
                <div class="modal-body">
                  <div class="">
                    <div class="card">
                      <div class="row g-2 p-2">
                        <div class="card-title gy-4">
                          <i class="bi bi-funnel fs-5 icone_filtro"
                            ><span class="texto_filtro">Filtro</span></i
                          >
                        </div>
                      </div>
                      <div class="row g-2 p-2">
                        <div class="col-2">
                          <div class="form-floating">
                            <input
                              type="text"
                              class="form-control rf_bg_form rf_texto_desk"
                              v-model="filtroCodigo"
                            />
                            <label class="rf_texto_desk">Código</label>
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-floating">
                            <input
                              type="text"
                              class="form-control rf_bg_form rf_text-desk"
                              v-model="filtroDescricao"
                            />
                            <label class="rf_texto_desk">Descrição</label>
                          </div>
                        </div>

                        <div class="col-1">
                          <div class="form-floating">
                            <select
                              class="form-select rf_bg_form rf_texto_desk"
                              v-model="pageSize"
                              @change="handlePageSizeChange(pageSize)"
                            >
                              <option
                                v-for="size in pageSizes"
                                :key="size"
                                :value="size"
                              >
                                {{ size }}
                              </option>
                            </select>
                            <label class="rf_texto_desk">Itens pág.</label>
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="form-floating">
                            <button
                              type="submit"
                              class="btn btn-lg btn-filtro"
                              @click="retrieveAcessorios"
                            >
                              <span class="rf_texto_btn">Pesquisar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--Tabelas-->
                  <div class="card g-2 p-2 mt-2">
                    <table class="table rf_texto_desk">
                      <thead>
                        <tr>
                          <th scope="col">Código</th>
                          <th scope="col">Descrição</th>
                          <th scope="col">Preço Final</th>
                          <th scope="col">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in estoque_pecas"
                          :key="item.id"
                          class="table-linha"
                        >
                          <td>{{ item.codigo_mercadoria }}</td>
                          <td>{{ item.descricao_mercadoria }}</td>
                          <td>{{ this.currency(item.preco_final) }}</td>
                          <td>
                            <button
                              class="dropdown-toggle-icon"
                              @click="inserir_acessorio(item)"
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <pagination
                        v-if="estoque_pecas.length"
                        :offset="totalPages"
                        :total="totalItems"
                        :limit="pageSize"
                        @change-page="handlePageChange"
                      /> -->
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    class="btn btn-primary"
                    data-bs-target="#ModalFI"
                    data-bs-toggle="modal"
                  >
                    Voltar
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
import NavgatorFI from "../../components/menu/NavgatorFI.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import axios from "axios";
import TokenService from "../../services/token.service";
import jwt_decode from "jwt-decode";
import Pagination from "../../components/Pagination.vue";
import Message from "../../components/modal/Message.vue";

export default {
  name: "Dashboard F&I",

  components: {
    SidebarVue,
    NavgatorFI,
    RodapeVue,
    Message,
    Pagination,
  },
  data() {
    return {
      modal_fi: false,
      selectedFilter: "",
      metodo_pagamento_lista: [
        { descricao: "Financiamento", value: 1 },
        { descricao: "Cartão Crédito", value: 2 },
        { descricao: "Depósito Bancário", value: 3 },
        { descricao: "Pix", value: 4 },
      ],
      metodo_pagamento: "",
      vendas: [],
      kits_modelos: [],
      sortColumn: "", // Coluna atualmente classificada
      sortOrder: 1,
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 50,
      company_id: "",
      user_log: "",
      msg: "",
      abrir_modal: false,

      //Campos tabela Pos Venda Detalhada
      valor_parcela_financiamento: "",
      //Dados do atendimento
      id_pos_venda_detalhada: "",
      id_pos_venda: "",
      n_atendimento: "",
      vendedor: "",
      cliente: "",
      //Dados do Veículo
      marca: "",
      modelo: "",
      modelo_id: "",
      placa: "",
      cor: "",
      chassi: "",
      ano_fabricacao: "",
      ano_modelo: "",

      //Dados do Financiamento
      total_entrada: "",
      total_financiado: "",
      valor_parcela: "",
      qtd_parcela: "",
      retorno: "",
      coeficiente: "",
      banco: "",

      //Dados kit Acessorio
      itens_kit_acessorios_ouro: [],
      total_preco_acessorios_ouro: "",
      total_preco_desconto_acessorios_ouro: "",
      total_preco_ajustado_acessorios_ouro: "",
      itens_kit_revisoes_ouro: [],
      total_preco_revisoes_ouro: "",
      total_preco_desconto_revisoes_ouro: "",
      total_preco_ajustado_revisoes_ouro: "",
      itens_kit_seguros_ouro: [],
      total_preco_seguros_ouro: "",
      total_preco_desconto_seguros_ouro: "",
      total_preco_ajustado_seguros_ouro: "",
      valor_pacote_ouro: "",
      total_financiamento_ouro: "",

      itens_kit_acessorios_prata: [],
      total_preco_acessorios_prata: "",
      total_preco_desconto_acessorios_prata: "",
      total_preco_ajustado_acessorios_prata: "",
      itens_kit_revisoes_prata: [],
      total_preco_revisoes_prata: "",
      total_preco_desconto_revisoes_prata: "",
      total_preco_ajustado_revisoes_prata: "",
      itens_kit_seguros_prata: [],
      total_preco_seguros_prata: "",
      total_preco_desconto_seguros_prata: "",
      total_preco_ajustado_seguros_prata: "",
      valor_pacote_prata: "",
      total_financiamento_prata: "",

      itens_kit_acessorios_bronze: [],
      total_preco_acessorios_bronze: "",
      total_preco_desconto_acessorios_bronze: "",
      total_preco_ajustado_acessorios_bronze: "",
      itens_kit_revisoes_bronze: [],
      total_preco_revisoes_bronze: "",
      total_preco_desconto_revisoes_bronze: "",
      total_preco_ajustado_revisoes_bronze: "",
      itens_kit_seguros_bronze: [],
      total_preco_seguros_bronze: "",
      total_preco_desconto_seguros_bronze: "",
      total_preco_ajustado_seguros_bronze: "",
      valor_pacote_bronze: "",
      total_financiamento_bronze: "",

      itens_kit_acessorios_customizado: [],
      total_preco_acessorios_customizado: "",
      total_preco_desconto_acessorios_customizado: "",
      total_preco_ajustado_acessorios_customizado: "",
      itens_kit_revisoes_customizado: [],
      total_preco_revisoes_customizado: "",
      total_preco_desconto_revisoes_customizado: "",
      total_preco_ajustado_revisoes_customizado: "",
      itens_kit_seguros_customizado: [],
      total_preco_seguros_customizado: "",
      total_preco_desconto_seguros_customizado: "",
      total_preco_ajustado_seguros_customizado: "",
      valor_pacote_customizado: "",
      total_financiamento_customizado: "",

      //validação
      habilitar_finalizar_venda: true,
      habilitar_venda_perdida: true,
      habilitar_gerar_menu: true,
      habilitar_customizacao: false,
      desabilitar_customizacao: true,
      //buscando Modelo
      modelo_codigo: "",
      modelo_descricao: "",
      ids_kits_modelo: [],

      //Ranqueamento
      pmtSelected: "",
      valor_financiar: 0,
      valor_pacote_selecionado: 0,
      total_financiamento_selecionado: 0,
      valor_parcela_selecionada: 0,
      quadro_ouro: false,
      quadro_prata: false,
      quadro_bronze: false,
      quadro_customizado: false,
      pacoteSelecionadoOuro: null,
      pacoteSelecionadoPrata: null,
      pacoteSelecionadoBronze: null,
      pacoteSelecionadoCustomizado: null,
      qtd_parcela_selecionada: null,
      banco_selecionado: null,

      itens_financiamento: [
        { value: 12 },
        { value: 18 },
        { value: 24 },
        { value: 36 },
        { value: 48 },
        { value: 60 },
      ],

      parcela_ouro: 0,
      parcela_prata: 0,
      parcela_bronze: 0,
      parcela_customizado: 0,
      parcela: "",
      total_entrada_fei: "",
      total_financiado_fei: "",
      valor_pacote_ouro_rank: "",
      valor_pacote_prata_rank: "",
      valor_pacote_bronze_rank: "",
      valor_pacote_customizado_rank: "",
      id_coluna: "",
      incluir_acessorios: "",

      kit_id_ouro: "",
      kit_id_prata: "",
      kit_id_bronze: "",
      kit_id_customizado: "",

      //Ouro
      parcelamento_ouro: [],
      page_ouro: 1,
      totalPages_ouro: 0,
      totalItems_ouro: 0,
      pageSizes_ouro: [5, 10, 15, 35, 50, 100],
      pageSize_ouro: 5,
      //Prata
      parcelamento_prata: [],
      page_prata: 1,
      totalPages_prata: 0,
      totalItems_prata: 0,
      pageSizes_prata: [5, 10, 15, 35, 50, 100],
      pageSize_prata: 5,
      //Bronze
      parcelamento_bronze: [],
      page_bronze: 1,
      totalPages_bronze: 0,
      totalItems_bronze: 0,
      pageSizes_bronze: [5, 10, 15, 35, 50, 100],
      pageSize_bronze: 5,

      cadastro: false,
    };
  },
  computed: {
    sortedItems() {
      if (!this.sortColumn) {
        return this.items;
      }

      return this.items.slice().sort((a, b) => {
        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (valueA < valueB) {
          return -1 * this.sortOrder;
        }
        if (valueA > valueB) {
          return 1 * this.sortOrder;
        }
        return 0;
      });
    },
  },
  mounted() {
    this.getToken();
    this.retrievePropostas();
    this.habilitar();
  },
  methods: {
    getToken() {
      const accessToken = TokenService.getLocalAccessToken();
      TokenService.getLocalRefreshToken();
      const user_log = TokenService.getUser();
      const decodedToken = jwt_decode(accessToken);
      this.company_id = decodedToken.company;
      this.user_log = user_log.id;
    },
    rowSelect_ouro(idx, id_taxa, pacote) {
      if (pacote == 1) {
        console.log("Dados da parcela", pacote);
        this.pacoteSelecionadoOuro = id_taxa;
        this.select_parcela(id_taxa, pacote);
      }
    },
    rowSelect_prata(idx, id_taxa, pacote) {
      if (pacote == 2) {
        this.pacoteSelecionadoPrata = id_taxa;
        this.select_parcela(id_taxa, pacote);
      }
    },
    rowSelect_bronze(idx, id_taxa, pacote) {
      if (pacote == 3) {
        this.pacoteSelecionadoBronze = id_taxa;
        this.select_parcela(id_taxa, pacote);
        this.habilitar();
      }
    },
    habilitar() {
      if (
        this.parcela_ouro != null ||
        this.parcela_prata != null ||
        this.parcela_bronze != null
      ) {
        this.habilitar_gerar_menu = false;
      }
      if (this.valor_financiar != 0) {
        this.habilitar_finalizar_venda = false;
        this.habilitar_venda_perdida = false;
      }
    },
    customizado() {
      console.log("Iniciar pacote customizado", this.n_atendimento);
      this.habilitar_customizacao = true;
      this.desabilitar_customizacao = false;
      this.cadastro = true;
    },
    fecharModal() {
      window.location.reload();
    },
    async fecharModalFinalizar() {
      console.log("Entrei aqui teste");
      const response = await fetch(
        `${process.env.VUE_APP_API_URL}atualizar_pos_venda`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            n_atendimento: this.n_atendimento,
            status: "F&I Finalizado",
          }),
        }
      );
      console.log("resposta da atualização", response.statusText);
      if (response.statusText == "OK") {
        this.abrir_modal = true;
        this.msg = "F&I finalizado com sucesso!";
        setTimeout(() => {
          this.abrir_modal = false;
          setTimeout(() => window.location.reload(), 1000);
        }, 4000);
      }
    },
    async fecharModalPerdido() {
      console.log("Entrei aqui perdida");
      const response = await fetch(
        `${process.env.VUE_APP_API_URL}atualizar_pos_venda`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            n_atendimento: this.n_atendimento,
            status: "F&I Perdido",
          }),
        }
      );
      console.log("resposta da atualização", response.statusText);
      if (response.statusText == "OK") {
        this.abrir_modal = true;
        this.msg = "F&I finalizado como perdido!";
        setTimeout(() => {
          this.abrir_modal = false;
          setTimeout(() => window.location.reload(), 1000);
        }, 4000);
      }
    },
    async buscar_parcelas_ranqueamento(id) {
      try {
        console.log("Buscar parcelas");
        const pmts = await axios.get(
          `${process.env.VUE_APP_API_URL}pos_venda_detalhada_pmt`,
          {
            params: {
              id: id,
            },
          }
        );

        const id_menu_rank = pmts.data.rows[0].id;
        const parcelas = await axios.get(
          `${process.env.VUE_APP_API_URL}pos_venda_detalhada_rank`,
          {
            params: {
              id: id_menu_rank,
            },
          }
        );
        console.log("Listando as parcelas ranqueada", parcelas);
        for (var i = 0; i < parcelas.data.count; i++) {
          if (parcelas.data.rows[i].rankPacote == "Ouro") {
            this.parcela_ouro = parcelas.data.rows[i]["pmt"];
            console.log("Ouro", this.parcela_ouro);
          }
          if (parcelas.data.rows[i]["rankPacote"] == "Prata") {
            this.parcela_prata = parcelas.data.rows[i]["pmt"];
          }
          if (parcelas.data.rows[i]["rankPacote"] == "Bronze") {
            this.parcela_bronze = parcelas.data.rows[i]["pmt"];
          }
          if (parcelas.data.rows[i]["rankPacote"] == "Customizado") {
            this.parcela_customizado = parcelas.data.rows[i]["pmt"];
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async select_parcela(id, pacote) {
      const id_taxa = id;
      var pacoteSelecionado = pacote;

      await fetch(`${process.env.VUE_APP_API_URL}taxas/menu_fei`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: id_taxa,
          proposta_id: this.id_pos_venda_detalhada,
          entrada: this.total_entrada_fei,
          parcela: this.parcela,
          pacote: pacoteSelecionado,
        }),
      })
        .then((data) => {
          if (!data.ok) {
            throw Error(data.status);
          }
          return data.json();
        })
        .then((resposta) => {
          console.log("Parcela inserida com sucesso ------ " + resposta);
          this.buscar_parcelas_ranqueamento(this.id_pos_venda_detalhada);
        });
    },

    async habilitar_fi(item) {
      console.log("Aqui habilita o modal F&I ----- 0001", item);
      try {
        const id = item.id;
        this.id_pos_venda = item.id;
        //Verificar se já foi criado a pos venda
        const pos_venda = await axios.get(
          `${process.env.VUE_APP_API_URL}pos_venda_detalhada`,
          {
            params: {
              id: id,
            },
          }
        );
        console.log("Pos venda", pos_venda)
        if (pos_venda.data == null || pos_venda.data == "") {
          const response = await fetch(
            `${process.env.VUE_APP_API_URL}pos_venda_detalhada`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                pos_venda_id: id,
                user_id: this.user_log,
                status: 1,
              }),
            }
          );

          if (!response.ok) {
            throw Error(response.status);
          }

          const data = await response.json();
          this.id_pos_venda_detalhada = pos_venda.data.id;
          if (data.success == true) {
            this.popular_formulario(item);
            this.descorbrir_modelo();
            this.buscar_parcelas_ranqueamento();
          } else {
            this.abrir_modal = true;
            this.msg =
              "Houve um erro abrir esse atendimento, entre em contato  com o suporte.";
            setTimeout(
              () => (this.abrir_modal = false),
              window.location.reload(),
              4000
            );
          }
          console.log(data);
        } else {
          console.log("Existem registros", pos_venda.data.id);
          this.popular_formulario(item);
          this.descorbrir_modelo();
          this.id_pos_venda_detalhada = pos_venda.data.id;
        }
        this.buscar_parcelas_ranqueamento(this.id_pos_venda_detalhada);
      } catch (error) {
        this.abrir_modal = true;
        this.msg =
          "Houve um erro abrir esse atendimento, entre em contato  com o suporte.";
        // setTimeout(
        //   () => (this.abrir_modal = false),
        //   window.location.reload(),
        //   4000
        // );
      }
    },
    currency(number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(number);
    },
    async descorbrir_modelo() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}descobrir_kits_modelo`,
          {
            params: {
              modelo_descricao: this.modelo,
            },
          }
        );

        console.log("Lista de Modelos", response.data);
        // Faça algo com os dados aqui, como atribuir a uma variável de componente
        this.modelo_codigo = response.data.rows[0].modelo_codigo; // exemplo de atribuição
        console.log(this.modelo_codigo);
        this.retrieveKitsModelo();
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    sortTable(column) {
      if (column === this.sortColumn) {
        this.sortOrder *= -1; // Alterna entre crescente e decrescente
      } else {
        this.sortColumn = column;
        this.sortOrder = 1; // Começa com ordem crescente ao classificar uma nova coluna
      }
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
    async retrievePropostas() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}listar_pos_venda`,
          {
            params: {
              empresa_id: this.company_id,
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        console.log("Lista de propostas", response.data);
        // Faça algo com os dados aqui, como atribuir a uma variável de componente
        this.vendas = response.data.vendas; // exemplo de atribuição
        this.totalPages = response.data.totalPages;
        this.totalItems = response.data.totalItems;
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    popular_formulario(item) {
      console.log("Listando ", item);
      //Daddos do Atendimento
      this.n_atendimento = item.atendimento_id;
      this.vendedor = item.pos_venda_proposta.vendedores.username;
      this.cliente = item.pos_venda_proposta.clientes.nome;
      //Daddos do Veículo
      this.marca = item.pos_venda_proposta.proposta_veiculo.marca;
      this.modelo = item.pos_venda_proposta.proposta_veiculo.modelo_veiculo;
      //this.modelo_id = item[0].pos_venda_proposta.proposta_veiculo.modelo_veiculo;
      this.placa = item.pos_venda_proposta.proposta_veiculo.placa;
      this.cor = item.pos_venda_proposta.proposta_veiculo.cor;
      this.chassi = item.pos_venda_proposta.proposta_veiculo.chassis;
      this.ano_fabricacao =
        item.pos_venda_proposta.proposta_veiculo.ano_fabricacao;
      this.ano_modelo = item.pos_venda_proposta.proposta_veiculo.ano_modelo;

      //Dados do Financiamento
      this.total_entrada = this.currency(
        item.pos_venda_proposta.val_entrada_financiamento
      );
      this.total_financiado = this.currency(
        item.pos_venda_proposta.val_financiamento
      );
      this.valor_parcela = this.currency(item.pos_venda_proposta.pmt_escolhido);
      this.qtd_parcela = item.pos_venda_proposta.qtd_meses;
      if (this.qtd_parcela != null) {
        this.metodo_pagamento = 1;
      }
      this.total_entrada_fei =
        item.pos_venda_proposta.val_entrada_financiamento;
      this.total_financiado_fei = item.pos_venda_proposta.val_financiamento;
      for (let i = 0; i < item.pos_venda_proposta.menu_proposta.length; i++) {
        var rank = item.pos_venda_proposta.menu_proposta[i].menu_rank;
        for (let j = 0; j < rank.length; j++) {
          if (rank[j].pmt === item.pos_venda_proposta.pmt_escolhido) {
            // Se encontrado, retornar o coeficiente correspondente
            this.coeficiente = rank[j].coeficiente;
            this.retorno = rank[j].returnType;
            this.banco = rank[j].bancos_rank.nome;
          }
        }
      }
      //Dados do Ranqueamento
      this.parcela = item.pos_venda_proposta.qtd_meses;
    },
    async retrieveKitsModelo() {
      console.log("Buscando kits modelo");
      //Descobrir id do Modelo
      const id_modelo = await axios.get(
        `${process.env.VUE_APP_API_URL}modelo_codigo`,
        {
          params: { codigo: this.modelo_codigo },
        }
      );
      console.log(id_modelo.data.rows[0].id);
      //Ir tabela kit modelo e trazer os pacotes ref. ao ID
      const kits_modelo = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_modelo`,
        {
          params: {
            modelo_id: id_modelo.data.rows[0].id,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );

      this.ids_kits_modelo = kits_modelo.data.kits_modelo;
      console.log("Modelos ---------------------", this.ids_kits_modelo[0]);
      //Dados pacote Ouro
      this.kit_id_ouro = this.ids_kits_modelo[0].id;
      this.kit_id_prata = this.ids_kits_modelo[1].id;
      this.kit_id_bronze = this.ids_kits_modelo[2].id;
      this.kit_id_customizado = this.ids_kits_modelo[3].id;

      this.pacote_ouro(this.kit_id_ouro);
      this.pacote_prata(this.kit_id_prata);
      this.pacote_bronze(this.kit_id_bronze);
    },
    async pacote_ouro(kit_id_ouro) {
      //Acessórios Ouro ***************************************************************************
      const pacote_ouro_acessorios = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_acessorios`,
        {
          params: {
            kit_modelo_id: kit_id_ouro,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_acessorios_ouro =
        pacote_ouro_acessorios.data.kits_acessorios;
      this.total_preco_acessorios_ouro = pacote_ouro_acessorios.data.totalPreco;
      this.total_preco_desconto_acessorios_ouro =
        pacote_ouro_acessorios.data.totalPrecoDesconto;
      this.total_preco_ajustado_acessorios_ouro =
        pacote_ouro_acessorios.data.totalPrecoAjustado;
      //Revisões Ouro
      const pacote_ouro_revisoes = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_revisoes`,
        {
          params: {
            kit_modelo_id: kit_id_ouro,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_revisoes_ouro = pacote_ouro_revisoes.data.kits_revisoes;
      this.total_preco_revisoes_ouro = pacote_ouro_revisoes.data.totalPreco;
      this.total_preco_desconto_revisoes_ouro =
        pacote_ouro_revisoes.data.totalPrecoDesconto;
      this.total_preco_ajustado_revisoes_ouro =
        pacote_ouro_revisoes.data.totalPrecoAjustado;
      //Revisões Ouro
      const pacote_ouro_seguros = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_seguros`,
        {
          params: {
            kit_modelo_id: kit_id_ouro,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_seguros_ouro = pacote_ouro_seguros.data.kits_seguro;
      this.total_preco_seguros_ouro = pacote_ouro_seguros.data.totalPreco;
      this.total_preco_desconto_seguros_ouro =
        pacote_ouro_seguros.data.totalPrecoDesconto;
      this.total_preco_ajustado_seguros_ouro =
        pacote_ouro_seguros.data.totalPrecoAjustado;

      this.valor_pacote_ouro =
        parseFloat(this.total_preco_ajustado_acessorios_ouro) +
        parseFloat(this.total_preco_ajustado_revisoes_ouro) +
        parseFloat(this.total_preco_ajustado_seguros_ouro);
      //Fim Pacote ouro ******************************************************************************
      console.log("Valor pacote ouro", this.valor_pacote_ouro);
    },
    async pacote_prata(kit_id_prata) {
      //Acessórios Prata ***************************************************************************
      const pacote_prata_acessorios = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_acessorios`,
        {
          params: {
            kit_modelo_id: kit_id_prata,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_acessorios_prata =
        pacote_prata_acessorios.data.kits_acessorios;
      this.total_preco_acessorios_prata =
        pacote_prata_acessorios.data.totalPreco;
      this.total_preco_desconto_acessorios_prata =
        pacote_prata_acessorios.data.totalPrecoDesconto;
      this.total_preco_ajustado_acessorios_prata =
        pacote_prata_acessorios.data.totalPrecoAjustado;
      //Revisões Ouro
      const pacote_prata_revisoes = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_revisoes`,
        {
          params: {
            kit_modelo_id: kit_id_prata,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_revisoes_prata = pacote_prata_revisoes.data.kits_revisoes;
      this.total_preco_revisoes_prata = pacote_prata_revisoes.data.totalPreco;
      this.total_preco_desconto_revisoes_prata =
        pacote_prata_revisoes.data.totalPrecoDesconto;
      this.total_preco_ajustado_revisoes_prata =
        pacote_prata_revisoes.data.totalPrecoAjustado;
      //Revisões Ouro
      const pacote_prata_seguros = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_seguros`,
        {
          params: {
            kit_modelo_id: kit_id_prata,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_seguros_prata = pacote_prata_seguros.data.kits_seguro;
      this.total_preco_seguros_prata = pacote_prata_seguros.data.totalPreco;
      this.total_preco_desconto_seguros_prata =
        pacote_prata_seguros.data.totalPrecoDesconto;
      this.total_preco_ajustado_seguros_prata =
        pacote_prata_seguros.data.totalPrecoAjustado;

      this.valor_pacote_prata =
        parseFloat(this.total_preco_ajustado_acessorios_prata) +
        parseFloat(this.total_preco_ajustado_revisoes_prata) +
        parseFloat(this.total_preco_ajustado_seguros_prata);
      //Fim Pacote ouro ******************************************************************************
      console.log("Valor pacote ouro", this.valor_pacote_prata);
    },
    async pacote_bronze(kit_id_bronze) {
      //Acessórios Prata ***************************************************************************
      const pacote_bronze_acessorios = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_acessorios`,
        {
          params: {
            kit_modelo_id: kit_id_bronze,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_acessorios_bronze =
        pacote_bronze_acessorios.data.kits_acessorios;
      this.total_preco_acessorios_bronze =
        pacote_bronze_acessorios.data.totalPreco;
      this.total_preco_desconto_acessorios_bronze =
        pacote_bronze_acessorios.data.totalPrecoDesconto;
      this.total_preco_ajustado_acessorios_bronze =
        pacote_bronze_acessorios.data.totalPrecoAjustado;
      //Revisões Ouro
      const pacote_bronze_revisoes = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_revisoes`,
        {
          params: {
            kit_modelo_id: kit_id_bronze,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_revisoes_bronze =
        pacote_bronze_revisoes.data.kits_revisoes;
      this.total_preco_revisoes_bronze = pacote_bronze_revisoes.data.totalPreco;
      this.total_preco_desconto_revisoes_bronze =
        pacote_bronze_revisoes.data.totalPrecoDesconto;
      this.total_preco_ajustado_revisoes_bronze =
        pacote_bronze_revisoes.data.totalPrecoAjustado;
      //Revisões Ouro
      const pacote_bronze_seguros = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_seguros`,
        {
          params: {
            kit_modelo_id: kit_id_bronze,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_seguros_bronze = pacote_bronze_seguros.data.kits_seguro;
      this.total_preco_seguros_bronze = pacote_bronze_seguros.data.totalPreco;
      this.total_preco_desconto_seguros_bronze =
        pacote_bronze_seguros.data.totalPrecoDesconto;
      this.total_preco_ajustado_seguros_bronze =
        pacote_bronze_seguros.data.totalPrecoAjustado;

      this.valor_pacote_bronze =
        parseFloat(this.total_preco_ajustado_acessorios_bronze) +
        parseFloat(this.total_preco_ajustado_revisoes_bronze) +
        parseFloat(this.total_preco_ajustado_seguros_bronze);
      //Fim Pacote ouro ******************************************************************************
      console.log("Valor pacote bronze", this.valor_pacote_bronze);
    },
    //Carregar itens inseridos nos kits
    async retrievekitsAcessoriosItens() {
      console.log("Buscando itens no kit de acessórios");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}listar_kits_acessorios`,
          {
            params: {
              kit_modelo_id: this.kit_id,
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        console.log("Itens kits acessorios", response.data);
        this.itens_kit_acessorios = response.data.kits_acessorios;
        this.total_preco_acessorios = response.data.totalPreco;
        this.total_precoDesconto_acessorios = response.data.totalPrecoDesconto;
        this.total_precoAjustado_acessorios = response.data.totalPrecoAjustado;
        this.totalPages = response.data.totalPages;
        this.totalItems = response.data.totalItems;
        this.total_kits();
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    async retrievekitsSegurosItens() {
      console.log("Buscando itens no kit de seguros");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}listar_kits_seguros`,
          {
            params: {
              kit_modelo_id: this.kit_id,
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        console.log("Itens kits seguro", response.data);
        this.itens_kit_seguros = response.data.kits_seguro;
        this.total_preco_seguros = response.data.totalPreco;
        this.total_precoDesconto_seguros = response.data.totalPrecoDesconto;
        this.total_precoAjustado_seguros = response.data.totalPrecoAjustado;
        this.totalPages = response.data.totalPages;
        this.totalItems = response.data.totalItems;
        this.total_kits();
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    async retrievekitsRevisoesItens() {
      console.log("Buscando itens no kit de Revisões");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}listar_kits_revisoes`,
          {
            params: {
              kit_modelo_id: this.kit_id,
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        console.log("Itens kits seguro", response.data);
        this.itens_kit_revisoes = response.data.kits_revisoes;
        this.total_preco_revisoes = response.data.totalPreco;
        this.total_precoDesconto_revisoes = response.data.totalPrecoDesconto;
        this.total_precoAjustado_revisoes = response.data.totalPrecoAjustado;
        this.totalPages = response.data.totalPages;
        this.totalItems = response.data.totalItems;
        this.total_kits();
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    total_kits() {
      console.log("Somando os valores do Kit");
      this.total_preco =
        this.total_preco_acessorios +
        this.total_preco_seguros +
        this.total_preco_revisoes;
      this.total_precoDesconto =
        this.total_precoDesconto_acessorios +
        this.total_precoDesconto_seguros +
        this.total_precoDesconto_revisoes;
      this.total_precoAjustado =
        this.total_precoAjustado_acessorios +
        this.total_precoAjustado_seguros +
        this.total_precoAjustado_revisoes;
    },
    async carregar_itens_kits() {
      console.log("Buscando itens no kit de acess de carregar");
      await this.retrievekitsAcessoriosItens();
      await this.retrievekitsSegurosItens();
      await this.retrievekitsRevisoesItens();
    },
    async ranquear() {
      //Verificar se existem pacotes para realizar o ranqueamento
      if (
        this.valor_pacote_ouro ||
        this.valor_pacote_prata ||
        this.valor_pacote_bronze
      ) {
        console.log("Existem pacotes selecionado");
        //Pergar os dados para calcular as taxas

        this.id_coluna = 1;
        this.incluir_acessorios = 0;

        //Calcular as taxas

        //Habilitar os modais
        this.quadro_ouro = true;
        this.quadro_prata = true;
        this.quadro_bronze = true;

        console.log("Valor Pacotes");

        this.valor_pacote_ouro_rank =
          this.valor_pacote_ouro + this.total_financiado_fei;
        this.valor_pacote_prata_rank =
          this.valor_pacote_prata + this.total_financiado_fei;
        this.valor_pacote_bronze_rank =
          this.valor_pacote_bronze + this.total_financiado_fei;
        this.valor_pacote_customizado_rank =
          this.valor_pacote_customizado + this.total_financiado_fei;

        //Formatando os valores para o modal
        this.total_financiamento_ouro = this.currency(
          this.valor_pacote_ouro_rank
        );
        this.total_financiamento_prata = this.currency(
          this.valor_pacote_prata_rank
        );
        this.total_financiamento_bronze = this.currency(
          this.valor_pacote_bronze_rank
        );
        this.total_financiamento_customizado = this.currency(
          this.valor_pacote_customizado_rank
        );

        console.log("ouro", this.valor_pacote_ouro_rank);
        console.log("bronze", this.valor_pacote_bronze_rank);

        this.retrieveRanqueamento();
      }
    },
    async ranquear_customizado() {
      //Verificar se existem pacotes para realizar o ranqueamento
      if (this.valor_pacote_customizado) {
        console.log("Existem pacotes Customizado");
        //Pergar os dados para calcular as taxas

        this.id_coluna = 1;
        this.incluir_acessorios = 0;

        //Calcular as taxas

        //Habilitar os modais
        this.quadro_customizado = true;

        console.log("Valor Pacotes");
        this.valor_pacote_customizado_rank =
          this.valor_pacote_customizado + this.total_financiado_fei;

        //Formatando os valores para o modal
        this.total_financiamento_customizado = this.currency(
          this.valor_pacote_customizado_rank
        );
        this.retrieveRanqueamento();
      }
    },

    ///Taxas//////////////////
    getRequestParamsTaxas(
      total_entrada_fei,
      valor_pacote_ouro_rank,
      valor_pacote_prata_rank,
      valor_pacote_bronze_rank,
      valor_pacote_customizado_rank,
      parcela,
      page,
      pageSize,
      n_atendimento,
      company_id
    ) {
      let params = {};
      if (total_entrada_fei) {
        params["entrada"] = total_entrada_fei;
      }
      if (valor_pacote_ouro_rank) {
        params["financiamento_ouro"] = valor_pacote_ouro_rank;
      }
      if (valor_pacote_prata_rank) {
        params["financiamento_prata"] = valor_pacote_prata_rank;
      }
      if (valor_pacote_bronze_rank) {
        params["financiamento_bronze"] = valor_pacote_bronze_rank;
      }
      if (valor_pacote_customizado_rank) {
        params["financiamento_customizado"] = valor_pacote_customizado_rank;
      }
      if (parcela) {
        params["parcela"] = parcela;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      if (n_atendimento) {
        params["n_atendimento"] = n_atendimento;
      }

      if (company_id) {
        params["empresa_id"] = company_id;
      }
      return params;
    },
    getRequestParamsTaxasCustomizado(
      total_entrada_fei,
      valor_pacote_customizado_rank,
      parcela,
      page,
      pageSize,
      n_atendimento,
      company_id
    ) {
      let params = {};
      if (total_entrada_fei) {
        params["entrada"] = total_entrada_fei;
      }
      if (valor_pacote_customizado_rank) {
        params["financiamento_customizado"] = valor_pacote_customizado_rank;
      }
      if (parcela) {
        params["parcela"] = parcela;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      if (n_atendimento) {
        params["n_atendimento"] = n_atendimento;
      }

      if (company_id) {
        params["empresa_id"] = company_id;
      }
      return params;
    },
    getRequestParamsFiltroTaxas(
      parcela,
      filtro_tipo_veiculo,
      filtro_tipo_tabela,
      filtro_spf,
      razao_financiamento,
      plano,
      page,
      pageSize,
      id_proposta,
      id_coluna
    ) {
      let params = {};
      if (parcela) {
        params["parcela"] = parcela;
      }
      if (filtro_tipo_veiculo) {
        params["filtro_tipo_veiculo"] = filtro_tipo_veiculo;
      }
      if (filtro_tipo_tabela) {
        params["filtro_tipo_tabela"] = filtro_tipo_tabela;
      }
      if (filtro_spf) {
        params["filtro_spf"] = filtro_spf;
      }
      if (razao_financiamento) {
        params["razao_financiamento"] = razao_financiamento;
      }
      if (plano) {
        params["plano"] = plano;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      if (id_proposta) {
        params["id_proposta"] = id_proposta;
      }
      if (id_coluna) {
        params["id_coluna"] = id_coluna;
      }
      return params;
    },
    async retrieveRanqueamento() {
      const params = this.getRequestParamsTaxas(
        this.total_entrada_fei,
        this.total_financiamento_ouro,
        this.total_financiamento_prata,
        this.total_financiamento_bronze,
        this.total_financiamento_customizado,
        this.parcela,
        this.page,
        this.pageSize,
        this.n_atendimento,
        this.company_id
      );
      console.log("Dados do Paramentro para calcular taxas", params);
      /**Chama o método ranqueamento que cria as taxas na tabela tempTaxas e retorna um ok  */
      userService.getTaxasFEI(params).then((response) => {
        const cod = response;
        console.log("Taxas encontradas", response);

        if (cod.status == 200) {
          /**Caso a resposta seja ok chamo os métodos abaixo */
          this.ranqueamento_entrada_ouro();
          this.ranqueamento_entrada_prata();
          this.ranqueamento_entrada_bronze();
          this.ranqueamento_entrada_customizado();
          //this.ranqueamento_entrada_2();
          //this.ranqueamento_entrada_3();
        }
      });
    },
    async retrieveRanqueamentoCustomizado() {
      const params = this.getRequestParamsTaxasCustomizado(
        this.total_entrada_fei,
        this.total_financiamento_customizado,
        this.parcela,
        this.page,
        this.pageSize,
        this.n_atendimento,
        this.company_id
      );
      console.log("Dados do Paramentro para calcular taxas", params);
      /**Chama o método ranqueamento que cria as taxas na tabela tempTaxas e retorna um ok  */
      userService.getTaxasFEI(params).then((response) => {
        const cod = response;
        console.log("Taxas encontradas", response);

        if (cod.status == 200) {
          this.ranqueamento_entrada_customizado();
        }
      });
    },
    //Bloco Ouro
    handlePageChangeEntradaOuro(value) {
      this.page_ouro = value;
      this.ranqueamento_entrada_ouro();
    },
    getRequestParamsEntradaOuro(
      page_ouro,
      pageSize_ouro,
      n_atendimento,
      id_coluna,
      parcela
    ) {
      let params = {};

      if (page_ouro) {
        params["page_ouro"] = page_ouro - 1;
      }
      if (pageSize_ouro) {
        params["size_ouro"] = pageSize_ouro;
      }
      if (n_atendimento) {
        params["n_atendimento"] = n_atendimento;
      }
      if (id_coluna) {
        params["id_coluna"] = id_coluna;
      }
      if (parcela) {
        params["parcela"] = parcela;
      }
      return params;
    },
    async ranqueamento_entrada_ouro() {
      const params = this.getRequestParamsEntradaOuro(
        this.page_ouro,
        this.pageSize_ouro,
        this.n_atendimento,
        this.id_coluna,
        this.parcela
      );

      /**faço uma consulta na tabela TempTaxas chamando a função ranqueamento_entrada_1 */
      userService.getRanqueamento_ouro(params).then((response) => {
        const { parcelas, totalPages, totalItems } = response.data;

        this.parcelamento_ouro = parcelas;
        this.totalPages_ouro = totalPages;
        this.totalItems_ouro = totalItems;

        console.log("Parcelas ouro F&I", this.parcelamento_ouro);

        // var ent_1 = parcelas[0]["total_entrada_1"];
        // var fin_1 = parcelas[0]["total_financiado_1"];
        // var ent_2 = parcelas[0]["total_entrada_2"];
        // var fin_2 = parcelas[0]["total_financiado_2"];
        // var ent_3 = parcelas[0]["total_entrada_3"];
        // var fin_3 = parcelas[0]["total_financiado_3"];

        // this.Valor_Entrada = this.currency(ent_1);
        // this.Valor_Financiado = this.currency(fin_1);
        // this.Valor_Entrada_2 = this.currency(ent_2);
        // this.Valor_Financiado_2 = this.currency(fin_2);
        // this.Valor_Entrada_3 = this.currency(ent_3);
        // this.Valor_Financiado_3 = this.currency(fin_3);
      });
    },

    //Bloco Prata
    handlePageChangeEntradaPrata(value) {
      this.page_prata = value;
      this.ranqueamento_entrada_prata();
    },
    getRequestParamsEntradaPrata(
      page_prata,
      pageSize_prata,
      n_atendimento,
      id_coluna,
      parcela
    ) {
      let params = {};

      if (page_prata) {
        params["page_prata"] = page_prata - 1;
      }
      if (pageSize_prata) {
        params["size_prata"] = pageSize_prata;
      }
      if (n_atendimento) {
        params["n_atendimento"] = n_atendimento;
      }
      if (id_coluna) {
        params["id_coluna"] = id_coluna;
      }
      if (parcela) {
        params["parcela"] = parcela;
      }
      return params;
    },
    async ranqueamento_entrada_prata() {
      const params = this.getRequestParamsEntradaPrata(
        this.page_prata,
        this.pageSize_prata,
        this.n_atendimento,
        this.id_coluna,
        this.parcela
      );

      /**faço uma consulta na tabela TempTaxas chamando a função ranqueamento_entrada_1 */
      userService.getRanqueamento_prata(params).then((response) => {
        const { parcelas, totalPages, totalItems } = response.data;

        this.parcelamento_prata = parcelas;
        this.totalPages_prata = totalPages;
        this.totalItems_prata = totalItems;
      });
    },

    //Bloco Bronze
    handlePageChangeEntradaBronze(value) {
      this.page_bronze = value;
      this.ranqueamento_entrada_bronze();
    },
    getRequestParamsEntradaBronze(
      page_bronze,
      pageSize_bronze,
      n_atendimento,
      id_coluna,
      parcela
    ) {
      let params = {};

      if (page_bronze) {
        params["page_bronze"] = page_bronze - 1;
      }
      if (pageSize_bronze) {
        params["size_bronze"] = pageSize_bronze;
      }
      if (n_atendimento) {
        params["n_atendimento"] = n_atendimento;
      }
      if (id_coluna) {
        params["id_coluna"] = id_coluna;
      }
      if (parcela) {
        params["parcela"] = parcela;
      }
      return params;
    },
    async ranqueamento_entrada_bronze() {
      const params = this.getRequestParamsEntradaBronze(
        this.page_bronze,
        this.pageSize_bronze,
        this.n_atendimento,
        this.id_coluna,
        this.parcela
      );

      /**faço uma consulta na tabela TempTaxas chamando a função ranqueamento_entrada_1 */
      userService.getRanqueamento_bronze(params).then((response) => {
        const { parcelas, totalPages, totalItems } = response.data;

        this.parcelamento_bronze = parcelas;
        this.totalPages_bronze = totalPages;
        this.totalItems_bronze = totalItems;
      });
    },

    //Bloco Customizado
    handlePageChangeEntradaCustomizado(value) {
      this.page_customizado = value;
      this.ranqueamento_entrada_customizado();
    },
    getRequestParamsEntradaCustomizado(
      page_customizado,
      pageSize_customizado,
      n_atendimento,
      id_coluna,
      parcela
    ) {
      let params = {};

      if (page_customizado) {
        params["page_customizado"] = page_customizado - 1;
      }
      if (pageSize_customizado) {
        params["size_customizado"] = pageSize_customizado;
      }
      if (n_atendimento) {
        params["n_atendimento"] = n_atendimento;
      }
      if (id_coluna) {
        params["id_coluna"] = id_coluna;
      }
      if (parcela) {
        params["parcela"] = parcela;
      }
      return params;
    },
    async ranqueamento_entrada_customizado() {
      const params = this.getRequestParamsEntradaCustomizado(
        this.page_customizado,
        this.pageSize_customizado,
        this.n_atendimento,
        this.id_coluna,
        this.parcela
      );

      /**faço uma consulta na tabela TempTaxas chamando a função ranqueamento_entrada_1 */
      userService.getRanqueamento_customizado(params).then((response) => {
        const { parcelas, totalPages, totalItems } = response.data;

        this.parcelamento_customizado = parcelas;
        this.totalPages_customizado = totalPages;
        this.totalItems_customizado = totalItems;
      });
    },

    async retrieveFiltroRanqueamento() {
      const params = this.getRequestParamsFiltroTaxas(
        this.parcela,
        this.filtro_tipo_veiculo,
        this.filtro_tipo_tabela,
        this.filtro_spf,
        this.razao_financiamento,
        this.plano,
        this.page,
        this.pageSize,
        this.id_proposta,
        this.id_coluna
      );
      userService.getFiltroTaxas(params).then((response) => {
        const { parcelas_1, parcelas_2, parcelas_3, totalPages } =
          response.data;
        this.parcelamento_1 = parcelas_1;
        this.parcelamento_2 = parcelas_2;
        this.parcelamento_3 = parcelas_3;
        this.totalPages_1 = totalPages;
        this.totalPages_2 = totalPages;
        this.totalPages_3 = totalPages;
      });
    },

    async select_pmt(value, pacote) {
      this.valor_parcela_financiamento = value;
      this.pmtSelected = pacote;
      const id = this.id_pos_venda_detalhada;

      //Ouro
      if (pacote == 1) {
        const kit_id = this.kit_id_ouro;
        const valor_financiamento = this.total_financiado_fei;
        const valor_pacote = this.valor_pacote_ouro;

        const valor_total_financiamento = valor_financiamento + valor_pacote;
        const valor_parcela_financiamento = this.valor_parcela_financiamento;
        const tipo_pagamento_pacote = this.metodo_pagamento;
        const observacao = this.observacao;

        //Preencher informações do F&I
        this.valor_financiar = this.currency(valor_financiamento);
        this.valor_pacote_selecionado = this.currency(valor_pacote);
        this.total_financiamento_selecionado = this.currency(
          valor_total_financiamento
        );
        this.valor_parcela_selecionada = this.currency(
          valor_parcela_financiamento
        );

        console.log(
          "Selecionando uma parcela",
          valor_financiamento,
          valor_pacote,
          valor_total_financiamento,
          valor_parcela_financiamento,
          kit_id
        );
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}pos_venda_detalhada/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              kit_id: kit_id,
              valor_financiamento: this.currency(valor_financiamento),
              valor_pacote: this.currency(valor_pacote),
              valor_total_financiamento: this.currency(
                valor_total_financiamento
              ),
              valor_parcela_financiamento: this.currency(
                valor_parcela_financiamento
              ),
              tipo_pagamento_pacote: tipo_pagamento_pacote,
              observacao: observacao,
            }),
          }
        );
        console.log("resposta da atualização", response.statusText);
        if (response.statusText == "OK") {
          this.habilitar();
        }
      }
      //Prata
      if (pacote == 2) {
        const kit_id = this.kit_id_prata;
        const valor_financiamento = this.total_financiado_fei;
        const valor_pacote = this.valor_pacote_prata;

        const valor_total_financiamento = valor_financiamento + valor_pacote;
        const valor_parcela_financiamento = this.valor_parcela_financiamento;
        const tipo_pagamento_pacote = this.metodo_pagamento;
        const observacao = this.observacao;

        //Preencher informações do F&I
        this.valor_financiar = this.currency(valor_financiamento);
        this.valor_pacote_selecionado = this.currency(valor_pacote);
        this.total_financiamento_selecionado = this.currency(
          valor_total_financiamento
        );
        this.valor_parcela_selecionada = this.currency(
          valor_parcela_financiamento
        );

        console.log(
          "Selecionando uma parcela",
          valor_financiamento,
          valor_pacote,
          valor_total_financiamento,
          valor_parcela_financiamento,
          kit_id
        );
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}pos_venda_detalhada/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              kit_id: kit_id,
              valor_financiamento: this.currency(valor_financiamento),
              valor_pacote: this.currency(valor_pacote),
              valor_total_financiamento: this.currency(
                valor_total_financiamento
              ),
              valor_parcela_financiamento: this.currency(
                valor_parcela_financiamento
              ),
              tipo_pagamento_pacote: tipo_pagamento_pacote,
              observacao: observacao,
            }),
          }
        );
        console.log("resposta da atualização", response.statusText);
        if (response.statusText == "OK") {
          this.habilitar();
        }
      }
      //Bronze
      if (pacote == 3) {
        const kit_id = this.kit_id_bronze;
        const valor_financiamento = this.total_financiado_fei;
        const valor_pacote = this.valor_pacote_bronze;

        const valor_total_financiamento = valor_financiamento + valor_pacote;
        const valor_parcela_financiamento = this.valor_parcela_financiamento;
        const tipo_pagamento_pacote = this.metodo_pagamento;
        const observacao = this.observacao;

        //Preencher informações do F&I
        this.valor_financiar = this.currency(valor_financiamento);
        this.valor_pacote_selecionado = this.currency(valor_pacote);
        this.total_financiamento_selecionado = this.currency(
          valor_total_financiamento
        );
        this.valor_parcela_selecionada = this.currency(
          valor_parcela_financiamento
        );

        console.log(
          "Selecionando uma parcela",
          valor_financiamento,
          valor_pacote,
          valor_total_financiamento,
          valor_parcela_financiamento,
          kit_id
        );
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}pos_venda_detalhada/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              kit_id: kit_id,
              valor_financiamento: this.currency(valor_financiamento),
              valor_pacote: this.currency(valor_pacote),
              valor_total_financiamento: this.currency(
                valor_total_financiamento
              ),
              valor_parcela_financiamento: this.currency(
                valor_parcela_financiamento
              ),
              tipo_pagamento_pacote: tipo_pagamento_pacote,
              observacao: observacao,
            }),
          }
        );
        console.log("resposta da atualização", response.statusText);
        if (response.statusText == "OK") {
          this.habilitar();
        }
      }
    },
  },
};
</script>
