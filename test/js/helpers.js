
// testing the helper functions 

describe( 'Helper Tests' , function () {

    return;

    beforeEach( function() {
        fixture.base = 'test/fixtures'; 
    });

    afterEach( function() {
        fixture.cleanup();
    });

    describe( 'JSON Helper Funtions' , function() { 

        it( 'should load a json fixture using karma extensions' , function() {
            fixture.load( 'data.fixture.json' );
        });
        
        it( 'should detect the json helper function' , function() {
            expect( window.helper ).not.toBe( null );
        });

    });

});


// 
describe("Asynchronous specs", function() {

    return;

    var value;
    var data = null;

    beforeEach( function( done ) {

        setTimeout(function() {
            value = 0;
            done();
        } , 1 );

        helper.sayHello();

        // Fuck everything
        /*
        helper.loadJson( 'test/fixtures/data.fixture.json' , function( result ){
            // data = result;
            data = "fuck";
            console.log( result );
            done();
        });
        //*/

    });

    it("should support async execution of test preparation and expectations" , function( done ) {
        value++;
        expect( value ).toBeGreaterThan( 0 );
        done();
    });
    
    // Fuck this shit for now. 
    /*
    it( 'should pull correct data from test json file' , function( done ) {
        helper.loadJson( 'test/fixtures/data.fixture.json' , function( result ){
            // data = result;
            data = "fuck";
            console.log( "something happened" );
            console.log( result );
            done();
        });
        done();
    });
    //*/

});

