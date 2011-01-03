threewords = function(){
  var link = document.getElementById('threewordsme');
  var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20content%20from%20html%20where%20url%3D%22'+encodeURIComponent(link.href)+'%22%20and%20xpath%3D%22%2F%2Fstrong%22%20%7C%20unique(field%3D%22strong%22)%20%7C%20sort(field%3D%22yahoo%3Arepeatcount%22)%20%7C%20reverse()&format=json&callback=threewords.cb';
  var s = document.createElement('script');
  s.src = url;
  document.getElementsByTagName('head')[0].appendChild(s);
  link.innerHTML += ':<span>(loading&hellip;)</span>';
  function callback(data){
  link.removeChild(link.lastChild);
  var out = '';
  if(data && data.query.results){
    for(var i=0;i<10;i++){
      out += '<li>'+data.query.results.strong[i].content+'</li>';
    }
  }
  var list = document.createElement('ol');
  list.innerHTML = out;
  link.parentNode.insertBefore(list,link.nextSibling);
  }
  return {cb:callback};
}();
