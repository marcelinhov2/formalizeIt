# Plugin FormalizeIt
# By <marcelinhov2> <2014>
# License: <Public Domain>

(($, window) ->
 
  class FormalizeIt
   
    defaults:
      token: null
      secret: null
      modal: false
      fields: null
      required_fields: 
        nome: true
        email: true
     
    constructor: (@el, options) ->
      do @cache_DOM_elements

      @options = $.extend({}, @defaults, options)
      @form_id = "form_#{@$el.attr('id')}"
      
      if @options.modal then do @init_with_modal else do @init

    cache_DOM_elements: ->
      @$el = $(@el)

    init: ->
      do @create_form
      do @append_to_DOM

      do @set_triggers

    init_with_modal: ->
      if typeof $.fn.modalizeIt isnt 'function'
        alert 'You need the plugin Jquery ModalizeIt to use the modal feature'
        return false

      do @create_form
      do @create_modal

      do @set_triggers

    set_triggers: ->
      if @options.modal
        @$el.click @open_modal
      
      @submit.click @validate

    append_to_DOM: ->
      @$el.append @form      

    create_form: ->
      @form = $("<form id='#{@form_id}'></form>")

      do @add_fields
      do @add_submit

    add_fields: ->
      @fields = $.extend({}, @options.required_fields, @options.fields)

      for field, values of @fields
        if typeof values is 'boolean'
          @add_inputs field, values
        
        if typeof values is 'object'
          @add_selects field, values

      do @set_label_trigger

    add_inputs: (field, values) ->  
      fieldset = $("<fieldset class='form-group'></fieldset>")
      label = $("<label for='#{@form_id}_#{field}'>#{field}</label>")
      field = $("<input class='form-control' type='text' name='#{@form_id}_#{field}' id='#{@form_id}_#{field}' />")
      
      label.appendTo fieldset
      field.appendTo fieldset
      
      fieldset.appendTo @form

    add_selects: (field, values) ->  
      fieldset = $("<fieldset class='form-group'></fieldset>")
      label = $("<label for='#{@form_id}_#{field}'>#{field}</label>")
      select = $("<select class='form-control' type='text' name='#{@form_id}_#{field}' id='#{@form_id}_#{field}'></select>")
      
      label.appendTo fieldset
      select.appendTo fieldset

      for value in values
        option = $("<option type='text' name='#{@form_id}_#{field}' id='#{@form_id}_#{field}' value='#{value}'>#{value}</option>")
      
        option.appendTo select

      fieldset.appendTo @form

    set_label_trigger: ->
      @labels = @form.find('label')
      @labels.click @focus_in_field

    focus_in_field: ->
      label_id = $(this).attr("for")
      $("#" + label_id).trigger 'click'

    add_submit: ->
      @submit = $("<input type='submit' value='Enviar' />")
      @submit.appendTo @form

    create_modal: ->
      modal_id = "modal_#{@form_id}"
      @modal = $("<div style='display:none;' class='modal' id='#{modal_id}'></div>")
      
      @modal.modalizeIt 
        toRender: @form

    open_modal: (event) =>
      do event.preventDefault
      @modal.modalizeIt 'open'

    mount_validation: ->
      validation_hash = { }

      for field of @fields
        key = "#{@form_id}_#{field}"

        validation_hash[key] = 
          required: true
          email: if field is 'email' then true else false

      return validation_hash

    mount_data: =>
      data = { }

      if @options.token then data['token'] = @options.token
      if @options.secret then data['secret'] = @options.secret

      for field of @fields
        key = "#{@form_id}_#{field}"
        data[field] = $("##{key}").val()

      return data

    validate: (event) =>
      @form.validate 
        rules: @mount_validation()

        errorPlacement: ->
          return false

        submitHandler: (event) =>
          data = @mount_data()
          data = JSON.stringify(data)

          $.ajax(
            type: "POST"
            url: "/"
            dataType: 'json'
            contentType: 'application/json'
            data: data
            statusCode:
              200: =>
                alert('Formulário enviado com sucesso!!!')
              404: =>
                alert('OOOPS, página não encontrada!!!')
              500: =>
                alert('OOOPS, algo errado aconteceu!!!')
          )

          return false
       
    # Define the plugin
    $.fn.extend formalizeIt: (option, args...) ->
      @each ->
        $this = $(this)
        data = $this.data('formalizeIt')
     
        if !data
          $this.data 'formalizeIt', (data = new FormalizeIt(this, option))
        if typeof option == 'string'
          data[option].apply(data, args)
 
) window.jQuery, window