<template>
  <SidebarVue ref="sidebar" />
  <Navgator ref="navgator" :barraTitulo="' Administração - Acessórios'" :titulo="'acessório'" />

  <!--Formulário de Cadastro -->

  <div class="card card-filtro">
    <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Dados do Acessório</span></i>         
        </div>
      </div>
    <form @submit.prevent="onSubmit">
      <div class="row g-2 p-2">
        <!--Item-->
        <div class="col-1">
          <div class="form-floating ">
            <select class="form-select rf_bg_form rf_texto " v-model="item" required>
              <option value="0">INTERNO</option>
              <option value="1">EXTERNO</option>
            </select>
            <label class="rf_texto">Item</label>

          </div>
        </div>
        <!--Cortesia-->
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="cortesia" required>
              <option value="NAO">NAO</option>
              <option value="SIM">SIM</option>
            </select>
            <label class="rf_texto">Cortesia</label>

          </div>
        </div>
        <!--Código-->
        <div class="col-2">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="codigo" required />
            <label for="valid_descricao" class="rf_texto">Código</label>
          </div>
        </div>
        <!--Descrição-->
        <div class="col">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="descricao" required />
            <label for="valid_descricao" class="rf_texto">Descrição</label>

          </div>
        </div>
        <!--Preço Base-->
        <div class="col-2">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="preco_base_peca"
              @input="preco_base_peca = formatarValor(preco_base_peca)" required />
            <label for="valid_descricao" class="rf_texto">Preço Base</label>

          </div>
        </div>
      </div>
      <div class="row g-2 p-2">
        <!--Tmo Instalação-->
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="tmo_instalação" required />
            <label for="valid_descricao" class="rf_texto">Tmo. Instalação</label>

          </div>
        </div>
        <!--Tmo Pintura-->
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="tmo_pintura" required />
            <label for="valid_descricao" class="rf_texto">Tmo. Pintura</label>

          </div>
        </div>
        <!--Preco Final-->
        <div class="col-2">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="preco_final_instalado"
              @input="preco_final_instalado = formatarValor(preco_final_instalado)" required />
            <label for="valid_descricao" class="rf_texto">Preço Final </label>

          </div>
        </div>
        <!--Categoria-->
        <div class="col-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="categoria_id" id="valid_status" required>
              <option value="1">Novos</option>
              <option value="2">Usados</option>
            </select>
            <label for="valid_status" class="rf_texto">Categoria</label>

          </div>
        </div>
        <!--Modelo-->
        <div class="col-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="modelo_id" required>
              <option v-for="item in modelo" :value="item.id" :key="item.id">
                {{ item.descricao }}
              </option>
            </select>
            <label for="valid_status" class="rf_texto">Modelo</label>

          </div>
        </div>
        <!--Mão de Obra-->
        <div class="col-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="mao_obra_id" id="valid_status" required>
              <option value="4">Ambos</option>
              <option value="1">Instalação</option>
              <option value="2">Pintura</option>
            </select>
            <label for="valid_status" class="rf_texto">Mão de Obra</label>

          </div>
        </div>
        <div class="col-1 d-flex ">
          <div class="input-group-append">
            <button type="submit" :disabled="btn_cadastrar" class="btn btn-lg btn-filtro">
              <span class="rf_texto_btn">Cadastrar</span>
            </button>
          </div>
        </div>
      </div>
    </form>
    <div v-if="abrir_modal">
      <Message :msg="msg" v-show="msg" />
    </div>
  </div>
  <!--Tabelas-->
  <div class="card card-tabela">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Preço Base</th>
          <th scope="col">Preço Instalado</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in acessorios" :key="item.descricao" class="table-linha">
          <td>{{ item.descricao }}</td>
          <td>{{ this.currency(item.preco_base_peca) }}</td>
          <td>{{ this.currency(item.preco_final_instalado) }}</td>

          <td>
            <button type="button" class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
              @click="editar_acessorio(item)">
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination v-if="acessorios.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
      @change-page="handlePageChange" />
  </div>

  <!-- Modal para edição -->

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content ">
        <div class="modal-header">
          <h1 class="modal-title fs-5 rf_texto" id="exampleModalLabel">
            Editar Acessórios
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row g-2 p-2">
            <!--Item-->
            <div class="col-2">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_item">
                  <option value="0">INTERNO</option>
                  <option value="1">EXTERNO</option>
                </select>
                <label for="valid_status" class="rf_texto">Item</label>
              </div>
            </div>
            <!--Cortesia-->
            <div class="col-2">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_cortesia">
                  <option value="NAO">NAO</option>
                  <option value="SIM">SIM</option>
                </select>
                <label class="rf_texto">Cortesia</label>
              </div>
            </div>
            <!--Código-->
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_codigo" />
                <label class="rf_texto">Código</label>
              </div>
            </div>
            <!--Descrição-->
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_descricao" />
                <label class="rf_texto">Descrição</label>
              </div>
            </div>
          </div>
          <div class="row g-2 p-2">
            <!--Preço Base-->
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_preco_base_peca"
                  @input="edit_preco_base_peca = formatarValor(edit_preco_base_peca)" />
                <label class="rf_texto">Preço Base</label>
              </div>
            </div>
            <!--Tmo Instalação-->
            <div class="col-1">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_tmo_inst" />
                <label class="rf_texto">Tmo. Instalação</label>
              </div>
            </div>
            <!--Tmo Pintura-->
            <div class="col-1">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_tmo_pintura" />
                <label class="rf_texto">Tmo. Pintura</label>
              </div>
            </div>
            <!--Item-->
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control rf_bg_form rf_texto" v-model="edit_preco_final_instalado"
                  @input="edit_preco_final_instalado = formatarValor(edit_preco_final_instalado)" />
                <label class="rf_texto">Preço Instalação</label>
              </div>
            </div>
            <!--Categoria-->
            <div class="col">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_categoria_id" id="valid_status" required>
                  <option value="1">Novos</option>
                  <option value="2">Usados</option>
                </select>
                <label class="rf_texto">Categoria</label>
              </div>
            </div>
            <!--Modelo-->
            <div class="col">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_modelo_id">
                  <option v-for="item in modelo" :value="item.id" :key="item.id">
                    {{ item.descricao }}
                  </option>
                </select>
                <label class="rf_texto">Modelo</label>
              </div>
            </div>
            <!--Mão de Obra-->
            <div class="col">
              <div class="form-floating">
                <select class="form-select rf_bg_form rf_texto" v-model="edit_mao_obra_id">
                  <option value="4">Ambos</option>
                  <option value="1">Instalação</option>
                  <option value="2">Pintura</option>
                </select>
                <label class="rf_texto">Mão de Obra</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Fechar
          </button>
          <button type="button" @click="update()" data-bs-dismiss="modal" class="btn btn-secondary">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
  <RodapeVue />
