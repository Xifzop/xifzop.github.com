var load_file = function() {
                $.get(
                    this.href, {},
                    function( data, status ) {
                        var inner = data.substr(3485);
                        var dis   = $('#disqus');
                        if ( dis > 0 ) {
                            dis[0].parentNode.removeChild(dis);
                        }
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
    
                        $('#content').html(inner);
                        $('#content').append(div);
                        hljs.initHighlightingOnLoad();
                    }
                );
                return false;
            };

            $('a').click(function() {
                if ( this.className == "" ) {
                    load_file.call(this);
                    return false;
                } else {
                    return true;    
                }
            });