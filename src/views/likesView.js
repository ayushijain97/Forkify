import { element } from "./base";
export const toggleLikeBtn=isLiked=>{
    const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
    document
      .querySelector(".recipe__love use")
      .setAttribute("href", `img/icons.svg#${iconString}`);

}
export const toggleLikesMenu=numLikes=>{
  element.likesMenu.style.visibility = numLikes>0? "visible" : "hidden";
}
export const renderLikes=like=>{
  const markup = `
   
                          <li>
                              <a class="likes__link" href="#${like.id}">
                                  <figure class="likes__fig">
                                      <img src="${like.image}" alt="Test">
                                  </figure>
                                  <div class="likes__data">
                                      <h4 class="likes__name">${like.title}</h4>
                                  </div>
                              </a>
                          </li>
                      `;
                      element.likesList.insertAdjacentHTML("beforeend",markup);
}
export const deleteLikes=id=>{
  const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
  console.log(el,"deleted");
   if(el) el.parentElement.removeChild(el);
}