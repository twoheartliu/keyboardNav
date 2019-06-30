 // utils
 var log = console.log.bind(console)

 var t = (tag, attr) => {
     var element = document.createElement(tag)
     for (var i in attr) {
         element[i] = attr[i]
     }
     return element
 }

 var getHashFromLocalStorage = (name) => JSON.parse(localStorage.getItem(name) || 'null')

 // 初始化数据
 var init = () => {
     var keys = {
         0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
         1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
         2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
         length: 3
     }
     var hash = {
         q: 'qzone.qq.com',
         w: 'weibo.com',
         e: 'ele.me',
         r: 'reactjs.org',
         t: 'twitter.com',
         y: 'youtube.cn',
         u: 'uc.cn',
         i: 'iqiyi.com',
         o: 'opera.com',
         p: undefined,
         a: 'www.acfun.cn',
         m: 'map.baidu.com',
     }
     var hashInLocalStorage = getHashFromLocalStorage('localHash')
     if (hashInLocalStorage) {
         hash = hashInLocalStorage
     }
     return {
         keys,
         hash
     }
 }

 var createSpan = (textContent) => {
     return t('span', {
         className: 'text',
         textContent
     })
 }

 var createButton = (id, hash) => {
     var button = t('button', {
         textContent: '编辑',
         className: 'edit',
         id
     })
     button.onclick = function(event) {
         var c = event.target.id
         var img = event.target.nextSibling
         var x = prompt('请输入要跳转的网址')
         if (x !== null) {
             hash[c] = x
         }
         img.src = `http://${hash[c]}/favicon.ico`
         img.onerror = (e) => {
             e.target.src = 'https://via.placeholder.com/20x20'
         }
         localStorage.setItem('localHash', JSON.stringify(hash));
     }
     return button
 }

 var createImage = (domain) => {
     var img = t('img')
     if (domain) {
         img.src = `http://${domain}/favicon.ico`
         img.className = 'ableToClick'
         img.onclick = () => {
             window.open('http://' + domain, '_blank')
         }
     } else {
         img.src = 'https://via.placeholder.com/20x20'
     }
     img.onerror = (e) => {
         e.target.src = 'https://via.placeholder.com/20x20'
     }
     return img
 }

 var generateKeyboard = (keys, hash) => {
     for (var index = 0; index < keys.length; index++) {
         var div1 = t('div', {
             className: 'row'
         })
         idMain.appendChild(div1)

         var row = keys[index]

         for (var index2 = 0; index2 < row.length; index2++) {
             var span = createSpan(row[index2])
             var button = createButton(row[index2], hash)
             var img = createImage(hash[row[index2]])

             var kbd1 = t('kbd', {
                 className: 'key'
             })

             kbd1.appendChild(span)
             kbd1.appendChild(button)
             kbd1.appendChild(img)
             div1.appendChild(kbd1)
         }
     }
 }

 var listenToKeyboard = (hash) => {
     document.onkeypress = function(e) {
         var key = e.key
         var website = hash[key]
         if (website) {
             window.open('http://' + website, '_blank')
         } else {
             alert(`${key.toUpperCase()} 键还没有绑定网站，请先编辑网址`)
         }
     }
 }

 var __main = () => {
     var initMap = init()
     var keys = initMap['keys']
     var hash = initMap['hash']

     generateKeyboard(keys, hash)
     listenToKeyboard(hash)
 }
 __main()