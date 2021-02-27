<template>
  <div>
    <ul class="list-unstyled" v-if="status.isLoading(searchMessage)">
      <ListItemSkeleton/>
      <ListItemSkeleton/>
    </ul>
    <ul class="list-unstyled" v-if="status.isSuccessful(searchMessage)">
      <ListItem
        v-for="user in searchMessage.users" :key="user.username"
        :user="user"/>
    </ul>
    <h3 class="text-center my-4 text-danger" v-if="status.isError(searchMessage)">
      {{ searchMessage.message }}
    </h3>
    <h3 class="text-center my-4" v-if="status.isPristine(searchMessage)">
      Type in something to search for user
    </h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Subscription } from 'rxjs';

import SearchService from '@/service/searchService';
import listStatus from '@/utils/UserList/listStatus';
import { SearchServiceMessage } from '@/types/search';

import ListItem from './ListItem.vue';
import ListItemSkeleton from './ListItemSkeleton.vue';

@Component({
  components: {
    ListItem,
    ListItemSkeleton,
  },
})
export default class List extends Vue {
  status = listStatus;

  searchMessage: SearchServiceMessage = {
    users: [],
    count: 0,
    loading: false,
    error: false,
    message: '',
  };

  subscription: Subscription | undefined;

  created() {
    this.subscription = SearchService.observable().subscribe((message: any) => {
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
