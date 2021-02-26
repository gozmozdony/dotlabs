import { shallowMount } from '@vue/test-utils';
import ListItemSkeleton from '@/components/UserList/ListItemSkeleton.vue';

import {
  BCard,
  BCol,
  BMedia,
  BMediaAside,
  BMediaBody,
  BRow,
  BSkeleton,
  BSkeletonImg,
} from 'bootstrap-vue';

describe('User ListItem.vue', () => {
  const components = {
    BCard,
    BCol,
    BMedia,
    BMediaAside,
    BMediaBody,
    BRow,
    BSkeleton,
    BSkeletonImg,
  };
  it('Should render all skeletons', () => {
    const wrapper = shallowMount(ListItemSkeleton, {
      components,
    });

    const userImage = wrapper.findComponent(BSkeletonImg);
    const userSkeletons = wrapper.findAllComponents(BSkeleton);

    expect(userImage.exists()).toEqual(true);
    expect(userSkeletons.length).toEqual(6);
  });
});
