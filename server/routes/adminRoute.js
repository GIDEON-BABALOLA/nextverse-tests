const express = require("express")
const path = require("path")
const router = express.Router()
const {
signupAdmin,
loginAdmin,
logoutAdmin,
getCurrentAdmin,
uploadAdminPicture,
adminRefreshToken,
deleteAdmin,
updateAdmin,
followUser,
adminDeleteUser,
getAnAdmin,
getAllUsers,
getAllUsersByAdmin,
getTotalNumberOfUsers,
getCurrentAdminStories,
getAdminProfile,
resendAdminVerification,
verifyAdminRegistration,
unfollowUser,
duplicateUsername,
getAdminBookmarks,
getUserStories
} = require(path.join(__dirname, "..", "controllers", "adminController.js"))
const { authMiddleware, isAdministrator, bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadProfileImageMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
const {verifyReCAPTCHA } = require(path.join(__dirname, "..", "middlewares", "verifyReCAPTCHA"))
router.post("/register-admin", verifyReCAPTCHA, signupAdmin);
router.post("/verify-admin-registration", verifyAdminRegistration)
router.post("/resend-admin-verification",   resendAdminVerification)
router.post("/login-admin", verifyReCAPTCHA,  bruteForceLimiter, loginAdmin)
router.post("/upload-admin-picture", authMiddleware, isAdministrator, uploadProfileImageMiddleware,  uploadAdminPicture)
router.post("/follow-user", authMiddleware, isAdministrator, followUser)
router.post("/unfollow-user", authMiddleware, isAdministrator, unfollowUser)
router.post("/duplicate-username", duplicateUsername)
router.put("/update-admin", authMiddleware, isAdministrator, updateAdmin)
router.get("/admin-refresh-token", authMiddleware, isAdministrator, adminRefreshToken)
router.get("/get-current-admin", authMiddleware, isAdministrator, getCurrentAdmin)
router.get("/get-an-admin/:id", authMiddleware, isAdministrator, getAnAdmin)
router.get("/get-all-users", authMiddleware, isAdministrator, getAllUsers)
router.get("/get-admin-profile", authMiddleware, getAdminProfile)
router.get("/get-admin-bookmarks", authMiddleware, getAdminBookmarks)
router.get("/get-user-stories/:username", authMiddleware, getUserStories)
router.get("/get-all-users-by-admin", authMiddleware, isAdministrator, getAllUsersByAdmin)
router.get("/get-total-number-of-users", authMiddleware, isAdministrator, getTotalNumberOfUsers)
router.get("/get-current-admin-stories", authMiddleware, getCurrentAdminStories)
router.get("/logout-admin", authMiddleware, isAdministrator, logoutAdmin)
router.delete("/delete-user/:email", authMiddleware, isAdministrator, adminDeleteUser)
router.delete("/delete-admin", authMiddleware, isAdministrator, deleteAdmin)
module.exports = router