"use strict";(self.webpackChunkmedium_clone=self.webpackChunkmedium_clone||[]).push([[726],{2726:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var s=n(1413),a=n(4165),r=n(5861),i=n(885),c=n(9062),l=n(5705),o=n(2791),d=n(6871),m=n(6912),u=n(326),x=n(1724),h=x.Ry({comment:x.Z_().required("Comment is required")}),f=n(9085),p=(n(5462),n(184)),v=function(){var e,t,n,x,v,j,g,y,w,b=(0,o.useContext)(m.$j).articles,N=(0,o.useContext)(m.Vo).authData,k=(0,d.UO)(),C=(0,o.useState)([]),Z=(0,i.Z)(C,2),A=Z[0],L=Z[1],S={position:"top-right",autoClose:2e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!1,draggable:!1,progress:void 0},_=b&&b.filter((function(e){return k.id===e.id})),U=_[0]&&new Date(1e3*(null===(e=_[0])||void 0===e?void 0:e.data.date.seconds)).toLocaleString("en-US",{day:"numeric",month:"short"}),J=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,c.cf)((0,c.IO)((0,c.hJ)(u.db,"articles/".concat(k.id,"/comments")),(0,c.Xo)("date","desc")),(function(e){L(e.docs.map((function(e){return{id:e.id,commentsArray:e.data()}})))}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=(0,c.JU)((0,c.hJ)(u.db,"articles/".concat(k.id,"/comments"))),B=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(t,n){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,c.pl)(O,(0,s.Z)((0,s.Z)({},t),{},{image:N.isAnonymous?"":N.photoURL,name:N.isAnonymous?"Anonymous".concat(N.uid.slice(0,4)):N.displayName,date:(0,c.Bt)()}));case 2:f.Am.success("Commented",S),n();case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),M=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,c.oe)((0,c.JU)(u.db,"articles/".concat(k.id,"/comments/").concat(t)));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){return J(),window.scrollTo(0,0),function(){}}),[]),(0,p.jsx)(p.Fragment,{children:_.length>0?(0,p.jsxs)("div",{className:"w-full max-w-[50rem] mx-auto px-6 py-10 mt-20",children:[(0,p.jsxs)("div",{className:"flex space-x-4 items-center w-full",children:[(0,p.jsx)("figure",{className:"w-12 h-12 rounded-full overflow-hidden",children:(0,p.jsx)("img",{src:null===(t=_[0])||void 0===t?void 0:t.data.author_image,alt:""})}),(0,p.jsxs)("div",{className:"flex-grow",children:[(0,p.jsx)("p",{className:"text-xl font-medium",children:null===(n=_[0])||void 0===n?void 0:n.data.author}),(0,p.jsxs)("div",{className:"flex justify-between items-center mt-1",children:[(0,p.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,p.jsx)("p",{className:"text-sm text-gray-500",children:U}),(0,p.jsx)("div",{className:"bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-0.5 rounded-full",children:(0,p.jsx)("p",{children:null===(x=_[0])||void 0===x?void 0:x.data.category})})]}),(0,p.jsx)("button",{onClick:function(){var e,t;!function(e,t){var n=new SpeechSynthesisUtterance("".concat(e," ").concat(t));n.pitch=1,n.rate=.8,window.speechSynthesis.speak(n)}(null===(e=_[0])||void 0===e?void 0:e.data.title,null===(t=_[0])||void 0===t?void 0:t.data.sub_title)},children:"listen"})]})]})]}),(0,p.jsxs)("div",{className:"mt-6",children:[(0,p.jsx)("h4",{className:"text-2xl sm:text-3xl font-serif capitalize text-gray-700",children:null===(v=_[0])||void 0===v?void 0:v.data.title}),(0,p.jsx)("p",{className:"text-gray-500 text-lg sm:text-xl mt-2",children:null===(j=_[0])||void 0===j?void 0:j.data.sub_title})]}),(0,p.jsx)("figure",{className:"w-full max-w-[50rem] my-8",children:(0,p.jsx)("img",{className:"w-full h-full",src:null===(g=_[0])||void 0===g?void 0:g.data.post_image,alt:"",loading:"lazy"})}),(0,p.jsx)("div",{className:"space-y-5",children:(null===(y=_[0])||void 0===y?void 0:y.data.content)&&(null===(w=_[0])||void 0===w?void 0:w.data.content.map((function(e){return(0,p.jsx)("p",{className:"text-base leading-8 ".concat(e.style," ").concat("italic"===e.style&&"border-l-2 border-gray-400 pl-4"),children:e.contentText},Math.random())})))}),(0,p.jsxs)("div",{className:"mt-5",children:[(0,p.jsx)("h4",{className:"text-2xl font-semibold mb-5",children:"Comments"}),null!==N&&(0,p.jsx)(l.J9,{initialValues:{comment:""},validationSchema:h,onSubmit:function(e,t){var n=t.resetForm;B(e,n)},children:function(e){var t=e.errors;return(0,p.jsxs)(l.l0,{className:"mb-5",autoComplete:"off",children:[(0,p.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,p.jsx)(l.gN,{className:"border-b-2 border-gray-400 focus:outline-none px-2 pb-2 w-full",type:"text",name:"comment",id:"",placeholder:"Comment"}),(0,p.jsx)("button",{className:"bg-black text-white rounded-3xl text-lg font-semibold px-6 py-2 bg-opacity-90 hover:bg-opacity-100",type:"submit",children:"Post"})]}),(0,p.jsx)("p",{className:"text-sm text-red-600 font-semibold",children:t.comment})]})}}),0===A.length&&(0,p.jsx)("p",{className:"font-semibold text-2xl",children:"No comments yet..."}),A&&A.map((function(e){var t;return(0,p.jsxs)("div",{className:"flex justify-between items-start space-x-3 mt-5",children:[(0,p.jsxs)("div",{className:"flex items-start space-x-3",children:[""!==e.commentsArray.image&&(0,p.jsx)("figure",{className:"w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex justify-center items-center",children:(0,p.jsx)("img",{src:e.commentsArray.image,alt:""})}),""===e.commentsArray.image&&(0,p.jsx)("p",{className:"w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex justify-center items-center",children:"A"}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h6",{className:"font-semibold",children:e.commentsArray.name}),(0,p.jsx)("p",{children:e.commentsArray.comment})]})]}),null!==N&&N.displayName===(null===(t=_[0])||void 0===t?void 0:t.data.author)&&(0,p.jsx)("button",{onClick:function(){M(e.id)},children:(0,p.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-4 sm:w-5 text-red-600",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})})})]},Math.random())}))]}),(0,p.jsx)(f.Ix,{})]}):(0,p.jsx)("div",{className:"w-full max-w-[50rem] mx-auto px-6 py-10 mt-20",children:(0,p.jsx)("p",{children:"Loading..."})})})}}}]);
//# sourceMappingURL=726.554d44f8.chunk.js.map