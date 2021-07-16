import { element } from "./base";
export const getInput = () => element.searchInput.value;
export const clearInput = () => {
  element.searchInput.value = "";
};
export const clearResult = () => {
  element.searchResList.innerHTML = "";
  element.searchResPages.innerHTML = "";
};
export const highlightSelected = (id) => {
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
  resultsArr.forEach((el) => {
    el.classList.remove("results__link--active");
  });
  document
    .querySelector(`a[href="#${id}"]`)
    .classList.add("results__link--active");
};
/*

   title is their,now first we have to spilt that and reduce that into single string and now we
   will check whether that string length is less then limit
   
*/
const limitTitleSize = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}...`;
  }
  return title;
};
const renderRecipe = (recipes) => {
  const markup = `
   <li>
  <a class="results__link" href="#${recipes.id}">
      <figure class="results__fig">
          <img src="${recipes.image}" alt="${recipes.title}">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${limitTitleSize(recipes.title)}</h4>
      </div>
  </a>
</li>
`;
  element.searchResList.insertAdjacentHTML("beforeend", markup);
};
const createButton = (
  page,
  type
) => `<button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${
            type === "prev" ? "left" : "right"
          }"></use>
      </svg>
      <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
  </button>`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    // Only Button to go to next page
    button = createButton(page, "next");
  } else if (page < pages) {
    button = `
    ${createButton(page, "prev")}
    ${createButton(page, "next")}
    `;
    // Both Pages
  } else if (page === pages && pages > 1) {
    // Only Button to go to previous page
    button = createButton(page, "prev");
  }
  element.searchResPages.insertAdjacentHTML("afterbegin", button);
};
export const renderResult = (recipes, page = 1, resPerPage = 5) => {
  // render Results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  // render pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};
