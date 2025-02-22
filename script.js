const rosterMap = new Map();

async function doStuff() {

    var req1 = await getSheetData({
        // sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
        sheetID: "1FN0yk0zED5yKRGQDAmmHcf4AnQWhkWSNcVYMCtoO6Ck",
        // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
        sheetName: "Roster",
        query: "SELECT *",
        callback: handleRoster,
    });





}


const handleRoster = (sheetData) => {
    for(const c of sheetData) {
        rosterMap.set(c[""], 0);
    }

    getSheetData({
            // sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
            sheetID: "1FN0yk0zED5yKRGQDAmmHcf4AnQWhkWSNcVYMCtoO6Ck",
            // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
            sheetName: "Form Responses 2",
            query: "SELECT *",
            callback: handleResponses,
    });
};

const handleResponses = (sheetData) => {
    for(const c of sheetData) {
        var recruiter = c["Were you recruited by a current club member? If so, what is their name?\n\n(FirstName, LastName) - Exactly as it appears in the Club Roster"].trim();
        var registrar = c["Name\n\nFirst Name, Last Name\n(Please remember to place a comma and a space between your first and last name!)"];
        if(recruiter === "") continue;
        if(recruiter === registrar) continue;
        if(!rosterMap.has(recruiter)) continue;
        rosterMap.set(recruiter, rosterMap.get(recruiter) + 1)


    }
    const recruiters = [];
    const numRecruits = [];

    for(const [name, num] of rosterMap) {
        var spaceIndex = name.indexOf(" ");
        var shortName = name.substring(0, spaceIndex-1) + " " + name.substring(spaceIndex + 1, spaceIndex + 2) + ".";

        recruiters.push(shortName);
        numRecruits.push(num);
    }


    for(var i = 0; i < recruiters.length - 1; i++) {
        var minIndex = i;
        for(var j = i + 1; j < recruiters.length; j++) {
            if(numRecruits[j] > numRecruits[minIndex])
                minIndex = j;
        }
        var tempName = recruiters[i];
        var tempNum = numRecruits[i];

        recruiters[i] = recruiters[minIndex];
        numRecruits[i] = numRecruits[minIndex];

        recruiters[minIndex] = tempName;
        numRecruits[minIndex] = tempNum;
    }
    for(var i = 0; i < recruiters.length; i++) {
        document.getElementById("rosterList").innerHTML += "<li>" + "<b>" + (i+1) + ". </b>" + recruiters[i] + " <br> " + numRecruits[i] + "</li>";
    }

};




