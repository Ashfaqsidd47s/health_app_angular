import{M as c,h}from"./chunk-H7RJ2U7N.js";var n=(a=>(a.Running="Running",a.Cycling="Cycling",a.Swimming="Swimming",a.Yoga="Yoga",a.Jogging="Jogging",a))(n||{}),o=(s=>(s[s.Five=5]="Five",s[s.Ten=10]="Ten",s[s.Twenty=20]="Twenty",s[s.Thirty=30]="Thirty",s[s.Fifty=50]="Fifty",s[s.Hundred=100]="Hundred",s))(o||{}),g=[{id:1,userName:"Ashfaq",workouts:[{type:"Running",minutes:30},{type:"Cycling",minutes:20}]},{id:2,userName:"Vivek",workouts:[{type:"Yoga",minutes:40},{type:"Running",minutes:15}]},{id:3,userName:"Sachin",workouts:[{type:"Cycling",minutes:40},{type:"Jogging",minutes:20}]}];var l=class u{users;currentPage=1;totalPages;rowCount=5;workoutTypes="Running";currentPageUsers=new h([]);currentPageUsers$=this.currentPageUsers.asObservable();constructor(){this.users=this.getUserData(),this.totalPages=Math.ceil(this.users.length/this.rowCount);let t=(this.currentPage-1)*this.rowCount,e=Math.min(this.currentPage*this.rowCount,this.users.length);this.currentPageUsers.next(this.users.slice(t,e))}getUserData(){let t=localStorage.getItem("userData");return t?JSON.parse(t):(localStorage.setItem("userData",JSON.stringify(g)),g)}addUserData(t){let e=this.getUserData(),r=e.findIndex(i=>i.userName===t.userName);if(r!==-1){let i=e[r].workouts.findIndex(a=>a.type===t.workout);i!==-1?e[r].workouts[i].minutes=t.duration:e[r].workouts.push({type:t.workout,minutes:t.duration})}else{let i=e.length+1;e.push({id:i,userName:t.userName,workouts:[{type:t.workout,minutes:t.duration}]})}localStorage.setItem("userData",JSON.stringify(e)),this.users=e,this.totalPages=Math.ceil(this.users.length/this.rowCount),this.currentPage>this.totalPages&&(this.currentPage=this.totalPages),this.updatePage(this.currentPage)}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.updatePage(this.currentPage))}prevPage(){this.currentPage>1&&(this.currentPage--,this.updatePage(this.currentPage))}updatePage(t){t>0&&t<=this.totalPages?this.currentPage=t:this.currentPage=1;let e=(this.currentPage-1)*this.rowCount,r=Math.min(this.currentPage*this.rowCount,this.users.length);this.currentPageUsers.next(this.users.length>0?this.users.slice(e,r):[])}updateRowCount(t){t=Number(t),Object.values(o).includes(t)&&(this.rowCount=t,this.totalPages=Math.ceil(this.users.length/this.rowCount),this.currentPage>this.totalPages&&(this.currentPage=this.totalPages),this.updatePage(this.currentPage))}getCurrentPageData(){return this.currentPageUsers}searchByUserName(t){t=t.trim().toLowerCase(),t===""?this.users=this.getUserData():this.users=this.getUserData().filter(e=>e.userName.toLowerCase().includes(t)),this.totalPages=Math.ceil(this.users.length/this.rowCount),this.currentPage>this.totalPages&&(this.currentPage=this.totalPages),this.updatePage(this.currentPage)}filterByWorkoutType(t){Object.values(n).includes(t)?this.users=this.getUserData().filter(e=>e.workouts.some(r=>r.type===t)):this.users=this.getUserData(),this.totalPages=Math.ceil(this.users.length/this.rowCount),this.currentPage>this.totalPages&&(this.currentPage=this.totalPages),this.updatePage(this.currentPage)}getAllNames(){return this.users.map(t=>t.userName)}getAllNamesAndId(){return this.users.map(t=>({userName:t.userName,id:t.id}))}getUserById(t){let e=this.users.find(r=>r.id===t);return e||null}static \u0275fac=function(e){return new(e||u)};static \u0275prov=c({token:u,factory:u.\u0275fac,providedIn:"root"})};export{n as a,o as b,l as c};
