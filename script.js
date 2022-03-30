var eventData = [];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let clickedDate = null;
let largestEventId = 0;
var arr = [];
var main_event_id = 1;
var modal1;

let structureCalendar = createElement("div", window.root, { id: "structureCalendar" });
let calendarHeader = createElement("header", structureCalendar, {});
let headerLeft = createElement("div", calendarHeader, { className: "left" });
let headerCenter = createElement("div", calendarHeader, { className: "center" });
let headerRight = createElement("div", calendarHeader, { className: "right" });
let buttonPrev = createElement("button", headerLeft, { textContent: "Previous" });
let buttonNext = createElement("button", headerRight, { textContent: "Next" });
let centerTitle = createElement("h1", headerCenter, { textContent: months[currentMonth] + " " + currentYear });
let calendarBody = createElement("div", structureCalendar, { id: "calendar" });
let weekdayBody = createElement("ul", calendarBody, { id: "weekdays" });
let daysBody = createElement("ul", calendarBody, { id: "days" });

let modalMainDiv = createElement("div", window.body, { id: "myModal", className: "modal" });
let modalDialogDisplay = createElement("div", modalMainDiv, { className: "modal-dialog" });
let modalContentDisplay = createElement("div", modalDialogDisplay, { className: "modal-content" });
let modalHeaderDisplay = createElement("div", modalContentDisplay, { className: "modal-header" });
var modalTitle = createElement("h5", modalHeaderDisplay, { className: "modal-title", textContent: "Modal title" });
let closeIconDisplay = createElement("button", modalHeaderDisplay, { type: "button", className: "btn-close" }, { bsDismiss: "modal" });
let modalBodyDisplay = createElement("div", modalContentDisplay, { className: "modal-body" });
var para = createElement("p", modalBodyDisplay, { textContent: "text in modal" });
let modalFooterDisplay = createElement("div", modalContentDisplay, { className: "modal-footer" });
var editButton = createElement("button", modalFooterDisplay, { type: "button", className: "btn btn-secondary", textContent: "Edit" }, { content: "" });
var deleteButton = createElement("button", modalFooterDisplay, { type: "button", className: "btn btn-danger", textContent: "Delete", id: "del_" + main_event_id }, { content: "" });

let modalDiv = createElement("div", window.body, { id: "myModalInput", className: "modal" });
let modalDialog = createElement("div", modalDiv, { className: "modal-dialog" });
let modalContent = createElement("div", modalDialog, { className: "modal-content" });
let modalHeader = createElement("div", modalContent, { className: "modal-header" });
let h5 = createElement("h5", modalHeader, { className: "modal-title", id: "exampleModalLabel", textContent: "Add Event" });
//let modalTitle = createElement("h5",modalHeader,{className:"modal-title",textContent: "Modal title"});
let closeIcon = createElement("button", modalHeader, { type: "button", className: "btn-close" }, { bsDismiss: "modal" });
let modalBody = createElement("div", modalContent, { className: "modal-body" });
let form = createElement("form", modalBody, { id: "addEvent" });
var dateInput = createElement("input", form, { type: "hidden", id: "date" });
let idInput = createElement("input", form, { type: "hidden", id: "event_" + main_event_id });
let inputDiv = createElement("div", form, { className: "mb-3" });
let inputLable = createElement("label", inputDiv, { className: "col-form-label", textContent: "Event Name" });
var eventInput = createElement("input", inputDiv, { type: "text", className: "form-control", id: "event-name", name: "input" });
//let para =createElement("p",modalBody,{textContent:"text in modal"});
let textAreaDiv = createElement("div", form, { className: "mb-3" });
let textAreaLable = createElement("label", textAreaDiv, { className: "col-form-label", textContent: "Event Description" });
var eventDescription = createElement("textarea", textAreaDiv, { type: "text", className: "form-control", id: "event-description", name: "inputD" });
let modalFooter = createElement("div", modalContent, { className: "modal-footer" });
let closeButton = createElement("button", modalFooter, { type: "button", className: "btn btn-secondary", textContent: "close" }, { bsDismiss: "modal" });
let saveButton = createElement("button", modalFooter, { type: "button", className: "btn btn-primary", textContent: "save Changes", id: "saveButton" });

