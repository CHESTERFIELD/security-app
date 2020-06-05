<template>
  <div class="user-detail-page">
    <h4>Профиль пользователя {{ this.user.fio }}</h4>
    <form class="form">
      <div>
          <label class='detail-username'>Username</label>
          <input id="username" placeholder="Username" type="text" v-model="user.username" readonly="readonly"/>
      </div>
      <div>
          <label class='detail-fio'>Ф.И.О.</label>
          <input id="fio" placeholder="Ф.И.О" type="text" v-model="user.fio" readonly="readonly"/>
      </div>
      <div>
          <label class='detail-role'>Роль</label>
          <template v-if='this.user.is_superuser === true'>
            <input id="role" placeholder="Роль" type="text" value="Администратор" readonly="readonly"/>
          </template>
          <template v-else>
            <input id="role" placeholder="Роль" type="text" value="Сотрудник" readonly="readonly" />
          </template>
      </div>
    </form>
   <div class="user-config">
      <router-link :to="{ name: 'Edit', params: {id: user.id} }">Редактировать пользователя</router-link>
      <form class='delete-user'>
          <input type="submit" value="Удалить пользователя" @click.prevent="deleteUser"/>
      </form>
   </div>
</div>
</template>

<script>
export default {
  name: "UsersDetail",
  data() {
    return {
      user: []
    };
  },
  created() {
    this.getOneUser();
  },
  methods: {
    deleteUser() {
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
    if (confirm('Уверены, что желаете удалить пользователя ' + this.user.fio + " ?")) {
       this.axios
         .delete(this.$store.state.endpoints.baseUrl + 'users/' + this.$route.params.id + '/', base)
         .then(this.$router.push('/users')
         ).catch(error => {
             console.log('-----error-------');
             console.log(error);
         })
      } else {
        this.$router.go(-1);
      }
    },
   getOneUser() {
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
      .get(this.$store.state.endpoints.baseUrl + 'users/' + this.$route.params.id + '/', base)
      .then(response => {
        this.user = response.data;
      }).catch(error => {
          console.log('-----error-------');
          console.log(error);
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form {
  margin: 0 auto 50px !important;
}
.user-config {
  display: inline-block;
}
.user-config router-link {
    float: left;
}
.user-config form {
    float: right;
    margin-left: 20px;
}
</style>
