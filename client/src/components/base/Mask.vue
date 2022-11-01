<template>
  <div
    v-if="active"
    :class="className"
    :style="{ zIndex }"
  ></div>
</template>

<script>
export default {
  name: "Mask",
  props: {
    className: String,
    active: Boolean,
    zIndex: Number,
  },
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  background-color: rgba(30, 29, 29, 0.6);
  width: 100%;
  height: 100%;
}
</style>
