<template>
  <RouterView />
</template>

<script>
export default {
  name: "Account",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.account {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
  background: #f8f9fb;
  border-radius: 20px;

  @include lessMobileSize {
    gap: 1rem;
    padding: 0;
  }

  @include lg {
      gap: 2rem;
    }

  &__content {
    flex: 1;
    border-radius: 20px;
    padding: 4rem 6rem;
    margin: 0.7rem 0;

    @include lessMobileSize {
      padding: 0;
    }

    @include lessMobileSize {
      order: 1;
    }

    @include lg {
      padding: 4rem 2rem;
    }
  }
}
</style>
