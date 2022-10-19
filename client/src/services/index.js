import axios from "axios";
import bcrypt from "bcryptjs";

const base_url = import.meta.env.VITE_BASE_URL;
const salt = bcrypt.genSaltSync(10);

export async function createUserAccount(username, password, goal, volume) {
  let hashedPwd = bcrypt.hashSync(password, salt);
  return axios.post(`${base_url}/user`, {
    name: username,
    password: hashedPwd,
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
        if (user !== "" && bcrypt.compareSync(password, user.password)) {
          res();
        } else if (user === "") {
          rej("user not exist");
        } else {
          rej("wrong password");
        }
      })
      .catch(({ response }) => {
        rej(response.data);
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

export async function getUser(username) {
  return axios.get(`${base_url}/user?name=${username}`);
}

export async function getTotalVolume(username) {
  return axios.get(`${base_url}/record/volume?name=${username}`);
}

export async function addRecord(username) {
  return axios.post(`${base_url}/record`, { name: username });
}
