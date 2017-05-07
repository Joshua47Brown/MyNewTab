$(document).ready(function($) {

    var taskArray;
    var ellipseButtonSize = "70px";
    var $greeting = $("#greeting");
    var $taskInput = $("#task-input");
    var $time = $("#time");
    var $date = $("#date");
    var $numOfTasks = $("#num-of-tasks");
    var $taskList = $("#task-list");
    var $cancelInput = $("#cancel-input");
    var $leftArrow = $("#left-arrow");
    var $rightArrow = $("#right-arrow");

    chrome.storage.sync.get('value', function(c) {
            taskArray = c.value;
            if (taskArray != null) {
                taskArray = taskArray.filter(Boolean);
                for (var items in taskArray) {
                    $taskList.append("<p class='task-list-items'>" + taskArray[items] + "</p>"); // Appends tasks from chrome storage.  
                }
                $numOfTasks.html(taskArray.length);
                $("p.task-list-items").append("<i class='material-icons' id='checkbox'>check_box_outline_blank</i>"); // Not cached otherwise errors.         
            } else {
                $numOfTasks.html("0");
            }
        });

    $cancelInput.on('click', function(s) {
        if (taskArray != null) {
            taskArray = taskArray.filter(Boolean);
            console.log(taskArray.length);
            $numOfTasks.html(taskArray.length);
        }
        $numOfTasks.css('visibility', 'visible');
        $taskInput.animate({ height: ellipseButtonSize, width: ellipseButtonSize, marginTop: "350px" }, 'fast');
        $numOfTasks.fadeIn('fast');
        $taskList.css('visibility', 'hidden');
        $cancelInput.hide();
    });

    $taskInput.on('click', function(s) {
        if (page == 0) {
            s.stopPropagation();
            $taskInput.css('transform', 'none');
            $taskInput.animate({ height: "50px", width: "600px", marginTop: "260px" }, "fast");
            $numOfTasks.css('visibility', 'hidden');
            $taskList.css('visibility', 'visible');
            $cancelInput.show();
        }
        else if (page == -1) {

        }
        
    });
   
    $taskInput.hover(function() {
        if (page == 0) {
            $numOfTasks.hide().html("<i id='add' class='material-icons'>add</i>").fadeIn('slow');
        }
    }, function() {
        if (page == 0) {
            if (taskArray != null) {
                $numOfTasks.hide().html(taskArray.length).fadeIn('slow');
            } else {
                $numOfTasks.hide().html("0").fadeIn('slow');
            }
        }
    });

    $taskList.on('click', '#checkbox', function() {
        $(this).hide().html("check_box").fadeIn('slow');
        $(this).parent().css('opacity', '0.5');
        var itemIndex = $(this).parent().index(); // Gets the number of the element in the task list on clicked.
        taskArray[itemIndex] = undefined;
        chrome.storage.sync.set({ 'value': taskArray }, function() {
            $numOfTasks.html(taskArray.length);
        });       
    });

    $leftArrow.on('click', function() {
        $("body").fadeOut(0.1, function() {
            $(this).fadeIn(0.1);
        });
        //$("*").removeAttr("style");
        $("*").not("p.task-list-items").removeAttr("style");
        //alert("the page you were just on: " + page);
        switch (page) {

            case -1:
                page = 1;
                ChangeCSS("theme-two.css", 0);
                break;
            case 0:
                page--;
                ChangeCSS("theme-one.css", 0);
                break;
            case 1:
                page--;
                ChangeCSS("customtabstyle.css", 0);
                break;
        }
        //alert("the page you are now one: " + page);
    });

    $rightArrow.on('click', function() {
        $("body").fadeOut(0.1,function() {
            $(this).fadeIn(0.1);
        });
        $("*").not("p.task-list-items").removeAttr("style");
        //$("*").removeAttr("style");
        //alert("the page you were just on: " + page);
        switch (page) {
            case -1:
                page++;
                ChangeCSS("customtabstyle.css", 0);
                break;
            case 0:
                page++
                ChangeCSS("theme-two.css", 0);
                break;
            case 1:
                page = -1; // Allows looping.
                ChangeCSS("theme-one.css", 0);
                break;
        }
        //alert("the page you are now on: " + page);
    });

    $("#save").on('click', function() {
        chrome.storage.sync.set({ 'pageNum': page });
    });

    $taskInput.bind('keypress', function(e) { // So the user can submit tasks by pressing enter.
        if (e.keyCode == 13) {
            var i = $taskInput.val();
            if (taskArray == null) { taskArray = []; } // For a new user or a user without previous chrome storage of taskArray. 
            taskArray.push(i);
            $taskList.append("<p class='task-list-items'>" + i + "</p>"); // Not cached otherwise errors.
            $("p.task-list-items:last").append("<i class='material-icons' id='checkbox'>check_box_outline_blank</i>"); //! Works, checkbox position is fixed but slighly too far up.      
            $taskInput.val("");
            chrome.storage.sync.set({ 'value': taskArray }, function() {
                $numOfTasks.html(taskArray.length);
            });          
        }
    });

    function GetTimes() {
        var d = new Date();
        var time = d.getHours();
        var stringDate = d.toString();
        var stringTime = stringDate.substring(16, 21);
        var shortDate = stringDate.substring(0, 10);
        if (time < 12) { $greeting.html("Good Morning"); }
        else if (time < 18) { $greeting.html("Good Afternoon"); }
        else if (time >= 18) { $greeting.html("Good Evening"); }
        $time.html(stringTime);
        $date.html(shortDate);
    }

    GetTimes();

    setInterval(function() { // Gets the time every minute to ensure the wrong time is not displayed. 
        GetTimes();
    }, 60 * 1000);
});