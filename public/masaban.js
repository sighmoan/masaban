var CONFIG = {
  host: "http://localhost",
  port: "9001",
  apiBaseUrl: "/api/v1",
};

var grabbedCard = null;

var grabbedX = 0;
var grabbedY = 0;

function drop_card() {
  grabbedCard.classList.remove("grabbed");
  console.log(grabbedCard.getBoundingClientRect());

  grabbedCard = null;
  document.removeEventListener("mouseup", drop_card);
}

function serializeCards() {
  var cards = document.getElementsByClassName("grid-item");
  const cardsArray = [...cards];
  var cardObjects = cardsArray.map((card) => {
    var newObj = {
      contents: card.value,
      dataset: card.dataset,
      translate: card.style.translate,
      id: 1,
    };
    return newObj;
  });

  return { cards: cardObjects };
}

function deserializeCards(data) {
  return data.map((card) => {
    var newElement = document.createElement("textarea");
    newElement.classList.add("grid-item");
    newElement.addEventListener("mousedown", function (event) {
      grab_card(event, newElement);
    });
    newElement.style.translate = card.translate;
    newElement.value = card.contents;

    if (card.dataset) {
      newElement.dataset["initialClickLocationX"] =
        card.dataset.initialClickLocationX;
      newElement.dataset["initialClickLocationY"] =
        card.dataset.initialClickLocationY;
      newElement.dataset["offsetX"] = card.dataset.offsetX;
      newElement.dataset["offsetY"] = card.dataset.offsetY;
    }

    console.log(newElement);
    return newElement;
  });
}

function save() {
  var jsonObjects = JSON.stringify(serializeCards());
  fetch(CONFIG.host + ":" + CONFIG.port + CONFIG.apiBaseUrl + "/board/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonObjects,
  }).then(() => {
    console.log("successfully saved to server");
  });
}

function load() {
  document.getElementById("grid-container").innerHTML = "";

  fetch(CONFIG.host + ":" + CONFIG.port + CONFIG.apiBaseUrl + "/board/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("javascript is an ugly language");
      }
      console.log(response);
      var jsonResponse = response.json();
      console.log(jsonResponse);
      return jsonResponse;
    })
    .then((data) => {
      console.log(data);
      const newElements = deserializeCards(data.cards);
      console.log("new elements being ", newElements);
      for (const element of newElements) {
        document.getElementById("grid-container").appendChild(element);
      }
    });
}

function grab_card(evt, elem) {
  grabbedCard = elem;
  console.log(evt);
  console.log(elem.getBoundingClientRect());
  var elemCurrentRectX = elem.getBoundingClientRect().left;
  var elemCurrentRectY = elem.getBoundingClientRect().top;

  var placementOfMouseX = evt.clientX - elemCurrentRectX;
  var placementOfMouseY = evt.clientY - elemCurrentRectY;
  grabbedX = placementOfMouseX;
  grabbedY = placementOfMouseY;

  console.log("x: ", placementOfMouseX, " y: ", placementOfMouseY);
  grabbedCard.classList.add("grabbed");
  document.addEventListener("mouseup", drop_card);

  if (!grabbedCard.dataset.initialClickLocationX) {
    grabbedCard.dataset.initialClickLocationX = elemCurrentRectX;
    grabbedCard.dataset.initialClickLocationY = elemCurrentRectY;
  }
  grabbedCard.dataset.offsetX =
    grabbedCard.dataset.initialClickLocationX - placementOfMouseX;
  grabbedCard.dataset.offsetY =
    grabbedCard.dataset.initialClickLocationY - placementOfMouseY;
}

function mouse_move(event) {
  if (grabbedCard) {
    const translateX =
      event.clientX - grabbedCard.dataset.initialClickLocationX - grabbedX;
    const translateY =
      event.clientY - grabbedCard.dataset.initialClickLocationY - grabbedY;

    let str = translateX + "px " + translateY + "px";
    console.log(str);
    grabbedCard.style.translate = str;
  }
}

document.querySelectorAll(".grid-item").forEach((elem) => {
  elem.addEventListener("mousedown", function (event) {
    grab_card(event, elem);
  });
});

window.addEventListener("mousemove", mouse_move);

window.grab_card = grab_card;
