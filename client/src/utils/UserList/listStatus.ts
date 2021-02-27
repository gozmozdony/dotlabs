import { SearchServiceMessage } from '@/types/search';

const isLoading = (message: SearchServiceMessage) => message.users.length === 0 && message.loading;

const isSuccessful = (message: SearchServiceMessage) => message.users.length > 0
    && !message.loading
    && !message.error;

const isError = (message: SearchServiceMessage) => message.error;

const isPristine = (message: SearchServiceMessage) => !message.error
    && message.users.length === 0
    && !message.loading;

const listStatus = {
  isError,
  isLoading,
  isPristine,
  isSuccessful,
};

export default listStatus;
