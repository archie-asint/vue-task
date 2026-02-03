<template>
  <div class="header">
    <h2>User List</h2>

    <div class="actions">
      <input
        type="text"
        placeholder="Search by name or email"
        v-model="search"
        @input="sendSearch"/>

      <button
        class="group-btn"
        :class="{ active: group }"
        @click="toggleGroup">
        Group
      </button>

      <button class="add-btn" @click="$emit('add-user')">
        + Add
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const search = ref("");
  const group = ref(false);

  const emit = defineEmits([
    "search-change",
    "group-change",
    "add-user"
  ]);

  const sendSearch = () => {
    emit("search-change", search.value);
  };

  const toggleGroup = () => {
    group.value = !group.value;
    emit("group-change", group.value);
  };
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 14px;
}

.header h2 {
  font-size: 18px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.actions input {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  outline: none;
}

.actions input:focus {
  border-color: #9ca3af;
}

.group-btn {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.group-btn.active {
  background: #e5e7eb;
  font-weight: 500;
}

.add-btn {
  background: #111827;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.add-btn:hover {
  opacity: 0.9;
}
</style>
