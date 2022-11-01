<template>
    <button class="auth__button btn-text mt-1" :disabled="loading">
        <div v-if="loading" id="spinner"></div>
        <p v-else>{{text}}</p>
    </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    text: String,
    loading: Boolean,
  },
};
</script>

<style>
</style>