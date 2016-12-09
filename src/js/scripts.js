'use strict';

(function()
{
    // 
    console.log( "all systems go" );

    // parent object to hold all of our stuff
    var expo = {
    
        example1 : null , 

        settings : {} ,

        data : {
            contacts : []
        } ,

        loadContents : function()
        {
            helper.loadJson( '/static/data/contacts.json' , function( contacts )
            {
                console.log( "contacts are:" , contacts );

                // assign to local data object 
                expo.data.contacts = contacts;

                // populate vue 
                expo.example1.users = contacts;
                console.log( expo.example1.users );

                console.log( "---------" );
                console.log( "filtered:" , expo.example1.filteredUsers );

            })
        },

        processContact : function()
        {   
            console.log( "processing contact" );
            var newContact = {
                firstName : "Bill", 
                lastName : "Burr", 
            };
            expo.addContact( newContact );
        },

        addContact : function( newContact )
        {
            expo.data.contacts.push( newContact );
            console.log( expo.data.contacts );
        },

        removeContact : function()
        {
            // code goes here
        },

        updateDataFile : function()
        {
            // code goes here
        },

        bindButtons : function()
        {
            console.log( "binding buttons" );
            document.getElementById( 'add-contact' ).addEventListener( 'click' , expo.processContact );
        },

        init : function()
        {

                // populate vue 
                expo.example1 = new Vue({

                    el: '#example-1',

                    data: {
                        users : [] ,
                        message : "" ,
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

                });

            expo.bindButtons();
            expo.loadContents();

            // set search message test 
            expo.example1.message = "";
            console.log( expo.example1.reversedMessage )
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

