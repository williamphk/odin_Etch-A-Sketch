var draw = false;

document.getElementsByClassName("container")[0].addEventListener("mousedown", () => (draw = true));
document.getElementsByClassName("container")[0].addEventListener("drag", () => (draw = true));
document.getElementsByClassName("container")[0].addEventListener("mouseup", () => (draw = false));

function initial(size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement("div");
      div.className = "box";
      document.getElementsByClassName("container")[0].appendChild(div);
      div.addEventListener("mouseover", function (event) {
        if (draw) event.target.style.backgroundColor = randomRGB();
      });
    }
  }
}
initial(125);

function deleteChild(e) {
  //e.firstElementChild can be used.
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
}

var black = 1;

function randomRGB() {
  let r = Math.floor(Math.random() * 25) * 10;
  let g = Math.floor(Math.random() * 25) * 10;
  let b = Math.floor(Math.random() * 25) * 10;
  black -= 0.1;
  if (black < 0) {
    black = 0.9;
  }
  return `rgb(${r}, ${g}, ${b}, ${black})`;
}

function reset() {
  var e = document.getElementsByClassName("container")[0];
  deleteChild(e);
  let userSelection = parseInt(prompt("Please enter your size", ""));
  while (userSelection > 100 || userSelection <= 0) {
    userSelection = parseInt(prompt("Please enter 1 - 100", ""));
  }
  e.style.width = `${userSelection * 16}px`;
  initial(userSelection);
}

document.getElementById("resetBtn").addEventListener("click", reset);
