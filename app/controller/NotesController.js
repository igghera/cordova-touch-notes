Ext.define('sencha-cordova.controller.NotesController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            notesListContainer: 'noteslistcontainer',
            noteEditor: 'noteeditor'
        },
        control: {
            notesListContainer: {
                newNoteCommand: 'onNewNoteCommand',
                editNoteCommand: 'onEditNoteCommand'
            },
            noteEditor: {
                saveNoteCommand: 'onSaveNoteCommand',
                backHomeCommand: 'activateNotesList',
                deleteNoteCommand: 'onDeleteNoteCommand',
                editorActivateCommand: 'onEditorActivateCommand'
            }
        }
    },

    //Event handlers

    onNewNoteCommand: function () {
        console.log('[NotesController] Handling onNewNoteCommand');

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newNote = Ext.create('sencha-cordova.model.Note', {
            id: noteId,
            dateCreated: now,
            title: '',
            narrative: ''
        });

        this.activateNoteEditor(newNote);
    },

    onEditNoteCommand: function (list, record) {
        console.log('[NotesController] Handling onEditNoteCommand');
        this.activateNoteEditor(record);
    },

    onSaveNoteCommand: function () {

        console.log('[NotesController] Handling onSaveNoteCommand');

        var noteEditor = this.getNoteEditor();
        var currentNote = noteEditor.getRecord();
        var newValues = noteEditor.getValues();

        // Update the current note's fields with form values.
        currentNote.set('title', newValues.title);
        currentNote.set('narrative', newValues.narrative);

        var errors = currentNote.validate();

        if (!errors.isValid()) {
            navigator.notification.alert(errors.getByField('title')[0].getMessage(), null, 'Warning');
            currentNote.reject();
            return;
        }

        var notesStore = Ext.getStore('Notes');

        if (null == notesStore.findRecord('id', currentNote.data.id))
            notesStore.add(currentNote);

        notesStore.sync();
        notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

        this.activateNotesList();
    },

    onDeleteNoteCommand: function () {

        console.log('[NotesController] Handling onDeleteNoteCommand');
        var self = this;

        navigator.notification.confirm(
            'Are you sure you want to delete this note?',
            function(buttonIndex) {
                console.log('[confirmHandler inline] ' + buttonIndex);
                self.onDeleteNoteConfirm(buttonIndex, self);
            },
            'Wait',
            ['Yes', 'No']
        );
    },

    onDeleteNoteConfirm: function(buttonIndex, self) {

        console.log('[onDeleteNoteConfirm] ' + buttonIndex);

        if(buttonIndex == 1)
        {
            var noteEditor = self.getNoteEditor();
            var currentNote = noteEditor.getRecord();
            var notesStore = Ext.getStore('Notes');

            notesStore.remove(currentNote);
            notesStore.sync();

            self.activateNotesList();
        }
    },

    onEditorActivateCommand: function() {
        // console.log('[NotesController] Handling onEditorActivateCommand');

        // var currentNote = this.getNoteEditor().getRecord();

        // if(currentNote.get('title') == '')
        //     Ext.fly('deleteNoteBtn').hide();
        // else
        //     Ext.fly('deleteNoteBtn').show();
    },

    //Helper functions

    launch: function(app) {
        this.callParent(arguments);
        Ext.getStore('Notes').load();
        console.log('[NotesController] launch');
    },

    activateNoteEditor: function (record) {
        var noteEditor = this.getNoteEditor();
        noteEditor.setRecord(record);

        Ext.Viewport.animateActiveItem(noteEditor, this.slideLeftTransition);
    },

    activateNotesList: function() {
        Ext.Viewport.animateActiveItem(this.getNotesListContainer(), this.slideRightTransition);
    },

    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    //Variables

    slideLeftTransition: {
        type: 'slide',
        direction: 'left'
    },

    slideRightTransition: {
        type: 'slide',
        direction: 'right'
    }
});