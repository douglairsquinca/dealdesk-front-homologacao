<template>
  <SidebarVue ref="sidebar" />
  <NavgatorAt ref="navgator" :barraTitulo="' Atendimento'" :titulo="'novo atendimento'" />


  <div class="card card-atendimento">
    <div class="col-4">
      <div class="card-kit">
        <div class="card-icon">
          <i class="bi bi-folder-plus icone_filtro"></i>
          <div class="input-group-append">
            <button class="btn btn-lg btn-filtro" type="button">
              <router-link to="/atendimento/proposta" class="nav-link">
                <span class="rf_texto_btn">NOVO</span><br>
                <span class="rf_texto_btn">ATENDIMENTO</span>
              </router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Lista de Vendedores-->
  <div class="card card-atendimento">
    <div class="row">
      <div class="col-6 px-4">
        <div class="row card-tabela-atendimento">
          <div class="col-6  ">
            <i class="bi bi-person-fill-add fs-5 icone_filtro"><span class="texto_filtro">Vendedores</span></i>
          </div>
          <div class="col-6  ">
            <i class="bi bi-person-fill-add fs-5 icone_filtro"><span class="texto_filtro">Fila</span></i>
          </div>
        </div>
      </div>
      <div class="col-6 px-4">
        <div class="row card-tabela-atendimento">
          <div class="col-6  ">
            <i class="bi bi-person-fill-add fs-5 icone_filtro"><span class="texto_filtro">Vendedores</span></i>
          </div>
          <div class="col-6  ">
            <i class="bi bi-person-fill-dash fs-5 icone_filtro"><span class="texto_filtro">Em Atendimento</span></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--Tabelas-->
  <div class="card card-atendimento ">
    <div class="row">
      <div class="col-6">        
          <table class="table table-atendimento rf_texto">
            <thead>
              <tr>
                <th scope="col">Vendedor</th>
                <th scope="col">Status Vendedor</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in usuarios_dispo" :key="item.id" class="table-linha"
                :class="{ 'table-success': item.status_vendedor === 'Disponível para atendimento!', 'table-warning': item.status_vendedor === 'Indisponível para atendimento!' }">
                <td>{{ item.username }}</td>
                <td>{{ item.status_vendedor }}</td>
                <td>
                  <button type="button" class="dropdown-toggle-icon-atendimento" style="margin-right: 0.6rem"
                    @click="desabilitar_vend(item)">
                    <i class="bi bi-person-fill-slash"></i>
                  </button>

                  <button type="button" class="dropdown-toggle-icon-atendimento" @click="update_dispo(item)">
                    <i class="bi bi-person-fill-check"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
       
        <pagination v-if="usuarios_dispo.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
          @change-page="handlePageChange_disp" />
      </div>
      <div class="col-6">
        <table class="table table-atendimento rf_texto">
            <thead>
              <tr>
                <th scope="col">Vendedor</th>                
                <th scope="col">Status Vendedor</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in usuarios_ind" :key="item.id" class="table-linha"
                :class="{ 'table-working': item.status_vendedor === 'Vendedor em Atendimento' }">
                <td>{{ item.username }}</td>
               
                <td>{{ item.status_vendedor }}</td>
                <td>
                  <button type="button" class="dropdown-toggle-icon-atendimento" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" @click="update_dispo(item)">
                    <i class="bi bi-person-fill-check"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination v-if="usuarios_ind.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
            @change-page="handlePageChange_ind" />
      </div>
    </div>

  </div>

  <!--Tabelas-->
  <div class="card card-tabela g-2 p-2 rf_margin">
    <table class="table rf_texto">
      <thead>
        <tr>
          <th scope="col">Nº Atendimento</th>
          <th scope="col">Cliente</th>
          <th scope="col">Vendedor</th>
          <th scope="col">Status Proposta</th>
          <th scope="col">Ação</th>

        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="item in proposta" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.clientes.nome }}</td>
            <td>{{ item.vendedores.username }}</td>
            <td>{{ item.status_proposta }}</td>
          </tr> -->
        <tr v-for="item in proposta" :key="item.id"   class="table-linha">
          <td>{{ item.id }}</td>
          <td>{{ item.clientes ? item.clientes.nome : 'N/A' }}</td>
          <td>{{ item.vendedores ? item.vendedores.username : 'N/A' }}</td>
          <td>{{ item.status_proposta }}</td>
          <td>
            <button type="button" class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#ModalEditarPlaca"
              @click="editar_proposta(item)">
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination v-if="proposta.length" :offset="totalPages" :total="totalItems" :limit="pageSize"
      @change-page="handlePageChangeProposta" />
  </div>
  <div v-if="abrir_modal">
    <Message :msg="msg" v-show="msg" />
  </div>

    <!--Modal Veiculo Avaliação-->
    <div
    class="modal fade"
    id="ModalEditarPlaca"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal">
      <div class="modal-content card-container-desk rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-car-front-fill fs-5 icone_filtro"
              ><span class="texto_kit">Editar Placa </span></i
            >
          </div>

          <button
            class="btn btn-modal btn-lg p-1 mt-1"
            type="button"
            data-bs-target="#ModalEditarPlaca"
            data-bs-toggle="modal"
            aria-label="Close"
          >
            Sair
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editar_placa">
            <!--Item-->
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="edit_id" 
                    disabled                   
                  />
                  <label class="rf_texto">Atendimento</label>
                </div>
              </div>  
              <div class="col">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control rf_bg_form rf_texto"
                    v-model="placa_av"                    
                  />
                  <label class="rf_texto">Placa *</label>
                </div>
              </div>                      
            </div>
            <div class="row g-2 p-2">
              <div class="col">
                <div class="form-floating">
                  <button
                    class="btn btn-lg btn-desk-filtro"
                    type="submit"                    
                  >
                    <span class="rf_texto_btn">Atualizar</span>
                  </button>
                </div>
              </div>
            </div>
          
          </form>
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
import Message from "../../components/modal/Message.vue";
import RodapeVue from "../../components/menu/Rodape.vue";
import NavgatorAt from "../../components/menu/NavgatorAt.vue";

