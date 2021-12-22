import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('https://brian.jamescaffey.com/api/drf/cbv/posts/', {
    tags: {
      'k6.test': 'test',
    }
  });
  sleep(1);
}