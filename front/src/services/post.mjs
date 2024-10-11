import axios from 'axios';

const url = import.meta.env.VITE_ENDPOINT;
const token = window.localStorage.getItem('token');
const config = {
  headers: { authorization: `Bearer ${token}` },
};

export const login = async (data) => {
  // const {email, password} = data;
  const response = await axios.post(`${url}/users/login`, data);
  // console.log(response);

  return response;
};

export const signup = async (data) => {
  console.log(`${url}/users/signup`);

  const response = await axios.post(`${url}/users/signup`, data);
  console.log(response);
  return response;
};

export const reserveBook = async (reservationId) => {
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.post(
      `${url}/books/reserve/${reservationId}`,
      {},
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Problem while reserving book');
  }
};

export const extendReservation = async (reservationId) => {
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${url}/books/extend/${reservationId}`,
      {},
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Problem while extending reservation');
  }
};
