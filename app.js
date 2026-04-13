 const board = document.getElementById("board");                                                                                                                                       
  let currentBall = null;                                                                                                                                                                                                                                                                                                                 
  function createBall() {      
     const colors = [                                                                                                                                                                      
      '#3498db',  // 1kg - mavi
      '#2ecc71',  // 2kg - yeşil                                                                                                                                                        
      '#1abc9c',  // 3kg - turkuaz                                                                                                                                                    
      '#f1c40f',  // 4kg - sarı                                                                                                                                                         
      '#e67e22',  // 5kg - turuncu                                                                                                                                                    
      '#e74c3c',  // 6kg - kırmızı                                                                                                                                                      
      '#9b59b6',  // 7kg - mor                                                                                                                                                          
      '#e91e63',  // 8kg - pembe
      '#795548',  // 9kg - kahve                                                                                                                                                        
      '#37474f',  // 10kg - koyu gri                                                                                                                                                  
  ];                                                                                                                                                                                    
                                                                                                                                                            
      const ball = document.createElement("div");
      const kg = Math.floor(Math.random() * 10) + 1;    
      const size = 20 + (kg*4);                                                                                                                                

      ball.className = "weight-ball";
      ball.innerText = kg + "kg";   
      ball.style.position = "fixed";                                                                                                                                                    
      ball.style.top = "30px";
      ball.style.height =  size + "px"
      ball.style.width =  size + "px";
      ball.style.left = "300px"; 
      ball.style.backgroundColor = colors[kg-1];                                                                                                            
                                                                                                                                                                                      
                                                                                                                                                                          
    currentBall = ball;     
    document.body.appendChild(ball);
  }

                                            
document.addEventListener('mousemove',function(e){
    const boardRect = board.getBoundingClientRect();
     if (e.clientX >= boardRect.left && e.clientX <= boardRect.right){
        currentBall.style.visibility = 'visible';                     
        currentBall.style.left = (e.clientX - size / 2) + 'px';  // ekran koordinatı                                                                                                          
        currentBall.style.top = (boardRect.top - size - 5) + 'px';  // board'un biraz üstü 
     }else{
        currentBall.style.visibility ="hidden";
     }
})
 board.addEventListener('click', function(e){
      currentBall.style.position = '';         
      currentBall.style.left = e.offsetX + 'px';                                                                                                                                        
      currentBall.style.top = '';               
      board.appendChild(currentBall);                                                                                                                                                   
      createBall();                                                                                                                                                                     
  });
  createBall();
