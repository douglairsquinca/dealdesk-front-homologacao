import http from "../../http-common"

class DataService {

  getFunctions(params) {
    return http.get("/funcao", {
      params
    });
  }
  getFuncoes(params) {
    return http.get("/funcoes", {
      params
    });
  }
  getFunctionsId(id) {
    return http.get(`/funcao/${id}`);
  }
  putFunctionsId(id) {
    return http.put(`/funcao/${id}`);
  }
  findByTitle(title) {
    return http.get(`/funcao?title=${title}`);
  }

  ////Cidades
  getCidades(params) {
    return http.get("/cidade", {
      params
    });
  }
  getCidadesId(id) {
    return http.get(`/cidade/${id}`);
  }
  putCidadesId(id) {
    return http.put(`/cidade/${id}`);
  }
  findByCidade(title) {
    return http.get(`/cidade?title=${title}`);
  }

  ////Grupo Acessórios
  getGrupoAcessorios(params) {
    return http.get("/acessorios", {
      params
    });
  }
  getGrupoAcessoriosId(id) {
    return http.get(`/grupo_acessorios/${id}`);
  }
  putGruposAcessoriosId(id) {
    return http.put(`/grupo_acessorios/${id}`);
  }
  findByGrupoAcessorios(title) {
    return http.get(`/grupo_acessorios?title=${title}`);
  }

  ////Clientes
  getClientes(params) {
    return http.get("/cliente", {
      params
    });
  }
  getClienteCpfCnpj(params) {
    return http.get("/clienteCpfCnpj", {
      params
    });
  }
  getClienteId(id) {
    return http.get(`/cliente/${id}`);
  }
  putClienteId(id) {
    return http.put(`/cliente/${id}`);
  }
  findByClientes(title) {
    return http.get(`/cliente?title=${title}`);
  }

  ////Empresas
  getEmpresa(params) {
    return http.get("/empresa", {
      params
    });
  }
  getEmpresas() {
    return http.get("/empresas", {
      
    });
  }
  getEmpresaId(id) {
    return http.get(`/empresa/${id}`);
  }
  putEmpresaId(id) {
    return http.put(`/empresa/${id}`);
  }
  findByEmpresa(title) {
    return http.get(`/empresa?title=${title}`);
  }

  //// Combustivel
  getCombustivel(params) {
    return http.get("/combustivel", {
      params
    });
  }
  getCombustivelId(id) {
    return http.get(`/combustivel/${id}`);
  }
  putCombustivelId(id) {
    return http.put(`/combustivel/${id}`);
  }
  findByCombustivel(title) {
    return http.get(`/combustivel?title=${title}`);
  }

  //// Cores Veículo
  getCor(params) {
    return http.get("/cor", {
      params
    });
  }
  getCorId(id) {
    return http.get(`/cor/${id}`);
  }
  putCorId(id) {
    return http.put(`/cor/${id}`);
  }
  findByCor(title) {
    return http.get(`/cor?title=${title}`);
  }

  //// Marca Veículo
  getMarca(params) {
    return http.get("/marcas", {
      params
    });
  }
  getMarcaPaginate(params) {
    return http.get("/marca", {
      params
    });
  }
  getMarcaId(id) {
    return http.get(`/marca/${id}`);
  }
  putMarcaId(id) {
    return http.put(`/marca/${id}`);
  }
  findByMarca(title) {
    return http.get(`/marca?title=${title}`);
  }

  //// Familia Veículo
  getFamilia(params) {
    return http.get("/familia", {
      params
    });
  }
  getFamiliaId(id) {
    return http.get(`/familia/${id}`);
  }
  putFamiliaId(id) {
    return http.put(`/familia/${id}`);
  }
  findByFamilia(title) {
    return http.get(`/familia?title=${title}`);
  }

