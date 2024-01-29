<template>
  <div>  
    <SidebarVue/>    
    <div class="container">
      <header class="jumbotron">
        <h3>{{ content }}</h3>
      </header>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
//import NavibarVue from "./menu/Navibar.vue";
import SidebarVue from "./menu/Sidebar.vue";

export default {
  name: "Home",
  components: {
    //NavibarVue,
    SidebarVue
  },
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
