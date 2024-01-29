<template>
  <div class="container w-50 d-flex-col align-items-center justify-content-center text-center">
    <div class="row mb-5 ">
      <div class="">
        <h1>Projeto Api do Github</h1>
        <input v-model="filter" class="form-control" placeholder="Pesquisar desenvolvedores..."/>
      </div>
    </div>
  </div>
  <div class="container ccard">
    <div class="row">
      <div v-for="(user, i) in filteredUsers" :key="i" class="col-md-3 mb-md-0 mb-3">
        <router-link :to="`/repositories/${user.login}`">
          <div class="ccard card d-flex flex-column align-items-center justify-content-center">
            <div class="inner-content d-flex flex-column align-items-center justify-content-center">
              <div class="img-container rounded-circle">
                <img
                    :src="user.avatar_url"
                    alt="" class="rounded-circle">
              </div>
              <div class="h3">{{ user.login }}</div>
              <p class="designation text-muted text-uppercase">Criado em:</p>
              <p class="designation text-muted text-uppercase">{{ data.formatDate(user.created_at) }}</p>
              <p class="designation text-muted text-uppercase">Repositórios: {{ user.public_repos }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, computed, ref} from 'vue';
import {UserStore} from '../store/Users.js'

export default defineComponent({
  name: 'Users',

  setup() {
    const filter = ref('');
    const data = UserStore();

    const filteredUsers = computed(() => {
      return data.users.filter(
          user => user.login.toLowerCase().includes(
              filter.value.toLowerCase()
          ));
    });

    onMounted(() => {
      data.getUsers();
    });

    return {data, filter, filteredUsers};
  }
});
</script>