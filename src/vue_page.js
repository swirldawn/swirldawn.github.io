function getPageView(fun,page_num,current,size,total){
    var  $pages =new Array();
    var  $page_num = page_num; //总分页数
    var  $current = current; //当前页
    var  $size = size; //每页显示数
    var  $total = total; //获取总数

    var  $start = 0;
    var $end = 0;
    if($current <= 4){
        $start = 1;
        $end = $start + 4;
    }else if(($page_num - $current - 2) > 1)
    {
        $start = $current - 2 < 1 ? 1 : $current - 2;
        $end = $current + 2;
    }else{
        $start = $current - 2;
        $end = $page_num;
    }
    if($end > $page_num)
    {
        $end = $page_num;
    }
    var $start_num = $size * ($current - 1) + 1;
    var $end_num = Math.min($size * $current, $total);

    var $html = '<div  class="right-age">';
    $html += '<ul>';
    if ($current > 1) {
        var last_page= $current - 1;
        $html += '<li><a class="upPage" onclick="'+fun+'(' + last_page + ')" title="上一页"><<</a></li>';
    }
    if ($page_num > 1) {
        if($page_num > 5 && $current > 4){
            $html += '<li><a onclick="'+fun+'(1)" class="everyPage">1</a></li>';
            $html += '<li><a onclick="javascript:;" class="everyPage">...</a></li>';
            $start = $current - 2;
            $end = $page_num - $current <= 3 ? $page_num : $current + 2;
        }
        for (var $i = $start; $i <= $end; ++$i) {
            var $_start = $size * ($i - 1) + 1;
            var $_end = Math.min($size * $i, $total);
            if ($i != $current) {
                $html += '<li><a class="everyPage" onclick="' +fun+'('+$i+') ">' + $i + '</a></li>';
            }else {
                $html += '<li><a class="on">'+$i+'</a></li>';
            }
        }
        if($page_num > 5 && $page_num - $current > 3){
            $html += '<li><a href="" class="everyPage">...</a></li>';
            $html += '<li><a class="everyPage" onclick="">' + $page_num + '</a></li>';
        }
    }
    if ($current < $page_num) {
        var next_page=$current + 1;
        $html += '<li><a class="downPage" onclick="'+fun+'('+next_page+')'+'" title="下一页">>></a></li>';
    }
    if ($page_num > 2) {

        $html += '<li >'+
        '<div id="page-skip">&nbsp;&nbsp;第&nbsp;<input id="inputPage" value="'+$current+'" />&nbsp;页'+
        '<button href="javascript:;" onclick=\'javascript:var go_page=this.parentNode.parentNode.getElementsByTagName("input")[0].value;if(isNaN(go_page)||go_page>'+$page_num+'||go_page<1||go_page=='+$current+')return;'+fun+'(go_page);return false;\' class="goToPage">'+
        '确定'+
        '</button>'+
        '<div>'+
        '</li>';
    }
    $html += '</ul>';
    $html += '</div>';
    return $html;

}