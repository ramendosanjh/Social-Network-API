const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');


// Schema to create Thought model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Define a getter method to format the timestamp
thoughtSchema.path('createdAt').get(function (timestamp) {
    return formatDate(timestamp);
  });
  
  function formatDate(timestamp) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  }

// Virtual to retrieve the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;