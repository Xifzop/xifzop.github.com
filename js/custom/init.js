/**
 * Created by tonie on 2/27/14.
 */

// main entrance to the js loaded.
$(function(){

    kit.init_fn.fetch_config(
        function(config) {
            // the following fns may use the configuration
            kit.init_fn.init_pull_notify_btn();
            kit.init_fn.init_search_btn();
            kit.init_fn.window_size_adjust();
            kit.init_fn.init_about_me();

            var query = kit.tool.get_url_param('action');
            var param = kit.tool.get_url_param('param');

            if ( query ) {
                query in kit.actions ?
                kit.actions[query](param) : kit.actions[404]();
            } else {
                // to homepage
                var postlst_div = kit.init_fn.init_postlst();
                kit.tool.fetch_catalog(postlst_div, config.init_load_count);
            }

            kit.init_fn.init_archive();



            var disqus_shortname = 'xifzop'; // required: replace example with your forum shortname

            /* * * DON'T EDIT BELOW THIS LINE * * */
            (function() {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(dsq);
            })();

            (function () {
                var s = document.createElement('script'); s.async = true;
                s.type = 'text/javascript';
                s.src = '//' + disqus_shortname + '.disqus.com/count.js';
                (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
            }());




        }
    );
});