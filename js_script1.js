// user input for target duration
var hoursTarget = document.getElementById("hourTarget");
var minTarget = document.getElementById("minTarget");
var secTarget = document.getElementById("secTarget");
var frTarget = document.getElementById("frTarget");

// user input for Part 1
var hours1 = document.getElementById("hour1");
var min1 = document.getElementById("min1");
var sec1 = document.getElementById("sec1");
var fr1 = document.getElementById("fr1");

// user input for Part 2
var hours2 = document.getElementById("hour2");
var min2 = document.getElementById("min2");
var sec2 = document.getElementById("sec2");
var fr2 = document.getElementById("fr2");

// user input for Part 3
var hours3 = document.getElementById("hour3");
var min3 = document.getElementById("min3");
var sec3 = document.getElementById("sec3");
var fr3 = document.getElementById("fr3");

// user input for Part 4
var hours4 = document.getElementById("hour4");
var min4 = document.getElementById("min4");
var sec4 = document.getElementById("sec4");
var fr4 = document.getElementById("fr4");

// total form (yellow)
var totalHr = document.getElementById("totalHr");
var totalMin = document.getElementById("totalMin");
var totalSec = document.getElementById("totalSec");
var totalFr = document.getElementById("totalFr");

// select refresh button
var refresh = document.getElementById("refresh");

//frame rate variables
var framesValue = 25;


//making sure result is returned as a number and a string
function getValue(input){
  var result = parseInt(input.value, 10);
  if (isNaN(result) ){
  	return 0;
  } else {
    return result;
  }
}

//sets a number value into input form 
function setValue(input, num){
  input.value = num;
}

// converts timecode to frames (number number number number -> number)
function timecodeToFrames(hours, mins, seconds, frames){
  var convertHoursToFrames = hours * 60 * 60* 25;
  var convertMinsToFrames = mins * 60 * 25;
  var convertSecsToFrames = seconds * 25;
  return convertHoursToFrames + convertMinsToFrames + convertSecsToFrames + frames;
}  


// converts frames to a timecode and returns an array (number -> number number number number)
function framesToTimecode(totalFrames){
  var frames = totalFrames % 25;
  var seconds = Math.floor(totalFrames / 25) % 60;
  var minutes = Math.floor(totalFrames /60 / 25) % 60;
  var hours = Math.floor(totalFrames / 60 / 60 / 25); 
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

  //get user target duration values 
  var ht = getValue(hourTarget);
  var mt = getValue(minTarget);
  var st = getValue(secTarget);
  var ft = getValue(frTarget);

  //get part 1 values
  var h1 = getValue(hours1);
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
  var f4 = getValue(fr4);

  //converts parts 1-4 from timecode to frames 
  var tc1 = timecodeToFrames(h1, m1, s1, f1);
  var tc2 = timecodeToFrames(h2, m2, s2, f2); 
  var tc3 = timecodeToFrames(h3, m3, s3, f3); 
  var tc4 = timecodeToFrames(h4, m4, s4, f4);

  //converts target timecode into frames
  var targetTC = timecodeToFrames(ht, mt, st, ft);

  //adds the totals of all parts (in frames) and returns result as an array
  var totalArray = framesToTimecode(tc1 + tc2 + tc3 + tc4); 

  // subtracts the target timecode from the total duration (pts 1-4) !!not in use!!
  var diffArray = framesToTimecode(targetTC - (tc1 + tc2 + tc3 + tc4)); 

  //sets the value of the 'totalArray' elements into the (yellow) total form
  setValue(totalHr, totalArray[0]);
  setValue(totalMin, totalArray[1]);
  setValue(totalSec, totalArray[2]);
  setValue(totalFr, totalArray[3]);

  //calculates if total duration is over/under and returns the difference
  function difference(num1, num2){  
    var diffOfTotalAndTarget = Math.abs(totalDur - targetTC);
    var diffOfTotalAndTargetArray = framesToTimecode(diffOfTotalAndTarget)

    //OVER (- orange)
    if(targetTC < totalDur){
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
    }else if(targetTC  > totalDur){
      diffOfTotalAndTarget = (targetTC - totalDur);
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
  var totalDur = tc1 + tc2 + tc3 + tc4; 
  var targetTC ;
  difference(targetTC , totalDur);
}

//jQuery
$(document).ready(function(){
  $ ('#calcWrapper').draggable();
  $ ('#tabsWrapper_help').draggable();

  //??? clear all values
  $ ('#refresh').on("click", function(){
    $('#hourTarget, #minTarget, #secTarget, #frTarget, #hour1, #hour2, #hour3, #hour4, #min1, #min2, #min3, #min4, #sec1, #sec2, #sec3, #sec4, #fr1, #fr2, #fr3, #fr4, #totalHr, #totalMin, #totalSec, #totalFr, #diffHr, #diffMin, #diffSec, #diffFr').val("");
  })  
  $ ('#helpBox').hide();

  $ ('#helpLabel').click(function(){
    $ ('#helpBox').show("drop", 500);
  });

  $ ('.close').click(function(){
    $ ('#helpBox').hide("drop", 500);
  });
   
});

