
function getCurrentDate() {
    const date = new Date(Date.now()).toISOString();
    return date.slice(0, 10);
}


function makePDF(template) {
    // https://stackoverflow.com/questions/742271/generating-pdf-files-with-javascript
    // https://parall.ax/products/jspdf
    // http://pdfmake.org/#/
    const doc = new jsPDF();
    return doc;
}

module.exports = {
    "getCurrentDate": getCurrentDate, 
    "makePDF": makePDF,
};