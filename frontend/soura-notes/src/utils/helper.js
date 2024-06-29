export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// getting the initals of the user
export const getInitials = (name) => {
    if(!name) return "";
    // const nameArr = name.split(" ");
    // let initials = nameArr[0][0] + nameArr[1][0] + nameArr[2][0];
    // return initials.toUpperCase();

    const words = name.split(" ");
    let NameInitials = "";
    for(let i = 0; i < Math.min(words.length, 4); i++){
        NameInitials += words[i][0];
    }

    return NameInitials.toUpperCase();

    
};