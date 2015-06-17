


//making sure result is returned as a number and a string
function getValue(input){
  var result = parseInt(input.value, 10);
  if (isNaN(result) ){
    return 0;
  } else {
    return result;
  }
}

function addValues(total, value){
  return total + value;
}



// user input for target duration
var hoursTarget = document.getElementById("hourTarget");
var minTarget = document.getElementById("minTarget");
var secTarget = document.getElementById("secTarget");
var frTarget = document.getElementById("frTarget");

var frameSelect = document.getElementById('frameSelect');

// // user input for Part 1
// var hours1 = document.getElementById("hour1");
// var min1 = document.getElementById("min1");
// var sec1 = document.getElementById("sec1");
// var fr1 = document.getElementById("fr1");

// // user input for Part 2
// var hours2 = document.getElementById("hour2");
// var min2 = document.getElementById("min2");
// var sec2 = document.getElementById("sec2");
// var fr2 = document.getElementById("fr2");

// // user input for Part 3
// var hours3 = document.getElementById("hour3");
// var min3 = document.getElementById("min3");
// var sec3 = document.getElementById("sec3");
// var fr3 = document.getElementById("fr3");

// // user input for Part 4
// var hours4 = document.getElementById("hour4");
// var min4 = document.getElementById("min4");
// var sec4 = document.getElementById("sec4");
// var fr4 = document.getElementById("fr4");

// total form (yellow)
var totalHr = document.getElementById("totalHr");
var totalMin = document.getElementById("totalMin");
var totalSec = document.getElementById("totalSec");
var totalFr = document.getElementById("totalFr");

// select refresh button
var refresh = document.getElementById("refresh");

//frame rate variables
var framesValue = 25;




//sets a number value into input form 
function setValue(input, num){
  input.value = num;
}

function setTargetValues(hrs,mins,secs,fr,frSelect){
    setValue(hoursTarget, hrs);
    setValue(minTarget, mins);
    setValue(secTarget, secs); 
    setValue(frTarget, fr);
    setValue(frameSelect, frSelect); 
  }

// converts timecode to frames (number number number number -> number)
function timecodeToFrames(hours, mins, seconds, frames){
  var convertHoursToFrames = hours * 60 * 60* framesValue;
  var convertMinsToFrames = mins * 60 * framesValue;
  var convertSecsToFrames = seconds * framesValue;
  return convertHoursToFrames + convertMinsToFrames + convertSecsToFrames + frames;
}  


// converts frames to a timecode and returns an array (number -> number number number number)
function framesToTimecode(totalFrames){
  var frames = Math.floor(totalFrames % framesValue);
  totalFrames = totalFrames - frames;
  var totalSeconds = totalFrames / framesValue;
  var seconds = Math.floor(totalFrames / framesValue) % 60;
  var minutes = Math.floor(totalFrames /60 / framesValue) % 60;
  var hours = Math.floor(totalFrames / 60 / 60 / framesValue); 
  return [hours , minutes, seconds, frames];
} 

