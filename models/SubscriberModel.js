import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
        email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isSubscribe: {
      type: Boolean,
      default: false, // default is subscribed
    },
}, {timestamps: true})


// Ensure MongoDB index is created
// subscriberSchema.index({ email: 1 }, { unique: true });

export const Subscriber = mongoose.model('Subscriber', subscriberSchema);