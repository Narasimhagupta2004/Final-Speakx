const mongoose = require('mongoose'); 

const blockSchema = new mongoose.Schema({
  text: {
      type: String,
      required: true
  },
  showInOption: {
      type: Boolean,
      default: true
  },
  isAnswer: {
      type: Boolean,
      default: true
  }
});

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  isCorrectAnswer: {
    type: Boolean,
    default: false
  }
});

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  anagramType: {
    type: String,
    required: true
  },
  blocks: [blockSchema],
  solution: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  options: [optionSchema],
  siblingId :{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Question',
    default :null
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question