function compute(){
  // ??????????get frame rate choice 
  function changeFrameRate(){
  if (document.getElementById('frameSelect').value == '25'){
    framesValue = 25;     
  }
if (document.getElementById('frameSelect').value == '29.97'){
    framesValue = 29.97;    
  }
 if (document.getElementById('frameSelect').value == '30'){
    framesValue = 30;     
  }
 if (document.getElementById('frameSelect').value == '24'){
    framesValue = 24; 
  }
}
  changeFrameRate();



  var hourEls = $('.hours').toArray();
  var minsEls = $('.mins').toArray();
  var secsEls = $('.secs').toArray();
  var framesEls = $('.frames').toArray();

  var hourVals = hourEls.map(getValue);
  var minsVals = minsEls.map(getValue);
  var secsVals = secsEls.map(getValue);
  var framesVals = framesEls.map(getValue);

  var totalHours = hourVals.reduce(addValues, 0);
  var totalMins = minsVals.reduce(addValues, 0);
  var totalSecs = secsVals.reduce(addValues, 0);
  var totalFrames = framesVals.reduce(addValues, 0);

  //get user target duration values 
  var ht = getValue(hourTarget);
  var mt = getValue(minTarget);
  var st = getValue(secTarget);
  var ft = getValue(frTarget);

  //get part 1 values
 /* var h1 = getValue(hours1);
  var m1 = getValue(min1);
  var s1 = getValue(sec1);
  var f1 = getValue(fr1);

  //get part 2 values
  var h2 = getValue(hours2);
  var m2 = getValue(min2);
  var s2 = getValue(sec2);
  var f2 = getValue(fr2);

  //get part 3 values
  var h3 = getValue(hours3);
  var m3 = getValue(min3);
  var s3 = getValue(sec3);
  var f3 = getValue(fr3);

  //get part 4 values
  var h4 = getValue(hours4);
  var m4 = getValue(min4);
  var s4 = getValue(sec4);
  var f4 = getValue(fr4);*/

  //converts parts 1-4 from timecode to frames 
 /* var tc1 = timecodeToFrames(h1, m1, s1, f1);
  var tc2 = timecodeToFrames(h2, m2, s2, f2); 
  var tc3 = timecodeToFrames(h3, m3, s3, f3); 
  var tc4 = timecodeToFrames(h4, m4, s4, f4);*/

  var totalFrames = timecodeToFrames(totalHours, totalMins, totalSecs, totalFrames);

  //converts target timecode into frames
  var targetFrames = timecodeToFrames(ht, mt, st, ft);

  //adds the totals of all parts (in frames) and returns result as an array
  /*var totalArray = framesToTimecode(tc1 + tc2 + tc3 + tc4); */

  // subtracts the target timecode from the total duration (pts 1-4) 
  var totalArray = framesToTimecode(totalFrames);

  var diffArray = framesToTimecode(targetFrames - totalFrames); 

  //sets the value of the 'totalArray' elements into the (yellow) total form
  setValue(totalHr, totalArray[0]);
  setValue(totalMin, totalArray[1]);
  setValue(totalSec, totalArray[2]);
  setValue(totalFr, totalArray[3]);

  //calculates if total duration is over/under and returns the difference
  function difference(){  
    var diffOfTotalAndTarget = Math.abs(totalFrames - targetFrames);
    var diffOfTotalAndTargetArray = framesToTimecode(diffOfTotalAndTarget)

    //OVER (- orange)
    if(targetFrames < totalFrames){
      diffHr.style.color = "orange";
      diffMin.style.color = "orange";
      diffSec.style.color = "orange";
      diffFr.style.color = "orange";
      $('#overUnderBy').html("<p>You're <strong>OVER</strong></p>");
      setValue(diffHr, diffOfTotalAndTargetArray[0]);
      setValue(diffMin, diffOfTotalAndTargetArray[1]);
      setValue(diffSec, diffOfTotalAndTargetArray[2]);
      setValue(diffFr, diffOfTotalAndTargetArray[3]); 

    //UNDER (- red)    
    }else if(targetFrames  > totalFrames){
      diffOfTotalAndTarget = (targetFrames - totalFrames);
      diffHr.style.color = "#FF3333";
      diffMin.style.color = "#FF3333";
      diffSec.style.color = "#FF3333";
      diffFr.style.color = "#FF3333";
      $('#overUnderBy').html("<p>You're <strong>UNDER</strong></p>");
      setValue(diffHr, diffOfTotalAndTargetArray[0]);
      setValue(diffMin, diffOfTotalAndTargetArray[1]);
      setValue(diffSec, diffOfTotalAndTargetArray[2]);
      setValue(diffFr, diffOfTotalAndTargetArray[3]);     

    //Target is reached (green)
    }else{
      diffHr.style.color = "#66FF00";
      diffMin.style.color = "#66FF00";
      diffSec.style.color = "#66FF00";
      diffFr.style.color = "#66FF00";
      $('#overUnderBy').html("<p><strong>SPOT ON</strong> :-)</p>");
      setValue(diffHr, totalArray[0]);
      setValue(diffMin, totalArray[1]);
      setValue(diffSec, totalArray[2]);
      setValue(diffFr, totalArray[3]); 
    }  
  }
  //var totalDur = tc1 + tc2 + tc3 + tc4; 
  
  difference();
}

function cycleImages(){
      var $active = $('#background_cycler .active');
      var $next = ($('#background_cycler .active').next().length > 0) ? $('#background_cycler .active').next() : $('#background_cycler img:first');
      $next.css('z-index',2);//move the next image up the pile
    $active.fadeOut(1500,function(){//fade out the top image
    $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
      $next.css('z-index',3).addClass('active');//make the next image the top one
      });
    }




