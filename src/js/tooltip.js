export class Tooltip {
  constructor() {
    this._tooltips = [];
  }

  createTooltip(title, content) {
    return `
      <div class="arrow">
      </div>
      <h3 class="popover-header">${title}</h3>
      <div class="popover-body">${content}</div>
    `;
  }
  showTooltip(element) {
    const tooltipElement = document.createElement("div");

    tooltipElement.classList.add("popover");
    const { title, content } = element.dataset;
    tooltipElement.innerHTML = this.createTooltip(title, content);

    const id = performance.now();

    this._tooltips.push({
      id,
      element: tooltipElement,
    });

    document.body.appendChild(tooltipElement);

    const { left, top } = element.getBoundingClientRect();

    tooltipElement.style.left =
      left + element.offsetWidth / 2 - tooltipElement.offsetWidth / 2 + "px";
    tooltipElement.style.top = top - 130 + "px";

    return id;
  }

  removeTooltip(id) {
    const tooltip = this._tooltips.find((t) => t.id === id);

    tooltip.element.remove();

    this._tooltips = this._tooltips.filter((t) => t.id !== id);
  }
}
