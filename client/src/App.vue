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
      <div v-show="showLogout" class="logout">
        <span>{{ greeting }}</span>
        <button @click="onLogout">
          <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        </button>
      </div>
    </Transition>
    <DWWaveTank ref="tank" :showVolume="showVolume" :showGoal="showGoal" />
  </main>
</template>

<script>
import DWWaveTank from "@/components/DWWaveTank.vue";
import DWButton from "@/components/DWButton.vue";
import DWLogin from "@/components/DWLogin.vue";
import DWRegister from "@/components/DWRegister.vue";
import DWDrinkButton from "@/components/DWDrinkButton.vue";
import { getTotalVolume, addRecord } from "@/services";

export default {
  components: { DWWaveTank, DWButton, DWRegister, DWLogin, DWDrinkButton },
  data() {
    return {
      volume: 0,
      showVolume: false,
      showGoal: false,
      showStart: true,
      showLogin: false,
      showRegister: false,
      showDrinkButton: false,
      showLogout: false,
      greeting: "",
    };
  },
  methods: {
    kickstart() {
      this.showStart = false;
      this.$refs.tank.setWaveHeight(100);
      let username = localStorage.getItem("username");
      if (username) {
        getUser(username)
          .then((response) => {
            let user = response.data;
            this.startWithUser(user);
          })
          .catch((err) => {
            console.log(err);
            setTimeout(() => {
              this.showRegister = true;
              this.showLogin = false;
            }, 1000);
          });
      } else {
        setTimeout(() => {
          this.showRegister = true;
          this.showLogin = false;
        }, 1000);
      }
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
      localStorage.setItem("username", user.name);
      this.showLogin = false;
      this.showGoal = true;
      this.showVolume = true;
      this.showDrinkButton = true;
      this.showLogout = true;

      var ndate = new Date();
      var hours = ndate.getHours();
      this.greeting = `${
        hours < 12
          ? "Good Morning!"
          : hours < 18
          ? "Good Afternoon!"
          : "Good Evening!"
      } ${user.name}`;
      this.$refs.tank.setGoal(user.goal);
      this.$refs.tank.setVolume(user.volume);
      this.volume = user.volume;
      getTotalVolume(user.name).then((response) => {
        this.$refs.tank.setTotalVolume(response.data.volume);
      });
    },
    drink() {
      let username = localStorage.getItem("username");
      addRecord(username).then(() => {
        getTotalVolume(username).then((response) => {
          this.$refs.tank.setTotalVolume(response.data.volume);
        });
      });
    },
    onLogout() {
      localStorage.removeItem("username");
      this.showStart = true;
      this.showDrinkButton = false;
      this.showVolume = false;
      this.showGoal = false;
      this.showLogout = false;
      this.$refs.tank.setWaveHeight(30);
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

.logout {
  position: fixed;
  z-index: 999;
  top: 16px;
  right: 15px;
  left: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 12px;
}

.logout button {
  background: none;
  background-color: transparent;
  border: none;
  color: var(--color-danger);
  font-size: 1.5rem;
}

.logout span {
  font-weight: 900;
}

@media (max-width: 1024px) {
  .logout {
    width: auto;
    justify-content: space-between;
  }
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