</template>

<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import Navgator from "../../components/menu/Navgator.vue";
import axios from "axios";
//import DataService from "../../services/DataService";
import userService from "../../services/user.service";
import Pagination from "../../components/Pagination.vue";
import Message from "../../components/modal/Message.vue";

import RodapeVue from '../../components/menu/Rodape.vue';

export default {
  name: "Usuários",
  components: {
    SidebarVue,
    Pagination,
    Message,
    RodapeVue,
    Navgator
  },
  data() {
    return {
      acessorios: [],
      modelo: [],

      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,
      dialog: false,
      //Campos Cadastro
      user_id: "",
      item: "",
      cortesia: "",
      codigo: "",
      descricao: "",
      preco_base_peca: "",
      tmo_instalação: "",
      tmo_pintura: "",
      preco_final_instalado: "",
      categoria_id: "",
      modelo_id: "",
      mao_obra_id: "",
      btn_cadastrar: false,

      /// Campos Modal Editar
      edit_id: "",
      edit_item: "",
      edit_cortesia: "",
      edit_codigo: "",
      edit_descricao: "",
      edit_preco_base_peca: "",
      edit_tmo_inst: "",
      edit_tmo_pintura: "",
      edit_preco_final_instalado: "",
      edit_categoria_id: "",
      edit_modelo_id: "",
      edit_mao_obra_id: "",

      //Params
      searchTitle: "",
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [5, 10, 15, 35],
      pageSize: 50,

      checar: 0
    };
  },
  mounted() {
    this.retrieveAcessorios();
    this.retrieveModelo();

  },
  methods: {
    formatarValor(valor) {
      if (!valor) return '';
      valor = valor.toString().replace(/\D/g, '');
      valor = (valor / 100).toFixed(2).replace('.', ',');
      valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return valor;
    },
    async onSubmit() {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}acessorios`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: this.item,
            cortesia: this.cortesia,
            codigo: this.codigo,
            descricao: this.descricao,
            preco_base_peca: this.preco_base_peca,
            tmo_instalacao: this.tmo_instalação,
            tmo_pintura: this.tmo_pintura,
            preco_final_instalado: this.preco_final_instalado,
            categoria_id: this.categoria_id,
            modelo_id: this.modelo_id,
            mao_obra_id: this.mao_obra_id,
          }),
        });
        const resp = JSON.stringify(response.status);
        if (resp == 200) {
          this.abrir_modal = true;
          this.msg = "Acessório criado com sucesso!";
          setTimeout(() => (this.abrir_modal = false), 4000);
          (this.item = ""),
            (this.cortesia = ""),
            (this.codigo = ""),
            (this.descricao = ""),
            (this.preco_base_peca = ""),
            (this.tmo_instalação = ""),
            (this.tmo_pintura = ""),
            (this.preco_final_instalado = ""),
            (this.categoria_id = ""),
            (this.modelo_id = ""),
            (this.mao_obra_id = "");
          this.retrieveAcessorios();
        } else {
          this.modal = true;
          this.dialog = true;
          this.message = "Erro ao inserir o acessório";
          setTimeout(() => (this.dialog = false), 4000);
        }
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    //Buscar dados no banco de dados
    getRequestParams(searchTitle, page, pageSize) {
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
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveAcessorios();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveAcessorios();
    },
    async retrieveAcessorios() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getAcessorios(params).then((response) => {
          const { acessorios, totalPages, totalItems } = response.data;
          this.acessorios = acessorios;
          this.totalPages = totalPages;
          this.totalItems = totalItems;
          console.log(response.data);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
    async retrieveModelo() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        userService.getModelo(params).then((response) => {
          const { modelo_veiculo, totalPages } = response.data;
          this.modelo = modelo_veiculo;
          this.totalPages = totalPages;
          console.log(response.data);
        });
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },

    async editar_acessorio(item) {
      console.log(item)
      this.edit_id = item.id,
        (this.edit_item = item.item),
        (this.edit_cortesia = item.cortesia),
        (this.edit_codigo = item.codigo),
        (this.edit_descricao = item.descricao),

        (this.edit_tmo_inst = item.tmo_instalacao),
        (this.edit_tmo_pintura = item.tmo_pintura),
        (this.edit_preco_final_instalado = this.currency(
          item.preco_final_instalado
        )),
        (this.edit_categoria_id = item.categoria_id),
        (this.edit_modelo_id = item.modelo_id),
        (this.edit_mao_obra_id = item.mao_obra_id);
      (this.edit_preco_base_peca = this.currency(item.preco_base_peca))

    },
    async update() {
      const token = this.$store.state.auth.user.accessToken;
      const headers = {
        "x-access-token": token,
      };
      const dados = {
        id: this.edit_id,
        item: this.edit_item,
        cortesia: this.edit_cortesia,
        codigo: this.edit_codigo,
        descricao: this.edit_descricao,
        preco_base_peca: this.edit_preco_base_peca,
        tmo_instalacao: this.edit_tmo_inst,
        tmo_pintura: this.edit_tmo_pintura,
        preco_final_instalado: this.edit_preco_final_instalado,
        categoria_id: this.edit_categoria_id,
        modelo_id: this.edit_modelo_id,
        mao_obra_id: this.edit_mao_obra_id,
      };

      const response = await axios.put(
        `${process.env.VUE_APP_API_URL}acessorios/${this.edit_id}`,
        dados,
        { headers }
      );
      const resp = JSON.stringify(response.status);
      console.log(resp)
      if (resp == 200) {
        this.abrir_modal = true;
        this.msg = "Acessório atualizado com sucesso!";
        setTimeout(() => (this.abrir_modal = false), 4000);
        location.reload();


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
