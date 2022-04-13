
async function newInventory ( warehouseID ) {
    let url = `https://inventura.flexibee.eu/v2/c/firma3/inventura/`

    const response = await fetch ( url, {
        method: 'POST',
        headers: {
            'accept':'application/json',
            'Authorization':'Basic YWRtaW4zOmFkbWluM2FkbWluMw==',
            'Content-Type':'application/json'
        },

        body: JSON.stringify({
            "winstrom": {
              "inventura": [
                {
                  "popisInventury": "Popis",
                  "typInventury": "Testovací inventura",
                  "datZahaj": `${new Date().toISOString().slice(0,10)}`,
                  "sklad": `${warehouseID}`,
                  "stavK": "stavInventury.zahajena"
                }
              ]
            }
          })
    } );

    if ( ! response.ok ) {
        alert ("Inventar ne");
        return;
    }

    const objJSON = await response.json(); 

    if ( ! objJSON.winstrom.stats.created ) {
        alert ( "Created je 0!" );
        return
    }
  
    window.location.replace(`/inventory.html?id=${objJSON.winstrom.results[0].id}&warehouse=${warehouseID}`);
}
