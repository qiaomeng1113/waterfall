window.onload = function () {
	var
		oBox      = $('box'),
		aPanel    = Array.from(oBox.getElementsByClassName('panel')),
		iWinW	  = document.documentElement.clientWidth,
		iWinH	  = document.documentElement.clientHeight,
		iPanelW   = 260,
		// iTotalCol = 2,
		iTotalCol = Math.floor(iWinW / iPanelW),
		aColH	  = [];

	// 计算box的宽度
	oBox.style.width = iTotalCol * iPanelW + 'px';

	// 页面初始化，循环指定panel位置
	aPanel.forEach(function (v, k) {
		// 说明图片显示在第一行
		if(k < iTotalCol) {
			v.style.left = iPanelW * k + 'px';
			v.style.top = 0;

			// 将每一列的高度存储到数组中
			aColH.push(v.offsetHeight);
		} else {
			// 查找最小的列高度
			var
				iMinH = Math.min(...aColH),
				iMinK = 0;
			// 查找最小高度对应的下标
			for(var i = 0; i < aColH.length; i++) {
				if(aColH[i] === iMinH) {
					iMinK = i;
					break;
				}
			}

			// 计算位置
			v.style.left = iMinK * iPanelW + 'px';
			v.style.top  = iMinH + 'px';

			// 更新列的高度
			aColH[iMinK] += v.offsetHeight;
		}
	});

	// 数据
	var aData = [
		{
			url: 'images/1.jpg',
			width: 432,
			height: 300,
		},
		{
			url: 'images/2.jpg',
			width: 681,
			height: 966,
		},
		{
			url: 'images/3.jpg',
			width: 480,
			height: 300,
		},
		{
			url: 'images/4.jpg',
			width: 480,
			height: 300,
		},
		{
			url: 'images/5.jpg',
			width: 683,
			height: 1024,
		},
		{
			url: 'images/6.jpg',
			width: 682,
			height: 1024,
		},
		{
			url: 'images/7.jpg',
			width: 1000,
			height: 1500,
		},{
			url: 'images/8.jpg',
			width: 677,
			height: 966,
		}
	];

	// 滚动添加新的数据
	window.onscroll = function () {
		var
			iScrollT = document.documentElement.scrollTop
						|| document.body.scrollTop,
			oLastPanel = aPanel[aPanel.length - 1];
		if(iWinH + iScrollT > oLastPanel.offsetTop + oLastPanel.offsetHeight / 2) {
			aData.forEach(function (v, k) {
				// 查找最小的列高度
				var
					iMinH = Math.min(...aColH),
					iMinK = 0;
				// 查找最小高度对应的下标
				for(var i = 0; i < aColH.length; i++) {
					if(aColH[i] === iMinH) {
						iMinK = i;
						break;
					}
				}

				// 创建panel
				var oPanel = document.createElement('div');
				oPanel.className = 'panel';
				// 创建图片
				var oImg = document.createElement('img');
				oImg.src = v.url;

				oPanel.appendChild(oImg);
				oBox.appendChild(oPanel);

				// 计算位置
				oPanel.style.left = iMinK * iPanelW + 'px';
				oPanel.style.top  = iMinH + 'px';

				// 更新列的高度
				aColH[iMinK] += oPanel.offsetHeight;
			});

			// 更新数组
			aPanel = oBox.getElementsByClassName('panel');
		}
	}
}