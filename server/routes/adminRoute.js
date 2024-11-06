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
adminDeleteUser,
getAUser,
getAllUsers,
getTotalNumberOfUsers
} = require(path.join(__dirname, "..", "controllers", "adminController.js"))
const { authMiddleware, isAdministrator, bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadProfileImageMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
router.post("/register-admin", signupAdmin);
router.post("/login-admin", bruteForceLimiter, loginAdmin)
router.post("/upload-admin-picture", authMiddleware, isAdministrator, uploadProfileImageMiddleware,  uploadAdminPicture)
router.put("/update-admin", authMiddleware, isAdministrator, updateAdmin)
router.get("/admin-refresh-token", authMiddleware, isAdministrator, adminRefreshToken)
router.get("/get-current-admin", authMiddleware, isAdministrator, getCurrentAdmin)
router.get("/get-a-user/:email", authMiddleware, isAdministrator, getAUser)
router.get("/get-all-users", authMiddleware, isAdministrator, getAllUsers)
router.get("/get-total-number-of-users", authMiddleware, isAdministrator, getTotalNumberOfUsers)
router.get("/logout-admin", authMiddleware, isAdministrator, logoutAdmin)
router.delete("/delete-user/:email", authMiddleware, isAdministrator, adminDeleteUser)
router.delete("/delete-admin", authMiddleware, isAdministrator, deleteAdmin)
module.exports = router