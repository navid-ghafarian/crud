<template>
  <Modal :active="modalActive" :loading="modalLoading">
    <figure class="modal__content-avatar">
      <img src="@/assets/images/avatar.jpg" alt="avatar" />
    </figure>
    <ul class="modal__content-list">
      <li v-for="data in modalData" :key="data.username">
        {{ data == 0 ? "مرد" : data == 1 ? "زن" : data }}
      </li>
      <li class="btn-text">
        <router-link class="notfound__content-button" :to="{ name: 'profile' }">
          ویرایش اطلاعات
        </router-link>
      </li>
    </ul>
  </Modal>
  <Mask
    className="mask"
    :active="modalActive"
    z-index="3"
    @click="maskTrigger"
  />

  <div class="sidebar" :class="{ showMenu }">
    <div class="trigger-menu" @click="triggerMenu">
      <i class="icon-menu"></i>
    </div>
    <figure class="sidebar__logo">
      <img src="@/assets/images/logo.png" alt="Logo" />
    </figure>

    <div class="sidebar__user" @click="currentUserInformation">
      <figure class="sidebar__user-avatar">
        <img src="@/assets/images/avatar.jpg" alt="avatar" />
      </figure>
      <p class="sidebar__user-fname">
        {{ getFullName }}
      </p>
    </div>

    <nav class="account-nav" :class="{ showMenu }">
      <ul>
        <MenuList
          v-for="item in listInformations"
          :id="item.id"
          :className="item.className"
          :link="item.link"
          :text="item.text"
          :icon="item.icon"
          :key="item.id"
        />
        <li class="account-nav__item" @click="logout">
          <a>
            <i class="icon-power-off"></i>
            <span>خروج</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import MenuList from "@/components/base/MenuList.vue";
import constField from "@/constant/constField.js";
import Modal from "@/components/base/BaseModal.vue";
import Mask from "@/components/base/Mask.vue";
import axiosEmployee from "@/services/employee-service.js";
export default {
  name: "Sidebar",
  components: {
    MenuList,
    constField,
    Modal,
    Mask,
    axiosEmployee,
  },
  data() {
    return {
      showMenu: false,

      listInformations: constField.accountNavInformations,

      modalLoading: false,
      modalActive: false,
      modalData: [],
    };
  },
  computed: {
    getFullName() {
      if (this.$store.state.userData.userInfo.fullName === "")
        return "کاربر عزیز";
      return this.$store.state.userData.userInfo.fullName;
    },
  },
  methods: {
    async currentUserInformation() {
      this.modalLoading = true;
      this.modalActive = true;

      try {
        const username = this.$store.state.userData.userInfo.username;
        const response = await axiosEmployee.currentUser(username);
        this.modalData = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.modalLoading = false;
      }
    },
    maskTrigger() {
      this.modalActive = !this.modalActive;
    },
    triggerMenu() {
      this.showMenu = !this.showMenu;
    },
    async logout() {
      try {
        await axiosEmployee.logout();

        localStorage.removeItem("logged");
        this.$router.push({ name: "login" });
      } catch {
        this.modalLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 270px;
  background: #eaeaea;
  padding: 2rem 0;
  margin: 0.7rem;
  border-radius: 15px;
  transition: width 0.3s;
  position: sticky;
  top: 10px;

  @include lessMobileSize {
    width: 60px;
    padding: 1rem 6px;
    box-shadow: 1px 0 1px rgba(216, 222, 230, 0.25),
      0px 0px 2px rgba(216, 222, 230, 0.2),
      0px 0px 4px rgba(216, 222, 230, 0.15),
      0px 0px 8px rgba(216, 222, 230, 0.1),
      0px 0px 16px rgba(216, 222, 230, 0.05);
    border-radius: 10px;
  }

  &__logo {
    @include lessMobileSize {
      display: none;
    }
    img {
      width: 160px;
      margin: 0 auto;
    }
  }

  &__user {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 4rem 0;
    gap: 0.1rem;
    text-align: center;
    cursor: pointer;

    @include lessMobileSize {
      margin: 1rem 0;
    }

    &-avatar {
      img {
        width: 65px;
        border-radius: 100px;
        margin: 0 auto;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

        @include sm {
          width: 48px;
        }
      }
    }

    &-fname {
      color: #004e78;
      font-size: 14px;
      white-space: nowrap;
      @include lessMobileSize {
        visibility: hidden;
        opacity: 0;
        transition: opacity 1s;
      }
    }
  }
}

.sidebar.showMenu {
  width: 140px;

  p {
    visibility: visible;
    opacity: 1;
  }
}
</style>
