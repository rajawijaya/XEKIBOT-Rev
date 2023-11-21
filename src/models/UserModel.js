const { model, Schema } = require('mongoose');

const levelSchema = new Schema({
    level: {
        type: Number,
        default: 1
    },
    exp: {
        type: Number,
        default: 0
    },
    expNeed: {
        type: Number,
        default: 50
    },
})

const limitSchema = new Schema({
    limit: {
        type: Number,
        default: 30
    },
    updateLimit: {
        type: Number,
        default() {
            const currentDate = new Date();
            return currentDate.getDay();
        }
    }
})

const subsSchema = new Schema({
    plan: {
        type: String,
        enum: ['Regular member', 'Premium member', 'Vip member'],
        default: 'Regular member',
    },
    expired: {
        type: String,
        default: "-"
    }
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['Owner', 'Contributor', 'Member', 'Stranger'],
        default: 'Stranger',
    },
    rank: {
        type: String,
        enum: [
            "Newbie II", "Newbie I",
            "Explorer III", "Explorer II", "Explorer I",
            "Challenger IV", "Challenger III", "Challenger II", "Challenger I",
            "Expert V", "Expert IV", "Expert III", "Expert II", "Expert I",
            "Master VI", "Master V", "Master IV", "Master III", "Master II", "Master I",
            "Legendary VII", "Legendary VI", "Legendary V", "Legendary IV", "Legendary III", "Legendary II", "Legendary I",
            "Lord VIII", "Lord VII", "Lord VI", "Lord V", "Lord IV", "Lord III", "Lord II", "Lord I",
            "GOD"
        ],
        default: 'Newbie II',
    },
    level: {
        type: levelSchema,
        default: {}
    },
    limitPerDay: {
        type: limitSchema,
        default: {}
    },
    subscription: {
        type: subsSchema,
        default: {}
    }
});

const User = model('User', userSchema);

module.exports = User;
