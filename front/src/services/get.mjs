import axios from 'axios';

const url = import.meta.env.VITE_ENDPOINT;
const token = window.localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${url}/books`, config);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw new Error('Problem while getting book');
    }
};

export const getAllUserReservations = async () => {
    const url = import.meta.env.VITE_ENDPOINT;
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  try {
    const response = await axios.get(`${url}/books/reserved`, config);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Problem while getting user reservations');
    }
    // return response
  } catch (error) {}
};
