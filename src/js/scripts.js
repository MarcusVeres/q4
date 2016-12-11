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

        data : {
            contacts : [] , 
            currentContact : {} , 
            newContact : {} ,
        } ,

        loadContents : function()
        {
            helper.loadJson( '/static/data/contacts.json' , function( contacts )
            {
                console.log( "contacts are:" , contacts );

                // assign to local data object 
                expo.data.contacts = contacts;

                // populate vue 
                expo.vue.users = contacts;
                console.log( expo.vue.users );

                console.log( "---------" );
                console.log( "filtered:" , expo.vue.filteredUsers );

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
            // this is a little ghetto because we dont have a database-based way of incrementing user ID 
            // if we increment by the number of contacts, we risk overlapping IDs if contacts are deleted 
            var lastContact = expo.data.contacts[ expo.data.contacts.length - 1 ];
            var newId = parseInt( lastContact.id ) + 1;
            newContact.id = newId.toString();
            console.log( newContact.id );

            // processing is complete
            expo.addContact( newContact );
            expo.vue.hideNewContactPane();
        },

        addContact : function( newContact )
        {
            expo.vue.users.push( newContact );
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
                    users : [] ,
                    message : "" ,
                    displayMode : expo.settings.displayMode ,
                    currentContact : expo.data.currentContact ,
                    isNewContactPaneVisible : false ,
                    newContact : {} , 
                    isListView : true ,
                    isGridView : false ,
                    isEditMode : false ,
                },

                computed: {
                    filteredUsers: function () {
                        var self = this
                        return self.users.filter(function (user) {
                            // return user.firstName.indexOf(self.searchQuery) !== -1
                            // return user.firstName.indexOf( self.message ) !== -1
                            // return user.firstName.indexOf( self.message ) !== -1;
                            var searchRegex = new RegExp(self.message, 'i')
                            return searchRegex.test( user.firstName ) || searchRegex.test( user.lastName )
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
                        expo.vue.currentContact = expo.vue.users.filter( function( contact ) {
                            return contact.id === index;
                        })[0];
                    }, 

                    updateCurrentContact : function() 
                    {
                        // update the data in our contact array with the currentContact properties
                        var currentId = expo.vue.currentContact.id;
                        
                        for( var i = 0 ; i < expo.vue.users.length ; i++ )
                        {
                            if( expo.vue.users[ i ].id == currentId )
                            {
                                expo.vue.users[ i ] = expo.vue.currentContact;
                                break; 
                            }
                        }

                        // dummy ajax call goes here
                        expo.makeDummyAjaxCall();
                    },

                    setEditMode : function( mode ) {
                        expo.vue.isEditMode = mode;
                    },

                    deleteCurrentContact : function()
                    {
                        // create a new array without the current contact
                        expo.vue.users = expo.vue.users.filter(function( contact ) {
                            return contact.id !== expo.vue.currentContact.id;
                        });
                        // clear up the current fields 
                        expo.vue.currentContact = {};
                        // console.log( "contacts are now:" , expo.vue.users );
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

