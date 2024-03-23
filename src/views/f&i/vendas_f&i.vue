<template>
  <SidebarVue ref="sidebar" />
  <NavgatorFI
    ref="navgator"
    :barraTitulo="' F&I - Vendas'"
    :titulo="'vendas'"
  />
  <!--Bloco do Filtro-->
  <div class="card card-filtro">
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
          <th scope="col">Retorno</th>
          <th scope="col">Valor Financiado</th>
          <th scope="col">Valor Parcela</th>
          <th scope="col">Status</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10001</td>
          <td>Auro Silva</td>
          <td>Bianca Rocha</td>
          <td>NEW HR-V TOURING 23/24</td>
          <td>10/01/2024</td>
          <td>R1</td>
          <td>Valor Financiado</td>
          <td>Valor Parcela</td>
          <td>Status</td>
          <td>Ação</td>
          <td>
            <button
              class="dropdown-toggle-icon"
              data-bs-toggle="modal"
              data-bs-target="#ModalFI"
              @click="habilitar_fi(item)"
            >
              <i class="bi bi bi-basket"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pagination
        v-if="acessorios.length"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
                  />
                  <label class="rf_texto">Banco</label>
                </div>
              </div>
            </div>
          </div>
          <!--Quadro dos kits-->
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
                      <ul class="btn-kits-ouro dropdown-menu dropdown-menu-end">
                        <!-- Conteúdo do dropdown -->
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
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
                      <ul class="btn-kits-ouro dropdown-menu dropdown-menu-end">
                        <!-- Conteúdo do dropdown -->
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
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
                      <ul class="btn-kits-ouro dropdown-menu dropdown-menu-end">
                        <!-- Conteúdo do dropdown -->
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <!--Valor-->
              <div class="txt-card-valor"><strong>Valor</strong></div>
              <div class="valor-card-ouro"><strong>R$ 9.500,00</strong></div>
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
                        <!-- Conteúdo do dropdown -->
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
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
                        <!-- Conteúdo do dropdown -->
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
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
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <!--Valor-->
              <div class="txt-card-valor"><strong>Valor</strong></div>
              <div class="valor-card-prata"><strong>R$ 9.500,00</strong></div>
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
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
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
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
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
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <!--Valor-->
              <div class="txt-card-valor"><strong>Valor</strong></div>
              <div class="valor-card-bronze"><strong>R$ 9.500,00</strong></div>
            </div>
            <!--Quadro Customizado-->
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
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
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
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
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
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
                          >
                        </li>
                        <li class="nav-item">
                          <strong
                            ><i class="bi bi-check2-circle"> Teste</i></strong
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
                <strong>R$ 9.500,00</strong>
              </div>
            </div>
          </div>
          <!--Informação F&I-->
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
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
                    v-model="filtroPlaca"
                    @input="filtrarVeiculos"
                  />
                  <label class="rf_texto">Diferença Parcela</label>
                </div>
              </div>
              <div class="col-2">
                <div class="input-group-append">
                  <button
                    class="btn btn-lg btn-filtro"
                    type="button"
                    @click="
                      page = 1;
                      retrievePropostas();
                    "
                  >
                    <span class="rf_texto_btn">Ranquear</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--Ranqueamento F&I-->
          <div class="card card-vendas">
            <div class="row g-2 p-2">
              <div class="card-title gy-4">
                <i class="bi bi-journal-text fs-5 icone_filtro"
                  ><span class="texto_filtro">
                    <strong>Ranqueamento F&I</strong></span
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
                  <tr v-for="item in sortedItems" :key="item.id">
                    <td>{{ item.Financeira }}</td>
                    <td>{{ item.Plano }}</td>
                    <td>{{ item.Ret }}</td>
                    <td>{{ item.EntMin }}</td>
                    <td>{{ item.EntMinPer }}</td>
                    <td>{{ item.Rentabilidade }}</td>
                    <td>{{ item.Rebate }}</td>
                    <td>{{ item.Pmt }}</td>
                    <td>{{ item.Spf }}</td>
                    <td>{{ item.Retorno }}</td>
                    <td>{{ item.TacCob }}</td>
                    <td>{{ item.TacDev }}</td>
                    <td>{{ item.Coef }}</td>
                    <td>{{ item.Parcela }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="col-1">
            <button
              type="button"
              class="btn btn-lg btn-filtro"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RodapeVue />
</template>
<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import NavgatorFI from "../../components/menu/NavgatorFI.vue";
import RodapeVue from "../../components/menu/Rodape.vue";

export default {
  name: "Dashboard F&I",

  components: {
    SidebarVue,
    NavgatorFI,
    RodapeVue,
  },
  data() {
    return {
      modal_fi: false,
      items: [
        {
          Financeira: "Banco A",
          Plano: "Plano X",
          Ret: "R5",
          EntMin: "R$ 0,00",
          EntMinPer: 10,
          Rentabilidade: "R$ 6.778,80",
          Rebate: "R$ 0,00",
          Pmt: "R$ 11.527,18",
          Spf: 0,
          Retorno: "6.0",
          TacCob: "R$ 1.250,00",
          TacDev: 0,
          Coef: 0.10091,
          Parcela: 12,
        },
        {
          Financeira: "Banco B",
          Plano: "Plano Y",
          Ret: "R5",
          EntMin: "R$ 100,00",
          EntMinPer: 20,
          Rentabilidade: "R$ 7.500,00",
          Rebate: "R$ 0,00",
          Pmt: "R$ 10.000,00",
          Spf: 0,
          Retorno: "6.0",
          TacCob: "R$ 1.000,00",
          TacDev: 50,
          Coef: 0.105,
          Parcela: 10,
        },
        {
          Financeira: "Banco C",
          Plano: "Plano Z",
          Ret: "R5",
          EntMin: "R$ 200,00",
          EntMinPer: 30,
          Rentabilidade: "R$ 8.200,00",
          Rebate: "R$ 0,00",
          Pmt: "R$ 12.500,00",
          Spf: 0,
          Retorno: "6.0",
          TacCob: "R$ 1.500,00",
          TacDev: 75,
          Coef: 0.1075,
          Parcela: 8,
        },
      ],
      sortColumn: "", // Coluna atualmente classificada
      sortOrder: 1,
      pageSize: 5,
      pageSizes: 5, // 1 para crescente, -1 para decrescente
      filtroPlaca: "",
      selectedFilter: "",
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
  methods: {
    habilitar_fi() {
      console.log("Aqui habilita o modal F&I ----- 0001");

      this.modal_fi = true;
    },
    sortTable(column) {
      if (column === this.sortColumn) {
        this.sortOrder *= -1; // Alterna entre crescente e decrescente
      } else {
        this.sortColumn = column;
        this.sortOrder = 1; // Começa com ordem crescente ao classificar uma nova coluna
      }
    },
  },
};
</script>
