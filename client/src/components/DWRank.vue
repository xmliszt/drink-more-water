<template>
  <div class="dw-rank">
    <div class="container">
      <div class="header">
        <div class="title">{{ title }}</div>
        <button class="close-btn" @click="onClose">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
      </div>
      <div class="subtitle">
        <span>{{ subtitle }}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rank, idx) in ranks" :key="idx">
            <td>{{ rank.rank }}</td>
            <td>{{ rank.name }}</td>
            <td>{{ rank.point }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { getRanks } from "@/services";
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      title: "Leaderboard",
      subtitle: "[ Ranking is updated every 1 minute ]",
      ranks: [],
      interval: null,
    };
  },
  methods: {
    fetchRanks() {
      this._loadRanks();
      this.interval = setInterval(() => {
        this._loadRanks();
      }, 60 * 1000);
    },
    onClose() {
      this.interval && clearInterval(this.interval);
      this.$emit("onRankClosed");
    },
    _loadRanks() {
      getRanks()
        .then((response) => {
          let allRanks = response.data.rank;
          var newRanks = [];
          var _rank = 1;
          allRanks.forEach((rank, idx) => {
            if (idx === allRanks.length - 1) {
              newRanks.push({
                ...rank,
                rank: _rank,
              });
            } else {
              const thisPoint = rank.point;
              const nextPoint = allRanks[idx + 1].point;
              if (thisPoint !== nextPoint) {
                newRanks.push({
                  ...rank,
                  rank: _rank,
                });
                _rank += 1;
              } else {
                newRanks.push({
                  ...rank,
                  rank: _rank,
                });
              }
            }
          });
          this.ranks = newRanks;
        })
        .catch((err) => {
          console.log(err);
          this.toast.error("Failed to fetch ranks!");
        });
    },
  },
};
</script>
<style scoped>
.dw-rank {
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

.dw-rank div.container {
  width: 80vw;
  height: 80vh;
  background-color: var(--color-background-soft);
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.dw-rank div.title {
  font-size: 1.8rem;
  font-weight: 900;
}

.dw-rank button.close-btn {
  font-size: 2rem;
  color: var(--color-text);
  background: none;
  border: none;
}

.dw-rank div.header {
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

.dw-rank div.container div.subtitle {
  width: 100%;
  padding: 5px;
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
}

.dw-rank table {
  padding: 16px;
  width: 100%;
  border-radius: 20px;
  text-align: center;
  border-spacing: 0px;
  padding-bottom: 10px;
}

.dw-rank th {
  font-weight: 900;
  background-color: var(--color-text);
  color: var(--color-background-soft);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 10px 0px;
}

.dw-rank th:nth-child(1) {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.dw-rank th:nth-child(3) {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.dw-rank th {
  padding: 10px;
  border-bottom: 1px solid var(--color-text);
}

.dw-rank table td {
  padding-left: 10px;
  height: 30px;
}

.dw-rank table thead {
  position: sticky;
  top: 60px;
  z-index: 999;
}
</style>
