var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

(function($, window) {
  var ModalizeIt;
  return ModalizeIt = (function() {
    function ModalizeIt(el, options) {
      this.el = el;
      this.options = options;
      this.close = __bind(this.close, this);
      this.cache_DOM_elements();
      this.mount();
      this.set_triggers();
      this.render();
      this.append();
    }

    ModalizeIt.prototype.cache_DOM_elements = function() {
      return this.modal = $(this.el);
    };

    ModalizeIt.prototype.set_triggers = function() {
      return this.close_bt.click(this.close);
    };

    ModalizeIt.prototype.mount = function() {
      this.container = $("<div class='modal_container wrapper'></div>");
      this.close_bt = $("<a class='close'>Fechar</a>");
      this.close_bt.appendTo(this.container);
      return this.container.appendTo(this.modal);
    };

    ModalizeIt.prototype.render = function() {
      return this.container.append(this.options.toRender);
    };

    ModalizeIt.prototype.append = function() {
      return $('body').append(this.modal);
    };

    ModalizeIt.prototype.centralize = function() {
      var h, w;
      w = this.container.width();
      h = this.container.height();
      this.container.css('margin-left', -(w / 2));
      return this.container.css('margin-top', -(h / 2));
    };

    ModalizeIt.prototype.open = function() {
      this.modal.fadeIn('fast');
      return this.centralize();
    };

    ModalizeIt.prototype.close = function() {
      return this.modal.fadeOut('fast');
    };

    $.fn.extend({
      modalizeIt: function() {
        var args, option;
        option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data('modalizeIt');
          if (!data) {
            $this.data('modalizeIt', (data = new ModalizeIt(this, option)));
          }
          if (typeof option === 'string') {
            return data[option].apply(data, args);
          }
        });
      }
    });

    return ModalizeIt;

  })();
})(window.jQuery, window);
