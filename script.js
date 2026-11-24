const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰'}));

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');const filter=button.dataset.filter;
  document.querySelectorAll('.project-card').forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.category!==filter));
  document.querySelectorAll('.project-group').forEach(group=>{
    const visible=[...group.querySelectorAll('.project-card')].some(card=>!card.classList.contains('hidden'));
    group.classList.toggle('hidden',!visible);
  });
}));

const lightbox=document.getElementById('lightbox');const lightboxImg=lightbox.querySelector('img');const caption=lightbox.querySelector('figcaption');
const imageButtons=[...document.querySelectorAll('.project-image')];let current=0;
function showImage(index){current=(index+imageButtons.length)%imageButtons.length;const button=imageButtons[current];lightboxImg.src=button.dataset.image;lightboxImg.alt=button.querySelector('img').alt;caption.textContent=button.dataset.title;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeImage(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''}
imageButtons.forEach((button,index)=>button.addEventListener('click',()=>showImage(index)));
lightbox.querySelector('.lightbox-close').addEventListener('click',closeImage);
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>showImage(current-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>showImage(current+1));
lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeImage()});
document.addEventListener('keydown',event=>{if(!lightbox.classList.contains('open'))return;if(event.key==='Escape')closeImage();if(event.key==='ArrowLeft')showImage(current-1);if(event.key==='ArrowRight')showImage(current+1)});
document.getElementById('year').textContent=new Date().getFullYear();
