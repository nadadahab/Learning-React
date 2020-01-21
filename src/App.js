import React, { Component } from 'react';
import './App.css';
import Todo from './components/todo'
import Product from './components/product'
import Cart from './components/cart'
import data from './components/data/data.json'; 
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


class App extends Component {

  constructor(props) {   
     super(props);
     this.state = data;
     this.onToCartHandle = this.onToCartHandle.bind(this);
  }

  onToCartHandle(){
    let id = arguments[0];
    this.state.products.map(item => { 
        const check = this.state.cart_products.some(e => e.id === id);

        console.log(check)
        if (item.id === id) {
            if(check == false){
                var cart_products = this.state.cart_products.concat({  id: item.id,title: item.title,quantity:item.quantity  })
                this.setState({    
                    cart_products: cart_products , count:cart_products.length
                });
            }
        }
    });
  }

  render() {
    return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart  -------{this.state.count}</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/cart" render={props => <Cart {...props} products={this.state}/>} />
          <Route exact path="/" render={props => <Todo {...props} products={this.state} onToCartHandle={this.onToCartHandle}/>} />
          <Route exact path="/products/:id" render={props => <Product {...props} products={this.state}/>} />
        </Switch>

        </div>
    </Router>
    );
  }
}

export default App;
