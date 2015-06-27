$(document).ready(function() {
    // createImages()
  })
$('.btn').on('click',function(e){
  e.preventDefault()
  if ($(this).hasClass("active")){
    $(this).addClass("active")
  } else {
    $(this).removeClass("active")
  }
})




var createImages = function(){
  for (var i = 3; i <= 62; i++) {
    if (i == 34 || i == 49 || i == 18) { continue; }
    var imgNumber = formatI(i)
    var newDiv = document.createElement('div')
    var newImg = document.createElement('img')
    newDiv.className = 'col-lg-4 col-md-4 col-sm-6 col-xs-12 camper picture-item'
    newDiv   = setTitle(i,newDiv)
    newDiv = setFocus(i,newDiv)
    newImg.className = 'img-responsive round'
    newImg.src = "img/Meet our Designcampers S15 with Sections NEW-page-0"+imgNumber+".jpg"
    newDiv.appendChild(newImg)
    var workSection = $('#campers-holder')
    workSection.append(newDiv)
  }
}
var setFocus = function(number,div){
  var fedArray = [3,7,12,15,19,21,28,33,38,39,42,60,61]
  var visArray =[4,9,14,16,22,23,27,29,31,35,37,43,44,45,50,54]
  var uxArray =[5, 6,8,10,11,13,17,25,26,30,32,41,46,48,51,52,53,56,58,62]
  var plmArray =[20,59]
  var resArray =[24,36,40,47,55,57]
  if (fedArray.indexOf(number)>=0) {
    div.dataset['focus'] = "fed"
  } else if (resArray.indexOf(number)>=0){
    div.dataset['focus'] = "research"
  } else if (visArray.indexOf(number)>=0){
    div.dataset['focus'] = "vis"
  } else if (uxArray.indexOf(number)>=0){
    div.dataset['focus'] = "ux"
  } else {
    div.dataset['focus'] = "plm"
  }
  return div
}
var setTitle = function(number,div){
  if (number >= 3 && number <=17) {
    div.dataset['section'] = "yellow"
  } else if (number > 18 && number <= 33){
    div.dataset['section'] = "blue"
  } else if (number > 33 && number <= 48){
    div.dataset['section'] = "green"
  } else {
    div.dataset['section'] = "red"
  }
  return div
}
var formatI = function(number){
  var result = '0'
  if (number < 10){
    result+=number
  } else{
    result = String(number)
  }
  return result 
}



