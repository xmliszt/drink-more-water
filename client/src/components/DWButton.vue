<template>
  <button :class="[size || 'small', type || 'primary']"><slot /></button>
</template>

<script>
export default {
  props: ["size", "type"],
};
</script>

<style scoped>
button {
  color: white;
  border: 2px solid var(--vt-c-divider-light-1);
  font-weight: 900;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 6px 0px 0px;
}

button:active {
  opacity: 0.6;
  box-shadow: rgba(0, 0, 0, 0) 2px 5px 0px 0px;
  transform: scale(0.95);
}

button.small {
  padding: 0px 15px;
  height: 30px;
  border-radius: 15px;
  border-width: 2px;
}

button.medium {
  padding: 0px 20px;
  height: 44px;
  border-radius: 22px;
  border-width: 4px;
  font-size: 20px;
}

button.large {
  padding: 0px 20px;
  height: 68px;
  border-radius: 34px;
  border-width: 8px;
  font-size: 32px;
}

button.primary {
  background-color: var(--color-primary);
}
button.danger {
  background-color: var(--color-danger);
}
button.success {
  background-color: var(--color-success);
}
button.warning {
  background-color: var(--color-warning);
}
button.info {
  background-color: var(--color-info);
}
</style>
