import axios from "axios";

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    if (response == undefined || !response.status === 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch data");
  }
}

function fetchNames(nameType) {
  return fetchData(`https://www.randomlists.com/data/names-${nameType}.json`);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export async function generateName(gender) {
  try {
    const response = await Promise.all([
      fetchNames(gender || pickRandom(["male", "female"])),
      fetchNames("surnames"),
    ]);

    const [firstNames, lastNames] = response;

    const firstName = pickRandom(firstNames.data).capitalizeFirstLetter();
    const lastName = pickRandom(lastNames.data).capitalizeFirstLetter();

    return `${firstName}${lastName}`;
  } catch (error) {
    console.log("Unable to generate name:", error);
    throw error;
  }
}
