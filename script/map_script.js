var map;
var sparql = ""

$(document).ready(function() {
  initMap();

  // change of selectbox
  $("select").change(function() {
    if (this.value !== "-選択してください-") {
      render(this.value);
    }
  });
});


// Mapへのマーカー描画
function render(prefecture) {
        // 既存のマーカーを削除
        map.eachLayer(function(layer) {
        map.removeLayer(layer);
        }
        );
        // 新しいマーカーを追加

        }



// Mapの初期化
function initMap() {
        map = L.map('gmap').setView([35.619, 139.751], 8);
      
        // 地理院地図レイヤー追加
        L.tileLayer(
          // 地理院地図利用
          'http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
          {
            attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
          }
        ).addTo(map);
      }