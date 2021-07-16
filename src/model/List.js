import uniqid from "uniqid";
export default class List {
           constructor(){
        this.item=[];
    }
    
    addItem (count, unit, ingredients){
        
          const item={
              id:uniqid(),
              count,
              unit,
              ingredients
          } 
          this.item.push(item);
          return item;
    }
    deleteItem(id){
        const index=this.item.findIndex(el => el.id===id);

        // ex:  [2,4,8]  splice(1,1)-->returns 4, original array is [2,8]
        // ex:  [2,4,8]  slice(1,1)-->returns nothing , original array is [2,4,8]
        this.item.slice(index,1);
    }
    updateCount(id,newCount){
        this.item.find(el=>el.id===id).count=newCount;

    }

}