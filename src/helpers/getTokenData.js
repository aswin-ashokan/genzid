/**
 * @param {import('next/server').NextRequest} request
 */
import jwt from 'jsonwebtoken';

export const getTokenData = (request) =>{
try {
    const encodedToken = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(encodedToken, process.env.SECRET_TOKEN);
    return decodedToken.id;
} catch (error) {
    throw new Error(error.message);
}
}