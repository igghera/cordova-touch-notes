Ext.define('sencha-cordova.view.NoteEditor', {

    extend: 'Ext.form.Panel',
    requires: 'Ext.form.FieldSet',
    xtype: 'noteeditor',

    config:{
        scrollable:'vertical',

        listeners: {
            activate: function() {
                console.log('[NoteEditor] Activate');
                this.fireEvent('editorActivateCommand', this);
            }
        }
    },

    initialize: function () {

        this.callParent(arguments);

        var backButton = {
            xtype: 'button',
            ui: 'back',
            text: 'Home',
            handler: this.onBackButtonTap,
            scope: this
        };

        var saveButton = {
            xtype: 'button',
            ui: 'action',
            text: 'Save',
            handler: this.onSaveButtonTap,
            scope: this
        };

        var topToolbar = {
            xtype: 'toolbar',
            docked: 'top',
            title: 'Edit Note',
            items: [
                backButton,
                { xtype: 'spacer' },
                saveButton
            ]
        };

        var deleteButton = {
            xtype: 'button',
            id: 'deleteNoteBtn',
            iconCls: 'trash',
            handler: this.onDeleteButtonTap,
            scope: this
        };

        var bottomToolbar = {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [
                deleteButton
            ]
        };

        var noteTitleEditor = {
            xtype: 'textfield',
            name: 'title',
            label: 'Title',
            required: true
        };

        var noteNarrativeEditor = {
            xtype: 'textareafield',
            name: 'narrative',
            label: 'Narrative'
        };

        this.add([
            topToolbar,
            {
                xtype: 'fieldset',
                items: [noteTitleEditor, noteNarrativeEditor]
            },
            bottomToolbar
        ]);
    },

    //Event handlers

    onSaveButtonTap: function() {
        console.log('[NoteEditor] Firing saveNoteCommand');
        this.fireEvent('saveNoteCommand', this);
    },

    onBackButtonTap: function() {
        console.log('[NoteEditor] Firing backHomeCommand');
        this.fireEvent('backHomeCommand', this);
    },

    onDeleteButtonTap: function() {
        console.log('[NoteEditor] Firing deleteNoteCommand');
        this.fireEvent('deleteNoteCommand', this);
    }
});