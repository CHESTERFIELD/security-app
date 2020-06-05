<template>
  <div class="logout">
      <p>Вы больше не авторизованы.</p>
      <router-link to="/login">Авторизоваться</router-link>
  </div>
</template>

<script>
export default {
  name: "LogoutPage",
  created() {
    this.logout();
  },
  methods: {
    logout() {
          localStorage.clear();
          window.location.reload(true);
       },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
