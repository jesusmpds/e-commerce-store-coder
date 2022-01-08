exports.cartDTO = (cart) => {
  if (cart) {
    let productsOnCart = cart.products;

    const products = productsOnCart.reduce((acc, productoActual) => {
      const item = acc.find((product) => product._id === productoActual._id);
      if (item) {
        item.qty = item.qty + 1;
      } else {
        productoActual.qty = 1;
        acc.push(productoActual);
      }
      return acc;
    }, []);

    return products;
  }
  return null;
};
