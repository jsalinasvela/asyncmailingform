class Form {

    constructor(form){
        this.form = form;
    }

    static validateEmail(email){
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(String(email.value).toLowerCase());
    }

    events(){

        this.form.addEventListener('submit', function (e){
            e.preventDefault();
            this.email = document.getElementById('email');

            if(Form.validateEmail(this.email)){

                Form.status('Sending email...', true);

                fetch('https://api.staging.fourthwall.com/api/mailing-list',{
                    method: 'POST',
                    body: JSON.stringify({email:this.email.value}),
                    headers:{
                      'Content-Type': 'application/json'
                    }
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(json) {
                    let message;

                    if(json.id){
                        message = "You joined our mailing list successfully!";
                    } else {
                        message = json.title;
                    }

                    Form.status(message, true);
                })
                .catch(function(error) {
                    Form.status(error.message, false);
                });

            } else {
                Form.status('Email is invalid. Please try again.', false);
            }
    
            return false;
        });

    }

    static status(message, disabled){
        let span = document.querySelector("#form-mailing .message");
        span.innerText = message;

        if(disabled){
            document.getElementById('email').disabled = true;
            document.getElementById('submit').disabled = true;
        }
    }

    init(){
        this.events();
    }

}

const form = new Form(document.getElementById("form-mailing"));
form.init();