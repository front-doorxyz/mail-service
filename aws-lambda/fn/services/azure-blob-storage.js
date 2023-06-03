const { BlobServiceClient } = require('@azure/storage-blob')
const { streamToString } = require('../utils/index.js')
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)
module.exports = {
    upload : async (fileName, verificationCode) => {
        try {
            verificationCode = verificationCode.toString()
            const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINERNAME)
            const blockBlobClient = containerClient.getBlockBlobClient(fileName)
            const uploadBlobResponse = await blockBlobClient.upload(verificationCode, verificationCode.length)
            return uploadBlobResponse;
        }
        catch (err) {
            return err
        }
    },
    download: async (blobName) => {
        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINERNAME)
        const blockBlobClient = containerClient.getBlobClient(`${blobName}`)
        const downloadBlockBlobResponse = await blockBlobClient.download(0)
        return await streamToString(downloadBlockBlobResponse.readableStreamBody)
    }

}