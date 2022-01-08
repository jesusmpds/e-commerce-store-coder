// --------------------Filters event handlers ---------------------------------------------------------------//
const filterContainer = document.getElementById("filters");

const eventHandler = (event) => {
  if (event.target.id === "filterByNameBtn") {
    const inputValue = event.target.previousElementSibling.value;

    window.location.href = `/productos/name/${inputValue}`;
  }

  if (event.target.id === "filterByCodeBtn") {
    const inputValue = event.target.previousElementSibling.value;

    window.location.href = `/productos/code/${inputValue}`;
  }

  if (event.target.id === "filterByPriceBtn") {
    const inputMaxValue = event.target.previousElementSibling.value;
    let inputMinValue =
      event.target.previousElementSibling.previousElementSibling.value;
    inputMinValue === "" ? (inputMinValue = 0) : null;
    window.location.href = `/productos/price?min=${inputMinValue}&max=${inputMaxValue}`;
  }

  if (event.target.id === "filterByStockBtn") {
    const inputMaxValue = event.target.previousElementSibling.value;
    let inputMinValue =
      event.target.previousElementSibling.previousElementSibling.value;
    inputMinValue === "" ? (inputMinValue = 0) : null;
    window.location.href = `/productos/stock?min=${inputMinValue}&max=${inputMaxValue}`;
  }
};
filterContainer.addEventListener("click", eventHandler);
