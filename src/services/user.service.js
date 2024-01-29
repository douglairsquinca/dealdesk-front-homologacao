import api from './api';


class UserService {
  getPublicContent() {
    return api.get('/all');
  }

  getUserBoard() {
    return api.get('/user');
  }

  getModeratorBoard() {
    return api.get('/desk');
   
  }

  getAdminBoard() {
    return api.get('/admin');
  }
  // getAdminBoard() {
  //   return api.get('/admin/usuarios');
  // }
  getUsers(params) {
    return api.get('/users', {
      params
    });
  }
  
  putUser(){
    return api.get('users/:id');
  }

  getBancos(params){
    return api.get('/bancos',{
      params
    });
  }
  getClientes(params){
    return api.get('/clientes', {
      params
    });
  }
  findClientes(params){
    return api.get('/cliente', {
      params
    });
  }
  getEmpresas(params){
    return api.get('/empresa', {
      params
    });
  }
  getFuncoes(params){
    return api.get('/funcoes',{
      params
    })
  }
  getMidias(params){
    return api.get('/midias',{
      params
    })
  }
  getAcessorios(params){
    return api.get('/acessorios',{
      params
    })
  }
  getCusto(params){
    return api.get('/custo',{
      params
    })
  }
  getCombustiveis(params){
    return api.get('/combustivel',{
      params
    })
  }
  getCores(params){
    return api.get('/cor',{
      params
    })
  }
 //////////////////////////////////////////
  getFunctions(params) {
    return api.get("/funcao", {
      params
    });
  }
  getFunctionsId(id) {
    return api.get(`/funcao/${id}`);
  }
  putFunctionsId(id) {
    return api.put(`/funcao/${id}`);
  }
  findByTitle(title) {
    return api.get(`/funcao?title=${title}`);
  }

  ////Cidades
  getCidades(params) {
    return api.get("/cidades", {
      params
    });
  }
  getCidadesId(id) {
    return api.get(`/cidade/${id}`);
  }
  putCidadesId(id) {
    return api.put(`/cidade/${id}`);
  }
  findByCidade(title) {
    return api.get(`/cidade?title=${title}`);
  }

  ////Grupo Acessórios
  getGrupoAcessorios(params) {
    return api.get("/acessorios", {
      params
    });
  }
  getGrupoAcessoriosId(id) {
    return api.get(`/grupo_acessorios/${id}`);
  }
  putGruposAcessoriosId(id) {
    return api.put(`/grupo_acessorios/${id}`);
  }
  findByGrupoAcessorios(title) {
    return api.get(`/grupo_acessorios?title=${title}`);
  }

  ////Clientes
  getClienteCpfCnpj(params) {
    return api.get("/clienteCpfCnpj", {
      params
    });
  }
  getClienteId(id) {
    return api.get(`/cliente/${id}`);
  }
  putClienteId(id) {
    return api.put(`/cliente/${id}`);
  }
  findByClientes(title) {
    return api.get(`/cliente?title=${title}`);
  }

  ////Empresas
  getEmpresa(params) {
    return api.get("/empresa", {
      params
    });
  }
  getEmpresaId(id) {
    return api.get(`/empresa/${id}`);
  }
  putEmpresaId(id) {
    return api.put(`/empresa/${id}`);
  }
  findByEmpresa(title) {
    return api.get(`/empresa?title=${title}`);
  }

  //// Combustivel
  getCombustivel(params) {
    return api.get("/combustivel", {
      params
    });
  }
  getCombustivelId(id) {
    return api.get(`/combustivel/${id}`);
  }
  putCombustivelId(id) {
    return api.put(`/combustivel/${id}`);
  }
  findByCombustivel(title) {
    return api.get(`/combustivel?title=${title}`);
  }

  //// Cores Veículo
  getCor(params) {
    return api.get("/cor", {
      params
    });
  }
  getCorId(id) {
    return api.get(`/cor/${id}`);
  }
  putCorId(id) {
    return api.put(`/cor/${id}`);
  }
  findByCor(title) {
    return api.get(`/cor?title=${title}`);
  }

  //// Marca Veículo
  getMarca(params) {
    return api.get("/marcas", {
      params
    });
  }
  getMarcaPaginate(params) {
    return api.get("/marca", {
      params
    });
  }
  getMarcaId(id) {
    return api.get(`/marca/${id}`);
  }
  putMarcaId(id) {
    return api.put(`/marca/${id}`);
  }
  findByMarca(title) {
    return api.get(`/marca?title=${title}`);
  }

  //// Familia Veículo
  getFamilia(params) {
    return api.get("/familia", {
      params
    });
  }
  getFamilia_at(params) {
    return api.get("/familia_at", {
      params
    });
  }
  getFamilia_futura(params) {
    return api.get("/familia_futura", {
      params
    });
  }
  getFamiliaId(id) {
    return api.get(`/familia/${id}`);
  }
  putFamiliaId(id) {
    return api.put(`/familia/${id}`);
  }
  findByFamilia(title) {
    return api.get(`/familia?title=${title}`);
  }

