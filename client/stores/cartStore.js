import { observable, action, computed, makeObservable } from "mobx";

class CartStore {
    cart = [];

    constructor(products = []) {
        makeObservable(this, {
            cart: observable,
            addProduct: action,
        });
        this.cart = products;
    }

    addProduct(product) {
        this.cart.push(product);
    }
}

// export singleton store
const cartStore = new CartStore();
export default cartStore;
