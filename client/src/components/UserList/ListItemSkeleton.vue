<template>
  <b-card class="my-4">
    <b-media tag="li">
      <template #aside>
        <b-skeleton-img width="65px" height="65px"></b-skeleton-img>
      </template>
      <b-row>
        <b-col>
          <h5 class="mt-0 mb-1"><b-skeleton width="45%"></b-skeleton></h5>
          <p class="mb-2"><b-skeleton width="40%"></b-skeleton></p>
          <p class="mb-0"><b-skeleton width="50%"></b-skeleton></p>
        </b-col>
        <b-col>
          <p class="m-0 d-flex justify-content-end"><b-skeleton width="35%"></b-skeleton></p>
          <p class="m-0 d-flex justify-content-end"><b-skeleton width="35%"></b-skeleton></p>
          <p class="m-0 d-flex justify-content-end"><b-skeleton width="35%"></b-skeleton></p>
        </b-col>
      </b-row>
    </b-media>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ListItemSkeleton extends Vue {}
</script>