  //// Modelo Veículo
  getModelo(params) {
    return http.get('/modelo', {
      params
    });
  }
  getModeloId(id) {
    return http.get(`/modelo/${id}`);
  }
  putModeloId(id) {
    return http.put(`/modelo/${id}`);
  }
  findByModelo(title) {
    return http.get(`/modelo?title=${title}`);
  }

  //// Custo Venda Variavel
  getCusto(params) {
    return http.get('/custo', {
      params
    });
  }
  getCustoId(id) {
    return http.get(`/custo/${id}`);
  }
  putCustoId(id) {
    return http.put(`/custo/${id}`);
  }
  findByCusto(title) {
    return http.get(`/custo?title=${title}`);
  }

  //// Usuarios
  getUsers(params) {
    return http.get('/users', {
      params
    });
  }
  getUserId(id) {
    return http.get(`/users/${id}`);
  }
  putUserId(id) {
    return http.put(`/api/users/${id}`);
  }
  findByUser(title) {
    return http.get(`/users?title=${title}`);
  }
  getVendedorInd(params){
    return http.get('/listar_vendedor', {
      params
    });
  }
  getVendedorDispo(params){
    return http.get('/listar_vendedor_dispo', {
      params
    });
  }
  getVendedorOrdenado(params){
    return http.get('/listar_vendedor_ordenado', {
      params
    });
  }


  //// Midias
  getMidia(params) {
    return http.get('/midia', {
      params
    });
  }
  getMidiaId(id) {
    return http.get(`/midia/${id}`);
  }
  putMidiaId(id) {
    return http.put(`/midia/${id}`);
  }
  findByMidia(title) {
    return http.get(`/midia?title=${title}`);
  }

  //// Propostas
  getProposta(params) {
    return http.get('/proposta', {
      params
    });
  }

  getPropostaId(id) {
    return http.get(`/proposta/${id}`);
  }

  getPropostaCliente(params) {
    return http.get('/proposta_cliente',{
    params
    });
  }

  getPropostaMenu(params) {
    return http.get('/proposta_menu',{
    params
    });
  }

  getPropostaClienteId(id) {
    return http.get(`/proposta_cliente/${id}`);
  }

  putPropostaId(id) {
    return http.put(`/proposta/${id}`);
  }
  findByProposta(title) {
    return http.get(`/proposta?title=${title}`);
  }

  ///Estoque
  getEstoqueSincronizar(params) {
    return http.get('/estoque', {
      params
    });
  }
  getEstoqueVeiculo(params) {
    return http.get('/estoque_veiculo', {
      params
    });
  }
  getEstoqueVeiculoId(id) {
    return http.get(`/veiculo_proposta/${id}`);
  }

  ///Itens Avaliação
  getItensId(id) {
    return http.get(`/itens_avaliacao/${id}`);
  }
   // Acessórios

  getAcessorios(params) {
    return http.get('/acessorios',{
      params
    });
  }

  getItensAcessoriosId(id) {
    return http.get(`/itens_acessorios/${id}`);

  }

  getTaxas(params) {
    return http.get('/taxas/ranqueamento', {
      params
    });
  }
  getTaxasAll(params) {
    return http.get('/taxas', {
      params
    });
  }

  getFiltroTaxas_1(params){
    return http.get('/taxas/filtro_ranqueamento_entrada_1',{
      params
    });
  }
  getFiltroTaxas_2(params){
    return http.get('/taxas/filtro_ranqueamento_entrada_2',{
      params
    });
  }
  getFiltroTaxas_3(params){
    return http.get('/taxas/filtro_ranqueamento_entrada_3',{
      params
    });
  }

  getRanqueamento_1(params){
    return http.get('/taxas/ranqueamento_entrada_1',{
      params
    });
  }
  getRanqueamento_2(params){
    return http.get('/taxas/ranqueamento_entrada_2',{
      params
    });
  }
  getRanqueamento_3(params){
    return http.get('/taxas/ranqueamento_entrada_3',{
      params
    });
  }


  getPropostaDia(){
    return http.get('/propostas_dia');
  }



}
export default new DataService();
