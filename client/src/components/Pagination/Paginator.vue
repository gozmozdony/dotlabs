<template>
  <b-pagination
    v-model="currentPage"
    :total-rows="totalCount"
    v-on:change="change"
  ></b-pagination>
</template>

<script lang="ts">
import { Subscription } from 'rxjs';
import { Component, Vue } from 'vue-property-decorator';

import SearchService from '@/service/searchService';
import { DEFAULT_PAGE_SIZE } from '@/constants/rest';

import { SearchServiceMessage } from '../../../types/search';

@Component
export default class Paginator extends Vue {
  private subscription: Subscription | undefined;

  public currentPage = 1;

  public totalCount = 0;

  public perPage = DEFAULT_PAGE_SIZE;

  public change(page: number) {
    this.currentPage = page;
    SearchService.paginate(page, this.perPage);
  }

  private created() {
    this.currentPage = SearchService.previousQueryParams.page || 1;
    this.subscription = SearchService.observable().subscribe((message: SearchServiceMessage) => {
      if (message) {
        this.totalCount = message.count || this.totalCount;
      } else {
        this.currentPage = 1;
        this.totalCount = 0;
      }
    });
  }
}
</script>