//jQuery
$(document).ready(function(){
  

  //clear all values
  $ ('#refresh').on("click", function(){
    $('input,select').val("");
  })  

  //HELPbox animation
  $ ('#helpLabel').click(function(){
    $ ('#helpBox').show("drop", 500);
    $(this).addClass('active');
    $('#templateLabel, #aboutLabel').removeClass('active');
    $ ('#templateBox, #aboutBox').hide("drop", 500);
  });


  //TEMPLATEbox animation
  $ ('#templateLabel').click(function(){
    $ ('#templateBox').show("drop", 500);
    $(this).addClass('active');
    $('#helpLabel, #aboutLabel').removeClass('active');
    $ ('#helpBox, #aboutBox').hide("drop", 500)
  });


  //ABOUTbox animation
  $ ('#aboutLabel').click(function(){
    $ ('#aboutBox').show("drop", 500);
    $(this).addClass('active');
    $('#helpLabel, #templateLabel').removeClass('active');
    $ ('#helpBox, #templateBox').hide("drop", 500);
  });


  // ??changes border to yellow on channel images when active????
  $ ('#channels').click(function(){
    $(this).addClass('active');
  });



  //CLOSE tab
  $ ('.close').click(function(){
    $ ('#helpBox, #templateBox, #aboutBox').hide("drop", 500);
    $('#helpLabel, #templateLabel, #aboutLabel').removeClass('active');
  });
  


  if ($(window).width() > "550"){
  $('#background_cycler').fadeIn(1500);//fade the background back in once all the images are loaded
      // run every 7s
      setInterval('cycleImages()', 7000);
      $ ('#calcWrapper').draggable();
  }



  //lock screen to landscape on phone ** not sute if this works!
  //screen.lockOrientation('portrait'); 


  //channel selects in templates tab

  $('.channel#itv').on('click', function(){
    $('#durationSelect').html("<h3>ITV</h3>");    
    $('.SelectorSets').removeClass('setActive');
    $('#SelectorsITV').addClass('setActive'); 
  }); 

  $('.channel#ch4').on('click', function(){
    $('#durationSelect').html('<h3>CHANNEL 4</h3><p>All parts to be as even as possible </br>For further info on running times, visit <a href="http://www.channel4.com/media/documents/commissioning/PROGRAMME%20MANAGEMENT/PROGRAMMERUNNINGTIMES.pdf" target="_blank">channel4.com</a></p>');     
    $('.SelectorSets').removeClass('setActive');
    $('#SelectorsCh4').addClass('setActive');    
  });

  $('.channel#ch5').on('click', function(){
    $('#durationSelect').html("<h3>CHANNEL 5</h3>");  
    $('.SelectorSets').removeClass('setActive');
    $('#SelectorsCh5').addClass('setActive');
  });

  $('.channel#sky').on('click', function(){
    $('#durationSelect').html("<h3>SKY (ONE, LIVING, ARTS, ATLANTIC)</h3>"); 
    $('.SelectorSets').removeClass('setActive');
    $('#SelectorsSky').addClass('setActive');
  }); 

  $('#addPartBtn').on('click', addPart);

  addPart();
  addPart();
   
 
  
}); //END of document.ready function


function createPart(partNumber){
  // create the section element
 var section = document.createElement("div");
 section.className = "section";

 // create the partName element
 var partName = document.createElement("div");
 partName.className = "partName";
 partName.textContent = "Part " + partNumber;

// Append the partName element to the section element.
 section.appendChild(partName);

 var form = document.createElement("form");
 form.className = "TC";

 // Listen for keyup events from the form (and elements within the form).
 form.onkeyup = function(){
  compute();
 }

 var inputHour = document.createElement("input");
 inputHour.className = "hours";
 inputHour.setAttribute("type", "tel");
 inputHour.setAttribute("placeholder", "hr");
 inputHour.setAttribute("maxlength", "2");

 var inputMinutes = document.createElement("input");
 inputMinutes.className = "mins";
 inputMinutes.setAttribute("type", "tel");
 inputMinutes.setAttribute("placeholder", "hr");
 inputMinutes.setAttribute("maxlength", "2");
 
 var inputSeconds = document.createElement("input");
 inputSeconds.className = "secs";
 inputSeconds.setAttribute("type", "tel");
 inputSeconds.setAttribute("placeholder", "hr");
 inputSeconds.setAttribute("maxlength", "2");
 
 var inputFrames = document.createElement("input");
 inputFrames.className = "frames";
 inputFrames.setAttribute("type", "tel");
 inputFrames.setAttribute("placeholder", "hr");
 inputFrames.setAttribute("maxlength", "2");

 form.appendChild(inputHour);
 form.appendChild(inputMinutes);
 form.appendChild(inputSeconds);
 form.appendChild(inputFrames);

 // Append the form to the setion.
 section.appendChild(form);

 // Return the completed section.
 return section;
}

function addPart(){
  var container = document.getElementById("calcHolderMid");
  var numParts = container.children.length;
  var part = createPart(numParts + 1);
  container.appendChild(part);
}


