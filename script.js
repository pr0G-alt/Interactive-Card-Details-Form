nameIn.addEventListener("input", function () {
  nameIn.value = nameIn.value
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
});

numIn.addEventListener("input", function () {
  numIn.value = numIn.value.replace(/\s/g, "");
  numIn.value = numIn.value.replace(/(.{4})/g, "$1 ").trim();
});

mmIn.addEventListener("keydown", function (e) {
  if (e.key === " " || e.key === "/" || e.key === "Enter") {
    e.preventDefault();
    yyIn.focus();
  }
});

confirmBtn.addEventListener("click", confirm);

function confirm() {
  let a = charCheck(nameIn, nameDiv);
  if (a) {
    removeError(nameDiv);
    cardName.textContent = nameIn.value;
  } else cardName.textContent = "Jane Appleseed";

  let b = numCheck(numIn, numDiv);
  if (b) {
    removeError(numDiv);
    numIn.value = numIn.value.replace(/\s/g, "");
    numIn.value = numIn.value.padEnd(16, "0");
    numIn.value = numIn.value.replace(/(.{4})/g, "$1 ").trim();
    cardNum.textContent = numIn.value;
  } else cardNum.textContent = "0000 0000 0000 0000";

  let c = numCheck(mmIn, expDiv);
  if (c) {
    mmIn.value = mmIn.value.padStart(2, "0");
    if (monthCheck()) cardMM.textContent = mmIn.value;
  } else cardMM.textContent = "00";

  let d = numCheck(yyIn, expDiv);
  if (d) {
    yyIn.value = yyIn.value.padStart(2, "0");
    cardYY.textContent = yyIn.value;
  } else cardYY.textContent = "00";

  if (c && d && monthCheck()) removeError(expDiv);

  let e = numCheck(cvcIn, cvcDiv);
  if (e) {
    removeError(cvcDiv);
    cvcIn.value = cvcIn.value.padEnd(3, "0");
    cardCVC.textContent = cvcIn.value;
  } else cardCVC.textContent = "000";

  if (a && b && c && d && e) {
    document.querySelector("main").innerHTML = `
    <img id="completeIcon" src="images/icon-complete.svg" alt="Complete Icon" />
    <div id="completeMsg">
    <h1>THANK YOU!</h1>
    <p>We've added your card details</p>
    </div>
    <button id="continueBtn">Continue</button>`;

    continueBtn.addEventListener("click", () => {
      location.reload();
    });
  }
}

function monthCheck() {
  if (mmIn.value < 1 || mmIn.value > 12) {
    expDiv.querySelector(".error").textContent = `Not a valid month`;
    cardMM.textContent = "00";
  }
  errorOutline(mmIn, mmIn.value >= 1 && mmIn.value <= 12);
  return mmIn.value >= 1 && mmIn.value <= 12;
}

function charCheck(e, div) {
  let x = blank(e, div);
  let y = charOnly(e, div);
  // let z = latinOnly(e, div);
  errorOutline(e, x && y);
  return x && y;
}

function numCheck(e, div) {
  let x = blank(e, div);
  let y = numOnly(e, div);
  errorOutline(e, x && y);
  return x && y;
}

function charOnly(e, div) {
  if (!/^[\p{L}\s]+$/u.test(e.value) && e.value !== "") {
    div.querySelector(".error").textContent = `Wrong format, characters only`;
    return false;
  } else return true;
}

// function latinOnly(e, div) {
//   if (!/^[A-Za-zÀ-ÿ\s]+$/.test(e.value) && e.value !== "") {
//     div.querySelector(".error").textContent = `Wrong format, latin letters only`;
//     return false;
//   } else return true;
// }

function numOnly(e, div) {
  if (!/\d/.test(e.value) && e.value !== "") {
    div.querySelector(".error").textContent = `Wrong format, numbers only`;
    return false;
  } else return true;
}

function blank(e, div) {
  if (e.value === "") {
    div.querySelector(".error").textContent = `Can't be blank`;
    return false;
  } else return true;
}

function errorOutline(e, bool) {
  if (bool) e.classList.remove("errorOutline");
  else e.classList.add("errorOutline");
}

function removeError(div) {
  div.querySelector(".error").textContent = ``;
}
