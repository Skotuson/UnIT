
const BILLING_RANGE  = "2022";

let ean           = 10001;

async function getItem ( ean ) {
    let params = new URLSearchParams(location.search);
    let inventoryID = params.get('id');
    let warehouse = localStorage.getItem("inventory" + inventoryID);

    let url = `https://inventura.flexibee.eu/v2/c/firma3/skladova-karta/%28sklad%20%3D%20%22${warehouse}%22%20and%20ucetObdobi%20%3D%20%22code%3A${BILLING_RANGE}%22%20and%20cenik%3D%22ean%3A${ean}%22%29?detail=custom:cenik(nazev,kod,eanKod)&includes=/skladova-karta/cenik`;
    const response = await fetch ( url, {
        method: 'GET',
        headers: {
            'accept':'application/json',
            'Authorization':'Basic YWRtaW4zOmFkbWluM2FkbWluMw=='
        }
    } );

    if ( ! response.ok ) {
        alert ( "No EAN" );
        return;
    }

    const objJSON = await response.json();

    //localStorage.setItem("skladovaKartaID", objJSON.winstrom['skladova-karta'][0].id)
    localStorage.setItem("cenikID", objJSON.winstrom['skladova-karta'][0].cenik[0].id)
    console.log(objJSON.winstrom['skladova-karta'][0].cenik[0].nazev)

    addToInventory( inventoryID, warehouse, 
        objJSON.winstrom['skladova-karta'][0].cenik[0].id,
        objJSON.winstrom['skladova-karta'][0].cenik[0].id, 1 );
}

async function addToInventory ( inventoryID, warehouse, pricing, wareCard, count ) {
  
    let url = `https://inventura.flexibee.eu/v2/c/firma3/inventura-polozka`

    const response = await fetch ( url, {
        method: 'POST',
        headers: {
            'accept':'application/json',
            'Authorization':'Basic YWRtaW4zOmFkbWluM2FkbWluMw==',
            'Content-Type':'application/json'
        },

        body: JSON.stringify ({
            "winstrom": {
              "inventura-polozka": [
                {
                  "inventura": inventoryID,
                  "sklad": warehouse,
                  "cenik": pricing,
                  "skladKarta": wareCard,
                  "mnozMjReal": count
                }
              ]
            }
          })
    } );

    if ( ! response.ok ) {
        alert ( "No EAN" );
        return;
    }

    let objJSON = await response.json();

    if ( ! objJSON.winstrom.stats.created ) {
        alert ( "Created je 0!" );
        return
    }

    
}

getItem(ean);