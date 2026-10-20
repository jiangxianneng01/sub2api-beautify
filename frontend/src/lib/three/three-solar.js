/*!
 * three.js r186 (0.186.1) — https://threejs.org — MIT License, (c) 2010-2026 three.js authors
 * Vendored, tree-shaken ESM bundle of the three.js core plus the addons this project uses
 * (EffectComposer, RenderPass, UnrealBloomPass, ShaderPass, OutputPass, Lensflare, OrbitControls).
 * Built from the r186 tag with esbuild; see src/lib/three/README.md. Replace with the npm "three"
 * package (same version) whenever that is preferred — the import surface is identical.
 */
var Vp=Object.defineProperty;var Hp=(r,e)=>{for(var t in e)Vp(r,t,{get:e[t],enumerable:!0})};var yr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},br={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ec=0,$a=1,Tc=2;var Xr=1,ja=2,Er=3,ci=0,vt=1,si=2,$t=0,Gi=1,rr=2,el=3,tl=4,Ac=5;var nr=100,wc=101,Rc=102,Cc=103,Pc=104,Lc=200,Dc=201,Ic=202,Uc=203,uo=204,po=205,Nc=206,Fc=207,Oc=208,Bc=209,Gc=210,zc=211,Vc=212,Hc=213,kc=214,es=0,ts=1,is=2,sr=3,rs=4,ns=5,ss=6,os=7,or=0,Wc=1,Xc=2,Xt=0,qr=1,Yr=2,Zr=3,Tr=4,Kr=5,Jr=6,Qr=7;var il=300,_i=301,zi=302,mo=303,go=304,ar=306,$r=1e3,jt=1001,as=1002,ot=1003,qc=1004;var ls=1005;var Mt=1006,_o=1007;var xi=1008;var gt=1009,xo=1010,vo=1011,Vi=1012,jr=1013,Ot=1014,wt=1015,_t=1016,en=1017,tn=1018,Hi=1020,Mo=35902,So=35899,yo=1021,bo=1022,Lt=1023,ei=1026,bi=1027,rn=1028,nn=1029,hi=1030,sn=1031;var on=1033,an=33776,ln=33777,cn=33778,hn=33779,cs=35840,hs=35841,fs=35842,us=35843,ds=36196,ps=37492,ms=37496,gs=37488,_s=37489,Ar=37490,xs=37491,vs=37808,Ms=37809,Ss=37810,ys=37811,bs=37812,Es=37813,Ts=37814,As=37815,ws=37816,Rs=37817,Cs=37818,Ps=37819,Ls=37820,Ds=37821,Is=36492,Us=36494,Ns=36495,Fs=36283,Os=36284,wr=36285,Bs=36286;var Yc=3200;var ki=0,Zc=1,vi="",qt="srgb",lr="srgb-linear",Rr="linear",ke="srgb";var Eo=7680;var Kc=519,Jc=512,Qc=513,$c=514,fn=515,jc=516,eh=517,un=518,th=519,Gs=35044,kp=35048;var rl="300 es",ti=2e3,Wi=2001;function rh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function cr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function nh(){let r=cr("canvas");return r.style.display="block",r}var ih={},dn=null;function pn(...r){let e="THREE."+r.shift();dn?dn("log",e,...r):console.log(e,...r)}function sh(r){let e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function me(...r){r=sh(r);let e="THREE."+r.shift();if(dn)dn("warn",e,...r);else{let t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Oe(...r){r=sh(r);let e="THREE."+r.shift();if(dn)dn("error",e,...r);else{let t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function Ii(...r){let e=r.join(" ");e in ih||(ih[e]=!0,me(...r))}function oh(r,e,t){return new Promise(function(i,n){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:n();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var ah={[es]:ts,[is]:ss,[rs]:os,[sr]:ns,[ts]:es,[ss]:is,[os]:rs,[ns]:sr};var Bt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let n=i[e];if(n!==void 0){let s=n.indexOf(t);s!==-1&&n.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let n=i.slice(0);for(let s=0,o=n.length;s<o;s++)n[s].call(this,e);e.target=null}}};var Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lh=1234567,mn=Math.PI/180,Cr=180/Math.PI;function ii(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Yt[r&255]+Yt[r>>8&255]+Yt[r>>16&255]+Yt[r>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]).toLowerCase()}function Ie(r,e,t){return Math.max(e,Math.min(t,r))}function To(r,e){return(r%e+e)%e}function Wp(r,e,t,i,n){return i+(r-e)*(n-i)/(t-e)}function Xp(r,e,t){return r!==e?(t-r)/(e-r):0}function gn(r,e,t){return(1-t)*r+t*e}function qp(r,e,t,i){return gn(r,e,1-Math.exp(-t*i))}function Yp(r,e=1){return e-Math.abs(To(r,e*2)-e)}function Zp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Kp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Jp(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Qp(r,e){return r+Math.random()*(e-r)}function $p(r){return r*(.5-Math.random())}function jp(r){r!==void 0&&(lh=r);let e=lh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function em(r){return r*mn}function tm(r){return r*Cr}function im(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function rm(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function nm(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function sm(r,e,t,i,n){let s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),f=o((e+i)/2),p=s((e-i)/2),h=o((e-i)/2),d=s((i-e)/2),x=o((i-e)/2);switch(n){case"XYX":r.set(a*f,l*p,l*h,a*c);break;case"YZY":r.set(l*h,a*f,l*p,a*c);break;case"ZXZ":r.set(l*p,l*h,a*f,a*c);break;case"XZX":r.set(a*f,l*x,l*d,a*c);break;case"YXY":r.set(l*d,a*f,l*x,a*c);break;case"ZYZ":r.set(l*x,l*d,a*f,a*c);break;default:me("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function fi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $e(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ao={DEG2RAD:mn,RAD2DEG:Cr,generateUUID:ii,clamp:Ie,euclideanModulo:To,mapLinear:Wp,inverseLerp:Xp,lerp:gn,damp:qp,pingpong:Yp,smoothstep:Zp,smootherstep:Kp,randInt:Jp,randFloat:Qp,randFloatSpread:$p,seededRandom:jp,degToRad:em,radToDeg:tm,isPowerOfTwo:im,ceilPowerOfTwo:rm,floorPowerOfTwo:nm,setQuaternionFromProperEuler:sm,normalize:$e,denormalize:fi};var nl=class nl{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ie(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ie(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),n=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*n+e.x,this.y=s*n+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};nl.prototype.isVector2=!0;var Y=nl;var Vt=class{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,s,o,a){let l=i[n+0],c=i[n+1],f=i[n+2],p=i[n+3],h=s[o+0],d=s[o+1],x=s[o+2],S=s[o+3];if(p!==S||l!==h||c!==d||f!==x){let m=l*h+c*d+f*x+p*S;m<0&&(h=-h,d=-d,x=-x,S=-S,m=-m);let u=1-a;if(m<.9995){let y=Math.acos(m),R=Math.sin(y);u=Math.sin(u*y)/R,a=Math.sin(a*y)/R,l=l*u+h*a,c=c*u+d*a,f=f*u+x*a,p=p*u+S*a}else{l=l*u+h*a,c=c*u+d*a,f=f*u+x*a,p=p*u+S*a;let y=1/Math.sqrt(l*l+c*c+f*f+p*p);l*=y,c*=y,f*=y,p*=y}}e[t]=l,e[t+1]=c,e[t+2]=f,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,n,s,o){let a=i[n],l=i[n+1],c=i[n+2],f=i[n+3],p=s[o],h=s[o+1],d=s[o+2],x=s[o+3];return e[t]=a*x+f*p+l*d-c*h,e[t+1]=l*x+f*h+c*p-a*d,e[t+2]=c*x+f*d+a*h-l*p,e[t+3]=f*x-a*p-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,n=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),f=a(n/2),p=a(s/2),h=l(i/2),d=l(n/2),x=l(s/2);switch(o){case"XYZ":this._x=h*f*p+c*d*x,this._y=c*d*p-h*f*x,this._z=c*f*x+h*d*p,this._w=c*f*p-h*d*x;break;case"YXZ":this._x=h*f*p+c*d*x,this._y=c*d*p-h*f*x,this._z=c*f*x-h*d*p,this._w=c*f*p+h*d*x;break;case"ZXY":this._x=h*f*p-c*d*x,this._y=c*d*p+h*f*x,this._z=c*f*x+h*d*p,this._w=c*f*p-h*d*x;break;case"ZYX":this._x=h*f*p-c*d*x,this._y=c*d*p+h*f*x,this._z=c*f*x-h*d*p,this._w=c*f*p+h*d*x;break;case"YZX":this._x=h*f*p+c*d*x,this._y=c*d*p+h*f*x,this._z=c*f*x-h*d*p,this._w=c*f*p-h*d*x;break;case"XZY":this._x=h*f*p-c*d*x,this._y=c*d*p-h*f*x,this._z=c*f*x+h*d*p,this._w=c*f*p+h*d*x;break;default:me("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],n=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],f=t[6],p=t[10],h=i+a+p;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(f-l)*d,this._y=(s-c)*d,this._z=(o-n)*d}else if(i>a&&i>p){let d=2*Math.sqrt(1+i-a-p);this._w=(f-l)/d,this._x=.25*d,this._y=(n+o)/d,this._z=(s+c)/d}else if(a>p){let d=2*Math.sqrt(1+a-i-p);this._w=(s-c)/d,this._x=(n+o)/d,this._y=.25*d,this._z=(l+f)/d}else{let d=2*Math.sqrt(1+p-i-a);this._w=(o-n)/d,this._x=(s+c)/d,this._y=(l+f)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ie(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,n=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,f=t._w;return this._x=i*f+o*a+n*c-s*l,this._y=n*f+o*l+s*a-i*c,this._z=s*f+o*c+i*l-n*a,this._w=o*f-i*a-n*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,n=-n,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),f=Math.sin(c);l=Math.sin(l*c)/f,t=Math.sin(t*c)/f,this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};var ol=class ol{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ch.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ch.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,n=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*n,this.y=s[1]*t+s[4]*i+s[7]*n,this.z=s[2]*t+s[5]*i+s[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*n+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*n+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*n+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,n=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*n-a*i),f=2*(a*t-s*n),p=2*(s*i-o*t);return this.x=t+l*c+o*p-a*f,this.y=i+l*f+a*c-s*p,this.z=n+l*p+s*f-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,n=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*n,this.y=s[1]*t+s[5]*i+s[9]*n,this.z=s[2]*t+s[6]*i+s[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this.z=Ie(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this.z=Ie(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ie(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,n=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=n*l-s*a,this.y=s*o-i*l,this.z=i*a-n*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return sl.copy(this).projectOnVector(e),this.sub(sl)}reflect(e){return this.sub(sl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ie(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ol.prototype.isVector3=!0;var A=ol,sl=new A,ch=new Vt;var ll=class ll{constructor(e,t,i,n,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,s,o,a,l,c)}set(e,t,i,n,s,o,a,l,c){let f=this.elements;return f[0]=e,f[1]=n,f[2]=a,f[3]=t,f[4]=s,f[5]=l,f[6]=i,f[7]=o,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],f=i[4],p=i[7],h=i[2],d=i[5],x=i[8],S=n[0],m=n[3],u=n[6],y=n[1],R=n[4],M=n[7],T=n[2],b=n[5],C=n[8];return s[0]=o*S+a*y+l*T,s[3]=o*m+a*R+l*b,s[6]=o*u+a*M+l*C,s[1]=c*S+f*y+p*T,s[4]=c*m+f*R+p*b,s[7]=c*u+f*M+p*C,s[2]=h*S+d*y+x*T,s[5]=h*m+d*R+x*b,s[8]=h*u+d*M+x*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8];return t*o*f-t*a*c-i*s*f+i*a*l+n*s*c-n*o*l}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8],p=f*o-a*c,h=a*l-f*s,d=c*s-o*l,x=t*p+i*h+n*d;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=p*S,e[1]=(n*c-f*i)*S,e[2]=(a*i-n*o)*S,e[3]=h*S,e[4]=(f*t-n*l)*S,e[5]=(n*s-a*t)*S,e[6]=d*S,e[7]=(i*l-c*t)*S,e[8]=(o*t-i*s)*S,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-n*c,n*l,-n*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Ii("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(al.makeScale(e,t)),this}rotate(e){return Ii("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(al.makeRotation(-e)),this}translate(e,t){return Ii("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(al.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ll.prototype.isMatrix3=!0;var Ce=ll,al=new Ce;var hh=new Ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fh=new Ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function om(){let r={enabled:!0,workingColorSpace:lr,spaces:{},convert:function(n,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ke&&(n.r=Ei(n.r),n.g=Ei(n.g),n.b=Ei(n.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ke&&(n.r=Pr(n.r),n.g=Pr(n.g),n.b=Pr(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===vi?Rr:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,o){return n.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,s){return Ii("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(n,s)},toWorkingColorSpace:function(n,s){return Ii("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(n,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return r.define({[lr]:{primaries:e,whitePoint:i,transfer:Rr,toXYZ:hh,fromXYZ:fh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:i,transfer:ke,toXYZ:hh,fromXYZ:fh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),r}var Ue=om();function Ei(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Pr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var _n,wo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{_n===void 0&&(_n=cr("canvas")),_n.width=e.width,_n.height=e.height;let n=_n.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=_n}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=cr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let n=i.getImageData(0,0,e.width,e.height),s=n.data;for(let o=0;o<s.length;o++)s[o]=Ei(s[o]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ei(t[i]/255)*255):t[i]=Ei(t[i]);return{data:t,width:e.width,height:e.height}}else return me("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}};var am=0,hr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=ii(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let o=0,a=n.length;o<a;o++)n[o].isDataTexture?s.push(cl(n[o].image)):s.push(cl(n[o]))}else s=cl(n);i.url=s}return t||(e.images[this.uuid]=i),i}};function cl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?wo.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(me("Texture: Unable to serialize Texture."),{})}var lm=0,hl=new A,it=class r extends Bt{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,i=jt,n=jt,s=Mt,o=xi,a=Lt,l=gt,c=r.DEFAULT_ANISOTROPY,f=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lm++}),this.uuid=ii(),this.name="",this.source=new hr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Y(0,0),this.repeat=new Y(1,1),this.center=new Y(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(hl).x}get height(){return this.source.getSize(hl).y}get depth(){return this.source.getSize(hl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){me(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let n=this[t];if(n===void 0){me(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==il)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $r:e.x=e.x-Math.floor(e.x);break;case jt:e.x=e.x<0?0:1;break;case as:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $r:e.y=e.y-Math.floor(e.y);break;case jt:e.y=e.y<0?0:1;break;case as:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};it.DEFAULT_IMAGE=null;it.DEFAULT_MAPPING=il;it.DEFAULT_ANISOTROPY=1;var fl=class fl{constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*n+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*n+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*n+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*n+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,s,l=e.elements,c=l[0],f=l[4],p=l[8],h=l[1],d=l[5],x=l[9],S=l[2],m=l[6],u=l[10];if(Math.abs(f-h)<.01&&Math.abs(p-S)<.01&&Math.abs(x-m)<.01){if(Math.abs(f+h)<.1&&Math.abs(p+S)<.1&&Math.abs(x+m)<.1&&Math.abs(c+d+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let R=(c+1)/2,M=(d+1)/2,T=(u+1)/2,b=(f+h)/4,C=(p+S)/4,_=(x+m)/4;return R>M&&R>T?R<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(R),n=b/i,s=C/i):M>T?M<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(M),i=b/n,s=_/n):T<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(T),i=C/s,n=_/s),this.set(i,n,s,t),this}let y=Math.sqrt((m-x)*(m-x)+(p-S)*(p-S)+(h-f)*(h-f));return Math.abs(y)<.001&&(y=1),this.x=(m-x)/y,this.y=(p-S)/y,this.z=(h-f)/y,this.w=Math.acos((c+d+u-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this.z=Ie(this.z,e.z,t.z),this.w=Ie(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this.z=Ie(this.z,e,t),this.w=Ie(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ie(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};fl.prototype.isVector4=!0;var Ye=fl;var Ro=class extends Bt{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ye(0,0,e,t),this.scissorTest=!1,this.viewport=new Ye(0,0,e,t),this.textures=[];let n={width:e,height:t,depth:i.depth},s=new it(n),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Mt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new hr(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}};var ht=class extends Ro{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}};var xn=class extends it{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=ot,this.minFilter=ot,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Co=class extends it{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=ot,this.minFilter=ot,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Lo=class Lo{constructor(e,t,i,n,s,o,a,l,c,f,p,h,d,x,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,s,o,a,l,c,f,p,h,d,x,S,m)}set(e,t,i,n,s,o,a,l,c,f,p,h,d,x,S,m){let u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=n,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=f,u[10]=p,u[14]=h,u[3]=d,u[7]=x,u[11]=S,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Lo().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,n=1/vn.setFromMatrixColumn(e,0).length(),s=1/vn.setFromMatrixColumn(e,1).length(),o=1/vn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,n=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(n),c=Math.sin(n),f=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let h=o*f,d=o*p,x=a*f,S=a*p;t[0]=l*f,t[4]=-l*p,t[8]=c,t[1]=d+x*c,t[5]=h-S*c,t[9]=-a*l,t[2]=S-h*c,t[6]=x+d*c,t[10]=o*l}else if(e.order==="YXZ"){let h=l*f,d=l*p,x=c*f,S=c*p;t[0]=h+S*a,t[4]=x*a-d,t[8]=o*c,t[1]=o*p,t[5]=o*f,t[9]=-a,t[2]=d*a-x,t[6]=S+h*a,t[10]=o*l}else if(e.order==="ZXY"){let h=l*f,d=l*p,x=c*f,S=c*p;t[0]=h-S*a,t[4]=-o*p,t[8]=x+d*a,t[1]=d+x*a,t[5]=o*f,t[9]=S-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let h=o*f,d=o*p,x=a*f,S=a*p;t[0]=l*f,t[4]=x*c-d,t[8]=h*c+S,t[1]=l*p,t[5]=S*c+h,t[9]=d*c-x,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let h=o*l,d=o*c,x=a*l,S=a*c;t[0]=l*f,t[4]=S-h*p,t[8]=x*p+d,t[1]=p,t[5]=o*f,t[9]=-a*f,t[2]=-c*f,t[6]=d*p+x,t[10]=h-S*p}else if(e.order==="XZY"){let h=o*l,d=o*c,x=a*l,S=a*c;t[0]=l*f,t[4]=-p,t[8]=c*f,t[1]=h*p+S,t[5]=o*f,t[9]=d*p-x,t[2]=x*p-d,t[6]=a*f,t[10]=S*p+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cm,e,hm)}lookAt(e,t,i){let n=this.elements;return ui.subVectors(e,t),ui.lengthSq()===0&&(ui.z=1),ui.normalize(),fr.crossVectors(i,ui),fr.lengthSq()===0&&(Math.abs(i.z)===1?ui.x+=1e-4:ui.z+=1e-4,ui.normalize(),fr.crossVectors(i,ui)),fr.normalize(),Po.crossVectors(ui,fr),n[0]=fr.x,n[4]=Po.x,n[8]=ui.x,n[1]=fr.y,n[5]=Po.y,n[9]=ui.y,n[2]=fr.z,n[6]=Po.z,n[10]=ui.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],f=i[1],p=i[5],h=i[9],d=i[13],x=i[2],S=i[6],m=i[10],u=i[14],y=i[3],R=i[7],M=i[11],T=i[15],b=n[0],C=n[4],_=n[8],E=n[12],P=n[1],N=n[5],F=n[9],z=n[13],D=n[2],V=n[6],W=n[10],X=n[14],re=n[3],Z=n[7],ee=n[11],ie=n[15];return s[0]=o*b+a*P+l*D+c*re,s[4]=o*C+a*N+l*V+c*Z,s[8]=o*_+a*F+l*W+c*ee,s[12]=o*E+a*z+l*X+c*ie,s[1]=f*b+p*P+h*D+d*re,s[5]=f*C+p*N+h*V+d*Z,s[9]=f*_+p*F+h*W+d*ee,s[13]=f*E+p*z+h*X+d*ie,s[2]=x*b+S*P+m*D+u*re,s[6]=x*C+S*N+m*V+u*Z,s[10]=x*_+S*F+m*W+u*ee,s[14]=x*E+S*z+m*X+u*ie,s[3]=y*b+R*P+M*D+T*re,s[7]=y*C+R*N+M*V+T*Z,s[11]=y*_+R*F+M*W+T*ee,s[15]=y*E+R*z+M*X+T*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],n=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],f=e[2],p=e[6],h=e[10],d=e[14],x=e[3],S=e[7],m=e[11],u=e[15],y=l*d-c*h,R=a*d-c*p,M=a*h-l*p,T=o*d-c*f,b=o*h-l*f,C=o*p-a*f;return t*(S*y-m*R+u*M)-i*(x*y-m*T+u*b)+n*(x*R-S*T+u*C)-s*(x*M-S*b+m*C)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],n=e[8],s=e[1],o=e[5],a=e[9],l=e[2],c=e[6],f=e[10];return t*(o*f-a*c)-i*(s*f-a*l)+n*(s*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8],p=e[9],h=e[10],d=e[11],x=e[12],S=e[13],m=e[14],u=e[15],y=t*a-i*o,R=t*l-n*o,M=t*c-s*o,T=i*l-n*a,b=i*c-s*a,C=n*c-s*l,_=f*S-p*x,E=f*m-h*x,P=f*u-d*x,N=p*m-h*S,F=p*u-d*S,z=h*u-d*m,D=y*z-R*F+M*N+T*P-b*E+C*_;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/D;return e[0]=(a*z-l*F+c*N)*V,e[1]=(n*F-i*z-s*N)*V,e[2]=(S*C-m*b+u*T)*V,e[3]=(h*b-p*C-d*T)*V,e[4]=(l*P-o*z-c*E)*V,e[5]=(t*z-n*P+s*E)*V,e[6]=(m*M-x*C-u*R)*V,e[7]=(f*C-h*M+d*R)*V,e[8]=(o*F-a*P+c*_)*V,e[9]=(i*P-t*F-s*_)*V,e[10]=(x*b-S*M+u*y)*V,e[11]=(p*M-f*b-d*y)*V,e[12]=(a*E-o*N-l*_)*V,e[13]=(t*N-i*E+n*_)*V,e[14]=(S*R-x*T-m*y)*V,e[15]=(f*T-p*R+h*y)*V,this}scale(e){let t=this.elements,i=e.x,n=e.y,s=e.z;return t[0]*=i,t[4]*=n,t[8]*=s,t[1]*=i,t[5]*=n,t[9]*=s,t[2]*=i,t[6]*=n,t[10]*=s,t[3]*=i,t[7]*=n,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),n=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,f=s*a;return this.set(c*o+i,c*a-n*l,c*l+n*a,0,c*a+n*l,f*a+i,f*l-n*o,0,c*l-n*a,f*l+n*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,s,o){return this.set(1,i,s,0,e,1,o,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){let n=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,f=o+o,p=a+a,h=s*c,d=s*f,x=s*p,S=o*f,m=o*p,u=a*p,y=l*c,R=l*f,M=l*p,T=i.x,b=i.y,C=i.z;return n[0]=(1-(S+u))*T,n[1]=(d+M)*T,n[2]=(x-R)*T,n[3]=0,n[4]=(d-M)*b,n[5]=(1-(h+u))*b,n[6]=(m+y)*b,n[7]=0,n[8]=(x+R)*C,n[9]=(m-y)*C,n[10]=(1-(h+S))*C,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){let n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let o=vn.set(n[0],n[1],n[2]).length(),a=vn.set(n[4],n[5],n[6]).length(),l=vn.set(n[8],n[9],n[10]).length();s<0&&(o=-o),Ti.copy(this);let c=1/o,f=1/a,p=1/l;return Ti.elements[0]*=c,Ti.elements[1]*=c,Ti.elements[2]*=c,Ti.elements[4]*=f,Ti.elements[5]*=f,Ti.elements[6]*=f,Ti.elements[8]*=p,Ti.elements[9]*=p,Ti.elements[10]*=p,t.setFromRotationMatrix(Ti),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,n,s,o,a=ti,l=!1){let c=this.elements,f=2*s/(t-e),p=2*s/(i-n),h=(t+e)/(t-e),d=(i+n)/(i-n),x,S;if(l)x=s/(o-s),S=o*s/(o-s);else if(a===ti)x=-(o+s)/(o-s),S=-2*o*s/(o-s);else if(a===Wi)x=-o/(o-s),S=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=p,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,s,o,a=ti,l=!1){let c=this.elements,f=2/(t-e),p=2/(i-n),h=-(t+e)/(t-e),d=-(i+n)/(i-n),x,S;if(l)x=1/(o-s),S=o/(o-s);else if(a===ti)x=-2/(o-s),S=-(o+s)/(o-s);else if(a===Wi)x=-1/(o-s),S=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=f,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=p,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=x,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Lo.prototype.isMatrix4=!0;var De=Lo,vn=new A,Ti=new De,cm=new A(0,0,0),hm=new A(1,1,1),fr=new A,Po=new A,ui=new A;var uh=new De,dh=new Vt,Gt=class r{constructor(e=0,t=0,i=0,n=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let n=e.elements,s=n[0],o=n[4],a=n[8],l=n[1],c=n[5],f=n[9],p=n[2],h=n[6],d=n[10];switch(t){case"XYZ":this._y=Math.asin(Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ie(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,d),this._y=0);break;default:me("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return uh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dh.setFromEuler(this),this.setFromQuaternion(dh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Gt.DEFAULT_ORDER="XYZ";var Ui=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}};var fm=0,ph=new A,Mn=new Vt,Xi=new De,Do=new A,zs=new A,um=new A,dm=new Vt,mh=new A(1,0,0),gh=new A(0,1,0),_h=new A(0,0,1),xh={type:"added"},pm={type:"removed"},Sn={type:"childadded",child:null},ul={type:"childremoved",child:null},rt=class r extends Bt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new A,t=new Gt,i=new Vt,n=new A(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new De},normalMatrix:{value:new Ce}}),this.matrix=new De,this.matrixWorld=new De,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ui,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mn.setFromAxisAngle(e,t),this.quaternion.multiply(Mn),this}rotateOnWorldAxis(e,t){return Mn.setFromAxisAngle(e,t),this.quaternion.premultiply(Mn),this}rotateX(e){return this.rotateOnAxis(mh,e)}rotateY(e){return this.rotateOnAxis(gh,e)}rotateZ(e){return this.rotateOnAxis(_h,e)}translateOnAxis(e,t){return ph.copy(e).applyQuaternion(this.quaternion),this.position.add(ph.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(mh,e)}translateY(e){return this.translateOnAxis(gh,e)}translateZ(e){return this.translateOnAxis(_h,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Do.copy(e):Do.set(e,t,i);let n=this.parent;this.updateWorldMatrix(!0,!1),zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xi.lookAt(zs,Do,this.up):Xi.lookAt(Do,zs,this.up),this.quaternion.setFromRotationMatrix(Xi),n&&(Xi.extractRotation(n.matrixWorld),Mn.setFromRotationMatrix(Xi),this.quaternion.premultiply(Mn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Oe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xh),Sn.child=e,this.dispatchEvent(Sn),Sn.child=null):Oe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pm),ul.child=e,this.dispatchEvent(ul),ul.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xh),Sn.child=e,this.dispatchEvent(Sn),Sn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let n=this.children;for(let s=0,o=n.length;s<o;s++)n[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,e,um),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,dm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,n=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*n,s[13]+=i-s[1]*t-s[5]*i-s[9]*n,s[14]+=n-s[2]*t-s[6]*i-s[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(a=>({...a})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){let p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));n.material=a}else n.material=s(e.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];n.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),f=o(e.images),p=o(e.shapes),h=o(e.skeletons),d=o(e.animations),x=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),x.length>0&&(i.nodes=x)}return i.object=n,i;function o(a){let l=[];for(let c in a){let f=a[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let n=e.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};rt.DEFAULT_UP=new A(0,1,0);rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var qi=class extends rt{constructor(){super(),this.isGroup=!0,this.type="Group"}};var mm={type:"move"},yn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let S of e.hand.values()){let m=t.getJointPose(S,i),u=this._getHandJoint(c,S);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}let f=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],h=f.position.distanceTo(p.position),d=.02,x=.005;c.inputState.pinching&&h>d+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(mm)))}return a!==null&&(a.visible=n!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new qi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ur={h:0,s:0,l:0},Io={h:0,s:0,l:0};function dl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}var de=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ue.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=Ue.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ue.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=Ue.workingColorSpace){if(e=To(e,1),t=Ie(t,0,1),i=Ie(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=dl(o,s,e+1/3),this.g=dl(o,s,e),this.b=dl(o,s,e-1/3)}return Ue.colorSpaceToWorking(this,n),this}setStyle(e,t=qt){function i(s){s!==void 0&&parseFloat(s)<1&&me("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=n[1],a=n[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:me("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=n[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);me("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){let i=vh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):me("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=Pr(e.r),this.g=Pr(e.g),this.b=Pr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return Ue.workingToColorSpace(Zt.copy(this),e),Math.round(Ie(Zt.r*255,0,255))*65536+Math.round(Ie(Zt.g*255,0,255))*256+Math.round(Ie(Zt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ue.workingColorSpace){Ue.workingToColorSpace(Zt.copy(this),t);let i=Zt.r,n=Zt.g,s=Zt.b,o=Math.max(i,n,s),a=Math.min(i,n,s),l,c,f=(a+o)/2;if(a===o)l=0,c=0;else{let p=o-a;switch(c=f<=.5?p/(o+a):p/(2-o-a),o){case i:l=(n-s)/p+(n<s?6:0);break;case n:l=(s-i)/p+2;break;case s:l=(i-n)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,t=Ue.workingColorSpace){return Ue.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=qt){Ue.workingToColorSpace(Zt.copy(this),e);let t=Zt.r,i=Zt.g,n=Zt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(ur),this.setHSL(ur.h+e,ur.s+t,ur.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ur),e.getHSL(Io);let i=gn(ur.h,Io.h,t),n=gn(ur.s,Io.s,t),s=gn(ur.l,Io.l,t);return this.setHSL(i,n,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,n=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*n,this.g=s[1]*t+s[4]*i+s[7]*n,this.b=s[2]*t+s[5]*i+s[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Zt=new de;de.NAMES=vh;var Uo=class extends rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gt,this.environmentIntensity=1,this.environmentRotation=new Gt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Ai=new A,Yi=new A,pl=new A,Zi=new A,bn=new A,En=new A,Mh=new A,ml=new A,gl=new A,_l=new A,xl=new Ye,vl=new Ye,Ml=new Ye,Ni=class r{constructor(e=new A,t=new A,i=new A){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Ai.subVectors(e,t),n.cross(Ai);let s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(e,t,i,n,s){Ai.subVectors(n,t),Yi.subVectors(i,t),pl.subVectors(e,t);let o=Ai.dot(Ai),a=Ai.dot(Yi),l=Ai.dot(pl),c=Yi.dot(Yi),f=Yi.dot(pl),p=o*c-a*a;if(p===0)return s.set(0,0,0),null;let h=1/p,d=(c*l-a*f)*h,x=(o*f-a*l)*h;return s.set(1-d-x,x,d)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Zi)===null?!1:Zi.x>=0&&Zi.y>=0&&Zi.x+Zi.y<=1}static getInterpolation(e,t,i,n,s,o,a,l){return this.getBarycoord(e,t,i,n,Zi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Zi.x),l.addScaledVector(o,Zi.y),l.addScaledVector(a,Zi.z),l)}static getInterpolatedAttribute(e,t,i,n,s,o){return xl.setScalar(0),vl.setScalar(0),Ml.setScalar(0),xl.fromBufferAttribute(e,t),vl.fromBufferAttribute(e,i),Ml.fromBufferAttribute(e,n),o.setScalar(0),o.addScaledVector(xl,s.x),o.addScaledVector(vl,s.y),o.addScaledVector(Ml,s.z),o}static isFrontFacing(e,t,i,n){return Ai.subVectors(i,t),Yi.subVectors(e,t),Ai.cross(Yi).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ai.subVectors(this.c,this.b),Yi.subVectors(this.a,this.b),Ai.cross(Yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,s){return r.getInterpolation(e,this.a,this.b,this.c,t,i,n,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,n=this.b,s=this.c,o,a;bn.subVectors(n,i),En.subVectors(s,i),ml.subVectors(e,i);let l=bn.dot(ml),c=En.dot(ml);if(l<=0&&c<=0)return t.copy(i);gl.subVectors(e,n);let f=bn.dot(gl),p=En.dot(gl);if(f>=0&&p<=f)return t.copy(n);let h=l*p-f*c;if(h<=0&&l>=0&&f<=0)return o=l/(l-f),t.copy(i).addScaledVector(bn,o);_l.subVectors(e,s);let d=bn.dot(_l),x=En.dot(_l);if(x>=0&&d<=x)return t.copy(s);let S=d*c-l*x;if(S<=0&&c>=0&&x<=0)return a=c/(c-x),t.copy(i).addScaledVector(En,a);let m=f*x-d*p;if(m<=0&&p-f>=0&&d-x>=0)return Mh.subVectors(s,n),a=(p-f)/(p-f+(d-x)),t.copy(n).addScaledVector(Mh,a);let u=1/(m+S+h);return o=S*u,a=h*u,t.copy(i).addScaledVector(bn,o).addScaledVector(En,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};var oi=class{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(wi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(wi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=wi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,wi):wi.fromBufferAttribute(s,o),wi.applyMatrix4(e.matrixWorld),this.expandByPoint(wi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),No.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),No.copy(i.boundingBox)),No.applyMatrix4(e.matrixWorld),this.union(No)}let n=e.children;for(let s=0,o=n.length;s<o;s++)this.expandByObject(n[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wi),wi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vs),Fo.subVectors(this.max,Vs),Tn.subVectors(e.a,Vs),An.subVectors(e.b,Vs),wn.subVectors(e.c,Vs),dr.subVectors(An,Tn),pr.subVectors(wn,An),Lr.subVectors(Tn,wn);let t=[0,-dr.z,dr.y,0,-pr.z,pr.y,0,-Lr.z,Lr.y,dr.z,0,-dr.x,pr.z,0,-pr.x,Lr.z,0,-Lr.x,-dr.y,dr.x,0,-pr.y,pr.x,0,-Lr.y,Lr.x,0];return!Sl(t,Tn,An,wn,Fo)||(t=[1,0,0,0,1,0,0,0,1],!Sl(t,Tn,An,wn,Fo))?!1:(Oo.crossVectors(dr,pr),t=[Oo.x,Oo.y,Oo.z],Sl(t,Tn,An,wn,Fo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ki=[new A,new A,new A,new A,new A,new A,new A,new A],wi=new A,No=new oi,Tn=new A,An=new A,wn=new A,dr=new A,pr=new A,Lr=new A,Vs=new A,Fo=new A,Oo=new A,Dr=new A;function Sl(r,e,t,i,n){for(let s=0,o=r.length-3;s<=o;s+=3){Dr.fromArray(r,s);let a=n.x*Math.abs(Dr.x)+n.y*Math.abs(Dr.y)+n.z*Math.abs(Dr.z),l=e.dot(Dr),c=t.dot(Dr),f=i.dot(Dr);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>a)return!1}return!0}var Rt=new A,Bo=new Y,gm=0,Dt=class extends Bt{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Gs,this.updateRanges=[],this.gpuType=wt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Bo.fromBufferAttribute(this,t),Bo.applyMatrix3(e),this.setXY(t,Bo.x,Bo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=fi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=$e(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fi(t,this.array)),t}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fi(t,this.array)),t}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fi(t,this.array)),t}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array),n=$e(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,s){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array),n=$e(n,this.array),s=$e(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Rn=class extends Dt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Cn=class extends Dt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ne=class extends Dt{constructor(e,t,i){super(new Float32Array(e),t,i)}};var _m=new oi,Hs=new A,yl=new A,Ht=class{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):_m.setFromPoints(e).getCenter(i);let n=0;for(let s=0,o=e.length;s<o;s++)n=Math.max(n,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hs.subVectors(e,this.center);let t=Hs.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(Hs,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hs.copy(e.center).add(yl)),this.expandByPoint(Hs.copy(e.center).sub(yl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}};var xm=0,Mi=new De,bl=new rt,Pn=new A,di=new oi,ks=new oi,zt=new A,Ve=class r extends Bt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xm++}),this.uuid=ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rh(e)?Cn:Rn)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Ce().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mi.makeRotationFromQuaternion(e),this.applyMatrix4(Mi),this}rotateX(e){return Mi.makeRotationX(e),this.applyMatrix4(Mi),this}rotateY(e){return Mi.makeRotationY(e),this.applyMatrix4(Mi),this}rotateZ(e){return Mi.makeRotationZ(e),this.applyMatrix4(Mi),this}translate(e,t,i){return Mi.makeTranslation(e,t,i),this.applyMatrix4(Mi),this}scale(e,t,i){return Mi.makeScale(e,t,i),this.applyMatrix4(Mi),this}lookAt(e){return bl.lookAt(e),bl.updateMatrix(),this.applyMatrix4(bl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pn).negate(),this.translate(Pn.x,Pn.y,Pn.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let n=0,s=e.length;n<s;n++){let o=e[n];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ne(i,3))}else{let i=Math.min(e.length,t.count);for(let n=0;n<i;n++){let s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&me("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){let s=t[i];di.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ht);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){let i=this.boundingSphere.center;if(di.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];ks.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(di.min,ks.min),di.expandByPoint(zt),zt.addVectors(di.max,ks.max),di.expandByPoint(zt)):(di.expandByPoint(ks.min),di.expandByPoint(ks.max))}di.getCenter(i);let n=0;for(let s=0,o=e.count;s<o;s++)zt.fromBufferAttribute(e,s),n=Math.max(n,i.distanceToSquared(zt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,f=a.count;c<f;c++)zt.fromBufferAttribute(a,c),l&&(Pn.fromBufferAttribute(e,c),zt.add(Pn)),n=Math.max(n,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,n=t.normal,s=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Dt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let _=0;_<i.count;_++)a[_]=new A,l[_]=new A;let c=new A,f=new A,p=new A,h=new Y,d=new Y,x=new Y,S=new A,m=new A;function u(_,E,P){c.fromBufferAttribute(i,_),f.fromBufferAttribute(i,E),p.fromBufferAttribute(i,P),h.fromBufferAttribute(s,_),d.fromBufferAttribute(s,E),x.fromBufferAttribute(s,P),f.sub(c),p.sub(c),d.sub(h),x.sub(h);let N=1/(d.x*x.y-x.x*d.y);isFinite(N)&&(S.copy(f).multiplyScalar(x.y).addScaledVector(p,-d.y).multiplyScalar(N),m.copy(p).multiplyScalar(d.x).addScaledVector(f,-x.x).multiplyScalar(N),a[_].add(S),a[E].add(S),a[P].add(S),l[_].add(m),l[E].add(m),l[P].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let _=0,E=y.length;_<E;++_){let P=y[_],N=P.start,F=P.count;for(let z=N,D=N+F;z<D;z+=3)u(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let R=new A,M=new A,T=new A,b=new A;function C(_){T.fromBufferAttribute(n,_),b.copy(T);let E=a[_];R.copy(E),R.sub(T.multiplyScalar(T.dot(E))).normalize(),M.crossVectors(b,E);let N=M.dot(l[_])<0?-1:1;o.setXYZW(_,R.x,R.y,R.z,N)}for(let _=0,E=y.length;_<E;++_){let P=y[_],N=P.start,F=P.count;for(let z=N,D=N+F;z<D;z+=3)C(e.getX(z+0)),C(e.getX(z+1)),C(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Dt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);let n=new A,s=new A,o=new A,a=new A,l=new A,c=new A,f=new A,p=new A;if(e)for(let h=0,d=e.count;h<d;h+=3){let x=e.getX(h+0),S=e.getX(h+1),m=e.getX(h+2);n.fromBufferAttribute(t,x),s.fromBufferAttribute(t,S),o.fromBufferAttribute(t,m),f.subVectors(o,s),p.subVectors(n,s),f.cross(p),a.fromBufferAttribute(i,x),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),a.add(f),l.add(f),c.add(f),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)n.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),f.subVectors(o,s),p.subVectors(n,s),f.cross(p),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,l){let c=a.array,f=a.itemSize,p=a.normalized,h=new c.constructor(l.length*f),d=0,x=0;for(let S=0,m=l.length;S<m;S++){a.isInterleavedBufferAttribute?d=l[S]*a.data.stride+a.offset:d=l[S]*f;for(let u=0;u<f;u++)h[x++]=c[d++]}return new Dt(h,f,p)}if(this.index===null)return me("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,i=this.index.array,n=this.attributes;for(let a in n){let l=n[a],c=e(l,i);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let f=0,p=c.length;f<p;f++){let h=c[f],d=e(h,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let n={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],f=[];for(let p=0,h=c.length;p<h;p++){let d=c[p];f.push(d.toJSON(e.data))}f.length>0&&(n[l]=f,s=!0)}s&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let n=e.attributes;for(let c in n){let f=n[c];this.setAttribute(c,f.clone(t))}let s=e.morphAttributes;for(let c in s){let f=[],p=s[c];for(let h=0,d=p.length;h<d;h++)f.push(p[h].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,f=o.length;c<f;c++){let p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ir=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Gs,this.updateRanges=[],this.version=0,this.uuid=ii()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,s=this.stride;n<s;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}};var ri=new A,Ji=class r{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)ri.fromBufferAttribute(this,t),ri.applyMatrix4(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ri.fromBufferAttribute(this,t),ri.applyNormalMatrix(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ri.fromBufferAttribute(this,t),ri.transformDirection(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=fi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=$e(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=fi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=fi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=fi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=fi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array),n=$e(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array),n=$e(n,this.array),s=$e(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=s,this}clone(e){if(e===void 0){pn("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[n+s])}return new Dt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){pn("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var El=new A,vm=new A,Mm=new Ce,Kt=class{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let n=El.subVectors(i,t).cross(vm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let n=e.delta(El),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Mm.getNormalMatrix(e),n=this.coplanarPoint(El).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}};var Sm=0,St=class extends Bt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=ii(),this.name="",this.type="Material",this.blending=Gi,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uo,this.blendDst=po,this.blendEquation=nr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new de(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Eo,this.stencilZFail=Eo,this.stencilZPass=Eo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){me(`Material: parameter '${t}' has value of undefined.`);continue}let n=this[t];if(n===void 0){me(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=n(e.textures),o=n(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new de().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Kt().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Y().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Y().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let n=t.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Ln=class extends St{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}};var Dn,Ws=new A,In=new A,Un=new A,Nn=new Y,Xs=new Y,bh=new De,Go=new A,qs=new A,zo=new A,Sh=new Y,Tl=new Y,yh=new Y,Ho=class extends rt{constructor(e=new Ln){if(super(),this.isSprite=!0,this.type="Sprite",Dn===void 0){Dn=new Ve;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Ir(t,5);Dn.setIndex([0,1,2,0,2,3]),Dn.setAttribute("position",new Ji(i,3,0,!1)),Dn.setAttribute("uv",new Ji(i,2,3,!1))}this.geometry=Dn,this.material=e,this.center=new Y(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Oe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),In.setFromMatrixScale(this.matrixWorld),bh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Un.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&In.multiplyScalar(-Un.z);let i=this.material.rotation,n,s;i!==0&&(s=Math.cos(i),n=Math.sin(i));let o=this.center;Vo(Go.set(-.5,-.5,0),Un,o,In,n,s),Vo(qs.set(.5,-.5,0),Un,o,In,n,s),Vo(zo.set(.5,.5,0),Un,o,In,n,s),Sh.set(0,0),Tl.set(1,0),yh.set(1,1);let a=e.ray.intersectTriangle(Go,qs,zo,!1,Ws);if(a===null&&(Vo(qs.set(-.5,.5,0),Un,o,In,n,s),Tl.set(0,1),a=e.ray.intersectTriangle(Go,zo,qs,!1,Ws),a===null))return;let l=e.ray.origin.distanceTo(Ws);l<e.near||l>e.far||t.push({distance:l,point:Ws.clone(),uv:Ni.getInterpolation(Ws,Go,qs,zo,Sh,Tl,yh,new Y),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Vo(r,e,t,i,n,s){Nn.subVectors(r,t).addScalar(.5).multiply(i),n!==void 0?(Xs.x=s*Nn.x-n*Nn.y,Xs.y=n*Nn.x+s*Nn.y):Xs.copy(Nn),r.copy(e),r.x+=Xs.x,r.y+=Xs.y,r.applyMatrix4(bh)}var Qi=new A,Al=new A,ko=new A,Wo=new A,pi=class{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Qi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qi.copy(this.origin).addScaledVector(this.direction,t),Qi.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Al.copy(e).add(t).multiplyScalar(.5),ko.copy(t).sub(e).normalize(),Wo.copy(this.origin).sub(Al);let s=e.distanceTo(t)*.5,o=-this.direction.dot(ko),a=Wo.dot(this.direction),l=-Wo.dot(ko),c=Wo.lengthSq(),f=Math.abs(1-o*o),p,h,d,x;if(f>0)if(p=o*l-a,h=o*a-l,x=s*f,p>=0)if(h>=-x)if(h<=x){let S=1/f;p*=S,h*=S,d=p*(p+o*h+2*a)+h*(o*p+h+2*l)+c}else h=s,p=Math.max(0,-(o*h+a)),d=-p*p+h*(h+2*l)+c;else h=-s,p=Math.max(0,-(o*h+a)),d=-p*p+h*(h+2*l)+c;else h<=-x?(p=Math.max(0,-(-o*s+a)),h=p>0?-s:Math.min(Math.max(-s,-l),s),d=-p*p+h*(h+2*l)+c):h<=x?(p=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(p=Math.max(0,-(o*s+a)),h=p>0?s:Math.min(Math.max(-s,-l),s),d=-p*p+h*(h+2*l)+c);else h=o>0?-s:s,p=Math.max(0,-(o*h+a)),d=-p*p+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),n&&n.copy(Al).addScaledVector(ko,h),d}intersectSphere(e,t){if(e.radius<0)return null;Qi.subVectors(e.center,this.origin);let i=Qi.dot(this.direction),n=Qi.dot(Qi)-i*i,s=e.radius*e.radius;if(n>s)return null;let o=Math.sqrt(s-n),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,s,o,a,l,c=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,n=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,n=(e.min.x-h.x)*c),f>=0?(s=(e.min.y-h.y)*f,o=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,o=(e.min.y-h.y)*f),i>o||s>n||((s>i||isNaN(i))&&(i=s),(o<n||isNaN(n))&&(n=o),p>=0?(a=(e.min.z-h.z)*p,l=(e.max.z-h.z)*p):(a=(e.max.z-h.z)*p,l=(e.min.z-h.z)*p),i>l||a>n)||((a>i||i!==i)&&(i=a),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,Qi)!==null}intersectTriangle(e,t,i,n,s){let o=this.origin,a=this.direction,l=a.x,c=a.y,f=a.z,p=e.x-o.x,h=e.y-o.y,d=e.z-o.z,x=t.x-o.x,S=t.y-o.y,m=t.z-o.z,u=i.x-o.x,y=i.y-o.y,R=i.z-o.z,M=Math.abs(l),T=Math.abs(c),b=Math.abs(f),C,_,E,P,N,F,z,D,V,W,X,re;if(M>=T&&M>=b?(E=l,F=p,V=x,re=u,l>=0?(C=c,_=f,P=h,N=d,z=S,D=m,W=y,X=R):(C=f,_=c,P=d,N=h,z=m,D=S,W=R,X=y)):T>=b?(E=c,F=h,V=S,re=y,c>=0?(C=f,_=l,P=d,N=p,z=m,D=x,W=R,X=u):(C=l,_=f,P=p,N=d,z=x,D=m,W=u,X=R)):(E=f,F=d,V=m,re=R,f>=0?(C=l,_=c,P=p,N=h,z=x,D=S,W=u,X=y):(C=c,_=l,P=h,N=p,z=S,D=x,W=y,X=u)),E===0)return null;let Z=C/E,ee=_/E,ie=1/E,Pe=P-Z*F,we=N-ee*F,ft=z-Z*V,Ze=D-ee*V,Qe=W-Z*re,K=X-ee*re,j=Qe*Ze-K*ft,Me=Pe*K-we*Qe,Fe=ft*we-Ze*Pe;if(n){if(j<0||Me<0||Fe<0)return null}else if((j<0||Me<0||Fe<0)&&(j>0||Me>0||Fe>0))return null;let xe=j+Me+Fe;if(xe===0)return null;let He=ie*(j*F+Me*V+Fe*re);return(xe>0?He<0:He>0)?null:this.at(He/xe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};var Si=class extends St{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gt,this.combine=or,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Eh=new De,Ur=new pi,Xo=new Ht,Th=new A,qo=new A,Yo=new A,Zo=new A,wl=new A,Ko=new A,Ah=new A,Jo=new A,at=class extends rt{constructor(e=new Ve,t=new Si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=n.length;s<o;s++){let a=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(n,e);let a=this.morphTargetInfluences;if(s&&a){Ko.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let f=a[l],p=s[l];f!==0&&(wl.fromBufferAttribute(p,e),o?Ko.addScaledVector(wl,f):Ko.addScaledVector(wl.sub(t),f))}t.add(Ko)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xo.copy(i.boundingSphere),Xo.applyMatrix4(s),Ur.copy(e.ray).recast(e.near),!(Xo.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(Xo,Th)===null||Ur.origin.distanceToSquared(Th)>(e.far-e.near)**2))&&(Eh.copy(s).invert(),Ur.copy(e.ray).applyMatrix4(Eh),!(i.boundingBox!==null&&Ur.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ur)))}_computeIntersections(e,t,i){let n,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,S=h.length;x<S;x++){let m=h[x],u=o[m.materialIndex],y=Math.max(m.start,d.start),R=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,T=R;M<T;M+=3){let b=a.getX(M),C=a.getX(M+1),_=a.getX(M+2);n=Qo(this,u,e,i,c,f,p,b,C,_),n&&(n.faceIndex=Math.floor(M/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{let x=Math.max(0,d.start),S=Math.min(a.count,d.start+d.count);for(let m=x,u=S;m<u;m+=3){let y=a.getX(m),R=a.getX(m+1),M=a.getX(m+2);n=Qo(this,o,e,i,c,f,p,y,R,M),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,S=h.length;x<S;x++){let m=h[x],u=o[m.materialIndex],y=Math.max(m.start,d.start),R=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,T=R;M<T;M+=3){let b=M,C=M+1,_=M+2;n=Qo(this,u,e,i,c,f,p,b,C,_),n&&(n.faceIndex=Math.floor(M/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{let x=Math.max(0,d.start),S=Math.min(l.count,d.start+d.count);for(let m=x,u=S;m<u;m+=3){let y=m,R=m+1,M=m+2;n=Qo(this,o,e,i,c,f,p,y,R,M),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}};function ym(r,e,t,i,n,s,o,a){let l;if(e.side===vt?l=i.intersectTriangle(o,s,n,!0,a):l=i.intersectTriangle(n,s,o,e.side===ci,a),l===null)return null;Jo.copy(a),Jo.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(Jo);return c<t.near||c>t.far?null:{distance:c,point:Jo.clone(),object:r}}function Qo(r,e,t,i,n,s,o,a,l,c){r.getVertexPosition(a,qo),r.getVertexPosition(l,Yo),r.getVertexPosition(c,Zo);let f=ym(r,e,t,i,qo,Yo,Zo,Ah);if(f){let p=new A;Ni.getBarycoord(Ah,qo,Yo,Zo,p),n&&(f.uv=Ni.getInterpolatedAttribute(n,a,l,c,p,new Y)),s&&(f.uv1=Ni.getInterpolatedAttribute(s,a,l,c,p,new Y)),o&&(f.normal=Ni.getInterpolatedAttribute(o,a,l,c,p,new A),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new A,materialIndex:0};Ni.getNormal(qo,Yo,Zo,h.normal),f.face=h,f.barycoord=p}return f}var mr=class extends it{constructor(e=null,t=1,i=1,n,s,o,a,l,c=ot,f=ot,p,h){super(null,o,a,l,c,f,n,s,p,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ys=class extends Dt{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}};var Fn=new De,wh=new De,$o=[],Rh=new oi,bm=new De,Zs=new at,Ks=new Ht,jo=class extends at{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ys(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,bm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new oi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Fn),Rh.copy(e.boundingBox).applyMatrix4(Fn),this.boundingBox.union(Rh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ht),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Fn),Ks.copy(e.boundingSphere).applyMatrix4(Fn),this.boundingSphere.union(Ks)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=n[o+a]}raycast(e,t){let i=this.matrixWorld,n=this.count;if(Zs.geometry=this.geometry,Zs.material=this.material,Zs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ks.copy(this.boundingSphere),Ks.applyMatrix4(i),e.ray.intersectsSphere(Ks)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,Fn),wh.multiplyMatrices(i,Fn),Zs.matrixWorld=wh,Zs.raycast(e,$o);for(let o=0,a=$o.length;o<a;o++){let l=$o[o];l.instanceId=s,l.object=this,t.push(l)}$o.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ys(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new mr(new Float32Array(n*this.count),n,this.count,rn,wt));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=n*e;return s[l]=a,s.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}};var Nr=new Ht,Em=new Y(.5,.5),ea=new A,Fi=class{constructor(e=new Kt,t=new Kt,i=new Kt,n=new Kt,s=new Kt,o=new Kt){this.planes=[e,t,i,n,s,o]}set(e,t,i,n,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(n),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ti,i=!1){let n=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],f=s[4],p=s[5],h=s[6],d=s[7],x=s[8],S=s[9],m=s[10],u=s[11],y=s[12],R=s[13],M=s[14],T=s[15];if(n[0].setComponents(c-o,d-f,u-x,T-y).normalize(),n[1].setComponents(c+o,d+f,u+x,T+y).normalize(),n[2].setComponents(c+a,d+p,u+S,T+R).normalize(),n[3].setComponents(c-a,d-p,u-S,T-R).normalize(),i)n[4].setComponents(l,h,m,M).normalize(),n[5].setComponents(c-l,d-h,u-m,T-M).normalize();else if(n[4].setComponents(c-l,d-h,u-m,T-M).normalize(),t===ti)n[5].setComponents(c+l,d+h,u+m,T+M).normalize();else if(t===Wi)n[5].setComponents(l,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Nr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nr)}intersectsSprite(e){Nr.center.set(0,0,0);let t=Em.distanceTo(e.center);return Nr.radius=.7071067811865476+t,Nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nr)}intersectsSphere(e){let t=this.planes,i=e.center,n=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let n=t[i];if(ea.x=n.normal.x>0?e.max.x:e.min.x,ea.y=n.normal.y>0?e.max.y:e.min.y,ea.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(ea)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var On=class extends St{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new de(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}};var ra=new A,na=new A,Ch=new De,Js=new pi,ta=new Ht,Rl=new A,Ph=new A,Bn=class extends rt{constructor(e=new Ve,t=new On){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let n=1,s=t.count;n<s;n++)ra.fromBufferAttribute(t,n-1),na.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=ra.distanceTo(na);e.setAttribute("lineDistance",new Ne(i,1))}else me("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ta.copy(i.boundingSphere),ta.applyMatrix4(n),ta.radius+=s,e.ray.intersectsSphere(ta)===!1)return;Ch.copy(n).invert(),Js.copy(e.ray).applyMatrix4(Ch);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,f=i.index,h=i.attributes.position;if(f!==null){let d=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let S=d,m=x-1;S<m;S+=c){let u=f.getX(S),y=f.getX(S+1),R=ia(this,e,Js,l,u,y,S);R&&t.push(R)}if(this.isLineLoop){let S=f.getX(x-1),m=f.getX(d),u=ia(this,e,Js,l,S,m,x-1);u&&t.push(u)}}else{let d=Math.max(0,o.start),x=Math.min(h.count,o.start+o.count);for(let S=d,m=x-1;S<m;S+=c){let u=ia(this,e,Js,l,S,S+1,S);u&&t.push(u)}if(this.isLineLoop){let S=ia(this,e,Js,l,x-1,d,x-1);S&&t.push(S)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=n.length;s<o;s++){let a=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function ia(r,e,t,i,n,s,o){let a=r.geometry.attributes.position;if(ra.fromBufferAttribute(a,n),na.fromBufferAttribute(a,s),t.distanceSqToSegment(ra,na,Rl,Ph)>i)return;Rl.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Rl);if(!(c<e.near||c>e.far))return{distance:c,point:Ph.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}var sa=class extends Bn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}};var Gn=class extends St{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}};var Lh=new De,Cl=new pi,oa=new Ht,aa=new A,la=class extends rt{constructor(e=new Ve,t=new Gn){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),oa.copy(i.boundingSphere),oa.applyMatrix4(n),oa.radius+=s,e.ray.intersectsSphere(oa)===!1)return;Lh.copy(n).invert(),Cl.copy(e.ray).applyMatrix4(Lh);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,p=i.attributes.position;if(c!==null){let h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let x=h,S=d;x<S;x++){let m=c.getX(x);aa.fromBufferAttribute(p,m),Dh(aa,m,l,n,e,t,this)}}else{let h=Math.max(0,o.start),d=Math.min(p.count,o.start+o.count);for(let x=h,S=d;x<S;x++)aa.fromBufferAttribute(p,x),Dh(aa,x,l,n,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=n.length;s<o;s++){let a=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Dh(r,e,t,i,n,s,o){let a=Cl.distanceSqToPoint(r);if(a<t){let l=new A;Cl.closestPointToPoint(r,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var zn=class extends it{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=ot,this.minFilter=ot,this.generateMipmaps=!1,this.needsUpdate=!0}};var Vn=class extends it{constructor(e=[],t=_i,i,n,s,o,a,l,c,f){super(e,t,i,n,s,o,a,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var ca=class extends it{constructor(e,t,i,n,s,o,a,l,c){super(e,t,i,n,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ri=class extends it{constructor(e,t,i=Ot,n,s,o,a=ot,l=ot,c,f=ei,p=1){if(f!==ei&&f!==bi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:p};super(h,n,s,o,a,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new hr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}};var ha=class extends Ri{constructor(e,t=Ot,i=_i,n,s,o=ot,a=ot,l,c=ei){let f={width:e,height:e,depth:1},p=[f,f,f,f,f,f];super(e,e,t,i,n,s,o,a,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}};var Hn=class extends it{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var gr=class r extends Ve{constructor(e=1,t=1,i=1,n=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:s,depthSegments:o};let a=this;n=Math.floor(n),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],f=[],p=[],h=0,d=0;x("z","y","x",-1,-1,i,t,e,o,s,0),x("z","y","x",1,-1,i,t,-e,o,s,1),x("x","z","y",1,1,e,i,t,n,o,2),x("x","z","y",1,-1,e,i,-t,n,o,3),x("x","y","z",1,-1,e,t,i,n,s,4),x("x","y","z",-1,-1,e,t,-i,n,s,5),this.setIndex(l),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(f,3)),this.setAttribute("uv",new Ne(p,2));function x(S,m,u,y,R,M,T,b,C,_,E){let P=M/C,N=T/_,F=M/2,z=T/2,D=b/2,V=C+1,W=_+1,X=0,re=0,Z=new A;for(let ee=0;ee<W;ee++){let ie=ee*N-z;for(let Pe=0;Pe<V;Pe++){let we=Pe*P-F;Z[S]=we*y,Z[m]=ie*R,Z[u]=D,c.push(Z.x,Z.y,Z.z),Z[S]=0,Z[m]=0,Z[u]=b>0?1:-1,f.push(Z.x,Z.y,Z.z),p.push(Pe/C),p.push(1-ee/_),X+=1}}for(let ee=0;ee<_;ee++)for(let ie=0;ie<C;ie++){let Pe=h+ie+V*ee,we=h+ie+V*(ee+1),ft=h+(ie+1)+V*(ee+1),Ze=h+(ie+1)+V*ee;l.push(Pe,we,Ze),l.push(we,ft,Ze),re+=6}a.addGroup(d,re,E),d+=re,h+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Pl=class r extends Ve{constructor(e=1,t=1,i=1,n=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;n=Math.floor(n),s=Math.floor(s);let f=[],p=[],h=[],d=[],x=0,S=[],m=i/2,u=0;y(),o===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(f),this.setAttribute("position",new Ne(p,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(d,2));function y(){let M=new A,T=new A,b=0,C=(t-e)/i;for(let _=0;_<=s;_++){let E=[],P=_/s,N=P*(t-e)+e;for(let F=0;F<=n;F++){let z=F/n,D=z*l+a,V=Math.sin(D),W=Math.cos(D);T.x=N*V,T.y=-P*i+m,T.z=N*W,p.push(T.x,T.y,T.z),M.set(V,C,W).normalize(),h.push(M.x,M.y,M.z),d.push(z,1-P),E.push(x++)}S.push(E)}for(let _=0;_<n;_++)for(let E=0;E<s;E++){let P=S[E][_],N=S[E+1][_],F=S[E+1][_+1],z=S[E][_+1];(e>0||E!==0)&&(f.push(P,N,z),b+=3),(t>0||E!==s-1)&&(f.push(N,F,z),b+=3)}c.addGroup(u,b,0),u+=b}function R(M){let T=x,b=new Y,C=new A,_=0,E=M===!0?e:t,P=M===!0?1:-1;for(let F=1;F<=n;F++)p.push(0,m*P,0),h.push(0,P,0),d.push(.5,.5),x++;let N=x;for(let F=0;F<=n;F++){let D=F/n*l+a,V=Math.cos(D),W=Math.sin(D);C.x=E*W,C.y=m*P,C.z=E*V,p.push(C.x,C.y,C.z),h.push(0,P,0),b.x=V*.5+.5,b.y=W*.5*P+.5,d.push(b.x,b.y),x++}for(let F=0;F<n;F++){let z=T+F,D=N+F;M===!0?f.push(D,D+1,z):f.push(D+1,D,z),_+=3}c.addGroup(u,_,M===!0?1:2),u+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var kn=class r extends Ve{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};let s=[],o=[];a(n),c(i),f(),this.setAttribute("position",new Ne(s,3)),this.setAttribute("normal",new Ne(s.slice(),3)),this.setAttribute("uv",new Ne(o,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let R=new A,M=new A,T=new A;for(let b=0;b<t.length;b+=3)d(t[b+0],R),d(t[b+1],M),d(t[b+2],T),l(R,M,T,y)}function l(y,R,M,T){let b=T+1,C=[];for(let _=0;_<=b;_++){C[_]=[];let E=y.clone().lerp(M,_/b),P=R.clone().lerp(M,_/b),N=b-_;for(let F=0;F<=N;F++)F===0&&_===b?C[_][F]=E:C[_][F]=E.clone().lerp(P,F/N)}for(let _=0;_<b;_++)for(let E=0;E<2*(b-_)-1;E++){let P=Math.floor(E/2);E%2===0?(h(C[_][P+1]),h(C[_+1][P]),h(C[_][P])):(h(C[_][P+1]),h(C[_+1][P+1]),h(C[_+1][P]))}}function c(y){let R=new A;for(let M=0;M<s.length;M+=3)R.x=s[M+0],R.y=s[M+1],R.z=s[M+2],R.normalize().multiplyScalar(y),s[M+0]=R.x,s[M+1]=R.y,s[M+2]=R.z}function f(){let y=new A;for(let R=0;R<s.length;R+=3){y.x=s[R+0],y.y=s[R+1],y.z=s[R+2];let M=m(y)/2/Math.PI+.5,T=u(y)/Math.PI+.5;o.push(M,1-T)}x(),p()}function p(){for(let y=0;y<o.length;y+=6){let R=o[y+0],M=o[y+2],T=o[y+4],b=Math.max(R,M,T),C=Math.min(R,M,T);b>.9&&C<.1&&(R<.2&&(o[y+0]+=1),M<.2&&(o[y+2]+=1),T<.2&&(o[y+4]+=1))}}function h(y){s.push(y.x,y.y,y.z)}function d(y,R){let M=y*3;R.x=e[M+0],R.y=e[M+1],R.z=e[M+2]}function x(){let y=new A,R=new A,M=new A,T=new A,b=new Y,C=new Y,_=new Y;for(let E=0,P=0;E<s.length;E+=9,P+=6){y.set(s[E+0],s[E+1],s[E+2]),R.set(s[E+3],s[E+4],s[E+5]),M.set(s[E+6],s[E+7],s[E+8]),b.set(o[P+0],o[P+1]),C.set(o[P+2],o[P+3]),_.set(o[P+4],o[P+5]),T.copy(y).add(R).add(M).divideScalar(3);let N=m(T);S(b,P+0,y,N),S(C,P+2,R,N),S(_,P+4,M,N)}}function S(y,R,M,T){T<0&&y.x===1&&(o[R]=y.x-1),M.x===0&&M.z===0&&(o[R]=T/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function u(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.detail)}};var Ll=class r extends kn{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,n=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}};var Ol={};Hp(Ol,{ArcCurve:()=>fa,CatmullRomCurve3:()=>Qs,CubicBezierCurve:()=>ua,CubicBezierCurve3:()=>da,EllipseCurve:()=>Fr,LineCurve:()=>pa,LineCurve3:()=>ma,QuadraticBezierCurve:()=>ga,QuadraticBezierCurve3:()=>Wn,SplineCurve:()=>_a});var Ct=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){me("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,n=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(n),t.push(s),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),n=0,s=i.length,o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(n=Math.floor(a+(l-a)/2),c=i[n]-o,c<0)a=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===o)return n/(s-1);let f=i[n],h=i[n+1]-f,d=(o-f)/h;return(n+d)/(s-1)}getTangent(e,t){let n=e-1e-4,s=e+1e-4;n<0&&(n=0),s>1&&(s=1);let o=this.getPoint(n),a=this.getPoint(s),l=t||(o.isVector2?new Y:new A);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new A,n=[],s=[],o=[],a=new A,l=new De;for(let d=0;d<=e;d++){let x=d/e;n[d]=this.getTangentAt(x,new A)}s[0]=new A,o[0]=new A;let c=Number.MAX_VALUE,f=Math.abs(n[0].x),p=Math.abs(n[0].y),h=Math.abs(n[0].z);f<=c&&(c=f,i.set(1,0,0)),p<=c&&(c=p,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(n[0],i).normalize(),s[0].crossVectors(n[0],a),o[0].crossVectors(n[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(n[d-1],n[d]),a.length()>Number.EPSILON){a.normalize();let x=Math.acos(Ie(n[d-1].dot(n[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,x))}o[d].crossVectors(n[d],s[d])}if(t===!0){let d=Math.acos(Ie(s[0].dot(s[e]),-1,1));d/=e,n[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let x=1;x<=e;x++)s[x].applyMatrix4(l.makeRotationAxis(n[x],d*x)),o[x].crossVectors(n[x],s[x])}return{tangents:n,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};var Fr=class extends Ct{constructor(e=0,t=0,i=1,n=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Y){let i=t,n=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=n;for(;s>n;)s-=n;s<Number.EPSILON&&(o?s=0:s=n),this.aClockwise===!0&&!o&&(s===n?s=-n:s=s-n);let a=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),h=l-this.aX,d=c-this.aY;l=h*f-d*p+this.aX,c=h*p+d*f+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}};var fa=class extends Fr{constructor(e,t,i,n,s,o){super(e,t,i,i,n,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Nl(){let r=0,e=0,t=0,i=0;function n(s,o,a,l){r=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){n(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,f,p){let h=(o-s)/c-(a-s)/(c+f)+(a-o)/f,d=(a-o)/f-(l-o)/(f+p)+(l-a)/p;h*=f,d*=f,n(o,a,h,d)},calc:function(s){let o=s*s,a=o*s;return r+e*s+t*o+i*a}}}var Ih=new A,Uh=new A,Dl=new Nl,Il=new Nl,Ul=new Nl,Qs=class extends Ct{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new A){let i=t,n=this.points,s=n.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,f;this.closed||a>0?c=n[(a-1)%s]:(Uh.subVectors(n[0],n[1]).add(n[0]),c=Uh);let p=n[a%s],h=n[(a+1)%s];if(this.closed||a+2<s?f=n[(a+2)%s]:(Ih.subVectors(n[s-1],n[s-2]).add(n[s-1]),f=Ih),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,x=Math.pow(c.distanceToSquared(p),d),S=Math.pow(p.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(f),d);S<1e-4&&(S=1),x<1e-4&&(x=S),m<1e-4&&(m=S),Dl.initNonuniformCatmullRom(c.x,p.x,h.x,f.x,x,S,m),Il.initNonuniformCatmullRom(c.y,p.y,h.y,f.y,x,S,m),Ul.initNonuniformCatmullRom(c.z,p.z,h.z,f.z,x,S,m)}else this.curveType==="catmullrom"&&(Dl.initCatmullRom(c.x,p.x,h.x,f.x,this.tension),Il.initCatmullRom(c.y,p.y,h.y,f.y,this.tension),Ul.initCatmullRom(c.z,p.z,h.z,f.z,this.tension));return i.set(Dl.calc(l),Il.calc(l),Ul.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new A().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Fl(r,e,t,i,n){let s=(i-e)*.5,o=(n-t)*.5,a=r*r,l=r*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*r+t}function Tm(r,e){let t=1-r;return t*t*e}function Am(r,e){return 2*(1-r)*r*e}function wm(r,e){return r*r*e}function Or(r,e,t,i){return Tm(r,e)+Am(r,t)+wm(r,i)}function Rm(r,e){let t=1-r;return t*t*t*e}function Cm(r,e){let t=1-r;return 3*t*t*r*e}function Pm(r,e){return 3*(1-r)*r*r*e}function Lm(r,e){return r*r*r*e}function Br(r,e,t,i,n){return Rm(r,e)+Cm(r,t)+Pm(r,i)+Lm(r,n)}var ua=class extends Ct{constructor(e=new Y,t=new Y,i=new Y,n=new Y){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new Y){let i=t,n=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Br(e,n.x,s.x,o.x,a.x),Br(e,n.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}};var da=class extends Ct{constructor(e=new A,t=new A,i=new A,n=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new A){let i=t,n=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Br(e,n.x,s.x,o.x,a.x),Br(e,n.y,s.y,o.y,a.y),Br(e,n.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}};var pa=class extends Ct{constructor(e=new Y,t=new Y){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Y){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Y){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var ma=class extends Ct{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var ga=class extends Ct{constructor(e=new Y,t=new Y,i=new Y){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Y){let i=t,n=this.v0,s=this.v1,o=this.v2;return i.set(Or(e,n.x,s.x,o.x),Or(e,n.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var Wn=class extends Ct{constructor(e=new A,t=new A,i=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new A){let i=t,n=this.v0,s=this.v1,o=this.v2;return i.set(Or(e,n.x,s.x,o.x),Or(e,n.y,s.y,o.y),Or(e,n.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var _a=class extends Ct{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Y){let i=t,n=this.points,s=(n.length-1)*e,o=Math.floor(s),a=s-o,l=n[o===0?o:o-1],c=n[o],f=n[o>n.length-2?n.length-1:o+1],p=n[o>n.length-3?n.length-1:o+2];return i.set(Fl(a,l.x,c.x,f.x,p.x),Fl(a,l.y,c.y,f.y,p.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new Y().fromArray(n))}return this}};var Bl=class r extends kn{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}};var Gr=class r extends Ve{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};let s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(n),c=a+1,f=l+1,p=e/a,h=t/l,d=[],x=[],S=[],m=[];for(let u=0;u<f;u++){let y=u*h-o;for(let R=0;R<c;R++){let M=R*p-s;x.push(M,-y,0),S.push(0,0,1),m.push(R/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let y=0;y<a;y++){let R=y+c*u,M=y+c*(u+1),T=y+1+c*(u+1),b=y+1+c*u;d.push(R,M,b),d.push(M,T,b)}this.setIndex(d),this.setAttribute("position",new Ne(x,3)),this.setAttribute("normal",new Ne(S,3)),this.setAttribute("uv",new Ne(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}};var Gl=class r extends Ve{constructor(e=.5,t=1,i=32,n=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:s,thetaLength:o},i=Math.max(3,i),n=Math.max(1,n);let a=[],l=[],c=[],f=[],p=e,h=(t-e)/n,d=new A,x=new Y;for(let S=0;S<=n;S++){for(let m=0;m<=i;m++){let u=s+m/i*o;d.x=p*Math.cos(u),d.y=p*Math.sin(u),l.push(d.x,d.y,d.z),c.push(0,0,1),x.x=(d.x/t+1)/2,x.y=(d.y/t+1)/2,f.push(x.x,x.y)}p+=h}for(let S=0;S<n;S++){let m=S*(i+1);for(let u=0;u<i;u++){let y=u+m,R=y,M=y+i+1,T=y+i+2,b=y+1;a.push(R,M,b),a.push(M,T,b)}}this.setIndex(a),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(c,3)),this.setAttribute("uv",new Ne(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var zl=class r extends Ve{constructor(e=1,t=32,i=16,n=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,f=[],p=new A,h=new A,d=[],x=[],S=[],m=[];for(let u=0;u<=i;u++){let y=[],R=u/i,M=o+R*a,T=e*Math.cos(M),b=Math.sqrt(e*e-T*T),C=0;u===0&&o===0?C=.5/t:u===i&&l===Math.PI&&(C=-.5/t);for(let _=0;_<=t;_++){let E=_/t,P=n+E*s;p.x=-b*Math.cos(P),p.y=T,p.z=b*Math.sin(P),x.push(p.x,p.y,p.z),h.copy(p).normalize(),S.push(h.x,h.y,h.z),m.push(E+C,1-R),y.push(c++)}f.push(y)}for(let u=0;u<i;u++)for(let y=0;y<t;y++){let R=f[u][y+1],M=f[u][y],T=f[u+1][y],b=f[u+1][y+1];(u!==0||o>0)&&d.push(R,M,b),(u!==i-1||l<Math.PI)&&d.push(M,T,b)}this.setIndex(d),this.setAttribute("position",new Ne(x,3)),this.setAttribute("normal",new Ne(S,3)),this.setAttribute("uv",new Ne(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Vl=class r extends Ve{constructor(e=1,t=.4,i=12,n=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:s,thetaStart:o,thetaLength:a},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],f=[],p=[],h=new A,d=new A,x=new A;for(let S=0;S<=i;S++){let m=o+S/i*a;for(let u=0;u<=n;u++){let y=u/n*s;d.x=(e+t*Math.cos(m))*Math.cos(y),d.y=(e+t*Math.cos(m))*Math.sin(y),d.z=t*Math.sin(m),c.push(d.x,d.y,d.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),x.subVectors(d,h).normalize(),f.push(x.x,x.y,x.z),p.push(u/n),p.push(S/i)}}for(let S=1;S<=i;S++)for(let m=1;m<=n;m++){let u=(n+1)*S+m-1,y=(n+1)*(S-1)+m-1,R=(n+1)*(S-1)+m,M=(n+1)*S+m;l.push(u,y,M),l.push(y,R,M)}this.setIndex(l),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(f,3)),this.setAttribute("uv",new Ne(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Hl=class r extends Ve{constructor(e=new Wn(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),t=64,i=1,n=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:n,closed:s};let o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new A,l=new A,c=new Y,f=new A,p=[],h=[],d=[],x=[];S(),this.setIndex(x),this.setAttribute("position",new Ne(p,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(d,2));function S(){for(let R=0;R<t;R++)m(R);m(s===!1?t:0),y(),u()}function m(R){f=e.getPointAt(R/t,f);let M=o.normals[R],T=o.binormals[R];for(let b=0;b<=n;b++){let C=b/n*Math.PI*2,_=Math.sin(C),E=-Math.cos(C);l.x=E*M.x+_*T.x,l.y=E*M.y+_*T.y,l.z=E*M.z+_*T.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=f.x+i*l.x,a.y=f.y+i*l.y,a.z=f.z+i*l.z,p.push(a.x,a.y,a.z)}}function u(){for(let R=1;R<=t;R++)for(let M=1;M<=n;M++){let T=(n+1)*(R-1)+(M-1),b=(n+1)*R+(M-1),C=(n+1)*R+M,_=(n+1)*(R-1)+M;x.push(T,b,_),x.push(b,C,_)}}function y(){for(let R=0;R<=t;R++)for(let M=0;M<=n;M++)c.x=R/t,c.y=M/n,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new Ol[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function $i(r){let e={};for(let t in r){e[t]={};for(let i in r[t]){let n=r[t][i];if(Nh(n))n.isRenderTargetTexture?(me("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone();else if(Array.isArray(n))if(Nh(n[0])){let s=[];for(let o=0,a=n.length;o<a;o++)s[o]=n[o].clone();e[t][i]=s}else e[t][i]=n.slice();else e[t][i]=n}}return e}function Jt(r){let e={};for(let t=0;t<r.length;t++){let i=$i(r[t]);for(let n in i)e[n]=i[n]}return e}function Nh(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Fh(r){let e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function xa(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ue.workingColorSpace}var Ci={clone:$i,merge:Jt};var Oh=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;var Bh=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;var lt=class extends St{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Oh,this.fragmentShader=Bh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=Fh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let o=this.uniforms[n].value;o&&o.isTexture?t.uniforms[n]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[n]={type:"m4",value:o.toArray()}:t.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new de().setHex(n.value);break;case"v2":this.uniforms[i].value=new Y().fromArray(n.value);break;case"v3":this.uniforms[i].value=new A().fromArray(n.value);break;case"v4":this.uniforms[i].value=new Ye().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Ce().fromArray(n.value);break;case"m4":this.uniforms[i].value=new De().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}};var Pi=class extends lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var va=class extends St{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new de(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ki,this.normalScale=new Y(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ma=class extends St{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new de(16777215),this.specular=new de(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ki,this.normalScale=new Y(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gt,this.combine=or,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Sa=class extends St{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ki,this.normalScale=new Y(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gt,this.combine=or,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var ya=class extends St{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}};var ba=class extends St{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Ea={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(Gh(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!Gh(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function Gh(r){try{let e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var kl=class{constructor(e,t,i){let n=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(f){a++,s===!1&&n.onStart!==void 0&&n.onStart(f,o,a),s=!0},this.itemEnd=function(f){o++,n.onProgress!==void 0&&n.onProgress(f,o,a),o===a&&(s=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(f){n.onError!==void 0&&n.onError(f)},this.resolveURL=function(f){return f=f.normalize("NFC"),l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,p){return c.push(f,p),this},this.removeHandler=function(f){let p=c.indexOf(f);return p!==-1&&c.splice(p,2),this},this.getHandler=function(f){for(let p=0,h=c.length;p<h;p+=2){let d=c[p],x=c[p+1];if(d.global&&(d.lastIndex=0),d.test(f))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},zh=new kl;var zr=class{constructor(e){this.manager=e!==void 0?e:zh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(n,s){i.load(e,n,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};zr.DEFAULT_MATERIAL_NAME="__DEFAULT";var Xn=new WeakMap,Ta=class extends zr{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=Ea.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let p=Xn.get(o);p===void 0&&(p=[],Xn.set(o,p)),p.push({onLoad:t,onError:n})}return o}let a=cr("img");function l(){f(),t&&t(this);let p=Xn.get(this)||[];for(let h=0;h<p.length;h++){let d=p[h];d.onLoad&&d.onLoad(this)}Xn.delete(this),s.manager.itemEnd(e)}function c(p){f(),n&&n(p),Ea.remove(`image:${e}`);let h=Xn.get(this)||[];for(let d=0;d<h.length;d++){let x=h[d];x.onError&&x.onError(p)}Xn.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function f(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Ea.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}};var Aa=class extends zr{constructor(e){super(e)}load(e,t,i,n){let s=new it,o=new Ta(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,n),s}};var _r=class extends rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new de(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var wa=class extends _r{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new de(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}};var Wl=new De,Vh=new A,Hh=new A,Ra=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Y(512,512),this.mapType=gt,this.map=null,this.mapPass=null,this.matrix=new De,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fi,this._frameExtents=new Y(1,1),this._viewportCount=1,this._viewports=[new Ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Vh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Vh),Hh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,n){Wl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Wl,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,o=n?n.z/s.x:1,a=n?n.w/s.y:1,l=n?n.x/s.x:0,c=n?n.y/s.y:0;e.coordinateSystem===Wi||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(Wl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Ca=new A,Pa=new Vt,Oi=new A,qn=class extends rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new De,this.projectionMatrix=new De,this.projectionMatrixInverse=new De,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ca,Pa,Oi),Oi.x===1&&Oi.y===1&&Oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ca,Pa,Oi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ca,Pa,Oi),Oi.x===1&&Oi.y===1&&Oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ca,Pa,Oi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}};var xr=new A,kh=new Y,Wh=new Y,Et=class extends qn{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Cr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(mn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cr*2*Math.atan(Math.tan(mn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){xr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xr.x,xr.y).multiplyScalar(-e/xr.z),xr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(xr.x,xr.y).multiplyScalar(-e/xr.z)}getViewSize(e,t){return this.getViewBounds(e,kh,Wh),t.subVectors(Wh,kh)}setViewOffset(e,t,i,n,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(mn*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,s=-.5*n,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*n/l,t-=o.offsetY*i/c,n*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var La=class extends Ra{constructor(){super(new Et(90,1,.5,500)),this.isPointLightShadow=!0}};var Da=class extends _r{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new La}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}};var ji=class extends qn{constructor(e=-1,t=1,i=1,n=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,s=i-e,o=i+e,a=n+t,l=n-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Ia=class extends _r{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Yn=-90,Zn=1,Ua=class extends rt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new Et(Yn,Zn,e,t);n.layers=this.layers,this.add(n);let s=new Et(Yn,Zn,e,t);s.layers=this.layers,this.add(s);let o=new Et(Yn,Zn,e,t);o.layers=this.layers,this.add(o);let a=new Et(Yn,Zn,e,t);a.layers=this.layers,this.add(a);let l=new Et(Yn,Zn,e,t);l.layers=this.layers,this.add(l);let c=new Et(Yn,Zn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,n,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===ti)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Wi)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,f]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(p,h,d),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}};var Na=class extends Et{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var $s=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Dm.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Dm(){this._document.hidden===!1&&this.reset()}var Xh=new De,Fa=class{constructor(e,t,i=0,n=1/0){this.ray=new pi(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new Ui,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Oe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Xh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xh),this}intersectObject(e,t=!0,i=[]){return Xl(e,this,i,t),i.sort(qh),i}intersectObjects(e,t=!0,i=[]){for(let n=0,s=e.length;n<s;n++)Xl(e[n],this,i,t);return i.sort(qh),i}};function qh(r,e){return r.distance-e.distance}function Xl(r,e,t,i){let n=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(n=!1),n===!0&&i===!0){let s=r.children;for(let o=0,a=s.length;o<a;o++)Xl(s[o],e,t,!0)}}var Oa=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,me("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var Vr=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ie(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ie(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Yh=new Y,js=class{constructor(e=new Y(1/0,1/0),t=new Y(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Yh.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yh).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};var eo=class extends Bt{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function ql(r,e,t,i){let n=Im(i);switch(t){case yo:return r*e;case rn:return r*e/n.components*n.byteLength;case nn:return r*e/n.components*n.byteLength;case hi:return r*e*2/n.components*n.byteLength;case sn:return r*e*2/n.components*n.byteLength;case bo:return r*e*3/n.components*n.byteLength;case Lt:return r*e*4/n.components*n.byteLength;case on:return r*e*4/n.components*n.byteLength;case an:case ln:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case cn:case hn:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case hs:case us:return Math.max(r,16)*Math.max(e,8)/4;case cs:case fs:return Math.max(r,8)*Math.max(e,8)/2;case ds:case ps:case gs:case _s:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ms:case Ar:case xs:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case vs:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ms:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ss:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case ys:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case bs:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Es:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ts:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case As:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case ws:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Rs:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Cs:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Ps:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Ls:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Ds:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Is:case Us:case Ns:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Fs:case Os:return Math.ceil(r/4)*Math.ceil(e/4)*8;case wr:case Bs:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Im(r){switch(r){case gt:case xo:return{byteLength:1,components:1};case Vi:case vo:case _t:return{byteLength:2,components:1};case en:case tn:return{byteLength:2,components:4};case Ot:case jr:case wt:return{byteLength:4,components:1};case Mo:case So:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?me("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Ba(){let r=null,e=!1,t=null,i=null;function n(s,o){i=r.requestAnimationFrame(n),t(s,o)}return{start:function(){e!==!0&&t!==null&&r!==null&&(i=r.requestAnimationFrame(n),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Zh(r){let e=new WeakMap;function t(a,l){let c=a.array,f=a.usage,p=c.byteLength,h=r.createBuffer();r.bindBuffer(l,h),r.bufferData(l,c,f),a.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=r.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:p}}function i(a,l,c){let f=l.array,p=l.updateRanges;if(r.bindBuffer(c,a),p.length===0)r.bufferSubData(c,0,f);else{p.sort((d,x)=>d.start-x.start);let h=0;for(let d=1;d<p.length;d++){let x=p[h],S=p[d];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++h,p[h]=S)}p.length=h+1;for(let d=0,x=p.length;d<x;d++){let S=p[d];r.bufferSubData(c,S.start*f.BYTES_PER_ELEMENT,f,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let f=e.get(a);(!f||f.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:n,remove:s,update:o}}var Kh=`
#ifdef USE_ALPHAHASH

	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;

#endif
`;var Jh=`
#ifdef USE_ALPHAHASH

	/**
	 * See: https://casual-effects.com/research/Wyman2017Hashed/index.html
	 */

	const float ALPHA_HASH_SCALE = 0.05; // Derived from trials only, and may be changed.

	float hash2D( vec2 value ) {

		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );

	}

	float hash3D( vec3 value ) {

		return hash2D( vec2( hash2D( value.xy ), value.z ) );

	}

	float getAlphaHashThreshold( vec3 position ) {

		// Find the discretized derivatives of our coordinates
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );

		// Find two nearest log-discretized noise scales
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);

		// Compute alpha thresholds at our two noise scales
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);

		// Factor to interpolate lerp with
		float lerpFactor = fract( log2( pixScale ) );

		// Interpolate alpha threshold from noise at two scales
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;

		// Pass into CDF to compute uniformly distrib threshold
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);

		// Find our final, uniformly distributed alpha threshold (\u03B1\u03C4)
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;

		// Avoids \u03B1\u03C4 == 0. Could also do \u03B1\u03C4 =1-\u03B1\u03C4
		return clamp( threshold , 1.0e-6, 1.0 );

	}

#endif
`;var Qh=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`;var $h=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var jh=`
#ifdef USE_ALPHATEST

	#ifdef ALPHA_TO_COVERAGE

	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;

	#else

	if ( diffuseColor.a < alphaTest ) discard;

	#endif

#endif
`;var ef=`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`;var tf=`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`;var rf=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`;var nf=`
#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif

	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {

		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );

	}

	float getIndirectIndex( const in int i ) {

		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );

	}

#endif

#ifdef USE_BATCHING_COLOR

	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {

		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );

	}

#endif
`;var sf=`
#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif
`;var of=`
vec3 transformed = vec3( position );

#ifdef USE_ALPHAHASH

	vPosition = vec3( position );

#endif
`;var af=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`;var lf=`

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( specularColor, 1.0, dotVH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

`;var cf=`

#ifdef USE_IRIDESCENCE

	// XYZ to linear-sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	// Assume air interface for top
	// Note: We don't handle the case fresnel0 == 1
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float IorToFresnel0( float transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));

	}

	// Fresnel equations for dielectric/dielectric interfaces.
	// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	// Evaluation XYZ sensitivity curves in Fourier space
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;

		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;

	}

	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;

		// Phase shift
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

#endif

`;var hf=`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );

		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// normalize is done to ensure that the bump map looks the same regardless of the texture's scale
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm; // normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`;var ff=`
#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#ifdef ALPHA_TO_COVERAGE

		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;

		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );

			if ( clipOpacity == 0.0 ) discard;

		}
		#pragma unroll_loop_end

		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

			float unionClipOpacity = 1.0;

			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );

			}
			#pragma unroll_loop_end

			clipOpacity *= 1.0 - unionClipOpacity;

		#endif

		diffuseColor.a *= clipOpacity;

		if ( diffuseColor.a == 0.0 ) discard;

	#else

		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;

		}
		#pragma unroll_loop_end

		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

			bool clipped = true;

			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;

			}
			#pragma unroll_loop_end

			if ( clipped ) discard;

		#endif

	#endif

#endif
`;var uf=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`;var df=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`;var pf=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`;var mf=`
#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#endif
`;var gf=`
#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#endif
`;var _f=`
#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )

	varying vec4 vColor;

#endif
`;var xf=`
#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )

	vColor = vec4( 1.0 );

#endif

#ifdef USE_COLOR_ALPHA

	vColor *= color;

#elif defined( USE_COLOR )

	vColor.rgb *= color;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.rgb *= instanceColor.rgb;

#endif

#ifdef USE_BATCHING_COLOR

	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );

#endif
`;var vf=`
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

	return fract( sin( sn ) * c );

}

#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

#ifdef USE_ALPHAHASH

	varying vec3 vPosition;

#endif

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

#define inverseTransformDirection transformDirectionByInverseViewMatrix // @deprecated r185

vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {

	// upper-left 3x3 of view matrix is assumed to be orthogonal

	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );

}

vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {

	// upper-left 3x3 of view matrix is assumed to be orthogonal

	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );

}

bool isPerspectiveMatrix( mat4 m ) {

	return m[ 2 ][ 3 ] == - 1.0;

}

vec2 equirectUv( in vec3 dir ) {

	// dir is assumed to be unit length

	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;

	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

	return vec2( u, v );

}

vec3 BRDF_Lambert( const in vec3 diffuseColor ) {

	return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated
`;var Mf=`
#ifdef ENVMAP_TYPE_CUBE_UV

	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0

	// These shader functions convert between the UV coordinates of a single face of
	// a cubemap, the 0-5 integer index of a cube face, and the direction vector for
	// sampling a textureCube (not generally normalized ).

	float getFace( vec3 direction ) {

		vec3 absDirection = abs( direction );

		float face = - 1.0;

		if ( absDirection.x > absDirection.z ) {

			if ( absDirection.x > absDirection.y )

				face = direction.x > 0.0 ? 0.0 : 3.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		} else {

			if ( absDirection.z > absDirection.y )

				face = direction.z > 0.0 ? 2.0 : 5.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		}

		return face;

	}

	// RH coordinate system; PMREM face-indexing convention
	vec2 getUV( vec3 direction, float face ) {

		vec2 uv;

		if ( face == 0.0 ) {

			uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

		} else if ( face == 1.0 ) {

			uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

		} else if ( face == 2.0 ) {

			uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

		} else if ( face == 3.0 ) {

			uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

		} else if ( face == 4.0 ) {

			uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

		} else {

			uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

		}

		return 0.5 * ( uv + 1.0 );

	}

	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

		float face = getFace( direction );

		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

		mipInt = max( mipInt, cubeUV_minMipLevel );

		float faceSize = exp2( mipInt );

		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071

		if ( face > 2.0 ) {

			uv.y += faceSize;

			face -= 3.0;

		}

		uv.x += face * faceSize;

		uv.x += filterInt * 3.0 * cubeUV_minTileSize;

		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );

		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;

		#ifdef texture2DGradEXT

			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering

		#else

			return texture2D( envMap, uv ).rgb;

		#endif

	}

	// These defines must match with PMREMGenerator

	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0

	float roughnessToMip( float roughness ) {

		float mip = 0.0;

		if ( roughness >= cubeUV_r1 ) {

			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;

		} else if ( roughness >= cubeUV_r4 ) {

			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;

		} else if ( roughness >= cubeUV_r5 ) {

			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;

		} else if ( roughness >= cubeUV_r6 ) {

			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;

		} else {

			mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
		}

		return mip;

	}

	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );

		float mipF = fract( mip );

		float mipInt = floor( mip );

		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

		if ( mipF == 0.0 ) {

			return vec4( color0, 1.0 );

		} else {

			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

			return vec4( mix( color0, color1, mipF ), 1.0 );

		}

	}

#endif
`;var Sf=`

vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT

	vec3 transformedTangent = objectTangent;

#endif

#ifdef USE_BATCHING

	// this is in lieu of a per-instance normal-matrix
	// non-uniform scaling in the instance matrix is supported
	// shear transforms are not supported

	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = bm * transformedTangent;

	#endif

#endif

#ifdef USE_INSTANCING

	// this is in lieu of a per-instance normal-matrix
	// non-uniform scaling in the instance matrix is supported
	// shear transforms are not supported

	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = im * transformedTangent;

	#endif

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;

#endif
`;var yf=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`;var bf=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`;var Ef=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		emissiveColor = sRGBTransferEOTF( emissiveColor );

	#endif

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`;var Tf=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`;var Af=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`;var wf=`

vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}

vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}

vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

`;var Rf=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vec3 cameraToFrag;

		if ( isOrthographic ) {

			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToFrag = normalize( vWorldPosition - cameraPosition );

		}

		// Transforming Normal Vectors with the Inverse Transformation
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( cameraToFrag, worldNormal );

		#else

			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );

		#endif

	#else

		vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );

		#ifdef ENVMAP_BLENDING_MULTIPLY

			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

		#elif defined( ENVMAP_BLENDING_MIX )

			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

		#elif defined( ENVMAP_BLENDING_ADD )

			outgoingLight += envColor.xyz * specularStrength * reflectivity;

		#endif

	#endif

#endif
`;var Cf=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform mat3 envMapRotation;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif

#endif
`;var Pf=`
#ifdef USE_ENVMAP

	uniform float reflectivity;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif

#endif
`;var Lf=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;

	#else

		varying vec3 vReflect;
		uniform float refractionRatio;

	#endif

#endif
`;var Df=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vWorldPosition = worldPosition.xyz;

	#else

		vec3 cameraToVertex;

		if ( isOrthographic ) {

			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

		}

		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vReflect = reflect( cameraToVertex, worldNormal );

		#else

			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#endif

#endif
`;var If=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`;var Uf=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`;var Nf=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`;var Ff=`
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float vFogDepth;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`;var Of=`

#ifdef USE_GRADIENTMAP

	uniform sampler2D gradientMap;

#endif

vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

	// dotNL will be from -1.0 to 1.0
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

	#ifdef USE_GRADIENTMAP

		return vec3( texture2D( gradientMap, coord ).r );

	#else

		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );

	#endif

}
`;var Bf=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`;var Gf=`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`;var zf=`
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`;var Vf=`
uniform bool receiveShadow;
uniform vec3 ambientLightColor;

#if defined( USE_LIGHT_PROBES )

	uniform vec3 lightProbe[ 9 ];

#endif

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

	// normal is assumed to have unit length

	float x = normal.x, y = normal.y, z = normal.z;

	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;

	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

	return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {

	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );

	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

	return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	return irradiance;

}

float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

	// based upon Frostbite 3 Moving to Physically-based Rendering
	// page 32, equation 26: E[window1]
	// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

	if ( cutoffDistance > 0.0 ) {

		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

	}

	return distanceFalloff;

}

float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

	return smoothstep( coneCosine, penumbraCosine, angleCosine );

}

#if NUM_SUN_LIGHTS > 0

	struct SunLight {
		vec3 direction;
		vec3 color;
	};

	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];

	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {

		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;

	}

#endif


#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {

		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = pointLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float lightDistance = length( lVector );

		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = spotLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float angleCos = dot( light.direction, spotLight.direction );

		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );

		if ( spotAttenuation > 0.0 ) {

			float lightDistance = length( lVector );

			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );

		} else {

			light.color = vec3( 0.0 );
			light.visible = false;

		}

	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {

		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		return irradiance;

	}

#endif

#include <lightprobes_pars_fragment>
`;var Hf=`
#ifdef USE_ENVMAP

	vec3 getIBLIrradiance( const in vec3 normal ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 reflectVec = reflect( - viewDir, normal );

			// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );

			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	#ifdef USE_RETROREFLECTION

		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

			#ifdef ENVMAP_TYPE_CUBE_UV

				// The retroreflective lobe returns light toward its source, so the environment is sampled along the view direction
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );

				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );

				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );

				return envMapColor.rgb * envMapIntensity;

			#else

				return vec3( 0.0 );

			#endif

		}

	#endif

	#ifdef USE_ANISOTROPY

		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

			#ifdef ENVMAP_TYPE_CUBE_UV

			  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

				return getIBLRadiance( viewDir, bentNormal, roughness );

			#else

				return vec3( 0.0 );

			#endif

		}

		#ifdef USE_RETROREFLECTION

			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

				#ifdef ENVMAP_TYPE_CUBE_UV

				  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

					return getIBLRetroRadiance( viewDir, bentNormal, roughness );

				#else

					return vec3( 0.0 );

				#endif

			}

		#endif

	#endif

#endif
`;var kf=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`;var Wf=`
varying vec3 vViewPosition;

struct ToonMaterial {

	vec3 diffuseColor;

};

void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
`;var Xf=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`;var qf=`
varying vec3 vViewPosition;

struct BlinnPhongMaterial {

	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
`;var Yf=`
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;

vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );

#ifdef IOR

	material.ior = ior;

	#ifdef USE_SPECULAR

		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;

		#ifdef USE_SPECULAR_COLORMAP

			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;

		#endif

		#ifdef USE_SPECULAR_INTENSITYMAP

			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;

		#endif

		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );

	#else

		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;

	#endif

	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );

#else

	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;

#endif

#ifdef USE_CLEARCOAT

	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;

	#ifdef USE_CLEARCOATMAP

		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;

	#endif

	#ifdef USE_CLEARCOAT_ROUGHNESSMAP

		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;

	#endif

	material.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model
	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );

#endif

#ifdef USE_DISPERSION

	material.dispersion = dispersion;

#endif

#ifdef USE_RETROREFLECTION

	material.retroreflectivity = retroreflectivity;

#endif

#ifdef USE_IRIDESCENCE

	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;

	#ifdef USE_IRIDESCENCEMAP

		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;

	#endif

	#ifdef USE_IRIDESCENCE_THICKNESSMAP

		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;

	#else

		material.iridescenceThickness = iridescenceThicknessMaximum;

	#endif

#endif

#ifdef USE_SHEEN

	material.sheenColor = sheenColor;

	#ifdef USE_SHEEN_COLORMAP

		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;

	#endif

	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );

	#ifdef USE_SHEEN_ROUGHNESSMAP

		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;

	#endif

#endif

#ifdef USE_ANISOTROPY

	#ifdef USE_ANISOTROPYMAP

		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;

	#else

		vec2 anisotropyV = anisotropyVector;

	#endif

	material.anisotropy = length( anisotropyV );

	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}

	// Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );

	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;

#endif
`;var Zf=`

uniform sampler2D dfgLUT;

struct PhysicalMaterial {

	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;

	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;

	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif

	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif

	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif

	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif

	#ifdef IOR
		float ior;
	#endif

	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif

	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif

};

// temporary
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );

vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );

    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

	return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney\u2019s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

	float a2 = pow2( alpha );

	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

	return RECIPROCAL_PI * a2 / pow2( denom );

}

// https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf
#ifdef USE_ANISOTROPY

	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {

		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );

	}

	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {

		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;

		return RECIPROCAL_PI * a2 * pow2 ( w2 );

	}

#endif

#ifdef USE_CLEARCOAT

	// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {

		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;

		float alpha = pow2( roughness ); // UE4's roughness

		vec3 halfDir = normalize( lightDir + viewDir );

		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );

		vec3 F = F_Schlick( f0, f90, dotVH );

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

		return F * ( V * D );

	}

#endif

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {

	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( f0, f90, dotVH );

	#ifdef USE_IRIDESCENCE

		F = mix( F, material.iridescenceFresnel, material.iridescence );

	#endif

	#ifdef USE_ANISOTROPY

		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );

		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );

		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );

	#else

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

	#endif

	return F * ( V * D );

}

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	float dotNV = saturate( dot( N, V ) );

	// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

	uv = uv * LUT_SCALE + LUT_BIAS;

	return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

	// Real-Time Area Lighting: a Journey from Research to Production (p.102)
	// An approximation of the form factor of a horizon-clipped rectangle.

	float l = length( f );

	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

	float x = dot( v1, v2 );

	float y = abs( x );

	// rational polynomial approximation to theta / sin( theta ) / 2PI
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;

	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

	return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

	// bail if point is on back side of plane of light
	// assumes ccw winding order of light vertices
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );

	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

	// construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

	// compute transform
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );

	// transform rect
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

	// project rect onto sphere
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );

	// calculate vector form factor
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

	// adjust for horizon clipping
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
	// alternate method of adjusting for horizon clipping (see reference)
	// refactoring required
	float len = length( vectorFormFactor );
	float z = vectorFormFactor.z / len;

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	// tabulated horizon-clipped sphere, apparently...
	vec2 uv = vec2( z * 0.5 + 0.5, len );
	uv = uv * LUT_SCALE + LUT_BIAS;

	float scale = texture2D( ltc_2, uv ).w;

	float result = len * scale;
*/

	return vec3( result );

}

// End Rect Area Light

#if defined( USE_SHEEN )

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float D_Charlie( float roughness, float dotNH ) {

	float alpha = pow2( roughness );

	// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16

	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );

}

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float V_Neubelt( float dotNV, float dotNL ) {

	// Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );

}

vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );

	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );

	return sheenColor * ( D * V );

}

#endif

// This is a curve-fit approximation to the "Charlie sheen" BRDF integrated over the hemisphere from
// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF".
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );

	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;

	float DG = exp( a * dotNV + b );

	return saturate( DG );

}

vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;

	return specularColor * fab.x + specularF90 * fab.y;

}

// Fdez-Ag\xFCera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif

	#ifdef USE_IRIDESCENCE

		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );

	#else

		vec3 Fr = specularColor;

	#endif

	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;

	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;

	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21
	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

	singleScatter += FssEss;
	multiScatter += Fms * Ems;

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

		#ifdef USE_CLEARCOAT

			vec3 Ncc = geometryClearcoatNormal;

			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );

			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );

			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);

			// LTC Fresnel Approximation for clearcoat
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;

			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );

		#endif

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifdef USE_CLEARCOAT

		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );

		vec3 ccIrradiance = dotNLcc * directLight.color;

		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );

	#endif

	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif

	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );

	#ifdef USE_RETROREFLECTION

		// Minimal Retroreflective Microfacet Model:
		// https://jcgt.org/published/0015/01/04/
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );

		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );

	#endif

	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;

	// Light reflected by the specular interface is not available to the diffuse layer ( glTF fresnel_mix )
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );

	#ifdef USE_RETROREFLECTION

		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );

		F = mix( F, retroF, saturate( material.retroreflectivity ) );

	#endif

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	// Energy reflected by the specular lobe is not available to the diffuse layer
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );

	#ifdef USE_IRIDESCENCE

		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );

	#else

		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );

	#endif

	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );

	#ifdef USE_SHEEN

		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );

		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;

		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;

		diffuse *= sheenEnergyComp;

	#endif

	reflectedLight.indirectDiffuse += diffuse;

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifdef USE_CLEARCOAT

		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;

 	#endif

	// Both indirect specular and indirect diffuse light accumulate here
	// Compute multiscattering separately for dielectric and metallic, then mix

	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );

	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );

	#ifdef USE_IRIDESCENCE

		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );

	#else

		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );

	#endif

	// Mix based on metalness
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );

	// Diffuse energy conservation uses dielectric path
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );

	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;

	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;

	#ifdef USE_SHEEN

		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );

		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;

		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;

	#endif

	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`;var Kf=`
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometryViewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );

		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );

		// Iridescence F0 approximation
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );

	}

