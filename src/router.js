import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Unauthorized from "./views/Unauthorized.vue";

//Rotas administrativas
import Acessorio from "./views/admin/Acessorios.vue";
import Banco from "./views/admin/Banco.vue";
import Cidade from "./views/admin/Cidade.vue";
import Cliente from "./views/admin/Cliente.vue";
import Combustivel from "./views/admin/CombustivelVeiculo.vue";
import CorVeiculo from "./views/admin/CorVeiculo.vue";
import CustoVariavel from "./views/admin/CustoVariaveis.vue";
import Empresa from "./views/admin/Empresa.vue";
import Estado from "./views/admin/UF.vue";
import FamiliaVeiculo from "./views/admin/FamiliaVeiculo.vue";
import Funcao from "./views/admin/Funcao.vue";
import ImportarTaxas from "./views/admin/ImportarTaxas.vue";
import Justificativas from "./views/admin/Justificativas.vue";
import MarcaVeiculo from "./views/admin/MarcaVeiculo.vue";
import Midia from "./views/admin/Midia.vue";
import ModeloVeiculo from "./views/admin/ModeloVeiculo.vue";
import Usuario from "./views/admin/Usuario.vue";
import Estoque from "./views/admin/estoque_veiculos.vue";
import TipoPagamento  from "./views/admin/TipoPagamento.vue";

//Rotas Atendimento
//import Atendimento from "./views/atendimento/Dashboard.vue";
import DashboardProposta from "./views/atendimento/Dashboard.vue";
import AtendimentoProposta from "./views/atendimento/Proposta.vue";
//Rotas gerencia
import Desk from "./views/desk/Index.vue";
import ReabrirProposta from "./views/desk/reabrirProposta.vue";
import Menu from "./views/desk/gerarMenu.vue";
import Relatorio from "./views/desk/relatorioMes.vue";
import Proposta from "./views/desk/abrirProposta.vue";
import ReimprimirProposta from "./views/desk/reimprimirMenu.vue";
import SituacaoGeral from "./views/desk/situacaoGeral.vue";
import VendidosEstoque from "./views/desk/vendidosEstoque.vue";
import VeiculosAvaliacao from "./views/desk/veiculosAvaliacao.vue";
import VeiculosReserva from "./views/admin/reservados.vue";
import VeiculosVendidoEstoque from "./views/admin/VeiculosVendidoEstoque.vue";
import SituacaoVeiculo from "./views/admin/SituacaoVeiculo.vue";


//Rotas F&I
import Dashboard from "./views/f&i/index.vue";
import EstoqueAcessorio from "./views/f&i/estoque_acessorio.vue";
import CadastroAcessorio from "./views/f&i/cadastro_acessorio.vue";
import CadastroPacotes from "./views/f&i/cadastro_pacotes.vue";
import CadastroRevisao from "./views/f&i/cadastro_revisao.vue";
import CadastroSeguros from "./views/f&i/cadastro_seguro.vue";
import CadastroKits from "./views/f&i/cadastro_kits.vue";
import KitsModelo from "./views/f&i/kits_modelo.vue";
import VendasF$I from "./views/f&i/vendas_f&i.vue";
import VendasFeiDetalhe from "./views/f&i/vendas_fei_detalhe.vue";
import ModeloFeiEstoque from "./views/f&i/modelo_fei_estoque.vue";
import VendasCustomizado from "./views/f&i/vendas_customizado.vue";
import ReimprimirMenu from "./views/f&i/reimprimirMenu.vue";
import ReabrirAtendimento from "./views/f&i/reabrir_atendimento";
import FluxoLojas from "./views/f&i/fluxo_lojas.vue";

// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")

