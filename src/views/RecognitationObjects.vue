<template>
  <div class="recognitation-objects">
    <RecognitationObjectsList />
  </div>
</template>

<script>
// @ is an alias to /src
import RecognitationObjectsList from "@/components/RecognitationObjectsList.vue";

export default {
  name: "RecognitationObjects",
  components: {
    RecognitationObjectsList
  }
};
</script>
