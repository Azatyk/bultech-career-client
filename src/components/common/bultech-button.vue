<template>
  <button
    :class="{
      'junior-button_reverse-color': reverseColor,
      'junior-button_border': border,
      'junior-button_small': smallSize,
      'junior-button_loading': loading,
    }"
    class="junior-button"
    @click="$emit('click')"
  >
    <span class="junior-button__content"><slot></slot></span>
  </button>
</template>

<script>
export default {
  props: {
    reverseColor: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    smallSize: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.junior-button {
  position: relative;
  padding: 12px 24px;
  box-sizing: border-box;
  color: $white-color;
  font-size: 16px;
  background-color: $primary-color;
  border: none;
  outline: none;
  border-radius: 10px;
  transition: 200ms ease-in-out;
  cursor: pointer;

  &_loading {
    cursor: default;

    & .junior-button__content {
      visibility: hidden;
      opacity: 0;
    }

    &:hover {
      opacity: 1 !important;
    }

    &::after {
      content: "";
      position: absolute;
      width: 11px;
      height: 11px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 3.5px solid transparent;
      border-top-color: $white-color;
      border-radius: 50%;
      transition: 250ms ease-in-out;
      animation: button-loading-spinner 1s ease infinite;
    }
  }
}

.junior-button__content {
  transition: 250ms ease-in-out;
}

.junior-button:hover {
  opacity: 0.8;
}

.junior-button_small {
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 6px;
}

.junior-button_reverse-color {
  background-color: $white-color;
  color: $primary-color;
}

.junior-button_border {
  background-color: transparent;
  color: $primary-color;
  border: 1px solid $primary-color;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
