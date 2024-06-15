<template>
  <div
    class="modal d-block py-5"
    tabindex="-1"
    role="dialog"
    id="Modal_Mensagem"
    v-if="visible"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content card-container rf_texto">
        <div class="modal-header">
          <div class="card-title gy-4">
            <i class="bi bi-pencil-square fs-5 icone_kit">
              <span class="texto_kit">Informação</span>
            </i>
          </div>
        </div>
        <div class="modal-body bg-info-msg text-center">
          <p class="fs-6 fw-bold">{{ msg }}</p>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
          >
          
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    msg: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
