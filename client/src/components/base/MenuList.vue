<template>
  <li :class="className">
    <router-link :to="{ name: link }">
      <i :class="icon"></i>
      <span>{{ text }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "MenuList",
  props: {
    id: String,
    className: String,
    text: String,
    link: String,
    icon: String,
  },
};
</script>

<style lang="scss">
.account-nav {
  padding-right: 3rem;

  @include lessMobileSize {
    padding: 5px;
  }

  &__item {
    font-size: 14px;
    margin-bottom: 1rem;

    i {
      font-size: 21px;
      @include lessMobileSize {
        font-size: 25px;
      }
    }

    a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 0 20px 20px 0;

      @include lessMobileSize {
        padding: 5px;

        span {
          visibility: hidden;
          opacity: 0;
          transition: opacity 1s;
        }
      }

      //router link active
      &.router-link-active {
        background-color: #f8f9fb;
        color: #35505f;
        @include lessMobileSize {
          background-color: transparent;
        }

        i {
          @include lessMobileSize {
            filter: drop-shadow(0 0 10px #4444dd);
          }
        }
      }
    }
  }
}

.account-nav.showMenu {
  a {
    span {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
