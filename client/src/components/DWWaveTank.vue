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
        const username = localStorage.getItem("username");
        if (username) {
          addOnePoint(username);
        }
        return "You have completed today's goal and earned yourself 1 point!";
      } else {
        return `Goal For Today: ${this.goal} mL`;
      }
    },
  },
  methods: {
    setTotalVolume(volume) {
      this.totalVolume = volume;
      let percentage = Math.floor((volume / this.goal) * 100);
      if (percentage >= 100) {
        this.goalAchieved = true;
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
  font-weight: 900;
  font-size: 5rem;
  text-align: center;
}

.tank h1.goal {
  font-weight: 900;
  font-size: 1rem;
  position: fixed;
  top: 16px;
  color: var(--color-accent);
  z-index: 999;
  margin-left: 64px;
  margin-right: 64px;
  text-align: center;
}

.tank h1.goal.success {
  color: var(--color-background-soft);
}

.wave {
  position: absolute;
  z-index: 1;
  width: 3000px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-accent);
  animation: wave 20s;
  animation-timing-function: cubic-bezier(0.5, 0.3, 0.5, 0.7);
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
  top: -30px;
  right: 0;
  background-repeat: repeat;
  height: 30px;
  background-size: 30px 30px;
  background-image: radial-gradient(
    circle at 15px -5px,
    transparent 29px,
    var(--color-accent) 30px
  );
}

@keyframes wave {
  0% {
    transform: translateX(-1500px) scaleY(1);
  }

  50% {
    transform: translateX(-750px) scaleY(1.5);
  }

  100% {
    transform: translateX(0px) scaleY(1);
  }
}

@media (max-width: 300px) {
  .tank h1.goal {
    top: 48px;
  }
}

@media (max-width: 650px) {
  .tank h1.goal {
    top: 48px;
  }
}
</style>
