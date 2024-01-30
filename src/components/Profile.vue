<template>
  <head>
      <!-- ... outros metadados ... -->
      <link rel="stylesheet" href="https://beehavemarketing.com.br/oda/estilo.css">  
    </head>
  <div class="container rf_container">
    <SidebarVue />
    <nav class="navbar navbar-expand-lg rf_bg_form rf_texto rf_container">
      <div class="container-fluid">
        <div><i class="bi bi-sliders fs-5"> Administração - Perfil </i></div>
        <div>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link class="nav-link rf_texto active" to="/admin">Dashboard /</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link rf_texto disabled">Perfil</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section class="bg-dark text-secondary  text-center">
      <div class="py-4">
        <div class="row ">
          <div class="col-lg-4">
            <div class="rf_card_profile">
              <div class="card-body text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                  class="rounded-circle img-fluid" style="width: 150px" />
                <h5 class="my-3">
                  <strong>{{ currentUser.username }}</strong>
                </h5>
                <h5 class="my-3">
                  <strong>{{ currentUser.email }}</strong>
                </h5>
                
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="rf_card_profile ">
              <div class="card-body g-2 p-4">
             
                <div class="row mt-4">
                  <div class="col-6 mt-5 ">
                    <div class="form-floating">
                      <input type="password" class="form-control rf_bg_form rf_texto" v-model="edit_password" />
                      <label class="rf_texto">Senha</label>
                    </div>
                  </div>
                  <div class="col-6 mt-5">
                    <div class="form-floating">
                      <input type="password" class="form-control rf_bg_form rf_texto" v-model="edit_confirmPassword" />
                      <label class="rf_texto">Confirmar Senha</label>
                    </div>
                  </div>                  
                </div>  
                <div class="row mt-4">
                  <div class="col">
                    <div class="form-floating">
                      <button type="button" @click="update()" class="btn btn-lg btn-secondary">
                        Atualizar Senha
                      </button>
                    </div>                
                 </div>
                </div>    
              </div>         
            </div>
          </div>
        </div>
      </div>    
    </section>
    <div v-if="abrir_modal">
        <Message :msg="msg" v-show="msg" />
      </div>
    <RodapeVue />

 
  </div>
</template>

<script>
import SidebarVue from "./menu/Sidebar.vue";
import axios from "axios";
import Message from "../components/modal/Message.vue";
import RodapeVue from "./menu/Rodape.vue";

export default {
  name: "Profile",
  components: {
    SidebarVue,
    Message,
    RodapeVue
  },
  data() {
    return {
      //Mensagens do Sistema
      msg: null,
      abrir_modal: false,
      
      /// Campos Modal Editar
      edit_id: "",  
      edit_password: "",
      edit_confirmPassword: "", 

    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    } 
  },
  methods: {  
    async update() {
      if (
        (this.edit_password || this.edit_confirmPassword) &&
        this.edit_password !== this.edit_confirmPassword
      ) {
        this.abrir_modal = true;
        this.msg = "As senhas digitadas não são iguais!";
        setTimeout(() => (this.abrir_modal = false), 4000);
        return
      }

      const token = this.$store.state.auth.user.accessToken;
      const id_userCad = this.$store.state.auth.user.id;
      const headers = {
        "x-access-token": token,
      };
      const dados = {
        id: id_userCad,       
        password: this.edit_password,        
        id_userCad: id_userCad,        
      };

      console.log(dados)

      const response = await axios.patch(
        `${process.env.VUE_APP_API_URL}profile/${id_userCad}`,
        dados,
        { headers }
      );
      const resp = JSON.stringify(response.status);
      if (resp == 200) {
        this.edit_password = "";
        this.edit_confirmPassword = ""
        this.abrir_modal = true;
        this.msg = "Alteração realizada com sucesso!";
        setTimeout(() => (this.abrir_modal = false), 4000,);
        location.reload();
      }
    },
  }
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style> 
