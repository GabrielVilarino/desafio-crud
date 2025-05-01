import type { Document, Model } from 'mongoose';
import mongoose from 'mongoose';

export type IUser = {
    nome: string;
    cpf: string;
    email: string;
    telefone?: string;
    saldo: number;
    createdAt: Date;
    updatedAt: Date;
} & Document;

const UserSchema = new mongoose.Schema<IUser>(
    {
        nome: {
            type: String,
            required: true,
            description: 'Nome completo do usuario',
        },
        cpf: {
            type: String,
            required: true,
            description: 'CPF do usuario',
        },
        email: {
            type: String,
            required: true,
            description: 'Email do usuario',
        },
        telefone: {
            type: String,
            required: false,
            description: 'Telefone do usuario',
        },
        saldo: {
            type: Number,
            required: true,
            description: 'Saldo do usuario',
        }
    },
    {
        collection: 'User',
        timestamps: true,
    }
);

export type IMessage = {
    content: string;
    createdAt: Date;
    updatedAt: Date;
} & Document;

export const User: Model<IUser> = mongoose.model('User', UserSchema);
