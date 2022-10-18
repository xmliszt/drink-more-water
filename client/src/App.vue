<template>
  <main>
    <button class="water">
      <font-awesome-icon icon="fa-solid fa-glass-water" />
    </button>
  </main>
</template>

<style scoped>
button {
  background-color: transparent;
}
button.water {
  color: rgb(30, 135, 255);
  font-size: 100px;
  border-width: 0px;
  transition-property: opacity transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  opacity: 0.9;
}

button.water svg {
  filter: drop-shadow(0px 5px 15px 0px rgba(1, 1, 1, 0.2));
  -webkit-filter: drop-shadow(0px 5px 2px rgba(1, 1, 1, 0.2));
}

@media (hover: hover) {
  button:hover {
    cursor: pointer;
    opacity: 0.7;
    transform: scale(1.1);
  }
}

button:active {
  opacity: 1;
  transform: scale(0.9);
}
</style>
