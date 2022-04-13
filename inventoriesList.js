async function getInventories ( ) {
    
    let url = `https://inventura.flexibee.eu/v2/c/firma3/inventura/?detail=full&limit=1000`
    const response = await fetch ( url, {
        method: 'GET',
        headers: {
            'accept':'application/json',
            'Authorization':'Basic YWRtaW4zOmFkbWluM2FkbWluMw=='
        }
    } );

    if ( ! response.ok ) {
        alert ( "No Inventories created" );
        return;
    }

    let inventories = [];

    const objJSON = await response.json();
    const inventoriesJSON = objJSON.winstrom.inventura;

    for (const iv of inventoriesJSON)
        inventories.push(iv);

    return inventories;
}
