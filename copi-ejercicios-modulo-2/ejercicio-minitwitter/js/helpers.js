const getDate = () => {
    const now = new Date();

    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    return `${day}/${month}/${year}`;
};

export default getDate;
