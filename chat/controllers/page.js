const Room = require("../schema/room");
const Chat = require("../schema/chat");
const { removeRoom: removeRoomService } = require("../services");

exports.renderMain = async (req, res, next) => {
  try {
    // 전체 채팅방 목록 추출
    const rooms = await Room.find({});

    res.render("main", { rooms: rooms });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.createRoom = async (req, res, next) => {
  console.log("req", req.body);
  try {
    const newRoom = await Room.create({
      title: req.body.title,
      max: req.body.max,
      password: req.body.password,
      owner: req.session.color,
    });

    // 새로 생성된 방 정보를 접속된 모든 클라이언트에 알림
    const io = req.app.get("io");
    io.of("/room").emit("newRoom", newRoom);

    // 방을 개설한 owner 바로 방으로 입장
    if (req.body.password) {
      res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
    } else {
      res.redirect(`/room/${newRoom._id}`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.enterRoom = async (req, res, next) => {
  try {
    // id와 일치하는 방 찾기
    const room = await Room.findOne({ _id: req.params.id });
    if (!room) {
      return res.redirect("./?error=존재하지 않는 방입니다.");
    }

    // 비밀번호 확인
    if (room.password && room.password != req.query.password) {
      return res.redirect("./?error=비밀번호가 틀렸습니다.");
    }

    const io = req.app.get("io");
    // chat과 연결된 room socket
    const { rooms } = io.of("/chat").adapter;

    // 인원 확인
    if (room.max <= rooms.get(req.params.id)?.size) {
      return res.redirect("./?error=허용 인원을 초과했습니다.");
    }

    res.render("chat", {
      room: room,
      title: room.title,
      chats: [],
      user: req.session.color,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.removeRoom = async (req, res, next) => {
  try {
    await removeRoomService(req.params._id);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.sendChat = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.sendImg = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
