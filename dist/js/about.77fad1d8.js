"use strict";(self["webpackChunkvue_vk_test"]=self["webpackChunkvue_vk_test"]||[]).push([[443],{4055:function(e,t,s){s.r(t),s.d(t,{default:function(){return b}});var i=s(3396),r=s(7139);const l=e=>((0,i.dD)("data-v-80dfcd2c"),e=e(),(0,i.Cn)(),e),a={class:"profile"},n={key:0,class:"user-info"},c={class:"user-info__avatar"},o=["src"],d={class:"user-info__description"},h=["href"],f={class:"user-info__friends"},_={class:"user-info__item"},u={class:"user-item__avatar"},p=["src"],g={class:"user-item__description"},m=["href"],v=l((()=>(0,i._)("p",null,"Подгрузить еще 10 друзей...",-1))),w=[v],k={class:"wall-info"},F=l((()=>(0,i._)("p",{style:{"margin-right":"10px"}},"Посты:",-1))),D={key:0,class:"wall-info__posts"},$={key:0,class:"post"},U={class:"post__attachments"},y=["src"],P={class:"post__description"},x=["href"],z={key:1};function I(e,t,s,l,v,I){const O=(0,i.up)("router-link"),W=(0,i.up)("tempplate");return(0,i.wg)(),(0,i.iD)("div",a,[(0,i.Wm)(O,{to:"/"},{default:(0,i.w5)((()=>[(0,i.Uk)("Назад")])),_:1}),this.getProfile?((0,i.wg)(),(0,i.iD)("div",n,[(0,i._)("div",c,[(0,i._)("img",{src:this.getProfile.photo_200_orig,alt:""},null,8,o)]),(0,i._)("div",d,[(0,i._)("p",null,"Имя: "+(0,r.zw)(`${this.getProfile.last_name} ${this.getProfile.first_name}`),1),(0,i._)("p",null,"Возраст: "+(0,r.zw)(I.computeBDate(this.getProfile.bdate)),1),(0,i._)("p",null,"Пол: "+(0,r.zw)(2===this.getProfile.sex?"Мужчина":"Женщина"),1),(0,i._)("p",null,"Количество друзей: "+(0,r.zw)(`${this.getProfile.counters.friends}`),1),(0,i._)("a",{href:`https://vk.com/id${this.getProfile.id}`},"Профиль в ВК",8,h)]),(0,i._)("div",f,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(this.getFetchedUserFriends,(e=>((0,i.wg)(),(0,i.j4)(W,{key:e.id},{default:(0,i.w5)((()=>[(0,i._)("div",_,[(0,i._)("div",u,[(0,i._)("img",{src:e.photo,alt:"avatar"},null,8,p)]),(0,i._)("div",g,[(0,i._)("p",null,"Имя: "+(0,r.zw)(`${e.last_name} ${e.first_name}`),1),(0,i._)("p",null,"Пол: "+(0,r.zw)(2===e.sex?"Мужчина":"Женщина"),1),(0,i._)("a",{href:`https://vk.com/id${e.id}`},"Профиль в ВК",8,m)])])])),_:2},1024)))),128)),(0,i._)("div",{class:"user-info__item-next",onClick:t[0]||(t[0]=(...e)=>I.clickSearchNextFriends&&I.clickSearchNextFriends(...e))},w)])])):(0,i.kq)("",!0),(0,i._)("div",k,[F,0!==this.getFetchedWall.length?((0,i.wg)(),(0,i.iD)("div",D,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(this.getFetchedWall,(e=>((0,i.wg)(),(0,i.iD)(i.HY,{key:e.id},[0!==e.text.length||e.attachments?((0,i.wg)(),(0,i.iD)("div",$,[(0,i._)("div",U,[e?.attachments?.length>0&&"photo"===e?.attachments[0]?.type?((0,i.wg)(!0),(0,i.iD)(i.HY,{key:0},(0,i.Ko)(e.attachments,(t=>((0,i.wg)(),(0,i.iD)(i.HY,{key:t.photo.id},["photo"===t.type?((0,i.wg)(),(0,i.iD)("img",{key:0,src:e?.attachments[0]?.photo.sizes[1].url,alt:""},null,8,y)):(0,i.kq)("",!0)],64)))),128)):(0,i.kq)("",!0)]),(0,i._)("div",P,[(0,i._)("p",null,(0,r.zw)(e?.text.length>200?e?.text.slice(0,200)+"...":e?.text),1),(0,i._)("a",{href:`https://vk.com/id${this.$route.params.id}?w=wall${this.$route.params.id}_${e.id}`},"Перейти к посту",8,x)])])):(0,i.kq)("",!0)],64)))),128))])):((0,i.wg)(),(0,i.iD)("p",z,"У пользователя нет постов на стене..."))])])}var O=s(65),W={name:"ProfileView",beforeMount(){this.setUserFriendsOffset({offset:0});const e=this.$route.params.id;this.fetchUserWall({userId:e}),this.fetchUserFriends({userId:e}),this.fetchProfile({userId:e})},computed:{...(0,O.Se)(["getFetchedWall","getFetchedUserFriends","getProfile","getUserFriendsOffset"])},methods:{...(0,O.OI)(["setUserFriendsOffset"]),...(0,O.nv)(["fetchUserWall","fetchUserFriends","fetchProfile"]),computeBDate(e){if(e){let t=e.split(".");if(3===t.length){const e=new Date(t[2],t[1]-1,t[0]);return Math.floor((Date.now()-e)/31536e6)}}return"Нет информации"},clickSearchNextFriends(){this.setUserFriendsOffset({offset:this.getUserFriendsOffset+10}),this.fetchUserFriends({userId:this.$route.params.id})}}},H=s(89);const Y=(0,H.Z)(W,[["render",I],["__scopeId","data-v-80dfcd2c"]]);var b=Y}}]);
//# sourceMappingURL=about.77fad1d8.js.map