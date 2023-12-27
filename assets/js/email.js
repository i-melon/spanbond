document.addEventListener('DOMContentLoaded', function() {

    // LOADER LOGIC
    var xhr = new XMLHttpRequest();
    xhr.onload = function() { 
        // redirectToThanks()
    };
    xhr.onerror = function() {
        console.error('Error:', xhr.response);
        alert('Произошла какая-то ошибка. Мы обязательно ее решим! ' +
            'Просим вас связаться с нами по почте - info.estetika.agency@gmail.com.');
    };
    xhr.addEventListener("loadstart", function() {
        document.getElementById("loader").classList.add('loading');
        document.getElementById("loader-content").classList.add('loading-content');
    });
    xhr.addEventListener("loadend", function() {
        document.getElementById("loader").classList.remove('loading');
        document.getElementById("loader-content").classList.remove('loading-content');
    });


    // PHONE MASK
    IMask(
        document.getElementById('modalPhoneNumber'),
        {
        mask: '+{7} (700) 000-00-00'
        }
    )
    IMask(
        document.getElementById('fifteenMinutesPhoneNumber'),
        {
        mask: '+{7} (700) 000-00-00'
        }
    )
    IMask(
        document.getElementById('thirtyPercentPhoneNumber'),
        {
        mask: '+{7} (700) 000-00-00'
        }
    )
    IMask(
        document.getElementById('questionsPhoneNumber'),
        {
        mask: '+{7} (700) 000-00-00'
        }
    )


    // EMAIL LOGIC
    document.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents default form submit

            sendEmail(event.target)
        });
    })

    function sendEmail(formElem) {
    //     var formData = new FormData(formElem);
    //     var formDataObj = Object.fromEntries(formData)
        console.log(formElem.querySelectorAll('input[name="phone"]'))
        let nameInput = formElem.querySelectorAll('input[name="name"]')[0];
        let withName = nameInput !== undefined;
        let phoneInput = formElem.querySelectorAll('input[name="phone"]')[0];

        if (!checkPhoneNumberInputSize(phoneInput.value)) {
            alert('Неверный телефонный номер! Недостаточное количество цифр!');
            return;
        }

        let formData = {"phoneNumber": phoneInput.value};
        
        if (withName) {
            formData.name = nameInput.value;
        }

        xhr.open('POST', getMailerUrl());
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(formData));
    }

    function redirectToThanks() {
        let aLink = document.createElement('a');
        aLink.href = "./thanks.html"
        aLink.click()
    }

    function checkPhoneNumberInputSize(phoneNumber) {
        return phoneNumber.length === 18;
    }

    function getMailerUrl() {
        return (location.hostname === "localhost" || location.hostname === "127.0.0.1") ? 
                    "http://127.0.0.1:8000/mailer.php" : 
                    "https://arnau.estetika.agency/mailer.php";
    }
});