import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const hash = (s) => {
  return bcrypt.hashSync(s, salt);
};

export const compareHash = (s, hash) => {
  return bcrypt.compareSync(s, hash);
};

export const setUser = (user) => {
  localStorage.setItem("user", btoa(JSON.stringify(user)));
};

export const getUser = () => {
  try {
    return JSON.parse(atob(localStorage.getItem("user")));
  } catch (e) {
    return null;
  }
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

String.prototype.capitalizeFirstLetter = () => {
  return this.replace(/^./, this[0].toUpperCase());
};
