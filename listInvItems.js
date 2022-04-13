
async function updateCount(idInInv) {
  const inpt = document.querySelector(`#id_${idInInv}`);

  const newCount = inpt.value;
  const oldCount = inpt.dataset.countBefore;

  const url = `https://inventura.flexibee.eu/v2/c/firma3/inventura-polozka/${idInInv}`;

  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'Authorization': 'Basic YWRtaW4zOmFkbWluM2FkbWluMw=='
    },
  });

  if (!response.ok) {
    alert("couldnt find item");
    return;
  }
  const respObj = await response.json();
  const itemToUpdate = await respObj.winstrom["inventura-polozka"][0];
  let idPricing = itemToUpdate['cenik@ref'].match(/([^\/]+$)/)[0];
  let params = new URLSearchParams(location.search);
  addToInventory(itemToUpdate['inventura'], params.get('warehouse'), idPricing, itemToUpdate["skladKarta"], itemToUpdate["mnozMjReal"] + (newCount - oldCount), idInInv);
}

async function getInvItems() {
  let params = new URLSearchParams(location.search);
  const invId = params.get('id');
  const url = `https://inventura.flexibee.eu/v2/c/firma3/inventura-polozka/%28inventura%20%3D%20%27${invId}%27%29?detail=full&limit=1000`
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'Authorization': 'Basic YWRtaW4zOmFkbWluM2FkbWluMw=='
    },
  });

  if (!response.ok) {
    alert("cant load items");
    return;
  }


  const respObj = await response.json();
  const items = await respObj.winstrom["inventura-polozka"];
  if (items.length == 0) {
    return;
  }
  const itemsTable = document.querySelector('#item_table');
  document.querySelector("#tableBody").innerHTML = "";
  for (itm of items) {
    document.querySelector("#tableBody").innerHTML += "<tr>"
    const itemName = itm['cenik@showAs'];
    const count = itm['mnozMjReal'];
    const id = itm["id"];

    document.querySelector("#tableBody").innerHTML += `<td>${itemName}</td><td><input type="number" style="width: 50px;" id="id_${id}" value=${count} data-count-before="${count}"></td><td><button type="button" class="btn btn-primary" onclick="updateCount(${id})">Uložit</button</td>`

    document.querySelector("#tableBody").innerHTML += "</tr>";
  }
}

window.onload = async function () {
  getInvItems();
  const whs = await getWarehouses();
  let params = new URLSearchParams(location.search);
  let warehouseID = params.get("warehouse");
  for ( let wh of whs ) {
    if ( wh.id == warehouseID )
      document.querySelector("#warehouse_name").innerHTML = wh.nazev;
  }
}
