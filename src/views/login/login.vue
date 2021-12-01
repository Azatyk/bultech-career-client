<template>
  <div class="login-page">
    <notification
      :heading="notificationHeading"
      :text="notificationText"
      :status="notificationStatus"
      :isActive="isNotificationActive"
      @close-notification="isNotificationActive = false"
      @open-notification="isNotificationActive = true"
    />
    <div class="login-page__info">
      <div class="login-page__content">
        <div class="login-page__logo">
          <h2 class="login-page__logo-title">
            Bultech <span class="login-page__logo-extra">career</span>
          </h2>
        </div>
        <h1 class="login-page__title">Вход в аккаунт</h1>
        <div class="login-page__inputs">
          <bultech-input
            title="Почта"
            placeholder="Ваша электронная почта для входа"
            class="login-page__input"
          />
          <bultech-input
            title="Пароль"
            placeholder="Ваш пароль для входа"
            type="password"
            class="login-page__input"
          />
        </div>
        <div class="login-page__buttons">
          <bultech-button :loading="buttonLoading" @click="handleWrongLogin"
            >Войти</bultech-button
          >
        </div>
      </div>
    </div>
    <div class="login-page__decoration">
      <img :src="loginImage" alt="Users cards" class="login-page__image" />
      <div class="login-page__bottom-right" />
      <div class="login-page__bottom-left" />
      <div class="login-page__top-right" />
      <div class="login-page__top-left" />
    </div>
  </div>
</template>

<script>
import bultechInput from "@/components/common/bultech-input";
import bultechButton from "@/components/common/bultech-button";
import notification from "@/components/common/notification";
import loginImage from "@/assets/images/logo-white.png";
import { mapMutations, mapGetters } from "vuex";

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
    loginImage,
  }),

  computed: mapGetters(["isLoggedIn"]),

  methods: {
    ...mapMutations(["login"]),
    handleWrongLogin() {
      this.buttonLoading = true;
      setTimeout(() => {
        this.notificationHeading = "Неверные данные";
        this.notificationText =
          "Проверьте правильность логина и пароля и попробуйте снова";
        this.isNotificationActive = true;
        this.buttonLoading = false;
      }, 1000);
    },

    handleLogin() {
      this.login();
      this.$router.push("/bloggers").catch(() => console.log("Error"));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
}

.login-page__info {
  padding-left: 10%;
  box-sizing: border-box;
  width: 50% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: $white-color;
}

.login-page__content {
  margin-top: -15%;
  width: 400px;
}

.login-page__logo {
  margin-bottom: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.login-page__logo-image {
  margin-right: 10px;
  width: 40px;
  height: 40px;
}

.login-page__logo-title {
  font-size: 32px;
  font-weight: 900;
  color: $primary-color;
}

.login-page__logo-extra {
  font-weight: 400;
  font-style: italic;
}

.login-page__title {
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

.login-page__decoration {
  position: relative;
  width: 50% !important;
  background-color: $primary-color;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-page__image {
  width: 36%;
}

.login-page__bottom-left {
  position: absolute;
  left: -180px;
  bottom: -140px;
  width: 360px;
  height: 360px;
  border-radius: 400px;
  background-color: #fe7053;
}

.login-page__bottom-right {
  position: absolute;
  left: -40px;
  bottom: -260px;
  width: 360px;
  height: 360px;
  border-radius: 400px;
  background-color: #fe8167;
}

.login-page__top-left {
  position: absolute;
  right: -40px;
  top: -230px;
  width: 360px;
  height: 360px;
  border-radius: 400px;
  background-color: #fe7053;
}

.login-page__top-right {
  position: absolute;
  right: -200px;
  top: -140px;
  width: 360px;
  height: 360px;
  border-radius: 400px;
  background-color: #fe8167;
}

.login-modal__list {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.login-modal__text {
  margin-bottom: 8px;
  width: 100%;
  font-size: 17px;
  line-height: 155%;
}

.login-modal__text:last-child {
  margin-bottom: 0px;
}
</style>
