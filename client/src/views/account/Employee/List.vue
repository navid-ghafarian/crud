<template>
  <div class="container">
    <div class="account">
      <Sidebar />
      <div class="account__content">
        <BaseSearch @search="search" @delete-item="deleteItem" :search-result="this.searchResult" />

        <router-link class="add-employee-button" :to="{ name: 'add' }">
          افزودن کارمند
        </router-link>

        <div v-if="loading" id="spinner" class="bg-gray"></div>
        <BaseTable
          :loading="loading"
          :columns="colsTable"
          :rows="allUser"
          :row-number="startPage"
          @delete-item="deleteItem"
          @group-action="(data)=>groupAction(data)"
        />

        <Pagination :total-pages="totalPages" :router-name="routerName" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/common/Sidebar.vue";
import BaseSearch from "@/components/base/BaseSearch.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import Pagination from "@/components/base/Pagination.vue";
import axiosEmployee from "@/services/employee-service.js";
export default {
  name: "Employee",
  components: {
    Sidebar,
    BaseSearch,
    BaseTable,
    Pagination,
  },
  data() {
    return {
      allUser: [],
      currentPage: "",
      totalPages: "",
      startPage: "",
      endPage: "",

      routerName: "list",

      colsTable: [
        {
          titleFa: "#",
          titleEng: "#",
          sortable: false,
        },
        {
          titleFa: "نام کاربری",
          titleEng: "username",
          sortable: true,
        },
        {
          titleFa: "کدملی",
          titleEng: "idNumber",
          sortable: false,
        },
        {
          titleFa: "عملیات",
          titleEng: "action",
          sortable: false,
        },
      ],

      loading: true,

      searchResult: [],
      searchLoading: false,
    };
  },
  computed: {
    getUsername() {
      return this.$store.state.userData.userInfo.username;
    },
  },
  async mounted() {
    try {
      const response = await axiosEmployee.allUser();

      response.data.forEach((item, key) => {
        let convertArray = Object.values(item);
        if (convertArray.includes(this.getUsername)) {
          response.data.splice(key, 1);
        }
      });

      this.allUser = response.data;

      const limit = 7;
      this.totalPages = Math.ceil(this.allUser.length / limit);

      if (this.$route.params.page) {
        this.currentPage = this.$route.params.page;
        this.startPage = (this.currentPage - 1) * limit;
        this.endPage = this.currentPage * limit;
        this.allUser = this.allUser.slice(this.startPage, this.endPage);
      } else {
        this.$router.push({ name: "list", params: { page: "1" } });
      }

      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async search(value) {
      this.searchLoading = true;
      this.searchResult = [];

      if (!value) return;
      try {
        const response = await axiosEmployee.currentUser(value);
        this.searchResult.push(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        this.searchLoading = false;
      }
    },
    async deleteItem(username) {
      const response = await this.$swal({
        title: "آیا از حذف کاربر/کاربران اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "آره, پاک کن!",
        cancelButtonText: "نهههه!",
      });

      if (!response.isConfirmed) return;
      try {
        await axiosEmployee.deleteUser(username);
        this.$swal({
          title: "کاربر با موفقیت حذف شد.",
          icon: "success",
        }).then(() => {
          location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    },
    groupAction(data) {
      if (data.groupAction === "delete") {
        let usernames = data.selected;
        this.deleteItem(usernames);
      }
    },
  },
};
</script>

<style lang="scss" scope>
.add-employee-button {
  float: left;
  padding: 0.2rem 1rem;
  border-radius: 3px;
  background: #f26965;
  color: #fff;
  margin: 1rem 1rem 0;
  font-size: 13px;
}
</style>
