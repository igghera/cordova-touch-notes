Ext.define("sencha-cordova.view.Main", {
    extend: "Ext.Container",
    xtype: "noteslistcontainer",

    requires: [
        'Ext.TitleBar'
    ],

    initialize: function () {

        console.log('[Main] initialize');

        this.callParent(arguments);

        var newButton = {
            xtype: "button",
            text: 'New',
            ui: 'action',
            handler: this.onNewButtonTap,
            align: 'right',
            scope: this
        };

        var topToolbar = {
            xtype: "titlebar",
            title: 'My Notes',
            docked: "top",
            items: [
                newButton
            ]
        };

        var notesList = {
            xtype: "noteslist",
            listeners: {
                disclose: { fn: this.onNotesListDisclose, scope: this }
            }
        };

        this.add([topToolbar, notesList]);
    },

    config: {
        layout: {
            type: 'card'
        }
    },

    onNewButtonTap: function () {
        this.fireEvent("newNoteCommand", this);
    },

    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record);
    }
});