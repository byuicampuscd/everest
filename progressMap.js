/*jslint plusplus: true, browser: true, devel: true */
/*global SVG*/
var progressMap = (function () {
   "use strict";
   /* beautify preserve:start */
   //this is the locations of the badges on the map and other settings
   var pics = [
      {fileName: 'percentBadge05.png',  x: 400,   y: 670, dx: 0, dy: 0, scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge10.png',  x: 400,   y: 590, dx: 0, dy: 0,   scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge15.png',  x: 500,  y: 610, dx: 0,  dy: 0,   scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge20.png',  x: 500,  y: 515, dx: 0,  dy: 0, scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge25.png',  x: 600,  y: 535, dx: 0,  dy: 0,   scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge30.png',  x: 680,  y: 500,  dx: 0,  dy: 0,  scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge35.png',  x: 640,  y: 420, dx: 0,  dy: 0,   scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge40.png',  x: 730,  y: 470,  dx: 0,  dy: 0,  scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge45.png',  x: 690,  y: 395,  dx: 0,  dy: 0,  scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge50.png',  x: 770,  y: 380, dx: 0,  dy: 0,   scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge55.png',  x: 750,  y: 290, dx: 0,  dy: 0, scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge60.png',  x: 830,  y: 320, dx: 0,  dy: 0, scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge65.png',  x: 840,  y: 270, dx: 0,  dy: 0,   scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge70.png',  x: 765,  y: 235, dx: 0,  dy: 0, scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge75.png',  x: 820,  y: 170,  dx: 0,  dy: 0,  scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge80.png',  x: 725,  y: 195,  dx: 0,  dy: 0,  scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge85.png',  x: 675,  y: 175, dx: 0,  dy: 0,   scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge90.png',  x: 625,  y: 145, dx: 0,  dy: 0, scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge95.png',  x: 590,  y: 100, dx: 0,  dy: 0,   scalePic: 0.15, animateScale: 2},
      {fileName: 'percentBadge100.png', x: 550, y: 100,  dx: 0,  dy: 0,  scalePic: 0.25, animateScale: 2}
   ],
      backgroundPic = {
         fileName: 'everest.jpg',
         width: 1104,
         height: 850
      },
      pathSettings = {
         data: "M359.7,667.8l30.9-34.8l23.7-11.6h14.1l11.1-8.6l14.1-20.2l63-34.3l3.1-12.1l33-22.7l20.2-18.8c0,0,51.7-20,60.4-22.1l17.3-5.5l10.8-10.1l-15.4-4.5l24.4-8.6l17.1-2l16-13.4v-4.4h10.6c0,0,8.1-13.1,13.1-14.5l4-10l-8.1-13.1c0,0,10.1-36.6,16.9-43l10.8-5l3.5-17.5h10.1v-6l35.8-24.9l9.1-18l-13.1-7.9l9.1-4.7l-9.1-6l13.1-5.5l-9.1-5.5l12.1-6.2l-13.1-9.9l15.6-7.4l-13.1-7.6l6.6-3.9l9.1-4l-14.1-1.3l-14.6-15.6h-8.6l-22.4-22.7l-32-9.1l-17.1-3.6l-4-12.2l-44.4-14.8L622.1,90l-40.4-35.8l-28.9-4.3",
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
//      document.getElementById("scale").value = i * percentComplete;

   }

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
