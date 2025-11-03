import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";

const getAllVideo = asyncHandler(async (req, res) => {
    //TODO: get all videos based on query, sort, pagination
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
})


const publishVideo = asyncHandler(async (req, res) => {
    // TODO: get video, upload to cloudinary, create video
    const { title, description } = req.body
})

const getVideoById = asyncHandler(async (req, res) => {
    //TODO: get video by id
    const { videoId } = req.params
})

const updateVideo = asyncHandler(async (req, res) => {
    //TODO: update video details like title, description, thumbnail
    const { videoId } = req.params
})

const deleteVideo = asyncHandler(async (req, res) => {
    //TODO: delete video
    const { videoId } = req.params
})

const togglePublicStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})


export {
    getAllVideo,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublicStatus
}