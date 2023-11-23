//Translates color received into proper class for tags and the like

export function colorToClass(color){
    let className = "";
    switch (color) {
        case 'red':
            className = 'bg-danger';
            break;
        case 'green':
            className = 'bg-success';
            break;
        case 'yellow':
            className = 'bg-warning';
            break;
        default:
            console.warn('unregistered color received: ' + color)
            className = 'bg-light';
            break;
    }
    return className;
}