'use strict';

(function()
{
    // 
    console.log( "all systems go" );

    // parent object to hold all of our stuff
    var expo = {
    
        vue : null , 

        settings : {
            displayMode : "aligned" , 
        } ,

        loadContents : function()
        {
            helper.loadJson( '/static/data/contacts.json' , function( contactsData )
            {
                console.log( "contacts are:" , contactsData );

                // populate vue 
                expo.vue.contacts = contactsData;
                console.log( expo.vue.contacts );

                console.log( "---------" );
                console.log( "filtered:" , expo.vue.filteredContacts );

            })
        },

        makeDummyAjaxCall : function()
        {
            console.log( "this is a dummy ajax call" );
        },

        processContact : function()
        {   
            // create a shortcut to the newContact object
            var newContact = expo.vue.newContact;

            // simulate the ID because we're not using a database
            // this is a little ghetto because we dont have a database-based way of incrementing contact ID 
            // if we increment by the number of contacts, we risk overlapping IDs if contacts are deleted 
            var lastContact = expo.vue.contacts[ expo.vue.contacts.length - 1 ];
            var newId = parseInt( lastContact.id ) + 1;
            newContact.id = newId.toString();
            console.log( newContact.id );

            // processing is complete
            expo.addContact( newContact );
            expo.vue.hideNewContactPane();
        },

        addContact : function( newContact )
        {
            expo.vue.contacts.push( newContact );

            // clear the fields and restore view mode 
            expo.vue.newContact = {};
            expo.vue.clearSearch();

            // select the new contact
            expo.vue.selectContact( newContact.id );
        },

        updateDataFile : function()
        {
            // code goes here
        },

        // 
        
        setDisplayGrid : function() 
        {
            expo.vue.isGridView = true;
            expo.vue.isListView = false;
        },
        
        setDisplayList : function() 
        {
            expo.vue.isGridView = false;
            expo.vue.isListView = true;
        },

        // 

        bindButtons : function()
        {
            console.log( "binding buttons" );
            document.getElementById( 'add-contact' ).addEventListener( 'click' , expo.processContact );
            document.getElementById( 'set-view-list' ).addEventListener( 'click' , expo.setDisplayList );
            document.getElementById( 'set-view-grid' ).addEventListener( 'click' , expo.setDisplayGrid );
        },

        init : function()
        {
            // populate vue 
            expo.vue = new Vue({

                el: '#example-1',

                data: {
                    // TODO : get some of these from the settings in the parent object
                    contacts : [] ,
                    message : "" ,
                    displayMode : expo.settings.displayMode ,
                    currentContact : {} ,
                    isNewContactPaneVisible : false ,
                    newContact : {} , 
                    isListView : true ,
                    isGridView : false ,
                    isEditMode : false ,
                },

                computed: {
                    filteredContacts: function () {
                        var self = this
                        return self.contacts.filter(function (contact) {
                            // return contact.firstName.indexOf(self.searchQuery) !== -1
                            // return contact.firstName.indexOf( self.message ) !== -1
                            // return contact.firstName.indexOf( self.message ) !== -1;
                            var searchRegex = new RegExp(self.message, 'i')
                            return searchRegex.test( contact.firstName ) || searchRegex.test( contact.lastName )
                        })
                    },
                },

                methods: {

                    showNewContactPane : function() {
                        expo.vue.isNewContactPaneVisible = true;
                    },

                    hideNewContactPane : function() {
                        expo.vue.isNewContactPaneVisible = false;
                    },

                    selectContact : function( index )
                    {
                        // it seems that VueJS is a little too clever for its own good
                        // it will bind to all references of an object, when we want to pass by value
                        // if we were to directly assign the currentContact to an array value, it would update that contact in contacts as well

                        // grab the filtered contact
                        var filteredContact = expo.vue.contacts.filter( function( contact ) {
                            return contact.id === index;
                        })[ 0 ];
    
                        // clone the object by value, so that we don't affect the main list
                        var clonedContact = JSON.parse( JSON.stringify( filteredContact ));

                        // assign the cloned contact to the currentContact
                        expo.vue.currentContact = clonedContact;
                    }, 

                    updateCurrentContact : function() 
                    {
                        // dummy ajax call goes here
                        expo.makeDummyAjaxCall();

                        // update the data in our contact array with the currentContact properties
                        var currentId = expo.vue.currentContact.id;
                        
                        for( var i = 0 ; i < expo.vue.contacts.length ; i++ )
                        {
                            if( expo.vue.contacts[ i ].id == currentId )
                            {
                                console.log( "we found a match" );
                                expo.vue.contacts[ i ] = expo.vue.currentContact;

                                // update something within the contacts array to force a visual refresh
                                // because the geniuses who wrote the library refuse to write in a refresh function
                                // I wouldn't use something like this in production
                                // but I don't want to spend hours trying to get a solution to work
                                // so we're going to use a quick hack :)
                                expo.vue.contacts.push({});
                                expo.vue.contacts.pop();
                                break; 
                            }
                        }
                        
                        // hide the edit pane
                        expo.vue.setEditMode( false );

                        // hack fix - vue bullshit
                        // we have to re-select the contact, to prevent vue from binding it again
                        expo.vue.selectContact( expo.vue.currentContact.id );
                    },

                    cancelContactUpdate : function()
                    {
                        expo.vue.setEditMode( false );

                        // re-select the contact, to reset all settings
                        expo.vue.selectContact( expo.vue.currentContact.id );
                    },

                    setEditMode : function( mode ) {
                        expo.vue.isEditMode = mode;
                    },

                    clearSearch : function() {
                        expo.vue.message = "";
                    },

                    resetPanels : function() {
                        expo.vue.currentContact = {};
                        expo.vue.setEditMode( false );
                    },

                    deleteCurrentContact : function()
                    {
                        // create a new array without the current contact
                        expo.vue.contacts = expo.vue.contacts.filter(function( contact ) {
                            return contact.id !== expo.vue.currentContact.id;
                        });
                        // clear up the current fields 
                        // expo.vue.currentContact = {};
                        expo.vue.resetPanels();
                        // console.log( "contacts are now:" , expo.vue.contacts );
                    },

                },

            });

            expo.bindButtons();
            expo.loadContents();

            // set search message test 
            expo.vue.message = "";
        }

    };

    // start the show
    expo.init();

    // bind to the window
    window.expo = window.expo || expo;

    // we're done here
    return expo;

})();


/*
(function()
{

    var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!'
      }
    })

})();
*/

