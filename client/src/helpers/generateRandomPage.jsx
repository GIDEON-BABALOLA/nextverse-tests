export const generateRandomPage = (sentPage) => {
    const page = sentPage - 1
    const number = Math.floor(Math.random() * page) + 1;
     // Check if the generated number is 5
     if (number === page) {
        return generateRandomPage(sentPage); // Recurse if the number is 5
        
    }
    return number; 
}

