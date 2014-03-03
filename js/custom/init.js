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

        }
    );



});