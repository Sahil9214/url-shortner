import axios from "axios";
import { getCookies } from "./cookies";
const url = "https://url-shortner-2-jwar.onrender.com";
export const AUTH = "auth";
export const URL = "url";

export const api = {
  signup: async (payload) => {
    try {
      let res = await axios.post(`${url}/${AUTH}/signup`, payload);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  login: async (payload) => {
    console.log(url, "url");
    try {
      let res = await axios.post(`${url}/${AUTH}/login`, payload);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  google: async () => {
    try {
      let res = await axios.get(`${url}/${AUTH}/google`);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  googleCallback: async () => {
    try {
      let res = await axios.get(`${url}/${AUTH}/google/callback`);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  shorten: async (payload) => {
    console.log("shortner", payload);
    const token = await getCookies();
    try {
      let res = await axios.post(`${url}/${URL}/shorten`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  shortenId: async (shortId) => {
    try {
      let res = await axios.get(`${url}/${URL}/${shortId}`);
      console.log("shortenId", res.data);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  counter: async (token) => {
    try {
      console.log(token, "token-counter token valahai ye");
      let res = await axios.get(`${url}/${URL}/counter?token=${token}`);
      return res.data;
    } catch (error) {
      return error;
    }
  },
};
