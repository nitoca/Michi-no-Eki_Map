let pro_data

// send request to get json data
$.get(
        "https://fuseki.open.coins.tsukuba.ac.jp/lod/",	// end point
        {query:"select distinct ?o1 ?o ?o2 ?o3 ?URL where { ?s <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?o . ?s <http://linkdata.org/property/rdf1s9420i#prefectures> ?o1 . ?s <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?o2 . ?s <http://www.w3.org/2000/01/rdf-schema#label> ?o3 . ?s <http://xmlns.com/foaf/0.1/homepage> ?URL . }"},	// query
        success,	// function(process data) 
        "json"	// type
);

// process json data from get
function success(data) {
        // convert json data to javascript object
        var html = JSON.stringify(data);

        pro_data = JSON.parse(html);
}

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
        
        
        // 新しいマーカーを追加
        for (var i = 0; i < pro_data.results.bindings.length; i++) {
          if (pro_data.results.bindings[i].o1.value === prefecture) {
            var lat = pro_data.results.bindings[i].o.value;
            var lng = pro_data.results.bindings[i].o2.value;
            var name = pro_data.results.bindings[i].o3.value;
            var url = pro_data.results.bindings[i].URL.value;

            var marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(name.link(url)).openPopup();
            
            
          }
        }
}



// Mapの初期化
function initMap() {
        map = L.map('gmap').setView([35.619, 139.751], 9);
      
        // 地理院地図レイヤー追加
        L.tileLayer(
          // 地理院地図利用
          'http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
          {
            attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
          }
        ).addTo(map);
      }