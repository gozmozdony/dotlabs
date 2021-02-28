<template>
  <b-row class="mb-4">
    <b-col>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalCount"
        v-on:change="change"
      ></b-pagination>
    </b-col>
    <b-col>
      <b-input-group>
        <b-input-group-prepend is-text>
          Per page
        </b-input-group-prepend>
        <b-form-input
          type="number"
          v-model="perPage"
          :state="validation"
          v-debounce:500ms="change"></b-form-input>
      </b-input-group>
      <b-form-invalid-feedback :state="validation">
        The username must be at least 3 characters long.
      </b-form-invalid-feedback>
    </b-col>
    <b-col class="d-flex flex-column align-items-end">
      <p class="mb-0 counter">Total Count: {{ totalCount }}</p>
      <p class="mb-0 message" v-if="message">{{ message }}</p>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Subscription } from 'rxjs';
import { Component, Vue } from 'vue-property-decorator';

import SearchService from '@/service/searchService';
import { DEFAULT_PAGE_SIZE } from '@/constants/rest';
import { SearchServiceMessage } from '@/types/search';

@Component
export default class Paginator extends Vue {
  private subscription: Subscription | undefined;

  public currentPage = 1;

  public totalCount = 0;

  public message: string | null = null;

  public perPage = DEFAULT_PAGE_SIZE;

  public get validation() {
    if (!this.perPage) return undefined;
    return this.perPage > 0
      && this.perPage < 26;
  }

  public change(page?: number) {
    if (!this.validation) return;
    this.currentPage = page || this.currentPage;
    SearchService.paginate(this.currentPage, this.perPage);
  }

  private created() {
    this.currentPage = SearchService.previousQueryParams.page || 1;
    this.subscription = SearchService.observable().subscribe((message: SearchServiceMessage) => {
      if (message) {
        this.totalCount = Number.isNaN(message.count) ? message.count : this.totalCount;
        this.message = message.message;
      } else {
        this.currentPage = 1;
        this.totalCount = 0;
      }
    });
  }
}
</script>
