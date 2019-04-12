<?php
	
	$a = @$_GET["a"];
	$b = @$_GET["b"];
	$f = @$_GET["fnName"];
	
//	1.注意返回数据的类型

	$data = '{"dataA":'.$a.',"dataB":'.$b.'}';
	
	echo $f."('".$data."')";
	
	
?>