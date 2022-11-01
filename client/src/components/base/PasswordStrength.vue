<template>
  <div class="password-validation">
    <h3 class="password-validation__title">رمز عبور باید:</h3>
    <p :class="[message !== 'minPassword' ? 'valid' : 'invalid']" class="password-validation__message">
        حداقل 8 کاراکتر باشد.
    </p>
    <p :class="[message !== 'partPassword' ? 'valid' : 'invalid']" class="password-validation__message">
        شامل عبارت part باشد.
    </p>
  </div>
</template>

<script>
export default {
  name: "PasswordStrength",
  props: {
    message: String
  }
};
</script>

<style lang="scss" scoped>
.password-validation {
  background: #e9e9e9;
  border-radius: 3px;
  margin-top: 1rem;
  padding: 0.7rem;

  &__title {
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 0.3rem;
  }

  &__message {
    font-size: 14px;
  }

  .valid:before {
    position: relative;
    content: "✔";
  }

  .invalid {
    color: red;
  }

  .invalid:before {
    position: relative;
    content: "✖";
  }
}
</style>