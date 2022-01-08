const bcrypt = require('bcrypt');
const saltRounds = 10;

const createPassword = async (password) =>{
    try {
        const passwordHash = await bcrypt.hash(password, saltRounds);
        return passwordHash;
    } catch (error) {
        console.log(error.stack)
    }
    
}

const validPassword = async (password, userPassword)=> {
    try {
        const match = await bcrypt.compare(password, userPassword);
        return match;
    } catch (error) {
        console.log(error)
    }
   
}

module.exports = {createPassword,validPassword}