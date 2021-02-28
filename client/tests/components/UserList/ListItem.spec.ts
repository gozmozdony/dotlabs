import { shallowMount } from '@vue/test-utils';
import ListItem from '@/components/UserList/ListItem.vue';

import {
  BCard, BImg, BCol, BRow, BBadge, BMedia, BMediaAside, BMediaBody,
} from 'bootstrap-vue';
import searchResultExample from '../../testData';

describe('User ListItem.vue', () => {
  const components = {
    BCard,
    BImg,
    BCol,
    BRow,
    BBadge,
    BMedia,
    BMediaAside,
    BMediaBody,
  };
  it('Should render user when passed', () => {
    const wrapper = shallowMount(ListItem, {
      components,
      propsData: { user: searchResultExample },
    });

    const userNameHeader = wrapper.find('h5');
    const userImage = wrapper.findComponent(BImg);
    const userPageLink = wrapper.find('a');
    const userEmail = wrapper.find('.user_email');
    const userFollowing = wrapper.find('.user_following');
    const userFollowers = wrapper.find('.user_followers');
    const userPublicRepos = wrapper.find('.user_public_repos');

    expect(userNameHeader.text()).toMatch(searchResultExample.name);
    expect(userImage.attributes('src')).toMatch(searchResultExample.profilePic);
    expect(userPageLink.text()).toMatch(searchResultExample.username);
    expect(userPageLink.attributes('href')).toMatch(searchResultExample.url);
    expect(userEmail.text()).toMatch(searchResultExample.email);
    expect(userFollowing.text()).toMatch(
      `Following ${searchResultExample.following.toString()}`,
    );
    expect(userFollowers.text()).toEqual(
      `Followers ${searchResultExample.followers.toString()}`,
    );
    expect(userPublicRepos.text()).toEqual(
      `Public Repos ${searchResultExample.publicRepos.toString()}`,
    );
  });

  it('Should render email when user does not have one', () => {
    const wrapper = shallowMount(ListItem, {
      components,
      propsData: {
        user: {
          ...searchResultExample,
          email: null,
        },
      },
    });

    const userNameHeader = wrapper.find('h5');
    const userImage = wrapper.findComponent(BImg);
    const userPageLink = wrapper.find('a');
    const userEmail = wrapper.find('.user_email');
    const userFollowing = wrapper.find('.user_following');
    const userFollowers = wrapper.find('.user_followers');
    const userPublicRepos = wrapper.find('.user_public_repos');

    expect(userNameHeader.text()).toMatch(searchResultExample.name);
    expect(userImage.attributes('src')).toMatch(searchResultExample.profilePic);
    expect(userPageLink.text()).toMatch(searchResultExample.username);
    expect(userPageLink.attributes('href')).toMatch(searchResultExample.url);
    expect(userEmail.text()).toMatch('No public email address.');
    expect(userFollowing.text()).toMatch(
      `Following ${searchResultExample.following.toString()}`,
    );
    expect(userFollowers.text()).toEqual(
      `Followers ${searchResultExample.followers.toString()}`,
    );
    expect(userPublicRepos.text()).toEqual(
      `Public Repos ${searchResultExample.publicRepos.toString()}`,
    );
  });
});
