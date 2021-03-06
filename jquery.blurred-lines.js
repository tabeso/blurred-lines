/*
blurredLines jQuery Plugin v0.0.4 - Blur background images with ease
Release: 19/09/2013
Author: Jeremy Woertink
 
http://github.com/tabeso/blurredLines
 
Licensed under the WTFPL license: http://www.wtfpl.net/txt/copying/
*/

(function($, window, document) {
  var $this, methods, _firefox, _internals, _msie, _oldie, _opera, _settings, _svgSupport, _tmp_el, _webkit;
  $this = void 0;
  _settings = {
    blur: 10,
    opacity: 0.8
  };
  _tmp_el = document.createElement('div').style;
  _webkit = '-webkit-filter' in _tmp_el;
  _firefox = '-moz-filter' in _tmp_el;
  _opera = '-o-filter' in _tmp_el;
  _msie = '-ms-filter' in _tmp_el;
  _svgSupport = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0");
  _oldie = navigator.userAgent.match(/msie/ig) !== null;
  methods = {
    init: function(options) {
      $this = $(this);
      $.extend(_settings, options || {});
      $this.each(function(index, el) {
        var $blurBox, $elem, $svg, id;
        $elem = $(el);
        $elem.css('opacity', _settings.opacity);
        if (_webkit) {
          return $elem.css('-webkit-filter', "blur(" + _settings.blur + "px)");
        } else if (_firefox) {
          return $elem.css('-moz-filter', "blur(" + _settings.blur + "px)");
        } else if (_opera) {
          return $elem.css('-o-filter', "blur(" + _settings.blur + "px)");
        } else if (_msie) {
          return $elem.css('-ms-filter', "blur(" + _settings.blur + "px)");
        } else if (_oldie) {
          return $elem.css('filter', "progid:DXImageTransform.Microsoft.Blur(PixelRadius='" + _settings.blur + "')");
        } else if (_svgSupport) {
          $svg = _internals.generateSVG(index);
          $elem.append($svg);
          if ($elem.prop('id') === '') {
            $elem.prop('id', "xBlurredContainer" + index);
          }
          id = $elem.prop('id');
          $blurBox = $("<div id='xBlurredMask" + index + "'></div>");
          $blurBox.css({
            background: "-moz-element(#" + id + ") no-repeat scroll 0 0 transparent",
            filter: "url(#f" + index + ")",
            width: "100%",
            height: "100%",
            top: "0",
            position: "absolute"
          });
          return $elem.append($blurBox);
        } else {
          return _internals.log('No clue how to blur for your browser :(');
        }
      });
      return $this;
    },
    destroy: function() {
      return $this;
    }
  };
  _internals = {
    generateSVG: function(num) {
      var $svg;
      $svg = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="f' + num + '" x="0" y="0"><feGaussianBlur in="SourceGraphic" stdDeviation="' + (parseInt(_settings.blur, 10) - 5) + '" /></filter></defs></svg>');
      $svg.find('svg').css('height', '0');
      return $svg;
    },
    log: function(msg) {
      if ('console' in window) {
        return console.log(msg);
      }
    }
  };
  return $.fn.blurredLines = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      return $.error("Method " + method + " does not exist on jquery.blurredLines");
    }
  };
})(jQuery, window, document);
