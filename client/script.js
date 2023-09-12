import bot from "./assets/hai.png";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexaString = randomNumber.toString(16);

  return `id-${timestamp}-${hexaString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return `
      <div class = "wrapper ${isAi && "ai"}">
        <div class = "chat">
          <div class = "profile">
            <img
              src = "${
                isAi ? "/assets/icons8-ai-100.png" : "/assets/icons8-male-user-96.png"
              }"
            />
          </div>
          <div class = "message" id=${uniqueId}>${value}</div>
        </div>
      </div>
    `;
}

const handleSubmit = async (e) => {
  //to prevent reloading of the form on submission
  e.preventDefault();

  const data = new FormData(form);

  //user's chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
  form.reset();

  //bot's chatstripe
  const uniqueId = generateUniqueId();

  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  //put the new message in view
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  console.log(data.get("prompt").toLowerCase())
  console.log(data.get("prompt"))

  if (data.get("prompt").toLowerCase().match("set calendar date")) {
    console.log("setting entry")
    clearInterval(loadInterval);
    typeText(messageDiv, "weehehheehe");

  } else {
      // fetch data from server -> bot's response

    const response = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data.get("prompt"),
      }),
    });

    clearInterval(loadInterval);
    messageDiv.innerHTML = " ";

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.content;
      console.log(data.bot);

      typeText(messageDiv, parsedData);
    } else {
      const err = await response.text();

      messageDiv.innerHTML = "Something Went Wrong";

      alert(err);
    }
  }


};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
