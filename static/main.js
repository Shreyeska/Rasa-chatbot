/**
 * Returns the current datetime for the message creation.
 */
function getCurrentTimestamp() {
	return new Date();
}

/**
 * Renders a message on the chat screen based on the given arguments.
 * This is called from the `showUserMessage` and `showBotMessage`.
 */
function renderMessageToScreen(args) {
	// local variables
	let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
	let messagesContainer = $('.messages');

	// init element
	let message = $(`
	<li class="message ${args.message_side}">
		<div class="avatar"></div>
		<div class="text_wrapper">
			<div class="text">${args.text}</div>
			<div class="timestamp">${displayDate}</div>
		</div>
	</li>
	`);

	// add to parent
	messagesContainer.append(message);

	// animations
	setTimeout(function () {
		message.addClass('appeared');
	}, 0);
	messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

/* Sends a message when the 'Enter' key is pressed.
 */
$(document).ready(function() {
    $('#msg_input').keydown(function(e) {
        // Check for 'Enter' key
        if (e.key === 'Enter') {
            // Prevent default behaviour of enter key
            e.preventDefault();
			// Trigger send button click event
            $('#send_button').click();
        }
    });
});

/**
 * Displays the user message on the chat screen. This is the right side message.
 */
function showUserMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'right',
	});
}

/**
 * Displays the chatbot message on the chat screen. This is the left side message.
 */
function showBotMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'left',
	});
}

/**
 * Get input from user and show it on screen on button click.
 */
$('#send_button').on('click', function (e) {
    // Get user message and reset input field
    const userMessage = $('#msg_input').val().trim();
    $('#msg_input').val('');

    // Display user message
    showUserMessage(userMessage);

    // Delayed response from bot based on user input
    setTimeout(function () {
        handleUserInput(userMessage);
    }, 300);
});

function handleUserInput(userMessage) {
    // Convert user message to lowercase for easier comparison
    const lowercaseMessage = userMessage.toLowerCase();

    // Bot responses based on user input
    switch (lowercaseMessage) {
        case 'hi':
            showBotMessage("Namaste. How can I help you today?");
            break;
        case 'my husband wants me to get an abortion. i don’t want to.':
            showBotMessage(`I am sorry to hear that. The Right to Safe Motherhood and Reproductive Health Act, 2075 (2018) protects Nepali Women against forced abortions. Chapter 4, Subsection 16 of the act declares that no one shall get the abortion conducted by coercing a pregnant woman, threatening, enticing or tempting her. As per the The National Penal (Code) Act, 2017 person who commits this offense referred shall be liable to: A sentence of imprisonment for a term not exceeding one year and a fine not exceeding ten thousand rupees in the case of pregnancy of up to twelve weeks, A sentence of imprisonment for a term not exceeding three years and a fine not exceeding thirty thousand rupees in the case of pregnancy of more than twelve weeks and up to twenty-five weeks, A sentence of imprisonment for a term not exceeding five years and a fine not exceeding fifty thousand rupees in the case of pregnancy of more than twenty-five weeks. In such circumstances, it's crucial to take action. You have the right to file a complaint with the authorities.`);
            break;
        case 'is there a time limit to file a complaint?':
            showBotMessage(`Yes, you must file a complaint within six months of gaining knowledge of the offense. Otherwise, you may lose the opportunity to pursue legal action.`);
            break;
        case 'my fetus is a girl. my husband doesn’t want a daughter.':
            showBotMessage(`I'm sorry you're facing such a difficult situation. What you have mentioned is also a criminal offense under the Right to Safe Motherhood and Reproductive Health Act. According to it: No one shall commit or cause to be committed an act to identify the sex of the fetus in the womb. A pregnant woman shall not be pressurized or compelled or intimidated or coerced or enticed or entrapped in undue influence to identify the sex of the fetus. I recommend that you seek legal advice and support to navigate this process effectively. Remember, you are not alone, and there are people and resources available to help you through this challenging time.`);
            break;
        case 'my fetus is a girl. my husband doesn’t want a daughter.':
            showBotMessage(`I'm truly sorry to hear that. It is important for you to know that the Domestic Violence (Offence and Punishment) Act, 2066 (2009) provides protection against domestic violence. It is explicitly stated in Chapter 3 , Subsection 1 that no one shall commit; or aid or abet; or incite the act of domestic violence. Domestic violence is a serious crime, and you have the right to protection and support.`);
            break;
        case 'how to file a complaint?':
            showBotMessage(`Chapter 4 of the act details the complaint registration process for domestic violence cases. According to it, you have to do the following: You can lodge a written or oral complaint with either the Police Office, National Women Commission, or Local Body. If the complaint is filed with the National Women Commission, necessary action will be taken in accordance with prevailing National Women Commission law. If the complaint is filed with the Police Office or Local Body, the perpetrator must be produced within 24 hours of the complaint. If the perpetrator refuses to appear for a statement, arrest may be made. Within thirty days of registration of the complaint, reconciliation between the parties may be conducted if the victim desires and if it is found appropriate by the police officer or local body. The presence of the perpetrator must be ensured during the investigation, prosecution, and decision-making process of the complaint. If the perpetrator fails to appear, reconciliation fails, or if the parties cannot settle their dispute, the complaint, along with evidence and legal documents, shall be forwarded to the court within fifteen days after the expiration of the reconciliation period.`);
            break;
        case 'what rights do i have during the process as a victim?':
            showBotMessage(`As per the act you have the following rights: If you have been physically wounded or mentally tortured, you should be immediately sent to the nearest hospital or health post for a check-up. An injury report shall be drawn up, and a copy sent to the Police Station if prepared by the Local Body.`);
            break;
        case 'are there any additional resources i could use?':
            showBotMessage(`Yes. You can find information on and links to emergency contacts, relevant legal services, women centric social organizations and other support services on the Resources section of this website.`);
            break;
        case 'thank you':
            showBotMessage(`You're welcome. Remember, you're not alone in this. If you ever need further assistance or support, don't hesitate to reach out. Take care of yourself, and stay safe.`);
            break;
        default:
            showBotMessage(`I'm sorry, I didn't understand that. Could you please rephrase or ask another question?`);
            break;
    }
}










/**
 * Returns a random string. Just to specify bot message to the user.
 */
function randomstring(length = 20) {
	let output = '';

	// magic function
	var randomchar = function () {
		var n = Math.floor(Math.random() * 62);
		if (n < 10) return n;
		if (n < 36) return String.fromCharCode(n + 55);
		return String.fromCharCode(n + 61);
	};

	while (output.length < length) output += randomchar();
	return output;
}

/**
 * Initial bot message to the screen for the user.
 */
$(window).on('load', function () {
	showBotMessage(' Hello there! How can I be of service? I really want to help you. I have been looking forward to helping you.');
});


// SLIDING AD
let index = 0;
const adContainer = document.querySelector('.ad-container');
const ads = document.querySelectorAll('.ad-container img');
const totalAds = ads.length;

function nextSlide() {
  index = (index + 1) % totalAds;
  updateSlide();
}

function prevSlide() {
  index = (index - 1 + totalAds) % totalAds;
  updateSlide();
}

function updateSlide() {
  const offset = -index * 100;
  adContainer.style.transform = `translateX(${offset}%)`;
}

// Automatic slide every 7 seconds
setInterval(nextSlide, 3000);

// SLIDING AD

