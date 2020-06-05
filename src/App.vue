<template>
  <div id="app">
    <div id="nav">
    <template v-if='this.$store.state.authUser.is_superuser === true'>
      <div class="rasp-button">
        <div class="switch demo3">
          <input type="checkbox" v-model="checked">
          <label><i></i></label>
        </div>
        <p>Включить распознование на Raspbery Pi</p>
      </div>
    </template>

      <router-link to="/recognitation-objects">Распознанные объекты</router-link> |
      <template v-if='this.$store.state.isAuthenticated === true'>
          <!-- open if authUser isAdmin  -->
          <template v-if='this.$store.state.authUser.is_superuser === true'>
            <router-link to="/users">Список пользователей</router-link> |
          </template>
        <a class='logout' @click="logout">Выйти</a>
        <p>Здраствуйте: {{ this.$store.state.authUser.username }}</p>

      </template>
      <template v-else>
        <router-link to="/login">Войти</router-link>
      </template>

    </div>
    <router-view />
  </div>
</template>

<script>
export default {
data() {
  return {
    checked: false,
  }
},
methods: {
  logout() {
        localStorage.clear();
        window.location.reload(true);
     },
   }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.rasp-button {
  position: absolute;
  // top: 15px;
  // left: 15px;
}
.logout:hover {
  border: 2px solid #000000;
  color: #BA3721;
  size: 2rem;
}

.switch {
  // margin: 100px auto;
  position: relative;
}

.switch label {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
}

.switch input {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* DEMO 3 */

.switch.demo3 {
  width: 90px;
  height: 25px;
}

.switch.demo3 label {
  display: block;
  width: 100%;
  height: 100%;
  background: #a5a39d;
  border-radius: 40px;
  box-shadow:
      inset 0 3px 8px 1px rgba(0,0,0,0.2),
      0 1px 0 rgba(255,255,255,0.5);
}

.switch.demo3 label:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: -8px; right: -8px; bottom: -8px; left: -8px;
  border-radius: inherit;
  background: #ababab;
  background: -moz-linear-gradient(#f2f2f2, #ababab);
  background: -ms-linear-gradient(#f2f2f2, #ababab);
  background: -o-linear-gradient(#f2f2f2, #ababab);
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#f2f2f2), to(#ababab));
  background: -webkit-linear-gradient(#f2f2f2, #ababab);
  background: linear-gradient(#f2f2f2, #ababab);
  box-shadow: 0 0 10px rgba(0,0,0,0.3),
        0 1px 1px rgba(0,0,0,0.25);
}

.switch.demo3 label:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -18px; right: -18px; bottom: -18px; left: -18px;
  border-radius: inherit;
  background: #eee;
  background: -moz-linear-gradient(#e5e7e6, #eee);
  background: -ms-linear-gradient(#e5e7e6, #eee);
  background: -o-linear-gradient(#e5e7e6, #eee);
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#e5e7e6), to(#eee));
  background: -webkit-linear-gradient(#e5e7e6, #eee);
  background: linear-gradient(#e5e7e6, #eee);
  box-shadow:
      0 1px 0 rgba(255,255,255,0.5);
  -webkit-filter: blur(1px);
  -moz-filter: blur(1px);
  -ms-filter: blur(1px);
  -o-filter: blur(1px);
  filter: blur(1px);
}

.switch.demo3 label i {
  display: block;
  height: 100%;
  width: 55%;
  border-radius: inherit;
  background: silver;
  position: absolute;
  z-index: 2;
  right: 45%;
  top: 0;
  background: #b2ac9e;
  background: -moz-linear-gradient(#f7f2f6, #b2ac9e);
  background: -ms-linear-gradient(#f7f2f6, #b2ac9e);
  background: -o-linear-gradient(#f7f2f6, #b2ac9e);
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#f7f2f6), to(#b2ac9e));
  background: -webkit-linear-gradient(#f7f2f6, #b2ac9e);
  background: linear-gradient(#f7f2f6, #b2ac9e);
  box-shadow:
      inset 0 1px 0 white,
      0 0 8px rgba(0,0,0,0.3),
      0 5px 5px rgba(0,0,0,0.2);
}

.switch.demo3 label i:after {
  content: "";
  position: absolute;
  left: 15%;
  top: 25%;
  width: 70%;
  height: 50%;
  background: #d2cbc3;
  background: -moz-linear-gradient(#cbc7bc, #d2cbc3);
  background: -ms-linear-gradient(#cbc7bc, #d2cbc3);
  background: -o-linear-gradient(#cbc7bc, #d2cbc3);
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#cbc7bc), to(#d2cbc3));
  background: -webkit-linear-gradient(#cbc7bc, #d2cbc3);
  background: linear-gradient(#cbc7bc, #d2cbc3);
  border-radius: inherit;
}

.switch.demo3 label i:before {
  content: "выкл";
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  color: rgba(0,0,0,0.4);
  text-shadow: 0 1px 0 #bcb8ae, 0 -1px 0 #97958e;
  font-family: Calibri;
  font-size: 12px;
  position: absolute;
  top: 68%;
  margin-top: -12px;
  right: -70%;
}

.switch.demo3 input:checked ~ label {
  background: #9abb82;
}

.switch.demo3 input:checked ~ label i {
  right: -1%;
}

.switch.demo3 input:checked ~ label i:before {
  content: "вкл";
  top:68%;
  right: 116%;
  color: #82a06a;
  text-shadow:
    0 1px 0 #afcb9b,
    0 -1px 0 #6b8659;
}
</style>
