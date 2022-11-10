const drumKeys = ["q", "w", "e", "r", "t", "y"];

const drumButtons = document.getElementsByClassName("drum button surfaces")[0]
  .children;

const effectButtons = document.getElementsByClassName(
  "effect button surfaces"
)[0].children;

const chokeButtons = document.getElementsByClassName("choke button surfaces")[0]
  .children;

const triggerKeys = [
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
];

const triggerButtons = document.getElementsByClassName(
  "trigger button surfaces"
)[0].children;

document.addEventListener("keydown", ifKeyPressed);
document.addEventListener("keyup", ifKeyPressed);

let modHeld = false;
function ifKeyPressed(event) {
  if (modHeld && event.type === "keydown") {
    console.log("secondKey", event.key);
  }
  if (!modHeld && event.ctrlKey && event.type === "keydown") {
    console.log("Mod!");
    modHeld = true;
  } else if (modHeld && !event.ctrlKey && event.type === "keyup") {
    console.log("NO MOD!!");
    modHeld = false;
  }

  findAndMoveButton(event, triggerKeys, triggerButtons);
  findAndMoveButton(event, drumKeys, drumButtons);

  //   findAndMoveButton(event, drumKeys, effectButtons, "ellipse");
  //   findAndMoveButton(event, drumKeys, chokeButtons, "ellipse");

  function findAndMoveButton(event, keyArray, buttonGroup, shape = "rect") {
    // if key pressed is in triggerKeys array,
    //    if that key is pressed down, move the rectangle down that correspons to the key
    //    when that key is released, move the rect back to its base position
    let buttonIndex = keyArray.indexOf(event.key);
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
