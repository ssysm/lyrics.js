const func = {
    util:{
        parser:require('./Util/lrcParser')
    }
}
window.lyrcisjs = func;

new func.util.parser({file:require('./sample/example')}).parse();

