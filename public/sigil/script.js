$(function() {
  var Sigil = {
    letters: {},
    groups: {},
    vsetting: true,

    constants: {
      CANW: 550,
      CANH: 325,
      BOXW: 32,
      BOXH: 32,
      vowels: ['A', 'E', 'I', 'O', 'U']
    },

    //~~~~~~~~~~~~~~~~
    // Initial dissolution and building
    //~~~~~~~~~~~~~~~~
    solve: function(event) {
      $('#solve_button').fadeOut();
      var re = /[^A-Z]/g;
      var original = $('#original').val().toUpperCase().replace(re, "").split('');
      var counter = 0;
      // Find unique letters in original
      for (var l = original.length; l>0; l--) {
        var index = Math.floor( Math.random() * l );
        this.letters[original.splice(index, 1)] = { available: true };
      }

      // BEGIN KINETIC CANVAS
      var stage = new Kinetic.Stage({
          container: 'coagula_canvas',
          width: this.constants['CANW'],
          height: this.constants['CANH']
        });
      var shapesLayer = new Kinetic.Layer();
      // Store for later redrawing
      this.shapesLayer = shapesLayer;
      var position = 1;
      var row = 1;
      for (var letter in this.letters) {
          var tile = new Kinetic.Rect({
            x: position * ( this.constants['BOXW'] + 5 ),
            y: row * this.constants['BOXH'],
            offsetY: -17,
            width: this.constants['BOXW'],
            height: this.constants['BOXH'],
            name: letter,
            fillAlpha: 0.5,
            fill: 'black',
            stroke: '#824520',
            cornerRadius: 5
          });
          var text = new Kinetic.Text({
            x: position * ( this.constants['BOXW'] + 5 ),
            y: row * this.constants['BOXH'],
            offsetX: 1,
            offsetY: -19,
            text: letter,
            fontSize: this.constants['BOXW'],
            width: this.constants['BOXW'],
            height: this.constants['BOXH'],
            align: 'center',
            fontFamily: 'Exo',
            fill: '#888',
            shadowColor: '#4420A3'
          });

          var group = new Kinetic.Group({
            draggable: true
          });
          group.add(tile);
          group.add(text);
          group.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
          });
          group.on('mouseout', function() {
            document.body.style.cursor = 'default';
          });
          this.shapesLayer.add(group);
          this.groups[letter] = group;
      // END KINETIC CANVAS

        position++;
        if (position == 3 || position == 7) {
          position++;
        }
        if (position == 13) { row += 2; position = 1; }
      }

      stage.add(this.shapesLayer);
      $(event.target).parent().fadeOut(5000, function() {
          setTimeout(function() {
            $('#coagula').hide().css({left: '0px', top: '0px', height: '868px'}).fadeIn(2000);
          }, 3000);
      });
      this.check({target: $('#write')});

    },
    
    //~~~~~~~~~~~~~~~~
    // Vowel Toggle 
    //~~~~~~~~~~~~~~~~
    voweltog: function(event) {
      event.preventDefault();
      this.vsetting ^= true;
      for (var v = 0, l = this.constants['vowels'].length; v<l; v++) {
        if (this.letters.hasOwnProperty(this.constants['vowels'][v])) {
          this.groups[this.constants['vowels'][v]].visible(this.vsetting);
        }
      }
      this.shapesLayer.draw();
      this.check({target: $('#write')});
      $(event.target).css({
          backgroundColor: (this.vsetting ? '#3B2D74' : 'transparent')
      });
    },

    //~~~~~~~~~~~~~~~~
    // Textarea checking and highlighting
    //~~~~~~~~~~~~~~~~
    check: function(event) {
      var lines = $(event.target).val().split('\n');
      var re = /[A-Z]/;
      var $wrap = $('#write_wrap');
      var $echo = $('#write_echo');
      $echo.empty();

      // Iterate over lines
      for (var line=0, len=lines.length; line<len; line++) {
        // Store linebreak element
        var linebreak = { offset: 0 };
        // New letters object to track use of letters on this line
        var lettersThisLine = $.extend({}, this.letters);
        for (var chara=0, tlen=lines[line].length; chara<tlen; chara++) {
          var thisChar = lines[line].charAt(chara);
          var upChar = thisChar.toUpperCase();
          var insert;
          // Ignore not alphabet characters
          if ( re.test(upChar) &&
               ( this.vsetting || this.constants['vowels'].indexOf(upChar) == -1 )
          ) {
            if ( lettersThisLine.hasOwnProperty(upChar) ) {
              if ( !lettersThisLine[upChar] ) {
                console.log('present');
                insert = $("<span>", {class: "aether", text: thisChar});
              } else {
                lettersThisLine[upChar] = false;
                insert = $("<span>"+thisChar+"</span>");
              }
            } else {
              insert = $("<span>", {class: "intrusion", text: thisChar});
            }
          } else {
            console.log('default');
            // Begin not alphabetic handling
            if (thisChar == ' ') {
                insert = $("<span>&nbsp;</span>");
            } else {
                insert = $("<span>"+thisChar+"</span>");
            }
          }

          $echo.append(insert);
          // Check for long line and insert break
          if ( chara && ( (chara - linebreak.offset) % 29 == 0) ) {
            if ( linebreak.hasOwnProperty('el') ) {
                linebreak.el.$.after("<br>");
                linebreak.offset = linebreak.el.offset + 1;
                // It is one time use only
                delete linebreak.el;
            } else {
                insert.before("<br>");
                linebreak.offset = chara;
            }
          }
          // Store element containing a line break character
          if ( / /.test(thisChar) ) {
            linebreak.el = { $ : insert, offset: chara };
          }
        }
        // END LINE LOOP
        $echo.append('<br>');
      }
      // END TEXTAREA LOOP
    }
  }
  // END SIGIL OBJ

  // BEGIN BINDINGS
  $('#f_original').submit(function(event) {
    Sigil.solve(event);
  });
  $('#voweltog').click(function(event) {
    Sigil.voweltog(event);
  });
  $('#write').keyup(function(event) {
    Sigil.check(event);
  });
  // END BINDINGS
  
  
});
