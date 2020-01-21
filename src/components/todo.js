import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  state = this.props.products;

  onSubmitHandle(event) {
    event.preventDefault();
    let name = event.target.item.value;
    
    var new_products = this.state.products.concat({
      id: Date.now(),
      title: name,
      quantity: 0
    });
    let errors = this.state.errors;
    errors.title = name.length < 5 ? "Name must be 5 characters long!" : "";
        this.setState({
            errors: { title:errors.title  }
        });
    if (name !== "") {
      this.setState({
        products: new_products
      });
    }
    name = "";
  }

  onDeleteHandle() {
    let id = arguments[0];
    this.setState({
      products: this.state.products.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }

  renderEditForm() {
    if (this.state.edit) {
      return (
        <form onSubmit={this.onUpdateHandle.bind(this)}>
          <input
            type="text"
            name="updatedItem"
            className="item"
            defaultValue={this.state.title}
          />
          {this.state.errors.title ? <span>{this.state.errors.title}</span> : ''}
          <br></br>
          <button className="update-add-item">Update</button>
        </form>
      );
    }
  }

  onEditHandle() {
    this.setState({ edit: true, id: arguments[0], title: arguments[1] });
  }

  onUpdateHandle(event) {
    event.preventDefault();
    let updated_name =event.target.updatedItem.value
    let errors = this.state.errors;
    errors.title = updated_name.length < 5 ? "Name must be 5 characters long!" : "";
    this.setState({
        errors: { title:errors.title  }
    });
    if (!this.state.errors.title){
        this.setState({
            products: this.state.products.map(item => {
              if (item.id === this.state.id) {
                item["title"] = event.target.updatedItem.value;
                return item;
              }
              return item;
            })
        });
        this.setState({ edit: false });
    }
    
  }

  onIncrementHandle() {
    let id = arguments[0];
    this.setState({
      products: this.state.products.map(item => {
        if (item.id === id) {
          item["quantity"] = item["quantity"] + 1;
          return item;
        }
        return item;
      })
    });
  }

  onDecrementHandle() {
    let id = arguments[0];
    this.setState({
      products: this.state.products.map(item => {
        if (item.id === id) {
          if (item["quantity"] > 0) {
            item["quantity"] = item["quantity"] - 1;
            return item;
          }
        }
        return item;
      })
    });
  }

  onToCartHandle() {
    let id = arguments[0];
    this.props.onToCartHandle(id);
    this.state.products.map(item => {
      const check = this.state.cart_products.some(e => e.id === id);
      if (item.id === id) {
        if (check == false) {
          var cart_products = this.state.cart_products.concat({
            id: item.id,
            title: item.title,
            quantity: item.quantity
          });
          this.setState({
            cart_products: cart_products,
            count: cart_products.length
          });
        }
      }
    });
  }

  render() {

    return (
      <div>
        {this.state.edit === true ? this.renderEditForm() : ""}
        <form onSubmit={this.onSubmitHandle.bind(this)}>  
        {console.log(this.state.errors.title)}
          <input type="text" name="item" className="item" />
          {<br></br>}
          {this.state.errors.title ? <span>{this.state.errors.title}</span> : ''}
          {<br></br>}
          <button className="btn-add-item">Add</button>
        </form>
        <ol>
          {this.state.products.map(item => (
            <li key={item.id}>
              <Link to={"/products/" + item.id}>
                <div>
                  {item.title}
                  ---------------
                  {item.quantity}
                </div>
              </Link>
              <button onClick={this.onDeleteHandle.bind(this, item.id)}>
                Delete
              </button>
              <button
                onClick={this.onEditHandle.bind(this, item.id, item.title)}
              >
                Edit
              </button>
              <button
                onClick={this.onIncrementHandle.bind(this, item.id, item.title)}
              >
                Increment
              </button>
              <button
                onClick={this.onDecrementHandle.bind(this, item.id, item.title)}
              >
                Decrement
              </button>
              <button
                onClick={this.onToCartHandle.bind(this, item.id, item.title)}
              >
                Add to cart
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Todo;
