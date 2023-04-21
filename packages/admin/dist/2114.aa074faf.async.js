(self.webpackChunk_vanblog_admin=self.webpackChunk_vanblog_admin||[]).push([[2114],{28734:function(vt){(function(J,A){vt.exports=A()})(this,function(){"use strict";return function(J,A){var nt=A.prototype,D=nt.format;nt.format=function(j){var w=this,ot=this.$locale();if(!this.isValid())return D.bind(this)(j);var h=this.$utils(),z=(j||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(Y){switch(Y){case"Q":return Math.ceil((w.$M+1)/3);case"Do":return ot.ordinal(w.$D);case"gggg":return w.weekYear();case"GGGG":return w.isoWeekYear();case"wo":return ot.ordinal(w.week(),"W");case"w":case"ww":return h.s(w.week(),Y==="w"?1:2,"0");case"W":case"WW":return h.s(w.isoWeek(),Y==="W"?1:2,"0");case"k":case"kk":return h.s(String(w.$H===0?24:w.$H),Y==="k"?1:2,"0");case"X":return Math.floor(w.$d.getTime()/1e3);case"x":return w.$d.getTime();case"z":return"["+w.offsetName()+"]";case"zzz":return"["+w.offsetName("long")+"]";default:return Y}});return D.bind(this)(z)}}})},10285:function(vt){(function(J,A){vt.exports=A()})(this,function(){"use strict";var J={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},A=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,nt=/\d\d/,D=/\d\d?/,j=/\d*[^-_:/,()\s\d]+/,w={},ot=function(y){return(y=+y)+(y>68?1900:2e3)},h=function(y){return function(T){this[y]=+T}},z=[/[+-]\d\d:?(\d\d)?|Z/,function(y){(this.zone||(this.zone={})).offset=function(T){if(!T||T==="Z")return 0;var S=T.match(/([+-]|\d\d)/g),M=60*S[1]+(+S[2]||0);return M===0?0:S[0]==="+"?-M:M}(y)}],Y=function(y){var T=w[y];return T&&(T.indexOf?T:T.s.concat(T.f))},b=function(y,T){var S,M=w.meridiem;if(M){for(var G=1;G<=24;G+=1)if(y.indexOf(M(G,0,T))>-1){S=G>12;break}}else S=y===(T?"pm":"PM");return S},Tt={A:[j,function(y){this.afternoon=b(y,!1)}],a:[j,function(y){this.afternoon=b(y,!0)}],S:[/\d/,function(y){this.milliseconds=100*+y}],SS:[nt,function(y){this.milliseconds=10*+y}],SSS:[/\d{3}/,function(y){this.milliseconds=+y}],s:[D,h("seconds")],ss:[D,h("seconds")],m:[D,h("minutes")],mm:[D,h("minutes")],H:[D,h("hours")],h:[D,h("hours")],HH:[D,h("hours")],hh:[D,h("hours")],D:[D,h("day")],DD:[nt,h("day")],Do:[j,function(y){var T=w.ordinal,S=y.match(/\d+/);if(this.day=S[0],T)for(var M=1;M<=31;M+=1)T(M).replace(/\[|\]/g,"")===y&&(this.day=M)}],M:[D,h("month")],MM:[nt,h("month")],MMM:[j,function(y){var T=Y("months"),S=(Y("monthsShort")||T.map(function(M){return M.slice(0,3)})).indexOf(y)+1;if(S<1)throw new Error;this.month=S%12||S}],MMMM:[j,function(y){var T=Y("months").indexOf(y)+1;if(T<1)throw new Error;this.month=T%12||T}],Y:[/[+-]?\d+/,h("year")],YY:[nt,function(y){this.year=ot(y)}],YYYY:[/\d{4}/,h("year")],Z:z,ZZ:z};function gt(y){var T,S;T=y,S=w&&w.formats;for(var M=(y=T.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(V,q,X){var W=X&&X.toUpperCase();return q||S[X]||J[X]||S[W].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(R,$,at){return $||at.slice(1)})})).match(A),G=M.length,P=0;P<G;P+=1){var st=M[P],rt=Tt[st],Z=rt&&rt[0],B=rt&&rt[1];M[P]=B?{regex:Z,parser:B}:st.replace(/^\[|\]$/g,"")}return function(V){for(var q={},X=0,W=0;X<G;X+=1){var R=M[X];if(typeof R=="string")W+=R.length;else{var $=R.regex,at=R.parser,xt=V.slice(W),ht=$.exec(xt)[0];at.call(q,ht),V=V.replace(ht,"")}}return function(lt){var K=lt.afternoon;if(K!==void 0){var mt=lt.hours;K?mt<12&&(lt.hours+=12):mt===12&&(lt.hours=0),delete lt.afternoon}}(q),q}}return function(y,T,S){S.p.customParseFormat=!0,y&&y.parseTwoDigitYear&&(ot=y.parseTwoDigitYear);var M=T.prototype,G=M.parse;M.parse=function(P){var st=P.date,rt=P.utc,Z=P.args;this.$u=rt;var B=Z[1];if(typeof B=="string"){var V=Z[2]===!0,q=Z[3]===!0,X=V||q,W=Z[2];q&&(W=Z[2]),w=this.$locale(),!V&&W&&(w=S.Ls[W]),this.$d=function(xt,ht,lt){try{if(["x","X"].indexOf(ht)>-1)return new Date((ht==="X"?1e3:1)*xt);var K=gt(ht)(xt),mt=K.year,bt=K.month,Kt=K.day,Ht=K.hours,Qt=K.minutes,Jt=K.seconds,qt=K.milliseconds,zt=K.zone,Ct=new Date,St=Kt||(mt||bt?1:Ct.getDate()),Mt=mt||Ct.getFullYear(),_t=0;mt&&!bt||(_t=bt>0?bt-1:Ct.getMonth());var At=Ht||0,Lt=Qt||0,It=Jt||0,Yt=qt||0;return zt?new Date(Date.UTC(Mt,_t,St,At,Lt,It,Yt+60*zt.offset*1e3)):lt?new Date(Date.UTC(Mt,_t,St,At,Lt,It,Yt)):new Date(Mt,_t,St,At,Lt,It,Yt)}catch(re){return new Date("")}}(st,B,rt),this.init(),W&&W!==!0&&(this.$L=this.locale(W).$L),X&&st!=this.format(B)&&(this.$d=new Date("")),w={}}else if(B instanceof Array)for(var R=B.length,$=1;$<=R;$+=1){Z[1]=B[$-1];var at=S.apply(this,Z);if(at.isValid()){this.$d=at.$d,this.$L=at.$L,this.init();break}$===R&&(this.$d=new Date(""))}else G.call(this,P)}}})},59542:function(vt){(function(J,A){vt.exports=A()})(this,function(){"use strict";var J="day";return function(A,nt,D){var j=function(h){return h.add(4-h.isoWeekday(),J)},w=nt.prototype;w.isoWeekYear=function(){return j(this).year()},w.isoWeek=function(h){if(!this.$utils().u(h))return this.add(7*(h-this.isoWeek()),J);var z,Y,b,Tt,gt=j(this),y=(z=this.isoWeekYear(),Y=this.$u,b=(Y?D.utc:D)().year(z).startOf("year"),Tt=4-b.isoWeekday(),b.isoWeekday()>4&&(Tt+=7),b.add(Tt,J));return gt.diff(y,"week")+1},w.isoWeekday=function(h){return this.$utils().u(h)?this.day()||7:this.day(this.day()%7?h:h-7)};var ot=w.startOf;w.startOf=function(h,z){var Y=this.$utils(),b=!!Y.u(z)||z;return Y.p(h)==="isoweek"?b?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):ot.bind(this)(h,z)}}})},72114:function(vt,J,A){"use strict";A.r(J),A.d(J,{diagram:function(){return Le}});var nt=A(61939),D=A(27484),j=A(59542),w=A(10285),ot=A(28734),h=A(92561),z=A(33125),Y=A(83034),b=A(82106),Tt=A(27856),gt=function(){var t=function(k,c,o,f){for(o=o||{},f=k.length;f--;o[k[f]]=c);return o},u=[1,3],n=[1,5],i=[7,9,11,12,13,14,15,16,17,18,19,20,21,23,25,26,28,35,40],s=[1,15],m=[1,16],d=[1,17],H=[1,18],N=[1,19],Ot=[1,20],ct=[1,21],tt=[1,22],yt=[1,23],kt=[1,24],et=[1,25],C=[1,26],Rt=[1,27],Nt=[1,29],Ut=[1,31],jt=[1,34],Gt=[5,7,9,11,12,13,14,15,16,17,18,19,20,21,23,25,26,28,35,40],Ft={trace:function(){},yy:{},symbols_:{error:2,start:3,directive:4,gantt:5,document:6,EOF:7,line:8,SPACE:9,statement:10,NL:11,dateFormat:12,inclusiveEndDates:13,topAxis:14,axisFormat:15,tickInterval:16,excludes:17,includes:18,todayMarker:19,title:20,acc_title:21,acc_title_value:22,acc_descr:23,acc_descr_value:24,acc_descr_multiline_value:25,section:26,clickStatement:27,taskTxt:28,taskData:29,openDirective:30,typeDirective:31,closeDirective:32,":":33,argDirective:34,click:35,callbackname:36,callbackargs:37,href:38,clickStatementDebug:39,open_directive:40,type_directive:41,arg_directive:42,close_directive:43,$accept:0,$end:1},terminals_:{2:"error",5:"gantt",7:"EOF",9:"SPACE",11:"NL",12:"dateFormat",13:"inclusiveEndDates",14:"topAxis",15:"axisFormat",16:"tickInterval",17:"excludes",18:"includes",19:"todayMarker",20:"title",21:"acc_title",22:"acc_title_value",23:"acc_descr",24:"acc_descr_value",25:"acc_descr_multiline_value",26:"section",28:"taskTxt",29:"taskData",33:":",35:"click",36:"callbackname",37:"callbackargs",38:"href",40:"open_directive",41:"type_directive",42:"arg_directive",43:"close_directive"},productions_:[0,[3,2],[3,3],[6,0],[6,2],[8,2],[8,1],[8,1],[8,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,2],[10,2],[10,1],[10,1],[10,1],[10,2],[10,1],[4,4],[4,6],[27,2],[27,3],[27,3],[27,4],[27,3],[27,4],[27,2],[39,2],[39,3],[39,3],[39,4],[39,3],[39,4],[39,2],[30,1],[31,1],[34,1],[32,1]],performAction:function(c,o,f,r,g,e,E){var a=e.length-1;switch(g){case 2:return e[a-1];case 3:this.$=[];break;case 4:e[a-1].push(e[a]),this.$=e[a-1];break;case 5:case 6:this.$=e[a];break;case 7:case 8:this.$=[];break;case 9:r.setDateFormat(e[a].substr(11)),this.$=e[a].substr(11);break;case 10:r.enableInclusiveEndDates(),this.$=e[a].substr(18);break;case 11:r.TopAxis(),this.$=e[a].substr(8);break;case 12:r.setAxisFormat(e[a].substr(11)),this.$=e[a].substr(11);break;case 13:r.setTickInterval(e[a].substr(13)),this.$=e[a].substr(13);break;case 14:r.setExcludes(e[a].substr(9)),this.$=e[a].substr(9);break;case 15:r.setIncludes(e[a].substr(9)),this.$=e[a].substr(9);break;case 16:r.setTodayMarker(e[a].substr(12)),this.$=e[a].substr(12);break;case 17:r.setDiagramTitle(e[a].substr(6)),this.$=e[a].substr(6);break;case 18:this.$=e[a].trim(),r.setAccTitle(this.$);break;case 19:case 20:this.$=e[a].trim(),r.setAccDescription(this.$);break;case 21:r.addSection(e[a].substr(8)),this.$=e[a].substr(8);break;case 23:r.addTask(e[a-1],e[a]),this.$="task";break;case 27:this.$=e[a-1],r.setClickEvent(e[a-1],e[a],null);break;case 28:this.$=e[a-2],r.setClickEvent(e[a-2],e[a-1],e[a]);break;case 29:this.$=e[a-2],r.setClickEvent(e[a-2],e[a-1],null),r.setLink(e[a-2],e[a]);break;case 30:this.$=e[a-3],r.setClickEvent(e[a-3],e[a-2],e[a-1]),r.setLink(e[a-3],e[a]);break;case 31:this.$=e[a-2],r.setClickEvent(e[a-2],e[a],null),r.setLink(e[a-2],e[a-1]);break;case 32:this.$=e[a-3],r.setClickEvent(e[a-3],e[a-1],e[a]),r.setLink(e[a-3],e[a-2]);break;case 33:this.$=e[a-1],r.setLink(e[a-1],e[a]);break;case 34:case 40:this.$=e[a-1]+" "+e[a];break;case 35:case 36:case 38:this.$=e[a-2]+" "+e[a-1]+" "+e[a];break;case 37:case 39:this.$=e[a-3]+" "+e[a-2]+" "+e[a-1]+" "+e[a];break;case 41:r.parseDirective("%%{","open_directive");break;case 42:r.parseDirective(e[a],"type_directive");break;case 43:e[a]=e[a].trim().replace(/'/g,'"'),r.parseDirective(e[a],"arg_directive");break;case 44:r.parseDirective("}%%","close_directive","gantt");break}},table:[{3:1,4:2,5:u,30:4,40:n},{1:[3]},{3:6,4:2,5:u,30:4,40:n},t(i,[2,3],{6:7}),{31:8,41:[1,9]},{41:[2,41]},{1:[2,1]},{4:30,7:[1,10],8:11,9:[1,12],10:13,11:[1,14],12:s,13:m,14:d,15:H,16:N,17:Ot,18:ct,19:tt,20:yt,21:kt,23:et,25:C,26:Rt,27:28,28:Nt,30:4,35:Ut,40:n},{32:32,33:[1,33],43:jt},t([33,43],[2,42]),t(i,[2,8],{1:[2,2]}),t(i,[2,4]),{4:30,10:35,12:s,13:m,14:d,15:H,16:N,17:Ot,18:ct,19:tt,20:yt,21:kt,23:et,25:C,26:Rt,27:28,28:Nt,30:4,35:Ut,40:n},t(i,[2,6]),t(i,[2,7]),t(i,[2,9]),t(i,[2,10]),t(i,[2,11]),t(i,[2,12]),t(i,[2,13]),t(i,[2,14]),t(i,[2,15]),t(i,[2,16]),t(i,[2,17]),{22:[1,36]},{24:[1,37]},t(i,[2,20]),t(i,[2,21]),t(i,[2,22]),{29:[1,38]},t(i,[2,24]),{36:[1,39],38:[1,40]},{11:[1,41]},{34:42,42:[1,43]},{11:[2,44]},t(i,[2,5]),t(i,[2,18]),t(i,[2,19]),t(i,[2,23]),t(i,[2,27],{37:[1,44],38:[1,45]}),t(i,[2,33],{36:[1,46]}),t(Gt,[2,25]),{32:47,43:jt},{43:[2,43]},t(i,[2,28],{38:[1,48]}),t(i,[2,29]),t(i,[2,31],{37:[1,49]}),{11:[1,50]},t(i,[2,30]),t(i,[2,32]),t(Gt,[2,26])],defaultActions:{5:[2,41],6:[2,1],34:[2,44],43:[2,43]},parseError:function(c,o){if(o.recoverable)this.trace(c);else{var f=new Error(c);throw f.hash=o,f}},parse:function(c){var o=this,f=[0],r=[],g=[null],e=[],E=this.table,a="",U=0,Q=0,Wt=2,l=1,p=e.slice.call(arguments,1),v=Object.create(this.lexer),x={yy:{}};for(var _ in this.yy)Object.prototype.hasOwnProperty.call(this.yy,_)&&(x.yy[_]=this.yy[_]);v.setInput(c,x.yy),x.yy.lexer=v,x.yy.parser=this,typeof v.yylloc=="undefined"&&(v.yylloc={});var O=v.yylloc;e.push(O);var L=v.options&&v.options.ranges;typeof x.yy.parseError=="function"?this.parseError=x.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ie(){var dt;return dt=r.pop()||v.lex()||l,typeof dt!="number"&&(dt instanceof Array&&(r=dt,dt=r.pop()),dt=o.symbols_[dt]||dt),dt}for(var F,pt,it,ne,Et={},Zt,ft,ke,Xt;;){if(pt=f[f.length-1],this.defaultActions[pt]?it=this.defaultActions[pt]:((F===null||typeof F=="undefined")&&(F=ie()),it=E[pt]&&E[pt][F]),typeof it=="undefined"||!it.length||!it[0]){var se="";Xt=[];for(Zt in E[pt])this.terminals_[Zt]&&Zt>Wt&&Xt.push("'"+this.terminals_[Zt]+"'");v.showPosition?se="Parse error on line "+(U+1)+`:
`+v.showPosition()+`
Expecting `+Xt.join(", ")+", got '"+(this.terminals_[F]||F)+"'":se="Parse error on line "+(U+1)+": Unexpected "+(F==l?"end of input":"'"+(this.terminals_[F]||F)+"'"),this.parseError(se,{text:v.match,token:this.terminals_[F]||F,line:v.yylineno,loc:O,expected:Xt})}if(it[0]instanceof Array&&it.length>1)throw new Error("Parse Error: multiple actions possible at state: "+pt+", token: "+F);switch(it[0]){case 1:f.push(F),g.push(v.yytext),e.push(v.yylloc),f.push(it[1]),F=null,Q=v.yyleng,a=v.yytext,U=v.yylineno,O=v.yylloc;break;case 2:if(ft=this.productions_[it[1]][1],Et.$=g[g.length-ft],Et._$={first_line:e[e.length-(ft||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(ft||1)].first_column,last_column:e[e.length-1].last_column},L&&(Et._$.range=[e[e.length-(ft||1)].range[0],e[e.length-1].range[1]]),ne=this.performAction.apply(Et,[a,Q,U,x.yy,it[1],g,e].concat(p)),typeof ne!="undefined")return ne;ft&&(f=f.slice(0,-1*ft*2),g=g.slice(0,-1*ft),e=e.slice(0,-1*ft)),f.push(this.productions_[it[1]][0]),g.push(Et.$),e.push(Et._$),ke=E[f[f.length-2]][f[f.length-1]],f.push(ke);break;case 3:return!0}}return!0}},ee=function(){var k={EOF:1,parseError:function(o,f){if(this.yy.parser)this.yy.parser.parseError(o,f);else throw new Error(o)},setInput:function(c,o){return this.yy=o||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var o=c.match(/(?:\r\n?|\n).*/g);return o?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var o=c.length,f=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-o),this.offset-=o;var r=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),f.length-1&&(this.yylineno-=f.length-1);var g=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:f?(f.length===r.length?this.yylloc.first_column:0)+r[r.length-f.length].length-f[0].length:this.yylloc.first_column-o},this.options.ranges&&(this.yylloc.range=[g[0],g[0]+this.yyleng-o]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),o=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+o+"^"},test_match:function(c,o){var f,r,g;if(this.options.backtrack_lexer&&(g={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(g.yylloc.range=this.yylloc.range.slice(0))),r=c[0].match(/(?:\r\n?|\n).*/g),r&&(this.yylineno+=r.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:r?r[r.length-1].length-r[r.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],f=this.performAction.call(this,this.yy,this,o,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),f)return f;if(this._backtrack){for(var e in g)this[e]=g[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,o,f,r;this._more||(this.yytext="",this.match="");for(var g=this._currentRules(),e=0;e<g.length;e++)if(f=this._input.match(this.rules[g[e]]),f&&(!o||f[0].length>o[0].length)){if(o=f,r=e,this.options.backtrack_lexer){if(c=this.test_match(f,g[e]),c!==!1)return c;if(this._backtrack){o=!1;continue}else return!1}else if(!this.options.flex)break}return o?(c=this.test_match(o,g[r]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var o=this.next();return o||this.lex()},begin:function(o){this.conditionStack.push(o)},popState:function(){var o=this.conditionStack.length-1;return o>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(o){return o=this.conditionStack.length-1-Math.abs(o||0),o>=0?this.conditionStack[o]:"INITIAL"},pushState:function(o){this.begin(o)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(o,f,r,g){switch(r){case 0:return this.begin("open_directive"),40;case 1:return this.begin("type_directive"),41;case 2:return this.popState(),this.begin("arg_directive"),33;case 3:return this.popState(),this.popState(),43;case 4:return 42;case 5:return this.begin("acc_title"),21;case 6:return this.popState(),"acc_title_value";case 7:return this.begin("acc_descr"),23;case 8:return this.popState(),"acc_descr_value";case 9:this.begin("acc_descr_multiline");break;case 10:this.popState();break;case 11:return"acc_descr_multiline_value";case 12:break;case 13:break;case 14:break;case 15:return 11;case 16:break;case 17:break;case 18:break;case 19:this.begin("href");break;case 20:this.popState();break;case 21:return 38;case 22:this.begin("callbackname");break;case 23:this.popState();break;case 24:this.popState(),this.begin("callbackargs");break;case 25:return 36;case 26:this.popState();break;case 27:return 37;case 28:this.begin("click");break;case 29:this.popState();break;case 30:return 35;case 31:return 5;case 32:return 12;case 33:return 13;case 34:return 14;case 35:return 15;case 36:return 16;case 37:return 18;case 38:return 17;case 39:return 19;case 40:return"date";case 41:return 20;case 42:return"accDescription";case 43:return 26;case 44:return 28;case 45:return 29;case 46:return 33;case 47:return 7;case 48:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[10,11],inclusive:!1},acc_descr:{rules:[8],inclusive:!1},acc_title:{rules:[6],inclusive:!1},close_directive:{rules:[],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},open_directive:{rules:[1],inclusive:!1},callbackargs:{rules:[26,27],inclusive:!1},callbackname:{rules:[23,24,25],inclusive:!1},href:{rules:[20,21],inclusive:!1},click:{rules:[29,30],inclusive:!1},INITIAL:{rules:[0,5,7,9,12,13,14,15,16,17,18,19,22,28,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],inclusive:!0}}};return k}();Ft.lexer=ee;function Pt(){this.yy={}}return Pt.prototype=Ft,Ft.Parser=Pt,new Pt}();gt.parser=gt;const y=gt;D.extend(j),D.extend(w),D.extend(ot);let T="",S="",M,G="",P=[],st=[],rt={},Z=[],B=[],V="",q="";const X=["active","done","crit","milestone"];let W=[],R=!1,$=!1,at=0;const xt=function(t,u,n){Y.m.parseDirective(this,t,u,n)},ht=function(){Z=[],B=[],V="",W=[],Bt=0,te=void 0,Vt=void 0,I=[],T="",S="",q="",M=void 0,G="",P=[],st=[],R=!1,$=!1,at=0,rt={},(0,h.y)()},lt=function(t){S=t},K=function(){return S},mt=function(t){M=t},bt=function(){return M},Kt=function(t){G=t},Ht=function(){return G},Qt=function(t){T=t},Jt=function(){R=!0},qt=function(){return R},zt=function(){$=!0},Ct=function(){return $},St=function(t){q=t},Mt=function(){return q},_t=function(){return T},At=function(t){P=t.toLowerCase().split(/[\s,]+/)},Lt=function(){return P},It=function(t){st=t.toLowerCase().split(/[\s,]+/)},Yt=function(){return st},re=function(){return rt},ge=function(t){V=t,Z.push(t)},ye=function(){return Z},pe=function(){let t=fe();const u=10;let n=0;for(;!t&&n<u;)t=fe(),n++;return B=I,B},ae=function(t,u,n,i){return i.includes(t.format(u.trim()))?!1:t.isoWeekday()>=6&&n.includes("weekends")||n.includes(t.format("dddd").toLowerCase())?!0:n.includes(t.format(u.trim()))},ce=function(t,u,n,i){if(!n.length||t.manualEndTime)return;let s;t.startTime instanceof Date?s=D(t.startTime):s=D(t.startTime,u,!0),s=s.add(1,"d");let m;t.endTime instanceof Date?m=D(t.endTime):m=D(t.endTime,u,!0);const[d,H]=ve(s,m,u,n,i);t.endTime=d.toDate(),t.renderEndTime=H},ve=function(t,u,n,i,s){let m=!1,d=null;for(;t<=u;)m||(d=u.toDate()),m=ae(t,n,i,s),m&&(u=u.add(1,"d")),t=t.add(1,"d");return[u,d]},$t=function(t,u,n){n=n.trim();const s=/^after\s+([\d\w- ]+)/.exec(n.trim());if(s!==null){let d=null;if(s[1].split(" ").forEach(function(H){let N=wt(H);N!==void 0&&(d?N.endTime>d.endTime&&(d=N):d=N)}),d)return d.endTime;{const H=new Date;return H.setHours(0,0,0,0),H}}let m=D(n,u.trim(),!0);if(m.isValid())return m.toDate();{h.l.debug("Invalid date:"+n),h.l.debug("With date format:"+u.trim());const d=new Date(n);if(d===void 0||isNaN(d.getTime()))throw new Error("Invalid date:"+n);return d}},oe=function(t){const u=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return u!==null?[Number.parseFloat(u[1]),u[2]]:[NaN,"ms"]},le=function(t,u,n,i=!1){n=n.trim();let s=D(n,u.trim(),!0);if(s.isValid())return i&&(s=s.add(1,"d")),s.toDate();let m=D(t);const[d,H]=oe(n);if(!Number.isNaN(d)){const N=m.add(d,H);N.isValid()&&(m=N)}return m.toDate()};let Bt=0;const Dt=function(t){return t===void 0?(Bt=Bt+1,"task"+Bt):t},Te=function(t,u){let n;u.substr(0,1)===":"?n=u.substr(1,u.length):n=u;const i=n.split(","),s={};me(i,s,X);for(let d=0;d<i.length;d++)i[d]=i[d].trim();let m="";switch(i.length){case 1:s.id=Dt(),s.startTime=t.endTime,m=i[0];break;case 2:s.id=Dt(),s.startTime=$t(void 0,T,i[0]),m=i[1];break;case 3:s.id=Dt(i[0]),s.startTime=$t(void 0,T,i[1]),m=i[2];break}return m&&(s.endTime=le(s.startTime,T,m,R),s.manualEndTime=D(m,"YYYY-MM-DD",!0).isValid(),ce(s,T,st,P)),s},xe=function(t,u){let n;u.substr(0,1)===":"?n=u.substr(1,u.length):n=u;const i=n.split(","),s={};me(i,s,X);for(let m=0;m<i.length;m++)i[m]=i[m].trim();switch(i.length){case 1:s.id=Dt(),s.startTime={type:"prevTaskEnd",id:t},s.endTime={data:i[0]};break;case 2:s.id=Dt(),s.startTime={type:"getStartDate",startData:i[0]},s.endTime={data:i[1]};break;case 3:s.id=Dt(i[0]),s.startTime={type:"getStartDate",startData:i[1]},s.endTime={data:i[2]};break}return s};let te,Vt,I=[];const ue={},be=function(t,u){const n={section:V,type:V,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:u},task:t,classes:[]},i=xe(Vt,u);n.raw.startTime=i.startTime,n.raw.endTime=i.endTime,n.id=i.id,n.prevTaskId=Vt,n.active=i.active,n.done=i.done,n.crit=i.crit,n.milestone=i.milestone,n.order=at,at++;const s=I.push(n);Vt=n.id,ue[n.id]=s-1},wt=function(t){const u=ue[t];return I[u]},_e=function(t,u){const n={section:V,type:V,description:t,task:t,classes:[]},i=Te(te,u);n.startTime=i.startTime,n.endTime=i.endTime,n.id=i.id,n.active=i.active,n.done=i.done,n.crit=i.crit,n.milestone=i.milestone,te=n,B.push(n)},fe=function(){const t=function(n){const i=I[n];let s="";switch(I[n].raw.startTime.type){case"prevTaskEnd":{const m=wt(i.prevTaskId);i.startTime=m.endTime;break}case"getStartDate":s=$t(void 0,T,I[n].raw.startTime.startData),s&&(I[n].startTime=s);break}return I[n].startTime&&(I[n].endTime=le(I[n].startTime,T,I[n].raw.endTime.data,R),I[n].endTime&&(I[n].processed=!0,I[n].manualEndTime=D(I[n].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),ce(I[n],T,st,P))),I[n].processed};let u=!0;for(const[n,i]of I.entries())t(n),u=u&&i.processed;return u},De=function(t,u){let n=u;(0,h.g)().securityLevel!=="loose"&&(n=(0,nt.N)(u)),t.split(",").forEach(function(i){wt(i)!==void 0&&(he(i,()=>{window.open(n,"_self")}),rt[i]=n)}),de(t,"clickable")},de=function(t,u){t.split(",").forEach(function(n){let i=wt(n);i!==void 0&&i.classes.push(u)})},we=function(t,u,n){if((0,h.g)().securityLevel!=="loose"||u===void 0)return;let i=[];if(typeof n=="string"){i=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let m=0;m<i.length;m++){let d=i[m].trim();d.charAt(0)==='"'&&d.charAt(d.length-1)==='"'&&(d=d.substr(1,d.length-2)),i[m]=d}}i.length===0&&i.push(t),wt(t)!==void 0&&he(t,()=>{z.u.runFunc(u,...i)})},he=function(t,u){W.push(function(){const n=document.querySelector(`[id="${t}"]`);n!==null&&n.addEventListener("click",function(){u()})},function(){const n=document.querySelector(`[id="${t}-text"]`);n!==null&&n.addEventListener("click",function(){u()})})},Ee=function(t,u,n){t.split(",").forEach(function(i){we(i,u,n)}),de(t,"clickable")},Ce=function(t){W.forEach(function(u){u(t)})},Se={parseDirective:xt,getConfig:()=>(0,h.g)().gantt,clear:ht,setDateFormat:Qt,getDateFormat:_t,enableInclusiveEndDates:Jt,endDatesAreInclusive:qt,enableTopAxis:zt,topAxisEnabled:Ct,setAxisFormat:lt,getAxisFormat:K,setTickInterval:mt,getTickInterval:bt,setTodayMarker:Kt,getTodayMarker:Ht,setAccTitle:h.o,getAccTitle:h.p,setDiagramTitle:h.w,getDiagramTitle:h.x,setDisplayMode:St,getDisplayMode:Mt,setAccDescription:h.v,getAccDescription:h.q,addSection:ge,getSections:ye,getTasks:pe,addTask:be,findTaskById:wt,addTaskOrg:_e,setIncludes:At,getIncludes:Lt,setExcludes:It,getExcludes:Yt,setClickEvent:Ee,setLink:De,getLinks:re,bindFunctions:Ce,parseDuration:oe,isInvalidDate:ae};function me(t,u,n){let i=!0;for(;i;)i=!1,n.forEach(function(s){const m="^\\s*"+s+"\\s*$",d=new RegExp(m);t[0].match(d)&&(u[s]=!0,t.shift(1),i=!0)})}const Me=function(){h.l.debug("Something is calling, setConf, remove the call")},Ae=(t,u)=>{let n=[...t].map(()=>-Infinity),i=[...t].sort((m,d)=>m.startTime-d.startTime||m.order-d.order),s=0;for(const m of i)for(let d=0;d<n.length;d++)if(m.startTime>=n[d]){n[d]=m.endTime,m.order=d+u,d>s&&(s=d);break}return s};let ut;const Le={parser:y,db:Se,renderer:{setConf:Me,draw:function(t,u,n,i){const s=(0,h.g)().gantt,m=(0,h.g)().securityLevel;let d;m==="sandbox"&&(d=(0,b.Ys)("#i"+u));const H=m==="sandbox"?(0,b.Ys)(d.nodes()[0].contentDocument.body):(0,b.Ys)("body"),N=m==="sandbox"?d.nodes()[0].contentDocument:document,Ot=N.getElementById(u);ut=Ot.parentElement.offsetWidth,ut===void 0&&(ut=1200),s.useWidth!==void 0&&(ut=s.useWidth);const ct=i.db.getTasks();let tt=[];for(const k of ct)tt.push(k.type);tt=Pt(tt);const yt={};let kt=2*s.topPadding;if(i.db.getDisplayMode()==="compact"||s.displayMode==="compact"){const k={};for(const o of ct)k[o.section]===void 0?k[o.section]=[o]:k[o.section].push(o);let c=0;for(const o of Object.keys(k)){const f=Ae(k[o],c)+1;c+=f,kt+=f*(s.barHeight+s.barGap),yt[o]=f}}else{kt+=ct.length*(s.barHeight+s.barGap);for(const k of tt)yt[k]=ct.filter(c=>c.type===k).length}Ot.setAttribute("viewBox","0 0 "+ut+" "+kt);const et=H.select(`[id="${u}"]`),C=(0,b.Xf)().domain([(0,b.VV$)(ct,function(k){return k.startTime}),(0,b.Fp7)(ct,function(k){return k.endTime})]).rangeRound([0,ut-s.leftPadding-s.rightPadding]);function Rt(k,c){const o=k.startTime,f=c.startTime;let r=0;return o>f?r=1:o<f&&(r=-1),r}ct.sort(Rt),Nt(ct,ut,kt),(0,z.k)(et,kt,ut,s.useMaxWidth),et.append("text").text(i.db.getDiagramTitle()).attr("x",ut/2).attr("y",s.titleTopMargin).attr("class","titleText");function Nt(k,c,o){const f=s.barHeight,r=f+s.barGap,g=s.topPadding,e=s.leftPadding,E=(0,b.BYU)().domain([0,tt.length]).range(["#00B9FA","#F95002"]).interpolate(b.JHv);jt(r,g,e,c,o,k,i.db.getExcludes(),i.db.getIncludes()),Gt(e,g,c,o),Ut(k,r,g,e,f,E,c),Ft(r,g),ee(e,g,c,o)}function Ut(k,c,o,f,r,g,e){const a=[...new Set(k.map(l=>l.order))].map(l=>k.find(p=>p.order===l));et.append("g").selectAll("rect").data(a).enter().append("rect").attr("x",0).attr("y",function(l,p){return p=l.order,p*c+o-2}).attr("width",function(){return e-s.rightPadding/2}).attr("height",c).attr("class",function(l){for(const[p,v]of tt.entries())if(l.type===v)return"section section"+p%s.numberSectionStyles;return"section section0"});const U=et.append("g").selectAll("rect").data(k).enter(),Q=i.db.getLinks();if(U.append("rect").attr("id",function(l){return l.id}).attr("rx",3).attr("ry",3).attr("x",function(l){return l.milestone?C(l.startTime)+f+.5*(C(l.endTime)-C(l.startTime))-.5*r:C(l.startTime)+f}).attr("y",function(l,p){return p=l.order,p*c+o}).attr("width",function(l){return l.milestone?r:C(l.renderEndTime||l.endTime)-C(l.startTime)}).attr("height",r).attr("transform-origin",function(l,p){return p=l.order,(C(l.startTime)+f+.5*(C(l.endTime)-C(l.startTime))).toString()+"px "+(p*c+o+.5*r).toString()+"px"}).attr("class",function(l){const p="task";let v="";l.classes.length>0&&(v=l.classes.join(" "));let x=0;for(const[O,L]of tt.entries())l.type===L&&(x=O%s.numberSectionStyles);let _="";return l.active?l.crit?_+=" activeCrit":_=" active":l.done?l.crit?_=" doneCrit":_=" done":l.crit&&(_+=" crit"),_.length===0&&(_=" task"),l.milestone&&(_=" milestone "+_),_+=x,_+=" "+v,p+_}),U.append("text").attr("id",function(l){return l.id+"-text"}).text(function(l){return l.task}).attr("font-size",s.fontSize).attr("x",function(l){let p=C(l.startTime),v=C(l.renderEndTime||l.endTime);l.milestone&&(p+=.5*(C(l.endTime)-C(l.startTime))-.5*r),l.milestone&&(v=p+r);const x=this.getBBox().width;return x>v-p?v+x+1.5*s.leftPadding>e?p+f-5:v+f+5:(v-p)/2+p+f}).attr("y",function(l,p){return p=l.order,p*c+s.barHeight/2+(s.fontSize/2-2)+o}).attr("text-height",r).attr("class",function(l){const p=C(l.startTime);let v=C(l.endTime);l.milestone&&(v=p+r);const x=this.getBBox().width;let _="";l.classes.length>0&&(_=l.classes.join(" "));let O=0;for(const[ie,F]of tt.entries())l.type===F&&(O=ie%s.numberSectionStyles);let L="";return l.active&&(l.crit?L="activeCritText"+O:L="activeText"+O),l.done?l.crit?L=L+" doneCritText"+O:L=L+" doneText"+O:l.crit&&(L=L+" critText"+O),l.milestone&&(L+=" milestoneText"),x>v-p?v+x+1.5*s.leftPadding>e?_+" taskTextOutsideLeft taskTextOutside"+O+" "+L:_+" taskTextOutsideRight taskTextOutside"+O+" "+L+" width-"+x:_+" taskText taskText"+O+" "+L+" width-"+x}),(0,h.g)().securityLevel==="sandbox"){let l;l=(0,b.Ys)("#i"+u);const p=l.nodes()[0].contentDocument;U.filter(function(v){return Q[v.id]!==void 0}).each(function(v){var x=p.querySelector("#"+v.id),_=p.querySelector("#"+v.id+"-text");const O=x.parentNode;var L=p.createElement("a");L.setAttribute("xlink:href",Q[v.id]),L.setAttribute("target","_top"),O.appendChild(L),L.appendChild(x),L.appendChild(_)})}}function jt(k,c,o,f,r,g,e,E){const a=g.reduce((x,{startTime:_})=>x?Math.min(x,_):_,0),U=g.reduce((x,{endTime:_})=>x?Math.max(x,_):_,0),Q=i.db.getDateFormat();if(!a||!U)return;const Wt=[];let l=null,p=D(a);for(;p.valueOf()<=U;)i.db.isInvalidDate(p,Q,e,E)?l?l.end=p:l={start:p,end:p}:l&&(Wt.push(l),l=null),p=p.add(1,"d");et.append("g").selectAll("rect").data(Wt).enter().append("rect").attr("id",function(x){return"exclude-"+x.start.format("YYYY-MM-DD")}).attr("x",function(x){return C(x.start)+o}).attr("y",s.gridLineStartPadding).attr("width",function(x){const _=x.end.add(1,"day");return C(_)-C(x.start)}).attr("height",r-c-s.gridLineStartPadding).attr("transform-origin",function(x,_){return(C(x.start)+o+.5*(C(x.end)-C(x.start))).toString()+"px "+(_*k+.5*r).toString()+"px"}).attr("class","exclude-range")}function Gt(k,c,o,f){let r=(0,b.LLu)(C).tickSize(-f+c+s.gridLineStartPadding).tickFormat((0,b.i$Z)(i.db.getAxisFormat()||s.axisFormat||"%Y-%m-%d"));const e=/^([1-9]\d*)(minute|hour|day|week|month)$/.exec(i.db.getTickInterval()||s.tickInterval);if(e!==null){const E=e[1];switch(e[2]){case"minute":r.ticks(b.Z_i.every(E));break;case"hour":r.ticks(b.WQD.every(E));break;case"day":r.ticks(b.rr1.every(E));break;case"week":r.ticks(b.NGh.every(E));break;case"month":r.ticks(b.F0B.every(E));break}}if(et.append("g").attr("class","grid").attr("transform","translate("+k+", "+(f-50)+")").call(r).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),i.db.topAxisEnabled()||s.topAxis){let E=(0,b.F5q)(C).tickSize(-f+c+s.gridLineStartPadding).tickFormat((0,b.i$Z)(i.db.getAxisFormat()||s.axisFormat||"%Y-%m-%d"));if(e!==null){const a=e[1];switch(e[2]){case"minute":E.ticks(b.Z_i.every(a));break;case"hour":E.ticks(b.WQD.every(a));break;case"day":E.ticks(b.rr1.every(a));break;case"week":E.ticks(b.NGh.every(a));break;case"month":E.ticks(b.F0B.every(a));break}}et.append("g").attr("class","grid").attr("transform","translate("+k+", "+c+")").call(E).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function Ft(k,c){let o=0;const f=Object.keys(yt).map(r=>[r,yt[r]]);et.append("g").selectAll("text").data(f).enter().append(function(r){const g=r[0].split(h.e.lineBreakRegex),e=-(g.length-1)/2,E=N.createElementNS("http://www.w3.org/2000/svg","text");E.setAttribute("dy",e+"em");for(const[a,U]of g.entries()){const Q=N.createElementNS("http://www.w3.org/2000/svg","tspan");Q.setAttribute("alignment-baseline","central"),Q.setAttribute("x","10"),a>0&&Q.setAttribute("dy","1em"),Q.textContent=U,E.appendChild(Q)}return E}).attr("x",10).attr("y",function(r,g){if(g>0)for(let e=0;e<g;e++)return o+=f[g-1][1],r[1]*k/2+o*k+c;else return r[1]*k/2+c}).attr("font-size",s.sectionFontSize).attr("class",function(r){for(const[g,e]of tt.entries())if(r[0]===e)return"sectionTitle sectionTitle"+g%s.numberSectionStyles;return"sectionTitle"})}function ee(k,c,o,f){const r=i.db.getTodayMarker();if(r==="off")return;const g=et.append("g").attr("class","today"),e=new Date,E=g.append("line");E.attr("x1",C(e)+k).attr("x2",C(e)+k).attr("y1",s.titleTopMargin).attr("y2",f-s.titleTopMargin).attr("class","today"),r!==""&&E.attr("style",r.replace(/,/g,";"))}function Pt(k){const c={},o=[];for(let f=0,r=k.length;f<r;++f)Object.prototype.hasOwnProperty.call(c,k[f])||(c[k[f]]=!0,o.push(k[f]));return o}}},styles:t=>`
  .mermaid-main-font {
    font-family: "trebuchet ms", verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    // text-height: 14px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
    text {
      font-family: ${t.fontFamily};
      fill: ${t.textColor};
    }
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }

  // .taskText:not([font-size]) {
  //   font-size: ${t.ganttFontSize};
  // }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
    // font-size: ${t.ganttFontSize};
  }

  /* Special case clickable */
  .task.clickable {
    cursor: pointer;
  }
  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor}    ;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
`}}}]);
