<template>
  <div class="container">
    <div class="account">
      <Sidebar />
      <div class="account__content"></div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/common/Sidebar.vue";
export default {
  name: "Dashboard",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
