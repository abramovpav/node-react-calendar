function isToday(date) {
    return date.toDateString() === (new Date()).toDateString()
}

export default isToday;