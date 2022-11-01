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
    <div class="buttons">
      <DWButton size="medium" type="primary" @click="onLogin">LOGIN</DWButton>
      <DWButton size="medium" type="warning" @click="onOpenRegister"
        >REGISTER</DWButton
      >
    </div>
  </div>
</template>

<script>
import DWButton from "@/components/DWButton.vue";
import { loginUser, fetchUser } from "@/services";
import { useToast } from "vue-toastification";

export default {
  components: { DWButton },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      usernameInput: {
        prompt: "What is your name?",
        placeholder: "Name",
        isError: false,
      },
      passwordInput: {
        prompt: "Enter your password",
        placeholder: "******",
        isError: false,
      },
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    validate() {
      if (this.form.username === "") {
        this.usernameInput.isError = true;
      } else {
        this.usernameInput.isError = false;
      }
    },
    onLogin() {
      this.validate();
      !this.usernameInput.isError &&
        !this.passwordInput.isError &&
        loginUser(this.form.username, this.form.password)
          .then(() => {
            fetchUser(this.form.username)
              .then((response) => {
                this.$emit("onLoginSuccess", {
                  name: response.data.name,
                  goal: response.data.goal,
                  volume: response.data.volume,
                });
              })
              .catch((err) => {
                console.log(err);
                this.toast.error("Failed to login!");
              });
          })
          .catch((err) => {
            if (err === "wrong password") {
              this.toast.error("Wrong password!");
              this.passwordInput.isError = true;
            } else if (err === "user not exist") {
              this.toast.error(
                "User does not exist! Please register or enter as guest!"
              );
              this.$emit("onOpenRegister");
            } else {
              console.log(err);
              this.toast.error("Failed to login!");
            }
          });
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
    onOpenRegister() {
      this.$emit("onOpenRegister");
    },
  },
};
</script>

<style>
.login-card {
  width: 100%;
  height: 100%;
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
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.login-card::-webkit-scrollbar {
  display: none;
}

.login-card p {
  font-weight: 900;
  font-size: 1rem;
  color: var(--color-text);
  text-align: left;
  width: 100%;
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
