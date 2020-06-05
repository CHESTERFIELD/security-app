<template>
  <div>
    <table class="users-table">
          <thead>
              <td class="user-column">ФИО</td>
              <td class="datetime-column">Username</td>
              <td class="image-column">Роль</td>
          </thead>
             <tr v-for="user in users" v-bind:key="user.id">
                 <td class="user-fio-column"><router-link :to="{ name: 'User', params: { id: user.id }}">{{ user.fio }}</router-link></td>
                 <td class="user-username-column">{{ user.username }}</td>
                 <template v-if='user.is_superuser === true'>
                   <td class="user-role-column">Админ</td>
                 </template>
                 <template v-else>
                   <td class="user-role-column">Сотрудник</td>
                 </template>
            </tr>
      </table>
      <router-link class='add' to="/register">Добавить нового пользователя</router-link>
    </div>
</template>

<script>
export default {
  name: "UsersList",
  data() {
    return {
      users: []
    };
  },
  created() {
    this.getAllUsers();
  },
  methods: {
   getAllUsers() {
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
    this.axios
      .get(this.$store.state.endpoints.baseUrl + "users/", base)
      .then(response => {
        this.users = response.data;
      }).catch(error => {
          console.log('-----error-------');
          console.log(error);
      })
  }
}
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
table {
  margin-left: 25%;
  border-collapse: collapse;
  width: 50%;
}
th, td {
  padding: 15px;
  text-align: left;
}
tr:hover {
  background-color: #f5f5f5;
}
table, th, td {
  border: 1px solid black;
}
table {
  margin-bottom: 20px;
}
</style>
