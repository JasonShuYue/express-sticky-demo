let WaterFall = (function() {
    var $ct;
    var $items;
    function render($c) {
        $ct = $c;
        $items = $ct.children();

        // nodeWidth为$items的外部宽度，包括margin
        var nodeWidth = $items.outerWidth(true),
            colNum = parseInt($(window).width()/nodeWidth),
            colSumHeight = [];

        // 初始化colSumHeight
        for(var i = 0; i<colNum;i++){
            colSumHeight.push(0);
        }

        $items.each(function() {
            var $cur = $(this);

            var idx = 0,
                minSumHeight = colSumHeight[0];

            //找出高度最小的那一列和第id列
            for(var i = 0; i < colSumHeight.length; i++) {
                if(colSumHeight[i] < minSumHeight) {
                    idx = i;
                    minSumHeight = colSumHeight[i]
                }
            }

            $cur.css({
                left: nodeWidth * idx,
                top: minSumHeight
            });

            // 更新当前最小高度列的高度
            colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];
        });
    }

    // 如果窗口有缩放，调整渲染
    $(window).on('resize', function() {
        render($ct)
    })

    return {
        init: render
    }
})();

module.exports = WaterFall;