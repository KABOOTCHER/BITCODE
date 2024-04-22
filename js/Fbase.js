const firebaseConfig = {
    apiKey: "AIzaSyByQT-2MJIxRq3aOvF8Osna6C36D6BKQlw",
    authDomain: "bitcode-school.firebaseapp.com",
    databaseURL: "https://bitcode-school-default-rtdb.firebaseio.com",
    projectId: "bitcode-school",
    storageBucket: "bitcode-school.appspot.com",
    messagingSenderId: "737804952668",
    appId: "1:737804952668:web:0d318fadb04ee8fb2d3299"
  };

  firebase.initializeApp(firebaseConfig);

  var firestore = firebase.firestore();

  const db_main = firestore.collection("formUsers")
  const db_sender = firestore.collection("senderUsers")

let submitButton = document.getElementById("formSendButton")

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Получаем значения из полей
    let name = document.getElementById("nameField").value;
    let phone = document.getElementById("phoneField").value;
    let email = document.getElementById("emailField").value;

    // Проверяем, есть ли пустые поля
    if (!name || !phone || !email) {
        console.log("All fields are required!"); // Выводим сообщение в консоль
      
        return; // Прекращаем выполнение функции
    }

    // Если все поля заполнены, сохраняем данные в Firebase
    db_main.doc().set({
        name: name,
        phone: phone,
        email: email,
    })
    .then(() => {
        console.log("Data saved");
    })
    .catch((error) => {
        console.log(error);
    });
});


let emailSubmitButton = document.getElementById("emailSendButton");

emailSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Получаем значения из полей

    let email = document.getElementById("contactEmailField").value;

    // Проверяем, есть ли пустые поля
    if (!email) {
       
      
        return; // Прекращаем выполнение функции
    }

    // Если все поля заполнены, сохраняем данные в Firebase
    db_sender.doc().set({
 
        email: email
    })
    .then(() => {
        console.log("Data saved");
    })
    .catch((error) => {
        console.log(error);
    });
});
