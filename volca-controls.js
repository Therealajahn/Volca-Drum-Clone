const drumKeys = "weruio";

const drumButtons = [
  ...document.getElementsByClassName("drum button surfaces")[0].children,
  "drumButtons",
];

const effectButtons = [
  ...document.getElementsByClassName("effect button surfaces")[0].children,
  "effectButtons",
];

const chokeButtons = [
  ...document.getElementsByClassName("choke button surfaces")[0].children,
  "chokeButtons",
];

const triggerKeys = "asdfjkl;zxcvm,./";

const triggerButtons = [
  ...document.getElementsByClassName("trigger button surfaces")[0].children,
  "triggerButtons",
];

const modKeys = "qp";
const [firstMod, secondMod] = modKeys;

document.addEventListener("keydown", ifKeyPressed);
document.addEventListener("keyup", ifKeyPressed);

let keyHeld = false;
let firstKey = "";
let secondKey = "";

function ifKeyPressed(event) {
  switch (event.type) {
    case "keydown":
      switch (keyHeld) {
        case false:
          firstKey = event.key;
          findAndMoveButton(event, triggerKeys, triggerButtons, "rect");
          console.log("First Key:", firstKey);
          if (modKeys.indexOf(event.key) > -1) {
            keyHeld = true;
            console.log("Mod Key");
            break;
          }
          findAndMoveButton(event, drumKeys, drumButtons, "rect");
          break;

        case true:
          ifModPressed();
          secondKey = event.key;
          console.log("Second Key:", secondKey);
          break;
      }

      break;

    case "keyup":
      switch (event.key) {
        case firstKey:
          keyHeld = false;
          findAndMoveButton(event, triggerKeys, triggerButtons, "rect");
          findAndMoveButton(event, drumKeys, drumButtons, "rect");
          secondKey = event.key;
          console.log("First Key Released!");
          break;

        case secondKey:
          ifModPressed();
          secondKey = event.key;
          console.log("Second Key Released!");
          break;

        default:
          findAndMoveButton(event, triggerKeys, triggerButtons, "rect");
          findAndMoveButton(event, drumKeys, drumButtons, "rect");
          findAndMoveButton(event, drumKeys, effectButtons, "ellipse");
          findAndMoveButton(event, drumKeys, chokeButtons, "ellipse");
          secondKey = event.key;
      }

      break;
  }

  function ifModPressed() {
    switch (firstKey) {
      case firstMod:
        findAndMoveButton(event, drumKeys, effectButtons, "ellipse");
        console.log("Effect Buttons!");
        break;
      case secondMod:
        findAndMoveButton(event, drumKeys, chokeButtons, "ellipse");
        console.log("Choke Buttons!");
        break;
    }
  }
}

function findAndMoveButton(event, keyArray, buttonGroup, shape) {
  //TODO: init important variables and define them in both cases
  let currentButton = 0;
  let buttonIndex = 0;
  switch (arguments[0] === "click") {
    case true:
    case false:
      let buttonIndex = keyArray.indexOf(event.key.toLowerCase());
      if (buttonIndex < 0) return;
      currentButton = buttonGroup[buttonIndex];
      break;
  }

  let baseY = currentButton.getAttribute("base-y");
  let buttonPosition = "";
  //  Change position offset and attribute changed depending on shape
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

document.addEventListener("mousedown", (event) => {
  document.addEventListener("mousemove", mouseMoveStuff);
  let parent = event.target.parentElement;
  let knobTop = event.target.parentElement.children[2];

  let rotationCenter = {
    x: knobTop.getAttribute("cx"),
    y: knobTop.getAttribute("cy"),
  };

  let wiper = event.target.parentElement.children[4];
  let rotation = 45;

  wiper.setAttribute(
    "transform",
    `rotate(${rotation} ${rotationCenter.x} ${rotationCenter.y})`
  );
});

function mouseMoveStuff(event) {
  console.log("X:", event.clientX);
  console.log("Y:", event.clientY);
}

document.addEventListener("mouseup", (event) => {
  console.log("mouseup");
  document.removeEventListener("mousemove", mouseMoveStuff);
});
