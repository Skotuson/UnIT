
const BILLING_RANGE = "2022";

let ean = 10007;

async function getItem(ean) {

    let params = new URLSearchParams(location.search);
    let inventoryID = params.get('id');
    let warehouse = params.get('warehouse');

    let url = `https://inventura.flexibee.eu/v2/c/firma3/skladova-karta/%28sklad%20%3D%20%22${warehouse}%22%20and%20ucetObdobi%20%3D%20%22code%3A${BILLING_RANGE}%22%20and%20cenik%3D%22ean%3A${ean}%22%29?detail=custom:cenik(nazev,kod,eanKod)&includes=/skladova-karta/cenik`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Basic YWRtaW4zOmFkbWluM2FkbWluMw=='
        }
    });

    if ( ! response.ok ) {
        alert ( "EAN doesn't exist" );

        return;
    }

    const objJSON = await response.json();

    let wareCard = objJSON.winstrom['skladova-karta'][0].id;

    let tuple = await isInInventory(inventoryID, wareCard);
    addToInventory(inventoryID, warehouse,
        objJSON.winstrom['skladova-karta'][0].cenik[0].id,
        wareCard, 1 + tuple.count, tuple.id);
}

async function isInInventory(inventoryID, wareCard) {
    let url = `https://inventura.flexibee.eu/v2/c/firma3/inventura-polozka/%28inventura%20%3D%20%27${inventoryID}%27%20and%20skladKarta%3D%27${wareCard}%27%29?detail=full`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Basic YWRtaW4zOmFkbWluM2FkbWluMw=='
        }
    });

    if ( ! response.ok ) {
        alert ( "Fetch failed!" );
        return;
    }

    const objJSON = await response.json();
    if (objJSON.winstrom['inventura-polozka'].length == 0) {
        return {
            id: -1,
            count: 0
        };
    }
    let id = objJSON.winstrom['inventura-polozka'][0].id;
    let count = objJSON.winstrom['inventura-polozka'][0].mnozMjReal;
    if (id) {
        return {
            id: id,
            count: count
        };
    }

    return {
        id: -1,
        count: 0
    };
}

async function addToInventory(inventoryID, warehouse, pricing,
    wareCard, count, idInInventory) {

      if(count==0){
        deleteFromInventory(idInInventory)
        return;
      }

    let sendJSON = JSON.stringify({
        "winstrom": {
            "inventura-polozka": [
                {
                    "id": idInInventory,
                    "inventura": inventoryID,
                    "sklad": warehouse,
                    "cenik": pricing,
                    "skladKarta": wareCard,
                    "mnozMjReal": count
                }
            ]
        }
    });

    if (idInInventory == -1)
        sendJSON = JSON.stringify({
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

    let url = `https://inventura.flexibee.eu/v2/c/firma3/inventura-polozka`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Basic YWRtaW4zOmFkbWluM2FkbWluMw==',
            'Content-Type': 'application/json'
        },

        body: sendJSON
    });

    if ( ! response.ok ) {
        alert ( "Add has failed!" );

        return;
    }

    let objJSON = await response.json();

    if ((objJSON.winstrom.stats.created + objJSON.winstrom.stats.updated) != 1) {
        alert("Created je 0!");
        return
    }

    getInvItems();

}


async function deleteFromInventory(idInInventory) {


    let url = `https://inventura.flexibee.eu/v2/c/firma3/inventura-polozka/${idInInventory}`

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Basic YWRtaW4zOmFkbWluM2FkbWluMw=='
        }
    });

    if ( ! response.ok ) {
        alert ( "Delete has failed!" );

        return;
    }

    let objJSON = await response.json();

    if ((objJSON.winstrom.stats.deleted) != 1) {
        alert("Deleted je 0!");
        return
    }

    getInvItems();

}

delete