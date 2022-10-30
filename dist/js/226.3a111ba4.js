"use strict";(self["webpackChunkvue_vk_test"]=self["webpackChunkvue_vk_test"]||[]).push([[226],{9226:function(e,s,t){t.r(s),t.d(s,{default:function(){return O}});var r=t(3396);const c={class:"home"};function n(e,s,t,n,i,a){const h=(0,r.up)("Search");return(0,r.wg)(),(0,r.iD)("div",c,[(0,r.Wm)(h)])}var i=t(9242),a=t(7139);const h=e=>((0,r.dD)("data-v-13cf321c"),e=e(),(0,r.Cn)(),e),l={class:"search"},d={class:"search__wrapper"},u={key:0,class:"search__menu"},o={class:"search__container"},_={class:"search-list"},k=["onClick"],U=h((()=>(0,r._)("p",null,"Загрузить следующие 20 записей...",-1))),f=[U],p={key:0,class:"fetched-users"},g=h((()=>(0,r._)("p",null,"Найденные друзья выбранных пользователей:",-1))),w={class:"fetched-users__container"},m=["src"],v={key:1};function C(e,s,t,c,n,h){const U=(0,r.up)("my-input"),C=(0,r.up)("my-button"),y=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",l,[this.isLoggedIn?((0,r.wg)(),(0,r.iD)(r.HY,{key:0},[(0,r._)("div",d,[this.getFetchedUsers?((0,r.wg)(),(0,r.iD)("div",u,[(0,r._)("div",o,[(0,r.Wm)(U,{modelValue:this.searchQuery,"onUpdate:modelValue":s[0]||(s[0]=e=>this.searchQuery=e),onInput:h.handleInput,onFocus:s[1]||(s[1]=()=>this.searchActive=!0),onFocusout:s[2]||(s[2]=()=>this.searchActive=!1)},null,8,["modelValue","onInput"]),(0,r.Wm)(C,{class:"search__button",onClick:h.clickSearchButtonHandler},{default:(0,r.w5)((()=>[(0,r.Uk)("Найти")])),_:1},8,["onClick"]),n.showSearchedUsers?((0,r.wg)(),(0,r.iD)("p",{key:0,class:"search__close-results",onClick:s[3]||(s[3]=(...e)=>h.closeSearchResults&&h.closeSearchResults(...e))},"Скрыть результаты...")):(0,r.wy)(((0,r.wg)(),(0,r.iD)("p",{key:1,class:"search__close-results",onClick:s[4]||(s[4]=(...e)=>h.openSearchResults&&h.openSearchResults(...e))},"Показать результаты...",512)),[[i.F8,0!==this.getFetchedUsers.length]])]),(0,r.wy)((0,r._)("div",_,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(this.getFetchedUsers,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id,class:"search-list__user",onClick:()=>h.userClickHandler(e)},[(0,r._)("p",null,[(0,r.Uk)("id: "),(0,r.Wm)(y,{to:`/profile/${e.id}`},{default:(0,r.w5)((()=>[(0,r.Uk)((0,a.zw)(e.id),1)])),_:2},1032,["to"])]),(0,r._)("p",null,(0,a.zw)(`${e.first_name} ${e.last_name}`),1),(0,r._)("p",null,"Общих друзей: "+(0,a.zw)(e.common_count),1)],8,k)))),128)),(0,r._)("div",{class:"search-list__next-users",onClick:s[5]||(s[5]=(...e)=>h.clickSearchNextUsers&&h.clickSearchNextUsers(...e))},f)],512),[[i.F8,n.showSearchedUsers]])])):(0,r.kq)("",!0)]),(0,r.Wm)(C,{class:"compute__button",onClick:h.clickComputeButtonHandler},{default:(0,r.w5)((()=>[(0,r.Uk)("Построить")])),_:1},8,["onClick"]),0!==this.getFetchedCheckedUsersFriends.length?((0,r.wg)(),(0,r.iD)("div",p,[g,(0,r._)("div",w,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(this.getFetchedCheckedUsersFriends,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id,class:"user-card"},[(0,r._)("img",{src:e.photo_200_orig,class:"user-card__avatar",alt:"Avatar"},null,8,m),(0,r._)("p",null,[(0,r.Uk)("ID: "),(0,r.Wm)(y,{to:`/profile/${e.id}`},{default:(0,r.w5)((()=>[(0,r.Uk)((0,a.zw)(e.id),1)])),_:2},1032,["to"])]),(0,r._)("p",null,(0,a.zw)(`${e.last_name} ${e.first_name}`),1),(0,r._)("p",null,(0,a.zw)(e.counters),1),(0,r._)("p",null,"Пол: "+(0,a.zw)(2===e.sex?"Мужчина":"Женщина"),1),(0,r._)("p",null,"Друзей среди выбранных пользователей: "+(0,a.zw)(e.countCheckedUserMatch),1)])))),128))])])):(0,r.kq)("",!0)],64)):((0,r.wg)(),(0,r.iD)("p",v,"Для начала войдите через ВК"))])}t(7658);var y=t(65),S=t(6115);const F={class:"my-input"};function I(e,s,t,c,n,i){return(0,r.wg)(),(0,r.iD)("input",F)}var D={name:"MyInput"},H=t(89);const Q=(0,H.Z)(D,[["render",I],["__scopeId","data-v-7f8b9ff2"]]);var $=Q,z={name:"SearchUsers",components:{MyInput:$,MyButton:S.Z},data(){return{foundUsers:[],checkedUsersIds:[],searchActive:!1,searchQuery:"",showSearchedUsers:!1}},computed:{...(0,y.Se)(["getUsersOffset","getAllUsers","getCheckedUsers","isLoggedIn","getLoggedUserId","getFetchedUsers","getFetchedCheckedUsersFriends"])},methods:{...(0,y.OI)(["setCheckedUsers","setUsersOffset"]),...(0,y.nv)(["fetchUserFriends","fetchCheckedUsersFriends","fetchUsers"]),handleInput(e){this.searchQuery=e.target.value},closeSearchResults(){this.showSearchedUsers=!1},openSearchResults(){this.showSearchedUsers=!0},findUsers(e){this.foundUsers=this.getAllUsers.filter((s=>s.name.toLowerCase().startsWith(e.toLowerCase())))},clickSearchButtonHandler(){this.setUsersOffset({offset:0}),this.fetchUsers({q:+this.searchQuery?`id${this.searchQuery}`:this.searchQuery}),this.showSearchedUsers=!0},clickSearchNextUsers(){this.setUsersOffset({offset:this.getUsersOffset+20}),this.fetchUsers({q:+this.searchQuery?`id${this.searchQuery}`:this.searchQuery})},clickComputeButtonHandler(){0!==this.getCheckedUsers.length&&this.fetchCheckedUsersFriends({userIds:this.getCheckedUsers.map((e=>e.id))})},userClickHandler(e){const s=this.getCheckedUsers.findIndex((s=>s.id===e.id));let t=[...this.getCheckedUsers];-1===s?t.push({id:e.id,name:`${e.last_name} ${e.first_name}`}):t.splice(s,1),this.setCheckedUsers({checkedUsers:t})}}};const W=(0,H.Z)(z,[["render",C],["__scopeId","data-v-13cf321c"]]);var b=W,x={name:"HomeView",components:{Search:b}};const A=(0,H.Z)(x,[["render",n]]);var O=A}}]);
//# sourceMappingURL=226.3a111ba4.js.map