#endif

#ifdef STANDARD

	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );

	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;

	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )

		// Multi-scattering energy compensation for direct lighting
		// Based on "Practical Multiple Scattering Compensation for Microfacet Models"
		// https://blog.selfshadow.com/publications/turquin/ms_comp_final.pdf

		// Energy of the single-scattering lobe in a white furnace ( F0 = F90 = 1 )
		float EssMs = material.dfg.x + material.dfg.y;

		// Compensate for the energy lost to multiple scattering, tinting the added term by F0 ( equation 16 )
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );

	#endif

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )

	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {

		sunLight = sunLights[ i ];

		getSunLightInfo( sunLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

	#ifdef USE_LIGHT_PROBES_GRID

		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`;var Jf=`
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )

		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )

			iblIrradiance += getIBLIrradiance( geometryNormal );

		#endif

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	#ifdef USE_ANISOTROPY

		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );

	#else

		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );

	#endif

	#ifdef USE_RETROREFLECTION

		#ifdef USE_ANISOTROPY

			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );

		#else

			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );

		#endif

		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );

	#endif

	radiance += iblRadiance;

	#ifdef USE_CLEARCOAT

		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );

	#endif

#endif
`;var Qf=`
#if defined( RE_IndirectDiffuse )

	#if defined( LAMBERT ) || defined( PHONG )

		irradiance += iblIrradiance;

	#endif

	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif
