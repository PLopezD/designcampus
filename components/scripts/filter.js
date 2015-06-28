$(document).ready(function() {
  Exports.Modules.Gallery.init();
})

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
    $loco = $('.js-loco');
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



















