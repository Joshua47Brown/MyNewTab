$(document).ready(function($) {

    //window.location.href = "welcome.html";

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
    var $save = $("#save");
    var $confirm = $("#confirm");
    var randTaskNum = Math.floor(Math.random() * 50) + 1;

    chrome.storage.sync.get('value', function(c) {
            taskArray = c.value;
            if (taskArray != null) {
                taskArray = taskArray.filter(Boolean);
                for (var items in taskArray) {
                    $taskList.append("<p class='task-list-items'>" + taskArray[items] + "</p>"); // Appends tasks from chrome storage.  
                }
                switch (randTaskNum) {
                    case 1:
                        $taskList.append("<p class='task-list-items'>Stop to realise how awesome you are.</p>");
                        break;
                    case 2:
                        $taskList.append("<p class='task-list-items'>Continue being a really super cool person.</p>");
                        break;
                    case 3:
                        $taskList.append("<p class='task-list-items'>Keep being the best person we know.</p>");
                        break;
                }
                $("p.task-list-items").append("<i class='material-icons' id='checkbox'>check_box_outline_blank</i>"); // Not cached otherwise errors.         
            } 
    });

    $taskList.on('click', '#checkbox', function() {
        var itemIndex = $(this).parent().index(); // Gets the number of the element in the task list on clicked.
        taskArray[itemIndex] = undefined;
        chrome.storage.sync.set({ 'value': taskArray });
        $(this).addClass("checked-color");
        $(this).hide().html("check_box").fadeIn('slow');
        $(this).parent().addClass("congrats");
        $(this).parent().hide().fadeIn(200);
        $(this).parent().contents().first().replaceWith("Nice.");
        $(this).parent().delay(600).fadeOut(290, function() {
            $(this).css({ "visibility": "hidden", display: 'block' }).slideUp(300, 'swing', function() {
                $(this).remove();
            });
        });
    });

    $leftArrow.on('click', function() {
        $("body").fadeOut(0.1, function() {$(this).fadeIn(0.1);});
        $("*").not("p.task-list-items").removeAttr("style");
        switch (page) {
            case 1:
                page = 3;
                ChangeCSS("theme-three.css", 0);
                break;
            case 2:
                page--;
                ChangeCSS("theme-one.css", 0);
                break;
            case 3:
                page--;
                ChangeCSS("theme-two.css", 0);
                break;
        }
    });

    $rightArrow.on('click', function() {
        $("body").fadeOut(0.1,function() {$(this).fadeIn(0.1);});
        $("*").not("p.task-list-items").removeAttr("style");
        switch (page) {
            case 1:
                page++;
                ChangeCSS("theme-two.css", 0);
                break;
            case 2:
                page++;
                ChangeCSS("theme-three.css", 0);
                break;
            case 3:
                page = 1;
                ChangeCSS("theme-one.css", 0);
                break;
        }
    });

    $save.on('click', function() {
        chrome.storage.sync.set({ 'pageNum': page }, function() {
            $confirm.animate({ opacity: 1 }, "fast", function() {
                $(this).delay(3000).animate({ opacity: 0 }, "fast");
            });
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
            }
            
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

    setInterval(function() { GetTimes(); }, 60 * 1000);

});