import { SearchServiceMessage } from "../../../types/search";

const isLoading = (message: SearchServiceMessage) => {
  return message.users.length === 0 && message.loading;
}

const isSuccessful = (message: SearchServiceMessage) => {
  return message.users.length > 0
    && !message.loading
    && !message.error;
}

const isError = (message: SearchServiceMessage) => {
  return message.error;
}

const isPristine = (message: SearchServiceMessage) => {
  return !message.error
    && message.users.length === 0
    && !message.loading;
}

export const listStatus = {
  isError,
  isLoading,
  isPristine,
  isSuccessful,
}
