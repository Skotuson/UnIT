
window.onload = async function () {

  /*  if (!localStorage.getItem("basicAuth")) {
     window.location.replace("/login");
   } */

  const warehouses = await getWarehouses();

  //set options to select
  const warehouseSelect = document.querySelector("#warehouse_select");
  for (warehouse of warehouses) {
    warehouseSelect.innerHTML += `<option value="${warehouse.id}">${warehouse.nazev}</option>`;
  }

  document.querySelector("#warehouse_select_update").innerHTML = warehouseSelect.innerHTML;
};

document.querySelector("#warehouse_select_form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const warehouseId = document.querySelector("#warehouse_select").value;
  newInventory(warehouseId);
});


document.querySelector("#warehouse_select_form_update").addEventListener("submit", async (e) => {
  e.preventDefault();
  const warehouseId = document.querySelector("#warehouse_select_update").value;
  const invetories = getInventories(warehouseId);
  $("#warehouse_update").modal('hide');
  await sleep(1000);
  $('#warhouse_update2').modal();
});