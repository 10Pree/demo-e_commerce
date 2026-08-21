const modelsImagesUsers = require("../models/images_users");
const modelsUser = require("../models/user");
const path = require('path')
const fs = require('fs/promises')
const { CreateLogAction } = require("../services/logAction");
const { hashPassword } = require("../services/password-service");
const modelsOAuth = require("../models/auth");
const { getConnection } = require("../config/db");
const path_Users = path.join(__dirname, '../../uploads/users')

class controllersUser {
  static async Create(req, res) {
    const conn = await getConnection()
    try {
      await conn.beginTransaction()
      const { username, password, email, phone, address, role } = req.body;
      const file_images = req.files.map(file => {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
        const url = `/uploads/users/${filename}`
        return {
          filename,
          buffer: file.buffer,
          url
        }
      })
      const hash_Password = await hashPassword(password);
      const userDate = {
        username,
        password: hash_Password,
        email,
        phone,
        address,
      };

      const user = await modelsUser.create(userDate, conn);


      if (Array.isArray(file_images) && file_images.length > 0) {
        const imagsId = []
        for (const img of file_images) {
          const row = await modelsImagesUsers.create(img.url, conn)
          imagsId.push(row.insertId)
        }

        const rows = imagsId.map(imgId => [user.insertId, imgId])
        await modelsImagesUsers.createMap(rows, conn)
      }

      if (user) {
        try {
          const data = { users_id: user.insertId, roles_id: role || 2 }
          const map = await modelsOAuth.mapRoleUser(data, conn)
        } catch (error) {
          throw new Error("Failed to map user and role: " + error.message)
        }
      }
      const actionUser = req.user.userId
      const newUserId = user.insertId

      try {
        await CreateLogAction(newUserId, actionUser, "Create.User", conn)
      } catch (error) {
        throw new Error("Failed to create log action: " + error.message)
      }

      await conn.commit()

      await fs.writeFile(path.join(path_Users, file_images[0].filename), file_images[0].buffer)

      return res.status(201).json({
        message: "Create User Successful!!",
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: "Duplicate entry (username or email already exists)" })
      }
      console.log("Message Error:", error);
      await conn,rollback()
      return res.status(500).json({
        message: "Server Error",
      });
    } finally {
      conn.release()
    }
  }

  static async Reads(req, res) {
    try {
      const userData = await modelsUser.readsMapRole();
      return res.status(200).json({
        message: "Reads User Successful!!",
        data: userData,
      });
    } catch (error) {
      console.log("Message Error:", error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  }

  static async ReadById(req, res) {
    try {
      const userId = req.params.id;
      if (userId === null) {
        return res.status(404).json({
          message: "User Not found",
        });
      }
      const userData = await modelsUser.readById(userId);
      if (userData.length === 0) {
        return res.status(404).json({
          message: "User Not found",
        });
      }

      return res.status(200).json({
        message: "Read User Successful!!",
        data: userData,
      });
    } catch (error) {
      console.log("Message Error:", error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  }

  static async Update(req, res) {
    try {
      const userId = req.params.id
      const file_Images = req.files
      const user = await modelsUser.read(userId);
      if (user.length === 0) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }
      const { username, email, phone, address, role } = req.body;
      const userData = {};

      if (username) userData.username = username;
      if (email) userData.email = email;
      if (phone) userData.phone = phone
      if (address) userData.address = address

      if (Array.isArray(file_Images) && file_Images.length > 0) {
        const imagsId = []
        const image = await modelsImagesUsers.getImgByIdUsers(userId)

        for (const img of image) {
          const fullPath = path.join(__dirname, '../../', img.image_url)

          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath)
          }
        }
        await modelsImagesUsers.deleteImgByIdUsers(userId)
        for (const img of file_Images) {
          const url = `/uploads/users/${img.filename}`
          const row = await modelsImagesUsers.create(url)
          imagsId.push(row.insertId)
        }

        const rows = imagsId.map(imgId => [userId, imgId])
        await modelsImagesUsers.createMap(rows)
      }

      let newData = null
      if (Object.keys(userData).length > 0) {
        newData = await modelsUser.update(userId, userData);
      }

      if (role) {
        const data = { roles_id: role }
        console.log(userId, data)
        const map = await modelsOAuth.updateMapRoleUser(userId, data)
      }

      try {
        await CreateLogAction(userId, req.user.userId, "Update.User")
      } catch (error) {
        console.warn("Log failed:", error?.message || error)
      }

      return res.status(200).json({
        message: "Update Successful!!",
        data: newData,
      });
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: "Duplicate entry (username or email already exists)" });
      }
      console.log("Message Error:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async UpdatePassword(req, res) {
    try {
      const userId = req.params.id;
      const newPassword = req.body.password || {};
      const user = await modelsUser.read(userId)
      if (user.Length === 0) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }
      const rows = await modelsUser.getPassword(userId);
      if (rows.length === 0) {
        return res.status(400).json({
          message: "User Not Found",
        });
      }

      const newHash = await hashPassword(newPassword);
      await modelsUser.updatePassword(userId, newHash);

      const actionUser = req.user.userId
      const DataUserId = userId

      await CreateLogAction(DataUserId, actionUser, "Update.User")
      return res.status(200).json({
        message: "Update Password Successful!!",
      });
    } catch (error) {
      console.log("Message Error", error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  }

  static async Delete(req, res) {
    try {
      const userId = req.params.id
      const rows = await modelsUser.read(userId)
      if (rows.length === 0) {
        throw new Error("User Not Found")
      }

      const actionUser = req.user.userId
      const DataUserId = userId
      await CreateLogAction(DataUserId, actionUser, "Delete.User")

      await modelsUser.softdelete(userId)
      
      return res.status(204).json({
        message: "Delete Successful!!"
      })
    } catch (error) {
      console.log("Message Error", error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  }


}

module.exports = controllersUser;
