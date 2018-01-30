;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-shipin" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M853.436416 433.415168 377.30816 433.415168 843.941888 285.934592c36.307968-11.454464 56.511488-50.328576 45.019136-86.636544L861.688832 112.970752c-11.475968-36.292608-50.327552-56.487936-86.63552-45.003776L144.241664 267.336704c-36.308992 11.461632-56.496128 50.351104-45.026304 86.629376l27.271168 86.31808c2.152448 6.796288 5.257216 13.022208 9.124864 18.582528-11.757568 13.273088-18.960384 30.665728-18.960384 49.752064l0 376.121344c0 41.454592 33.741824 75.204608 75.211776 75.204608l661.572608 0c41.469952 0 75.218944-33.750016 75.218944-75.204608L928.654336 508.618752C928.65536 467.1488 894.906368 433.415168 853.436416 433.415168zM802.353152 124.019712c2.189312 1.449984 4.023296 3.482624 4.866048 6.166528l27.300864 86.326272c1.982464 6.255616-1.522688 12.985344-7.793664 14.974976l-42.533888 13.428736L802.353152 124.019712zM639.72864 170.635264l72.424448-22.879232-18.929664 125.917184-72.424448 22.90176L639.72864 170.635264zM476.34944 222.272512l72.438784-22.8864-18.945024 125.925376-72.454144 22.90176L476.34944 222.272512zM312.967168 273.932288l72.416256-22.908928-18.945024 125.917184-72.409088 22.908928L312.967168 273.932288zM161.456128 321.805312l60.548096-19.144704-18.930688 125.939712-7.150592 2.255872c-6.263808 1.98144-12.977152-1.51552-14.959616-7.786496l-27.286528-86.303744C151.688192 330.486784 155.185152 323.787776 161.456128 321.805312zM859.189248 884.740096c0 3.165184-2.573312 5.738496-5.752832 5.738496L191.863808 890.478592c-3.172352 0-5.753856-2.574336-5.753856-5.738496L186.109952 508.618752c0-3.165184 2.581504-5.738496 5.753856-5.738496l661.572608 0c3.17952 0 5.752832 2.573312 5.752832 5.738496L859.189248 884.740096z"  ></path>' +
    '' +
    '<path d="M489.837568 568.124416c-11.314176-9.739264-28.351488-12.637184-43.096064-7.395328-14.789632 5.265408-24.41728 17.666048-24.41728 31.442944l0 209.051648c0 13.740032 9.627648 26.133504 24.41728 31.383552 4.895744 1.760256 10.042368 2.603008 15.1296 2.603008 10.278912 0 20.395008-3.46112 27.967488-9.938944L611.377152 720.724992c15.469568-13.26592 15.469568-34.798592 0-48.095232L489.837568 568.124416z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yinpin" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 110.623493c-207.725018 0-376.11517 168.385035-376.11517 376.09982s168.390151 376.09982 376.11517 376.09982 376.114147-168.385035 376.114147-376.09982S719.725018 110.623493 512 110.623493L512 110.623493zM512 821.834604c-185.087439 0-335.125617-150.034085-335.125617-335.111291s150.038178-335.113337 335.125617-335.113337 335.125617 150.035108 335.125617 335.113337S697.087439 821.834604 512 821.834604L512 821.834604z"  ></path>' +
    '' +
    '<path d="M465.023082 332.558142c-2.64934-3.031033-6.535857-4.955872-10.883885-4.955872-3.174296 0-6.105045 1.034563-8.485255 2.762927-0.694825 0.48914-1.355881 1.02433-1.973958 1.647523-3.567245 3.572362-4.90266 8.537444-4.012384 13.157671l0 283.559171c-0.8913 4.616134 0.445138 9.582239 4.012384 13.158694 5.693676 5.722328 14.935154 5.722328 20.62883 0l187.887204-144.358829c2.911306-2.916423 4.328585-6.756891 4.270257-10.582009 0.057305-3.825119-1.358951-7.665587-4.270257-10.582009L465.023082 332.558142 465.023082 332.558142zM484.3605 568.012711 484.3605 405.883147 588.558653 486.947418 484.3605 568.012711 484.3605 568.012711z"  ></path>' +
    '' +
    '<path d="M828.424696 635.329886"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yinpin1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M121.481 760.198l-96.457 12.178c-1.246-9.964-40.547-342.924 133.545-539.573 73.484-82.894 184.748-141.57 352.75-141.57 173.123 0 286.324 60.060 359.947 144.476 171.601 196.926 127.731 526.564 126.348 536.113l-96.318-13.284c0.415-2.906 38.748-295.872-103.375-459.031-65.181-74.73-158.869-111.125-286.601-111.125-123.58 0-215.193 35.566-279.958 108.772-144.615 163.436-110.295 459.861-109.879 462.629v0.415z"  ></path>' +
    '' +
    '<path d="M836.114 934.15h-129.808v-356.625h129.808v356.625zM317.299 934.15h-129.531v-356.625h129.669v356.625h-0.139zM317.299 934.15z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)