"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("axios"),t=require("muninn");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=r(e);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function i(e,t,r,o){return new(r||(r=Promise))((function(i,n){function s(e){try{l(o.next(e))}catch(e){n(e)}}function a(e){try{l(o.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}l((o=o.apply(e,t||[])).next())}))}class n extends o.default.Axios{constructor(e,t,r={}){var o;let i=Object.assign(Object.assign({},r),{url:e,method:t});i.baseURL=null!==(o=r.baseURL)&&void 0!==o?o:"https://www.tradingview.com/",i.headers=Object.assign(Object.assign({},null==r?void 0:r.headers),{"User-Agent":"tvsignal/1.0.1"}),"json"===(null==r?void 0:r.responseType)&&(i.transformResponse=e=>{try{return JSON.parse(e)}catch(t){return e}}),super(i)}get config(){return this.defaults}call(e){return this.request(Object.assign(Object.assign({},e),this.config))}}class s extends n{constructor(e,t={}){super(`https://www.tradingview.com/u/${e}/info/`,"POST",Object.assign(Object.assign({},t),{responseType:"json",headers:{referer:"https://www.tradingview.com/ideas/?sort=recent&video=no"},validateStatus:e=>200===e}))}static info(e,t={}){return i(this,void 0,void 0,(function*(){const r=new this(e,t);try{const{data:e}=yield r.call();return{id:e.id,username:e.username,avatar:e.big_picture_url,isPro:e.is_pro,charts:e.charts_count,followers:e.followers_count,reputation:e.reputation}}catch({message:e}){return console.error(e),null}}))}}class a extends n{constructor(e={}){super("/ideas/?sort=recent&video=no","GET",e)}static get(e,r={}){var o,n,a,l,u,c,d,v;return i(this,void 0,void 0,(function*(){const i=new this(r);try{const{data:r}=yield i.call(),{ideas:h}=t.parse(r,this.schema);let p=[];for(const t of h)if((null==t?void 0:t.title)&&(null==t?void 0:t.link)&&(null==t?void 0:t.symbol)&&(null==t?void 0:t.side)&&(null==t?void 0:t.author)&&!((null===(o=null==e?void 0:e.symbol)||void 0===o?void 0:o.length)&&-1===e.symbol.indexOf(t.symbol)||(null===(n=null==e?void 0:e.side)||void 0===n?void 0:n.length)&&t.side!==e.side)){if(null===(l=null===(a=null==e?void 0:e.author)||void 0===a?void 0:a.username)||void 0===l?void 0:l.length){if(-1===e.author.username.indexOf(t.author))continue}else{if(t.author=yield s.info(t.author),!t.author)continue;if((null===(u=null==e?void 0:e.author)||void 0===u?void 0:u.isPro)&&!t.author.isPro)continue;if((null===(c=null==e?void 0:e.author)||void 0===c?void 0:c.charts)&&t.author.charts<e.author.charts)continue;if((null===(d=null==e?void 0:e.author)||void 0===d?void 0:d.followers)&&t.author.followers<e.author.followers)continue;if((null===(v=null==e?void 0:e.author)||void 0===v?void 0:v.reputation)&&t.author.reputation<e.author.reputation)continue}p.push(t)}return p}catch({message:e}){return console.error(e),[]}}))}}a.schema={schema:{ideas:{selector:"div.tv-widget-idea",type:"array",schema:{title:"div.tv-widget-idea__title-row a",symbol:"div.tv-widget-idea__symbol-info a",side:{selector:"span.tv-widget-idea__label",custom:e=>e.toUpperCase()},link:{selector:"div.tv-widget-idea__title-row a",attr:"href"},image:{selector:"img.tv-widget-idea__cover",attr:"data-src"},caption:"p.tv-widget-idea__description-row",author:{selector:"span.tv-card-user-info a",attr:"data-username"}}}}};class l extends n{constructor(e,t={}){super(e,"GET",t)}static signal(e,r={}){var o,n,s;return i(this,void 0,void 0,(function*(){const i=new this(e,r);try{const{data:e}=yield i.call(),{sources:r}=null!==(o=t.parse(e,this.schema))&&void 0!==o?o:{sources:[]},a=r.find((({type:e})=>"MainSeries"===e)),l=null==a?void 0:a.symbolInfo,u=r.reverse().find((({type:e})=>"LineToolRiskRewardLong"===e||"LineToolRiskRewardShort"===e)),c=null==u?void 0:u.state,d=null==u?void 0:u.indexes;if(l&&c&&d&&d.length>=2){let e={symbol:l.name,base:l.base_currency,quote:l.currency_code,exchange:l.exchange};if(e.base||(e.base=e.symbol.replace(new RegExp(`${e.quote}$`,"i"),"")),(null===(n=d[0])||void 0===n?void 0:n.price)&&(e.entryPrice=d[0].price),e.entryPrice&&(null==c?void 0:c.stopLevel)&&(null==c?void 0:c.profitLevel)){e.side="LineToolRiskRewardLong"===u.type?"LONG":"SHORT";const t=c.profitLevel/l.pricescale,r=c.stopLevel/l.pricescale;"LONG"===e.side?(e.target=e.entryPrice+t,e.stoploss=e.entryPrice-r):(e.target=e.entryPrice-t,e.stoploss=e.entryPrice+r)}return(null==c?void 0:c.interval)&&(e.timeframe=c.interval),(null===(s=d[1])||void 0===s?void 0:s.time)&&(e.expireAt=new Date(d[1].time)),e}return null}catch({message:e}){return console.error(e),null}}))}}l.schema={schema:{sources:{selector:"div.tv-chart-view > script",html:!0,custom(e){try{const{viewChartOptions:t}=JSON.parse(e),{panes:r}=JSON.parse(t.content);return r[0].sources}catch(e){return[]}}}}},exports.Chart=l,exports.Ideas=a,exports.User=s;