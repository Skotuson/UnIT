
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
  //itemsTable.innerHTML = "";
  document.querySelector("#tableBody").innerHTML = "";
  for (itm of items) {
    /* console.log(itm['cenik@showAs']);
    console.log(itm['mnozMjReal']); */
    document.querySelector("#tableBody").innerHTML += "<tr>"
    const itemName = itm['cenik@showAs'];
    const count = itm['mnozMjReal'];

    document.querySelector("#tableBody").innerHTML += `<td>${itemName}</td><td>${count}</td><td>X</td>`

    document.querySelector("#tableBody").innerHTML += "</tr>";
  }
}

window.onload = async function () {
  getInvItems();
}

/* 
curl -X 'GET' \
  'https://inventura.flexibee.eu/v2/c/firma3/inventura-polozka/%28inventura%20%3D%20%2781%27%29?detail=full' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic YWRtaW4zOmFkbWluM2FkbWluMw==' 
*/