<template>
  <div class="ui stackable grid container">

    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui dividing header" :fio='fio'>Редактирование профиля {{ fio }}</h2>

        <form class="ui form" >
          <div class="field" >
            <input type="text" placeholder="Ф.И.О." name="name" v-model="fio">
          </div>

          <div class="field">
            <input type="text" placeholder="Username" name="username" v-model="username">
          </div>
          <!-- <div>
              <input id="password" placeholder="Password" type="password" v-model="password" required>
          </div> -->
          <!-- <input type="file" name="fsadada"> -->
          <ErrorBlock :errors='this.errors'></ErrorBlock>
          <div class="row-cb">
             <span><input type="checkbox" id="superuser_checkbox" v-model="is_superuser"></span>
            <label for="checkbox">Назначить администратором</label>
            <div class="clear-both"></div>
          </div>

          <button class="ui button primary" @click.prevent="updateProfile">Update profile</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorBlock from './ErrorBlock.vue'
export default {
  name: 'UserEdit',
  data () {
      return {
          id: 0,
          fio: '',
          username: '',
          // password: '',
          is_staff: true,
          is_superuser: false,
          errors: [],
          }
      },
  components: {
    'ErrorBlock' : ErrorBlock,
  },
  created () {
      this.fetchUser();
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (/[^a-zA-Z0-9]/.test(this.username)) {
          this.errors.push('Логин имеет недопустимые символы');
      }

      if (this.errors.length > 0) {
        e.preventDefault();
      }
    },
      fetchUser () {
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
        this.axios.get(this.$store.state.endpoints.baseUrl + 'users/' + this.$route.params.id + '/', base)
            .then(response => {
                this.id = response.data.id
                this.fio = response.data.fio
                this.username = response.data.username
                // this.password = response.data.password
                this.is_staff = response.data.is_staff
                this.is_superuser = response.data.is_superuser
            })
            .catch(error => {
                console.log('-----error-------');
                console.log(error);
            })
      },
      updateProfile () {
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
        let attr = {
            id: this.id,
            fio: this.fio,
            username: this.username,
            is_staff: this.is_staff,
            is_superuser: this.is_superuser,
        };
          this.checkForm();
          this.axios.put(this.$store.state.endpoints.baseUrl + 'users/' + this.$route.params.id + '/', attr, base)
            .then(this.$router.push('/users'))
            .catch(error => {
                console.log('-----error-------');
                console.log(error);
            })
        }
    }
};
</script>
<style scoped lang="scss">

</style>
