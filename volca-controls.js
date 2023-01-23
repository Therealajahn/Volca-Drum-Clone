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

const modKeys = "[]";
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
          // findAndMoveButton(event, triggerKeys, triggerButtons, "rect");
          // findAndMoveButton(event, drumKeys, drumButtons, "rect");
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
          switch (firstKey) {
            case "[":
              findAndMoveButton(event, drumKeys, effectButtons, "ellipse");
              console.log("Effect Button Released");
              break;
            case "]":
              findAndMoveButton(event, drumKeys, chokeButtons, "ellipse");
              console.log("Choke Buttons Released");
              break;
          }

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

  function findAndMoveButton(event, keyArray, buttonGroup, shape) {
    //  If key pressed is in triggerKeys array,
    //    If that key is pressed down, move the rectangle down that correspons to the key
    //    When that key is released, move the rect back to its base position

    let buttonIndex = keyArray.indexOf(event.key.toLowerCase());
    if (buttonIndex < 0) return;

    //  The triggerButtons array corresponds to the triggerKeys array and the index of these keys is
    //  ...used to find the trigger button

    let currentButton = buttonGroup[buttonIndex];
    // console.log("currentButton:", currentButton);
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
}
