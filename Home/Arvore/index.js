function addNode() {
  let value = parseInt(document.getElementById("value").value);
  let root = document.getElementById("root");
  let newNode = document.createElement("div");
  newNode.classList.add("node");
  newNode.innerText = value;

  if (value < parseInt(root.innerText)) {
    if (root.previousElementSibling == null) {
      root.insertAdjacentElement("beforebegin", newNode);
    } else {
      root.previousElementSibling.insertAdjacentElement("afterend", newNode);
    }
  } else {
    if (root.nextElementSibling == null) {
      root.insertAdjacentElement("afterend", newNode);
    } else {
      root.nextElementSibling.insertAdjacentElement("beforebegin", newNode);
    }
  }
  
  document.getElementById("value").value = "";
}
