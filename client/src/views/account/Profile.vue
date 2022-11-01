<template>
  <div class="container">
    <div class="account">
      <Sidebar />
      <div class="account__content">
        <div class="account-form">
          <div v-if="pageLoading" id="spinner" class="bg-gray"></div>
          <Form v-else class="account-form__form" @submit="onSubmit">
            <BaseInput
              v-for="item in inputInformations"
              :label="item.label"
              :id="item.id"
              :name="item.name"
              :type="item.type"
              :autocomplete="item.autocomplete"
              :strong="item.strong"
              :validate="item.validate"
              :description="item.des"
              :icon="item.icon"
              :disabled="item.disabled"
              :value="userInformations[`${item.name}`]"
              :key="item.id"
            />
            <BaseButton :text="baseButtonText" :loading="buttonLoading" />
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import axiosEmployee from "@/services/employee-service.js";
import constField from "@/constant/constField.js";
import Sidebar from "@/components/common/Sidebar.vue";
export default {
  name: "Profile",
  components: {
    BaseInput,
    BaseButton,
    Form,
    Field,
    ErrorMessage,
    Sidebar,
  },
  props: {
    userId: {
      type: String,
      require: false,
      default: "",
    },
  },
  data() {
    return {
      baseButtonText: "ویرایش اطلاعات",
      buttonLoading: false,
      pageLoading: true,

      inputInformations: constField.inputProfileInformations,

      userInformations: {},
    };
  },
  methods: {
    async onSubmit(event) {
      this.buttonLoading = true;

      try {
        const response = await axiosEmployee.editUser(event);
        this.$swal({
          title: response.data.message,
          icon: "success",
          confirmButtonText: "متوجه شدم.",
        });
      } catch (error) {
        this.$swal({
          title: error,
          icon: "error",
          confirmButtonText: "متوجه شدم.",
        });
      } finally {
        this.buttonLoading = false;
      }
    },
  },
  computed: {
    getUsername() {
      return this.$store.state.userData.userInfo.username;
    },
  },
  async mounted() {
    try {
      let username;
      if (!this.userId) {
        username = this.getUsername;
      } else username = this.userId;

      const response = await axiosEmployee.currentUser(username);
      this.userInformations = response.data;
      this.pageLoading = false;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss">
.account-form {
  &__form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem 4rem;

    @include lessMobileSize {
      display: grid;
      grid-template-columns: unset;
      gap: 2rem;
      padding: 2rem 0 2rem 2rem;
    }
  }
}
</style>
