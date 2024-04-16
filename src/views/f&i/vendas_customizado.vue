<template>
    <SidebarVue ref="sidebar" />
  <NavgatorFI
    ref="navgator"
    :barraTitulo="' F&I - Vendas'"
    :titulo="'vendas'"
  />
</template>

<script>
import SidebarVue from "../../components/menu/Sidebar.vue";
import NavgatorFI from "../../components/menu/NavgatorFI.vue";
export default {
    name: "Dashboard F&I",

  components: {
    SidebarVue,
    NavgatorFI,

  },
}
</script>

<style>

</style>