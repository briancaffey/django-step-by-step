import http from 'k6/http';

const baseUrl = __ENV.BASE_URL || 'http://0.0.0.0:8000';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const path = '/api/drf/cbv/posts/'
  const url = baseUrl + path;
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const payload = JSON.stringify({
    body: 'k6 blog post content ' + Math.random(),
  });

  http.post(url, payload, params);
}
