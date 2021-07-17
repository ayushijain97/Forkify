import Search from "./model/Search";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import List from "./model/List";
import Likes from "./model/Likes";
import Recipe from "./model/Recipe";
import { element, renderLoader, clearLoader } from "./views/base";
/*

-Global state of the app
-Current recipe object
-Shopping list object
-liked recipes
*/
// let oldLocation = "http://localhost:9090/";
const state = {};
/*

Search Controller
   
*/

const controlSearch = async () => {
  //1) Get the query from the view
  const query = searchView.getInput();
  if (query) {
    //2) New search object and add its state
    state.search = new Search(query);
    //3) Prepare UI for the result
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(element.searchRes);
    try {
      //4) search for recipes
      await state.search.getResult();
      //5) Render results on UI
      clearLoader();
      searchView.renderResult(state.search.result);
    } catch (err) {
      alert("Something went Wrong");
      clearLoader();
    }
  }
};
element.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
element.searchResPages.addEventListener("click", async (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResult();
    // searchView.renderResult(state.search.result, goToPage);
    console.log(goToPage);
  }
});
/*

Recipe Controller
   
*/
const controlRecipe = async (event) => {
  // debugger;
  // const currLocation = window.location.hash;
  // console.log("Current Location ", currLocation);
  // console.log("Old Location ", oldLocation);
  // if(currLocation === this.oldLocation) {
  //   console.log("Curr and Old Location are same");
  //   event.preventDefault();
  //   return false;
  // } else {
  //   console.log("Curr and Old Location are not  same XXXXXXXXXXXX");
  //   this.oldLocation = currLocation;
  // }
  console.log(event);
  const curr = window.location.hash;
  const id = curr.replace("#", "");
  console.log(id);
  if (id) {
    //1) New Recipe object and add its state
    state.recipe = new Recipe(id);
    //2) Prepare UI for the result
    recipeView.clearRecipe();
    renderLoader(element.recipe);
    // Highlight selected search item
    if (state.search) {
      searchView.highlightSelected(id);
    }
    try {
      // 3)Get recipe data
      await state.recipe.getRecipe();
      // 4)calculate servings and Time
      // 5)Render Recipe

      clearLoader();
      console.log("recipe in");
      recipeView.renderRecipe(state.recipe,state.like.isLiked(id));
    } catch (err) {
      // alert("Error Processing recipe!");
      console.log(err);
    }
  }
};
["hashchange","load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

/*

List Controller
   
*/
const controlList=()=>{
  // create a new list if there is none yet
  if(!state.list) state.list=new List();
  // Add each ingredients to the list and UI
  state.recipe.ingredients.forEach(el=>{
    const item = state.list.addItem(el.amount, el.unit, el.originalName);
    console.log(el.amount,"hey");
    listView.renderItem(item);
  })
    
}
// Handling update and delete list item events
element.shopping.addEventListener("click",e=>{
  const id=e.target.closest(".shopping__item").dataset.itemid;
  // handle the delete button
  if(e.target.matches(".shopping__delete,.shopping__delete *")){
  // Delete from state
  state.list.deleteItem(id);

  // Delete from UI
  listView.deleItem(id);
  }
  // handle the count update
  else if (e.target.matches(".shopping__count-value")) {
    const val=parseFloat(e.target.value,10);
    state.list.updateCount(id,val);
  }

}) 
/*

Like Controller
   
*/
// testing
state.like = new Likes();
likesView.toggleLikesMenu(state.like.getNumLikes());
const controlLike=()=>{
  // create a new like if there is none yet
  if (!state.like) state.like = new Likes();
  // user has not liked currently liked currentRecipe
  const currentID=state.recipe.id;
  if (!state.like.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.like.addLikes(
          currentID,
          state.recipe.title,
          state.recipe.img
        );
        // Toggle the liked button 
        likesView.toggleLikeBtn(true);
        // Add like to the UI list
        likesView.renderLikes(newLike);

  }
  // user has liked currently liked currentRecipe
  else {
    // Remove like from the state
    state.like.deleteLike(currentID);
    // Toggle the liked button
    likesView.toggleLikeBtn(false);
    // Remove like from  UI list
    likesView.deleteLikes(currentID);
  }
  likesView.toggleLikesMenu(state.like.getNumLikes());
  console.log(state.like.getNumLikes());
}




// Handling recipe button clicks
element.recipe.addEventListener("click", (e) => {
  if (e.target.matches(`.btn-decrease,.btn-decrease *`)) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase,.btn-increase *")) {
    // increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add,.recipe__btn--add *")) {
    // Add ingredients  to shopping list
    controlList();
  } else if (e.target.matches(".recipe__love,.recipe__love *")) {
    // Likes controller
    controlLike();
  }
});
