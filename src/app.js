// !Pinotify do not delete it!

import {
  defaultModules,
  success,
  error,
} from "../node_modules/@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "../node_modules/@pnotify/mobile/dist/PNotifyMobile.js";
import "@pnotify/core/dist/BrightTheme.css";
defaultModules.set(PNotifyMobile, {});
import fetchCountries from "./fetchCountries.js";

// * Our elements

const form = document.querySelector(".searchForm");
const input = document.querySelector(".searchInput");
const list = document.querySelector(".app-list");

// * If a user click to the buton or press ENTER we will start this function
form.addEventListener("submit", (event) => {
  event.preventDefault(); // ! Do not delete it!
  const value = input.value.toLowerCase().trim(); // * we will delete spaces in start end in the end and make the letters with out big leters
  fetchCountries(value).then(renderCountry); // * will start another function for renderCountry
});

function renderCountry(array) {
  // * If we have more than 10 arrays we will be show user a modal that he write a country more specific query
  if (array.length > 10) {
    return error({
      title: "Oh No!",
      text: "Too many matches found. Please enter your a more specific query!",
    });
  }
  // * If we do not found a country we will be show user a modal that  write a country correctly
  else if (array.message == "Not Found") {
    return error({
      title: "Oh No!",
      text: "Write a name of a country corectly",
    });
  }
  // * We will reder a list if we have more than 10 arrays
  else if (array.length <= 10 && array.length > 1) {
    // * Clear a list
    list.innerHTML = "";
    //  * make a new list for countries
    const countries = array.map((country) => {
        return `<li class="app-item">${country.name.common}</li>`;
      }).join("");
    // * Add our items in the end of the list
    list.insertAdjacentHTML("beforeend", countries);
  } 
  // * If we have 1 array we wil show him information about this country!
  else if (array.length === 1) {
    // * Clear a list
    list.innerHTML = "";
    //  * make a board for information about with country
     const countrie = array.map(
        ({ name, capital, population, flags, languages }) => {
          const languagesArray = Object.values(languages);
          return `<h1 class="app-name">Name: ${name.common}</h1>
            <div class="app-box">
                <div class="app-info">
                    <h3 class="app-subtitle">Capital: <span
                            class="app-subtitle-info">${capital}</span></h3>
                    <h3 class="app-subtitle">Population: <span
                            class="app-subtitle-info">${population}</span></h3>
                    <h3 class="app-subtitle">Languages:
                        <ul class="app-clanguages">
                           ${languagesArray
                             .map(
                               (language) => `<li class="languages-item">
                                <h3 class="languages-subtitle">${language}</h3>
                            </li>`
                             )
                             .join("")}
                        </ul>
                    </h3>
                </div>
                <div class="app-image">
                    <img src="${flags.png}" alt="Country Flag."
                        class="app-cimg" width="400" height="300">
                </div>
            </div>`;
        }
      ).join("");
    // * Add our board in the end of the list
    list.insertAdjacentHTML("beforeend", countrie);
  }
}
