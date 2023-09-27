import axios from "axios";

const url: string | undefined = process.env.REACT_APP_API;

export async function postData(endpoint: string, payload: object) {
  try {
    const response = await axios.post(url + endpoint, payload);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getData(endpoint: string) {
  try {
    const response = await axios.get(url + endpoint);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
