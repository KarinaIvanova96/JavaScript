var numberOfPeople,
    startDate,
    endDate,
    country,
    startDateTimestamp;

function setNumberOfPeople(scope) {
    numberOfPeople = scope.value;
    checkData();
}

function setStartDate(scope) {
    startDate = scope.value;

    var startDateArr = startDate.split("-"),
        startDateWithDefaultTime,
        newDate;

    startDateTimestamp = new Date(startDateArr[1] + "/" + startDateArr[2] + "/" + startDateArr[0]).getTime();
    startDateWithDefaultTime = startDateTimestamp + (7 * 24 * 60 * 60 * 1000);
    newDate = new Date(startDateWithDefaultTime);

    endDate = newDate.getFullYear() + '-' + ("0" + (newDate.getMonth() + 1)).slice(-2) + '-' + ("0" + newDate.getDate()).slice(-2);
    document.getElementById('endDate').value = endDate;

    checkData();
}

function setEndDate(scope) {
    endDate = scope.value;
    checkData();
}

function setCountry(scope) {
    country = scope.value;
    checkData();
}

function checkData() {
    if (numberOfPeople && startDate && endDate && country) {

        if (numberOfPeople <= 0) {
            document.getElementById('result').innerHTML = 'Вы ввели неверное количество людей';
            return;
        }

        var endDateArr = endDate.split("-"),
            endDateTimestamp = new Date(endDateArr[1] + "/" + endDateArr[2] + "/" + endDateArr[0]).getTime(),
            dayCount;

        dayCount = (endDateTimestamp - startDateTimestamp) / 1000 / 60 / 60 / 24;

        if (dayCount <= 0) {
            document.getElementById('result').innerHTML = 'Вы ввели неверное количество дней';
            return;
        } else if (dayCount < 5) {
            document.getElementById('result').innerHTML = 'Минимальное количество дней - 5';
            return;
        }

        calcPrice(numberOfPeople, dayCount, country);
    }
}

function calcPrice(numberOfPeople, dayCount, country) {
    var pricePerDay, discount = 0, text;

    switch (country) {
        case 'Египет':
            pricePerDay = 50;
            break;
        case 'Турция':
            pricePerDay = 75;
            break;
        case 'Болгария':
            pricePerDay = 90;
            break;
    }

    if (dayCount >= 10) {
        discount = 10;
    }

    text = 'Стоимость поездки: ' + (numberOfPeople * dayCount * pricePerDay) / 100 * (100 - discount) + ' зимбабвийских долларов';
    if (discount) {
        text += '<br/> Ваша скидка: ' + discount + '%';
    }

    document.getElementById('result').innerHTML = text;
}