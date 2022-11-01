<template>
  <div v-if="active" class="modal">
    <div v-if="loading" id="spinner"></div>
    <div v-else class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    active: Boolean,
    loading: Boolean,
  },
};
</script>

<style lang="scss">
.modal {
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 900px;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    background: #ebebeb;
    border-radius: 20px;
    padding: 2rem;
    max-height: 300px;

    @include lessMobileSize {
      flex-direction: column;
      gap: 1rem;
      width: 300px;
      max-height: 450px;
      border-radius: 5px;
      overflow-y: scroll;
    }

    &-avatar {
      flex: .7;

      img {
        border-radius: 15px;

        @include lg {
          height: auto;
        }
      }
    }

    &-list {
      flex: 2;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      gap: 1rem;
      width: 100%;
      white-space: nowrap;

      @include lessMobileSize {
        grid-template-columns: unset;
      }

      li {
        background: #dfdfdf;
        padding: 0.5rem 1rem;
        border-radius: 10px;
      }
    }
  }
}
</style>
