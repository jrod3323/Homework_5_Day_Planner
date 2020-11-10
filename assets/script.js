//Grab necessary items
var container = $("#calendar-display")
var date = $("#currentDay")
var clearBtn = $('#clearSchedule')

//Populate today's date
var now = moment().format("LLL");
date.text(now);

setInterval(function(){
    var now = moment().format("LLL");
    date.text(now);
},60000)

//grab current hour

var nowHour = moment().format("H")

//Get stored timeblock array or set time block array to empty content
var storedCalendar =  JSON.parse(localStorage.getItem("calendar"));
if(storedCalendar){
    timeBlocks=storedCalendar
}else{
    var timeBlocks = [
        {
            text: "9AM",
            hour: 9,
            content: "" ,
        },
        {
            text: "10AM",
            hour: 10,
            content: "" ,
        },
        {
            text: "11AM",
            hour: 11 ,
            content: "" ,
        },
        {
            text: "12PM",
            hour: "12",
            content: "" ,
        },
        {
            text: "1PM",
            hour: "13",
            content: "" ,
        },
        {
            text: "2PM",
            hour: "14",
            content: "" ,
        },
        {
            text: "3PM",
            hour: "15",
            content: "" ,
        },
        {
            text: "4PM",
            hour: "16",
            content: "" ,
        },
        {
            text: "5PM",
            hour: "17",
            content: "" ,
        }
    ]
}
//Loop To Append timeBlocks to page
for(var i=0;i<timeBlocks.length;i++){
    //create need elements
    var row =$("<div>")
    var hourText = $("<div>").text(timeBlocks[i].text)
    var content = $("<textarea>").text(timeBlocks[i].content)
    var save = $("<div>").text("💾");
    //add attributes to elements
    row.addClass("row time-block");
    hourText.addClass("hour");
    save.addClass("saveBtn");
    content.addClass("text")
    ;
    //append to page  
    container.append(row);
    row.append(hourText,content,save);

    //check background color of content and hour
    if(timeBlocks[i].hour<nowHour){
        content.addClass("past");
    }else if(timeBlocks[i].hour == nowHour){
        content.addClass("present");
    }else{
        content.addClass("future")
    }
}

container.on("click",".saveBtn", saveContent)

function saveContent(){
    for(var i=0;i<(timeBlocks.length);i++){
    var textContent = $("textarea")[i].value;
    
    timeBlocks[i].content = textContent

    console.log(textContent[i]);
    console.log(timeBlocks[i])

    localStorage.setItem("calendar", JSON.stringify(timeBlocks))
    }
}

function    clearLocal(){
    localStorage.removeItem("calendar")
    location.reload();
    }

clearBtn.on("click",clearLocal)