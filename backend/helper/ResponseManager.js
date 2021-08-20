exports.SendResponse = (res) => {
    if(!res.code) res.code = 200;
    if(!res.data) res.data = []

    var Response = {
      statusCode: res.code,
      message: res.msg,
      data: res.data,
    }
    res.status(res.code).send(Response);
}

exports.SendValidation = (res) => {
  res.code = 422;
  var Response = {
    statusCode: res.code,
    error: res.error,
  }
  res.status(res.code).send(Response);
}
