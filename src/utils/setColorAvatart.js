function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

export function stringAvatar(name) {
    let children = ''
    if (!name) return null
    for (let i = 0; i < (name.split(' ').slice(0, 2)).length; i++) {
        children += `${name.split(' ')[i][0]}`
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children
    };

}