const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
   // create a new thought
   async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }

      res.json({ message: 'Created the thought'});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a thoughts
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.courseId });

      if (!thought) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }

      const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'thought deleted but no user with this id!' });
    }

    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},
  // Update a thoughts
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thoughts' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 // Add a thought reaction
 async addThoughtReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No Thought ID" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},

// Remove thought reaction
async removeThoughtReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
    if (!thought) {
      return res.status(404).json({ message: "No Thought ID" });
    }

    res.json({ message: "Reaction deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
},
};
