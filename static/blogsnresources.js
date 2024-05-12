// function showCard(cardNumber) {
//     // Hide all cards
//     var cards = document.querySelectorAll('.card');
//     cards.forEach(function(card) {
//       card.classList.remove('active');
//     });
    
//     // Show the selected card
//     var selectedCard = document.getElementById('card' + cardNumber);
//     selectedCard.classList.add('active');
//   }
  

$(document).ready(function() {
	$("#btn1").click(function() {
	  $(".card").hide(); // Hide all cards
	  $("#card1").show(); // Show card 1
	});
  
	$("#btn2").click(function() {
	  $(".card").hide(); // Hide all cards
	  $("#card2").show(); // Show card 2
	});
  
	$("#btn3").click(function() {
	  $(".card").hide(); // Hide all cards
	  $("#card3").show(); // Show card 3
	});
  });