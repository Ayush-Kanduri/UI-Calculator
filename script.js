var buttons = $("button");
var dot = 0;
var para = document.getElementsByTagName("p");
var operand1 = 0;
var operand2 = 0;
var operator = "";
var check = 0;
var temp = 0;
var toggle = "+";
var switching = 0;

//For ButtonClick Operation
buttons.on("click", function () {
  var value = this.getAttribute("data-value");
  //OPERATORS
  if (
    value == "+" ||
    value == "-" ||
    value == "*" ||
    value == "/" ||
    value == "%"
  ) {
    if (para[0].innerText == "") {
      alert("NOT ALLOWED WITHOUT OPERAND");
      return;
    } else if (para[0].innerText == "-") {
      alert("NOT ALLOWED WITHOUT OPERAND");
      return;
    } else if (check == 1) {
      switching = 1;
      operator = value;
      if (operator == "/") {
        operand2 = "ERROR";
      }
      para[0].innerText = "";
      dot = 0;
      console.log(operator, "PRESSED", ", Operand1 = ", operand1);
      check = 0;
    } else {
      switching = 1;
      if (para[0].innerText == "-0") {
        para[0].innerText == "0";
      }
      if (operator != "") {
        operand2 = parseFloat(para[0].innerText);
        para[0].innerText = "";
        var result = eval(operand1 + " " + operator + " " + operand2);
        console.log(result);
        operand1 = result;
        operator = value;
        if (operator == "/") {
          operand2 = "ERROR";
        }
        dot = 0;
      } else {
        operator = value;
        if (operator == "/") {
          operand2 = "ERROR";
        }
        operand1 = parseFloat(para[0].innerText);
        para[0].innerText = "";
        dot = 0;
        console.log(operator, "PRESSED", ", Operand1 = ", operand1);
      }
      toggle == "+";
    }
  }
  //CLEAR SCREEN
  else if (value == "clear") {
    console.log("Clear Screen PRESSED");
    para[0].innerText = "";
    dot = 0;
    operand2 = 0;
    operand1 = 0;
    operator = "";
    check = 0;
    toggle = "+";
    switching = 0;
  }
  //NEGATION
  else if (value == "+/-") {
    if (switching == 1) {
      para[0].innerText = "-";
      toggle = "+";
    }
    if (para[0].innerText == "" && toggle == "+") {
      para[0].innerText = "-";
      toggle = "-";
      console.log("NEGATIVE INTEGER INCOMING");
    } else if (para[0].innerText == "-" && toggle == "-") {
      para[0].innerText = "";
      toggle = "+";
      console.log("POSITIVE INTEGER INCOMING");
    }
  }
  //DECIMAL POINT
  else if (value == ".") {
    let operand = value;
    if (para[0].innerText == "") {
      dot = 1;
      para[0].innerText = "0.";
    } else if (para[0].innerText == "+" || para[0].innerText == "-") {
      alert("NOT ALLOWED WITH +/-");
      return;
    } else if (para[0].innerText != "") {
      if (dot == 1) {
        return;
      } else {
        para[0].innerText += operand;
        dot = 1;
      }
    }
    console.log(operand, "PRESSED");
  }
  //RESULT
  else if (value == "=") {
    if (para[0].innerText == "") {
      return;
    }
    if (
      parseFloat(para[0].innerText) == undefined ||
      parseFloat(para[0].innerText) == NaN ||
      parseFloat(para[0].innerText) == ""
    ) {
      alert("USE CORRECT NUMBER FORMAT");
      return;
    }
    if (operator == "" || operator == NaN || operator == undefined) {
      return;
    } else {
      operand2 = parseFloat(para[0].innerText);
      dot = 0;
      var result = eval(operand1 + " " + operator + " " + operand2);
      para[0].innerText = result;
      console.log(
        "=",
        "PRESSED",
        ", Operand2 = ",
        operand2,
        ", RESULT = ",
        result
      );
      operand1 = result;
      check = 1;
    }
    toggle == "+";
    switching = 0;
  }
  //DIGITS
  else {
    if (check == 1) {
      check = 0;
      operand1 = 0;
      operand2 = 0;
      operator = "";
      para[0].innerText = "";
      dot = 0;
    }
    if (operand2 == "ERROR") {
      if (value == "0") {
        alert("ERROR");
        para[0].innerText = "";
        operand1 = 0;
        operand2 = 0;
        operator = "";
        check = 0;
        dot = 0;
        return;
      }
    }
    let operand = value;
    if (para[0].innerText == "-") {
      if (operand == "0") {
        para[0].innerText = "-0";
        return;
      } else {
        para[0].innerText = "";
        para[0].innerText += -1 * parseFloat(operand);
      }
    } else {
      para[0].innerText += operand;
    }
    console.log(operand, "PRESSED");
  }
});

