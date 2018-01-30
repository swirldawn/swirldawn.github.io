var D = {}
$(function() {
                D.getQueryString = function(name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return unescape(r[2]); return null;
                }
                D.simplePagination = function(fun, page_num, current, size, total,btnsize='btn-xs'){
                    if (total <= size)return '';
                    var $pages = new Array();
                    var $page_num = page_num; //总分页数
                    var $current = current; //当前页
                    var $size = size; //每页显示数
                    var $total = total; //获取总数
                    var $start = 0;
                    var $end = 0;
                    if ($current <= 10) {
                        $start = 1;
                        $end = $start + 9;
                    } else if ($current > 5) {
                        $start = $current - 4;
                        $end = $current + 5;
                    } else {
                        $start = $current - 2;
                        $end = $page_num;
                    }
                    if ($end > $page_num) {
                        $end = $page_num;
                    }
                    var $html = '<div >';
                    var last_page = $current - 1;
                    if($current>1){
                        $html += '<button type="button" class="btn btn-warning '+btnsize+'" onclick="' + fun + '(' + last_page + ')" title="上一页"><<</button>';
                    }else{
                        $html += '<button type="button" class="btn btn-default '+btnsize+'" disabled="disabled"><<</button>';

                    }

                    if ($current >= $page_num) {
                        $html += ' <button type="button" class="btn btn-default '+btnsize+'" disabled="disabled">>></button>';

                    } else {
                        var next_page = $current + 1;
                        $html += ' <button type="button" class="btn btn-warning '+btnsize+'" onclick="' + fun + '(' + next_page + ')' + '" title="下一页">>></button>';
                    }
                    $html += '<span style="margin-left:1em;" class="text-info"><small>共'+page_num+'页 ,当前第'+$current+'页</small></span>';
                    $html += '</div>';
                    return $html;
                }
                D.getPageViewByBootstrap = function (fun, page_num, current, size, total) {
                    if (total <= size)return '';
                    var $pages = new Array();
                    var $page_num = page_num; //总分页数
                    var $current = current; //当前页
                    var $size = size; //每页显示数
                    var $total = total; //获取总数
                    var $start = 0;
                    var $end = 0;
                    if ($current <= 10) {
                        $start = 1;
                        $end = $start + 9;
                    } else if ($current > 5) {
                        $start = $current - 4;
                        $end = $current + 5;
                    } else {
                        $start = $current - 2;
                        $end = $page_num;
                    }
                    if ($end > $page_num) {
                        $end = $page_num;
                    }
                    var $html = '<div >';
                    if ($page_num > 9) {
                        $html += '' +
                                '<div id="page-skip" style="float:right;margin-top:2px;"><span style="float:left;line-height:34px;">&nbsp;共' + $page_num + '页&nbsp;&nbsp;第&nbsp;</span><input id="inputPage" class="form-control" style="width:45px;float:left;" value="' + $current + '" /><span style="float:left;line-height:34px;">&nbsp;页&nbsp;</span>' +
                                '<button style="float:left;" href="javascript:;" onclick=\'javascript:var go_page=this.parentNode.parentNode.getElementsByTagName("input")[0].value;if(isNaN(go_page)||go_page>' + $page_num + '||go_page<1||go_page==' + $current + ')return;' + fun + '(go_page);return false;\' class="btn btn-primary">' +
                                '确定' +
                                '</button>' +
                                '</div>' +
                                '';
                    }
                    $html += '<ul  class="pagination" style="float:right;" >';
                    var is_updisabled = '';
                    if ($current == 1) {
                        is_updisabled = 'disabled';
                    }
                    var last_page = $current - 1;
                    $html += '<li class="' + is_updisabled + '"><a  onclick="' + fun + '(' + last_page + ')" title="上一页"><<</a></li>';

                    if ($page_num > 1) {
                        for (var $i = $start; $i <= $end; ++$i) {
                            var $_start = $size * ($i - 1) + 1;
                            var $_end = Math.min($size * $i, $total);
                            if ($i != $current) {
                                $html += '<li><a class="" onclick="' + fun + '(' + $i + ') ">' + $i + '</a></li>';
                            } else {
                                $html += '<li class="active"><a >' + $i + '</a></li>';
                            }
                        }
                    }
                    if ($current >= $page_num) {
                        $html += '<li class="disabled"><a  onclick="" title="已经是最后一页了">>></a></li>';
                    } else {
                        var next_page = $current + 1;
                        $html += '<li class=""><a  onclick="' + fun + '(' + next_page + ')' + '" title="下一页">>></a></li>';
                    }

                    $html += '</ul>';
                    $html += '</div>';
                    return $html;
                }

            $checkplaceholder = function() {
                var input = document.createElement("input");
                return "placeholder" in input
            };
            $placeholder = function placeholder(element) {
                if ($(element).val() == "" && ($(element).attr("placeholder") || $emptyplaceholder(element))) {
                    $(element).val($(element).attr("placeholder"));
                    $(element).data("pintuerholder", $(element).css("color"));
                    $(element).css("color", "rgb(169,169,169)");
                    $(element).focus(function() {
                        $hideplaceholder($(this))
                    });
                    $(element).blur(function() {
                        $showplaceholder($(this))
                    })
                }
            };
            if (!$checkplaceholder()) {
                $("textarea[placeholder], input[placeholder]").each(function(index, element) {
                    $placeholder(element)
                })
            }
            $emptyplaceholder = function(element) {
                var $content = $(element).val();
                return ($content.length === 0) || $content == $(element).attr("placeholder")
            };
            $showplaceholder = function(element) {
                if (($(element).val().length === 0 || $(element).val() == $(element).attr("placeholder")) && $(element).attr("type") != "password") {
                    $(element).val($(element).attr("placeholder"));
                    $(element).data("pintuerholder", $(element).css("color"));
                    $(element).css("color", "rgb(169,169,169)")
                }
            };
            $hideplaceholder = function(element) {
                if ($(element).data("pintuerholder")) {
                    $(element).val("");
                    $(element).css("color", $(element).data("pintuerholder"));
                    $(element).removeData("pintuerholder")
                }
            };
            $("textarea, input, select").blur(function() {
                var e = $(this);
                if (e.attr("data-validate")) {
                    e.closest(".form-group").find(".help-block").remove();
                    var $checkdata = e.attr("data-validate").split(",");
                    var $checkvalue = e.val();
                    var $checkstate = true;
                    var $checktext = "";
                    if (e.attr("placeholder") == $checkvalue) {
                        $checkvalue = ""
                    }
                    if ($checkvalue != "" || e.attr("data-validate").indexOf("required") >= 0) {
                        for (var i = 0; i < $checkdata.length; i++) {
                            var $checktype = $checkdata[i].split(":");
                            if (!$pintuercheck(e, $checktype[0], $checkvalue)) {
                                $checkstate = false;
                                $checktext = $checktext + "<small  >" + $checktype[1] + "</small>"
                            }
                        }
                    }
                    if ($checkstate) {
                        e.removeClass("check-error");
                        e.parent().find(".help-block").remove();
                        e.addClass("check-success")
                    } else {
                        e.removeClass("check-success");
                        e.addClass("check-error");
                        e.parent().append('<div class="help-block">' + $checktext + "</div>")
                    }
                }
                if (!$checkplaceholder()) {
                    $placeholder(e)
                }
            });

            $pintuercheck = function(element, type, value) {
                $pintu = value.replace(/(^\s*)|(\s*$)/g, "");
                switch (type) {
                    case "required":
                        return /[^(^\s*)|(\s*$)]/.test($pintu);
                        break;
                    case "chinese":
                        return /^[\u0391-\uFFE5]+$/.test($pintu);
                        break;
                    case "number":
                        return /^([+-]?)\d*\.?\d+$/.test($pintu);
                        break;
                    case "integer":
                        return /^-?[1-9]\d*$/.test($pintu);
                        break;
                    case "plusinteger":
                        return /^[1-9]\d*$/.test($pintu);
                        break;
                    case "unplusinteger":
                        return /^-[1-9]\d*$/.test($pintu);
                        break;
                    case "znumber":
                        return /^[1-9]\d*|0$/.test($pintu);
                        break;
                    case "fnumber":
                        return /^-[1-9]\d*|0$/.test($pintu);
                        break;
                    case "double":
                        return /^[-\+]?\d+(\.\d+)?$/.test($pintu);
                        break;
                    case "plusdouble":
                        return /^[+]?\d+(\.\d+)?$/.test($pintu);
                        break;
                    case "unplusdouble":
                        return /^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/.test($pintu);
                        break;
                    case "english":
                        return /^[A-Za-z]+$/.test($pintu);
                        break;
                    case "username":
                        return /^[a-z]\w{3,}$/i.test($pintu);
                        break;
                    case "mobile":
                        return /^\s*(15\d{9}|13\d{9}|14\d{9}|17\d{9}|18\d{9})\s*$/.test($pintu);
                        break;
                    case "phone":
                        return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
                        break;
                    case "tel":
                        return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$|170\d{8}?$|147\d{8}?$/.test($pintu) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
                        break;
                    case "email":
                        return /^[^@]+@[^@]+\.[^@]+$/.test($pintu);
                        break;
                    case "url":
                        return /^https:|http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($pintu);
                        break;
                    case "ip":
                        return /^[\d\.]{7,15}$/.test($pintu);
                        break;
                    case "qq":
                        return /^[1-9]\d{4,10}$/.test($pintu);
                        break;
                    case "currency":
                        return /^\d+(\.\d+)?$/.test($pintu);
                        break;
                    case "zipcode":
                        return /^[1-9]\d{5}$/.test($pintu);
                        break;
                    case "chinesename":
                        return /^[\u0391-\uFFE5]{2,15}$/.test($pintu);
                        break;
                    case "englishname":
                        return /^[A-Za-z]{1,161}$/.test($pintu);
                        break;
                    case "age":
                        return /^[1-99]?\d*$/.test($pintu);
                        break;
                    case "date":
                        return /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test($pintu);
                        break;
                    case "datetime":
                        return /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/.test($pintu);
                        break;
                    case "idcard":
                        return /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test($pintu);
                        break;
                    case "bigenglish":
                        return /^[A-Z]+$/.test($pintu);
                        break;
                    case "smallenglish":
                        return /^[a-z]+$/.test($pintu);
                        break;
                    case "color":
                        return /^#[0-9a-fA-F]{6}$/.test($pintu);
                        break;
                    case "ascii":
                        return /^[\x00-\xFF]+$/.test($pintu);
                        break;
                    case "md5":
                        return /^([a-fA-F0-9]{32})$/.test($pintu);
                        break;
                    case "zip":
                        return /(.*)\.(rar|zip|7zip|tgz)$/.test($pintu);
                        break;
                    case "img":
                        return /(.*)\.(jpg|gif|ico|jpeg|png)$/.test($pintu);
                        break;
                    case "doc":
                        return /(.*)\.(doc|xls|docx|xlsx|pdf)$/.test($pintu);
                        break;
                    case "mp3":
                        return /(.*)\.(mp3)$/.test($pintu);
                        break;
                    case "video":
                        return /(.*)\.(rm|rmvb|wmv|avi|mp4|3gp|mkv)$/.test($pintu);
                        break;
                    case "flash":
                        return /(.*)\.(swf|fla|flv)$/.test($pintu);
                        break;
                    case "radio":
                        var radio = element.closest("form").find('input[name="' + element.attr("name") + '"]:checked').length;
                        return eval(radio == 1);
                        break;
                    default:
                        var $test = type.split("#");
                        if ($test.length > 1) {
                            switch ($test[0]) {
                                case "compare":
                                    return eval(Number($pintu) + $test[1]);
                                    break;
                                case "regexp":
                                    return new RegExp($test[1], "gi").test($pintu);
                                    break;
                                case "length":
                                    var $length;
                                    if (element.attr("type") == "checkbox") {
                                        $length = element.closest("form").find('input[name="' + element.attr("name") + '"]:checked').length
                                    } else {
                                        $length = $pintu.replace(/[\u4e00-\u9fa5]/g, "***").length
                                    }
                                    return eval($length + $test[1]);
                                    break;
                                case "ajax":
                                    var $getdata;
                                    var $url = $test[1] + $pintu;
                                    $.ajaxSetup({
                                        async: false
                                    });
                                    $.getJSON($url,
                                            function(data) {
                                                $getdata = data.getdata
                                            });
                                    if ($getdata == "true") {
                                        return true
                                    }
                                    break;
                                case "repeat":
                                    return $pintu == jQuery('input[name="' + $test[1] + '"]').eq(0).val();
                                    break;
                                default:
                                    return true;
                                    break
                            }
                            break
                        } else {
                            return true
                        }
                }
            };
            D.checkForm = function(dom){
                $(dom).find("input[data-validate],textarea[data-validate],select[data-validate]").trigger("blur");
                $(dom).find("input[placeholder],textarea[placeholder]").each(function() {
                    $hideplaceholder($(this))
                });
                var numError = $(dom).find(".check-error").length;
                if (numError) {
                    $(dom).find(".check-error").first().find("input[data-validate],textarea[data-validate],select[data-validate]").first().focus().select();
                    return false
                }
                return true;
            }
        });
        
        Vue.filter('date', function (value) {
  if(!$.isNumeric(value))return '';
  var date = moment(value*1000).format('YYYY-MM-DD HH:mm:ss');

  return date;
});
Vue.filter('date_year', function (value) {
  if(!$.isNumeric(value))return '';
  var date = moment(value*1000).format('YYYY-MM-DD');

  return date;
});