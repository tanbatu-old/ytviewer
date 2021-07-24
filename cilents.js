var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


const socket = io();

document.getElementById('chat_frm').addEventListener("submit",(e) =>{
  e.preventDefault();
  const msg = document.querySelector("#msg");
  
  if (msg.value === "") {
    return (false);
  }

  const message = msg.value;
  socket.emit("post", message);

  msg.value = "";
})

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player(
       'youtube_player', // 埋め込む場所の指定
        {
           width: 640, // プレーヤーの幅
           height: 390, // プレーヤーの高さ
            videoId: 'G2CHyuF74R0', // YouTubeのID
           playerVars: {
              rel: 0, // 再生終了後に関連動画を表示するかどうか設定
              autoplay: 1, // 自動再生するかどうか設定,
              mute:1
        }
      }
   );
}





///*/-------------------------------------
//    // Socket.ioサーバへ接続
//    //-------------------------------------
//    
//
//    /**
//     * [イベント] フォームが送信された
//     */
//    document.querySelector("#frm-post").addEventListener("submit", (e) => {
//      // 規定の送信処理をキャンセル(画面遷移しないなど)
//      e.preventDefault();
//
//      // 入力内容を取得する
//      const msg = document.querySelector("#msg");
//      if (msg.value === "") {
//        return (false);
//      }
//
//      const message = msg.value;
//      // Socket.ioサーバへ送信
//      socket.emit("post", message);
//
//      // 発言フォームを空にする
//      msg.value = "";
//    });
//
//    /**
//     * [イベント] 誰かが発言した
//     */
//    socket.on("member-post", (msg) => {
//      const list = document.querySelector("#videoplayer");
//      list.src = "https://www.youtube.com/embed/" + msg + "?autoplay=1";
//    });
//
//    socket.on("post-msg", (msg) => {
//      console.log(msg)
//      const list = document.querySelector("#msglist");
//      const li = document.createElement("li");
//      li.innerHTML = msg;
//      list.insertBefore(li, list.firstChild);
//    })
//    /**
//     * [イベント] ページの読込み完了
//     */
//    window.onload = () => {
//      // テキストボックスを選択する
//      document.querySelector("#msg").focus();
//    }
//