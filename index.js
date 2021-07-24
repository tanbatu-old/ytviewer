const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);
var crypto = require("crypto");
const fs = require("fs");


let youtubelink = ""
/**
 * "/"にアクセスがあったらindex.htmlを返却
 */
app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/pc_index.html");
  

});

/**
 * [イベント] ユーザーが接続
 */
io.on("connection", (socket)=>{
  io.emit("post-msg", "誰かが入室しました")
  console.log(youtubelink)
  io.to(socket.id).emit("token", youtubelink);

  socket.on("post", (msg)=>{
    console.log(msg);
    io.emit("post-msg", msg.replace(/</g,''))
        
  });
  socket.on('youtubelink',(link)=>{
    youtubelink = link;
    console.log("link")
    io.emit("post-msg", link)
    io.emit("postytlink", link)
  })

});



/**
 * 3000番でサーバを起動する
 */
http.listen(3000, ()=>{
  console.log("listening on *:3000");
});