<template>
  <!-- <div
    class="modal  d-block py-5"
    tabindex="-1"
    role="dialog"
    id="Modal_Mensagem"
    style="z-index: 1051; position: fixed; top: 0; left: 0; width: 100%; height: 100%;"
  >
    <div class="modal-dialog  modal-dialog-centered">
      <div class="modal-content card-container rf_texto ">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-pencil-square fs-5 icone_kit"><span class="texto_kit">Informação</span></i>
          </div>          
        </div>
        <div class="modal-body bg-info-msg  text-center">
          
          <p class="fs-6 fw-bold">
           
            {{ msg }}
          </p>
          
        </div>     
      </div>
    </div>
  </div> -->

  <!-- <div class="alert alert-light" role="alert">
    {{ msg }}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div> -->

  <div
    class="modal modal-overlay"
    tabindex="-1"
    role="dialog"
    id="Modal_Mensagem"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-pencil-square fs-5 icone_kit"><span class="texto_kit">Informação</span></i>
          </div>          
        </div>
        <div class="modal-body bg-info-msg text-center">
          <p class="fs-6 fw-bold">{{ msg }}</p>
        </div>     
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Message",
  props: {
    msg: String,
  },
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* escurece o fundo */
  z-index: 1060; /* sobrepõe outros modais */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>