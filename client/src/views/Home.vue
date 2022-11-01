<template>
  <Header/>
  Home Page
  <Footer/>
</template>

<script>
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
export default {
  name: "Home",
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
