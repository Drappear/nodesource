// 입, 퇴장 정보 받기
socket.on("join", (data) => {
  console.log(data);

  const joinMember = document.querySelector(".chat-list");

  let result = `<span class="text-primary d-inline-block">${data.chat}</span>`;
  joinMember.insertAdjacentHTML("beforeend", result);
});
socket.on("exit", (data) => {
  console.log(data);

  const joinMember = document.querySelector(".chat-list");

  let result = `<span class="text-danger d-inline-block">${data.chat}</span>`;
  joinMember.insertAdjacentHTML("beforeend", result);
});
