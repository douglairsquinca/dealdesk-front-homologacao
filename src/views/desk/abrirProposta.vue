<template>
  <div>
    <div class="modal-content bg-dark ">
      <div class="modal-body ">
        <!--Bloco do Cliente-->
        <nav class="navbar navbar-expand-lg rf_bg_form rf_texto ">
          <div class="container-fluid">
            <div>
              <i class="bi bi-sliders fs-5"> Informações do Cliente </i>

            </div>
            <router-link class="nav-link rf_texto active" to="/desk/index">Fechar</router-link>
          </div>
        </nav>
        <form @submit.prevent="onSubmit">
          <div class="card rf_bg_form mt-4">
            <!--Id da Proposta-->
            <div class="row g-2 p-2">
              <div class="col-1">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="id_proposta" :disabled="true" />
                  <label for="valid_descricao" class="rf_texto">Nº Proposta</label>
                </div>
              </div>
              <div class="col-3">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="recepcionista" :disabled="true" />
                  <label for="valid_descricao" class="rf_texto">Atendente</label>
                </div>
              </div>
              <div class="col-3">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="vendedor_info" :disabled="true" />
                  <label for="valid_descricao" class="rf_texto">Vendedor</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <button type="button" class="btn btn-secondary mt-3 " data-bs-toggle="modal"
                    data-bs-target="#ModalTrocarVendedor" @click="retrieveVendedorDispo">
                    Trocar Vendedor
                  </button>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <button type="button" class="btn btn-secondary mt-3 float-end" @click="habilitar_cadastro">
                    Habilitar Cadastro
                  </button>
                </div>
              </div>
            </div>


            <!-- Dados do Cliente-->
            <div class="row g-2 p-2">
              <!--Nome do Cliente-->
              <div class="col-4">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" :style="{ 'border-color': nomeBorderColor }"
                    v-model="cliente" :disabled="input_cliente" required />
                  <label for="valid_descricao" class="rf_texto">Nome do Cliente</label>
                </div>
              </div>
              <!--CPF/CNPJ-->
              <div class="col-md-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="cpfCnpj"
                    :style="{ 'border-color': cnpjBorderColor }" :disabled="input_cliente" required v-on:blur="vData" />
                  <label for="valid_descricao" class="rf_texto">CPF/CNPJ</label>
                </div>
              </div>
              <!--Data Nascimento-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="date" class="form-control rf_bg_form rf_texto" v-model="dataNascimento"
                    :style="{ 'border-color': dataNascimentoBorderColor }" :disabled="input_cliente" autocomplete="off" />
                  <label class="rf_texto">Data Nascimento</label>
                </div>
              </div>
              <!--Email-->
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="email"
                    v-on:blur="validateEmail(email)" :style="{ 'border-color': emailBorderColor }"
                    :disabled="input_cliente" />
                  <label for="valid_descricao" class="rf_texto">Email</label>
                </div>
              </div>
            </div>
            <div class="row g-2 p-2">
              <!--Endereço-->
              <div class="col-4">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="endereco"
                    :style="{ 'border-color': enderecoBorderColor }" :disabled="input_cliente" required
                    autocomplete="off" />
                  <label class="rf_texto">Endereço</label>
                </div>
              </div>
              <!--Complemento-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="complemento"
                    :style="{ 'border-color': complementoBorderColor }" :disabled="input_cliente" autocomplete="off" />
                  <label class="rf_texto">Complemento</label>
                </div>
              </div>
              <!--UF-->
              <div class="col-1">
                <div class="form-floating">
                  <input v-model="uf" :style="{ 'border-color': ufBorderColor }" :disabled="input_cliente"
                    class="form-control rf_bg_form rf_texto" list="datalistOptions" id="estado" required
                    autocomplete="off" />

                  <label class="rf_texto">UF</label>
                  <datalist id="datalistOptions">
                    <option v-for="opt in estados" :data-value="opt.id" :value="opt.sigla" :key="opt.id"></option>
                  </datalist>
                </div>
              </div>
              <!--Cidade-->
              <div class="col-2">
                <div class="form-floating">
                  <input v-model="cidade" :style="{ 'border-color': cidadeBorderColor }" :disabled="input_cliente"
                    class="form-control rf_bg_form rf_texto" list="datalistCidades" id="cidade" required
                    autocomplete="off" />

                  <label class="rf_texto">Cidade</label>
                  <datalist id="datalistCidades">
                    <option v-for="opt in cidades" :data-value="opt.id" :value="opt.nome" :key="opt.id"></option>
                  </datalist>
                </div>
              </div>
              <!--Bairro-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="bairro"
                    :style="{ 'border-color': bairroBorderColor }" :disabled="input_cliente" autocomplete="off"
                    required />
                  <label class="rf_texto">Bairro</label>
                </div>
              </div>
              <!--CEP-->
              <div class="col-1">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="cep"
                    :style="{ 'border-color': cepBorderColor }" :disabled="input_cliente" autocomplete="off" required />
                  <label class="rf_texto">CEP</label>
                </div>
              </div>
            </div>
            <div class="row g-2 p-2">
              <!--Telefone-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="tel"
                    :style="{ 'border-color': telBorderColor }" :disabled="input_cliente" required v-on:blur="vTel" />
                  <label for="valid_descricao" class="rf_texto">Telefone</label>
                </div>
              </div>
              <!--Telefone-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="cel"
                    :style="{ 'border-color': celBorderColor }" :disabled="input_cliente" v-on:blur="vTel2" />
                  <label for="valid_descricao" class="rf_texto">Telefone 2</label>
                </div>
              </div>
            </div>

            <div class="row g-2 p-2">

              <div class="col-1">
                <div class="form-floating">
                  <button type="button" class="btn btn-secondary" :disabled="input_cliente" @click="atualizar_cliente()">
                    Atualizar
                  </button>
                </div>
              </div>
            </div>

            <div class="row g-2 p-2">
              <div class="col-2" v-if="venda_Futura">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="selected_familia_veiculo_escolhido"
                    @change="vendaFutura">
                    <option v-for="item in familia_veiculo_escolhido" :value="item.id" :key="item.id">
                      {{ item.descricao }}
                    </option>
                  </select>
                  <label class="rf_texto">Família</label>
                </div>
              </div>
              <div class="col-2" v-if="venda_Futura">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="selected_modelo_veiculo_escolhido"
                    @change="completar_modelo(selected_modelo_veiculo_escolhido)">
                    <option v-for="item in modelo_veiculo_escolhido" :value="item.id" :key="item.id">
                      {{ item.descricao }}
                    </option>
                  </select>
                  <label class="rf_texto">Modelo</label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <div class="form-check form-switch rf_texto mt-3">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked1"
                      v-model="venda_Futura" @click="select_familia" />
                    <label class="form-check-label" for="flexSwitchCheckChecked1">Venda Futura</label>
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="form-floating">
                  <div class="form-check form-switch rf_texto mt-3">
                    <input class="form-check-input" type="checkbox" role="switch" v-model="pagamento" />
                    <label class="form-check-label">Venda à Vista</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <!--Bloco Veiculos-->
        <div class="row mt-2">
          <!--Veículos para troca-->
          <div class="col-6">
            <div class="card rf_bg_form mt-3">
              <nav class="navbar navbar-expand-lg rf_bg_form rf_texto">
                <div class="container-fluid">
                  <div>
                    <i class="bi bi-car-front-fill fs-5">
                      Veículos de Entrada
                    </i>
                  </div>
                </div>
              </nav>
              <form @submit.prevent="onSubmitVeiculoAvaliacao">
                <div class="row g-2 p-2">
                  <!--Placa-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="placa_avaliacao"
                        v-on:blur="verificar_avaliacao()" />
                      <label class="rf_texto">Placa</label>
                    </div>
                  </div>
                  <!--Marca-->
                  <div class="col">
                    <div class="form-floating">
                      <input v-model="marca_avaliacao" class="form-control rf_bg_form rf_texto" list="datalistOptions"
                        id="marca" autocomplete="off" v-on:blur="filtrar_familia()" />


                      <label>Marca</label>
                      <datalist id="datalistOptions">
                        <option v-for="opt in marca" :data-value="opt.id" :value="opt.descricao" :key="opt.id">
                        </option>
                      </datalist>
                    </div>
                  </div>
                  <!--Familia-->
                  <div class="col">
                    <div class="form-floating">
                      <input v-model="familia_avaliacao" class="form-control rf_bg_form rf_texto" list="datalistFamilia"
                        id="familia" autocomplete="off" v-on:blur="filtrar_modelo()" disabled />


                      <label>Familia</label>
                      <datalist id="datalistFamilia">
                        <option v-for="opt in familia" :data-value="opt.id" :value="opt.descricao" :key="opt.id">
                        </option>
                      </datalist>
                    </div>
                  </div>
                  <!-- <div class="col">
                        <div class="form-floating">
                          <select
                            class="form-select rf_bg_form rf_texto"
                            v-model="familia_avaliacao"
                          >
                            <option
                              v-for="item in familia"
                              :value="item.id"
                              :key="item.id"
                            >
                              {{ item.descricao }}
                            </option>
                          </select>
                          <label for="valid_empresa" class="rf_texto"
                            >Familia</label
                          >
                        </div>
                      </div> -->
                  <!--Modelo-->
                  <div class="col">
                    <div class="form-floating">
                      <select class="form-select rf_bg_form rf_texto" v-model="modelo_avaliacao" disabled>
                        <option v-for="item in modelo" :value="item.id" :key="item.id">
                          {{ item.descricao }}
                        </option>
                      </select>
                      <label for="valid_empresa" class="rf_texto">Modelo</label>
                    </div>
                  </div>

                </div>
                <div class="row g-2 p-2">
                  <!--Ano Modelo-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="anoModelo_avaliacao"
                        disabled />
                      <label class="rf_texto">Ano Modelo</label>
                    </div>
                  </div>
                  <!--Ano Fabricação-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="anoFabricacao_avaliacao"
                        disabled />
                      <label class="rf_texto">Ano Fabricação</label>
                    </div>
                  </div>
                  <!--Valor Avaliado-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="valor_avaliacao" disabled />
                      <label class="rf_texto">R$ Avaliado</label>
                    </div>
                  </div>
                  <!--kilometragem-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="kilometragem" disabled />
                      <label class="rf_texto">Kilometragem</label>
                    </div>
                  </div>
                </div>
                <div class="row g-2 p-2">
                  <div class="col-6">
                    <div class="form-floating">
                      <button type="button" class="btn btn-secondary" data-bs-target="#ModalCadastrarVeiculoAvalicao"
                        data-bs-toggle="modal" :disabled="inserir_acessorios" @click="habilitar_itens_acessorios">
                        Cadastrar Veículo Avaliado
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row g-2 p-2">
                  <div class="form-floating">
                    <div class="alert bg-dark rf_texto" role="alert">
                      <div class="row p-2">
                        <div class="col mt-1">
                          {{ info_avaliacao }}
                        </div>
                        <div class="col-1">
                          <button class="btn btn-secondary" data-bs-target="#ModalAvaliacaoVeiculo" data-bs-toggle="modal"
                            :disabled="hab_avaliacao" @click="dialog_avaliacao = true">
                            info
                          </button>
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-secondary" disabled>
                      Cadastrar
                    </button>
                  </div>
                </div>
              </form>
              <!--Itens Avaliação-->
              <nav class="navbar navbar-expand-lg rf_bg_form rf_texto">
                <div class="container-fluid">
                  <div>
                    <i class="bi bi-clipboard-check fs-5">
                      Itens Avaliação
                    </i>
                  </div>
                </div>
              </nav>
              <div class="card bg-dark m-2 p-2">
                <table class="table rf_texto card_avaliacao" disabled>
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">R$ Valor</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in itens_veiculo" :key="item.descricao">
                      <td>{{ item.item }}</td>
                      <td>{{ item.valor }}</td>
                      <td>{{ item.tipo }}</td>
                      <td>
                        <button type="button" class="btn btn-secondary" @click="excluir_item_av(item)">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row g-2 p-2">
                <div class="form-floating">
                  <button type="button" class="btn btn-secondary" data-bs-target="#ModalItensAvaliacao"
                    data-bs-toggle="modal" :disabled="inserir_item_avaliacao" @click="habilitar_itens_avaliacao">
                    Inserir
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--Veículos para compra-->
          <div class="col-6">
            <div class="card rf_bg_form mt-3">
              <nav class="navbar navbar-expand-lg rf_bg_form rf_texto">
                <div class="container-fluid">
                  <div>
                    <i class="bi bi-car-front-fill fs-5">
                      Veículo de Compra
                    </i>
                  </div>
                </div>
              </nav>
              <form @submit.prevent="onSubmitVeiculo">
                <div class="row g-2 p-2">
                  <!--Chassi-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="chassi_proposta"
                        :disabled="true" />
                      <label class="rf_texto">Chassi</label>
                    </div>
                  </div>
                  <!--Marca-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="marca_proposta"
                        :disabled="true" />
                      <label class="rf_texto">Marca</label>
                    </div>
                  </div>
                  <!--Modelo-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="modelo_proposta"
                        :disabled="true" />
                      <label class="rf_texto">Modelo</label>
                    </div>
                  </div>
                </div>
                <div class="row g-2 p-2">
                  <!--Cor-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="cor_proposta"
                        :disabled="true" />
                      <label class="rf_texto">Cor</label>
                    </div>
                  </div>
                  <!--Ano Fabricação-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="anoFabricacao_proposta"
                        :disabled="true" />
                      <label class="rf_texto">Ano Fabricação</label>
                    </div>
                  </div>
                  <!--Ano Modelo-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="anoModelo_proposta"
                        :disabled="true" />
                      <label class="rf_texto">Ano Modelo</label>
                    </div>
                  </div>
                  <!--Combustivel-->
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="combustivel_proposta"
                        :disabled="true" />
                      <label class="rf_texto">Combustível</label>
                    </div>
                  </div>
                </div>
                <div class="row g-2 p-2">
                  <div class="col">
                    <div class="form-floating">
                      <button type="submit" class="btn btn-secondary" data-bs-toggle="modal"
                        data-bs-target="#ModalVeiculoEstoque" :disabled="inserir_veiculo" @click="habilitar_veiculo">
                        Inserir
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <!--Acessórios e Cortesia-->
              <nav class="navbar navbar-expand-lg rf_bg_form rf_texto">
                <div class="container-fluid">
                  <div>
                    <i class="bi bi-shop fs-5"> Acessórios e Cortesia </i>
                  </div>
                </div>
              </nav>
              <div class="card bg-dark m-2 p-2">
                <table class="table rf_texto card_compra">
                  <thead>
                    <tr>
                      <th scope="col">Descrição</th>
                      <th scope="col">R$ Valor</th>
                      <th scope="col">R$ Custo</th>
                      <th scope="col">Cortesia?</th>
                      <th scope="col">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in itens_acessorios" :key="item.descricao">
                      <td>{{ item.descricao }}</td>
                      <td>{{ item.valor }}</td>
                      <td>{{ item.custo }}</td>
                      <td>{{ cortesia }}</td>
                      <td>
                        <button type="button" class="btn btn-secondary" @click="excluir_item_ac(item)">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row g-2 p-2">
                <div class="col-2">
                  <div class="form-floating">
                    <button type="button" class="btn btn-secondary" data-bs-target="#ModalItensAcessorios"
                      data-bs-toggle="modal" :disabled="inserir_acessorios" @click="habilitar_itens_acessorios">
                      Inserir
                    </button>
                  </div>
                </div>

                <div class="col mt-3">
                  <div class="form-floating">
                    <div class="form-check form-switch rf_texto">
                      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                        v-model="incluir_acessorios" @click="habilitar_incluir_itens_financiamento" checked />
                      <label class="form-check-label" for="flexSwitchCheckChecked">Incluir no Financiamento</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Bloco Resumo da Proposta-->
        <div class="row mt-2">
          <div class="col-6">
            <div class="card rf_bg_form mt-3">
              <nav class="navbar navbar-expand-lg rf_bg_form rf_texto">
                <div class="container-fluid">
                  <div>
                    <i class="bi bi-car-front-fill fs-5">
                      Resumo da Proposta
                    </i>
                  </div>
                </div>
              </nav>

              <div class="row g-2 p-2">
                <!--Valores do Veículo-->
                <div class="col">
                  <div class="form-floating">
                    <nav class="navbar navbar-expand-lg rf_header rf_texto">
                      <div class="container-fluid">
                        <div>
                          <h5>Valores do Veículo</h5>
                        </div>
                      </div>
                    </nav>
                    <table class="table rf_texto bg-dark">
                      <tbody>
                        <tr>
                          <th scope="row">Valor Sugerido de Venda</th>
                          <th></th>
                          <th></th>
                          <td class="rf_titulo_fonte">
                            {{ (Valor_Sugerido) }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" style="white-space: nowrap; overflow: hidden;">Valor Custos Variáveis (+)</th>
                          <th></th>
                          <th></th>
                          <td class="rf_titulo_fonte">
                            {{ Valor_Custo_variaveis }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Valor dos Acessórios</th>
                          <th></th>
                          <th></th>
                          <td class="rf_titulo_fonte">
                            {{ Valor_Itens_Acessorios }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Desconto</th>
                          <td>
                            <input type="text" class="rf_form_control rf_texto rf_titulo_fonte" v-model="desconto"
                              v-on:blur="inserir_desconto" @input="desconto = formatarValor(desconto)" />

                          </td>
                          <th scop="row">Acréscimo</th>
                          <td>
                            <input type="text" class="rf_form_control rf_texto rf_titulo_fonte" v-model="adicional"
                              v-on:blur="inserir_acrescimo" @input="adicional = formatarValor(adicional)" />

                          </td>
                        </tr>
                        <tr>
                          <th scope="row" class="rf_back rf_back_text">
                            Valor Total Veículo Venda
                          </th>
                          <th class="rf_back "></th>
                          <th class="rf_back "></th>
                          <td class="rf_titulo_fonte rf_back">
                            {{ Valor_Total_Venda }}
                          </td>
                        </tr>
                      </tbody>
                      <div v-if="abrir_modal_desconto">
                        <div class="alert bg-dark text-center" role="alert">{{ msg }}</div>
                      </div>
                      <div v-if="abrir_modal_acrescimo">
                        <div class="alert bg-dark text-center" role="alert">{{ msg }}</div>
                      </div>
                    </table>
                  </div>
                </div>


              </div>
              <div class="row g-2 p-2">
                <!--Resultado Operacional-->
                <div class="col">
                  <div class="form-floating">
                    <nav class="navbar navbar-expand-lg rf_header rf_texto">
                      <div class="container-fluid">
                        <div>
                          <h5>Resultado Operacional / Gerencial</h5>
                        </div>
                      </div>
                    </nav>

                    <table class="table rf_texto bg-dark">
                      <tbody>
                        <tr>
                          <th scope="row">Valor Resultado Bruto</th>
                          <td class="rf_titulo_fonte">{{ Lucro_Bruto }}</td>
                        </tr>
                        <tr>
                          <th scope="row">Valor Resultado Gerencial</th>
                          <td class="rf_titulo_fonte">
                            {{ Lucro_Operacional }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Valor Resultado Financiamento</th>
                          <td class="rf_titulo_fonte">
                            {{ Valor_Resultado_Financiamento }}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row" class="rf_back rf_back_text">
                            Valor Resultado Liquído
                          </th>
                          <td class="rf_titulo_fonte rf_back">
                            {{ Lucro_liquido }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card rf_bg_form mt-3">
              <nav class="navbar navbar-expand-lg rf_bg_form rf_texto">
                <div class="container-fluid">
                  <div>
                    <i class="bi bi-car-front-fill fs-5">
                      Resumo da Proposta
                    </i>
                  </div>
                </div>
              </nav>

              <div class="row g-2 p-2">
                <!--Avaliação do Veículo-->
                <div class="col">
                  <div class="form-floating">
                    <nav class="navbar navbar-expand-lg rf_header rf_texto">
                      <div class="container-fluid">
                        <div>
                          <h5>Avaliação do Veículo</h5>
                        </div>
                      </div>
                    </nav>

                    <table class="table rf_texto bg-dark">
                      <tbody>
                        <tr>
                          <th scope="row">Valor Avaliação</th>
                          <td class="rf_titulo_fonte">
                            {{ Valor_Avaliado }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Valor Itens Avaliados DB(-)</th>
                          <td class="rf_titulo_fonte">
                            {{ Valor_Itens_Avaliacao_db }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Valor Itens Avaliados CR(+)</th>
                          <td class="rf_titulo_fonte">
                            {{ Valor_Itens_Avaliacao_cr }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input type="text" class="rf_form_control rf_texto rf_titulo_fonte" :disabled="true" />
                          </td>
                          <td>
                            <input type="text" class="rf_form_control rf_texto rf_titulo_fonte" :disabled="true" />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" class="rf_back rf_back_text">
                            Valor Avaliação Final
                          </th>
                          <td class="rf_titulo_fonte rf_back">
                            {{ Valor_Avaliacao_Final }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="row g-2 p-2">
                <!--Informação Sobre o financiamento-->
                <div class="col">
                  <div class="form-floating">
                    <nav class="navbar navbar-expand-lg rf_header rf_texto">
                      <div class="container-fluid">
                        <div>
                          <h5>Informações sobre o Financiamento</h5>
                        </div>
                      </div>
                    </nav>

                    <table class="table rf_texto bg-dark">
                      <tbody>
                        <tr>
                          <th scope="row">Valor Entrada</th>
                          <td class="rf_titulo_fonte">{{ Valor_Entrada }}</td>
                        </tr>
                        <tr>
                          <th scope="row">Valor Financiado</th>
                          <td class="rf_titulo_fonte">
                            {{ Valor_Financiado }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Quantidade de Meses</th>
                          <td class="rf_titulo_fonte">
                            {{ Quantidade_Meses }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" class="rf_back rf_back_text">
                            Valor da Parcela
                          </th>
                          <td class="rf_titulo_fonte rf_back">{{ Pmt }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Bloco Financiamento-->
        <div class="row mt-2">
          <div class="col">
            <div class="card rf_bg_form mt-3">
              <nav class="navbar navbar-expand-lg rf_bg_form rf_texto">
                <div class="container-fluid">
                  <div>
                    <i class="bi bi-car-front-fill fs-5"> Financiamento </i>
                  </div>
                </div>
              </nav>
              <div class="row g-2 p-2">
                <div class="col">
                  <div class="form-floating">
                    <nav class="navbar navbar-expand-lg rf_header rf_texto">
                      <div class="container-fluid">
                        <div>
                          <h5>Valores do Veículo</h5>
                        </div>
                      </div>
                    </nav>

                    <table class="table rf_texto bg-dark">
                      <thead>
                        <tr>
                          <th class="col-2"></th>
                          <th class="col-1"></th>
                          <th class="col-1"></th>
                          <!--Parcela 1-->
                          <th>
                            <div class="form-floating">
                              <select class="form-select bg-dark rf_texto" v-model="parcela_1">
                                <option v-for="item in itens_financiamento" :value="item.value" :key="item.value">
                                  {{ item.value }}
                                </option>
                              </select>
                              <label for="valid_empresa" class="rf_texto">Parcela</label>
                            </div>
                          </th>
                          <!--Parcela 2-->
                          <th>
                            <div class="form-floating">
                              <select class="form-select bg-dark rf_texto" v-model="parcela_2" v-on:blur="hab_ranquear">
                                <option v-for="item in itens_financiamento" :value="item.value" :key="item.value">
                                  {{ item.value }}
                                </option>
                              </select>
                              <label for="valid_empresa" class="rf_texto">Parcela</label>
                            </div>
                          </th>
                          <!--Parcela 3-->
                          <th>
                            <div class="form-floating">
                              <select class="form-select bg-dark rf_texto" v-model="parcela_3" v-on:blur="hab_ranquear">
                                <option v-for="item in itens_financiamento" :value="item.value" :key="item.value">
                                  {{ item.value }}
                                </option>
                              </select>
                              <label for="valid_empresa" class="rf_texto">Parcela</label>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <!--Primeira Linha-->
                        <tr>
                          <th scope="row">
                            <div class="d-grid gap-2">
                              <button class="btn btn-lg btn-secondary mt-1 disabled">
                                Simulação 1
                              </button>
                            </div>
                          </th>
                          <td>
                            <div class="form-floating">
                              <input type="text" class="form-control-plaintext rf_texto" v-model="entrada_1"
                                v-on:blur="calcular_real_1" :disabled="bloquear_entrada"
                                @input="entrada_1 = formatarValor(entrada_1)" />
                              <label class="rf_texto">Entrada R$</label>
                            </div>

                          </td>
                          <td>
                            <div class="form-floating">
                              <input type="text" class="form-control-plaintext rf_texto" :disabled="bloquear_entrada"
                                v-model="entrada_1_perc" @input="calcular_perc_1()" />
                              <label class="rf_texto">Entrada %</label>
                            </div>
                          </td>
                          <td>
                            <div class="d-grid gap-2">
                              <button type="button" class="btn btn-secondary btn-lg mt-1"
                                :class="{ 'active': pmtSelected === 11 }" @click="select_pmt(parcela_1_1, 11)">
                                {{ parcela_1_1 }}
                              </button>
                            </div>
                          </td>
                          <td>
                            <div class="d-grid gap-2">
                              <button type="button" class="btn btn-secondary btn-lg mt-1"
                                :class="{ 'active': pmtSelected === 12 }" @click="select_pmt(parcela_1_2, 12)">
                                {{ parcela_1_2 }}
                              </button>
                            </div>
                          </td>
                          <td>
                            <div class="d-grid gap-2">
                              <button type="button" class="btn btn-secondary btn-lg mt-1"
                                :class="{ 'active': pmtSelected === 13 }" @click="select_pmt(parcela_1_3, 13)">
                                {{ parcela_1_3 }}
                              </button>
                            </div>
                          </td>
                        </tr>
                        <!-- Segunda Linha-->
                        <tr>
                          <th scope="row">
                            <div class="d-grid gap-2">
                              <button class="btn btn-lg btn-secondary mt-1 disabled">
                                Simulação 2
                              </button>
                            </div>
                          </th>
                          <td>
                            <div class="form-floating">
                              <input type="text" class="form-control-plaintext rf_texto" v-model="entrada_2"
                                :disabled="bloquear_entrada" v-on:blur="calcular_real_2"
                                @input="entrada_2 = formatarValor(entrada_2)" />
                              <label class="rf_texto">Entrada R$</label>
                            </div>
                          </td>
                          <td>
                            <div class="form-floating">
                              <input type="text" class="form-control-plaintext rf_texto" :disabled="bloquear_entrada"
                                v-model="entrada_2_perc" @input="calcular_perc_2()" />
                              <label class="rf_texto">Entrada %</label>
                            </div>
                          </td>
                          <td>
                            <div class="d-grid gap-2">
                              <button type="button" class="btn btn-secondary btn-lg mt-1"
                                :class="{ 'active': pmtSelected === 21 }" @click="select_pmt(parcela_2_1, 21)">
                                {{ parcela_2_1 }}
                              </button>
                            </div>
                          </td>
                          <td>
                            <div class="d-grid gap-2">
                              <button type="button" class="btn btn-secondary btn-lg mt-1"
                                :class="{ 'active': pmtSelected === 22 }" @click="select_pmt(parcela_2_2, 22)">
                                {{ parcela_2_2 }}
                              </button>
                            </div>
                          </td>
                          <td>
                            <div class="d-grid gap-2">
                              <button type="button" class="btn btn-secondary btn-lg mt-1"
                                :class="{ 'active': pmtSelected === 23 }" @click="select_pmt(parcela_2_3, 23)">
                                {{ parcela_2_3 }}
                              </button>
                            </div>
                          </td>
                        </tr>
                        <!--Terceira Linha-->
                        <tr>
                          <th scope="row">
                            <div class="d-grid gap-2">
                              <button class="btn btn-lg btn-secondary mt-1 disabled">
                                Simulação 3
                              </button>
                            </div>
                          </th>
                          <td>
                            <div class="form-floating">
                              <input type="text" class="form-control-plaintext rf_texto" v-model="entrada_3"
                                :disabled="bloquear_entrada" v-on:blur="calcular_real_3"
                                @input="entrada_3 = formatarValor(entrada_3)" />
                              <label class="rf_texto">Entrada R$</label>
                            </div>
                          </td>
                          <td>
                            <div class="form-floating">
                              <input type="text" class="form-control-plaintext rf_texto" :disabled="bloquear_entrada"
                                v-model="entrada_3_perc" @input="calcular_perc_3()" />
                              <label class="rf_texto">Entrada %</label>
                            </div>
                          </td>
                          <td>
                            <div class="d-grid gap-2">
                              <button type="button" class="btn btn-secondary btn-lg mt-1"
                                :class="{ 'active': pmtSelected === 31 }" @click="select_pmt(parcela_3_1, 31)">
                                {{ parcela_3_1 }}
                              </button>
                            </div>
                          </td>
                          <td>
                            <div class="d-grid gap-2">
                              <button type="button" class="btn btn-secondary btn-lg mt-1"
                                :class="{ 'active': pmtSelected === 32 }" @click="select_pmt(parcela_3_2, 32)">
                                {{ parcela_3_2 }}
                              </button>
                            </div>
                          </td>
                          <td>
                            <div class="d-grid gap-2">
                              <button type="button" class="btn btn-secondary btn-lg mt-1"
                                :class="{ 'active': pmtSelected === 33 }" @click="select_pmt(parcela_3_3, 33)">
                                {{ parcela_3_3 }}
                              </button>
                            </div>
                          </td>
                        </tr>
                        <!--Quarta Linha-->
                        <tr>
                          <td>
                            <div class="d-grid gap-2">
                              <button class="btn btn-lg btn-secondary mt-1" @click="limpar_financiamento">
                                Limpar Entradas
                              </button>
                            </div>
                          </td>
                          <th></th>
                          <th></th>
                          <th scope="row">
                            <div class="d-grid gap-2">
                              <button class="btn btn-lg btn-secondary mt-1" id="btn_1" :disabled="entrada_1 === ''"
                                data-bs-target="#ModalRanqueamento" data-bs-toggle="modal" @click="ranqueamento_1()">
                                Ranquear
                              </button>
                            </div>
                          </th>
                          <th scope="row">
                            <div class="d-grid gap-2">
                              <button class="btn btn-lg btn-secondary mt-1" id="btn_2" :disabled="entrada_1 === ''"
                                data-bs-target="#ModalRanqueamento" data-bs-toggle="modal" @click="ranqueamento_2()">
                                Ranquear
                              </button>
                            </div>
                          </th>
                          <th scope="row">
                            <div class="d-grid gap-2">
                              <button class="btn btn-lg btn-secondary mt-1" id="btn_3" :disabled="entrada_1 === ''"
                                data-bs-target="#ModalRanqueamento" data-bs-toggle="modal" @click="ranqueamento_3()">
                                Ranquear
                              </button>
                            </div>
                          </th>
                        </tr>


                      </tbody>
                    </table>
                    <div class="row g-2 ">
                      <div class="col">
                        <div class="form-floating">
                          <textarea v-model="info_adicionais" class="form-control rf_bg_form rf_texto"></textarea>
                          <label class="rf_texto">Informações Adicionais</label>
                        </div>
                      </div>
                      <div class="col-2  mt-3">
                        <button class="btn btn-secondary" :disabled="info_adicionais === ''"
                          @click="grava_info_adicional">GRAVAR INFORMAÇÕES</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="abrir_modal">
        <Message :msg="msg" v-show="msg" />
      </div>
      <div v-if="abrir_modal_atualizar">
        <MessageAtualizar :msg="msg_atualizar" v-show="msg_atualizar" />
      </div>
      <div class="modal-footer">
        <!-- <button class="btn btn-secondary" :disabled="btn_gerar_menu" @click="gerar_menu_desk">
              <router-link class=" nav-link" :to="{ name: 'menu', query: { dados: id_proposta } }">GERAR
                MENU</router-link>
               
            </button> -->

        <button type="submit" class="btn btn-secondary m-1" data-bs-toggle="modal" data-bs-target="#ModalGerarMenu"
          :disabled="btn_gerar_menu" @click="carregarDadosMenu()">
          GERAR MENU
        </button>

        <!-- <button
              class="btn btn-secondary"
              data-bs-target="#ModalGerarMenu"
              data-bs-toggle="modal"
              @click="gerar_menu_desk"
            >
              GERAR MENU
            </button> -->
        <button class="btn btn-secondary m-1" :disabled="btn_finalizar_venda" @click="finalizar_venda">
          FINALIZAR VENDA
        </button>
        <button class="btn btn-secondary m-1" @click="venda_perdida">VENDA PERDIDA</button>
      </div>
    </div>


    <!--Modal Estoque-->
    <div class="modal fade" id="ModalVeiculoEstoque" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content bg-dark rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              Veiculos em Estoque
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!--Modal Estoque-->
            <nav class="navbar navbar-expand-lg rf_bg_form rf_texto">
              <div class="container-fluid">
                <div>
                  <i class="bi bi-sliders fs-5"> Filtros </i>
                </div>
              </div>
            </nav>

            <div class="card rf_bg_form mt-3">
              <div class="row g-2 p-2">
                <div class="col-2">
                  <div class="form-floating">
                    <select class="form-select rf_bg_form rf_texto" v-model="tipoVeiculo">
                      <option value="NOVO">Novo</option>
                      <option value="USADO">Usado</option>
                    </select>
                    <label class="rf_texto">Tipo Veículo</label>

                  </div>
                </div>
                <!--Marca-->
                <div class="col-2">
                  <div class="form-floating">
                    <input v-model="searchMarca" class="form-control rf_bg_form rf_texto" list="dataListMarcaEstoque"
                      autocomplete="off" />

                    <label>Marca</label>
                    <datalist id="dataListMarcaEstoque">
                      <option v-for="opt in marcas_estoque" :data-value="opt.marca" :value="opt.marca" :key="opt.marca">
                      </option>
                    </datalist>
                  </div>
                </div>
                <!--Modelo-->
                <div class="col-2">
                  <div class="form-floating">
                    <input v-model="searchTitle" class="form-control rf_bg_form rf_texto" list="dataListModeloEstoque"
                      autocomplete="off" />

                    <label>Modelo</label>
                    <datalist id="dataListModeloEstoque">
                      <option v-for="opt in modelos_estoque" :data-value="opt.modelo" :value="opt.modelo"
                        :key="opt.modelo"></option>
                    </datalist>
                  </div>
                </div>
                <!--Ano modelo-->
                <div class="col-1">
                  <div class="form-floating">
                    <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchAnoMod" />
                    <label class="rf_texto">Ano Mod.</label>
                  </div>
                </div>
                <!--Ano Fabricação-->
                <div class="col-1">
                  <div class="form-floating">
                    <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchAnoFab" />
                    <label class="rf_texto">Ano Fab.</label>
                  </div>
                </div>
                <!--Cor-->
                <div class="col-2">
                  <div class="form-floating">
                    <input v-model="searchCor" class="form-control rf_bg_form rf_texto" list="dataListCorEstoque"
                      autocomplete="off" />

                    <label>Cor</label>
                    <datalist id="dataListCorEstoque">
                      <option v-for="opt in cores_estoque" :data-value="opt.cor" :value="opt.cor" :key="opt.cor"></option>
                    </datalist>
                  </div>
                </div>
                <!--Chassi-->
                <div class="col-2">
                  <div class="form-floating">
                    <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchChassi" />
                    <label class="rf_texto">Chassi</label>
                  </div>
                </div>
                <!--Placa-->
                <div class="col-2">
                  <div class="form-floating">
                    <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchPlaca" />
                    <label class="rf_texto">Placa</label>
                  </div>
                </div>

              </div>
              <div class="row g-2 p-2">


                <!--Valor inicial-->
                <!-- <div class="col">
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control rf_bg_form rf_texto"
                          v-model="searchValFin"
                        />
                        <label class="rf_texto">Valor Inicial</label>
                      </div>
                    </div> -->
                <!--Valor Final-->
                <!-- <div class="col">
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control rf_bg_form rf_texto"
                          v-model="searchValFin"
                        />
                        <label class="rf_texto">Valor Final</label>
                      </div>
                    </div> -->
              </div>
              <div class="row g-2 p-2">
                <div class="form-floating">
                  <button class="btn btn-secondary" @click="page = 1;
                  retrieveEstoque();
                  ">
                    Pequisar
                  </button>
                </div>
              </div>
              <!--Tabelas-->
              <div class="card bg-dark g-2 p-2 m-2">
                <table class="table rf_texto">
                  <thead>
                    <tr>
                      <th scope="col">Estoque</th>
                      <th scope="col">Loja</th>
                      <th scope="col">Cat.</th>
                      <th scope="col">Chassis</th>
                      <th scope="col">Modelo</th>
                      <th scope="col">R$ PPS</th>
                      <th scope="col">Dias Est.</th>
                      <th scope="col">Cor</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Ano Mod.</th>
                      <th scope="col">Ano Fab.</th>
                      <th scope="col">KM</th>
                      <th scope="col">Placa</th>
                      <th scope="col">Comb.</th>
                      <th scope="col">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="  item   in   estoque_veiculo   " :key="item.id">
                      <td>{{ item.situacaoestoque }}</td>
                      <td>{{ item.descricaoreduzida }}</td>
                      <td>{{ item.estadoveiculo }}</td>
                      <td>{{ item.chassi }}</td>
                      <td>{{ item.modelo }}</td>
                      <td>
                        {{ currency(item.valortotalvenda) }}

                      </td>

                      <td>{{ item.diasestoque }}</td>
                      <td>{{ item.cor }}</td>
                      <td>{{ item.marca }}</td>
                      <td>{{ item.anomodelo }}</td>
                      <td>{{ item.anofabricacao }}</td>
                      <td>{{ item.quilometragem }}</td>
                      <td>{{ item.placa }}</td>
                      <td>{{ item.combustivel }}</td>

                      <td>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                          @click=" carregarVeiculo(item)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil" viewBox="0 0 16 16">
                            <path
                              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <pagination v-if="estoque_veiculo.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
                  @change-page="handlePageChange" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Modal Trocar Vendedor-->
    <div class="modal fade" id="ModalTrocarVendedor" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content bg-dark rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              Troca Vendedor
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="onSubmitTrocaVendedor">
              <div class="row g-2 p-2">
                <div v-if="abrir_modal">
                  <div class="alert bg-dark text-center" role="alert">{{ msg }}</div>
                </div>
              </div>
              <!--Item-->
              <div class="row g-2 p-2">
                <div class="col">
                  <div class="form-floating">
                    <input type="text" class="form-control rf_bg_form rf_texto" v-model="justificativa_vendedor"
                      v-on:blur="validar_vendedor" />
                    <label class="rf_texto">Justificativa</label>
                  </div>
                </div>

              </div>
              <div class="row g-2 p-2">
                <div class="col-6">
                  <div class="form-floating">
                    <select class="form-select rf_bg_form rf_texto" v-model="vendedor_troca" :disabled="check_vend">
                      <option v-for="item in troca_vendedor" :value="item.id" :key="item.id">
                        {{ item.username }}
                      </option>
                    </select>
                    <label class="rf_texto">Vendedor</label>
                  </div>
                </div>
                <div class="col-3">
                  <div class="form-floating">
                    <button class="btn btn-secondary btn-lg mt-1" data-bs-dismiss="modal" :disabled="check_vend"
                      type="submit">
                      Alterar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!--Modal Itens Avaliação-->
    <div class="modal fade" id="ModalItensAvaliacao" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content bg-dark rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              Itens Avaliação
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="onSubmitItensAvaliacao">
              <!--Item-->
              <div class="row g-2 p-2">
                <div class="col">
                  <div class="form-floating">
                    <input type="text" class="form-control rf_bg_form rf_texto" v-model="item_p_avaliacao" />
                    <label class="rf_texto">Item Avaliado</label>
                  </div>
                </div>
                <div class="col-3">
                  <div class="form-floating">
                    <input type="text" class="form-control rf_bg_form rf_texto" v-model="valor_p_avaliacao" />
                    <label class="rf_texto">R$ Valor</label>
                  </div>
                </div>
              </div>
              <div class="row g-2 p-2">
                <div class="col-3">
                  <div class="form-floating">
                    <select class="form-select rf_bg_form rf_texto" v-model="tipo">
                      <option v-for="      item       in       items_avaliacao      " :value="item.value" :key="item.id">
                        {{ item.value }}
                      </option>
                    </select>
                    <label for="valid_empresa" class="rf_texto">Tipo</label>
                  </div>
                </div>
                <div class="col-3">
                  <div class="form-floating">
                    <button class="btn btn-secondary btn-lg mt-1" data-bs-dismiss="modal" type="submit">
                      Cadastrar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--Modal Itens Acessorios-->
    <div class="modal fade" id="ModalItensAcessorios" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content bg-dark rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              Acessórios
            </h1>
            <button class="btn btn-secondary btn-lg p-1 mt-1" type="button" data-bs-target="#ModalProposta"
              data-bs-toggle="modal" aria-label="Close"> Voltar</button>
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchCodigo" />
                  <label class="rf_texto">Código</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="searchDescricao" />
                  <label class="rf_texto">Descrição</label>
                </div>
              </div>
              <!-- <div class="col-2">
                    <div class="form-floating">
                      <select
                        class="form-select rf_bg_form rf_texto"
                        v-model="pageSize"
                      >
                        <option
                          v-for="item in pageSizes"
                          :value="item.value"
                          :key="item.id"
                          @change="handlePageSizeChangeItemAcessorio"
                        >
                          {{ item.value }}
                        </option>
                      </select>
                      <label for="valid_empresa" class="rf_texto"
                        >Itens por página</label
                      >
                    </div>
                  </div> -->
              <div class="col-2">
                <div class="form-floating">
                  <button class="btn btn-secondary btn-lg mt-1" type="button" @click="
                    page = 1;
                  retrieveAcessorios();
                  ">
                    Pesquisar
                  </button>
                </div>
              </div>

            </div>
            <!--Tabelas-->
            <div class="card rf_bg_form g-2 p-2 mt-2">
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">R$ Valor</th>
                    <!-- <th scope="col">R$ custo</th> -->
                    <th scope="col">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="      item       in       acessorios      " :key="item.id">
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.descricao }}</td>
                    <td>{{ currency(item.preco_final_instalado) }}</td>
                    <!-- <td>{{ item.preco_base_peca }}</td> -->
                    <!-- <td>{{ item.status }}</td> -->
                    <td>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click=" inserirAcessorios(item)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-pencil" viewBox="0 0 16 16">
                          <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <pagination v-if="acessorios.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
                @change-page="handlePageChange" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Modal Ranqueamento-->
    <div class="modal fade" id="ModalRanqueamento" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content bg-dark rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              Ranqueamento
            </h1>
            <!-- <button type="button" class="btn-close btn-secondary" data-bs-dismiss="modal" aria-label="Close"></button> -->
          </div>
          <div class="modal-body">
            <div class="row g-2 p-2">
              <!--Tabela Padrão-->
              <div class="col-2">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="filtro_tipo_tabela">
                    <option v-for="      item       in       tabela_financiamento      " :value="item.value"
                      :key="item.id">
                      {{ item.value }}
                    </option>
                  </select>
                  <label for="valid_empresa" class="rf_texto">Tabela Padrão</label>
                </div>
              </div>
              <!--Utiliza SPF-->
              <div class="col-2">
                <div class="form-floating">
                  <select class="form-select rf_bg_form rf_texto" v-model="filtro_spf">
                    <option v-for="      item       in       spf_financiamento      " :value="item.value" :key="item.id">
                      {{ item.value }}
                    </option>
                  </select>
                  <label for="valid_empresa" class="rf_texto">Utiliza SPF</label>
                </div>
              </div>
              <!--Razão Social-->
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="razao_financiamento" />
                  <label class="rf_texto">Razão Social</label>
                </div>
              </div>
              <!--Plano-->
              <div class="col-2">
                <div class="form-floating">
                  <input type="text" class="form-control rf_bg_form rf_texto" v-model="plano"
                    v-on:blur="handleOrderChangeEntrada1" />
                  <label class="rf_texto">Plano</label>
                </div>
              </div>
            </div>
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating text-center">
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'financeira';
                    sortDesc_2 = 0;
                    sortBy_2 = 'financeira';
                    sortDesc_3 = 0;
                    sortBy_3 = 'financeira';
                    btn_filtro_1 = 1;
                    btn_filtro_2 = 0;
                    btn_filtro_3 = 0;
                    btn_filtro_4 = 0;
                    btn_filtro_5 = 0;
                    btn_filtro_6 = 0;
                    btn_filtro_7 = 0;
                    btn_filtro_8 = 0;
                    btn_filtro_9 = 0;
                    btn_filtro_10 = 0;
                    btn_filtro_11 = 0;
                    btn_filtro_11 = 0;
                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>FINANCEIRA</span>
                      <i :class="icon_1"> </i>
                    </button>
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'plano';
                    sortDesc_2 = 0;
                    sortBy_2 = 'plano';
                    sortDesc_3 = 0;
                    sortBy_3 = 'plano';
                    btn_filtro_1 = 0;
                    btn_filtro_2 = 1;
                    btn_filtro_3 = 0;
                    btn_filtro_4 = 0;
                    btn_filtro_5 = 0;
                    btn_filtro_6 = 0;
                    btn_filtro_7 = 0;
                    btn_filtro_8 = 0;
                    btn_filtro_9 = 0;
                    btn_filtro_10 = 0;
                    btn_filtro_11 = 0;

                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>PLANO</span>
                      <i :class="icon_2"> </i>
                    </button>
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'ret';
                    sortDesc_2 = 0;
                    sortBy_2 = 'ret';
                    sortDesc_3 = 0;
                    sortBy_3 = 'ret';
                    btn_filtro_1 = 0;
                    btn_filtro_2 = 0;
                    btn_filtro_3 = 1;
                    btn_filtro_4 = 0;
                    btn_filtro_5 = 0;
                    btn_filtro_6 = 0;
                    btn_filtro_7 = 0;
                    btn_filtro_8 = 0;
                    btn_filtro_9 = 0;
                    btn_filtro_10 = 0;
                    btn_filtro_11 = 0;

                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>RET</span> <i :class="icon_3"> </i>
                    </button>
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'entrada_min_porcentagem';
                    sortDesc_2 = 0;
                    sortBy_2 = 'entrada_min_porcentagem';
                    sortDesc_3 = 0;
                    sortBy_3 = 'entrada_min_porcentagem';
                    btn_filtro_1 = 0;
                    btn_filtro_2 = 0;
                    btn_filtro_3 = 0;
                    btn_filtro_4 = 1;
                    btn_filtro_5 = 0;
                    btn_filtro_6 = 0;
                    btn_filtro_7 = 0;
                    btn_filtro_8 = 0;
                    btn_filtro_9 = 0;
                    btn_filtro_10 = 0;
                    btn_filtro_11 = 0;

                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>% ENT. MIN</span> <i :class="icon_4"> </i>
                    </button>
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'entrada_min_valor';
                    sortDesc_2 = 0;
                    sortBy_2 = 'entrada_min_valor';
                    sortDesc_3 = 0;
                    sortBy_3 = 'entrada_min_valor';

                    btn_filtro_1 = 0;
                    btn_filtro_2 = 0;
                    btn_filtro_3 = 0;
                    btn_filtro_4 = 0;
                    btn_filtro_5 = 1;
                    btn_filtro_6 = 0;
                    btn_filtro_7 = 0;
                    btn_filtro_8 = 0;
                    btn_filtro_9 = 0;
                    btn_filtro_10 = 0;
                    btn_filtro_11 = 0;

                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>R$ ENT. MIN</span> <i :class="icon_5"> </i>
                    </button>
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'rentabilidade_1';
                    sortDesc_2 = 0;
                    sortBy_2 = 'rentabilidade_2';
                    sortDesc_3 = 0;
                    sortBy_3 = 'rentabilidade_3';
                    btn_filtro_1 = 0;
                    btn_filtro_2 = 0;
                    btn_filtro_3 = 0;
                    btn_filtro_4 = 0;
                    btn_filtro_5 = 0;
                    btn_filtro_6 = 1;
                    btn_filtro_7 = 0;
                    btn_filtro_8 = 0;
                    btn_filtro_9 = 0;
                    btn_filtro_10 = 0;
                    btn_filtro_11 = 0;
                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>RENTABILIDADE</span> <i :class="icon_6"> </i>
                    </button>
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'pmt_1';
                    sortDesc_2 = 0;
                    sortBy_2 = 'pmt_2';
                    sortDesc_3 = 0;
                    sortBy_3 = 'pmt_3';
                    btn_filtro_1 = 0;
                    btn_filtro_2 = 0;
                    btn_filtro_3 = 0;
                    btn_filtro_4 = 0;
                    btn_filtro_5 = 0;
                    btn_filtro_6 = 0;
                    btn_filtro_7 = 1;
                    btn_filtro_8 = 0;
                    btn_filtro_9 = 0;
                    btn_filtro_10 = 0;
                    btn_filtro_11 = 0;
                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>PMT</span> <i :class="icon_7"> </i>
                    </button>
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'retorno';
                    sortDesc_2 = 0;
                    sortBy_2 = 'retorno';
                    sortDesc_2 = 0;
                    sortBy_2 = 'retorno';
                    btn_filtro_1 = 0;
                    btn_filtro_2 = 0;
                    btn_filtro_3 = 0;
                    btn_filtro_4 = 0;
                    btn_filtro_5 = 0;
                    btn_filtro_6 = 0;
                    btn_filtro_7 = 0;
                    btn_filtro_8 = 1;
                    btn_filtro_9 = 0;
                    btn_filtro_10 = 0;
                    btn_filtro_11 = 0;

                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>RETORNO</span> <i :class="icon_8"> </i>
                    </button>
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'tc_cob';
                    sortDesc_2 = 0;
                    sortBy_2 = 'tc_cob';
                    sortDesc_3 = 0;
                    sortBy_3 = 'tc_cob';
                    btn_filtro_1 = 0;
                    btn_filtro_2 = 0;
                    btn_filtro_3 = 0;
                    btn_filtro_4 = 0;
                    btn_filtro_5 = 0;
                    btn_filtro_6 = 0;
                    btn_filtro_7 = 0;
                    btn_filtro_8 = 0;
                    btn_filtro_9 = 1;
                    btn_filtro_10 = 0;
                    btn_filtro_11 = 0;

                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>TAC. COB</span> <i :class="icon_9"> </i>
                    </button>
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'tc_dev';
                    sortDesc_2 = 0;
                    sortBy_2 = 'tc_dev';
                    sortDesc_3 = 0;
                    sortBy_3 = 'tc_dev';

                    btn_filtro_1 = 0;
                    btn_filtro_2 = 0;
                    btn_filtro_3 = 0;
                    btn_filtro_4 = 0;
                    btn_filtro_5 = 0;
                    btn_filtro_6 = 0;
                    btn_filtro_7 = 0;
                    btn_filtro_8 = 0;
                    btn_filtro_9 = 0;
                    btn_filtro_10 = 1;
                    btn_filtro_11 = 0;

                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>TAC. DEV</span> <i :class="icon_10"> </i>
                    </button>
                    <button type="button" class="btn btn-dark" @click="
                      sortDesc = 0;
                    sortBy = 'coeficiente';
                    sortDesc_2 = 0;
                    sortBy_2 = 'coeficiente';
                    sortDesc_3 = 0;
                    sortBy_3 = 'coeficiente';
                    btn_filtro_1 = 0;
                    btn_filtro_2 = 0;
                    btn_filtro_3 = 0;
                    btn_filtro_4 = 0;
                    btn_filtro_5 = 0;
                    btn_filtro_6 = 0;
                    btn_filtro_7 = 0;
                    btn_filtro_8 = 0;
                    btn_filtro_9 = 0;
                    btn_filtro_10 = 0;
                    btn_filtro_11 = 1;
                    handleOrderChangeEntradaFiltro();
                    ">
                      <span>COEF</span> <i :class="icon_11"> </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!--Tabelas 1 -->
            <div class="card rf_bg_form g-2 p-2 mt-2">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title mt-3">
                      Valor de Entrada: {{ Valor_Entrada }} - Valor Financiado:
                      {{ Valor_Financiado }}
                    </h5>
                  </div>
                  <!-- <div class="col-2">
                        <div class="form-floating">
                          <select
                            class="form-select rf_bg_form rf_texto"
                            v-model="pageSize_1"
                          >
                            <option
                              v-for="item in pageSizes_1"
                              :value="item.value"
                              :key="item.id"
                              @change-page="handlePageChangeEntrada1"
                            >
                              {{ item.value }}
                            </option>
                          </select>
                          <label for="valid_empresa" class="rf_texto"
                            >Itens por página</label
                          >
                        </div>
                      </div> -->
                </div>
              </div>
              <table class="table bg-dark rf_texto">
                <thead>
                  <tr>

                    <th scope="col">Financeira</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Ret</th>
                    <th scope="col">R$ Ent. Min</th>
                    <th scope="col">% Ent. Min</th>
                    <th scope="col">Rentabilidade</th>
                    <th scope="col">Rebate</th>
                    <th scope="col">Pmt</th>
                    <th scope="col">Spf</th>
                    <th scope="col">Retorno</th>
                    <th scope="col">Tc Cob</th>
                    <th scope="col">Tc Dev</th>
                    <th scope="col">Coef</th>
                    <th scope="col">Qtd. Parc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :class="item.id === linhaSelecionada ? 'custom-highlight-row' : ''
                    " @click=" rowSelect(key, item.id, 1)"
                    v-for="(      item, key      ) in       parcelamento_1      " :key="item.id">

                    <td>{{ item.financeira }}</td>
                    <td>{{ item.plano }}</td>
                    <td>{{ item.ret }}</td>
                    <td>{{ currency(item.entrada_min_valor) }}</td>
                    <td>{{ item.entrada_min_porcentagem }}</td>
                    <td>{{ currency(item.rentabilidade_1) }}</td>

                    <td>{{ currency((parseFloat(Valor_Financiado.replace(/[^\d,]+/g, '').replace(",", ".")) + item.tc_cob)
                      * item.descontoCoeficiente) }}</td>
                    <td>{{ currency(item.pmt_1) }}</td>
                    <td>{{ item.spf }}</td>
                    <td>{{ item.retorno }}</td>
                    <td>{{ currency(item.tc_cob) }}</td>
                    <td>{{ item.tc_dev }}</td>
                    <td>{{ item.coeficiente }}</td>
                    <td>{{ item.qtd_parcelas }}</td>
                  </tr>
                </tbody>
              </table>
              <pagination v-if="parcelamento_1.length" :offset="totalPages_1" :total="totalItems_1" :limit="pageSize_1"
                @change-page="handlePageChangeEntrada1" />
            </div>
            <!--Tabelas 2-->
            <div class="card rf_bg_form g-2 p-2 mt-2">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title mt-3">
                      Valor de Entrada: {{ Valor_Entrada_2 }} - Valor
                      Financiado:
                      {{ Valor_Financiado_2 }}
                    </h5>
                  </div>
                  <!-- <div class="col-2">
                        <div class="form-floating">
                          <select
                            class="form-select rf_bg_form rf_texto"
                            v-model="pageSize_2"
                          >
                            <option
                              v-for="item in items"
                              :value="item.value"
                              :key="item.id"
                              @change-page="handlePageSizeChangeEntrada2"
                            >
                              {{ item.value }}
                            </option>
                          </select>
                          <label for="valid_empresa" class="rf_texto"
                            >Itens por página</label
                          >
                        </div>
                      </div> -->
                </div>
              </div>
              <table class="table bg-dark rf_texto">
                <thead>
                  <tr>
                    <th scope="col">Financeira</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Ret</th>
                    <th scope="col">R$ Ent. Min</th>
                    <th scope="col">% Ent. Min</th>
                    <th scope="col">Rentabilidade</th>
                    <th scope="col">Rebate</th>
                    <th scope="col">Pmt</th>
                    <th scope="col">Spf</th>
                    <th scope="col">Retorno</th>
                    <th scope="col">Tc Cob</th>
                    <th scope="col">Tc Dev</th>
                    <th scope="col">Coef</th>
                    <th scope="col">Qtd. Parc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :class="item.id === linhaSelecionada2
                    ? 'custom-highlight-row'
                    : ''
                    " @click=" rowSelect2(key, item.id, 2)"
                    v-for="(      item, key      ) in       parcelamento_2      " :key="item.id">
                    <td>{{ item.financeira }}</td>
                    <td>{{ item.plano }}</td>
                    <td>{{ item.ret }}</td>
                    <td>{{ currency(item.entrada_min_valor) }}</td>
                    <td>{{ item.entrada_min_porcentagem }}</td>
                    <td>{{ currency(item.rentabilidade_2) }}</td>
                    <td>{{ currency((parseFloat(Valor_Financiado_2.replace(/[^\d,]+/g, '').replace(",", ".")) +
                      item.tc_cob) * item.descontoCoeficiente) }}</td>
                    <td>{{ currency(item.pmt_2) }}</td>
                    <td>{{ item.spf }}</td>
                    <td>{{ item.retorno }}</td>
                    <td>{{ currency(item.tc_cob) }}</td>
                    <td>{{ item.tc_dev }}</td>
                    <td>{{ item.coeficiente }}</td>
                    <td>{{ item.qtd_parcelas }}</td>
                  </tr>
                </tbody>
              </table>
              <pagination v-if="parcelamento_2.length" :offset="totalPages_2" :total="totalItems_2" :limit="pageSize_2"
                @change-page="handlePageChangeEntrada2" />
            </div>
            <!--Tabelas 3-->
            <div class="card rf_bg_form g-2 p-2 mt-2">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title mt-3">
                      Valor de Entrada: {{ Valor_Entrada_3 }} - Valor
                      Financiado:
                      {{ Valor_Financiado_3 }}
                    </h5>
                  </div>
                  <!-- <div class="col-2">
                        <div class="form-floating">
                          <select
                            class="form-select rf_bg_form rf_texto"
                            v-model="pageSize_3"
                          >
                            <option
                              v-for="item in pageSizes_3"
                              :value="item.value"
                              :key="item.id"
                              @change-page="handlePageChangeEntrada3"
                            >
                              {{ item.value }}
                            </option>
                          </select>
                          <label for="valid_empresa" class="rf_texto"
                            >Itens por página</label
                          >
                        </div>
                      </div> -->
                </div>
              </div>
              <table class="table bg-dark rf_texto">
                <thead>
                  <tr>
                    <th scope="col">Financeira</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Ret</th>
                    <th scope="col">R$ Ent. Min</th>
                    <th scope="col">% Ent. Min</th>
                    <th scope="col">Rentabilidade</th>
                    <th scope="col">Rebate</th>
                    <th scope="col">Pmt</th>
                    <th scope="col">Spf</th>
                    <th scope="col">Retorno</th>
                    <th scope="col">Tc Cob</th>
                    <th scope="col">Tc Dev</th>
                    <th scope="col">Coef</th>
                    <th scope="col">Qtd. Parc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :class="item.id === linhaSelecionada3
                    ? 'custom-highlight-row'
                    : ''
                    " @click=" rowSelect3(key, item.id, 3)"
                    v-for="(      item, key      ) in       parcelamento_3      " :key="item.id">
                    <td>{{ item.financeira }}</td>
                    <td>{{ item.plano }}</td>
                    <td>{{ item.ret }}</td>
                    <td>{{ currency(item.entrada_min_valor) }}</td>
                    <td>{{ item.entrada_min_porcentagem }}</td>
                    <td>{{ currency(item.rentabilidade_3) }}</td>
                    <td>{{ currency((parseFloat(Valor_Financiado_3.replace(/[^\d,]+/g, '').replace(",", ".")) +
                      item.tc_cob) * item.descontoCoeficiente) }}</td>
                    <td>{{ currency(item.pmt_3) }}</td>
                    <td>{{ item.spf }}</td>
                    <td>{{ item.retorno }}</td>
                    <td>{{ currency(item.tc_cob) }}</td>
                    <td>{{ item.tc_dev }}</td>
                    <td>{{ item.coeficiente }}</td>
                    <td>{{ item.qtd_parcelas }}</td>
                  </tr>
                </tbody>
              </table>
              <pagination v-if="parcelamento_3.length" :offset="totalPages_3" :total="totalItems_3" :limit="pageSize_3"
                @change-page="handlePageChangeEntrada3" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal" @click="fechar_rank">
              RANKING
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Modal Avaliações do veículo-->
    <div class="modal fade" id="ModalAvaliacaoVeiculo" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content rf_bg_form rf_texto">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              Avaliações do veículo
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card rf_bg_form g-2 p-2 rf_margin">
              <table class="table rf_texto">
                <thead>
                  <tr>
                    <th scope="col">Valor</th>
                    <th scope="col">KM</th>
                    <th scope="col">Loja</th>
                    <th scope="col">Avaliador</th>
                    <th scope="col">Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="      item       in       avaliacoes.avaliacoes      " :key="item.id">
                    <td>{{ currency(item.precoAvaliacao) }}</td>
                    <td>{{ item.kilometragem }}</td>
                    <td>Matriz</td>
                    <td>Gerente 1</td>
                    <td>{{ item.data }}</td>
                    <td>
                      <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                        data-bs-target="#exampleModal" @click=" editar_midia(item)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-pencil" viewBox="0 0 16 16">
                          <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              Retornar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Modal Mensagem Incluir Acessórios-->
    <div class="modal fade" id="ModalMsgIncluirAcessorios" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              Modal 8
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!--Modal Estoque-->
            Mensagem Incluir Acessórios
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" data-bs-dismiss="modal">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Modal Gerar Menu-->
    <div class="modal fade" id="ModalGerarMenu" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1">
      <div class="modal-dialog modal-fullscreen rf_modal">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              Menu Gerado
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card mt-3 rf_texto_pdf" ref="contentToPrint">
              <div class="col">
                <div class="row g-2 p-2">

                  <div class="col-4">
                    <div class="card ">
                      <div class="card-header rf_card_header">Informações do Cliente</div>
                      <div class="rf_card_pdf">
                        <div>
                          <div class="col "><strong>Cliente</strong></div>
                          <div class="col"><span class="">{{ g_menu_cliente }}</span></div>
                        </div>
                        <div>
                          <div class="col"><strong>CPF/CNPJ</strong></div>
                          <div class="col"><span class="">{{ g_menu_cpfCnpj }}</span></div>
                        </div>
                        <div>
                          <div class="col"><strong>Telefone</strong></div>
                          <div class="col"><span class="">{{ g_menu_fone }}</span></div>
                        </div>
                        <div>
                          <div class="col"><strong>Telefone 2</strong></div>
                          <div class="col"><span class="">{{ g_menu_fone2 }}</span></div>
                        </div>
                        <div>
                          <div class="col"><strong>Email</strong></div>
                          <div class="col"><span class="">{{ g_menu_email }}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="card">
                      <div class="card-header rf_card_header">Informações da Proposta</div>
                      <div class="rf_card_pdf">
                        <div>
                          <div class="col "><strong>Gerente</strong></div>
                          <div class="col"><span class="">{{ g_menu_gerente }}</span></div>
                        </div>
                        <div>
                          <div class="col"><strong>Vendedor</strong></div>
                          <div class="col"><span class="">{{ g_menu_vendedor }}</span></div>
                        </div>
                        <div>
                          <div class="col"><strong>Negociação</strong></div>
                          <div class="col"><span class="">{{ g_menu_negociacao }}</span></div>
                        </div>
                        <div>
                          <div class="col"><strong>Data</strong></div>
                          <div class="col"><span class="">{{ g_menu_data_negociacao }}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="card">
                      <div class="card-header rf_card_header">Acessórios</div>
                      <div class="rf_container_menu">
                        <ul class="list-group" v-for="item in itens_acessorios" :key="item.id">
                          <li class="
                          list-group-item
                          d-flex
                          justify-content-between
                          align-items-center
                        ">
                            {{ item.descricao }}
                            <span class="">{{ item.valor }}</span>
                          </li>
                        </ul>
                      </div>
                      <ul class="list-group">
                        <li class="
                        list-group-item
                        d-flex
                        justify-content-between
                        align-items-center
                      ">
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
                            <div class="col-4"><span class="">{{ g_menu_marca }}</span></div>
                          </div>
                          <div class="col">
                            <div class="col"><strong>Modelo</strong></div>
                            <div class="col"><span class="">{{ g_menu_modelo }}</span></div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="col-4"><strong>Cor</strong></div>
                            <div class="col"><span class="">{{ g_menu_cor }}</span></div>
                          </div>
                          <div class="col">
                            <div class="col"><strong>Placa</strong></div>
                            <div class="col"><span class="">{{ g_menu_placa }}</span></div>
                          </div>
                        </div>
                        <div>
                          <div class="col"><strong>Chassi</strong></div>
                          <div class="col"><span class="">{{ g_menu_chassi }}</span></div>
                        </div>
                        <div>
                          <div class="row">
                            <div class="col">
                              <div class="col-6"><strong>Ano Modelo</strong></div>
                              <div class="col-6"><span class="">{{ g_menu_ano_modelo }}</span></div>
                            </div>
                            <div class="col">
                              <div class="col-6"><strong>Ano Modelo</strong></div>
                              <div class="col-6"><span class="">{{ g_menu_ano_fab }}</span></div>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="card">
                      <div class="card-header rf_card_header">Resumo da Compra</div>
                      <div class="rf_card_pdf">
                        <div class="row">
                          <div class="col">
                            <div class="col-7"><strong>Valor Sugerido</strong></div>
                            <div class="col-6"><span class="">{{ g_menu_val_sugerido }}</span></div>
                          </div>
                          <div class="col">
                            <div class="col"><strong>Valor Desconto</strong></div>
                            <div class="col-6"><span class="">{{ g_menu_val_desconto }}</span></div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="col"><strong>Valor Total Acessórios</strong></div>
                            <div class="col"><span class="">{{ g_menu_total_acessorios }}</span></div>
                          </div>
                          <div class="col">
                            <div class="col"><strong>Tipo de Pagamento</strong></div>
                            <div class="col-6"><span class="">{{ tipoPagamento }}</span></div>
                          </div>
                        </div>
                        <div>

                        </div>
                        <div>
                          <div class="col"><strong>Valor Total Veículo</strong></div>
                          <div class="col"><span class="">{{ g_menu_val_veiculo }}</span></div>
                        </div>
                        <div>
                          <div class="col"><strong>Total Financiado</strong></div>
                          <div class="col"><span class="">{{ Valor_Financiado }}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="card">
                      <div class="card-header rf_card_header">Veículo de Troca</div>
                      <div class="rf_card_pdf">
                        <div>
                          <div class="row">
                            <div class="col-6">
                              <div class="col"><strong>Marca</strong></div>
                              <div class="col"><span class="">{{ g_menu_marca_avaliacao }}</span></div>
                            </div>
                            <div class="col-6">
                              <div class="col"><strong>Placa</strong></div>
                              <div class="col"><span class="">{{ g_menu_placa_avaliacao }}</span></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div class="row">
                            <div class="col-6">
                              <div class="col"><strong>Modelo</strong></div>
                              <div class="col"><span class="">{{ g_menu_modelo_avalicao }}</span></div>
                            </div>
                            <div class="col-6">
                              <div class="col"><strong>Ano</strong></div>
                              <div class="col"><span class="">{{ g_menu_ano_modelo_avaliacao }}</span></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div class="row">
                            <div class="col-6">
                              <div class="col"><strong>Valor itens Av. (-)</strong></div>
                              <div class="col"><span class="">{{ g_menu_itens_avaliacao_db }}</span></div>
                            </div>
                            <div class="col-6">
                              <div class="col"><strong>Valor itens Av. (+)</strong></div>
                              <div class="col"><span class="">{{ g_menu_itens_avaliacao_cr }}</span></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div class="row">
                            <div class="col-6">
                              <div class="col"><strong>Valor Avaliado</strong></div>
                              <div class="col"><span class="">{{ g_menu_valor_avaliado }}</span></div>
                            </div>
                            <div class="col-6">
                              <div class="col"><strong>Valor Final Av.</strong></div>
                              <div class="col"><span class="">{{ g_menu_valor_avaliacao_final }}</span></div>
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
                  <div class="card ">
                    <div class="card-header rf_card_header">Entrada</div>
                    <div class="rf_card_pdf">
                      <div>
                        <div class="col "><strong> {{ Valor_Entrada_1 }}</strong></div>
                      </div>
                      <div>
                        <div class="col"><strong> {{ Valor_Entrada_2 }}</strong></div>
                      </div>
                      <div>
                        <div class="col"><strong> {{ Valor_Entrada_3 }}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card ">
                    <div class="card-header rf_card_header">Total Financiado</div>
                    <div class="rf_card_pdf">
                      <div>
                        <div class="col "><strong> {{ Valor_Financiado_1 }}</strong></div>
                      </div>
                      <div>
                        <div class="col"><strong> {{ Valor_Financiado_2 }}</strong></div>
                      </div>
                      <div>
                        <div class="col"><strong> {{ Valor_Financiado_3 }}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card ">
                    <div class="card-header rf_card_header">{{ parcela_1 }} Meses</div>
                    <div class="rf_card_pdf">
                      <div>
                        <div class="col "><strong> {{ parcela_1_1 }}</strong></div>
                      </div>
                      <div>
                        <div class="col"><strong> {{ parcela_2_1 }}</strong></div>
                      </div>
                      <div>
                        <div class="col"><strong> {{ parcela_3_1 }}</strong></div>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card ">
                    <div class="card-header rf_card_header">{{ parcela_2 }} Meses</div>
                    <div class="rf_card_pdf">
                      <div>
                        <div class="col "><strong> {{ parcela_1_2 }}</strong></div>
                      </div>
                      <div>
                        <div class="col"><strong> {{ parcela_2_2 }}</strong></div>
                      </div>
                      <div>
                        <div class="col"><strong> {{ parcela_3_2 }}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card ">
                    <div class="card-header rf_card_header">{{ parcela_3 }} Meses</div>
                    <div class="rf_card_pdf">
                      <div>
                        <div class="col "><strong> {{ parcela_1_3 }}</strong></div>
                      </div>
                      <div>
                        <div class="col"><strong> {{ parcela_2_3 }}</strong></div>
                      </div>
                      <div>
                        <div class="col"><strong> {{ parcela_3_3 }}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="row g-2 p-2">
                <div class="col">
                  <span>
                    * O preço sugerido é válido enquanto durarem os veículos em
                    estoque.</span>
                  <br />
                  <span>** Despesa Operacional para preparação do veículo</span>
                  <br />
                  <!-- <span>A contratação de seguros é opcional, sendo possível a desistência do
                    contrato em até 7 (sete) dias corridos com a devolução integral do
                    valor pago.</span> -->
                  <br />
                  <span>É proibido condicionar desconto de bem à aquisição de seguro.</span>
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
            <button type="button" class="btn btn-secondary" data-bs-target="#ModaProposta" data-bs-toggle="modal">
              Fechar
            </button>
            <button class="btn btn-secondary" :disabled="btn_gerar_menu" @click="generatePdf">IMPRIMIR</button>
          </div>
        </div>
      </div>
    </div>

    <!--Modal Cadastrar Veículo para avaliação-->
    <div class="modal fade" id="ModalCadastrarVeiculoAvalicao" aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              Modal 8
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!--Modal Estoque-->
            Mensagem Incluir Acessórios
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" data-bs-dismiss="modal">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>



  </div>
  <footer class="py-3 my-4">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3"></ul>
    <p class="text-center rf_texto">© 2023 Rfmobi Solution</p>
  </footer>
</template>
<script>
//import SidebarVue from "../../components/menu/Sidebar.vue";
import axios from "axios";
//import DataService from "../../services/DataService";
import userService from "../../services/user.service";
import Pagination from "../../components/Pagination.vue";
import Message from "../../components/modal/Message.vue";
import MessageAtualizar from "../../components/modal/MessageAtualizar.vue";
import { VueMaskDirective } from 'vue-the-mask';
import html2pdf from 'html2pdf.js';
import router from "../../router";
import TokenService from "../../services/token.service";
import jwt_decode from 'jwt-decode';



export default {
  name: "Usuários",

  components: {
    //SidebarVue,
    Pagination,
    Message,
    MessageAtualizar

  },
  directives: {
    mask: VueMaskDirective
  },
  data() {
    return {
      selectedFilter: 'Todos',
      searchTerm: '',
      startDate: '',
      endDate: '',
      adicional: "",

      message: "",
      dialog: "",
      abrir_modal: false,
      abrir_modal_atualizar: false,
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
        { value: 18 },
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

      pageVeiculo: 1,
      pageSizeVeiculo: 100000000,

      //Campos ref ao cliente
      cliente_id: "",
      cpfCnpj: "",
      cliente: "",
      dataNascimento: "",
      clientes: "",
      email: "",
      endereco: "",
      complemento: "",
      uf: "",
      cidade: "",
      bairro: "",
      cep: "",
      tel: "",
      cel: "",
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

      venda_Futura: "",
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
      pagamento: false,

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
      g_menu_fone2: "",
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
      g_menu_placa: "",
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
      msg_atualizar: "",

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

      //Daddos da Proposta
      dados_proposta: "",
      pmtSelected: null,
      selected_familia_veiculo_escolhido: [],
      selected_modelo_veiculo_escolhido: [],
      familia_veiculo_escolhido: "",
      modelo_veiculo_escolhido: "",
      venda_a_vista: "",
      recepcionista: "",
      vendedor: [],
      vendedor_info: "",
      company_id: "",
      vendedor_inicial: "",
      vend_ini: "",
      status_vendedor: "",
      modelo_futuro: [],
      input_cliente: true,
      nomeBorderColor: "",
      emailBorderColor: "",
      telBorderColor: "",
      celBorderColor: "",
      cnpjBorderColor: "",
      dataNascimentoBorderColor: "",
      enderecoBorderColor: "",
      complementoBorderColor: "",
      ufBorderColor: "",
      cidadeBorderColor: "",
      bairroBorderColor: "",
      cepBorderColor: "",
      cidades: [],
      estados: [
        { id: 11, sigla: "RO" },
        { id: 12, sigla: "AC" },
        { id: 13, sigla: "AM" },
        { id: 14, sigla: "RR" },
        { id: 15, sigla: "PA" },
        { id: 16, sigla: "AP" },
        { id: 17, sigla: "TO" },
        { id: 21, sigla: "MA" },
        { id: 22, sigla: "PI" },
        { id: 23, sigla: "CE" },
        { id: 24, sigla: "RN" },
        { id: 25, sigla: "PB" },
        { id: 26, sigla: "PE" },
        { id: 27, sigla: "AL" },
        { id: 28, sigla: "SE" },
        { id: 29, sigla: "BA" },
        { id: 31, sigla: "MG" },
        { id: 32, sigla: "ES" },
        { id: 33, sigla: "RJ" },
        { id: 35, sigla: "SP" },
        { id: 41, sigla: "PR" },
        { id: 42, sigla: "SC" },
        { id: 43, sigla: "RS" },
        { id: 50, sigla: "MS" },
        { id: 51, sigla: "MT" },
        { id: 52, sigla: "GO" },
        { id: 53, sigla: "DF" },
      ],
      troca_vendedor: [],
      justificativa_vendedor: "",
      tipo_vendedor: 2,
      check_vend: true,
      vendedor_troca: "",
      bloquear_entrada: false,
      timer: null


    };
  },
  watch: {
    tipoVeiculo: function () {
      // Limpar campos de busca ao alterar o tipo de veículo
      this.searchMarca = "";
      this.searchTitle = "";
      this.searchAnoMod = "";
      this.searchAnoFab = "";
      this.searchCor = "";
      this.searchChassi = "";
      this.searchPlaca = "";
    }
  },
  computed: {
    tipoPagamento() {
      return this.pagamento ? 'Pagamento à Vista' : 'Financiamento';
    }
  },

  mounted() {
    /**Ao abrir a tela de proposta chamar o método habilitar_proposta ele é responsável por startar o atendimento */
    this.getToken();
    this.habilitar_proposta();
    this.startTimer();



  },
  methods: {
    // startTimer(){     
    //   this.timer = setTimeout(()=>{
    //     //Ação para voltar a tela de propostas  
    //     //this.$router.push('/desk/index')
    //     window.location.reload();
    //   }, 30000);



    // },
    startTimer() {
      let idleTime = 0;

      const resetTimer = () => {
        idleTime = 0;
      };

      const incrementIdleTime = () => {
        idleTime += 1;
        if (idleTime >= 30) { // 30 segundos de inatividade
          // Ação para voltar à tela de propostas
          // this.$router.push('/desk/index');
          window.location.reload();
        }
      };

      // Adiciona os eventos para detectar interações de mouse e teclado
      document.addEventListener('mousemove', resetTimer);
      document.addEventListener('keydown', resetTimer);

      // Define um intervalo para verificar a inatividade a cada segundo
      setInterval(incrementIdleTime, 1000);
    },
    resetTimer() {
      //Reinicar o temporizador toda vez que houver uma interação
      clearTimeout(this.timer);
      this.startTimer();
    },
    /**Função 0001 */
    getToken() {
      const accessToken = TokenService.getLocalAccessToken();
      // Obter o token de atualização (refresh token)
      TokenService.getLocalRefreshToken();
      // Obter o usuário completo (incluindo os tokens) se necessário
      const user_log = TokenService.getUser();

      const decodedToken = jwt_decode(accessToken);
      this.company_id = decodedToken.company;
      this.user_log = user_log.id;
    },
    /**Função 0002 */
    async habilitar_proposta() {
      const propostaId = this.$route.params.id;


      //Limpar campos veiculo de compra
      // this.chassi_proposta = "",
      //   this.marca_proposta = "",
      //   this.modelo_proposta = "",
      //   this.cor_proposta = "",
      //   this.anoModelo_proposta = "",
      //   this.anoFabricacao_proposta = "",
      //   this.combustivel_proposta = ""

      //Buscar dados da proposta
      try {
        await userService.getPropostaId(propostaId).then((response) => {
          this.dados_proposta = response.data


          console.log(response.data);
          /**Bloco de dados com informações do cliente */
          const dados_cliente = {
            id_cliente: this.dados_proposta['cliente_id'],
            nome: this.dados_proposta.clientes['nome'],
            cpfCnpj: this.dados_proposta.clientes['cpfCnpj'],
            dataNascimento: this.formatarData(this.dados_proposta.clientes['nascimento']),
            email: this.dados_proposta.clientes['email'],
            endereco: this.dados_proposta.clientes['endereco'],
            complemento: this.dados_proposta.clientes['complemento'],
            uf: this.dados_proposta.clientes['uf'],
            cidade: this.dados_proposta.clientes['cidade'],
            bairro: this.dados_proposta.clientes['bairro'],
            cep: this.dados_proposta.clientes['cep'],
            tel: this.dados_proposta.clientes['tel'],
            cel: this.dados_proposta.clientes['cel'],
          }
          this.id_cliente = dados_cliente.id_cliente;
          this.cliente = dados_cliente.nome;
          this.cpfCnpj = dados_cliente.cpfCnpj;
          this.dataNascimento = this.formatarData(dados_cliente.dataNascimento);
          this.email = dados_cliente.email;
          this.endereco = dados_cliente.endereco;
          this.complemento = dados_cliente.complemento;
          this.uf = dados_cliente.uf;
          this.cidade = dados_cliente.cidade;
          this.bairro = dados_cliente.bairro;
          this.cep = dados_cliente.cep;
          this.tel = dados_cliente.tel;
          this.cel = dados_cliente.cel;
          /** */

          /**Bloco de dados com informações da proposta */
          const info_proposta = {
            id_proposta: this.dados_proposta['id'],
            empresaID: this.dados_proposta['empresa_id'],
            info_adicionais: this.dados_proposta['obs'],
            status_proposta: this.dados_proposta['status_proposta'],
            recepcionista: this.dados_proposta.usuarios['username'],
            vendedor_info: this.dados_proposta.vendedores['username']
          }
          this.id_proposta = info_proposta.id_proposta;
          this.empresaID = info_proposta.empresaID;
          this.info_adicionais = info_proposta.info_adicionais;
          this.status_proposta = info_proposta.status_proposta;
          this.recepcionista = info_proposta.recepcionista;
          this.vendedor_info = info_proposta.vendedor_info;
          /** */

          /**Bloco de dados com informações do resumo da proposta */
          const resumo_proposta = {
            adicional: (this.dados_proposta["adicional"]),
            desconto: (this.dados_proposta["desconto"]),
            acessorios: (this.dados_proposta["acessorios"]),
            impostos: (this.dados_proposta["impostos"]),
            cortesia: (this.dados_proposta["cortesia"]),
            custos_variaveis: (this.dados_proposta["custos_variaveis"]),
            val_sugerido_venda: (this.dados_proposta["val_sugerido_venda"]),
          }

          this.adicional = this.currency(resumo_proposta.adicional);
          this.desconto = this.currency(resumo_proposta.desconto);
          this.Valor_Total_Venda = this.currency(resumo_proposta.val_sugerido_venda)

          console.log(dados_cliente);
          console.log(info_proposta);
          console.log(resumo_proposta);
          //Dados do Cliente




          if (this.dados_proposta.status_proposta == "Aguardando Atendimento") {
            this.alterar_status_proposta(propostaId);
          }

          //Dados do Veículo Usado
          if (this.dados_proposta.veiculoUsado_id != null) {
            this.marca_avaliacao = this.dados_proposta.veiculos_usados.modeloVeiculo.familiaVeiculo.marcaVeiculo.descricao;
            this.modelo_avaliacao = this.dados_proposta.veiculos_usados.modeloVeiculo.descricao;
            this.familia_avaliacao = this.dados_proposta.veiculos_usados.modeloVeiculo.familiaVeiculo.descricao;
            this.placa_avaliacao = this.dados_proposta.veiculos_usados.placa;
            this.kilometragem = this.numberToReal(this.dados_proposta.veiculos_usados.kilometragem
            );
            this.anoFabricacao_avaliacao = this.dados_proposta.veiculos_usados.anoFabricacao;
            this.anoModelo_avaliacao = this.dados_proposta.veiculos_usados.anoModelo;
            //this.verificar_avaliacao();
            console.log(
              "Chamar Avaliação -------------------------------------------------- 0026"
            );

            if (this.dados_proposta.avaliacaoVeiculo_id != null) {
              this.valor_avaliacao = this.currency(
                this.dados_proposta.avaliacoes_veiculo.precoAvaliacao
              );
              this.retrieveItensVeiculo();
              this.inserir_item_avaliacao = false;
              this.btn_avaliacao = false;
              this.inserir_veiculo = false;

              console.log(
                "Se ja tiver uma avaliação criada com valor é mostrado aqui! ------- 0027"
              );
              console.log(
                "Valor da Avaliação - " + this.valor_avaliacao + " ------- 0028"
              );
              console.log(
                "Em seguida é chamado o método que busca os itens de avaliação caso exista, habilita o botão inserir itens de avaliação e inserir veiculo ------- 0029"
              );
            } else {
              this.inserir_veiculo = true; // Bloqueia a inserção de veiculo para compra até preencher a avaliação
              this.valor_avaliacao = 0;
              this.btn_avaliacao = false;
              console.log(
                "Bloqueia a inserção de veiculo para compra até preencher a avaliação ----- 0030"
              );
            }
          } else {
            this.inserir_veiculo = false;
            this.inserir_item_avaliacao = true;
            this.btn_avaliacao = true;
            //this.verificar_avaliacao();
            console.log("Não existe veículo para avaliação ---- 0031");
          }

          // //Dados do Veículo para Compra
          if (this.dados_proposta.propostaVeiculo_id != null && this.dados_proposta.proposta_veiculo.status_veiculo == 1) {
            this.chassi_proposta = this.dados_proposta.proposta_veiculo.chassis;
            this.marca_proposta = this.dados_proposta.proposta_veiculo.marca;
            this.modelo_proposta = this.dados_proposta.proposta_veiculo.modelo_veiculo;
            this.cor_proposta = this.dados_proposta.proposta_veiculo.cor;
            this.anoModelo_proposta = this.dados_proposta.proposta_veiculo.ano_modelo;
            this.anoFabricacao_proposta = this.dados_proposta.proposta_veiculo.ano_fabricacao;
            this.combustivel_proposta = this.dados_proposta.proposta_veiculo.combustivel;
            ///Alteração na linha de baixo dia 10/05/2023
            this.Valor_Sugerido = this.currency(this.dados_proposta.proposta_veiculo.valor_veiculo + this.acrescimo);
            this.valor_sugerido_original = this.dados_proposta.proposta_veiculo.valor_veiculo;
            this.inserir_acessorios = false;
            //this.btn_ranquear = false;
            //this.btn_1 = false;
            this.retrieveItensAcessorios();
            console.log(
              "Caso já exista um veiculo para financiamento carrega os dados na tela ---------- 0032"
            );
            console.log(
              "Dados do Veiculo Financiado (" +
              this.chassi_proposta +
              " | " +
              this.marca_proposta +
              " | " +
              this.modelo_proposta +
              " | " +
              this.cor_proposta +
              " | " +
              this.anoModelo_proposta +
              " | " +
              this.anoFabricacao_proposta +
              " | " +
              this.combustivel_proposta +
              ") ------ 0033"
            );
          }

          //Resumo da Proposta
          this.modal_proposta = true;
          this.resumo();

        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }


      //Inserir Gerente
      const gerente_id = this.$store.state.auth.user.id;
      await fetch(`${process.env.VUE_APP_API_URL}proposta_update_gerente/${propostaId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gerente_id: gerente_id,
          }),
        })
        .then((data) => {
          if (!data.ok) {
            console.log(data)
            this.abrir_modal = true;
            this.msg = "Sistema sendo atualizado!";
            setTimeout(() => (this.abrir_modal = false), 4000);
            throw Error(data.status);

          }

          return data.json();
        });



    },

    /**Função 003 */
    /*Venda Futura e Veiculo do estoque*/
    async completar_modelo(item) {
      try {
        const id_modelo = item;
        const modelo_venda = await axios.get(`${process.env.VUE_APP_API_URL}modelo/${id_modelo}`, {
          params: { id: id_modelo }
        });

        /**Verifico se veio algum modelo na resposta da api */
        if (Object.keys(modelo_venda.data).length > 0) {

          /**Preenchendo os campos com os dados do modelo */
          this.modelo_futuro = modelo_venda.data;
          this.venda_futura = 1,
            this.empresa = this.empresaID,
            this.chassi_proposta = "",
            this.categoria = "NOVO"
          this.modelo_proposta = modelo_venda.data.descricao,
            this.pps_valor = 0,
            this.valor_veiculo = modelo_venda.data['precoVenda'],
            this.dias_em_estoque = 0,
            this.marca_proposta = modelo_venda.data.familia_veiculo.marca_veiculo['descricao'],
            this.anoModelo_proposta = modelo_venda.data["anoModelo"],
            this.anoFabricacao_proposta = modelo_venda.data["anoFabricacao"],
            this.placa = "",
            this.combustivel_proposta = modelo_venda.data.combustivel_veiculo['descricao'],
            this.cor_proposta = "",
            this.numero_veiculo_proposta = 0
          this.status_veiculo = 1
          this.valor_custo_contabil = modelo_venda.data['precoVenda'],
            this.Valor_Sugerido = this.currency(modelo_venda.data['precoVenda']),
            this.valor_sugerido_original = modelo_venda.data['precoVenda'],
            this.Valor_Total_Venda = this.currency(modelo_venda.data['precoVenda']),
            this.propostaVeiculo();


        } else {
          this.abrir_modal = true;
          this.msg = "O servidor não o modelo selecionado!";
          setTimeout(() => (this.abrir_modal = false), 4000);
        }

      } catch (error) {
        this.abrir_modal = true;
        this.msg = error;
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
    async propostaVeiculo() {
      try {

        const alterar_veiculo = await fetch(`${process.env.VUE_APP_API_URL}veiculo_proposta`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            venda_futura: this.venda_futura,
            empresa: this.empresa,
            categoria: this.categoria,
            chassis: "",
            modelo_veiculo: this.modelo_proposta,
            pps_valor: this.pps_valor,
            valor_veiculo: this.valor_veiculo,
            dias_em_estoque: this.dias_em_estoque,
            cor: this.cor_proposta,
            marca: this.marca_proposta,
            ano_modelo: this.anoModelo_proposta,
            ano_fabricacao: this.anoFabricacao_proposta,
            kilometragem: "",
            placa: this.placa,
            combustivel: this.combustivel_proposta,
            numero_veiculo: this.numero_veiculo_proposta,
            status_veiculo: this.status_veiculo,
            proposta_id: this.id_proposta,
            valorcustocontabil: this.valor_custo_contabil
          }),
        });

        if (alterar_veiculo.ok) {
          this.adicional = "0.00";
          this.desconto = "0.00";
          this.atualizar_valor_total();
          this.update_entradas();
          window.location.reload();
        }


      } catch (error) {
        console.log(error)
      }


    },
    async update_entradas() {
      try {
        const id = this.id_proposta;
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}update_entradas/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              status: 0,
            }),
          }
        );
        if (response.status == 204) {
          this.abrir_modal = true;
          this.msg = "Não existe menu para esse atendimento!";
          setTimeout(() => (this.abrir_modal = false), 4000);
        } else {
          window.location.reload();
        }

      } catch (error) {
        console.log(error)
        this.abrir_modal = true;
        this.msg = error;
        setTimeout(() => (this.abrir_modal = false), 4000);

      }

    },
    async carregarVeiculo(item) {

      try {

        if (item.estadoveiculo == "NOVO") {
          this.venda_futura = 1
        } else {
          this.venda_futura = 0
        }

        this.empresa = item.codigoempresa
        this.categoria = item.estadoveiculo
        this.chassi_proposta = item.chassi
        this.modelo_proposta = item.modelo
        this.pps_valor = item.valortotalentrada
        this.valor_veiculo = item.valortotalvenda
        this.Valor_Sugerido = this.currency(item.valortotalvenda)
        this.Valor_Total_Venda = this.currency(item.valortotalvenda)
        this.valor_sugerido_original = item.valortotalvenda
        this.dias_em_estoque = item.diasestoque
        this.marca_proposta = item.marca
        this.anoModelo_proposta = item.anomodelo
        this.anoFabricacao_proposta = item.anofabricacao
        this.placa = item.placa
        this.combustivel_proposta = item.combustivel
        this.cor_proposta = item.cor
        this.numero_veiculo_proposta = item.numero
        this.status_veiculo = 1
        this.modal_estoque = false
        this.filtro_tipo_veiculo = item.estadoveiculo
        this.inserir_acessorios = false
        this.valor_custo_contabil = item.valorcustocontabil



        const params = {
          numero: this.numero_veiculo_proposta,
          empresa: this.empresa
        }

        //**Verificar se o mesmo veículo está sendo vendido e avisar ou se o mesmo já foi vendido não deixar finalizar a venda */
        const verificar_veiculo = await axios.get(`${process.env.VUE_APP_API_URL}venda_mesmo_veiculo`, {
          params
        });

        if (verificar_veiculo.data.statusOk == 1) {
          console.log(verificar_veiculo.data.message)
          return
        }

        if (verificar_veiculo.data.statusOk == 2) {
          const emp_veiculo = verificar_veiculo.data.dados;
          const id_proposta = this.id_proposta;

          const processarEmpVeiculo = (index) => {
            if (index < emp_veiculo.length) {
              const item = emp_veiculo[index];

              if (item.id != id_proposta) {
                console.log(item.id);
                console.log(item.empresa_proposta.nome);
                this.abrir_modal = true;
                this.msg = `O veículo escolhido encontra-se aberto em outro atendimento com o número: ${item.id}, na empresa: ${item.empresa_proposta.nome}`;
                setTimeout(() => {
                  this.abrir_modal = false;
                  processarEmpVeiculo(index + 1); // Chama a próxima iteração
                }, 8000);
              } else {
                // Se a condição não for satisfeita, avance para a próxima iteração
                processarEmpVeiculo(index + 1);
              }
            } else {
              // Todas as iterações foram processadas, você pode chamar this.propostaVeiculo() aqui
              this.propostaVeiculo();
            }
          };

          processarEmpVeiculo(0); // Inicie o processamento a partir do índice 0
          return
        }

        this.propostaVeiculo();


      } catch (error) {
        console.log(error)
        this.abrir_modal = true;
        this.msg = error;
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
    /**Fim bloco venda futura */

    /**Função 0004 */
    async inserir_desconto() {
      const id = this.id_proposta;
      try {
        await fetch(`${process.env.VUE_APP_API_URL}proposta_desconto/${id}`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            desconto: this.desconto,
          }),
        })
          .then((data) => {
            if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();
          })
          .then((resposta) => {
            if (resposta.statusOk === 200) {
              this.atualizar_valor_total();
              this.update_entradas();
            }

          });
      } catch (error) {
        this.abrir_modal = true;
        this.msg = error;
        setTimeout(() => (this.dialog = false), 4000);

      }

    },

    async atualizar_valor_total() {
      console.log("Atualizando o valor total da venda!")
      const id = this.id_proposta;
      try {

        await fetch(`${process.env.VUE_APP_API_URL}proposta_atualizar_valor_total/${id}`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            val_sugerido_venda: this.Valor_Sugerido,
            adicional: this.adicional,
            desconto: this.desconto
          }),
        })
          .then((data) => {
            if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();
          })
          .then((resposta) => {
            console.log(resposta.data)
            if (resposta.StatusOk == 200) {
              this.Valor_Total_Venda = this.currency(resposta.data[0].val_sugerido_venda);
              this.adicional = this.currency(resposta.data[0].adicional);
              this.desconto = this.currency(resposta.data[0].desconto);
            }

          });


      } catch (error) {
        this.abrir_modal = true;
        this.msg = error;
        setTimeout(() => (this.abrir_modal = false), 4000);
      }



      //this.habilitar_proposta()
      //this.retrievePropostas();
    },

    async inserir_acrescimo() {
      const id = this.id_proposta;
      try {
        await fetch(`${process.env.VUE_APP_API_URL}proposta_acrescimo/${id}`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            acrescimo: this.adicional,
          }),
        })
          .then((data) => {
            console.log(data)
            if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();

          })
          .then((resposta) => {

            if (resposta.statusOk === 200) {
              this.atualizar_valor_total();
              this.update_entradas();
            }

          });

      } catch (error) {
        console.log(error)
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }

      }

    },
    /**Função 0005 */
    async resumo() {
      console.log("Aqui Resumo");
      await fetch(`${process.env.VUE_APP_API_URL}taxas/resumo`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposta_id: this.id_proposta,
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

    /**Função 0006 */


    /**Função 0007 */
    getRequestParamsTrocaVendedor(tipo_vendedor, empresa_id, justificativa_vendedor) {
      let params = {};
      if (tipo_vendedor) {
        params["id_vend"] = tipo_vendedor
      }
      if (empresa_id) {
        params["empresa_id"] = empresa_id;
      }
      if (justificativa_vendedor) {
        params["justificativa_vendedor"] = justificativa_vendedor
      }
      return params;
    },
    async retrieveVendedorDispo() {
      try {
        console.log("troca de vendedor")
        const params = this.getRequestParamsTrocaVendedor(
          this.tipo_vendedor,
          this.company_id,
          this.justificativa_vendedor,


        );
        userService.getVendedorOrdenado(params).then((response) => {
          const { users } = response.data;
          this.troca_vendedor = users;
          let dados_vendedor = [];
          let ven = [];
          let tipo_vend = "";
          let status_vend = "";
          console.log(response.data)
          users.forEach(function (item) {
            if (item.tipo_vendedor == 2) {
              tipo_vend = "Ambos";
            }

            // if (item.tipo_vendedor == 1) {
            //   tipo_vend = "Novos";
            // }
            // if (item.tipo_vendedor == 2) {
            //   tipo_vend = "Usados";
            // }
            if (item.status_vendedor == 1) {
              status_vend = "Disponível";
            }
            if (item.status_vendedor == 0) {
              status_vend = "Indisponível";
            }

            dados_vendedor = {
              id: item.id,
              username: item.username,
              tipo_vendedor: tipo_vend,
              status_vendedor: status_vend,
            };

            ven.push(dados_vendedor);
          });

          console.log("Aqui dados do Ven-------------------------------");
          console.log(response.data);

          this.troca_vendedor = ven;
          this.vendedor_troca = ven[0]["id"];
          this.vend_ini = users[0]['id'];
          this.status_vendedor = ven[0]["status_vendedor"];
          console.log(this.status_vendedor);
          console.log(this.vend_ini);
        }).catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async validar_vendedor() {
      if (!this.justificativa_vendedor) {
        this.check_vend = true;
        this.abrir_modal = true;
        this.msg = "O campo justificativa é obrigatório";
        setTimeout(() => (this.abrir_modal = false), 4000);
      } else if (this.justificativa_vendedor.length < 10) {
        this.check_vend = true;
        this.abrir_modal = true;
        this.msg = "A justificativa de ter mais que 10 caracteres!";
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
      else {
        this.check_vend = false
      }


    },
    async onSubmitTrocaVendedor() {

      const id = this.id_proposta;
      const justificativa = this.justificativa_vendedor;
      const id_vendedor_trocado = this.vendedor_troca;

      await fetch(`${process.env.VUE_APP_API_URL}proposta_troca_vendedor/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          just_troca_vendedor: justificativa,
          vendedor_id: id_vendedor_trocado

        }),
      })
        .then((data) => {
          if (!data.ok) {
            throw Error(data.status);
          }
          return data.json();
        })
        .then((resposta) => {
          this.justificativa_vendedor = ""
          this.abrir_modal = true;
          this.msg = resposta.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
          window.location.reload();

        });

    },

    /**Função 0008 */


    async retrieveCidade() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getCidades(params).then((response) => {
          const { cidade } = response.data;
          this.cidades = cidade;
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    formatarData(data) {
      // Divida a data em partes
      const partesData = data.split(' ')[0].split('-');
      const ano = parseInt(partesData[0], 10);
      const mes = parseInt(partesData[1], 10) - 1; // O mês começa em 0 no JavaScript
      const dia = parseInt(partesData[2], 10);

      const dataObj = new Date(ano, mes, dia);

      const ano1 = dataObj.getFullYear();
      const mes1 = String(dataObj.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
      const dia1 = String(dataObj.getDate()).padStart(2, "0");
      return `${ano1}-${mes1}-${dia1}`;
    },
    habilitar_cadastro() {
      console.log("Habilitando cadastro")
      this.input_cliente = false;
      this.modal_cpfcnpj = "";
      // Defina aqui a lógica para mudar as cores das bordas dos campos
      this.nomeBorderColor = "green"; // Por exemplo, a cor verde indica que o campo está habilitado
      this.emailBorderColor = "green";
      this.telBorderColor = "green";
      this.celBorderColor = "green";

      this.cnpjBorderColor = "green";
      this.dataNascimentoBorderColor = "green";
      this.enderecoBorderColor = "green";
      this.complementoBorderColor = "green";
      this.ufBorderColor = "green";
      this.cidadeBorderColor = "green";
      this.bairroBorderColor = "green";
      this.cepBorderColor = "green";
    },





    async select_familia() {
      if (this.venda_futura == true) {
        console.log("Habilitado")
        this.inserir_veiculo = false

        this.chassi_proposta = "",
          this.marca_proposta = "",
          this.modelo_proposta = "",
          this.cor_proposta = "",
          this.anoFabricacao_proposta = "",
          this.anoModelo_proposta = "",
          this.combustivel_proposta = "",
          this.selected_familia_veiculo_escolhido = "",
          this.selected_modelo_veiculo_escolhido = ""
      }
      if (this.venda_futura == false) {
        console.log("Desabilitado")
        this.inserir_veiculo = true
      }

      console.log(this.venda_futura)
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize,
          this.company_id
        );
        console.log(params)
        userService.getFamilia_futura(params).then((response) => {
          const { familia_veiculo, totalPages } = response.data;
          this.familia_veiculo_escolhido = familia_veiculo;
          this.totalPages = totalPages;
          console.log(response.data);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    async vendaFutura() {
      //Tratar dados quando for venda futura
      //Carregar Familia e Modelo que atendam venda futura

      //Carregar apenas estoque de venda futura
      if (this.familia_veiculo_escolhido) {
        await axios.get(`${process.env.VUE_APP_API_URL}modelos`, {
          params: { familiaVeiculoId: this.selected_familia_veiculo_escolhido }
        })
          .then(response => {
            this.modelo_veiculo_escolhido = response.data.rows
            console.log(response.data.rows)
          })
          .catch(error => {
            if (error.response.status == 400) {
              this.abrir_modal = true;
              this.msg = error.response.data.message;
              setTimeout(() => (this.abrir_modal = false), 4000);
            }
          })


      } else {
        this.modelo_veiculo_escolhido = []
      }

    },



    generatePdf() {
      // console.log("Imprimir ----------------------------------------------------------------------------------------------------------------- 0001")
      const options = {
        margin: [0, 0],
        filename: 'meu-pdf.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: 'avoid-all' },
        enableLinks: true,

      };
      setTimeout(() => {
        html2pdf().from(this.$refs.contentToPrint).set(options).save();
      }, 500);
      //html2pdf().from(this.$refs.contentToPrint).set(options).save();
    },
    async carregarDadosMenu() {
      try {
        const id = this.id_proposta;

        const response = await fetch(`${process.env.VUE_APP_API_URL}gerar_menu/${id}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        });

        if (!response.ok) {
          throw Error(response.status);
        }

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
        this.g_menu_vendedor = data?.data?.rows[0]?.vendedores?.username ?? "";
        this.g_menu_negociacao = data?.data?.rows[0]?.id ?? "";
        this.g_menu_data_negociacao = createdAt ? new Date(createdAt).toLocaleDateString('pt-BR') : "";

        // Opções de Compra
        this.g_menu_val_sugerido = this.currency(
          parseFloat(data?.data?.rows[0]?.proposta_veiculo.valor_veiculo ?? 0) +
          parseFloat(data?.data?.rows[0]?.custos_variaveis ?? 0) +
          parseFloat(data?.data?.rows[0]?.adicional ?? 0)
        );
        this.g_menu_val_desconto = this.currency(data?.data?.rows[0]?.desconto ?? 0);
        // this.g_menu_val_veiculo = this.currency(
        //   parseFloat(data?.data?.rows[0]?.val_sugerido_venda ?? 0) +
        //   parseFloat(data?.data?.rows[0]?.custos_variaveis ?? 0) +
        //   parseFloat(data?.data?.rows[0]?.acessorios ?? 0) + 
        //   parseFloat(data?.data?.rows[0]?.adicional ?? 0)
        // );
        this.g_menu_val_veiculo = this.currency(
          parseFloat(data?.data?.rows[0]?.proposta_veiculo.valor_veiculo ?? 0) +
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
        this.g_menu_marca_avaliacao = veiculoAvaliacao.modeloVeiculo?.familiaVeiculo?.marcaVeiculo?.descricao ?? "";
        this.g_menu_placa_avaliacao = veiculoAvaliacao.placa ?? "";
        this.g_menu_modelo_avaliacao = veiculoAvaliacao.modeloVeiculo?.descricao ?? "";
        this.g_menu_ano_modelo_avaliacao = veiculoAvaliacao.anoModelo ?? "";
        this.g_menu_valor_avaliado = this.Valor_Avaliado ?? 0;
        this.g_menu_itens_avaliacao_db = this.Valor_Itens_Avaliacao_db ?? 0;
        this.g_menu_itens_avaliacao_cr = this.Valor_Itens_Avaliacao_cr ?? 0;
        this.g_menu_valor_avaliacao_final = this.Valor_Avaliacao_Final ?? 0;

        // Acessorios
        this.g_menu_total_acessorios = this.Valor_Itens_Acessorios;
        this.itens_acessorios = data?.data?.rows[0]?.acessorios_proposta ?? [];



        if (this.incluir_acessorios == true) {
          this.msg = "Valor incluso no financiamento!";
        } else {
          this.msg = "Valor não incluso no financiamento!";
        }
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },


    formatarValor(valor) {
      console.log("Valor obtido");

      this.entrada_1_original = this.entrada_1;
      this.entrada_2_original = this.entrada_2;
      this.entrada_3_original = this.entrada_3;

      if (!valor) return '';
      valor = valor.toString().replace(/\D/g, '');
      valor = (valor / 100).toFixed(2).replace('.', ',');
      valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      return valor;

    },
    calcular_perc_1() {

      let calc_entrada1 = (this.entrada_1_perc / 100);
      //let valor_original = this.valor_sugerido_original;
      let valor_original = parseFloat(this.Valor_Total_Venda.replace(/[^\d,]+/g, '').replace(",", "."));
      this.entrada_1 = this.currency(valor_original * calc_entrada1);
    },
    calcular_real_1() {

      if (this.entrada_1 != '') {
        let valor_original = parseFloat(this.Valor_Total_Venda.replace(/[^\d,]+/g, '').replace(",", "."));
        let valor_numerico = parseFloat(this.entrada_1.replace(/[^\d,]+/g, '').replace(",", "."));
        let entrada_perc = (valor_numerico / valor_original) * 100;
        this.entrada_1_perc = parseFloat(entrada_perc).toFixed(2)

      } else {
        this.entrada_1_perc = ''
      }
    },
    calcular_perc_2() {
      let calc_entrada2 = (this.entrada_2_perc / 100);
      let valor_original = parseFloat(this.Valor_Total_Venda.replace(/[^\d,]+/g, '').replace(",", "."));
      this.entrada_2 = this.currency(valor_original * calc_entrada2);
    },
    calcular_real_2() {
      if (this.entrada_2 != '') {
        let valor_original = parseFloat(this.Valor_Total_Venda.replace(/[^\d,]+/g, '').replace(",", "."));
        let valor_numerico = parseFloat(this.entrada_2.replace(/[^\d,]+/g, '').replace(",", "."));
        let entrada_perc = (valor_numerico / valor_original) * 100;
        this.entrada_2_perc = parseFloat(entrada_perc).toFixed(2)

      } else {
        this.entrada_2_perc = ''
      }
    },
    calcular_real_3() {
      if (this.entrada_3 != '') {
        let valor_original = parseFloat(this.Valor_Total_Venda.replace(/[^\d,]+/g, '').replace(",", "."));
        let valor_numerico = parseFloat(this.entrada_3.replace(/[^\d,]+/g, '').replace(",", "."));
        let entrada_perc = (valor_numerico / valor_original) * 100;
        this.entrada_3_perc = parseFloat(entrada_perc).toFixed(2)

      } else {
        this.entrada_3_perc = ''
      }
    },
    calcular_perc_3() {
      let calc_entrada3 = (this.entrada_3_perc / 100);
      let valor_original = parseFloat(this.Valor_Total_Venda.replace(/[^\d,]+/g, '').replace(",", "."));
      this.entrada_3 = this.currency(valor_original * calc_entrada3);
    },
    filtrarPropostas() {
      if (this.selectedFilter === 'Em Atendimento') {
        // console.log("Filtar propostas em atendimento! ------------------------------------------------------------------------------------------------------------------ 0005")
        this.status_proposta = this.selectedFilter
        this.retrievePropostas();
      } else if (this.selectedFilter === 'Venda Finalizada') {
        // console.log("Filtar propostas em Finalizadas! ------------------------------------------------------------------------------------------------------------------ 0006")
        this.status_proposta = this.selectedFilter
        this.retrievePropostas();
      } else if (this.selectedFilter === 'Venda Perdida') {
        this.status_proposta = this.selectedFilter
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas perdiadas! ------------------------------------------------------------------------------------------------------------------ 0007")
      }
    },
    filterByPeriod() {
      this.data_ini = this.startDate
      this.data_fim = this.endDate
      this.status_proposta = "Pesquisa Periodo"
      this.retrievePropostas();

    },

    async grava_info_adicional() {
      const id = this.id_proposta;
      await fetch(`${process.env.VUE_APP_API_URL}proposta_info_adicionais/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          info_adicional: this.info_adicionais,
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
          }
        });
    },
    async atualizar_cliente() {
      const id = this.id_cliente;
      // Crie um objeto para armazenar mensagens de erro
      const erros = {};

      // Verifique cada campo obrigatório
      if (!this.cliente) {
        erros.cliente = "Campo 'Cliente' é obrigatório.";
      }
      if (!this.cpfCnpj) {
        erros.cpfCnpj = "Campo 'CPF/CNPJ' é obrigatório.";
      }
      if (!this.endereco) {
        erros.endereco = "Campo 'Endereço' é obrigatório.";
      }
      if (!this.uf) {
        erros.uf = "Campo 'UF' é obrigatório.";
      }
      if (!this.cidade) {
        erros.cidade = "Campo 'Cidade' é obrigatório.";
      }
      if (!this.bairro) {
        erros.bairro = "Campo 'Bairro' é obrigatório.";
      }
      if (!this.cep) {
        erros.cep = "Campo 'CEP' é obrigatório.";
      }
      if (!this.tel) {
        erros.tel = "Campo 'Telefone' é obrigatório.";
      }

      // Verifique se há erros
      if (Object.keys(erros).length > 0) {
        this.abrir_modal = true;
        this.msg = "Por favor, preencha os campos obrigatórios:";

        // Construa a mensagem de erro com detalhes
        for (const campo in erros) {
          this.msg += `\n${erros[campo]}`;
        }

        setTimeout(() => (this.abrir_modal = false), 4000);
        return;
      }

      await fetch(`${process.env.VUE_APP_API_URL}cliente_proposta/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          nome: this.cliente,
          cpfCnpj: this.cpfCnpj,
          nascimento: this.dataNascimento,
          email: this.email,
          endereco: this.endereco,
          complemento: this.complemento,
          uf: this.uf,
          cidade: this.cidade,
          bairro: this.bairro,
          cep: this.cep,
          tel: this.tel,
          cel: this.cel,
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
          }
        });
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
    filtrar_familia() {
      try {
        var shownVal = document.getElementById("marca").value;
        var array_familia = [];

        if (
          document.querySelector(
            "#datalistOptions option[value='" + shownVal + "']"
          ).dataset.value
        ) {
          var id_marca = document.querySelector(
            "#datalistOptions option[value='" + shownVal + "']"
          ).dataset.value;
          //console.log("Buscando Familias ------------------------------------------------------------------------------------------------------------------ 0008");
          this.retrieveFamilia(id_marca);
        }

        for (let index = 0; index < this.familia.length; index++) {
          if (id_marca == this.familia[index]["marcaVeiculoId"]) {
            array_familia.push(JSON.parse(JSON.stringify(this.familia[index])));
          }
        }
        this.familia = array_familia;

      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    filtrar_modelo() {
      try {
        var shownVal = document.getElementById("familia").value;
        var array_modelo = [];

        console.log(shownVal);
        if (
          document.querySelector(
            "#datalistFamilia option[value='" + shownVal + "']"
          ).dataset.value
        ) {
          var id_familia = document.querySelector(
            "#datalistFamilia option[value='" + shownVal + "']"
          ).dataset.value;
          console.log("Buscando Familias");
          this.retrieveModelo(id_familia);
        }

        for (let index = 0; index < this.modelo.length; index++) {
          if (id_familia == this.modelo[index]["familiaVeiculoId"]) {
            array_modelo.push(JSON.parse(JSON.stringify(this.modelo[index])));
          }
        }
        this.modelo = array_modelo;
        console.log(this.modelo);
      } catch (error) {
        console.log("Marca não encontrada!");
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },

    validando_tempo() {
      let hour = 0;
      let minute = 0;
      let second = 0;
      let tempo_atendimento;
      let tempo_espera;
      let avaliacao;

      setInterval(() => {
        var array_h_1 = [];
        var array_h_2 = [];
        let horas_chegada;
        let minutos_chegada;
        let segundos_chegada;
        let horas_atendimento;
        let minutos_atendimento;
        let segundos_atendimento;

        for (var i = 0; i < this.propostas_at.length; i++) {
          if (
            this.propostas_at[i]["status"] == "Atendimento" ||
            this.propostas_at[i]["status"] == "Atendimento Excedido"
          ) {
            horas_atendimento = this.propostas_at[i]["horas_atendimento"];
            minutos_atendimento = this.propostas_at[i]["minutos_atendimento"];
            segundos_atendimento = second;

            horas_atendimento = parseInt(horas_atendimento) + parseInt(hour);

            minutos_atendimento =
              parseInt(minutos_atendimento) + parseInt(minute);

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

          }
          if (this.propostas_at[i]["status"] == "Aguardando Atendimento") {
            horas_chegada = this.propostas_at[i]["horas_chegada"];
            minutos_chegada = this.propostas_at[i]["minutos_chegada"];
            segundos_chegada = second;
            horas_chegada = parseInt(horas_chegada) + parseInt(hour);
            minutos_chegada = parseInt(minutos_chegada) + parseInt(minute);
            horas_chegada =
              horas_chegada < 10 ? "0" + horas_chegada : horas_chegada;
            minutos_chegada =
              minutos_chegada < 10 ? "0" + minutos_chegada : minutos_chegada;
            segundos_chegada =
              segundos_chegada < 10 ? "0" + segundos_chegada : segundos_chegada;

            tempo_espera = horas_chegada + ":" + minutos_chegada;
            tempo_atendimento = "00:00";
          }
          if (
            this.propostas_at[i]["status"] == "Venda Finalizada" ||
            this.propostas_at[i]["status"] == "Venda Perdida"
          ) {
            tempo_espera = "00:00";
            tempo_atendimento = "00:00";
            //this.open_proposta = false;
          }
          if (this.propostas_at[i]["avaliacao"] == 0) {
            avaliacao = "Não";
          }
          if (this.propostas_at[i]["avaliacao"] == 1) {
            avaliacao = "Sim";
          }

          array_h_1 = {
            acessorios: this.propostas_at[i]["acessorios"],
            adicional: this.propostas_at[i]["adicional"],
            avaliacao: avaliacao,
            avaliacaoVeiculo_id: this.propostas_at[i]["avaliacaoVeiculo_id"],
            avaliacoes_veiculo: this.propostas_at[i]["avaliacoes_veiculo"],
            cliente_id: this.propostas_at[i]["cliente_id"],
            cliente: this.propostas_at[i]["cliente"],
            cortesia: this.propostas_at[i]["cortesia"],
            custos_variaveis: this.propostas_at[i]["custos_variaveis"],
            desconto: this.propostas_at[i]["desconto"],
            empresa_id: this.propostas_at[i]["empresa_id"],
            gerente_id: this.propostas_at[i]["gerente_id"],
            gerente: this.propostas_at[i]["gerente"],
            id: this.propostas_at[i]["id"],
            id_vendedor_fila: this.propostas_at[i]["id_vendedor_fila"],
            impostos: this.propostas_at[i]["impostos"],
            justificativa: this.propostas_at[i]["justificativa"],
            midia_id: this.propostas_at[i]["midia_id"],
            modelo_id: this.propostas_at[i]["modelo_id"],
            modelo_veiculos: this.propostas_at[i]["modelo_veiculos"],
            obs: this.propostas_at[i]["obs"],
            propostaVeiculo_id: this.propostas_at[i]["propostaVeiculo_id"],
            proposta_veiculo: this.propostas_at[i]["proposta_veiculo"],
            retorno: this.propostas_at[i]["retorno"],
            status: this.propostas_at[i]["status"],
            tipo_pagamento: this.propostas_at[i]["tipo_pagamento"],
            user_id: this.propostas_at[i]["user_id"],
            usuarios: this.propostas_at[i]["usuarios"],
            veiculoUsado_id: this.propostas_at[i]["veiculoUsado_id"],
            veiculos_usados: this.propostas_at[i]["veiculos_usados"],
            vendedor_id: this.propostas_at[i]["vendedor_id"],
            vendedor: this.propostas_at[i]["vendedor"],
            monetario_lucro: this.propostas_at[i]["monetario_lucro"],
            percentual_lucro: this.propostas_at[i]["percentual_lucro"],
            monetario_margem: this.propostas_at[i]["monetario_margem"],
            percentual_margem: this.propostas_at[i]["percentual_margem"],
            modelo: this.propostas_at[i]["modelo"],
            //tempo_espera: this.propostas_at[i]["tempo_espera"],
            //tempo_atendimento: this.propostas_at[i]["tempo_atendimento"],
            gerados: this.propostas_at[i]["gerados"],
            motivo_perda: this.propostas_at[i]["motivo_perda"],
            horas_chegada: this.propostas_at[i]["horas_chegada"],
            minutos_chegada: this.propostas_at[i]["minutos_chegada"],
            segundos_chegada: segundos_chegada,
            horas_atendimento: this.propostas_at[i]["horas_atendimento"],
            minutos_atendimento: this.propostas_at[i]["minutos_atendimento"],
            segundos_atendimento: segundos_atendimento,
            cpfCnpj: this.propostas_at[i]["cpfCnpj"],
            nome: this.propostas_at[i]["nome"],
            email: this.propostas_at[i]["email"],
            tel: this.propostas_at[i]["tel"],
            tempo_espera: tempo_espera,
            tempo_atendimento: tempo_atendimento,
          };
          array_h_2.push(array_h_1);
        }
        second++;
        if (second == 60) {
          second = 0;
          minute++;
        }
        if (minute == 60) {
          minute = 0;
          hour++;
        }

        this.propostas_at = array_h_2;
      }, 1000);
    },
    getRequestParams(searchTitle, page, pageSize, empresa_id) {
      let params = {};
      if (searchTitle) {
        params["nome"] = searchTitle;
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
      return params;
    },
    //* Veículo para troca////
    cadastrar_veiculo() {
      if (this.model4 != null) {
        this.marca_id = this.model4.marcaVeiculo;
        this.familia_desc = this.model4.familiaVeiculo.descricao;
        this.familia_id = this.model4.familiaVeiculo.id;
        this.modelo_id = this.model4.id;
      }
    },
    async retrieveFamilia(id) {
      try {
        const params = this.getRequestParams(
          //this.searchTitle,
          id,
          this.page,
          this.pageSize
        );

        userService.getFamilia(params).then((response) => {
          const { familia_veiculo, totalPages } = response.data;
          this.familia = familia_veiculo;
          this.totalPages = totalPages;

          console.log(
            "Familia ----------------------------------------------------------------------------------------------------------------- 0009"
          );
          console.log(response.data);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },

    async retrieveModelo(id) {
      try {
        const params = this.getRequestParams(
          //this.searchTitle,
          id,
          this.page,
          (this.pageSize = 1000)
        );

        userService.getModelo(params).then((response) => {
          const { modelo_veiculo, totalPages } = response.data;
          this.modelo = modelo_veiculo;
          this.totalPages = totalPages;

          console.log(
            "Modelos ----------------------------------------------------------------------------------------------------------------- 0010"
          );
          console.log(response.data);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    async retrieveMarca() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          (this.pageSize = 10000)
        );
        userService.getMarca(params).then((response) => {
          const { marcas, totalPages } = response.data;
          this.marca = marcas;
          this.totalPages = totalPages;
          console.log(
            "Marcas ---------------------------------------------------------------------------------------------------------------------------- 0011"
          );
          console.log(this.marca);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    habilitar_itens_avaliacao() {
      this.modal_itens_avaliacao = true;
    },
    async retrieveItensVeiculo() {
      try {
        const id_proposta = this.id_proposta;
        userService.getItensId(id_proposta).then((response) => {
          var itens_av = [];
          var itens_av2 = [];
          const { rows } = response.data;

          for (var i = 0; i < rows.length; i++) {
            var arr_it = {
              id: rows[i]["id"],
              proposta_id: rows[i]["proposta_id"],
              item: rows[i]["item"],
              tipo: rows[i]["tipo"],
              valor: this.currency(rows[i]["valor"]),
              status: rows[i]["status"],
              createdAt: rows[i]["createdAt"],
              updatedAt: rows[i]["updatedAt"],
            };
            itens_av = arr_it;
            itens_av2.push(itens_av);
          }

          this.itens_veiculo = itens_av2;
          console.log(" Itens de Avaliação ------------------------------------------------------------------------------------------------------------------ 0012");
          console.log(itens_av2);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    async onSubmitItensAvaliacao() {
      const response = await fetch(
        `${process.env.VUE_APP_API_URL}itens_avaliacao`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: this.item_p_avaliacao,
            valor: this.valor_p_avaliacao,
            tipo: this.tipo,
            proposta_id: this.id_proposta,
          }),
        }
      );

      const resp = JSON.stringify(response.status);
      if (resp == 200) {
        console.log("Metodo para inserir itens de avaliação ------------------------------------------------------------------------------------------------------------------ 0013");
        this.modal = true;
        this.dialog = true;
        // Limpar Fomulário
        this.item_p_avaliacao = "";
        this.valor_p_avaliacao = "";
        this.tipo = "";
        this.abrir_modal = true;
        this.msg = "Item inserido com sucesso!";
        setTimeout(() => (this.abrir_modal = false), 4000);
        this.retrieveItensVeiculo();
      } else {
        this.modal = true;
        this.dialog = true;
        this.item_p_avaliacao = "";
        this.valor_p_avaliacao = "";
        this.tipo = "";
        this.msg = "Erro ao inserir o item";
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
    async onSubmitVeiculoAvaliacao() {
      // const response = await fetch("https://deskbend.azurewebsites.net/avaliacao_veiculo", {
      const id_userCad = this.$store.state.auth.user.id;
      const response = await fetch(`${process.env.VUE_APP_API_URL}veiculo_usado`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marca: this.marca_avaliacao,
          modelo: this.modelo_avaliacao,
          familia: this.familia_avaliacao,
          placa: this.placa_avaliacao,
          precoAvaliacao: this.valor_avaliacao,
          kilometragem: this.kilometragem,
          anoFabricacao: this.anoFabricacao_avaliacao,
          anoModelo: this.anoModelo_avaliacao,
          avaliador_id: id_userCad,
          veiculoUsado_id: this.veiculoUsado_id,
          proposta_id: this.id_proposta,
        }),
      });
      const resp = JSON.stringify(response.status);
      if (resp == 200) {
        this.modal = true;
        this.dialog = true;
        this.message = "Avaliação criada com sucesso!";
        this.inserir_veiculo = false; //Habilita inserir veiculo para compra
        this.inserir_item_avaliacao = false; //Habilita inseir itens para avaliação
        setTimeout(() => (this.dialog = false), 4000);
      } else {
        this.modal = true;
        this.dialog = true;
        this.message = "Erro ao inserir a avaliação";
        setTimeout(() => (this.dialog = false), 4000);
      }
    },
    async verificar_avaliacao() {
      await fetch(`${process.env.VUE_APP_API_URL}veiculo_usado_avaliacao`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placa: this.placa_avaliacao,
        }),
      })
        .then((data) => {
          if (!data.ok) {
            throw Error(data.status);
          }

          return data.json();
        })
        .then((resposta) => {
          console.log(resposta.status)
          console.log("Avaliações ------------------------------------------------------------------------------------------------------------------------------------- 0014");
          this.ativar_placa = false;
          this.desativar_placa = true;
          if (resposta.status != 1) {
            (this.marca_avaliacao = resposta.marca_veiculo),
              this.marca_avaliacao_desc = resposta.marca_veiculo_desc,
              (this.modelo_avaliacao = resposta.modelo_veiculo),
              (this.familia_avaliacao = resposta.familia_veiculo),
              this.familia_avaliacao_desc = resposta.familia_veiculo_desc,
              (this.kilometragem = resposta.kilometragem),
              (this.anoModelo_avaliacao = resposta.anoModelo),
              (this.anoFabricacao_avaliacao = resposta.anoFabricacao),
              (this.valor_avaliacao = this.currency(
                resposta.avaliacoes[0]["precoAvaliacao"]
              )),
              (this.avaliacoes = resposta),
              (this.info_avaliacao =
                "Existem avaliações para esse veículo, clique no botão info para visualizar!"),
              (this.inserir_item_avaliacao = false),
              this.hab_avaliacao = false,

              console.log(
                "Existe avaliação ------------------------------------------------ 0015"
              ),
              console.log(this.avaliacoes);

            //(this.dialog_avaliacao = true);
          } else {
            console.log(
              "Não Existe avaliação ------------------------------------------------ 0016"
            );
            (this.info_avaliacao = "Não existe avaliação para esse veículo!"),
              console.log(this.avaliacoes);
            this.hab_avaliacao = true;
          }
        });
    },
    //** Fim veículo para troca */



    rowSelect(idx, id, id_parcela) {
      if (id_parcela == 1) {
        this.linhaSelecionada = id;
      }

      this.select_parcela(id, id_parcela);
    },
    rowSelect2(idx, id, id_parcela) {
      if (id_parcela == 2) {
        this.linhaSelecionada2 = id;
      }

      this.select_parcela(id, id_parcela);
    },
    rowSelect3(idx, id, id_parcela) {
      if (id_parcela == 3) {
        this.linhaSelecionada3 = id;
      }
      this.select_parcela(id, id_parcela);
    },
    async excluir_item_av(item) {
      const id = item.id;
      await fetch(`${process.env.VUE_APP_API_URL}itens_avaliacao/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          proposta_id: this.id_proposta,
        }),
      });
      this.retrieveItensVeiculo();
      // const resp = JSON.stringify(response.status);
      // if (resp == 200) {

      // }
    },
    async excluir_item_ac(item) {
      const id = item.id;
      await fetch(`${process.env.VUE_APP_API_URL}itens_acessorios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          proposta_id: this.id_proposta,
        }),
      });
      this.retrieveItensAcessorios();
      // const resp = JSON.stringify(response.status);
      // if (resp == 200) {

      // }
    },
    fechar_rank() {
      this.modal_ranqueamento = false;
      this.resumo();

    },
    hab_ranquear() {
      if (this.parcela_2 > 0) {
        this.btn_2 = false;
      }
      if (this.parcela_3 > 0) {
        this.btn_3 = false;
      }
    },
    //////////////////////Proposta//////////////////////////////////////////////////////////////////////
    async propostas_dia() {
      fetch(`${process.env.VUE_APP_API_URL}propostas_dia`)
        .then((res) => res.json())
        .then((res) => {
          console.log("------------------------------------------------------------------------------------------------------------------ 0019")
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
          console.log("------------------------------------------------------------------------------------------------------------------0020")
          console.log(res);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        });
    },

    getRequestParamsProposta(searchProposta, page, pageSize, empresa_id, status_proposta, data_ini, data_fim) {
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
    async retrievePropostas() {
      try {

        const params = this.getRequestParamsProposta(
          this.searchProposta,
          this.page_4,
          this.pageSize_4,
          this.empresaID,
          this.status_proposta,
          this.data_ini,
          this.data_fim
        );


        userService.getPropostaCliente(params).then((response) => {
          this.status_proposta = "";
          const { propostas, totalPages, totalItems } = response.data;

          this.totalPages_4 = totalPages;
          this.totalItems_4 = totalItems;

          console.log("------------------------------------------------------------------------------------------------------------------ 0021")
          console.log(response.data);

          var array_proposta_1 = [];
          var array_proposta_2 = [];
          let tempo_espera;
          let tempo_atendimento;
          let segundos_chegada;
          let minutos_chegada;
          let horas_chegada;
          let segundos_atendimento;
          let minutos_atendimento;
          let horas_atendimento;
          //let tempo;
          let diferenca_chegada;
          let diferenca_atendimento;
          let gerente;
          let status;

          const now = new Date();
          var hora_server = new Date(
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

          //var diferenca = "";
          console.log(
            "Esse é o resultado da consulta dos atendimentos realizado na tabela proposta! ------------------------------------------------------------------------- 0022"
          );
          console.log(propostas);
          for (var i = 0; i < propostas.length; i++) {
            //var data = new Date(propostas[i]["createdAt"]);
            var horario_chegada = new Date(propostas[i]["horario_chegada"]);
            var horario_ini_atendimento = new Date(
              propostas[i]["horario_inicio_atendimento"]
            );

            var hora_inicio = new Date(
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
            var hora_chegada = new Date(
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
            status = "";

            if (propostas[i]["status_proposta"] == "Atendimento") {
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

              (tempo_espera = "00:00"),
                (tempo_atendimento =
                  horas_atendimento + ":" + minutos_atendimento);

              if (diferenca_atendimento > 2700000) {
                console.log("Maior -------------- ------------------------------------------------------------------------------------------------------------------ 0023");
                this.css1 = "cor_atendimento_apos_45min";
                status = "Atendimento Excedido";
              }
              if (diferenca_atendimento < 2700000) {
                console.log("Menor -------------------- ------------------------------------------------------------------------------------------------------------------ 0024");
                this.css = "cor_atendimento";
                status = "Atendimento";
              }
            }

            if (propostas[i]["status_proposta"] == "Aguardando Atendimento") {
              diferenca_chegada = Math.abs(
                hora_server.getTime() - hora_chegada.getTime()
              );
              segundos_chegada = parseInt((diferenca_chegada / 1000) % 100);
              minutos_chegada = parseInt(
                (diferenca_chegada / (1000 * 60)) % 60
              );
              horas_chegada = parseInt(diferenca_chegada / (1000 * 60 * 60));
              horas_chegada =
                horas_chegada < 10 ? "0" + horas_chegada : horas_chegada;
              minutos_chegada =
                minutos_chegada < 10 ? "0" + minutos_chegada : minutos_chegada;
              segundos_chegada =
                segundos_chegada < 10
                  ? "0" + segundos_chegada
                  : segundos_chegada;

              (tempo_espera = horas_chegada + ":" + minutos_chegada),
                (tempo_atendimento = "00:00");

              this.css2 = "cor_aguardando_atendimento";
              status = "Aguardando Atendimento";
            }
            if (propostas[i]["status_proposta"] == "Venda Finalizada") {
              this.css3 = "cor_venda_finalizada";
              status = "Venda Finalizada";
            }
            if (propostas[i]["status_proposta"] == "Venda Perdida") {
              this.css4 = "cor_venda_perdida";
              status = "Venda Perdida";
            }
            if (propostas[i]["gerentes"] == null) {
              gerente = this.$store.state.auth.user.id;
            }

            //Armazena o id do vendedor para atualizar quando finalizar a venda
            (this.g_menu_vendedor_id = propostas[i]["vendedor_id"]),

              (array_proposta_1 = {
                acessorios: propostas[i]["acessorios"],
                adicional: propostas[i]["adicional"],
                avaliacao: propostas[i]["avaliacao"],
                avaliacaoVeiculo_id: propostas[i]["avaliacaoVeiculo_id"],
                avaliacoes_veiculo: propostas[i]["avaliacoes_veiculo"],
                cliente_id: propostas[i]["cliente_id"],
                cliente: propostas[i]["clientes"]["nome"],
                cortesia: propostas[i]["cortesia"],
                custos_variaveis: propostas[i]["avaliacao"],
                desconto: propostas[i]["avaliacao"],
                empresa_id: propostas[i]["empresa_id"],
                gerente_id: propostas[i]["gerente_id"],
                gerente: gerente,
                id: propostas[i]["id"],
                info_adicional: propostas[i]["obs"],
                id_vendedor_fila: propostas[i]["id_vendedor_fila"],
                impostos: propostas[i]["impostos"],
                justificativa: propostas[i]["justificativa"],
                midia_id: propostas[i]["midia_id"],
                modelo_id: propostas[i]["modelo_id"],
                modelo_veiculos: propostas[i]["modelo_veiculos"],
                obs: propostas[i]["obs"],
                propostaVeiculo_id: propostas[i]["propostaVeiculo_id"],
                proposta_veiculo: propostas[i]["proposta_veiculo"],
                retorno: propostas[i]["retorno"],
                //status: propostas[i]["status_proposta"],
                status: status,
                tipo_pagamento: propostas[i]["tipo_pagamento"],
                user_id: propostas[i]["user_id"],
                usuarios: propostas[i]["usuarios"],
                veiculoUsado_id: propostas[i]["veiculoUsado_id"],
                veiculos_usados: propostas[i]["veiculos_usados"],
                vendedor_id: propostas[i]["vendedor_id"],
                vendedor: propostas[i]["vendedores"]["username"],
                monetario_lucro: this.currency(
                  propostas[i]["lucro_operacional"]
                ),
                percentual_lucro: parseFloat(
                  (propostas[i]["lucro_operacional"] /
                    propostas[i]["val_sugerido_venda"]) *
                  100
                ).toFixed(2),
                monetario_margem: this.currency(propostas[i]["lucro_final"]),
                percentual_margem: parseFloat(
                  (propostas[i]["lucro_final"] /
                    propostas[i]["val_sugerido_venda"]) *
                  100
                ).toFixed(2),
                modelo: propostas[i].proposta_veiculo ? propostas[i].proposta_veiculo.modelo_veiculo : 'N/A',
                tempo_espera: tempo_espera,
                tempo_atendimento: tempo_atendimento,
                gerados: "",
                motivo_perda: "",
                horas_chegada: horas_chegada,
                minutos_chegada: minutos_chegada,
                segundos_chegada: segundos_chegada,
                horas_atendimento: horas_atendimento,
                minutos_atendimento: minutos_atendimento,
                segundos_atendimento: segundos_atendimento,

                cpfCnpj: propostas[i]["clientes"]["cpfCnpj"],
                nome: propostas[i]["clientes"]["nome"],
                email: propostas[i]["clientes"]["email"],
                tel: propostas[i]["clientes"]["tel"],
              });
            array_proposta_2.push(array_proposta_1);
          }
          console.log(array_proposta_2);
          this.propostas_at = array_proposta_2;
          this.validando_tempo();
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
          setTimeout(() => (this.dialog = false), 4000);
        }
      }
    },
    ////////////////////Fim metodos da tabela proposta //////////////////////////////////////////////////
    async alterar_status_proposta() {
      const id = this.id_proposta;
      await fetch(`${process.env.VUE_APP_API_URL}iniciar_atendimento/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status_proposta: "Atendimento",
        }),
      })
        .then((data) => {
          if (!data.ok) {
            throw Error(data.status);
          }
          return data.json();
        })
        .then((resposta) => {
          console.log(resposta);
        });
    },


    fechar_modal_proposta() {
      this.dialog_incluir_acessorios = false;
      //location.reload();
    },
    fechar_proposta() {
      this.modal_proposta = false;
      location.reload();
    },




    habilitar_incluir_itens_financiamento() {
      if (this.incluir_acessorios == true) {
        this.dialog_incluir_acessorios = true;
        this.message_incluir_acessorios =
          "Ao clicar no botão SIM, o total de acessórios será incluso no Financiamento, será necessário RANQUEAR novamente, deseja continuar?";
      }
      if (this.incluir_acessorios == false) {
        this.dialog_incluir_acessorios = true;
        this.message_incluir_acessorios =
          "Ao clicar no botão SIM, o total de acessórios será retirado do Financiamento, será necessário RANQUEAR novamente, deseja continuar?";
      }
    },
    async adicionar_acessorios_financiamento() {
      const id = this.id_proposta;
      await fetch(`${process.env.VUE_APP_API_URL}update_proposta_menu/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((data) => {
          if (!data.ok) {
            throw Error(data.status);
          }
          return data.json();
        })
        .then((resposta) => {
          this.fechar_modal_proposta();
          console.log(resposta);
        });
    },
    remover_acessorios_financiamento() { },

    ////Fim Proposta

    ///Estoque/////
    handlePageChangeEstoque(value) {
      this.page = value;
      this.retrieveEstoque();
    },
    handlePageSizeChangeEstoque(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveEstoque();
    },
    getRequestParamsEstoque(
      searchTitle,
      searchChassi,
      searchPlaca,
      searchValIni,
      searchValFin,
      searchMarca,
      searchAnoMod,
      searchAnoFab,
      searchCor,
      tipoVeiculo,
      pageVeiculo,
      pageSizeVeiculo,
      company_id
    ) {
      let params = {};
      if (searchMarca) {
        params["marca"] = searchMarca;
      }
      if (searchAnoMod) {
        params["ano_modelo"] = searchAnoMod;
      }
      if (searchAnoFab) {
        params["ano_fabricacao"] = searchAnoFab;
      }
      if (searchCor) {
        params["cor"] = searchCor;
      }
      if (tipoVeiculo) {
        params["tipoVeiculo"] = tipoVeiculo;
      }
      if (searchTitle) {
        params["nome"] = searchTitle;
      }
      if (searchChassi) {
        params["chassi"] = searchChassi;
      }
      if (searchPlaca) {
        params["placa"] = searchPlaca;
      }
      if (searchValIni) {
        params["valor_inicial"] = searchValIni;
      }
      if (searchValFin) {
        params["valor_final"] = searchValFin;
      }

      if (pageVeiculo) {
        params["page"] = pageVeiculo - 1;
      }
      if (pageSizeVeiculo) {
        params["size"] = pageSizeVeiculo;
      }
      if (company_id) {
        params["empresa_id"] = company_id;
      }
      return params;
    },
    async retrieveEstoque() {
      try {
        const params = this.getRequestParamsEstoque(
          this.searchTitle,
          this.searchChassi,
          this.searchPlaca,
          this.searchValFin,
          this.searchValIni,
          this.searchMarca,
          this.searchAnoMod,
          this.searchAnoFab,
          this.searchCor,
          this.tipoVeiculo,
          this.pageVeiculo,
          this.pageSizeVeiculo,
          this.company_id
        );

        userService.getEstoqueVeiculo(params).then((response) => {
          const { veiculoEstoque, totalPages } = response.data;
          this.estoque_veiculo = veiculoEstoque;
          this.totalPages = totalPages;
          console.log(response.data)

        });
        userService.getMarcaEstoque().then((response) => {
          this.marcas_estoque = response.data;


        });
        userService.getModeloEstoque().then((response) => {
          this.modelos_estoque = response.data;


        });
        userService.getCorEstoque().then((response) => {
          this.cores_estoque = response.data;


        });

      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },

    habilitar_veiculo() {
      console.log(
        "Aqui habilita o modal estoque e acessa a api para buscar os veiculos em estoque ----- 0036"
      );
      //Criar validação para não mostrar veiculos com atendimento em aberto!
      this.retrieveEstoque();

      this.modal_estoque = true;
    },

    //Paginação entrada 1 /////
    handleOrderChangeEntradaFiltro() {
      if (this.orderBy == this.sortDesc) {
        this.sortDesc = "DESC";
        this.orderBy = 1;
        this.sortDesc_2 = "DESC";
        this.orderBy_2 = 1;
        this.sortDesc_3 = "DESC";
        this.orderBy_3 = 1;

        if (this.btn_filtro_1 == 1) {
          this.icon_1 = "bi bi-sort-alpha-down-alt";
        }
        if (this.btn_filtro_2 == 1) {
          this.icon_2 = "bi bi-sort-alpha-down-alt";
        }
        if (this.btn_filtro_3 == 1) {
          this.icon_3 = "bi bi-sort-alpha-down-alt";
        }
        if (this.btn_filtro_4 == 1) {
          this.icon_4 = "bi bi-sort-alpha-down-alt";
        }
        if (this.btn_filtro_5 == 1) {
          this.icon_5 = "bi bi-sort-alpha-down-alt";
        }
        if (this.btn_filtro_6 == 1) {
          this.icon_6 = "bi bi-sort-alpha-down-alt";
        }
        if (this.btn_filtro_7 == 1) {
          this.icon_7 = "bi bi-sort-alpha-down-alt";
        }
        if (this.btn_filtro_8 == 1) {
          this.icon_8 = "bi bi-sort-alpha-down-alt";
        }
        if (this.btn_filtro_9 == 1) {
          this.icon_9 = "bi bi-sort-alpha-down-alt";
        }
        if (this.btn_filtro_10 == 1) {
          this.icon_10 = "bi bi-sort-alpha-down-alt";
        }
        if (this.btn_filtro_11 == 1) {
          this.icon_11 = "bi bi-sort-alpha-down-alt";
        }

        this.retrieveRanqueamentoEntrada1();
        this.retrieveRanqueamentoEntrada2();
        this.retrieveRanqueamentoEntrada3();
      } else {
        this.sortDesc = "ASC";
        this.orderBy = 0;
        this.sortDesc_2 = "ASC";
        this.orderBy_2 = 0;
        this.sortDesc_3 = "ASC";
        this.orderBy_3 = 0;

        if (this.btn_filtro_1 == 1) {
          this.icon_1 = "bi bi-sort-alpha-up";
        }
        if (this.btn_filtro_2 == 1) {
          this.icon_2 = "bi bi-sort-alpha-up";
        }

        if (this.btn_filtro_3 == 1) {
          this.icon_3 = "bi bi-sort-alpha-up";
        }

        if (this.btn_filtro_4 == 1) {
          this.icon_4 = "bi bi-sort-alpha-up";
        }

        if (this.btn_filtro_5 == 1) {
          this.icon_5 = "bi bi-sort-alpha-up";
        }

        if (this.btn_filtro_6 == 1) {
          this.icon_6 = "bi bi-sort-alpha-up";
        }

        if (this.btn_filtro_7 == 1) {
          this.icon_7 = "bi bi-sort-alpha-up";
        }

        if (this.btn_filtro_8 == 1) {
          this.icon_8 = "bi bi-sort-alpha-up";
        }

        if (this.btn_filtro_9 == 1) {
          this.icon_9 = "bi bi-sort-alpha-up";
        }

        if (this.btn_filtro_10 == 1) {
          this.icon_10 = "bi bi-sort-alpha-up";
        }

        if (this.btn_filtro_11 == 1) {
          this.icon_11 = "bi bi-sort-alpha-up";
        }

        this.retrieveRanqueamentoEntrada1();
        this.retrieveRanqueamentoEntrada2();
        this.retrieveRanqueamentoEntrada3();
      }
    },

    handleOrderChangeEntrada1() {

      if (this.orderBy == this.sortDesc) {
        this.sortDesc = "DESC";
        this.orderBy = 1;
        this.icon = "mdi-arrow-down";
        this.retrieveRanqueamentoEntrada1();
      } else {
        this.sortDesc = "ASC";
        this.orderBy = 0;
        this.icon = "bi bi-sort-alpha-up";
        this.retrieveRanqueamentoEntrada1();
      }
    },
    handlePageChangeEntrada1(value) {
      this.page_1 = value;
      this.retrieveRanqueamentoEntrada1();
    },
    handlePageSizeChangeEntrada1(size) {
      this.pageSize_1 = size;
      this.page_1 = 1;
      this.retrieveRanqueamentoEntrada1();
    },
    getRequestParamsEntrada1(
      filtro_tipo_veiculo,
      filtro_tipo_tabela,
      filtro_spf,
      razao_financiamento,
      plano,
      page_1,
      pageSize_1,
      id_proposta,
      id_coluna,
      sortBy,
      sortDesc,
      parcela
    ) {
      let params = {};
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
      if (page_1) {
        params["page_1"] = page_1 - 1;
      }
      if (pageSize_1) {
        params["size_1"] = pageSize_1;
      }
      if (id_proposta) {
        params["id_proposta"] = id_proposta;
      }
      if (id_coluna) {
        params["id_coluna"] = id_coluna;
      }
      if (sortBy) {
        params["sortBy"] = sortBy;
      }
      if (sortDesc) {
        params["sortDesc"] = sortDesc;
      }
      if (parcela) {
        params["parcela"] = parcela;
      }
      return params;
    },
    async retrieveRanqueamentoEntrada1() {
      const params = this.getRequestParamsEntrada1(
        this.filtro_tipo_veiculo,
        this.filtro_tipo_tabela,
        this.filtro_spf,
        this.razao_financiamento,
        this.plano,
        this.page_1,
        this.pageSize_1,
        this.id_proposta,
        this.id_coluna,
        this.sortBy,
        this.sortDesc,
        this.parcela
      );

      userService.getFiltroTaxas_1(params).then((response) => {
        const { parcelas, totalPages, totalItems } = response.data;
        this.parcelamento_1 = parcelas;
        this.totalPages_1 = totalPages;
        this.totalItems_1 = totalItems
        console.log(
          "Iniciando consulta as taxas ranqueadas filtro 1 ----------------------0037"
        );
        console.log(response.data);
      });
    },
    /**Após retorno positivo do ranqueamento essa função monta as taxas do primeiro bloco de entrada */
    async ranqueamento_entrada_1() {
      const params = this.getRequestParamsEntrada1(
        this.filtro_tipo_veiculo,
        this.filtro_tipo_tabela,
        this.filtro_spf,
        this.razao_financiamento,
        this.plano,
        this.page_1,
        this.pageSize_1,
        this.id_proposta,
        this.id_coluna,
        this.sortBy,
        this.sortDesc,
        this.parcela
      );

      /**faço uma consulta na tabela TempTaxas chamando a função ranqueamento_entrada_1 */
      userService.getRanqueamento_1(params).then((response) => {

        const { parcelas, totalPages, totalItems } = response.data;
        console.log(response.data)
        this.parcelamento_1 = parcelas;
        this.totalPages_1 = totalPages;
        this.totalItems_1 = totalItems;

        var ent_1 = parcelas[0]["total_entrada_1"];
        var fin_1 = parcelas[0]["total_financiado_1"];
        var ent_2 = parcelas[0]["total_entrada_2"];
        var fin_2 = parcelas[0]["total_financiado_2"];
        var ent_3 = parcelas[0]["total_entrada_3"];
        var fin_3 = parcelas[0]["total_financiado_3"];

        this.Valor_Entrada = this.currency(ent_1);
        this.Valor_Financiado = this.currency(fin_1);
        this.Valor_Entrada_2 = this.currency(ent_2);
        this.Valor_Financiado_2 = this.currency(fin_2);
        this.Valor_Entrada_3 = this.currency(ent_3);
        this.Valor_Financiado_3 = this.currency(fin_3);
      });
    },
    ranqueamento_1() {
      this.parcela = this.parcela_1;
      this.id_coluna = 1;
      console.log(
        "Botão ranquear 1, armazeno o valor da coluna e quantidade de parcelas escolhida! ------- 0038"
      );
      console.log(
        "Quantidade de parcelas ---- " + this.parcela + " ------------- 0039"
      );
      //this.resumo();
      this.retrieveRanqueamento();
      this.modal_ranqueamento = true;
    },

    //////////////////////////

    //Paginação entrada 2 /////
    handleOrderChangeEntrada2() {
      if (this.orderBy_2 == this.sortDesc_2) {
        this.sortDesc_2 = "DESC";
        this.orderBy_2 = 1;
        this.retrieveRanqueamentoEntrada2();
      } else {
        this.sortDesc_2 = "ASC";
        this.orderBy_2 = 0;
        this.retrieveRanqueamentoEntrada2();
      }
    },
    handlePageChangeEntrada2(value) {
      this.page_2 = value;
      this.retrieveRanqueamentoEntrada2();
    },
    handlePageSizeChangeEntrada2(size) {
      this.pageSize_2 = size;
      this.page_2 = 1;
      this.retrieveRanqueamentoEntrada2();
    },
    getRequestParamsEntrada2(
      filtro_tipo_veiculo,
      filtro_tipo_tabela,
      filtro_spf,
      razao_financiamento,
      plano,
      page_2,
      pageSize_2,
      id_proposta,
      id_coluna,
      sortBy_2,
      sortDesc_2,
      parcela
    ) {
      let params = {};
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
      if (page_2) {
        params["page_2"] = page_2 - 1;
      }
      if (pageSize_2) {
        params["size_2"] = pageSize_2;
      }
      if (id_proposta) {
        params["id_proposta"] = id_proposta;
      }
      if (id_coluna) {
        params["id_coluna"] = id_coluna;
      }
      if (sortBy_2) {
        params["sortBy_2"] = sortBy_2;
      }
      if (sortDesc_2) {
        params["sortDesc_2"] = sortDesc_2;
      }
      if (parcela) {
        params["parcela"] = parcela;
      }
      return params;
    },
    async retrieveRanqueamentoEntrada2() {
      const params = this.getRequestParamsEntrada2(
        this.filtro_tipo_veiculo,
        this.filtro_tipo_tabela,
        this.filtro_spf,
        this.razao_financiamento,
        this.plano,
        this.page_2,
        this.pageSize_2,
        this.id_proposta,
        this.id_coluna,
        this.sortBy_2,
        this.sortDesc_2,
        this.parcela
      );
      userService.getFiltroTaxas_2(params).then((response) => {
        const { parcelas, totalPages } = response.data;
        this.parcelamento_2 = parcelas;
        this.totalPages_2 = totalPages;
      });
    },
    async ranqueamento_entrada_2() {
      const params = this.getRequestParamsEntrada2(
        this.filtro_tipo_veiculo,
        this.filtro_tipo_tabela,
        this.filtro_spf,
        this.razao_financiamento,
        this.plano,
        this.page_2,
        this.pageSize_2,
        this.id_proposta,
        this.id_coluna,
        this.sortBy_2,
        this.sortDesc_2,
        this.parcela
      );
      userService.getRanqueamento_2(params).then((response) => {
        const { parcelas, totalPages, totalItems } = response.data;
        this.parcelamento_2 = parcelas;
        this.totalPages_2 = totalPages;
        this.totalItems_2 = totalItems;
      });
    },
    ranqueamento_2() {
      this.parcela = this.parcela_2;
      this.id_coluna = 2;
      console.log(
        "Botão ranquear 2, armazeno o valor da coluna e quantidade de parcelas escolhida! ------- 0039"
      );
      console.log(
        "Quantidade de parcelas ---- " + this.parcela + " ------------- 0040"
      );
      //this.resumo();
      this.retrieveRanqueamento();
      this.modal_ranqueamento = true;
    },
    //////////////////////////

    //Paginação entrada 3 /////
    handleOrderChangeEntrada3() {
      if (this.orderBy_3 == this.sortDesc_3) {
        this.sortDesc_3 = "DESC";
        this.orderBy_3 = 1;
        this.retrieveRanqueamentoEntrada3();
      } else {
        this.sortDesc_3 = "ASC";
        this.orderBy_3 = 0;
        this.retrieveRanqueamentoEntrada3();
      }
    },
    handlePageChangeEntrada3(value) {
      this.page_3 = value;
      this.retrieveRanqueamentoEntrada3();
    },
    handlePageSizeChangeEntrada3(size) {
      this.pageSize_3 = size;
      this.page_3 = 1;
      this.retrieveRanqueamentoEntrada3();
    },
    getRequestParamsEntrada3(
      filtro_tipo_veiculo,
      filtro_tipo_tabela,
      filtro_spf,
      razao_financiamento,
      plano,
      page_3,
      pageSize_3,
      id_proposta,
      id_coluna,
      sortBy_3,
      sortDesc_3,
      parcela
    ) {
      let params = {};
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
      if (page_3) {
        params["page_3"] = page_3 - 1;
      }
      if (pageSize_3) {
        params["size_3"] = pageSize_3;
      }
      if (id_proposta) {
        params["id_proposta"] = id_proposta;
      }
      if (id_coluna) {
        params["id_coluna"] = id_coluna;
      }
      if (sortBy_3) {
        params["sortBy_3"] = sortBy_3;
      }
      if (sortDesc_3) {
        params["sortDesc_3"] = sortDesc_3;
      }
      if (parcela) {
        params["parcela"] = parcela;
      }
      return params;
    },
    async retrieveRanqueamentoEntrada3() {
      const params = this.getRequestParamsEntrada3(
        this.filtro_tipo_veiculo,
        this.filtro_tipo_tabela,
        this.filtro_spf,
        this.razao_financiamento,
        this.plano,
        this.page_3,
        this.pageSize_3,
        this.id_proposta,
        this.id_coluna,
        this.sortBy_3,
        this.sortDesc_3,
        this.parcela
      );

      userService.getFiltroTaxas_3(params).then((response) => {
        const { parcelas, totalPages, totalItems } = response.data;
        this.parcelamento_3 = parcelas;
        this.totalPages_3 = totalPages;
        this.totalItems_3 = totalItems
        this.Total_Financiado_3 = this.parcelamento_3["total_financiado"];
      });
    },
    async ranqueamento_entrada_3() {
      const params = this.getRequestParamsEntrada3(
        this.filtro_tipo_veiculo,
        this.filtro_tipo_tabela,
        this.filtro_spf,
        this.razao_financiamento,
        this.plano,
        this.page_3,
        this.pageSize_3,
        this.id_proposta,
        this.id_coluna,
        this.sortBy_3,
        this.sortDesc_3,
        this.parcela
      );

      userService.getRanqueamento_3(params).then((response) => {
        const { parcelas, totalPages, totalItems } = response.data;
        this.parcelamento_3 = parcelas;
        this.totalPages_3 = totalPages;
        this.totalItems_3 = totalItems;
        this.Total_Financiado_3 = this.parcelamento_3["total_financiado"];


      });
    },
    ranqueamento_3() {
      this.parcela = this.parcela_3;
      this.id_coluna = 3;
      console.log(
        "Botão ranquear 1, armazeno o valor da coluna e quantidade de parcelas escolhida! ------- 0041"
      );
      console.log(
        "Quantidade de parcelas ---- " + this.parcela + " ------------- 0042"
      );

      this.retrieveRanqueamento();
      this.modal_ranqueamento = true;
    },
    //////////////////////////

    ///Taxas//////////////////
    getRequestParamsTaxas(
      parcela,
      entrada_1,
      entrada_2,
      entrada_3,
      page,
      pageSize,
      id_proposta,
      id_coluna,
      incluir_acessorios,
      empresa_id
    ) {
      let params = {};
      if (parcela) {
        params["parcela"] = parcela;
      }
      if (entrada_1) {
        params["entrada_1"] = entrada_1;
      }
      if (entrada_2) {
        params["entrada_2"] = entrada_2;
      }
      if (entrada_3) {
        params["entrada_3"] = entrada_3;
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
      if (incluir_acessorios) {
        params["incluir_acessorios"] = incluir_acessorios;
      }
      if (empresa_id) {
        params["empresa_id"] = empresa_id;
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
        this.parcela,
        this.entrada_1,
        this.entrada_2,
        this.entrada_3,
        this.page,
        this.pageSize,
        this.id_proposta,
        this.id_coluna,
        this.incluir_acessorios,
        this.company_id
      );
      /**Chama o método ranqueamento que cria as taxas na tabela tempTaxas e retorna um ok  */
      userService.getTaxas(params).then((response) => {
        const cod = response;


        if (cod.status == 200) {
          /**Caso a resposta seja ok chamo os métodos abaixo */
          this.ranqueamento_entrada_1();
          this.ranqueamento_entrada_2();
          this.ranqueamento_entrada_3();
        }
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
    async select_parcela(id, id_linha) {
      //Variaveis
      var entrada = 0;
      var parcela = 0;
      var id_coluna = 0;
      var id_proposta = 0;
      const id_taxa = id;

      if (id_linha == 1) {
        if (this.id_coluna == 1) {
          //Variaveis
          entrada = this.entrada_1;
          parcela = this.parcela_1;
          id_coluna = this.id_coluna;
          id_proposta = this.id_proposta;


          //document.getElementById(id).style.backgroundColor = 'blue';
          //document.getElementsByTagName("tr").style.backgroundColor = 'blue';
        }
        if (this.id_coluna == 2) {
          //Variaveis
          entrada = this.entrada_1;
          parcela = this.parcela_2;
          id_coluna = this.id_coluna;
          id_proposta = this.id_proposta;

        }
        if (this.id_coluna == 3) {
          //Variaveis
          entrada = this.entrada_1;
          parcela = this.parcela_3;
          id_coluna = this.id_coluna;
          id_proposta = this.id_proposta;

        }
      }
      if (id_linha == 2) {
        if (this.id_coluna == 1) {
          //Variaveis
          entrada = this.entrada_2;
          parcela = this.parcela_1;
          id_coluna = this.id_coluna;
          id_proposta = this.id_proposta;

        }
        if (this.id_coluna == 2) {
          //Variaveis
          entrada = this.entrada_2;
          parcela = this.parcela_2;
          id_coluna = this.id_coluna;
          id_proposta = this.id_proposta;

        }
        if (this.id_coluna == 3) {
          //Variaveis
          entrada = this.entrada_2;
          parcela = this.parcela_3;
          id_coluna = this.id_coluna;
          id_proposta = this.id_proposta;

        }
      }
      if (id_linha == 3) {
        if (this.id_coluna == 1) {
          //Variaveis
          entrada = this.entrada_3;
          parcela = this.parcela_1;
          id_coluna = this.id_coluna;
          id_proposta = this.id_proposta;

        }
        if (this.id_coluna == 2) {
          //Variaveis
          entrada = this.entrada_3;
          parcela = this.parcela_2;
          id_coluna = this.id_coluna;
          id_proposta = this.id_proposta;

        }
        if (this.id_coluna == 3) {
          //Variaveis
          entrada = this.entrada_3;
          parcela = this.parcela_3;
          id_coluna = this.id_coluna;
          id_proposta = this.id_proposta;

        }
      }
      await fetch(`${process.env.VUE_APP_API_URL}taxas/menu`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: id_taxa,
          proposta_id: id_proposta,
          entrada: entrada,
          parcela: parcela,
          id_linha: id_linha,
          id_coluna: id_coluna,
          incluir_acessorios: this.incluir_acessorios,
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
        });
    },

    //// Ranqueamento
    handlePageChangeFiltro(value) {
      this.page = value;
      this.retrieveFiltroRanqueamento();
    },
    handlePageSizeChangeFiltro(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveFiltroRanqueamento();
    },
    async limpar_financiamento() {
      console.log("Limpar Ranqueamento!")
      const id = this.id_proposta;
      try {
        await fetch(`${process.env.VUE_APP_API_URL}proposta_limpar_entradas/${id}`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id
          }),
        })
          .then((data) => {
            if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();
          })
          .then((resposta) => {
            console.log(resposta)
            if (resposta.StatusOk == 200) {
              window.location.reload();
            }

          });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
        window.location.reload();
      }
    },

    ///Acessorios
    getRequestParamsAcessorios(searchCodigo, searchDescricao, page, pageSize) {
      let params = {};
      if (searchCodigo) {
        params["codigo"] = searchCodigo;
      }
      if (searchDescricao) {
        params["descricao"] = searchDescricao;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    handlePageChangeItemAcessorio(value) {
      this.page = value;
      this.retrieveAcessorios();
    },
    handlePageSizeChangeItemAcessorio(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveAcessorios();
    },

    habilitar_itens_acessorios() {
      this.retrieveAcessorios();
      this.modal_itens_acessorios = true;
      this.btn_ranquear = false;
    },
    async retrieveAcessorios() {
      try {
        const params = this.getRequestParamsAcessorios(
          this.searchCodigo,
          this.searchDescricao,
          this.page,
          this.pageSize
        );

        userService.getAcessorios(params).then((response) => {
          const { acessorios, totalPages } = response.data;
          this.acessorios = acessorios;
          this.totalPages = totalPages;

        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async retrieveItensAcessorios() {
      try {
        const id_proposta = this.id_proposta;
        userService.getItensAcessoriosId(id_proposta).then((response) => {
          var itens_ac = [];
          var itens_ac2 = [];
          const { rows } = response.data;

          for (var i = 0; i < rows.length; i++) {
            var arr_ac = {
              id: rows[i]["id"],
              proposta_id: rows[i]["proposta_id"],
              cortesia: rows[i]["cortesia"],
              custo: this.currency(rows[i]["custo"]),
              valor: this.currency(rows[i]["valor"]),
              descricao: rows[i]["descricao"],
              createdAt: rows[i]["createdAt"],
              updatedAt: rows[i]["updatedAt"],
            };
            itens_ac = arr_ac;
            itens_ac2.push(itens_ac);
          }

          this.itens_acessorios = itens_ac2;

        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    inserirAcessorios(item) {

      (this.descricaoAcessorio = item.descricao),
        (this.valorAcessorio = item.preco_final_instalado),
        (this.custoAcessorio = item.preco_base_peca);
      this.itensAcessorios();
    },
    async itensAcessorios() {
      const response = await fetch(
        `${process.env.VUE_APP_API_URL}itens_acessorios`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descricao: this.descricaoAcessorio,
            valor: this.valorAcessorio,
            custo: this.custoAcessorio,
            cortesia: "NAO",
            proposta_id: this.id_proposta,
          }),
        }
      );
      const resp = JSON.stringify(response.status);
      if (resp == 200) {
        this.modal = true;
        this.dialog = true;
        // Limpar Fomulário
        this.modal_itens_acessorios = false;
        this.message = "Item inserido com sucesso!";
        setTimeout(() => (this.dialog = false), 4000);
        this.retrieveItensAcessorios();
      } else {
        this.modal = true;
        this.dialog = true;
        this.message = "Erro ao inserir o item";
        setTimeout(() => (this.dialog = false), 4000);
      }
      this.habilitar_proposta();
    },
    ///Resumo

    getRequestParamsPMT(id, ordem) {
      let params = {};
      if (id) {
        params["id_proposta"] = id;
      }
      if (ordem) {
        params["ordem"] = ordem;
      }

      return params;
    },
    select_pmt(value, ordem) {
      this.Pmt = value;
      this.pmtSelected = ordem;
      const id = this.id_proposta
      //Primeira Linha
      if (ordem == 11) {
        this.Valor_Entrada = this.Valor_Entrada_1;
        this.Valor_Financiado = this.Valor_Financiado_1;
        this.Quantidade_Meses = this.Quantidade_Meses_1; //12
        const params = this.getRequestParamsPMT(
          id,
          ordem
        )
        userService.getProposta_pmt(params).then((response) => {
          console.log(response.data)
        })
      }
      if (ordem == 12) {
        this.Valor_Entrada = this.Valor_Entrada_1;
        this.Valor_Financiado = this.Valor_Financiado_1;
        this.Quantidade_Meses = this.Quantidade_Meses_2; //24
        const params = this.getRequestParamsPMT(
          id,
          ordem
        )
        userService.getProposta_pmt(params).then((response) => {
          console.log(response.data)
        })
      }
      if (ordem == 13) {
        this.Valor_Entrada = this.Valor_Entrada_1;
        this.Valor_Financiado = this.Valor_Financiado_1;
        this.Quantidade_Meses = this.Quantidade_Meses_3; //36
        const params = this.getRequestParamsPMT(
          id,
          ordem
        )
        userService.getProposta_pmt(params).then((response) => {
          console.log(response.data)
        })
      }
      //Segunda Linda
      if (ordem == 21) {
        this.Valor_Entrada = this.Valor_Entrada_2;
        this.Valor_Financiado = this.Valor_Financiado_2;
        this.Quantidade_Meses = this.Quantidade_Meses_1;
        const params = this.getRequestParamsPMT(
          id,
          ordem
        )
        userService.getProposta_pmt(params).then((response) => {
          console.log(response.data)
        })
      }
      if (ordem == 22) {
        this.Valor_Entrada = this.Valor_Entrada_2;
        this.Valor_Financiado = this.Valor_Financiado_2;
        this.Quantidade_Meses = this.Quantidade_Meses_2;
        const params = this.getRequestParamsPMT(
          id,
          ordem
        )
        userService.getProposta_pmt(params).then((response) => {
          console.log(response.data)
        })
      }
      if (ordem == 23) {
        this.Valor_Entrada = this.Valor_Entrada_2;
        this.Valor_Financiado = this.Valor_Financiado_2;
        this.Quantidade_Meses = this.Quantidade_Meses_3;
        const params = this.getRequestParamsPMT(
          id,
          ordem
        )
        userService.getProposta_pmt(params).then((response) => {
          console.log(response.data)
        })
      }
      //Terceira Linha
      if (ordem == 31) {
        this.Valor_Entrada = this.Valor_Entrada_3;
        this.Valor_Financiado = this.Valor_Financiado_3;
        this.Quantidade_Meses = this.Quantidade_Meses_1;
        const params = this.getRequestParamsPMT(
          id,
          ordem
        )
        userService.getProposta_pmt(params).then((response) => {
          console.log(response.data)
        })
      }
      if (ordem == 32) {
        this.Valor_Entrada = this.Valor_Entrada_3;
        this.Valor_Financiado = this.Valor_Financiado_3;
        this.Quantidade_Meses = this.Quantidade_Meses_2;
        const params = this.getRequestParamsPMT(
          id,
          ordem
        )
        userService.getProposta_pmt(params).then((response) => {
          console.log(response.data)
        })
      }
      if (ordem == 33) {
        this.Valor_Entrada = this.Valor_Entrada_3;
        this.Valor_Financiado = this.Valor_Financiado_3;
        this.Quantidade_Meses = this.Quantidade_Meses_3;
        const params = this.getRequestParamsPMT(
          id,
          ordem
        )
        userService.getProposta_pmt(params).then((response) => {
          console.log(response.data)
        })
      }
      //window.location.reload();
      //this.resumo()
      this.habilitar_proposta()
    },

    preparar_dados_menu() {
      const id = this.id_proposta;
      const dados = {
        id: id,
        val_sugerido_venda: this.Valor_Sugerido,
        custos_variaveis: this.Valor_Custo_variaveis,
        acessorios: this.Valor_Itens_Acessorios,
        val_entrada_veiculo: this.Valor_Avaliacao_Final,
        val_entrada_financiamento: this.Valor_Entrada,
        val_financiamento: this.Valor_Financiado,
        lucro_operacional: this.Lucro_Bruto,
        lucro_gerencial: this.Lucro_Operacional,
        lucro_financiamento: this.Valor_Resultado_Financiamento,
        lucro_final: this.Lucro_liquido,
      };

      this.dados_menu = dados;
    },

    async gerar_menu_desk() {
      const id = this.id_proposta;
      this.dados_menu = this.id_proposta;
      await fetch(`${process.env.VUE_APP_API_URL}proposta/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          val_sugerido_venda: this.Valor_Sugerido,
          custos_variaveis: this.Valor_Custo_variaveis,
          acessorios: this.Valor_Itens_Acessorios,
          val_entrada_veiculo: this.Valor_Avaliacao_Final,
          val_entrada_financiamento: this.Valor_Entrada,
          val_financiamento: this.Valor_Financiado,
          lucro_operacional: this.Lucro_Bruto,
          lucro_gerencial: this.Lucro_Operacional,
          lucro_financiamento: this.Valor_Resultado_Financiamento,
          lucro_final: this.Lucro_liquido,
        }),
      })
        .then((data) => {
          if (!data.ok) {
            throw Error(data.status);
          }
          return data.json();
        })
        .then((resposta) => {
          console.log(resposta.data),
            //Informações do Cliente
            (this.g_menu_cliente = resposta.data.rows[0].clientes.nome),
            (this.g_menu_cpfCnpj = resposta.data.rows[0].clientes.cpfCnpj),
            (this.g_menu_fone = resposta.data.rows[0].clientes.tel),
            (this.g_menu_email = resposta.data.rows[0].clientes.email),
            //Informações da Proposta
            (this.g_menu_gerente = resposta.data.rows[0].gerentes.username),
            (this.g_menu_vendedor = resposta.data.rows[0].vendedores.username),
            (this.g_menu_negociacao = resposta.data.rows[0].id),
            (this.g_menu_data_negociacao = resposta.data.rows[0].createdAt),
            //Opções de Compra
            // (this.g_menu_val_sugerido = this.currency(parseFloat(resposta.data.rows[0].val_sugerido_venda) +
            //   parseFloat(resposta.data.rows[0].custos_variaveis)
            // )),
            (this.g_menu_val_sugerido = this.currency(parseFloat(resposta.data.rows[0].val_sugerido_venda)
            )),
            (this.g_menu_val_desconto = this.currency(
              resposta.data.rows[0].desconto
            )),
            // (this.g_menu_val_veiculo = this.currency(
            //   parseFloat(resposta.data.rows[0].val_sugerido_venda) +
            //   parseFloat(resposta.data.rows[0].custos_variaveis) +
            //   parseFloat(resposta.data.rows[0].acessorios)
            // )),

            (this.g_menu_val_veiculo = this.currency(
              parseFloat(resposta.data.rows[0].val_sugerido_venda)

            )),

            (this.g_menu_total_financiado = this.currency(
              parseFloat(
                resposta.data.rows[0].val_financiamento +
                resposta.data.rows[0].val_entrada_financiamento
              )
            )),
            //Dados veiculo compra
            (this.g_menu_marca = resposta.data.rows[0].proposta_veiculo.marca),
            (this.g_menu_modelo =
              resposta.data.rows[0].proposta_veiculo.modelo_veiculo),
            (this.g_menu_cor = resposta.data.rows[0].proposta_veiculo.cor),
            (this.g_menu_chassi =
              resposta.data.rows[0].proposta_veiculo.chassis),
            // (this.g_menu_km = this.numberToReal(
            //   resposta.data.rows[0].proposta_veiculo.kilometragem
            // )),
            (this.g_menu_ano_modelo =
              resposta.data.rows[0].proposta_veiculo.ano_modelo),
            (this.g_menu_ano_fab =
              resposta.data.rows[0].proposta_veiculo.ano_fabricacao);
          //Dados veiculo troca
          if (resposta.data.rows[0].avaliacaoVeiculo_id != null) {
            this.g_menu_marca_avaliacao =
              resposta.data.rows[0].veiculos_usados.modeloVeiculo.familiaVeiculo.marcaVeiculo.descricao;
            this.g_menu_placa_avaliacao =
              resposta.data.rows[0].veiculos_usados.placa;
            this.g_menu_modelo_avaliacao =
              resposta.data.rows[0].veiculos_usados.modeloVeiculo.descricao;
            this.g_menu_ano_modelo_avaliacao =
              resposta.data.rows[0].veiculos_usados.anoModelo;
            this.g_menu_valor_avaliado = this.Valor_Avaliado;
            this.g_menu_itens_avaliacao_db = this.Valor_Itens_Avaliacao_db;
            this.g_menu_itens_avaliacao_cr = this.Valor_Itens_Avaliacao_cr;
            this.g_menu_valor_avaliacao_final = this.Valor_Avaliacao_Final;
          }

          //Acessorios
          this.g_menu_total_acessorios = this.currency(
            resposta.data.rows[0].acessorios
          );

          if (this.incluir_acessorios == true) {
            this.msg = "Valor incluso no financiamento!";
          } else {
            this.msg = "Valor não incluso no financiamento!";
          }
        });
    },

    async finalizar_venda() {

      const verificar_veiculo = await axios.get(`${process.env.VUE_APP_API_URL}verificar_veiculo_finalizar`, {
        params: { id: this.id_proposta }
      });
      //console.log(verificar_veiculo.data.data[0].empresa_proposta.nome)
      if (verificar_veiculo.data.statusOk == 1) {
        this.abrir_modal = true;
        this.msg = `Proposta não pode ser finalizada, o veículo já se encontra vendido no atendimento ${verificar_veiculo.data.data[0].id} da loja ${verificar_veiculo.data.data[0].empresa_proposta.nome}`;
        setTimeout(() => (this.abrir_modal = false), 8000);
        return
      }
      console.log("Nenhum veículo encontrado")
      const id = this.id_proposta;
      const lucro_bruto = this.Lucro_Bruto;
      const lucro_gerencial = this.Lucro_Operacional;
      const lucro_liquido = this.Lucro_liquido;
      const val_entrada_financiamento = this.Valor_Entrada;
      const val_financiamento = this.Valor_Financiado;
      const tipo_pagamento = this.pagamento;
      const erros = {};

      // Verifique cada campo obrigatório
      if (!this.cliente) {
        erros.cliente = "Campo 'Cliente' é obrigatório.";
      }
      if (!this.cpfCnpj) {
        erros.cpfCnpj = "Campo 'CPF/CNPJ' é obrigatório.";
      }
      if (!this.endereco) {
        erros.endereco = "Campo 'Endereço' é obrigatório.";
      }
      if (!this.uf) {
        erros.uf = "Campo 'UF' é obrigatório.";
      }
      if (!this.cidade) {
        erros.cidade = "Campo 'Cidade' é obrigatório.";
      }
      if (!this.bairro) {
        erros.bairro = "Campo 'Bairro' é obrigatório.";
      }
      if (!this.cep) {
        erros.cep = "Campo 'CEP' é obrigatório.";
      }
      if (!this.tel) {
        erros.tel = "Campo 'Telefone' é obrigatório.";
      }

      // Verifique se há erros
      if (Object.keys(erros).length > 0) {
        this.abrir_modal = true;
        this.msg = "Antes de finzalizar a venda preencha os campos obrigatórios!";

        // Construa a mensagem de erro com detalhes
        for (const campo in erros) {
          this.msg += `\n${erros[campo]}`;
        }

        setTimeout(() => (this.abrir_modal = false), 4000);
        return;
      }



      await fetch(`${process.env.VUE_APP_API_URL}venda_finalizada/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status_proposta: "Venda Finalizada",
          lucro_operacional: lucro_bruto,
          lucro_gerencial: lucro_gerencial,
          lucro_final: lucro_liquido,
          val_entrada_financiamento: val_entrada_financiamento,
          val_financiamento: val_financiamento,
          tipo_pagamento: tipo_pagamento
        }),
      })
        .then((data) => {
          if (!data.ok) {
            throw Error(data.status);
          }
          this.update_dispo(this.g_menu_vendedor_id);
          return data.json();
        })
        .then((resposta) => {
          router.push({ path: '/desk/index', query: { empresa_id: encodeURIComponent(this.empresaID) } });
          console.log(resposta);
        });
    },

    async update_dispo(item) {
      const id = item;
      const response = await fetch(
        `${process.env.VUE_APP_API_URL}status_vendedor/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status_vendedor: 1,
          }),
        }
      );
      const resp = JSON.stringify(response.status);
      console.log(resp);
      if (resp == 200) {
        this.dialog = true;
        this.message = "Vendedor se tornou Indisponível!";

      }
    },

    async venda_perdida() {
      const id = this.id_proposta;
      if (!this.modelo_proposta) {
        this.abrir_modal = true;
        this.msg = "Para finalizar como venda perdida é necessário inserir um veículo!";
        setTimeout(() => (this.abrir_modal = false), 4000);
        return
      }
      if (this.info_adicionais.length < 30) {
        this.abrir_modal = true;
        this.msg = "Para finalizar como venda perdida é necessário preencher o campo informações Adicionais! Obrigatório o mínimo de 30 caracteres!";
        setTimeout(() => (this.abrir_modal = false), 4000);
        return
      }

      await fetch(`${process.env.VUE_APP_API_URL}venda_perdida/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status_proposta: "Venda Perdida",
          obs: this.info_adicionais
        }),
      })
        .then((data) => {
          if (!data.ok) {
            throw Error(data.status);
          }
          this.update_dispo(this.g_menu_vendedor_id);
          return data.json();
        })
        .then((resposta) => {
          router.push({ path: '/desk/index', query: { empresa_id: encodeURIComponent(this.empresaID) } });
          console.log(resposta);
        });
    },



    //Funções para fazer validações em inputs
    numberToReal(numb) {
      var numero = numb.toFixed(0).split(".");
      numero[0] = numb[0].split(/(?=(?:...)*$)/).join(".");
      return numero.join(".");
    },
    currency(number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(number);
    },
    ParseFloat(str, val) {
      str = str.toString();
      str = str.slice(0, str.indexOf(".") + val + 1);
      return Number(str);
    },
    vData() {
      var cpf_cnpj = this.cpfCnpj;

      if (this.formata_cpf_cnpj(cpf_cnpj) == false) {
        this.abrir_modal = true;
        this.msg = "CPF/CNPJ inválido"
        this.cpfCnpj = "";
        setTimeout(() => (this.abrir_modal = false), 4000);
      } else {
        this.cpfCnpj = this.formata_cpf_cnpj(cpf_cnpj);
      }


    },
    vTel() {
      var telefone = this.tel;
      this.tel = this.tel.replace(/\D/g, '');
      if (this.tel.length >= 10 && this.tel.length <= 11) {
        this.tel = this.formata_tel(telefone);
      } else {
        this.tel = "";
        this.abrir_modal = true;
        this.msg = "Número de telefone incorreto";
        setTimeout(() => (this.abrir_modal = false), 4000);
      }

      //this.tel = this.formata_tel(telefone);

      // const edit_tel = this.edit_telefone;
      // this.edit_telefone = this.formata_tel(edit_tel);
    },
    vTel2() {
      var telefone2 = this.cel;
      this.cel = this.cel.replace(/\D/g, '');
      if (this.cel.length >= 10 && this.cel.length <= 11) {
        this.cel = this.formata_tel(telefone2);
      } else {
        this.cel = "";
        this.abrir_modal = true;
        this.msg = "Número de telefone incorreto";
        setTimeout(() => (this.abrir_modal = false), 4000);
      }

      //this.tel = this.formata_tel(telefone);

      // const edit_tel = this.edit_telefone;
      // this.edit_telefone = this.formata_tel(edit_tel);
    },
    validateEmail(email) {
      console.log("Testando email")
      console.log(email)
      var re = /\S+@\S+\.\S+/;
      if (re.test(email) == false) {
        this.abrir_modal = true;
        this.email = ""
        this.msg = "Digite um email válido, ex: email@email.com!";
        setTimeout(() => (this.abrir_modal = false), 4000);
      }
    },
    verifica_tel(valor) {
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      if (valor.length === 10) {
        return "TELEFONE";
      }
      else if (valor.length === 11) {
        return "CELULAR";
      }
      else {
        return false;
      }
    },
    formata_tel(valor) {
      var formatado = false;
      var valida = this.verifica_tel(valor);
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      if (valida === "TELEFONE") {
        formatado = valor.substr(0, 2) + " ";
        formatado += valor.substr(2, 4) + "-";
        formatado += valor.substr(6, 4) + "";
      }
      else if (valida === "CELULAR") {
        formatado = valor.substr(0, 2) + " ";
        formatado += valor.substr(2, 5) + "-";
        formatado += valor.substr(7, 4) + "";
      } else {
        formatado = valor;
      }
      return formatado;
    },
    verifica_cpf_cnpj(valor) {
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      if (valor.length === 11) {
        return "CPF";
      }
      else if (valor.length === 14) {
        return "CNPJ";
      }
      else {
        return false;
      }
    },
    calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {
      digitos = digitos.toString();
      for (var i = 0; i < digitos.length; i++) {
        soma_digitos = soma_digitos + digitos[i] * posicoes;
        posicoes--;
        if (posicoes < 2) {
          posicoes = 9;
        }
      }
      soma_digitos = soma_digitos % 11;
      if (soma_digitos < 2) {
        soma_digitos = 0;
      } else {
        soma_digitos = 11 - soma_digitos;
      }
      var cpf = digitos + soma_digitos;
      return cpf;
    },
    valida_cpf(valor) {
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      var digitos = valor.substr(0, 9);
      var novo_cpf = this.calc_digitos_posicoes(digitos);
      novo_cpf = this.calc_digitos_posicoes(novo_cpf, 11);
      if (novo_cpf === valor) {
        return true;
      } else {
        return false;
      }
    },
    valida_cnpj(valor) {
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      var cnpj_original = valor;
      var primeiros_numeros_cnpj = valor.substr(0, 12);
      var primeiro_calculo = this.calc_digitos_posicoes(
        primeiros_numeros_cnpj,
        5
      );
      var segundo_calculo = this.calc_digitos_posicoes(primeiro_calculo, 6);
      var cnpj = segundo_calculo;
      if (cnpj === cnpj_original) {
        return true;
      }
      return false;
    },
    valida_cpf_cnpj(valor) {
      var valida = this.verifica_cpf_cnpj(valor);
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      if (valida === "CPF") {
        return this.valida_cpf(valor);
      }
      else if (valida === "CNPJ") {
        return this.valida_cnpj(valor);
      }
      else {
        return false;
      }
    },
    formata_cpf_cnpj(valor) {
      var formatado = false;
      var valida = this.verifica_cpf_cnpj(valor);
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      if (valida === "CPF") {
        if (this.valida_cpf(valor)) {
          formatado = valor.substr(0, 3) + ".";
          formatado += valor.substr(3, 3) + ".";
          formatado += valor.substr(6, 3) + "-";
          formatado += valor.substr(9, 2) + "";
        }
      }
      else if (valida === "CNPJ") {
        if (this.valida_cnpj(valor)) {
          formatado = valor.substr(0, 2) + ".";
          formatado += valor.substr(2, 3) + ".";
          formatado += valor.substr(5, 3) + "/";
          formatado += valor.substr(8, 4) + "-";
          formatado += valor.substr(12, 14) + "";
        }
      }
      return formatado;
    },
  },
  created() {
    // Adicione ouvintes de eventos para reiniciar o temporizador quando houver interação do usuário
    window.addEventListener('mousemove', this.resetTimer);
    window.addEventListener('keydown', this.resetTimer);
  },
  beforeUnmount() {
    // Remova os ouvintes de eventos ao destruir o componente
    window.removeEventListener('mousemove', this.resetTimer);
    window.removeEventListener('keydown', this.resetTimer);
  },
};
</script>
    
<style>@import "../../assets/styles/rfCss.css";</style>