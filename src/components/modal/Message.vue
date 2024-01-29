<template>
  <div
    class="modal  d-block py-5"
    tabindex="-1"
    role="dialog"
    id="Modal_Mensagem"
  >
    <div class="modal-dialog  modal-dialog-centered">
      <div class="modal-content rf_bg_form">
        <div class="modal-header bg-dark rf_border">
              <h5 class="modal-title fs-5 rf_texto" id="staticBackdropLabel">
                <i class="bi bi-info-square"> Informação</i>
              </h5>
            </div>
        <div class="modal-body bg-secondary  text-center">
          
          <p class="fs-6 fw-bold">
           
            {{ msg }}
          </p>
          
        </div>     
      </div>
    </div>
  </div>

  <!-- <div class="alert alert-light" role="alert">
    {{ msg }}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div> -->
</template>
<script>
export default {
  name: "Message",
  props: {
    msg: String,
  },
};
</script>
