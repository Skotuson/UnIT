
window.onload = async function () {

  const warehouses = await getWarehouses();

  //set options to select
  const warehouseSelect = document.querySelector("#warehouse_select");
  for (warehouse of warehouses) {
    warehouseSelect.innerHTML += `<option value="${warehouse.id}">${warehouse.nazev}</option>`;
  }
};

document.querySelector("#warehouse_select_form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const warehouseId = document.querySelector("#warehouse_select").value;
  newInventory(warehouseId);
});