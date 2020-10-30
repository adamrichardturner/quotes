function loadJSON(callback) {
    let leaders = new XMLHttpRequest();
    leaders.overrideMimeType("application/json");
    leaders.open('GET', 'leaders.json', true);
    leaders.onreadystatechange = function () {
        if (leaders.readyState == 4 && leaders.status == "200") {
            callback(leaders.responseText);
        }
    };
    leaders.send(null);
}

function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        var leadersObj = JSON.parse(response);
        return leadersObj;
    });
}

let leaders = init();
console.log(leaders[0].text);