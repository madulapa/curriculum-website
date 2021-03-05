function calculateCommRating() {
    //for any amount of the energy sources, same change to comm rating
    var inputs = document.getElementById("inputs").elements;
    var total = 50;
    var numPlants = 0;
    var ratingVals = [-2, -1, -2, -1, 4, 4, 2, 5, 3, 5, -5, -4, 5, 2, 4, 2, 5, 1];
    //var maxEnergyVals = [3500000000, 66000000, 580000000,5000000000, 1460000, 6000000, 420000000, 2000000000];
    var minEnergyVals = [700000000, 13200000, 1160000000, 1000000000, 292000, 1200000, 840000000, 400000000];

    for (i = 0; i < inputs.length - 1; i++) {

        if (i <= 8) {
            /*numPlants = inputs[i].value / minEnergyVals[i];
            console.log("num plants", numPlants);
            if (numPlants <= 0)
                continue;
            else
                total += parseInt(numPlants) * ratingVals[i];*/
            if (inputs[i].value != 0)
                total += ratingVals[i];
        }
        else
            total += parseInt(inputs[i].value) * ratingVals[i];


    }
    if (total > 100) total = 100;
    event.preventDefault();
    $('#communityRating').width(total + "%").attr('aria-valuenow', total);
    $('#communityRating').text(total.toString() + " points");
}

function calculateBudget() {
    var inputs = document.getElementById("inputs").elements;

    var total = 1190000000;
    var energy = 0;
    var waste = 0;
    var transpo = 0;
    var costs = [0.03, 0.21, 0.05, 0.02, 0.06, 0.05, 0.05, 0.01, 12000, 9000000, 84000000, 150000000, 5000000, 40000000, 10000, 80000, 600000000, 4000000];
    for (let i = 0; i < inputs.length - 1; i++) {
        if (i < 9) {
            energy += parseFloat(inputs[i].value) * costs[i];
        }
        else if (i < 14) {
            waste += parseFloat(inputs[i].value) * costs[i];
        }
        else if (i < 18) {
            transpo += parseFloat(inputs[i].value) * costs[i];
        }
        total -= parseFloat(inputs[i].value) * costs[i];


    }
    if (total < 0) {
        alert("You are above your budget, make some changes!");
    }
    //have to scale down total bc width is only out of 100
    var energyWidth = energy / 1190000000 * 100;
    var wasteWidth = waste / 1190000000 * 100;
    var transpoWidth = transpo / 1190000000 * 100;

    event.preventDefault();
    $("#total_budget").text(total);

    $('#energy').width(energyWidth + "%").attr('aria-valuenow', energyWidth);
    $('#energy').text("$" + energy.toString());
    $('#energyValue').text("$" + energy.toLocaleString('en-US').toString());

    $('#waste').width(wasteWidth + "%").attr('aria-valuenow', wasteWidth);
    $('#waste').text("$" + waste.toString());
    $('#wasteValue').text("$" + waste.toLocaleString('en-US').toString());

    $('#transpo').width(transpoWidth + "%").attr('aria-valuenow', transpoWidth);
    $('#transpo').text("$" + transpo.toString());
    $('#transpoValue').text("$" + transpo.toLocaleString('en-US').toString());
}

function calculateCO2() {
    //for energy: add it from 0 
    //for waste: decrease from 450000000
    //for transportation: starting val is 77280000

    var inputs = document.getElementById("inputs").elements;
    //0 - 8 == energy
    //9 - 13 = waste
    // 14 - 17 = transpo
    //------WASTE
    /*
    starting CO2 emissions for waste is 450,000,000 * num sanitary landfills
    for every recycle plant cut it by 1/4
    for every incineration plant cut it by 3/20
    for every composting plant cut it by 3/10
    for every RRP cut it by 1/10
    */
    //------TRANSPO
    /*
    for every bust stop decrease by 1/3
    for every bicycle lane decrease by 1/10
    for every metro decrease by 1/2
    
    */

    var ghg = [1.8, 1.9, 1.0, 0.02, 0.10, 0.02, 0.08, 0.05, 0.08, 0.75, 450000000, 0.85, 0.7, 0.9, 0.67, 0.9, 0.5];
    var wasteEmissions = inputs[10].value * ghg[10];

    var totalEmissionsWithoutWaste = 7727280000 - wasteEmissions;
    var initialEnergyEmissions = 7200000000;
    var energyEmissions = 0;
    var transpoEmissions = 77280000;

    for (let i = 0; i < inputs.length - 1; i++) {
        //energy    
        if (i <= 8) {
            energyEmissions += inputs[i].value * ghg[i];
            initialEnergyEmissions -= inputs[i].value * ghg[0];
        }
        //waste
        else if (i > 9 && i <= 13) {
            if (i == 10)
                continue;
            else {
                var num = inputs[i].value;

                while (num > 0) {
                    wasteEmissions *= ghg[i];
                    num--;
                }
            }
        }
        //transportation
        else if (i > 13 && i < 17) {
            var num = inputs[i].value;
            while (num > 0) {
                transpoEmissions *= ghg[i];
                num--;
            }
        }

    }
    var total = wasteEmissions + energyEmissions + initialEnergyEmissions + transpoEmissions;
    //console.log("total waste: ", totalEmissionsWithoutWaste);
    var totalPercent = parseInt((total / 7727280000) * 100);


    event.preventDefault();
    $('#carbonEmissions').width(totalPercent + "%").attr('aria-valuenow', totalPercent);
    $('#carbonEmissions').text(total.toLocaleString('en-US').toString() + " lbs of C");

}

function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired
    var a = amount.split('.', 2)
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) { return ''; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if (d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
}