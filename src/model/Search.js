import axios from "axios";
import { key } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      const res = await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${this.query}`
      );
      // console.log(res);
      this.result = res.data.results;
      // console.log(this.result);
    } catch (error) {
      console.log(error);
    }
  }
}
