var jwt = require('jsonwebtoken');
var rm = require('../helper/ResponseManager');
var Models = require('../models/')
var loginSchema = require('../validators/LoginValidator');
var Key = require('../config/config').development.key
const bcrypt = require('bcrypt');

/**
 * @api {post} /login Login
 * @apiPermission id_user_group [A,M]
 * @apiName Login
 * @apiGroup API
 *
 * @apiQuery {String} [email] email of the User.
 * @apiQuery {String} [password]  password of the User.
 */

exports.login = async (req, res) => {

  let body = {
    ...req.body
  }
  const result = loginSchema.validate(req.body)
  if(result.error){
    res.error = result.error.details;
    rm.SendValidation(res);
    return;
  }

  try {
    let User = await Models.user.findOne({
      where: {
          email: body.email
      },
      attributes: ['id', 'full_name', 'email', 'phone_number', 'password'],
      raw: true
    }).catch((error) => {
        throw error;
    })
    if (User) {
      let VerifyResult = bcrypt.compareSync(body.password, User.password);
      if (VerifyResult) {
        delete User['password'];
        let Token = jwt.sign(User, Key, {
          expiresIn: '1d'
        })
        User.access_token = Token;
        res.data = User;
        res.msg = 'sukses';
        rm.SendResponse(res);
      } else {
        throw new Error("Email atau password anda salah");
      }
    } else {
        throw new Error("Email atau password anda salah");
    }
  } catch (error) {
    res.msg = error.message;
    res.data = error;
    res.code = 400;
    rm.SendResponse(res);
  }
}
