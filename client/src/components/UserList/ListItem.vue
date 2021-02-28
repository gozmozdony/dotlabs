<template>
  <b-card class="my-4">
    <b-media  no-body tag="li">
      <b-media-aside vertical-align="center">
        <b-img width="64" height="64" alt="placeholder" :src="user.profilePic"></b-img>
      </b-media-aside>
      <b-media-body>
        <b-row>
          <b-col>
            <h5 class="mt-0 mb-1">{{ user.name }}</h5>
            <a class="mb-2" :href="user.url">{{ user.username }}</a>
            <p class="mb-0 user_email">{{ user.email || 'No public email address.' }}</p>
            <p class="my-2 user_bio" v-if="user.bio">
              {{ user.bio || 'User does not have any bio.' }}
            </p>
          </b-col>
          <b-col>
            <p class="m-0 text-right user_following">
              Following <b-badge>{{ user.following }}</b-badge>
            </p>
            <p class="m-0 text-right user_followers">
              Followers <b-badge>{{ user.followers}}</b-badge>
            </p>
            <p class="m-0 text-right user_public_repos">
              Public Repos <b-badge>{{ user.publicRepos }}</b-badge>
            </p>
          </b-col>
        </b-row>
      </b-media-body>
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
