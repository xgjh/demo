var state = false;//歌曲播放状态
var au = $('audio').get(0);

var musicIndex = 0; //歌曲索引，用于判断渲染的歌曲
//选择当前的歌曲渲染
currentLrc(musicIndex);

function currentLrc(n) {
	//	歌词渲染
	var str = '';
	for(var i in musicLrc[n].lrc) {
		str += '<li data-time=' + i + '>' + musicLrc[n].lrc[i] + '</li>';
	}
	$('.lrc ul').html(str);
	$('.lrc ul').css('margin-top', 0);
	//	歌曲名称
	$('.r-box h3').html(musicLrc[n].name);

	//	唱片样式
	$(".disc img").attr('src', musicLrc[n].imgSrc);

	//	对应歌曲
	$('audio').attr('src', musicLrc[n].audio);

}

//下一首
$('.control li').eq(2).click(function() {
		musicIndex++;
		if(musicIndex > musicLrc.length - 1) {
			musicIndex = musicLrc.length - 1;
		}
		currentLrc(musicIndex);
		state = false;
		$(".control li").eq(1).trigger('click');
	})
	//上一首
$('.control li').eq(0).click(function() {
	musicIndex--;
	if(musicIndex < 0) {
		musicIndex = 0;
	}
	currentLrc(musicIndex);
	state = false;
	$(".control li").eq(1).trigger('click');
})

//控制歌词高亮
changeText('00:00');
var lyrics = musicLrc[musicIndex].lrc['00:00']; //储存实时显示在桌面的歌词
function changeText(t) {

	$(".lrc ul li").each(function(i, ele) {
		if($(ele).attr('data-time') == t) {
			lyrics = $(ele).text();
			$(ele).css('color', 'white');
			$(ele).siblings().css('color', 'black');
			//控制高亮歌词居于中间
			if(i > 5) {
				$('.lrc ul').css('margin-top', -(i - 5) * 30 + 'px');
			}

		}
	})
}

//播放的逻辑实现
var timer = null;
var deskT = null;
var deltaT = getDeltaT('00:00'); //两句歌词间的时间差值
$(".control li").eq(1).off().click(function() {
	
	clearInterval(timer);
	clearInterval(deskT);
	if(!state) {
		$('audio').get(0).play();
		$(this).find('i').attr('class', 'iconfont icon-bofangqi-zanting');

		$('.needle').addClass('active');
		$('.disc').css('-webkit-animation-play-state', 'running');

		setInterval(function() {
			var c = au.currentTime;
			$('.time-cont span').eq(0).html(changeTime(c));
			d = au.duration;
			$('.time-cont span').eq(1).html(changeTime(d));
			var barW = c / d * 400;
			$('.bar').css('width', barW + 'px');
			changeText(changeTime(c));
			changeDeskLyc(lyrics);

		}, 1000);
		state = true;
	} else {
		clearInterval(timer);
		clearInterval(deskT);
		$('audio').get(0).pause();
		$(this).find('i').attr('class', 'iconfont icon-bofangqi-bofang');

		$('.needle').removeClass('active');
		$('.disc').css('-webkit-animation-play-state', 'paused');
		$('.desk .innerTop').stop();
		state = false;
	}
})

//控制静音 
$('#vol').click(function() {
	if(au.muted) {
		$(this).css('background-image', 'url(img/音量.png)');
		au.muted = false;
	} else {
		$(this).css('background-image', 'url(img/静音.png)');
		au.muted = true;
	}

})

//进度条拖拽
$('.progress .pic').mousedown(function(ev) {
	//获取当前的坐标
	var oldX = ev.clientX;
	var oldW = $('.progress .bar').width();
	$(document).mousemove(function(ev) {
		var newX = ev.clientX;
		var newW = oldW + newX - oldX;
		if(newW > 400) {
			newW = 400;
		}
		$('.progress .bar').css('width', newW + 'px');
		//对应的当前的时间
		var d = au.duration;
		var currentT = (newW / 400 * d);
		$('.time-cont span').eq(0).html(changeTime(currentT));
		changeText(changeTime(currentT)); //文字高亮联动
		//歌曲联动
		au.currentTime = parseInt(currentT);
	})
	$(document).mouseup(function() {
		$(this).off();
	})
	return false;
})

//音乐加载完毕后获取总时长

au.addEventListener('canplay', function() {
	var d = au.duration;
	$('.time-cont span').eq(1).html(changeTime(d));
})

//改变时间样式（ 00:00）
function changeTime(t) {
	var m = Math.floor(t / 60);
	var s = Math.ceil(t % 60);
	m = m < 10 ? ('0' + m) : m;
	s = s < 10 ? ('0' + s) : s;
	return m + ':' + s;
}

//还原时间样式(十进制)

function returnTime(t) {
	var tArr = t.split(':');
	var rTime = parseInt(tArr[0] * 60) + parseInt(tArr[1]);
	return rTime;
}

//获取当前歌曲与下一句歌曲的时间差

function getDeltaT(c) {
	var deltaT;
	//遍历歌词，找出当前歌词的播放时间
	$('.lrc ul li').each(function(i, ele) {
		if($(ele).attr('data-time') == c) {
			//找出下一句歌词的播放时间
			var nextT = returnTime($(ele).next().attr("data-time"));
			//算出时间差
			deltaT = nextT - returnTime(c);
		}
	})
	return deltaT;
};

//显示桌面歌词
var flag = false; //歌词显示状态，true为显示，false为不显示
var time = null;
$('.voc span').click(function() {
		if(flag) {
			$(this).removeClass('active');
			clearInterval(time);
			$('.desk').css('display', 'none');
		} else {
			$(this).addClass('active');
			$('.desk').css('display', 'inline-block');
			changeDeskLyc(lyrics);
		}
		flag = !flag;
	})
	//创建桌面歌词
function changeDeskLyc(ly) {
	$('.desk .inner').text(ly);
	$('.desk .innerTop').text(ly);
	//获取文字宽度
	var textW = $('.desk .inner').width();
	//			console.log($('.desk .inner').width());
	//	文字居中
	$('.desk .inner').css('left', (600 - textW) / 2);
	$('.desk .innerTop').css('left', (600 - textW) / 2);

}


//桌面歌词的拖拽效果
$('.desk').mousedown(function(ev) {
	var oldX = ev.clientX - $(this).position().left; //鼠标在元素中的横坐标
	var oldY = ev.clientY - $(this).position().top; //鼠标在元素中的纵坐标
	$(document).mousemove(function(ev) {
		var newX = ev.clientX;
		var newY = ev.clientY;
		//元素的真实坐标
		var DL = newX - oldX;
		var DT = newY - oldY;
		$('.desk').css({
			'left': DL,
			'top': DT
		});
	})
	$(document).mouseup(function() {
		$(this).off();
	})
	return false;
})