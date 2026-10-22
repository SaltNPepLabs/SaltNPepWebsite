"use client";
import { useEffect, useRef, type ReactNode } from "react";

export function StoryReveal({children,className=""}:{children:ReactNode;className?:string}) {
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const node=ref.current;
  if(!node || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){node.animate([{opacity:.65,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.3,1)'});observer.unobserve(node);}},{threshold:.08});
  observer.observe(node);return()=>observer.disconnect();
 },[]);
 return <div ref={ref} className={className}>{children}</div>;
}
