## Thought Process & Design Decisions
Drag & drop yerine mousemove + click mantığına geçtim. Artık sürüklemek yerine top mouse’u takip ediyor, tıklayınca bırakılıyor.
Topun başlangıç konumu position: fixed yerine board’a göre ayarlandı. Böylece sayfanın rastgele bir yerinde değil, doğrudan board’un üstünde başlıyor.
parseInt(ball.innerText) yerine ball.dataset.kg kullandım. Çünkü innerText bazen boş geliyordu ve NaN hatası oluşuyordu.
boardRect değişkenini global yaptım. Her event’te yeniden hesaplanmasını engelleyerek performansı iyileştirdim.
mousemove ve mouseup event’lerini döngü dışına aldım. Önceden her tıklamada yeni listener ekleniyordu ve bu da birikmeye sebep oluyordu.
Açı (angle) ve transform hesaplarını forEach dışına çıkardım. Döngü tamamlanmadan hesaplandığı için yanlış sonuç veriyordu.
calculateTorque() fonksiyonunu createBall() çağrısından sonraya aldım. Yeni top DOM’a eklenmeden hesaplama yapıldığı için NaN problemi oluşuyordu.
colors dizisini createBall() dışına taşıdım. Her çağrıda yeniden oluşturulmasının önüne geçtim.
localStorage ile saveState / loadState ekledim. Böylece sayfa yenilendiğinde state kaybolmuyor.

## Trade-offs & Limitations

boardRect'i global tutmak performans için iyiydi ama board konumu değişince yanlış hesap verdi her yerde taze almak doğru ama yavaş                                             
innerHTML yerine dataset.kg kullanmak daha güvenli ama ekstra kod gerektirdi                                                                                                      
Drag & drop yerine mouse takip + click mantığına geçmek daha basit ama daha az interaktif hissettiriyor
visibility: hidden ile başlamak mantıklıydı ama mouse hareket etmeyince top görünmüyordu  

Toplar üst üste binince ayrılamıyor, hangisi nerede belli olmuyor                                                                                                                 
Board döndüğünde getBoundingClientRect() eğik board koordinatları döndürüyor, torque hesabı bunu dikkate almıyor                                                                  
localStorage sadece left ve kg saklıyor, top boyutu yeniden hesaplanıyor
tork değerleri px cm dönüşümü yapılmamıştır görülen tork değerleri gerçek tork değerleri değildir sadece sol ve sağ kısımların arasındaki farkı görebilmek için eklenmiştir.

## AI Usage
css de tasarım kısmında info cardlarının olduğu yerde daha estetik gözükmesi için ai kullandı.Local storageye kaydolmuyordu yazarken claude'a debug yaptırıp düzelttirdim.Readme yazarken yardım aldım.
