$(document).ready(function($) {

    var taskArray;
    var page;
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

    $("#date").addClass("theme-test");

    chrome.storage.sync.get('pageNum', function(p) {
        switch (p.pageNum) {
            case -1:
                SetThemeOne();
                break;
            case 0:
                SetThemeDefault();
                break;
            case 1:
                SetThemeTwo();
                break;
        }
    });

    function SetThemeDefault() {
        ChangeCSS("customtabstyle.css", 0);
        // DOM changes go here.
    }
    
    function SetThemeOne() {
        ChangeCSS("theme-one.css", 0);
    }

    function SetThemeTwo() {
        ChangeCSS("theme-two.css", 0);
    }

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

    GetTimes(); // Gets the time on initialisation, so that the time element is not left empty.

     // Click Events
    $cancelInput.on('click',function(s) {
        taskArray = taskArray.filter(Boolean);
        console.log(taskArray.length);
        $numOfTasks.html(taskArray.length);
        $numOfTasks.css('visibility', 'visible');
        $taskInput.animate({ height: ellipseButtonSize, width: ellipseButtonSize, marginTop: "350px" }, 'fast');
        $numOfTasks.fadeIn('fast');
        $taskList.css('visibility', 'hidden');
        $cancelInput.hide();
    });

    $taskInput.on('click', function(s) {
        s.stopPropagation();
        $taskInput.css('transform', 'none');
        $taskInput.animate({ height: "50px", width: "800px", marginTop: "280px" }, "fast");
        $numOfTasks.css('visibility', 'hidden');
        $taskList.css('visibility', 'visible');
        $cancelInput.show();
    });
   
    $taskInput.hover(function() {
        $numOfTasks.hide().html("<i id='add' class='material-icons'>add</i>").fadeIn('slow');
    }, function() {
        if (taskArray != null) {
            $numOfTasks.hide().html(taskArray.length).fadeIn('slow');
        } else {
            $numOfTasks.hide().html("0").fadeIn('slow');
        }
       
    });

    $taskList.on('click', '#checkbox', function(s) {
        $(this).hide().html("<i class='material-icons'>check_box</i>").fadeIn('slow');
        $(this).parent().css('opacity', '0.5');
        var itemIndex = $(this).parent().index(); // Gets the number of the element in the task list on clicked.
        console.log(itemIndex);
        console.log("the item index is: " + taskArray[itemIndex]);
        taskArray[itemIndex] = undefined;
        console.log("taskarry: " + taskArray)
        chrome.storage.sync.set({ 'value': taskArray }, function() {
            $numOfTasks.html(taskArray.length);
        });       
    });

    $leftArrow.on('click', function() {
        if (page == undefined) { page = 0; }
        switch (page) {
            case -1:
                page = 1;
                SetThemeTwo();
                break;
            case 0:
                page--;
                SetThemeOne();
                break;
            case 1:
                page--;
                SetThemeDefault();
                break;
        }      
    });

    $rightArrow.on('click', function() {
        if (page == undefined) { page = 0; }
        switch (page) {
            case -1:
                page++;
                SetThemeDefault();
                break;
            case 0:
                page++
                SetThemeTwo();
                break;
            case 1:
                page = -1; // Allows looping.
                SetThemeOne();
                break;
        }
    });

    $("#save").on('click', function() {
        chrome.storage.sync.set({ 'pageNum': page }, function() {
            alert("success!");
        });
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
        var stringDate = d.toString().toUpperCase();
        var stringTime = stringDate.substring(16, 21);
        var shortDate = stringDate.substring(0, 10);
        if (time < 12) { $greeting.html("Good Morning"); }
        else if (time < 18) { $greeting.html("Good Afternoon"); }
        else if (time >= 18) { $greeting.html("Good Evening"); }
        $time.html(stringTime);
        $date.html(shortDate);
    }

    setInterval(function() { // Gets the time every minute to ensure the wrong time is not displayed. 
        GetTimes();
    }, 60 * 1000);

    function ChangeCSS(cssFile, cssLinkIndex) {
        var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFile);
        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
    }

});