import Vue from 'vue';
import vueDebounce from 'vue-debounce';
import { mocked } from 'ts-jest/utils';
import {
  BPagination, BCol, BInputGroup, BInputGroupPrepend, BFormInput, BRow, BFormInvalidFeedback,
} from 'bootstrap-vue';
import { shallowMount } from '@vue/test-utils';

import Paginator from '@/components/Pagination/Paginator.vue';
import SearchService from '@/service/searchService';
import Mock = jest.Mock;

Vue.use(vueDebounce);
jest.mock('@/service/searchService');

describe('Paginator.vue', () => {
  const components = {
    BPagination,
    BCol,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BRow,
    BFormInvalidFeedback,
  };
  let mockSubscribe: Mock;
  let mockSearchService: any;
  beforeEach(() => {
    mockSubscribe = jest.fn();
    mockSearchService = mocked(SearchService);
    mockSearchService.observable.mockClear();
  });

  it('Should subscribe to SearchService', () => {
    mockSearchService.observable.mockReturnValue({
      subscribe: mockSubscribe,
    });
    shallowMount(Paginator, {
      components,
    });
    expect(mockSearchService.observable).toBeCalled();
    expect(mockSubscribe).toBeCalled();
  });

  it('Should call paginate when calling change method', () => {
    mockSearchService.observable.mockReturnValue({
      subscribe: mockSubscribe,
    });
    const wrapper: any = shallowMount(Paginator, {
      components,
    });
    expect(wrapper.vm.change(1));
    expect(mockSearchService.observable).toBeCalled();
    expect(mockSearchService.paginate).toBeCalledWith(
      1,
      5,
    );
  });
});
