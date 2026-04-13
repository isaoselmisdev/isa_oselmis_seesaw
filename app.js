const board = document.getElementById("board");    
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
let currentBall = null;             
let currentSize = 0;              
let lastX = 0;                                                                                                                                                                                                                                                                                      
function createBall() {                                                                                                                                                                              
    const boardRect = board.getBoundingClientRect();


    const ball = document.createElement("div");
    const kg = Math.floor(Math.random() * 10) + 1;    
    const size = 20 + (kg*4);                                                                                                                                
    ball.style.left = (boardRect.left + boardRect.width / 2 - size / 2) + 'px';  
    ball.className = "weight-ball";
    ball.innerText = kg + "kg";   
    ball.style.position = "fixed";                                                                                                                                                    
    ball.style.height =  size + "px"
    ball.style.width =  size + "px";
    ball.style.visibility = "hidden"
    ball.style.backgroundColor = colors[kg-1];                                                                                                            
                                                                                                                                                                                      
    currentSize = size                                                                                                                                                               
    currentBall = ball;   
    
    document.body.appendChild(ball);
  }

                                            
document.addEventListener('mousemove',function(e){
    const boardRect = board.getBoundingClientRect();
    if (e.clientX >= boardRect.left && e.clientX <= boardRect.right){
        currentBall.style.visibility = 'visible';
        lastX = e.clientX - boardRect.left; 
        console.log(currentSize, e.clientX); 
        currentBall.style.left = e.clientX + 'px';// ekran koordinatı                                                                                                          
        currentBall.style.top = (boardRect.top - currentSize - 100) + 'px';  // board'un biraz üstü 
    }else{
        currentBall.style.visibility ="hidden";
     }
})
document.addEventListener("click",function(e){
    const boardRect = board.getBoundingClientRect(); 
    if(e.clientX >=boardRect.left && e.clientX <= boardRect.right){
        currentBall.style.position = "";
        currentBall.style.left = lastX + "px"
        currentBall.style.top = "";
        board.appendChild(currentBall)
        calculateTorque() 
        createBall();
    }

})
createBall();

function calculateTorque(){
    const balls = board.querySelectorAll(".weight-ball")
    let leftTorque = 0;
    let rightTorque = 0;
    balls.forEach(function(ball){
        console.log('ball left:', ball.style.left, 'kg:', parseInt(ball.innerText));  
        const kg = parseInt(ball.innerText);
        const distance = parseFloat(ball.style.left) -200;

        if(distance < 0){
            leftTorque += kg * Math.abs(distance)
        } else{
            rightTorque += kg * distance
        }

    })
    console.log("left",leftTorque,"right",rightTorque);
}
