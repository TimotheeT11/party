const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2504-FTB-EB-WEB-FT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

const events = [];

async function getEvents() {
  try {
    const response = await fetch(API);
    const json = await response.json();
    const events = json.data;
    console.log(events);
  } catch (error) {
    console.error(error);
  }
}

getEvents();