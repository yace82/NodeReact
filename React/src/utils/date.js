export const formatDate = (date) => {
    let parsedDate = date;

    if (typeof date === "string") {
        parsedDate = new Date(date);
    }

    // eslint-disable-next-line no-unused-vars
    const alternateForm = `${parsedDate.getDate()}/${parsedDate.getMonth() + 1}/${parsedDate.getFullYear()}`;

    return parsedDate.getDate() + "/" + (parsedDate.getMonth() + 1) + "/" + parsedDate.getFullYear();
};
