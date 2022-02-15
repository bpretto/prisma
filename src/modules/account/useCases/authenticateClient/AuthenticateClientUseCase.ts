import { prisma } from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "../../../../config/auth"; 

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Invalid username or password!");
        }

        const passwordMatch = await compare(password, client.password)

        if (!passwordMatch) {
            throw new Error("Invalid username or password!");
        }

        const token = sign({username}, auth.client_secret, {
            subject: client.id,
            expiresIn: "1d"
        })

        return token;
    }
}