`;var $f=`
#ifdef USE_LIGHT_PROBES_GRID

// Single atlas 3D texture that stores all 7 SH sub-volumes stacked along Z.
// Atlas depth = 7 * ( nz + 2 ) where nz = probesResolution.z.
// Each sub-volume occupies ( nz + 2 ) slices: 1 padding + nz data + 1 padding.
// Padding is a copy of the first / last data slice and prevents color bleeding
// when the hardware linear filter reads across a sub-volume boundary.
uniform highp sampler3D probesSH;

uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;

vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {

	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;

	// Offset sample position along normal by half a probe spacing
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );

	// Remap to texel centers of the probe grid (XY and Z)
	uvw = uvw * resMinusOne / res + 0.5 / res;

	// Atlas UV mapping along Z:
	//   paddedSlices = nz + 2  (1 padding texel at each end of every sub-volume)
	//   atlasDepth   = 7 * paddedSlices
	//   For sub-volume t the first DATA texel sits at atlas slice t*paddedSlices + 1.
	//   Given probe-grid texel-centre UVZ = ( iz + 0.5 ) / nz the atlas UV is:
	//     atlasUvZ = ( uvw.z * nz + t * paddedSlices + 1 ) / atlasDepth
	//
	// uvZBase encodes the nz-scaled Z plus the intra-volume offset (+ 1 for padding),
	// so adding t*paddedSlices steps to each successive sub-volume.
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;

	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );

	// Unpack 9 vec3 SH L2 coefficients
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;

	// Evaluate L2 irradiance
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;

	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );

	return max( result, vec3( 0.0 ) );

}

#endif
`;var jf=`
#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`;var eu=`
#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`;var tu=`
#ifdef USE_LOGARITHMIC_DEPTH_BUFFER

	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`;var iu=`
#ifdef USE_LOGARITHMIC_DEPTH_BUFFER

	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

#endif
`;var ru=`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vMapUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );

	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`;var nu=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`;var su=`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	#if defined( USE_POINTS_UV )

		vec2 uv = vUv;

	#else

		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

	#endif

#endif

#ifdef USE_MAP

	diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`;var ou=`
#if defined( USE_POINTS_UV )

	varying vec2 vUv;

#else

	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

		uniform mat3 uvTransform;

	#endif

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var au=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`;var lu=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`;var cu=`
#ifdef USE_INSTANCING_MORPH

	float morphTargetInfluences[ MORPHTARGETS_COUNT ];

	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;

	}
#endif
`;var hu=`
#if defined( USE_MORPHCOLORS )

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	vColor *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		#if defined( USE_COLOR_ALPHA )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];

		#elif defined( USE_COLOR )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];

		#endif

	}

#endif
`;var fu=`
#ifdef USE_MORPHNORMALS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	objectNormal *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];

	}

#endif
`;var uu=`
#ifdef USE_MORPHTARGETS

	#ifndef USE_INSTANCING_MORPH

		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];

	#endif

	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;

	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {

		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;

		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );

	}

#endif
`;var du=`
#ifdef USE_MORPHTARGETS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	transformed *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];

	}

#endif
`;var pu=`
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal *= faceDirection;

	#endif

#endif

#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )

	#ifdef USE_TANGENT

		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);

	#endif

	#ifdef DOUBLE_SIDED

		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;

	#endif

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	#ifdef USE_TANGENT

		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

	#endif

	#ifdef DOUBLE_SIDED

		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 nonPerturbedNormal = normal;

`;var mu=`

