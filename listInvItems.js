
function getInvItems() {
  let params = new URLSearchParams(location.search);
  const invId = params.get('id');
  const url = `https://inventura.flexibee.eu/v2/c/firma3/inventura-polozka/%28inventura%20%3D%20%27${invId}%27%29?detail=full`
  const response = fetch(url, {
    headers: {
      'accept': 'application/json',
      'Authorization': 'Basic YWRtaW4zOmFkbWluM2FkbWluMw=='
    },
  });

  console.log(response);
}

/* 
curl -X 'GET' \
  'https://inventura.flexibee.eu/v2/c/firma3/inventura-polozka/%28inventura%20%3D%20%2781%27%29?detail=full' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic YWRtaW4zOmFkbWluM2FkbWluMw==' 
*/