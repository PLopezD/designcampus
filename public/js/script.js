(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

  var Exports = {
    Modules : {}
  };

  Exports.Modules.Gallery = (function($, undefined) {
    var $grid,
    $section,
    $focus,
    $loco,
    section = [],
    focus = [],
    loco = [],


    init = function() {
      setVars();
      initFilters();
      initShuffle();
    },

    setVars = function() {
      $grid = $('.js-shuffle');
      $section = $('.js-focus');
      $focus = $('.js-section');
      $loco = $('.js-loco');
    },

    initShuffle = function() {
    // instantiate the plugin
    $grid.shuffle({
      speed : 250,
      easing : 'cubic-bezier(0.165, 0.840, 0.440, 1.000)'
    });
  },

  initFilters = function() {
    // section
    $section.find('input').on('change', function() {
      var $checked = $section.find('input:checked'),
      groups = [];
      // At least one checkbox is checked, clear the array 
      // and loop through the checked checkboxes
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
    $loco.find('div').on('click', function() {
      console.log("locofind")
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

      loco = checked;

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
    // If a location filter is active
    if ( loco.length > 0 && !valueInArray(data.loco, loco) ) {
      return false;
    }

    return true;
  },

  hasActiveFilters = function() {
    return focus.length > 0 || section.length > 0 || loco.length > 0;
  },

  valueInArray = function(value, arr) {
    return $.inArray(value, arr) !== -1;
  };


  return {
    init: init
  };
}(jQuery));


// },{}]},{},[1])





$(document).ready(function() {
  createImages()
    // Exports.Modules.Gallery.init();

  })
$('.section_button').on('click',function(e){
  e.preventDefault()
  if ($(this).hasClass("active")){
    $(this).addClass("active")
  } else {
    $(this).removeClass("active")
  }
})
$('.loco').on('click',function(e){
  e.preventDefault()
  if ($(this).hasClass("active")){
    $(this).addClass("active")
  } else {
    $(this).removeClass("active")
  }
})

// $('#focus').on('click',function(e){
//   e.preventDefault()
//   if ($(this).hasClass("active")){
//     $(this).addClass("active")
//   } else {
//     $(this).removeClass("active")
//   }
// })

var createImages = function(){
  for (var i = 3; i <= 70; i++) {
    if (i == 14 || i == 28 || i == 43 || i == 56) { continue; }
    var imgNumber = formatI(i)
    var newDiv = document.createElement('div')
    var newImg = document.createElement('img')
    newDiv.className = 'col-lg-4 col-md-4 col-sm-6 col-xs-12 camper picture-item'
    newDiv   = setTitle(i,newDiv)
    newDiv = setFocus(i,newDiv)
    newDiv = setLoco(i,newDiv)
    newImg.className = 'img-responsive round'
    newImg.src = "public/img/meet_our_designcampers_f15_with_sections-final0"+imgNumber+".png"
    newDiv.appendChild(newImg)
    var workSection = $('#campers-holder')
    workSection.append(newDiv)
  }
  Exports.Modules.Gallery.init();

}
var setLoco = function(number,div){
  var nyArray = [40,42,45,46,47,48,55,56,57,58,61]
  if (number == 43 || number == 44) {
    div.dataset['loco'] = "ireland"
  } else if (nyArray.indexOf(number) !== -1){
    div.dataset['loco'] = "ny"
  } else {
    div.dataset['loco'] = "texas"
  }
  return div
}
var setFocus = function(number,div){
  var fedArray = [12,13,25,26,27,39,40,41,53,54,62]
  var visArray =[8,9,20,21,22,36,37,47,48,58,59,61,66,70]
  var uxArray =[3,4,5,6,7,15,16,17,18,19,29,30,31,32,33,34,35,44,45,46,49,50,51,57,60,63,64,65,67,68,69]
  var plmArray =[42,55]
  var resArray =[10,11,23,24,38,52]
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
  if (number >= 3 && number <=13) {
    div.dataset['section'] = "yellow"
  } else if (number > 14 && number <= 27){
    div.dataset['section'] = "blue"
  } else if (number > 27 && number <= 43){
    div.dataset['section'] = "red"
  } else if (number > 43 && number <= 55){
    div.dataset['section'] = "green"
  } else {
    div.dataset['section'] = "purple"
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