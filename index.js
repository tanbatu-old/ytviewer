const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);

/**
 * "/"にアクセスがあったらindex.htmlを返却
 */
app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/index.html");
});

/**
 * [イベント] ユーザーが接続
 */
io.on("connection", (socket)=>{
  io.emit("post-msg", "誰かが入室しました")
  let sendm = ""
  socket.on("post", (msg)=>{
    console.log(msg);
    if(msg.indexOf("https://www.youtube.com/") === 0){
      console.log('youtubeリンク')
      sendm = msg.slice(-11)
      io.emit("member-post", sendm);
    }
      io.emit("post-msg", msg)
        
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(3000, ()=>{
  console.log("listening on *:3000");
});