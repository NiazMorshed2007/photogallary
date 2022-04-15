export const dateFormatter = (type: 'm/d/y' | 'm/h/d/m'): string => {
    var options:any = { year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    if(type === 'm/d/y') {
        return today.toLocaleDateString("en-US", options).toString(); // Saturday, September 17, 2016
    } else if (type === 'm/h/d/m') {
        return today.toLocaleString().toString();
    } else {
        return ''
    }
}
