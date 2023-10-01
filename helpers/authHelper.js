import bcrypt from 'bcrypt';
import colors from 'colors';
export const hashPassword = async (password) =>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
};
export const comparedPassword = async ( password, hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword);
}