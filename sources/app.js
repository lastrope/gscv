/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            fontsize: 12,
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:bgcardcolor', this.onCardColorChange, this );
            this.model.on( 'change:fontsize', this.onFontSizeChange, this );
            this.model.on( 'change:fontcolor', this.onFontColorChange, this );
            this.model.on( 'uploadSelectEvent', this.onImageBgChange, this );
            this.model.on( 'jobChange', this.onJobChange, this );
            this.model.on( 'nameChange', this.onNameChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onFontSizeChange( );
            this.onCardColorChange( );
            this.onFontColorChange( );
            this.onJobChange( );
            this.onNameChange( );

        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onCardColorChange : function ( ) {
            this.$el.css( 'background-color', this.model.get( 'bgcardcolor' ) );
        },
        onFontSizeChange : function ( ) {
            this.$el.css( 'font-size', this.model.get( 'fontsize' ) );
        },
        onFontColorChange : function ( ) {
            this.$el.css( 'color', this.model.get( 'fontcolor' ) );
        },
        onImageBgChange : function (file) {
            var reader = new FileReader(); 
            reader.onload = (function(model) { 
                return function(e) {
                  model.$el.css( 'background-image', 'url("'+e.target.result+'")' );
                };
            })(this);
            reader.readAsDataURL(file);
        },
        onJobChange : function (text) {
            this.$el.find('.job').html(text);
        },
        onNameChange : function (text) {
            this.$el.find('.name').html(text);
        }
    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---
    // TEXT
    var text = editor.createWidget( 'Group', {
        label : 'Text'
    });
    text.createWidget( 'Name', 'TextEditor', {
        model : card,
        name  : 'name',
        changeEvent : 'nameChange',
        default: 'Franck Gautier'
    } );
    text.createWidget( 'Job title', 'TextEditor', {
        model : card,
        name  : 'jobtitle',
        changeEvent : 'jobChange',
        default: 'Web Developer'
    } );
     // FONTS
    var fontappearance = editor.createWidget( 'Group', {
        label : 'Fonts Appearance'
    } );
    fontappearance.createWidget( 'Font size', 'NumberedSlider', {
        model : card,
        name  : 'fontsize',
        minimum : 10,
        maximum : 50
    } );
    fontappearance.createWidget( 'Font Color', 'Color', {
        model : card,
        name  : 'fontcolor',
        opened : false
    } );
    // CARD
    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance',
        opened : false
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );
    appearance.createWidget( 'Background Color', 'Color', {
        model : card,
        name  : 'bgcardcolor',
        color: '#323232'
    } );
    // IMAGES
    var images = editor.createWidget( 'Group', {
        label : 'Images',
        opened : false
    });
    
    images.createWidget( 'Background image', 'FilePicker', {
        model : card,
        name  : 'bgimage',
        text : 'Choose a picture'
        
    } );
} );
