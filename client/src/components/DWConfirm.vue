<template>
  <Transition name="fade">
    <div v-show="isShown" class="dw-confirm">
      <div class="container">
        <div class="header">
          {{ config.title }}
        </div>
        <div class="divider"></div>
        <div class="body">
          <p>{{ config.body }}</p>
          <div class="buttons">
            <DWButton type="info" @click="onCancel">{{
              config.cancelText
            }}</DWButton>
            <DWButton type="success" @click="onConfirm">{{
              config.confirmText
            }}</DWButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import DWButton from "@/components/DWButton.vue";

export default {
  components: {
    DWButton,
  },
  data() {
    return {
      isShown: false,
      config: {
        title: "Are you sure?",
        body: "",
        cancelText: "cancel",
        confirmText: "ok",
      },
    };
  },
  methods: {
    show(config, onConfirm, onCancel) {
      this.config = { ...this.config, ...config };
      this.isShown = true;
      this.onConfirm = onConfirm;
      this.onCancel = onCancel;
    },
    onConfirm: {},
    onCancel: {},
  },
};
</script>

<style scoped>
.dw-confirm {
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

.dw-confirm div.container {
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

div.container div.header {
  width: 100%;
  font-size: 2rem;
}

div.container div.divider {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
}

div.container div.body {
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
}

div.body p {
  text-align: center;
}

div.body div.buttons {
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}

div.buttons button {
  width: 100%;
}
</style>
