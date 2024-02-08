// TODO: write code here
import { Tooltip } from "./tooltip";

const btn = document.querySelector(".btn");
const tooltip = new Tooltip();
let tooltipId;

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (tooltipId) {
    tooltip.removeTooltip(tooltipId);
    tooltipId = undefined;
  } else {
    tooltipId = tooltip.showTooltip(e.target);
  }
});

// comment this to pass build
// const unusedVariable = "variable";

// // for demonstration purpose only
// export default function demo(value) {
//   return `Demo: ${value}`;
// }

// console.log("app.js included");
