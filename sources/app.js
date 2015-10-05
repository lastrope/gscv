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
            this.model.on( 'change:fontsize', this.onFontSizeChange, this );
            this.model.on( 'change:fontcolor', this.onFontColorChange, this );
            this.model.on( 'change:background', this.onBackgroundChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },
        
        onFontSizeChange : function ( ) {
            this.$el.css( 'font-size', this.model.get( 'fontsize' ) );
        },
        
        onFontColorChange : function ( ) {
            this.$el.css( 'color', this.model.get( 'fontcolor' ));
        },
        onBackgroundChange : function () {
            this.$el.css( 'background', this.model.get( 'background' ) );
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance',
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );
    appearance.createWidget( 'Background Color', 'Color', {
        model : card,
        name  : 'background',
        color : '#323232'
    } );
    // FONTS
    var fontAppearance = editor.createWidget( 'Group', {
        label : 'Font Appearance',
    } );
    fontAppearance.createWidget( 'Font size', 'NumberedSlider', {
        model : card,
        name  : 'fontsize',
        minimum: 10,
        maximum: 50
    } );
    fontAppearance.createWidget( 'Font Color', 'Color', {
        model : card,
        name  : 'fontcolor',
        color: '#FFFFFF'
    } );

} );
