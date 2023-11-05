const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

reactionSchema.path("createdAt").get(function (timestamp) {
    return formatDate(timestamp);
});

function formatDate(timestamp) {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    return new Date(timestamp).toLocaleString(undefined, options);
}


module.exports = reactionSchema;