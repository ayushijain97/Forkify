export default class Likes {
  constructor() {
    this.likes = [];
  }
  addLikes(id, title, image) {
    const like = { id, title, image };
    this.likes.push(like);
    return like;
  }
  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
      this.likes.slice(index, 1);
  }
  isLiked(id){
      return this.likes.findIndex(el=>el.id===id)!==-1;
  }
  getNumLikes(){
      return this.likes.length;
  }

}