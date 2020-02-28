(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["permission-role"],{"38bf":function(e,t,r){"use strict";var n=r("529d"),a=r.n(n);a.a},"529d":function(e,t,r){},d78e:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("el-button",{attrs:{type:"primary"},on:{click:e.handleCreateRole}},[e._v(" "+e._s(e.$t("permission.createRole"))+" ")]),r("el-table",{staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:e.rolesList,border:""}},[r("el-table-column",{attrs:{align:"center",label:"Role Key",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.key)+" ")]}}])}),r("el-table-column",{attrs:{align:"center",label:"Role Name",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.name)+" ")]}}])}),r("el-table-column",{attrs:{align:"header-center",label:"Description"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.description)+" ")]}}])}),r("el-table-column",{attrs:{align:"center",label:"Operations"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(r){return e.handleEdit(t)}}},[e._v(" "+e._s(e.$t("permission.editPermission"))+" ")]),r("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(r){return e.handleDelete(t)}}},[e._v(" "+e._s(e.$t("permission.delete"))+" ")])]}}])})],1),r("el-dialog",{attrs:{visible:e.dialogVisible,title:"edit"===e.dialogType?"Edit Role":"New Role"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{attrs:{model:e.role,"label-width":"80px","label-position":"left"}},[r("el-form-item",{attrs:{label:"Name"}},[r("el-input",{attrs:{placeholder:"Role Name"},model:{value:e.role.name,callback:function(t){e.$set(e.role,"name",t)},expression:"role.name"}})],1),r("el-form-item",{attrs:{label:"Desc"}},[r("el-input",{attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"Role Description"},model:{value:e.role.description,callback:function(t){e.$set(e.role,"description",t)},expression:"role.description"}})],1),r("el-form-item",{attrs:{label:"Menus"}},[r("el-tree",{ref:"tree",staticClass:"permission-tree",attrs:{"check-strictly":e.checkStrictly,data:e.routesTreeData,props:e.defaultProps,"show-checkbox":"","node-key":"path"}})],1)],1),r("div",{staticStyle:{"text-align":"right"}},[r("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogVisible=!1}}},[e._v(" "+e._s(e.$t("permission.cancel"))+" ")]),r("el-button",{attrs:{type:"primary"},on:{click:e.confirmRole}},[e._v(" "+e._s(e.$t("permission.confirm"))+" ")])],1)],1)],1)},a=[],i=(r("a4d3"),r("e01a"),r("d28b"),r("99af"),r("4de4"),r("4160"),r("caad"),r("d81d"),r("a434"),r("b0c0"),r("d3b7"),r("25f0"),r("2532"),r("3ca3"),r("159b"),r("ddb0"),r("5530")),s=r("2909"),l=(r("96cf"),r("1da1")),o=r("d4ec"),c=r("bee2"),u=r("99de"),h=r("7e84"),d=r("262e"),p=r("9ab4"),f=r("df7c"),m=r.n(f),b=r("2ef0"),v=r("60a3"),y=r("b32d"),g=function(e){return Object(y["a"])({url:"/roles",method:"get",params:e})},k=function(e){return Object(y["a"])({url:"/roles",method:"post",data:e})},w=function(e,t){return Object(y["a"])({url:"/roles/".concat(e),method:"put",data:t})},R=function(e){return Object(y["a"])({url:"/roles/".concat(e),method:"delete"})},x=function(e){return Object(y["a"])({url:"/routes",method:"get",params:e})},O={key:0,name:"",description:"",routes:[]},j=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(u["a"])(this,Object(h["a"])(t).apply(this,arguments)),e.role=Object.assign({},O),e.reshapedRoutes=[],e.serviceRoutes=[],e.rolesList=[],e.dialogVisible=!1,e.dialogType="new",e.checkStrictly=!1,e.defaultProps={children:"children",label:"title"},e}return Object(d["a"])(t,e),Object(c["a"])(t,[{key:"created",value:function(){this.getRoutes(),this.getRoles()}},{key:"getRoutes",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,x({});case 2:t=e.sent,r=t.data,this.serviceRoutes=r.routes,this.reshapedRoutes=this.reshapeRoutes(r.routes);case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getRoles",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,g({});case 2:t=e.sent,r=t.data,this.rolesList=r.items;case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"generateTreeData",value:function(e){var t=[],r=!0,n=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done);r=!0){var l=i.value,o={children:[],title:"",path:""};o.title=this.$t("route.".concat(l.meta.title)).toString(),o.path=l.path,l.children&&(o.children=this.generateTreeData(l.children)),t.push(o)}}catch(c){n=!0,a=c}finally{try{r||null==s.return||s.return()}finally{if(n)throw a}}return t}},{key:"reshapeRoutes",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",r=[],n=!0,a=!1,i=void 0;try{for(var s,l=e[Symbol.iterator]();!(n=(s=l.next()).done);n=!0){var o=s.value;if(!o.meta||!o.meta.hidden){var c=this.onlyOneShowingChild(o.children,o);!o.children||!c||o.meta&&o.meta.alwaysShow||(o=c);var u={path:m.a.resolve(t,o.path),meta:{title:o.meta&&o.meta.title}};o.children&&(u.children=this.reshapeRoutes(o.children,u.path)),r.push(u)}}}catch(h){a=!0,i=h}finally{try{n||null==l.return||l.return()}finally{if(a)throw i}}return r}},{key:"flattenRoutes",value:function(e){var t=this,r=[];return e.forEach((function(e){if(r.push(e),e.children){var n=t.flattenRoutes(e.children);n.length>0&&(r=[].concat(Object(s["a"])(r),Object(s["a"])(n)))}})),r}},{key:"handleCreateRole",value:function(){this.role=Object.assign({},O),this.$refs.tree&&this.$refs.tree.setCheckedKeys([]),this.dialogType="new",this.dialogVisible=!0}},{key:"handleEdit",value:function(e){var t=this;this.dialogType="edit",this.dialogVisible=!0,this.checkStrictly=!0,this.role=Object(b["cloneDeep"])(e.row),this.$nextTick((function(){var e=t.flattenRoutes(t.reshapeRoutes(t.role.routes)),r=t.generateTreeData(e),n=r.map((function(e){return e.path}));t.$refs.tree.setCheckedKeys(n),t.checkStrictly=!1}))}},{key:"handleDelete",value:function(e){var t=this,r=e.$index,n=e.row;this.$confirm("Confirm to remove the role?","Warning",{confirmButtonText:"Confirm",cancelButtonText:"Cancel",type:"warning"}).then(Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,R(n.key);case 2:t.rolesList.splice(r,1),t.$message({type:"success",message:"Deleted!"});case 4:case"end":return e.stop()}}),e)})))).catch((function(e){console.error(e)}))}},{key:"generateTree",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",r=arguments.length>2?arguments[2]:void 0,n=[],a=!0,i=!1,s=void 0;try{for(var l,o=e[Symbol.iterator]();!(a=(l=o.next()).done);a=!0){var c=l.value,u=m.a.resolve(t,c.path);c.children&&(c.children=this.generateTree(c.children,u,r)),(r.includes(u)||c.children&&c.children.length>=1)&&n.push(c)}}catch(h){i=!0,s=h}finally{try{a||null==o.return||o.return()}finally{if(i)throw s}}return n}},{key:"confirmRole",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t,r,n,a,i,s,l,o,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t="edit"===this.dialogType,r=this.$refs.tree.getCheckedKeys(),this.role.routes=this.generateTree(Object(b["cloneDeep"])(this.serviceRoutes),"/",r),!t){e.next=16;break}return e.next=6,w(this.role.key,{role:this.role});case 6:n=0;case 7:if(!(n<this.rolesList.length)){e.next=14;break}if(this.rolesList[n].key!==this.role.key){e.next=11;break}return this.rolesList.splice(n,1,Object.assign({},this.role)),e.abrupt("break",14);case 11:n++,e.next=7;break;case 14:e.next=22;break;case 16:return e.next=18,k({role:this.role});case 18:a=e.sent,i=a.data,this.role.key=i.key,this.rolesList.push(this.role);case 22:s=this.role,l=s.description,o=s.key,c=s.name,this.dialogVisible=!1,this.$notify({title:"Success",dangerouslyUseHTMLString:!0,message:"\n          <div>Role Key: ".concat(o,"</div>\n          <div>Role Name: ").concat(c,"</div>\n          <div>Description: ").concat(l,"</div>\n        "),type:"success"});case 25:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onlyOneShowingChild",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=null,n=e.filter((function(e){return!e.meta||!e.meta.hidden}));return 1===n.length?(r=n[0],r.path=m.a.resolve(t.path,r.path),r):0===n.length&&(r=Object(i["a"])({},t,{path:""}),r)}},{key:"routesTreeData",get:function(){return this.generateTreeData(this.reshapedRoutes)}}]),t}(v["c"]);j=Object(p["a"])([Object(v["a"])({name:"RolePermission"})],j);var _=j,S=_,T=(r("38bf"),r("2877")),$=Object(T["a"])(S,n,a,!1,null,"2bb58253",null);t["default"]=$.exports}}]);