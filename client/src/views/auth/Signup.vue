<template>
  <div class="container">
    <div class="auth">
      <Form class="auth__form" @submit="onSubmit">
        <figure class="auth__logo">
          <img src="@/assets/images/logo.png" alt="Logo" />
        </figure>
        <BaseInput
          v-for="inputInformation in inputInformations"
          :label="inputInformation.label"
          :id="inputInformation.id"
          :name="inputInformation.name"
          :type="inputInformation.type"
          :autocomplete="inputInformation.autocomplete"
          :strong="inputInformation.strong"
          :validate="inputInformation.validate"
          :description="inputInformation.des"
          :icon="inputInformation.icon"
          :key="inputInformation.id"
        />
        <date-picker placeholder="تاریخ تولد"></date-picker>
        <BaseButton :text="baseButtonText" :loading="loading" />
      </Form>
      <figure class="auth__cover">
        <img src="@/assets/images/login-image.png" alt="Login Image" />
      </figure>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import DatePicker from "vue3-persian-datetime-picker";
import axiosEmployee from "@/services/employee-service.js";
import constField from "@/constant/constField.js";
export default {
  name: "Login",
  components: {
    BaseInput,
    BaseButton,
    Form,
    Field,
    ErrorMessage,
    DatePicker,
  },
  data() {
    return {
      baseButtonText: "ثبت نام",
      loading: false,

      inputInformations: constField.inputSignupInformations,
    };
  },
  methods: {
    async onSubmit(event) {
      this.loading = true;

      try {
        const response = await axiosEmployee.signup(event);
        let currentUser = await axiosEmployee.currentUser(event.username);
        currentUser = currentUser.data;

        this.$store.commit("setUserInfo", {
          currentUser,
        });

        this.$swal({
          title: response.data.message,
          icon: "success",
          confirmButtonText: "متوجه شدم.",
        });

        localStorage.setItem("logged", "true");
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        this.$swal({
          title: error,
          icon: "error",
          confirmButtonText: "متوجه شدم.",
        });
      } finally {
        this.loading = false;
      }
    },
    passwordMeter(event) {
      let passwordMeter = event.target.value;

      let strength = 0;
      let length = false;
      let part = false;
      let number = false;
      let upper = false;

      if (passwordMeter.length == 0) {
        this.PasswordStrengthClass = "";
        return;
      }

      if (passwordMeter.length <= 8) {
        length = true;
        strength += 1;
      } else {
        length = false;
        strength += 1;
      }

      if (passwordMeter.toLowerCase().includes("part")) {
        part = true;
        strength += 1;
      } else part = false;

      if (passwordMeter.search(/[0-9]/) != -1) {
        number = true;
        strength += 1;
      } else number = false;

      if (passwordMeter.search(/[A-Z]/) != -1) {
        upper = true;
        strength += 1;
      } else upper = false;

      if (strength == 1) this.PasswordStrengthClass = "veryWeak";
      else if (strength == 2) this.PasswordStrengthClass = "weak";
      else if (strength == 3) this.PasswordStrengthClass = "medium";
      else if (strength == 4) this.PasswordStrengthClass = "stronght";
    },
  },
};
</script>

<style lang="scss" scoped></style>
