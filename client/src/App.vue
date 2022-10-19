<template>
  <main>
    <div class="login-card">
      <DWButton size="large" @click="kickstart">DRINK WATER</DWButton>
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
    };
  },
  methods: {
    kickstart: function () {},
    addWater: function () {
      this.progress += 5;
      this.$refs.tank.setProgress(this.progress);
    },
  },
};
</script>

<style>
.login-card {
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