//For KeyDown Operation
$(document).keydown(function (event) {
  var key = event.keyCode;
  //CLEAR SCREEN
  if (key == 27 || key == 8) {
    console.log("Clear Screen PRESSED");
    para[0].innerText = "";
    dot = 0;
    operand2 = 0;
    operand1 = 0;
    operator = "";
    check = 0;
  }
});

//For KeyPress Operation
$(document).keypress(function (event) {
  var key = event.keyCode;
  //DIGITS
  if (key >= 48 && key <= 57) {
    if (check == 1) {
      check = 0;
      operand1 = 0;
      operand2 = 0;
      operator = "";
      para[0].innerText = "";
      dot = 0;
    }
    if (operand2 == "ERROR") {
      if (String.fromCharCode(key) == 0) {
        alert("ERROR");
        para[0].innerText = "";
        operand1 = 0;
        operand2 = 0;
        operator = "";
        check = 0;
        dot = 0;
        return;
      }
    }
    let operand = String.fromCharCode(key);
    if (para[0].innerText == "-") {
      if (operand == 0) {
        para[0].innerText = "-0";
        return;
      } else {
        para[0].innerText = "";
        para[0].innerText += -1 * parseFloat(operand);
      }
    } else {
      para[0].innerText += operand;
    }
    console.log(operand, "PRESSED");
  }
  //OPERATORS
  else if (key == 43 || key == 45 || key == 42 || key == 47 || key == 37) {
    if (para[0].innerText == "" && key == 45) {
      para[0].innerText = "-";
      console.log("NEGATIVE INTEGER INCOMING");
    } else if (para[0].innerText == "-" && (key == 45 || key == 43)) {
      para[0].innerText = "";
      console.log("POSITIVE INTEGER INCOMING");
    } else if (
      para[0].innerText == "" &&
      (key == 43 || key == 42 || key == 47 || key == 37)
    ) {
      alert("NOT ALLOWED WITHOUT OPERAND");
      return;
    } else if (
      para[0].innerText == "-" &&
      (key == 42 || key == 47 || key == 37)
    ) {
      alert("NOT ALLOWED WITHOUT OPERAND");
      return;
    } else if (check == 1) {
      operator = String.fromCharCode(key);
      if (operator == "/") {
        operand2 = "ERROR";
      }
      para[0].innerText = "";
      dot = 0;
      console.log(operator, "PRESSED", ", Operand1 = ", operand1);
      check = 0;
    } else {
      if (para[0].innerText == "-0") {
        para[0].innerText == "0";
      }
      if (operator != "") {
        operand2 = parseFloat(para[0].innerText);
        para[0].innerText = "";
        var result = eval(operand1 + " " + operator + " " + operand2);
        console.log(result);
        operand1 = result;
        operator = String.fromCharCode(key);
        if (operator == "/") {
          operand2 = "ERROR";
        }
        dot = 0;
      } else {
        operator = String.fromCharCode(key);
        if (operator == "/") {
          operand2 = "ERROR";
        }
        operand1 = parseFloat(para[0].innerText);
        para[0].innerText = "";
        dot = 0;
        console.log(operator, "PRESSED", ", Operand1 = ", operand1);
      }
      // toggle == "+";
    }
  }
  //DECIMAL POINT
  else if (key == 46) {
    let operand = String.fromCharCode(key);
    if (para[0].innerText == "" && key == 46) {
      dot = 1;
      para[0].innerText = "0.";
    } else if (para[0].innerText == "+" || para[0].innerText == "-") {
      alert("NOT ALLOWED WITH +/-");
      return;
    } else if (para[0].innerText != "") {
      if (dot == 1) {
        return;
      } else {
        para[0].innerText += operand;
        dot = 1;
      }
    }
    console.log(operand, "PRESSED");
  }
  //RESULT
  else if (key == 13 || key == 10) {
    if (para[0].innerText == "") {
      return;
    }
    if (
      parseFloat(para[0].innerText) == undefined ||
      parseFloat(para[0].innerText) == NaN ||
      parseFloat(para[0].innerText) == ""
    ) {
      alert("USE CORRECT NUMBER FORMAT");
      return;
    }
    if (operator == "" || operator == NaN || operator == undefined) {
      return;
    } else {
      operand2 = parseFloat(para[0].innerText);
      dot = 0;
      var result = eval(operand1 + " " + operator + " " + operand2);
      para[0].innerText = result;
      console.log(
        "=",
        "PRESSED",
        ", Operand2 = ",
        operand2,
        ", RESULT = ",
        result
      );
      operand1 = result;
      check = 1;
    }
    // toggle == "+";
  }
  //INVALID CHARACTERS
  else {
    alert(
      "THIS CHARACTER IS NOT ALLOWED !!! Characters Allowed Are: +, -, *, /, %, 1-9, enter, escape, backspace, =, ."
    );
    return;
  }
});
