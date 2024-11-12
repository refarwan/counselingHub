"use client";

import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "/data",
});

axiosInstance.defaults.withCredentials = true;

export { axiosInstance };
