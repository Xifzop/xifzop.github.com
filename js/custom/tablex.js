/**
 * Created by tonie on 3/1/14.
 */

XUtil.patch('add_new_table_btn', function( name, table_parent, fields, caption ) {

    var button = this.new_('button');
    button.innerHTML = name;

    button.onclick = function() {
        var t = new window.XTable({
            caption : caption,
            fields  : fields
        });
        table_parent.appendChild(t.table_element);
    };

    return button;
});