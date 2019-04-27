var CurrentDate;

function StarDate() {
    var self = this;
    // or 1-112 (spring 1 to winter 28)

    // Args
    if (arguments.length == 1) {
        self.value = arguments[0];
    }
    else if (arguments.length = 2) {
        var season = arguments[0];
        if (isNaN(season)) {
            season = season == "spring" ? 1
                : season == "summer" ? 2
                    : season == "fall" ? 3
                        : season == "winter" ? 4 : 0

        }

        var day = arguments[1];
        self.value = ((season * 28) - 28) + +day;
    }

    self.toString = function () {
        return self.getSeason() + " " + self.getDay();
    }

    self.getSeason = function () {
        var season = Math.ceil(self.value / 28 % 4) || 1;
        switch (season) {
            case 1:
            case "spring":
                return "spring";
            case 2:
            case "summer":
                return "summer";
            case 3:
            case "fall":
                return "fall";
            case 4:
            case "winter":
                return "winter";
            default:
                console.error("invalid season:", season)
                return "";
        }
    }

    self.getDay = function () {
        // Cause modulo is hard
        return self.value % 28 || 28;
    }

    self.AddDay = function (val) {
        self.value = self.value + val;
    }
}

function Load() {
    // get data from localstorage
    BindButtons();

    CurrentDate = new StarDate(+localStorage.getItem(schema.CurrentDate));

    var datespot = document.querySelector('[data-bind=currentDate]');
    datespot.innerHTML = CurrentDate;

    LoadBirthdays();
}

function LoadBirthdays() {
    var events = data.events.concat(data.birthdays);

    allEvents = events.map(function (data) {
        return { Name: data.name, Date: new StarDate(data.season, data.date) }
    })

    allEvents.sort(function (a, b) {
        return a.Date.value - b.Date.value;
    })

    upcomingEvents = allEvents.filter(function (birthday) {
        var diff = birthday.Date.value - CurrentDate.value;
        return diff < 16 && diff >= 0;
    })


    var birthdayText = document.querySelector("[data-foreach=birthdays]");
    birthdayText.innerHTML = "";
    for (i of upcomingEvents) {
        var elem = document.createElement('li');
        elem.innerHTML = i.Name + " " + i.Date;
        birthdayText.appendChild(elem);
    }
}

function BindButtons() {
    document.querySelector('[data-click=nextDay').addEventListener("click", NextDay);
}

function NextDay() {
    CurrentDate.AddDay(1);
    var datespot = document.querySelector('[data-bind=currentDate]');
    datespot.innerHTML = CurrentDate;
    LoadBirthdays();
    Save();
}

function Save(){
    localStorage.setItem(schema.CurrentDate, CurrentDate.value);
}


function main() {

    Load();

    // Current date
    // show upcoming birthdays
    // show crop time frames
    // show tool upgrade counters

}

main();
