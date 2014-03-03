/**
 * Created by tonie on 2/26/14.
 */

function puts() {
    document.write('>> ');
    if(arguments.length > 0) {
        for (var i in arguments) {
            document.write(arguments[i] + ' ');
        }
    }

    document.write('<br>');
}

function puts_obj(obj) {
    puts('***', 'Def_start:');
    puts('@Type:', typeof obj);
    for (var i in obj) {
        puts('#', 'Attr:', i, 'Value:',obj[i]);
    }
    puts('***','Def_end.');
}

function Student(){
    this.name = '';
    this.age  = '';
    this.introduce_self = function(){
        puts("constructor invoked by " + this.name);
    };
}

Student.prototype = {
    from: "XMFLS"
};