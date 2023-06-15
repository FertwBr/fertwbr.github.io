var valorFil = []; 
var valorTam; 

function adicionarTamanho() {
  valorTam = Number(document.getElementById("valorTamanho").value); 
  if (valorTam > 10) { 
    valorTam = 10; 
  } else if (valorTam < 1) {
    valorTam = 1;
  }
  definirTamanhoFila(); 
}

function adicionarElemento() {
  let valorElemento = prompt("Insira um valor para adicionar à fila:");
  let valorNumero = Number(valorElemento);
  colocarFila(valorNumero);
}

function colocarFila(filaElements){
  if(valorFil.length < valorTam){
    valorFil.push(filaElements);
      definirTamanhoFila()
  }else if(valorFil.length >= valorTam){
  }
}

function definirTamanhoFila(){
  let pegarElementos = document.getElementById("fila");
  pegarElementos.innerHTML = "";
  for(let i = valorFil.length-1; i >= 0; i--){
    pegarElementos.innerHTML += "<td>" + valorFil[i] + "</td>";
  }
}

function retirarFila(){
  let removerFila = valorFil.shift();
  definirTamanhoFila()
  return removerFila;
}

