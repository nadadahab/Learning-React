import React, { Component } from "react";

class Product extends Component {
  constructor(props) {   
    super(props);
   }

  render() {
    const { products } = this.props.products;

    if (!products.length || !this.props.match.params.id) {
      return <div>Loading...</div>;
    }
    const product = products.find(p => p.id == this.props.match.params.id);
    return product ? (
      <div>
        <h1>{product.title}</h1>
        <p>{product.quantity}</p>
      </div>
    ) : (
      <div>Product doesn't exist</div>
    );
  }
}
export default Product;
