import http from 'k6/http';

const baseUrl = __ENV.BASE_URL || 'http://0.0.0.0:8000';

export const options = {
  scenarios: {
    contacts: {
      // https://k6.io/docs/using-k6/scenarios/executors/ramping-arrival-rate
      executor: 'ramping-arrival-rate',

      // Our test with at a rate of 300 iterations started per `timeUnit` (e.g minute).
      startRate: 300,

      // It should start `startRate` iterations per minute
      timeUnit: '1m',

      // It should preallocate 2 VUs before starting the test.
      preAllocatedVUs: 2,

      // It is allowed to spin up to 50 maximum VUs in order to sustain the defined
      // constant arrival rate.
      maxVUs: 50,

      stages: [
        // It should start 300 iterations per `timeUnit` for the first minute.
        { target: 300, duration: '1m' },

        // It should linearly ramp-up to starting 600 iterations per `timeUnit` over the following two minutes.
        { target: 600, duration: '2m' },

        // It should continue starting 600 iterations per `timeUnit` for the following four minutes.
        { target: 600, duration: '4m' },

        // It should linearly ramp-down to starting 60 iterations per `timeUnit` over the last two minute.
        { target: 60, duration: '2m' },
      ],
    },
  },
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
