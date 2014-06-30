# Plugin ModalizeIt
# By <marcelinhov2> <2014>
# License: <Public Domain>

(($, window) ->
 
  class ModalizeIt

    constructor: (@el, @options) ->
      do @cache_DOM_elements
      do @mount

      do @set_triggers

      do @render
      do @append

    cache_DOM_elements: ->
      @modal = $(@el)

    set_triggers: ->
      @close_bt.click @close

    mount: ->
      @container = $("<div class='modal_container wrapper'></div>")
      @close_bt = $("<a class='close'>Fechar</a>")

      @close_bt.appendTo @container
      @container.appendTo @modal

    render: ->
      @container.append @options.toRender
      
    append: ->
      $('body').append @modal

    centralize: ->
      w = @container.width()
      h = @container.height()

      @container.css 'margin-left', -(w / 2)
      @container.css 'margin-top', -(h / 2)

    open: ->
      @modal.fadeIn 'fast'
      do @centralize

    close: =>
      @modal.fadeOut 'fast'

    # Define the plugin
    $.fn.extend modalizeIt: (option, args...) ->
      @each ->
        $this = $(this)
        data = $this.data('modalizeIt')
     
        if !data
          $this.data 'modalizeIt', (data = new ModalizeIt(this, option))
        if typeof option == 'string'
          data[option].apply(data, args)

) window.jQuery, window