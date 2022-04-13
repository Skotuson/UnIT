
document.querySelector("#login").addEventListener("submit", e => {
  e.preventDefault();
  const usr = document.querySelector("login_name").value;
  const pass = document.querySelector("login_pswd").value;

  localStorage.setItem("basicAuth", base64.encode(`${usr}:${pass}`));

  window.location.replace("/index.html");
});