<template>
  <div
    class="notification"
    :class="{
      'notification-top': position == 'top',
      'notification-bottom': position == 'bottom',
      'notification-active': isActive,
    }"
  >
    <div
      class="notification-mark"
      :class="{
        'notification-mark-success': statusLocal == 'success',
        'notification-mark-warning': statusLocal == 'warning',
        'notification-mark-error': statusLocal == 'error',
      }"
    ></div>
    <i
      class="notification-icon"
      :class="{
        'bx bxs-check-circle notification-icon-success':
          statusLocal == 'success',
        'bx bxs-alarm-exclamation notification-icon-warning':
          statusLocal == 'warning',
        'bx bxs-x-circle notification-icon-error': statusLocal == 'error',
      }"
    ></i>
    <div class="notification-text">
      <h2 class="notification-heading" v-if="headingLocal != ''">
        {{ headingLocal }}
      </h2>
      <p class="notification-paragraph">{{ textLocal }}</p>
    </div>
    <i class="bx bx-x notification-close" @click="handleCloseButton()"></i>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: "success",
    },

    heading: {
      type: String,
      default: "",
    },

    text: {
      type: String,
      default: "",
    },

    position: {
      type: String,
      default: "top",
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      setTimeoutId: null,
      statusLocal: "",
      headingLocal: "",
      textLocal: "",
    };
  },

  watch: {
    isActive() {
      if (this.isActive) {
        this.statusLocal = this.status;
        this.headingLocal = this.heading;
        this.textLocal = this.text;
        this.setTimeoutId = setTimeout(() => {
          this.$emit("close-notification");
        }, 7000);
      }
    },

    heading() {
      if (this.isActive) {
        this.$emit("close-notification");
        clearTimeout(this.setTimeoutId);
        setTimeout(() => {
          this.$emit("open-notification");
        }, 350);
      }
    },
  },

  methods: {
    handleCloseButton() {
      if (this.setTimeoutId) {
        clearTimeout(this.setTimeoutId);
      }

      this.$emit("close-notification");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.notification {
  position: fixed;
  right: -550px;
  padding: 20px 30px 20px 15px;
  max-width: 500px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background-color: $white-color;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.06);
  transition: 350ms ease-in-out;
  z-index: 7;

  &-active {
    right: 20px;
  }

  &-top {
    top: 20px;
  }

  &-bottom {
    bottom: 20px;
  }

  &-mark {
    position: absolute;
    margin-right: 10px;
    height: calc(100% - 40px);
    width: 4px;
    border-radius: 10px;
    background-color: black;

    &-success {
      background-color: $primary-color;
    }

    &-warning {
      background-color: #f1c40f;
    }

    &-error {
      background-color: $error-color;
    }
  }

  &-icon {
    margin-right: 10px;
    margin-left: 10px;
    font-size: 25px;

    &-success {
      color: $primary-color;
    }

    &-warning {
      color: #f1c40f;
    }

    &-error {
      color: $error-color;
    }
  }

  &-text {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
  }

  &-heading {
    margin-bottom: 5px;
    color: $black-color;
    font-size: 18px;
    font-weight: 500;
    opacity: 0.9;
  }

  &-paragraph {
    color: $black-color;
    font-size: 16px;
    line-height: 140%;
    opacity: 0.8;
  }

  &-close {
    color: $black-color;
    font-size: 25px;
    opacity: 0.5;
    z-index: 5;
    cursor: pointer;
    transition: 200ms ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }
}

@media (max-width: 414px) {
  .notification {
    right: -100%;
    max-width: 95%;
    width: 95%;

    &-active {
      right: 2.5%;
    }

    &-heading {
      font-size: 16px;
    }

    &-paragraph {
      font-size: 14px;
    }
  }
}
</style>
