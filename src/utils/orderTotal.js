exports.orderTotal = (cart) => {
  if (cart) {
    const total = cart.reduce(
      (acc, productoActual) =>
        (acc += productoActual.price * productoActual.qty),
      0
    );

    return total;
  }
  return 0;
};
