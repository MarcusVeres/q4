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

        processContact : function()
        {   
            console.log( "processing contact" );
            var newContact = {
                id: ( expo.data.contacts.length + 1 ).toString(),
                firstName: "Bill",
                lastName: "Burr",
                title: "Sales Representative",
                Address1: "90 Street",
                City: "Toronto",
                State: "Ontario"
            };
            expo.addContact( newContact );
        },

        addContact : function( newContact )
        {
            expo.data.contacts.push( newContact );
            console.log( expo.data.contacts );
        },

        editContact : function()
        {

        },

        removeContact : function()
        {
            // code goes here
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
                    isListView : true ,
                    isGridView : false ,
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
                    reversedMessage: function () {
                      // `this` points to the vm instance
                      return this.message.split('').reverse().join('')
                    }
                },

                methods: {

                    selectContact : function( index )
                    {
                        expo.vue.currentContact = expo.data.contacts[ index ];
                    }, 

                },

            });

            expo.bindButtons();
            expo.loadContents();

            // set search message test 
            expo.vue.message = "";
            console.log( expo.vue.reversedMessage )
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

