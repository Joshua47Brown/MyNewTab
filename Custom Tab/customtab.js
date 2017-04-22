$(document).ready(function(){

    //chrome.storage.sync.clear();

    var taskArray;
    var ellipseButtonSize = "70px";
    var $greeting = $("#greeting");
    var $taskInput = $("#task-input");
    var $time = $("#time");
    var $date = $("#date");
    var $numOfTasks = $("#num-of-tasks");
    // Task list is not cached because it breaks the task system when used.

    chrome.storage.sync.get('value', function(d){ 
        taskArray = d.value;
        cleanArray = d.value;
        for (var items in cleanArray) {
            $("#task-list").append("<p class='task-list-items'>" + cleanArray[items] + "</p>"); // Appends tasks from chrome storage.

        }

        if (taskArray == null) {
            console.log("Its null :c");
            taskArray = [];

        }
        else {
            console.log("appended?");
            $("#num-of-tasks").html(taskArray.length);
            $("p.task-list-items").append("<i class='material-icons' id='checkbox'>check_box_outline_blank</i>");
           
        }


    });

    GetTimes(); // Gets the time on initialisation, so that the time element is not left empty.

    function GetTimes(){
        var d = new Date();
        var time = d.getHours();
        var stringDate = d.toString().toUpperCase();
        var stringTime = stringDate.substring(16, 21);
        var shortDate = stringDate.substring(0, 10);

        if (time < 12) { $greeting.html("Good Morning"); }
        else if (time < 18) { $greeting.html("Good Afternoon"); }
        else if (time >= 18) { $greeting.html("Good Evening"); }

        $time.html(stringTime);
        $date.html(shortDate);
    }

    setInterval(function(){ // Gets the time every minute to ensure the wrong time is not displayed. 
        GetTimes();
    }, 60 * 1000);

     // Click Events:
    $("#cancel-input").click(function(s){
        $taskInput.animate({ height: ellipseButtonSize, width: ellipseButtonSize, marginTop: "350px" }, "fast");
        $numOfTasks.fadeIn("fast");
        $("#task-list").css('visibility', 'hidden');
        $("#cancel-input").hide();
    });

    $taskInput.click(function(s) {
        s.stopPropagation();
        $taskInput.animate({ height: "50px", width: "800px", marginTop: "280px" }, "fast");
        $numOfTasks.hide();
        $("#task-list").css('visibility', 'visible');
        $("#cancel-input").show();
    });

    $date.click(function(e) {
        chrome.storage.sync.clear();
    });

    $('#task-list').on('click', '#checkbox', function(s) {
        $(this).html("<i class='material-icons'>check_box</i>")
    });

    $taskInput.bind('keypress', function(e) { // So the user can submit tasks by pressing enter.
        if (e.keyCode == 13) {
            var i = $taskInput.val();
            if (taskArray == null) { taskArray = []; } // For a new user or a user without previous chrome storage of taskArray. 
            taskArray.push(i);
            $("#task-list").append("<p class='task-list-items'>" + i + "</p>"); // Adds new items to the task list, however this line does not sync it with chrome storage.
            $("p.task-list-items:last").append("<i class='material-icons' id='checkbox'>check_box_outline_blank</i>"); //! Works, checkbox position is fixed but slighly too far up.      
            $taskInput.val('');
            $("#num-of-tasks").html(taskArray.length)
            chrome.storage.sync.set({ 'value': taskArray })           
        }
    });

});