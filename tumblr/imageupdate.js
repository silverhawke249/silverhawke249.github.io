var myimages=new Array();
myimages[0]="https://silverhawke.xyz/tumblr/sqimg1.png";
myimages[1]="https://silverhawke.xyz/tumblr/sqimg2.png";
myimages[2]="https://silverhawke.xyz/tumblr/sqimg3.png";
myimages[3]="https://silverhawke.xyz/tumblr/sqimg4.png";
myimages[4]="https://silverhawke.xyz/tumblr/sqimg5.png";
myimages[5]="https://silverhawke.xyz/tumblr/sqimg6.png";
var ry=Math.floor(Math.random()*myimages.length);
document.write('<img title="silverhawke - the boy who followed the sky" src="'+myimages[ry]+'">');