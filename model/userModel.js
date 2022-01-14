const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  // console.log("salt generated", salt);
  this.password = await bcrypt.hash(this.password, salt);
  // console.log("user password before save", this.password);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