//Admin Full
function adminAuth(to, from, next){
  const user = JSON.parse(localStorage.getItem('user'));
  const funcoes = user.funcoes;
  let admin, gerente, gerenteGeral, atendente, vendedorF; 
  console.log(funcoes)
  for (var i = 0; i < funcoes.length; i++) {
    if (funcoes[i] === "Função: ADMINISTRADOR") {
      admin = 'administrador';
    }
    if (funcoes[i] === "Função: GERENTE") {     
      gerente = 'gerente';
    }
    if (funcoes[i] === "Função: GERENTE GERAL") {     
      gerenteGeral = 'gerente_geral';
    }
    if (funcoes[i] === "Função: RECEPÇÃO") {
      atendente = 'atendente';
    }
    if (funcoes[i] === "Função: F&I") {
      vendedorF = 'vendedorF&I';
    }
  }
  
  if (admin === 'administrador' && gerente === 'gerente' && atendente === 'atendente' && gerenteGeral === 'gerente_geral' && vendedorF === 'vendedorF&I') {
    return next()
  } else if(admin === 'administrador'){
    return next()
  } else {
    next('/unauthorized');
  }
}
function gerenteAuth(to, from, next){
  const user = JSON.parse(localStorage.getItem('user'));
  const funcoes = user.funcoes;
  let  gerente;

  for (var i = 0; i < funcoes.length; i++) { 
    if (funcoes[i] === "Função: GERENTE") {
      gerente = 'gerente';
    }
   
  }
  console.log("Função de gerente tendo acessar a rota!");
  console.log(gerente);
  if (gerente === 'gerente') {
    return next()
  } else {
    next('/unauthorized');
  }
}
function gerenteGeralAuth(to, from, next){
  const user = JSON.parse(localStorage.getItem('user'));
  const funcoes = user.funcoes;
  let  gerenteGeral;

  for (var i = 0; i < funcoes.length; i++) { 
    if (funcoes[i] === "Função: GERENTE GERAL") {
      gerenteGeral = 'gerente_geral';
    }
   
  }
  console.log("Função de gerente_geral tendo acessar a rota!");
  console.log(gerenteGeral);
  if (gerenteGeral === 'gerente_geral') {
    return next()
  } else {
    next('/unauthorized');
  }
}


function recepcaoAuth(to, from, next){
  const user = JSON.parse(localStorage.getItem('user'));
  const funcoes = user.funcoes;
  let  atendente;

  for (var i = 0; i < funcoes.length; i++) { 
    if (funcoes[i] === "Função: RECEPÇÃO") {
      atendente = 'atendente';
    }   
  }

  if (atendente === 'atendente') {
    return next()
  } else {
    next('/unauthorized');
  }
}

