import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.POSTMAN_BASE_URL,
  },
});

