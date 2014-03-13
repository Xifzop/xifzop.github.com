
var reg_link_action = function() {
    $('a').click(function() {
        if ( this.className == "" ) {
            load_file.call(this);
            return false;
        } else if ( this.className == "nc" ) {
            load_file.call(this, true);
            return false;
        } else {
            return true;    
        }
    });
};

// invoked when each time the new url about md is clicked
var load_file = function(no_comments, href) {
                $.get(
                    href || this.href, {},
                    function( data, status ) {
                        var inner = data.substr(3485);
                        $('#content').html(inner);

                        var dis   = $('#disqus');
                        if ( dis > 0 ) {
                            dis[0].parentNode.removeChild(dis);
                        }

                        if ( !no_comments ) {
                            var div   = document.createElement('div');
                            var comment = document.createElement('div');
                            var disqus_shortname = "xifzop"; 

                            comment.id = "disqus_thread";
                            div.id = "disqus";
                            div.appendChild(comment);

                            (
                                function() {
                                    var dsq = document.createElement('script'); 
                                    dsq.type = 'text/javascript'; 
                                    dsq.async = true;
                                    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                                    div.appendChild(dsq);
                                }
                            )();

                            (
                                function () {
                                    var s = document.createElement('script'); 
                                    s.async = true;
                                    s.type = 'text/javascript';
                                    s.src = '//' + disqus_shortname + '.disqus.com/count.js';
                                    div.appendChild(s);
                            }
                            )();

                            var a = document.createElement('a');
                            a.href = "http://disqus.com";
                            a.className = "dsq-brlink";
                            a.innerHTML = "comments powered by <span class=\"logo-disqus\">Disqus</span>";
                            
                            $('#content').append(div);

                        }
                        
                        $('pre code').each(function(i, e) {
                            hljs.highlightBlock(e);
                        });
                        reg_link_action();
                    }
                );
                return false;
            };
// end for load_file function defined.

var init_view = function(config) {

    MENU    = 0;
    PREFACE = 1;
    TITLE   = 0;
    WORDS   = 0;

    if( !config ) { return false; }

    var menu = config[MENU]['menu'];

    // for menu-1
    for ( var i = 0; i <menu.length; ++i ) {
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.setAttribute('class', menu[i]['class']);
        link.setAttribute('href' , menu[i]['href']);
        link.innerHTML = menu[i]['content'];
        item.appendChild(link);
        $('#menu1')[0].appendChild(item);        
    }

    // for menu-2 & mtitle
    $('#mtitle').html(menu[TITLE]['content']);
    menu.shift();
    for ( var i = 0; i <menu.length; ++i ) {
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.setAttribute('class', menu[i]['class']);
        link.setAttribute('href' , menu[i]['href']);
        link.innerHTML = menu[i]['content'];
        item.appendChild(link);
        $('#menu2')[0].appendChild(item);        
    }    

    var preface = config[PREFACE]['preface'];
    $('#words').html(preface[WORDS]['words']);

    return;
};

$.getJSON('info/config.json', function(config){
    init_view(config);
    reg_link_action();
});

load_file(true, 'info/preface.html');