  //// Modelo Veículo
  getModelo(params) {
    return api.get('/modelo', {
      params
    });
  }
  getModeloId(id) {
    return api.get(`/modelo/${id}`);
  }
  putModeloId(id) {
    return api.put(`/modelo/${id}`);
  }
  findByModelo(title) {
    return api.get(`/modelo?title=${title}`);
  }

  //// Custo Venda Variavel

  getCustoId(id) {
    return api.get(`/custo/${id}`);
  }
  putCustoId(id) {
    return api.put(`/custo/${id}`);
  }
  findByCusto(title) {
    return api.get(`/custo?title=${title}`);
  }

  //// Usuarios

  getUserId(id) {
    return api.get(`/users/${id}`);
  }
  putUserId(id) {
    return api.put(`/api/users/${id}`);
  }
  findByUser(title) {
    return api.get(`/users?title=${title}`);
  }
  getVendedorInd(params){
    return api.get('/listar_vendedor', {
      params
    });
  }
  getVendedorDispo(params){
    return api.get('/listar_vendedor_dispo', {
      params
    });
  }
  getVendedorOrdenado(params){
    return api.get('/listar_vendedor_ordenado', {
      params
    });
  }


  //// Midias
  getMidia(params) {
    return api.get('/midia', {
      params
    });
  }
  getMidiaId(id) {
    return api.get(`/midia/${id}`);
  }
  putMidiaId(id) {
    return api.put(`/midia/${id}`);
  }
  findByMidia(title) {
    return api.get(`/midia?title=${title}`);
  }

  //// Propostas
  getProposta(params) {
    return api.get('/proposta', {
      params
    });
  }

  getPropostaId(id) {    
    return api.get(`/proposta/${id}`);
  }

  getQuantidadePropostaMenuByID(id){
    return api.get(`/gerados_proposta_menu/${id}`)
  }
  getProposta_pmt(params){
    return api.get('/proposta_pmt',{
      params
    });
  }

  getPropostaCliente(params) {
    return api.get('/proposta_cliente',{
    params
    });
  }

    getReabrirPropostaCliente(params) {
    return api.get('/reabrir_proposta_cliente',{
    params
    });
  }

  getPropostaMenu(params) {
    return api.get('/proposta_menu',{
    params
    });
  }

  getPropostaClienteId(id) {
    return api.get(`/proposta_cliente/${id}`);
  }

  putPropostaId(id) {
    return api.put(`/proposta/${id}`);
  }
  findByProposta(title) {
    return api.get(`/proposta?title=${title}`);
  }

  ///Estoque
  getEstoqueSincronizar(params) {
    return api.get('/estoque', {
      params
    });
  }
  getEstoqueVeiculo(params) {
    return api.get('/estoque_veiculo', {
      params
    });
  }
  getEstoqueVeiculoId(id) {
    return api.get(`/veiculo_proposta/${id}`);
  }

  getMesmoVeiculoVenda(params){
    return api.get('/venda_mesmo_veiculo',{
      params
    });
  }



  getMarcaEstoque() {
    return api.get('/marcas_estoque', {      
    });
  }
  getModeloEstoque() {
    return api.get('/modelos_estoque', {      
    });
  }
  getCorEstoque() {
    return api.get('/cores_estoque', {      
    });
  }

  ///Itens Avaliação
  getItensId(id) {
    return api.get(`/itens_avaliacao/${id}`);
  }
   // Acessórios

  getItensAcessoriosId(id) {
    return api.get(`/itens_acessorios/${id}`);

  }

  getTaxas(params) {
    return api.get('/taxas/ranqueamento', {
      params
    });
  }
  getTaxasAll(params) {
    return api.get('/taxas', {
      params
    });
  }

  getFiltroTaxas_1(params){
    return api.get('/taxas/filtro_ranqueamento_entrada_1',{
      params
    });
  }
  getFiltroTaxas_2(params){
    return api.get('/taxas/filtro_ranqueamento_entrada_2',{
      params
    });
  }
  getFiltroTaxas_3(params){
    return api.get('/taxas/filtro_ranqueamento_entrada_3',{
      params
    });
  }

  getRanqueamento_1(params){
    return api.get('/taxas/ranqueamento_entrada_1',{
      params
    });
  }
  getRanqueamento_2(params){
    return api.get('/taxas/ranqueamento_entrada_2',{
      params
    });
  }
  getRanqueamento_3(params){
    return api.get('/taxas/ranqueamento_entrada_3',{
      params
    });
  }


  getPropostaDia(){
    return api.get('/propostas_dia');
  }
  
}

export default new UserService();
