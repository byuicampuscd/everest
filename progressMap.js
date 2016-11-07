/*jslint plusplus: true, browser: true, devel: true */
/*global SVG*/
var progressMap = (function () {
   "use strict";
   /* beautify preserve:start */
   //this is the locations of the badges on the map and other settings
   var pics = [
      {fileName: 'percentBadge05.png',  x: 88,   y: 301, dx: 50, dy: -50, scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge10.png',  x: 47,   y: 163, dx: 50, dy: 0,   scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge15.png',  x: 174,  y: 133, dx: 0,  dy: 0,   scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge20.png',  x: 209,  y: 303, dx: 0,  dy: -50, scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge25.png',  x: 343,  y: 226, dx: 0,  dy: 0,   scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge30.png',  x: 256,  y: 47,  dx: 0,  dy: 50,  scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge35.png',  x: 357,  y: 124, dx: 0,  dy: 0,   scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge40.png',  x: 437,  y: 47,  dx: 0,  dy: 50,  scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge45.png',  x: 545,  y: 69,  dx: 0,  dy: 30,  scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge50.png',  x: 450,  y: 171, dx: 0,  dy: 0,   scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge55.png',  x: 483,  y: 282, dx: 0,  dy: -30, scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge60.png',  x: 584,  y: 272, dx: 0,  dy: -20, scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge65.png',  x: 624,  y: 169, dx: 0,  dy: 0,   scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge70.png',  x: 715,  y: 265, dx: 0,  dy: -15, scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge75.png',  x: 762,  y: 77,  dx: 0,  dy: 20,  scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge80.png',  x: 884,  y: 86,  dx: 0,  dy: 10,  scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge85.png',  x: 838,  y: 210, dx: 0,  dy: 0,   scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge90.png',  x: 938,  y: 292, dx: 0,  dy: -40, scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge95.png',  x: 970,  y: 147, dx: 0,  dy: 0,   scalePic: 0.29, animateScale: 2},
      {fileName: 'percentBadge100.png', x: 1005, y: 47,  dx: 0,  dy: 50,  scalePic: 0.29, animateScale: 2}
   ],
      backgroundPic = {
         fileName: 'InternHoursBG.png',
         width: 1104,
         height: 350
      },
      pathSettings = {
         data: "M49,349.9C34.7,335.3,11.7,206.3,118.7,194c0,0,43.5-9.5,78.7,30c3.4,3.8,12.5,19.1,24,29.3c15,13.4,31,8.3,31,8.3l21.7-1.3c0,0,28.7,3.6,15.1-28.7c-2.5-5.8-8.8-19-8.8-19s-3.6-7.9-10.3-13.7c-6.5-5.6-15.7-22.2,0.5-24.8c17.3-2.8,41-9.3,20.8-48.9C270.7,84.8,313.3,67,325,65c15.8-2.6,31-1.8,88.7,30c6.9,3.8,17.5,12.9,60,20.3c46.7,8.2,55,27.3,58.1,40.3c2.3,9.7,5.2,22.2-19.8,39c-25.1,17-29.2,42.7,20.4,31.3c10.3-2.3,26-9,32.1-9.7c18.3-2.2,21.4-3.5,46.5,7c31.7,13.3,39.7,15.7,39.7,15.7s26.7,9.8,27.3-18c0.4-17.8-2.5-35.7,27.3-43c33.8-8.3,49.4-21.4,59.3-30c28.4-24.7,31.5-27.1,46.4-28.8c3.9-0.4,10.5,0.1,16.5,0.5c13.9,1,26.6,7.1,44.6,32.4c27.8,39,38.4,66.3,70.5,61.9c37.2-5.1,43.9,11.9,44.3,34.3c0.2,8.9,0.9,15.3,0.5,20c-0.8,9.8,2.2,19.4,7.5,27.7c13.8,21.4,56.2,23.2,52-20.4c-0.4-3.8-4.5-17-7.7-29.7c-1.8-7.2-5.4-21.2,5.7-29.3c6-4.4,8.5-2.6,15.3-13.6c7.1-11.4,6.7-22.1-7.3-22.4c-8.9-0.2-13.1-0.2-14.9-0.1c-0.7,0-1.3,0.1-2,0.2c-2.5,0.5-13.5-3.7-11.4-29.2c1.5-17.9,12-41.7,18-62.3s46-67,51-69.7",
         cssClass: "progressMapPath",
         style: "fill:none;stroke:#E71E25;stroke-width:4;stroke-miterlimit:10;"
      },
      picLocation = "pictures/",
      pathLenth = 0,
      savedDivId;
/* beautify preserve:end */

   function makeBadges(draw, picIn, counter) {

      var image, groupMe;
      image = draw.image(picLocation + picIn.fileName).loaded(function (loader) {
         this.size(loader.width, loader.height);
         this.center(0, 0);
         this.scale(picIn.scalePic, picIn.scalePic);
      });

      //move the group and then add the image
      groupMe = draw.group().center(picIn.x, picIn.y).add(image);
      groupMe.attr("id", 'pic' + counter);
      groupMe.hide();

      groupMe.on('goBackSmall', function () {

         var startOpacity = this.opacity(),
            startScale = this.transform('scaleX');
         this.animate(700).move(picIn.x, picIn.y).during(function (pos, morph) {
            this.opacity(morph(startOpacity, 1));
            this.scale(morph(startScale, 1));
         });
      });

      groupMe.mouseout(function () {
         this.fire("goBackSmall");
      });

      groupMe.mouseover(function () {
         var startScale = this.transform('scaleX');
         if (this.transform("scaleX") === 1) {
            this.front().animate(500).dmove(picIn.dx, picIn.dy).during(function (pos, morph) {
               this.scale(morph(1, picIn.animateScale));
            });
         }
      });

   }

   function changeIt(numIn) {

      var path = document.querySelector("#" + savedDivId + " ." + pathSettings.cssClass),
         percentComplete = numIn / 100,
         picsToShow;

      //update the line
      path.style.strokeDashoffset = pathLenth * (1 - percentComplete);

      //update the pictures
      picsToShow = Math.floor(pics.length * percentComplete);
      pics.forEach(function (picIn, i) {
         var pic = SVG.get('pic' + i);
         if (i < picsToShow && !pic.visible()) {
            pic.front().center(552, 150).scale(2).opacity(0);
            pic.show();
            pic.fire('goBackSmall');
         } else if (i >= picsToShow) {
            pic.hide();
         }

      });
   }

   function fillLine(percentComplete) {

      percentComplete /= 100;
      var steps = 100,
         length = 6000 * percentComplete,
         timeChunk = length / steps,
         i;

      for (i = 1; i <= steps; ++i) {
         window.setTimeout(changeIt, timeChunk * i, i * percentComplete);

      }
      document.getElementById("scale").value = i * percentComplete;

   }
   /*
      function puter() {
         //get
         var xIn = document.getElementById("xIn").value,
            yIn = document.getElementById("yIn").value,
            pic = SVG.get("thisDisk");
         //put
         document.getElementById("xOut").innerHTML = xIn;
         document.getElementById("yOut").innerHTML = yIn;
         pic.move(xIn, yIn);
      }
   */

   function mapStartUp(divIdIn, staringPathPercent) {
      var draw, path, i;
      //save for later
      savedDivId = divIdIn;

      //get going
      draw = SVG(divIdIn).size(backgroundPic.width, backgroundPic.height);

      //background
      draw.image(picLocation + backgroundPic.fileName);

      //line
      draw.path(pathSettings.data)
         .attr("class", pathSettings.cssClass)
         .attr("style", pathSettings.style);

      //setup line
      path = document.querySelector("#" + divIdIn + " ." + pathSettings.cssClass);
      pathLenth = path.getTotalLength();
      path.style.strokeDasharray = pathLenth;

      //make the badges
      for (i = 0; i < pics.length; ++i) {
         makeBadges(draw, pics[i], i);
      }

      //set progress to starting percent
      fillLine(staringPathPercent);

   }

   return {
      startup: mapStartUp,
      update: changeIt
   };

}());
