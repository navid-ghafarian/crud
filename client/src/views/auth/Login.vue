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
          :validate="inputInformation.validate"
          :icon="inputInformation.icon"

          :key="inputInformation.id"
        />
        <BaseButton :text="baseButtonText" :loading="loading" />
        <p class="mt-1">
          کاربر جدید هستید؟
          <router-link class="notfound__content-button" :to="{ name: 'signup' }">
            ثبت نام کنید.
          </router-link>
        </p>
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
  },
  data() {
    return {
      username: "",
      password: "",

      baseButtonText: "ورود",
      loading: false,

      inputInformations: constField.inputLoginInformations,
    };
  },
  methods: {
    async onSubmit(event) {
      console.log("submited");
      this.loading = true;

      try {

        const response = await axiosEmployee.login(event.username, event.password);
        let currentUser = await axiosEmployee.currentUser(event.username);
        currentUser = currentUser.data;
        this.$store.commit('setUserInfo', {
          currentUser
        });

        this.loading = false;
        this.$swal({
          title: response.data.data.message,
          icon: "success",
          confirmButtonText: "متوجه شدم.",
        });

        localStorage.setItem("logged", "true");
        this.$router.push({ name: "dashboard" });

      } catch (error) {

        this.loading = false;
        this.$swal({ title: error, icon: "error", confirmButtonText: "متوجه شدم." });

      }
    },
  },
  mounted() {
    console.log(this.$store.state.userData.userInfo.username);
  },
};
</script>

<style lang="scss" scoped></style>
