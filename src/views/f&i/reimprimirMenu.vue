<template>
    <SidebarVue ref="sidebar" />
    <NavgatorFI
      ref="navgator"
      :barraTitulo="' F&I - Reimprimir Menu'"
      :titulo="'vendas'"
      :id ="id_rota"
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
                    <span class="texto_centralizado"
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
                            <span class="sp_icon rf_texto_pdf">{{ item.descricao }}</span></i
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
                            <span class="sp_icon rf_texto_pdf">{{ item.descricao }}</span></i
                        ></strong
                        >
                    </li>
                    </ul>
                </div>
            </div>
            <!--Seguros-->
            <div class="col divisoria_customizado_info">
                <div class="col barra_fei_menu_customizado">
                    <span class="texto_centralizado"
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
                            <span class="sp_icon rf_texto_pdf">{{ item.descricao }}</span></i
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
              <div v-if="this.checar_tipo_pagamento !=2">
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
                    <i class="bi bi-car-front fs-5 icone_filtro_menu "
                      ><span class="texto_filtro_menu"
                        ><strong class="rf_titulo_pdf">Dados do Veículo</strong></span
                      ></i
                    >
                  </div>
                  <div class="col-2">
                    <div class="row rf_bg_form_menu ">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Marca</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ marca }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Modelo</label>
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
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Placa</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ placa }}</span>
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Chassi</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ chassi }}</span>
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Ano Fab.</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ ano_fabricacao }}</span>
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Ano Mod.</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ ano_modelo }}</span>
                    </div>
                  </div>
                </div>
                <!--Dados do Financiamento-->
  
                <div class="row g-2 p-2">
                  <div class="col-6">
                    <i class="bi bi-journal-bookmark-fill fs-5 icone_filtro_menu"
                      ><span class="texto_filtro_menu"
                        ><strong class="rf_titulo_pdf">Dados do Financiamento</strong></span
                      ></i
                    >
                  </div>
                  <div class="col-6">
                    <i class="bi bi-journal-text fs-5 icone_filtro_menu"
                      ><span class="texto_filtro_menu"
                        ><strong class="rf_titulo_pdf">Dados do Atendimento</strong></span
                      ></i
                    >
                  </div>
                  <div class="col">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Total Entrada</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{valor_entrada_selecionada }}</span>
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
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Valor Parcela</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{
                        valor_parcela_selecionada
                      }}</span>
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Qtd. Parcela</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{
                        parcela
                      }}</span>
                    </div>
                  </div>
  
                  <div class="col-2">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Banco</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ banco_selecionado }}</span>
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Nº Atend.</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ n_atendimento }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Vendedor</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ vendedor }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Cliente</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ cliente }}</span>
                    </div>
                  </div>
                </div>
                <!--Dados do Atendimento-->
  
                <div class="row g-2 p-2">
                  <div class="col-7">
                    <i class="bi bi-cash fs-5 icone_filtro_menu">
                      <span class="texto_filtro_menu rf_texto_pdf "
                        ><strong class="rf_titulo_pdf">Forma de Pagamento - </strong
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
                <i class="bi bi-gem card-texto-vendas-customizado rf_titulo_destaque_pdf "> Pacote Selecionado</i>
  
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
                              <span class="sp_icon rf_texto_pdf">{{ item.descricao }}</span></i
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
                              <span class="sp_icon rf_texto_pdf">{{ item.descricao }}</span></i
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
                              <span class="sp_icon rf_texto_pdf">{{ item.descricao }}</span></i
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
                              this.currency(novo_valor_parcela)
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
                                >de {{ this.currency(de) }}</strong
                              >
                            </span>
                          </div>
                        </div>
                        <div class="col-6 direita">
                          <span class="texto_oferta rf_texto_pdf"
                            >por
                            <strong> {{ this.currency(por) }}</strong>
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
                          {{ this.currency(economia) }}
                        </div>
                      </div>
                      <div class="col-7 mt-5 direita">
                        <span class="texto_oferta rf_texto_pdf"
                          >por apenas
                          <strong>{{ this.currency(apenas) }}</strong>
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
                    <i class="bi bi-car-front fs-5 icone_filtro_menu "
                      ><span class="texto_filtro_menu"
                        ><strong class="rf_titulo_pdf">Dados do Veículo</strong></span
                      ></i
                    >
                  </div>
                  <div class="col-2">
                    <div class="row rf_bg_form_menu ">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Marca</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ marca }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Modelo</label>
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
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Placa</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ placa }}</span>
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Chassi</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ chassi }}</span>
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Ano Fab.</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ ano_fabricacao }}</span>
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Ano Mod.</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ ano_modelo }}</span>
                    </div>
                  </div>
                </div>
                <!--Dados do Financiamento-->
  
                <div class="row g-2 p-2">                  
                  <div class="col-12">
                    <i class="bi bi-journal-text fs-5 icone_filtro_menu"
                      ><span class="texto_filtro_menu"
                        ><strong class="rf_titulo_pdf">Dados do Atendimento</strong></span
                      ></i
                    >
                  </div>           
                  <div class="col-1">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Nº Atend.</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ n_atendimento }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Vendedor</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ vendedor }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row rf_bg_form_menu">
                      <label class="rf_texto_menu_titulo rf_texto_pdf">Cliente</label>
                      <span class="rf_texto_menu rf_texto_pdf">{{ cliente }}</span>
                    </div>
                  </div>
                </div>
                <!--Dados do Atendimento-->
  
                <div class="row g-2 p-2">
                  <div class="col-7">
                    <i class="bi bi-cash fs-5 icone_filtro_menu">
                      <span class="texto_filtro_menu rf_texto_pdf "
                        ><strong class="rf_titulo_pdf">Forma de Pagamento - </strong
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
                <i class="bi bi-gem card-texto-vendas-customizado rf_titulo_destaque_pdf "> Pacote Selecionado</i>
  
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
                              <span class="sp_icon rf_texto_pdf">{{ item.descricao }}</span></i
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
                              <span class="sp_icon rf_texto_pdf">{{ item.descricao }}</span></i
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
                              <span class="sp_icon rf_texto_pdf">{{ item.descricao }}</span></i
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
  
  
  
              <div class="row g-2 p-2 mt-4">
                <br>
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
              <button class="btn btn-lg btn-filtro" @click="generatePdfPacotesAvista">
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
  import userService from "../../services/user.service";
  import RodapeVue from "../../components/menu/Rodape.vue";
  import axios from "axios";
  import TokenService from "../../services/token.service";
  import jwt_decode from "jwt-decode";
  //import Pagination from "../../components/Pagination.vue";
  import Message from "../../components/modal/Message.vue";
  import html2pdf from "html2pdf.js";
  import { Modal } from 'bootstrap';
  
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
        metodo_pagamento_lista: [
          { descricao: "Financiamento", value: 1 },
          { descricao: "Cartão Crédito", value: 2 },
          { descricao: "Depósito Bancário", value: 3 },
          { descricao: "Pix", value: 4 },
        ],
        itens_financiamento: [
          { value: 12 },
          { value: 18 },
          { value: 24 },
          { value: 36 },
          { value: 48 },
          { value: 60 },
        ],
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
        parcela_desk:"",
        qtd_parcela: "",
        retorno: "",
        coeficiente: "",
        banco: "",
  
        pmtSelected: "",
  
        vendas: [],
  
        //Dados do quadros dos kits
        desabilitar_customizacao: true,
        itens_kit_acessorios_ouro: [],
        itens_kit_revisoes_ouro: [],
        itens_kit_seguros_ouro: [],
        valor_pacote_ouro: "",
        quadro_ouro: false,
        parcela_ouro: "",
        parcelamento_ouro: [],
        pacoteSelecionadoOuro: null,
        page_ouro: 1,
        totalPages_ouro: 0,
        totalItems_ouro: 0,
        pageSizes_ouro: [5, 10, 15, 35, 50, 100],
        pageSize_ouro: 5,
  
        itens_kit_acessorios_prata: [],
        itens_kit_revisoes_prata: [],
        itens_kit_seguros_prata: [],
        valor_pacote_prata: [],
        quadro_prata: false,
        parcela_prata: "",
        parcelamento_prata: [],
        pacoteSelecionadoPrata: null,
        page_prata: 1,
        totalPages_prata: 0,
        totalItems_prata: 0,
        pageSizes_prata: [5, 10, 15, 35, 50, 100],
        pageSize_prata: 5,
  
        itens_kit_acessorios_bronze: [],
        itens_kit_revisoes_bronze: [],
        itens_kit_seguros_bronze: [],
        valor_pacote_bronze: [],
        quadro_bronze: false,
        parcela_bronze: "",
        parcelamento_bronze: [],
        page_bronze: 1,
        totalPages_bronze: 0,
        totalItems_bronze: 0,
        pageSizes_bronze: [5, 10, 15, 35, 50, 100],
        pageSize_bronze: 5,
        pacoteSelecionadoBronze: null,
  
        //Paginação
        totalPages: 0,
        totalItems: 0,
        pageSizes: [5, 10, 15, 35, 50, 100],
        pageSize: 50,
  
        //Dados Modais
        revisoes_modelo: [],
        acessorios_modelo: [],
        seguros_modelo: [],
  
        filtroDescricaoSeguro: "",
        filtroDescricaoRevisao: "",
        filtroDescricaoAcessorio: "",
        filtroCodigoSeguro: "",
        filtroDescricao: "",
        filtroCodigo: "",
        habilitar_gerar_menu: true,
  
        estoque_pecas: [],
  
        //Dados customizado
        itens_kit_acessorios_customizado: [],
        itens_kit_revisoes_customizado: [],
        itens_kit_seguros_customizado: [],
        valor_pacote_customizado: [],
        quadro_customizado: false,
        parcelamento_customizado: [],
        page_customizado: 1,
        totalPages_customizado: 0,
        totalItems_customizado: 0,
        pageSizes_customizado: [5, 10, 15, 35, 50, 100],
        pageSize_customizado: 5,
        pacoteSelecionadoCustomizado: null,
        total_entrada_customizado:"",
        total_financiamento_selecionado_customizado:"",
        parcela_customizado:"",
   
  
        banco_selecionado_ouro:"",
        banco_selecionado_prata:"",
        banco_selecionado_bronze:"",
  
  
        habilitar_customizacao: false,
        cadastro: false,
  
        //Dados da Mensagem
        abrir_modal: false,
        msg: "",
  
        modal_fi: false,
        selectedFilter: "",
  
        kits_modelos: [],
        // sortColumn: "", // Coluna atualmente classificada
        // sortOrder: 1,
        page: 1,
  
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
        entrada_fei:"",
  
        //validação
        habilitar_finalizar_venda: true,
        habilitar_venda_perdida: false,
  
        //buscando Modelo
        modelo_codigo: "",
        modelo_descricao: "",
        ids_kits_modelo: [],
  
        qtd_parcela_selecionada: null,
        banco_selecionado: null,
  
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
  
        id_acessorio_customizado: "",
        id_seguro_customizado: "",
        id_revisao_customizado: "",
        precoDesconto: "",
        id_acessorio: "",
        habilitar_ranquear_customizado: true,
        habilitar_select_pmt_customizado:false,
        id_rota:'',
        filtro:'',
        sortKey: '',
        Ordenacao: 'DESC',
        sortOrder:'',
    
        obs_desk:'',
        valor_entrada_customizado:"",
        habilitar_ranquear_pacotes: true,
        valor_entrada_selecionada:"",
        valor_entrada_selecionada_customizado:"",
        checar_tipo_pagamento:"",



      };
    },
    mounted() {
      this.getToken();
      this.habilitar();
      this.retrievePropostas();
      this.habilitar_fi();
     
      
      
    },
    methods: {
      async retrieveTipoPagamento() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}tipo_pagamentos`,
          {
            params: {
              status: 1
            },
          }
        );

        
        // Faça algo com os dados aqui, como atribuir a uma variável de componente
        this.metodo_pagamento_vista = response.data; // exemplo de atribuição
        console.log("Lista de pagamentos", this.metodo_pagamento_vista);
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
      const pos_venda_detalhada_id =  this.id_pos_venda_detalhada;
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

        console.log("Lista de pagamentos feisssssssssssssssssssssssssssssssssss", response);
        this.itens_pagamentos = response.data.pagamento_fei;
        this.checar_valor();
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 1000);
        }
      }
    },
    async buscar_valor_pacote(){
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
  
          console.log("Listassssssssssssssssssssssssss de propostas", response.data.menu_pos_venda_detalhada[0].valor_pacote);
          this.valor_pacote_vista = this.currency(response.data.menu_pos_venda_detalhada[0].valor_pacote);
        } catch (error) {
          console.log(error);
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
    },
      getToken() {
        const accessToken = TokenService.getLocalAccessToken();
        TokenService.getLocalRefreshToken();
        const user_log = TokenService.getUser();
        const decodedToken = jwt_decode(accessToken);
        this.company_id = decodedToken.company;
        this.user_log = user_log.id;
        this.id_rota = this.$route.params.id;
      },
      habilitar() {
        // if (
        //   this.parcela_ouro != null ||
        //   this.parcela_prata != null ||
        //   this.parcela_bronze != null
        // ) {
        //   this.habilitar_gerar_menu = false;
        // }
        if (this.valor_financiar != 0) {
          this.habilitar_finalizar_venda = false;       
          this.habilitar_gerar_menu = false;
        }
        console.log("Testando valores", this.valor_pacote_ouro )
        // if (this.valor_pacote_ouro == 0 || this.valor_pacote_prata == 0 || this.valor_pacote_bronze == 0) {
        //   this.customizado();
        // }
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
  
          console.log("Lista de propostas", response.data);
          // Faça algo com os dados aqui, como atribuir a uma variável de componente
          this.vendas = response.data; // exemplo de atribuição
          this.checar_tipo_pagamento = response.data.menu_pos_venda_detalhada[0].tipo_pagamento_pacote; //
          this.popular_formulario(this.vendas);
          console.log("Tipo pagamento", this.checar_tipo_pagamento);
          //this.habilitar_fi(posVendaId);
        } catch (error) {
          console.log(error);
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
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
          console.log("Resposta pos venda ------------------------------------------------------------------------------------------------------------------------------", pos_venda);
          console.log(pos_venda)
          if (pos_venda.data.count == 0) {
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
            if (data.success == true) {
              this.buscar_parcelas_ranqueamento(id);
            } else {
              this.abrir_modal = true;
              this.msg =
                "Houve um erro abrir esse atendimento, entre em contato  com o suporte.";
              setTimeout(
                () => (this.abrir_modal = false),
                window.location.reload(),
                1000
              );
            }
            console.log(data);
          } else {         
            this.id_pos_venda_detalhada = pos_venda.data.rows[0].id;
            console.log("ID Detalhado",  this.id_pos_venda_detalhada)
            this.buscar_parcelas_ranqueamento(pos_venda.data.rows[0].id);
            this.retrieveTipoPagamento();
            this.retrievePagamentosFei();
            this.buscar_valor_pacote();
          }
          //this.buscar_parcelas_ranqueamento(this.id_pos_venda_detalhada);
        } catch (error) {
          console.log(error);
          this.abrir_modal = true;
          this.msg =
            "Houve um erro abrir esse atendimento, entre em contato  com o suporte.";
          setTimeout(
            () => (this.abrir_modal = false),
            window.location.reload(),
            1000
          );
        }
      },
      popular_formulario(item) {
        console.log("Listando para popular formulário ", item);
        //Daddos do Atendimento
        this.n_atendimento = item.atendimento_id;
        this.vendedor = item.pos_venda_proposta.vendedores.username;
        this.cliente = item.pos_venda_proposta.clientes.nome;
        if(item.pos_venda_proposta.tipo_pagamento == '1'){
          this.tipo_pagamento = 'Pagamento à vista'
        }
        if(item.pos_venda_proposta.tipo_pagamento == '0'){
          this.tipo_pagamento = 'Pagamento por financimento'
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
        this.total_financiado_fei = (item.pos_venda_proposta.val_financiamento + item.pos_venda_proposta.val_entrada_financiamento);
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
        this.valor_financiar = this.currency(item.pos_venda_proposta.val_entrada_financiamento + item.pos_venda_proposta.val_financiamento )
    
        //Dados do Ranqueamento
        this.parcela = item.pos_venda_proposta.qtd_meses;
        const kit_id = item.menu_pos_venda_detalhada[0].kit_id; 
        this.observacao = item.menu_pos_venda_detalhada[0].observacao;

        if(kit_id){
          this.buscar_pacote_selecionado(kit_id);
        }else{
          this.customizado();
        }
      
        
        this.resumoRanqueamentoOuro();
      },
      async buscar_pacote_selecionado(kit_modelo_id){
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
        this.itens_kit_acessorios =
          pacote_acessorios.data.kits_acessorios;
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
       
        this.de =
          this.total_preco_acessorios +
          this.total_preco_revisoes +
          this.total_preco_seguros;
        this.por = this.valor_pacote;
        this.economia = this.de - this.por;
        this.novo_valor_parcela =  this.formatarDecimal(this.valor_parcela_selecionada);
       
  
        const valor_desk = parseFloat(this.parcela_desk);
        this.apenas = (this.novo_valor_parcela - valor_desk) / 30;

        console.log("Variaveis",  this.formatarDecimal(this.valor_parcela_selecionada), this.apenas);


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
      document.querySelectorAll(".rf_titulo_destaque_pdf").forEach((element) => {
        element.style.fontSize = "14px"; // Tamanho de fonte para impressão
      });


   
      setTimeout(() => {
        html2pdf().from(this.$refs.contentToPrint4).set(options4).save();
      }, 500);
      //html2pdf().from(this.$refs.contentToPrint).set(options).save();
    },
      validar_ranqueamento_customizado(){
        const entrada_customizado = this.valor_entrada_customizado;
        const valor_pacote = this.valor_pacote_customizado;
        
        if(valor_pacote){
          console.log("Um pacote foi criado");
          if(entrada_customizado){
            console.log("Entrada válida");
            
            this.habilitar_ranquear_customizado = false;
          }else{
            this.abrir_modal = true;
            this.msg = "Para ranquear é necessário inserir uma entrada!";
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
        }else{
          this.abrir_modal = true;
            this.msg = "Para ranquear é necessário inserir itens no pacote!";
            setTimeout(() => (this.abrir_modal = false), 4000);
        }
  
      },
      validar_ranqueamento_pacotes(){
        const entrada_pacotes = this.entrada_fei;
        const valor_pacote_ouro = this.valor_pacote_ouro;
        const valor_pacote_prata = this.valor_pacote_prata;
        const valor_pacote_bronze = this.valor_pacote_bronze;
        
        if(valor_pacote_ouro && valor_pacote_prata && valor_pacote_bronze){
          console.log("Um pacote foi criado");
          if(entrada_pacotes){
            console.log("Entrada válida");
            
            this.habilitar_ranquear_pacotes = false;
          }else{
            this.abrir_modal = true;
            this.msg = "Para ranquear é necessário inserir uma entrada!";
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
        }else{
          this.abrir_modal = true;
            this.msg = "Para ranquear é necessário inserir itens no pacote!";
            setTimeout(() => (this.abrir_modal = false), 4000);
        }
  
      },
      //Descobrir Modelo
      async descobrir_modelo() {
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URL}descobrir_kits_modelo`,
            {
              params: {
                modelo_descricao: this.modelo,
              },
            }
          );
          this.modelo_id = response.data.modelo.id;
          console.log("Lista de Modelos", response.data);
          // Faça algo com os dados aqui, como atribuir a uma variável de componente
          if (response.data.fonte == "VeiculoModelo") {
            this.modelo_codigo = response.data.modelo.codigo;
          }
          if (response.data.fonte == "VeiculoFei") {
            this.modelo_codigo = response.data.modelo.modelo_codigo;
          }
  
          // exemplo de atribuição
          console.log(this.modelo_codigo);
          this.retrieveKitsModelo();
        } catch (error) {
          console.log(error);
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
          if (error.response.status == 404) {
              this.abrir_modal = true;
              this.msg = "O modelo não possui nenhum pacote cadastrado, redirecionando para customização!";
              setTimeout(() => {
                this.abrir_modal = false;
                this.customizado();
                this.habilitar_venda_perdida = false;
              }, 4000);
            }
  
        }
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
          console.log("Modelos Listados ---------------------", this.ids_kits_modelo);
          const id_ouro = kits_modelo.data.kits_modelo.findIndex(item => item.pacote_id == 1);
          const id_prata = kits_modelo.data.kits_modelo.findIndex(item => item.pacote_id == 2);
          const id_bronze = kits_modelo.data.kits_modelo.findIndex(item => item.pacote_id == 3);
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
        console.log("Resposta do pacote bronze", pacote_bronze_acessorios, pacote_bronze_revisoes, pacote_bronze_seguros);
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
  
      //Ranqueamento
      async ranquear() {
        //Verificar se existem pacotes para realizar o ranqueamento
        if (
          this.valor_pacote_ouro  && this.valor_pacote_prata &&  this.valor_pacote_bronze) {
          console.log("Todos os pacotes tem valores");
          //Pergar os dados para calcular as taxas
  
          this.id_coluna = 1;
          this.incluir_acessorios = 0;
          const entrada_fei = this.formatarDecimal(this.entrada_fei);
          const total_financiado_fei = this.total_financiado_fei;
          const pacote_ouro = this.valor_pacote_ouro;
          const pacote_prata = this.valor_pacote_prata;
          const pacote_bronze = this.valor_pacote_bronze;
  
          this.quadro_ouro = true;
          this.quadro_prata = true;
          this.quadro_bronze = true;
  
          this.valor_pacote_ouro_rank = parseFloat(total_financiado_fei) + parseFloat(pacote_ouro) - parseFloat(entrada_fei);       
          this.valor_pacote_prata_rank =  parseFloat(total_financiado_fei) + parseFloat(pacote_prata) - parseFloat(entrada_fei);
          this.valor_pacote_bronze_rank = parseFloat(total_financiado_fei) + parseFloat(pacote_bronze) - parseFloat(entrada_fei);
          
          // this.valor_pacote_customizado_rank =
          //   this.valor_pacote_customizado + this.total_financiado_fei - this.valor_entrada_customizado;
        
          //Formatando os valores para o modal
          this.total_entrada = this.currency(entrada_fei);
          this.total_financiamento_ouro = this.currency(this.valor_pacote_ouro_rank);
          this.total_financiamento_prata = this.currency(this.valor_pacote_prata_rank);
          this.total_financiamento_bronze = this.currency(this.valor_pacote_bronze_rank);
  
          const modal = new Modal(document.getElementById('ModalRanqueamento'));
          modal.show();
          this.retrieveRanqueamento();
        }
      },
      async retrieveRanqueamento() {
        const params = this.getRequestParamsTaxas(
          this.total_entrada,
          this.total_financiamento_ouro,
          this.total_financiamento_prata,
          this.total_financiamento_bronze,
          //this.total_financiamento_customizado,
          this.parcela,
          this.page,
          this.pageSize,
          this.n_atendimento,
          this.company_id,  
          //this.total_financiado
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
            //this.ranqueamento_entrada_customizado();
          }
        });
      },
      getRequestParamsTaxas(
        total_entrada_fei,
        valor_pacote_ouro_rank,
        valor_pacote_prata_rank,
        valor_pacote_bronze_rank,
        // valor_pacote_customizado_rank,
        parcela,
        page,
        pageSize,
        n_atendimento,
        company_id,
        // total_financiamento_selecionado
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
        // if (valor_pacote_customizado_rank) {
        //   params["financiamento_customizado"] = valor_pacote_customizado_rank;
        // }
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
        // if (total_financiamento_selecionado) {
        //   params["total_financiamento_selecionado"] = total_financiamento_selecionado;
        // }
        return params;
      },
      //Bloco Ouro
      sortTable(value) {
        if (this.Ordenacao === 'DESC') {
          this.sortOrder = this.sortOrder === 'DESC' ? 'ASC' : 'DESC';
        } else {
          this.Ordenacao = 'ASC';
          this.sortOrder = 'DESC';
        }
        this.filtro = value;
  
        this.ranqueamento_entrada_ouro();
        this.ranqueamento_entrada_prata();
        this.ranqueamento_entrada_bronze();
      },
      sortTableCustomizado(value) {
        if (this.Ordenacao === 'DESC') {
          this.sortOrder = this.sortOrder === 'DESC' ? 'ASC' : 'DESC';
        } else {
          this.Ordenacao = 'ASC';
          this.sortOrder = 'DESC';
        }
        this.filtro = value;
  
        this.ranqueamento_entrada_customizado();
   
      },
      handlePageChangeEntradaOuro(value) {
        this.page_ouro = value;
        this.ranqueamento_entrada_ouro();
      },
      getRequestParamsEntradaOuro(
        page_ouro,
        pageSize_ouro,
        n_atendimento,
        id_coluna,
        parcela, 
        filtro,
        Ordem
  
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
        if (filtro) {
          params["filtro"] = filtro;
        }
        if (Ordem) {
          params["Ordem"] = Ordem;
        }
        return params;
      },
      async ranqueamento_entrada_ouro() {
        const params = this.getRequestParamsEntradaOuro(
          this.page_ouro,
          this.pageSize_ouro,
          this.n_atendimento,
          this.id_coluna,
          this.parcela,
          this.filtro,
          this.sortOrder
        );
  
        /**faço uma consulta na tabela TempTaxas chamando a função ranqueamento_entrada_1 */
        userService.getRanqueamento_ouro(params).then((response) => {
          const { parcelas, totalPages, totalItems } = response.data;
  
          this.parcelamento_ouro = parcelas;
          this.totalPages_ouro = totalPages;
          this.totalItems_ouro = totalItems;
  
          console.log("Parcelas ouro F&I", this.parcelamento_ouro);
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
        parcela,
        filtro,
        Ordem
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
        if (filtro) {
          params["filtro"] = filtro;
        }
        if (Ordem) {
          params["Ordem"] = Ordem;
        }
        return params;
      },
      async ranqueamento_entrada_prata() {
        const params = this.getRequestParamsEntradaPrata(
          this.page_prata,
          this.pageSize_prata,
          this.n_atendimento,
          this.id_coluna,
          this.parcela,
          this.filtro,
          this.sortOrder
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
        parcela,
        filtro,
        Ordem
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
        if (filtro) {
          params["filtro"] = filtro;
        }
        if (Ordem) {
          params["Ordem"] = Ordem;
        }
        return params;
      },
      async ranqueamento_entrada_bronze() {
        const params = this.getRequestParamsEntradaBronze(
          this.page_bronze,
          this.pageSize_bronze,
          this.n_atendimento,
          this.id_coluna,
          this.parcela,
          this.filtro,
          this.sortOrder
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
        parcela,
        filtro,
        Ordem
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
        if (filtro) {
          params["filtro"] = filtro;
        }
        if (Ordem) {
          params["Ordem"] = Ordem;
        }
        return params;
      },
      async ranqueamento_entrada_customizado() {
        const params = this.getRequestParamsEntradaCustomizado(
          this.page_customizado,
          this.pageSize_customizado,
          this.n_atendimento,
          this.id_coluna,
          this.parcela,
          this.filtro,
          this.sortOrder
        );
  
        /**faço uma consulta na tabela TempTaxas chamando a função ranqueamento_entrada_1 */
        console.log("Parcelas do customizado");
        userService.getRanqueamento_customizado(params).then((response) => {
          const { parcelas, totalPages, totalItems } = response.data;
          console.log("Parcelas do customizado", parcelas);
          this.parcelamento_customizado = parcelas;
          this.totalPages_customizado = totalPages;
          this.totalItems_customizado = totalItems;
        });
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
      rowSelect_customizado(idx, id_taxa, pacote) {
        if (pacote == 4) {
          this.pacoteSelecionadoCustomizado = id_taxa;
          this.select_parcela(id_taxa, pacote);
          this.habilitar();
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
            entrada: this.entrada_fei,
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
          console.log("Listando as parcelas ranqueada pmts", pmts.data);
          if(pmts.data.length == 1){
            const entrada_selecionada_pacote = pmts.data[0].entradaOuro;
            const entrada_selecionada_customizado = pmts.data[0].entradaCustomizado;
            console.log("Listando entradas", pmts.data[0].entradaCustomizado);
            if(entrada_selecionada_customizado){
              this.valor_entrada_selecionada = this.currency(pmts.data[0].entradaCustomizado);
            }
            if(entrada_selecionada_pacote){
              this.valor_entrada_selecionada = this.currency(pmts.data[0].entradaOuro);
            }
            const id_menu_rank = pmts.data[0].id;
            this.habilitar_finalizar_venda =  false;           
            this.total_financiamento_selecionado = this.currency(pmts.data[0].pos_venda_detalhada_menu.valor_total_financiamento);
            this.valor_parcela_selecionada = this.currency(pmts.data[0].pos_venda_detalhada_menu.valor_parcela_financiamento);
            this.valor_pacote_selecionado = this.currency(pmts.data[0].pos_venda_detalhada_menu.valor_pacote);
            const parcelas = await axios.get(
              `${process.env.VUE_APP_API_URL}pos_venda_detalhada_rank`,
              {
                params: {
                  id: id_menu_rank,
                },
              }
            );
            console.log("Listando as parcelas ranqueada", parcelas);
            if(parcelas.data.rows[0].parcelas){
              this.parcela = parcelas.data.rows[0].parcelas;
            }
          
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
          } 
        
        } catch (error) {
          console.log(error);
        }
      },
      async resetar_pacote(){
        const id = this.id_pos_venda_detalhada;
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}pos_venda_detalhada/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: id,
                kit_id: null,             
                valor_pacote: 0.00,
                valor_total_financiamento: 0.00,
                valor_parcela_financiamento: 0.00,            
               
              }),
            }
          );
          this.valor_pacote_selecionado = this.currency(0);
          this.total_financiamento_selecionado = this.currency(0);
          this.valor_parcela_selecionada = this.currency(0);
  
          console.log("Ao clicar em customizar deve ser zerado o ultimo pacote", response);
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
          const total_entrada = this.formatarDecimal(this.valor_entrada_selecionada);
       
          const valor_total_financiamento = valor_financiamento + valor_pacote - total_entrada;
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
            this.resumoRanqueamentoOuro();
         
          }
        }
        //Prata
        if (pacote == 2) {
          const kit_id = this.kit_id_prata;
          const valor_financiamento = this.total_financiado_fei;
          const valor_pacote = this.valor_pacote_prata;
          const total_entrada = this.formatarDecimal(this.valor_entrada_selecionada);
  
          const valor_total_financiamento = valor_financiamento + valor_pacote - total_entrada;
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
            this.resumoRanqueamentoPrata();
          }
        }
        //Bronze
        if (pacote == 3) {
          const kit_id = this.kit_id_bronze;
          const valor_financiamento = this.total_financiado_fei;
          const valor_pacote = this.valor_pacote_bronze;
          const total_entrada = this.formatarDecimal(this.valor_entrada_selecionada);
  
          const valor_total_financiamento = valor_financiamento + valor_pacote - total_entrada;
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
            this.resumoRanqueamentoBronze();
          }
        }
         //Customizado
        if (pacote == 4) {        
          const valor_financiamento = this.total_financiado_fei;
          const valor_pacote = this.valor_pacote_customizado;
  
          const valor_total_financiamento = valor_financiamento + valor_pacote;
          const valor_parcela_financiamento = this.valor_parcela_financiamento;
          const tipo_pagamento_pacote = this.metodo_pagamento;
          const observacao = this.observacao;
  
          console.log("Validnado ", valor_parcela_financiamento)
           if (valor_parcela_financiamento == 0){
            this.abrir_modal = true;
            this.msg = "O valor da parcela não pode ser R$ 0,00";
            setTimeout(() => {
                this.abrir_modal = false;
                this.habilitar_gerar_menu = true;
              }, 4000);
            return;
           }
               //Preencher informações do F&I
          this.valor_financiar = this.currency(valor_financiamento);
          this.valor_pacote_selecionado = this.currency(valor_pacote);
          this.total_financiamento_selecionado = this.currency(
            valor_total_financiamento
          );
          this.valor_parcela_selecionada = this.currency(
            valor_parcela_financiamento
          );
          const valor_desk = parseFloat(this.parcela_desk);
          this.apenas_customizado = (this. valor_parcela_financiamento - valor_desk) / 30;
        
          const response = await fetch(
            `${process.env.VUE_APP_API_URL}pos_venda_detalhada/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: id,
                kit_id: null,
                user_id: this.user_log,
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
  
      //Finalizar F&I
      // async atualizar_status_pos_venda(value){
      //   const id = this.n_atendimento;
      //   var status;
      //   if(value == 1){
      //     status = "Venda Finalizada"
      //   }
      //   if(value == 2){       
      //     if (this.observacao.length < 30) {
      //       this.abrir_modal = true;
      //       this.msg = "O campo observação precisa conter mais de 30 caracteres de justificativa!";
      //       setTimeout(() => {
      //           this.abrir_modal = false;             
      //           this.habilitar_venda_perdida = true;
      //         }, 4000);
      //       return;
      //     } else {
      //        status = "Venda Perdida"
      //     }
      //   }
  
      //   const response = await fetch(
      //       `${process.env.VUE_APP_API_URL}atualizar_status_pos_venda/${id}`,
      //       {
      //         method: "PUT",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({
      //           id: id,
      //           status: status
      //         }),
      //       }
      //   );
      //   console.log("resposta da atualização", response.statusText);
      //   if (response.statusText == "OK") {
      //     this.abrir_modal = true;
      //       this.msg = "Atendimento finalizado!";
      //       setTimeout(() => {
      //         this.abrir_modal = false;
      //         this.$router.push('/f&i/vendas_f&i'); // Redireciona após fechar o modal
      //       }, 4000);
      //     }
          
      // },
  
  async atualizar_status_pos_venda(value) {
    const id = this.n_atendimento;
    let status;
  
    if (value === 1) {
      const valor_pacote = this.formatarDecimal(this.valor_pacote_selecionado);
      const total_financiado = this.formatarDecimal(this.total_financiamento_selecionado);
      const valor_parcela = this.formatarDecimal(this.valor_parcela_selecionada);
  
      console.log("Verificando finalizar", valor_pacote, total_financiado, valor_parcela)
      if (valor_pacote == 0 || total_financiado == 0 || valor_parcela == 0) {
        this.abrir_modal = true;
        this.msg = "O valor da parcela não pode ser R$ 0,00!";
        setTimeout(() => {
          this.abrir_modal = false;        
        }, 4000);
        return; // Para a execução da função aqui
      }else{      
        status = "Venda Finalizada";
       
      }
  
    } else if (value === 2) {
      if (this.observacao.length < 30) {
        this.abrir_modal = true;
        this.msg = "O campo observação precisa conter mais de 30 caracteres de justificativa!";
        setTimeout(() => {
          this.abrir_modal = false;        
        }, 4000);
        return; // Para a execução da função aqui
      } else {
        status = "Venda Perdida";
      }
    }
  
    try {
      const response = await fetch(
        `${process.env.VUE_APP_API_URL}atualizar_status_pos_venda/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            status: status,
            observacao: this.observacao,
          }),
        }
      );
  
      console.log("resposta da atualização", response.statusText);
  
      if (response.ok) {
        this.abrir_modal = true;
        this.msg = "Atendimento finalizado!";
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
  
  
      //funções customizado
      customizado() {
        console.log("Iniciar pacote customizado", this.n_atendimento);
        this.retrieveAcessorios();
      this.retrieveSeguros();
      this.retrieveRevisoes();
      this.retrievekitsAcessoriosItens();
      this.retrievekitsSegurosItens();
      this.retrievekitsRevisoesItens();
      this.resumoRanqueamentoCustomizado(); 
      this.retrieveRanqueamentoCustomizado();

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
          console.log("Resumo do ranqueamento customizazdo", response.data.menu_pos_venda_detalhada.menu_pos_venda.length);
          if(response.data.menu_pos_venda_detalhada.menu_pos_venda.length > 0){
            let bancos = [];
            bancos = response.data.menu_pos_venda_detalhada.menu_pos_venda[0].menu_rank_pos_venda;
            const bancoCustomizado = bancos.find(banco => banco.rankPacote === 'Customizado');
  
            if (bancoCustomizado) {
              this.banco_selecionado_customizado = bancoCustomizado.bancos_rank_pos_venda.nome;
            }         
            console.log("Resumo do ranqueamento customizazdo Bancos", bancos);
            this.total_entrada_customizado = response.data.menu_pos_venda_detalhada.menu_pos_venda[0].entradaCustomizado;
            this.total_financiamento_selecionado_customizado = response.data.valor_total_financiamento;
            this.parcela_customizado = response.data.valor_parcela_financiamento;
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
      async resumoRanqueamentoOuro() {
        //Verificar se todos os acessórios foram preenchidos
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URL}verificar_ranqueamento_ouro`,
            {
              params: {
                pos_venda_detalhada_id: this.id_pos_venda_detalhada,
              },
            }
          );
          let bancos = [];
          bancos = response.data.menu_pos_venda_detalhada.menu_pos_venda[0].menu_rank_pos_venda;
          const bancoOuro = bancos.find(banco => banco.rankPacote === 'Ouro');
  
          if (bancoOuro) {
            this.banco_selecionado = bancoOuro.bancos_rank_pos_venda.nome;
          }  
          console.log("Resumo do ranqueamento Ouro", response.data);
          console.log("Resumo do ranqueamento Ouro Bancos", this.banco_selecionado);
     
        } catch (error) {
          console.log(error);
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
      },
      async resumoRanqueamentoPrata() {
        //Verificar se todos os acessórios foram preenchidos
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URL}verificar_ranqueamento_prata`,
            {
              params: {
                pos_venda_detalhada_id: this.id_pos_venda_detalhada,
              },
            }
          );
          let bancos = [];
          bancos = response.data.menu_pos_venda_detalhada.menu_pos_venda[0].menu_rank_pos_venda;
          const bancoPrata = bancos.find(banco => banco.rankPacote === 'Prata');
  
          if (bancoPrata) {
            this.banco_selecionado = bancoPrata.bancos_rank_pos_venda.nome;
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
      async resumoRanqueamentoBronze() {
        //Verificar se todos os acessórios foram preenchidos
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URL}verificar_ranqueamento_bronze`,
            {
              params: {
                pos_venda_detalhada_id: this.id_pos_venda_detalhada,
              },
            }
          );
          let bancos = [];
          bancos = response.data.menu_pos_venda_detalhada.menu_pos_venda[0].menu_rank_pos_venda;
          const bancoBronze = bancos.find(banco => banco.rankPacote === 'Bronze');
  
          if (bancoBronze) {
            this.banco_selecionado = bancoBronze.bancos_rank_pos_venda.nome;
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
      async verificar_ranqueamento_customizado() {
        //Verificar se todos os acessórios foram preenchidos
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URL}verificar_acessorios`,
            {
              params: {
                pos_venda_detalhada_id: this.id_pos_venda_detalhada,
              },
            }
          );
  
          console.log("Itens kits acessorios", response.data.kits.count);
          if (response.data.kits.count > 0) {
            this.abrir_modal = true;
            this.msg = "Não existem acessórios ou estão sem preço de venda!";
            setTimeout(() => (this.abrir_modal = false), 4000);
            //this.habilitar_ranquear_customizado = true;
          } else {
            console.log("Habilitando botão de ranquear")
            //this.habilitar_ranquear_customizado = false;
      
            if(this.valor_entrada_customizado){
              const modal = new Modal(document.getElementById('ModalRanqueamentoCustomizado'));
              modal.show();
              console.log("Valores da Entrada e do total financiado");
              const val1 = this.formatarDecimal(this.valor_financiar);
              const val2 = this.formatarDecimal(this.valor_entrada_customizado);
              const val3 = (this.valor_pacote_customizado);
              this.total_financiamento_customizado = parseFloat(val1) + parseFloat(val3) - parseFloat(val2);
              this.valor_entrada_customizado = parseFloat(val2)
              this.ranquear_customizado();
            }else{
              this.abrir_modal = true;
              this.msg = "É obrigatório informar a entrada para ranquear!";
              setTimeout(() => (this.abrir_modal = false), 4000);
            }
  
     
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
      async ranquear_customizado() {
        if (this.valor_pacote_customizado) {
          console.log(
            "Existe valor para o pacote",
            this.valor_pacote_customizado
          );
          this.quadro_customizado = true;
  
          this.valor_pacote_customizado_rank =
            this.valor_pacote_customizado + this.total_financiado_fei;
  
          // this.total_financiamento_customizado = this.currency(
          //   this.valor_pacote_customizado_rank
          // );
          this.retrieveRanqueamentoCustomizado();
        }
      },
      async retrieveRanqueamentoCustomizado() {
  
        const params = this.getRequestParamsTaxasCustomizado(
          this.valor_entrada_customizado,
          this.total_financiamento_customizado,
          this.parcela,
          this.page,
          this.pageSize,
          this.n_atendimento,
          this.company_id
        );
        console.log(
          "Dados do Paramentro para calcular taxas do customizado",
          params
        );
        /**Chama o método ranqueamento que cria as taxas na tabela tempTaxas e retorna um ok  */
        userService.getTaxasFEI_customizado(params).then((response) => {
          const cod = response;
          console.log("Taxas encontradas", response);
  
          if (cod.status == 200) {
            /**Caso a resposta seja ok chamo os métodos abaixo */
            this.ranqueamento_entrada_customizado();
          }
        });
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
  
      async inserir_acessorio(item) {
        console.log("Inserindo acessorio");
        console.log(this.id_pos_venda_detalhada)
        await fetch(`${process.env.VUE_APP_API_URL}venda_customizada`, {
          method: "POST",
  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pos_venda_detalhada_id: this.id_pos_venda_detalhada,
            codigo: "AC",
            descricao: item.descricao_mercadoria,
            preco_base: item.preco_base,
            preco: item.preco_final,
            preco_desconto: 0,
            desconto_usuario: 0,
            desconto_gerente: 0,
            status: 1,
          }),
        })
          .then((data) => {
            if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();
          })
          .then((resposta) => {
            console.log("Resposta", resposta);
            if (resposta.StatusOk == 200) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 1000);
              this.retrievekitsAcessoriosItens();
              this.atualizarPacoteCustomizado();
            }
            if (resposta.StatusOk == 204) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 1000);
              //this.resetForm();
              // this.retrieveCliente();
            }
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              console.log("Erro do servidor:", error.response.data.message);
              this.abrir_modal = true;
              this.msg =
                "Houve um erro no servidor: " + error.response.data.message;
            } else {
              console.log("Erro desconhecido:", error);
              this.abrir_modal = true;
              this.msg =
                "Houve um erro desconhecido. Por favor, contate o administrador.";
            }
            setTimeout(() => (this.abrir_modal = false), 1000);
          });
      },
      async inserir_seguro(item) {
        console.log("Inserindo seguro");
        console.log(item);
        await fetch(`${process.env.VUE_APP_API_URL}venda_customizada`, {
          method: "POST",
  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pos_venda_detalhada_id: this.id_pos_venda_detalhada,
            codigo: "SG",
            descricao: item.descricao,
            preco: item.valor,
            preco_desconto: 0,
            desconto_usuario: 0,
            desconto_gerente: 0,
            status: 1,
          }),
        })
          .then((data) => {
            if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();
          })
          .then((resposta) => {
            console.log("Resposta", resposta);
            if (resposta.StatusOk == 200) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 1000);
              this.retrievekitsSegurosItens();
              this.atualizarPacoteCustomizado();
            }
            if (resposta.StatusOk == 204) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 1000);
              //this.resetForm();
              // this.retrieveCliente();
            }
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              console.log("Erro do servidor:", error.response.data.message);
              this.abrir_modal = true;
              this.msg =
                "Houve um erro no servidor: " + error.response.data.message;
            } else {
              console.log("Erro desconhecido:", error);
              this.abrir_modal = true;
              this.msg =
                "Houve um erro desconhecido. Por favor, contate o administrador.";
            }
            setTimeout(() => (this.abrir_modal = false), 1000);
          });
      },
      async inserir_revisoes(item) {
        console.log("Inserindo revisoes");
        console.log(item);
        await fetch(`${process.env.VUE_APP_API_URL}venda_customizada`, {
          method: "POST",
  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pos_venda_detalhada_id: this.id_pos_venda_detalhada,
            codigo: "RV",
            descricao: item.descricao,
            preco: item.valor,
            preco_desconto: 0,
            desconto_usuario: 0,
            desconto_gerente: 0,
            status: 1,
          }),
        })
          .then((data) => {
            if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();
          })
          .then((resposta) => {
            console.log("Resposta", resposta);
            if (resposta.StatusOk == 200) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 1000);
              this.retrievekitsRevisoesItens();
              this.atualizarPacoteCustomizado();
            }
            if (resposta.StatusOk == 204) {
              this.abrir_modal = true;
              this.msg = resposta.message;
              setTimeout(() => (this.abrir_modal = false), 1000);
              //this.resetForm();
              // this.retrieveCliente();
            }
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              console.log("Erro do servidor:", error.response.data.message);
              this.abrir_modal = true;
              this.msg =
                "Houve um erro no servidor: " + error.response.data.message;
            } else {
              console.log("Erro desconhecido:", error);
              this.abrir_modal = true;
              this.msg =
                "Houve um erro desconhecido. Por favor, contate o administrador.";
            }
            setTimeout(() => (this.abrir_modal = false), 1000);
          });
      },
  
      remover_item_customizado(item) {
        this.id_acessorio_customizado = item.id;
      },
  
      async atualizarPacoteCustomizado() {
        this.de_customizado =
          this.total_preco_acessorios_customizado +
          this.total_preco_seguros_customizado +
          this.total_preco_revisoes_customizado;
        this.por_customizado = this.valor_pacote_customizado;
        this.economia_customizado = this.de_customizado - this.por_customizado;
        this.novo_valor_parcela_customizado = this.parcela_customizado;
  
  
        // const valor_desk = parseFloat(this.parcela_desk);
        // console.log("Valor parcela antiga customizado", valor_desk)
        // this.apenas_customizado = (this.novo_valor_parcela_customizado - valor_desk) / 30;
      },
      async atualizarPacote() {
        window.location.reload()
      },
  
      async confirmarPrecoDesconto() {
        const id = this.id_acessorio;
  
        try {
          await fetch(`${process.env.VUE_APP_API_URL}venda_customizada/${id}`, {
            method: "PUT",
  
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              preco_desconto: this.precoDesconto,
              tipo:  'desconto'
            }),
          })
            .then((data) => {
              if (!data.ok) {
                throw Error(data.status);
              }
              return data.json();
            })
            .then((resposta) => {
              console.log("Resposta da atualização", resposta);
              if (resposta.StatusOk === 200) {
                this.abrir_modal = true;
                this.msg = resposta.message;
                setTimeout(() => (this.abrir_modal = false), 1000);
                this.retrievekitsAcessoriosItens();
                this.atualizarPacoteCustomizado();
                this.verificar_ranqueamento_customizado();
                this.precoDesconto = 0;
              }
              if (resposta.StatusOk === 204) {
                this.abrir_modal = true;
                this.msg = resposta.message;
                setTimeout(() => (this.abrir_modal = false), 4000);
              }
            });
        } catch (error) {
          console.error("Verificando log", error.message);
  
          if (error.response && error.response.status === 500) {
            this.abrir_modal = true;
            this.msg = "Erro interno do servidor";
            setTimeout(() => (this.abrir_modal = false), 1000);
          } else {
            // Tratar outros erros
            this.abrir_modal = true;
            (this.msg = "Erro:"), error.message;
            (this.msg = "Status:"), error.response.status;
            (this.msg = "Dados:"), error.response.data;
            (this.msg = "Cabeçalhos:"), error.response.headers;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
      },
      async confirmarAlteracao() {
        const id = this.id_acessorio_customizado;
  
        try {
          await fetch(`${process.env.VUE_APP_API_URL}venda_customizada/${id}`, {
            method: "PUT",
  
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              status: 0,
              tipo:  'excluir'
            }),
          })
            .then((data) => {
              if (!data.ok) {
                throw Error(data.status);
              }
              return data.json();
            })
            .then((resposta) => {
              console.log("Resposta da atualização", resposta);
              if (resposta.StatusOk === 200) {
                this.abrir_modal = true;
                this.msg = resposta.message;
                setTimeout(() => (this.abrir_modal = false), 1000);
                this.retrievekitsAcessoriosItens();
                this.atualizarPacoteCustomizado();
              }
            });
        } catch (error) {
          console.error("Verificando log", error.message);
  
          if (error.response && error.response.status === 500) {
            this.abrir_modal = true;
            this.msg = "Erro interno do servidor";
            setTimeout(() => (this.abrir_modal = false), 1000);
          } else {
            // Tratar outros erros
            this.abrir_modal = true;
            (this.msg = "Erro:"), error.message;
            (this.msg = "Status:"), error.response.status;
            (this.msg = "Dados:"), error.response.data;
            (this.msg = "Cabeçalhos:"), error.response.headers;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
      },
      async confirmarAlteracaoSeguro() {
        const id = this.id_acessorio_customizado;
  
        try {
          await fetch(`${process.env.VUE_APP_API_URL}venda_customizada/${id}`, {
            method: "PUT",
  
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              status: 0,
            }),
          })
            .then((data) => {
              if (!data.ok) {
                throw Error(data.status);
              }
              return data.json();
            })
            .then((resposta) => {
              console.log("Resposta da atualização", resposta);
              if (resposta.StatusOk === 200) {
                this.abrir_modal = true;
                this.msg = resposta.message;
                setTimeout(() => (this.abrir_modal = false), 1000);
                this.retrievekitsSegurosItens();
                this.atualizarPacoteCustomizado();
              }
            });
        } catch (error) {
          console.error("Verificando log", error.message);
  
          if (error.response && error.response.status === 500) {
            this.abrir_modal = true;
            this.msg = "Erro interno do servidor";
            setTimeout(() => (this.abrir_modal = false), 1000);
          } else {
            // Tratar outros erros
            this.abrir_modal = true;
            (this.msg = "Erro:"), error.message;
            (this.msg = "Status:"), error.response.status;
            (this.msg = "Dados:"), error.response.data;
            (this.msg = "Cabeçalhos:"), error.response.headers;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
      },
      async confirmarAlteracaoRevisao() {
        const id = this.id_acessorio_customizado;
        try {
          await fetch(`${process.env.VUE_APP_API_URL}venda_customizada/${id}`, {
            method: "PUT",
  
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              status: 0,
            }),
          })
            .then((data) => {
              if (!data.ok) {
                throw Error(data.status);
              }
              return data.json();
            })
            .then((resposta) => {
              console.log("Resposta da atualização", resposta);
              if (resposta.StatusOk === 200) {
                this.abrir_modal = true;
                this.msg = resposta.message;
                setTimeout(() => (this.abrir_modal = false), 1000);
                this.retrievekitsRevisoesItens();
                this.atualizarPacoteCustomizado();
              }
            });
        } catch (error) {
          console.error("Verificando log", error.message);
  
          if (error.response && error.response.status === 500) {
            this.abrir_modal = true;
            this.msg = "Erro interno do servidor";
            setTimeout(() => (this.abrir_modal = false), 1000);
          } else {
            // Tratar outros erros
            this.abrir_modal = true;
            (this.msg = "Erro:"), error.message;
            (this.msg = "Status:"), error.response.status;
            (this.msg = "Dados:"), error.response.data;
            (this.msg = "Cabeçalhos:"), error.response.headers;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
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
          // this.total_precoAjustado_acessorios = response.data.totalPrecoAjustado;
          // this.totalPages = response.data.totalPages;
          // this.totalItems = response.data.totalItems;
          this.total_kits();
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
          this.total_preco_seguros_customizado = response.data.totalPreco;
          // this.total_precoDesconto_acessorios = response.data.totalPrecoDesconto;
          // this.total_precoAjustado_acessorios = response.data.totalPrecoAjustado;
          // this.totalPages = response.data.totalPages;
          // this.totalItems = response.data.totalItems;
          this.total_kits();
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
          // this.total_precoDesconto_acessorios = response.data.totalPrecoDesconto;
          // this.total_precoAjustado_acessorios = response.data.totalPrecoAjustado;
          // this.totalPages = response.data.totalPages;
          // this.totalItems = response.data.totalItems;
          this.total_kits();
        } catch (error) {
          console.log(error);
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
      },
  
      async retrieveAcessorios() {
        console.log("Buscando lista de acessórios");
  
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URL}listar_acessorios_modelo`,
            {
              params: {
                modelo_id: this.modelo_id,
                codigo_mercadoria: this.filtroCodigo,
                descricao_mercadoria: this.filtroDescricao,
                page: this.page - 1,
                size: this.pageSize,
              },
            }
          );
  
          console.log("Dados dos acessorios");
          this.estoque_pecas = response.data.acessorio_modelo;
          this.totalPages = response.data.totalPages;
          this.totalItems = response.data.totalItems;
        } catch (error) {
          console.log(error);
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
      },
      async retrieveSeguros() {
        console.log("Buscando lista de acessórios");
  
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URL}listar_seguros`,
            {
              params: {
                modelo_id: this.modelo_id,
                codigo: this.filtroCodigoSeguro,
                descricao: this.filtroDescricaoSeguros,
                page: this.page - 1,
                size: this.pageSize,
              },
            }
          );
  
          console.log("Dados dos acessorios");
          console.log(response.data.seguros);
          this.seguros_modelo = response.data.seguros;
          this.totalPages = response.data.totalPages;
          this.totalItems = response.data.totalItems;
        } catch (error) {
          console.log(error);
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
      },
      async retrieveRevisoes() {
        console.log("Buscando lista de Revisões");
  
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URL}listar_revisoes`,
            {
              params: {
                modelo_id: this.modelo_id,
                codigo: this.filtroCodigoSeguro,
                descricao: this.filtroDescricaoSeguros,
                page: this.page - 1,
                size: this.pageSize,
              },
            }
          );
  
          console.log("Dados das Revisões");
          console.log(response.data.revisoes);
          this.revisoes_modelo = response.data.revisoes;
          this.totalPages = response.data.totalPages;
          this.totalItems = response.data.totalItems;
        } catch (error) {
          console.log(error);
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 1000);
          }
        }
      },
  
 
      exibirModalConfirmacao(item) {
        // Exibir o modal
        console.log("Exibir o modal", item);
  
        // Salvar o item atual para confirmar a alteração posteriormente
        this.id_acessorio = item.id;
        this.status_acessorio = 1;
      },
  
      //funções de formatação
      generatePdfPacotes() {
        // console.log("Imprimir ----------------------------------------------------------------------------------------------------------------- 0001")
        const options2 = {
          margin: [5, 5],
          filename: "menu_pos_venda.pdf",
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
        document.querySelectorAll(".rf_titulo_destaque_pdf").forEach((element) => {
          element.style.fontSize = "14px"; // Tamanho de fonte para impressão
        });
  
  
     
        setTimeout(() => {
          html2pdf().from(this.$refs.contentToPrint1).set(options2).save();
        }, 500);
        //html2pdf().from(this.$refs.contentToPrint).set(options).save();
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
        document.querySelectorAll(".rf_titulo_destaque_pdf").forEach((element) => {
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
          this.total_preco_seguros_customizado +
          this.total_preco_revisoes_customizado;
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
      formatarDecimal(valor){
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
      atualizar_pagina(){
        window.location.reload();
      }
    },
  };
  </script>
  
  <style></style>
  