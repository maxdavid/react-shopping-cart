import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import { ProductContext, CartContext } from './contexts';

// Hooks
import { useLocalStorage } from './hooks';

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useLocalStorage('shoppingCart', []);

  const addItem = item => {
    setCart([...cart, item]);
  };

  const removeItemById = id => {
    setCart([...cart.filter(cartItem => id !== cartItem.id)]);
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItemById }}>
        <div className='App'>
          <Navigation cart={cart} />

          {/* Routes */}
          {/* <Route
          exact
          path='/'
          render={() => <Products products={products} addItem={addItem} />}
				/> */}
          <Route exact path='/' component={Products} />

          <Route path='/cart' render={() => <ShoppingCart cart={cart} />} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
