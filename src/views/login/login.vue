<template>
  <div class="login">
    <notification
      :heading="notificationHeading"
      :text="notificationText"
      :status="notificationStatus"
      :isActive="isNotificationActive"
      @close-notification="isNotificationActive = false"
      @open-notification="isNotificationActive = true"
    />
    <h1 class="login-page__title">Вход в аккаунт</h1>
    <div class="login-page__inputs">
      <bultech-input
        title="Почта"
        placeholder="Ваша электронная почта для входа"
        class="login-page__input"
        v-model="user.email"
      />
      <bultech-input
        title="Пароль"
        placeholder="Ваш пароль для входа"
        type="password"
        class="login-page__input"
        v-model="user.password"
      />
    </div>
    <div class="login-page__buttons">
      <bultech-button :loading="buttonLoading" @click="handleLogin"
        >Войти</bultech-button
      >
      <button @click="$router.push('/auth/register')" class="login-page__link">
        У меня нет аккаунта
      </button>
    </div>
  </div>
</template>

<script>
import bultechInput from "@/components/common/bultech-input";
import bultechButton from "@/components/common/bultech-button";
import notification from "@/components/common/notification";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    "bultech-input": bultechInput,
    "bultech-button": bultechButton,
    notification,
  },

  data: () => ({
    notificationHeading: "",
    notificationText: "",
    notificationStatus: "error",
    isNotificationActive: false,
    buttonLoading: false,
    user: {
      email: "",
      password: "",
    },
  }),

  computed: mapGetters(["isLoggedIn"]),

  methods: {
    ...mapActions(["login"]),

    handleLogin() {
      this.buttonLoading = true;

      const loginPayload = {
        email: this.user.email,
        password: this.user.password,
      };

      this.login(loginPayload)
        .then(() => {
          this.$router.push("/app");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.notificationHeading = "Неверные данные";
            this.notificationText =
              "Проверьте вашу почту и пароль, что-то из не правильное";
            this.notificationStatus = "error";
            this.isNotificationActive = true;
          } else {
            this.notificationHeading = "Что-то пошло не так";
            this.notificationText =
              "Пожалуйста, перезагрузите страницу и попробуйте снова";
            this.notificationStatus = "error";
            this.isNotificationActive = true;
          }
        })
        .finally(() => (this.buttonLoading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.login-page__title {
  margin-top: 80px;
  margin-bottom: 20px;
  font-size: 34px;
  font-weight: 500;
  color: $black-color;
}

.login-page__inputs {
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.login-page__input {
  margin-bottom: 30px;
}

.login-page__buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.login-page__link {
  margin-left: 20px;
  padding: 0;
  font-size: 16px;
  color: $primary-color;
  background-color: transparent;
  border: none;
  outline: none;
  transition: 200ms ease-in-out;
  cursor: pointer;
}

.login-page__link:hover {
  opacity: 0.7;
}
</style>
