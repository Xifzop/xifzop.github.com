/**
 * Created by tonie on 2/27/14.
 */

var kit = window;

kit.vars = {
    window_wid : $(window).width(),
    window_hgt : $(window).height(),
    std_width: 950,
    min_width: 670,
    min_height: 450,
    single_win_width: 500,
    months: [
        0,
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sept','Oct', 'Nov', 'Dec'
    ]
};

kit.config = {};

kit.urls = {
    pull_btn_left_arrow  : "pic/left.png",
    pull_btn_right_arrow : "pic/right.png"
};

kit.node_util = {
    new_node : function(node_info, innerHTML) {
        if ( node_info == undefined ) { return false; }
        var node = document.createElement(node_info.tag);
        delete node_info.tag;
        for ( var k in node_info ) {
            node.setAttribute(k, node_info[k] );
        }
        node.innerHTML = innerHTML? innerHTML : '';
        return node;
    },

    new_div : function(node_info, innerHTML) {

        node_info['tag'] = 'div';
        return this.new_node(node_info, innerHTML);
    },

    new_post : function(post_info) {

        if ( post_info == undefined ) {
            return false;
        }

        var full_link = '?action=get_post&param=' + post_info.url;

        var ppanel = this.new_div({
            'class' : 'm-post  m-post-txt'
        });

        var liner  = this.new_div({
            'class' : 'liner'
        });

        var content_panel = this.new_div({
            'class' : 'postinner'
        });

        var main_content_panel = this.new_div({
            'class' : 'ct'
        });

        var post = this.new_div({
            'class' : 'ctc box'
        });

        var link = this.new_div({
            'class' : 'fullnk'
        });

        var date_panel = this.new_div({
            'class' : 'info box'
        });

        ppanel.appendChild(kit.node_util.new_div({},post_info.date.year));

        main_content_panel.appendChild(post);
        main_content_panel.appendChild(link);
        content_panel.appendChild(main_content_panel);
        content_panel.appendChild(date_panel);
        ppanel.appendChild(content_panel);
        ppanel.appendChild(liner);

        var title_a = this.new_node({
            'tag'   : 'a',
            'href'  : full_link
        }, post_info.title);

        var title_decorator = this.new_node({
            'tag'   : 'h2',
            'class' : 'ttl'
        });

        var txt_ctnt = this.new_div({
            'class' : "txtcont"
        }, post_info.content.substr(0, 300) + '...');

        title_decorator.appendChild(title_a)
        post.appendChild(title_decorator);
        post.appendChild(txt_ctnt);


        // assignment to link

        var link_a = this.new_node({
            'tag'    : 'a',
            'href'   : full_link
        }, "全文链接 &gt;&gt;");

        link.appendChild(link_a);

        // assignment to date
        var date_a = this.new_node({
            'tag'    : 'a',
            'class'  : 'date',
            'href'   : '#',
            'style'  : 'text-decoration: none;'

        });

        var day_span = this.new_node({
            'tag'    : 'span',
            'class'  : 'day'
        }, post_info.date.day);

        var mon_span = this.new_node({
            'tag'    : 'span',
            'class'  : 'month'
        }, kit.vars.months[post_info.date.month]);

        var circle_span = this.new_node({
            'tag'    : 'span',
            'class'  : 'circle'
        });

        date_a.appendChild(day_span);
        date_a.appendChild(mon_span);
        date_a.appendChild(circle_span);
        date_panel.appendChild(date_a);

        return ppanel;

    }

};


