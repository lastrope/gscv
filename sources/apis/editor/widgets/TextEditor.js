define( [

    'vendors/Backbone',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone,  _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget texteditor-widget">',
            '    <div class="widget-wrapper">',
            '        <input class="textedit" />',
            '    </div>',
            '</div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change .textedit': 'changeEvent',
            'keyup .textedit': 'changeEvent',
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',
                default : 'My text',
                changeEvent : 'textChanged'

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set(options.default);

        },

        changeEvent: function () {
            this.send();
        },

        render: function () {
            this.$('.textedit').val(this.get());
            this.send();
        },
        
        send : function (){
            this.options.model.trigger( this.options.changeEvent, this.$('.textedit').val(), this );
        }

    } );

} );
