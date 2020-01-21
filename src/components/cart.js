import React, { Component } from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

class Cart extends Component {

  constructor(props) {   
    super(props);
  }
  state = this.props.products;

   render() {
     return(
      <div>     
        <ol>       
        {this.state.cart_products.map(item => (  
          <li key={item.id}>     
          <Link to={"/products/" + item.id} >
              <div>
                {item.title}  
                ---------------
                {item.quantity} 
              </div>        
            </Link>
          </li>       
        ))}      
        </ol> 
      </div>   
     )
    }

  }
  export default Cart;
