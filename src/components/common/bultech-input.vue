<template>
  <div class="junior-input">
    <h3 v-if="title" class="junior-input__title">{{ title }}</h3>
    <input
      :type="
        type == 'text'
          ? 'text'
          : type == 'number'
          ? 'number'
          : type == 'password'
          ? 'password'
          : 'text'
      "
      :placeholder="placeholder"
      :style="{ backgroundImage: `url(${postfixImage})` }"
      :class="{
        'junior-input__field_reverse': reverseColor,
        'junior-input__field_postfix': postfixImage,
        'junior-input__field_small': smallSize,
      }"
      class="junior-input__field"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
    },
    reverseColor: {
      type: Boolean,
      default: false,
    },
    postfixImage: {
      type: String,
      required: false,
    },
    smallSize: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.junior-input {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.junior-input__title {
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 400;
  color: $black-color-60;
}

.junior-input__field {
  padding: 14px 18px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  background-color: $grey-color;
  background-size: 12px;
  background-repeat: no-repeat;
  background-position: calc(100% - 16px) 50%;
  border: 1px solid $border-color;
  outline: none;
  border-radius: 10px;
  transition: 200ms ease-in-out;
}

.junior-input__field:focus {
  padding-left: 20px;
}

.junior-input__field_reverse {
  background-color: $white-color;
}

.junior-input__field_postfix {
  padding-right: 35px;
}

.junior-input__field_small {
  padding: 12px 16px;
  font-size: 14px;
}
</style>
