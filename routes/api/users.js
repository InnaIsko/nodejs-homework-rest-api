const express = require("express");

const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { users } = require("../../controllers");
const {
  schemaSingup,
  schemaLogin,
  schemaVerify,
  schemaUpdateSubscription,
} = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(schemaSingup), ctrlWrapper(users.signup));

router.post("/login", validation(schemaLogin), ctrlWrapper(users.login));

router.get("/current", auth, ctrlWrapper(users.getCurrent));

router.get("/logout", auth, ctrlWrapper(users.logout));

router.get("/verify/:verificationToken", ctrlWrapper(users.verifyEmail));

router.post(
  "/verify",
  validation(schemaVerify),
  ctrlWrapper(users.resentVerifyEmail)
);

router.patch(
  "/",
  auth,
  validation(schemaUpdateSubscription),
  ctrlWrapper(users.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(users.updateAvatar)
);

module.exports = router;
