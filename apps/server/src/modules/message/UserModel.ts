import type { Document, Model } from 'mongoose';
import mongoose from 'mongoose';

export type IUser = {
    nome: string;
    cpf: string;
    conta: number;
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
        conta: {
            type: Number,
            required: true,
            description: 'Conta do usuario',
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

export const User: Model<IUser> = mongoose.model('User', UserSchema);
