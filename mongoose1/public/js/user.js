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
      result += `<td>${user.id}</td>`;
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
  form.married.value = "";
});
