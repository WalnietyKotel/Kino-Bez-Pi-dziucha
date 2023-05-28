/*let x = document.getElementById("login");
let y = document.getElementById("register");
let z = document.getElementById("btn");

function register(){
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}

function login(){
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}
*/

// ==================================

window.onload = function(){

    document.getElementById('contactForm').addEventListener('submit', (e) => {
  
      event.preventDefault();
      //inicjalizacja zmiennych do formularza
      let elements = document.getElementById('contactForm').elements;
      let postData = "";
      let custName = '';
      
      //Pętla, która iteruje przez wszystkie elementy formularza za pomocą elements.item(i). Sprawdza nazwę pola i jeśli jest równa 'name', przypisuje wartość do zmiennej custName. Ponadto, tworzy ciąg znaków postData, który zawiera wszystkie pola formularza
      for (let i=0; i<elements.length; i++){
        let field = elements.item(i);
        if(field.name == 'name'){
          custName = field.value;
        }
        postData += field.name + "=" + field.value + "&";
      } 
      //Zamiana wszystkich spacji w ciągu znaków postData na znak +.
      postData = postData.replace(/\s/g,'+');
      console.log(postData + " adfadsadfa");
  
      //Wywołanie funkcji fetch w celu wysłania danych formularza do pliku send_form_email.php za pomocą metody POST.
      fetch('adres_docelowy.php', {
        headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: postData,
        method: 'POST'
      })
      // Manipulowanie odpowiedzią serwera po zakończeniu żądania i wyświetlanie jej w elemencie o identyfikatorze formResponse.
      .then(function(response){ return response.text()}).then(text=>document.getElementById('formResponse').innerHTML+=text);
  
      //Resetowanie formularza do stanu początkowego.
      document.getElementById('contactForm').reset();
  
      //Wyświetlanie komunikatu "Thank you, [Imię klienta]." w elemencie o identyfikatorze formResponse.
      document.getElementById('formResponse').innerHTML = "Zalogowany jako: " + "<br>"+ custName;
  
    }, false);
  }
