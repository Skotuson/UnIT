
const BILLING_RANGE  = "2022";

let ean           = 10001,
    inventory     = localStorage.getItem("inventoryID"),
    pricing       = localStorage.getItem("cenikID"),
    wareCard      = localStorage.getItem("skladovaKartaID");

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
    console.log(objJSON.winstrom['skladova-karta']);
    localStorage.setItem("skladovaKartaID", objJSON.winstrom['skladova-karta'][0].id)
    localStorage.setItem("cenikID", objJSON.winstrom['skladova-karta'][0].cenik[0].id)
    console.log(objJSON.winstrom['skladova-karta'][0].cenik[0].nazev)
}

function addToInventory ( inventory, warehouse, pricing, wareCard, count ) {
    
    console.log();
}

getItem(ean);