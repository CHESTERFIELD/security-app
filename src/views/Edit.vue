<template>
  <div class="user-edit">
    <UserEdit />
  </div>
</template>

<script>
// @ is an alias to /src
import UserEdit from "@/components/UserEdit.vue";

export default {
  name: "Edit",
  components: {
    UserEdit
  }
};
</script>
