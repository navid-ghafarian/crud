<template>
  <div class="container">
    <div class="notfound">
      <div class="notfound__bg">
        <h1 class="notfound__title">404</h1>
      </div>
      <div class="notfound__content">
        <h3 class="notfound__content-title">
          بــــه نـــظر مـــیاد گـــم شـــدی
        </h3>
        <p class="notfound__content-text">
          صفحه موردنظر شما یافت نشد!
        </p>
        <router-link class='notfound__content-button' to="/">
          صفحه اصلی
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.notfound {
  text-align: center;

  &__bg {
    background-image: url('@/assets/images/404.gif');
    height: 400px;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__title {
    font-size: 80px;
    text-align: center;
  }

  &__content-title {
    font-size: 25px;
    letter-spacing: 1px
  }

  &__content-text {
    margin: 0.2rem 0 1.2rem 0;
    font-family: 'Vazir-Light';
    font-size: 17px;
  }
}
</style>
