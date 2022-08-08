
export default class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue(item){
        return this.items.shift();
    }

    peek(){
        if(this.items.length == 0){
            return null;
        }
        return this.items[0];
    }

    size(){
        return this.items.length();
    }
}