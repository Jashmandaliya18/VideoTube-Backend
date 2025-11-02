import mongoose from "mongoose";
import { Playlist } from "../models/playlist.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Apierror } from "../utils/Apierror.js"
import { Apiresponce } from "../utils/Apiresponce.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.models.js"


const createPlaylist = asyncHandler(async (req, res) => {
    // TODO: Create Playlist

    const { name, description } = req.body

    if (!name) {
        throw new Apierror(400, "Name is required");
    }
    if (!description) {
        throw new Apierror(400, "Playlist Description is required");
    }

    const exitedPlaylist = await Playlist.findOne({ name });

    if (exitedPlaylist) {
        throw new Apierror(409, "Playlist with this name is already existed")
    }

    const videoLocalPath = req.files?.video[0]?.path;
    const video = await uploadOnCloudinary(videoLocalPath);

    if (!video) {
        throw new Apierror(501, "Video upload failed");
    }
    const newVideo = await Video.create({
        videoFile: video.url,
        thumbnail: "",
        owner: req.user._id,
        title: "Sample Title",
        description: "Sample Description"
    });

    const playlist = await Playlist.create({
        name: name.toLowerCase(),
        description,
        video: [newVideo._id],
        owner: req.user._id
    })

    const createdPlaylist = await Playlist.findById(playlist._id)

    if (!createdPlaylist) {
        throw new Apierror(500, "Error while creating playlist")
    }

    console.log("Playlist Created Successfully");

    return res
        .status(201)
        .json(
            new Apiresponce(
                createdPlaylist,
                "Playlist Created Successfully"
            )
        )

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    // TODO: get user playlists
})

const getPlaylistById = asyncHandler(async (req, res) => {
    // TODO: get playlist by id
    const { playlistId } = req.params

    if (!playlistId) {
        throw new Apierror(401, "Playlist Id is required")
    }

    const playlist = await Playlist.findById(playlistId).populate("video")

    if (!playlist) {
        throw new Apierror(401, "Playlist not found")
    }

    console.log("Playlist fetched successfully");


    return res
        .status(200)
        .json(
            new Apiresponce(
                200,
                playlist,
                "Playlist fetched successfully"
            )
        )
})


const addVideoToPlaylist = asyncHandler(async (req, res) => {
    // TODO: add video
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    // TODO: detele the plylist
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist
}
