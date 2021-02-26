import { mocked } from 'ts-jest/utils';
import { BPagination } from 'bootstrap-vue';
import { shallowMount } from '@vue/test-utils';

import Paginator from '@/components/Pagination/Paginator.vue';

import Mock = jest.Mock;
import SearchService, { SearchServiceInterface } from "@/service/searchService";

jest.mock('@/service/searchService');

describe('Paginator.vue', () => {
  const components = {
    BPagination,
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
      5
    );
  });
});
