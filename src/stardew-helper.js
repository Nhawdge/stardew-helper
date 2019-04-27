var data = {
    "birthdays": [
        {
            "person": "Kent",
            "date": "4",
            "season": "spring"
        },
        {
            "person": "Lewis",
            "date": "7",
            "season": "spring"
        },
        {
            "person": "Vincent",
            "date": "3",
            "season": "spring"
        },
        {
            "person": "Haley",
            "date": "14",
            "season": "spring"
        },
        {
            "person": "Pam",
            "date": "18",
            "season": "spring"
        },
        {
            "person": "Shane",
            "date": "20",
            "season": "spring"
        },
        {
            "person": "Pierre",
            "date": "26",
            "season": "spring"
        },
        {
            "person": "Emily",
            "date": "27",
            "season": "spring"
        },
        {
            "person": "Jas",
            "date": "04",
            "season": "summer"
        },
        {
            "person": "Gus",
            "date": "08",
            "season": "summer"
        },
        {
            "person": "Maru",
            "date": "10",
            "season": "summer"
        },
        {
            "person": "Alex",
            "date": "13",
            "season": "summer"
        },
        {
            "person": "Sam",
            "date": "17",
            "season": "summer"
        },
        {
            "person": "Demetrius",
            "date": "19",
            "season": "summer"
        },
        {
            "person": "Dwarf",
            "date": "22",
            "season": "summer"
        },
        {
            "person": "Willy",
            "date": "24",
            "season": "summer"
        },
        {
            "person": "Penny",
            "date": "2",
            "season": "fall"
        },
        {
            "person": "Elliott",
            "date": "5",
            "season": "fall"
        },
        {
            "person": "Jodi",
            "date": "11",
            "season": "fall"
        },
        {
            "person": "Abigail",
            "date": "13",
            "season": "fall"
        },
        {
            "person": "Sandy",
            "date": "15",
            "season": "fall"
        },
        {
            "person": "Marnie",
            "date": "18",
            "season": "fall"
        },
        {
            "person": "Robin",
            "date": "21",
            "season": "fall"
        },
        {
            "person": "George",
            "date": "24",
            "season": "fall"
        },
        {
            "person": "Krobus ",
            "date": "1",
            "season": "winter"
        },
        {
            "person": "Linus",
            "date": "3",
            "season": "winter"
        },
        {
            "person": "Caroline",
            "date": "7",
            "season": "winter"
        },
        {
            "person": "Sebastian",
            "date": "10",
            "season": "winter"
        },
        {
            "person": "Harvey",
            "date": "14",
            "season": "winter"
        },
        {
            "person": "Wizard",
            "date": "17",
            "season": "winter"
        },
        {
            "person": "Evelyn",
            "date": "20",
            "season": "winter"
        },
        {
            "person": "Leah",
            "date": "23",
            "season": "winter"
        },
        {
            "person": "Clint",
            "date": "26",
            "season": "winter"
        },
        
    ]
}

var CurrentDate;
var BirthDays;


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
        console.log(season);
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
    CurrentDate = new StarDate(100);

    var datespot = document.querySelector('[data-bind=currentDate]');
    datespot.innerHTML = CurrentDate;

    LoadBirthdays();
}

function LoadBirthdays() {
    if (BirthDays == null) {
        BirthDays = data.birthdays.map(function (data) {
            return { Name: data.person, Date: new StarDate(data.season, data.date) }
        })
    }
    upcomingBirthdays = BirthDays.filter(function (birthday) {
        var diff = birthday.Date.value - CurrentDate.value;
        return diff < 16 && diff >= 0;
    })


    var birthdayText = document.querySelector("[data-foreach=birthdays]");
    birthdayText.innerHTML = "";
    for (i of upcomingBirthdays) {
        var elem = document.createElement('li');
        elem.innerHTML = i.Name + " " + i.Date;
        birthdayText.appendChild(elem);
    }

}

function BindButtons() {
    document.querySelector('[data-click=nextDay').addEventListener("click", NextDay);
}

function NextDay() {
    console.log("advancing day")
    CurrentDate.AddDay(1);
    var datespot = document.querySelector('[data-bind=currentDate]');
    datespot.innerHTML = CurrentDate;
    LoadBirthdays();
}



function main() {

    Load();

    // Current date
    // show upcoming birthdays
    // show crop time frames
    // show tool upgrade counters

}

main();
