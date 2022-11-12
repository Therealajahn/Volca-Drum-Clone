const drumKeys = "qwerty";

const drumButtons = document.getElementsByClassName("drum button surfaces")[0]
  .children;

const effectButtons = document.getElementsByClassName(
  "effect button surfaces"
)[0].children;

const chokeButtons = document.getElementsByClassName("choke button surfaces")[0]
  .children;

const triggerKeys = "asdfghjkzxcvbnm,";

const triggerButtons = document.getElementsByClassName(
  "trigger button surfaces"
)[0].children;

const modKeys = "opl;";

document.addEventListener("keydown", ifKeyPressed);
document.addEventListener("keyup", ifKeyPressed);

let modHeld = false;
let lastMod = "";

function ifKeyPressed(event) {
  console.log(event.key);
  //consider using qwerty for drums, yuiop for choke and 123456 for effects
  let modEvent = modKeys.indexOf(event.key) >= 0;

  if (!modHeld) {
    findAndMoveButton(event, triggerKeys, triggerButtons);
    findAndMoveButton(event, drumKeys, drumButtons);
  }

  if (!modHeld && modEvent) {
    modHeld = true;
    lastMod = event.key;
  } else if (modHeld && modEvent) {
    modHeld = false;
  } else if (modHeld) {
    switch (lastMod) {
      case "o":
        findAndMoveButton(event, drumKeys, effectButtons, "ellipse");
        break;
      case "l":
        findAndMoveButton(event, drumKeys, chokeButtons, "ellipse");
        break;
    }
  }

  function findAndMoveButton(event, keyArray, buttonGroup, shape = "rect") {
    // if key pressed is in triggerKeys array,
    //    if that key is pressed down, move the rectangle down that correspons to the key
    //    when that key is released, move the rect back to its base position
    let buttonIndex = keyArray.indexOf(event.key.toLowerCase());
    if (buttonIndex < 0) return;
    //the triggerButtons array corresponds to the triggerKeys array and the index of these keys is
    //used to find the trigger button
    let currentButton = buttonGroup[buttonIndex];
    let baseY = currentButton.getAttribute("base-y");
    let buttonPosition = "";
    //change position offset and attribute changed depending on shape
    let yAxis = "";
    let offset = 0;
    switch (shape) {
      case "rect":
        yAxis = "y";
        offset = 5;
        break;
      case "ellipse":
        yAxis = "cy";
        offset = 2.5;
        break;
    }

    switch (event.type) {
      case "keydown":
        buttonPosition = `${parseInt(baseY) + offset}`;
        break;
      case "keyup":
        buttonPosition = baseY;
    }

    currentButton.setAttribute(yAxis, buttonPosition);
  }
}
