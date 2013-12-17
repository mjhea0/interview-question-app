// exports.index = function(req, res){
//   res.render('index');
// };

// exports.partials = function (req, res){
// 	var name = req.params.name;
// 	res.render('partials/' + name);
// };

// exports.login = function (req, res) {
// 	res.json(req.user);
// };

// exports.logout = function (req, res) {
// 	req.logout();
// 	res.send(200);
// 	res.redirect('pong');
// };

var path = require("path");

exports.index = function(req, res){
  res.render('index', { title: "Interview Questions"});
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};
