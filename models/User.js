const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    required: true,
  },
  age: Number,
  height: Number,
  weight: Number,
  createdAt: { type: Date, default: Date.now },
  isAdmin: false,
});

class UserClass {
  static findByEmail(email) {
    return this.findOne({ email });
  }
}

UserSchema.loadClass(UserClass);

module.exports = mongoose.model("User", UserSchema);
