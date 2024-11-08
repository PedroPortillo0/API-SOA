import { MongoClient, Collection } from 'mongodb';
import { Token } from '../../Domain/Entities/Token';
import { ITokenRepository } from '../../Domain/Repositories/ITokenRepository';

export class TokenRepository implements ITokenRepository {
    private collection: Collection<Token>;

    constructor(private client: MongoClient, private databaseName: string, private collectionName: string) {
        this.collection = client.db(databaseName).collection<Token>(collectionName);
    }

    async create(token: Token): Promise<Token> {
        await this.collection.insertOne(token);
        return token;
    }

    async findByUserId(userId: string): Promise<Token | null> {
        return await this.collection.findOne({ userId });
    }

    async verifyToken(userId: string, token: string): Promise<boolean> {
        const foundToken = await this.collection.findOne({ userId, token });
        return !!foundToken;
    }

    async markAsUsed(token: string): Promise<void> {
        await this.collection.updateOne({ token }, { $set: { usedAt: new Date() } });
    }
}
