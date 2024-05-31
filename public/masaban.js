var grabbedCard = null;
var gotListener = false;

function drop_card() {
  grabbedCard.classList.remove("grabbed");
  grabbedCard = null;
  gotListener = false;
  document.removeEventListener("click", drop_card);
}

function grab_card(evt, elem) {
  grabbedCard = elem;
  console.log(evt);
  grabbedCard.classList.add("grabbed");
  if(grabbedCard.dataset.initialClickLocationX) {
    return;
  }
  grabbedCard.dataset.initialClickLocationX = evt.clientX;
  grabbedCard.dataset.initialClickLocationY = evt.clientY;
}

function mouse_move(event) {
  if(grabbedCard) {
    if(!gotListener) {
      document.addEventListener("click", drop_card);
      gotListener = true;
    }
    const translateX = event.clientX - grabbedCard.dataset.initialClickLocationX;
    const translateY = event.clientY - grabbedCard.dataset.initialClickLocationY;

    let str = translateX + "px " + translateY + "px";
    console.log(str);
    grabbedCard.style.translate = str;
  }

}

document.querySelectorAll(".grid-item").forEach((elem) => {
  elem.addEventListener("click", function(event) {
    grab_card(event, elem);
  });
});

window.addEventListener("mousemove", mouse_move);

window.grab_card = grab_card;
console.log("hello");