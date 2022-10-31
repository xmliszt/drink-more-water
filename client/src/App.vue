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
    <Transition name="fade">
      <div v-show="showActions" class="actions">
        <div class="left-bar">
          <button class="rank" @click="onOpenRank">
            <font-awesome-icon icon="fa-solid fa-ranking-star" />
          </button>
          <button class="setting" @click="onOpenSetting">
            <font-awesome-icon icon="fa-solid fa-gear" />
          </button>
        </div>
        <button class="logout" @click="onLogout">
          <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        </button>
      </div>
    </Transition>
    <Transition name="fade">
      <DWRank ref="rank" v-show="showRank" @onRankClosed="onCloseRank" />
    </Transition>
    <Transition name="fade">
      <DWSetting
        ref="setting"
        v-show="showSetting"
        @onSettingClosed="onCloseSetting"
        @onLoginFailed="onLoginFailed"
        @onUpdateSuccess="onUpdateSuccess"
      />
    </Transition>
    <DWWaveTank
      ref="tank"
      :showVolume="showVolume"
      :showGoal="showGoal"
      @onLoginFailed="onLoginFailed"
    />
  </main>
</template>

<script>
import DWWaveTank from "@/components/DWWaveTank.vue";
import DWButton from "@/components/DWButton.vue";
import DWLogin from "@/components/DWLogin.vue";
import DWRegister from "@/components/DWRegister.vue";
import DWDrinkButton from "@/components/DWDrinkButton.vue";
import DWRank from "@/components/DWRank.vue";
import DWSetting from "@/components/DWSetting.vue";
import { getTotalVolume, addRecord, fetchUser } from "@/services";
import { clearUser, getUser, setUser } from "./utils";
import { useToast } from "vue-toastification";

export default {
  components: {
    DWWaveTank,
    DWButton,
    DWRegister,
    DWLogin,
    DWDrinkButton,
    DWRank,
    DWSetting,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      volume: 0,
      showVolume: false,
      showGoal: false,
      showStart: true,
      showLogin: false,
      showRegister: false,
      showDrinkButton: false,
      showActions: false,
      showRank: false,
      showSetting: false,
      greeting: "",
    };
  },
  methods: {
    kickstart() {
      this.showStart = false;
      this.$refs.tank.setWaveHeight(100);
      const user = getUser();
      if (user) {
        let username = user.name;
        fetchUser(username)
          .then((response) => {
            let user = response.data;
            this.startWithUser(user);
          })
          .catch((err) => {
            console.log(err);
            this.onAuthFailed();
          });
      } else {
        this.showRegistration();
      }
    },
    onAuthFailed() {
      this.toast.error("Please login!");
      this.showRegistration();
    },
    showRegistration() {
      setTimeout(() => {
        this.showRegister = true;
        this.showLogin = false;
      }, 1000);
    },
    onRegisterSuccess(user) {
      this.showRegister = false;
      this.startWithUser(user);
    },
    onLoginSuccess(user) {
      this.showLogin = false;
      this.startWithUser(user);
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
    startWithUser(user) {
      setUser(user);
      this.showLogin = false;
      this.showGoal = true;
      this.showVolume = true;
      this.showDrinkButton = true;
      this.showActions = true;

      var ndate = new Date();
      var hours = ndate.getHours();
      this.greeting = `${
        hours < 12
          ? "Good Morning!"
          : hours < 18
          ? "Good Afternoon!"
          : "Good Evening!"
      } ${user.name}`;
      this.toast.success(this.greeting);
      this.$refs.tank.setGoal(user.goal);
      this.$refs.tank.setVolume(user.volume);
      this.volume = user.volume;
      getTotalVolume(user.name).then((response) => {
        this.$refs.tank.setTotalVolume(response.data.volume);
      });
    },
    drink() {
      const user = getUser();
      if (user) {
        let username = user.name;
        addRecord(username).then(() => {
          getTotalVolume(username).then((response) => {
            this.$refs.tank.setTotalVolume(response.data.volume);
          });
        });
      } else {
        this.onAuthFailed();
      }
    },
    onLogout() {
      clearUser();
      this.showStart = true;
      this.showDrinkButton = false;
      this.showVolume = false;
      this.showGoal = false;
      this.showActions = false;
      this.showSetting = false;
      this.$refs.tank.setWaveHeight(30);
      this.$refs.tank.$data.goalAchieved = false;
    },
    onOpenRank() {
      this.showRank = true;
      this.$refs.rank.fetchRanks();
    },
    onCloseRank() {
      this.showRank = false;
    },
    onOpenSetting() {
      const user = getUser();
      if (user) {
        this.$refs.setting.setCurrent(user);
        this.showSetting = true;
      } else {
        this.onAuthFailed();
      }
    },
    onCloseSetting() {
      this.showSetting = false;
    },
    onLoginFailed() {
      this.toast.error("Please login!");
      this.onLogout();
    },
    onUpdateSuccess(user) {
      this.$refs.tank.setGoal(user.goal);
      this.$refs.tank.setVolume(user.volume);
      this.volume = user.volume;
      getTotalVolume(user.name).then((response) => {
        this.$refs.tank.setTotalVolume(response.data.volume);
      });
    },
  },
  mounted() {
    this.$refs.tank.setWaveHeight(30);
    const user = getUser();
    if (!user) {
      this.onLogout();
    }
  },
};
</script>

<style>
@font-face {
  font-family: "Oswald";
  src: local("Oswald"),
    url(./assets/fonts/Oswald/Oswald-Bold.ttf) format("truetype");
}

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

.actions {
  position: fixed;
  z-index: 999;
  top: 16px;
  right: 10px;
  left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.actions div.left-bar {
  display: flex;
  gap: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.actions button {
  background: none;
  background-color: transparent;
  border: none;
  font-size: 2em;
}

.actions button.logout {
  color: var(--color-danger);
}

.actions button.rank {
  color: var(--color-warning);
}

.actions button.setting {
  color: var(--color-info);
}

.actions button svg path {
  stroke: var(--color-background-soft);
  stroke-width: 35px;
  stroke-linejoin: round;
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
