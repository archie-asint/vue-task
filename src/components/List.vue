<template>
  <div class="page">

    <Header
      @search-change="searchText = $event"
      @group-change="groupByCompany = $event"
      @add-user="openAddForm"/>
    <button class="chart-btn" @click="$router.push('/chart')">
      📊 View Chart
    </button>

    <Model
      v-if="showForm"
      :form="form"
      :isEdit="isEdit"
      :errorMessage="errorMessage"
      @save="saveUser"
      @close="showForm = false"/>

    <table v-if="!groupByCompany" class="main-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
          <th>Age</th>
          <th class="center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.company.name }}</td>
          <td>{{ user.age }}</td>
          <td class="center">

            <button class="view" @click="$router.push(`/user/${user.id}`)">
              View
            </button>

            <button class="edit" @click="editUser(user)">
              Edit
            </button>

            <button class="delete" @click="deleteUser(user.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      <table class="main-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th class="center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="(usersByCompany, company) in groupedUsers" :key="company" >
            <tr class="company-row">
              <td colspan="4">
                {{ company }} ({{ usersByCompany.length }})
              </td>
            </tr>

            <tr v-for="user in usersByCompany" :key="user.id">
              <td>{{ user.firstName }} {{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.age }}</td>
              <td class="center">

                <button class="view" @click="$router.push(`/user/${user.id}`)">
                  View
                </button>

                <button class="edit" @click="editUser(user)">
                  Edit
                </button>
                
                <button class="delete" @click="deleteUser(user.id)">
                  Delete
                </button>
              </td>
            </tr>

            <tr class="group-spacer">
              <td colspan="4"></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Header from "./Header.vue";
import Model from "./Model.vue";

  const users = ref([]);
  const searchText = ref("");
  const groupByCompany = ref(false);
  const showForm = ref(false);
  const isEdit = ref(false);
  const errorMessage = ref("");

  var x=10
  const form = ref({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    company: { name: "" }
  });

  const resetForm = () => {
    form.value = {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      company: { name: "" }
    };
  };

  const getUsers = async () => {
    const res = await axios.get("https://dummyjson.com/users");
    users.value = res.data.users;
  };

  const openAddForm = () => {
    resetForm();
    isEdit.value = false;
    showForm.value = true;
  };

  const saveUser = () => {
  if (
    !form.value.firstName ||
    !form.value.lastName ||
    !form.value.email ||
    !form.value.age ||
    !form.value.company.name
  ) {
    errorMessage.value = "Please complete all fields";
    return;
  }

  errorMessage.value = "";

  if (isEdit.value) {
    const index = users.value.findIndex(u => u.id === form.value.id);
    users.value[index] = { ...form.value };
  } else {
    users.value.unshift({
      ...form.value,
      id: Date.now(),
      company: { name: form.value.company.name }
    });
  }

  showForm.value = false;
  resetForm();
};

  // const saveUser = () => {
  //   if (isEdit.value) {
  //     const index = users.value.findIndex(u => u.id === form.value.id);
  //     users.value[index] = { ...form.value };
  //   } else {
  //     users.value.unshift({
  //       ...form.value,
  //       id: Date.now(),
  //       company: { name: form.value.company.name || "Manual Entry" }
  //     });
  //   }
  //   showForm.value = false;
  //   resetForm();
  // };

  const editUser = user => {
    form.value = JSON.parse(JSON.stringify(user));
    isEdit.value = true;
    showForm.value = true;
  };

  const deleteUser = id => {
    if (confirm("Are you sure you want to delete this user?")) {
      users.value = users.value.filter(u => u.id !== id);
    }
  };

  const filteredUsers = computed(() => {
    if (!searchText.value) return users.value;

    return users.value.filter(user =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchText.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.value.toLowerCase())
    );
  });

  const groupedUsers = computed(() => {
    const grouped = {};
    filteredUsers.value.forEach(user => {
      const company = user.company.name;
      if (!grouped[company]) grouped[company] = [];
      grouped[company].push(user);
    });
    return grouped;
  });

  onMounted( ()=>{
    getUsers();
  });
  // getUsers();
</script>

<style scoped>
.page {
  padding: 16px;
  background: #fafafa;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

th {
  background: #f3f4f6;
  font-weight: 500;
}

td,
th {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

tr:hover {
  background: #f9fafb;
}

.center {
  text-align: center;
}

button {
  border: none;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.view {
  background: #e5e7eb;
  color: #111;
  margin-right: 6px;
}

.edit {
  background: #111416;
  color: #c6c8c9;
}

.delete {
  background: #111416;
  color: #c6c8c9;
  margin-left: 6px;
}

.company-row {
  font-weight: 600;
  background: #f9fafb;
}

.group-spacer td {
  height: 14px;
  border: none;
  background: #fafafa;
}
</style>
