<template>
  <div class="login-card">
    <p>{{ usernamePrompt }}</p>
    <input id="username" type="text" placeholder="Name" />
    <p>{{ passwordPrompt }}</p>
    <input id="password" type="password" placeholder="Password" />
    <p>{{ oneCupPrompt }}</p>
    <div>
      <input id="volume" type="number" placeholder="550" /> <span>mL</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernamePrompt: "What is your name?",
      passwordPrompt: "What is your password?",
      oneCupPrompt: "How much water in one cup of yours? (ml)",
    };
  },
};
</script>

<style>
.login-card {
  width: 100%;
  height: 60%;
  z-index: 999;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
}

.login-card p {
  font-weight: 900;
  font-size: 1rem;
  color: var(--color-text);
  text-align: center;
}

.login-card input {
  height: 40px;
  width: 100%;
  border-radius: 10px;
  border-width: 3px;
  font-size: 15px;
  font-weight: 900;
  color: var(--color-accent);
  transition: all 0.2s ease;
}

.login-card input:focus {
  border-color: var(--color-accent);
}
</style>
