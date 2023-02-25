export let validator = {
  kiemTraRong: (string, idErr, message) => {
    let value = string.trim();
    if (value.length > 0) {
      document.getElementById(idErr).innerText = "";
      return true;
    }
    document.getElementById(idErr).innerText = message;
    document.getElementById(idErr).style.color = "red";
    return false;
  },
  kiemTraTatCaCacKiTu: (value, selectorError, name) => {
    let regexLetter = /^[A-Z a-z]+$/; // Nhập các kí tự a->z A->Z hoặc khoảng trống không bao gồm unicode
    if (regexLetter.test(value)) {
      // test nếu ok
      document.querySelector(selectorError).innerHTML = "";
      return true;
    }
    document.querySelector(selectorError).innerHTML =
      name + " phải là chữ cái! ";
    document.querySelector(selectorError).style.color = "red";
    return false;
  },
  kiemTraSo: (value, selectorError, name) => {
    let regexNumber = /^[0-9]*\.?[0-9]*$/;
    if (regexNumber.test(value)) {
      document.querySelector(selectorError).innerHTML = "";
      return true;
    }
    document.querySelector(selectorError).innerHTML = name + " tất cả là số";
    document.querySelector(selectorError).style.color = "red";

    return false;
  },
  kiemTraUrl: (string, selectorError, name) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res !== null) {
      document.querySelector(selectorError).innerHTML = "";
      return true;
    }
    document.querySelector(selectorError).innerHTML =
      name + " phải là link url";
    document.querySelector(selectorError).style.color = "red";
    return false;
  },
};
