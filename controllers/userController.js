const loadIndex = async (req, res, next) => {
  try {
    // apna views ko render karna hai
    res.render('index');
  } catch (error) {
    console.log(error.message);
  }

  next();
}


module.exports = {
  loadIndex
}