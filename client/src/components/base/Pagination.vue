<template>
  <ul class="pagination">
    <li class="pagination__list" v-for="page in totalPages" :key="page">
      <router-link class="pagination__link" :to="{ name: routerName, params: { page: page } }">
        {{ page }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalPages: Number,
    routerName: String,
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding-top: 2rem;

  @include lessMobileSize {
    padding-top: 1rem;
  }

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background: #004e78;
    color: #fff;
    border-radius: 3px;

    @include lessMobileSize {
      width: 30px;
      height: 30px;
      font-size: 14px;
    }

    &.router-link-active {
      background: #f26965;
    }
  }
}
</style>