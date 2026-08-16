// cart_timeline
import { AnneeAffichage } from "./DateTimeline";

export function EventCart(item) {
  return `
    <a href="#">
      <div class="custom-card-content border-t-[4px] border-l-[4px] border-sombre">
        <h3 class="custom-card-title">${item.title}</h3>
        <p class="custom-card-period">${AnneeAffichage(item.start)}${item.end ? "-" + AnneeAffichage(item.end) : ""}</p>
      </div>
      <img class="custom-card-bg" src="${item.image}" alt="${item.title}" />
    </a>
  `;
}

export function PortraitCart(item) {
  return `
    <a href="#" class="custom-card-link">
      <div>
        <h3 class="custom-card-title">${item.prenom} <br/> ${item.nom}</h3>
      </div>
      <div>
        <img class="custom-card-bg" src="${item.image}" alt="${item.title}" />
      </div>
    </a>
  `;
}

export function Cart(item) {
  if (item.them === "event") return EventCart(item);
  if (item.them === "portrait") return PortraitCart(item);
  return "";
}