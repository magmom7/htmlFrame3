(() => {

    let yOffset = 0 ; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0 ; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

    const sceneInfo = [
        {
            type:'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
				container: document.querySelector('#scroll-section-0')
            }
        },
        {
            
            type:'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
				container: document.querySelector('#scroll-section-1')
            }
        },
        {
            type:'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
				container: document.querySelector('#scroll-section-2')
            }
        },
        {
            type:'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
				container: document.querySelector('#scroll-section-3')
            }
        },
    ];
    
    function setLayout() {
		// 각 스크롤 섹션의 높이 세팅
		for (let i = 0; i < sceneInfo.length; i++) {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
                sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
	}

    function scrollLoop(){
        prevScrollHeight = 0;
        for (let i = 0; i< currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
        }

        if (yOffset < prevScrollHeight){
            if(currentScene == 0)
            return;
            currentScene--;
        }
    }

    window.addEventListener('resize', setLayout); //윈도우 사이즈가 바뀔대마다 실행
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    setLayout();
})();