import TokenService from "../../services/token.service";
import jwt_decode from 'jwt-decode';
export default {
  name: "Atendimento",
  components: {
    SidebarVue,
    NavgatorAt,
    Pagination,
    Message,
    RodapeVue
  },
  data() {
    return {
      abrir_modal: false,
      msg: '',
      valid: false,
      usuarios_dispo: [],
      usuarios_ind: [],
      funcoes: [],
      atendimento: [],
      proposta: [],
      searchTitle: "",

      //Paginação vendedores indisponiveis
      page_ind: 1,
      totalPages_ind: 0,
      totalItems_ind: 0,
      pageSizes_ind: [100],
      pageSize_ind: 100,

      //Paginação vendedores disponiveis
      page_disp: 1,
      totalPages_disp: 0,
      totalItems_disp: 0,
      pageSizes_disp: [100],
      pageSize_disp: 100,

      //Paginação
      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSizes: [100],
      pageSize: 100,

      //Campos Formulário
      username: "",
      email: "",
      password: "",
      funcao: "",
      message: "",
      dialog: "",
      placa_av:"",
      edit_id:"",
      modal: false,
      modal_msg: false,

      status_proposta: "",
    };
  },
  mounted() {
    this.getToken();
    this.retrieveVendedorInd();
    this.retrieveVendedorDispo();
    this.retrievePropostas();
  },

  methods: {
    getToken() {
      const accessToken = TokenService.getLocalAccessToken();

      // Obter o token de atualização (refresh token)
      TokenService.getLocalRefreshToken();

      // Obter o usuário completo (incluindo os tokens) se necessário
      TokenService.getUser();

      const decodedToken = jwt_decode(accessToken);

      this.empresa_id = decodedToken.company;


    },

    getTipoVend(tipo_vendedor) {
      return tipo_vendedor == 0 ? 'Novo' : 'Usado';
    },

    //Tornar vendedores disponiveis e indisponiveis
    async desabilitar_vend(item) {
      console.log(item);
      const id = item.id;
      const response = await fetch(
        `${process.env.VUE_APP_API_URL}status_vendedor/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status_vendedor: 3,
          }),
        }
      );
      const resp = JSON.stringify(response.status);
      console.log(resp);
      if (resp == 200) {
        this.dialog = true;
        this.message = "Vendedor está desabilitado para atendimento!";
        this.retrieveVendedorDispo();
        this.retrieveVendedorInd();
        document.location.reload(true);
      }
    },
    async update_dispo(item) {
      console.log(item);
      const id = item.id;
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
        this.retrieveVendedorDispo();
        this.retrieveVendedorInd();
        document.location.reload(true);
      }
    },
    async editar_proposta(item) {
      console.log(item);
      this.edit_id = item.id;
      this.placa_av = item.placa_avaliacao;
      //const id = item.id;
      // const response = await fetch(
      //   `${process.env.VUE_APP_API_URL}status_vendedor/${id}`,
      //   {
      //     method: "PUT",

      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       status_vendedor: 1,
      //     }),
      //   }
      // );
      // const resp = JSON.stringify(response.status);
      // console.log(resp);
      // if (resp == 200) {
      //   this.dialog = true;
      //   this.message = "Vendedor se tornou Indisponível!";
      //   this.retrieveVendedorDispo();
      //   this.retrieveVendedorInd();
      //   document.location.reload(true);
      // }
    },
    async editar_placa() {
      const id = this.edit_id;
      const placa_avaliacao = this.placa_av;
      const response = await fetch(
        `${process.env.VUE_APP_API_URL}editar_placa/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            placa_avaliacao: placa_avaliacao,
          }),
        }
      );
      const resp = JSON.stringify(response.status);
      console.log(resp);
      if (resp == 200) {
        this.dialog = true;
        this.message = "Placa atualizada com sucesso!";
        this.retrieveVendedorDispo();
        this.retrieveVendedorInd();
        document.location.reload(true);
      }
    },

    //Buscar dados no banco de dados vendedores indisponiveis
    getRequestParams_ind(searchTitle, page_ind, pageSize_ind, empresa_id) {
      let params = {};
      if (searchTitle) {
        params["nome"] = searchTitle;
      }
      if (page_ind) {
        params["page"] = page_ind - 1;
      }
      if (pageSize_ind) {
        params["size"] = pageSize_ind;
      }
      if (empresa_id) {
        params["empresa_id"] = empresa_id;
      }
      return params;
    },
    handlePageChange_ind(value) {
      this.page_ind = value;
      this.retrieveVendedorInd();
    },
    handlePageSizeChange_ind(size) {
      this.pageSize_ind = size;
      this.page_ind = 1;
      this.retrieveVendedorInd();
    },
    async retrieveVendedorInd() {
      try {
        const params = this.getRequestParams_ind(
          this.searchTitle,
          this.page_ind,
          this.pageSize_ind,
          this.empresa_id
        );
        userService.getVendedorInd(params).then((response) => {
          const { users, totalPages } = response.data;

          this.totalPages_ind = totalPages;

          var array_1 = [];
          var array_2 = [];

          for (var i = 0; i < users.length; i++) {
            let status_vendedor = users[i]["status_vendedor"];
            //let tipo_vendedor = users[i]["tipo_vendedor"];

            if (status_vendedor == 0) {
              status_vendedor = "Vendedor em Atendimento";
            }

            // if (tipo_vendedor == 0) {
            //   tipo_vendedor = "Veículos Usados";
            // } else if (tipo_vendedor == 1) {
            //   tipo_vendedor = "Veículos Novos";
            // }

            array_1 = {
              id: users[i]["id"],
              username: users[i]["username"],
              email: users[i]["email"],
              empresa_id: users[i]["empresa_id"],
              id_userCad: users[i]["id_userCad"],
              prioridade_vendedor: users[i]["prioridade_vendedor"],
              status: users[i]["status"],
              status_vendedor: status_vendedor,
              //tipo_vendedor: tipo_vendedor,
            };
            array_2.push(array_1);
          }
          this.usuarios_ind = array_2;
          console.log("Vendedores Ind");
          console.log(response.data);
        }).catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
      } catch (error) {
        console.log(error)
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },

    //Buscar dados no banco de dados vendedores disponiveis
    getRequestParams_disp(searchTitle, page_disp, pageSize_disp, empresa_id) {
      let params = {};
      if (searchTitle) {
        params["nome"] = searchTitle;
      }
      if (page_disp) {
        params["page"] = page_disp - 1;
      }
      if (pageSize_disp) {
        params["size"] = pageSize_disp;
      }
      if (empresa_id) {
        params["empresa_id"] = empresa_id;
      }
      return params;
    },
    handlePageChange_disp(value) {
      this.page_disp = value;
      this.retrieveVendedorDispo();
    },
    handlePageSizeChange_disp(size) {
      this.pageSize_disp = size;
      this.page_disp = 1;
      this.retrieveVendedorDispo();
    },
    async retrieveVendedorDispo() {
      try {
        const params = this.getRequestParams_disp(
          this.searchTitle,
          this.page_disp,
          this.pageSize_disp,
          this.empresa_id
        );
        userService.getVendedorDispo(params).then((response) => {
          const { users, totalPages } = response.data;

          this.totalPages_disp = totalPages;

          var array_1 = [];
          var array_2 = [];

          for (var i = 0; i < users.length; i++) {
            let status_vendedor = users[i]["status_vendedor"];
            //let tipo_vendedor = users[i]["tipo_vendedor"];

            if (status_vendedor == 1) {
              status_vendedor = "Disponível para atendimento!";
            } else if (status_vendedor == 3) {
              status_vendedor = "Indisponível para atendimento!";
            }
            // if (tipo_vendedor == 1) {
            //   tipo_vendedor = "Veículos Usados";
            // } else if (tipo_vendedor == 2) {
            //   tipo_vendedor = "Veículos Novos";
            // }

            array_1 = {
              id: users[i]["id"],
              username: users[i]["username"],
              email: users[i]["email"],
              empresa_id: users[i]["empresa_id"],
              id_userCad: users[i]["id_userCad"],
              prioridade_vendedor: users[i]["prioridade_vendedor"],
              status: users[i]["status"],
              status_vendedor: status_vendedor,
              //tipo_vendedor: tipo_vendedor,
            };
            array_2.push(array_1);
          }
          this.usuarios_dispo = array_2;
          console.log(response.data);
        }).catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
      } catch (error) {
        console.log(error)
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },

    //Buscar dados no banco de dados Proposta
    getRequestParams(searchTitle, page, pageSize, empresa_id, status_proposta) {
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
      if (status_proposta) {
        params["status_proposta"] = status_proposta
      }
      return params;
    },
    handlePageChangeProposta(value) {
      this.page = value;
      this.retrievePropostas();
    },
    handlePageSizeChangeProposta(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrievePropostas();
    },

    async retrievePropostas() {
      try {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize,
          this.empresa_id,
          this.status_proposta,
        );

        userService.getPropostaMenu(params).then((response) => {
          this.status_proposta = "";
          const { propostas, totalPages } = response.data;
          this.proposta = propostas;
          this.totalPages = totalPages;
          console.log("Dados da Proposta")
          console.log(this.proposta);
          console.log(response.data)
        }).catch((error) => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })

      } catch (error) {
        console.log(error)
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
  },
};
</script>
