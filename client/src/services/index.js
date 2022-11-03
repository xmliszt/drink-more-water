import axios from "axios";
import { compareHash, hash } from "../utils";
const base_url = import.meta.env.VITE_BASE_URL;

export async function createUserAccount(username, password, goal, volume) {
  var pwd;
  if (password !== undefined && password !== null && password !== "") {
    pwd = hash(password);
  } else {
    pwd = null;
  }
  return axios.post(`${base_url}/user`, {
    name: username,
    password: pwd,
    goal,
    volume,
  });
}

export async function loginUser(username, password) {
  return new Promise((res, rej) => {
    axios
      .get(`${base_url}/user?name=${username}`)
      .then((response) => {
        let user = response.data;
        if (user !== "" && compareHash(password, user.password)) {
          res();
        } else if (user === "") {
          rej("user not exist");
        } else {
          rej("wrong password");
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export async function updateUserGoal(username, goal) {
  return axios.put(`${base_url}/user/goal`, {
    name: username,
    goal,
  });
}

export async function updateUserVolume(username, volume) {
  return axios.put(`${base_url}/user/volume`, {
    name: username,
    volume,
  });
}

export async function fetchUser(username) {
  return axios.get(`${base_url}/user?name=${username}`);
}

export async function getTotalVolume(username) {
  return axios.get(`${base_url}/record/volume?name=${username}`);
}

export async function addRecord(username) {
  return axios.post(`${base_url}/record`, { name: username });
}

export async function getRanks() {
  return axios.get(`${base_url}/user/rank`);
}

export async function addOnePoint(username) {
  return axios.put(`${base_url}/user/point/increment?name=${username}`);
}

export async function deleteUser(username) {
  return axios.delete(`${base_url}/user?name=${username}`);
}
