var myimages=new Array();
myimages[0]="https://adamasstokhorst.github.io/tumblr/sqimg1.png";
myimages[1]="https://adamasstokhorst.github.io/tumblr/sqimg2.png";
myimages[2]="https://adamasstokhorst.github.io/tumblr/sqimg3.png";
myimages[3]="https://adamasstokhorst.github.io/tumblr/sqimg4.png";
myimages[4]="https://adamasstokhorst.github.io/tumblr/sqimg5.png";
myimages[5]="https://adamasstokhorst.github.io/tumblr/sqimg6.png";
var ry=Math.floor(Math.random()*myimages.length);
document.write('<img title="silverhawke - the boy who followed the sky" src="'+myimages[ry]+'">');