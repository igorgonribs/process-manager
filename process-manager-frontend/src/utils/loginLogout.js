const userLoggedSessionProp = "user-logged";

export const saveUserSession = (user) => {
    localStorage.setItem(userLoggedSessionProp, JSON.stringify(user));
}

export const removeUserSession = () => {
    localStorage.removeItem(userLoggedSessionProp);
}

export const redirectByProfile = () => {
    const user = JSON.parse(localStorage.getItem(userLoggedSessionProp));
    console.log(user)
    if(user.profile.id == 1)
        return "/users";
    else 
        return "/processes";
}

export const getUserLogged = () => {
    return JSON.parse(localStorage.getItem(userLoggedSessionProp));
}