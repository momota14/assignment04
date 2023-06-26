import products from "./product.js";

const totalProduct = document.getElementById("totalProduct");
const cartList = document.getElementById("cartList");
const clearList = document.getElementById("clear");
const cart = {
  productArr: [],
  grandTotal: 0,

  totalCart() {
    let totalQuantity = 0;
    let grandTotalProduct = 0;
    if (this.productArr.length > 0) {
      for (var i = 0; i < this.productArr.length; i++) {
        totalQuantity += this.productArr[i].quantity;
        grandTotalProduct += this.productArr[i].total;
      }
      clearList.classList.add("d-flex");
    } else {
      clearList.classList.remove("d-flex");
    }
    this.grandTotal = grandTotalProduct;
    totalProduct.innerHTML = `(${totalQuantity})`;
    this.grandTotalFUnc();
  },

  displayCart() {
    if (this.productArr.length > 0) {
      cartList.innerHTML = "";
      this.productArr.map((product) => {
        return (cartList.innerHTML += `
          <li>
            <div class="d-flex justify-content-between align-items-center">
              <div class="item-left d-flex align-items-center">
                  <img class="w-25" src=${product?.image} alt="" />
                  <div class="item-info">
                      <div class="line-clamp">${product?.name}</div>
                      <div class="productDetails">${product?.quantity} x <span class="text-danger ">$${product?.price}</span></div>
                  </div>
              </div>
              <div class="item-right">
                  <button class="remove-item btn btn-danger  fa-solid fa-trash-can" data-item-id="${product?.id}">
                    
                  </button>
              </div>
          </div>
        </li>
    `);
      });
    } else {
      cartList.innerHTML =
        "<div class='text-center text-secondary'>No products in the cart</div>";
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
  },

  grandTotalFUnc() {
    const grandTotalEl = document.getElementById("total");
    if (this.grandTotal > 0) {
      grandTotalEl.innerHTML = `
        <h6 class="d-flex justify-content-between border-top border-light-subtle pt-2 mt-2 text-secondary  ">
          <div>SUBTOTAL</div>
          <div>${this.grandTotal.toFixed(2)}</div>
        </h6>
      `;
    } else {
      grandTotalEl.innerHTML = "";
    }
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
      total: selectProduct.price * quantity,
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

  removeCart(itemId) {
    //remove the cart

    const index = this.productArr.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      const item = this.productArr[index];
      this.grandTotalItem -= item.total;
      this.productArr.splice(index, 1);
    }

    this.grandTotalFUnc();
  },

  clearCart() {
    this.productArr = [];
    this.grandTotal = 0;
    this.totalCart();
    this.displayCart();
  },
};

export default cart;
