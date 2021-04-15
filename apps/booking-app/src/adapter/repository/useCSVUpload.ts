import { fetcher } from '../infrastructur/fetch';

export const useCSVUpload = () => {
  const upload = async (file) => {
    const res = await fetcher(file); // `/csv_upload/`
  };
  return {
    upload,
  };
};
