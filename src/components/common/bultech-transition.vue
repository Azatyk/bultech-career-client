<template>
  <transition name="transition" mode="out-in" appear>
    <slot />
  </transition>
</template>

<style scoped>
.transition-enter-active,
.transition-leave-active {
  transition: opacity 250ms;
}

.transition-enter,
.transition-leave-to {
  opacity: 0;
}
</style>
