// var axios = require("axios");

// 전체 User 조회
const getUsers = async () => {
  try {
    const response = await axios.get("/users");
    console.log(response.data);
    const users = response.data;

    let result = "";
    users.forEach((user) => {
      result += `<tr>`;
      result += `<td>${user._id}</td>`;
      result += `<td>${user.name}</td>`;
      result += `<td>${user.age}</td>`;
      result += `<td>${user.married ? "기혼" : "미혼"}</td>`;
      result += `</tr>`;
    });
    document.querySelector("#user-list tbody").innerHTML = result;
  } catch (error) {
    console.log(error);
  }
};

// 등록 버튼을 누르면(submit)
document.querySelector("#user-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // 폼 안에 작성한 내용 가져오기
  const form = e.target;
  const name = form.name.value;
  const age = form.age.value;
  const married = form.married.checked;

  if (!name) {
    alert("이름을 확인해주세요.");
    return;
  }
  if (!age) {
    return alert("나이를 확인해주세요.");
  }

  try {
    // 라우터 경로
    await axios.post("/users", { name, age, married });
    // 전체 User 조회 함수
    getUsers();
  } catch (error) {
    console.log(error);
  }

  // 폼 화면 clear
  form.name.value = "";
  form.age.value = "";
  form.married.checked = false;
});

// 특정 사용자의 전체 comments
const getComments = async (id) => {
  try {
    const response = await axios.get(`/users/${id}/comments`);
    console.log(response.data);
    const comments = response.data;

    let result = "";
    comments.forEach((comment) => {
      result += `<tr data-commid=${comment._id} data-pid=${id}>`;
      result += `<td>${comment._id}</td>`;
      result += `<td>${comment.commenter.name}</td>`;
      result += `<td>${comment.comment}</td>`;
      result += `<td><button type='button' class='btn btn-success'>수정</button></td>`;
      result += `<td><button type='button' class='btn btn-danger'>삭제</button></td>`;
      result += `</tr>`;
    });
    document.querySelector("#comment-list tbody").innerHTML = result;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 등록을 누르면(submit)
document.querySelector("#comment-form").addEventListener("submit", async (e) => {
  // submit 기능중지, 아이디, 내용 들어왔는지 확인
  e.preventDefault();

  // 폼 안에 작성한 내용 가져오기
  const form = e.target;
  const userid = form.userid.value;
  const comment = form.comment.value;

  if (!userid) {
    alert("아이디 확인해주세요.");
    return;
  }
  if (!comment) {
    return alert("댓글을 확인해주세요.");
  }

  try {
    // 라우터 경로
    await axios.post("/comments", { userid, comment });
    // 댓글 작성자의 전체 comments 조회 함수
    getComments(userid);
  } catch (error) {
    console.log(error);
  }

  // 폼 화면 clear
  form.userid.value = "";
  form.comment.value = "";
});

// 이름 클릭 시 해당 이름이 작성한 전체 댓글 가져오기
document.querySelector("#user-list").addEventListener("click", (e) => {
  e.preventDefault();

  // id가져오기
  const id = e.target.getAttribute("href");
  getComments(id);
});

// 댓글 수정, 삭제
document.querySelector("#comment-list").addEventListener("click", async (e) => {
  // 이벤트 대상 가져오기
  const eTarget = e.target;

  // comment id 가져오기
  const commId = eTarget.closest("tr").dataset.commid;
  // user id 가져오기
  const userId = eTarget.closest("tr").dataset.pid;

  // 수정, 삭제에서 왔는지 구분
  if (eTarget.textContent === "수정") {
    // 수정 할 comment 입력받을 수 있는 prompt 보여주기
    const newComment = prompt("변경할 내용을 입력해주세요.");
    if (!newComment) {
      return alert("변경할 내용을 반드시 입력해야합니다.");
    }
    try {
      await axios.put(`/comments/${commId}`, { comment: newComment });
      getComments(userId);
    } catch (error) {
      console.log(error);
    }
  } else {
    // 삭제 시 comment id 필요
    try {
      await axios.delete(`/comments/${commId}`);
      // 전체 댓글 다시 가져오기
      getComments(userId);
    } catch (error) {
      console.log(error);
    }
  }
});
