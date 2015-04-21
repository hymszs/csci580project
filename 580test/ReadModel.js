



function ReadModel() {
  var Tri;
$.get( "teapot.txt", function( data,Tri ) {
  var lines = data.split("\n");
  var Points = new Array();
  var TriList=new Array();
  for (var i = 0, len = lines.length; i < len; i++) 
    {
        vectors=lines[i].split(" ");
        if(vectors[0]=="v")
        {
        
            Points.push(new Vector3(Number(vectors[1]),Number(vectors[2]),Number(vectors[3])));

        }
        if(vectors[0]=="f")
        {

    TriList.push(new Triangle(Points[Number(vectors[1])-1],Points[Number(vectors[2])-1],Points[Number(vectors[3])-1]));
            
        }
    }
   
   
    Tri=TriList;
});
 console.log(Tri.length);
}

