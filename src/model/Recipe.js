import axios from "axios";
import { key } from "../config";
export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      const res = await axios(
        `https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`
      );
      this.title = res.data.title;
      this.img = res.data.image;
      this.url = res.data.sourceUrl;
      this.ingredients = res.data.extendedIngredients;
      this.readyInMinutes = res.data.readyInMinutes;
      this.servings = res.data.servings;
    } catch (error) {
      alert(`Something went wrong :(`);
    }
  }
  // calcTime() {
  //   //Assuming that we need15min
  //   const numIng = this.extendedIngredients.length;
  //   const periods = Math.ceil(numIng / 3);
  //   this.time = periods * 15;
  // }
  updateServings(type) {
    //Servings
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

    // Ingredients
    this.ingredients.forEach((ing) => {
      ing.amount = ing.amount * (newServings / this.servings);
    });
    this.servings = newServings;
  }
}
