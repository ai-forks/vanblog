(self.webpackChunk_vanblog_admin=self.webpackChunk_vanblog_admin||[]).push([[2650],{22650:function(Wt,et,S){"use strict";S.r(et),S.d(et,{diagram:function(){return Ot}});var dt=S(83034),w=S(92561),F=S(82106),ft=S(33125),Yt=S(27856),zt=S(27484),Ut=S(61939),X=function(){var e=function(_,r,a,h){for(a=a||{},h=_.length;h--;a[_[h]]=r);return a},t=[1,2],i=[1,5],n=[6,9,11,17,18,20,22,23,24,26],s=[1,15],o=[1,16],l=[1,17],y=[1,18],u=[1,19],x=[1,20],g=[1,24],p=[4,6,9,11,17,18,20,22,23,24,26],d={trace:function(){},yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,directive:7,line:8,SPACE:9,statement:10,NEWLINE:11,openDirective:12,typeDirective:13,closeDirective:14,":":15,argDirective:16,title:17,acc_title:18,acc_title_value:19,acc_descr:20,acc_descr_value:21,acc_descr_multiline_value:22,section:23,taskName:24,taskData:25,open_directive:26,type_directive:27,arg_directive:28,close_directive:29,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",9:"SPACE",11:"NEWLINE",15:":",17:"title",18:"acc_title",19:"acc_title_value",20:"acc_descr",21:"acc_descr_value",22:"acc_descr_multiline_value",23:"section",24:"taskName",25:"taskData",26:"open_directive",27:"type_directive",28:"arg_directive",29:"close_directive"},productions_:[0,[3,3],[3,2],[5,0],[5,2],[8,2],[8,1],[8,1],[8,1],[7,4],[7,6],[10,1],[10,2],[10,2],[10,1],[10,1],[10,2],[10,1],[12,1],[13,1],[16,1],[14,1]],performAction:function(r,a,h,f,m,c,W){var k=c.length-1;switch(m){case 1:return c[k-1];case 3:this.$=[];break;case 4:c[k-1].push(c[k]),this.$=c[k-1];break;case 5:case 6:this.$=c[k];break;case 7:case 8:this.$=[];break;case 11:f.setDiagramTitle(c[k].substr(6)),this.$=c[k].substr(6);break;case 12:this.$=c[k].trim(),f.setAccTitle(this.$);break;case 13:case 14:this.$=c[k].trim(),f.setAccDescription(this.$);break;case 15:f.addSection(c[k].substr(8)),this.$=c[k].substr(8);break;case 16:f.addTask(c[k-1],c[k]),this.$="task";break;case 18:f.parseDirective("%%{","open_directive");break;case 19:f.parseDirective(c[k],"type_directive");break;case 20:c[k]=c[k].trim().replace(/'/g,'"'),f.parseDirective(c[k],"arg_directive");break;case 21:f.parseDirective("}%%","close_directive","journey");break}},table:[{3:1,4:t,7:3,12:4,26:i},{1:[3]},e(n,[2,3],{5:6}),{3:7,4:t,7:3,12:4,26:i},{13:8,27:[1,9]},{27:[2,18]},{6:[1,10],7:21,8:11,9:[1,12],10:13,11:[1,14],12:4,17:s,18:o,20:l,22:y,23:u,24:x,26:i},{1:[2,2]},{14:22,15:[1,23],29:g},e([15,29],[2,19]),e(n,[2,8],{1:[2,1]}),e(n,[2,4]),{7:21,10:25,12:4,17:s,18:o,20:l,22:y,23:u,24:x,26:i},e(n,[2,6]),e(n,[2,7]),e(n,[2,11]),{19:[1,26]},{21:[1,27]},e(n,[2,14]),e(n,[2,15]),{25:[1,28]},e(n,[2,17]),{11:[1,29]},{16:30,28:[1,31]},{11:[2,21]},e(n,[2,5]),e(n,[2,12]),e(n,[2,13]),e(n,[2,16]),e(p,[2,9]),{14:32,29:g},{29:[2,20]},{11:[1,33]},e(p,[2,10])],defaultActions:{5:[2,18],7:[2,2],24:[2,21],31:[2,20]},parseError:function(r,a){if(a.recoverable)this.trace(r);else{var h=new Error(r);throw h.hash=a,h}},parse:function(r){var a=this,h=[0],f=[],m=[null],c=[],W=this.table,k="",U=0,ht=0,Ft=2,ut=1,Bt=c.slice.call(arguments,1),b=Object.create(this.lexer),V={yy:{}};for(var J in this.yy)Object.prototype.hasOwnProperty.call(this.yy,J)&&(V.yy[J]=this.yy[J]);b.setInput(r,V.yy),V.yy.lexer=b,V.yy.parser=this,typeof b.yylloc=="undefined"&&(b.yylloc={});var Q=b.yylloc;c.push(Q);var Nt=b.options&&b.options.ranges;typeof V.yy.parseError=="function"?this.parseError=V.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function jt(){var A;return A=f.pop()||b.lex()||ut,typeof A!="number"&&(A instanceof Array&&(f=A,A=f.pop()),A=a.symbols_[A]||A),A}for(var E,L,P,q,O={},K,I,yt,G;;){if(L=h[h.length-1],this.defaultActions[L]?P=this.defaultActions[L]:((E===null||typeof E=="undefined")&&(E=jt()),P=W[L]&&W[L][E]),typeof P=="undefined"||!P.length||!P[0]){var tt="";G=[];for(K in W[L])this.terminals_[K]&&K>Ft&&G.push("'"+this.terminals_[K]+"'");b.showPosition?tt="Parse error on line "+(U+1)+`:
`+b.showPosition()+`
Expecting `+G.join(", ")+", got '"+(this.terminals_[E]||E)+"'":tt="Parse error on line "+(U+1)+": Unexpected "+(E==ut?"end of input":"'"+(this.terminals_[E]||E)+"'"),this.parseError(tt,{text:b.match,token:this.terminals_[E]||E,line:b.yylineno,loc:Q,expected:G})}if(P[0]instanceof Array&&P.length>1)throw new Error("Parse Error: multiple actions possible at state: "+L+", token: "+E);switch(P[0]){case 1:h.push(E),m.push(b.yytext),c.push(b.yylloc),h.push(P[1]),E=null,ht=b.yyleng,k=b.yytext,U=b.yylineno,Q=b.yylloc;break;case 2:if(I=this.productions_[P[1]][1],O.$=m[m.length-I],O._$={first_line:c[c.length-(I||1)].first_line,last_line:c[c.length-1].last_line,first_column:c[c.length-(I||1)].first_column,last_column:c[c.length-1].last_column},Nt&&(O._$.range=[c[c.length-(I||1)].range[0],c[c.length-1].range[1]]),q=this.performAction.apply(O,[k,ht,U,V.yy,P[1],m,c].concat(Bt)),typeof q!="undefined")return q;I&&(h=h.slice(0,-1*I*2),m=m.slice(0,-1*I),c=c.slice(0,-1*I)),h.push(this.productions_[P[1]][0]),m.push(O.$),c.push(O._$),yt=W[h[h.length-2]][h[h.length-1]],h.push(yt);break;case 3:return!0}}return!0}},M=function(){var _={EOF:1,parseError:function(a,h){if(this.yy.parser)this.yy.parser.parseError(a,h);else throw new Error(a)},setInput:function(r,a){return this.yy=a||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var a=r.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var a=r.length,h=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var f=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===f.length?this.yylloc.first_column:0)+f[f.length-h.length].length-h[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),a=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+a+"^"},test_match:function(r,a){var h,f,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),f=r[0].match(/(?:\r\n?|\n).*/g),f&&(this.yylineno+=f.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:f?f[f.length-1].length-f[f.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],h=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var c in m)this[c]=m[c];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,a,h,f;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),c=0;c<m.length;c++)if(h=this._input.match(this.rules[m[c]]),h&&(!a||h[0].length>a[0].length)){if(a=h,f=c,this.options.backtrack_lexer){if(r=this.test_match(h,m[c]),r!==!1)return r;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(r=this.test_match(a,m[f]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var a=this.next();return a||this.lex()},begin:function(a){this.conditionStack.push(a)},popState:function(){var a=this.conditionStack.length-1;return a>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(a){return a=this.conditionStack.length-1-Math.abs(a||0),a>=0?this.conditionStack[a]:"INITIAL"},pushState:function(a){this.begin(a)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(a,h,f,m){switch(f){case 0:return this.begin("open_directive"),26;case 1:return this.begin("type_directive"),27;case 2:return this.popState(),this.begin("arg_directive"),15;case 3:return this.popState(),this.popState(),29;case 4:return 28;case 5:break;case 6:break;case 7:return 11;case 8:break;case 9:break;case 10:return 4;case 11:return 17;case 12:return this.begin("acc_title"),18;case 13:return this.popState(),"acc_title_value";case 14:return this.begin("acc_descr"),20;case 15:return this.popState(),"acc_descr_value";case 16:this.begin("acc_descr_multiline");break;case 17:this.popState();break;case 18:return"acc_descr_multiline_value";case 19:return 23;case 20:return 24;case 21:return 25;case 22:return 15;case 23:return 6;case 24:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{open_directive:{rules:[1],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},acc_descr_multiline:{rules:[17,18],inclusive:!1},acc_descr:{rules:[15],inclusive:!1},acc_title:{rules:[13],inclusive:!1},INITIAL:{rules:[0,5,6,7,8,9,10,11,12,14,16,19,20,21,22,23,24],inclusive:!0}}};return _}();d.lexer=M;function v(){this.yy={}}return v.prototype=d,d.Parser=v,new v}();X.parser=X;const pt=X;let R="";const D=[],B=[],N=[],gt=function(e,t,i){dt.m.parseDirective(this,e,t,i)},mt=function(){D.length=0,B.length=0,R="",N.length=0,(0,w.y)()},xt=function(e){R=e,D.push(e)},_t=function(){return D},kt=function(){let e=it();const t=100;let i=0;for(;!e&&i<t;)e=it(),i++;return B.push(...N),B},vt=function(){const e=[];return B.forEach(i=>{i.people&&e.push(...i.people)}),[...new Set(e)].sort()},bt=function(e,t){const i=t.substr(1).split(":");let n=0,s=[];i.length===1?(n=Number(i[0]),s=[]):(n=Number(i[0]),s=i[1].split(","));const o=s.map(y=>y.trim()),l={section:R,type:R,people:o,task:e,score:n};N.push(l)},wt=function(e){const t={section:R,type:R,description:e,task:e,classes:[]};B.push(t)},it=function(){const e=function(i){return N[i].processed};let t=!0;for(const[i,n]of N.entries())e(i),t=t&&n.processed;return t},Et=function(){return vt()},st={parseDirective:gt,getConfig:()=>(0,w.g)().journey,clear:mt,setDiagramTitle:w.w,getDiagramTitle:w.x,setAccTitle:w.o,getAccTitle:w.p,setAccDescription:w.v,getAccDescription:w.q,addSection:xt,getSections:_t,getTasks:kt,addTask:bt,addTaskOrg:wt,getActors:Et},Mt=e=>`.label {
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    color: ${e.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${e.textColor}
  }

  .legend {
    fill: ${e.textColor};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${e.textColor}
  }

  .face {
    ${e.faceColor?`fill: ${e.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${e.fillType0?`fill: ${e.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${e.fillType0?`fill: ${e.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${e.fillType0?`fill: ${e.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${e.fillType0?`fill: ${e.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${e.fillType0?`fill: ${e.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${e.fillType0?`fill: ${e.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${e.fillType0?`fill: ${e.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${e.fillType0?`fill: ${e.fillType7}`:""};
  }

  .actor-0 {
    ${e.actor0?`fill: ${e.actor0}`:""};
  }
  .actor-1 {
    ${e.actor1?`fill: ${e.actor1}`:""};
  }
  .actor-2 {
    ${e.actor2?`fill: ${e.actor2}`:""};
  }
  .actor-3 {
    ${e.actor3?`fill: ${e.actor3}`:""};
  }
  .actor-4 {
    ${e.actor4?`fill: ${e.actor4}`:""};
  }
  .actor-5 {
    ${e.actor5?`fill: ${e.actor5}`:""};
  }
`,Y=function(e,t){const i=e.append("rect");return i.attr("x",t.x),i.attr("y",t.y),i.attr("fill",t.fill),i.attr("stroke",t.stroke),i.attr("width",t.width),i.attr("height",t.height),i.attr("rx",t.rx),i.attr("ry",t.ry),t.class!==void 0&&i.attr("class",t.class),i},Tt=function(e,t){const i=15,n=e.append("circle").attr("cx",t.cx).attr("cy",t.cy).attr("class","face").attr("r",i).attr("stroke-width",2).attr("overflow","visible"),s=e.append("g");s.append("circle").attr("cx",t.cx-i/3).attr("cy",t.cy-i/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),s.append("circle").attr("cx",t.cx+i/3).attr("cy",t.cy-i/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function o(u){const x=(0,F.Nb1)().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(i/2).outerRadius(i/2.2);u.append("path").attr("class","mouth").attr("d",x).attr("transform","translate("+t.cx+","+(t.cy+2)+")")}function l(u){const x=(0,F.Nb1)().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(i/2).outerRadius(i/2.2);u.append("path").attr("class","mouth").attr("d",x).attr("transform","translate("+t.cx+","+(t.cy+7)+")")}function y(u){u.append("line").attr("class","mouth").attr("stroke",2).attr("x1",t.cx-5).attr("y1",t.cy+7).attr("x2",t.cx+5).attr("y2",t.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return t.score>3?o(s):t.score<3?l(s):y(s),n},nt=function(e,t){const i=e.append("circle");return i.attr("cx",t.cx),i.attr("cy",t.cy),i.attr("class","actor-"+t.pos),i.attr("fill",t.fill),i.attr("stroke",t.stroke),i.attr("r",t.r),i.class!==void 0&&i.attr("class",i.class),t.title!==void 0&&i.append("title").text(t.title),i},rt=function(e,t){const i=t.text.replace(/<br\s*\/?>/gi," "),n=e.append("text");n.attr("x",t.x),n.attr("y",t.y),n.attr("class","legend"),n.style("text-anchor",t.anchor),t.class!==void 0&&n.attr("class",t.class);const s=n.append("tspan");return s.attr("x",t.x+t.textMargin*2),s.text(i),n},Pt=function(e,t){function i(s,o,l,y,u){return s+","+o+" "+(s+l)+","+o+" "+(s+l)+","+(o+y-u)+" "+(s+l-u*1.2)+","+(o+y)+" "+s+","+(o+y)}const n=e.append("polygon");n.attr("points",i(t.x,t.y,50,20,7)),n.attr("class","labelBox"),t.y=t.y+t.labelMargin,t.x=t.x+.5*t.labelMargin,rt(e,t)},St=function(e,t,i){const n=e.append("g"),s=H();s.x=t.x,s.y=t.y,s.fill=t.fill,s.width=i.width*t.taskCount+i.diagramMarginX*(t.taskCount-1),s.height=i.height,s.class="journey-section section-type-"+t.num,s.rx=3,s.ry=3,Y(n,s),lt(i)(t.text,n,s.x,s.y,s.width,s.height,{class:"journey-section section-type-"+t.num},i,t.colour)};let at=-1;const $t=function(e,t,i){const n=t.x+i.width/2,s=e.append("g");at++;const o=300+5*30;s.append("line").attr("id","task"+at).attr("x1",n).attr("y1",t.y).attr("x2",n).attr("y2",o).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Tt(s,{cx:n,cy:300+(5-t.score)*30,score:t.score});const l=H();l.x=t.x,l.y=t.y,l.fill=t.fill,l.width=i.width,l.height=i.height,l.class="task task-type-"+t.num,l.rx=3,l.ry=3,Y(s,l);let y=t.x+14;t.people.forEach(u=>{const x=t.actors[u].color,g={cx:y,cy:t.y,r:7,fill:x,stroke:"#000",title:u,pos:t.actors[u].position};nt(s,g),y+=10}),lt(i)(t.task,s,l.x,l.y,l.width,l.height,{class:"task"},i,t.colour)},It=function(e,t){Y(e,{x:t.startx,y:t.starty,width:t.stopx-t.startx,height:t.stopy-t.starty,fill:t.fill,class:"rect"}).lower()},At=function(){return{x:0,y:0,fill:void 0,"text-anchor":"start",width:100,height:100,textMargin:0,rx:0,ry:0}},H=function(){return{x:0,y:0,width:100,anchor:"start",height:100,rx:0,ry:0}},lt=function(){function e(s,o,l,y,u,x,g,p){const d=o.append("text").attr("x",l+u/2).attr("y",y+x/2+5).style("font-color",p).style("text-anchor","middle").text(s);n(d,g)}function t(s,o,l,y,u,x,g,p,d){const{taskFontSize:M,taskFontFamily:v}=p,_=s.split(/<br\s*\/?>/gi);for(let r=0;r<_.length;r++){const a=r*M-M*(_.length-1)/2,h=o.append("text").attr("x",l+u/2).attr("y",y).attr("fill",d).style("text-anchor","middle").style("font-size",M).style("font-family",v);h.append("tspan").attr("x",l+u/2).attr("dy",a).text(_[r]),h.attr("y",y+x/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),n(h,g)}}function i(s,o,l,y,u,x,g,p){const d=o.append("switch"),v=d.append("foreignObject").attr("x",l).attr("y",y).attr("width",u).attr("height",x).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");v.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(s),t(s,d,l,y,u,x,g,p),n(v,g)}function n(s,o){for(const l in o)l in o&&s.attr(l,o[l])}return function(s){return s.textPlacement==="fo"?i:s.textPlacement==="old"?e:t}}(),j={drawRect:Y,drawCircle:nt,drawSection:St,drawText:rt,drawLabel:Pt,drawTask:$t,drawBackgroundRect:It,getTextObj:At,getNoteRect:H,initGraphics:function(e){e.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")}},Ct=function(e){Object.keys(e).forEach(function(i){z[i]=e[i]})},$={};function Vt(e){const t=(0,w.g)().journey;let i=60;Object.keys($).forEach(n=>{const s=$[n].color,o={cx:20,cy:i,r:7,fill:s,stroke:"#000",pos:$[n].position};j.drawCircle(e,o);const l={x:40,y:i+7,fill:"#666",text:n,textMargin:t.boxTextMargin|5};j.drawText(e,l),i+=20})}const z=(0,w.g)().journey,C=z.leftMargin,Lt=function(e,t,i,n){const s=(0,w.g)().journey;n.db.clear(),n.parser.parse(e+`
`);const o=(0,w.g)().securityLevel;let l;o==="sandbox"&&(l=(0,F.Ys)("#i"+t));const y=o==="sandbox"?(0,F.Ys)(l.nodes()[0].contentDocument.body):(0,F.Ys)("body");T.init();const u=y.select("#"+t);j.initGraphics(u);const x=n.db.getTasks(),g=n.db.getDiagramTitle(),p=n.db.getActors();for(const a in $)delete $[a];let d=0;p.forEach(a=>{$[a]={color:s.actorColours[d%s.actorColours.length],position:d},d++}),Vt(u),T.insert(0,0,C,Object.keys($).length*50),Rt(u,x,0);const M=T.getBounds();g&&u.append("text").text(g).attr("x",C).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);const v=M.stopy-M.starty+2*s.diagramMarginY,_=C+M.stopx+2*s.diagramMarginX;(0,ft.k)(u,v,_,s.useMaxWidth),u.append("line").attr("x1",C).attr("y1",s.height*4).attr("x2",_-C-4).attr("y2",s.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");const r=g?70:0;u.attr("viewBox",`${M.startx} -25 ${_} ${v+r}`),u.attr("preserveAspectRatio","xMinYMin meet"),u.attr("height",v+r+25)},T={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},updateVal:function(e,t,i,n){e[t]===void 0?e[t]=i:e[t]=n(i,e[t])},updateBounds:function(e,t,i,n){const s=(0,w.g)().journey,o=this;let l=0;function y(u){return function(g){l++;const p=o.sequenceItems.length-l+1;o.updateVal(g,"starty",t-p*s.boxMargin,Math.min),o.updateVal(g,"stopy",n+p*s.boxMargin,Math.max),o.updateVal(T.data,"startx",e-p*s.boxMargin,Math.min),o.updateVal(T.data,"stopx",i+p*s.boxMargin,Math.max),u!=="activation"&&(o.updateVal(g,"startx",e-p*s.boxMargin,Math.min),o.updateVal(g,"stopx",i+p*s.boxMargin,Math.max),o.updateVal(T.data,"starty",t-p*s.boxMargin,Math.min),o.updateVal(T.data,"stopy",n+p*s.boxMargin,Math.max))}}this.sequenceItems.forEach(y())},insert:function(e,t,i,n){const s=Math.min(e,i),o=Math.max(e,i),l=Math.min(t,n),y=Math.max(t,n);this.updateVal(T.data,"startx",s,Math.min),this.updateVal(T.data,"starty",l,Math.min),this.updateVal(T.data,"stopx",o,Math.max),this.updateVal(T.data,"stopy",y,Math.max),this.updateBounds(s,l,o,y)},bumpVerticalPos:function(e){this.verticalPos=this.verticalPos+e,this.data.stopy=this.verticalPos},getVerticalPos:function(){return this.verticalPos},getBounds:function(){return this.data}},Z=z.sectionFills,ct=z.sectionColours,Rt=function(e,t,i){const n=(0,w.g)().journey;let s="";const o=n.height*2+n.diagramMarginY,l=i+o;let y=0,u="#CCC",x="black",g=0;for(const[p,d]of t.entries()){if(s!==d.section){u=Z[y%Z.length],g=y%Z.length,x=ct[y%ct.length];let v=0;const _=d.section;for(let a=p;a<t.length&&t[a].section==_;a++)v=v+1;const r={x:p*n.taskMargin+p*n.width+C,y:50,text:d.section,fill:u,num:g,colour:x,taskCount:v};j.drawSection(e,r,n),s=d.section,y++}const M=d.people.reduce((v,_)=>($[_]&&(v[_]=$[_]),v),{});d.x=p*n.taskMargin+p*n.width+C,d.y=l,d.width=n.diagramMarginX,d.height=n.diagramMarginY,d.colour=x,d.fill=u,d.num=g,d.actors=M,j.drawTask(e,d,n),T.insert(d.x,d.y,d.x+d.width+n.taskMargin,300+5*30)}},ot={setConf:Ct,draw:Lt},Ot={parser:pt,db:st,renderer:ot,styles:Mt,init:e=>{ot.setConf(e.journey),st.clear()}}}}]);
