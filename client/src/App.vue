<template>
  <div id="app">
    <b-container>
      <h1>Search for Github Users</h1>
      <SearchBar/>
      <List/>
      <Paginator/>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import SearchBar from './components/SearchBar.vue';
import Paginator from './components/Pagination/Paginator.vue';
import List from './components/UserList/List.vue';

@Component({
  components: {
    SearchBar,
    List,
    Paginator,
  },
})
export default class App extends Vue {}
</script>
