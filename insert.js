
let ean           = 10001,
    inventory     = 1,
    warehouse     = 4,
    pricing       = 0,
    billingRange  = "2022",
    wareCard      = 0;

async function getItem ( warehouse, billingRange, ean ) {
    let url = `https://inventura.flexibee.eu/v2/c/firma3/skladova-karta/%28sklad%20%3D%20%22${warehouse}%22%20and%20ucetObdobi%20%3D%20%22code%3A${billingRange}%22%20and%20cenik%3D%22ean%3A${ean}%22%29?detail=full`;
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
    return objJSON.winstrom['skladova-karta'][0].id;
}

function addToInventory ( inventory, warehouse, pricing, wareCard, count ) {

}
