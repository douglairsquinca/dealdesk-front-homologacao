<template>
  <div id="app">
    <div class="g-sidenav-show   bg-gray-100">
 
      <router-view />
    </div>
  </div>
</template>
  
<script>
import EventBus from "./common/EventBus";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["funcoes"]) {
        return this.currentUser["funcoes"].includes("Função: ADMINISTRADOR");
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser["funcoes"]) {
        return this.currentUser["funcoes"].includes("Função: Gerente");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  }
};
</script>
