
document.querySelector('#ean_code').value = "";

document.querySelector("#ean_form").addEventListener('submit', async (e) => {
  e.preventDefault();
  const eanCode = document.querySelector('#ean_code').value;
  getItem(eanCode);
  document.querySelector('#ean_code').value = '';
});