let editModalDiv = createElement("div", window.body, { id: "editModalInput", className: "modal" });
let editModalDialog = createElement("div", editModalDiv, { className: "modal-dialog" });
let editModalContent = createElement("div", editModalDialog, { className: "modal-content" });
let editModalHeader = createElement("div", editModalContent, { className: "modal-header" });
let edit_h5 = createElement("h5", editModalHeader, { className: "modal-title", id: "exampleModalLabel", textContent: "Edit Event" });
let editCloseIcon = createElement("button", editModalHeader, { type: "button", className: "btn-close" }, { bsDismiss: "modal" });
let editModalBody = createElement("div", editModalContent, { className: "modal-body" });
let edit_form = createElement("form", editModalBody, { id: "addEvent" });
var editDateInput = createElement("input", edit_form, { type: "hidden", id: "Edit_date" });
let edit_idInput = createElement("input", edit_form, { type: "hidden", id: "editindex" });
let edit_inputDiv = createElement("div", edit_form, { className: "mb-3" });
let Edit_inputLable = createElement("label", edit_inputDiv, { className: "col-form-label", textContent: "Event Name" });
var edit_eventInput = createElement("input", edit_inputDiv, { type: "text", className: "form-control", id: "edit_event-name", name: "input" });
let edit_textAreaDiv = createElement("div", edit_form, { className: "mb-3" });
let edit_textAreaLable = createElement("label", edit_textAreaDiv, { className: "col-form-label", textContent: "Event Description" });
var edit_eventDescription = createElement("textarea", edit_textAreaDiv, { type: "text", className: "form-control", id: "edit_event-description", name: "inputD" });
let editModalFooter = createElement("div", editModalContent, { className: "modal-footer" });
let edit_closeButton = createElement("button", editModalFooter, { type: "button", className: "btn btn-secondary", textContent: "close" }, { bsDismiss: "modal" });
var edit_saveButton = createElement("button", editModalFooter, { type: "button", className: "btn btn-primary", textContent: "save Changes", id: "saveButton" });

showCalendar(currentMonth, currentYear);

weekdays.map((item, i) => (today.getDay() - 1 == i ? createElement("li", weekdayBody, { className: "today", textContent: item }) : createElement("li", weekdayBody, { textContent: item })));

buttonPrev.onclick = () => prev();
buttonNext.onclick = () => next();

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay() - 1;

  daysBody.textContent = "";

  centerTitle.textContent = months[month] + " " + year;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        createElement("li", daysBody, { textContent: "" });
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        let li = createElement("li", daysBody, { id: year + "/" + (parseInt(month) + 1) + "/" + date }, { date: date, month: parseInt(month) + 1, year: year });

        let info = createElement("div", li, { className: "info", textContent: weekdays[j] });
        let div = createElement("div", li, { className: "date", textContent: date });

        li.addEventListener("click", function () {
          clickedDate = "";
          let event_date = this.dataset.year + "/" + this.dataset.month + "/" + this.dataset.date;
          dateInput.value = event_date;
          modal1 = bootstrap.Modal.getOrCreateInstance(modalDiv);
          modal1.show();
        });

        if (typeof eventData !== "undefined") {
          viewEvents(eventData, li, [year, month, date]);
        }
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          li.className = "today";
        }
        date++;
      }
    }
  }
}

function viewEvents(data, where, args) {
  let firstEventOfTheDay = true;
  let eventContainer;
  return (
    data &&
    data.map((item, index) => {
      let date = item.date.split("/");
      let year = parseInt(date[0]);
      let month = parseInt(date[1]) - 1;
      let day = parseInt(date[2]);

      if (year === args[0] && month === args[1] && day === args[2]) {
        if (firstEventOfTheDay == true) {
          eventContainer = createElement("div", where, {});
        }
        firstEventOfTheDay = false;
        let eventElem = createElement("div", eventContainer, { className: "ev", id: item.id, title: item.title });

        // Show Modal on Clicking Event Dot, Modal should Contain Event Title, Details and Date
        eventElem.addEventListener("click", function () {
          event.stopPropagation();
          deleteButton.dataset.content = item.id;
          editButton.dataset.content = item.id;
          modalTitle.innerText = item.title;
          para.innerText = item.content;
          clickedDate = "";
          var myModalElm = document.querySelector("#myModal");
          var modal = bootstrap.Modal.getOrCreateInstance(myModalElm);
          modal.show();
        });
      }
    })
  );
}

