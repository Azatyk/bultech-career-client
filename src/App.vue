<template>
  <div id="app">
    <div class="desktop-content">
      <router-view />
    </div>
    <div class="mobile-backdrop">
      <img
        src="@/assets/images/space-man.svg"
        alt="Человек в космосе"
        class="mobile-backdrop__image"
      />
      <p class="mobile-backdrop__description">
        Приложение пока не работает на мобильных устройствах. Пожалуйста,
        зайдите с компьютера
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.mobile-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: $primary-color;
}

.mobile-backdrop__image {
  width: 240px;
}

.mobile-backdrop__description {
  width: 70%;
  margin-top: 40px;
  font-size: 18px;
  text-align: center;
  line-height: 1.4;
}

@media all and (max-width: 1100px) {
  .mobile-backdrop {
    display: flex;
  }

  .desktop-content {
    display: none;
  }
}
</style>
