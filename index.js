const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2504-FTB-EB-WEB-FT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

/**
 * @typedef Event
 * @property {number} id ID of the event
 * @property {string} name Event name
 * @property {string} description Event description
 * @property {date} date When the event is happening
 * @property {string} location Where the event is happening
 */

let events = [];

async function getEvents() {
  try {
    const response = await fetch(API);
    const json = await response.json();
    console.log("events =", events);
    events = json.data;
    console.log("events =", events);
  } catch (error) {
    console.error(error);
  }
}

// function EventListItem(event) {}

function EventList() {
  const $ul = document.createElement("ul");
  
  const $events = events.map((event) => {
    const $li = document.createElement("li");
    $li.innerHTML = `
    <a>${event.name}</a>
    `;
    // TODO: ADD EVENT LISTENER TO LIST ITEMS

    return $li;
    });
  
  $ul.replaceChildren(...$events);

  return $ul;
}

function render () {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <EventList></EventList>
      </section>
    </main>
  `;
  $app.querySelector("EventList").replaceWith(EventList());
}

async function init () {
  await getEvents();
  render();
}

init();