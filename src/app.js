document.documentElement.classList.add("js");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -8%"});
  document.querySelectorAll(".section,.case-story,.case-cover,.case-contact,.next-case").forEach((el)=>observer.observe(el));
}
