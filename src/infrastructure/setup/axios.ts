import axios from 'axios'

const { WZ_TOKEN } = process.env;

const instance = axios.create({
  baseURL: 'https://graph.facebook.com/'
})

export const config = {
  headers: { Authorization: `Bearer ${WZ_TOKEN}` },
};


export default instance