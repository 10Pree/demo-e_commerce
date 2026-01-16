const modelsUser = require("../models/user");
const { CreateLogAction } = require("../services/logAction");
const { hashPassword } = require("../services/password-service");

class controllersUser {
  static async Create(req, res) {
    try {
      
      const { username, password, email, phone, address } = req.body;
      const hash_Password = await hashPassword(password);
      const userDate = {
        username,
        password: hash_Password,
        email,
        phone,
        address,
      };
      const user = await modelsUser.create(userDate);
      const token = req.cookies.access_token
      const userId = user.insertId

      try {
        await CreateLogAction(userId, token, "Create.User")
      } catch (error) {
        console.warn("Log failed:", error?.message || error);
      }

      return res.status(201).json({
        message: "Create User Successful!!",
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: "Duplicate entry (username or email already exists)" })
      }
      console.log("Message Error:", error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  }

  static async Reads(req, res) {
    try {
      const userData = await modelsUser.reads();
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

  static async Read(req, res) {
    try {
      const userId = req.params.id;
      if (userId === null) {
        return res.status(400).json({
          message: "User Not found",
        });
      }
      const userData = await modelsUser.read(userId);
      if (userData.length === 0) {
        return res.status(400).json({
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
      const user = await modelsUser.read(userId);
      if (user.length === 0) {
        return res.status(400).json({
          message: "User Not Found",
        });
      }
      const { username, email, phone, address } = req.body;
      const userData = {};

      if (username) userData.username = username;
      if (email) userData.email = email;
      if (phone) userData.phone = phone
      if (address) userData.address = address

      const newData = await modelsUser.update(userId, userData);
      const userID = user[0].id
      const token = req.cookies.access_token
      try {
        await CreateLogAction(userID, token, "Update.User")
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
        return res.status(400).json({
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

      const userID = user[0].id
      const token = req.cookies.access_token 

      await CreateLogAction(userID, token, "Update.User")
      return res.status(201).json({
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
        return res.status(404).json({
          message: "User Not Found"
        })
      }
      
      const userID = rows[0].id
      const token = req.cookies.access_token
      await CreateLogAction(userID, token, "Delete.User")

      await modelsUser.delete(userId)
      return res.status(200).json({
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
