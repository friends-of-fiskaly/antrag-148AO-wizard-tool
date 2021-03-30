
export default {
    getCurrentDate: () => {
        const date = new Date(Date.now()).toISOString();
        return date.slice(0, 10);
    }, 

    getGDriveDownloadLink: (fileId) => {
        return `https://docs.google.com/uc?export=download&id=${fileId}`;
      },
};
