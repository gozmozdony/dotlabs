<template>
  <div>
    <ul class="list-unstyled" v-if="isLoading">
      <ListItemSkeleton/>
      <ListItemSkeleton/>
    </ul>
    <ul class="list-unstyled" v-if="isSuccessfull">
      <ListItem
        v-for="user in searchMessage.users" :key="user.username"
        :user="user"/>
    </ul>
    <h3 class="text-center my-4 text-danger" v-if="isError">
      {{ searchMessage.message }}
    </h3>
    <h3 class="text-center my-4" v-if="isPristine">
      Type in something to search for user
    </h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Subscription } from 'rxjs';

import SearchService, { SearchServiceMessage } from '@/service/searchService';

import ListItem from './ListItem.vue';
import ListItemSkeleton from './ListItemSkeleton.vue';

@Component({
  components: {
    ListItem,
    ListItemSkeleton,
  },
})
export default class List extends Vue {
  // TODO needs testing files
  // TODO too much function for a simple component
  searchMessage: SearchServiceMessage = {
    users: [],
    count: 0,
    loading: false,
    error: false,
    message: '',
  };

  subscription: Subscription | undefined;

  get isLoading() {
    return this.searchMessage.users.length === 0 && this.searchMessage.loading;
  }

  get isSuccessfull() {
    return this.searchMessage.users.length > 0
      && !this.searchMessage.loading
      && !this.searchMessage.error;
  }

  get isError() {
    return this.searchMessage.error;
  }

  get isPristine() {
    return !this.searchMessage.error
      && this.searchMessage.users.length === 0
      && !this.searchMessage.loading;
  }

  created() {
    this.subscription = SearchService.getSearch().subscribe((message: any) => {
      if (message) {
        this.searchMessage = message;
      } else {
        this.searchMessage = {
          users: [],
          count: 0,
          loading: false,
          error: false,
          message: '',
        };
      }
    });
  }
}
</script>
