<template lang="pt-br">
    <SidebarVue ref="sidebar" />
    <NavgatorFI ref="navgator" :barraTitulo="' F&I - Pacotes'" :titulo="'pacotes'"/>
    <div class="card card-filtro">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Dados do Pacote</span></i>         
        </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col-8">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Descrição</label>
          </div>
        </div> 
        <div class="col-2">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroNumero" @input="filtrarVeiculos" />
            <label class="rf_texto">% Desconto</label>
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
      </div>
      <div class="row g-2 p-2">
        <div class="col">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Observação</label>
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
   <div class="card card-filtro">
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
        
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="pageSize" @change="handlePageSizeChange(pageSize)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
            <label class="rf_texto">Itens pág.</label>
          </div>
        </div>
        <div class="col-2 ">
          <div class="input-group-append">
            <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; retrievePropostas();">
             <span class="rf_texto_btn">Pesquisar</span>
            </button>
          </div>
        </div>
        
      </div>
    </div>

    <div class="card card-tabela g-2 p-2 rf_margin">
      <table class="table rf_texto">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">% Desconto</th>  
            <th scope="col">Status</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PACOTE OURO</td>
            <td>15</td>
            <td>Habilitado</td>  
            <td>          
              <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_empresa(item)">
                <i class="bi bi-pencil-square"></i>
              </button>
            </td>
          </tr>    
          <tr>
            <td>PACOTE PRATA</td>
            <td>10</td>
            <td>Habilitado</td>  
            <td>          
              <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_empresa(item)">
                <i class="bi bi-pencil-square"></i>
              </button>
            </td>
          </tr>   
          <tr>
            <td>PACOTE BRONZE</td>
            <td>5</td>
            <td>Habilitado</td>  
            <td>          
              <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_empresa(item)">
                <i class="bi bi-pencil-square"></i>
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
}
</script>