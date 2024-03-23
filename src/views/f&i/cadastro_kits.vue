<template>
  <SidebarVue ref="sidebar" />
  <NavgatorFI ref="navgator" :barraTitulo="' F&I - Kits'" :titulo="'kits'" />
  <div class="card card-filtro">
    <form @submit.prevent="onSubmit" id="form">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"
            ><span class="texto_filtro">Dados do kit</span></i
          >
        </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col-2">
          <div class="form-floating">
            <select
              class="form-select rf_bg_form rf_texto_desk"
              v-model="pacote_id"
            >
              <option v-for="item in pacotes" :key="item.id" :value="item.id">
                {{ item.descricao }}
              </option>
            </select>
            <label class="rf_texto">Pacote</label>
          </div>
        </div>
        <div class="col-2">
          <div class="form-floating">
            <select
              class="form-select rf_bg_form rf_texto_desk"
              v-model="modelo_id"
            >
              <option v-for="item in modelos" :key="item.id" :value="item.id">
                {{ item.descricao }}
              </option>
            </select>
            <label class="rf_texto">Modelo</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              class="form-control rf_bg_form rf_texto"
              v-model="descricao"
            />
            <label class="rf_texto">Descrição</label>
          </div>
        </div>

        <div class="col-1">
          <div class="form-floating">
            <select
              class="form-select rf_bg_form rf_texto_desk"
              v-model="status"
            >
              <option
                v-for="item in status_list"
                :key="item.value"
                :value="item.value"
              >
                {{ item.type }}
              </option>
            </select>
            <label class="rf_texto">Status</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <button type="submit" class="btn btn-lg btn-filtro">
              <span class="rf_texto_btn">Cadastrar</span>
            </button>
          </div>
        </div>
      </div>
    </form>
    <div class="row g-2 p-2">
      <div class="card-title gy-4">
        <i class="bi bi-funnel fs-5 icone_filtro"
          ><span class="texto_filtro">Kits Cadastrados</span></i
        >
      </div>
    </div>
    <!--Filtro Kits Cadastrados-->
    <div class="row g-2 p-2">
      <div class="col">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="filtroDescricao"
          />
          <label class="rf_texto">Descrição</label>
        </div>
      </div>

      <div class="col-2">
        <div class="form-floating">
          <button
            type="submit"
            class="btn btn-lg btn-filtro"
            @click="retrieveKitsModelo"
          >
            <span class="rf_texto_btn">Pesquisar</span>
          </button>
        </div>
      </div>
    </div>
    <!--Tabela Kits Cadastrados-->
    <div class="g-2 p-2 rf_margin">
      <table class="table rf_texto">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Modelo</th>
            <th scope="col">Pacote</th>
            <th scope="col">Incluir Itens</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in kits_modelos" :key="item.id" class="table-linha">
            <td>{{ item.descricao }}</td>
            <td>{{ item.kits_modelo.descricao }}</td>
            <td>{{ item.kits_pacote.descricao }}</td>
            <td>
              <button class="dropdown-toggle-icon" @click="incluir_itens(item)">
                <i class="bi bi-pencil-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination
        v-if="pacotes.length"
        :offset="totalPages"
        :total="totalItems"
        :limit="pageSize"
        @change-page="handlePageChange"
      />
    </div>
    <div class="row g-2 p-2">
      <div class="card-title gy-4">
        <i class="bi bi-funnel fs-5 icone_filtro"
          ><span class="texto_filtro">Kit Selecionado</span></i
        >
      </div>
    </div>
    <div class="row g-2 p-2">
      <div class="col-2">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="pacote_selecionado"
            disabled
          />
          <label class="rf_texto">Pacote Selecionado</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="modelo_selecionado"
            disabled
          />
          <label class="rf_texto">Modelo Selecionado</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating">
          <input
            type="text"
            class="form-control rf_bg_form rf_texto"
            v-model="descricao_selecionada"
            disabled
          />
          <label class="rf_texto">Descrição</label>
        </div>
      </div>
    </div>
  </div>
  <!--Bloco do Filtro-->
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
                type="button"
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
  <div class="card card-tabela g-2 p-2">
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
          <th scope="col" style="width: 10%">Preço Desconto</th>
          <th scope="col" style="width: 10%">Preço Ajustado</th>
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
          <td>{{ this.currency(item.preco_desconto) }}</td>
          <td>
            <div>
              <input
                class="form-control rf_bg_form rf_texto"
                type="text"
                :value="currency(item.preco_ajustado)"
                :disabled="desbloquear"
              />
            </div>
          </td>
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
  <div class="card card-tabela g-2 p-2 mt-2">
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
          <th scope="col" style="width: 10%">Preço Desconto</th>
          <th scope="col" style="width: 10%">Preço Ajustado</th>
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
          <td>{{ this.currency(item.preco_desconto) }}</td>
          <td>
            <div>
              <input
                class="form-control rf_bg_form rf_texto"
                type="text"
                :value="currency(item.preco_ajustado)"
                :disabled="desbloquear"
              />
            </div>
          </td>
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
  <div class="card card-tabela g-2 p-2 mt-2">
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
          <th scope="col" style="width: 10%">Preço Desconto</th>
          <th scope="col" style="width: 10%">Preço Ajustado</th>
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
          <td>{{ this.currency(item.preco_desconto) }}</td>
          <td>
            <div>
              <input
                class="form-control rf_bg_form rf_texto"
                type="text"
                :value="currency(item.preco_ajustado)"
                :disabled="desbloquear"
              />
            </div>
          </td>
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
  <div class="card card-tabela g-2 p-2 mt-2">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col" style="width: 10%" class="rf_texto_tabela">Total</th>
          <th scope="col" style="width: 45%" class="rf_texto_tabela"></th>
          <th scope="col" style="width: 10%" class="rf_texto_tabela">
            {{ this.currency(this.total_preco) }}
          </th>
          <th scope="col" style="width: 10%" class="rf_texto_tabela">
            {{ this.currency(this.total_precoDesconto) }}
          </th>
          <th scope="col" style="width: 10%" class="rf_texto_tabela">
            {{ this.currency(this.total_precoAjustado) }}
          </th>
          <th scope="col" style="width: 5%" class="rf_texto_tabela"></th>
        </tr>
      </thead>
    </table>
  </div>


  <!-- Modal de confirmação Acessório -->
  <div
    class="modal fade"
    id="confirmModal"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
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
  <!--Modal Exclusão Acessório-->
  <div
    class="modal fade"
    id="excluiModal"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
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
    class="modal fade"
    id="confirmModalSeguro"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
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
                    precoAjustadoSeguro = formatarValor(
                      precoAjustadoSeguro
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
    class="modal fade"
    id="excluiModalSeguro"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
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
    class="modal fade"
    id="confirmModalRevisao"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
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
                    precoAjustadoRevisao = formatarValor(
                      precoAjustadoRevisao
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
    class="modal fade"
    id="excluiModalRevisao"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
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
            data-bs-target="#ModalProposta"
            data-bs-toggle="modal"
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
      </div>
    </div>
  </div>

  <!--Modal Seguros-->
  <div
    class="modal fade"
    id="ModalItensSeguros"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-journal-text fs-5 icone_kit"
              ><span class="texto_kit">Itens Seguros</span></i
            >
          </div>
          <button
            class="btn btn-modal btn-lg p-1 mt-1"
            type="button"
            data-bs-target="#ModalProposta"
            data-bs-toggle="modal"
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
                      class="form-control rf_bg_form rf_texto"
                      v-model="filtroCodigoSeguro"
                    />
                    <label class="rf_texto">Código</label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control rf_bg_form rf_texto"
                      v-model="filtroDescricaoSeguro"
                    />
                    <label class="rf_texto">Descrição</label>
                  </div>
                </div>
                <div class="col-2">
                  <div class="form-floating">
                    <button
                      type="submit"
                      class="btn btn-lg btn-filtro"
                      @click="retrieveSeguros"
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
            <table class="table rf_texto">
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
                  v-for="item in seguros_modelo"
                  :key="item.id"
                  class="table-linha"
                >
                  <td>{{ item.codigo }}</td>
                  <td>{{ item.descricao }}</td>
                  <td>{{ this.currency(item.valor) }}</td>
                  <td>
                    <button
                      class="dropdown-toggle-icon"
                      @click="inserir_seguro(item)"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <pagination v-if="hist_cliente.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
                @change-page="handlePageChange" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Modal Revisão-->
  <div
    class="modal fade"
    id="ModalItensRevisao"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-speedometer2 fs-5 icone_kit"
              ><span class="texto_kit">Itens Revisão Programada</span></i
            >
          </div>
          <button
            class="btn btn-modal btn-lg p-1 mt-1"
            type="button"
            data-bs-target="#ModalProposta"
            data-bs-toggle="modal"
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
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control rf_bg_form rf_texto"
                      v-model="filtroPlaca"
                      @input="filtrarVeiculos"
                    />
                    <label class="rf_texto">Descrição</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-2">
              <div class="form-floating">
                <!-- <button class="btn btn-secondary btn-lg mt-1" type="button" @click="
          page = 1;
        historico_cliente(id_historico_cliente);
        ">
                    Pesquisar
                  </button> -->
              </div>
            </div>
          </div>
          <!--Tabelas-->
          <div class="card g-2 p-2 mt-2">
            <table class="table rf_texto">
              <thead>
                <tr>
                  <th scope="col">Descrição</th>
                  <th scope="col">Preço Final</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in revisoes_modelo"
                  :key="item.id"
                  class="table-linha"
                >
                  <td>{{ item.codigo }}</td>
                  <td>{{ item.descricao }}</td>
                  <td>{{ this.currency(item.valor) }}</td>
                  <td>
                    <button
                      class="dropdown-toggle-icon"
                      @click="inserir_revisoes(item)"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <pagination v-if="hist_cliente.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
                @change-page="handlePageChange" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="abrir_modal">
    <Message :msg="msg" v-show="msg" />
  </div>
  <RodapeVue />
</template>

<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import NavgatorFI from "../../components/menu/NavgatorFI.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import axios from "axios";
import TokenService from "../../services/token.service";
import jwt_decode from "jwt-decode";
import Message from "../../components/modal/Message.vue";

export default {
  name: "Dashboard F&I",

  components: {
    SidebarVue,
    NavgatorFI,
    Message,
    RodapeVue,
  },
  data() {
    return {
      modal_itens_acessorios: false,
      modal_itens_seguros: false,
      modal_itens_revisao: false,

      status_list: [
        { value: 0, type: "Desabilitado" },
        { value: 1, type: "Habilitado" },
      ],
      status: 1,
      modelos: [],
      pacotes: [],
      kits_modelos: [],
      estoque_pecas: [],
      seguros_modelo: [],
      revisoes_modelo: [],
      itens_kit_acessorios: [],
      itens_kit_seguros: [],
      itens_kit_revisoes: [],
      pacote_id: "",
      modelo_id: "",
      company_id: "",
      user_log: "",
      pacote_selecionado: "",
      modelo_selecionado: "",
      descricao_selecionada: "",
      kit_id: "",
      desconto_pacote: "",
      habilitar_kits: true,

      //Soma de todos os preços da tabela acessórios
      total_preco_acessorios: 0,
      total_precoDesconto_acessorios: 0,
      total_precoAjustado_acessorios: 0,

      //Soma de todos os preços da tabela seguros
      total_preco_seguros: 0,
      total_precoDesconto_seguros: 0,
      total_precoAjustado_seguros: 0,

      //Soma de todos os preços da tabela revisões
      total_preco_revisoes: 0,
      total_precoDesconto_revisoes: 0,
      total_precoAjustado_revisoes: 0,

      //Soma de todos os preços das tabelas acesórios, seguros e revisões
      total_preco: 0,
      total_precoDesconto: 0,
      total_precoAjustado: 0,

      //Filtro

      filtroDescricao: "",
      filtroCodigo: "",
      filtroDescricaoSeguro: "",
      filtroCodigoSeguro: "",
      filtroPlaca: "",
      filtroMarca: "",
      filtroModelo: "",
      filtroCor: "",

      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35, 50, 100],
      pageSize: 50,
      desbloquear: true,
      precoAjustadoAcessorio: "",
      precoAjustadoSeguro: "",
      precoAjustadoRevisao: "",
      
      abrir_modal: false,
      msg: "",
      id_kit_acessorio: "",
      id_kit_seguro: "",
      id_kit_revisao: "",
      status_acessorio:1,
      status_seguro:1,
      status_revisao:1,
    };
  },
  mounted() {
    this.getToken();
    this.retrievePacotes();
    this.retrieveModelos();
    this.retrieveKitsModelo();
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
    exibirModalConfirmacao(item) {
      // Exibir o modal
      console.log("Exibir o modal", item);

      // Salvar o item atual para confirmar a alteração posteriormente
      this.id_kit_acessorio = item.id;
      this.status_acessorio = 1;
    },
    exibirModalConfirmacaoSeguro(item) {
      // Exibir o modal
      console.log("Exibir o modal", item);

      // Salvar o item atual para confirmar a alteração posteriormente
      this.id_kit_seguro = item.id;
      this.status_seguro = 1;
    },
    exibirModalConfirmacaoRevisao(item) {
      // Exibir o modal
      console.log("Exibir o modal", item);

      // Salvar o item atual para confirmar a alteração posteriormente
      this.id_kit_revisao = item.id;
      this.status_revisao = 1;
    },
    remover_item_acessorio(item){
      this.id_kit_acessorio = item.id;
      this.status_acessorio = 0;
    },
    remover_item_seguro(item){
      this.id_kit_seguro = item.id;
      this.status_seguro = 0;
    },
    remover_item_revisao(item){
      this.id_kit_revisao = item.id;
      this.status_revisao = 0;
    },
    habilitar_itens_acessorio() {
      this.retrieveAcessorios();
      this.modal_itens_acessorios = true;
    },
    habilitar_itens_seguros() {
      this.retrieveSeguros();
      this.modal_itens_seguros = true;
    },
    habilitar_itens_revisao() {
      this.retrieveRevisoes();
      this.modal_itens_revisao = true;
    },

    incluir_itens(item) {
      // Desmarcar todos os outros pacotes
      console.log("Dados do pacote selecionas", item);
      this.kit_id = item.id;
      this.pacote_selecionado = item.kits_pacote.descricao;
      this.desconto_pacote = item.kits_pacote.desconto;
      this.modelo_selecionado = item.kits_modelo.descricao;
      this.descricao_selecionada = item.descricao;
      this.modelo_id = item.kits_modelo.id;
      this.retrievekitsAcessoriosItens();
      this.retrievekitsSegurosItens();
      this.retrievekitsRevisoesItens();

      this.habilitar_kits = false;
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
    async confirmarAlteracao() {
      const id = this.id_kit_acessorio;
      const preco_ajustado = this.precoAjustadoAcessorio;
      const status = this.status_acessorio;
      try {
        await fetch(
          `${process.env.VUE_APP_API_URL}listar_kits_acessorios/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              preco_ajustado: preco_ajustado,
              status: status,
            }),
          }
        )
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
              setTimeout(() => (this.abrir_modal = false), 4000);
              this.retrievekitsAcessoriosItens();
              
            }
          });
      } catch (error) {
        console.error("Verificando log", error.message);

        if (error.response && error.response.status === 500) {
          this.abrir_modal = true;
          this.msg = "Erro interno do servidor";
          setTimeout(() => (this.abrir_modal = false), 4000);
        } else {
          // Tratar outros erros
          this.abrir_modal = true;
          (this.msg = "Erro:"), error.message;
          (this.msg = "Status:"), error.response.status;
          (this.msg = "Dados:"), error.response.data;
          (this.msg = "Cabeçalhos:"), error.response.headers;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    async confirmarAlteracaoSeguro() {
      const id = this.id_kit_seguro;
      const preco_ajustado = this.precoAjustadoSeguro;
      const status = this.status_seguro;
      try {
        await fetch(
          `${process.env.VUE_APP_API_URL}listar_kits_seguros/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              preco_ajustado: preco_ajustado,
              status: status,
            }),
          }
        )
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
              setTimeout(() => (this.abrir_modal = false), 4000);
              this.retrievekitsSegurosItens();
              
            }
          });
      } catch (error) {
        console.error("Verificando log", error.message);

        if (error.response && error.response.status === 500) {
          this.abrir_modal = true;
          this.msg = "Erro interno do servidor";
          setTimeout(() => (this.abrir_modal = false), 4000);
        } else {
          // Tratar outros erros
          this.abrir_modal = true;
          (this.msg = "Erro:"), error.message;
          (this.msg = "Status:"), error.response.status;
          (this.msg = "Dados:"), error.response.data;
          (this.msg = "Cabeçalhos:"), error.response.headers;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    async confirmarAlteracaoRevisao() {
      const id = this.id_kit_revisao;
      const preco_ajustado = this.precoAjustadoRevisao;
      const status = this.status_revisao;
      try {
        await fetch(
          `${process.env.VUE_APP_API_URL}listar_kits_revisoes/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              preco_ajustado: preco_ajustado,
              status: status,
            }),
          }
        )
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
              setTimeout(() => (this.abrir_modal = false), 4000);
              this.retrievekitsRevisoesItens();
              
            }
          });
      } catch (error) {
        console.error("Verificando log", error.message);

        if (error.response && error.response.status === 500) {
          this.abrir_modal = true;
          this.msg = "Erro interno do servidor";
          setTimeout(() => (this.abrir_modal = false), 4000);
        } else {
          // Tratar outros erros
          this.abrir_modal = true;
          (this.msg = "Erro:"), error.message;
          (this.msg = "Status:"), error.response.status;
          (this.msg = "Dados:"), error.response.data;
          (this.msg = "Cabeçalhos:"), error.response.headers;
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
    },
    formatarValor(valor) {
      if (!valor) return "";
      valor = valor.toString().replace(/\D/g, "");
      valor = (valor / 100).toFixed(2).replace(".", ",");
      valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return valor;
    },
    currency(number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(number);
    },

    async inserir_acessorio(item) {
      console.log("Dados do acessorio para ser inserido", item);
      const perc_desconto = parseFloat(this.desconto_pacote / 100);
      const valor_desconto = parseFloat(item.preco_final) * perc_desconto;

      // console.log("Valor do desconto", valor_desconto);
      // const acessoriosKit =
      //   {
      //     kit_id: this.kit_id,
      //     codigo: item.codigo_mercadoria,
      //     descricao: item.descricao_mercadoria,
      //     preco: this.currency(item.preco_final),
      //     preco_desconto: this.currency(item.preco_final - valor_desconto),
      //     preco_ajustado: this.currency(item.preco_final - valor_desconto),
      //   }

      await fetch(`${process.env.VUE_APP_API_URL}kits_acessorios`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kit_id: this.kit_id,
          codigo: item.codigo_mercadoria,
          descricao: item.descricao_mercadoria,
          preco: this.currency(item.preco_final),
          preco_desconto: this.currency(item.preco_final - valor_desconto),
          preco_ajustado: this.currency(item.preco_final - valor_desconto),
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
            setTimeout(() => (this.abrir_modal = false), 4000);

            //window.location.reload();
          }
          if (resposta.StatusOk == 204) {
            this.abrir_modal = true;
            this.msg = resposta.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
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
          setTimeout(() => (this.abrir_modal = false), 4000);
        });
    },
    async inserir_seguro(item) {
      console.log("Dados do seguro para ser inserido", item);
      const perc_desconto = parseFloat(this.desconto_pacote / 100);
      const valor_desconto = parseFloat(item.valor) * perc_desconto;

      await fetch(`${process.env.VUE_APP_API_URL}kits_seguros`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kit_id: this.kit_id,
          codigo: item.codigo,
          descricao: item.descricao,
          preco: this.currency(item.valor),
          preco_desconto: this.currency(item.valor - valor_desconto),
          preco_ajustado: this.currency(item.valor - valor_desconto),
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
            setTimeout(() => (this.abrir_modal = false), 4000);

            //window.location.reload();
          }
          if (resposta.StatusOk == 204) {
            this.abrir_modal = true;
            this.msg = resposta.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
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
          setTimeout(() => (this.abrir_modal = false), 4000);
        });
    },
    async inserir_revisoes(item) {
      console.log("Dados da revisão para ser inserido", item);
      const perc_desconto = parseFloat(this.desconto_pacote / 100);
      const valor_desconto = parseFloat(item.valor) * perc_desconto;

      await fetch(`${process.env.VUE_APP_API_URL}kits_revisoes`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kit_id: this.kit_id,
          codigo: item.codigo,
          descricao: item.descricao,
          preco: this.currency(item.valor),
          preco_desconto: this.currency(item.valor - valor_desconto),
          preco_ajustado: this.currency(item.valor - valor_desconto),
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
            setTimeout(() => (this.abrir_modal = false), 4000);

            //window.location.reload();
          }
          if (resposta.StatusOk == 204) {
            this.abrir_modal = true;
            this.msg = resposta.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
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
          setTimeout(() => (this.abrir_modal = false), 4000);
        });
    },

    async retrievePacotes() {
      console.log("Buscando lista de pacotes");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}listar_pacotes`,
          {
            params: {
              descricao: this.filtroDescricao,
              page: this.page - 1,
              size: this.pageSize,
            },
          }
        );

        console.log("Dados dos pacotes", response.data);
        // Faça algo com os dados aqui, como atribuir a uma variável de componente
        this.pacotes = response.data.pacotes; // exemplo de atribuição
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
    async retrieveModelos() {
      console.log("Buscando modelos de veículos");
      await axios
        .get(`${process.env.VUE_APP_API_URL}modelo_acessorio`, {
          params: {
            empresa_id: this.company_id,
          },
        })
        .then((response) => {
          this.modelos = response.data.rows;
          console.log(response.data.rows);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
        });
    },
    async retrieveKitsModelo() {
      console.log("Buscando kits modelo");
      await axios
        .get(`${process.env.VUE_APP_API_URL}listar_kits_modelo`, {
          params: {
            descricao: this.filtroDescricao,
            page: this.page - 1,
            size: this.pageSize,
          },
        })
        .then((response) => {
          this.kits_modelos = response.data.kits_modelo;
          console.log(response.data.kits_modelo);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
          }
        });
    },

    //Carregar Acessórios, Seguros e Revisões para carregar a lista do modais
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
          setTimeout(() => (this.abrir_modal = false), 4000);
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
          setTimeout(() => (this.abrir_modal = false), 4000);
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
          setTimeout(() => (this.abrir_modal = false), 4000);
        }
      }
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

    async onSubmit() {
      await fetch(`${process.env.VUE_APP_API_URL}kits_modelo`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pacote_id: this.pacote_id,
          modelo_id: this.modelo_id,
          descricao: this.descricao,
          status: this.status,
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
            setTimeout(() => (this.abrir_modal = false), 4000);
            window.location.reload();
          }
          if (resposta.StatusOk == 204) {
            this.abrir_modal = true;
            this.msg = resposta.message;
            setTimeout(() => (this.abrir_modal = false), 4000);
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
          setTimeout(() => (this.abrir_modal = false), 4000);
        });
    },
  },
};
</script>
