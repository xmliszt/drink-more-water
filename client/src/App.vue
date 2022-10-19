<template>
  <main>
    <div class="start">
      <Transition name="fade">
        <DWButton v-show="showStart" size="large" @click="kickstart"
          >DRINK WATER</DWButton
        >
      </Transition>
      <Transition> </Transition>
    </div>
    <DWWaveTank ref="tank" :initialProgress="30" :showProgress="showProgress" />
  </main>
</template>

<script>
import DWWaveTank from "@/components/DWWaveTank.vue";
import DWButton from "@/components/DWButton.vue";
export default {
  components: { DWWaveTank, DWButton },
  data() {
    return {
      progress: 0,
      showProgress: false,
      showStart: true,
    };
  },
  methods: {
    kickstart: function () {
      this.showStart = false;
      this.$refs.tank.setProgress(100);
    },
    addWater: function () {
      this.progress += 5;
      this.$refs.tank.setProgress(this.progress);
    },
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
