<template>
  <div class="dw-setting">
    <div class="container">
      <div class="header">
        <div class="title">{{ title }}</div>
        <button class="close-btn" @click="close">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
      </div>
      <p>{{ goalInput.prompt }}</p>
      <div class="goal-input">
        <input
          id="goal"
          type="number"
          :placeholder="goalInput.placeholder"
          v-model="form.goal"
          min="0"
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
          min="0"
          :class="[volumeInput.isError && 'error']"
          @input="onVolumeChange"
        />
        <label>mL</label>
      </div>
      <div class="buttons">
        <DWButton size="medium" type="warning" @click="onUpdate"
          >UPDATE</DWButton
        >
      </div>
    </div>
  </div>
</template>
<script>
import DWButton from "@/components/DWButton.vue";
import { updateUserGoal, updateUserVolume } from "@/services";
import { getUser, setUser } from "../utils";
import { useToast } from "vue-toastification";

export default {
  components: { DWButton },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      title: "Settings",
      goalInput: {
        prompt: "Change your goal: How much water to drink for a day?",
        placeholder: "",
        isError: false,
      },
      volumeInput: {
        prompt:
          "Change the capacity of your cup: How much water does your cup hold?",
        placeholder: "",
        isError: false,
      },
      form: {
        goal: 0,
        volume: 0,
      },
    };
  },
  methods: {
    setCurrent(user) {
      console.log(user);
      if (user) {
        this.goalInput.placeholder = user.goal;
        this.form.goal = user.goal;
        this.volumeInput.placeholder = user.volume;
        this.form.volume = user.volume;
      } else {
        this.$emit("onLoginFailed");
      }
    },
    close() {
      this.$emit("onSettingClosed");
    },
    validate() {
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
    showToastAfterValidation() {
      if (this.goalInput.isError) {
        this.toast.error("Goal should only be positive integer value!");
      } else if (this.volumeInput.isError) {
        this.toast.error("Capacity should only be positive integer value!");
      }
    },
    async onUpdate() {
      this.validate();
      this.showToastAfterValidation();
      const user = getUser();
      if (user) {
        let username = user.name;
        if (!this.goalInput.isError && !this.volumeInput.isError) {
          try {
            let responseGoal = await updateUserGoal(username, this.form.goal);
            let user = responseGoal.data.user;
            let responseVolume = await updateUserVolume(
              username,
              this.form.volume
            );
            user.volume = responseVolume.data.user.volume;
            setUser(user);
            this.toast.success("Updated successfully!");
            this.$emit("onUpdateSuccess", user);
            this.close();
          } catch (reason) {
            console.log(reason);
            this.toast.error("Update failed!");
          }
        }
      } else {
        this.$emit("onLoginFailed");
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

<style scoped>
.dw-setting {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.dw-setting div.container {
  width: 80vw;
  height: 80vh;
  background-color: var(--color-background-soft);
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  gap: 20px;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
}

.dw-setting div.container::-webkit-scrollbar {
  display: none;
}

.dw-setting div.title {
  font-size: 1.8rem;
  font-weight: 900;
}

.dw-setting button.close-btn {
  font-size: 2rem;
  color: var(--color-text);
  background: none;
  border: none;
}

.dw-setting div.header {
  position: sticky;
  padding: 10px 16px;
  top: 0px;
  width: 100%;
  display: flex;
  gap: 0px;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-background-soft);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 999;
}

.container p {
  font-weight: 900;
  font-size: 1rem;
  color: var(--color-text);
  text-align: left;
  width: 100%;
}

.container input {
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

.container input.error {
  border-color: var(--color-danger);
  color: var(--color-danger);
  box-shadow: var(--color-danger) 0px 3px 0px 0px;
}

.container input:focus {
  border-color: var(--color-accent);
  outline: none;
}

.container > div.volume-input,
.container > div.goal-input {
  width: 100%;
  display: flex;
  gap: 16px;
}

.container > div.buttons {
  margin-top: 24px;
  width: 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 20px;
}

.container div label {
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
