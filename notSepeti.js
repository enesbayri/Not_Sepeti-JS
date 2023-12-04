

const yeniGorev=document.querySelector('.input-gorev');
const yeniGorevEkleBtn=document.querySelector('.btn-gorev-ekle');
const gorevListesi=document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click',gorevEkle);
gorevListesi.addEventListener('click',gorevSilTamamla);

document.addEventListener('DOMContentLoaded',localStorageOku);
document.addEventListener('DOMContentLoaded',tamamlananlocalStorageOku);

function gorevEkle(e){
    e.preventDefault();
    if(yeniGorev.value.length>0){
        
        gorevEkranaEkle(yeniGorev.value);

        localStorageKaydet(yeniGorev.value);
        yeniGorev.value="";

       



    }else{
        alert("BOŞ GÖREV GİRİŞİ YAPILAMAZ");
    }

}

function gorevSilTamamla(e){
    const tiklanilanEleman=e.target;
    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){

        const tamamlananEleman=tiklanilanEleman.parentElement.children[0].innerText;

        if(tiklanilanEleman.parentElement.classList.contains('gorev-tamamlandi')){

            tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
            localStorageKaydet(tamamlananEleman);
            tamamlananlocalStorageSil(tamamlananEleman);

        }else{

            tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
            tamamlananlocalStorageKaydet(tamamlananEleman);
            localStorageSil(tamamlananEleman);
        }
        
    }
    else if(tiklanilanEleman.classList.contains('gorev-btn-sil')){
        tiklanilanEleman.parentElement.classList.toggle('kaybol');

        const silinecekGorev=tiklanilanEleman.parentElement.children[0].innerText;
        if(tiklanilanEleman.parentElement.classList.contains('gorev-tamamlandi')){
            tamamlananlocalStorageSil(silinecekGorev);
        }else{
            localStorageSil(silinecekGorev);
        }
        

        tiklanilanEleman.parentElement.addEventListener('transitionend' , function(){
            tiklanilanEleman.parentElement.remove();
        });

    }
}
function tamamlananlocalStorageKaydet(yeniGorev){
    let gorevler=tamamlananGorevlerim();
    gorevler.push(yeniGorev);
    localStorage.setItem('tamamlanangorevler',JSON.stringify(gorevler));
}

function localStorageKaydet(yeniGorev){
    let gorevler=gorevlerim();
    

    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler',JSON.stringify(gorevler));
}
function tamamlananlocalStorageOku(){
    let gorevler;
    if(localStorage.getItem('tamamlanangorevler')===null){
        gorevler=[];
    }
    else{
        gorevler=JSON.parse(localStorage.getItem('tamamlanangorevler'));
    }
    gorevler.forEach(function(gorev){
        tamamlanangorevEkranaEkle(gorev);
    });
}

function localStorageOku(){
    let gorevler;
    if(localStorage.getItem('gorevler')===null){
        gorevler=[];
    }
    else{
        gorevler=JSON.parse(localStorage.getItem('gorevler'));
    }
    gorevler.forEach(function(gorev){
        gorevEkranaEkle(gorev);
    });
}

function localStorageSil(gorev){
    let gorevler=gorevlerim();
    
    const silinecekindex=gorevler.indexOf(gorev);
    gorevler.splice(silinecekindex,1);
    localStorage.setItem('gorevler',JSON.stringify(gorevler));

}
function tamamlananlocalStorageSil(gorev){
    let gorevler=tamamlananGorevlerim();
    
    const silinecekindex=gorevler.indexOf(gorev);
    gorevler.splice(silinecekindex,1);
    localStorage.setItem('tamamlanangorevler',JSON.stringify(gorevler));

}

function gorevEkranaEkle(gorev){
    const gorevDiv=document.createElement('div');
        gorevDiv.classList.add('gorev-item');

        const gorevLi=document.createElement('li');
        gorevLi.classList.add('gorev-tanim');
        gorevLi.innerText=gorev;
        gorevDiv.appendChild(gorevLi);

        const gorevTamamBtn=document.createElement('button');
        gorevTamamBtn.classList.add('gorev-btn');
        gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
        gorevTamamBtn.innerHTML='<i class="fa-solid fa-clipboard-check"></i>'
        gorevDiv.appendChild(gorevTamamBtn);

        const gorevSilBtn=document.createElement('button');
        gorevSilBtn.classList.add('gorev-btn');
        gorevSilBtn.classList.add('gorev-btn-sil');
        gorevSilBtn.innerHTML='<i class="fa-solid fa-trash-can"></i>';
        gorevDiv.appendChild(gorevSilBtn);

        gorevListesi.appendChild(gorevDiv);
}

function tamamlanangorevEkranaEkle(gorev){
    const gorevDiv=document.createElement('div');
        gorevDiv.classList.add('gorev-item');
        gorevDiv.classList.add('gorev-tamamlandi');

        const gorevLi=document.createElement('li');
        gorevLi.classList.add('gorev-tanim');
        gorevLi.innerText=gorev;
        gorevDiv.appendChild(gorevLi);

        const gorevTamamBtn=document.createElement('button');
        gorevTamamBtn.classList.add('gorev-btn');
        gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
        gorevTamamBtn.innerHTML='<i class="fa-solid fa-clipboard-check"></i>'
        gorevDiv.appendChild(gorevTamamBtn);

        const gorevSilBtn=document.createElement('button');
        gorevSilBtn.classList.add('gorev-btn');
        gorevSilBtn.classList.add('gorev-btn-sil');
        gorevSilBtn.innerHTML='<i class="fa-solid fa-trash-can"></i>';
        gorevDiv.appendChild(gorevSilBtn);

        gorevListesi.appendChild(gorevDiv);
}

function gorevlerim(){
    let gorevler;
    if(localStorage.getItem('gorevler')===null){
        gorevler=[];
    }
    else{
        gorevler=JSON.parse(localStorage.getItem('gorevler'));
    }
    return gorevler;
}

function tamamlananGorevlerim(){
    let gorevler;
    if(localStorage.getItem('tamamlanangorevler')===null){
        gorevler=[];
    }
    else{
        gorevler=JSON.parse(localStorage.getItem('tamamlanangorevler'));
    }
    return gorevler;
}