<template>
  <SidebarVue ref="sidebar" />
  <NavgatorFI
    ref="navgator"
    :barraTitulo="' F&I - Reimprimir Menu'"
    :titulo="'vendas'"
    :id="id_rota"
  />
  <!--Dados do Atendimento-->
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
  <div class="card card-filtro card-vendas">
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
      <div class="col-1">
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
      <div class="col-1">
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
      <div class="col-1">
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
      <div class="col-1">
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
      <div class="col-1">
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
  <div class="card card-filtro card-vendas">
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
      <div class="col-2">
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
      <div class="col-2">
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
      <div class="col-2">
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
      <div class="col-1">
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
      <div class="col-1">
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
      <div class="col-1">
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
            v-model="banco_selecionado"
          />
          <label class="rf_texto">Banco</label>
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
            v-model="obs_desk"
          />
          <label class="rf_texto">Observações do Desk</label>
        </div>
      </div>
      <div class="col-2">
        <div class="form-floating">
          <input
            type="text"
            disabled
            class="form-control rf_bg_form rf_texto"
            v-model="tipo_pagamento"
          />
          <label class="rf_texto">Tipo de Pagamento</label>
        </div>
      </div>
    </div>
  </div>
  <!--Informações do financiamento do F&I-->
  <div class="card-filtro">
    <div class="card card-vendas">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"
            ><span class="texto_filtro"
              ><strong>Informações F&I - Comercializado</strong></span
            ></i
          >
        </div>
      </div>
      <div v-if="this.checar_tipo_pagamento != 2">
        <div class="row g-2 p-2">
          <div class="col">
            <div class="form-floating">
              <input
                type="text"
                disabled
                class="form-control rf_bg_form rf_texto"
                v-model="valor_entrada_selecionada"
              />
              <label class="rf_texto">Entrada Simulada</label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating">
              <input
                type="text"
                disabled
                class="form-control rf_bg_form rf_texto"
                v-model="valor_financiar"
              />
              <label class="rf_texto">Valor Proposta</label>
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
                v-model="tipo_pagamento"
              />
              <label class="rf_texto">Pagamento</label>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.checar_tipo_pagamento == 2">
        <div class="row g-2 p-2">
          <div class="col-2">
            <div class="form-floating">
              <input
                type="text"
                class="form-control rf_bg_form rf_texto"
                disabled
                v-model="valor_pacote_vista"
              />
              <label class="rf_texto">Valor do Pacote</label>
            </div>
          </div>
        </div>
        <div class="g-2 p-2">
          <div class="card-title gy-4">
            <i class="bi bi-tools fs-5 icone_kit"
              ><span class="texto_kit">Composição do Pagamento</span></i
            >
          </div>
          <table class="table rf_texto">
            <thead>
              <tr>
                <th scope="col" style="width: 15%">Valor Informado</th>
                <th scope="col" style="width: 15%">Pagamento</th>
                <th scope="col" style="width: 10%">Qtd.</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in itens_pagamentos"
                :key="item.id"
                class="table-linha"
              >
                <td>{{ this.currency(item.valor_parcela) }}</td>
                <td>{{ item.tipo_pagamento_fei.descricao }}</td>
                <td>{{ item.qtd_parcela }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!--Informações do Pacote Selecionado-->
  <div class="card-filtro">
    <div class="card card-customizado">
      <i class="bi bi-gem card-texto-vendas-customizado"> Pacote Selecionado</i>

      <div class="row">
        <!--Acessórios-->
        <div class="col divisoria_customizado_acessorio">
          <div class="barra_fei_menu_customizado">
            <span class="texto_centralizado"><strong>Acessórios</strong></span>
          </div>
          <div class="col">
            <ul class="nav nav-item" style="display: block; clear: both">
              <li
                class="nav-item"
                v-for="item in itens_kit_acessorios"
                :key="item.id"
              >
                <strong
                  ><i class="bi bi-check2-circle p-2">
                    <span class="sp_icon rf_texto_pdf">{{
                      item.descricao
                    }}</span></i
                  ></strong
                >
              </li>
            </ul>
          </div>
        </div>
        <!--Revisão-->
        <div class="col divisoria_customizado_revisao">
          <div class="col barra_fei_menu_customizado">
            <span class="texto_centralizado"
              ><strong>Revisão pré-paga</strong></span
            >
          </div>
          <div class="col divisoria_customizado">
            <ul class="nav nav-item" style="display: block; clear: both">
              <li
                class="nav-item"
                v-for="item in itens_kit_revisoes"
                :key="item.id"
              >
                <strong
                  ><i class="bi bi-check2-circle p-2">
                    <span class="sp_icon rf_texto_pdf">{{
                      item.descricao
                    }}</span></i
                  ></strong
                >
              </li>
            </ul>
          </div>
        </div>
        <!--Seguros-->
        <div class="col divisoria_customizado_info">
          <div class="col barra_fei_menu_customizado">
            <span class="texto_centralizado"><strong>Seguros</strong></span>
          </div>
          <div class="col">
            <ul class="nav nav-item" style="display: block; clear: both">
              <li
                class="nav-item"
                v-for="item in itens_kit_seguros"
                :key="item.id"
              >
                <strong
                  ><i class="bi bi-check2-circle p-2">
                    <span class="sp_icon rf_texto_pdf">{{
                      item.descricao
                    }}</span></i
                  >
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Informações do Rodapé-->
  <div class="card card-filtro card-vendas">
    <div class="row g-2 p-2 justify-content-end mt-2">
      <div class="col">
        <div class="form-floating">
          <textarea
            v-model="observacao"
            class="form-control rf_bg_form rf_texto"
            style="height: 150px"
            disabled
          ></textarea>
          <label class="rf_texto">Observações</label>
        </div>
      </div>
      <div class="col-2">
        <div v-if="this.checar_tipo_pagamento != 2">
          <button
            type="button"
            style="height: 150px"
            class="btn btn-lg btn-filtro"
            data-bs-toggle="modal"
            data-bs-target="#ModalGerarMenuCustomizado"
          >
            Reimprimir Menu
          </button>
        </div>
        <div v-if="this.checar_tipo_pagamento == 2">
          <button
            type="button"
            style="height: 150px"
            class="btn btn-lg btn-filtro"
            data-bs-toggle="modal"
            data-bs-target="#ModalGerarMenuPacotes"
          >
            Reimprimir Menu
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--Modal Gerar Menu Pacote Customizado-->
  <div
    class="modal fade"
    id="ModalGerarMenuCustomizado"
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
                      ><strong class="rf_titulo_pdf"
                        >Dados do Veículo</strong
                      ></span
                    ></i
                  >
                </div>
                <div class="col-2">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Marca</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{ marca }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Modelo</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{ modelo }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf">Cor</label>
                    <span class="rf_texto_menu rf_texto_pdf">{{ cor }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Placa</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{ placa }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Chassi</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{ chassi }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Ano Fab.</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      ano_fabricacao
                    }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Ano Mod.</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      ano_modelo
                    }}</span>
                  </div>
                </div>
              </div>
              <!--Dados do Financiamento-->

              <div class="row g-2 p-2">
                <div class="col-6">
                  <i class="bi bi-journal-bookmark-fill fs-5 icone_filtro_menu"
                    ><span class="texto_filtro_menu"
                      ><strong class="rf_titulo_pdf"
                        >Dados do Financiamento</strong
                      ></span
                    ></i
                  >
                </div>
                <div class="col-6">
                  <i class="bi bi-journal-text fs-5 icone_filtro_menu"
                    ><span class="texto_filtro_menu"
                      ><strong class="rf_titulo_pdf"
                        >Dados do Atendimento</strong
                      ></span
                    ></i
                  >
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Total Entrada</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      valor_entrada_selecionada
                    }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Total Financiamento</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      total_financiamento_selecionado
                    }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Valor Parcela</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      valor_parcela_selecionada
                    }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Qtd. Parcela</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      parcela
                    }}</span>
                  </div>
                </div>

                <div class="col-2">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Banco</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      banco_selecionado_customizado
                    }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Nº Atend.</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      n_atendimento
                    }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Vendedor</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      vendedor
                    }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Cliente</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      cliente
                    }}</span>
                  </div>
                </div>
              </div>
              <!--Dados do Atendimento-->

              <div class="row g-2 p-2">
                <div class="col-7">
                  <i class="bi bi-cash fs-5 icone_filtro_menu">
                    <span class="texto_filtro_menu rf_texto_pdf"
                      ><strong class="rf_titulo_pdf"
                        >Forma de Pagamento - </strong
                      >{{
                        metodo_pagamento == "1"
                          ? "Financiamento"
                          : metodo_pagamento == "2"
                          ? "À Vista"
                          : ""
                      }}</span
                    >

                    <span class="texto_filtro_menu rf_texto_pdf"
                      ><strong class="rf_titulo_pdf">Data - </strong
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

            <!--Quadro Customizado-->
            <div class="card card-customizado">
              <i
                class="bi bi-gem card-texto-vendas-customizado rf_titulo_destaque_pdf"
              >
                Pacote Selecionado</i
              >

              <div class="row">
                <!--Acessórios-->
                <div class="col divisoria_customizado_acessorio">
                  <div class="barra_fei_menu_customizado">
                    <span class="texto_centralizado rf_titulo_destaque_pdf"
                      ><strong>Acessórios</strong></span
                    >
                  </div>
                  <div class="col">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_acessorios"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon rf_texto_pdf">{{
                              item.descricao
                            }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Revisão-->
                <div class="col divisoria_customizado_revisao">
                  <div class="col barra_fei_menu_customizado">
                    <span class="texto_centralizado rf_titulo_destaque_pdf"
                      ><strong>Revisão pré-paga</strong></span
                    >
                  </div>
                  <div class="col divisoria_customizado">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_revisoes"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon rf_texto_pdf">{{
                              item.descricao
                            }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Seguros-->
                <div class="col divisoria_customizado_seguros">
                  <div class="col barra_fei_menu_customizado">
                    <span class="texto_centralizado rf_titulo_destaque_pdf"
                      ><strong>Seguros</strong></span
                    >
                  </div>
                  <div class="col">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_seguros"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon rf_texto_pdf">{{
                              item.descricao
                            }}</span></i
                          >
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Informações-->
                <div class="col divisoria_customizado_info">
                  <div class="col barra_fei_menu_customizado">
                    <span class="texto_centralizado rf_titulo_destaque_pdf"
                      ><strong>Informações</strong></span
                    >
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col-6">
                        <span class="esquerda rf_texto_pdf">
                          <strong>NOVO VALOR PARCELA:</strong>
                        </span>
                      </div>
                      <div class="col-6 direita rf_texto_pdf">
                        <span
                          ><strong class="rf_texto_pdf">{{
                            this.currency(novo_valor_parcela_customizado)
                          }}</strong></span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col mt-2">
                    <div class="row">
                      <div class="col-6">
                        <div class="esquerda">
                          <span class="texto_tachado">
                            <strong class="tachado rf_texto_pdf"
                              >de {{ this.currency(de_customizado) }}</strong
                            >
                          </span>
                        </div>
                      </div>
                      <div class="col-6 direita">
                        <span class="texto_oferta rf_texto_pdf"
                          >por
                          <strong> {{ this.currency(por_customizado) }}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-5 mt-2 position-relative">
                      <img
                        src="../../assets/economia_customizado.png"
                        alt="Bootstrap"
                        width="150"
                        class="img-fluid"
                      />
                      <div class="texto-sobre-imagem rf_texto_pdf">
                        {{ this.currency(economia_customizado) }}
                      </div>
                    </div>
                    <div class="col-7 mt-5 direita">
                      <span class="texto_oferta rf_texto_pdf"
                        >por apenas
                        <strong>{{ this.currency(apenas_customizado) }}</strong>
                        a mais na parcela por dia
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row g-2 p-2 mt-4">
              <div class="col-12 rodape">
                <span class="texto_cartao rf_titulo_destaque_pdf"
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
  <!--Modal Gerar Menu Pacote Customizado-->
  <div
    class="modal fade"
    id="ModalGerarMenuPacotes"
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
          <div class="mt-3 rf_texto_pdf" ref="contentToPrint4">
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
                      ><strong class="rf_titulo_pdf"
                        >Dados do Veículo</strong
                      ></span
                    ></i
                  >
                </div>
                <div class="col-2">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Marca</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{ marca }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Modelo</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{ modelo }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf">Cor</label>
                    <span class="rf_texto_menu rf_texto_pdf">{{ cor }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Placa</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{ placa }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Chassi</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{ chassi }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Ano Fab.</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      ano_fabricacao
                    }}</span>
                  </div>
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Ano Mod.</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      ano_modelo
                    }}</span>
                  </div>
                </div>
              </div>
              <!--Dados do Financiamento-->

              <div class="row g-2 p-2">
                <div class="col-12">
                  <i class="bi bi-journal-text fs-5 icone_filtro_menu"
                    ><span class="texto_filtro_menu"
                      ><strong class="rf_titulo_pdf"
                        >Dados do Atendimento</strong
                      ></span
                    ></i
                  >
                </div>
                <div class="col-1">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Nº Atend.</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      n_atendimento
                    }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Vendedor</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      vendedor
                    }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row rf_bg_form_menu">
                    <label class="rf_texto_menu_titulo rf_texto_pdf"
                      >Cliente</label
                    >
                    <span class="rf_texto_menu rf_texto_pdf">{{
                      cliente
                    }}</span>
                  </div>
                </div>
              </div>
              <!--Dados do Atendimento-->

              <div class="row g-2 p-2">
                <div class="col-7">
                  <i class="bi bi-cash fs-5 icone_filtro_menu">
                    <span class="texto_filtro_menu rf_texto_pdf"
                      ><strong class="rf_titulo_pdf"
                        >Forma de Pagamento - </strong
                      >Customizada</span
                    >

                    <span class="texto_filtro_menu rf_texto_pdf"
                      ><strong class="rf_titulo_pdf">Data - </strong
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

            <!--Quadro Customizado-->
            <div class="card card-customizado">
              <i
                class="bi bi-gem card-texto-vendas-customizado rf_titulo_destaque_pdf"
              >
                Pacote Selecionado</i
              >

              <div class="row">
                <!--Acessórios-->
                <div class="col divisoria_customizado_acessorio">
                  <div class="barra_fei_menu_customizado">
                    <span class="texto_centralizado rf_titulo_destaque_pdf"
                      ><strong>Acessórios</strong></span
                    >
                  </div>
                  <div class="col">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_acessorios"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon rf_texto_pdf">{{
                              item.descricao
                            }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Revisão-->
                <div class="col divisoria_customizado_revisao">
                  <div class="col barra_fei_menu_customizado">
                    <span class="texto_centralizado rf_titulo_destaque_pdf"
                      ><strong>Revisão pré-paga</strong></span
                    >
                  </div>
                  <div class="col divisoria_customizado">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_revisoes"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon rf_texto_pdf">{{
                              item.descricao
                            }}</span></i
                          ></strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Seguros-->
                <div class="col divisoria_customizado_seguros">
                  <div class="col barra_fei_menu_customizado">
                    <span class="texto_centralizado rf_titulo_destaque_pdf"
                      ><strong>Seguros</strong></span
                    >
                  </div>
                  <div class="col">
                    <ul
                      class="nav nav-item"
                      style="display: block; clear: both"
                    >
                      <li
                        class="nav-item"
                        v-for="item in itens_kit_seguros"
                        :key="item.id"
                      >
                        <strong
                          ><i class="bi bi-check2-circle p-2">
                            <span class="sp_icon rf_texto_pdf">{{
                              item.descricao
                            }}</span></i
                          >
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--Informações-->
                <div class="col divisoria_customizado_info">
                  <div class="col barra_fei_menu_customizado">
                    <span class="texto_centralizado rf_titulo_destaque_pdf"
                      ><strong>Formas de Pagamento</strong></span
                    >
                  </div>
                  <div class="col">
                    <table class="table rf_texto_pdf">
                      <thead>
                        <tr>
                          <th scope="col" style="width: 15%">
                            Valor Informado
                          </th>
                          <th scope="col" style="width: 15%">Pagamento</th>
                          <th scope="col" style="width: 10%">Qtd.</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in itens_pagamentos"
                          :key="item.id"
                          class="table-linha"
                        >
                          <td>{{ this.currency(item.valor_parcela) }}</td>
                          <td>{{ item.tipo_pagamento_fei.descricao }}</td>
                          <td>{{ item.qtd_parcela }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="row g-2 p-2 mt-4">
              <br />
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
              data-bs-toggle="modal"
            >
              Fechar
            </button>
          </div>
          <div class="col-1">
            <button
              class="btn btn-lg btn-filtro"
              @click="generatePdfPacotesAvista"
            >
              IMPRIMIR
            </button>
          </div>
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

import RodapeVue from "../../components/menu/Rodape.vue";
import axios from "axios";
import TokenService from "../../services/token.service";
import jwt_decode from "jwt-decode";

import Message from "../../components/modal/Message.vue";
import html2pdf from "html2pdf.js";

export default {
  name: "Vendas F&I",
  components: {
    SidebarVue,
    NavgatorFI,
    RodapeVue,
    Message,
  },
  data() {
    return {
      valor_parcela_selecionada: "",
      total_financiamento_selecionado: 0,
      valor_pacote_selecionado: "",
      valor_financiar: "",
      metodo_pagamento: "",
      parcela: "",
      //Daddos do atendimento
      n_atendimento: "",
      vendedor: "",
      cliente: "",
      //Dados do Veículo
      marca: "",
      modelo: "",
      cor: "",
      placa: "",
      chassi: "",
      ano_fabricacao: "",
      ano_modelo: "",
      //Dados do Financiamento
      total_entrada: "",
      total_financiado: "",
      valor_parcela: "",
      parcela_desk: "",
      qtd_parcela: "",
      retorno: "",
      coeficiente: "",
      banco: "",

      //Dados do quadros dos kits

      itens_kit_acessorios_ouro: [],
      itens_kit_revisoes_ouro: [],
      itens_kit_seguros_ouro: [],
      valor_pacote_ouro: [],
      parcela_ouro: "",

      itens_kit_acessorios_prata: [],
      itens_kit_revisoes_prata: [],
      itens_kit_seguros_prata: [],
      valor_pacote_prata: [],
      parcela_prata: "",

      itens_kit_acessorios_bronze: [],
      itens_kit_revisoes_bronze: [],
      itens_kit_seguros_bronze: [],
      valor_pacote_bronze: [],
      parcela_bronze: "",

      //Dados customizado

      valor_pacote_customizado: [],
      parcela_customizado: "",

      //Dados da Mensagem
      abrir_modal: false,
      msg: "",

      company_id: "",
      user_log: "",

      //Campos tabela Pos Venda Detalhada
      valor_parcela_financiamento: "",
      //Dados do atendimento
      id_pos_venda_detalhada: "",

      //Dados kit Acessorio

      total_preco_acessorios: "",
      total_preco_desconto_acessorios: "",
      total_preco_ajustado_acessorios: "",

      total_preco_revisoes: "",
      total_preco_desconto_revisoes: "",
      total_preco_ajustado_revisoes: "",

      total_preco_seguros: "",
      total_preco_desconto_seguros: "",
      total_preco_ajustado_seguros: "",

      total_financiamento_ouro: "",

      total_preco_acessorios_prata: "",
      total_preco_desconto_acessorios_prata: "",
      total_preco_ajustado_acessorios_prata: "",

      total_preco_revisoes_prata: "",
      total_preco_desconto_revisoes_prata: "",
      total_preco_ajustado_revisoes_prata: "",

      total_preco_seguros_prata: "",
      total_preco_desconto_seguros_prata: "",
      total_preco_ajustado_seguros_prata: "",

      total_financiamento_prata: "",

      total_preco_acessorios_bronze: "",
      total_preco_desconto_acessorios_bronze: "",
      total_preco_ajustado_acessorios_bronze: "",

      total_preco_revisoes_bronze: "",
      total_preco_desconto_revisoes_bronze: "",
      total_preco_ajustado_revisoes_bronze: "",

      total_preco_seguros_bronze: "",
      total_preco_desconto_seguros_bronze: "",
      total_preco_ajustado_seguros_bronze: "",

      total_financiamento_bronze: "",

      total_preco_acessorios_customizado: "",
      total_preco_desconto_acessorios_customizado: "",
      total_preco_ajustado_acessorios_customizado: "",

      total_preco_revisoes_customizado: "",
      total_preco_desconto_revisoes_customizado: "",
      total_preco_ajustado_revisoes_customizado: "",

      total_preco_seguros_customizado: "",
      total_preco_desconto_seguros_customizado: "",
      total_preco_ajustado_seguros_customizado: "",

      total_financiamento_customizado: "",
      entrada_fei: "",

      //buscando Modelo
      modelo_codigo: "",

      ids_kits_modelo: [],

      banco_selecionado: null,

      total_entrada_fei: "",
      total_financiado_fei: "",

      kit_id_ouro: "",
      kit_id_prata: "",
      kit_id_bronze: "",
      kit_id_customizado: "",

      //Gerar Menu
      //ouro
      novo_valor_parcela: 0,
      de: 0,
      por: 0,
      economia: 0,
      apenas: 0,

      modelo_id: "",
      observacao: "",

      //customizado
      novo_valor_parcela_customizado: 0,
      de_customizado: 0,
      por_customizado: 0,
      economia_customizado: 0,
      apenas_customizado: 0,

      total_preco: "",
      itens_kit_revisoes: [],
      itens_kit_acessorios: [],
      itens_kit_seguros: [],

      id_rota: "",
      filtro: "",

      obs_desk: "",
      valor_entrada_customizado: "",
      habilitar_ranquear_pacotes: true,
      valor_entrada_selecionada: "",
      valor_entrada_selecionada_customizado: "",
      checar_tipo_pagamento: "",
      tipo_pagamento: "",
      itens_pagamentos: [],
      banco_selecionado_customizado: "",
    };
  },
  mounted() {
    this.getToken();
    this.habilitar_fi();
    this.retrievePropostas();
    this.buscar_valor_pacote();
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

    async habilitar_fi() {
      console.log("Aqui habilita o modal F&I ----- 0001");
      try {
        const id = this.$route.params.id;
        this.id_pos_venda = this.$route.params.id;
        //Verificar se já foi criado a pos venda
        const pos_venda = await axios.get(
          `${process.env.VUE_APP_API_URL}pos_venda_detalhada`,
          {
            params: {
              id: id,
            },
          }
        );
        console.log(
          "Resposta pos venda ------------------------------------------------------------------------------------------------------------------------------",
          pos_venda
        );
        console.log(pos_venda);
        if (pos_venda.data.count > 0) {
          this.id_pos_venda_detalhada = pos_venda.data.rows[0].id;
          console.log("ID Detalhado", this.id_pos_venda_detalhada);
        }
      } catch (error) {
        console.log(error);
        this.abrir_modal = true;
        this.msg =
          "Houve um erro abrir esse atendimento, entre em contato  com o suporte.";
        setTimeout(
          () => (this.abrir_modal = false),
          //window.location.reload(),
          1000
        );
      }
    },
    async retrievePropostas() {
      const posVendaId = this.$route.params.id;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}reimpressao/${posVendaId}`,
          {
            params: {
              id: posVendaId,
              empresa_id: this.company_id,
            },
          }
        );

        console.log("Listando dados da proposta - 000001", response.data);
        // Faça algo com os dados aqui, como atribuir a uma variável de componente
        this.vendas = response.data; // exemplo de atribuição
        this.checar_tipo_pagamento =
          response.data.menu_pos_venda_detalhada[0].tipo_pagamento_pacote; //
        this.popular_formulario(this.vendas);
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 1000);
        }
      }
    },

    async retrievePagamentosFei() {
      const pos_venda_detalhada_id = this.id_pos_venda_detalhada;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}pagamento_fei`,
          {
            params: {
              pos_venda_detalhada_id: pos_venda_detalhada_id,
              status: 1,
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        console.log(
          "Lista de pagamentos feisssssssssssssssssssssssssssssssssss",
          response
        );
        this.itens_pagamentos = response.data.pagamento_fei;
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 1000);
        }
      }
    },
    async buscar_valor_pacote() {
      const posVendaId = this.$route.params.id;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}buscar_valor_pacote/${posVendaId}`,
          {
            params: {
              id: posVendaId,
              empresa_id: this.company_id,
            },
          }
        );

        console.log(
          "Listassssssssssssssssssssssssss de propostas",
          response.data.menu_pos_venda_detalhada[0].valor_pacote
        );
        this.valor_pacote_vista = this.currency(
          response.data.menu_pos_venda_detalhada[0].valor_pacote
        );
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 1000);
        }
      }
    },

    popular_formulario(item) {
      console.log(
        "Tratando os dados para preencher os campos de reimpressão - 000002 ",
        item
      );
      //Daddos do Atendimento
      this.n_atendimento = item.atendimento_id;
      this.vendedor = item.pos_venda_proposta.vendedores.username;
      this.cliente = item.pos_venda_proposta.clientes.nome;
      if (item.pos_venda_proposta.tipo_pagamento == "1") {
        this.tipo_pagamento = "Pagamento à vista";
      }
      if (item.pos_venda_proposta.tipo_pagamento == "0") {
        this.tipo_pagamento = "Pagamento por financimento";
      }
      this.obs_desk = item.pos_venda_proposta.obs;
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
      this.parcela_desk = item.pos_venda_proposta.pmt_escolhido;
      this.valor_parcela = this.currency(item.pos_venda_proposta.pmt_escolhido);
      this.qtd_parcela = item.pos_venda_proposta.qtd_meses;
      if (this.qtd_parcela != null) {
        this.metodo_pagamento = 1;
      }
      this.total_entrada_fei =
        item.pos_venda_proposta.val_entrada_financiamento;
      this.total_financiado_fei =
        item.pos_venda_proposta.val_financiamento +
        item.pos_venda_proposta.val_entrada_financiamento;
      for (let i = 0; i < item.pos_venda_proposta.menu_proposta.length; i++) {
        var rank = item.pos_venda_proposta.menu_proposta[i].menu_rank;
        for (let j = 0; j < rank.length; j++) {
          if (rank[j].pmt === item.pos_venda_proposta.pmt_escolhido) {
            // Se encontrado, retornar o coeficiente correspondente
            this.coeficiente = rank[j].coeficiente;
            this.retorno = rank[j].returnType;
            this.banco_selecionado = rank[j].bancos_rank.nome;
          }
        }
      }
      this.observacao = item.menu_pos_venda_detalhada[0].observacao;

      //Dados do F&I Comecializado
      this.valor_entrada_selecionada = this.currency(
        parseFloat(item.menu_pos_venda_detalhada[0].valor_financiamento) -
          (parseFloat(
            item.menu_pos_venda_detalhada[0].valor_total_financiamento
          ) -
            parseFloat(item.menu_pos_venda_detalhada[0].valor_pacote))
      );
      this.valor_financiar = this.currency(
        item.pos_venda_proposta.val_entrada_financiamento +
          item.pos_venda_proposta.val_financiamento
      );
      this.valor_pacote_selecionado = this.currency(
        parseFloat(item.menu_pos_venda_detalhada[0].valor_pacote)
      );
      this.total_financiamento_selecionado = this.currency(
        parseFloat(item.menu_pos_venda_detalhada[0].valor_total_financiamento)
      );
      this.valor_parcela_selecionada = this.currency(
        parseFloat(item.menu_pos_venda_detalhada[0].valor_parcela_financiamento)
      );
      this.parcela_customizado = parseFloat(
        item.menu_pos_venda_detalhada[0].valor_parcela_financiamento
      );
      this.parcela = item.pos_venda_proposta.qtd_meses;

      console.log("Banco dos pacotes", item.menu_pos_venda_detalhada[0]);
      const kit_id = item.menu_pos_venda_detalhada[0].kit_id;
      console.log("Kits ID", kit_id);

      if (kit_id) {
        if (
          item.menu_pos_venda_detalhada[0].pos_venda_detalhada_menu.length > 0
        ) {
          for (
            let k = 0;
            k <
            item.menu_pos_venda_detalhada[0].pos_venda_detalhada_menu[0]
              .menu_rank_pos_venda.length;
            k++
          ) {
            var rankP = parseFloat(
              item.menu_pos_venda_detalhada[0].valor_parcela_financiamento
            );

            if (
              rankP ===
              item.menu_pos_venda_detalhada[0].pos_venda_detalhada_menu[0]
                .menu_rank_pos_venda[k].pmt
            ) {
              this.banco_selecionado_customizado =
                item.menu_pos_venda_detalhada[0].pos_venda_detalhada_menu[0].menu_rank_pos_venda[
                  k
                ].bancos_rank_pos_venda.nome;
            }
          }
        } else {
          this.retrievePagamentosFei();
        }
        this.buscar_pacote_selecionado(kit_id);
      } else {
        this.customizado();
      }
    },
    //funções customizado
    customizado() {
      console.log("Iniciar pacote customizado", this.n_atendimento);

      this.retrievekitsAcessoriosItens();
      this.retrievekitsSegurosItens();
      this.retrievekitsRevisoesItens();
      this.resumoRanqueamentoCustomizado();
    },

    async buscar_pacote_selecionado(kit_modelo_id) {
      console.log("ID --------------", kit_modelo_id);
      //Acessórios ***************************************************************************
      const pacote_acessorios = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_acessorios`,
        {
          params: {
            kit_modelo_id: kit_modelo_id,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_acessorios = pacote_acessorios.data.kits_acessorios;
      this.total_preco_acessorios = pacote_acessorios.data.totalPreco;
      this.total_preco_desconto_acessorios =
        pacote_acessorios.data.totalPrecoDesconto;
      this.total_preco_ajustado_acessorios =
        pacote_acessorios.data.totalPrecoAjustado;

      //Revisões
      const pacote_revisoes = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_revisoes`,
        {
          params: {
            kit_modelo_id: kit_modelo_id,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_revisoes = pacote_revisoes.data.kits_revisoes;
      this.total_preco_revisoes = pacote_revisoes.data.totalPreco;
      this.total_preco_desconto_revisoes =
        pacote_revisoes.data.totalPrecoDesconto;
      this.total_preco_ajustado_revisoes =
        pacote_revisoes.data.totalPrecoAjustado;
      //Revisões
      const pacote_seguros = await axios.get(
        `${process.env.VUE_APP_API_URL}listar_kits_seguros`,
        {
          params: {
            kit_modelo_id: kit_modelo_id,
            page: this.page - 1,
            size: this.pageSize,
          },
        }
      );
      this.itens_kit_seguros = pacote_seguros.data.kits_seguro;
      this.total_preco_seguros = pacote_seguros.data.totalPreco;
      this.total_preco_desconto_seguros =
        pacote_seguros.data.totalPrecoDesconto;
      this.total_preco_ajustado_seguros =
        pacote_seguros.data.totalPrecoAjustado;

      this.valor_pacote =
        parseFloat(this.total_preco_ajustado_acessorios) +
        parseFloat(this.total_preco_ajustado_revisoes) +
        parseFloat(this.total_preco_ajustado_seguros);
      //Fim Pacote ouro ******************************************************************************

      this.de_customizado =
        this.total_preco_acessorios +
        this.total_preco_revisoes +
        this.total_preco_seguros;
      this.por_customizado = this.valor_pacote;
      this.economia_customizado = this.de_customizado - this.por_customizado;
      this.novo_valor_parcela_customizado = this.formatarDecimal(
        this.valor_parcela_selecionada
      );

      const valor_desk = parseFloat(this.parcela_desk);
      this.apenas_customizado =
        (this.novo_valor_parcela_customizado - valor_desk) / 30;

      console.log(
        "Variaveis",
        this.formatarDecimal(this.valor_parcela_selecionada),
        this.apenas
      );
    },
    generatePdfPacotesAvista() {
      // console.log("Imprimir ----------------------------------------------------------------------------------------------------------------- 0001")
      const options4 = {
        margin: [5, 5],
        filename: "menu_pos_venda_pagamento_vista.pdf",
        image: { type: "pdf", quality: 2 },
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "landscape" },
        pagebreak: { mode: "avoid-all" },
        enableLinks: true,
      };
      // Modificar o tamanho da fonte para impressão
      document.querySelectorAll(".rf_texto_pdf").forEach((element) => {
        element.style.fontSize = "9px"; // Tamanho de fonte para impressão
      });
      document.querySelectorAll(".rf_titulo_pdf").forEach((element) => {
        element.style.fontSize = "12px"; // Tamanho de fonte para impressão
      });
      document
        .querySelectorAll(".rf_titulo_destaque_pdf")
        .forEach((element) => {
          element.style.fontSize = "14px"; // Tamanho de fonte para impressão
        });

      setTimeout(() => {
        html2pdf().from(this.$refs.contentToPrint4).set(options4).save();
      }, 500);
      //html2pdf().from(this.$refs.contentToPrint).set(options).save();
    },

    //Buscar pacotes
    async retrieveKitsModelo() {
      console.log("Buscando kits modelo");
      //Descobrir id do Modelo
      const id_modelo = await axios.get(
        `${process.env.VUE_APP_API_URL}modelo_codigo`,
        {
          params: { codigo: this.modelo_codigo },
        }
      );

      console.log("Resultado da busca do modelo", id_modelo);
      //Ir tabela kit modelo e trazer os pacotes ref. ao ID
      if (id_modelo.data.count > 0) {
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
        console.log(
          "Modelos Listados ---------------------",
          this.ids_kits_modelo
        );
        const id_ouro = kits_modelo.data.kits_modelo.findIndex(
          (item) => item.pacote_id == 1
        );
        const id_prata = kits_modelo.data.kits_modelo.findIndex(
          (item) => item.pacote_id == 2
        );
        const id_bronze = kits_modelo.data.kits_modelo.findIndex(
          (item) => item.pacote_id == 3
        );
        console.log("ID Ouro", id_ouro);
        //Dados pacote Ouro
        this.kit_id_ouro = this.ids_kits_modelo[id_ouro].id;
        this.kit_id_prata = this.ids_kits_modelo[id_prata].id;
        this.kit_id_bronze = this.ids_kits_modelo[id_bronze].id;

        //this.pacote_ouro(47);
        this.pacote_prata(this.kit_id_prata);
        this.pacote_bronze(this.kit_id_bronze);
      }
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
      console.log("Valores do pacote ouro", pacote_ouro_acessorios);

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
      this.de_ouro =
        this.total_preco_acessorios_ouro +
        this.total_preco_revisoes_ouro +
        this.total_preco_seguros_ouro;
      this.por_ouro = this.valor_pacote_ouro;
      this.economia_ouro = this.de_ouro - this.por_ouro;
      this.novo_valor_parcela_ouro = this.parcela_ouro;

      const valor_desk = parseFloat(this.parcela_desk);
      this.apenas_ouro = (this.novo_valor_parcela_ouro - valor_desk) / 30;
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

      console.log("Valor pacote prata", this.valor_pacote_prata);
      this.de_prata =
        this.total_preco_acessorios_prata +
        this.total_preco_revisoes_prata +
        this.total_preco_seguros_prata;
      this.por_prata = this.valor_pacote_prata;
      this.economia_prata = this.de_prata - this.por_prata;
      this.novo_valor_parcela_prata = this.parcela_prata;

      const valor_desk = parseFloat(this.parcela_desk);
      this.apenas_prata = (this.novo_valor_parcela_prata - valor_desk) / 30;
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
      console.log(
        "Resposta do pacote bronze",
        pacote_bronze_acessorios,
        pacote_bronze_revisoes,
        pacote_bronze_seguros
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

      this.de_bronze =
        this.total_preco_acessorios_bronze +
        this.total_preco_revisoes_bronze +
        this.total_preco_seguros_bronze;
      this.por_bronze = this.valor_pacote_bronze;
      this.economia_bronze = this.de_bronze - this.por_bronze;
      this.novo_valor_parcela_bronze = this.parcela_bronze;
      const valor_desk = parseFloat(this.parcela_desk);
      this.apenas_bronze = (this.novo_valor_parcela_bronze - valor_desk) / 30;
    },

    async resumoRanqueamentoCustomizado() {
      //Verificar se todos os acessórios foram preenchidos
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}verificar_ranqueamento_customizado`,
          {
            params: {
              pos_venda_detalhada_id: this.id_pos_venda_detalhada,
            },
          }
        );
        console.log("Resumo do ranqueamento customizazdo", response.data);
        //console.log("Resumo do ranqueamento customizazdo", response.data.menu_pos_venda_detalhada.menu_pos_venda.length);
        if (response.data.pos_venda_detalhada_menu.length > 0) {
          let bancos = [];
          bancos =
            response.data.pos_venda_detalhada_menu[0].menu_rank_pos_venda;
          const bancoCustomizado = bancos.find(
            (banco) => banco.rankPacote === "Customizado"
          );

          if (bancoCustomizado) {
            this.banco_selecionado_customizado =
              bancoCustomizado.bancos_rank_pos_venda.nome;
            this.atualizarPacoteCustomizado();
          }
          console.log(
            "Resumo do ranqueamento customizazdo Bancos",
            this.banco_selecionado_customizado
          );
          // this.total_entrada_customizado = response.data.menu_pos_venda_detalhada.menu_pos_venda[0].entradaCustomizado;
          // this.total_financiamento_selecionado_customizado = response.data.valor_total_financiamento;
          // this.parcela_customizado = response.data.valor_parcela_financiamento;
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 1000);
        }
      }
    },

    async atualizarPacoteCustomizado() {
      this.total_kits();
      this.de_customizado =
        this.total_preco_acessorios_customizado +
        this.total_preco_seguros_customizado +
        this.total_preco_revisoes_customizado;
      this.por_customizado = this.valor_pacote_customizado;
      this.economia_customizado = this.de_customizado - this.por_customizado;
      this.novo_valor_parcela_customizado = this.parcela_customizado;

      console.log("Valores do quadro Informação 1", this.de_customizado);
      console.log("Valores do quadro Informação 2", this.por_customizado);
      console.log("Valores do quadro Informação 3", this.economia_customizado);
      console.log(
        "Valores do quadro Informação 4",
        this.novo_valor_parcela_customizado
      );
      const valor_desk = parseFloat(this.parcela_desk);
      console.log("Valor parcela antiga customizado", valor_desk);
      this.apenas_customizado =
        (this.novo_valor_parcela_customizado - valor_desk) / 30;
    },

    //Carregar itens inseridos nos kits
    async retrievekitsAcessoriosItens() {
      console.log("Buscando itens no kit de acessórios");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}venda_customizada`,
          {
            params: {
              pos_venda_detalhada_id: this.id_pos_venda_detalhada,
              codigo: "AC",
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        console.log("Itens kits acessorios", response.data);
        this.itens_kit_acessorios = response.data.kits;
        this.total_preco_acessorios_customizado = response.data.totalPreco;
        this.total_preco_desconto_acessorios_customizado =
          response.data.totalPrecoDesconto;
        this.total_precoAjustado_acessorios = response.data.totalPrecoAjustado;
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 1000);
        }
      }
    },

    async retrievekitsSegurosItens() {
      console.log("Buscando itens no kit de seguros");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}venda_customizada`,
          {
            params: {
              pos_venda_detalhada_id: this.id_pos_venda_detalhada,
              codigo: "SG",
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        this.itens_kit_seguros = response.data.kits;
        this.total_preco_seguro_customizado = response.data.totalPreco;
        this.total_preco_desconto_seguro_customizado =
          response.data.totalPrecoDesconto;
        this.total_precoAjustado_seguro = response.data.totalPrecoAjustado;
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 1000);
        }
      }
    },
    async retrievekitsRevisoesItens() {
      console.log("Buscando itens no kit de Revisões");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}venda_customizada`,
          {
            params: {
              pos_venda_detalhada_id: this.id_pos_venda_detalhada,
              codigo: "RV",
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );
        this.itens_kit_revisoes = response.data.kits;
        this.total_preco_revisoes_customizado = response.data.totalPreco;
        this.total_preco_desconto_revisoes_customizado =
          response.data.totalPrecoDesconto;
        this.total_precoAjustado_revisoes = response.data.totalPrecoAjustado;
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 1000);
        }
      }
    },

    generatePdf() {
      // console.log("Imprimir ----------------------------------------------------------------------------------------------------------------- 0001")
      const options = {
        margin: [5, 5],
        filename: "menu_pos_venda_customizado.pdf",
        image: { type: "pdf", quality: 2 },
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "landscape" },
        pagebreak: { mode: "avoid-all" },
        enableLinks: true,
      };
      // Modificar o tamanho da fonte para impressão
      document.querySelectorAll(".rf_texto_pdf").forEach((element) => {
        element.style.fontSize = "9px"; // Tamanho de fonte para impressão
      });
      document.querySelectorAll(".rf_titulo_pdf").forEach((element) => {
        element.style.fontSize = "12px"; // Tamanho de fonte para impressão
      });
      document
        .querySelectorAll(".rf_titulo_destaque_pdf")
        .forEach((element) => {
          element.style.fontSize = "14px"; // Tamanho de fonte para impressão
        });

      setTimeout(() => {
        html2pdf().from(this.$refs.contentToPrint).set(options).save();
      }, 500);
      //html2pdf().from(this.$refs.contentToPrint).set(options).save();
    },
    total_kits() {
      console.log("Valor pacote Customozado");
      this.valor_pacote_customizado =
        this.total_preco_desconto_acessorios_customizado +
        this.total_preco_desconto_seguro_customizado +
        this.total_preco_desconto_revisoes_customizado;
    },
    calcular_percentagem(item) {
      const valor_original = item.preco;
      const valor_venda = item.preco_desconto;
      const desconto = valor_original - valor_venda;
      const per_desconto = (desconto / valor_original) * 100;
      return per_desconto.toFixed(2);
    },
    formatarValor(valor) {
      if (!valor) return "";
      valor = valor.toString().replace(/\D/g, "");
      valor = (valor / 100).toFixed(2).replace(".", ",");
      valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return valor;
    },
    formatarDecimal(valor) {
      valor = valor.replace("R$", "").trim();
      valor = valor.replace(/\./g, "");
      valor = valor.replace(",", ".");

      return parseFloat(valor);
    },
    currency(number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(number);
    },
    atualizar_pagina() {
      window.location.reload();
    },
  },
};
</script>

<style></style>
