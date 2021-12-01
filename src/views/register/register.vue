<template>
  <div class="register">
    <notification
      :heading="notificationHeading"
      :text="notificationText"
      :status="notificationStatus"
      :isActive="isNotificationActive"
      @close-notification="isNotificationActive = false"
      @open-notification="isNotificationActive = true"
    />
    <h1 class="login-page__title">Регистрация</h1>
    <div class="login-page__inputs">
      <bultech-input
        title="Имя"
        placeholder="Как вас зовут?"
        class="login-page__input"
        v-model="user.firstName"
      />
      <bultech-input
        title="Фамилия"
        placeholder="Ваша фамилия"
        class="login-page__input"
        v-model="user.lastName"
      />
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
      <bultech-button :loading="buttonLoading" @click="handleRegister"
        >Создать аккаунт</bultech-button
      >
      <button @click="$router.push('/auth/login')" class="login-page__link">
        У меня есть аккаунт
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  }),

  computed: mapGetters(["isLoggedIn"]),

  methods: {
    ...mapActions(["register"]),

    handleRegister() {
      this.buttonLoading = true;

      const registerPayload = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
      };

      this.register(registerPayload)
        .then(() => {
          this.$router.push("/app");
        })
        .catch((error) => {
          if (error.responce.status === 409) {
            this.notificationHeading = "Пользователь уже существует";
            this.notificationText =
              "На введенную ваши почту уже зарегистрирован аккаунт";
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
  margin-top: 30px;
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
