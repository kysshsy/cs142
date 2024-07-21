"use strict";

/**
 * This file tests the CS142 Project 2 JavaScript assignment problems. It prints
 * what it finds to the console log and updates the text being displayed in the
 * window with a summary of the results.
 */

/* eslint-env browser, node */

// Result message for Problems 1-3

// Keep track of all the var statements

var myModule = (function () {
  var p1Message = "SUCCESS";
  var p2Message = "SUCCESS";
  var p3Message = "SUCCESS";

  var varDeclared = ["varDeclared", "p1Message", "p2Message", "p3Message"];

  function getP1Message() {
    return p1Message;
  }
  function setP1Message(value) {
    p1Message = value;
  }

  function getP2Message() {
    return p2Message;
  }
  function setP2Message(value) {
    p2Message = value;
  }

  function getP3Message() {
    return p3Message;
  }
  function setP3Message(value) {
    p3Message = value;
  }

  function getVarDeclared() {
    return varDeclared;
  }

  return {
    getP1Message: getP1Message,
    setP1Message: setP1Message,
    getP2Message: getP2Message,
    setP2Message: setP2Message,
    getP3Message: getP3Message,
    setP3Message: setP3Message,
    getVarDeclared: getVarDeclared
  }
})();

// Utility functions
function arraysAreTheSame(a1, a2) {
  if (!Array.isArray(a1) || !Array.isArray(a2) || a1.length !== a2.length) {
    return false;
  }
  for (var i = 0; i < a1.length; i += 1) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}

// ************************* Test cs142MakeMultiFilter *************************

if (typeof cs142MakeMultiFilter !== "function") {
  console.error(
    "cs142MakeMultiFilter is not a function",
    typeof cs142MakeMultiFilter,
  );
  myModule.setP1Message("FAILURE");
} else {
  var originalArray = [1, 2, 3];
  var filterFunc = window.cs142MakeMultiFilter(originalArray);

  var secondArray = [1, 2, 3, 4];
  var filterFuncTwo = window.cs142MakeMultiFilter(secondArray);

  if (typeof filterFunc !== "function") {
    console.error(
      "cs142MakeMultiFilter does not return a function",
      filterFunc,
    );
    myModule.setP1Message("FAILURE");
  } else {
    var result = filterFunc();
    if (!arraysAreTheSame([1, 2, 3], result)) {
      console.error(
        "filter function with no args does not return the original array",
        result,
      );
      myModule.setP1Message("FAILURE");
    }

    var callbackPerformed = false;
    result = filterFunc(
      function (item) {
        return item !== 2;
      },
      function (callbackResult) {
        callbackPerformed = true;
        if (!arraysAreTheSame([1, 3], callbackResult)) {
          console.error(
            "filter function callback does not filter 2 correctly",
            callbackResult,
          );
          myModule.setP1Message("FAILURE");
        }
        if (!arraysAreTheSame([1, 2, 3], this)) {
          console.error(
            "filter function callback does not pass original array as this",
            this,
          );
          myModule.setP1Message("FAILURE");
        }
      },
    );

    if (!callbackPerformed) {
      console.error("filter function callback not performed");
      myModule.setP1Message("FAILURE");
    }

    if (result !== filterFunc) {
      console.error("filter function does not return itself", result);
      myModule.setP1Message("FAILURE");
    }

    result = filterFunc(function (item) {
      return item !== 3;
    });
    if (result !== filterFunc) {
      console.error("filter function does not return itself 2", result);
      myModule.setP1Message("FAILURE");
    }

    result = filterFunc();
    if (!arraysAreTheSame([1], result)) {
      console.error(
        "filter function callback does not filter 3 correctly",
        result,
      );
      myModule.setP1Message("FAILURE");
    }
    result = filterFuncTwo(
      function (item) {
        return item !== 1;
      },
      function (callbackResult) {
        if (!arraysAreTheSame([2, 3, 4], callbackResult)) {
          console.error(
            "second filter does not filter 1 (check for global variable usage)",
            callbackResult,
          );
          myModule.setP1Message("FAILURE");
        }
        if (!arraysAreTheSame([1, 2, 3, 4], this)) {
          console.error(
            "filter function callback does not pass original array as this",
            this,
          );
          myModule.setP1Message("FAILURE");
        }
      },
    );
  }
}
console.log("Test cs142MakeMultiFilter:", myModule.getP1Message());

// ************************ Test Cs142TemplateProcessor ************************

if (typeof Cs142TemplateProcessor !== "function") {
  console.error(
    "Cs142TemplateProcessor is not a function",
    typeof Cs142TemplateProcessor,
  );
  myModule.setP2Message("FAILURE");
} else {
  const template =
    "My favorite month is {{month}} but not the day {{day}} or the year {{year}}";
  const dateTemplate = new window.Cs142TemplateProcessor(template);

  const dictionary = { month: "July", day: "1", year: "2016" };
  const str = dateTemplate.fillIn(dictionary);

  if (str !== "My favorite month is July but not the day 1 or the year 2016") {
    console.error("Cs142TemplateProcessor didn't work");
    myModule.setP2Message("FAILURE");
  }
  myModule.getVarDeclared().push("template");
  myModule.getVarDeclared().push("dateTemplate");
  myModule.getVarDeclared().push("dictionary");
  myModule.getVarDeclared().push("str");
}
console.log("Test Cs142TemplateProcessor:", myModule.getP2Message());

// *** Test to see if the symbols we defined are in the global address space ***

myModule.getVarDeclared().forEach(function (sym) {
  if (window[sym] !== undefined) {
    console.error("Found my symbol", sym, "in DOM");
    myModule.setP3Message("FAILURE");
  }
});
console.log("Test Problem 3:", myModule.getP3Message());

// Store the result back into the global space under the object name
// cs142Project2Results
window.cs142Project2Results = {
  p1Message: myModule.getP1Message(),
  p2Message: myModule.getP2Message(),
  p3Message: myModule.getP3Message(),
};

// Once the browser loads our companion HTML in cs142-test-project2.html we
// update it with the results of our testing. This code will make more
// sense after the next project.
window.onload = function () {
  document.getElementById("cs142p1").innerHTML = myModule.getP1Message();
  document.getElementById("cs142p2").innerHTML = myModule.getP2Message();
  document.getElementById("cs142p3").innerHTML = myModule.getP3Message();
};