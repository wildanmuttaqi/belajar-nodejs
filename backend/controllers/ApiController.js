var apiWrapper = require('../helper/ApiWrapper');
var rm = require('../helper/ResponseManager');
var _ = require('lodash');
var userSchema = require('../validators/UserValidator')
var { check, validationResult } = require('express-validator')

// exports.validate = [
//       check('id', 'ID required').notEmpty().isInt().withMessage('ID must int'),
//       check('email', 'Email required').notEmpty().isEmail().withMessage('Email doesn\'t valid')
// ]

exports.apiRequest = async (req, res) => {

  // //validasi
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   //throw error
  //   res.status(422).json({ errors: errors.array() });
  //   return;
  // }

  const { id, email } = req.query
  const result = userSchema.validate(req.query)
  if(result.error){
    res.code = 422;
    res.error = result.error.details;
    rm.SendValidation(res);
    return;
  }

  let data = [];
  const api = await apiWrapper.getApi({id: id});
  _.forEach(api, function (value) {
    data.push({
      name: value.name,
      username: value.username,
      email: value.email,
    });
  });
  if(_.isEmpty(api)){
    res.msg = "Data kosong";
    res.code = 404;
    rm.SendResponse(res);
    return;
  }
  res.msg = "Sukses";
  res.data = data;
  rm.SendResponse(res);
};
