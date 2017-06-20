$(document).ready(function($) {
    //window.location.href = "welcome.html";
    var taskArray;
    var $taskInput = $("#task-input");
    var $time = $("#time");
    var $date = $("#date");
    var $taskList = $("#task-list");

    chrome.storage.sync.get('value', function(c) {
            taskArray = c.value;
            if (taskArray != null) {
                taskArray = taskArray.filter(Boolean);
                console.log(taskArray);
                for (var items in taskArray) {
                    $taskList.append("<p class='task-list-items'>" + taskArray[items] + "</p>"); // Appends tasks from chrome storage.  
                }
                $("p.task-list-items").append("<i class='material-icons' id='checkbox'>check_box_outline_blank</i>"); // Not cached otherwise errors.         
            } 
    });

    $taskList.on('click', '#checkbox', function() {
        var itemIndex = $(this).parent().index(); // Gets the number of the element in the task list on clicked.
        taskArray[itemIndex] = undefined;
        chrome.storage.sync.set({ 'value': taskArray });
        console.log(taskArray);
        $(this).addClass("checked-color");
        $(this).hide().html("check_box").fadeIn('slow');
        $(this).parent().addClass("congrats");
        $(this).parent().hide().fadeIn(200);
        $(this).parent().contents().first().replaceWith("Nice.");
        $(this).parent().delay(600).fadeOut(290, function() {
            $(this).css({ "visibility": "hidden", display: 'block' }).slideUp(300, 'swing'); // DO NOT remove items, otherwise the indexes mess up.
        });
    });

    $taskInput.bind('keypress', function(e) {
        if (e.keyCode == 13) {
            var i = $taskInput.val();
            if (taskArray == null) { taskArray = []; } // For a new user or a user without previous chrome storage of taskArray. Keep it this way.
            if (/\S/.test(i)) {
                taskArray.push(i);
                $taskList.append("<p class='task-list-items'>" + i + "</p>").children(':last').hide().fadeIn(200);; // Not cached otherwise errors.
                $("p.task-list-items:last").append("<i class='material-icons' id='checkbox'>check_box_outline_blank</i>");
                $taskInput.val("");
                chrome.storage.sync.set({ 'value': taskArray });
                console.log(taskArray);
            }
            
        }
    });

    function GetTimes() {
        var d = new Date();
        var time = d.getHours();
        var stringDate = d.toString();
        var stringTime = stringDate.substring(16, 21);
        var shortDate = stringDate.substring(0, 10);
        $time.html(stringTime);
        $date.html(shortDate);
    }

    GetTimes();

    setInterval(function() { GetTimes(); }, 60 * 1000);

});