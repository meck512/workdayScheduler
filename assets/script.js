// display date to header
var titleDate = moment().format("MMMM Do YYYY");
$("#currentDay").text(titleDate);

// check for saved task, load them, if not then blank array
if (localStorage.getItem("savedTasks")) {
    taskArray = JSON.parse(localStorage.getItem("savedTasks"));
} else {
    taskArray = [];
};

var taskInput = $("textarea");
function saveToLocalStorage() {
    event.preventDefault();
    let buttonIndex = Number($(this).attr('id'));

    if (taskInput[buttonIndex].value.trim() != "") {
        taskArray[buttonIndex] = {
            time: $(".hour")[buttonIndex].textContent.trim(),
            task: taskInput[buttonIndex].value
        };

        localStorage.setItem("savedTasks", JSON.stringify(taskArray));
    };
};

$("button").click(saveToLocalStorage);

function addLocalTasks() {
    $.each(taskArray, function (i) {
        if (taskArray[i]) {
            taskInput[i].value = taskArray[i].task;
        };
    });
};

addLocalTasks();

// change color of rows based on time (past/present/future)
var taskBlock = $(".col-8");
var time = moment();
var presentHour;

function updateColor() {
    taskBlock.removeClass('past present future');
    $.each(taskBlock, function (hourRow) {
        if (hourRow < (time.hour() - 9)) {
            $(this).addClass('past');
        } else if (hourRow == (time.hour() - 9)) {
            $(this).addClass('present');
        } else {
            $(this).addClass('future');
        }
    });
    presentHour = time.hour();
};

updateColor();

setInterval(function () {
    time = moment();
    if (presentHour < time.hour()) {
        updateColor();
    } else if (presentHour > time.hour()) {
        updateColor();
        $("#currentDay").text(`${time.format('dddd, MMMM Do')}`);
    }
}, 1000);





