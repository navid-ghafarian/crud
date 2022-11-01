<template>
  <RouterView :key="$route.fullPath" />
  <div v-if="$route.params.id">
    <Profile :userId="$route.params.id" />
  </div>
</template>

<script>
import Profile from "@/views/account/Profile.vue";
export default {
  name: "Employee",
  components: {
    Profile,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
