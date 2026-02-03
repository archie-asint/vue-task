<template>
  <div class="detail-page">
    <button class="back" @click="$router.push('/')">
      ← Back
    </button>

    <h2>User Details</h2>

    <div v-if="user" class="card">
      <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Company:</strong> {{ user.company.name }}</p>
    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const user = ref(null);

onMounted(async () => {
  const res = await axios.get(
    `https://dummyjson.com/users/${route.params.id}`
  );
  user.value = res.data;
});
</script>

<style scoped>
.detail-page {
  padding: 20px;
}

.back {
  margin-bottom: 10px;
  border: none;
  background: #e5e7eb;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
</style>
