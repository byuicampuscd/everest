window.addEventListener('load', function () {

    function loadEverest(pointAccum) {
        progressMap.startup("everest", pointAccum);
    }

    $.getJSON('/d2l/api/le/1.8/9733/grades/values/myGradeValues/', function (grades) {

        var pointAccum = 0,
            gradeArray = grades;

        for (var i = 0; i < gradeArray.length; i++) {
            var temp = gradeArray[i].PointsNumerator;
            pointAccum += temp;
        }

        console.log("Total Points ", pointAccum);
        loadEverest(pointAccum);
    });

});
