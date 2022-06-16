const form = document.querySelector(".form");
const emailTest = /\S+@\S+\.\S+/;
// /[0-9]\d{2} [0-9]\d{2} [0-9]\d{2} [0-9]\d{1}/;
// /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i  colocar o .br também

const nome = document.querySelector("#name");
const tel = document.querySelector("#tel");
const assunto = document.querySelector("#assunto");
const mensagem = document.querySelector("#mensagem");
const email = document.querySelector("#email");
const spanSuccessSend = document.querySelector(".successSend");

const resetInputs = () => {
  nome.value = "";
  tel.value = "";
  assunto.value = "";
  mensagem.value = "";
  email.value = "";
};

const addLoad = () => {
  document.querySelector(
    "button"
  ).innerHTML = `<img src="./loading.png" alt="loadingImage" class="loadingImage">
`;
};

const removeLoad = () => {
  document.querySelector("button").innerHTML = `ENVIAR`;
};

const sendEmail = (event) => {
  event.preventDefault();

  if (
    nome.value != "" &&
    tel.value != "" &&
    email.value != "" &&
    emailTest.test(email.value) &&
    assunto.value != "" &&
    mensagem.value != ""
  ) {
    addLoad();
    console.log("AAA");
    fetch("https://formsubmit.co/ajax/0aac663876cb51230a8aaebd3ca89920", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nome: nome.value,
        telefone: tel.value,
        email: email.value,
        assunto: assunto.value,
        mensagem: mensagem.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(removeLoad)
      .then(resetInputs)
      .then(() => {
        spanSuccessSend.classList.add("valid");
        setTimeout(() => {
          spanSuccessSend.classList.remove("valid");
        }, 5000);
      })
      .catch((error) => console.log(error));
  }

  if (nome.value == "") {
    nome.classList.add("invalid");
    nome.nextElementSibling.classList.add("active");
  }
  if (tel.value == "") {
    tel.classList.add("invalid");
    tel.nextElementSibling.classList.add("active");
  }
  if (email.value == "") {
    email.classList.add("invalid");
    email.nextElementSibling.classList.add("active");
  }
  if (!emailTest.test(email.value) && email.value != "") {
    email.classList.add("invalid");
    email.nextElementSibling.classList.add("active");
    email.nextElementSibling.innerHTML = "E-mail inválido";
  }
  if (assunto.value == "") {
    assunto.classList.add("invalid");
    assunto.nextElementSibling.classList.add("active");
  }
  if (mensagem.value == "") {
    console.log("Vazio");
    mensagem.classList.add("invalid");
    mensagem.nextElementSibling.classList.add("active");
  }

  if (nome.value != "") {
    nome.classList.remove("invalid");
    nome.nextElementSibling.classList.remove("active");
  }
  if (tel.value != "") {
    tel.classList.remove("invalid");
    tel.nextElementSibling.classList.remove("active");
  }
  if (email.value != "" && emailTest.test(email.value)) {
    email.classList.remove("invalid");
    email.nextElementSibling.classList.remove("active");
  }
  if (assunto.value != "") {
    assunto.classList.remove("invalid");
    assunto.nextElementSibling.classList.remove("active");
  }
  if (mensagem.value != "") {
    console.log("Tem coisa");
    mensagem.classList.remove("invalid");
    mensagem.nextElementSibling.classList.remove("active");
  }
};

document.querySelector(".form").addEventListener("submit", sendEmail);
// action="https://formsubmit.co/0aac663876cb51230a8aaebd3ca89920" method="post"
