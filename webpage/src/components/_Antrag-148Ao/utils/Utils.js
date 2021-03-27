
export default {
    getCurrentDate: () => {
        const date = new Date(Date.now()).toISOString();
        return date.slice(0, 10);
    }, 
};
