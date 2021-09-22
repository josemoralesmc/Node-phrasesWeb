const input = document.getElementById('input');
const CtnMsg = document.getElementById('Ctn-Msg');
const IconMsg = document.getElementById('IconMsg');
const GridCtn = document.getElementById('Grid-ctn');
let img = document.getElementById('img');



function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}
// Funcion para enviar el mensaje
let time = 3000

input.addEventListener("keydown", (e) =>{
   if (e.keyCode == 13) {
       Send();
   }
})

img.addEventListener("click", Send)

function Send () {
  

      function EnviarMensaje() {
         let mensaje = input.value;
         let data = {
            "text": mensaje
         }
         const PostMensaje = fetch("/api", {
            method: "POST",
            headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data)
         }).then((res) => res.json())

      }
      EnviarMensaje();


      /* ----------------------------------------------------------------------------------------------- */

      function ObtenerMensajes() {
         const GetMensajes = fetch("/api", {
            method: "GET",
            headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
            },
         }).then((data) => data.json()).then((res) => {

            for (let i = 0; i <= (res.length - 1); i++) {
               setTimeout(() => {
                  GridCtn.insertAdjacentHTML("beforeend", `<div class="CtnM" style="margin-left:${getRandomInt(1, 95)}%; margin-top:${getRandomInt(1, 95)}%;" >
                <div>${res[i].text}</div> 
            </div>`);
               }, time);
               console.log(res);
               time += 2000;
            }
            CtnMsg.classList.add("Ctn-inputmsgSend");
            IconMsg.classList.toggle("Ctn-iconmsgSend");
            img.classList.toggle("buttonSend");
            input.disabled = true;
         })

      }
      ObtenerMensajes();

   }





IconMsg.addEventListener("click", ClickImgMsg)

//Funcion al apretar en el icono del mensaje para mandar otro

function ClickImgMsg() {
   input.value = ""
   input.disabled = false;
   CtnMsg.classList.replace("Ctn-inputmsgSend", "Ctn-inputmsg");
   IconMsg.classList.replace("Ctn-iconmsgSend", "Ctn-iconmsg");
   input.disabled = false;
   window.location.reload();
}


