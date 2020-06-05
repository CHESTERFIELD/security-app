<template>
  <div class="user">
    <UserDetail />
  </div>
</template>

<script>
// @ is an alias to /src
import UserDetail from "@/components/UserDetail.vue";

export default {
  name: "User",
  components: {
    UserDetail
  }
};
</script>
