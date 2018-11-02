// Prepare DOM elements:
var links = document.getElementById('article').getElementsByTagName('a'), 
    modal = document.getElementById('modal'),
    modlc = document.getElementById('modal-container'),
    monot = document.getElementById('modal-note'),
    $aside = $('#asideHolder');
    $asideO = $('#asideOverlay');
    menub = document.getElementById('menubutton');

var mobile = window.innerWidth <= 940;

// Apply target blank to all links except next page buttons
for (var i=0, ll = links.length; i<ll; i++) {
    var el = links[i];
    if ( el.className.indexOf('next') + el.className.indexOf('prev') == -2
         || el.className.indexOf('_fake') != -1 ) {
        el.setAttribute('target', '_blank');
    }
}

// Apply modal overlay for images
$('article > * > img, article > img, .exi').not('.nozoom').click(expandImg);

function expandImg(e) {
    var data = e.target.dataset;
    var src = data.src || e.target.src.replace('.sm.','.');
    $(modlc).children('img').attr('src', src);
    if ( data.source ) {
            monot.innerHTML = data.source;
            if ( data.license ) {
                $(monot).append(' [<a href="'+data.license+'"><img src="http://image.frood.io/cc.png" class="cc" style="width: 15px"></a>]');
            }
            monot.appendChild(document.createTextNode('  |  '));
    } else { monot.innerHTML = ''; }
    var link = document.createElement("a");
        link.href = src;
        link.innerHTML = mobile ?  '(see full resolution)' : '(see image in new window)';
    monot.appendChild(link);
    $(monot).children("a").attr('target', '_blank');
    modal.style.display = 'block';
    $('#modal-bg').show();
    var position_scroll = $(e.target).position().top;
    $('#modal-container').css('marginTop', position_scroll);
    $('body').css('height', $('#modal-container').height() );
}

function hidemodal(e) {
    $('#modal-bg').hide();
    modal.style.display = 'none';
}

// Replace Youtube Embedded for mobile
if ( mobile ) {
    var ytembed = document.getElementById('ytplayer');
    if ( ytembed ) {
        var data = ytembed.dataset;
        if ( data.link ) {
            var link = document.createElement("a");
                link.href = data.link;
                link.className = "youtube-mobile";
                link.setAttribute('target', '_blank');
            ytembed.parentNode.insertBefore(link,ytembed);
            ytembed.parentNode.removeChild(ytembed);
        }
    }
}

// logo winks
var Chao = function() {
  var _$ = $('#chao');
  var bg$ = $('#chaobg');
  var pokes = -1;
  var interval = 0.5;
  var timer_id = false;

  return {
    _$: _$,
    bg$: bg$,
    mu: function() {
        var bgs = {
            colors: function() {
                var options = ['#25649F', '#031207', '#1B122D', '#331210', '#FF3800',
                                '#287F53', '#5B7E99', '#999442', '#403D3A', '#FF4AEA',
                                '#050040', '#7F2615', '#7F1944', '#4E317F', '#E56258'];
                return options[
                    Math.floor(
                        Math.random()*
                        options.length
                    )];
            },
            images: function() {
                // Return random position on bg image. 5x3
                return '#AAA url(\'http://image.frood.io/logobg.jpg\') no-repeat '
                    + -200 * Math.floor(Math.random() * 5) + 'px '
                    + -200 * Math.floor(Math.random() * 3) + 'px';
            }
        };
        var type =  (pokes == 3) ? 'images' : 'colors';
        _$.css(
            {"background": bgs[type]() }
        );
        return this;
    },
    poke: function() {
        pokes++;
        pokes = pokes % 5;
        if ( pokes == 0 ) {
            interval *= 2;
            clearInterval(timer_id);
            timer_id = setInterval( Chao.mu.bind(false), 23000 / interval );
        }
        return this;
    }
  }
}();

Chao.mu().poke()
    ._$.mouseover(function() {
        Chao.poke();
        Chao.mu();
    });

// Controls for Mobile menu interface
function togglemenu(el) {
    var offset = $(window).scrollTop();
    // Don't place the menu below the page end
    if ( offset + $aside.height() > $(document).height() ) {
        offset = $(document).height() - $aside.height() - 88;
    }
    $aside.toggleClass('shown').css('top', offset);
    $asideO.toggle();
    Chao.poke().mu();
}

// ddate shenanigans
Date.prototype.getDOY = function() {
    var cumuls = {
        1: 0,
        2: 31,
        3: 59,
        4: 90,
        5: 120,
        6: 151,
        7: 181,
        8: 212,
        9: 243,
        10: 273,
        11: 304,
        12: 334
    };
    return this.getDate() + cumuls[this.getMonth() + 1];
} 

