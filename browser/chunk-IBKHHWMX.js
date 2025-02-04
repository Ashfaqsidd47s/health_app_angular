import{a as R,b as _,e as C,h as S,i as k,j as P,k as U,l as T}from"./chunk-SSEL4AJ2.js";import{a as j,b as V,c as N}from"./chunk-HVNGJKUZ.js";import{Ca as g,Ea as m,Fa as O,Ka as r,La as n,Ma as w,Na as I,Oa as d,Pa as M,Qa as a,Ra as p,S as y,Sa as A,Ta as b,U as c,Ua as h,Va as v,Xa as f,aa as D,ba as F,ob as x,pb as B,sa as l}from"./chunk-H7RJ2U7N.js";function J(i,o){if(i&1){let e=I();r(0,"button",7),d("click",function(){let u=D(e).$implicit,s=M();return F(s.changePage(u))}),a(1),n()}if(i&2){let e=o.$implicit,t=M();O("bg-red-500",t.userService.currentPage===e)("text-white",t.userService.currentPage===e)("bg-white",t.userService.currentPage!==e)("text-blue-500",t.userService.currentPage!==e),l(),A(" ",e," ")}}function K(i,o){if(i&1&&(r(0,"option",8),a(1),n()),i&2){let e=o.$implicit;m("value",e),l(),p(e)}}var W=class i{userService=y(N);currentPage=this.userService.currentPage;rowCount=this.userService.rowCount;allRowCounts=Object.values(V).filter(o=>typeof o=="number");nextPage(){this.userService.nextPage()}prevPage(){this.userService.prevPage()}changePage(o){this.userService.updatePage(o)}changeRowCount(o){this.userService.updateRowCount(o)}get pages(){return Array.from({length:this.userService.totalPages},(o,e)=>e+1)}get currentPageData(){return this.userService.getCurrentPageData()}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=c({type:i,selectors:[["app-pagination"]],standalone:!0,features:[f],decls:9,vars:5,consts:[[1,"w-full","flex","items-center","justify-center","space-x-4","p-4","bg-red-100","rounded-md"],["id","prev-button",1,"px-4","py-2","border","border-red-300","rounded-md","text-gray-700","bg-white","hover:bg-red-300","hover:text-white","disabled:opacity-50",3,"click","disabled"],[1,"flex","space-x-2"],["class","px-3 py-2 border border-red-300 rounded-md hover:bg-red-300 hover:text-white transition",3,"bg-red-500","text-white","bg-white","text-blue-500","click",4,"ngFor","ngForOf"],["id","next-button",1,"px-4","py-2","border","border-red-300","rounded-md","text-gray-700","bg-white","hover:bg-red-300","hover:text-white","disabled:opacity-50",3,"click","disabled"],[1,"ml-4","px-3","py-2","border","border-red-300","rounded-md","bg-white","text-gray-700","hover:border-red-500","focus:outline-none","focus:ring-2","focus:ring-red-400",3,"ngModelChange","change","ngModel"],[3,"value",4,"ngFor","ngForOf"],[1,"px-3","py-2","border","border-red-300","rounded-md","hover:bg-red-300","hover:text-white","transition",3,"click"],[3,"value"]],template:function(e,t){e&1&&(r(0,"div",0)(1,"button",1),d("click",function(){return t.prevPage()}),a(2," \xAB Prev "),n(),r(3,"div",2),g(4,J,2,9,"button",3),n(),r(5,"button",4),d("click",function(){return t.nextPage()}),a(6," Next \xBB "),n(),r(7,"select",5),v("ngModelChange",function(s){return h(t.rowCount,s)||(t.rowCount=s),s}),d("change",function(){return t.changeRowCount(t.rowCount)}),g(8,K,2,2,"option",6),n()()),e&2&&(l(),m("disabled",t.userService.currentPage===1),l(3),m("ngForOf",t.pages),l(),m("disabled",t.userService.currentPage===t.userService.totalPages),l(2),b("ngModel",t.rowCount),l(),m("ngForOf",t.allRowCounts))},dependencies:[x,T,k,P,S,_,C],encapsulation:2})};function Q(i,o){if(i&1&&(r(0,"option",19),a(1),n()),i&2){let e=o.$implicit;m("value",e),l(),p(e)}}function X(i,o){if(i&1&&(r(0,"div",20)(1,"div",21),a(2),n(),r(3,"div",22),a(4),n(),r(5,"div",23),a(6),n(),r(7,"div",23),a(8),n()()),i&2){let e=o.$implicit;l(2),p(e.userName),l(2),p(e.workouts),l(2),p(e.count),l(2),p(e.totalTime)}}function Y(i,o){i&1&&(r(0,"div",24),a(1," No user data available. "),n())}var E=class i{userData=[];tableFormatedData=[];userService=y(N);subscription;searchName="";filterType="All";allFilterWorkouts=[...Object.values(j),"All"];constructor(){}ngOnInit(){this.subscription=this.userService.currentPageUsers$.subscribe(o=>{this.userData=o,console.log("changes in this component :",o),this.formatTableData(o)})}formatTableData(o){this.tableFormatedData=o.map(e=>{let t=e.workouts.map(s=>s.type).join(", "),u=e.workouts.reduce((s,G)=>s+G.minutes,0);return{id:e.id,userName:e.userName,count:e.workouts.length,workouts:t,totalTime:u}})}ngOnDestroy(){this.subscription?.unsubscribe()}searchByName(){console.log("searching",this.searchName),this.userService.searchByUserName(this.searchName)}filterByType(){console.log("searching",this.filterType),this.userService.filterByWorkoutType(this.filterType)}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=c({type:i,selectors:[["app-workouttable"]],standalone:!0,features:[f],decls:31,vars:5,consts:[[1,"w-[100%]","p-4","bg-red-50","flex","flex-col","items-center","justify-center"],[1,"w-full","md:w-[90%]","lg:w-[80%]"],[1,"text-xl","font-semibold","text-gray-900","mb-4"],[1,"p-4","py-3","flex","items-center","justify-between","rounded-md","shadow-sm","bg-red-100","mb-1"],[1,"mb-4"],["for","searchName",1,"block","text-sm","font-medium","text-gray-700"],["id","searchName","type","text","name","serarchName","placeholder","search by name","required","",1,"mt-1","block","w-full","p-2","border","border-red-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-2","focus:ring-red-500","focus:border-red-500",3,"ngModelChange","ngModel"],["for","filterType",1,"block","text-sm","font-medium","text-gray-700"],["id","filterType","name","filterType","required","",1,"mt-1","block","w-full","p-2","border","border-red-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-2","focus:ring-red-500","focus:emerald-blue-500",3,"ngModelChange","ngModel"],["value","All"],[3,"value",4,"ngFor","ngForOf"],[1,"w-full","h-[450px]","flex","flex-col","items-center","justify-between","overflow-hidden","rounded-md","shadow-md","border","border-gray-200"],[1,"w-full","max-w-full","bg-white","shadow-sm"],[1,"bg-red-300","flex","items-center","px-4","py-2","font-semibold","text-gray-700","border-b","border-b-red-300"],[1,"w-1/4","px-4","py-3","text-left"],[1,"w-1/4","px-4","py-3","text-left","truncate"],[1,"h-[300px]","w-full","overflow-y-auto"],["class","flex items-center w-full px-4 py-3 border-b border-gray-200 hover:bg-red-50",4,"ngFor","ngForOf"],["class","mt-4 text-center text-gray-500",4,"ngIf"],[3,"value"],[1,"flex","items-center","w-full","px-4","py-3","border-b","border-gray-200","hover:bg-red-50"],[1,"w-1/4","px-4","text-left","text-gray-900","truncate"],[1,"w-1/4","px-4","text-left","text-gray-700","truncate"],[1,"w-1/4","px-4","text-left","text-gray-700"],[1,"mt-4","text-center","text-gray-500"]],template:function(e,t){e&1&&(r(0,"div",0)(1,"div",1)(2,"h2",2),a(3,"User Data"),n(),r(4,"div",3)(5,"div",4)(6,"label",5),a(7,"Search "),n(),r(8,"input",6),v("ngModelChange",function(s){return h(t.searchName,s)||(t.searchName=s),s}),d("ngModelChange",function(){return t.searchByName()}),n()(),r(9,"div",4)(10,"label",7),a(11,"Workout Type"),n(),r(12,"select",8),v("ngModelChange",function(s){return h(t.filterType,s)||(t.filterType=s),s}),d("ngModelChange",function(){return t.filterByType()}),r(13,"option",9),a(14,"All"),n(),g(15,Q,2,2,"option",10),n()()(),r(16,"div",11)(17,"div",12)(18,"div",13)(19,"div",14),a(20,"Name"),n(),r(21,"div",14),a(22,"Workouts"),n(),r(23,"div",15),a(24,"Number of Workouts"),n(),r(25,"div",15),a(26,"Total Minutes"),n()(),r(27,"div",16),g(28,X,9,4,"div",17)(29,Y,2,0,"div",18),n()(),w(30,"app-pagination"),n()()()),e&2&&(l(8),b("ngModel",t.searchName),l(4),b("ngModel",t.filterType),l(3),m("ngForOf",t.allFilterWorkouts),l(13),m("ngForOf",t.tableFormatedData),l(),m("ngIf",t.userData.length===0))},dependencies:[x,B,T,k,P,R,S,_,U,C,W],encapsulation:2})};var z=class i{static \u0275fac=function(e){return new(e||i)};static \u0275cmp=c({type:i,selectors:[["app-workouts"]],standalone:!0,features:[f],decls:2,vars:0,consts:[[1,"bg-emerald-100"]],template:function(e,t){e&1&&(r(0,"section",0),w(1,"app-workouttable"),n())},dependencies:[E],encapsulation:2})};export{z as WorkoutsComponent};
