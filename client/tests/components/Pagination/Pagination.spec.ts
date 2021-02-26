import { shallowMount } from '@vue/test-utils';
import Paginator from '@/components/UserList/Paginator.vue';

import { BPagination } from 'bootstrap-vue';
import Mock = jest.Mock;


describe('Paginator.vue', () => {
  const components = {
    BPagination
  };
  let mockObservable: Mock;
  let mockSubscribe: Mock;
  beforeEach(() => {
    mockObservable = jest.fn();
    mockSubscribe = jest.fn();
    jest.mock('@/service/searchService', () => ({
      observable: mockObservable
    }));
  });

  it('Should subscribe to SearchService', () => {
    shallowMount(Paginator, {
      components,
    });
    mockObservable.mockImplementation(() => ({
      subscribe: mockSubscribe
    }));
    expect(mockObservable).toBeCalled();
    expect(mockSubscribe).toBeCalled();
  });
});
