<template>
  <RouterView />
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.auth {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  background: #f8f9fb;
  border-radius: 20px;
  padding: 4rem 6rem;

  @include lessMobileSize {
    flex-direction: column;
    gap: 2rem;
    padding: 0;
  }

  &__form {
    flex: 1.22;
    @include lessMobileSize {
      order: 2;
      padding: 2rem 14%;
    }

    p {
      font-size: 14px;

      a {
        color: #1985c6;
      }
    }
  }
  &__logo {
    margin-bottom: 2.5rem;
    img {
      margin: 0 auto;
      @include sm {
        max-width: 70%;
      }
      @include md {
        max-width: 200px;
      }
    }
  }
  &__cover {
    flex: 3;
    @include lessMobileSize {
      order: 1;
    }
  }
}
</style>
