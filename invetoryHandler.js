
document.querySelector('#ean_code').value = "";

document.querySelector("#ean_form").addEventListener('submit', async (e) => {
  e.preventDefault();
  const eanCode = document.querySelector('#ean_code').value;
  getItem(eanCode);
  document.querySelector('#ean_code').value = '';
  //getInvItems();
});

window.onload = ( async (e) =>{
  e.preventDefault();
  const whs = await getWarehouses();
  let params = new URLSearchParams(location.search);
  let warehouseID = params.get("warehouse");
  for ( let wh of whs ) {
    if ( wh.id == warehouseID )
      document.querySelector("#warehouse_name").innerHTML = wh.nazev;
  }
} )