kit.init_fn = {

    init_postlst : function() {

        var postlst = kit.node_util.new_div({
            id : 'postlst',
            'class' : 'm-postlst'
        });

        document.getElementById('content').appendChild(postlst);
        return postlst;
    },

    init_pull_notify_btn : function() {
        var pull_notify_btn = $('#pull-arch')[0];
        pull_notify_btn.setAttribute('style', 'margin-left:10px;');
        $('#pull-arch').css('display','none');
        pull_notify_btn.onmouseover = function() {
            this.setAttribute('style', 'margin-left:15px;');
        };
        pull_notify_btn.onmouseout = function() {
            this.setAttribute('style', 'margin-left:10px;');
        };
    },

    window_size_adjust : function() {

        $(window).resize(function() {
            var width = $(this).width();
            var height = $(this).height();

            // adjustment for width re-sizing.
            ( width < kit.vars.std_width ) ?
                // less than 1120 width
                function(diff) {

                    //$('.g-mn').css('position', 'fixed');

                    var width = kit.vars.std_width - diff;
                    // judge whether to minimal width
                    ( width >= kit.vars.min_width )?
                        // get smaller when resized
                        function(width){
                            $('.m-nav').css('width', 500-diff*2/3);
                            $('#pull-arch').show();
                            $('.g-mn').hide();
                            var hidden_pad = $('#post-lst')[0];
                            if ( hidden_pad.children[0].children.length > 0 ) { return; }

                            hidden_pad.children[0].appendChild(
                                kit.node_util.new_div({'class':'archive-item'},'宽屏体验更加.<br>----------------------')
                            );

                            // if it is multi page view
                            if( $('#postlst')[0] ) {

                                var posts = $('#postlst')[0].children;
                                var postslst = kit.node_util.new_node({tag:'ul'});

                                for(var i = 0; i < posts.length; ++i) {
                                    var post_li = kit.node_util.new_node({tag:'li'});
                                    var post = posts[i];
                                    var innerpost = post.children[0].children[0].children[0];
                                    var title = innerpost.children[0];
                                    var content = innerpost.children[1];
                                    var title_div = kit.node_util.new_div({'class':'title_in_hidden'},title.innerHTML);
                                    var content_div = kit.node_util.new_div({'class':'archive-item'},content.innerHTML);

                                    post_li.appendChild(title_div);
                                    post_li.appendChild(content_div);
                                    post_li.appendChild(kit.node_util.new_node({tag:'br'}));
                                    postslst.appendChild(post_li);

                                }

                                hidden_pad.children[0].appendChild(postslst);

                            } else {
                                // for single view
                                var date = $('.dateinner')[0].children[0];
                                var ttl = $('.ttl')[0];
                                var txtcontent = $('.txtcont')[0];

                                var date_div = kit.node_util.new_div({'class':'archive-item'}, date.innerHTML);
                                var ttl_div = kit.node_util.new_div({'class':'title_in_hidden'}, ttl.innerHTML);
                                var cont_div = kit.node_util.new_div({'class':'archive-item'}, txtcontent.innerHTML);
                                hidden_pad.children[0].appendChild(date_div);
                                hidden_pad.children[0].appendChild(ttl_div);
                                hidden_pad.children[0].appendChild(cont_div);
                            }


                        }(width):
                        // nothing happen when current size less than required minimal size
                        function(){
                            $('#pull-arch').show();
                            $('.g-mn').hide();
                        }();
                }(kit.vars.std_width - width) :
                // greater than 1120 width
                function() {
                    $('#pull-arch').hide();
                    $('.g-mn').show();
                }();

            // adjustment for height re-sizing. emitted.

            // for screen size testing.
            //console.log('width:', width, 'height:', height);
        });
    },

    put_new_posts : function(posts_info, to) {

        for (var i in posts_info) {
            var post_info = posts_info[i];
            var p = kit.node_util.new_post(post_info);
            to.appendChild(p);

        }
    },

    init_search_btn : function() {

        $('#search-btn')[0].onclick = function() {
            this.style.visibility = 'hidden';
            var form = $('#search-form')[0];
            form.style.display = 'inline';
            form.parentNode.style.width = '100px';
            form.children[0].autofocus = 'autofocus';
            $('#srch-txt')[0].value = '';
        };

    },

    init_about_me : function() {
        var about_me = $('#about-me')[0];
        Util.js_for_html.load('notify_js', 'js/uk/notify.min.js');

        Util.js_for_html.files_onload['notify_js'].onload = function() {

            var self_intro = '';
            $.getJSON('profile/self.json', function(info){
                about_me.onclick = function() {
                    $.UIkit.notify({
                        message : '>> ' + info.about_me,
                        timeout : info.timeout,
                        pos     : info.position
                    });
                    return false;
                };
            });
        };
    },

    init_archive : function() {

        var postlst = $('.g-mn');
        var archive = $('#offcanvas-1');

        $('#archive-link').click(function() {
            postlst.css('visibility', 'hidden');
            postlst[0].clicked = false;
        });

        archive.click(function() {
            if( postlst[0].clicked) {
                postlst[0].clicked = false;
            } else {
                postlst[0].clicked = false;
                postlst.css('visibility', 'visible');
            }
        });

        $('#archive').click(function() {
            postlst.css('visibility', 'hidden');
            postlst[0].clicked = true;
        });

        alert(kit.tool.dates);
        archive.append('sss');


    },


    fetch_config : function( load_complete_callback ) {
        var that = this;
        $.getJSON('profile/config.json', function(config){
            kit.config = config;
            load_complete_callback(config);
        });
    }
};

