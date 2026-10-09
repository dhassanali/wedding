"use client";
import { useEffect,useRef,useState } from "react";
import { type InvitationLanguage } from "@/lib/invitation-language";

const words={
  ar:{bismillah:'بسم الله الرحمن الرحيم',invitation:'دعوة خاصة',coverWelcome:'يسعدني ويشرّفني حضوركم',hassan:'حسن علي جعفر',welcome:'يسعدني ويشرّفني دعوتكم لحضور حفل زفافي',date:'١٦ أكتوبر ٢٠٢٦ م',time:'الساعة ١٠ مساءً',hijri:'الجمعة، ٥ جمادى الأولى ١٤٤٨ هـ',map:'الموقع على الخريطة',contact:'تواصل معي',whatsapp:'تواصل عبر واتساب',venue:'الحسينية - قاعة المعالي',details:'تفاصيل الدعوة',countdown:'اقترب موعد اللقاء',days:'يوماً حتى يوم زفافي',when:'الموعد',where:'المكان',calendar:'أضف إلى التقويم',joy:'بحضوركم تكتمل فرحتي',reopen:'شاهد الدعوة من جديد',dua:'بارك الله لكما، وبارك عليكما، وجمع بينكما في خير',open:'اضغط لفتح الدعوة'},
  en:{bismillah:'In the name of Allah',invitation:'A special invitation',coverWelcome:'Your presence would be an honor',hassan:'Hassan Ali Jaffer',welcome:'It would be my pleasure and honor to invite you to my wedding celebration.',date:'16 October 2026',time:'10:00 PM (Saudi Arabia)',hijri:'Friday, 5 Jumada al-Awwal 1448 AH',map:'View location',contact:'Contact me',whatsapp:'Contact on WhatsApp',venue:'Al Hussainiyah - Al Maali Hall',details:'Invitation details',countdown:'Looking forward to seeing you',days:'days until my wedding day',when:'Date',where:'Venue',calendar:'Add to calendar',joy:'Your presence will make my day',reopen:'Open the invitation again',dua:'May Allah bless your marriage and unite you in goodness.',open:'Tap to open your invitation'}
};
export type Inviter = "sis" | "ma" | undefined;
export function inviterFromQuery(value: unknown): Inviter {
  return value === "sis" || value === "ma" ? value : undefined;
}
export function invitationWords(lang: InvitationLanguage, inviter?: Inviter) {
  const base = words[lang];
  if (!inviter) return base;
  const relation = inviter === "ma" ? "ولدي العزيز" : "أخي العزيز";
  const englishRelation = inviter === "ma" ? "son" : "brother";
  return {
    ...base,
    welcome: lang === "ar" ? `يسعدني ويشرفني دعوتكم لحضور حفل زفاف ${relation}` : `It would be my pleasure and honor to invite you to my ${englishRelation}’s wedding celebration.`,
    days: lang === "ar" ? `يوماً حتى حفل زفاف ${relation}` : `days until my ${englishRelation}’s wedding`,
  };
}
export default function Invitation({initialLanguage="ar",inviter}:{initialLanguage?:InvitationLanguage;inviter?:Inviter}) {
  const lang=initialLanguage;
  const [opened,setOpened]=useState(false),[opening,setOpening]=useState(false),[days,setDays]=useState(14),[dayState,setDayState]=useState('before');
  const t=invitationWords(lang,inviter),headingRef=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';},[lang]);
  useEffect(()=>{function tick(){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const n=(s:string)=>Number(parts.find(p=>p.type===s)?.value);const today=Date.UTC(n('year'),n('month')-1,n('day'));const delta=Math.round((Date.UTC(2026,9,16)-today)/86400000);setDays(Math.max(0,delta));setDayState(delta===0?'today':delta<0?'after':'before');}tick();const id=setInterval(tick,60000);return()=>clearInterval(id);},[]);
  useEffect(()=>{if(opened)headingRef.current?.focus({preventScroll:true});},[opened]);
  function open(){if(opening)return;setOpening(true);const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;setTimeout(()=>{setOpened(true);setOpening(false);window.scrollTo(0,0);},reduced?0:1100);}
  function calendar(){const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');const data=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Hassan Ali Jaffer//Wedding//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:hassan-20261016@wedding.local','DTSTAMP:'+stamp,'DTSTART:20261016T190000Z','SUMMARY:Hassan Ali Jaffer Wedding','LOCATION:الحسينية - قاعة المعالي','DESCRIPTION:5 Jumada al-Awwal 1448 AH','URL:https://maps.app.goo.gl/DrdGHb8r9gaohTfS8?g_st=ic','END:VEVENT','END:VCALENDAR',''].join('\r\n');const url=URL.createObjectURL(new Blob([data],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Hassan-Wedding.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
  if(!opened)return <div lang={lang} dir={lang==='ar'?'rtl':'ltr'} className={'cover '+(opening?'is-opening':'')}><div className="cover-art" aria-hidden="true"/><button onClick={open} className="open-card" aria-label={t.open}><span className="eyebrow">{t.coverWelcome}</span><span className="cover-title">{t.invitation}</span><span className="seal" aria-hidden="true">✦</span><span className="open-label">{t.open}</span></button><span className="glint g1" aria-hidden="true">✦</span><span className="glint g2" aria-hidden="true">✦</span><span className="glint g3" aria-hidden="true">✦</span></div>;
  return <main className="invitation" lang={lang} dir={lang==='ar'?'rtl':'ltr'}><section className="hero" aria-labelledby="names"><div className="hero-art" aria-hidden="true"/><div className="hero-content"><p className="eyebrow">{t.bismillah}</p><p className="kicker">{t.invitation}</p><p className="invitation-copy">{t.welcome}</p><h1 id="names" ref={headingRef} tabIndex={-1}><span className="groom-name">{t.hassan}</span></h1><div className="rule" aria-hidden="true"><span>✦</span></div><div className="event-date"><time className="date" dateTime="2026-10-16">{t.hijri}</time><time className="gregorian-date" dateTime="2026-10-16">{t.date}</time><time className="event-time" dateTime="2026-10-16T22:00:00+03:00">{t.time}</time></div><p className="venue">{t.venue}</p><a href="#details" className="discover">{t.details}</a></div></section>
  <section className="blessing">{lang==='ar'?<p className="dua" lang="ar" dir="rtl">بارك الله لكما، وبارك عليكما،<br/>وجمع بينكما في خير</p>:<p className="dua">{t.dua}</p>}</section>
  <section className="details" id="details" aria-labelledby="countdown-title"><h2 id="countdown-title">{t.countdown}</h2><div className="countdown"><span>{new Intl.NumberFormat(lang==='ar'?'ar-SA':'en').format(days)}</span><p>{dayState==='today'?(lang==='ar'?(inviter?'اليوم نحتفل معكم':'اليوم أحتفل معكم'):(inviter?'Today we celebrate with you':'Today I celebrate with you')):dayState==='after'?(lang==='ar'?'شكراً لمشاركتي فرحتي':'Thank you for sharing my joy'):t.days}</p></div><div className="event-actions"><a className="button outline" href="https://maps.app.goo.gl/DrdGHb8r9gaohTfS8?g_st=ic" target="_blank" rel="noopener noreferrer">{t.map}</a><button onClick={calendar} className="button gold">{t.calendar}</button></div></section>
  <footer><h2 className="contact-title">{t.contact}</h2><a className="button outline" href="https://wa.me/966554913863" target="_blank" rel="noopener noreferrer">{t.whatsapp}</a><p className="contact-number" dir="ltr">0554913863</p><button className="text-button" onClick={()=>{setOpened(false);window.scrollTo(0,0);}}>{t.reopen}</button></footer></main>;
}
