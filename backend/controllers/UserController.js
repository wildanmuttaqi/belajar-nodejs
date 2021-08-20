var rm = require('../helper/ResponseManager');
var _ = require('lodash');
var Models = require('../models/')
var { idSchema, createSchema, changePasswordSchema } = require('../validators/UserValidator');

/**
 * @api {get} /users Find Users
 * @apiPermission id_user_group [A]
 * @apiName Get Users
 * @apiGroup API
 */
exports.find = async (req, res) => {
  User = await Models.user.findAll({
    attributes: ['id', 'full_name', 'email', 'phone_number', 'createdAt', 'updatedAt'],
    raw: true
  })

  res.data = User;
  res.msg = "sukses mendapatkan data";
  rm.SendResponse(res);
}

/**
 * @api {post} /users Create Users
 * @apiPermission id_user_group [A]
 * @apiName Crete Users
 * @apiGroup API
 *
 * @apiParam {String} email email of the User.
 * @apiParam {String} password  password of the User.
 * @apiParam {String} full_name  fullname of the User.
 * @apiParam {Number} phone_number  phone number of the User.
 */
exports.register = async (req, res) => {
  let body = {
    ...req.body
  };

  const result = createSchema.validate(body)
  if(result.error){
    res.code = 422;
    res.error = result.error.details;
    rm.SendValidation(res);
    return;
  }

  try {
    let User = {};
    User = await Models.user.findOne({
      where:{
        email: body.email
      }
    }).catch((error) => {
      throw error;
    })

    if(!User){
      User = await Models.user.create(body).catch((error) => {
        throw error;
      })
      res.data = User;
      res.msg = "user berhasil dibuat";
    } else {
      throw new Error('user sudah ada');
    }

  } catch (error) {
    res.msg = error.message;
    res.data = error;
    res.code = 500;
  }
  rm.SendResponse(res);
}

/**
 * @api {patch} /users/:id Change Password User
 * @apiName Change Password User
 * @apiGroup API
 *
 * @apiParam {Number} id ID of the User.
 * @apiQuery {String} [password] Password of the User.
 * @apiQuery {String} [password_confirmation] Password Confirmation.
 */
exports.changePassword = async (req, res) => {
  let body = {
    ...req.body,
    ...req.params
  }

  const result = changePasswordSchema.validate(body)
  if(result.error){
    res.code = 422;
    res.error = result.error.details;
    rm.SendValidation(res);
    return;
  }

  console.log(body.password)
  try {
    let User = {}
    User = await Models.user.update({
      password: body.password
    }, {
      where: {
        id: body.id
      }
    }).catch((error) => {
      throw error;
    })

    res.msg = "password berhasil diubah";
  } catch (error) {
    res.msg = error.message;
    res.data = error;
    res.code = 500;
  }
  rm.SendResponse(res);
}

/**
 * @api {delete} /users/:id Destroy User
 * @apiPermission id_user_group [A]
 * @apiName Destroy User
 * @apiGroup API
 *
 * @apiParam {Number} id ID of the User.
 */
exports.delete = async (req, res) => {
  let body = {
    ...req.params
  }
  const result = idSchema.validate(body)
  if(result.error){
    res.code = 422;
    res.error = result.error.details;
    rm.SendValidation(res);
    return;
  }

  try {
    await Models.user.destroy({
      where: {
        id: body.id
      }
    })
    res.msg = "berhasil dihapus";
  } catch (error) {
    res.msg = error.message;
    res.data = error;
    res.code = 500;
  }
  rm.SendResponse(res);
}