kit.tool = {

    dates : [],
    catalog : {},

    get_query_str: function() {
        var r = window.location.search.substr(1);
        if (r!=null)
            return decodeURI(r);
        return null;
    },

    get_url_param : function(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null)
            return decodeURI(r[2]);
        return null;
    },

    str_to_date : function(str) {
        return new Date(str.replace(/-/g,'/'));
    },

    resort_date_post : function(ux) {
        ux.sort(function(a,b){
            return b - a;
        });
        return ux;
    },

    fetch_catalog : function(to, start, end) {
        var that = this;
        if( this.dates.length == 0 ) {
            $.getJSON('profile/catalog.json', function(catalog) {
                for( var date in catalog ) {
                    var format_date = that.str_to_date(date);
                    that.catalog[format_date] = catalog[date];
                    that.dates.push(format_date);
                }
                that.dates = that.resort_date_post(that.dates);
                that.fetch_posts(to, start, end);

            });
        } else {
            this.fetch_posts(to, start, end);
        }
    },

    post_to : function(post, to) {

        if( post == undefined ) { return false; }

        var postdtl = kit.node_util.new_div({ 'class' : 'm-postdtl' });
            // for date
            var m_date  = kit.node_util.new_div({ 'class' : 'm-date' });
                var dateinner = kit.node_util.new_div({ 'class' : 'dateinner' });
                    var date_a  = kit.node_util.new_node({ 'tag' : 'a', 'href' : '#' },
                                                            'Posted @ ' +
                                                            post.date.year  + '-' +
                                                            post.date.month + '-' +
                                                            post.date.day);
            m_date.appendChild(dateinner);
                dateinner.appendChild(date_a);

            // for content
            var m_post_txt = kit.node_util.new_div({ 'class' : 'm-post m-post-txt' });
                var postinner  = kit.node_util.new_div({ 'class' : 'postinner' });
                    var ct = kit.node_util.new_div({ 'class' : 'ct' });
                        var ctc = kit.node_util.new_div({ 'class' : 'ctc box' });
                            var ttl = kit.node_util.new_node({ tag : 'h2', 'class' : 'ttl' });
                                var ttla = kit.node_util.new_node({ tag : 'a', href : '#' }, post.title);
                            var txtcontent = kit.node_util.new_div({ 'class' : 'txtcont' }, post.content);
                    var m_info = kit.node_util.new_div({ 'class' : 'm-info box' });
                        var info1 = kit.node_util.new_div({ 'class' : 'info1 box' });
            m_post_txt.appendChild(postinner);
                postinner.appendChild(ct);
                    ct.appendChild(ctc);
                        ctc.appendChild(ttl);
                            ttl.appendChild(ttla);
                        ctc.appendChild(txtcontent);
                postinner.appendChild(m_info);
                    m_info.appendChild(info1);
        postdtl.appendChild(m_date);
        postdtl.appendChild(m_post_txt);

        var pager = kit.node_util.new_div({ 'class' : 'm-pager m-pager-dtl' });
            var pagerinner = kit.node_util.new_div({ 'class' : 'pagerinner box' });
            pager.appendChild(pagerinner);
                // 2 directions

        var comment = kit.node_util.new_div({ 'class' : 'm-cmthot' });

        to.appendChild(postdtl);
        to.appendChild(pager);
        to.appendChild(comment);

        return true;
    },


    // !!!
    fetch_post   : function(post_url) {
        var that = this;
        $.getJSON('blogs/' + post_url + '.json', function(post) {
            that.post_to( post, document.getElementById('content') );
        });
    },

    fetch_posts  : function(to, start, end) {

        var results;
        if ( end ) {
            results = this.dates.slice(start, end);
        } else {
            results = this.dates.slice(0, start);
        }

        var posts = [];
        var count = 0;
        for( var i in results ) {
            var date = results[i];
            var url = this.catalog[date];

            $.getJSON('blogs/'+url+'.json', function(post){
                var entry = {};
                entry.key = date;
                entry.value = post;
                posts.push(entry);
                count ++;
                if ( count == results.length ) {
                    posts.sort(function(a, b){
                        return b.key - a.key;
                    });

                    var elements = [];
                    posts.forEach(function(element) {
                        element.value.url = url;
                        elements.push(element.value);
                    });
                    kit.init_fn.put_new_posts(elements, to);
                }
            });
        }
    }

};

kit.actions = {
    get_post : function(param) {
        kit.tool.fetch_post(param);
    },

    404 : function() {
        $('#content')[0].innerHTML = '<h1>找不到你要的页面~</h1>';
    }

};