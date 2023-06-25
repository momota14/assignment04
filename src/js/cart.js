const cart = {
  productArr: [],
  grandTotal: 0,

  grandTotalFUnc() {
    const grandTotalEl = document.getElementById("total");
    if (cart.grandTotal > 0) {
      grandTotalEl.innerHTML = `
        <h6 class="d-flex justify-content-between border-top border-light-subtle pt-2 mt-2 text-secondary  ">
          <div>SUBTOTAL</div>
          <div>${cart.grandTotal.toFixed(2)}</div>
        </h6>
      `;
    } else {
      grandTotalEl.innerHTML = "";
    }
  },

  addCart(product, quantity, existingProduct) {
    //Add the product
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: quantity,
      total: product.price * quantity,
    };

    if (existingProduct) {
      existingProduct.quantity = quantity;
      existingProduct.total = product.price * quantity;
    } else {
      this.productArr.push(cartItem);
    }
  },

  removeCart(itemId) {
    //

    const index = this.productArr.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      const item = this.productArr[index];
      this.grandTotalItem -= item.total;
      this.productArr.splice(index, 1);
    }

    this.grandTotalFUnc();
  },
};

export default cart;
