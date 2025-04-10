const COHORT = "2502-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  parties: []
};

const partyList = document.querySelector("#partyList");
const partyForm = document.querySelector("#partyForm");

async function getParties() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.parties = json.data;
    console.log(state.parties);
  } catch (error) {
    console.error(error);
  };
};

async function addParty(event) {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const date = new Date(document.querySelector("#date").value);
  const location = document.querySelector("#location").value;
  const description = document.querySelector("#description").value;

  const newParty = {
    name, date, location, description
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newParty),
    });
    const json = await response.json();
    // console.log(json.data);

    renderParty(json.data);
    partyForm.reset();

  } catch (error) {
    console.error(error);
  };
};

async function deleteParty(event) {
  if (event.target.classList.contains("delete-button")) {
    const partyId = event.target.dataset.partyId;

    try {
      await fetch(`${API_URL}/${partyId}`, {
        method: "DELETE",
      });
      event.target.parentElement.remove();

    } catch (error) {
      console.error(error);
    };
  };
};

function renderParty(party) {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${party.name}</strong><br>
    Date: ${new Date(party.date).toLocaleDateString()}<br>
    Location: ${party.location}<br>
    Description: ${party.description}<br>
    <button class="delete-button" data-party-id="${party.id}">Delete</button>
  `;
  partyList.appendChild(li);
}

function renderPartyList() {
  state.parties.forEach(party => {
    renderParty(party);
  });
};

async function render() {
  await getParties();
  renderPartyList();
};

render();

partyForm.addEventListener("submit", addParty);
partyList.addEventListener("click", deleteParty);