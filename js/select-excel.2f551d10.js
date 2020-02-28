(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["select-excel"],{1:function(e,t){},2:function(e,t){},"2bf8":function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));n("99af"),n("4160"),n("d81d"),n("c19f"),n("ace4"),n("d3b7"),n("25f0"),n("5cc6"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),n("159b");var a=n("2909"),i=n("d4ec"),l=n("21a6"),r=n("1146"),c=n.n(r),o=function e(){Object(i["a"])(this,e),this.SheetNames=[],this.Sheets={}},s=function(e){return(+e-+new Date(Date.UTC(1899,11,30)))/864e5},u=function(e){for(var t={},n={s:{c:1e7,r:1e7},e:{c:0,r:0}},a=0;a!==e.length;++a)for(var i=0;i!==e[a].length;++i){n.s.r>a&&(n.s.r=a),n.s.c>i&&(n.s.c=i),n.e.r<a&&(n.e.r=a),n.e.c<i&&(n.e.c=i);var l={v:e[a][i],t:"",z:""};if(null!=l.v){var r=c.a.utils.encode_cell({c:i,r:a});"number"===typeof l.v?l.t="n":"boolean"===typeof l.v?l.t="b":l.v instanceof Date?(l.t="n",l.z=c.a.SSF.get_table()[14],l.v=s(l.v)):l.t="s",t[r]=l}}return n.s.c<1e7&&(t["!ref"]=c.a.utils.encode_range(n)),t},d=function(e){for(var t=new ArrayBuffer(e.length),n=new Uint8Array(t),a=0;a!==e.length;++a)n[a]=255&e.charCodeAt(a);return t},f=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"excel-list",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],s=!(arguments.length>5&&void 0!==arguments[5])||arguments[5],f=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"xlsx";t=Object(a["a"])(t),t.unshift(e);for(var h=i.length-1;h>-1;h--)t.unshift(i[h]);var m="SheetJS",p=new o,g=u(t);if(r.length>0&&(g["!merges"]||(g["!merges"]=[]),r.forEach((function(e){g["!merges"].push(c.a.utils.decode_range(e))}))),s){for(var b=t.map((function(e){return e.map((function(e){return null==e?{wch:10}:e.toString().charCodeAt(0)>255?{wch:2*e.toString().length}:{wch:e.toString().length}}))})),v=b[0],w=1;w<b.length;w++)for(var y=0;y<b[w].length;y++)v[y]["wch"]<b[w][y]["wch"]&&(v[y]["wch"]=b[w][y]["wch"]);g["!cols"]=v}p.SheetNames.push(m),p.Sheets[m]=g;var S=c.a.write(p,{bookType:f,bookSST:!1,type:"binary"});Object(l["saveAs"])(new Blob([d(S)],{type:"application/octet-stream"}),"".concat(n,".").concat(f))}},3:function(e,t){},"3e07":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-input",{staticStyle:{width:"350px"},attrs:{placeholder:"Please enter the file name (default excel-list)","prefix-icon":"el-icon-document"},model:{value:e.filename,callback:function(t){e.filename=t},expression:"filename"}}),n("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-document"},on:{click:e.handleDownload}},[e._v(" "+e._s(e.$t("excel.selectedExport"))+" ")]),n("a",{staticStyle:{"margin-left":"15px"},attrs:{href:"https://armour.github.io/vue-typescript-admin-docs/features/components/excel.html",target:"_blank"}},[n("el-tag",{attrs:{type:"info"}},[e._v("Documentation")])],1),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"multipleTable",attrs:{data:e.list,"element-loading-text":"Loading...",border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",align:"center"}}),n("el-table-column",{attrs:{align:"center",label:"Id",width:"95"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.$index)+" ")]}}])}),n("el-table-column",{attrs:{label:"Title"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.title)+" ")]}}])}),n("el-table-column",{attrs:{label:"Author",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tag",[e._v(e._s(t.row.author))])]}}])}),n("el-table-column",{attrs:{label:"Readings",align:"center",width:"115"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.pageviews)+" ")]}}])}),n("el-table-column",{attrs:{align:"center",label:"PDate",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("i",{staticClass:"el-icon-time"}),n("span",[e._v(e._s(t.row.timestamp))])]}}])})],1)],1)},i=[],l=(n("96cf"),n("1da1")),r=n("d4ec"),c=n("bee2"),o=n("99de"),s=n("7e84"),u=n("262e"),d=n("9ab4"),f=n("60a3"),h=n("9d25"),m=n("d257"),p=n("2bf8"),g=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(o["a"])(this,Object(s["a"])(t).apply(this,arguments)),e.list=[],e.listLoading=!0,e.multipleSelection=[],e.downloadLoading=!1,e.filename="",e}return Object(u["a"])(t,e),Object(c["a"])(t,[{key:"created",value:function(){this.fetchData()}},{key:"fetchData",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t,n,a=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.listLoading=!0,e.next=3,Object(h["d"])({});case 3:t=e.sent,n=t.data,this.list=n.items,setTimeout((function(){a.listLoading=!1}),500);case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"handleSelectionChange",value:function(e){this.multipleSelection=e}},{key:"handleDownload",value:function(){if(this.multipleSelection.length){this.downloadLoading=!0;var e=["Id","Title","Author","Readings","Date"],t=["id","title","author","pageviews","timestamp"],n=this.multipleSelection,a=Object(m["a"])(t,n);Object(p["a"])(e,a,""!==this.filename?this.filename:void 0),this.$refs.multipleTable.clearSelection(),this.downloadLoading=!1}else this.$message({message:"Please select at least one item",type:"warning"})}}]),t}(f["c"]);g=Object(d["a"])([Object(f["a"])({name:"SelectExcel"})],g);var b=g,v=b,w=n("2877"),y=Object(w["a"])(v,a,i,!1,null,null,null);t["default"]=y.exports},"9d25":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"d",(function(){return l})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return c})),n.d(t,"f",(function(){return o})),n.d(t,"e",(function(){return s}));var a=n("b32d"),i={id:0,status:"draft",title:"",fullContent:"",abstractContent:"",sourceURL:"",imageURL:"",timestamp:"",platforms:["a-platform"],disableComment:!1,importance:0,author:"",reviewer:"",type:"",pageviews:0},l=function(e){return Object(a["a"])({url:"/articles",method:"get",params:e})},r=function(e,t){return Object(a["a"])({url:"/articles/".concat(e),method:"get",params:t})},c=function(e){return Object(a["a"])({url:"/articles",method:"post",data:e})},o=function(e,t){return Object(a["a"])({url:"/articles/".concat(e),method:"put",data:t})},s=function(e){return Object(a["a"])({url:"/pageviews",method:"get",params:e})}}}]);