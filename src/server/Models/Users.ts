// const mongoose = require('mongoose');
// const crypto = require('crypto');
import crypto from 'crypto';
const jwt = require('jsonwebtoken');

// https://medium.freecodecamp.org/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e

// the User object
export class User {
    id!: string;
    email!: string;
    hash!: string;
    salt!: string;

    setPassword(password: string): void {
        console.log("setPassword");
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };

    validatePassword(password: string): boolean {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    };

    generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: this.id,
            exp: expirationDate.getTime()//parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
    }

    toAuthJSON() {
        return {
            id: this.id,
            email: this.email,
            token: this.generateJWT(),
        };
    };
}