#ifdef USE_NORMALMAP_OBJECTSPACE

	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

	#ifdef FLIP_SIDED

		normal = - normal;

	#endif

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	normal = normalize( normalMatrix * normal );

#elif defined( USE_NORMALMAP_TANGENTSPACE )

	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;

	#if defined( USE_PACKED_NORMALMAP )

		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );

	#endif

	mapN.xy *= normalScale;

	normal = normalize( tbn * mapN );

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`;var gu=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var _u=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var xu=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

		#ifdef FLIP_SIDED

			vBitangent = - vBitangent;

		#endif

	#endif

#endif
`;var vu=`
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

#endif

#ifdef USE_NORMALMAP_OBJECTSPACE

	uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )

	// Normal Mapping Without Precomputed Tangents
	// http://www.thetenthplanet.de/archives/1180

	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );

		vec3 N = surf_norm; // normalized

		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );

		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;

		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

		return mat3( T * scale, B * scale, N );

	}

#endif
`;var Mu=`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = nonPerturbedNormal;

#endif
`;var Su=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`;var yu=`

#ifdef USE_CLEARCOATMAP

	uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform sampler2D clearcoatRoughnessMap;

#endif
`;var bu=`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`;var Eu=`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`;var Tu=`
vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)
const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;

const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );

const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );

vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}

vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	// the 0.9999 tweak is unimportant, very tiny empirical improvement
	// return vec3( vuf * Inv255, gf * PackUpscale, bf * 0.9999 );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}

vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}

float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}

float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}

float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}

vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}

vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( viewZ + near ) / ( near - far );
}

float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {

	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;

	#else

		return depth * ( near - far ) - near;

	#endif
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER

		return ( near * far ) / ( ( near - far ) * depth - near );

	#else

		return ( near * far ) / ( ( far - near ) * depth - far );

	#endif
}
`;var Au=`
#ifdef PREMULTIPLIED_ALPHA

	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`;var wu=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_BATCHING

	mvPosition = batchingMatrix * mvPosition;

#endif

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`;var Ru=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`;var Cu=`
#ifdef DITHERING

	// based on https://www.shadertoy.com/view/MslGR8
	vec3 dithering( vec3 color ) {
		//Calculate grid position
		float grid_position = rand( gl_FragCoord.xy );

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

		//modify shift according to grid position.
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

		//shift the color by dither_shift
		return color + dither_shift_RGB;
	}

#endif
`;var Pu=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`;var Lu=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`;var Du=`
#if NUM_SPOT_LIGHT_COORDS > 0

	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#if NUM_SPOT_LIGHT_MAPS > 0

	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_SUN_LIGHT_SHADOWS > 0

		// must match the cascade count in SunLightShadow

		#define SUN_LIGHT_CASCADES 2

		#if defined( SHADOWMAP_TYPE_PCF )

			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];

		#else

			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];

		#endif

		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;

		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];

	#endif

	#if NUM_DIR_LIGHT_SHADOWS > 0

		#if defined( SHADOWMAP_TYPE_PCF )

			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];

		#else

			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];

		#endif

		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		#if defined( SHADOWMAP_TYPE_PCF )

			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

		#else

			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

		#endif

		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		#if defined( SHADOWMAP_TYPE_PCF )

			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];

		#elif defined( SHADOWMAP_TYPE_BASIC )

			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];

		#endif

		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	#if defined( SHADOWMAP_TYPE_PCF )

		// Interleaved Gradient Noise for randomizing sampling patterns
		float interleavedGradientNoise( vec2 position ) {

			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );

		}

		// Vogel disk sampling for uniform circular distribution
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {

			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;

		}

	#endif

	#if defined( SHADOWMAP_TYPE_PCF )

		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

			float shadow = 1.0;

			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;

			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

			if ( frustumTest ) {

				// Hardware PCF with LinearFilter gives us 4-tap filtering per sample
				// 5 samples using Vogel disk + IGN = effectively 20 filtered taps with better distribution
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;

				// Use IGN to rotate sampling pattern per pixel
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;

				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;

			}

			return mix( 1.0, shadow, shadowIntensity );

		}

	#elif defined( SHADOWMAP_TYPE_VSM )

		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

			float shadow = 1.0;

			shadowCoord.xyz /= shadowCoord.w;

			#ifdef USE_REVERSED_DEPTH_BUFFER

				shadowCoord.z -= shadowBias;

			#else

				shadowCoord.z += shadowBias;

			#endif

			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

			if ( frustumTest ) {

				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;

				float mean = distribution.x;
				float variance = distribution.y * distribution.y;

				#ifdef USE_REVERSED_DEPTH_BUFFER

					float hard_shadow = step( mean, shadowCoord.z );

				#else

					float hard_shadow = step( shadowCoord.z, mean );

				#endif
				
				// Early return if fully lit
				if ( hard_shadow == 1.0 ) {

					shadow = 1.0;

				} else {

					// Variance must be non-zero to avoid division by zero
					variance = max( variance, 0.0000001 );

					// Distance from mean
					float d = shadowCoord.z - mean;

					// Chebyshev's inequality for upper bound on probability
					float p_max = variance / ( variance + d * d );

					// Reduce light bleeding by remapping [amount, 1] to [0, 1]
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );

					shadow = max( hard_shadow, p_max );

				}

			}

			return mix( 1.0, shadow, shadowIntensity );

		}

	#else // SHADOWMAP_TYPE_BASIC

		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

			float shadow = 1.0;

			shadowCoord.xyz /= shadowCoord.w;

			#ifdef USE_REVERSED_DEPTH_BUFFER

				shadowCoord.z -= shadowBias;

			#else

				shadowCoord.z += shadowBias;

			#endif

			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

			if ( frustumTest ) {

				float depth = texture2D( shadowMap, shadowCoord.xy ).r;

				#ifdef USE_REVERSED_DEPTH_BUFFER

					shadow = step( depth, shadowCoord.z );

				#else

					shadow = step( shadowCoord.z, depth );

				#endif

			}

			return mix( 1.0, shadow, shadowIntensity );

		}

	#endif

	#if NUM_SUN_LIGHT_SHADOWS > 0

		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {

			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;

			float shadow = 1.0;

			// walk the cascades back to front so each fade band can blend with the shadow behind it

			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {

				// ( begin, end, fade start ) view depths of the cascade

				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];

				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {

					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);

					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );

				}

			}

			return shadow;

		}

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	#if defined( SHADOWMAP_TYPE_PCF )

	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		float shadow = 1.0;

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;

		// Direction from light to fragment
		vec3 bd3D = normalize( lightToPosition );

		// For cube shadow maps, depth is stored as distance along each face's view axis, not radial distance
		// The view-space depth is the maximum component of the direction vector (which face is sampled)
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );

		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {

			// viewZ to perspective depth

			#ifdef USE_REVERSED_DEPTH_BUFFER

				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;

			#else

				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;

			#endif

			// Hardware PCF with LinearFilter gives us 4-tap filtering per sample
			// Use Vogel disk + IGN sampling for better quality
			float texelSize = shadowRadius / shadowMapSize.x;

			// Build a tangent-space coordinate system for applying offsets
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );

			// Use IGN to rotate sampling pattern per pixel
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;

			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );

			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;

		}

		return mix( 1.0, shadow, shadowIntensity );

	}

	#elif defined( SHADOWMAP_TYPE_BASIC )

	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		float shadow = 1.0;

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;

		// For cube shadow maps, depth is stored as distance along each face's view axis, not radial distance
		// The view-space depth is the maximum component of the direction vector (which face is sampled)
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );

		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {

			// viewZ to perspective depth

			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;

			// Direction from light to fragment
			vec3 bd3D = normalize( lightToPosition );

			float depth = textureCube( shadowMap, bd3D ).r;

			#ifdef USE_REVERSED_DEPTH_BUFFER

				depth = 1.0 - depth;

			#endif

			shadow = step( dp, depth );

		}

		return mix( 1.0, shadow, shadowIntensity );

	}

	#endif

	#endif

#endif
`;var Iu=`

#if NUM_SPOT_LIGHT_COORDS > 0

	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_SUN_LIGHT_SHADOWS > 0

		// cascade selection and shadow coordinates are computed per fragment

		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;

	#endif

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): uniforms for area light shadows

	#endif
	*/

#endif
`;var Uu=`

#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )

	#ifdef HAS_NORMAL

		// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.

		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );

	#else

		vec3 shadowWorldNormal = vec3( 0.0 ); // fallback, see #21483

	#endif

	vec4 shadowWorldPosition;

#endif

#if defined( USE_SHADOWMAP )

	#if NUM_SUN_LIGHT_SHADOWS > 0

		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;

	#endif

	#if NUM_DIR_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update vAreaShadowCoord with area light info

	#endif
	*/

#endif

// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)

#if NUM_SPOT_LIGHT_COORDS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {

		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

#endif


`;var Nu=`
float getShadowMask() {

	float shadow = 1.0;

	#ifdef USE_SHADOWMAP

	#if NUM_SUN_LIGHT_SHADOWS > 0

	SunLightShadow sunLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {

		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_DIR_LIGHT_SHADOWS > 0

	DirectionalLightShadow directionalLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	SpotLightShadow spotLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )

	PointLightShadow pointLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update shadow for Area light

	#endif
	*/

	#endif

	return shadow;

}
`;var Fu=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`;var Ou=`
#ifdef USE_SKINNING

	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;

	uniform highp sampler2D boneTexture;

	mat4 getBoneMatrix( const in float i ) {

		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );

		return mat4( v1, v2, v3, v4 );

	}

#endif
`;var Bu=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`;var Gu=`
#ifdef USE_SKINNING

	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

	#ifdef USE_TANGENT

		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#endif

#endif
`;var zu=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`;var Vu=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`;var Hu=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`;var ku=`
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return saturate( toneMappingExposure * color );

}

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 CineonToneMapping( vec3 color ) {

	// filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);

	color *= toneMappingExposure / 0.6;

	color = ACESInputMat * color;

	// Apply RRT and ODT
	color = RRTAndODTFit( color );

	color = ACESOutputMat * color;

	// Clamp to [0, 1]
	return saturate( color );

}

// Matrices for rec 2020 <> rec 709 color space conversion
// matrix provided in row-major order so it has been transposed
// https://www.itu.int/pub/R-REP-BT.2407-2017
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);

const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);

// https://iolite-engine.com/blog_posts/minimal_agx_implementation
// Mean error^2: 3.6705141e-06
vec3 agxDefaultContrastApprox( vec3 x ) {

	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;

	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;

}

// AgX Tone Mapping implementation based on Filament, which in turn is based
// on Blender's implementation using rec 2020 primaries
// https://github.com/google/filament/pull/7236
// Inputs and outputs are encoded as Linear-sRGB.

vec3 AgXToneMapping( vec3 color ) {

	// AgX constants
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);

	// explicit AgXOutsetMatrix generated from Filaments AgXOutsetMatrixInv
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);

	// LOG2_MIN      = -10.0
	// LOG2_MAX      =  +6.5
	// MIDDLE_GRAY   =  0.18
	const float AgxMinEv = - 12.47393;  // log2( pow( 2, LOG2_MIN ) * MIDDLE_GRAY )
	const float AgxMaxEv = 4.026069;    // log2( pow( 2, LOG2_MAX ) * MIDDLE_GRAY )

	color *= toneMappingExposure;

	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;

	color = AgXInsetMatrix * color;

	// Log2 encoding
	color = max( color, 1e-10 ); // avoid 0 or negative numbers for log2
	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );

	color = clamp( color, 0.0, 1.0 );

	// Apply sigmoid
	color = agxDefaultContrastApprox( color );

	// Apply AgX look
	// v = agxLook(v, look);

	color = AgXOutsetMatrix * color;

	// Linearize
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );

	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;

	// Gamut mapping. Simple clamp for now.
	color = clamp( color, 0.0, 1.0 );

	return color;

}

// https://modelviewer.dev/examples/tone-mapping

vec3 NeutralToneMapping( vec3 color ) {

	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;

	color *= toneMappingExposure;

	float x = min( color.r, min( color.g, color.b ) );

	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;

	color -= offset;

	float peak = max( color.r, max( color.g, color.b ) );

	if ( peak < StartCompression ) return color;

	float d = 1. - StartCompression;

	float newPeak = 1. - d * d / ( peak + d - StartCompression );

	color *= newPeak / peak;

	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );

	return mix( color, vec3( newPeak ), g );

}

vec3 CustomToneMapping( vec3 color ) { return color; }
`;var Wu=`
#ifdef USE_TRANSMISSION

	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;

	#endif

	#ifdef USE_THICKNESSMAP

		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;

	#endif

	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );

	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );

	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );

	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );

#endif
`;var Xu=`
#ifdef USE_TRANSMISSION

	// Transmission code is based on glTF-Sampler-Viewer
	// https://github.com/KhronosGroup/glTF-Sample-Viewer

	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		uniform sampler2D transmissionMap;

	#endif

	#ifdef USE_THICKNESSMAP

		uniform sampler2D thicknessMap;

	#endif

	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;

	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;

	varying vec3 vWorldPosition;

	// Mipped Bicubic Texture Filtering by N8
	// https://www.shadertoy.com/view/Dl2SDW

	float w0( float a ) {

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );

	}

	float w1( float a ) {

		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );

	}

	float w2( float a ){

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );

	}

	float w3( float a ) {

		return ( 1.0 / 6.0 ) * ( a * a * a );

	}

	// g0 and g1 are the two amplitude functions
	float g0( float a ) {

		return w0( a ) + w1( a );

	}

	float g1( float a ) {

		return w2( a ) + w3( a );

	}

	// h0 and h1 are the two offset functions
	float h0( float a ) {

		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );

	}

	float h1( float a ) {

		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );

	}

	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {

		uv = uv * texelSize.zw + 0.5;

		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );

		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );

		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;

		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );

	}

	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {

		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );

	}

	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {

		// Direction of refracted light.
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );

		// Compute rotation-independent scaling of the model matrix.
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );

		// The thickness is specified in local space.
		return normalize( refractionVector ) * thickness * modelScale;

	}

	float applyIorToRoughness( const in float roughness, const in float ior ) {

		// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
		// an IOR of 1.5 results in the default amount of microfacet refraction.
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );

	}

	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {

		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );

	}

	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {

		if ( isinf( attenuationDistance ) ) {

			// Attenuation distance is +\u221E, i.e. the transmitted color is not attenuated at all.
			return vec3( 1.0 );

		} else {

			// Compute light attenuation using Beer's law.
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
			return transmittance;

		}

	}

	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {

		vec4 transmittedLight;
		vec3 transmittance;

		#ifdef USE_DISPERSION

			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );

			for ( int i = 0; i < 3; i ++ ) {

				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;

				// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;

				// Sample framebuffer to get pixel the refracted ray hits.
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;

				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];

			}

			transmittedLight.a /= 3.0;

		#else

			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;

			// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;

			// Sample framebuffer to get pixel the refracted ray hits.
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );

		#endif

		vec3 attenuatedColor = transmittance * transmittedLight.rgb;

		// Get the specular component.
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );

		// As less light is transmitted, the opacity should be increased. This simple approximation does a decent job
		// of modulating a CSS background, and has no effect when the buffer is opaque, due to a solid object or clear color.
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;

		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );

	}
#endif
`;var qu=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	varying vec2 vNormalMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_SPECULARMAP

	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`;var Yu=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`;var Zu=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	vUv = vec3( uv, 1 ).xy;

#endif
#ifdef USE_MAP

	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ALPHAMAP

	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_LIGHTMAP

	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_AOMAP

	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_BUMPMAP

	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_NORMALMAP

	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_EMISSIVEMAP

	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_METALNESSMAP

	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ROUGHNESSMAP

	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ANISOTROPYMAP

	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOATMAP

	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULARMAP

	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_THICKNESSMAP

	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;

#endif
`;var Ku=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_BATCHING

		worldPosition = batchingMatrix * worldPosition;

	#endif

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`;var Ju=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,Qu=`
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures

		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var $u=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,ju=`

#ifdef ENVMAP_TYPE_CUBE

	uniform samplerCube envMap;

#elif defined( ENVMAP_TYPE_CUBE_UV )

	uniform sampler2D envMap;

#endif

uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	#ifdef ENVMAP_TYPE_CUBE

		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );

	#elif defined( ENVMAP_TYPE_CUBE_UV )

		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );

	#else

		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var ed=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,td=`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var id=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vHighPrecisionZW = gl_Position.zw;

}
`,rd=`
#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z

	#ifdef USE_REVERSED_DEPTH_BUFFER

		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];

	#else

		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;

	#endif

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		// TODO Deprecate
		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#elif DEPTH_PACKING == 3202

		// TODO Deprecate
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );

	#elif DEPTH_PACKING == 3203

		// TODO Deprecate
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );

	#endif

}
`;var nd=`
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>

	vWorldPosition = worldPosition.xyz;

}
`,sd=`
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );

}
`;var od=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,ad=`
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV = equirectUv( direction );

	gl_FragColor = texture2D( tEquirect, sampleUV );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var ld=`
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	vLineDistance = scale * lineDistance;

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,cd=`
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var hd=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}
`,fd=`
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var ud=`
#define LAMBERT

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,dd=`
#define LAMBERT

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var pd=`
#define MATCAP

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

	vViewPosition = - mvPosition.xyz;

}
`,md=`
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );

	#else

		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var gd=`
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	vViewPosition = - mvPosition.xyz;

#endif

}
`,_d=`
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );

	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );

	#ifdef OPAQUE

		gl_FragColor.a = 1.0;

	#endif

}
`;var xd=`
#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,vd=`
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Md=`
#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`,Sd=`
#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
	uniform float ior;
#endif

#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif

	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif

#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif

#ifdef USE_DISPERSION
	uniform float dispersion;
#endif

#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif

#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;

	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif

#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;

	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif

	#ifdef USE_CLEARCOAT

		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );

		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;

	#endif

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var yd=`
#define TOON

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,bd=`
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Ed=`
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_POINTS_UV

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif

