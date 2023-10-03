// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {

  //show date and time in header;
const showDate = $("#currentDay");
showDate.text(dayjs().format("dddd, MMM, YYYY hh:mm A"));

//save buttons
$(".saveBtn").on("click", saveTask);

//set up time blocks
setupTimeBlocks();

//save task text written to local storage
function saveTask(event) {
  event.preventDefault();

  // Get the id attribute of the parent time-block div
  var timeBlock = $(this).parent().attr("id");

  // Get the value of text in the textarea 
  var taskText = $(this).prev().val();

  // save to local storage
    localStorage.setItem(timeBlock, taskText);
}

//set up time blocks and applies a class so css can colour code accordingly

function setupTimeBlocks() {
  //get current hour
  var currentHour = dayjs().hour();

  //go through each time block
  $(".time-block").each(function() {

    //gets hour value from id attribute of time block
    var hour = parseInt($(this).attr("id").split("-")[1]);

    //apply classes for css to affect depending on the hour vs current hour
    if (hour < currentHour) {
      $(this).addClass("past");
    } else if (hour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }

    // Display saved task from local storage in the textarea
    var savedTask = localStorage.getItem($(this).attr("id"));
    $(this).children(':nth-child(2)').val(savedTask);

  });
}
});


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.