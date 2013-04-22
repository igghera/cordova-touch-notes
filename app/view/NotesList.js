Ext.define('sencha-cordova.view.NotesList', {
    extend: 'Ext.dataview.List',
    xtype: 'noteslist',

    config: {

        store: 'Notes',
        loadingText: 'Loading Notes...',
        emptyText: '<div class="notes-list-empty-text">No notes found.</div>',
        onItemDisclosure: true,
        grouped: true,
        itemTpl: '<div class="list-item-title">{title}</div><div class="list-item-narrative">{narrative}</div>'
    },

    initialize: function() {
        this.callParent(arguments);
        console.log('[NotesList] initialize');
    }
});