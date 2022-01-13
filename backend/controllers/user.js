const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');
const {Op} = require('sequelize');

require('dotenv').config({ path: '../.env'});

const User = require('../models/user');
const { getUserDecodedToken } = require('../middleware/utils');

const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces();

exports.signup = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
  .then(user => {
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
  });

  if (!emailValidator.validate(req.body.email)){
    return res.status(400).json({ message: 'The email format is not valid !' });
  }

  if (!passwordSchema.validate(req.body.password)){
    return res.status(400).json({ message: 'The password should contain at least 8 characters with at least 1 number, an uppercase and a lowercase, and should not contain any space !' });
  }

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        jobTitle: req.body.jobTitle,
        email: req.body.email,
        password: hash,
        // avatar: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
      })
    .then(() => res.status(201).json({ message: 'User created !' }))
    .catch(error => res.status(400).json({ message: error.message }));
    })
    .catch(error => res.status(500).json({ message: error.message }));
};

exports.login = (req, res, next) => {
  User.findOne({ where: {
    [Op.or]: [
      { email: req.body.email },
      { userName: req.body.email }
    ]
  }})
    .then(user => {
      if (!user) {
        return res.status(401).json({ message : "This user does not exist !" });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((userPasswordValid) => {
          if (!userPasswordValid) {
            return res.status(401).json({ message: "The password is incorrect !"});
          }
          res.status(200).json({
            message: "User successfully logged in !",
            admin: user.isAdmin,
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              process.env.SECRET_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ message: error.message }));
    })
    .catch(error => {
      return res.status(500).json({ message: error.message });
    });
};

exports.getProfile = (req, res, next) => {
  User.findOne({ where: { id: getUserDecodedToken(req) } })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ message: error.message }));
};

exports.updateProfile = (req, res, next) => {
  // const userObject = req.file ?
  //   {
  //     ...JSON.parse(req.body.user),
  //     avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  //   } : { ...req.body };
  if (req.body.newPassword) {
    bcrypt.hash(newPassword, 10)
      .then(hash => {
        User.update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          jobTitle: req.body.jobTitle,
          email: req.body.email,
          password: hash,
          },
          { where: { id: getUserDecodedToken(req) }})
          .then(() => res.status(200).json({ message: 'Profile updated successfully !'}))
          .catch(error => res.status(400).json({ message: error.message }));
      })
  } else {
      User.update(
        { ...req.body },
        { where: { id: getUserDecodedToken(req) }})
        .then(() => res.status(200).json({ message: 'Profile updated successfully !'}))
        .catch(error => res.status(400).json({ message: error.message }));
  }
};

exports.deleteProfile = (req, res, next) => {
  User.findOne({ where: { id: getUserDecodedToken(req) } })
    .then(user => {
      // const filename = user.avatar.split('/images/')[1];
      // fs.unlink(`images/${filename}`, () => {
        User.destroy({ where: { id: getUserDecodedToken(req) } })
          .then(() => res.status(200).json({ message: 'Profile deleted successfully !'}))
          .catch(error => res.status(400).json({ message: error.message }));
      // });
    })
    .catch(error => res.status(500).json({ message: error.message }));
};
