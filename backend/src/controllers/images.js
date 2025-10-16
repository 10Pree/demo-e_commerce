const modlesImages = require("../models/images");

class controllerImages {
    static async Create(req, res) {
        try {
            const image_url = req.body;
            if (!image_url) return res.status(400).json({ message: "Not Image URL" });

            const image = await modlesImages.create(image_url);

            return res.status(200).json({
                message: "Create Image Successful!!",
            });
        } catch (error) {
            console.log("Server Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async getImages(req, res) {
        try {
            const images = await modlesImages.getImageAll();

            return res.status(200).json({
                message: "Get Images Successful!!",
                data: images,
            });
        } catch (error) {
            console.log("Server Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }
    static async getByID(req, res) {
        try {
            const imageId = req.params.id;
            if (!imageId) return res.status(400).json({ message: "Image Not ID" });
            const image = await modlesImages.getById(imageId);

            return res.status(200).json({
                message: "Get Image Successful!!",
                data: image,
            });
        } catch (error) {
            console.log("Server Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }
    static async Update(req, res) {
        try {
            const imageId = req.params.id
            const image_url = req.body
            if (!imageId || !image_url) return res.status(400).json({ message: "Image Not ID and url" })

            const images = await modlesImages.getById(imageId)
            if (images.length === 0) return res.status(400).json({ message: "Image Not Found" })

            // console.log(images, image_url)
            const update = await modlesImages.update(images[0].id, image_url)
            return res.status(200).json({
                message: "Update Image Successful!!"
            })
        } catch (error) {
            console.log("Server Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async Delete(req, res) {
        try {
            const imageId = req.params.id
            if (!imageId) return res.status(400).json({ message: "Image Not ID" })
            
            const rows = await modlesImages.getById(imageId)
            if(rows.length === 0) return res.status(400).json({ message: "Image Not Found" })
            const image = await modlesImages.delete(imageId)
            return res.status(200).json({
                message: "Delete Image Successful!!"
            })
        } catch (error) {
            console.log("Server Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

      static async CreateMap(req, res) {
    try {
        const { products_id, images_id } = req.body
        if(!products_id || !images_id) return res.status(400).json({ message: "Product and Image Not ID"})
        
        const data = { products_id: products_id, images_id: images_id}
        const mapId = await modlesImages.createMap(data)
        return res.status(200).json({
            message: "Create Map ID Product and Image Successful!!"
        })
    } catch (error) {
      console.log("Server Error:", error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  }
}

module.exports = controllerImages;
