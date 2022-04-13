async function getWarehouses ( ) {
    
    let url = `https://inventura.flexibee.eu/v2/c/firma3/sklad?detail=full`
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

    let warehouses = [];

    const objJSON = await response.json();
    const warehousesJSON = objJSON.winstrom.sklad;

    for (const wh of warehousesJSON)
        warehouses.push(wh);

    return warehouses;
}
