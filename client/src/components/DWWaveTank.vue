<template>
  <div class="tank">
    <div class="wave" :style="waveStyle"></div>
    <h1 v-show="showProgress">{{ progress }}%</h1>
  </div>
</template>

<script>
export default {
  props: ["showProgress", "initialProgress"],
  data() {
    return {
      progress: 0,
      waveStyle: {
        height: 0,
      },
    };
  },
  methods: {
    setProgress: function (progress) {
      this.waveStyle.height = `${progress}%`;
      this.progress = progress;
    },
  },
  created() {
    this.setProgress(this.initialProgress);
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

.tank h1 {
  font-weight: 900;
  font-size: 10rem;
}

.wave {
  position: absolute;
  z-index: 1;
  width: 200vw;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-accent);
  animation: wave 10s linear infinite;
  transition: height 0.7s ease;
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
    transform: translateX(-100vw);
  }
  100% {
    transform: translateX(0vw);
  }
}
</style>
