// insert needed imports
import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nebula Fluffernaut",
      species: "Celestial Mammal",
      planet: "Andromeda-7",
      price: 2499,
      quantity: 1,
      logisticsFee: 150,
      image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Quantum Purr-former",
      species: "Phase-Shifting Feline",
      planet: "Nexus Prime",
      price: 1899,
      quantity: 2,
      logisticsFee: 120,
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Stellar Hopster",
      species: "Zero-G Bunny",
      planet: "Luna Station",
      price: 999,
      quantity: 1,
      logisticsFee: 80,
      image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200&h=200&fit=crop"
    }
  ]);

  const updateQuantity = (id:number, newQuantity:number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id:number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  
  const subtotal = cartItems.reduce((sum, item) => sum + ((item.price + item.logisticsFee) * item.quantity), 0);
  // const shipping = 299;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Shopping Cart Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden">
              
              {/* Header */}
              <div className="bg-linear-to-r from-purple-900/50 to-blue-900/50 border-b border-purple-500/30 p-6">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <span className="text-4xl">Intergalactic Cart</span>
                  
                </h1>
                <p className="text-purple-300 mt-2">{cartItems.length} cosmic companions ready for adoption</p>
              </div>

              {/* Column Headers */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-slate-900/50 border-b border-purple-500/10">
                <div className="col-span-4">
                  <h3 className="text-sm font-semibold text-purple-300">Product</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="text-sm font-semibold text-purple-300">Price</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="text-sm font-semibold text-purple-300">Logistics Fee</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="text-sm font-semibold text-purple-300">Quantity</h3>
                </div>
                <div className="col-span-2 text-right">
                  <h3 className="text-sm font-semibold text-purple-300">Total</h3>
                </div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-purple-500/10">
                {cartItems.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4"></div>
                    <h3 className="text-xl text-purple-300 mb-2">Your cart is empty</h3>
                    <p className="text-purple-400/70">Start exploring our cosmic companions!</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-slate-900/30 transition-colors">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        
                        {/* Product Info */}
                        <div className="col-span-1 md:col-span-4 flex gap-4">
                          {/* Image */}
                          <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border-2 border-purple-500/30">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-bold text-white mb-1 truncate">{item.name}</h2>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-purple-400">Species:</span>
                                <span className="text-purple-200">{item.species}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-purple-400">Planet:</span>
                                <span className="text-purple-200">{item.planet}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-purple-400">Logistics:</span>
                                <span className="text-purple-200">{item.planet}</span>
                              </div>
                            </div>
                            {/* Remove button - visible on mobile - REMOVED PER USER */}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-1 md:col-span-2 md:text-center">
                          <div className="md:hidden text-purple-400 text-sm mb-1">Price</div>
                          <div className="text-white font-semibold">
                            {item.price.toLocaleString()} <span className="text-sm text-purple-300">GC</span>
                          </div>
                        </div>

                        {/* Logistics Fee */}
                        <div className="col-span-1 md:col-span-2 md:text-center">
                          <div className="md:hidden text-purple-400 text-sm mb-1">Logistics Fee</div>
                          <div className="text-white font-semibold">
                            {item.logisticsFee.toLocaleString()} <span className="text-sm text-purple-300">GC</span>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-3">
                          <div className="md:hidden text-purple-400 text-sm">Quantity:</div>
                          <div className="flex items-center gap-2 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="btn btn-sm bg-base-100 border-0 hover:bg-purple-600/50 text-white"
                            >
                              -
                            </button>
                            <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="btn btn-sm bg-base-100 border-0 hover:bg-purple-600/50 text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                          <div className="md:hidden text-purple-400 text-sm">Total:</div>
                          <div className="flex items-center gap-3">
                            <div className="text-xl font-bold text-white">
                              {((item.price + item.logisticsFee) * item.quantity).toLocaleString()} <span className="text-sm text-purple-300">GC</span>
                            </div>
                            {/* Remove button - visible on desktop */}
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="hidden md:block btn btn-sm"
                            >
                              X
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Continue Shopping Button */}
            {cartItems.length > 0 && (
              <div className="mt-6">
                <button className="btn btn-outline border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:border-purple-600">
                  <span>Continue Shopping...</span>
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Section - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden sticky top-4">
              
              {/* Summary Header */}
              <div className="bg-linear-to-r from-purple-900/50 to-blue-900/50 border-b border-purple-500/30 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>Order Summary</span>
                </h2>
              </div>

              {/* Summary Details */}
              <div className="p-6 space-y-4">
                
                {/* Subtotal */}
                <div className="flex justify-between items-center pb-3 border-b border-purple-500/10">
                  <span className="text-purple-300">Subtotal</span>
                  <span className="text-white font-semibold">{subtotal.toLocaleString()} GC</span>
                </div>

                {/* Shipping */}
                {/* <div className="flex justify-between items-center pb-3 border-b border-purple-500/10">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300">Hyperspace Shipping</span>
                  </div>
                  <span className="text-white font-semibold">{shipping.toLocaleString()} GC</span>
                </div> */}

                {/* Tax */}
                <div className="flex justify-between items-center pb-4 border-b border-purple-500/10">
                  <span className="text-purple-300">Galactic Tax (8%)</span>
                  <span className="text-white font-semibold">{tax.toFixed(0)} GC</span>
                </div>

                {/* Planet Edit */}
                <div className="flex justify-between items-center pb-4 border-b border-purple-500/10">
                  <span className="text-purple-300">Planet</span>
                  <span className="text-white font-semibold">Edit here</span>
                </div>


                {/* Total */}
                <div className="flex justify-between items-center py-4 bg-linear-to-r from-purple-900/30 to-blue-900/30 rounded-lg px-4 border border-purple-500/20">
                  <span className="text-xl font-bold text-white">Total</span>
                  <span className="text-2xl font-bold text-white">{total.toLocaleString()} GC</span>
                </div>

                {/* Checkout Button */}
                <button className="btn w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 text-white text-lg h-14 mt-6">
                  <span>Proceed to Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}