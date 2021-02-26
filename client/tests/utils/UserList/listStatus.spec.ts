import listStatus from '@/utils/UserList/listStatus';
import { SearchServiceMessage, User } from '@/search';

describe('User List util', () => {
  const status = listStatus;
  const defaultMessage: SearchServiceMessage = {
    users: [],
    loading: false,
    count: 1,
    message: '',
    error: false,
  };
  describe('isLoading', () => {
    it('Should return with loading state true', () => {
      const message = {
        ...defaultMessage,
      };
      const result = status.isLoading(message);
      expect(result).toEqual(false);
    });

    it('Should return with loading state true if there are no users', () => {
      const message = {
        ...defaultMessage,
        loading: true,
      };
      const result = status.isLoading(message);
      expect(result).toEqual(true);
    });

    it('Should return with loading state false if there are users', () => {
      const message = {
        ...defaultMessage,
        users: [{} as User],
        loading: true,
      };
      const result = status.isLoading(message);
      expect(result).toEqual(false);
    });
  });

  describe('isSuccessful', () => {
    it('Should return with successful state true', () => {
      const message = {
        ...defaultMessage,
        users: [{} as User],
      };
      const result = status.isSuccessful(message);
      expect(result).toEqual(true);
    });

    it('Should return with successful state false if loading', () => {
      const message = {
        ...defaultMessage,
        loading: true,
      };
      const result = status.isSuccessful(message);
      expect(result).toEqual(false);
    });

    it('Should return with successful state false if there are no users loaded in', () => {
      const message = {
        ...defaultMessage,
      };
      const result = status.isSuccessful(message);
      expect(result).toEqual(false);
    });

    it('Should return with successful state false if there is an error', () => {
      const message = {
        ...defaultMessage,
        error: true,
      };
      const result = status.isSuccessful(message);
      expect(result).toEqual(false);
    });
  });

  describe('isError', () => {
    it('Should return with error state true if there are errors', () => {
      const message = {
        ...defaultMessage,
        error: true,
      };
      const result = status.isError(message);
      expect(result).toEqual(true);
    });

    it('Should return with error state false if there are no errors', () => {
      const message = {
        ...defaultMessage,
      };
      const result = status.isError(message);
      expect(result).toEqual(false);
    });
  });

  describe('isPristine', () => {
    it('Should return with pristine state true', () => {
      const message = {
        ...defaultMessage,
      };
      const result = status.isPristine(message);
      expect(result).toEqual(true);
    });

    it('Should return with pristine state false if loading', () => {
      const message = {
        ...defaultMessage,
        loading: true,
      };
      const result = status.isPristine(message);
      expect(result).toEqual(false);
    });

    it('Should return with pristine state false if there are already users loaded in', () => {
      const message = {
        ...defaultMessage,
        users: [{} as User],
      };
      const result = status.isPristine(message);
      expect(result).toEqual(false);
    });

    it('Should return with pristine state false if there is an error', () => {
      const message = {
        ...defaultMessage,
        error: true,
      };
      const result = status.isPristine(message);
      expect(result).toEqual(false);
    });
  });
});
