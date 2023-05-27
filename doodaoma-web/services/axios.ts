import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const axiosAccountAPI = axios.create({
  baseURL: `${baseURL}`,
  withCredentials: true,
})

const axiosAuthAPI = axios.create({
  baseURL: `${baseURL}`,
  withCredentials: true,
})

const axiosContentAPI = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
})

export { axiosAccountAPI, axiosAuthAPI, axiosContentAPI }
