// console.log("hello");

const navIcon = document.getElementById('navIcon');
const navPanel = document.getElementById('navPanel');

// CANCEL BUTTON
function goBack() {
  window.history.back();
}

// all the JS for the care dropdowns

$("#wateringButton").on("click", function () {
  var se = $("#watering");
  se.toggle();
  se[0].size = 3;
});
$("#watering").on("click", function () {
  var se = $(this);
  se.hide();
});
$("#wateringButton").on("click", function () {
  var se = $("#lighting, #temperature, #size");
  se.hide();
});




$("#lightingButton").on("click", function () {
  var se = $("#lighting");
  se.toggle();
  se[0].size = 3;
});
$("#lighting").on("click", function () {
  var se = $(this);
  se.hide();
});
$("#lightingButton").on("click", function () {
  var se = $("#watering, #temperature, #size");
  se.hide();
});


$("#tempButton").on("click", function () {
  var se = $("#temperature");
  se.toggle();
  se[0].size = 3;
});
$("#temperature").on("click", function () {
  var se = $(this);
  se.hide();
});
$("#tempButton").on("click", function () {
  var se = $("#watering, #lighting, #size");
  se.hide();
});



$("#sizeButton").on("click", function () {
  var se = $("#size");
  se.toggle();
  se[0].size = 3;
});
$("#size").on("click", function () {
  var se = $(this);
  se.hide();
});
$("#sizeButton").on("click", function () {
  var se = $("#watering, #lighting, #temperature");
  se.hide();
});

$(window).click(function () {
  var se = $("#watering, #lighting, #temperature, #size");
  se.hide();
});

$('#menucontainer').click(function (event) {
  event.stopPropagation();
});