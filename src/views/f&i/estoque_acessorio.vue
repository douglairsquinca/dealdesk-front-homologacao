<template lang="pt-br">
    <SidebarVue ref="sidebar" />
    <NavgatorFI ref="navgator" :barraTitulo="' F&I - Estoque Acessórios'" :titulo="'estoque'"/>


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
        <div class="col-5">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroPlaca" @input="filtrarVeiculos" />
            <label class="rf_texto">Descrição</label>
          </div>
        </div>
        <div class="col-4">
          <div class="form-floating">
            <input type="text" class="form-control rf_bg_form rf_texto" v-model="filtroNumero" @input="filtrarVeiculos" />
            <label class="rf_texto">Empresa</label>
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

        <div class="col-1 d-flex justify-content-end">
          <div class="input-group-append">
            <button class="btn btn-lg btn-filtro" type="button" @click="page = 1; retrievePropostas();">
             <i class="bi bi-arrow-repeat texto_filtro_btn"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-tabela">
      <table class="table rf_texto">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Descrição</th>
            <th scope="col">Empresa</th>
            <th scope="col">Saldo Disponível</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>00000</td>
            <td>Teste</td>
            <td>Castelo</td>
            <td>10</td>
          </tr>
          <tr>
            <td>00000</td>
            <td>Teste</td>
            <td>Castelo</td>
            <td>10</td>
          </tr>
          <tr>
            <td>00000</td>
            <td>Teste</td>
            <td>Castelo</td>
            <td>10</td>
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