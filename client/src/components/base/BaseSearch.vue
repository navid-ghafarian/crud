<template>
  <div class="search">
    <input
      type="search"
      class="search__input"
      placeholder="جستجو..."
      @input="$emit('search', `${$event.target.value}`)"
      @click="openMask"
      v-model="inputValue"
    />
    <span class="clean" @click="cleanValue" v-if="inputValue">
      <div v-if="loading" id="spinner" class="bg-gray"></div>
      <i v-else class="icon-close"></i>
    </span>
    <div class="search__result">
      <ul v-if="searchResult.length">
        <li
          class="search__list"
          v-for="item in searchResult"
          :key="item.username"
        >
          <router-link
            :to="{ name: 'employee', params: { id: item.username } }"
          >
            {{ item.username }}
          </router-link>
          <span class="delete-button" @click="$emit('deleteItem', `${item.username}`)">
            <i class="icon-delete"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
  <Mask className="mask" :active="mask" z-index="1" @click="maskTrigger" />
</template>

<script>
import Mask from "@/components/base/Mask.vue";
export default {
  name: "BaseSearch",
  components: {
    Mask,
  },
  data() {
    return {
      mask: false,
      inputValue: "",
    };
  },
  props: {
    searchResult: Array,
  },
  methods: {
    cleanValue() {
      this.searchResult.pop();
      this.inputValue = "";
    },
    openMask() {
      this.mask = true;
    },
    maskTrigger() {
      this.mask = !this.mask;
    },
  },
};
</script>

<style lang="scss" scope>
.search {
  z-index: 2;
  position: relative;
  width: 250px;
  background: #eaeaea;
  border-radius: 15px;
  padding: 0.6rem 1.3rem 0.6rem 0;

  @include sm {
    width: 180px;
  }

  &__input {
    width: 100%;
  }
  &__result {
    position: absolute;
    width: 100%;
    background: #eaeaea;
    border-radius: 15px;
    margin-top: 0.7rem;
    right: 0;
  }
  &__list {
    padding: 0.6rem 1.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.clean {
  font-size: 10px;
  position: absolute;
  top: 51%;
  left: 8%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  i {
    color: #939393;
  }
}
</style>