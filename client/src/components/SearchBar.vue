<template>
  <b-row>
    <b-col>
      <b-form @submit="submit" @submit.stop.prevent>
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="username"
            type="search"
            placeholder="Username"
            :state="validation"
          ></b-form-input>
          <b-form-invalid-feedback :state="validation">
            Your user ID must be at least 3 characters long.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation">
            Looks Good.
          </b-form-valid-feedback>
        </b-input-group>
        <b-input-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-input-group>
      </b-form>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import SearchService from '@/service/searchService';

@Component
export default class SearchBar extends Vue {
  username = '';

  get validation() {
    if (this.username === '') return undefined;
    return this.username.length > 2;
  }

  submit() {
    SearchService.searchRequest(this.username);
  }
}
</script>
