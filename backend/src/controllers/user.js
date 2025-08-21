const modelsUser = require("../models/user");
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

      await modelsUser.create(userDate);

      console.log("Create User Successful!!");
      return res.status(201).json({
        message: "Create User Successful!!",
      });
    } catch (error) {
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
        return res.status(404).json({
          message: "User Not found",
        });
      }
      const userData = await modelsUser.read(userId);
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
      const userId = req.params.id;
      const checkUserId = await modelsUser.read(userId);
      if (checkUserId.length === 0) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }
      const { username, email, phone, address } = req.body;
      const userData = {};

      if (username) {
        userData.username = username;
      }
      if (email) {
        userData.email = email;
      }
      if (phone) {
        userData.phone;
      }
      if (address) {
        userData.address;
      }
      const newData = await modelsUser.update(userId, userData);
      return res.status(200).json({
        message: "Update Successful!!",
        data: newData,
      });
    } catch (error) {
      console.log("Message Error:", error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  }

  static async UpdatePassword(req, res) {
    try {
      const userId = req.params.id;
      const rows = await modelsUser.getPassword(userId);
      if (rows.length === 0) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }

      //   const oldPassword = rows[0].password

      const newPassword = req.body.password || {};

      const newHash = await hashPassword(newPassword);
      const results = await modelsUser.updatePassword(userId, newHash);

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
        if(rows.length === 0){
            return res.status(404).json({
                message: "User Not Found"
            })
        }

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
