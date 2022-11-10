let drumKeys = ["q", "w", "e", "r", "t", "y"];

let drumButtons = document.getElementsByClassName("drum button surfaces")[0]
  .children;

let triggerKeys = [
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

let triggerButtons = document.getElementsByClassName(
  "trigger button surfaces"
)[0].children;

document.addEventListener("keydown", ifKeyPressed);
document.addEventListener("keyup", ifKeyPressed);

function ifKeyPressed(event) {
  //   ifTriggerKeyPressed(event);
  findAndMoveButton(event, triggerKeys, triggerButtons);
  findAndMoveButton(event, drumKeys, drumButtons);

  function findAndMoveButton(event, keyArray, buttonGroup) {
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

    switch (event.type) {
      case "keydown":
        buttonPosition = `${parseInt(baseY) + 5}`;
        break;
      case "keyup":
        buttonPosition = baseY;
    }

    currentButton.setAttribute("y", buttonPosition);
  }

  function keySwitcher(currentButton) {
    return buttonPosition;
  }
}
