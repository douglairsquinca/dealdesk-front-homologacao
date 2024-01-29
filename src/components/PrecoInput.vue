<template>
    <input v-model="valorOriginal" @input="formatarValor" />
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        valorOriginal: ''
      };
    },
    mounted() {
      this.valorOriginal = this.value;
      this.formatarValor();
    },
    methods: {
      formatarValor() {
        if (!this.valorOriginal) {
          this.$emit('input', '');
          return;
        }
        let valor = this.valorOriginal.toString().replace(/\D/g, '');
        valor = (valor / 100).toFixed(2).replace('.', ',');
        valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        this.$emit('input', valor);
      }
    }
  };
  </script>
  