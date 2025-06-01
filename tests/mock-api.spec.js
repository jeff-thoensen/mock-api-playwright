import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';

test('Create user via POST and validate static user list via GET', async ({ request }) => {
  // Define test user data
  const newUser = {
    name: 'Eve Johnson',
    email: 'eve@example.com',
  };

  // POST: Create a new user
  const postResponse = await request.post('/users', {
    headers: {
      'x-api-key': process.env.POSTMAN_API_KEY,
    },
    data: newUser,
  });

  expect(postResponse.status()).toBe(201);

  const createdUser = await postResponse.json();
  expect(createdUser).toMatchObject(newUser);

  // GET: Fetch all users (mock server returns static list)
  const getResponse = await request.get('/users', {
    headers: {
      'x-api-key': process.env.POSTMAN_API_KEY,
    },
  });

  expect(getResponse.ok()).toBeTruthy();

  const users = await getResponse.json();
  const userNames = users.users.map((u) => u.name);

  // Assertion matches the mock sample response, not dynamic data
  expect(userNames).toEqual(['John Doe', 'Jane Smith']);
});
