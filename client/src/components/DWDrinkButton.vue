<template>
  <button class="drink">
    <span>+ {{ volume }} mL</span>
    <font-awesome-icon icon="fa-solid fa-glass-water" />
  </button>
</template>

<script>
export default {
  props: ["volume"],
};
</script>

<style scoped>
button.drink {
  position: fixed;
  z-index: 999;
  bottom: 48px;
  width: 160px;
  height: 160px;
  border-radius: 80px;
  outline: none;
  border: 5px solid var(--color-background-soft);
  background-color: var(--color-success);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 6px 0px 0px;
  font-size: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
}

button.drink span {
  font-size: 20px;
  font-weight: 900;
  position: absolute;
  z-index: 1;
  color: var(--color-text);
}

@media (hover: hover) {
  button.drink:hover {
    transform: scale(1.1);
  }
}

button.drink:active {
  box-shadow: var(--color-text) 0px 0px 0px 0px;
  transform: scale(0.95);
}

button.drink svg {
  color: var(--color-background-soft);
}
</style>
