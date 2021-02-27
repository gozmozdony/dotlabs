<template>
  <b-row>
    <b-col>
      <b-form @submit.stop.prevent>
        <b-form-group
          description="Start typing in and the search automatically start.
          If the github request contains more than a thousand records,
          github only allow pagination to the 1000. item."
        >
          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="username"
              v-debounce:500ms="search"
              type="search"
              placeholder="Username"
              :disabled="disabled"
              :state="validation"
            ></b-form-input>
          </b-input-group>
          <b-form-invalid-feedback :state="validation">
            The username must be at least 3 characters long.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation">
            Your input looks valid.
          </b-form-valid-feedback>
        </b-form-group>
      </b-form>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Subscription } from 'rxjs';

import SearchService from '@/service/searchService';
import { SearchServiceMessage } from '@/types/search';

@Component
export default class SearchBar extends Vue {
  private subscription: Subscription | undefined;

  public username = '';

  public disabled = false;

  public get validation() {
    if (this.username === '') return undefined;
    return this.username.length > 2;
  }

  public search() {
    if (!this.validation) return;
    SearchService.searchRequest({
      name: this.username,
    });
  }

  private created() {
    this.subscription = SearchService.observable().subscribe((message: SearchServiceMessage) => {
      this.disabled = message.loading || false;
    });
  }
}
</script>
