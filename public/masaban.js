var grabbedCard = null;

function drop_card() {
  grabbedCard.classList.remove("grabbed");
  grabbedCard = null;
  document.removeEventListener("mouseup", drop_card);
}

function grab_card(evt, elem) {
  grabbedCard = elem;
  console.log(evt);
  grabbedCard.classList.add("grabbed");
  document.addEventListener("mouseup", drop_card);
  if (grabbedCard.dataset.initialClickLocationX) {
    /*console.log("evt clientX is " + evt.clientX);
    console.log("initialClickLocation is " + grabbedCard.dataset.initialClickLocationX);

    grabbedCard.dataset.initialClickLocationX += Number(evt.clientX - grabbedCard.dataset.initialClickLocationX);*/
    return;
  }
  grabbedCard.dataset.initialClickLocationX = evt.clientX;
  grabbedCard.dataset.initialClickLocationY = evt.clientY;
}

function mouse_move(event) {
  if (grabbedCard) {
    const translateX =
      event.clientX - grabbedCard.dataset.initialClickLocationX;
    const translateY =
      event.clientY - grabbedCard.dataset.initialClickLocationY;

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
console.log("hello");
