import api from "./api";
import TokenService from "./token.service";


class AuthService {
  // login(user) {
  //   return api
  //     .post(API_URL + 'signin', {
  //       email: user.email,
  //       password: user.password
  //     })
  //     .then(response => {
  //       if (response.data.accessToken) {
  //         localStorage.setItem('user', JSON.stringify(response.data));
  //       }

  //       return response.data;
  //     });
  // }

  // logout() {
  //   localStorage.removeItem('user');
  // }

  // register(user) {
  //   return axios.post(API_URL + 'signup', {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password
  //   });
  // }
  login({ email, password }) {
    return api
      .post("/auth/signin", {
        email,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, email, password }) {
    return api.post("/auth/signup", {
      username,
      email,
      password
    });
  }

  getToken = async (selectedCompanyId, userId) => {
    try {
      await api.post("/auth/getToken", {
        selectedCompanyId: selectedCompanyId,
        user_id: userId
      }).then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
          console.log(response.data)
        }

        return response.data;
      });
    } catch (error) {
      throw new Error(error.message || "Erro ao obter o token.");
    }
  };
  
}

export default new AuthService();
