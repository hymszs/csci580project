/* 
 * @requires Vector3
 * @requires IntersectResult
 */
 
Triangle = function(A,B,C) 
{ this.A = A;this.B = B;this.C = C;
var CA= C.subtract(A) ;
var BA= B.subtract(A) ;
this.norm=CA.cross(BA).normalize();
this.distance=this.norm.dot(A);
 };

Triangle.prototype = {
    copy : function() { return new Triangle(this.A.copy(), this.B.copy(),this.C.copy()); },

    initialize : function() {
         this.position = this.norm.multiply(this.distance);
    },
    
    intersect : function(ray) {
        var a = ray.direction.dot(this.norm);
        if (a >= 0)
            return IntersectResult.noHit;

        var b = this.norm.dot(ray.origin.subtract(this.position));
        var result = new IntersectResult();
        result.geometry = this;
        result.distance = -b / a;
        result.position = ray.getPoint(result.distance);
        result.normal = this.norm;
        
         //[CAxQA]*norm>=0
        var Q=result.position;
        var QA=Q.subtract(this.A);
        var CA= this.C.subtract(this.A) ;
        var test1=CA.cross(QA).dot(this.norm);
        //[BCxQC]*norm>=0
        var BC=this.B.subtract(this.C);
        var QC= Q.subtract(this.C) ;
        var test2=BC.cross(QC).dot(this.norm);
         //[ABxQB]*norm>=0
        var AB=this.A.subtract(this.B);
        var QB= Q.subtract(this.B) ;
        var test3=AB.cross(QB).dot(this.norm);
        
        if(test1>=0&&test2>=0&&test3>=0)
        {
        //inside triangle
        return result;
        }
        else
        {
        //outside triangle
            return IntersectResult.noHit;        
        }
        
    }
};