Date.prototype.isLeap = function() {
    var ret = new Date(this.getFullYear(), 1, 29).getMonth() == 1;
    return ret;
} 

Date.prototype.ddate = function() {
    var days = ['Setting Orange', 'Sweetmorn', 'Boomtime', 'Pungenday', 'Prickle-Prickle'];
    var months = ['Chaos', 'Discord', 'Confusion', 'Bureaucracy', 'The Aftermath'];
    var planets = ['\u2609 Sun\'s Day', '\u263D Moon\'s Day', '\u2642 Týr\'s Day', '\u263f Odin\'s Day', '\u2643 Thor\'s Day', '\u2640 Frigg\'s Day', '\u2644 Saturn\'s Day'];
    var holy = {
        5   : 'Mungday',
        11  : 'the Death of Aaron Swartz',
        50  : 'Chaoflux',
        73  : 'the Feast of Coalescence',
        78  : 'Mojoday',
        98  : 'the Festival of Aiwass I',
        99  : 'the Festival of Aiwass II',
        100 : 'the Festival of Aiwass III',
        110 : 'the Honoring of St. Gulik',
        123 : 'Discoflux',
        142 : 'the start of Abstention of Morpheus',
        151 : 'Syaday',
        169 : 'the end of Abstention of Morpheus',
        174 : 'the Festival of Turing',
        196 : 'Confuflux',
        204 : 'the Festival of Sothis',
        224 : 'Zaraday',
        266 : 'the Epiphany of St. TRIMTAB',
        269 : 'Bureflux',
        285 : 'Crowleymas',
        297 : 'Maladay',
        312 : 'the Birth of Aaron Swartz',
        315 : 'the Trides of Immanency',
        342 : 'Afflux',
        357 : 'Festivus'
    };
    var suffix = ['st', 'nd', 'rd'];
    var doy = this.getDOY();
    if ( this.isLeap() ) {
        if ( doy == 60 && this.getMonth() == 1 ) {
            return 'St. Tib\'s Day';
        }
    }
    var month = months[ Math.ceil( doy / 73 ) - 1 ];
    var dom = 1 + (doy - 1) % 73;
    var fin = dom % 10;
    return ( holy.hasOwnProperty(doy) ? holy[doy]+', ' : '' )
        + planets[this.getDay()] + '<br>'
        + days[doy % 5]
        + ' ' + month
        + ' ' + dom
        + ( (fin > 0 && dom != 11 && dom != 12 && dom != 13 && fin <= 3) ? suffix[fin - 1] : 'th' )
        + ', ' + ('00000' + (this.getFullYear() + 1166) ).substr(-5) + ' YOLD';
}


today = new Date();
$('#ddate').html('Today seems like '+today.ddate());

// Ddate form calculator
function findDdate(form) {
    var formParam = {};
    $.each( $(form).serializeArray(), function(_, kv) {
        formParam[kv.name] = kv.value;
    });
    if (!formParam.year) {
        var t
        var dyear = ('00000' + today.getFullYear() ).substr(-5);
        formParam.year = dyear;
        console.log(dyear);
        $('#dyear').val(dyear);
    }
    var get = new Date(formParam.year, formParam.month, formParam.day);
    if ( isNaN( get.getTime() ) ) {
        $(form).children('.results').text('Huh?');
    } else {
        $(form).children('.results').html( get.ddate() );
    }
    return false;
}

// Content effects
$('.random').each( function(idx) {
    var elems = $(this).children().toArray();
    var temp = [];
    for (var i = elems.length; i>0; i--) {
        temp.push(elems.splice(Math.floor(Math.random() * i),1)[0]);
    }
    $(this).html(temp);
});

$('.morph').each( function(idx) {
    $(this).mouseover(function(event) {
        var _this = event.target;
        var $this = $(_this);
        var src = $this.attr('src');
        if ( $this.data('morph') ) {
            $this.attr('src' , $this.data('morph') )
              .data('remorph', src)
              .data('morph', '')
              .addClass('unob');
        }
    })
    .mouseout( function(event) {
        var _this = event.target;
        var $this = $(_this);
        var src = $this.attr('src');
        if ( $this.data('remorph') ) {
            var rem = $this.data('remorph');
            $this.data('remorph', '');
            setTimeout( function() {
                $this.attr('src' , rem )
                  .data('morph', src)
                  .removeClass('unob');
            }, 1000);
        }
    });
});






















