const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2504-FTB-EB-WEB-FT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

/** Event Objects
 * @typedef Event
 * @property {number} id ID of the event
 * @property {string} name Event name
 * @property {string} description Event description
 * @property {date} date When the event is happening
 * @property {string} location Where the event is happening
 */

let events = [];
let selectedEvent;

async function getEvents() {
  try {
    const response = await fetch(API);
    const json = await response.json();
    events = json.data;
    console.log("events =", events);
  } catch (error) {
    console.error(error);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + "/" + id);
    const json = await response.json();
    selectedEvent = json.data;
    render();
    console.log(selectedEvent);
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

    $li.querySelector("a").addEventListener("click", () => {
      getEvent(event.id);
    });

    return $li;
    });
  
  $ul.replaceChildren(...$events);

  return $ul;
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an artist to learn more.";
    return $p;
  }

  const $event = document.createElement("section");
  $event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <p>${selectedEvent.date}</p>
    <p>${selectedEvent.location}</p>
    <p>${selectedEvent.description}</p>
  `;

  return $event;
}

function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>
  `;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();