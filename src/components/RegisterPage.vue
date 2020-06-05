<template>
  <div class="register-page">
    <h4>Добавление нового пользователя</h4>
    <form class="form">
      <div>
          <input id="username" placeholder="Username" type="text" v-model="username" required autofocus>
      </div>
      <div>
          <input id="fio" placeholder="Ф.И.О" type="text" v-model="fio" required>
      </div>
      <div>
          <input id="password" placeholder="Password" type="password" v-model="password" required>
      </div>
      <div>
          <input id="password-confirm" placeholder="Confirm password" type="password" v-model="password_confirmation" required>
      </div>
      <ErrorBlock :errors='this.errors'></ErrorBlock>
      <div class="row-cb">
         <span><input type="checkbox" id="superuser_checkbox" v-model="is_superuser"></span>
        <label for="checkbox">Назначить администратором</label>
        <div class="clear-both"></div>
      </div>
      <div>
          <button type="submit" @click.prevent='register'>Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorBlock from './ErrorBlock.vue'

  export default {
    name: "RegisterPage",
    data(){
      return {
        username : "",
        fio : "",
        password : "",
        password_confirmation : "",
        is_staff: true,
        is_superuser: false,
        errors: [],
      }
    },
    components: {
      'ErrorBlock' : ErrorBlock,
    },
    methods: {
      checkForm: function (e) {
        this.errors = [];

        if (this.password !== this.password_confirmation) {
          this.errors.push('Пароли не совпадают');
        }
        if (this.password.length < 8) {
          this.errors.push('Пароль должен быть больше 7 символов');
        }
        if (/[^a-zA-Z0-9]/.test(this.username)) {
            this.errors.push('Логин имеет недопустимые символы');
        }
        if (/[^a-zA-Z0-9]/.test(this.password)) {
            this.errors.push('Пароль имеет недопустимые символы');
        }
        if (this.errors.length > 0) {
          e.preventDefault();
        }
      },
      register: function () {
        const base = {
          headers: {
          // Set your Authorization to 'JWT', not Bearer!!!
            Authorization: `JWT ${this.$store.state.jwt}`,
            'Content-Type': 'application/json'
          },
          xhrFields: {
              withCredentials: true
          }
        };
        let data = {
          username: this.username,
          fio: this.fio,
          password: this.password,
          is_staff: this.is_staff,
          is_superuser: this.is_superuser
        }
        this.checkForm();
        this.axios.post(this.$store.state.endpoints.baseUrl + 'users/', data, base)
       .then(() => this.$router.push('/users'))
       .catch(err => console.log(err))
      }
    },
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

.register-page {
  margin-top: -38px;
}

.row-cb {
  width: 285px;
  margin: auto;
}

.row-cb label {
  float: left;
  text-align: left;
}
.row-cb span {
  float: left;
  text-align: left;
  width: 50px;
 }

.clear-both {
  clear: both
}
</style>