function next() {
  currentMonth = (currentMonth + 1) % 12;
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  showCalendar(currentMonth, currentYear);
}

function prev() {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  showCalendar(currentMonth, currentYear);
}

function createElement(element, where, args, dataArgs) {
  let d = document.createElement(element);
  if (args) for (const [k, v] of Object.entries(args)) d[k] = v;

  if (dataArgs)
    for (const [k, v] of Object.entries(dataArgs)) {
      d.dataset[k] = v;
    }

  where.appendChild(d);
  return d;
}

// https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

const btn = document.getElementById("saveButton");
btn.addEventListener("click", function () {
  let tasks = document.querySelectorAll('input[name="input"]');
  let tasksDescription = document.querySelectorAll('textarea[name="inputD"]');

  let obj = {};
  if (eventInput.value.trim() == "") {
    return;
  }
  obj["title"] = eventInput.value;
  eventInput.value = "";

  obj["content"] = eventDescription.value;
  eventDescription.value = "";

  obj["date"] = dateInput.value;
  obj["id"] = main_event_id;

  console.log(dateInput.value);
  let li = document.getElementById(dateInput.value);
  console.log(li);
  let li_year = li.getAttribute("data-year");
  let li_month = li.getAttribute("data-month");
  let li_date = li.getAttribute("data-date");

  eventData.push(obj);

  console.log(eventData);

  localStorage.setItem("eventData", JSON.stringify(eventData));
  let show = localStorage.getItem("eventData");

  showCalendar(currentMonth, currentYear);

  main_event_id++;
  let temp_modal = bootstrap.Modal.getInstance(modalDiv);
  temp_modal.hide();
});

document.addEventListener("DOMContentLoaded", function () {
  let dataSave = localStorage.getItem("eventData");
  dataSave = JSON.parse(dataSave);
  if (dataSave == null) {
    eventData = [];
  } else {
    eventData = dataSave;
    main_event_id = eventData[eventData.length - 1].id + 1;
    showCalendar(currentMonth, currentYear);
  }
});

//const delBtn = document.getElementById("del");
deleteButton.addEventListener("click", function () {
  // console.log(deleteButton);
  let id = event.target.dataset.content;
  let foundIndex = eventData.findIndex((item) => parseInt(item.id) == parseInt(id));
  eventData.splice(foundIndex, 1);
  localStorage.setItem("eventData", JSON.stringify(eventData));
  showCalendar(currentMonth, currentYear);

  let temp_modal = bootstrap.Modal.getInstance(modalMainDiv);
  temp_modal.hide();
});

editButton.addEventListener("click", function () {
  var myModalElement = document.querySelector("#editModalInput");
  var modal = bootstrap.Modal.getOrCreateInstance(myModalElement);
  modal.show();
  let id = event.target.dataset.content; // edit_idInput.value
  let foundIndex = eventData.findIndex((item) => parseInt(item.id) == parseInt(id));
  let editValue = eventData[foundIndex];

  edit_idInput.value = editValue.id;
  editDateInput.value = editValue.date;
  edit_eventInput.value = editValue.title;
  edit_eventDescription.value = editValue.content;
  //editValue.content = edit_eventDescription;

  let edit_modal = bootstrap.Modal.getInstance(modalMainDiv);
  edit_modal.hide();
});

edit_saveButton.addEventListener("click", function () {
  let id = edit_idInput.value;

  let foundIndex = eventData.findIndex((item) => parseInt(item.id) == parseInt(id));
  let editValue = eventData[foundIndex];

  editValue.title = edit_eventInput.value;
  edit_eventInput.value = "";
  editValue.content = edit_eventDescription.value;
  edit_eventDescription.value = "";

  localStorage.setItem("eventData", JSON.stringify(eventData));

  let edit_modal = bootstrap.Modal.getInstance(editModalInput);
  edit_modal.hide();
});
