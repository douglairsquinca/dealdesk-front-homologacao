<template>
  <div>
    <SidebarVue />
    <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
      <div class="container-fluid">
        <div><i class="bi bi-sliders fs-5"> Relatório Mensal - Desk </i></div>
        <div>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link class="nav-link active rf_texto" to="/desk/index">Fechar Menu</router-link>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    <!--Tabelas-->
    <div class="card rf_bg_form g-2 p-2 rf_margin">
      <div class="col-2">
        <div class="mt-2">
          <span class="rf_texto">Escolha o tipo de Relatório</span>
          <div class="input-group mt-2">
            <select class="form-select" v-model="selectedRelatorio" @change="selecionarRelatorios()">
              <option value="venda_conversao">Conversão de Vendas</option>
              <option value="venda_perdida">Vendas Perdidas</option>
              <option value="venda_modelo">Vendas por Modelo</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div v-if="selectedRelatorio === 'venda_conversao' || selectedRelatorio === 'venda_modelo'">
            <label class="text-info p-2">Conversão por:</label>
            <div class="d-flex justify-content-between mb-3">
              <div class="p-2 rf_texto">
                <div class="form-check form-check-inline" v-for="(item) in tipo_conversao" :key="item.value">
                  <input class="form-check-input" type="radio" :id="item.value" :value="item.value"
                    v-model="selectedTipoConversao">
                  <label class="form-check-label" :for="item.value">{{ item.nome }}</label>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="mt-2">
            <span class="rf_texto">Referência</span>
            <div class="input-group mt-2">
              <select class="form-select" v-model="selectedFilter" @change="filtarRelatorios()">
                <option value="hoje">Hoje</option>
                <option value="ontem">Ontem</option>
                <option value="mes_atual">Mês Atual</option>
                <option value="mes_anterior">Mês Anterior</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="mt-2">
            <div v-if="selectedFilter === 'personalizado'">
              <span class="rf_texto">Selecione as datas</span>
              <div class="input-group mt-2">
                <input type="date" class="form-control" v-model="startDate" />
                <span class="input-group-text">até</span>
                <input type="date" class="form-control" v-model="endDate" />
                <!-- <button class="btn btn-secondary" @click="filterByPeriod">Filtrar</button> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <label class="text-info p-2">Lojas</label>
          <div class="d-flex justify-content-between mb-1">
            <div class="p-2 rf_texto">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="checkboxTodos" v-model="marcarTodos">
                <label class="form-check-label" for="checkboxTodos">Marcar Todos</label>
              </div>
              <div class="form-check form-check-inline" v-for="item in lista_empresas" :key="item.id">
                <input class="form-check-input" type="checkbox" :id="item.id" :value="item.id" v-model="selectedEmpresas">
                <label class="form-check-label" :for="item.id">{{ item.nome }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <label class="text-info p-2">Veículos:</label>
          <div class="d-flex justify-content-between mb-1">
            <div class="p-2 rf_texto">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" :id="'checkboxTodosVeiculos'"
                  v-model="marcarTodosVeiculos">
                <label class="form-check-label" :for="'checkboxTodosVeiculos'">Ambos</label>
              </div>
              <div class="form-check form-check-inline" v-for="item in tipo_veiculo" :key="item.value">
                <input class="form-check-input" type="checkbox" :id="item.value" :value="item.value"
                  v-model="selectedTipoVeiculo">
                <label class="form-check-label" :for="item.value">{{ item.nome }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group p-2">
            <button class="btn btn-secondary btn-block mt-2 " @click="selectedRelatorio === 'venda_conversao' ? relatorio_conversao_vendas() :
              selectedRelatorio === 'venda_perdida' ? relatorio_venda_perdida() :
                selectedRelatorio === 'venda_modelo' ? relatorio_venda_modelo() :
                  null">
              <span>Pesquisar</span>
            </button>
          </div>
        </div>
      </div>
      
      <table id="tabela_conversao" class="table border-dark rf_texto mt-2 " v-if="selectedRelatorio === 'venda_conversao'" ref="contentToPrint">       
        <thead>
          <tr>
            <th scope="col" class="rf_header_table">
              <button class="btn btn-secondary  mt-2  rf_btn" v-if="selectedRelatorio === 'venda_conversao'" @click="exportToXLSX">
               
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-xlsx" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM7.86 14.841a1.13 1.13 0 0 0 .401.823c.13.108.29.192.479.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.002 1.002 0 0 0-.375-.357 2.028 2.028 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.093 1.093 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.777.15-.224.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.558.558 0 0 1-.255.193c-.111.047-.25.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.249-.115.578.578 0 0 1-.255-.384h-.764Zm-3.726-2.909h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Zm1.923 3.325h1.697v.674H5.266v-3.999h.791v3.325Zm7.636-3.325h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z"/>
               </svg>
               XLSX
             </button>
             <button class="btn btn-secondary  mt-2 rf_btn" v-if="selectedRelatorio === 'venda_conversao'" data-bs-toggle="modal" data-bs-target="#ModalConversao">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/>
               </svg>
               PDF
             </button>
            </th>
            <th scope="col" class="rf_header_table">Novos</th>
            <th scope="col" class="rf_header_table"></th>
            <th scope="col" class="rf_header_table"></th>

            <th scope="col" class="rf_header_table">Usados</th>
            <th scope="col" class="rf_header_table"></th>
            <th scope="col" class="rf_header_table"></th>

            <th scope="col" class="rf_header_table">Total</th>            
            <th scope="col" class="rf_header_table"></th>            
          
            <th scope="col" class="rf_header_table"></th>
          </tr>
          <tr>
            <th scope="col" class="rf_header_table">{{ filtroSelecionadoLabel }}</th>
            <!--Bloco veiculos novos-->
            <th scope="col" class="rf_header_table">Atendimento</th>
            <th scope="col" class="rf_header_table">Vendas</th>
            <th scope="col" class="rf_header_table">%</th>
            <!--Bloco veiculos usados-->
            <th scope="col" class="rf_header_table">Atendimento</th>
            <th scope="col" class="rf_header_table">Vendas</th>
            <th scope="col" class="rf_header_table">%</th>
            <!--Bloco todos-->
            <th scope="col" class="rf_header_table">Atendimento</th>
            <th scope="col" class="rf_header_table">Vendas</th>
            <th scope="col" class="rf_header_table">%</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in conversao_vendas" :key="item.id">
            <td class="rf_header_table">{{ item.Descricao }}</td>
            <!--Bloco veiculos novos-->
            <td class="rf_header_table">{{ item.QuantidadeAtendimentosNovos }}</td>
            <td class="rf_header_table">{{ item.QuantidadeVendasNovos }}</td>
            <td class="rf_header_table">{{ (item.ConversaoNovos) }}</td>
            <!--Bloco veiculos usados-->
            <td class="rf_header_table">{{ item.QuantidadeAtendimentosUsados }}</td>
            <td class="rf_header_table">{{ item.QuantidadeVendasUsados }}</td>
            <td class="rf_header_table">{{ (item.ConversaoUsados) }}</td>
            <!--Bloco todos-->
            <td class="rf_header_table">{{ item.QuantidadeAtendimentos }}</td>
            <td class="rf_header_table">{{ item.QuantidadeVendas }}</td>
            <td class="rf_header_table">{{ (item.Conversao) }}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th scope="col" class="rf_header_table">Total</th>
            <th scope="col" class="rf_header_table">{{ this.total_atendimentosNovos }}</th>
            <th scope="col" class="rf_header_table">{{ this.total_vendasNovos }}</th>
            <th scope="col" class="rf_header_table">{{ (this.total_conversao_percNovos) }}</th>

            <th scope="col" class="rf_header_table">{{ this.total_atendimentosUsados }}</th>
            <th scope="col" class="rf_header_table">{{ this.total_vendasUsados }}</th>
            <th scope="col" class="rf_header_table">{{ (this.total_conversao_percUsados) }}</th>

            <th scope="col" class="rf_header_table">{{ this.total_atendimentos }}</th>
            <th scope="col" class="rf_header_table">{{ this.total_vendas }}</th>
            <th scope="col" class="rf_header_table">{{ (this.total_conversao_perc) }}</th>
          </tr>
        </thead>
      </table>

     
      <table  class="table border-dark rf_texto mt-2" v-if="selectedRelatorio === 'venda_perdida'" id="VendaPerdida">
        
        <thead>
          <tr >
            <th scope="col" class="rf_header_table">
              <button class="btn btn-secondary mt-2 rf_btn" v-if="selectedRelatorio === 'venda_perdida'" @click="exportToXLSX_perdida">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-xlsx" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM7.86 14.841a1.13 1.13 0 0 0 .401.823c.13.108.29.192.479.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.002 1.002 0 0 0-.375-.357 2.028 2.028 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.093 1.093 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.777.15-.224.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.558.558 0 0 1-.255.193c-.111.047-.25.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.249-.115.578.578 0 0 1-.255-.384h-.764Zm-3.726-2.909h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Zm1.923 3.325h1.697v.674H5.266v-3.999h.791v3.325Zm7.636-3.325h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z"/>
               </svg>
               XLSX
              </button>              
            </th>      
            <th scope="col" class="rf_header_table">
              <button class="btn btn-secondary mt-2 rf_btn" v-if="selectedRelatorio === 'venda_perdida'"  data-bs-toggle="modal" data-bs-target="#ModalVendaPerdida">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/>
               </svg>
               PDF
              </button>
            </th>
            <th></th>     
            <th></th>     
            <th></th>     
            <th></th>     
            <th></th>     
            <th></th>     
            <th></th>     
            <th></th>     
            <th></th>     
            <th></th>     
          </tr>
          <tr>
            <th scope="col" class="rf_header_table">Loja</th>
            <th scope="col" class="rf_header_table">Atendente</th>
            <th scope="col" class="rf_header_table">Data</th>
            <th scope="col" class="rf_header_table">Hora</th>
            <th scope="col" class="rf_header_table">Vendedor</th>
            <th scope="col" class="rf_header_table">Cliente</th>
            <th scope="col" class="rf_header_table">Telefone</th>
            <th scope="col" class="rf_header_table">Telefone 2</th>

            <th scope="col" class="rf_header_table">Motivo da Perda</th>
            <th scope="col" class="rf_header_table">Veículo</th>
            <th scope="col" class="rf_header_table">Categoria</th>
            <th scope="col" class="rf_header_table">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in vendas_perdidas" :key="item.id">
            <td class="rf_header_table">{{ item.loja }}</td>
            <td class="rf_header_table">{{ item.atendente }}</td>
            <td class="rf_header_table">{{ formattedCreatedAt(item.data) }}</td>
            <td class="rf_header_table">{{ formattedHoras(item.inicio_atendimento) }}</td>
            <td class="rf_header_table">{{ item.vendedor }}</td>
            <td class="rf_header_table">{{ item.cliente }}</td>
            <td class="rf_header_table">{{ item.telefone }}</td>
            <td class="rf_header_table">{{ item.telefone2 }}</td>
            <td class="rf_header_table">{{ item.motivo_perda }}</td>
            <td class="rf_header_table">{{ item.veiculo }}</td>
            <td class="rf_header_table">{{ item.tipo_veiculo }}</td>
            <td class="rf_header_table">{{ item.valor }}</td>

          </tr>
        </tbody>
      </table>

     
      <table id="tabela_venda_modelo" class="table border-dark rf_texto mt-2" v-if="selectedRelatorio === 'venda_modelo'">        
        <thead>
          <tr >
            <th scope="col" class="rf_header_table">
              <button class="btn btn-secondary mt-2 rf_btn"  v-if="selectedRelatorio === 'venda_modelo'" @click="exportToXLSX_modedlo">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-xlsx" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM7.86 14.841a1.13 1.13 0 0 0 .401.823c.13.108.29.192.479.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.002 1.002 0 0 0-.375-.357 2.028 2.028 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.093 1.093 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.777.15-.224.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.558.558 0 0 1-.255.193c-.111.047-.25.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.249-.115.578.578 0 0 1-.255-.384h-.764Zm-3.726-2.909h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Zm1.923 3.325h1.697v.674H5.266v-3.999h.791v3.325Zm7.636-3.325h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z"/>
               </svg>
               XLSX
              </button>   
              <button class="btn btn-secondary mt-2 rf_btn"  v-if="selectedRelatorio === 'venda_modelo'"  data-bs-toggle="modal" data-bs-target="#ModalVendaModelo">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/>
               </svg>
               PDF
              </button>           
            </th>      
            <th></th>
            <th></th>     
            <th></th>  
        
       
          </tr>
          <tr>
            <th scope="col" class="rf_header_table">{{ filtroSelecionadoLabel }}</th>
            <th scope="col" class="rf_header_table">Modelo</th>
            <th scope="col" class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">Valor</th>
            <th scope="col" class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">Cliente</th>
            <th scope="col" class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">Telefone</th>
            <th scope="col" class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">Loja</th>
            <th scope="col" class="rf_header_table" v-if="filtroSelecionadoLabel == 'Loja'">Vendas</th>
            <th></th>  
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in vendas_modelo" :key="item.id">
            <td class="rf_header_table">{{ item.Descricao }}</td>
            <td class="rf_header_table">{{ item.Modelo }}</td>
            <td class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">{{ this.currency(item.Valor) }}</td>
            <td class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">{{ item.Cliente }}</td>
            <td class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">{{ item.Telefone }}</td>
            <td class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">{{ item.Loja }}</td>
            <td class="rf_header_table" v-if="filtroSelecionadoLabel == 'Loja'">{{ item.QuantidadeVendas }}</td>
            <th></th>  
          </tr>
        </tbody>
        <thead>
          <tr>
            <th scope="col" class="rf_header_table">Total</th>
            <th scope="col" class="rf_header_table"></th>
            <th scope="col" class="rf_header_table">{{ this.total_vendas_modelo }}</th>
            <th scope="col" class="rf_header_table"></th>
          </tr>
        </thead>
      </table>

      <!--Modal Conversão de Vendas-->
      <div class="modal fade" id="ModalConversao" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
          <div class="modal-dialog modal-fullscreen rf_modal">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                  BeniDesk
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class=" mt-3 rf_texto_pdf" ref="contentToPrintConversao">
                  <div class="col">
                    <div class="row g-2 p-2">
                      <div class="col-12">                    
                          <div class="card-header rf_card_header"> Conversão de Vendas</div>
                          <div class="rf_card_pdf">
                          <table id="tabela_conversao" class="table  table-striped mt-2 " v-if="selectedRelatorio === 'venda_conversao'" ref="contentToPrint">       
                            <thead>
                              <tr>
                                <th scope="col" class="rf_header_table"></th>
                                <th scope="col" class="rf_header_table">Novos</th>
                                <th scope="col" class="rf_header_table"></th>
                                <th scope="col" class="rf_header_table"></th>

                                <th scope="col" class="rf_header_table">Usados</th>
                                <th scope="col" class="rf_header_table"></th>
                                <th scope="col" class="rf_header_table"></th>

                                <th scope="col" class="rf_header_table">Total</th>
                                <th scope="col" class="rf_header_table"></th>
                                <th scope="col" class="rf_header_table"></th>
                                <th scope="col" class="rf_header_table"></th>
                              </tr>
                              <tr>
                                <th scope="col" class="rf_header_table">{{ filtroSelecionadoLabel }}</th>
                                <!--Bloco veiculos novos-->
                                <th scope="col" class="rf_header_table">Atendimento</th>
                                <th scope="col" class="rf_header_table">Vendas</th>
                                <th scope="col" class="rf_header_table">%</th>
                                <!--Bloco veiculos usados-->
                                <th scope="col" class="rf_header_table">Atendimento</th>
                                <th scope="col" class="rf_header_table">Vendas</th>
                                <th scope="col" class="rf_header_table">%</th>
                                <!--Bloco todos-->
                                <th scope="col" class="rf_header_table">Atendimento</th>
                                <th scope="col" class="rf_header_table">Vendas</th>
                                <th scope="col" class="rf_header_table">%</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in conversao_vendas" :key="item.id">
                                <td class="rf_header_table">{{ item.Descricao }}</td>
                                <!--Bloco veiculos novos-->
                                <td class="rf_header_table">{{ item.QuantidadeAtendimentosNovos }}</td>
                                <td class="rf_header_table">{{ item.QuantidadeVendasNovos }}</td>
                                <td class="rf_header_table">{{ (item.ConversaoNovos) }}</td>
                                <!--Bloco veiculos usados-->
                                <td class="rf_header_table">{{ item.QuantidadeAtendimentosUsados }}</td>
                                <td class="rf_header_table">{{ item.QuantidadeVendasUsados }}</td>
                                <td class="rf_header_table">{{ (item.ConversaoUsados) }}</td>
                                <!--Bloco todos-->
                                <td class="rf_header_table">{{ item.QuantidadeAtendimentos }}</td>
                                <td class="rf_header_table">{{ item.QuantidadeVendas }}</td>
                                <td class="rf_header_table">{{ (item.Conversao) }}</td>
                              </tr>
                            </tbody>
                            <thead>
                              <tr>
                                <th scope="col" class="rf_header_table">Total</th>
                                <th scope="col" class="rf_header_table">{{ this.total_atendimentosNovos }}</th>
                                <th scope="col" class="rf_header_table">{{ this.total_vendasNovos }}</th>
                                <th scope="col" class="rf_header_table">{{ (this.total_conversao_percNovos) }}</th>

                                <th scope="col" class="rf_header_table">{{ this.total_atendimentosUsados }}</th>
                                <th scope="col" class="rf_header_table">{{ this.total_vendasUsados }}</th>
                                <th scope="col" class="rf_header_table">{{ (this.total_conversao_percUsados) }}</th>

                                <th scope="col" class="rf_header_table">{{ this.total_atendimentos }}</th>
                                <th scope="col" class="rf_header_table">{{ this.total_vendas }}</th>
                                <th scope="col" class="rf_header_table">{{ (this.total_conversao_perc) }}</th>
                              </tr>
                            </thead>
                          </table>
                          </div>
                    
                      </div>

                    </div>
                  </div>        

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-target="#ModaProposta" data-bs-toggle="modal">
                  Fechar
                </button>
                <button class="btn btn-secondary" :disabled="btn_gerar_menu" @click="generatePdfConversao">IMPRIMIR</button>
              </div>
            </div>
          </div>
      </div>

      
      <!--Modal Vendas Perdidas-->
      <div class="modal fade" id="ModalVendaPerdida" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
          <div class="modal-dialog modal-fullscreen rf_modal">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                  BeniDesk
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class=" mt-3 rf_texto_pdf" ref="contentToPrintPerdidas">
                  <div class="col">
                    <div class="row g-2 p-2">
                      <div class="col-12">                    
                          <div class="card-header rf_card_header"> Vendas Perdidas</div>
                          <div class="rf_card_pdf">
                            <table  class="table table-striped  mt-2" v-if="selectedRelatorio === 'venda_perdida'" id="VendaPerdida">         
                              <thead>
                                <tr>
                                  <th scope="col" class="rf_header_table">Loja</th>
                                  <th scope="col" class="rf_header_table">Atendente</th>
                                  <th scope="col" class="rf_header_table">Data</th>
                                  <th scope="col" class="rf_header_table">Hora</th>
                                  <th scope="col" class="rf_header_table">Vendedor</th>
                                  <th scope="col" class="rf_header_table">Cliente</th>
                                  <th scope="col" class="rf_header_table">Telefone</th>
                                  <th scope="col" class="rf_header_table">Telefone 2</th>

                                  <th scope="col" class="rf_header_table">Motivo da Perda</th>
                                  <th scope="col" class="rf_header_table">Veículo</th>
                                  <th scope="col" class="rf_header_table">Categoria</th>
                                  <th scope="col" class="rf_header_table">Valor</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="item in vendas_perdidas" :key="item.id">
                                  <td class="rf_header_table">{{ item.loja }}</td>
                                  <td class="rf_header_table">{{ item.atendente }}</td>
                                  <td class="rf_header_table">{{ formattedCreatedAt(item.data) }}</td>
                                  <td class="rf_header_table">{{ formattedHoras(item.inicio_atendimento) }}</td>
                                  <td class="rf_header_table">{{ item.vendedor }}</td>
                                  <td class="rf_header_table">{{ item.cliente }}</td>
                                  <td class="rf_header_table">{{ item.telefone }}</td>
                                  <td class="rf_header_table">{{ item.telefone2 }}</td>
                                  <td class="rf_header_table">{{ item.motivo_perda }}</td>
                                  <td class="rf_header_table">{{ item.veiculo }}</td>
                                  <td class="rf_header_table">{{ item.tipo_veiculo }}</td>
                                  <td class="rf_header_table">{{ item.valor }}</td>

                                </tr>
                              </tbody>
                            </table>
                          </div>                    
                      </div>
                    </div>
                  </div>       

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-target="#ModaProposta" data-bs-toggle="modal">
                  Fechar
                </button>
                <button class="btn btn-secondary" :disabled="btn_gerar_menu" @click="generatePdfPerdida">IMPRIMIR</button>
              </div>
            </div>
          </div>
      </div>

      <!--Modal Vendas Modelo-->
      <div class="modal fade" id="ModalVendaModelo" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
          <div class="modal-dialog modal-fullscreen rf_modal">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                  BeniDesk
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class=" mt-3 rf_texto_pdf" ref="contentToPrint">
                  <div class="col">
                    <div class="row g-2 p-2">
                      <div class="col-12">                    
                          <div class="card-header rf_card_header"> Vendas por Modelo</div>
                          <div class="rf_card_pdf">
                            <table id="tabela_venda_modelo" class="table table-striped mt-2" v-if="selectedRelatorio === 'venda_modelo'">        
                              <thead>
                                <tr>
                                  <th scope="col" class="rf_header_table">{{ filtroSelecionadoLabel }}</th>
                                  <th scope="col" class="rf_header_table">Modelo</th>
                                  <th scope="col" class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">Valor</th>
                                  <th scope="col" class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">Cliente</th>
                                  <th scope="col" class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">Telefone</th>
                                  <th scope="col" class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">Loja</th>
                                  <th scope="col" class="rf_header_table" v-if="filtroSelecionadoLabel == 'Loja'">Vendas</th>

                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="item in vendas_modelo" :key="item.id">
                                  <td class="rf_header_table">{{ item.Descricao }}</td>
                                  <td class="rf_header_table">{{ item.Modelo }}</td>
                                  <td class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">{{ this.currency(item.Valor) }}</td>
                                  <td class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">{{ item.Cliente }}</td>
                                  <td class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">{{ item.Telefone }}</td>
                                  <td class="rf_header_table" v-if="filtroSelecionadoLabel !== 'Loja'">{{ item.Loja }}</td>
                                  <td class="rf_header_table" v-if="filtroSelecionadoLabel == 'Loja'">{{ item.QuantidadeVendas }}</td>
                                </tr>
                              </tbody>
                              <thead>
                                <tr>
                                  <th scope="col" class="rf_header_table">Total</th>
                                  <th scope="col" class="rf_header_table"></th>
                                  <th scope="col" class="rf_header_table">{{ this.total_vendas_modelo }}</th>
                                  <th scope="col" class="rf_header_table"></th>
                                </tr>
                              </thead>
                            </table>
                          </div>                    
                      </div>
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

      <!-- <pagination v-if="propostas_at.length" :offset="totalPages_4" :total="totalItems_4" :limit="pageSize_4"
          @change-page="handlePageChangeProposta" /> -->
    </div>

    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3"></ul>
      <p class="text-center rf_texto">© 2023 Rfmobi Solution</p>
    </footer>
  </div>
</template>
<script>

import SidebarVue from "../../components/menu/Sidebar.vue";
import axios from "axios";
import TokenService from "../../services/token.service";
import jwt_decode from 'jwt-decode';
import XLSX from 'xlsx/dist/xlsx.full.min';
import html2pdf from 'html2pdf.js';

export default {
  components: {
    SidebarVue,
  },
  data() {
    return {
      lucro_operacional: "",
      lucro_gerencial: "",
      lucro_financiamento: "",
      lucro_final: "",

      total_passagem_zero: "",
      total_passagem_zero_retorno: "",
      total_passagem_zero_novas: "",
      total_em_atendimento_zero: "",
      total_em_atendimento_zero_porcentagem: "",
      total_vendas_perdidas_zero: "",
      total_vendas_perdidas_zero_porcentagem: "",
      total_vendas_finalizadas_zero: "",
      total_vendas_finalizadas_zero_porcentagem: "",
      total_vendas_finalizadas_zero_novos: "",
      total_vendas_finalizadas_zero_novos_porcentagem: "",
      total_vendas_finalizadas_zero_retorno: "",
      total_vendas_finalizadas_zero_retorno_porcentagem: "",

      total_passagem_usado: "",
      total_passagem_usado_retorno: "",
      total_passagem_usado_novas: "",
      total_em_atendimento_usados: "",
      total_em_atendimento_usados_porcentagem: "",
      total_vendas_perdidas_usados: "",
      total_vendas_perdidas_usados_porcentagem: "",
      total_vendas_finalizadas_usado: "",
      total_vendas_finalizadas_usado_porcentagem: "",
      total_vendas_finalizadas_usado_novos: "",
      total_vendas_finalizadas_usado_novos_porcentagem: "",
      total_vendas_finalizadas_usado_retorno: "",
      total_vendas_finalizadas_usado_retorno_porcentagem: "",
      conversao_vendas: [],
      total_atendimentos: "",
      total_vendas: "",
      selectedFilter: 'hoje',
      startDate: '',
      endDate: '',

      //Dados do Login
      user_id: "",
      company_id: "",
      lista_empresas: [],
      selectedEmpresas: [],
      selectedEmpresasFiltradas: [],
      selectedEmpresasFiltradasIds: [],
      selectedTipoConversaoIds: [],
      selectedTipoVeiculoIds: [],
      marcarTodos: true,
      marcarTodosVeiculos: true,
      tipo_veiculo: [
        { nome: 'Novos', value: 0 },
        { nome: 'Usados', value: 1 }
      ],
      tipo_conversao: [],
      selectedTipoConversao: 1,
      selectedTipoVeiculo: [],
      marcarNovo: false,
      marcarUsado: false,
      referencia: "",
      filtroSelecionadoLabel: 'Loja',
      selectedRelatorio: 'venda_conversao',
      tipo_relatorio: 'venda_conversao',
      vendas_perdidas: [],
      vendas_modelo: [],
      total_vendas_modelo: '',
      total_convesao_perc: 0.00

    }
  },
  mounted() {
    this.getToken();
    this.getEmpresas();
    //this.propostas_mes()

  },
  watch: {
    marcarTodos(newVal) {
      if (newVal) {
        this.selectedEmpresas = this.lista_empresas.map(item => item.id);
      } else {
        this.selectedEmpresas = [];
      }
    },
    selectedEmpresas(newVal) {
      if (this.marcarTodos && newVal.length !== this.lista_empresas.length) {
        this.marcarTodos = false;
      }
    },
    marcarTodosVeiculos(newVal) {
      if (newVal) {
        this.selectedTipoVeiculo = this.tipo_veiculo.map(item => item.value);
      } else {
        this.selectedTipoVeiculo = [];
      }
    },
    selectedTipoVeiculo(newVal) {
      if (this.marcarTodosVeiculos && newVal.length !== this.tipo_veiculo.length) {
        this.marcarTodosVeiculos = false;
      }
    },
    selectedTipoConversao(newVal) {
      if (newVal == 1) {
        this.filtroSelecionadoLabel = 'Loja'
      } else if (newVal == 2) {
        this.filtroSelecionadoLabel = 'Vendedor'
      } else if (newVal == 3) {
        this.filtroSelecionadoLabel = 'Veículo'
      }
    },
    lista_empresas: {
      handler(newList) {

        this.selectedEmpresas = newList.map(item => item.id);
        this.selectedTipoVeiculo = [0, 1]
        //this.relatorio_conversao_vendas();
        this.propostas_mes();
      },
      immediate: true, // Para executar a função ao criar o componente
    },

  },
  created() {
    this.tipo_conversao = [
      { nome: 'Loja', value: 1 },
      { nome: 'Vendedor', value: 2 },
      { nome: 'Veículo', value: 3 }
    ]
  },
  methods: {

    exportToXLSX() {
      const table = document.getElementById('tabela_conversao');
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Dados');
      XLSX.writeFile(wb, 'conversao_vendas.xlsx');
    },

    exportToXLSX_perdida() {
      const table = document.getElementById('VendaPerdida');
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Dados');
      XLSX.writeFile(wb, 'venda_perdida.xlsx');
    },

    exportToXLSX_modelo() {
      const table = document.getElementById('tabela_venda_modelo');
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Dados');
      XLSX.writeFile(wb, 'venda_modelo.xlsx');
    },

    generatePdf() {
      console.log("Imprimir ----------------------------------------------------------------------------------------------------------------- 0001")
      const options = {
        margin: [0, 0],
        filename: 'relatorio_venda_modelo.pdf',
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
    generatePdfConversao() {
      console.log("Imprimir ----------------------------------------------------------------------------------------------------------------- 0001")
      const options = {
        margin: [0, 0],
        filename: 'relatorio_conversao.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: 'avoid-all' },
        enableLinks: true,

      };
      setTimeout(() => {
        html2pdf().from(this.$refs.contentToPrintConversao).set(options).save();
      }, 500);
      //html2pdf().from(this.$refs.contentToPrint).set(options).save();
    },

    generatePdfPerdida() {
      console.log("Imprimir ----------------------------------------------------------------------------------------------------------------- 0001")
      const options = {
        margin: [0, 0],
        filename: 'relatorio_venda_perdida.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: 'avoid-all' },
        enableLinks: true,

      };
      setTimeout(() => {
        html2pdf().from(this.$refs.contentToPrintPerdidas).set(options).save();
      }, 500);
      //html2pdf().from(this.$refs.contentToPrint).set(options).save();
    },
    formattedCreatedAt(item) {
      const date = new Date(item);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    formattedHoras(item) {
      const date = new Date(item);
      // Adicione 3 horas ao objeto Date
      date.setHours(date.getHours() + 3);

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
    getToken() {
      const accessToken = TokenService.getLocalAccessToken();

      // Obter o token de atualização (refresh token)
      TokenService.getLocalRefreshToken();

      // Obter o usuário completo (incluindo os tokens) se necessário
      TokenService.getUser();

      const decodedToken = jwt_decode(accessToken);
      console.log(decodedToken);
      this.company_id = decodedToken.company;
      this.user_id = decodedToken.id;

    },
    getRequestParams(EmpresasSelecionadas, page, pageSize, empresa_id, usuario_id, data_ini, data_fim, tipo_veiculo, tipo_conversao, referencia) {
      let params = {};
      if (EmpresasSelecionadas) {
        params["ids"] = EmpresasSelecionadas;
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
      if (usuario_id) {
        params["usuario_id"] = usuario_id
      }
      if (data_ini) {
        params["data_ini"] = data_ini
      }
      if (data_fim) {
        params["data_fim"] = data_fim
      }
      if (tipo_veiculo) {
        params["tipo_veiculo"] = tipo_veiculo
      }
      if (tipo_conversao) {
        params["tipo_conversao"] = tipo_conversao
      }
      if (referencia) {
        params["referencia"] = referencia
      }


      return params;
    },
    selecionarRelatorios() {
      if (this.selectedRelatorio === "venda_conversao") {
        this.tipo_relatorio = this.selectedRelatorio;
        this.tipo_conversao = [
          { nome: 'Loja', value: 1 },
          { nome: 'Vendedor', value: 2 },
          { nome: 'Veículo', value: 3 }
        ]
      } else if (this.selectedRelatorio === "venda_perdida") {
        this.tipo_relatorio = this.selectedRelatorio
      } else if (this.selectedRelatorio === "venda_modelo") {
        this.tipo_relatorio = this.selectedRelatorio;
        this.tipo_conversao = [
          { nome: 'Loja', value: 1 },
          { nome: 'Vendedor', value: 2 }
        ]
      }
    },
    filtarRelatorios() {
      if (this.selectedFilter === "hoje") {
        this.referencia = this.selectedFilter
      } else if (this.selectedFilter === "ontem") {
        this.referencia = this.selectedFilter
      } else if (this.selectedFilter === "mes_atual") {
        this.referencia = this.selectedFilter
      } else if (this.selectedFilter === "mes_anterior") {
        this.referencia = this.selectedFilter
      }
    },
    // filterByPeriod() {
    //   this.data_ini = this.startDate
    //   this.data_fim = this.endDate
    //   this.status_proposta = 5     

    // },


    async propostas_mes() {
      const params = {
        empresa_id: this.company_id,
        user_id: this.user_id,
        referencia: this.selectedFilter,
        empresas: this.selectedEmpresas
      }

      await axios.get(`${process.env.VUE_APP_API_URL}propostas_mes`, {
        params
      })
        .then(response => {
          console.log(response.data)
          const res = response.data

          //Restultado operacional
          this.lucro_operacional = JSON.parse(JSON.stringify(res['total_lucro_operacional_veiculos_usados']));
          this.lucro_gerencial = JSON.parse(JSON.stringify(res['total_lucro_gerencial_veiculos_usados']));
          this.lucro_financiamento = JSON.parse(JSON.stringify(res['total_lucro_financiamento_veiculos_usados']));
          this.lucro_final = JSON.parse(JSON.stringify(res['total_lucro_final_veiculos_usados']));



          this.total_passagem_zero = JSON.parse(JSON.stringify(res['total_passagem_zero']));
          this.total_passagem_zero_retorno = JSON.parse(JSON.stringify(res['total_passagem_zero_retorno']));
          this.total_passagem_zero_novas = JSON.parse(JSON.stringify(res['total_passagem_zero_novas']));
          this.total_em_atendimento_zero = JSON.parse(JSON.stringify(res['total_em_atendimento_zero']));
          this.total_em_atendimento_zero_porcentagem = JSON.parse(JSON.stringify(res['total_em_atendimento_zero_porcentagem']));
          this.total_vendas_perdidas_zero = JSON.parse(JSON.stringify(res['total_vendas_perdidas_zero']));
          this.total_vendas_perdidas_zero_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_perdidas_zero_porcentagem']));
          this.total_vendas_finalizadas_zero = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero']));
          this.total_vendas_finalizadas_zero_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_porcentagem']));

          this.total_vendas_finalizadas_zero_novos = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_novos']));
          this.total_vendas_finalizadas_zero_novos_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_novos_porcentagem']));
          this.total_vendas_finalizadas_zero_retorno = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_retorno']));
          this.total_vendas_finalizadas_zero_retorno_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_retorno_porcentagem']));


          this.total_passagem_usado = JSON.parse(JSON.stringify(res['total_passagem_usado']));
          this.total_passagem_usado_retorno = JSON.parse(JSON.stringify(res['total_passagem_usado_retorno']));
          this.total_passagem_usado_novas = JSON.parse(JSON.stringify(res['total_passagem_usado_novas']));
          this.total_em_atendimento_usados = JSON.parse(JSON.stringify(res['total_em_atendimento_usados']));
          this.total_em_atendimento_usados_porcentagem = JSON.parse(JSON.stringify(res['total_em_atendimento_usados_porcentagem']));
          this.total_vendas_perdidas_usados = JSON.parse(JSON.stringify(res['total_vendas_perdidas_usados']));
          this.total_vendas_perdidas_usados_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_perdidas_usados_porcentagem']));
          this.total_vendas_finalizadas_usado = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado']));
          this.total_vendas_finalizadas_usado_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_porcentagem']));
          this.total_vendas_finalizadas_usado_novos = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_novos']));
          this.total_vendas_finalizadas_usado_novos_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_novos_porcentagem']));
          this.total_vendas_finalizadas_usado_retorno = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_retorno']));
          this.total_vendas_finalizadas_usado_retorno_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_retorno_porcentagem']));



        })
        .catch(error => {
          console.log(error)
          // if (error.response.status == 400) {
          //   this.abrir_modal = true;
          //   this.msg = error.response.data.message;
          // }
        })

      // fetch(`${process.env.VUE_APP_API_URL}propostas_mes`)
      //   .then((res) => res.json())
      //   .then((res) => {
      //     this.lucro_operacional = JSON.parse(JSON.stringify(res['total_lucro_operacional_veiculos_usados']));
      //     this.lucro_gerencial = JSON.parse(JSON.stringify(res['total_lucro_gerencial_veiculos_usados']));
      //     this.lucro_financiamento = JSON.parse(JSON.stringify(res['total_lucro_financiamento_veiculos_usados']));
      //     this.lucro_final = JSON.parse(JSON.stringify(res['total_lucro_final_veiculos_usados']));

      //     this.total_passagem_zero = JSON.parse(JSON.stringify(res['total_passagem_zero']));
      //     this.total_passagem_zero_retorno = JSON.parse(JSON.stringify(res['total_passagem_zero_retorno']));
      //     this.total_passagem_zero_novas = JSON.parse(JSON.stringify(res['total_passagem_zero_novas']));
      //     this.total_em_atendimento_zero = JSON.parse(JSON.stringify(res['total_em_atendimento_zero']));
      //     this.total_em_atendimento_zero_porcentagem = JSON.parse(JSON.stringify(res['total_em_atendimento_zero_porcentagem']));
      //     this.total_vendas_perdidas_zero = JSON.parse(JSON.stringify(res['total_vendas_perdidas_zero']));
      //     this.total_vendas_perdidas_zero_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_perdidas_zero_porcentagem']));
      //     this.total_vendas_finalizadas_zero = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero']));
      //     this.total_vendas_finalizadas_zero_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_porcentagem']));
      //     this.total_vendas_finalizadas_zero_novos = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_novos']));
      //     this.total_vendas_finalizadas_zero_novos_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_novos_porcentagem']));
      //     this.total_vendas_finalizadas_zero_retorno = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_retorno']));
      //     this.total_vendas_finalizadas_zero_retorno_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_zero_retorno_porcentagem']));
      //     this.total_passagem_usado = JSON.parse(JSON.stringify(res['total_passagem_usado']));
      //     this.total_passagem_usado_retorno = JSON.parse(JSON.stringify(res['total_passagem_usado_retorno']));
      //     this.total_passagem_usado_novas = JSON.parse(JSON.stringify(res['total_passagem_usado_novas']));
      //     this.total_em_atendimento_usados = JSON.parse(JSON.stringify(res['total_em_atendimento_usados']));
      //     this.total_em_atendimento_usados_porcentagem = JSON.parse(JSON.stringify(res['total_em_atendimento_usados_porcentagem']));
      //     this.total_vendas_perdidas_usados = JSON.parse(JSON.stringify(res['total_vendas_perdidas_usados']));
      //     this.total_vendas_perdidas_usados_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_perdidas_usados_porcentagem']));
      //     this.total_vendas_finalizadas_usado = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado']));
      //     this.total_vendas_finalizadas_usado_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_porcentagem']));
      //     this.total_vendas_finalizadas_usado_novos = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_novos']));
      //     this.total_vendas_finalizadas_usado_novos_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_novos_porcentagem']));
      //     this.total_vendas_finalizadas_usado_retorno = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_retorno']));
      //     this.total_vendas_finalizadas_usado_retorno_porcentagem = JSON.parse(JSON.stringify(res['total_vendas_finalizadas_usado_retorno_porcentagem']));

      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    limpar_tabela(){
      console.log("Limpar Tabela")
      this.conversao_vendas = "";
      this.total_atendimentosNovos = ""; 
      this.total_vendasNovos = "";
      this.total_conversao_percNovos = "";
      this.total_atendimentosUsados = "";
      this.total_vendasUsados = "";
      this.total_conversao_percUsados = "";
      this.total_atendimentos = "";
      this.total_vendas = "";
      this.total_conversao_perc = "";
    },
    async relatorio_conversao_vendas() {     
      console.log("Conversão de Vendas")
      const params = this.getRequestParams(
        this.selectedEmpresas,
        this.page,
        this.pageSize,
        this.company_id,
        this.user_id,
        this.startDate,
        this.endDate,
        this.selectedTipoVeiculo,
        this.selectedTipoConversao,
        this.selectedFilter,

      );
      try {
        var conversaoNovos;
        var conversaoUsados;
        const response = await axios.get(`${process.env.VUE_APP_API_URL}relatorio_conversao_vendas`, {
          params
        });
        console.log(response.data.result)
        const qtd = response.data.result.length;
        this.conversao_vendas = []
        for (let i = 0; i < qtd; i++) {
          var totalVendasNovos =  response.data.result[i].QuantidadeVendasNovos;
          var totalVendasUsados = response.data.result[i].QuantidadeVendasUsados;
          var totalAtendimentoNovos = response.data.result[i].QuantidadeAtendimentosNovos;
          var totalAtendimentosUsados = response.data.result[i].QuantidadeAtendimentosUsados;


          console.log(parseFloat((totalVendasNovos / totalAtendimentoNovos) * 100).toFixed(2))
          console.log(parseFloat((totalVendasUsados / totalAtendimentosUsados ) * 100).toFixed(2))


          //const valor_veiculo = rows[i].proposta_veiculo?.valor_veiculo || 0.00;
          
          conversaoUsados = parseFloat((totalVendasUsados / totalAtendimentosUsados ) * 100).toFixed(2)

          if(totalAtendimentoNovos != 0){
            conversaoNovos = parseFloat((totalVendasNovos / totalAtendimentoNovos) * 100).toFixed(2)
           
          } else {
            conversaoNovos = 0
          }

          if(totalAtendimentosUsados!= 0){
            conversaoUsados = parseFloat((totalVendasUsados / totalAtendimentosUsados) * 100).toFixed(2)
            
          } else {
            conversaoUsados = 0
          }

          const arr = {
            Descricao: response.data.result[i].Descricao,
            Conversao: parseFloat((response.data.result[i].Conversao)*100).toFixed(2),
            ConversaoNovos: conversaoNovos,
            ConversaoUsados: conversaoUsados,
            QuantidadeAtendimentos: response.data.result[i].QuantidadeAtendimentos,
            QuantidadeAtendimentosNovos: response.data.result[i].QuantidadeAtendimentosNovos,
            QuantidadeAtendimentosUsados: response.data.result[i].QuantidadeAtendimentosUsados,
            QuantidadeVendas: response.data.result[i].QuantidadeVendas,
            QuantidadeVendasNovos: response.data.result[i].QuantidadeVendasNovos,
            QuantidadeVendasUsados: response.data.result[i].QuantidadeVendasUsados,

          };


          this.conversao_vendas.push(arr); // Adiciona o novo objeto ao array
        }
        console.log(this.conversao_vendas)

        this.total_atendimentos = response.data.total[0]["TotalAtendimentos"]
        this.total_vendas = response.data.total[0]["TotalVendas"]

        this.total_atendimentosNovos = response.data.total[0]["TotalAtendimentosNovos"]
        this.total_vendasNovos = response.data.total[0]["TotalVendasNovos"]

        this.total_atendimentosUsados = response.data.total[0]["TotalAtendimentosUsados"]
        this.total_vendasUsados = response.data.total[0]["TotalVendasUsados"]

        if (this.total_atendimentos !== 0) {

          this.total_conversao_perc = parseFloat((this.total_vendas / this.total_atendimentos) * 100).toFixed(2);
  
        } else {
          // Defina um valor padrão ou trate de outra forma, dependendo dos requisitos.
          this.total_conversao_perc = 0.00; // Por exemplo, definindo como 0 quando não há atendimentos.
        }

        if (this.total_atendimentosNovos !== 0) {
          this.total_conversao_percNovos = parseFloat((this.total_vendasNovos / this.total_atendimentosNovos) * 100).toFixed(2);
        } else {
          // Defina um valor padrão ou trate de outra forma, dependendo dos requisitos.
          this.total_conversao_percNovos = 0.00; // Por exemplo, definindo como 0 quando não há atendimentos novos.
        }

        if (this.total_atendimentosUsados !== 0) {
          this.total_conversao_percUsados = parseFloat((this.total_vendasUsados / this.total_atendimentosUsados) * 100).toFixed(2);
        } else {
          // Defina um valor padrão ou trate de outra forma, dependendo dos requisitos.
          this.total_conversao_percUsados = 0.00; // Por exemplo, definindo como 0 quando não há atendimentos usados.
        }
      } catch (error) {
        console.log(error)
        this.abrir_modal = true;
        this.msg = error
        setTimeout(() => (this.abrir_modal = false), 4000);

      }



    },
    async relatorio_venda_perdida() {
      console.log("chamar relatório de venda perdida")

      // Limpa o array antes de adicionar novos elementos
      this.vendas_perdidas.splice(0);

      const params = this.getRequestParams(
        this.selectedEmpresas,
        this.page,
        this.pageSize,
        this.company_id,
        this.user_id,
        this.startDate,
        this.endDate,
        this.selectedTipoVeiculo,
        this.selectedTipoConversao,
        this.selectedFilter,

      );
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}relatorio_vendas_perdida`, { params });
        const qtd = response.data.count;
        const { rows } = response.data;
        console.log( rows)
        for (let i = 0; i < qtd; i++) {
          const modelo_veiculo = rows[i].proposta_veiculo?.modelo_veiculo || ''; // Verifica se é null
          const categoria =  rows[i].proposta_veiculo?.categoria || '';
          const valor_veiculo = rows[i].proposta_veiculo?.valor_veiculo || 0.00;
          const arr = {
            loja: rows[i].empresa_proposta.nome,
            atendente: rows[i].usuarios.username,
            vendedor: rows[i].vendedores.username,
            cliente: rows[i].clientes.nome,
            telefone: rows[i].clientes.tel,
            telefone2: rows[i].clientes.cel,
            data: rows[i].createdAt,
            inicio_atendimento: rows[i].horario_inicio_atendimento,
            motivo_perda: rows[i].obs,
            veiculo: modelo_veiculo,
            valor: this.currency(valor_veiculo),
            tipo_veiculo: categoria
          };

          this.vendas_perdidas.push(arr); // Adiciona o novo objeto ao array
        }

        console.log(this.vendas_perdidas);


      } catch (error) {
        console.log(error)
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }

    },
    async relatorio_venda_modelo() {
      console.log("Chamar relatório de venda por modelo")
      console.log("chamar relatório de venda perdida")

      const params = this.getRequestParams(
        this.selectedEmpresas,
        this.page,
        this.pageSize,
        this.company_id,
        this.user_id,
        this.startDate,
        this.endDate,
        this.selectedTipoVeiculo,
        this.selectedTipoConversao,
        this.selectedFilter,
      );
      await axios.get(`${process.env.VUE_APP_API_URL}relatorio_vendas_modelo`, {
        params
      })
        .then(response => {
          this.vendas_modelo = response.data.result;
          this.total_vendas_modelo = response.data.total[0]["TotalVendas"];
          console.log(response)

        })
        .catch(error => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })
    },
    async getEmpresas() {
      console.log("Buscando Empresas")
      const user_id = this.user_id
      await axios.get(`${process.env.VUE_APP_API_URL}user_empresas`, {
        params: { id: user_id }
      })
        .then(response => {
          this.lista_empresas = response.data;
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.abrir_modal = true;
            this.msg = error.response.data.message;
          }
        })

    },

    filtrarConversao() {
      if (this.selectedFilter === 'Todas Lojas') {
        // console.log("Filtar propostas em atendimento! ------------------------------------------------------------------------------------------------------------------ 0005")
        this.status_proposta = this.selectedFilter
        this.relatorio_conversao_vendas();
      } else if (this.selectedFilter === 'Venda Finalizada') {
        // console.log("Filtar propostas em Finalizadas! ------------------------------------------------------------------------------------------------------------------ 0006")
        this.status_proposta = this.selectedFilter
        this.retrievePropostas();
      } else if (this.selectedFilter === 'Venda Perdida') {
        this.status_proposta = this.selectedFilter
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas perdiadas! ------------------------------------------------------------------------------------------------------------------ 0007")
      } else if (this.selectedFilter === 'Todos') {
        this.status_proposta = this.selectedFilter
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas perdiadas! ------------------------------------------------------------------------------------------------------------------ 0007")
      } else if (this.selectedFilter === 'Dia') {
        this.status_proposta = this.selectedFilter
        this.retrievePropostas();
        // console.log("Filtar propostas em vendas 
      }
    },

    currency(number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(number);
    },
  }
};
</script>