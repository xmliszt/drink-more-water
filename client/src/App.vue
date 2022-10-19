<template>
  <main>
    <div class="start">
      <Transition name="fade">
        <DWButton v-show="showStart" size="large" @click="kickstart"
          >DRINK WATER</DWButton
        >
      </Transition>
      <Transition name="fade">
        <DWRegister
          v-show="showRegister"
          @onRegisterSuccess="onRegisterSuccess"
          @onOpenLogin="onOpenLogin"
        />
      </Transition>
      <Transition name="fade">
        <DWLogin
          v-show="showLogin"
          @onLoginSuccess="onLoginSuccess"
          @onOpenRegister="onOpenRegister"
        />
      </Transition>
    </div>
    <Transition name="fade">
      <div v-show="showDrinkButton" class="drink">
        <DWDrinkButton :volume="volume" @click="drink" />
      </div>
    </Transition>
    <DWWaveTank
      ref="tank"
      :showVolume="showVolume"
      :showGoal="showGoal"
      :volume="volume"
      :goal="goal"
      :totalVolume="totalVolume"
    />
  </main>
</template>

<script>
import DWWaveTank from "@/components/DWWaveTank.vue";
import DWButton from "@/components/DWButton.vue";
import DWRegister from "@/components/DWRegister.vue";
import DWLogin from "@/components/DWLogin.vue";
import DWDrinkButton from "@/components/DWDrinkButton.vue";
import { getTotalVolume, getUser, addRecord } from "@/services";

export default {
  components: { DWWaveTank, DWButton, DWRegister, DWLogin, DWDrinkButton },
  data() {
    return {
      volume: 0,
      goal: 0,
      totalVolume: 0,
      showVolume: false,
      showGoal: false,
      showStart: true,
      showLogin: false,
      showRegister: false,
      showDrinkButton: false,
      username: "",
    };
  },
  methods: {
    kickstart() {
      this.showStart = false;
      this.$refs.tank.setWaveHeight(100);
      setTimeout(() => {
        this.showRegister = true;
        this.showLogin = false;
      }, 1000);
    },
    onRegisterSuccess(username) {
      this.showRegister = false;
      this.showGoal = true;
      this.showVolume = true;
      getUser(username).then((user) => {
        this.volume = user.volume;
        this.goal = user.goal;
      });
    },
    onLoginSuccess(username) {
      this.username = username;
      this.showLogin = false;
      this.showGoal = true;
      this.showVolume = true;
      this.showDrinkButton = true;
      getUser(username).then((response) => {
        this.volume = response.data.volume;
        this.goal = response.data.goal;
        getTotalVolume(username).then((response) => {
          this.totalVolume = response.data.volume;
          this.$refs.tank.setTotalVolume(this.totalVolume);
        });
      });
    },
    onOpenLogin() {
      this.showRegister = false;
      setTimeout(() => {
        this.showLogin = true;
      }, 1000);
    },
    onOpenRegister() {
      this.showLogin = false;
      setTimeout(() => {
        this.showRegister = true;
      }, 1000);
    },
    drink() {
      addRecord(this.username).then(() => {
        getTotalVolume(this.username).then((response) => {
          this.totalVolume = response.data.volume;
          this.$refs.tank.setTotalVolume(this.totalVolume);
        });
      });
    },
  },
  mounted() {
    this.$refs.tank.setWaveHeight(30);
  },
};
</script>

<style>
.start {
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.drink {
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
