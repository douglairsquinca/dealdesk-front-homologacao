<template lang="pt-br">
    <SidebarVue ref="sidebar" />
    <NavgatorFI ref="navgator" :barraTitulo="' F&I - Kits'" :titulo="'kits'"/>
    <div class="card card-filtro">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Dados do kit</span></i>         
        </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="pageSize" @change="handlePageSizeChange(pageSize)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
            <label class="rf_texto">Pacote</label>
          </div>
        </div>      
        <div class="col-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="pageSize" @change="handlePageSizeChange(pageSize)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
            <label class="rf_texto">Modelo</label>
          </div>
        </div>   
        <div class="col">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Descrição</label>
          </div>
        </div> 
        
        <div class="col-2">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="pageSize" @change="handlePageSizeChange(pageSize)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
            <label class="rf_texto">Status</label>
          </div>
        </div>   
        <div class="col-2 ">
          <div class="input-group-append">
            <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; retrievePropostas();">
             <span class="rf_texto_btn">Cadastrar</span>
            </button>
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
                <button class="btn btn-lg btn-filtro" data-bs-target="#ModalItensAcessorios" data-bs-toggle="modal" type="button" @click="habilitar_itens_acessorio">
                  <span class="rf_texto_btn">Incluir</span><br>
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
                <button class="btn btn-lg btn-filtro"  data-bs-target="#ModalItensSeguros" data-bs-toggle="modal" type="button" @click="habilitar_itens_seguros">
                <span class="rf_texto_btn">Incluir</span><br>
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
                <button class="btn btn-lg btn-filtro" data-bs-target="#ModalItensRevisao" data-bs-toggle="modal" type="button" @click="habilitar_itens_revisao">
                  <span class="rf_texto_btn">Incluir</span><br>
                  <span class="rf_texto_btn">Revisão</span>
                </button>
              </div>
            </div>              
          </div>
        </div>
      </div>
    </div>

    <div class="card card-tabela g-2 p-2 rf_margin">
      <div class="card-title gy-4">
        <i class="bi bi-tools fs-5 icone_kit"><span class="texto_kit">Acessórios</span></i>         
      </div>
      <table class="table rf_texto">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Descrição</th>  
            <th scope="col">Preço</th>
            <th scope="col">Preço Desconto</th>
            <th scope="col">Preço Ajustado</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0BE12T0001</td>
            <td>SOLEIRA ILUMINADA</td>
            <td>R$ 1.813,32</td>  
            <td>R$ 1.541,32</td>  
            <td>R$ 1.540,00</td>  
            <td>          
              <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_empresa(item)">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>    
          <tr>
            <td>0BE12T0001</td>
            <td>SOLEIRA ILUMINADA</td>
            <td>R$ 1.813,32</td>  
            <td>R$ 1.541,32</td>  
            <td>R$ 1.540,00</td>  
            <td>          
              <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_empresa(item)">
                <i class="bi bi-trash3"></i>
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
      <div class="card-title gy-4">
        <i class="bi bi-journal-text fs-5 icone_kit"><span class="texto_kit">Seguros</span></i>         
      </div>
      <table class="table rf_texto">
        <thead>
          <tr>          
            <th scope="col">Código</th>   
            <th scope="col">Descrição</th>             
            <th scope="col">Preço</th>
            <th scope="col">Preço Desconto</th>
            <th scope="col">Preço Ajustado</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>            
            <td>0000000001</td>
            <td>DESCRIÇÃO DO SEGURO</td>
            <td>R$ 750,00</td>  
            <td>R$ 637,00</td>  
            <td>R$ 630,00</td>  
            <td>          
              <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_empresa(item)">
                <i class="bi bi-trash3"></i>
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
      <div class="card-title gy-4">
        <i class="bi bi-speedometer2 fs-5 icone_kit"><span class="texto_kit">Revisão Programada</span></i>         
      </div>
      <table class="table rf_texto">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Descrição</th>  
            <th scope="col">Preço</th>
            <th scope="col">Preço Desconto</th>
            <th scope="col">Preço Ajustado</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0000000001</td>
            <td>DESCRIÇÃO DA REVISÃO</td>
            <td>R$ 1.250,00</td>  
            <td>R$ 1.062,50</td>  
            <td>R$ 1.060,00</td>  
            <td>          
              <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_empresa(item)">
                <i class="bi bi-trash3"></i>
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
      <div class="row g-2 p-2">
        <div class="col-md-5 rf_texto_tabela"><strong>Total</strong></div>
        <div class="col-md-2 rf_texto_tabela"><strong>R$ 5.723,57</strong></div>
        <div class="col-md-2 rf_texto_tabela"><strong>R$ 4.865,03</strong></div>
        <div class="col-md-2 rf_texto_tabela"><strong>R$ 4.840,00</strong></div>
      </div>
    </div>

    <!--Modal Acessórios-->
    <div class="modal fade" id="ModalItensAcessorios" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content card-container rf_texto">
          <div class="modal-header">
            <div class="card-title gy-4">
              <i class="bi bi-tools fs-5 icone_kit"><span class="texto_kit">Itens Acessórios</span></i>         
            </div>
            <button class="btn btn-modal btn-lg p-1 mt-1" type="button" data-bs-target="#ModalProposta"
              data-bs-toggle="modal" aria-label="Close"> Sair </button>
          </div>
          <div class="modal-body">
            <div class="">
              <div class="card">
                <div class="row g-2 p-2">
                  <div class="card-title gy-4">
                    <i class="bi bi-funnel fs-5 icone_filtro"><span class="texto_filtro">Filtro</span></i>         
                  </div>
                </div>
                <div class="row g-2 p-2">
                  
                  <div class="col-2">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
                      <label class="rf_texto">Código</label>
                    </div>
                  </div>     
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
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
            <div class="card  g-2 p-2 mt-2">
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
                  <tr>
                    <td>Garantia Extendida</td>
                    <td>NEW CITY SEDAN</td>
                    <td>R$ 2.000,00</td>                  
                    <td>          
                      <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        @click="editar_empresa(item)">
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

    <!--Modal Seguros-->
    <div class="modal fade" id="ModalItensSeguros" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content card-container rf_texto">
          <div class="modal-header">
            <div class="card-title gy-4">
              <i class="bi bi-journal-text fs-5 icone_kit"><span class="texto_kit">Itens Seguros</span></i>         
            </div>
            <button class="btn btn-modal btn-lg p-1 mt-1" type="button" data-bs-target="#ModalProposta"
              data-bs-toggle="modal" aria-label="Close"> Sair </button>
          </div>
          <div class="modal-body">
            <div class="">
              <div class="card">
                <div class="row g-2 p-2">
                  <div class="card-title gy-4">
                    <i class="bi bi-funnel fs-5 icone_filtro"><span class="texto_filtro">Filtro</span></i>         
                  </div>
                </div>
                <div class="row g-2 p-2">                 
                    
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
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
            <div class="card  g-2 p-2 mt-2">
              <table class="table rf_texto">
                <thead>
                  <tr>                   
                    <th scope="col">Descrição</th>
                    <th scope="col">Preço Final</th>            
                    <th scope="col">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Garantia Extendida</td>                  
                    <td>R$ 2.000,00</td>                  
                    <td>          
                      <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        @click="editar_empresa(item)">
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
      <div class="modal fade" id="ModalItensRevisao" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content card-container rf_texto">
          <div class="modal-header">
            <div class="card-title gy-4">
              <i class="bi bi-speedometer2 fs-5 icone_kit"><span class="texto_kit">Itens Revisão Programada</span></i>         
            </div>
            <button class="btn btn-modal btn-lg p-1 mt-1" type="button" data-bs-target="#ModalProposta"
              data-bs-toggle="modal" aria-label="Close"> Sair </button>
          </div>
          <div class="modal-body">
            <div class="">
              <div class="card">
                <div class="row g-2 p-2">
                  <div class="card-title gy-4">
                    <i class="bi bi-funnel fs-5 icone_filtro"><span class="texto_filtro">Filtro</span></i>         
                  </div>
                </div>
                <div class="row g-2 p-2">                 
                    
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
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
            <div class="card  g-2 p-2 mt-2">
              <table class="table rf_texto">
                <thead>
                  <tr>                   
                    <th scope="col">Descrição</th>
                    <th scope="col">Preço Final</th>            
                    <th scope="col">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Garantia Extendida</td>                  
                    <td>R$ 2.000,00</td>                  
                    <td>          
                      <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        @click="editar_empresa(item)">
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
    RodapeVue
  },
  data() {
    return {
      modal_itens_acessorios: false,
      modal_itens_seguros: false,
      modal_itens_revisao: false,
    }
  },
  methods: {
    habilitar_itens_acessorio() {
      this.modal_itens_acessorios = true;
    },
    habilitar_itens_seguro() {
      this.modal_itens_seguros = true;
    },
    habilitar_itens_revisao() {
      this.modal_itens_revisao = true;
    },
  }
}
</script>