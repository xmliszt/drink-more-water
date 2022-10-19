<template>
  <div class="login-card">
    <p>{{ usernamePrompt }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernamePrompt: "What is your name?",
    };
  },
};
</script>

<style>
.login-card {
  width: 80%;
  height: 80%;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px 0px;
}
</style>
