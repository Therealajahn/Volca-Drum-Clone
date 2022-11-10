document.addEventListener("keydown", ifTriggerKeyPressed);
document.addEventListener("keyup", ifTriggerKeyPressed);

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
let drumButton = document.getElementsByClassName("trigger-button-surfaces")[0]
  .children;

function ifTriggerKeyPressed(e) {
  // if key pressed is in triggerKeys array,
  //    if that key is pressed down, move the rectangle down that correspons to the key
  //    when that key is released, move the rect back to its base position
  let buttonIndex = triggerKeys.indexOf(e.key);
  if (buttonIndex < 0) return;
  //the drumButton array corresponds to the triggerKeys array and the index of these keys is
  //used to find the trigger button
  let currentButton = drumButton[triggerKeys.indexOf(e.key)];
  let baseY = currentButton.getAttribute("base-y");
  let buttonPosition = "";

  switch (e.type) {
    case "keydown":
      buttonPosition = `${parseInt(baseY) + 5}`;
      break;
    case "keyup":
      buttonPosition = baseY;
  }

  currentButton.setAttribute("y", buttonPosition);
}
