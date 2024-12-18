// Socket.IO 이용
// socket.io 모듈 불러오기
const SocketIO = require("socket.io");
const { removeRoom } = require("./services");

module.exports = (server, app, sessionMiddleWare) => {
  // express 서버와 socket.io 연동
  const io = SocketIO(server, { path: "/socket.io" });
  app.set("io", io);

  // 네임스페이스 부여 : 같은 네임스페이스 끼리만 데이터 교환
  const room = io.of("/room");
  const chat = io.of("/chat");

  // 소켓과 세션 미들웨어 연결
  const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);
  chat.use(wrap(sessionMiddleWare));

  // event listener 추가
  room.on("connection", (socket) => {
    console.log("room 네임스페이스 접속");
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 접속 해제");
    });
  });

  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스 접속");
    // 소켓을 통해 클라이언트 요청 객체 접근

    // 클라이언트 ip 알아내기
    // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    // console.log("새로운 클라이언트 접속 ", ip, socket.id, req.ip);

    // 클라이언트로부터 메세지 도착시 발생
    socket.on("join", (message) => {
      socket.join(message);
      socket.to(message).emit("join", {
        user: "system",
        chat: `${socket.request.session.color}님이 입장하셨습니다.`,
      });
    });

    // 클라이언트와 연결이 종료된 경우s
    socket.on("disconnect", async () => {
      console.log("chat 네임스페이스 접속 해제 ");

      const { referer } = socket.request.headers;
      const roomId = new URL(referer).pathname.split("/").at(-1);

      // disconnect가 일어난 방 아이디
      const currentRoom = chat.adapter.rooms.get(roomId);
      // 방 접속자 수
      const userCount = currentRoom?.size || 0;

      if (userCount == 0) {
        await removeRoom(roomId);
        // 삭제된 방 정보
        room.emit("removeRoom", roomId);
      } else {
        // 퇴장 메세지
        socket.to(roomId).emit("exit", {
          user: "system",
          chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
  });
};
