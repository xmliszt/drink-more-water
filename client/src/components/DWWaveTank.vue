<template>
  <div class="tank">
    <div :class="['wave', goalAchieved && 'success']" :style="waveStyle"></div>
    <h1 v-show="showVolume || false" class="volume">{{ totalVolume }} mL</h1>
    <h1 v-show="showGoal || false" :class="['goal', goalAchieved && 'success']">
      {{ goalText }}
    </h1>
  </div>
</template>

<script>
import { addOnePoint } from "@/services";
import { getUser } from "../utils";

export default {
  props: ["showGoal", "showVolume"],
  data() {
    return {
      waveStyle: {
        height: 0,
      },
      goal: 0,
      volume: 0,
      totalVolume: 0,
      goalAchieved: false,
    };
  },
  computed: {
    goalText() {
      if (this.goalAchieved) {
        const user = getUser();
        if (user) {
          const username = user.name;
          const lastUpdated = user.last_point_updated;
          const today = new Date();
          !this.compareDates(today, lastUpdated) && addOnePoint(username);
          return "You have completed today's goal and earned yourself 1 point!";
        } else {
          return "";
        }
      } else {
        return `Goal For Today: ${this.goal} mL`;
      }
    },
  },
  methods: {
    compareDates(today, lastUpdated) {
      var year = today.getFullYear();
      var month = "" + today.getMonth() + 1;
      var day = "" + today.getDate();
      if (month.length < 2) {
        month = "0" + month;
      }
      if (day.length < 2) {
        day = "0" + day;
      }
      const todayFormatted = `${year}${month}${day}`;
      return String(todayFormatted) === lastUpdated;
    },
    setTotalVolume(volume) {
      this.totalVolume = volume;
      let percentage = Math.floor((volume / this.goal) * 100);
      if (percentage >= 100) {
        this.goalAchieved = true;
      } else {
        this.goalAchieved = false;
      }
      this.waveStyle.height = `${percentage}%`;
    },
    setGoal(goal) {
      this.goal = goal;
    },
    setVolume(volume) {
      this.volume = volume;
    },
    setWaveHeight(percentage) {
      this.waveStyle.height = `${percentage}%`;
    },
  },
};
</script>

<style scoped>
.tank {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
}

.tank h1.volume {
  font-size: calc(min(15vw, 5rem));
  text-align: center;
}

.tank h1.goal {
  font-size: calc(min(8vw, 3rem));
  position: fixed;
  top: 15%;
  color: rgba(98, 98, 98, 0.3);
  z-index: 999;
  width: 100%;
  margin-left: 16px;
  margin-right: 16px;
  text-align: center;
}

.tank h1.goal.success {
  color: var(--color-background-soft);
  font-size: 1.5rem;
}

.wave {
  position: absolute;
  z-index: 1;
  width: 200vw;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-accent);
  animation: wave 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transition-property: height background-color;
  transition-duration: 0.7s;
  transition-timing-function: ease;
  opacity: 0.8;
}

.wave.success {
  background-color: var(--color-success);
}

.wave::before {
  content: "";
  position: absolute;
  left: 0;
  top: calc(-100vw / 12);
  right: 0;
  background-repeat: repeat;
  height: calc(100vw / 12);
  background-size: calc(100vw / 12) calc(100vw / 12);
  background-image: radial-gradient(
    circle at calc(100vw / 24) calc(-100vw / 24),
    transparent calc(100vw / 10),
    var(--color-accent) calc(100vw / 12)
  );
}

@keyframes wave {
  0% {
    transform: translateX(-100vw);
  }

  100% {
    transform: translateX(0px);
  }
}

@media (max-width: 300px) {
  .tank h1.goal {
    top: 48px;
  }
}
</style>
