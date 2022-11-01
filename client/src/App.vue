<template>
  <div v-if="!onLine" class="global-error">
    <p class="global-error__text">دسترسی شما به اینترنت قطع می‌باشد.</p>
  </div>
  <RouterView />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      onLine: navigator.onLine,
    };
  },
  methods: {
    updateConnectionStatus() {
      this.onLine = !this.onLine;
      localStorage.setItem('online', this.onLine);
    },
  },
  mounted() {
    window.addEventListener("online", this.updateConnectionStatus);
    window.addEventListener("offline", this.updateConnectionStatus);
  },
};
</script>

<style scoped></style>
