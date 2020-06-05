<template>
  <div>
  <form class='filter-set'>
        <label for="finish">От:</label>
        <input type="date" id="start" name="from"
               v-model="from"
               min="" max="">

        <label for="finish">До:</label>
        <input type="date" id="finish" name="to"
               v-model="to"
               min="" max="">

        <input type="submit" value="Найти" @click.prevent='getFilterRecognitationObjects'/>
    </form>
    <template v-if='this.$store.state.authUser.is_superuser === true'>
      <form class='get-pdf' action="http://192.168.0.127/api/v1/download-pdf/?from_date=&to=" target="_blank">
        <button>Скачать PDF</button>
      </form>
    </template>
    <!-- <input type="submit" value="Скачать PDF" @click.prevent="getPDF"/> -->
    <!-- <a href="http://192.168.0.127/api/v1/download-pdf/?from_date=&to=" target="_blank">tyt</a> -->
    <div class='table'>
      <table class="recogn-obj-table">
            <thead>
                <td class="user-column">Ф.И.О.</td>
                <td class="datetime-column">Datetime</td>
                <td class="image-column">Фото</td>
            </thead>
               <tr v-for="object in objects" v-bind:key="object.id">
                 <template v-if='object.user_expand.username'>
                   <td class="user-fio-column">{{ object.user_expand.fio }}</td>
                 </template>
                 <template v-else>
                   <td class="user-fio-column">Не найдено</td>
                 </template>
                   <td class="user-username-column">{{ object.created_datetime }}</td>
                   <td class="user-role-column"><img :src="object.user_photo" :alt="object.fio"></td>
              </tr>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecognitationObjectsList",
  data() {
    return {
      objects: [],
      from: '',
      to: '',
    };
  },
  created() {
    this.getAllRecognitationObjects();
  },
  methods: {
   getBase() {
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
     return base
   },
   getAllRecognitationObjects() {
    let base = this.getBase();
    this.axios
      .get(this.$store.state.endpoints.baseUrl + 'recognition-objects/', base)
      .then(response => {
        this.objects = response.data;
      }).catch(error => {
          console.log('-----error-------');
          console.log(error);
      })
    },
    getFilterRecognitationObjects() {
      const base = {
        headers: {
        // Set your Authorization to 'JWT', not Bearer!!!
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        },
        xhrFields: {
            withCredentials: true
        },
        params: {
          from_date: this.from,
          to: this.to,
        }
      };
     this.axios
       .get(this.$store.state.endpoints.baseUrl + 'recognition-objects/filter_set/', base)
       .then(response => {
         this.objects = response.data;
       }).catch(error => {
           console.log('-----error-------');
           console.log(error);
       })
     },
     getPDF() {
       let routeData = this.$router.resolve({ path: 'http://localhost:8000/api/v1/download-pdf/' });
       const base = {
         headers: {
         // Set your Authorization to 'JWT', not Bearer!!!
           Authorization: `JWT ${this.$store.state.jwt}`,
           'Content-Type': 'application/json'
         },
         xhrFields: {
             withCredentials: true
         },
         params: {
           from_date: this.from,
           to: this.to,
         },
       };
      this.axios
        .get(this.$store.state.endpoints.baseUrl + 'download-pdf/', base)
        .then(window.open(routeData.href, '_blank'))
        .catch(error => {
            console.log('-----error-------');
            console.log(error);
        })
      },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#start {
  margin: 0 0.5% 0.5% 0.5%;
}
.filter-set {
  margin: 0 0.5% 0.5% 0.5%;
  }
.get-pdf {
  margin-bottom: 1%;
}
img {
  width: 160px;
  height: 160px;
}
table {
  margin-top: 10px;
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
  // display: block;
  max-width: 100%;
  margin-right: 0;
}
// .table {
//   height: 500px;
//   overflow-y: scroll;
//   align-items: center;
//   align-self: center;
//   border: 1px solid black;
// }

</style>
