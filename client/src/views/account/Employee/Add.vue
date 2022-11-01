<template>
  <div class="container">
    <div class="account">
      <Sidebar />
      <div class="account__content">
        <div class="account-form">
          <figure class="auth__logo">
            <img src="@/assets/images/logo.png" alt="Logo" />
          </figure>
          <Form class="account-form__form" @submit="onSubmit">
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
            <date-picker
              v-model="signupData.birthDate"
              placeholder="تاریخ تولد"
            ></date-picker>
            <BaseButton :text="baseButtonText" :loading="loading" />
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/common/Sidebar.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import DatePicker from "vue3-persian-datetime-picker";
import axiosEmployee from "@/services/employee-service.js";
import constField from "@/constant/constField.js";
export default {
  name: "Login",
  components: {
    Sidebar,
    BaseInput,
    BaseButton,
    Form,
    Field,
    ErrorMessage,
    DatePicker,
  },
  data() {
    return {
      signupData: {
        birthDate: "",
      },
      parent: "",

      baseButtonText: "ثبت نام",
      loading: false,

      inputInformations: constField.inputSignupInformations,

      user: {
        username: "",
      },
    };
  },
  methods: {
    async onSubmit(event) {
      this.loading = true;

      try {
        this.parent = this.$store.state.userData.userInfo.username;
        const response = await axiosEmployee.signup(event, this.parent);

        this.$swal({
          title: response,
          icon: "success",
          confirmButtonText: "متوجه شدم.",
        });

        this.$router.push({ name: "list" });
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
  },
};
</script>

<style lang="scss" scoped></style>
