<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->

<meta name="viewport" content="width=device-width">
<meta name="format-detection" content="telephone=no">

<title>幅バラバラカルーセル</title>

<!-- stylesheet -->
<link rel="stylesheet" href="assets/css/style.css">

<!--[if lte IE 8]>
<script type="text/javascript" src="assets/libs/html5shiv.js"></script>
<![endif]-->
</head>
<body>


<br /><br /><br /><br />


<div class="width-barabara-carousel">
	<ul class="list">
		
		<?php
		class WidthBarabaraCarousel {
			
			function createItem( $num, $max ) {
				$width = $this->getItemWidth();
				echo <<<EOF
<li class="item" style="width:{$width}px">
	<div class="inner">
		{$num}<br />{$width}px
	</div>
</li>
EOF;
				$num++;
				if( $max > $num ) $this->createItem( $num, $max );
			}
			
			function getItemWidth() {
				return 10 * mt_rand(1,4) + 90;
			}
		}
		
		$wbc = new WidthBarabaraCarousel();
		$wbc->createItem( 0, 100 );
		?>
		
		
	</ul>
	<div class="nav">
		<button class="nav__prev" type="button">前へ</button>
		<button class="nav__next" type="button">次へ</button>
	</div>
	<div class="center-guide"></div>
</div>



<!-- javascript -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="assets/lib/jquery.js"><\/script>');</script>
<script src="assets/lib/jquery.easing.js"></script>
<script src="assets/js/width-barabara-carousel.js"></script>

</body>
</html>