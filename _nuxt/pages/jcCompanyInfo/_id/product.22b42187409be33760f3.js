webpackJsonp([18],{"+hjU":function(t,a,e){"use strict";var i=e("JlrH"),o=e("yEoQ"),s=e.n(o);a.a={components:{vPagination:i.a},asyncData:function(t){return s.a.all([function(){return s.a.get(t.store.state.HOST+"/zxpc/company/getCateGory")}(),function(){var a={id:t.route.params.id,page:0,pagesize:18,category:"",order:""};return s.a.get(t.store.state.HOST+"/zxpc/company/getJcProductInfo?id="+a.id+"&page=0&pagesize=18")}()]).then(function(t){return{productFL:t[0].data.data,productList:t[1].data.data,pageData:{page:1,pagesize:18,pageNo:t[1].data.pageCount}}})},data:function(){return{id:this.$route.params.id,pageData:{page:1,pagesize:18,pageNo:2}}},methods:{getProductList:function(t){var a=this;s.a.get(this.$store.state.HOST+"/zxpc/company/getJcProductInfo?id="+this.id+"&page="+(t.page-1).toString()+"&pagesize="+t.pagesize+"&category="+t.category+"&order="+t.order,{emulateJSON:!0}).then(function(t){if(t=t.data,a.$layer.closeAll("loading"),0===t.code)return a.$layer.msg(t.msg),!1;a.productList=t.data,a.pageData.pageNo=t.pageCount})},listOrder:function(t){this.pageData.order=""},getCategory:function(){}}}},"+p+b":function(t,a,e){var i=e("Dokx");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("8bSs")("46f1753e",i,!0)},"6Pzq":function(t,a,e){"use strict";a.a={props:{pageData:{}},data:function(){return{backClipped:!0,preClipped:!1}},methods:{prePage:function(t){this.goPage(this.pageData.page-1)},nextPage:function(t){this.goPage(this.pageData.page+1)},goPage:function(t){t!==this.pageData.page&&(this.pageData.page=t,this.$emit("goPage",this.pageData))}},computed:{pages:function(){var t=[];if(this.pageData.page>3)t.push(this.pageData.page-2),t.push(this.pageData.page-1),this.pageData.page>4&&(this.preClipped=!0);else{this.preClipped=!1;for(var a=2;a<this.pageData.page;a++)t.push(a)}if(this.pageData.page!==this.pageData.pageNo&&1!==this.pageData.page&&t.push(this.pageData.page),this.pageData.page<this.pageData.pageNo-2)t.push(this.pageData.page+1),t.push(this.pageData.page+2),this.pageData.page<=this.pageData.pageNo-3&&(this.backClipped=!0);else{this.backClipped=!1;for(var e=this.pageData.page+1;e<this.pageData.pageNo;e++)t.push(e)}return t}}}},Dokx:function(t,a,e){a=t.exports=e("BkJT")(!1),a.push([t.i,'.productFL-box[data-v-0222ad5c]{position:relative;border:1px solid #ededed}#toggleBtn[data-v-0222ad5c]{position:absolute;top:13.5px;right:15px;width:16px;height:16px;border:1px solid #26cb9b;padding:0}#toggleBtn.on[data-v-0222ad5c]:after{-webkit-transform:rotate(180deg);transform:rotate(180deg)}#toggleBtn[data-v-0222ad5c]:after{content:"";width:16px;height:16px;position:absolute;top:0;left:0;background:url('+e("0B7G")+') no-repeat;background-position:2px 5px;background-size:265px auto;-webkit-transition:all .25s;transition:all .25s}.product-tab.on[data-v-0222ad5c]{height:86px}.product-tab[data-v-0222ad5c]{position:relative;width:750px;overflow:hidden;height:43px;line-height:43px;-webkit-transition:all .25s;transition:all .25s}.product-tab li[data-v-0222ad5c]{font-size:14px;float:left;padding:0 18px;-webkit-transition:all .25s;transition:all .25s}.product-tab li.on[data-v-0222ad5c]{background:#26cb9b;color:#fff}.px-box[data-v-0222ad5c]{width:100%;padding:0 20px;background:#fafafa;line-height:3;margin:20px 0;font-size:14px;color:#999}.px-box em.on[data-v-0222ad5c]{color:#26cb9b}.px-box em[data-v-0222ad5c]:not(:first-child){margin-right:20px;cursor:pointer;position:relative}.px-box em[data-v-0222ad5c]:not(:first-child):not(:nth-child(2)){padding-right:15px}.product-list[data-v-0222ad5c]{overflow:hidden}.product-list li[data-v-0222ad5c]{float:left;width:243px;height:340px;-webkit-transition:all .25s;transition:all .25s;margin:10px}.product-list li[data-v-0222ad5c]:hover{-webkit-box-shadow:0 0 15px 0 rgba(0,0,0,.2);box-shadow:0 0 15px 0 rgba(0,0,0,.2)}.product-list .img-box[data-v-0222ad5c]{background:#fffcf9;position:relative;overflow:hidden}.product-list li img[data-v-0222ad5c]{width:250px;height:250px;-webkit-transition:all 2s;transition:all 2s;-webkit-transform:scale(1);transform:scale(1)}.product-list li:hover img[data-v-0222ad5c]{-webkit-transform:scale(1.05);transform:scale(1.05)}.product-list .bottom-txt[data-v-0222ad5c]{font-size:14px;padding:10px;text-align:center}.product-list .bottom-txt .title[data-v-0222ad5c]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;margin-bottom:3px}.px-box .click-order.desc[data-v-0222ad5c]:after{content:"";position:absolute;top:6px;right:0;width:13px;height:7px;background:url('+e("0B7G")+") no-repeat;background-position:0 0;-webkit-transition:all .25s;transition:all .25s;-webkit-transform:rotate(0);transform:rotate(0)}.px-box .click-order.asc[data-v-0222ad5c]:after{-webkit-transform:rotate(180deg);transform:rotate(180deg)}",""])},JlrH:function(t,a,e){"use strict";function i(t){e("Lse6")}var o=e("6Pzq"),s=e("apY6"),r=e("/Xao"),p=i,n=r(o.a,s.a,!1,p,"data-v-559f9071",null);a.a=n.exports},Lse6:function(t,a,e){var i=e("fbue");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("8bSs")("7dc03207",i,!0)},apY6:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"pager"},[e("button",{staticClass:"btn btn-pager",attrs:{disabled:1==t.pageData.page},on:{click:t.prePage}},[t._v("上一页")]),1!==t.pageData.pageNo?e("span",{staticClass:"page-index",class:1==t.pageData.page?"active":"",on:{click:function(a){t.goPage(1)}}},[t._v("1")]):t._e(),t.preClipped?e("span",{staticClass:"page-index"},[t._v("...")]):t._e(),t._l(t.pages,function(a){return e("span",{staticClass:"page-index",class:a==t.pageData.page?"active":"",on:{click:function(e){t.goPage(a)}}},[t._v(t._s(a))])}),t.backClipped?e("span",{staticClass:"page-index"},[t._v("...")]):t._e(),e("span",{staticClass:"page-index",class:t.pageData.pageNo==t.pageData.page?"active":"",on:{click:function(a){t.goPage(t.pageData.pageNo)}}},[t._v(t._s(t.pageData.pageNo))]),e("button",{staticClass:"btn btn-pager",attrs:{disabled:t.pageData.page==t.pageData.pageNo},on:{click:t.nextPage}},[t._v("下一页")])],2)},o=[],s={render:i,staticRenderFns:o};a.a=s},fbue:function(t,a,e){a=t.exports=e("BkJT")(!1),a.push([t.i,".pager[data-v-559f9071]{text-align:center;margin-top:10px}.btn-pager[data-v-559f9071]{margin-left:10px;padding:0;width:60px;height:30px;text-align:center;background-color:#fff;color:#666;border:1px solid #e3e3e3;border-radius:0}.btn-pager[data-v-559f9071]:hover{background-color:#f2f2f2}.page-index[data-v-559f9071]{display:inline-block;margin-left:10px;width:35px;height:32px;line-height:30px;background-color:#fff;cursor:pointer;color:#666;border:1px solid #efefef}.page-index[data-v-559f9071]:hover{color:#26cb9b}.active[data-v-559f9071]{color:#fff!important;background-color:#00b489}",""])},hOXI:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"product"},[e("div",{staticClass:"productFL-box"},[e("ul",{staticClass:"product-tab"},[e("li",{staticClass:"on",attrs:{"data-val":""},on:{click:t.getCategory}},[t._v("全部商品")]),t._l(t.productFL,function(a){return e("li",{attrs:{"data-val":"item.id"},on:{click:t.getCategory}},[t._v(t._s(a.cat_name))])})],2)]),e("section",{staticClass:"px-box"},[e("em",{staticClass:"title"},[t._v("排序：")]),e("em",{staticClass:"on",attrs:{"data-order":""},on:{click:t.listOrder}},[t._v("默认排序")]),e("em",{staticClass:"click-order",attrs:{"data-order":"price ","data-type":"desc"},on:{click:t.listOrder}},[t._v("价格")])]),t.productList.length>0?e("ul",{staticClass:"product-list"},t._l(t.productList,function(a){return e("li",[e("router-link",{attrs:{to:{path:"/jcProductInfo",query:{pid:a.id,cid:t.id}},target:"_blank"}},[e("div",{staticClass:"img-box"},[e("img",{attrs:{src:a.img1,alt:a.title}})]),e("div",{staticClass:"bottom-txt"},[e("h3",{staticClass:"title"},[t._v(t._s(a.title))]),e("p",{staticClass:"color-red"},[t._v(t._s(a.price)+t._s(a.unit))])])])],1)})):e("p",{staticClass:"no-result subtitle"},[t._v("抱歉，暂无产品信息 ╮(╯▽╰)╭ ")]),t.productList.length>0?e("v-pagination",{staticClass:"page-hd fr",attrs:{"page-data":t.pageData},on:{goPage:t.getProductList}}):t._e()],1)},o=[],s={render:i,staticRenderFns:o};a.a=s},z1iT:function(t,a,e){"use strict";function i(t){e("+p+b")}Object.defineProperty(a,"__esModule",{value:!0});var o=e("+hjU"),s=e("hOXI"),r=e("/Xao"),p=i,n=r(o.a,s.a,!1,p,"data-v-0222ad5c",null);a.default=n.exports}});
//# sourceMappingURL=product.22b42187409be33760f3.js.map