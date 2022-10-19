<template>
  <div class="login-card">
    <p>{{ usernameInput.prompt }}</p>
    <input
      id="username"
      type="text"
      :placeholder="usernameInput.placeholder"
      v-model="form.username"
      :class="[usernameInput.isError && 'error']"
      @input="onUsernameChange"
    />
    <p>{{ passwordInput.prompt }}</p>
    <input
      id="password"
      type="password"
      :placeholder="passwordInput.placeholder"
      v-model="form.password"
      :class="[passwordInput.isError && 'error']"
      @input="onPasswordChange"
    />
    <p>{{ volumeInput.prompt }}</p>
    <div class="volume-input">
      <input
        id="volume"
        type="number"
        :placeholder="volumeInput.placeholder"
        v-model="form.volume"
        :class="[volumeInput.isError && 'error']"
        @input="onVolumeChange"
      />
      <label>mL</label>
    </div>
    <div class="buttons">
      <DWButton size="medium" type="success" @click="onLogin">LOGIN</DWButton>
      <DWButton size="medium" type="warning" @click="onGuestEnter"
        >ENTER AS GUEST</DWButton
      >
    </div>
  </div>
</template>

<script>
import DWButton from "@/components/DWButton.vue";

export default {
  components: { DWButton },
  data() {
    return {
      usernameInput: {
        prompt: "What is your name?",
        placeholder: "Name",
        isError: false,
      },
      passwordInput: {
        prompt: "Set a password (optional for guest)",
        placeholder: "****** (at least 6 characters)",
        isError: false,
      },
      volumeInput: {
        prompt: "What is the capacity of your water cup? (mL)",
        placeholder: "550",
        isError: false,
      },
      form: {
        username: "",
        password: "",
        volume: "",
      },
    };
  },
  methods: {
    onLogin() {
      if (this.form.username === "") {
        this.usernameInput.isError = true;
      } else {
        this.usernameInput.isError = false;
      }
      if (this.form.password.length < 6) {
        this.passwordInput.isError = true;
      } else {
        this.passwordInput.isError = false;
      }
      try {
        let volume = Number(this.form.volume);
        this.form.volume = volume;
        if (this.form.volume <= 0) {
          this.volumeInput.isError = true;
        } else {
          console.log(this.form);
        }
      } catch (err) {
        this.volumeInput.isError = true;
      }
    },
    onGuestEnter() {
      if (this.form.username === "") {
        this.usernameInput.isError = true;
      } else {
        this.usernameInput.isError = false;
      }
      this.passwordInput.isError = false;
      try {
        let volume = Number(this.form.volume);
        this.form.volume = volume;
        if (this.form.volume <= 0) {
          this.volumeInput.isError = true;
        } else {
          console.log(this.form);
        }
      } catch (err) {
        this.volumeInput.isError = true;
      }
    },
    onUsernameChange({ target }) {
      if (target.value.length > 0) {
        this.usernameInput.isError = false;
      }
    },
    onPasswordChange({ target }) {
      if (target.value.length > 0) {
        this.passwordInput.isError = false;
      }
    },
    onVolumeChange({ target }) {
      if (target.value.length > 0) {
        this.volumeInput.isError = false;
      }
    },
  },
};
</script>

<style>
.login-card {
  width: 100%;
  z-index: 999;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.7) 0px 0px 10px 0px;
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
  font-size: 1.2rem;
  color: var(--color-text);
  text-align: center;
}

.login-card input {
  height: 40px;
  width: 100%;
  border: 0px solid;
  border-radius: 10px;
  border-width: 3px;
  border-color: var(--color-text);
  font-size: 15px;
  font-weight: 900;
  padding: 10px;
  color: var(--color-accent);
  transition: all 0.2s ease;
  box-shadow: var(--color-accent) 0px 3px 0px 0px;
}

.login-card input.error {
  border-color: var(--color-danger);
  color: var(--color-danger);
  box-shadow: var(--color-danger) 0px 3px 0px 0px;
}

.login-card input:focus {
  border-color: var(--color-accent);
  outline: none;
}

.login-card > div.volume-input {
  display: flex;
  gap: 16px;
}

.login-card > div.buttons {
  margin-top: 24px;
  width: 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 20px;
}

.login-card div label {
  color: var(--color-background);
  border: 3px solid var(--color-text);
  border-radius: 10px;
  width: 40px;
  height: 40px;
  text-align: center;
  font-weight: 900;
  padding-top: 3px;
  padding-left: 3px;
  padding-right: 3px;
  box-shadow: var(--color-accent) 0px 3px 0px 0px;
  background-color: var(--color-text);
}
</style>
