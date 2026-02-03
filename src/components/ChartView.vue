<template>
  <div class="page">
    <h2>User Distribution by Company</h2>

    <Bar :data="chartData" :options="chartOptions" />

    <button class="back" @click="$router.push('/')">
      ⬅ Back
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "vue-chartjs";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const users = ref([]);

const getUsers = async () => {
  const res = await axios.get("https://dummyjson.com/users");
  users.value = res.data.users;
};

onMounted(getUsers);

/* group users by company */
const companyCounts = computed(() => {
  const map = {};
  users.value.forEach(user => {
    const company = user.company.name;
    map[company] = (map[company] || 0) + 1;
  });
  return map;
});

/* chart data */
const chartData = computed(() => ({
  labels: Object.keys(companyCounts.value),
  datasets: [
    {
      label: "Users",
      data: Object.values(companyCounts.value),
      backgroundColor: "#3b82f6"
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};
</script>

<style scoped>
.page {
  padding: 20px;
}

h2 {
  margin-bottom: 16px;
}

.back {
  margin-top: 16px;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
</style>
