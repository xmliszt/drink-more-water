import { maleNames } from "./male";
import { femaleNames } from "./female";

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateName() {
  const name = pickRandom([
    ...maleNames,
    ...femaleNames,
  ]).capitalizeFirstLetter();
  return `${name}`;
}
