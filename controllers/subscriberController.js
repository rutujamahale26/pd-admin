import { Subscriber } from "../models/SubscriberModel.js";


// 📩 Subscribe user
export const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existing = await Subscriber.findOne({ email });

    if (existing) {
      if (existing.isSubscribe) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      // Reactivate old user
      existing.isSubscribe = true;
      await existing.save();

      return res.status(200).json({
        message: "Email re-subscribed successfully",
        email: existing.email,
        isSubscribe: existing.isSubscribe,
      });
    }

    // Create new subscription
    const subscriber = new Subscriber({ email, isSubscribe: true });
    await subscriber.save();

    res.status(201).json({
      message: "Email subscribed successfully",
      email: subscriber.email,
      isSubscribe: subscriber.isSubscribe,
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    if (err.code === 11000)
      return res.status(400).json({ message: "Email already subscribed" });
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🚫 Unsubscribe user
export const unsubscribeUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const existing = await Subscriber.findOne({ email });

    if (!existing) {
      return res.status(404).json({ message: "Email not found" });
    }

    if (!existing.isSubscribe) {
      return res.status(400).json({ message: "Email already unsubscribed" });
    }

    existing.isSubscribe = false;
    await existing.save();

    res.status(200).json({
      message: "Email unsubscribed successfully",
      email: existing.email,
      isSubscribe: existing.isSubscribe,
    });
  } catch (err) {
    console.error("Unsubscribe error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
