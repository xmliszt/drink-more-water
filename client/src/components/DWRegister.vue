<template>
  <div class="register-card">
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
    <p>{{ goalInput.prompt }}</p>
    <div class="goal-input">
      <input
        id="goal"
        type="number"
        :placeholder="goalInput.placeholder"
        v-model="form.goal"
        :class="[goalInput.isError && 'error']"
        @input="onGoalChange"
      />
      <label>mL</label>
    </div>
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
      <DWButton size="medium" type="success" @click="onRegister"
        >REGISTER</DWButton
      >
      <DWButton size="medium" type="warning" @click="onGuestEnter"
        >ENTER AS GUEST</DWButton
      >
      <DWButton size="medium" type="primary" @click="onOpenLogin"
        >LOGIN EXISTING</DWButton
      >
    </div>
  </div>
</template>

<script>
import DWButton from "@/components/DWButton.vue";
import { createUserAccount } from "@/services";

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
      goalInput: {
        prompt: "Set a goal for yourself! (mL)",
        placeholder: "2000",
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
        goal: "",
        volume: "",
      },
    };
  },
  methods: {
    validate(isGuest = false) {
      if (this.form.username === "") {
        this.usernameInput.isError = true;
      } else {
        this.usernameInput.isError = false;
      }
      if (!isGuest && this.form.password.length < 6) {
        this.passwordInput.isError = true;
      } else {
        this.passwordInput.isError = false;
      }
      try {
        this.form.volume = Number(this.form.volume);
      } catch (err) {
        this.volumeInput.isError = true;
        return;
      }
      try {
        this.form.goal = Number(this.form.goal);
      } catch (err) {
        this.goalInput.isError = true;
        return;
      }
      if (this.form.volume <= 0) {
        this.volumeInput.isError = true;
      } else {
        this.volumeInput.isError = false;
      }
      if (this.form.goal <= 0) {
        this.goalInput.isError = true;
      } else {
        this.goalInput.isError = false;
      }
    },
    onRegister() {
      this.validate(false);
      !this.usernameInput.isError &&
        !this.passwordInput.isError &&
        !this.goalInput.isError &&
        !this.volumeInput.isError &&
        createUserAccount(
          this.form.username,
          this.form.password,
          this.form.goal,
          this.form.volume
        )
          .then(() => {
            this.$emit("onRegisterSuccess", this.form.username);
          })
          .catch((reason) => {
            if (reason.response.status === 409) {
              alert("User has already been registered!");
            } else {
              alert("Registration failed!");
            }
          });
    },
    onGuestEnter() {
      this.validate(true);
      !this.usernameInput.isError &&
        !this.goalInput.isError &&
        !this.volumeInput.isError &&
        createUserAccount(
          `guest-${this.form.username}`,
          this.form.password,
          this.form.goal,
          this.form.volume
        )
          .then(() => {
            this.$emit("onRegisterSuccess", this.form.username);
          })
          .catch((reason) => {
            if (reason.response.status === 409) {
              alert("Guest name already exists! Please change your name!");
            } else {
              alert("Guest registration failed!");
            }
          });
    },
    onOpenLogin() {
      this.$emit("onOpenLogin");
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
    onGoalChange({ target }) {
      if (target.value.length > 0) {
        this.goalInput.isError = false;
      }
    },
  },
};
</script>

<style>
.register-card {
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
  gap: 10px;
  padding: 20px;
}

.register-card p {
  font-weight: 900;
  font-size: 1rem;
  color: var(--color-text);
  text-align: center;
}

.register-card input {
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

.register-card input.error {
  border-color: var(--color-danger);
  color: var(--color-danger);
  box-shadow: var(--color-danger) 0px 3px 0px 0px;
}

.register-card input:focus {
  border-color: var(--color-accent);
  outline: none;
}

.register-card > div.volume-input,
.register-card > div.goal-input {
  width: 100%;
  display: flex;
  gap: 16px;
}

.register-card > div.buttons {
  margin-top: 24px;
  width: 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 20px;
}

.register-card div label {
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
