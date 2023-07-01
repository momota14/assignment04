import products from "./product.js";

const totalProduct = document.getElementById("totalProduct");
const cartList = document.getElementById("cartList");
const clearList = document.getElementById("clear");

const cart = {
  productArr: [],
  grandTotal: 0,

  totalCart() {
    let totalQuantity = 0;
    if (this.productArr.length > 0) {
      for (let i = 0; i < this.productArr.length; i++) {
        totalQuantity += this.productArr[i].quantity;
      }
      clearList.classList.add("d-flex");
    } else {
      clearList.classList.remove("d-flex");
    }
    totalProduct.innerHTML = `(${totalQuantity})`;
    this.grandTotalFUnc();
  },

  displayCart() {
    // cart rendering
    if (this.productArr.length > 0) {
      cartList.innerHTML = "";
      this.productArr.map((product) => {
        return (cartList.innerHTML += `
          <li>
            <div class="d-flex justify-content-between align-items-center unselectable" style="padding-right: 3px;">
              <div class="item-left d-flex align-items-center">
                  <img class="w-25" src=${product?.image} alt="" />
                  <div class="item-info">
                    <small class="line-clamp fw-semibold pb-1 ">${product?.name}</small> 
                      <!-- quantity increment decrement -->
                      <div class="quantity">
                      <div class="quantity__minus unselectable" data-item-id="${product?.id}">-</div>
                      <input name="quantity" type="text" class="quantity__input" value=${product?.quantity} disabled>
                      <div class="quantity__plus unselectable" data-item-id="${product?.id}">+</div>
                      <div class="productDetails fw-medium" style="padding-left: 4px;"> x <span class="text-danger ">$${product?.price}</span></div>
                    </div>
                  </div>
              </div>
              <div class="item-right">
                  <button class="remove-item btn btn-outline-danger  fa-solid fa-trash-can" data-item-id="${product?.id}"></button>
              </div>
          </div>
        </li>
    `);
      });
    } else {
      cartList.innerHTML =
        "<div class='text-center text-secondary py-2'>No products in the cart</div>";
    }

    const removeItemButtons = document.querySelectorAll(".remove-item");
    removeItemButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = parseInt(button.dataset.itemId);
        this.removeCart(itemId);
        this.totalCart();
        this.displayCart();
      });
    });

    const incrementBtn = document.querySelectorAll(".quantity__plus");
    incrementBtn.forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = parseInt(button.dataset.itemId);
        this.incrementCart(itemId);
      });
    });

    const decrementBtn = document.querySelectorAll(".quantity__minus");
    decrementBtn.forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = parseInt(button.dataset.itemId);
        this.decrementCart(itemId);
      });
    });
  },

  grandTotalFUnc() {
    // Subtotal render
    let grandTotalProduct = 0;
    const grandTotalEl = document.getElementById("total");
    if (this.grandTotal > 0) {
      grandTotalEl.innerHTML = `
        <h6 class="d-flex justify-content-between border-top border-light-subtle pt-2 mt-2 text-secondary">
          <div>SUBTOTAL</div>
          <div>$${this.grandTotal.toFixed(2)}</div>
        </h6>
      `;
    } else {
      grandTotalEl.innerHTML = "";
    }

    if (this.productArr.length > 0) {
      for (let i = 0; i < this.productArr.length; i++) {
        grandTotalProduct +=
          this.productArr[i].price * this.productArr[i].quantity;
      }
    }
    this.grandTotal = grandTotalProduct;
  },

  addCart(productId) {
    //Add the product
    let quantity;
    const selectProduct = products.find((product) => product.id === productId);
    const existingProduct = this.productArr?.find(
      (product) => product?.id === productId
    );

    if (existingProduct && selectProduct) {
      quantity = existingProduct?.quantity + 1;
    } else {
      quantity = 1;
      selectProduct;
    }

    const cartItem = {
      id: selectProduct.id,
      name: selectProduct.name,
      image: selectProduct.image,
      price: selectProduct.price,
      quantity: quantity,
    };

    if (existingProduct) {
      existingProduct.quantity = quantity;
      existingProduct.total = selectProduct.price * quantity;
    } else {
      this.productArr.push(cartItem);
    }

    this.totalCart();
    this.displayCart();
  },

  incrementCart(itemId) {
    // increment product quantity
    const index = this.productArr.findIndex((item) => item.id === itemId);
    this.productArr[index].quantity++;
    this.totalCart();
    this.displayCart();
  },

  decrementCart(itemId) {
    // decrement product quantity
    const index = this.productArr.findIndex((item) => item.id === itemId);
    if (this.productArr[index]?.quantity > 1) {
      this.productArr[index].quantity--;
    } else {
      this.removeCart(itemId);
    }
    this.totalCart();
    this.displayCart();
  },

  removeCart(itemId) {
    //remove the cart
    const index = this.productArr.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      this.productArr.splice(index, 1);
    }

    this.grandTotalFUnc();
  },

  clearCart() {
    // clear the cart data
    this.productArr = [];
    this.grandTotal = 0;
    this.totalCart();
    this.displayCart();
  },
};

export default cart;
