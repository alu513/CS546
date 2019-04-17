const form = document.getElementById("theform");

function prime(n) {
  if (n < 0) {
    $("#error").show();
    $("#error").html("Input cannot be negative");
    $("#theform").trigger("reset");
    $("#inputId").focus();
    return;
  } else if (n == 0 || n == 1) {
    return false;
  } else {
    for (var i = 2; i < n; i++) {
      if (n % i == 0) return false;
    }
    return true;
  }
}

if (form) {
  const textInput = document.getElementById("inputId");

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (textInput.value) {
      $("#error").hide();

      if (prime(parseInt(textInput.value)) == true) {
        const li = `<li class=is-prime> ${
          textInput.value
        } is a prime number</li>`;
        $("#attempts").append(li);
        $("#theform").trigger("reset");
        $("#inputId").focus();
      } else if (prime(parseInt(textInput.value)) == false) {
        const li = `<li class=not-prime> ${
          textInput.value
        } is a NOT prime number</li>`;
        $("#attempts").append(li);
        $("#theform").trigger("reset");
        $("#inputId").focus();
      }
    } else {
      $("#error").show();
      $("#error").html("You Need to supply an input value!");
      $("#inputId").focus();
    }
  });
}
