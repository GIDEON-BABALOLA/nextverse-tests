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
} = require(path.join(__dirname, "..", "controllers", "designerController.js"))
const { authMiddleware, isDesigner, bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadProfileImageMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
router.post("/register-designer", uploadProfileImageMiddleware,  signupDesigner);
router.post("/login-designer", bruteForceLimiter, loginDesigner)
router.post("/upload-designer-picture", authMiddleware, isDesigner, uploadProfileImageMiddleware,  uploadDesignerPicture)
router.put("/update-designer", authMiddleware, isDesigner, updateDesigner)
router.get("/designer-refresh-token", authMiddleware, isDesigner, designerRefreshToken)
router.get("/get-current-designer", authMiddleware, isDesigner, getCurrentDesigner)
router.delete("/delete-designer", authMiddleware, isDesigner, deleteDesigner)
router.get("/logout-designer", logoutDesigner)
module.exports = router
// 0807748966five