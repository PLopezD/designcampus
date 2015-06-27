(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function() {
    // createImages()
    Exports.Modules.Gallery.init();
})

var Exports = {
  Modules : {}
};

Exports.Modules.Gallery = (function($, undefined) {
  var $grid,
  $section,
  $focus,
  section = [],
  focus = [],

  // Using shuffle with specific column widths
  columnWidths = {
    1170: 70,
    940: 60,
    724: 42
},
gutterWidths = {
    1170: 30,
    940: 20,
    724: 20
},

init = function() {
    setVars();
    initFilters();
    initShuffle();
},

setVars = function() {
    $grid = $('.js-shuffle');
    $section = $('.js-focus');
    $focus = $('.js-section');
},

initShuffle = function() {
    // instantiate the plugin
    $grid.shuffle({
      speed : 250,
      easing : 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart

      columnWidth: function( containerWidth ) {
        var colW = columnWidths[ containerWidth ];

        // Default to container width
        if ( colW === undefined ) {
          colW = containerWidth;
      }
      return colW;
  },
  gutterWidth: function( containerWidth ) {
    var gutter = gutterWidths[ containerWidth ];

        // Default to zero
        if ( gutter === undefined ) {
          gutter = 0;
      }
      return gutter;
  }
});
},

initFilters = function() {
    // section
    $section.find('input').on('change', function() {
      var $checked = $section.find('input:checked'),
      groups = [];
      console.log("launching focus?")
      // At least one checkbox is checked, clear the array and loop through the checked checkboxes
      // to build an array of strings
      if ($checked.length !== 0) {
        $checked.each(function() {
            groups.push(this.value);
        });
    }
    section = groups;

    filter();
});

    // focus
    $focus.find('button').on('click', function() {
      var $this = $(this),
      $alreadyChecked,
      checked = [],
      active = 'active',
      isActive;

      // Already checked buttons which are not this one
      $alreadyChecked = $this.siblings('.' + active);

      $this.toggleClass( active );

      // Remove active on already checked buttons to act like radio buttons
      if ( $alreadyChecked.length ) {
        $alreadyChecked.removeClass( active );
    }

    isActive = $this.hasClass( active );

    if ( isActive ) {
        checked.push( $this.data( 'filterValue' ) );
    }

    focus = checked;

    filter();
});
},

filter = function() {
    if ( hasActiveFilters() ) {
      $grid.shuffle('shuffle', function($el) {
        return itemPassesFilters( $el.data() );
    });
  } else {
      $grid.shuffle( 'shuffle', 'all' );
  }
},

itemPassesFilters = function(data) {

    // If a section filter is active
    if ( section.length > 0 && !valueInArray(data.focus, section) ) {
      return false;
  }

    // If a focus filter is active
    if ( focus.length > 0 && !valueInArray(data.section, focus) ) {
      return false;
  }

  return true;
},

hasActiveFilters = function() {
    return focus.length > 0 || section.length > 0;
},

valueInArray = function(value, arr) {
    return $.inArray(value, arr) !== -1;
};


return {
    init: init
};
}(jQuery));




















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




},{}]},{},[1])