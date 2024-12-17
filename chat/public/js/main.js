// 소켓을 통해 넘어오는 새 방 정보 출력
socket.on("newRoom", (data) => {
  console.log(data);
});
