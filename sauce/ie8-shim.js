// somehow `R` gets lost, but `ramda` remains. hmmm. 
R = ramda;

if( typeof document.getElementsByClassName !== "function"){
  document.getElementsByClassName = function( className, nodeName )
  {
    var result = [], tag = nodeName||'*', node, seek, i;
    if( document.evaluate ){
      seek = '//'+ tag +'[@class="'+ className +'"]';
      seek = document.evaluate( seek, document, null, 0, null );
      while( (node = seek.iterateNext()) )
        result.push( node );
    }else{
      var rightClass = new RegExp( '(^| )'+ className +'( |$)' );
      seek = document.getElementsByTagName( tag );
      for( i=0; i<seek.length; i++ )
        if( rightClass.test( (node = seek[i]).className ) )
          result.push( seek[i] );
    }
    return result;
  };
}

