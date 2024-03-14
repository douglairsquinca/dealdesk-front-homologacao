<template lang="pt-br">
  <SidebarVue ref="sidebar" />
  <NavgatorFI ref="navgator" :barraTitulo="' F&I - Acessórios'" :titulo="'acessórios'"/>
  <div class="card card-filtro">
      <div class="row g-2 p-2">
        <div class="card-title gy-4">
          <i class="bi bi-journal-text fs-5 icone_filtro"><span class="texto_filtro">Dados do Acessório</span></i>         
        </div>
      </div>
      <div class="row g-2 p-2">
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Item</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <select class="form-select rf_bg_form rf_texto" v-model="pageSize" @change="handlePageSizeChange(pageSize)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
            <label class="rf_texto">Cortesia</label>
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
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Código</label>
          </div>
        </div>
        <div class="col-6">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroNumero" @input="filtrarVeiculos" />
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
            <label class="rf_texto">Mão de Obra</label>
          </div>
        </div>        
      </div>
      <div class="row g-2 p-2">
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Preço Base</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Tmo Instalação</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Tmo Pintura</label>
          </div>
        </div>
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Preço Final</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Observação</label>
          </div>
        </div>
        <div class="col-1">
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
        <div class="col-1">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Código</label>
          </div>
        </div>
        <div class="col-8">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Descrição</label>
          </div>
        </div>
        <div class="col-2">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroNumero" @input="filtrarVeiculos" />
            <label class="rf_texto">Modelo</label>
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

        
      </div>
    </div>

    <div class="card card-tabela g-2 p-2 rf_margin">
      <table class="table rf_texto">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Descrição</th>
            <th scope="col">Modelo</th>
            <th scope="col">Preço Base</th>
            <th scope="col">Preço Final</th>
            <th scope="col">Status</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>00001</td>
            <td>Luminária</td>
            <td>CIVIC</td>
            <td>R$ 120,00</td>
            <td>R$ 200,00</td>
            <td>Habilitado</td>

            <td>          
              <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_empresa(item)">
                <i class="bi bi-pencil-square"></i>
              </button>
            </td>
          </tr>    
          <tr>
            <td>00001</td>
            <td>Luminária</td>
            <td>CIVIC</td>
            <td>R$ 120,00</td>
            <td>R$ 200,00</td>
            <td>Habilitado</td>

            <td>          
              <button class="dropdown-toggle-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editar_empresa(item)">
                <i class="bi bi-pencil-square"></i>
              </button>
            </td>
          </tr>    
          <tr>
            <td>00001</td>
            <td>Luminária</td>
            <td>CIVIC</td>
            <td>R$ 120,00</td>
            <td>R$ 200,00</td>
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
    RodapeVue,
  },
};
</script>