void main() {

	#ifdef USE_POINTS_UV

		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	#endif

	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
`,Td=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var Ad=`
#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,wd=`
uniform vec3 color;
uniform float opacity;

#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	#include <logdepthbuf_fragment>

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var Rd=`
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	vec4 mvPosition = modelViewMatrix[ 3 ];

	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );

	#ifndef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;

	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,Cd=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`;var Ge={alphahash_fragment:Kh,alphahash_pars_fragment:Jh,alphamap_fragment:Qh,alphamap_pars_fragment:$h,alphatest_fragment:jh,alphatest_pars_fragment:ef,aomap_fragment:tf,aomap_pars_fragment:rf,batching_pars_vertex:nf,batching_vertex:sf,begin_vertex:of,beginnormal_vertex:af,bsdfs:lf,iridescence_fragment:cf,bumpmap_pars_fragment:hf,clipping_planes_fragment:ff,clipping_planes_pars_fragment:uf,clipping_planes_pars_vertex:df,clipping_planes_vertex:pf,color_fragment:mf,color_pars_fragment:gf,color_pars_vertex:_f,color_vertex:xf,common:vf,cube_uv_reflection_fragment:Mf,defaultnormal_vertex:Sf,displacementmap_pars_vertex:yf,displacementmap_vertex:bf,emissivemap_fragment:Ef,emissivemap_pars_fragment:Tf,colorspace_fragment:Af,colorspace_pars_fragment:wf,envmap_fragment:Rf,envmap_common_pars_fragment:Cf,envmap_pars_fragment:Pf,envmap_pars_vertex:Lf,envmap_physical_pars_fragment:Hf,envmap_vertex:Df,fog_vertex:If,fog_pars_vertex:Uf,fog_fragment:Nf,fog_pars_fragment:Ff,gradientmap_pars_fragment:Of,lightmap_pars_fragment:Bf,lights_lambert_fragment:Gf,lights_lambert_pars_fragment:zf,lights_pars_begin:Vf,lights_toon_fragment:kf,lights_toon_pars_fragment:Wf,lights_phong_fragment:Xf,lights_phong_pars_fragment:qf,lights_physical_fragment:Yf,lights_physical_pars_fragment:Zf,lights_fragment_begin:Kf,lights_fragment_maps:Jf,lights_fragment_end:Qf,lightprobes_pars_fragment:$f,logdepthbuf_fragment:jf,logdepthbuf_pars_fragment:eu,logdepthbuf_pars_vertex:tu,logdepthbuf_vertex:iu,map_fragment:ru,map_pars_fragment:nu,map_particle_fragment:su,map_particle_pars_fragment:ou,metalnessmap_fragment:au,metalnessmap_pars_fragment:lu,morphinstance_vertex:cu,morphcolor_vertex:hu,morphnormal_vertex:fu,morphtarget_pars_vertex:uu,morphtarget_vertex:du,normal_fragment_begin:pu,normal_fragment_maps:mu,normal_pars_fragment:gu,normal_pars_vertex:_u,normal_vertex:xu,normalmap_pars_fragment:vu,clearcoat_normal_fragment_begin:Mu,clearcoat_normal_fragment_maps:Su,clearcoat_pars_fragment:yu,iridescence_pars_fragment:bu,opaque_fragment:Eu,packing:Tu,premultiplied_alpha_fragment:Au,project_vertex:wu,dithering_fragment:Ru,dithering_pars_fragment:Cu,roughnessmap_fragment:Pu,roughnessmap_pars_fragment:Lu,shadowmap_pars_fragment:Du,shadowmap_pars_vertex:Iu,shadowmap_vertex:Uu,shadowmask_pars_fragment:Nu,skinbase_vertex:Fu,skinning_pars_vertex:Ou,skinning_vertex:Bu,skinnormal_vertex:Gu,specularmap_fragment:zu,specularmap_pars_fragment:Vu,tonemapping_fragment:Hu,tonemapping_pars_fragment:ku,transmission_fragment:Wu,transmission_pars_fragment:Xu,uv_pars_fragment:qu,uv_pars_vertex:Yu,uv_vertex:Zu,worldpos_vertex:Ku,background_vert:Ju,background_frag:Qu,backgroundCube_vert:$u,backgroundCube_frag:ju,cube_vert:ed,cube_frag:td,depth_vert:id,depth_frag:rd,distance_vert:nd,distance_frag:sd,equirect_vert:od,equirect_frag:ad,linedashed_vert:ld,linedashed_frag:cd,meshbasic_vert:hd,meshbasic_frag:fd,meshlambert_vert:ud,meshlambert_frag:dd,meshmatcap_vert:pd,meshmatcap_frag:md,meshnormal_vert:gd,meshnormal_frag:_d,meshphong_vert:xd,meshphong_frag:vd,meshphysical_vert:Md,meshphysical_frag:Sd,meshtoon_vert:yd,meshtoon_frag:bd,points_vert:Ed,points_frag:Td,shadow_vert:Ad,shadow_frag:wd,sprite_vert:Rd,sprite_frag:Cd};var se={common:{diffuse:{value:new de(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ce},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ce}},envmap:{envMap:{value:null},envMapRotation:{value:new Ce},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ce},normalScale:{value:new Y(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new de(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new A},probesMax:{value:new A},probesResolution:{value:new A}},points:{diffuse:{value:new de(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0},uvTransform:{value:new Ce}},sprite:{diffuse:{value:new de(16777215)},opacity:{value:1},center:{value:new Y(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ce},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0}}};var ai={basic:{uniforms:Jt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Jt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new de(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Jt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new de(0)},specular:{value:new de(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Jt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new de(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Jt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new de(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Jt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Jt([se.points,se.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Jt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Jt([se.common,se.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Jt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Jt([se.sprite,se.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ce}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Jt([se.common,se.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Jt([se.lights,se.fog,{color:{value:new de(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};ai.physical={uniforms:Jt([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ce},clearcoatNormalScale:{value:new Y(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ce},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ce},sheen:{value:0},sheenColor:{value:new de(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ce},transmissionSamplerSize:{value:new Y},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ce},attenuationDistance:{value:0},attenuationColor:{value:new de(0)},specularColor:{value:new de(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ce},anisotropyVector:{value:new Y},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ce}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};var Ga={r:0,b:0,g:0},Qm=new De,Pd=new Ce;Pd.set(-1,0,0,0,1,0,0,0,1);function Ld(r,e,t,i,n,s){let o=new de(0),a=n===!0?0:1,l,c,f=null,p=0,h=null;function d(y){let R=y.isScene===!0?y.background:null;if(R&&R.isTexture){let M=y.backgroundBlurriness>0;R=e.get(R,M)}return R}function x(y){let R=!1,M=d(y);M===null?m(o,a):M&&M.isColor&&(m(M,1),R=!0);let T=r.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function S(y,R){let M=d(R);M&&(M.isCubeTexture||M.mapping===ar)?(c===void 0&&(c=new at(new gr(1,1,1),new lt({name:"BackgroundCubeMaterial",uniforms:$i(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Qm.makeRotationFromEuler(R.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Pd),c.material.toneMapped=Ue.getTransfer(M.colorSpace)!==ke,(f!==M||p!==M.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,f=M,p=M.version,h=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new at(new Gr(2,2),new lt({name:"BackgroundMaterial",uniforms:$i(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=Ue.getTransfer(M.colorSpace)!==ke,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||p!==M.version||h!==r.toneMapping)&&(l.material.needsUpdate=!0,f=M,p=M.version,h=r.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,R){y.getRGB(Ga,xa(r)),t.buffers.color.setClear(Ga.r,Ga.g,Ga.b,R,s)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,R=1){o.set(y),a=R,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:x,addToRenderList:S,dispose:u}}function Dd(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),i={},n=h(null),s=n,o=!1;function a(N,F,z,D,V){let W=!1,X=p(N,D,z,F);s!==X&&(s=X,c(s.object)),W=d(N,D,z,V),W&&x(N,D,z,V),V!==null&&e.update(V,r.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,M(N,F,z,D),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return r.createVertexArray()}function c(N){return r.bindVertexArray(N)}function f(N){return r.deleteVertexArray(N)}function p(N,F,z,D){let V=D.wireframe===!0,W=i[F.id];W===void 0&&(W={},i[F.id]=W);let X=N.isInstancedMesh===!0?N.id:0,re=W[X];re===void 0&&(re={},W[X]=re);let Z=re[z.id];Z===void 0&&(Z={},re[z.id]=Z);let ee=Z[V];return ee===void 0&&(ee=h(l()),Z[V]=ee),ee}function h(N){let F=[],z=[],D=[];for(let V=0;V<t;V++)F[V]=0,z[V]=0,D[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:D,object:N,attributes:{},index:null}}function d(N,F,z,D){let V=s.attributes,W=F.attributes,X=0,re=z.getAttributes();for(let Z in re)if(re[Z].location>=0){let ie=V[Z],Pe=W[Z];if(Pe===void 0&&(Z==="instanceMatrix"&&N.instanceMatrix&&(Pe=N.instanceMatrix),Z==="instanceColor"&&N.instanceColor&&(Pe=N.instanceColor)),ie===void 0||ie.attribute!==Pe||Pe&&ie.data!==Pe.data)return!0;X++}return s.attributesNum!==X||s.index!==D}function x(N,F,z,D){let V={},W=F.attributes,X=0,re=z.getAttributes();for(let Z in re)if(re[Z].location>=0){let ie=W[Z];ie===void 0&&(Z==="instanceMatrix"&&N.instanceMatrix&&(ie=N.instanceMatrix),Z==="instanceColor"&&N.instanceColor&&(ie=N.instanceColor));let Pe={};Pe.attribute=ie,ie&&ie.data&&(Pe.data=ie.data),V[Z]=Pe,X++}s.attributes=V,s.attributesNum=X,s.index=D}function S(){let N=s.newAttributes;for(let F=0,z=N.length;F<z;F++)N[F]=0}function m(N){u(N,0)}function u(N,F){let z=s.newAttributes,D=s.enabledAttributes,V=s.attributeDivisors;z[N]=1,D[N]===0&&(r.enableVertexAttribArray(N),D[N]=1),V[N]!==F&&(r.vertexAttribDivisor(N,F),V[N]=F)}function y(){let N=s.newAttributes,F=s.enabledAttributes;for(let z=0,D=F.length;z<D;z++)F[z]!==N[z]&&(r.disableVertexAttribArray(z),F[z]=0)}function R(N,F,z,D,V,W,X){X===!0?r.vertexAttribIPointer(N,F,z,V,W):r.vertexAttribPointer(N,F,z,D,V,W)}function M(N,F,z,D){S();let V=D.attributes,W=z.getAttributes(),X=F.defaultAttributeValues;for(let re in W){let Z=W[re];if(Z.location>=0){let ee=V[re];if(ee===void 0&&(re==="instanceMatrix"&&N.instanceMatrix&&(ee=N.instanceMatrix),re==="instanceColor"&&N.instanceColor&&(ee=N.instanceColor)),ee!==void 0){let ie=ee.normalized,Pe=ee.itemSize,we=e.get(ee);if(we===void 0)continue;let ft=we.buffer,Ze=we.type,Qe=we.bytesPerElement,K=Ze===r.INT||Ze===r.UNSIGNED_INT||ee.gpuType===jr;if(ee.isInterleavedBufferAttribute){let j=ee.data,Me=j.stride,Fe=ee.offset;if(j.isInstancedInterleavedBuffer){for(let xe=0;xe<Z.locationSize;xe++)u(Z.location+xe,j.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let xe=0;xe<Z.locationSize;xe++)m(Z.location+xe);r.bindBuffer(r.ARRAY_BUFFER,ft);for(let xe=0;xe<Z.locationSize;xe++)R(Z.location+xe,Pe/Z.locationSize,Ze,ie,Me*Qe,(Fe+Pe/Z.locationSize*xe)*Qe,K)}else{if(ee.isInstancedBufferAttribute){for(let j=0;j<Z.locationSize;j++)u(Z.location+j,ee.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let j=0;j<Z.locationSize;j++)m(Z.location+j);r.bindBuffer(r.ARRAY_BUFFER,ft);for(let j=0;j<Z.locationSize;j++)R(Z.location+j,Pe/Z.locationSize,Ze,ie,Pe*Qe,Pe/Z.locationSize*j*Qe,K)}}else if(X!==void 0){let ie=X[re];if(ie!==void 0)switch(ie.length){case 2:r.vertexAttrib2fv(Z.location,ie);break;case 3:r.vertexAttrib3fv(Z.location,ie);break;case 4:r.vertexAttrib4fv(Z.location,ie);break;default:r.vertexAttrib1fv(Z.location,ie)}}}}y()}function T(){E();for(let N in i){let F=i[N];for(let z in F){let D=F[z];for(let V in D){let W=D[V];for(let X in W)f(W[X].object),delete W[X];delete D[V]}}delete i[N]}}function b(N){if(i[N.id]===void 0)return;let F=i[N.id];for(let z in F){let D=F[z];for(let V in D){let W=D[V];for(let X in W)f(W[X].object),delete W[X];delete D[V]}}delete i[N.id]}function C(N){for(let F in i){let z=i[F];for(let D in z){let V=z[D];if(V[N.id]===void 0)continue;let W=V[N.id];for(let X in W)f(W[X].object),delete W[X];delete V[N.id]}}}function _(N){for(let F in i){let z=i[F],D=N.isInstancedMesh===!0?N.id:0,V=z[D];if(V!==void 0){for(let W in V){let X=V[W];for(let re in X)f(X[re].object),delete X[re];delete V[W]}delete z[D],Object.keys(z).length===0&&delete i[F]}}}function E(){P(),o=!0,s!==n&&(s=n,c(s.object))}function P(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:a,reset:E,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:S,enableAttribute:m,disableUnusedAttributes:y}}function Id(r,e,t){let i;function n(l){i=l}function s(l,c){r.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,f){f!==0&&(r.drawArraysInstanced(i,l,c,f),t.update(c,i,f))}function a(l,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let h=0;for(let d=0;d<f;d++)h+=c[d];t.update(h,i,1)}this.setMode=n,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function Ud(r,e,t,i){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(C){return!(C!==Lt&&i.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let _=C===_t&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==gt&&C!==wt&&!_&&i.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",f=l(c);f!==c&&(me("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);let p=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&me("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),u=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),R=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),T=r.getParameter(r.MAX_SAMPLES),b=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:y,maxVaryings:R,maxFragmentUniforms:M,maxSamples:T,samples:b}}function Nd(r){let e=this,t=null,i=0,n=!1,s=!1,o=new Kt,a=new Ce,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){let d=p.length!==0||h||i!==0||n;return n=h,i=p.length,d},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,h){t=f(p,h,0)},this.setState=function(p,h,d){let x=p.clippingPlanes,S=p.clipIntersection,m=p.clipShadows,u=r.get(p);if(!n||x===null||x.length===0||s&&!m)s?f(null):c();else{let y=s?0:i,R=y*4,M=u.clippingState||null;l.value=M,M=f(x,h,R,d);for(let T=0;T!==R;++T)M[T]=t[T];u.clippingState=M,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(p,h,d,x){let S=p!==null?p.length:0,m=null;if(S!==0){if(m=l.value,x!==!0||m===null){let u=d+S*4,y=h.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<u)&&(m=new Float32Array(u));for(let R=0,M=d;R!==S;++R,M+=4)o.copy(p[R]).applyMatrix4(y,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}var Jn=4,$m=6,jm=20,eg=256,to=new ji,Fd=new de,Zl=null,Kl=0,Jl=0,Ql=!1,tg=new A,Hr=new A,io=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,n=100,s={}){let{size:o=256,position:a=tg}=s;Zl=this._renderer.getRenderTarget(),Kl=this._renderer.getActiveCubeFace(),Jl=this._renderer.getActiveMipmapLevel(),Ql=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,n,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Zl,Kl,Jl),this._renderer.xr.enabled=Ql,e.scissorTest=!1,Kn(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_i||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zl=this._renderer.getRenderTarget(),Kl=this._renderer.getActiveCubeFace(),Jl=this._renderer.getActiveMipmapLevel(),Ql=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Mt,minFilter:Mt,generateMipmaps:!1,type:_t,format:Lt,colorSpace:lr,depthBuffer:!1},n=Od(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Od(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ig(s)),this._blurMaterial=ng(s,e,t),this._ggxMaterial=rg(s,e,t)}return n}_compileMaterial(e){let t=new at(new Ve,e);this._renderer.compile(t,to)}_sceneToCubeUV(e,t,i,n,s){let l=new Et(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],p=this._renderer,h=p.autoClear,d=p.toneMapping;p.getClearColor(Fd),p.toneMapping=Xt,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(n),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new at(new gr,new Si({name:"PMREM.Background",side:vt,depthWrite:!1,depthTest:!1})));let S=this._backgroundBox,m=S.material,u=!1,y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,u=!0):(m.color.copy(Fd),u=!0);for(let R=0;R<6;R++){let M=R%3;M===0?(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[R],s.y,s.z)):M===1?(l.up.set(0,0,c[R]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[R],s.z)):(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[R]));let T=this._cubeSize;Kn(n,M*T,R>2?T:0,T,T),p.setRenderTarget(n),u&&p.render(S,l),p.render(e,l)}p.toneMapping=d,p.autoClear=h,e.background=y}_textureToCubeUV(e,t){let i=this._renderer,n=e.mapping===_i||e.mapping===zi;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bd());let s=n?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;Kn(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,to)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let n=this._lodMeshes.length;for(let s=1;s<n;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let n=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let l=o.uniforms,c=i/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),p=Math.sqrt(c*c-f*f),h=c*1.25,d=p*h,{_lodMax:x}=this,S=this._sizeLods[i],m=3*S*(i>x-Jn?i-x+Jn:0),u=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=x-t,Kn(s,m,u,3*S,2*S),n.setRenderTarget(s),n.render(a,to),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=x-i,Kn(e,m,u,3*S,2*S),n.setRenderTarget(e),n.render(a,to)}_blur(e,t,i,n){let s=this._pingPongRenderTarget,o=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,o),this._blurPass(s,e,i,i,o)}_blurPass(e,t,i,n,s){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[n];l.material=a;let c=a.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;let f=this._sizeLods[n],p=3*f*(n>this._lodMax-Jn?n-this._lodMax+Jn:0),h=4*(this._cubeSize-f);Kn(t,p,h,3*f,2*f),o.setRenderTarget(t),o.render(l,to)}};function ig(r){let e=[],t=[],i=r,n=r-Jn+1+$m;for(let s=0;s<n;s++){let o=Math.pow(2,i);e.push(o);let a=1/(o-2),l=-a,c=1+a,f=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,h=6,d=3,x=new Float32Array(d*h*p),S=new Float32Array(d*h*p);for(let u=0;u<p;u++){let y=u%3*2/3-1,R=u>2?0:-1,M=[y,R,0,y+2/3,R,0,y+2/3,R+1,0,y,R,0,y+2/3,R+1,0,y,R+1,0];x.set(M,d*h*u);for(let T=0;T<h;T++){let b=f[T*2]*2-1,C=f[T*2+1]*2-1;u===0?Hr.set(1,C,b):u===1?Hr.set(-b,1,-C):u===2?Hr.set(-b,C,1):u===3?Hr.set(-1,C,-b):u===4?Hr.set(-b,-1,C):Hr.set(b,C,-1),Hr.toArray(S,(u*h+T)*d)}}let m=new Ve;m.setAttribute("position",new Dt(x,d)),m.setAttribute("outputDirection",new Dt(S,d)),t.push(new at(m,null)),i>Jn&&i--}return{lodMeshes:t,sizeLods:e}}function Od(r,e,t){let i=new ht(r,e,t);return i.texture.mapping=ar,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Kn(r,e,t,i,n){r.viewport.set(e,t,i,n),r.scissor.set(e,t,i,n)}function rg(r,e,t){return new lt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:eg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:za(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:$t,depthTest:!1,depthWrite:!1})}function ng(r,e,t){return new lt({name:"SphericalGaussianBlur",defines:{SAMPLES:jm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:za(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:$t,depthTest:!1,depthWrite:!1})}function Bd(){return new lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$t,depthTest:!1,depthWrite:!1})}function Gd(){return new lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$t,depthTest:!1,depthWrite:!1})}function za(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Qn=class extends ht{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new Vn(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new gr(5,5,5),s=new lt({name:"CubemapFromEquirect",uniforms:$i(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vt,blending:$t});s.uniforms.tEquirect.value=t;let o=new at(n,s),a=t.minFilter;return t.minFilter===xi&&(t.minFilter=Mt),new Ua(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,n);e.setRenderTarget(s)}};function zd(r){let e=new WeakMap,t=new WeakMap,i=null;function n(h,d=!1){return h==null?null:d?o(h):s(h)}function s(h){if(h&&h.isTexture){let d=h.mapping;if(d===mo||d===go)if(e.has(h)){let x=e.get(h).texture;return a(x,h.mapping)}else{let x=h.image;if(x&&x.height>0){let S=new Qn(x.height);return S.fromEquirectangularTexture(r,h),e.set(h,S),h.addEventListener("dispose",c),a(S.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let d=h.mapping,x=d===mo||d===go,S=d===_i||d===zi;if(x||S){let m=t.get(h),u=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==u)return i===null&&(i=new io(r)),m=x?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{let y=h.image;return x&&y&&y.height>0||S&&y&&l(y)?(i===null&&(i=new io(r)),m=x?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",f),m.texture):null}}}return h}function a(h,d){return d===mo?h.mapping=_i:d===go&&(h.mapping=zi),h}function l(h){let d=0,x=6;for(let S=0;S<x;S++)h[S]!==void 0&&d++;return d===x}function c(h){let d=h.target;d.removeEventListener("dispose",c);let x=e.get(d);x!==void 0&&(e.delete(d),x.dispose())}function f(h){let d=h.target;d.removeEventListener("dispose",f);let x=t.get(d);x!==void 0&&(t.delete(d),x.dispose())}function p(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:p}}function Vd(r){let e={};function t(i){if(e[i]!==void 0)return e[i];let n=r.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let n=t(i);return n===null&&Ii("WebGLRenderer: "+i+" extension not supported."),n}}}function Hd(r,e,t,i){let n={},s=new WeakMap;function o(p){let h=p.target;h.index!==null&&e.remove(h.index);for(let x in h.attributes)e.remove(h.attributes[x]);h.removeEventListener("dispose",o),delete n[h.id];let d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(p,h){return n[h.id]===!0||(h.addEventListener("dispose",o),n[h.id]=!0,t.memory.geometries++),h}function l(p){let h=p.attributes;for(let d in h)e.update(h[d],r.ARRAY_BUFFER)}function c(p){let h=[],d=p.index,x=p.attributes.position,S=0;if(x===void 0)return;if(d!==null){let y=d.array;S=d.version;for(let R=0,M=y.length;R<M;R+=3){let T=y[R+0],b=y[R+1],C=y[R+2];h.push(T,b,b,C,C,T)}}else{let y=x.array;S=x.version;for(let R=0,M=y.length/3-1;R<M;R+=3){let T=R+0,b=R+1,C=R+2;h.push(T,b,b,C,C,T)}}let m=new(x.count>=65535?Cn:Rn)(h,1);m.version=S;let u=s.get(p);u&&e.remove(u),s.set(p,m)}function f(p){let h=s.get(p);if(h){let d=p.index;d!==null&&h.version<d.version&&c(p)}else c(p);return s.get(p)}return{get:a,update:l,getWireframeAttribute:f}}function kd(r,e,t){let i;function n(p){i=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function l(p,h){r.drawElements(i,h,s,p*o),t.update(h,i,1)}function c(p,h,d){d!==0&&(r.drawElementsInstanced(i,h,s,p*o,d),t.update(h,i,d))}function f(p,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,p,0,d);let S=0;for(let m=0;m<d;m++)S+=h[m];t.update(S,i,1)}this.setMode=n,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function Wd(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:Oe("WebGLInfo: Unknown draw mode:",o);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Xd(r,e,t){let i=new WeakMap,n=new Ye;function s(o,a,l){let c=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=f!==void 0?f.length:0,h=i.get(a);if(h===void 0||h.count!==p){let E=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let d=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,S=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],u=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],R=0;d===!0&&(R=1),x===!0&&(R=2),S===!0&&(R=3);let M=a.attributes.position.count*R,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let b=new Float32Array(M*T*4*p),C=new xn(b,M,T,p);C.type=wt,C.needsUpdate=!0;let _=R*4;for(let P=0;P<p;P++){let N=m[P],F=u[P],z=y[P],D=M*T*4*P;for(let V=0;V<N.count;V++){let W=V*_;d===!0&&(n.fromBufferAttribute(N,V),b[D+W+0]=n.x,b[D+W+1]=n.y,b[D+W+2]=n.z,b[D+W+3]=0),x===!0&&(n.fromBufferAttribute(F,V),b[D+W+4]=n.x,b[D+W+5]=n.y,b[D+W+6]=n.z,b[D+W+7]=0),S===!0&&(n.fromBufferAttribute(z,V),b[D+W+8]=n.x,b[D+W+9]=n.y,b[D+W+10]=n.z,b[D+W+11]=z.itemSize===4?n.w:1)}}h={count:p,texture:C,size:new Y(M,T)},i.set(a,h),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let d=0;for(let S=0;S<c.length;S++)d+=c[S];let x=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(r,"morphTargetBaseInfluence",x),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",h.size)}return{update:s}}function qd(r,e,t,i,n){let s=new WeakMap;function o(c){let f=n.render.frame,p=c.geometry,h=e.get(c,p);if(s.get(h)!==f&&(e.update(h),s.set(h,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==f&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,f))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==f&&(d.update(),s.set(d,f))}return h}function a(){s=new WeakMap}function l(c){let f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:a}}var sg={[qr]:"LINEAR_TONE_MAPPING",[Yr]:"REINHARD_TONE_MAPPING",[Zr]:"CINEON_TONE_MAPPING",[Tr]:"ACES_FILMIC_TONE_MAPPING",[Jr]:"AGX_TONE_MAPPING",[Qr]:"NEUTRAL_TONE_MAPPING",[Kr]:"CUSTOM_TONE_MAPPING"};function Yd(r,e,t,i,n,s){let o=new ht(e,t,{type:r,depthBuffer:n,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new Ve;c.setAttribute("position",new Ne([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ne([0,2,0,0,2,0],2));let f=new Pi({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new at(c,f),h=new ji(-1,1,1,-1,0,1),d=null,x=null,S=!1,m,u=null,y=[],R=!1;this.setSize=function(M,T){o.setSize(M,T),a!==null&&a.setSize(M,T),l!==null&&l.setSize(M,T);for(let b=0;b<y.length;b++){let C=y[b];C.setSize&&C.setSize(M,T)}},this.setEffects=function(M){y=M,R=y.length>0&&y[0].isRenderPass===!0;let T=o.width,b=o.height;y.length>0&&a===null&&(a=new ht(T,b,{type:_t,depthBuffer:!1,stencilBuffer:!1}),l=new ht(T,b,{type:_t,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<y.length;C++){let _=y[C];_.setSize&&_.setSize(T,b)}},this.begin=function(M,T){if(S||M.toneMapping===Xt&&y.length===0)return!1;if(u=T,T!==null){let b=T.width,C=T.height;(o.width!==b||o.height!==C)&&this.setSize(b,C)}return R===!1&&M.setRenderTarget(o),m=M.toneMapping,M.toneMapping=Xt,!0},this.hasRenderPass=function(){return R},this.end=function(M,T){M.toneMapping=m,S=!0;let b=o,C=a;for(let _=0;_<y.length;_++){let E=y[_];E.enabled!==!1&&(E.render(M,C,b,T),E.needsSwap!==!1&&(b=C,C=C===a?l:a))}if(d!==M.outputColorSpace||x!==M.toneMapping){d=M.outputColorSpace,x=M.toneMapping,f.defines={},Ue.getTransfer(d)===ke&&(f.defines.SRGB_TRANSFER="");let _=sg[x];_&&(f.defines[_]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=b.texture,M.setRenderTarget(u),M.render(p,h),u=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),f.dispose()}}var ep=new it,jl=new Ri(1,1),tp=new xn,ip=new Co,rp=new Vn,Zd=[],Kd=[],Jd=new Float32Array(16),Qd=new Float32Array(9),$d=new Float32Array(4);function $n(r,e,t){let i=r[0];if(i<=0||i>0)return r;let n=e*t,s=Zd[n];if(s===void 0&&(s=new Float32Array(n),Zd[n]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function It(r,e){if(r.length!==e.length)return!1;for(let t=0,i=r.length;t<i;t++)if(r[t]!==e[t])return!1;return!0}function Ut(r,e){for(let t=0,i=e.length;t<i;t++)r[t]=e[t]}function Va(r,e){let t=Kd[e];t===void 0&&(t=new Int32Array(e),Kd[e]=t);for(let i=0;i!==e;++i)t[i]=r.allocateTextureUnit();return t}function og(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function ag(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;r.uniform2fv(this.addr,e),Ut(t,e)}}function lg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;r.uniform3fv(this.addr,e),Ut(t,e)}}function cg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;r.uniform4fv(this.addr,e),Ut(t,e)}}function hg(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(It(t,i))return;$d.set(i),r.uniformMatrix2fv(this.addr,!1,$d),Ut(t,i)}}function fg(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(It(t,i))return;Qd.set(i),r.uniformMatrix3fv(this.addr,!1,Qd),Ut(t,i)}}function ug(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(It(t,i))return;Jd.set(i),r.uniformMatrix4fv(this.addr,!1,Jd),Ut(t,i)}}function dg(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function pg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;r.uniform2iv(this.addr,e),Ut(t,e)}}function mg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;r.uniform3iv(this.addr,e),Ut(t,e)}}function gg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;r.uniform4iv(this.addr,e),Ut(t,e)}}function _g(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function xg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;r.uniform2uiv(this.addr,e),Ut(t,e)}}function vg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;r.uniform3uiv(this.addr,e),Ut(t,e)}}function Mg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;r.uniform4uiv(this.addr,e),Ut(t,e)}}function Sg(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n);let s;this.type===r.SAMPLER_2D_SHADOW?(jl.compareFunction=t.isReversedDepthBuffer()?un:fn,s=jl):s=ep,t.setTexture2D(e||s,n)}function yg(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||ip,n)}function bg(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||rp,n)}function Eg(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||tp,n)}function Tg(r){switch(r){case 5126:return og;case 35664:return ag;case 35665:return lg;case 35666:return cg;case 35674:return hg;case 35675:return fg;case 35676:return ug;case 5124:case 35670:return dg;case 35667:case 35671:return pg;case 35668:case 35672:return mg;case 35669:case 35673:return gg;case 5125:return _g;case 36294:return xg;case 36295:return vg;case 36296:return Mg;case 35678:case 36198:case 36298:case 36306:case 35682:return Sg;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return bg;case 36289:case 36303:case 36311:case 36292:return Eg}}function Ag(r,e){r.uniform1fv(this.addr,e)}function wg(r,e){let t=$n(e,this.size,2);r.uniform2fv(this.addr,t)}function Rg(r,e){let t=$n(e,this.size,3);r.uniform3fv(this.addr,t)}function Cg(r,e){let t=$n(e,this.size,4);r.uniform4fv(this.addr,t)}function Pg(r,e){let t=$n(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Lg(r,e){let t=$n(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Dg(r,e){let t=$n(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Ig(r,e){r.uniform1iv(this.addr,e)}function Ug(r,e){r.uniform2iv(this.addr,e)}function Ng(r,e){r.uniform3iv(this.addr,e)}function Fg(r,e){r.uniform4iv(this.addr,e)}function Og(r,e){r.uniform1uiv(this.addr,e)}function Bg(r,e){r.uniform2uiv(this.addr,e)}function Gg(r,e){r.uniform3uiv(this.addr,e)}function zg(r,e){r.uniform4uiv(this.addr,e)}function Vg(r,e,t){let i=this.cache,n=e.length,s=Va(t,n);It(i,s)||(r.uniform1iv(this.addr,s),Ut(i,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=jl:o=ep;for(let a=0;a!==n;++a)t.setTexture2D(e[a]||o,s[a])}function Hg(r,e,t){let i=this.cache,n=e.length,s=Va(t,n);It(i,s)||(r.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==n;++o)t.setTexture3D(e[o]||ip,s[o])}function kg(r,e,t){let i=this.cache,n=e.length,s=Va(t,n);It(i,s)||(r.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==n;++o)t.setTextureCube(e[o]||rp,s[o])}function Wg(r,e,t){let i=this.cache,n=e.length,s=Va(t,n);It(i,s)||(r.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==n;++o)t.setTexture2DArray(e[o]||tp,s[o])}function Xg(r){switch(r){case 5126:return Ag;case 35664:return wg;case 35665:return Rg;case 35666:return Cg;case 35674:return Pg;case 35675:return Lg;case 35676:return Dg;case 5124:case 35670:return Ig;case 35667:case 35671:return Ug;case 35668:case 35672:return Ng;case 35669:case 35673:return Fg;case 5125:return Og;case 36294:return Bg;case 36295:return Gg;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Vg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return kg;case 36289:case 36303:case 36311:case 36292:return Wg}}var ec=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Tg(t.type)}},tc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Xg(t.type)}},ic=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let n=this.seq;for(let s=0,o=n.length;s!==o;++s){let a=n[s];a.setValue(e,t[a.id],i)}}},$l=/(\w+)(\])?(\[|\.)?/g;function jd(r,e){r.seq.push(e),r.map[e.id]=e}function qg(r,e,t){let i=r.name,n=i.length;for($l.lastIndex=0;;){let s=$l.exec(i),o=$l.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===n){jd(t,c===void 0?new ec(a,r,e):new tc(a,r,e));break}else{let p=t.map[a];p===void 0&&(p=new ic(a),jd(t,p)),t=p}}}var vr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);qg(a,l,this)}let n=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(o):s.push(o);n.length>0&&(this.seq=n.concat(s))}setValue(e,t,i,n){let s=this.map[t];s!==void 0&&s.setValue(e,i,n)}setOptional(e,t,i){let n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,n)}}static seqWithValue(e,t){let i=[];for(let n=0,s=e.length;n!==s;++n){let o=e[n];o.id in t&&i.push(o)}return i}};function rc(r,e,t){let i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}var Yg=37297,Zg=0;function Kg(r,e){let t=r.split(`
`),i=[],n=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=n;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var np=new Ce;function Jg(r){Ue._getMatrix(np,Ue.workingColorSpace,r);let e=`mat3( ${np.elements.map(t=>t.toFixed(4))} )`;switch(Ue.getTransfer(r)){case Rr:return[e,"LinearTransferOETF"];case ke:return[e,"sRGBTransferOETF"];default:return me("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function sp(r,e,t){let i=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Kg(r.getShaderSource(e),a)}else return s}function Qg(r,e){let t=Jg(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var $g={[qr]:"Linear",[Yr]:"Reinhard",[Zr]:"Cineon",[Tr]:"ACESFilmic",[Jr]:"AgX",[Qr]:"Neutral",[Kr]:"Custom"};function jg(r,e){let t=$g[e];return t===void 0?(me("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ha=new A;function e_(){Ue.getLuminanceCoefficients(Ha);let r=Ha.x.toFixed(4),e=Ha.y.toFixed(4),t=Ha.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function t_(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ro).join(`
`)}function i_(r){let e=[];for(let t in r){let i=r[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function r_(r,e){let t={},i=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let s=r.getActiveAttrib(e,n),o=s.name,a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function ro(r){return r!==""}function op(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ap(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var n_=/^[ \t]*#include +<([\w\d./]+)>/gm;function nc(r){return r.replace(n_,o_)}var s_=new Map;function o_(r,e){let t=Ge[e];if(t===void 0){let i=s_.get(e);if(i!==void 0)t=Ge[i],me('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return nc(t)}var a_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lp(r){return r.replace(a_,l_)}function l_(r,e,t,i){let n="";for(let s=parseInt(e);s<parseInt(t);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function cp(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var c_={[Xr]:"SHADOWMAP_TYPE_PCF",[Er]:"SHADOWMAP_TYPE_VSM"};function h_(r){return c_[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var f_={[_i]:"ENVMAP_TYPE_CUBE",[zi]:"ENVMAP_TYPE_CUBE",[ar]:"ENVMAP_TYPE_CUBE_UV"};function u_(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":f_[r.envMapMode]||"ENVMAP_TYPE_CUBE"}var d_={[zi]:"ENVMAP_MODE_REFRACTION"};function p_(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":d_[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}var m_={[or]:"ENVMAP_BLENDING_MULTIPLY",[Wc]:"ENVMAP_BLENDING_MIX",[Xc]:"ENVMAP_BLENDING_ADD"};function g_(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":m_[r.combine]||"ENVMAP_BLENDING_NONE"}function __(r){let e=r.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function hp(r,e,t,i){let n=r.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=h_(t),c=u_(t),f=p_(t),p=g_(t),h=__(t),d=t_(t),x=i_(s),S=n.createProgram(),m,u,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ro).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ro).join(`
`),u.length>0&&(u+=`
`)):(m=[cp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ro).join(`
`),u=[cp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xt?"#define TONE_MAPPING":"",t.toneMapping!==Xt?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Xt?jg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Qg("linearToOutputTexel",t.outputColorSpace),e_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ro).join(`
`)),o=nc(o),o=op(o,t),o=ap(o,t),a=nc(a),a=op(a,t),a=ap(a,t),o=lp(o),a=lp(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",t.glslVersion===rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);let R=y+m+o,M=y+u+a,T=rc(n,n.VERTEX_SHADER,R),b=rc(n,n.FRAGMENT_SHADER,M);n.attachShader(S,T),n.attachShader(S,b),t.index0AttributeName!==void 0?n.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&n.bindAttribLocation(S,0,"position"),n.linkProgram(S);function C(N){if(r.debug.checkShaderErrors){let F=n.getProgramInfoLog(S)||"",z=n.getShaderInfoLog(T)||"",D=n.getShaderInfoLog(b)||"",V=F.trim(),W=z.trim(),X=D.trim(),re=!0,Z=!0;if(n.getProgramParameter(S,n.LINK_STATUS)===!1)if(re=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,S,T,b);else{let ee=sp(n,T,"vertex"),ie=sp(n,b,"fragment");Oe("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(S,n.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+V+`
`+ee+`
`+ie)}else V!==""?me("WebGLProgram: Program Info Log:",V):(W===""||X==="")&&(Z=!1);Z&&(N.diagnostics={runnable:re,programLog:V,vertexShader:{log:W,prefix:m},fragmentShader:{log:X,prefix:u}})}n.deleteShader(T),n.deleteShader(b),_=new vr(n,S),E=r_(n,S)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=n.getProgramParameter(S,Yg)),P},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Zg++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=T,this.fragmentShader=b,this}var x_=0,ka=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new sc(e),t.set(e,i)),i}},sc=class{constructor(e){this.id=x_++,this.code=e,this.usedTimes=0}};function v_(r){return r===hi||r===Ar||r===wr}function fp(r,e,t,i,n,s){let o=new Ui,a=new ka,l=new Set,c=[],f=new Map,p=i.logarithmicDepthBuffer,h=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return l.add(_),_===0?"uv":`uv${_}`}function S(_,E,P,N,F,z){let D=N.fog,V=F.geometry,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?N.environment:null,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,re=e.get(_.envMap||W,X),Z=re&&re.mapping===ar?re.image.height:null,ee=d[_.type];_.precision!==null&&(h=i.getMaxPrecision(_.precision),h!==_.precision&&me("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));let ie=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Pe=ie!==void 0?ie.length:0,we=0;V.morphAttributes.position!==void 0&&(we=1),V.morphAttributes.normal!==void 0&&(we=2),V.morphAttributes.color!==void 0&&(we=3);let ft,Ze,Qe,K;if(ee){let dt=ai[ee];ft=dt.vertexShader,Ze=dt.fragmentShader}else{ft=_.vertexShader,Ze=_.fragmentShader;let dt=a.getVertexShaderStage(_),je=a.getFragmentShaderStage(_);a.update(_,dt,je),Qe=dt.id,K=je.id}let j=r.getRenderTarget(),Me=r.state.buffers.depth.getReversed(),Fe=F.isInstancedMesh===!0,xe=F.isBatchedMesh===!0,He=!!_.map,Pt=!!_.matcap,We=!!re,Je=!!_.aoMap,ut=!!_.lightMap,qe=!!_.bumpMap&&_.wireframe===!1,xt=!!_.normalMap,Ft=!!_.displacementMap,ni=!!_.emissiveMap,yt=!!_.metalnessMap,Tt=!!_.roughnessMap,U=_.anisotropy>0,kt=_.clearcoat>0,tt=_.dispersion>0,w=_.retroreflectivity>0,g=_.iridescence>0,O=_.sheen>0,H=_.transmission>0,q=U&&!!_.anisotropyMap,ne=kt&&!!_.clearcoatMap,oe=kt&&!!_.clearcoatNormalMap,J=kt&&!!_.clearcoatRoughnessMap,$=g&&!!_.iridescenceMap,ae=g&&!!_.iridescenceThicknessMap,Te=O&&!!_.sheenColorMap,fe=O&&!!_.sheenRoughnessMap,le=!!_.specularMap,Ae=!!_.specularColorMap,Le=!!_.specularIntensityMap,Be=H&&!!_.transmissionMap,I=H&&!!_.thicknessMap,ce=!!_.gradientMap,Q=!!_.alphaMap,he=_.alphaTest>0,ge=!!_.alphaHash,te=!!_.extensions,Re=Xt;_.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Re=r.toneMapping);let be={shaderID:ee,shaderType:_.type,shaderName:_.name,vertexShader:ft,fragmentShader:Ze,defines:_.defines,customVertexShaderID:Qe,customFragmentShaderID:K,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:xe,batchingColor:xe&&F._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&F.instanceColor!==null,instancingMorph:Fe&&F.morphTexture!==null,outputColorSpace:j===null?r.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ue.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:He,matcap:Pt,envMap:We,envMapMode:We&&re.mapping,envMapCubeUVHeight:Z,aoMap:Je,lightMap:ut,bumpMap:qe,normalMap:xt,displacementMap:Ft,emissiveMap:ni,normalMapObjectSpace:xt&&_.normalMapType===Zc,normalMapTangentSpace:xt&&_.normalMapType===ki,packedNormalMap:xt&&_.normalMapType===ki&&v_(_.normalMap.format),metalnessMap:yt,roughnessMap:Tt,anisotropy:U,anisotropyMap:q,clearcoat:kt,clearcoatMap:ne,clearcoatNormalMap:oe,clearcoatRoughnessMap:J,dispersion:tt,retroreflection:w,iridescence:g,iridescenceMap:$,iridescenceThicknessMap:ae,sheen:O,sheenColorMap:Te,sheenRoughnessMap:fe,specularMap:le,specularColorMap:Ae,specularIntensityMap:Le,transmission:H,transmissionMap:Be,thicknessMap:I,gradientMap:ce,opaque:_.transparent===!1&&_.blending===Gi&&_.alphaToCoverage===!1,alphaMap:Q,alphaTest:he,alphaHash:ge,combine:_.combine,mapUv:He&&x(_.map.channel),aoMapUv:Je&&x(_.aoMap.channel),lightMapUv:ut&&x(_.lightMap.channel),bumpMapUv:qe&&x(_.bumpMap.channel),normalMapUv:xt&&x(_.normalMap.channel),displacementMapUv:Ft&&x(_.displacementMap.channel),emissiveMapUv:ni&&x(_.emissiveMap.channel),metalnessMapUv:yt&&x(_.metalnessMap.channel),roughnessMapUv:Tt&&x(_.roughnessMap.channel),anisotropyMapUv:q&&x(_.anisotropyMap.channel),clearcoatMapUv:ne&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:oe&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:fe&&x(_.sheenRoughnessMap.channel),specularMapUv:le&&x(_.specularMap.channel),specularColorMapUv:Ae&&x(_.specularColorMap.channel),specularIntensityMapUv:Le&&x(_.specularIntensityMap.channel),transmissionMapUv:Be&&x(_.transmissionMap.channel),thicknessMapUv:I&&x(_.thicknessMap.channel),alphaMapUv:Q&&x(_.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(xt||U),vertexNormals:!!V.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!V.attributes.uv&&(He||Q),fog:!!D,useFog:_.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||V.attributes.normal===void 0&&xt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Me,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:we,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Re,decodeVideoTexture:He&&_.map.isVideoTexture===!0&&Ue.getTransfer(_.map.colorSpace)===ke,decodeVideoTextureEmissive:ni&&_.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(_.emissiveMap.colorSpace)===ke,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===si,flipSided:_.side===vt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:te&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&_.extensions.multiDraw===!0||xe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function m(_){let E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(let P in _.defines)E.push(P),E.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(u(E,_),y(E,_),E.push(r.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function u(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function y(_,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function R(_){let E=d[_.type],P;if(E){let N=ai[E];P=Ci.clone(N.uniforms)}else P=_.uniforms;return P}function M(_,E){let P=f.get(E);return P!==void 0?++P.usedTimes:(P=new hp(r,E,_,n),c.push(P),f.set(E,P)),P}function T(_){if(--_.usedTimes===0){let E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),f.delete(_.cacheKey),_.destroy()}}function b(_){a.remove(_)}function C(){a.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:R,acquireProgram:M,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:C}}function up(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function i(o){r.delete(o)}function n(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:s}}function M_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function dp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function pp(){let r=[],e=0,t=[],i=[],n=[];function s(){e=0,t.length=0,i.length=0,n.length=0}function o(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function a(h,d,x,S,m,u){let y=r[e];return y===void 0?(y={id:h.id,object:h,geometry:d,material:x,materialVariant:o(h),groupOrder:S,renderOrder:h.renderOrder,z:m,group:u},r[e]=y):(y.id=h.id,y.object=h,y.geometry=d,y.material=x,y.materialVariant=o(h),y.groupOrder=S,y.renderOrder=h.renderOrder,y.z=m,y.group=u),e++,y}function l(h,d,x,S,m,u,y){y.reversedDepth===!0&&(m=-m);let R=a(h,d,x,S,m,u);x.transmission>0?i.push(R):x.transparent===!0?n.push(R):t.push(R)}function c(h,d,x,S,m,u){let y=a(h,d,x,S,m,u);x.transmission>0?i.unshift(y):x.transparent===!0?n.unshift(y):t.unshift(y)}function f(h,d){t.length>1&&t.sort(h||M_),i.length>1&&i.sort(d||dp),n.length>1&&n.sort(d||dp)}function p(){for(let h=e,d=r.length;h<d;h++){let x=r[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:n,init:s,push:l,unshift:c,finish:p,sort:f}}function mp(){let r=new WeakMap;function e(i,n){let s=r.get(i),o;return s===void 0?(o=new pp,r.set(i,[o])):n>=s.length?(o=new pp,s.push(o)):o=s[n],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function S_(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new A,color:new de};break;case"SpotLight":t={position:new A,direction:new A,color:new de,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new de,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new de,groundColor:new de};break;case"RectAreaLight":t={color:new de,position:new A,halfWidth:new A,halfHeight:new A};break}return r[e.id]=t,t}}}function y_(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}var b_=0;function E_(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function gp(r){let e=new S_,t=y_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new A);let n=new A,s=new De,o=new De;function a(c){let f=0,p=0,h=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let d=0,x=0,S=0,m=0,u=0,y=0,R=0,M=0,T=0,b=0,C=0,_=0,E=0,P=0;c.sort(E_);for(let F=0,z=c.length;F<z;F++){let D=c[F],V=D.color,W=D.intensity,X=D.distance,re=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===hi?re=D.shadow.map.texture:re=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)f+=V.r*W,p+=V.g*W,h+=V.b*W;else if(D.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(D.sh.coefficients[Z],W);P++}else if(D.isSunLight){let Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let ee=D.shadow,ie=t.get(D);ie.shadowIntensity=ee.intensity,ie.shadowBias=ee.bias,ie.shadowNormalBias=ee.normalBias,ie.shadowRadius=ee.radius,ie.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[x]=ie,i.sunShadowMap[x]=re;let Pe=ee.getViewportCount();for(let we=0;we<Pe;we++)i.sunShadowMatrix[S+we]=ee.getMatrix(we),i.sunShadowCascade[S+we]=ee._cascadeData[we];S+=Pe,x++}i.sun[d]=Z,d++}else if(D.isDirectionalLight){let Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let ee=D.shadow,ie=t.get(D);ie.shadowIntensity=ee.intensity,ie.shadowBias=ee.bias,ie.shadowNormalBias=ee.normalBias,ie.shadowRadius=ee.radius,ie.shadowMapSize=ee.mapSize,i.directionalShadow[m]=ie,i.directionalShadowMap[m]=re,i.directionalShadowMatrix[m]=D.shadow.matrix,T++}i.directional[m]=Z,m++}else if(D.isSpotLight){let Z=e.get(D);Z.position.setFromMatrixPosition(D.matrixWorld),Z.color.copy(V).multiplyScalar(W),Z.distance=X,Z.coneCos=Math.cos(D.angle),Z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Z.decay=D.decay,i.spot[y]=Z;let ee=D.shadow;if(D.map&&(i.spotLightMap[_]=D.map,_++,ee.updateMatrices(D),D.castShadow&&E++),i.spotLightMatrix[y]=ee.matrix,D.castShadow){let ie=t.get(D);ie.shadowIntensity=ee.intensity,ie.shadowBias=ee.bias,ie.shadowNormalBias=ee.normalBias,ie.shadowRadius=ee.radius,ie.shadowMapSize=ee.mapSize,i.spotShadow[y]=ie,i.spotShadowMap[y]=re,C++}y++}else if(D.isRectAreaLight){let Z=e.get(D);Z.color.copy(V).multiplyScalar(W),Z.halfWidth.set(D.width*.5,0,0),Z.halfHeight.set(0,D.height*.5,0),i.rectArea[R]=Z,R++}else if(D.isPointLight){let Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),Z.distance=D.distance,Z.decay=D.decay,D.castShadow){let ee=D.shadow,ie=t.get(D);ie.shadowIntensity=ee.intensity,ie.shadowBias=ee.bias,ie.shadowNormalBias=ee.normalBias,ie.shadowRadius=ee.radius,ie.shadowMapSize=ee.mapSize,ie.shadowCameraNear=ee.camera.near,ie.shadowCameraFar=ee.camera.far,i.pointShadow[u]=ie,i.pointShadowMap[u]=re,i.pointShadowMatrix[u]=D.shadow.matrix,b++}i.point[u]=Z,u++}else if(D.isHemisphereLight){let Z=e.get(D);Z.skyColor.copy(D.color).multiplyScalar(W),Z.groundColor.copy(D.groundColor).multiplyScalar(W),i.hemi[M]=Z,M++}}R>0&&(r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=h;let N=i.hash;(N.sunLength!==d||N.directionalLength!==m||N.pointLength!==u||N.spotLength!==y||N.rectAreaLength!==R||N.hemiLength!==M||N.numSunShadows!==x||N.numDirectionalShadows!==T||N.numPointShadows!==b||N.numSpotShadows!==C||N.numSpotMaps!==_||N.numLightProbes!==P)&&(i.sun.length=d,i.directional.length=m,i.spot.length=y,i.rectArea.length=R,i.point.length=u,i.hemi.length=M,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=S,i.sunShadowCascade.length=S,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+_-E,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=P,N.sunLength=d,N.directionalLength=m,N.pointLength=u,N.spotLength=y,N.rectAreaLength=R,N.hemiLength=M,N.numSunShadows=x,N.numDirectionalShadows=T,N.numPointShadows=b,N.numSpotShadows=C,N.numSpotMaps=_,N.numLightProbes=P,i.version=b_++)}function l(c,f){let p=0,h=0,d=0,x=0,S=0,m=0,u=f.matrixWorldInverse;for(let y=0,R=c.length;y<R;y++){let M=c[y];if(M.isSunLight){let T=i.sun[p];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(u),p++}else if(M.isDirectionalLight){let T=i.directional[h];T.direction.setFromMatrixPosition(M.matrixWorld),n.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(n),T.direction.transformDirection(u),h++}else if(M.isSpotLight){let T=i.spot[x];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(u),T.direction.setFromMatrixPosition(M.matrixWorld),n.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(n),T.direction.transformDirection(u),x++}else if(M.isRectAreaLight){let T=i.rectArea[S];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(u),o.identity(),s.copy(M.matrixWorld),s.premultiply(u),o.extractRotation(s),T.halfWidth.set(M.width*.5,0,0),T.halfHeight.set(0,M.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),S++}else if(M.isPointLight){let T=i.point[d];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(u),d++}else if(M.isHemisphereLight){let T=i.hemi[m];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(u),m++}}}return{setup:a,setupView:l,state:i}}function _p(r){let e=new gp(r),t=[],i=[],n=[];function s(h){p.camera=h,t.length=0,i.length=0,n.length=0}function o(h){t.push(h)}function a(h){i.push(h)}function l(h){n.push(h)}function c(){e.setup(t)}function f(h){e.setupView(t,h)}let p={lightsArray:t,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:p,setupLights:c,setupLightsView:f,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function xp(r){let e=new WeakMap;function t(n,s=0){let o=e.get(n),a;return o===void 0?(a=new _p(r),e.set(n,[a])):s>=o.length?(a=new _p(r),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var vp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,Mp=`
uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;

void main() {

	const float samples = float( VSM_SAMPLES );

	float mean = 0.0;
	float squared_mean = 0.0;

	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {

		float uvOffset = uvStart + i * uvStride;

		#ifdef HORIZONTAL_PASS

			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;

		#else

			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;

		#endif

	}

	mean = mean / samples;
	squared_mean = squared_mean / samples;

	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );

	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );

}
`;var A_=[new A(1,0,0),new A(-1,0,0),new A(0,1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1)],w_=[new A(0,-1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1),new A(0,-1,0),new A(0,-1,0)],Sp=new De,no=new A,oc=new A;function yp(r,e,t){let i=new Fi,n=new Y,s=new Y,o=new Ye,a=new ya,l=new ba,c={},f=t.maxTextureSize,p={[ci]:vt,[vt]:ci,[si]:si},h=new lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Y},radius:{value:4}},vertexShader:vp,fragmentShader:Mp}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let x=new Ve;x.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new at(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xr;let u=this.type;this.render=function(b,C,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===ja&&(me("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xr);let E=r.getRenderTarget(),P=r.getActiveCubeFace(),N=r.getActiveMipmapLevel(),F=r.state;F.setBlending($t),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let z=u!==this.type;z&&C.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(V=>V.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,V=b.length;D<V;D++){let W=b[D],X=W.shadow;if(X===void 0){me("WebGLShadowMap:",W,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;n.copy(X.mapSize);let re=X.getFrameExtents();n.multiply(re),s.copy(X.mapSize),(n.x>f||n.y>f)&&(n.x>f&&(s.x=Math.floor(f/re.x),n.x=s.x*re.x,X.mapSize.x=s.x),n.y>f&&(s.y=Math.floor(f/re.y),n.y=s.y*re.y,X.mapSize.y=s.y));let Z=r.state.buffers.depth.getReversed();if(X.camera._reversedDepth=Z,X.map===null||z===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Er){if(W.isPointLight){me("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new ht(n.x,n.y,{format:hi,type:_t,minFilter:Mt,magFilter:Mt,generateMipmaps:!1}),X.map.texture.name=W.name+".shadowMap",X.map.depthTexture=new Ri(n.x,n.y,wt),X.map.depthTexture.name=W.name+".shadowMapDepth",X.map.depthTexture.format=ei,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=ot,X.map.depthTexture.magFilter=ot}else W.isPointLight?(X.map=new Qn(n.x),X.map.depthTexture=new ha(n.x,Ot)):(X.map=new ht(n.x,n.y),X.map.depthTexture=new Ri(n.x,n.y,Ot)),X.map.depthTexture.name=W.name+".shadowMap",X.map.depthTexture.format=ei,this.type===Xr?(X.map.depthTexture.compareFunction=Z?un:fn,X.map.depthTexture.minFilter=Mt,X.map.depthTexture.magFilter=Mt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=ot,X.map.depthTexture.magFilter=ot);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==n.x||X.map.height!==n.y)&&X.map.setSize(n.x,n.y);let ee=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();W.isPointLight!==!0&&X.updateMatrices(W,_);for(let ie=0;ie<ee;ie++){let Pe=X.getCamera(ie);if(W.isPointLight){let we=X.camera,ft=X.matrix,Ze=W.distance||we.far;Ze!==we.far&&(we.far=Ze,we.updateProjectionMatrix()),no.setFromMatrixPosition(W.matrixWorld),we.position.copy(no),oc.copy(we.position),oc.add(A_[ie]),we.up.copy(w_[ie]),we.lookAt(oc),we.updateMatrixWorld(),ft.makeTranslation(-no.x,-no.y,-no.z),Sp.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Sp,we.coordinateSystem,we.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)r.setRenderTarget(X.map,ie),r.clear();else{ie===0&&(r.setRenderTarget(X.map),r.clear());let we=X.getViewport(ie);o.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),F.viewport(o)}i=X.getFrustum(ie),M(C,_,Pe,W,this.type)}X.isPointLightShadow!==!0&&this.type===Er&&y(X,_),X.needsUpdate=!1}u=this.type,m.needsUpdate=!1,r.setRenderTarget(E,P,N)};function y(b,C){let _=e.update(S);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new ht(n.x,n.y,{format:hi,type:_t}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value.set(b.map.width,b.map.height),h.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(C,null,_,h,S,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(C,null,_,d,S,null)}function R(b,C,_,E){let P=null,N=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(N!==void 0)P=N;else if(P=_.isPointLight===!0?l:a,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let F=P.uuid,z=C.uuid,D=c[F];D===void 0&&(D={},c[F]=D);let V=D[z];V===void 0&&(V=P.clone(),D[z]=V,C.addEventListener("dispose",T)),P=V}if(P.visible=C.visible,P.wireframe=C.wireframe,E===Er?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:p[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let F=r.properties.get(P);F.light=_}return P}function M(b,C,_,E,P){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===Er)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);let z=e.update(b),D=b.material;if(Array.isArray(D)){let V=z.groups;for(let W=0,X=V.length;W<X;W++){let re=V[W],Z=D[re.materialIndex];if(Z&&Z.visible){let ee=R(b,Z,E,P);b.onBeforeShadow(r,b,C,_,z,ee,re),r.renderBufferDirect(_,null,z,ee,b,re),b.onAfterShadow(r,b,C,_,z,ee,re)}}}else if(D.visible){let V=R(b,D,E,P);b.onBeforeShadow(r,b,C,_,z,V,null),r.renderBufferDirect(_,null,z,V,b,null),b.onAfterShadow(r,b,C,_,z,V,null)}}let F=b.children;for(let z=0,D=F.length;z<D;z++)M(F[z],C,_,E,P)}function T(b){b.target.removeEventListener("dispose",T);for(let _ in c){let E=c[_],P=b.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function bp(r,e){function t(){let I=!1,ce=new Ye,Q=null,he=new Ye(0,0,0,0);return{setMask:function(ge){Q!==ge&&!I&&(r.colorMask(ge,ge,ge,ge),Q=ge)},setLocked:function(ge){I=ge},setClear:function(ge,te,Re,be,dt){dt===!0&&(ge*=be,te*=be,Re*=be),ce.set(ge,te,Re,be),he.equals(ce)===!1&&(r.clearColor(ge,te,Re,be),he.copy(ce))},reset:function(){I=!1,Q=null,he.set(-1,0,0,0)}}}function i(){let I=!1,ce=!1,Q=null,he=null,ge=null;return{setReversed:function(te){if(ce!==te){let Re=e.get("EXT_clip_control");te?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),ce=te;let be=ge;ge=null,this.setClear(be)}},getReversed:function(){return ce},setTest:function(te){te?j(r.DEPTH_TEST):Me(r.DEPTH_TEST)},setMask:function(te){Q!==te&&!I&&(r.depthMask(te),Q=te)},setFunc:function(te){if(ce&&(te=ah[te]),he!==te){switch(te){case es:r.depthFunc(r.NEVER);break;case ts:r.depthFunc(r.ALWAYS);break;case is:r.depthFunc(r.LESS);break;case sr:r.depthFunc(r.LEQUAL);break;case rs:r.depthFunc(r.EQUAL);break;case ns:r.depthFunc(r.GEQUAL);break;case ss:r.depthFunc(r.GREATER);break;case os:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}he=te}},setLocked:function(te){I=te},setClear:function(te){ge!==te&&(ge=te,ce&&(te=1-te),r.clearDepth(te))},reset:function(){I=!1,Q=null,he=null,ge=null,ce=!1}}}function n(){let I=!1,ce=null,Q=null,he=null,ge=null,te=null,Re=null,be=null,dt=null;return{setTest:function(je){I||(je?j(r.STENCIL_TEST):Me(r.STENCIL_TEST))},setMask:function(je){ce!==je&&!I&&(r.stencilMask(je),ce=je)},setFunc:function(je,yi,Li){(Q!==je||he!==yi||ge!==Li)&&(r.stencilFunc(je,yi,Li),Q=je,he=yi,ge=Li)},setOp:function(je,yi,Li){(te!==je||Re!==yi||be!==Li)&&(r.stencilOp(je,yi,Li),te=je,Re=yi,be=Li)},setLocked:function(je){I=je},setClear:function(je){dt!==je&&(r.clearStencil(je),dt=je)},reset:function(){I=!1,ce=null,Q=null,he=null,ge=null,te=null,Re=null,be=null,dt=null}}}let s=new t,o=new i,a=new n,l=new WeakMap,c=new WeakMap,f={},p={},h={},d=new WeakMap,x=[],S=null,m=!1,u=null,y=null,R=null,M=null,T=null,b=null,C=null,_=new de(0,0,0),E=0,P=!1,N=null,F=null,z=null,D=null,V=null,W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,re=0,Z=r.getParameter(r.VERSION);Z.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(Z)[1]),X=re>=1):Z.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),X=re>=2);let ee=null,ie={},Pe=r.getParameter(r.SCISSOR_BOX),we=r.getParameter(r.VIEWPORT),ft=new Ye().fromArray(Pe),Ze=new Ye().fromArray(we);function Qe(I,ce,Q,he){let ge=new Uint8Array(4),te=r.createTexture();r.bindTexture(I,te),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Re=0;Re<Q;Re++)I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY?r.texImage3D(ce,0,r.RGBA,1,1,he,0,r.RGBA,r.UNSIGNED_BYTE,ge):r.texImage2D(ce+Re,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ge);return te}let K={};K[r.TEXTURE_2D]=Qe(r.TEXTURE_2D,r.TEXTURE_2D,1),K[r.TEXTURE_CUBE_MAP]=Qe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[r.TEXTURE_2D_ARRAY]=Qe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),K[r.TEXTURE_3D]=Qe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(r.DEPTH_TEST),o.setFunc(sr),qe(!1),xt($a),j(r.CULL_FACE),Je($t);function j(I){f[I]!==!0&&(r.enable(I),f[I]=!0)}function Me(I){f[I]!==!1&&(r.disable(I),f[I]=!1)}function Fe(I,ce){return h[I]!==ce?(r.bindFramebuffer(I,ce),h[I]=ce,I===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=ce),I===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=ce),!0):!1}function xe(I,ce){let Q=x,he=!1;if(I){Q=d.get(ce),Q===void 0&&(Q=[],d.set(ce,Q));let ge=I.textures;if(Q.length!==ge.length||Q[0]!==r.COLOR_ATTACHMENT0){for(let te=0,Re=ge.length;te<Re;te++)Q[te]=r.COLOR_ATTACHMENT0+te;Q.length=ge.length,he=!0}}else Q[0]!==r.BACK&&(Q[0]=r.BACK,he=!0);he&&r.drawBuffers(Q)}function He(I){return S!==I?(r.useProgram(I),S=I,!0):!1}let Pt={[nr]:r.FUNC_ADD,[wc]:r.FUNC_SUBTRACT,[Rc]:r.FUNC_REVERSE_SUBTRACT};Pt[Cc]=r.MIN,Pt[Pc]=r.MAX;let We={[Lc]:r.ZERO,[Dc]:r.ONE,[Ic]:r.SRC_COLOR,[uo]:r.SRC_ALPHA,[Gc]:r.SRC_ALPHA_SATURATE,[Oc]:r.DST_COLOR,[Nc]:r.DST_ALPHA,[Uc]:r.ONE_MINUS_SRC_COLOR,[po]:r.ONE_MINUS_SRC_ALPHA,[Bc]:r.ONE_MINUS_DST_COLOR,[Fc]:r.ONE_MINUS_DST_ALPHA,[zc]:r.CONSTANT_COLOR,[Vc]:r.ONE_MINUS_CONSTANT_COLOR,[Hc]:r.CONSTANT_ALPHA,[kc]:r.ONE_MINUS_CONSTANT_ALPHA};function Je(I,ce,Q,he,ge,te,Re,be,dt,je){if(I===$t){m===!0&&(Me(r.BLEND),m=!1);return}if(m===!1&&(j(r.BLEND),m=!0),I!==Ac){if(I!==u||je!==P){if((y!==nr||T!==nr)&&(r.blendEquation(r.FUNC_ADD),y=nr,T=nr),je)switch(I){case Gi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rr:r.blendFunc(r.ONE,r.ONE);break;case el:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case tl:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Oe("WebGLState: Invalid blending: ",I);break}else switch(I){case Gi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case el:Oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tl:Oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Oe("WebGLState: Invalid blending: ",I);break}R=null,M=null,b=null,C=null,_.set(0,0,0),E=0,u=I,P=je}return}ge=ge||ce,te=te||Q,Re=Re||he,(ce!==y||ge!==T)&&(r.blendEquationSeparate(Pt[ce],Pt[ge]),y=ce,T=ge),(Q!==R||he!==M||te!==b||Re!==C)&&(r.blendFuncSeparate(We[Q],We[he],We[te],We[Re]),R=Q,M=he,b=te,C=Re),(be.equals(_)===!1||dt!==E)&&(r.blendColor(be.r,be.g,be.b,dt),_.copy(be),E=dt),u=I,P=!1}function ut(I,ce){I.side===si?Me(r.CULL_FACE):j(r.CULL_FACE);let Q=I.side===vt;ce&&(Q=!Q),qe(Q),I.blending===Gi&&I.transparent===!1?Je($t):Je(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);let he=I.stencilWrite;a.setTest(he),he&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ni(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?j(r.SAMPLE_ALPHA_TO_COVERAGE):Me(r.SAMPLE_ALPHA_TO_COVERAGE)}function qe(I){N!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),N=I)}function xt(I){I!==Ec?(j(r.CULL_FACE),I!==F&&(I===$a?r.cullFace(r.BACK):I===Tc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Me(r.CULL_FACE),F=I}function Ft(I){I!==z&&(X&&r.lineWidth(I),z=I)}function ni(I,ce,Q){I?(j(r.POLYGON_OFFSET_FILL),(D!==ce||V!==Q)&&(D=ce,V=Q,o.getReversed()&&(ce=-ce),r.polygonOffset(ce,Q))):Me(r.POLYGON_OFFSET_FILL)}function yt(I){I?j(r.SCISSOR_TEST):Me(r.SCISSOR_TEST)}function Tt(I){I===void 0&&(I=r.TEXTURE0+W-1),ee!==I&&(r.activeTexture(I),ee=I)}function U(I,ce,Q){Q===void 0&&(ee===null?Q=r.TEXTURE0+W-1:Q=ee);let he=ie[Q];he===void 0&&(he={type:void 0,texture:void 0},ie[Q]=he),(he.type!==I||he.texture!==ce)&&(ee!==Q&&(r.activeTexture(Q),ee=Q),r.bindTexture(I,ce||K[I]),he.type=I,he.texture=ce)}function kt(){let I=ie[ee];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function tt(){try{r.compressedTexImage2D(...arguments)}catch(I){Oe("WebGLState:",I)}}function w(){try{r.compressedTexImage3D(...arguments)}catch(I){Oe("WebGLState:",I)}}function g(){try{r.texSubImage2D(...arguments)}catch(I){Oe("WebGLState:",I)}}function O(){try{r.texSubImage3D(...arguments)}catch(I){Oe("WebGLState:",I)}}function H(){try{r.compressedTexSubImage2D(...arguments)}catch(I){Oe("WebGLState:",I)}}function q(){try{r.compressedTexSubImage3D(...arguments)}catch(I){Oe("WebGLState:",I)}}function ne(){try{r.texStorage2D(...arguments)}catch(I){Oe("WebGLState:",I)}}function oe(){try{r.texStorage3D(...arguments)}catch(I){Oe("WebGLState:",I)}}function J(){try{r.texImage2D(...arguments)}catch(I){Oe("WebGLState:",I)}}function $(){try{r.texImage3D(...arguments)}catch(I){Oe("WebGLState:",I)}}function ae(I){return p[I]!==void 0?p[I]:r.getParameter(I)}function Te(I,ce){p[I]!==ce&&(r.pixelStorei(I,ce),p[I]=ce)}function fe(I){ft.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),ft.copy(I))}function le(I){Ze.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),Ze.copy(I))}function Ae(I,ce){let Q=c.get(ce);Q===void 0&&(Q=new WeakMap,c.set(ce,Q));let he=Q.get(I);he===void 0&&(he=r.getUniformBlockIndex(ce,I.name),Q.set(I,he))}function Le(I,ce){let he=c.get(ce).get(I);l.get(ce)!==he&&(r.uniformBlockBinding(ce,he,I.__bindingPointIndex),l.set(ce,he))}function Be(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),f={},p={},ee=null,ie={},h={},d=new WeakMap,x=[],S=null,m=!1,u=null,y=null,R=null,M=null,T=null,b=null,C=null,_=new de(0,0,0),E=0,P=!1,N=null,F=null,z=null,D=null,V=null,ft.set(0,0,r.canvas.width,r.canvas.height),Ze.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:j,disable:Me,bindFramebuffer:Fe,drawBuffers:xe,useProgram:He,setBlending:Je,setMaterial:ut,setFlipSided:qe,setCullFace:xt,setLineWidth:Ft,setPolygonOffset:ni,setScissorTest:yt,activeTexture:Tt,bindTexture:U,unbindTexture:kt,compressedTexImage2D:tt,compressedTexImage3D:w,texImage2D:J,texImage3D:$,pixelStorei:Te,getParameter:ae,updateUBOMapping:Ae,uniformBlockBinding:Le,texStorage2D:ne,texStorage3D:oe,texSubImage2D:g,texSubImage3D:O,compressedTexSubImage2D:H,compressedTexSubImage3D:q,scissor:fe,viewport:le,reset:Be}}function Ep(r,e,t,i,n,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Y,f=new WeakMap,p=new Set,h,d=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(w,g){return x?new OffscreenCanvas(w,g):cr("canvas")}function m(w,g,O){let H=1,q=tt(w);if((q.width>O||q.height>O)&&(H=O/Math.max(q.width,q.height)),H<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let ne=Math.floor(H*q.width),oe=Math.floor(H*q.height);h===void 0&&(h=S(ne,oe));let J=g?S(ne,oe):h;return J.width=ne,J.height=oe,J.getContext("2d").drawImage(w,0,0,ne,oe),me("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ne+"x"+oe+")."),J}else return"data"in w&&me("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),w;return w}function u(w){return w.generateMipmaps}function y(w){r.generateMipmap(w)}function R(w){return w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?r.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(w,g,O,H,q,ne=!1){if(w!==null){if(r[w]!==void 0)return r[w];me("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let oe;H&&(oe=e.get("EXT_texture_norm16"),oe||me("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=g;if(g===r.RED&&(O===r.FLOAT&&(J=r.R32F),O===r.HALF_FLOAT&&(J=r.R16F),O===r.UNSIGNED_BYTE&&(J=r.R8),O===r.UNSIGNED_SHORT&&oe&&(J=oe.R16_EXT),O===r.SHORT&&oe&&(J=oe.R16_SNORM_EXT)),g===r.RED_INTEGER&&(O===r.UNSIGNED_BYTE&&(J=r.R8UI),O===r.UNSIGNED_SHORT&&(J=r.R16UI),O===r.UNSIGNED_INT&&(J=r.R32UI),O===r.BYTE&&(J=r.R8I),O===r.SHORT&&(J=r.R16I),O===r.INT&&(J=r.R32I)),g===r.RG&&(O===r.FLOAT&&(J=r.RG32F),O===r.HALF_FLOAT&&(J=r.RG16F),O===r.UNSIGNED_BYTE&&(J=r.RG8),O===r.UNSIGNED_SHORT&&oe&&(J=oe.RG16_EXT),O===r.SHORT&&oe&&(J=oe.RG16_SNORM_EXT)),g===r.RG_INTEGER&&(O===r.UNSIGNED_BYTE&&(J=r.RG8UI),O===r.UNSIGNED_SHORT&&(J=r.RG16UI),O===r.UNSIGNED_INT&&(J=r.RG32UI),O===r.BYTE&&(J=r.RG8I),O===r.SHORT&&(J=r.RG16I),O===r.INT&&(J=r.RG32I)),g===r.RGB_INTEGER&&(O===r.UNSIGNED_BYTE&&(J=r.RGB8UI),O===r.UNSIGNED_SHORT&&(J=r.RGB16UI),O===r.UNSIGNED_INT&&(J=r.RGB32UI),O===r.BYTE&&(J=r.RGB8I),O===r.SHORT&&(J=r.RGB16I),O===r.INT&&(J=r.RGB32I)),g===r.RGBA_INTEGER&&(O===r.UNSIGNED_BYTE&&(J=r.RGBA8UI),O===r.UNSIGNED_SHORT&&(J=r.RGBA16UI),O===r.UNSIGNED_INT&&(J=r.RGBA32UI),O===r.BYTE&&(J=r.RGBA8I),O===r.SHORT&&(J=r.RGBA16I),O===r.INT&&(J=r.RGBA32I)),g===r.RGB&&(O===r.UNSIGNED_SHORT&&oe&&(J=oe.RGB16_EXT),O===r.SHORT&&oe&&(J=oe.RGB16_SNORM_EXT),O===r.UNSIGNED_INT_5_9_9_9_REV&&(J=r.RGB9_E5),O===r.UNSIGNED_INT_10F_11F_11F_REV&&(J=r.R11F_G11F_B10F)),g===r.RGBA){let $=ne?Rr:Ue.getTransfer(q);O===r.FLOAT&&(J=r.RGBA32F),O===r.HALF_FLOAT&&(J=r.RGBA16F),O===r.UNSIGNED_BYTE&&(J=$===ke?r.SRGB8_ALPHA8:r.RGBA8),O===r.UNSIGNED_SHORT&&oe&&(J=oe.RGBA16_EXT),O===r.SHORT&&oe&&(J=oe.RGBA16_SNORM_EXT),O===r.UNSIGNED_SHORT_4_4_4_4&&(J=r.RGBA4),O===r.UNSIGNED_SHORT_5_5_5_1&&(J=r.RGB5_A1)}return(J===r.R16F||J===r.R32F||J===r.RG16F||J===r.RG32F||J===r.RGBA16F||J===r.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function T(w,g){let O;return w?g===null||g===Ot||g===Hi?O=r.DEPTH24_STENCIL8:g===wt?O=r.DEPTH32F_STENCIL8:g===Vi&&(O=r.DEPTH24_STENCIL8,me("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Ot||g===Hi?O=r.DEPTH_COMPONENT24:g===wt?O=r.DEPTH_COMPONENT32F:g===Vi&&(O=r.DEPTH_COMPONENT16),O}function b(w,g){return u(w)===!0||w.isFramebufferTexture&&w.minFilter!==ot&&w.minFilter!==Mt?Math.log2(Math.max(g.width,g.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?g.mipmaps.length:1}function C(w){let g=w.target;g.removeEventListener("dispose",C),E(g),g.isVideoTexture&&f.delete(g),g.isHTMLTexture&&p.delete(g)}function _(w){let g=w.target;g.removeEventListener("dispose",_),N(g)}function E(w){let g=i.get(w);if(g.__webglInit===void 0)return;let O=w.source,H=d.get(O);if(H){let q=H[g.__cacheKey];q.usedTimes--,q.usedTimes===0&&P(w),Object.keys(H).length===0&&d.delete(O)}i.remove(w)}function P(w){let g=i.get(w);r.deleteTexture(g.__webglTexture);let O=w.source,H=d.get(O);delete H[g.__cacheKey],o.memory.textures--}function N(w){let g=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(g.__webglFramebuffer[H]))for(let q=0;q<g.__webglFramebuffer[H].length;q++)r.deleteFramebuffer(g.__webglFramebuffer[H][q]);else r.deleteFramebuffer(g.__webglFramebuffer[H]);g.__webglDepthbuffer&&r.deleteRenderbuffer(g.__webglDepthbuffer[H])}else{if(Array.isArray(g.__webglFramebuffer))for(let H=0;H<g.__webglFramebuffer.length;H++)r.deleteFramebuffer(g.__webglFramebuffer[H]);else r.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&r.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&r.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let H=0;H<g.__webglColorRenderbuffer.length;H++)g.__webglColorRenderbuffer[H]&&r.deleteRenderbuffer(g.__webglColorRenderbuffer[H]);g.__webglDepthRenderbuffer&&r.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let O=w.textures;for(let H=0,q=O.length;H<q;H++){let ne=i.get(O[H]);ne.__webglTexture&&(r.deleteTexture(ne.__webglTexture),o.memory.textures--),i.remove(O[H])}i.remove(w)}let F=0;function z(){F=0}function D(){return F}function V(w){F=w}function W(){let w=F;return w>=n.maxTextures&&me("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+n.maxTextures),F+=1,w}function X(w){let g=[];return g.push(w.wrapS),g.push(w.wrapT),g.push(w.wrapR||0),g.push(w.magFilter),g.push(w.minFilter),g.push(w.anisotropy),g.push(w.internalFormat),g.push(w.format),g.push(w.type),g.push(w.generateMipmaps),g.push(w.premultiplyAlpha),g.push(w.flipY),g.push(w.unpackAlignment),g.push(w.colorSpace),g.join()}function re(w,g){let O=i.get(w);if(w.isVideoTexture&&U(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&O.__version!==w.version){let H=w.image;if(H===null)me("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)me("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(O,w,g);return}}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,O.__webglTexture,r.TEXTURE0+g)}function Z(w,g){let O=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){Me(O,w,g);return}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,O.__webglTexture,r.TEXTURE0+g)}function ee(w,g){let O=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){Me(O,w,g);return}t.bindTexture(r.TEXTURE_3D,O.__webglTexture,r.TEXTURE0+g)}function ie(w,g){let O=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&O.__version!==w.version){Fe(O,w,g);return}t.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+g)}let Pe={[$r]:r.REPEAT,[jt]:r.CLAMP_TO_EDGE,[as]:r.MIRRORED_REPEAT},we={[ot]:r.NEAREST,[qc]:r.NEAREST_MIPMAP_NEAREST,[ls]:r.NEAREST_MIPMAP_LINEAR,[Mt]:r.LINEAR,[_o]:r.LINEAR_MIPMAP_NEAREST,[xi]:r.LINEAR_MIPMAP_LINEAR},ft={[Jc]:r.NEVER,[th]:r.ALWAYS,[Qc]:r.LESS,[fn]:r.LEQUAL,[$c]:r.EQUAL,[un]:r.GEQUAL,[jc]:r.GREATER,[eh]:r.NOTEQUAL};function Ze(w,g){if(g.type===wt&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Mt||g.magFilter===_o||g.magFilter===ls||g.magFilter===xi||g.minFilter===Mt||g.minFilter===_o||g.minFilter===ls||g.minFilter===xi)&&me("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(w,r.TEXTURE_WRAP_S,Pe[g.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,Pe[g.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,Pe[g.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,we[g.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,we[g.minFilter]),g.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,ft[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===ot||g.minFilter!==ls&&g.minFilter!==xi||g.type===wt&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");r.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,n.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function Qe(w,g){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,g.addEventListener("dispose",C));let H=g.source,q=d.get(H);q===void 0&&(q={},d.set(H,q));let ne=X(g);if(ne!==w.__cacheKey){q[ne]===void 0&&(q[ne]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,O=!0),q[ne].usedTimes++;let oe=q[w.__cacheKey];oe!==void 0&&(q[w.__cacheKey].usedTimes--,oe.usedTimes===0&&P(g)),w.__cacheKey=ne,w.__webglTexture=q[ne].texture}return O}function K(w,g,O){return Math.floor(Math.floor(w/O)/g)}function j(w,g,O,H){let ne=w.updateRanges;if(ne.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,g.width,g.height,O,H,g.data);else{ne.sort((Te,fe)=>Te.start-fe.start);let oe=0;for(let Te=1;Te<ne.length;Te++){let fe=ne[oe],le=ne[Te],Ae=fe.start+fe.count,Le=K(le.start,g.width,4),Be=K(fe.start,g.width,4);le.start<=Ae+1&&Le===Be&&K(le.start+le.count-1,g.width,4)===Le?fe.count=Math.max(fe.count,le.start+le.count-fe.start):(++oe,ne[oe]=le)}ne.length=oe+1;let J=t.getParameter(r.UNPACK_ROW_LENGTH),$=t.getParameter(r.UNPACK_SKIP_PIXELS),ae=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,g.width);for(let Te=0,fe=ne.length;Te<fe;Te++){let le=ne[Te],Ae=Math.floor(le.start/4),Le=Math.ceil(le.count/4),Be=Ae%g.width,I=Math.floor(Ae/g.width),ce=Le,Q=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,Be),t.pixelStorei(r.UNPACK_SKIP_ROWS,I),t.texSubImage2D(r.TEXTURE_2D,0,Be,I,ce,Q,O,H,g.data)}w.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,J),t.pixelStorei(r.UNPACK_SKIP_PIXELS,$),t.pixelStorei(r.UNPACK_SKIP_ROWS,ae)}}function Me(w,g,O){let H=r.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(H=r.TEXTURE_2D_ARRAY),g.isData3DTexture&&(H=r.TEXTURE_3D);let q=Qe(w,g),ne=g.source;t.bindTexture(H,w.__webglTexture,r.TEXTURE0+O);let oe=i.get(ne);if(ne.version!==oe.__version||q===!0){if(t.activeTexture(r.TEXTURE0+O),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){let Q=Ue.getPrimaries(Ue.workingColorSpace),he=g.colorSpace===vi?null:Ue.getPrimaries(g.colorSpace),ge=g.colorSpace===vi||Q===he?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(r.UNPACK_ALIGNMENT,g.unpackAlignment);let $=m(g.image,!1,n.maxTextureSize);$=kt(g,$);let ae=s.convert(g.format,g.colorSpace),Te=s.convert(g.type),fe=M(g.internalFormat,ae,Te,g.normalized,g.colorSpace,g.isVideoTexture);Ze(H,g);let le,Ae=g.mipmaps,Le=g.isVideoTexture!==!0,Be=oe.__version===void 0||q===!0,I=ne.dataReady,ce=b(g,$);if(g.isDepthTexture)fe=T(g.format===bi,g.type),Be&&(Le?t.texStorage2D(r.TEXTURE_2D,1,fe,$.width,$.height):t.texImage2D(r.TEXTURE_2D,0,fe,$.width,$.height,0,ae,Te,null));else if(g.isDataTexture)if(Ae.length>0){Le&&Be&&t.texStorage2D(r.TEXTURE_2D,ce,fe,Ae[0].width,Ae[0].height);for(let Q=0,he=Ae.length;Q<he;Q++)le=Ae[Q],Le?I&&t.texSubImage2D(r.TEXTURE_2D,Q,0,0,le.width,le.height,ae,Te,le.data):t.texImage2D(r.TEXTURE_2D,Q,fe,le.width,le.height,0,ae,Te,le.data);g.generateMipmaps=!1}else Le?(Be&&t.texStorage2D(r.TEXTURE_2D,ce,fe,$.width,$.height),I&&j(g,$,ae,Te)):t.texImage2D(r.TEXTURE_2D,0,fe,$.width,$.height,0,ae,Te,$.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Le&&Be&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ce,fe,Ae[0].width,Ae[0].height,$.depth);for(let Q=0,he=Ae.length;Q<he;Q++)if(le=Ae[Q],g.format!==Lt)if(ae!==null)if(Le){if(I)if(g.layerUpdates.size>0){let ge=ql(le.width,le.height,g.format,g.type);for(let te of g.layerUpdates){let Re=le.data.subarray(te*ge/le.data.BYTES_PER_ELEMENT,(te+1)*ge/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,te,le.width,le.height,1,ae,Re)}}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,le.width,le.height,$.depth,ae,le.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Q,fe,le.width,le.height,$.depth,0,le.data,0,0);else me("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?I&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,le.width,le.height,$.depth,ae,Te,le.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Q,fe,le.width,le.height,$.depth,0,ae,Te,le.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Le&&Be&&t.texStorage2D(r.TEXTURE_2D,ce,fe,Ae[0].width,Ae[0].height);for(let Q=0,he=Ae.length;Q<he;Q++)le=Ae[Q],g.format!==Lt?ae!==null?Le?I&&t.compressedTexSubImage2D(r.TEXTURE_2D,Q,0,0,le.width,le.height,ae,le.data):t.compressedTexImage2D(r.TEXTURE_2D,Q,fe,le.width,le.height,0,le.data):me("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?I&&t.texSubImage2D(r.TEXTURE_2D,Q,0,0,le.width,le.height,ae,Te,le.data):t.texImage2D(r.TEXTURE_2D,Q,fe,le.width,le.height,0,ae,Te,le.data)}else if(g.isDataArrayTexture)if(Le){if(Be&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ce,fe,$.width,$.height,$.depth),I)if(g.layerUpdates.size>0){let Q=ql($.width,$.height,g.format,g.type);for(let he of g.layerUpdates){let ge=$.data.subarray(he*Q/$.data.BYTES_PER_ELEMENT,(he+1)*Q/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,he,$.width,$.height,1,ae,Te,ge)}g.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,ae,Te,$.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,fe,$.width,$.height,$.depth,0,ae,Te,$.data);else if(g.isData3DTexture)Le?(Be&&t.texStorage3D(r.TEXTURE_3D,ce,fe,$.width,$.height,$.depth),I&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,ae,Te,$.data)):t.texImage3D(r.TEXTURE_3D,0,fe,$.width,$.height,$.depth,0,ae,Te,$.data);else if(g.isFramebufferTexture){if(Be)if(Le)t.texStorage2D(r.TEXTURE_2D,ce,fe,$.width,$.height);else{let Q=$.width,he=$.height;for(let ge=0;ge<ce;ge++)t.texImage2D(r.TEXTURE_2D,ge,fe,Q,he,0,ae,Te,null),Q>>=1,he>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in r){let Q=r.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),$.parentNode!==Q){Q.appendChild($),p.add(g),Q.onpaint=he=>{let ge=he.changedElements;for(let te of p)ge.includes(te.image)&&(te.needsUpdate=!0)},Q.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,$);else{let ge=r.RGBA,te=r.RGBA,Re=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,ge,te,Re,$)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Le&&Be){let Q=tt(Ae[0]);t.texStorage2D(r.TEXTURE_2D,ce,fe,Q.width,Q.height)}for(let Q=0,he=Ae.length;Q<he;Q++)le=Ae[Q],Le?I&&t.texSubImage2D(r.TEXTURE_2D,Q,0,0,ae,Te,le):t.texImage2D(r.TEXTURE_2D,Q,fe,ae,Te,le);g.generateMipmaps=!1}else if(Le){if(Be){let Q=tt($);t.texStorage2D(r.TEXTURE_2D,ce,fe,Q.width,Q.height)}I&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ae,Te,$)}else t.texImage2D(r.TEXTURE_2D,0,fe,ae,Te,$);u(g)&&y(H),oe.__version=ne.version,g.onUpdate&&g.onUpdate(g)}w.__version=g.version}function Fe(w,g,O){if(g.image.length!==6)return;let H=Qe(w,g),q=g.source;t.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+O);let ne=i.get(q);if(q.version!==ne.__version||H===!0){t.activeTexture(r.TEXTURE0+O);let oe=Ue.getPrimaries(Ue.workingColorSpace),J=g.colorSpace===vi?null:Ue.getPrimaries(g.colorSpace),$=g.colorSpace===vi||oe===J?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let ae=g.isCompressedTexture||g.image[0].isCompressedTexture,Te=g.image[0]&&g.image[0].isDataTexture,fe=[];for(let te=0;te<6;te++)!ae&&!Te?fe[te]=m(g.image[te],!0,n.maxCubemapSize):fe[te]=Te?g.image[te].image:g.image[te],fe[te]=kt(g,fe[te]);let le=fe[0],Ae=s.convert(g.format,g.colorSpace),Le=s.convert(g.type),Be=M(g.internalFormat,Ae,Le,g.normalized,g.colorSpace),I=g.isVideoTexture!==!0,ce=ne.__version===void 0||H===!0,Q=q.dataReady,he=b(g,le);Ze(r.TEXTURE_CUBE_MAP,g);let ge;if(ae){I&&ce&&t.texStorage2D(r.TEXTURE_CUBE_MAP,he,Be,le.width,le.height);for(let te=0;te<6;te++){ge=fe[te].mipmaps;for(let Re=0;Re<ge.length;Re++){let be=ge[Re];g.format!==Lt?Ae!==null?I?Q&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re,0,0,be.width,be.height,Ae,be.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re,Be,be.width,be.height,0,be.data):me("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?Q&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re,0,0,be.width,be.height,Ae,Le,be.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re,Be,be.width,be.height,0,Ae,Le,be.data)}}}else{if(ge=g.mipmaps,I&&ce){ge.length>0&&he++;let te=tt(fe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,he,Be,te.width,te.height)}for(let te=0;te<6;te++)if(Te){I?Q&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,fe[te].width,fe[te].height,Ae,Le,fe[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Be,fe[te].width,fe[te].height,0,Ae,Le,fe[te].data);for(let Re=0;Re<ge.length;Re++){let dt=ge[Re].image[te].image;I?Q&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re+1,0,0,dt.width,dt.height,Ae,Le,dt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re+1,Be,dt.width,dt.height,0,Ae,Le,dt.data)}}else{I?Q&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ae,Le,fe[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Be,Ae,Le,fe[te]);for(let Re=0;Re<ge.length;Re++){let be=ge[Re];I?Q&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re+1,0,0,Ae,Le,be.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re+1,Be,Ae,Le,be.image[te])}}}u(g)&&y(r.TEXTURE_CUBE_MAP),ne.__version=q.version,g.onUpdate&&g.onUpdate(g)}w.__version=g.version}function xe(w,g,O,H,q,ne){let oe=s.convert(O.format,O.colorSpace),J=s.convert(O.type),$=M(O.internalFormat,oe,J,O.normalized,O.colorSpace),ae=i.get(g),Te=i.get(O);if(Te.__renderTarget=g,!ae.__hasExternalTextures){let fe=Math.max(1,g.width>>ne),le=Math.max(1,g.height>>ne);q===r.TEXTURE_3D||q===r.TEXTURE_2D_ARRAY?t.texImage3D(q,ne,$,fe,le,g.depth,0,oe,J,null):t.texImage2D(q,ne,$,fe,le,0,oe,J,null)}t.bindFramebuffer(r.FRAMEBUFFER,w),Tt(g)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,H,q,Te.__webglTexture,0,yt(g)):(q===r.TEXTURE_2D||q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,H,q,Te.__webglTexture,ne),t.bindFramebuffer(r.FRAMEBUFFER,null)}function He(w,g,O){if(r.bindRenderbuffer(r.RENDERBUFFER,w),g.depthBuffer){let H=g.depthTexture,q=H&&H.isDepthTexture?H.type:null,ne=T(g.stencilBuffer,q),oe=g.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Tt(g)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,yt(g),ne,g.width,g.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,yt(g),ne,g.width,g.height):r.renderbufferStorage(r.RENDERBUFFER,ne,g.width,g.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,w)}else{let H=g.textures;for(let q=0;q<H.length;q++){let ne=H[q],oe=s.convert(ne.format,ne.colorSpace),J=s.convert(ne.type),$=M(ne.internalFormat,oe,J,ne.normalized,ne.colorSpace);Tt(g)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,yt(g),$,g.width,g.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,yt(g),$,g.width,g.height):r.renderbufferStorage(r.RENDERBUFFER,$,g.width,g.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Pt(w,g,O){let H=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,w),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=i.get(g.depthTexture);if(q.__renderTarget=g,(!q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),H){if(q.__webglInit===void 0&&(q.__webglInit=!0,g.depthTexture.addEventListener("dispose",C)),q.__webglTexture===void 0){q.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture),Ze(r.TEXTURE_CUBE_MAP,g.depthTexture);let ae=s.convert(g.depthTexture.format),Te=s.convert(g.depthTexture.type),fe;g.depthTexture.format===ei?fe=r.DEPTH_COMPONENT24:g.depthTexture.format===bi&&(fe=r.DEPTH24_STENCIL8);for(let le=0;le<6;le++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,fe,g.width,g.height,0,ae,Te,null)}}else re(g.depthTexture,0);let ne=q.__webglTexture,oe=yt(g),J=H?r.TEXTURE_CUBE_MAP_POSITIVE_X+O:r.TEXTURE_2D,$=g.depthTexture.format===bi?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(g.depthTexture.format===ei)Tt(g)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,$,J,ne,0,oe):r.framebufferTexture2D(r.FRAMEBUFFER,$,J,ne,0);else if(g.depthTexture.format===bi)Tt(g)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,$,J,ne,0,oe):r.framebufferTexture2D(r.FRAMEBUFFER,$,J,ne,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function We(w){let g=i.get(w),O=w.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==w.depthTexture){let H=w.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),H){let q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,H.removeEventListener("dispose",q)};H.addEventListener("dispose",q),g.__depthDisposeCallback=q}g.__boundDepthTexture=H}if(w.depthTexture&&!g.__autoAllocateDepthBuffer)if(O)for(let H=0;H<6;H++)Pt(g.__webglFramebuffer[H],w,H);else{let H=w.texture.mipmaps;H&&H.length>0?Pt(g.__webglFramebuffer[0],w,0):Pt(g.__webglFramebuffer,w,0)}else if(O){g.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(r.FRAMEBUFFER,g.__webglFramebuffer[H]),g.__webglDepthbuffer[H]===void 0)g.__webglDepthbuffer[H]=r.createRenderbuffer(),He(g.__webglDepthbuffer[H],w,!1);else{let q=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ne=g.__webglDepthbuffer[H];r.bindRenderbuffer(r.RENDERBUFFER,ne),r.framebufferRenderbuffer(r.FRAMEBUFFER,q,r.RENDERBUFFER,ne)}}else{let H=w.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(r.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=r.createRenderbuffer(),He(g.__webglDepthbuffer,w,!1);else{let q=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ne=g.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ne),r.framebufferRenderbuffer(r.FRAMEBUFFER,q,r.RENDERBUFFER,ne)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Je(w,g,O){let H=i.get(w);g!==void 0&&xe(H.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),O!==void 0&&We(w)}function ut(w){let g=w.texture,O=i.get(w),H=i.get(g);w.addEventListener("dispose",_);let q=w.textures,ne=w.isWebGLCubeRenderTarget===!0,oe=q.length>1;if(oe||(H.__webglTexture===void 0&&(H.__webglTexture=r.createTexture()),H.__version=g.version,o.memory.textures++),ne){O.__webglFramebuffer=[];for(let J=0;J<6;J++)if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer[J]=[];for(let $=0;$<g.mipmaps.length;$++)O.__webglFramebuffer[J][$]=r.createFramebuffer()}else O.__webglFramebuffer[J]=r.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer=[];for(let J=0;J<g.mipmaps.length;J++)O.__webglFramebuffer[J]=r.createFramebuffer()}else O.__webglFramebuffer=r.createFramebuffer();if(oe)for(let J=0,$=q.length;J<$;J++){let ae=i.get(q[J]);ae.__webglTexture===void 0&&(ae.__webglTexture=r.createTexture(),o.memory.textures++)}if(w.samples>0&&Tt(w)===!1){O.__webglMultisampledFramebuffer=r.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let J=0;J<q.length;J++){let $=q[J];O.__webglColorRenderbuffer[J]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,O.__webglColorRenderbuffer[J]);let ae=s.convert($.format,$.colorSpace),Te=s.convert($.type),fe=M($.internalFormat,ae,Te,$.normalized,$.colorSpace,w.isXRRenderTarget===!0),le=yt(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,le,fe,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.RENDERBUFFER,O.__webglColorRenderbuffer[J])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=r.createRenderbuffer(),He(O.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ne){t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture),Ze(r.TEXTURE_CUBE_MAP,g);for(let J=0;J<6;J++)if(g.mipmaps&&g.mipmaps.length>0)for(let $=0;$<g.mipmaps.length;$++)xe(O.__webglFramebuffer[J][$],w,g,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+J,$);else xe(O.__webglFramebuffer[J],w,g,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);u(g)&&y(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let J=0,$=q.length;J<$;J++){let ae=q[J],Te=i.get(ae),fe=r.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(fe=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(fe,Te.__webglTexture),Ze(fe,ae),xe(O.__webglFramebuffer,w,ae,r.COLOR_ATTACHMENT0+J,fe,0),u(ae)&&y(fe)}t.unbindTexture()}else{let J=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(J=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(J,H.__webglTexture),Ze(J,g),g.mipmaps&&g.mipmaps.length>0)for(let $=0;$<g.mipmaps.length;$++)xe(O.__webglFramebuffer[$],w,g,r.COLOR_ATTACHMENT0,J,$);else xe(O.__webglFramebuffer,w,g,r.COLOR_ATTACHMENT0,J,0);u(g)&&y(J),t.unbindTexture()}w.depthBuffer&&We(w)}function qe(w){let g=w.textures;for(let O=0,H=g.length;O<H;O++){let q=g[O];if(u(q)){let ne=R(w),oe=i.get(q).__webglTexture;t.bindTexture(ne,oe),y(ne),t.unbindTexture()}}}let xt=[],Ft=[];function ni(w){if(w.samples>0){if(Tt(w)===!1){let g=w.textures,O=w.width,H=w.height,q=r.COLOR_BUFFER_BIT,ne=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,oe=i.get(w),J=g.length>1;if(J)for(let ae=0;ae<g.length;ae++)t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);let $=w.texture.mipmaps;$&&$.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ae=0;ae<g.length;ae++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(q|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(q|=r.STENCIL_BUFFER_BIT)),J){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,oe.__webglColorRenderbuffer[ae]);let Te=i.get(g[ae]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Te,0)}r.blitFramebuffer(0,0,O,H,0,0,O,H,q,r.NEAREST),l===!0&&(xt.length=0,Ft.length=0,xt.push(r.COLOR_ATTACHMENT0+ae),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(xt.push(ne),Ft.push(ne),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ft)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),J)for(let ae=0;ae<g.length;ae++){t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,oe.__webglColorRenderbuffer[ae]);let Te=i.get(g[ae]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.TEXTURE_2D,Te,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){let g=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[g])}}}function yt(w){return Math.min(n.maxSamples,w.samples)}function Tt(w){let g=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function U(w){let g=o.render.frame;f.get(w)!==g&&(f.set(w,g),w.update())}function kt(w,g){let O=w.colorSpace,H=w.format,q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==lr&&O!==vi&&(Ue.getTransfer(O)===ke?(H!==Lt||q!==gt)&&me("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Oe("WebGLTextures: Unsupported texture color space:",O)),g}function tt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=z,this.getTextureUnits=D,this.setTextureUnits=V,this.setTexture2D=re,this.setTexture2DArray=Z,this.setTexture3D=ee,this.setTextureCube=ie,this.rebindTextures=Je,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=qe,this.updateMultisampleRenderTarget=ni,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=Tt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Tp(r,e){function t(i,n=vi){let s,o=Ue.getTransfer(n);if(i===gt)return r.UNSIGNED_BYTE;if(i===en)return r.UNSIGNED_SHORT_4_4_4_4;if(i===tn)return r.UNSIGNED_SHORT_5_5_5_1;if(i===Mo)return r.UNSIGNED_INT_5_9_9_9_REV;if(i===So)return r.UNSIGNED_INT_10F_11F_11F_REV;if(i===xo)return r.BYTE;if(i===vo)return r.SHORT;if(i===Vi)return r.UNSIGNED_SHORT;if(i===jr)return r.INT;if(i===Ot)return r.UNSIGNED_INT;if(i===wt)return r.FLOAT;if(i===_t)return r.HALF_FLOAT;if(i===yo)return r.ALPHA;if(i===bo)return r.RGB;if(i===Lt)return r.RGBA;if(i===ei)return r.DEPTH_COMPONENT;if(i===bi)return r.DEPTH_STENCIL;if(i===rn)return r.RED;if(i===nn)return r.RED_INTEGER;if(i===hi)return r.RG;if(i===sn)return r.RG_INTEGER;if(i===on)return r.RGBA_INTEGER;if(i===an||i===ln||i===cn||i===hn)if(o===ke)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===an)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ln)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===cn)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===hn)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===an)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ln)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===cn)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===hn)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===cs||i===hs||i===fs||i===us)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===cs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===hs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===us)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ds||i===ps||i===ms||i===gs||i===_s||i===Ar||i===xs)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ds||i===ps)return o===ke?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ms)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===gs)return s.COMPRESSED_R11_EAC;if(i===_s)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Ar)return s.COMPRESSED_RG11_EAC;if(i===xs)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===vs||i===Ms||i===Ss||i===ys||i===bs||i===Es||i===Ts||i===As||i===ws||i===Rs||i===Cs||i===Ps||i===Ls||i===Ds)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===vs)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ms)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ss)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ys)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===bs)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Es)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ts)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===As)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ws)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Rs)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Cs)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ps)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ls)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ds)return o===ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Is||i===Us||i===Ns)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Is)return o===ke?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Us)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ns)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Fs||i===Os||i===wr||i===Bs)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Fs)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Os)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===wr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Bs)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hi?r.UNSIGNED_INT_24_8:r[i]!==void 0?r[i]:null}return{convert:t}}var R_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,C_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Wa=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Hn(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new lt({vertexShader:R_,fragmentShader:C_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new at(new Gr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}};var Xa=class extends Bt{constructor(e,t){super();let i=this,n=null,s=1,o=null,a="local-floor",l=1,c=null,f=null,p=null,h=null,d=null,x=null,S=typeof XRWebGLBinding<"u",m=new Wa,u={},y=t.getContextAttributes(),R=null,M=null,T=[],b=[],C=new Y,_=null,E=null,P=new Et;P.viewport=new Ye;let N=new Et;N.viewport=new Ye;let F=[P,N],z=new Na,D=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let j=T[K];return j===void 0&&(j=new yn,T[K]=j),j.getTargetRaySpace()},this.getControllerGrip=function(K){let j=T[K];return j===void 0&&(j=new yn,T[K]=j),j.getGripSpace()},this.getHand=function(K){let j=T[K];return j===void 0&&(j=new yn,T[K]=j),j.getHandSpace()};function W(K){let j=b.indexOf(K.inputSource);if(j===-1)return;let Me=T[j];Me!==void 0&&(Me.update(K.inputSource,K.frame,c||o),Me.dispatchEvent({type:K.type,data:K.inputSource}))}function X(){n.removeEventListener("select",W),n.removeEventListener("selectstart",W),n.removeEventListener("selectend",W),n.removeEventListener("squeeze",W),n.removeEventListener("squeezestart",W),n.removeEventListener("squeezeend",W),n.removeEventListener("end",X),n.removeEventListener("inputsourceschange",re);for(let K=0;K<T.length;K++){let j=b[K];j!==null&&(b[K]=null,T[K].disconnect(j))}D=null,V=null,m.reset();for(let K in u)delete u[K];if(e.setRenderTarget(R),d=null,h=null,p=null,n=null,M=null,Qe.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(C.width,C.height,!1),E!==null){let K=E.camera;K.fov=E.fov,K.zoom=E.zoom,K.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&me("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,i.isPresenting===!0&&me("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return p===null&&S&&(p=new XRWebGLBinding(n,t)),p},this.getFrame=function(){return x},this.getSession=function(){return n},this.setSession=async function(K){if(n=K,n!==null){if(R=e.getRenderTarget(),n.addEventListener("select",W),n.addEventListener("selectstart",W),n.addEventListener("selectend",W),n.addEventListener("squeeze",W),n.addEventListener("squeezestart",W),n.addEventListener("squeezeend",W),n.addEventListener("end",X),n.addEventListener("inputsourceschange",re),y.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(C),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Fe=null,xe=null;y.depth&&(xe=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=y.stencil?bi:ei,Fe=y.stencil?Hi:Ot);let He={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:s};p=this.getBinding(),h=p.createProjectionLayer(He),n.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new ht(h.textureWidth,h.textureHeight,{format:Lt,type:gt,depthTexture:new Ri(h.textureWidth,h.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let Me={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(n,t,Me),n.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new ht(d.framebufferWidth,d.framebufferHeight,{format:Lt,type:gt,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await n.requestReferenceSpace(a),Qe.setContext(n),Qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function re(K){for(let j=0;j<K.removed.length;j++){let Me=K.removed[j],Fe=b.indexOf(Me);Fe>=0&&(b[Fe]=null,T[Fe].disconnect(Me))}for(let j=0;j<K.added.length;j++){let Me=K.added[j],Fe=b.indexOf(Me);if(Fe===-1){for(let He=0;He<T.length;He++)if(He>=b.length){b.push(Me),Fe=He;break}else if(b[He]===null){b[He]=Me,Fe=He;break}if(Fe===-1)break}let xe=T[Fe];xe&&xe.connect(Me)}}let Z=new A,ee=new A;function ie(K,j,Me){Z.setFromMatrixPosition(j.matrixWorld),ee.setFromMatrixPosition(Me.matrixWorld);let Fe=Z.distanceTo(ee),xe=j.projectionMatrix.elements,He=Me.projectionMatrix.elements,Pt=xe[14]/(xe[10]-1),We=xe[14]/(xe[10]+1),Je=(xe[9]+1)/xe[5],ut=(xe[9]-1)/xe[5],qe=(xe[8]-1)/xe[0],xt=(He[8]+1)/He[0],Ft=Pt*qe,ni=Pt*xt,yt=Fe/(-qe+xt),Tt=yt*-qe;if(j.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Tt),K.translateZ(yt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),xe[10]===-1)K.projectionMatrix.copy(j.projectionMatrix),K.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let U=Pt+yt,kt=We+yt,tt=Ft-Tt,w=ni+(Fe-Tt),g=Je*We/kt*U,O=ut*We/kt*U;K.projectionMatrix.makePerspective(tt,w,g,O,U,kt),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Pe(K,j){j===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(j.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(n===null)return;let j=K.near,Me=K.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(Me=m.depthFar)),z.near=N.near=P.near=j,z.far=N.far=P.far=Me,(D!==z.near||V!==z.far)&&(n.updateRenderState({depthNear:z.near,depthFar:z.far}),D=z.near,V=z.far),z.layers.mask=K.layers.mask|6,P.layers.mask=z.layers.mask&-5,N.layers.mask=z.layers.mask&-3;let Fe=K.parent,xe=z.cameras;Pe(z,Fe);for(let He=0;He<xe.length;He++)Pe(xe[He],Fe);xe.length===2?ie(z,P,N):z.projectionMatrix.copy(P.projectionMatrix),E===null&&K.isPerspectiveCamera&&(E={camera:K,fov:K.fov,zoom:K.zoom}),we(K,z,Fe)};function we(K,j,Me){Me===null?K.matrix.copy(j.matrixWorld):(K.matrix.copy(Me.matrixWorld),K.matrix.invert(),K.matrix.multiply(j.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(j.projectionMatrix),K.projectionMatrixInverse.copy(j.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Cr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(K){return u[K]};let ft=null;function Ze(K,j){if(f=j.getViewerPose(c||o),x=j,f!==null){let Me=f.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Fe=!1;Me.length!==z.cameras.length&&(z.cameras.length=0,Fe=!0);for(let We=0;We<Me.length;We++){let Je=Me[We],ut=null;if(d!==null)ut=d.getViewport(Je);else{let xt=p.getViewSubImage(h,Je);ut=xt.viewport,We===0&&(e.setRenderTargetTextures(M,xt.colorTexture,xt.depthStencilTexture),e.setRenderTarget(M))}let qe=F[We];qe===void 0&&(qe=new Et,qe.layers.enable(We),qe.viewport=new Ye,F[We]=qe),qe.matrix.fromArray(Je.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(Je.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(ut.x,ut.y,ut.width,ut.height),We===0&&(z.matrix.copy(qe.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Fe===!0&&z.cameras.push(qe)}let xe=n.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&S){p=i.getBinding();let We=p.getDepthInformation(Me[0]);We&&We.isValid&&We.texture&&m.init(We,n.renderState)}if(xe&&xe.includes("camera-access")&&S){e.state.unbindTexture(),p=i.getBinding();for(let We=0;We<Me.length;We++){let Je=Me[We].camera;if(Je){let ut=u[Je];ut||(ut=new Hn,u[Je]=ut);let qe=p.getCameraImage(Je);ut.sourceTexture=qe}}}}for(let Me=0;Me<T.length;Me++){let Fe=b[Me],xe=T[Me];Fe!==null&&xe!==void 0&&xe.update(Fe,j,c||o)}ft&&ft(K,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),x=null}let Qe=new Ba;Qe.setAnimationLoop(Ze),this.setAnimationLoop=function(K){ft=K},this.dispose=function(){}}};var P_=new De,Ap=new Ce;Ap.set(-1,0,0,0,1,0,0,0,1);function wp(r,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,xa(r)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function n(m,u,y,R,M){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?s(m,u):u.isMeshLambertMaterial?(s(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(s(m,u),p(m,u)):u.isMeshPhongMaterial?(s(m,u),f(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(s(m,u),h(m,u),u.isMeshPhysicalMaterial&&d(m,u,M)):u.isMeshMatcapMaterial?(s(m,u),x(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),S(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,y,R):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===vt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===vt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);let y=e.get(u),R=y.envMap,M=y.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(P_.makeRotationFromEuler(M)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ap),m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,y,R){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*y,m.scale.value=R*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function f(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function p(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function h(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function d(m,u,y){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===vt&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.retroreflectivity>0&&(m.retroreflectivity.value=u.retroreflectivity),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,u){u.matcap&&(m.matcap.value=u.matcap)}function S(m,u){let y=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Rp(r,e,t,i){let n={},s={},o=[],a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,T){let b=T.program;i.uniformBlockBinding(M,b)}function c(M,T){let b=n[M.id];b===void 0&&(m(M),b=f(M),n[M.id]=b,M.addEventListener("dispose",y));let C=T.program;i.updateUBOMapping(M,C);let _=e.render.frame;s[M.id]!==_&&(h(M),s[M.id]=_)}function f(M){let T=p();M.__bindingPointIndex=T;let b=r.createBuffer(),C=M.__size,_=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,C,_),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,T,b),b}function p(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return Oe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let T=n[M.id],b=M.uniforms,C=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,T);for(let _=0,E=b.length;_<E;_++){let P=b[_];if(Array.isArray(P))for(let N=0,F=P.length;N<F;N++)d(P[N],_,N,C);else d(P,_,0,C)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(M,T,b,C){if(S(M,T,b,C)===!0){let _=M.__offset,E=M.value;if(Array.isArray(E)){let P=0;for(let N=0;N<E.length;N++){let F=E[N],z=u(F);x(F,M.__data,P),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(P+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(E,M.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,_,M.__data)}}function x(M,T,b){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,b)}function S(M,T,b,C){let _=M.value,E=T+"_"+b;if(C[E]===void 0)return typeof _=="number"||typeof _=="boolean"?C[E]=_:ArrayBuffer.isView(_)?C[E]=_.slice():C[E]=_.clone(),!0;{let P=C[E];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return C[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function m(M){let T=M.uniforms,b=0,C=16;for(let E=0,P=T.length;E<P;E++){let N=Array.isArray(T[E])?T[E]:[T[E]];for(let F=0,z=N.length;F<z;F++){let D=N[F],V=Array.isArray(D.value)?D.value:[D.value];for(let W=0,X=V.length;W<X;W++){let re=V[W],Z=u(re),ee=b%C,ie=ee%Z.boundary,Pe=ee+ie;b+=ie,Pe!==0&&C-Pe<Z.storage&&(b+=C-Pe),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=b,b+=Z.storage}}}let _=b%C;return _>0&&(b+=C-_),M.__size=b,M.__cache={},this}function u(M){let T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?me("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):me("WebGLRenderer: Unsupported uniform value type.",M),T}function y(M){let T=M.target;T.removeEventListener("dispose",y);let b=o.indexOf(T.__bindingPointIndex);o.splice(b,1),r.deleteBuffer(n[T.id]),delete n[T.id],delete s[T.id]}function R(){for(let M in n)r.deleteBuffer(n[M]);o=[],n={},s={}}return{bind:l,update:c,dispose:R}}var L_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Bi=null;function Cp(){return Bi===null&&(Bi=new mr(L_,16,16,hi,_t),Bi.name="DFG_LUT",Bi.minFilter=Mt,Bi.magFilter=Mt,Bi.wrapS=jt,Bi.wrapT=jt,Bi.generateMipmaps=!1,Bi.needsUpdate=!0),Bi}var qa=class{constructor(e={}){let{canvas:t=nh(),context:i=null,depth:n=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:d=gt}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=o;let S=d,m=new Set([on,sn,nn]),u=new Set([gt,Ot,Vi,Hi,en,tn]),y=new Uint32Array(4),R=new Int32Array(4),M=new A,T=null,b=null,C=[],_=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,N=!1,F=null,z=null,D=null,V=null;this._outputColorSpace=qt;let W=0,X=0,re=null,Z=-1,ee=null,ie=new Ye,Pe=new Ye,we=null,ft=new de(0),Ze=0,Qe=t.width,K=t.height,j=1,Me=null,Fe=null,xe=new Ye(0,0,Qe,K),He=new Ye(0,0,Qe,K),Pt=!1,We=new Fi,Je=!1,ut=!1,qe=new De,xt=new A,Ft=new Ye,ni={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yt=!1;function Tt(){return re===null?j:1}let U=i;function kt(v,L){return t.getContext(v,L)}let tt,w,g,O,H,q,ne,oe,J,$,ae,Te,fe,le,Ae,Le,Be,I,ce,Q,he,ge,te;try{let v={alpha:!0,depth:n,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",dt,!1),t.addEventListener("webglcontextrestored",je,!1),t.addEventListener("webglcontextcreationerror",yi,!1),U===null){let L="webgl2";if(U=kt(L,v),U===null)throw kt(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Re()}catch(v){throw t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",yi,!1),Oe("WebGLRenderer: "+v.message),v}function Re(){tt=new Vd(U),tt.init(),he=new Tp(U,tt),w=new Ud(U,tt,e,he),g=new bp(U,tt),w.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),z=U.createFramebuffer(),D=U.createFramebuffer(),V=U.createFramebuffer(),O=new Wd(U),H=new up,q=new Ep(U,tt,g,H,w,he,O),ne=new zd(P),oe=new Zh(U),ge=new Dd(U,oe),J=new Hd(U,oe,O,ge),$=new qd(U,J,oe,ge,O),I=new Xd(U,w,q),Ae=new Nd(H),ae=new fp(P,ne,tt,w,ge,Ae),Te=new wp(P,H),fe=new mp,le=new xp(tt),Be=new Ld(P,ne,g,$,x,l),Le=new yp(P,$,w),te=new Rp(U,O,w,g),ce=new Id(U,tt,O),Q=new kd(U,tt,O),O.programs=ae.programs,P.capabilities=w,P.extensions=tt,P.properties=H,P.renderLists=fe,P.shadowMap=Le,P.state=g,P.info=O}S!==gt&&(E=new Yd(S,t.width,t.height,a,n,s));let be=new Xa(P,U);this.xr=be,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let v=tt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=tt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(v){v!==void 0&&(j=v,this.setSize(Qe,K,!1))},this.getSize=function(v){return v.set(Qe,K)},this.setSize=function(v,L,k=!0){if(be.isPresenting){me("WebGLRenderer: Can't change size while VR device is presenting.");return}Qe=v,K=L,t.width=Math.floor(v*j),t.height=Math.floor(L*j),k===!0&&(t.style.width=v+"px",t.style.height=L+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(Qe*j,K*j).floor()},this.setDrawingBufferSize=function(v,L,k){Qe=v,K=L,j=k,t.width=Math.floor(v*k),t.height=Math.floor(L*k),this.setViewport(0,0,v,L)},this.setEffects=function(v){if(S===gt){Oe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let L=0;L<v.length;L++)if(v[L].isOutputPass===!0){me("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(ie)},this.getViewport=function(v){return v.copy(xe)},this.setViewport=function(v,L,k,B){v.isVector4?xe.set(v.x,v.y,v.z,v.w):xe.set(v,L,k,B),g.viewport(ie.copy(xe).multiplyScalar(j).round())},this.getScissor=function(v){return v.copy(He)},this.setScissor=function(v,L,k,B){v.isVector4?He.set(v.x,v.y,v.z,v.w):He.set(v,L,k,B),g.scissor(Pe.copy(He).multiplyScalar(j).round())},this.getScissorTest=function(){return Pt},this.setScissorTest=function(v){g.setScissorTest(Pt=v)},this.setOpaqueSort=function(v){Me=v},this.setTransparentSort=function(v){Fe=v},this.getClearColor=function(v){return v.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(v=!0,L=!0,k=!0){let B=0;if(v){let G=!1;if(re!==null){let pe=re.texture.format;G=m.has(pe)}if(G){let pe=re.texture.type,ve=u.has(pe),ue=Be.getClearColor(),Se=Be.getClearAlpha(),Ee=ue.r,ze=ue.g,Xe=ue.b;ve?(y[0]=Ee,y[1]=ze,y[2]=Xe,y[3]=Se,U.clearBufferuiv(U.COLOR,0,y)):(R[0]=Ee,R[1]=ze,R[2]=Xe,R[3]=Se,U.clearBufferiv(U.COLOR,0,R))}else B|=U.COLOR_BUFFER_BIT}L&&(B|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),k&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),F=v},this.dispose=function(){t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",yi,!1),Be.dispose(),fe.dispose(),le.dispose(),H.dispose(),ne.dispose(),$.dispose(),ge.dispose(),te.dispose(),ae.dispose(),be.dispose(),be.removeEventListener("sessionstart",mc),be.removeEventListener("sessionend",gc),Sr.stop()};function dt(v){v.preventDefault(),pn("WebGLRenderer: Context Lost."),N=!0}function je(){pn("WebGLRenderer: Context Restored."),N=!1;let v=O.autoReset,L=Le.enabled,k=Le.autoUpdate,B=Le.needsUpdate,G=Le.type;Re(),O.autoReset=v,Le.enabled=L,Le.autoUpdate=k,Le.needsUpdate=B,Le.type=G}function yi(v){Oe("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Li(v){let L=v.target;L.removeEventListener("dispose",Li),Up(L)}function Up(v){Np(v),H.remove(v)}function Np(v){let L=H.get(v).programs;L!==void 0&&(L.forEach(function(k){ae.releaseProgram(k)}),v.isShaderMaterial&&ae.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,k,B,G,pe){L===null&&(L=ni);let ve=G.isMesh&&G.matrixWorld.determinantAffine()<0,ue=Bp(v,L,k,B,G);g.setMaterial(B,ve);let Se=k.index,Ee=1;if(B.wireframe===!0){if(Se=J.getWireframeAttribute(k),Se===void 0)return;Ee=2}let ze=k.drawRange,Xe=k.attributes.position,ye=ze.start*Ee,et=(ze.start+ze.count)*Ee;pe!==null&&(ye=Math.max(ye,pe.start*Ee),et=Math.min(et,(pe.start+pe.count)*Ee)),Se!==null?(ye=Math.max(ye,0),et=Math.min(et,Se.count)):Xe!=null&&(ye=Math.max(ye,0),et=Math.min(et,Xe.count));let At=et-ye;if(At<0||At===1/0)return;ge.setup(G,B,ue,k,Se);let mt,ct=ce;if(Se!==null&&(mt=oe.get(Se),ct=Q,ct.setIndex(mt)),G.isMesh)B.wireframe===!0?(g.setLineWidth(B.wireframeLinewidth*Tt()),ct.setMode(U.LINES)):ct.setMode(U.TRIANGLES);else if(G.isLine){let Wt=B.linewidth;Wt===void 0&&(Wt=1),g.setLineWidth(Wt*Tt()),G.isLineSegments?ct.setMode(U.LINES):G.isLineLoop?ct.setMode(U.LINE_LOOP):ct.setMode(U.LINE_STRIP)}else G.isPoints?ct.setMode(U.POINTS):G.isSprite&&ct.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))ct.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Wt=G._multiDrawStarts,_e=G._multiDrawCounts,Qt=G._multiDrawCount,Ke=Se?oe.get(Se).bytesPerElement:1,gi=H.get(B).currentProgram.getUniforms();for(let Di=0;Di<Qt;Di++)gi.setValue(U,"_gl_DrawID",Di),ct.render(Wt[Di]/Ke,_e[Di])}else if(G.isInstancedMesh)ct.renderInstances(ye,At,G.count);else if(k.isInstancedBufferGeometry){let Wt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,_e=Math.min(k.instanceCount,Wt);ct.renderInstances(ye,At,_e)}else ct.render(ye,At)};function pc(v,L,k,B){F!==null&&v.isNodeMaterial&&F.setObject(B,v),Je===!0&&Ae.setState(v,k,!1),v.transparent===!0&&v.side===si&&v.forceSinglePass===!1?(v.side=vt,v.needsUpdate=!0,fo(v,L,B),v.side=ci,v.needsUpdate=!0,fo(v,L,B),v.side=si):fo(v,L,B)}this.compile=function(v,L,k=null){k===null&&(k=v),F!==null&&F.renderStart(v,L,k),b=le.get(k),b.init(L),_.push(b),k.traverseVisible(function(G){G.isLight&&G.layers.test(L.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),v!==k&&v.traverseVisible(function(G){G.isLight&&G.layers.test(L.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),b.setupLights(),F!==null&&F.updateLights(b.state.lightsArray),ut=this.localClippingEnabled,Je=Ae.init(this.clippingPlanes,ut),Je===!0&&Ae.setGlobalState(this.clippingPlanes,L),F!==null&&Le.render(b.state.shadowsArray,k,L);let B=new Set;return v.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let pe=G.material;if(pe)if(Array.isArray(pe))for(let ve=0;ve<pe.length;ve++){let ue=pe[ve];pc(ue,k,L,G),B.add(ue)}else pc(pe,k,L,G),B.add(pe)}),b=_.pop(),F!==null&&F.renderEnd(),B},this.compileAsync=function(v,L,k=null){let B=this.compile(v,L,k);return new Promise(G=>{function pe(){if(B.forEach(function(ve){let Se=H.get(ve).currentProgram;(Se===void 0||Se.isReady())&&B.delete(ve)}),B.size===0){G(v);return}setTimeout(pe,10)}tt.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Ja=null;function Fp(v){Ja&&Ja(v)}function mc(){Sr.stop()}function gc(){Sr.start()}let Sr=new Ba;Sr.setAnimationLoop(Fp),typeof self<"u"&&Sr.setContext(self),this.setAnimationLoop=function(v){Ja=v,be.setAnimationLoop(v),v===null?Sr.stop():Sr.start()},be.addEventListener("sessionstart",mc),be.addEventListener("sessionend",gc),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){Oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;F!==null&&F.renderStart(v,L);let k=be.enabled===!0&&be.isPresenting===!0,B=E!==null&&(re===null||k)&&E.begin(P,re);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(be.cameraAutoUpdate===!0&&be.updateCamera(L),L=be.getCamera()),v.isScene===!0&&v.onBeforeRender(P,v,L,re),b=le.get(v,_.length),b.init(L),b.state.textureUnits=q.getTextureUnits(),_.push(b),qe.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),We.setFromProjectionMatrix(qe,ti,L.reversedDepth),ut=this.localClippingEnabled,Je=Ae.init(this.clippingPlanes,ut),T=fe.get(v,C.length),T.init(),C.push(T),be.enabled===!0&&be.isPresenting===!0){let ve=P.xr.getDepthSensingMesh();ve!==null&&Qa(ve,L,-1/0,P.sortObjects)}Qa(v,L,0,P.sortObjects),T.finish(),F!==null&&F.updateLights(b.state.lightsArray),P.sortObjects===!0&&T.sort(Me,Fe),yt=be.enabled===!1||be.isPresenting===!1||be.hasDepthSensing()===!1,yt&&Be.addToRenderList(T,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Je===!0&&Ae.beginShadows();let G=b.state.shadowsArray;if(Le.render(G,v,L),Je===!0&&Ae.endShadows(),(B&&E.hasRenderPass())===!1){let ve=T.opaque,ue=T.transmissive;if(b.setupLights(),L.isArrayCamera){let Se=L.cameras;if(ue.length>0)for(let Ee=0,ze=Se.length;Ee<ze;Ee++){let Xe=Se[Ee];xc(ve,ue,v,Xe)}yt&&Be.render(v);for(let Ee=0,ze=Se.length;Ee<ze;Ee++){let Xe=Se[Ee];_c(T,v,Xe,Xe.viewport)}}else ue.length>0&&xc(ve,ue,v,L),yt&&Be.render(v),_c(T,v,L)}re!==null&&X===0&&(q.updateMultisampleRenderTarget(re),q.updateRenderTargetMipmap(re)),B&&E.end(P),v.isScene===!0&&v.onAfterRender(P,v,L),ge.resetDefaultState(),Z=-1,ee=null,_.pop(),_.length>0?(b=_[_.length-1],q.setTextureUnits(b.state.textureUnits),Je===!0&&Ae.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,F!==null&&F.renderEnd()};function Qa(v,L,k,B){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)k=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLightProbeGrid)b.pushLightProbeGrid(v);else if(v.isLight)b.pushLight(v),v.castShadow&&b.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(We)){B&&Ft.setFromMatrixPosition(v.matrixWorld).applyMatrix4(qe);let ve=$.update(v),ue=v.material;ue.visible&&T.push(v,ve,ue,k,Ft.z,null,L)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(We))){let ve=$.update(v),ue=v.material;if(B&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Ft.copy(v.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Ft.copy(ve.boundingSphere.center)),Ft.applyMatrix4(v.matrixWorld).applyMatrix4(qe)),Array.isArray(ue)){let Se=ve.groups;for(let Ee=0,ze=Se.length;Ee<ze;Ee++){let Xe=Se[Ee],ye=ue[Xe.materialIndex];ye&&ye.visible&&T.push(v,ve,ye,k,Ft.z,Xe,L)}}else ue.visible&&T.push(v,ve,ue,k,Ft.z,null,L)}}let pe=v.children;for(let ve=0,ue=pe.length;ve<ue;ve++)Qa(pe[ve],L,k,B)}function _c(v,L,k,B){let{opaque:G,transmissive:pe,transparent:ve}=v;b.setupLightsView(k),Je===!0&&Ae.setGlobalState(P.clippingPlanes,k),B&&g.viewport(ie.copy(B)),G.length>0&&ho(G,L,k),pe.length>0&&ho(pe,L,k),ve.length>0&&ho(ve,L,k),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function xc(v,L,k,B){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[B.id]===void 0){let ye=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[B.id]=new ht(1,1,{generateMipmaps:!0,type:ye?_t:gt,minFilter:xi,samples:Math.max(4,w.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ue.workingColorSpace})}let pe=b.state.transmissionRenderTarget[B.id],ve=B.viewport||ie;pe.setSize(ve.z*P.transmissionResolutionScale,ve.w*P.transmissionResolutionScale);let ue=P.getRenderTarget(),Se=P.getActiveCubeFace(),Ee=P.getActiveMipmapLevel();P.setRenderTarget(pe),P.getClearColor(ft),Ze=P.getClearAlpha(),Ze<1&&P.setClearColor(16777215,.5),P.clear(),yt&&Be.render(k);let ze=P.toneMapping;P.toneMapping=Xt;let Xe=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),b.setupLightsView(B),Je===!0&&Ae.setGlobalState(P.clippingPlanes,B),ho(v,k,B),q.updateMultisampleRenderTarget(pe),q.updateRenderTargetMipmap(pe),tt.has("WEBGL_multisampled_render_to_texture")===!1){let ye=!1;for(let et=0,At=L.length;et<At;et++){let mt=L[et],{object:ct,geometry:Wt,material:_e,group:Qt}=mt;if(_e.side===si&&ct.layers.test(B.layers)){let Ke=_e.side;_e.side=vt,_e.needsUpdate=!0,vc(ct,k,B,Wt,_e,Qt),_e.side=Ke,_e.needsUpdate=!0,ye=!0}}ye===!0&&(q.updateMultisampleRenderTarget(pe),q.updateRenderTargetMipmap(pe))}P.setRenderTarget(ue,Se,Ee),P.setClearColor(ft,Ze),Xe!==void 0&&(B.viewport=Xe),P.toneMapping=ze}function ho(v,L,k){let B=L.isScene===!0?L.overrideMaterial:null;for(let G=0,pe=v.length;G<pe;G++){let ve=v[G],{object:ue,geometry:Se,group:Ee}=ve,ze=ve.material;ze.allowOverride===!0&&B!==null&&(ze=B),ue.layers.test(k.layers)&&vc(ue,L,k,Se,ze,Ee)}}function vc(v,L,k,B,G,pe){F!==null&&G.isNodeMaterial&&F.setObject(v,G),v.onBeforeRender(P,L,k,B,G,pe),v.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),G.onBeforeRender(P,L,k,B,v,pe),G.transparent===!0&&G.side===si&&G.forceSinglePass===!1?(G.side=vt,G.needsUpdate=!0,P.renderBufferDirect(k,L,B,G,v,pe),G.side=ci,G.needsUpdate=!0,P.renderBufferDirect(k,L,B,G,v,pe),G.side=si):P.renderBufferDirect(k,L,B,G,v,pe),v.onAfterRender(P,L,k,B,G,pe)}function fo(v,L,k){L.isScene!==!0&&(L=ni);let B=H.get(v),G=b.state.lights,pe=b.state.shadowsArray,ve=G.state.version,ue=ae.getParameters(v,G.state,pe,L,k,b.state.lightProbeGridArray),Se=ae.getProgramCacheKey(ue),Ee=B.programs;B.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,B.fog=L.fog;let ze=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;B.envMap=ne.get(v.envMap||B.environment,ze),B.envMapRotation=B.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,Ee===void 0&&(v.addEventListener("dispose",Li),Ee=new Map,B.programs=Ee);let Xe=Ee.get(Se);if(Xe!==void 0){if(B.currentProgram===Xe&&B.lightsStateVersion===ve)return Sc(v,ue),Xe}else ue.uniforms=ae.getUniforms(v),F!==null&&v.isNodeMaterial&&F.build(v,k,ue),v.onBeforeCompile(ue,P),Xe=ae.acquireProgram(ue,Se),Ee.set(Se,Xe),B.uniforms=ue.uniforms;let ye=B.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(ye.clippingPlanes=Ae.uniform),Sc(v,ue),B.needsLights=zp(v),B.lightsStateVersion=ve,B.needsLights&&(ye.ambientLightColor.value=G.state.ambient,ye.lightProbe.value=G.state.probe,ye.sunLights.value=G.state.sun,ye.sunLightShadows.value=G.state.sunShadow,ye.directionalLights.value=G.state.directional,ye.directionalLightShadows.value=G.state.directionalShadow,ye.spotLights.value=G.state.spot,ye.spotLightShadows.value=G.state.spotShadow,ye.rectAreaLights.value=G.state.rectArea,ye.ltc_1.value=G.state.rectAreaLTC1,ye.ltc_2.value=G.state.rectAreaLTC2,ye.pointLights.value=G.state.point,ye.pointLightShadows.value=G.state.pointShadow,ye.hemisphereLights.value=G.state.hemi,ye.sunShadowMatrix.value=G.state.sunShadowMatrix,ye.sunShadowCascade.value=G.state.sunShadowCascade,ye.directionalShadowMatrix.value=G.state.directionalShadowMatrix,ye.spotLightMatrix.value=G.state.spotLightMatrix,ye.spotLightMap.value=G.state.spotLightMap,ye.pointShadowMatrix.value=G.state.pointShadowMatrix),B.lightProbeGrid=b.state.lightProbeGridArray.length>0,B.currentProgram=Xe,B.uniformsList=null,Xe}function Mc(v){if(v.uniformsList===null){let L=v.currentProgram.getUniforms();v.uniformsList=vr.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function Sc(v,L){let k=H.get(v);k.outputColorSpace=L.outputColorSpace,k.batching=L.batching,k.batchingColor=L.batchingColor,k.instancing=L.instancing,k.instancingColor=L.instancingColor,k.instancingMorph=L.instancingMorph,k.skinning=L.skinning,k.morphTargets=L.morphTargets,k.morphNormals=L.morphNormals,k.morphColors=L.morphColors,k.morphTargetsCount=L.morphTargetsCount,k.numClippingPlanes=L.numClippingPlanes,k.numIntersection=L.numClipIntersection,k.vertexAlphas=L.vertexAlphas,k.vertexTangents=L.vertexTangents,k.toneMapping=L.toneMapping}function Op(v,L){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;M.setFromMatrixPosition(L.matrixWorld);for(let k=0,B=v.length;k<B;k++){let G=v[k];if(G.texture!==null&&G.boundingBox.containsPoint(M))return G}return null}function Bp(v,L,k,B,G){L.isScene!==!0&&(L=ni),q.resetTextureUnits();let pe=L.fog,ve=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?L.environment:null,ue=re===null?P.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Ue.workingColorSpace,Se=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Ee=ne.get(B.envMap||ve,Se),ze=B.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Xe=!!k.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),ye=!!k.morphAttributes.position,et=!!k.morphAttributes.normal,At=!!k.morphAttributes.color,mt=Xt;B.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(mt=P.toneMapping);let ct=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Wt=ct!==void 0?ct.length:0,_e=H.get(B),Qt=b.state.lights;if(Je===!0&&(ut===!0||v!==ee)){let pt=v===ee&&B.id===Z;Ae.setState(B,v,pt)}let Ke=!1;B.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==Qt.state.version||_e.outputColorSpace!==ue||G.isBatchedMesh&&_e.batching===!1||!G.isBatchedMesh&&_e.batching===!0||G.isBatchedMesh&&_e.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&_e.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&_e.instancing===!1||!G.isInstancedMesh&&_e.instancing===!0||G.isSkinnedMesh&&_e.skinning===!1||!G.isSkinnedMesh&&_e.skinning===!0||G.isInstancedMesh&&_e.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&_e.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&_e.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&_e.instancingMorph===!1&&G.morphTexture!==null||_e.envMap!==Ee||B.fog===!0&&_e.fog!==pe||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ae.numPlanes||_e.numIntersection!==Ae.numIntersection)||_e.vertexAlphas!==ze||_e.vertexTangents!==Xe||_e.morphTargets!==ye||_e.morphNormals!==et||_e.morphColors!==At||_e.toneMapping!==mt||_e.morphTargetsCount!==Wt||!!_e.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Ke=!0):(Ke=!0,_e.__version=B.version);let gi=_e.currentProgram;Ke===!0&&(gi=fo(B,L,G),F&&B.isNodeMaterial&&F.onUpdateProgram(B,gi,_e));let Di=!1,er=!1,kr=!1,st=gi.getUniforms(),bt=_e.uniforms;if(g.useProgram(gi.program)&&(Di=!0,er=!0,kr=!0),B.id!==Z&&(Z=B.id,er=!0),_e.needsLights){let pt=Op(b.state.lightProbeGridArray,G);_e.lightProbeGrid!==pt&&(_e.lightProbeGrid=pt,er=!0)}if(Di||ee!==v){g.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),st.setValue(U,"projectionMatrix",v.projectionMatrix),st.setValue(U,"viewMatrix",v.matrixWorldInverse);let ir=st.map.cameraPosition;ir!==void 0&&ir.setValue(U,xt.setFromMatrixPosition(v.matrixWorld)),w.logarithmicDepthBuffer&&st.setValue(U,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&st.setValue(U,"isOrthographic",v.isOrthographicCamera===!0),ee!==v&&(ee=v,er=!0,kr=!0)}if(_e.needsLights&&(Qt.state.sunShadowMap.length>0&&st.setValue(U,"sunShadowMap",Qt.state.sunShadowMap,q),Qt.state.directionalShadowMap.length>0&&st.setValue(U,"directionalShadowMap",Qt.state.directionalShadowMap,q),Qt.state.spotShadowMap.length>0&&st.setValue(U,"spotShadowMap",Qt.state.spotShadowMap,q),Qt.state.pointShadowMap.length>0&&st.setValue(U,"pointShadowMap",Qt.state.pointShadowMap,q)),G.isSkinnedMesh){st.setOptional(U,G,"bindMatrix"),st.setOptional(U,G,"bindMatrixInverse");let pt=G.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),st.setValue(U,"boneTexture",pt.boneTexture,q))}G.isBatchedMesh&&(st.setOptional(U,G,"batchingTexture"),st.setValue(U,"batchingTexture",G._matricesTexture,q),st.setOptional(U,G,"batchingIdTexture"),st.setValue(U,"batchingIdTexture",G._indirectTexture,q),st.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&st.setValue(U,"batchingColorTexture",G._colorsTexture,q));let tr=k.morphAttributes;if((tr.position!==void 0||tr.normal!==void 0||tr.color!==void 0)&&I.update(G,k,gi),(er||_e.receiveShadow!==G.receiveShadow)&&(_e.receiveShadow=G.receiveShadow,st.setValue(U,"receiveShadow",G.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&L.environment!==null&&(bt.envMapIntensity.value=L.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=Cp()),er){if(st.setValue(U,"toneMappingExposure",P.toneMappingExposure),_e.needsLights&&Gp(bt,kr),pe&&B.fog===!0&&Te.refreshFogUniforms(bt,pe),Te.refreshMaterialUniforms(bt,B,j,K,b.state.transmissionRenderTarget[v.id]),_e.needsLights&&_e.lightProbeGrid){let pt=_e.lightProbeGrid;bt.probesSH.value=pt.texture,bt.probesMin.value.copy(pt.boundingBox.min),bt.probesMax.value.copy(pt.boundingBox.max),bt.probesResolution.value.copy(pt.resolution)}vr.upload(U,Mc(_e),bt,q)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(vr.upload(U,Mc(_e),bt,q),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&st.setValue(U,"center",G.center),st.setValue(U,"modelViewMatrix",G.modelViewMatrix),st.setValue(U,"normalMatrix",G.normalMatrix),st.setValue(U,"modelMatrix",G.matrixWorld),B.uniformsGroups!==void 0){let pt=B.uniformsGroups;for(let ir=0,Wr=pt.length;ir<Wr;ir++){let bc=pt[ir];te.update(bc,gi),te.bind(bc,gi)}}return gi}function Gp(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.sunLights.needsUpdate=L,v.sunLightShadows.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function zp(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return re},this.setRenderTargetTextures=function(v,L,k){let B=H.get(v);B.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),H.get(v.texture).__webglTexture=L,H.get(v.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:k,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,L){let k=H.get(v);k.__webglFramebuffer=L,k.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(v,L=0,k=0){re=v,W=L,X=k;let B=null,G=!1,pe=!1;if(v){let ue=H.get(v);if(ue.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(U.FRAMEBUFFER,ue.__webglFramebuffer),ie.copy(v.viewport),Pe.copy(v.scissor),we=v.scissorTest,g.viewport(ie),g.scissor(Pe),g.setScissorTest(we),Z=-1;return}else if(ue.__webglFramebuffer===void 0)q.setupRenderTarget(v);else if(ue.__hasExternalTextures)q.rebindTextures(v,H.get(v.texture).__webglTexture,H.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let ze=v.depthTexture;if(ue.__boundDepthTexture!==ze){if(ze!==null&&H.has(ze)&&(v.width!==ze.image.width||v.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(v)}}let Se=v.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(pe=!0);let Ee=H.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ee[L])?B=Ee[L][k]:B=Ee[L],G=!0):v.samples>0&&q.useMultisampledRTT(v)===!1?B=H.get(v).__webglMultisampledFramebuffer:Array.isArray(Ee)?B=Ee[k]:B=Ee,ie.copy(v.viewport),Pe.copy(v.scissor),we=v.scissorTest}else ie.copy(xe).multiplyScalar(j).floor(),Pe.copy(He).multiplyScalar(j).floor(),we=Pt;if(k!==0&&(B=z),g.bindFramebuffer(U.FRAMEBUFFER,B)&&g.drawBuffers(v,B),g.viewport(ie),g.scissor(Pe),g.setScissorTest(we),G){let ue=H.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+L,ue.__webglTexture,k)}else if(pe){let ue=L;for(let Se=0;Se<v.textures.length;Se++){let Ee=H.get(v.textures[Se]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Se,Ee.__webglTexture,k,ue)}}else if(v!==null&&k!==0){let ue=H.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ue.__webglTexture,k)}Z=-1};function yc(v){let L=H.get(v);return(L.__readFormat!==v.format||L.__readType!==v.type)&&(L.__readFormat=v.format,L.__readType=v.type,L.__formatReadable=w.textureFormatReadable(v.format),L.__typeReadable=w.textureTypeReadable(v.type)),L}this.readRenderTargetPixels=function(v,L,k,B,G,pe,ve,ue=0){if(!(v&&v.isWebGLRenderTarget)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=H.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se){g.bindFramebuffer(U.FRAMEBUFFER,Se);try{let Ee=v.textures[ue],ze=Ee.format,Xe=Ee.type;v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ue);let ye=yc(Ee);if(ye.__formatReadable===!1){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ye.__typeReadable===!1){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-B&&k>=0&&k<=v.height-G&&U.readPixels(L,k,B,G,he.convert(ze),he.convert(Xe),pe)}finally{let Ee=re!==null?H.get(re).__webglFramebuffer:null;g.bindFramebuffer(U.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(v,L,k,B,G,pe,ve,ue=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=H.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se)if(L>=0&&L<=v.width-B&&k>=0&&k<=v.height-G){g.bindFramebuffer(U.FRAMEBUFFER,Se);let Ee=v.textures[ue],ze=Ee.format,Xe=Ee.type;v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ue);let ye=yc(Ee);if(ye.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ye.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let et=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,et),U.bufferData(U.PIXEL_PACK_BUFFER,pe.byteLength,U.STREAM_READ),U.readPixels(L,k,B,G,he.convert(ze),he.convert(Xe),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let At=re!==null?H.get(re).__webglFramebuffer:null;g.bindFramebuffer(U.FRAMEBUFFER,At);let mt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await oh(U,mt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,et),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,pe),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(et),U.deleteSync(mt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,L=null,k=0){let B=Math.pow(2,-k),G=Math.floor(v.image.width*B),pe=Math.floor(v.image.height*B),ve=L!==null?L.x:0,ue=L!==null?L.y:0;q.setTexture2D(v,0),U.copyTexSubImage2D(U.TEXTURE_2D,k,0,0,ve,ue,G,pe),g.unbindTexture()},this.copyTextureToTexture=function(v,L,k=null,B=null,G=0,pe=0){let ve,ue,Se,Ee,ze,Xe,ye,et,At,mt=v.isCompressedTexture?v.mipmaps[pe]:v.image;if(k!==null)ve=k.max.x-k.min.x,ue=k.max.y-k.min.y,Se=k.isBox3?k.max.z-k.min.z:1,Ee=k.min.x,ze=k.min.y,Xe=k.isBox3?k.min.z:0;else{let bt=Math.pow(2,-G);ve=Math.floor(mt.width*bt),ue=Math.floor(mt.height*bt),v.isDataArrayTexture?Se=mt.depth:v.isData3DTexture?Se=Math.floor(mt.depth*bt):Se=1,Ee=0,ze=0,Xe=0}B!==null?(ye=B.x,et=B.y,At=B.z):(ye=0,et=0,At=0);let ct=he.convert(L.format),Wt=he.convert(L.type),_e;L.isData3DTexture?(q.setTexture3D(L,0),_e=U.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(q.setTexture2DArray(L,0),_e=U.TEXTURE_2D_ARRAY):(q.setTexture2D(L,0),_e=U.TEXTURE_2D),g.activeTexture(U.TEXTURE0),g.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,L.flipY),g.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),g.pixelStorei(U.UNPACK_ALIGNMENT,L.unpackAlignment);let Qt=g.getParameter(U.UNPACK_ROW_LENGTH),Ke=g.getParameter(U.UNPACK_IMAGE_HEIGHT),gi=g.getParameter(U.UNPACK_SKIP_PIXELS),Di=g.getParameter(U.UNPACK_SKIP_ROWS),er=g.getParameter(U.UNPACK_SKIP_IMAGES);g.pixelStorei(U.UNPACK_ROW_LENGTH,mt.width),g.pixelStorei(U.UNPACK_IMAGE_HEIGHT,mt.height),g.pixelStorei(U.UNPACK_SKIP_PIXELS,Ee),g.pixelStorei(U.UNPACK_SKIP_ROWS,ze),g.pixelStorei(U.UNPACK_SKIP_IMAGES,Xe);let kr=v.isDataArrayTexture||v.isData3DTexture,st=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){let bt=H.get(v),tr=H.get(L),pt=H.get(bt.__renderTarget),ir=H.get(tr.__renderTarget);g.bindFramebuffer(U.READ_FRAMEBUFFER,pt.__webglFramebuffer),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,ir.__webglFramebuffer);for(let Wr=0;Wr<Se;Wr++)kr&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(v).__webglTexture,G,Xe+Wr),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(L).__webglTexture,pe,At+Wr)),U.blitFramebuffer(Ee,ze,ve,ue,ye,et,ve,ue,U.DEPTH_BUFFER_BIT,U.NEAREST);g.bindFramebuffer(U.READ_FRAMEBUFFER,null),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||v.isRenderTargetTexture||H.has(v)){let bt=H.get(v),tr=H.get(L);g.bindFramebuffer(U.READ_FRAMEBUFFER,D),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,V);for(let pt=0;pt<Se;pt++)kr?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,bt.__webglTexture,G,Xe+pt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,bt.__webglTexture,G),st?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,tr.__webglTexture,pe,At+pt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,tr.__webglTexture,pe),G!==0?U.blitFramebuffer(Ee,ze,ve,ue,ye,et,ve,ue,U.COLOR_BUFFER_BIT,U.NEAREST):st?U.copyTexSubImage3D(_e,pe,ye,et,At+pt,Ee,ze,ve,ue):U.copyTexSubImage2D(_e,pe,ye,et,Ee,ze,ve,ue);g.bindFramebuffer(U.READ_FRAMEBUFFER,null),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else st?v.isDataTexture||v.isData3DTexture?U.texSubImage3D(_e,pe,ye,et,At,ve,ue,Se,ct,Wt,mt.data):L.isCompressedArrayTexture?U.compressedTexSubImage3D(_e,pe,ye,et,At,ve,ue,Se,ct,mt.data):U.texSubImage3D(_e,pe,ye,et,At,ve,ue,Se,ct,Wt,mt):v.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,pe,ye,et,ve,ue,ct,Wt,mt.data):v.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,pe,ye,et,mt.width,mt.height,ct,mt.data):U.texSubImage2D(U.TEXTURE_2D,pe,ye,et,ve,ue,ct,Wt,mt);g.pixelStorei(U.UNPACK_ROW_LENGTH,Qt),g.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ke),g.pixelStorei(U.UNPACK_SKIP_PIXELS,gi),g.pixelStorei(U.UNPACK_SKIP_ROWS,Di),g.pixelStorei(U.UNPACK_SKIP_IMAGES,er),pe===0&&L.generateMipmaps&&U.generateMipmap(_e),g.unbindTexture()},this.initRenderTarget=function(v){H.get(v).__webglFramebuffer===void 0&&q.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?q.setTextureCube(v,0):v.isData3DTexture?q.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?q.setTexture2DArray(v,0):q.setTexture2D(v,0),g.unbindTexture()},this.resetState=function(){W=0,X=0,re=null,g.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ue._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ue._getUnpackColorSpace()}};var jn={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var mi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},D_=new ji(-1,1,1,-1,0,1),ac=class extends Ve{constructor(){super(),this.setAttribute("position",new Ne([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ne([0,2,0,0,2,0],2))}},I_=new ac,Mr=class{constructor(e){this._mesh=new at(I_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,D_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var so=class extends mi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ci.clone(e.uniforms),this.material=new lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Mr(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var oo=class extends mi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let n=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),s.buffers.stencil.setFunc(n.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(n.EQUAL,1,4294967295),s.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),s.buffers.stencil.setLocked(!0)}},Ya=class extends mi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var lc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new Y);this._width=i.width,this._height=i.height,t=new ht(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:_t}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new so(jn),this.copyPass.material.blending=$t,this.timer=new $s}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let n=0,s=this.passes.length;n<s;n++){let o=this.passes[n];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}oo!==void 0&&(o instanceof oo?i=!0:o instanceof Ya&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Y);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var cc=class extends mi{constructor(e,t,i=null,n=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new de}render(e,t,i){let n=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=n}};var Pp={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new de(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var ao=class r extends mi{constructor(e,t=1,i,n){super(),this.strength=t,this.radius=i,this.threshold=n,this.resolution=e!==void 0?new Y(e.x,e.y):new Y(256,256),this.clearColor=new de(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ht(s,o,{type:_t,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){let p=new ht(s,o,{type:_t,depthBuffer:!1});p.texture.name="UnrealBloomPass.h"+f,p.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(p);let h=new ht(s,o,{type:_t,depthBuffer:!1});h.texture.name="UnrealBloomPass.v"+f,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),s=Math.round(s/2),o=Math.round(o/2)}let a=Pp;this.highPassUniforms=Ci.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new lt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new Y(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ci.clone(jn.uniforms),this.blendMaterial=new lt({uniforms:this.copyUniforms,vertexShader:jn.vertexShader,fragmentShader:jn.fragmentShader,premultipliedAlpha:!0,blending:rr,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new de,this._oldClearAlpha=1,this._basic=new Si,this._fsQuad=new Mr(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(i,n);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,n),this.renderTargetsVertical[s].setSize(i,n),this.separableBlurMaterials[s].uniforms.invSize.value=new Y(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2)}render(e,t,i,n,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=r.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=r.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){let t=[],i=e/3;for(let o=0;o<e;o++)t.push(.39894*Math.exp(-.5*o*o/(i*i))/i);let n=[],s=[];for(let o=1;o<e;o+=2){let a=t[o],l=o+1<e?t[o+1]:0,c=a+l;n.push((o*a+(o+1)*l)/c),s.push(c)}return new lt({defines:{KERNEL_PAIRS:n.length},uniforms:{colorTexture:{value:null},invSize:{value:new Y(.5,.5)},direction:{value:new Y(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:n},gaussianWeights:{value:s}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new lt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};ao.BlurDirectionX=new Y(1,0);ao.BlurDirectionY=new Y(0,1);var lo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var hc=class extends mi{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ci.clone(lo.uniforms),this.material=new Pi({name:lo.name,uniforms:this.uniforms,vertexShader:lo.vertexShader,fragmentShader:lo.fragmentShader}),this._fsQuad=new Mr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ue.getTransfer(this._outputColorSpace)===ke&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===qr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Yr?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Zr?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Tr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Jr?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Qr?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Kr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Za=class r extends at{constructor(){super(r.Geometry,new Si({opacity:0,transparent:!0})),this.isLensflare=!0,this.type="Lensflare",this.frustumCulled=!1,this.renderOrder=1/0;let e=new A,t=new A,i=new zn(16,16),n=new zn(16,16),s=gt,o=r.Geometry,a=new Pi({uniforms:{scale:{value:null},screenPosition:{value:null}},vertexShader:`

				precision highp float;

				uniform vec3 screenPosition;
				uniform vec2 scale;

				attribute vec3 position;

				void main() {

					gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );

				}`,fragmentShader:`

				precision highp float;

				void main() {

					gl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );

				}`,depthTest:!0,depthWrite:!1,transparent:!1}),l=new Pi({uniforms:{map:{value:i},scale:{value:null},screenPosition:{value:null}},vertexShader:`

				precision highp float;

				uniform vec3 screenPosition;
				uniform vec2 scale;

				attribute vec3 position;
				attribute vec2 uv;

				varying vec2 vUV;

				void main() {

					vUV = uv;

					gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );

				}`,fragmentShader:`

				precision highp float;

				uniform sampler2D map;

				varying vec2 vUV;

				void main() {

					gl_FragColor = texture2D( map, vUV );

				}`,depthTest:!1,depthWrite:!1,transparent:!1}),c=new at(o,a),f=[],p=co.Shader,h=new Pi({name:p.name,uniforms:{map:{value:null},occlusionMap:{value:n},color:{value:new de(16777215)},scale:{value:new Y},screenPosition:{value:new A}},vertexShader:p.vertexShader,fragmentShader:p.fragmentShader,blending:rr,transparent:!0,depthWrite:!1}),d=new at(o,h);this.addElement=function(y){f.push(y)};let x=new Y,S=new Y,m=new js,u=new Ye;this.onBeforeRender=function(y,R,M){y.getCurrentViewport(u);let T=y.getRenderTarget(),b=T!==null?T.texture.type:gt;s!==b&&(i.dispose(),n.dispose(),i.type=n.type=b,s=b);let C=u.w/u.z,_=u.z/2,E=u.w/2,P=16/u.w;if(x.set(P*C,P),m.min.set(u.x,u.y),m.max.set(u.x+(u.z-16),u.y+(u.w-16)),t.setFromMatrixPosition(this.matrixWorld),t.applyMatrix4(M.matrixWorldInverse),!(t.z>0)&&(e.copy(t).applyMatrix4(M.projectionMatrix),S.x=u.x+e.x*_+_-8,S.y=u.y+e.y*E+E-8,m.containsPoint(S))){y.copyFramebufferToTexture(i,S);let N=a.uniforms;N.scale.value=x,N.screenPosition.value=e,y.renderBufferDirect(M,null,o,a,c,null),y.copyFramebufferToTexture(n,S),N=l.uniforms,N.scale.value=x,N.screenPosition.value=e,y.renderBufferDirect(M,null,o,l,c,null);let F=-e.x*2,z=-e.y*2;for(let D=0,V=f.length;D<V;D++){let W=f[D],X=h.uniforms;X.color.value.copy(W.color),X.map.value=W.texture,X.screenPosition.value.x=e.x+F*W.distance,X.screenPosition.value.y=e.y+z*W.distance,P=W.size/u.w;let re=u.w/u.z;X.scale.value.set(P*re,P),h.uniformsNeedUpdate=!0,y.renderBufferDirect(M,null,o,h,d,null)}}},this.dispose=function(){a.dispose(),l.dispose(),h.dispose(),i.dispose(),n.dispose();for(let y=0,R=f.length;y<R;y++)f[y].texture.dispose()}}},co=class{constructor(e,t=1,i=0,n=new de(16777215)){this.texture=e,this.size=t,this.distance=i,this.color=n}};co.Shader={name:"LensflareElementShader",uniforms:{map:{value:null},occlusionMap:{value:null},color:{value:null},scale:{value:null},screenPosition:{value:null}},vertexShader:`

		precision highp float;

		uniform vec3 screenPosition;
		uniform vec2 scale;

		uniform sampler2D occlusionMap;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUV;
		varying float vVisibility;

		void main() {

			vUV = uv;

			vec2 pos = position.xy;

			vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );

			vVisibility =        visibility.r / 9.0;
			vVisibility *= 1.0 - visibility.g / 9.0;
			vVisibility *=       visibility.b / 9.0;

			gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D map;
		uniform vec3 color;

		varying vec2 vUV;
		varying float vVisibility;

		void main() {

			vec4 texture = texture2D( map, vUV );
			texture.a *= vVisibility;
			gl_FragColor = texture;
			gl_FragColor.rgb *= color;

		}`};Za.Geometry=(function(){let r=new Ve,e=new Float32Array([-1,-1,0,0,0,1,-1,0,1,0,1,1,0,1,1,-1,1,0,0,1]),t=new Ir(e,5);return r.setIndex([0,1,2,0,2,3]),r.setAttribute("position",new Ji(t,3,0,!1)),r.setAttribute("uv",new Ji(t,2,3,!1)),r})();var Lp={type:"change"},dc={type:"start"},Ip={type:"end"},Ka=new pi,Dp=new Kt,U_=Math.cos(70*Ao.DEG2RAD),Nt=new A,li=2*Math.PI,nt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},fc=1e-6,uc=class extends eo{constructor(e,t=null){super(e,t),this.state=nt.NONE,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:yr.ROTATE,MIDDLE:yr.DOLLY,RIGHT:yr.PAN},this.touches={ONE:br.ROTATE,TWO:br.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new Vt,this._lastTargetPosition=new A,this._quat=new Vt().setFromUnitVectors(e.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Vr,this._sphericalDelta=new Vr,this._scale=1,this._panOffset=new A,this._rotateStart=new Y,this._rotateEnd=new Y,this._rotateDelta=new Y,this._panStart=new Y,this._panEnd=new Y,this._panDelta=new Y,this._dollyStart=new Y,this._dollyEnd=new Y,this._dollyDelta=new Y,this._dollyDirection=new A,this._mouse=new Y,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=F_.bind(this),this._onPointerDown=N_.bind(this),this._onPointerUp=O_.bind(this),this._onContextMenu=W_.bind(this),this._onMouseWheel=z_.bind(this),this._onKeyDown=V_.bind(this),this._onTouchStart=H_.bind(this),this._onTouchMove=k_.bind(this),this._onMouseDown=B_.bind(this),this._onMouseMove=G_.bind(this),this._interceptControlDown=X_.bind(this),this._interceptControlUp=q_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=nt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Lp),this.update(),this.state=nt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Nt.copy(t).sub(this.target),Nt.applyQuaternion(this._quat),this._spherical.setFromVector3(Nt),this.autoRotate&&this.state===nt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=li:i>Math.PI&&(i-=li),n<-Math.PI?n+=li:n>Math.PI&&(n-=li),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Nt.setFromSpherical(this._spherical),Nt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Nt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Nt.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){let a=new A(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;let c=new A(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Nt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ka.origin.copy(this.object.position),Ka.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ka.direction))<U_?this.object.lookAt(this.target):(Dp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ka.intersectPlane(Dp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>fc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>fc||this._lastTargetPosition.distanceToSquared(this.target)>fc?(this.dispatchEvent(Lp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?li/60*this.autoRotateSpeed*e:li/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Nt.setFromMatrixColumn(t,0),Nt.multiplyScalar(-e),this._panOffset.add(Nt)}_panUp(e,t){this.screenSpacePanning===!0?Nt.setFromMatrixColumn(t,1):(Nt.setFromMatrixColumn(t,0),Nt.crossVectors(this.object.up,Nt)),Nt.multiplyScalar(e),this._panOffset.add(Nt)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let n=this.object.position;Nt.copy(n).sub(this.target);let s=Nt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),n=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=n/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(li*this._rotateDelta.x/t.clientHeight),this._rotateUp(li*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panStart.set(i,n)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,s=Math.sqrt(i*i+n*n);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),n=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(n,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(li*this._rotateDelta.x/t.clientHeight),this._rotateUp(li*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,s=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Y,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function N_(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function F_(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function O_(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ip),this.state=nt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function B_(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case yr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=nt.DOLLY;break;case yr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=nt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=nt.ROTATE}break;case yr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=nt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=nt.PAN}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(dc)}function G_(r){switch(this.state){case nt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case nt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case nt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function z_(r){this.enabled===!1||this.enableZoom===!1||this.state!==nt.NONE||(r.preventDefault(),this.dispatchEvent(dc),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Ip))}function V_(r){this.enabled!==!1&&this._handleKeyDown(r)}function H_(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case br.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=nt.TOUCH_ROTATE;break;case br.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=nt.TOUCH_PAN;break;default:this.state=nt.NONE}break;case 2:switch(this.touches.TWO){case br.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=nt.TOUCH_DOLLY_PAN;break;case br.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=nt.TOUCH_DOLLY_ROTATE;break;default:this.state=nt.NONE}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(dc)}function k_(r){switch(this._trackPointer(r),this.state){case nt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case nt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case nt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case nt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=nt.NONE}}function W_(r){this.enabled!==!1&&r.preventDefault()}function X_(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function q_(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}export{Tr as ACESFilmicToneMapping,rr as AdditiveBlending,Ia as AmbientLight,vt as BackSide,oi as Box3,Dt as BufferAttribute,Ve as BufferGeometry,ca as CanvasTexture,Qs as CatmullRomCurve3,jt as ClampToEdgeWrapping,Oa as Clock,de as Color,Pl as CylinderGeometry,mr as DataTexture,Ll as DodecahedronGeometry,si as DoubleSide,kp as DynamicDrawUsage,lc as EffectComposer,Fr as EllipseCurve,Gt as Euler,Ne as Float32BufferAttribute,wt as FloatType,ci as FrontSide,Fi as Frustum,qi as Group,_t as HalfFloatType,wa as HemisphereLight,Bl as IcosahedronGeometry,jo as InstancedMesh,Ui as Layers,Za as Lensflare,co as LensflareElement,Bn as Line,On as LineBasicMaterial,sa as LineLoop,Mt as LinearFilter,xi as LinearMipmapLinearFilter,lr as LinearSRGBColorSpace,St as Material,Ao as MathUtils,De as Matrix4,at as Mesh,Si as MeshBasicMaterial,Sa as MeshLambertMaterial,Ma as MeshPhongMaterial,va as MeshStandardMaterial,ot as NearestFilter,Xt as NoToneMapping,Gi as NormalBlending,rt as Object3D,uc as OrbitControls,hc as OutputPass,ja as PCFSoftShadowMap,Et as PerspectiveCamera,Gr as PlaneGeometry,Da as PointLight,la as Points,Gn as PointsMaterial,Vt as Quaternion,Lt as RGBAFormat,Fa as Raycaster,cc as RenderPass,$r as RepeatWrapping,Gl as RingGeometry,qt as SRGBColorSpace,Uo as Scene,ai as ShaderLib,lt as ShaderMaterial,so as ShaderPass,Ht as Sphere,zl as SphereGeometry,Vr as Spherical,Ho as Sprite,Ln as SpriteMaterial,Gs as StaticDrawUsage,it as Texture,Aa as TextureLoader,Vl as TorusGeometry,Hl as TubeGeometry,se as UniformsLib,Ci as UniformsUtils,ao as UnrealBloomPass,gt as UnsignedByteType,Y as Vector2,A as Vector3,ht as WebGLRenderTarget,qa as WebGLRenderer};
