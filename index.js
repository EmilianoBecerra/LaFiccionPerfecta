const btnTemaOscuro = document.getElementById("temaClaro");
const btnTemaClaro = document.getElementById("temaOscuro");
const btnInnerHTML = document.getElementById("btn-innerHTML");
const btnInnerText = document.getElementById("btn-innerText");
const textoAModificar = document.getElementById("textoModificar");

document.addEventListener("click", (e) => {
  if (e.target == btnTemaClaro || e.target == btnTemaOscuro) {
    btnTemaClaro.classList.toggle("mostrar");
    btnTemaOscuro.classList.toggle("mostrar");
  }
  if (btnTemaOscuro.classList.contains("mostrar")) {
    document.body.classList.replace("claro", "oscuro");
  } else {
    document.body.classList.replace("oscuro", "claro");
  }
});

btnInnerHTML.addEventListener("click", ()=> {
  textoAModificar.innerHTML = "<h4>Texto modificado con innerHTML!</h4>"
})

btnInnerText.addEventListener("click", ()=> {
  textoAModificar.innerText = "Texto modificado con innerText!"
})
