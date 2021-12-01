<template>
  <div class="app-layout">
    <bultech-button reverse-color @click="handleLogout">Выйти</bultech-button>
  </div>
</template>

<script>
import bultechButton from "@/components/common/bultech-button";
import { mapMutations } from "vuex";

export default {
  components: {
    "bultech-button": bultechButton,
  },

  methods: {
    ...mapMutations(["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/auth/login");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.app-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary-color;
}
</style>
