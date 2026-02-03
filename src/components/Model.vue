<template>
  <div class="overlay">
    <div class="modal">
      <h3>{{ isEdit ? "Edit User" : "Add User" }}</h3>

      <input v-model="localForm.firstName" placeholder="First Name" />
      <input v-model="localForm.lastName" placeholder="Last Name" />
      <input v-model="localForm.email" placeholder="Email" />
      <input v-model="localForm.age" type="number" placeholder="Age" />
      <input v-model="localForm.company.name" placeholder="Company" />

      <div class="modal-actions">
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button class="primary" @click="emit('save', localForm)">
          {{ isEdit ? "Update" : "Add" }}
        </button>

        <button class="secondary" @click="emit('close')">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const props = defineProps({
      form: Object,  
      isEdit: Boolean,
      errorMessage:String
})

const emit = defineEmits(['save', 'close'])
    const localForm = reactive({
      ...props.form,
      company: { ...props.form.company }
    })
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  width: 320px;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.25s ease;
}

.error {
  color: #dc2626;
  font-size: 13px;
  margin-bottom: 8px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal h3 {
  margin-bottom: 14px;
  font-size: 18px;
  font-weight: 500;
  color: #111827;
}

.modal input {
  width: 100%;
  padding: 8px 0px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.modal input:focus {
  outline: none;
  border-color: #9ca3af;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 10px;
}

.primary {
  background: #111827;
  color: #ffffff;
  border: none;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

.secondary {
  background: #e5e7eb;
  border: none;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

</style>