function vendedorFEI(to, from, next){
  const user = JSON.parse(localStorage.getItem('user'));
  const funcoes = user.funcoes;
  let  vendedorFI;

  for (var i = 0; i < funcoes.length; i++) { 
    if (funcoes[i] === "Função: F&I") {
      vendedorFI = 'vendedorF&I';
    }
   
  }
  console.log("Função de F&I tendo acessar a rota!");
  console.log(vendedorFI);
  if (vendedorFI === 'vendedorF&I') {
    return next()
  } else {
    next('/unauthorized');
  }
}

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/unauthorized",
    component: Unauthorized
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  ///Rotas administrativas
  {
    path:"/admin/acessorios",
    name:"acessorios",
    component: Acessorio,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/bancos",
    name:"bancos",
    component: Banco,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/cidades",
    name:"cidades",
    component: Cidade,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/clientes",
    name:"clientes",
    component: Cliente,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/combustiveis",
    name:"combustiveis",
    component: Combustivel,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/cor_veiculos",
    name:"cor_veiculo",
    component: CorVeiculo,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/custos_variaveis",
    name:"custo_variaveis",
    component: CustoVariavel,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/empresas",
    name:"empresas",
    component: Empresa,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/estados",
    name:"estados",
    component: Estado,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/familia_veiculos",
    name:"familia_veiculos",
    component: FamiliaVeiculo,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/funcoes",
    name:"funcoes",
    component: Funcao,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/taxas",
    name:"taxas",
    component: ImportarTaxas,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/justificativas",
    name:"justificativas",
    component: Justificativas,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/marca_veiculos",
    name:"marca_veiculos",
    component: MarcaVeiculo,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/estoque_veiculos",
    name:"estoque_veiculos",
    component: Estoque,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/midias",
    name:"midias",
    component: Midia,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/modelo_veiculos",
    name:"modelo_veiculos",
    component: ModeloVeiculo,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/usuarios",
    name:"usuarios",
    component: Usuario,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/veiculos_vendido_estoque",
    name:"veiculos_vendido_estoque",
    component: VeiculosVendidoEstoque ,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/veiculos_reserva",
    name:"veiculos_reserva",
    component: VeiculosReserva,
    beforeEnter: [adminAuth],
  },
  {
    path:"/admin/situacao_veiculo",
    name:"situacao_veiculo",
    component: SituacaoVeiculo,
    beforeEach: [adminAuth],
  },
  {
    path:"/admin/tipo_pagamento",
    name:"tipo_pagamento",
    component: TipoPagamento,
    beforeEach: [adminAuth],
  },
  // {
  //   path:"/atendimento/dashboard",
  //   name:"dashboard",
  //   component: Atendimento,
  //   beforeEnter: [recepcaoAuth],
  // },
  {
    path:"/atendimento/proposta",
    name:"nova_proposta",
    component: AtendimentoProposta,
    beforeEnter: [recepcaoAuth],
  },
  {
    path:"/atendimento/dashboard",
    name:"dashboard_proposta",
    component: DashboardProposta,
    beforeEnter: [recepcaoAuth],
  },
  {
    path:"/desk/index",
    name:"desk",
    component: Desk,
    beforeEnter: [gerenteAuth],
   
  },
  {
    path:"/desk/reabrirProposta",
    name:"reabrirProposta",
    component: ReabrirProposta,
    beforeEnter: [gerenteGeralAuth],
    
  },
  {
    path:"/desk/vendidosEstoque",
    name:"vendidosEstoque",
    component: VendidosEstoque,
    beforeEnter: [gerenteAuth],
    
  },
  {
    path:"/desk/situacaoGeral",
    name:"situacaoGeral",
    component: SituacaoGeral,
    beforeEnter: [gerenteAuth],
    
  },
  {
    path:"/desk/veiculosAvaliacao",
    name:"veiculosAvaliacao",
    component: VeiculosAvaliacao,
    beforeEnter: [gerenteAuth],
    
  },
  {
    path:"/desk/menu/:id",
    name:"menu",
    component: Menu,
    beforeEnter: [gerenteAuth],
  },
  {
    path:"/desk/relatorio",
    name:"relatorio",
    component: Relatorio,
    beforeEnter: [gerenteAuth],
  },
  {
    path:"/desk/menu/proposta/:id",
    name:"proposta",
    component: Proposta,
    beforeEnter: [gerenteAuth],
  },
  {
    path:"/desk/menu/reimprimir/:id",
    name:"reimprimir",
    component: ReimprimirProposta,
    beforeEnter: [gerenteAuth],
  },

  {
    path:"/f&i/index",
    name:"dashboard",
    component: Dashboard,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/modelos_fei",
    name:"modelos_fei",
    component: ModeloFeiEstoque,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/estoque_acessorio",
    name:"estoque_acessorio",
    component: EstoqueAcessorio,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/cadastro_acessorio",
    name:"cadastro_acessorio",
    component: CadastroAcessorio,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/cadastro_pacotes",
    name:"cadastro_pacotes",
    component: CadastroPacotes,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/cadastro_revisao",
    name:"cadastro_revisao",
    component: CadastroRevisao,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/cadastro_seguro",
    name:"cadastro_seguro",
    component: CadastroSeguros,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/cadastro_kits",
    name:"cadastro_kits",
    component: CadastroKits,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/kits_modelo",
    name:"kits_modelo",
    component: KitsModelo,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/vendas_f&i",
    name:"vendas_f&i",
    component: VendasF$I,
    beforeEnter: [vendedorFEI],
  },
  { 
    path:"/f&i/vendas_customizado/:id",
    name:"vendas_customizado",
    component: VendasCustomizado,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/vendas_fei_detalhe/:id",
    name:"vendas_detalhe",
    component: VendasFeiDetalhe,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/reimprimirMenu/:id",
    name:"reimprimirMenu",
    component: ReimprimirMenu,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/reabrir_atendimento",
    name:"reabrir_atendimento",
    component: ReabrirAtendimento,
    beforeEnter: [vendedorFEI],
  },
  {
    path:"/f&i/fluxo_lojas",
    name:"fluxo_de_lojas",
    component: FluxoLojas ,
    beforeEnter: [vendedorFEI],
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login' ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
