import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  template: {
    type: String,
    default: 'classic',
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  shareId: {
    type: String,
    unique: true,
    sparse: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);