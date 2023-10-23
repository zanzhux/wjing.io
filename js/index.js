window.addEventListener('load', function () {

    var banner = document.querySelector('header');
    var bannerWith = banner.offsetWidth;
    var arr_l = document.querySelector('.arr_l');
    var arr_r = document.querySelector('.arr_r');
    var ol = document.querySelector('.circle');
    var ul = document.querySelector('.pic_list');

    // 鼠标经过
    banner.addEventListener('mouseover', function () {
        arr_l.style.display = 'block';
        arr_r.style.display = 'block';
        clearInterval(timer);
    });
    banner.addEventListener('mouseout', function () {
        arr_l.style.display = 'none';
        arr_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            arr_r.click();
        }, 3000);
    })


    // 动态生成ol里的li
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        // 给小圆点注册点击事件
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * bannerWith);
        })
    }
    ol.children[0].className = 'current';
    // 给右箭头注册点击事件
    var num = 0;
    var circle = 0;
    arr_r.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * bannerWith);
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';

    })
    arr_l.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * bannerWith + 'px';

        }
        num--;
        animate(ul, -num * bannerWith);
        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';

    })

    // 克隆第一张图到最后
    var last = ul.children[0].cloneNode(true);
    ul.appendChild(last);
    console.log(ul.children.length);

    var timer = setInterval(function () {
        // 手动调用点击事件
        arr_r.click();
    }, 3000);

    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {

            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);

                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 30)
    }
})