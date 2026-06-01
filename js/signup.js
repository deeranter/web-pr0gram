document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  const userid   = document.getElementById("userid");
  const password = document.getElementById("password");
  const username = document.getElementById("username");
  const captcha  = document.getElementById("captcha");

  // 필수 약관 체크박스 (첫 번째, 두 번째)
  const requiredTerms = document.querySelectorAll(".terms input[type='checkbox']");
  const termRequired1 = requiredTerms[0]; // 이용약관
  const termRequired2 = requiredTerms[1]; // 개인정보 처리방침


  /** 에러 메시지 표시 */
  function showError(inputEl, message) {
    clearError(inputEl);
    inputEl.classList.add("input-error");

    const msg = document.createElement("p");
    msg.className = "error-msg";
    msg.textContent = message;
    inputEl.insertAdjacentElement("afterend", msg);
  }

  /** 에러 메시지 제거 */
  function clearError(inputEl) {
    inputEl.classList.remove("input-error");
    const next = inputEl.nextElementSibling;
    if (next && next.classList.contains("error-msg")) next.remove();
  }

  /** 성공 스타일 */
  function showSuccess(inputEl) {
    clearError(inputEl);
    inputEl.classList.add("input-success");
  }

  

  // 아이디: 영문+숫자 조합 4~12자
  userid.addEventListener("input", () => {
    const val = userid.value.trim();
    const regex = /^[a-zA-Z0-9]{4,12}$/;
    if (!val) {
      showError(userid, "아이디를 입력해 주세요.");
    } else if (!regex.test(val)) {
      showError(userid, "영문·숫자 조합 4~12자로 입력해 주세요.");
    } else {
      showSuccess(userid);
    }
  });

  // 비밀번호: 영문+숫자+특수문자 포함 8자 이상
  password.addEventListener("input", () => {
    const val = password.value;
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!val) {
      showError(password, "비밀번호를 입력해 주세요.");
    } else if (!regex.test(val)) {
      showError(password, "영문·숫자·특수문자(!@#$%^&*) 포함 8자 이상이어야 합니다.");
    } else {
      showSuccess(password);
    }
  });

  // 이름: 한글 또는 영문 2자 이상
  username.addEventListener("input", () => {
    const val = username.value.trim();
    const regex = /^[가-힣a-zA-Z]{2,}$/;
    if (!val) {
      showError(username, "이름을 입력해 주세요.");
    } else if (!regex.test(val)) {
      showError(username, "한글 또는 영문 2자 이상으로 입력해 주세요.");
    } else {
      showSuccess(username);
    }
  });

  /* ───────── 폼 제출 ───────── */

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // 아이디
    const useridRegex = /^[a-zA-Z0-9]{4,12}$/;
    if (!userid.value.trim()) {
      showError(userid, "아이디를 입력해 주세요.");
      isValid = false;
    } else if (!useridRegex.test(userid.value.trim())) {
      showError(userid, "영문·숫자 조합 4~12자로 입력해 주세요.");
      isValid = false;
    } else {
      showSuccess(userid);
    }

    // 비밀번호
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!password.value) {
      showError(password, "비밀번호를 입력해 주세요.");
      isValid = false;
    } else if (!passwordRegex.test(password.value)) {
      showError(password, "영문·숫자·특수문자(!@#$%^&*) 포함 8자 이상이어야 합니다.");
      isValid = false;
    } else {
      showSuccess(password);
    }

    // 이름
    const usernameRegex = /^[가-힣a-zA-Z]{2,}$/;
    if (!username.value.trim()) {
      showError(username, "이름을 입력해 주세요.");
      isValid = false;
    } else if (!usernameRegex.test(username.value.trim())) {
      showError(username, "한글 또는 영문 2자 이상으로 입력해 주세요.");
      isValid = false;
    } else {
      showSuccess(username);
    }

    // 필수 약관 동의
    if (!termRequired1.checked || !termRequired2.checked) {
      alert("필수 약관에 동의해 주세요.");
      isValid = false;
    }

    // 캡챠
    if (!captcha.checked) {
      alert("로봇이 아님을 확인해 주세요.");
      isValid = false;
    }

    // 모두 통과
    if (isValid) {
      alert(`${username.value.trim()}님, 회원가입이 완료되었습니다! 🎉`);
      form.reset();
      // 성공 스타일 초기화
      [userid, password, username].forEach(el => el.classList.remove("input-success"));
    }
  });
});
