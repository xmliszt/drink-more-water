<template>
  <div class="dw-footer">
    <p>
      <a href="https://xmliszt.github.io/" target="_blank"
        ><span
          >Li Yuxuan
          <font-awesome-icon icon="fa-solid fa-copyright" /> 2022</span
        ></a
      >
      <span> | </span>
      <a href="https://github.com/xmliszt" target="_blank"
        >Github <font-awesome-icon icon="fa-brands fa-github"
      /></a>
      <span> | </span>
      <span
        >Made with
        <a href="https://vuejs.org" target="_blank"
          >VueJS <font-awesome-icon icon="fa-brands fa-vuejs"
        /></a>
        and
        <a href="https://nodejs.org/en/" target="_blank"
          >NodeJS <font-awesome-icon icon="fa-brands fa-node-js" /></a
      ></span>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.dw-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px;
  z-index: 1000;
  text-align: center;
}

.dw-footer a {
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.2s ease;
  -webkit-filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5));
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5));
}

@media (hover: hover) {
  .dw-footer a:hover {
    color: white;
    -webkit-filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5));
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5));
  }
}

.dw-footer p {
  font-size: min(max(1vw, 10px), 2vh);
}
</style>
