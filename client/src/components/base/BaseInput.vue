<template>
  <p v-if="description" class="mb-1">{{ description }}</p>
  <div class="form-input" :style="styleParent">
    <i v-if="icon" :class="icon"></i>
    <Field
      class="form-input__input"
      :id="id"
      :type="type"
      :name="name"
      :rules="validate"
      :autocomplete="autocomplete"
      :value="type === 'radio' ? id : ''"
      @keyup="$emit('passwordMeter', `${$event.target.value}`)"
      v-model="value"
      :disabled="disabled"
      required
    />
    <label class="form-input__label" :for="id">
      {{ label }}
    </label>

    <div v-if="strong" class="strength-meter">
      <div class="strength-meter__line" :class="PasswordStrengthClass"></div>
    </div>

    <ErrorMessage class="err-msg" :name="name" v-slot="{ message }">
      <span class="err-msg">{{ message }}</span>
    </ErrorMessage>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
export default {
  name: "BaseInput",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    autocomplete: {
      type: String,
      required: true,
    },
    strong: {
      type: String,
      required: true,
    },
    validate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    disabled: {
      type: String,
      required: false,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      PasswordStrengthClass: "",
      display: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-input {
  position: relative;
  width: 100%;
  margin: 0 0 2rem 0;

  i {
    position: absolute;
    top: 12px;
    font-size: 18px;
    color: #b0b0b0;
  }

  &__input {
    display: block;
    border-bottom: 1px solid #e9e9e9;
    width: 100%;
    padding: 10px 25px 5px 30px;
    color: #014f78;

    @include sm {
      font-size: 13px;
      padding: 10px 25px 5px 10px;
    }

    &:focus + label,
    &:valid + label,
    &:disabled + label {
      top: -2px !important;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &[type="radio"] + label {
      transform: unset;
      position: static;
      min-width: 25px;
    }
  }

  &__input[type="radio"] {
    display: inline;
    width: auto;
    vertical-align: middle;
    margin-left: 10px;
  }

  &__label {
    position: absolute;
    top: 20px;
    right: 30px;
    transform: translateY(-50%);
    color: #a8a8a8;
    transition: all 0.25s;
    cursor: auto;
    cursor: pointer;

    @include sm {
      font-size: 13px;
    }
  }
}

.strength-meter {
  &__line {
    height: 2px;
    width: 0;
    transition: width 0.3s;
  }

  .veryWeak {
    width: 25%;
    background: #ff7979;
  }

  .weak {
    width: 50%;
    background: #fda068;
  }

  .medium {
    width: 75%;
    background: #ffe560;
  }

  .stronght {
    width: 100%;
    background: #9bf47d;
  }
}
</style>
