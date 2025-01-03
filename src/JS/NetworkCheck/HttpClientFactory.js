/*
Path: src/JS/NetworkCheck/HttpClientFactory.js

*/

import axios from 'axios';
import IHttpClient from './interfaces/IHttpClient';

class AxiosHttpClient extends IHttpClient {
  constructor() {
    super();
    this.client = axios.create({
      baseURL: 'http://localhost.com', // Replace with your actual base URL
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  post(url, data, config) {
    return this.client.post(url, data, config);
  }

  get(url, config) {
    return this.client.get(url, config);
  }
}

export default function createHttpClient() {
  return new AxiosHttpClient();
}