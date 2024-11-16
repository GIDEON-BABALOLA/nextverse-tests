const express = require("express")
const path = require("path")
const router = express.Router()
const {
signupDesigner,
loginDesigner,
logoutDesigner,
getCurrentDesigner,
uploadDesignerPicture,
designerRefreshToken,
deleteDesigner,
updateDesigner,
getAllDesigners
} = require(path.join(__dirname, "..", "controllers", "designerController.js"))
const { authMiddleware, isDesigner, bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadProfileImageMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
const {verifyReCAPTCHA } = require(path.join(__dirname, "..", "middlewares", "verifyReCAPTCHA"))
router.post("/register-designer", verifyReCAPTCHA, uploadProfileImageMiddleware,  signupDesigner);
router.post("/login-designer", verifyReCAPTCHA, bruteForceLimiter, loginDesigner)
router.post("/upload-designer-picture", authMiddleware, isDesigner, uploadProfileImageMiddleware,  uploadDesignerPicture)
router.put("/update-designer", authMiddleware, isDesigner, updateDesigner)
router.get("/designer-refresh-token", authMiddleware, isDesigner, designerRefreshToken)
router.get("/get-current-designer", authMiddleware, isDesigner, getCurrentDesigner)
router.get("/get-all-designers",  getAllDesigners)
router.get("/logout-designer", authMiddleware, isDesigner, logoutDesigner)
router.delete("/delete-designer", authMiddleware, isDesigner, deleteDesigner)
module.exports = router
// 0807748966five