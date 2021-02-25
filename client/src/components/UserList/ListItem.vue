<template>
  <b-card class="my-4">
    <b-media tag="li">
      <template #aside>
        <b-img width="64" alt="placeholder" :src="user.profilePic"></b-img>
      </template>
      <b-row>
        <b-col>
          <h5 class="mt-0 mb-1">{{ user.name }}</h5>
          <a class="mb-2" :href="user.url">{{ user.username }}</a>
          <p class="mb-0" v-if="user.email">{{ user.email }}</p>
        </b-col>
        <b-col>
          <p class="m-0 text-right">Following <b-badge>{{ user.following }}</b-badge></p>
          <p class="m-0 text-right">Followers <b-badge>{{ user.followers}}</b-badge></p>
          <p class="m-0 text-right">Public Repos <b-badge>{{ user.publicRepos }}</b-badge></p>
        </b-col>
      </b-row>
    </b-media>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '@/types/search';

@Component
export default class ListItem extends Vue {
  @Prop() private user!: User;
}
</script>
