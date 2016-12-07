
// Karma testing file for the main script.js

describe( 'Car Dragging Game' , function() {

    beforeEach( function() { 

        // set up base for html fixtures - DOM snippets to run code against
        fixture.base = 'test/fixtures';
        var html_fixtures = fixture.load( 'canvas.fixture.html' );

        // initialize the source code
        game.init();

    });

    afterEach( function() {
        fixture.cleanup();
    });

    describe( 'First Test' , function() {

        it( 'should find the window.game object' , function() {
            expect( game ).not.toBe( null );
        });

    });

    // 
    describe( 'Tile Grid Tests' , function() {

        // generate a new grid before each test (done by the init() function upstairs)

        it( 'should generate a correct tile map' , function() {

            game.settings.tileHeight = 21;
            game.settings.tileWidth = 5;
            game.data.rows = 7;
            game.data.cols = 131;
            game.data.tileGridArray = [];
            game.generateTileMap();

            expect( game.data.tileGridArray.length ).toBe( 7 );
            expect( game.data.tileGridArray[0].length ).toBe( 131 );

        });

        it( 'should correctly determine the row and column of default tile' , function() {

            var tile;
            var tileHeight = game.settings.tileHeight;
            var tileWidth = game.settings.tileWidth;
            var canvasHeight= game.data.canvasHeight;
            var canvasWidth = game.data.canvasWidth;

            tile = game.getTileAtCoordinates({ x : 100 , y : 100 });
            expect( tile.col ).toBe( Math.floor( 100 / tileWidth ) );
            expect( tile.row ).toBe( Math.floor( 100 / tileHeight ) );

            tile = game.getTileAtCoordinates({ x : 231 , y : 84 });
            expect( tile.col ).toBe( Math.floor( 231 / tileWidth ) );
            expect( tile.row ).toBe( Math.floor( 84 / tileHeight ) );

        });

        it( 'should correctly determine the row and column of a custom tile grid' , function() {

            game.settings.tileHeight = 10;
            game.settings.tileWidth = 10;
            game.data.rows = 11;
            game.data.cols = 17;
            game.data.tileGridArray = [];
            game.generateTileMap();

            var tile;

            tile = game.getTileAtCoordinates({ x : 100 , y : 100 });
            expect( tile.col ).toBe( 10 );
            expect( tile.row ).toBe( 10 );

            tile = game.getTileAtCoordinates({ x : 27 , y : 84 });
            expect( tile.col ).toBe( 2 );
            expect( tile.row ).toBe( 8 );

            tile = game.getTileAtCoordinates({ x : 3 , y : 12 });
            expect( tile.col ).toBe( 0 );
            expect( tile.row ).toBe( 1 );

        });
    
    });

    // tests that handle game state ( win , lose , count points , count moves , etc. )
    describe( 'Game Logic Tests' , function() {
        
    });

});

