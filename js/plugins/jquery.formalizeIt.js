var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

(function($, window) {
  var FormalizeIt;
  return FormalizeIt = (function() {
    FormalizeIt.prototype.defaults = {
      token: null,
      secret: null,
      modal: false,
      fields: null,
      required_fields: {
        nome: true,
        email: true
      }
    };

    function FormalizeIt(el, options) {
      this.el = el;
      this.validate = __bind(this.validate, this);
      this.mount_data = __bind(this.mount_data, this);
      this.open_modal = __bind(this.open_modal, this);
      this.cache_DOM_elements();
      this.options = $.extend({}, this.defaults, options);
      this.form_id = "form_" + (this.$el.attr('id'));
      if (this.options.modal) {
        this.init_with_modal();
      } else {
        this.init();
      }
    }

    FormalizeIt.prototype.cache_DOM_elements = function() {
      return this.$el = $(this.el);
    };

    FormalizeIt.prototype.init = function() {
      this.create_form();
      this.append_to_DOM();
      return this.set_triggers();
    };

    FormalizeIt.prototype.init_with_modal = function() {
      if (typeof $.fn.modalizeIt !== 'function') {
        alert('You need the plugin Jquery ModalizeIt to use the modal feature');
        return false;
      }
      this.create_form();
      this.create_modal();
      return this.set_triggers();
    };

    FormalizeIt.prototype.set_triggers = function() {
      if (this.options.modal) {
        this.$el.click(this.open_modal);
      }
      return this.submit.click(this.validate);
    };

    FormalizeIt.prototype.append_to_DOM = function() {
      return this.$el.append(this.form);
    };

    FormalizeIt.prototype.create_form = function() {
      this.form = $("<form id='" + this.form_id + "'></form>");
      this.add_fields();
      return this.add_submit();
    };

    FormalizeIt.prototype.add_fields = function() {
      var field, values, _ref;
      this.fields = $.extend({}, this.options.required_fields, this.options.fields);
      _ref = this.fields;
      for (field in _ref) {
        values = _ref[field];
        if (typeof values === 'boolean') {
          this.add_inputs(field, values);
        }
        if (typeof values === 'object') {
          this.add_selects(field, values);
        }
      }
      return this.set_label_trigger();
    };

    FormalizeIt.prototype.add_inputs = function(field, values) {
      var fieldset, label;
      fieldset = $("<fieldset class='form-group'></fieldset>");
      label = $("<label for='" + this.form_id + "_" + field + "'>" + field + "</label>");
      field = $("<input class='form-control' type='text' name='" + this.form_id + "_" + field + "' id='" + this.form_id + "_" + field + "' />");
      label.appendTo(fieldset);
      field.appendTo(fieldset);
      return fieldset.appendTo(this.form);
    };

    FormalizeIt.prototype.add_selects = function(field, values) {
      var fieldset, label, option, select, value, _i, _len;
      fieldset = $("<fieldset class='form-group'></fieldset>");
      label = $("<label for='" + this.form_id + "_" + field + "'>" + field + "</label>");
      select = $("<select class='form-control' type='text' name='" + this.form_id + "_" + field + "' id='" + this.form_id + "_" + field + "'></select>");
      label.appendTo(fieldset);
      select.appendTo(fieldset);
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        option = $("<option type='text' name='" + this.form_id + "_" + field + "' id='" + this.form_id + "_" + field + "' value='" + value + "'>" + value + "</option>");
        option.appendTo(select);
      }
      return fieldset.appendTo(this.form);
    };

    FormalizeIt.prototype.set_label_trigger = function() {
      this.labels = this.form.find('label');
      return this.labels.click(this.focus_in_field);
    };

    FormalizeIt.prototype.focus_in_field = function() {
      var label_id;
      label_id = $(this).attr("for");
      return $("#" + label_id).trigger('click');
    };

    FormalizeIt.prototype.add_submit = function() {
      this.submit = $("<input type='submit' value='Enviar' />");
      return this.submit.appendTo(this.form);
    };

    FormalizeIt.prototype.create_modal = function() {
      var modal_id;
      modal_id = "modal_" + this.form_id;
      this.modal = $("<div style='display:none;' class='modal' id='" + modal_id + "'></div>");
      return this.modal.modalizeIt({
        toRender: this.form
      });
    };

    FormalizeIt.prototype.open_modal = function(event) {
      event.preventDefault();
      return this.modal.modalizeIt('open');
    };

    FormalizeIt.prototype.mount_validation = function() {
      var field, key, validation_hash;
      validation_hash = {};
      for (field in this.fields) {
        key = "" + this.form_id + "_" + field;
        validation_hash[key] = {
          required: true,
          email: field === 'email' ? true : false
        };
      }
      return validation_hash;
    };

    FormalizeIt.prototype.mount_data = function() {
      var data, field, key;
      data = {};
      if (this.options.token) {
        data['token'] = this.options.token;
      }
      if (this.options.secret) {
        data['secret'] = this.options.secret;
      }
      for (field in this.fields) {
        key = "" + this.form_id + "_" + field;
        data[field] = $("#" + key).val();
      }
      return data;
    };

    FormalizeIt.prototype.validate = function(event) {
      return this.form.validate({
        rules: this.mount_validation(),
        errorPlacement: function() {
          return false;
        },
        submitHandler: (function(_this) {
          return function(event) {
            var data;
            data = _this.mount_data();
            data = JSON.stringify(data);
            $.ajax({
              type: "POST",
              url: "/",
              dataType: 'json',
              contentType: 'application/json',
              data: data,
              statusCode: {
                200: function() {
                  return alert('Formulário enviado com sucesso!!!');
                },
                404: function() {
                  return alert('OOOPS, página não encontrada!!!');
                },
                500: function() {
                  return alert('OOOPS, algo errado aconteceu!!!');
                }
              }
            });
            return false;
          };
        })(this)
      });
    };

    $.fn.extend({
      formalizeIt: function() {
        var args, option;
        option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data('formalizeIt');
          if (!data) {
            $this.data('formalizeIt', (data = new FormalizeIt(this, option)));
          }
          if (typeof option === 'string') {
            return data[option].apply(data, args);
          }
        });
      }
    });

    return FormalizeIt;

  })();
})(window.jQuery, window);
