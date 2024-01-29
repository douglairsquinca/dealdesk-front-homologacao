<template>
  <div class="col-12">
    <div class="card card-container rf_bg_form rf_texto">
      <img id="profile-img" src="../assets/logo.png" class=" img-fluid" />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="email" class="form-control" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <br />
        <div class="form-group">
          <button class="btn btn-secondary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
     
        <div class="form-group">
          <label class="rf_texto">Empresa</label>
          <div class="form-floating">
            <select class="form-select" v-model="empresaSelecionada" @change="redirecionar">
              <option value="">Selecione a empresa</option>
              <option v-for="empresa in empresasLiberadas" :value="empresa.id" :key="empresa.id">{{ empresa.nome }}
              </option>
            </select>
          </div>
        </div>
        

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//import axios from "axios";
import AuthService from '../services/auth.service';

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email não pode ser vazio! "),
      password: yup.string().required("Senha não pode ser vazio!"),
    });

    return {
      loading: false,
      message: "",
      schema,
      empresasLiberadas: [],
      empresaSelecionada: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
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
        return this.currentUser["funcoes"].includes("Função: GERENTE");
      }

      return false;
    },
    showAtendimentoBoard() {
      if (this.currentUser && this.currentUser["funcoes"]) {
        return this.currentUser["funcoes"].includes("Função: RECEPÇÃO");
      }

      return false;
    },
  },
  created() {
    if (this.loggedIn) {
      if (this.showAdminBoard) {
        this.$router.push("/admin");
      } else
        if (this.showModeratorBoard) {
          this.$router.push("/desk/index");
        } else
          if (this.showAtendimentoBoard) {
            this.$router.push("/atendimento/dashboard");
          } else {
            this.$router.push("/profile");
          }

    }
  },
  methods: {
    // handleLogin(user) {
    //   console.log("Dados do usuário logado")
    //   console.log(user)
    //   this.loading = true;

    //   this.$store.dispatch("auth/login", user)
    //     .then(response => {

    //       this.empresasLiberadas = response.empresas
    //       // if (this.empresaSelecionada) {
    //       //   const empresaID = this.empresaSelecionada;

    //       //   if (this.showAdminBoard) {
    //       //     this.$router.push(`/admin/${empresaID}`);
    //       //   } else if (this.showModeratorBoard) {
    //       //     this.$router.push(`/desk/index/${empresaID}`);
    //       //   } else if (this.showAtendimentoBoard) {
    //       //     this.$router.push(`/atendimento/dashboard/${empresaID}`);
    //       //   } else {
    //       //     this.$router.push(`/profile/${empresaID}`);
    //       //   }
    //       // } else {
    //       //   this.$router.push("/profile");
    //       // }



    //     },
    //       (error) => {
    //         this.loading = false;
    //         this.message =
    //           (error.response &&
    //             error.response.data &&
    //             error.response.data.message) ||
    //           error.message ||
    //           error.toString();
    //       }
    //     );
    // },
    // async redirecionar() {
    //   try {    


    //     // Agora, o usuário seleciona uma empresa (vamos supor que ele seleciona a primeira empresa)
    //     const selectedCompanyId = this.empresaSelecionada

    //     // Agora, faça outra solicitação para o servidor para obter o token JWT com a empresa selecionada
    //     const tokenResponse = await axios.post(`${process.env.VUE_APP_API_URL}auth/getToken`, {
    //       selectedCompanyId: selectedCompanyId,
    //       user_id: this.$store.state.auth.user.id
          
    //     });

    //     tokenResponse.data.accessToken;        
           

    //         if (this.showAdminBoard) {
    //           this.$router.push("/admin");
    //         } else if (this.showModeratorBoard) {
    //           this.$router.push("/desk/index");
    //         } else if (this.showAtendimentoBoard) {
    //           this.$router.push("/atendimento/dashboard");
    //         } else {
    //           this.$router.push("/profile");
    //         }
          
          
    //   } catch (error) {
    //     console.error(error);
    //   }

    // }

    async handleLogin(user) {
      console.log("Dados do usuário logado:");
      console.log(user);
      this.loading = true;

      try {
        // Faça o login do usuário com email e senha usando a ação do Vuex
        const response = await this.$store.dispatch("auth/login", user);
        console.log(response)
        // Atualize as empresas liberadas no componente
        this.empresasLiberadas = response.empresas;

        this.loading = false;

        // Se houver empresas liberadas, não é necessário redirecionar aqui,
        // pois o usuário ainda precisa escolher uma empresa.
      } catch (error) {
        this.loading = false;
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    },

    async redirecionar() {
      try {
        // Agora, o usuário seleciona uma empresa
        const selectedCompanyId = this.empresaSelecionada;
            // Obtenha o ID do usuário logado
        const userId = this.$store.state.auth.user.id;

        // Faça a chamada para o servidor para obter o token JWT com a empresa selecionada
        await AuthService.getToken(selectedCompanyId, userId);


        // Determine a rota apropriada com base nas funções do usuário
        if (this.showAdminBoard) {
          this.$router.push("/admin");
        } else if (this.showModeratorBoard) {
          this.$router.push("/desk/index");
        } else if (this.showAtendimentoBoard) {
          this.$router.push("/atendimento/dashboard");
        } else {
          this.$router.push("/profile");
        }
      } catch (error) {
        if (error.response.status == 400) {
          this.abrir_modal = true;
          this.msg = error.response.data.message;
        }
      }
    },
  
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #fff;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  border: none;
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
