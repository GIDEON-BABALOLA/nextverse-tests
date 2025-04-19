export const generateRandomPage = (sentPage) => {
    const page = sentPage - 1
    const number = Math.floor(Math.random() * page) + 1;
     if (number === page && page !== 1) {
        return generateRandomPage(sentPage);
    }
    return number; 
}

