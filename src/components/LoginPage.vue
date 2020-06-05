<template lang="html">
  <div>
    <p class='info-title'>Вы не авторизованы. Авторизуйтесь, чтобы иметь доступ к компонентам программы.</p>
    <div class='login-page'>
    <form class="login form">
      <div class="field">
        <input v-model="username" type="text" placeholder="Username" autofocus="autofocus" maxlength="150" id="id_username">
      </div>
      <div class="field">
        <input v-model="password" type="password" placeholder="Password" id="id_password">
      </div>
      <ErrorBlock :errors='this.errors'></ErrorBlock>
      <button @click.prevent="authenticate" class="button primary" >
        Войти
      </button>
    </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import ErrorBlock from './ErrorBlock.vue'

export default {
  data () {
    return {
      username: '',
      password: '',
      errors: [],
    }
  },
  components: {
    'ErrorBlock' : ErrorBlock,
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (/[^a-zA-Z0-9]/.test(this.username)) {
          this.errors.push('Логин имеет недопустимые символы');
      }
      if (this.password === "" || this.username === "") {
          this.errors.push('Поля не могут быть пустыми');
      }

      if (this.errors.length > 0) {
        e.preventDefault();
      }
    },
    authenticate () {
      const payload = {
        username: this.username,
        password: this.password
      }
      this.checkForm();
      axios.post(this.$store.state.endpoints.obtainJWT, payload)
        .then((response) => {
          this.$store.commit('updateToken', response.data.token);
          this.login();
        }).catch(err => {
              this.errors.push("Неверные логин или пароль");
              console.log(err);
            })
      },
        // Even though the authentication returned a user object that can be
        // decoded, we fetch it again. This way we aren't super dependant on
        // JWT and can plug in something else.
        login() {
          const base = {
             headers: {
             // Set your Authorization to 'JWT', not Bearer!!!
               Authorization: `JWT ${this.$store.state.jwt}`,
               'Content-Type': 'application/json'
             },
             xhrFields: {
                 withCredentials: true
             },
             username: this.username,
             password: this.password,
           }
          axios.post(this.$store.state.endpoints.baseUrl + 'login/', base)
            .then((response) => {
              this.$store.commit("setAuthUser",
                {authUser: response.data, isAuthenticated: true}
              )
              this.$router.push({name: 'RecognitationObjects'})
            })
        .catch((error) => {
          console.log(error);
          console.debug(error);
          console.dir(error);
        })
    }
  }
}
</script>

<style lang="css">
.info-title{
  background: rgba(222, 222, 52, 0.82);
  font-family: Arial;
  font-size: 14px;
  padding: 10px 10px;
  width: 660px;
  margin: auto;
}
.login-page {
  width: 360px;
  padding: 2% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
</style>
