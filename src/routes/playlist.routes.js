import { Router } from "express";
import {
    createPlaylist,
    getPlaylistById,
    addVideoToPlaylist
}
    from "../controllers/playlist.controllers.js"

import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";



const router = Router();

router
    .route("/createPlaylist")
    .post(
        verifyJWT,
        upload.fields([{ name: "video", maxCount: 1 }]),
        createPlaylist
    );
router
    .route("/:playlistId")
    .get(verifyJWT, getPlaylistById
    )
router
    .route("/addVideoToPlaylist")
    .post(verifyJWT, addVideoToPlaylist
    );

export default router; 