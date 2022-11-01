<template>
  <form @submit.prevent="$emit('groupAction', {groupAction, selected})" v-if="!loading">
    <div class="group-action">
      <select
        name="group-action"
        class="group-action__select"
        v-model="groupAction"
      >
        <option value="" selected disabled hidden>کارهای دسته جمعی</option>
        <option value="delete">حذف</option>
      </select>
      <button class="group-action__buton">انجام</button>
    </div>
    <table class="account-table">
      <thead class="account-table__thead">
        <tr class="account-table__tr">
          <th class="check-table">
            <label for="id-check" class="check-table__label">
              <input
                id="id-check"
                class="check-table__input"
                type="checkbox"
                v-model="selectAll"
              />
              <span class="check-table__checkmark"></span>
            </label>
          </th>
          <th
            v-for="column in columns"
            class="account-table__th"
            :class="{ sortable: column.sortable }"
            @click="sort(column.titleEng)"
            :key="column.titleEng"
          >
            {{ column.titleFa }}
            <i v-if="column.sortable" class="icon-sort"></i>
          </th>
        </tr>
      </thead>

      <tbody class="account-table__tbody">
        <tr
          class="account-table__tr"
          v-for="(user, index) in sortedRows"
          :key="user.username"
        >
          <td class="check-table">
            <label :for="user.username" class="check-table__label">
              <input
                :id="user.username"
                class="check-table__input"
                type="checkbox"
                v-model="selected"
                :value="user.username"
                number
              />
              <span class="check-table__checkmark"></span>
            </label>
          </td>
          <td class="account-table__td">{{ rowNumber + ++index }}</td>
          <td class="account-table__td">{{ user.username }}</td>
          <td class="account-table__td">{{ user.nationalCode }}</td>
          <td class="account-table__td">
            <router-link
              :to="{ name: 'employee', params: { id: user.username } }"
            >
              <i class="icon-edit"></i>
            </router-link>
            <span class="delete-button" @click="$emit('deleteItem', `${user.username}`)">
              <i class="icon-delete"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
export default {
  name: "BaseTable",
  components: {
    BaseButton,
  },
  data() {
    return {
      currentSort: "username",
      currentSortDir: "asc",

      selected: [],

      groupAction: "",
    };
  },
  props: {
    rows: Object,
    columns: Array,
    rowNumber: String,
    loading: Boolean,
  },
  methods: {
    sort(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
  },
  computed: {
    sortedRows() {
      return this.rows.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    selectAll: {
      get() {
        return this.rows ? this.selected.length == this.rows.length : false;
      },
      set(value) {
        let selected = [];

        if (value) {
          this.rows.forEach(function (user) {
            selected.push(user.username);
          });
        }

        this.selected = selected;
      },
    },
  },
};
</script>

<style lang="scss" scope>
.account-table {
  width: 100%;
  padding-top: 2rem;

  @include lessMobileSize {
    padding-top: 1rem;
  }

  &__thead {
    tr {
      @include lessMobileSize {
        display: none;
      }
    }
  }

  &__tr {
    display: grid;
    grid-template-columns: 0.7fr 0.7fr 1.5fr 1.5fr 1fr;
    padding: 0.5rem 0.7rem;
    border-radius: 4px;
    margin-bottom: 0.7rem;
    @include lessMobileSize {
      grid-template-columns: unset;
      gap: 0.7rem;
    }
  }

  &__tbody {
    tr {
      font-size: 14px;

      &:nth-child(2n + 1) {
        background: #e1e1e1;
      }
    }
  }

  &__td {
    @include lessMobileSize {
      display: flex;
      align-items: center;
      gap: 1.2rem;

      &::before {
        width: 45%;
      }
      &:nth-of-type(1):before {
        content: "#";
      }
      &:nth-of-type(2):before {
        content: "نام‌کاربری";
      }
      &:nth-of-type(3):before {
        content: "کدملی";
      }
      &:nth-of-type(4):before {
        content: "عملیات";
      }
    }
    &:last-child {
      display: flex;
      align-items: center;
      gap: 1.2rem;

      a {
        display: flex;
      }

      i {
        font-size: 18px;
      }
    }
  }
}
.delete-button {
  display: flex;
  cursor: pointer;

  i {
    color: #c82e2a;
  }
}
</style>