<template>
  <h1>Repositórios de {{ $route.params.username }}</h1>
  <section>
    <div v-for="(repo, i) in data.repositories" :key="i" class="container py-3">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-md-9 col-lg-7 col-xl-5">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-4">
              <div class="d-flex text-black">
                <div class="flex-shrink-0">
                  <img :src="repo.owner.avatar_url"
                       alt="Generic placeholder image" class="img-fluid rounded-circle"
                       style="width: 180px; border-radius: 10px;">
                </div>
                <div class="flex-grow-1 ms-3">
                  <h5 class="mb-1">{{ repo.name }}</h5>
                  <p class="mb-2 pb-1" style="color: #2b2a2a;"></p>
                  <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
                       style="background-color: #efefef;">
                    <div>
                      <p class="small text-muted mb-1">Language</p>
                      <p class="mb-0">{{ repo.language ?? '--' }}</p>
                    </div>
                    <div class="px-3">
                      <p class="small text-muted mb-1">Stars</p>
                      <p class="mb-0">{{ repo.stargazers_count }}</p>
                    </div>
                    <div>
                      <p class="small text-muted mb-1">Fork</p>
                      <p class="mb-0">{{ repo.forks_count }}</p>
                    </div>
                  </div>
                  <div class="d-flex pt-1">
                    <a :href="repo.html_url" target="_blank" class="btn btn-outline-primary me-1 flex-grow-1">Ver</a>
                    <button type="button" v-on:click="save(repo.owner.login)" class="btn btn-primary flex-grow-1">
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {defineComponent, onMounted} from 'vue';
import {UserStore} from '../store/Users.js'
import {useRoute} from 'vue-router'

export default defineComponent({
  name: 'Users',

  setup() {
    const data = UserStore();
    const route = useRoute()

    onMounted(() => {
      data.getRepositories(route.params.username);

    });

    function save(username) {
      data.postSaveLocal(username);
    }

    return {data, save};
  },
});
</script>