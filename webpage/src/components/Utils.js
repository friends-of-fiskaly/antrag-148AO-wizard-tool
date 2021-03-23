function getCurrentDate() {
    const date = new Date(Date.now()).toISOString();
    return date.slice(0, 10);
}

module.exports = {
    "getCurrentDate": getCurrentDate
};