function getValue(dict, key, defaultValue) {
    if (!(dict.hasOwnProperty(key))) {
        return defaultValue;
    }
    return dict[key];
}

export default getValue;
