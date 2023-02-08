import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31789224-1660db70791515116d946dcb0';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getPhotos = async (q, page) => {
  const config = {
    params: {
      key: API_KEY,
      image_type: 'photo',
      q,
      page,
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
    },
  };

  const response = await instance.get('/', config);
  return response.data;
};

// https://pixabay.com/api/?q=cat&page=1 & key=your_key&image_type=photo& orientation=horizontal&per_page=12
