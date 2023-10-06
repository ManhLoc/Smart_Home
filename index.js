var firebaseConfig = {
    apiKey: "AIzaSyDXUrxjqRdRrb1ZFlieayfaK9dKOjiPC6A",
    authDomain: "smart-home-d4886.firebaseapp.com",
    databaseURL:
        "https://smart-home-d4886-default-rtdb.firebaseio.com",
    projectId: "smart-home-d4886",
    storageBucket: "smart-home-d4886.appspot.com",
    messagingSenderId: "231525698998",
    appId: "1:231525698998:web:5bfc6da9db3fa45b6dc517",
    measurementId: "G-12X2CZRSKP",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const database = firebase.database();

var nhietDo = document.getElementById("temp");
var doAm = document.getElementById("humid");
var khiGa = document.getElementById("gas");
var luongMua = document.getElementById("rain");

var dbRef = firebase.database().ref().child("/Sensor/Temp");
var dbRef2 = firebase.database().ref().child("/Sensor/Humid");
var dbRef3 = firebase.database().ref().child("/Sensor/Gas");
// var dbRef4 = firebase.database().ref().child("/Sensor/Rain");

dbRef.on("value", (snap) => (nhietDo.innerText = snap.val()));
dbRef2.on("value", (snap) => (doAm.innerText = snap.val()));
dbRef3.on("value", (snap) => (khiGa.innerText = snap.val()));
// dbRef4.on("value", (snap) => (luongMua.innerText = snap.val()));

database.ref("/Sensor/Rain").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var mua = snapshot.val();
        if (mua == 1)
            luongMua.innerHTML = "Có";
        else
            luongMua.innerHTML = "Ko";

    } else console.log("No data available!");
});

// Thay đổi sự kiện nút button
btnOffOne.onclick = function () {
    document.getElementById('btnOne').style.left = '0'
    document.getElementById('imgOne').src = "./assets/img/lightbulb-regular.svg"
    database.ref("/Control").update({
        Lamp: 0,
    });
}

btnOnOne.onclick = function () {
    document.getElementById('btnOne').style.left = '43px'
    document.getElementById('imgOne').src = "./assets/img/lightbulb-solid.svg"
    database.ref("/Control").update({
        Lamp: 1,
    });
}

btnOffTwo.onclick = function () {
    document.getElementById('btnTwo').style.left = '0'
    document.getElementById('imgTwo').src = "./assets/img/door-closed-solid.svg"
    database.ref("/Control").update({
        Door: 0,
    });
}

btnOnTwo.onclick = function () {
    document.getElementById('btnTwo').style.left = '43px'
    document.getElementById('imgTwo').src = "./assets/img/door-open-solid.svg"
    database.ref("/Control").update({
        Door: 1,
    });
}

btnOffThree.onclick = function () {
    document.getElementById('btnThree').style.left = '0'
    document.getElementById('imgThree').src = "./assets/img/fan-off.png"
    database.ref("/Control").update({
        Fan: 0,
    });
}

btnOnThree.onclick = function () {
    document.getElementById('btnThree').style.left = '43px'
    document.getElementById('imgThree').src = "./assets/img/fan-on.png"
    database.ref("/Control").update({
        Fan: 1,
    });
}

btnOffFour.onclick = function () {
    document.getElementById('btnFour').style.left = '0'
    document.getElementById('imgFour').src = "./assets/img/bell-off.png"
    database.ref("/Control").update({
        Buzzer: 0,
    });
}

btnOnFour.onclick = function () {
    document.getElementById('btnFour').style.left = '43px'
    document.getElementById('imgFour').src = "./assets/img/bell-on.png"
    database.ref("/Control").update({
        Buzzer: 1,
    });
}

// Tự động update hình ảnh
database.ref("/Control/Lamp").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var controlLamp = snapshot.val();
        if (controlLamp == 1) {
            document.getElementById('btnOne').style.left = '43px'
            document.getElementById('imgOne').src = "./assets/img/lightbulb-solid.svg"
        }
        else {
            document.getElementById('btnOne').style.left = '0'
            document.getElementById('imgOne').src = "./assets/img/lightbulb-regular.svg"
        }
    } else console.log("No data available!");
});

database.ref("/Control/Door").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var controlDoor = snapshot.val();
        if (controlDoor == 1) {
            document.getElementById('btnTwo').style.left = '43px'
            document.getElementById('imgTwo').src = "./assets/img/door-open-solid.svg"
        }
        else {
            document.getElementById('btnTwo').style.left = '0'
            document.getElementById('imgTwo').src = "./assets/img/door-closed-solid.svg"
        }
    } else console.log("No data available!");
});

database.ref("/Control/Fan").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var controlFan = snapshot.val();
        if (controlFan == 1) {
            document.getElementById('btnThree').style.left = '43px'
            document.getElementById('imgThree').src = "./assets/img/fan-on.png"
        }
        else {
            document.getElementById('btnThree').style.left = '0'
            document.getElementById('imgThree').src = "./assets/img/fan-off.png"
        }
    } else console.log("No data available!");
});

database.ref("/Control/Buzzer").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var controlBuzzer = snapshot.val();
        if (controlBuzzer == 1) {
            document.getElementById('btnFour').style.left = '43px'
            document.getElementById('imgFour').src = "./assets/img/bell-on.png"
        }
        else {
            document.getElementById('btnFour').style.left = '0'
            document.getElementById('imgFour').src = "./assets/img/bell-off.png"
        }
    } else console.log("No data available!");
});

//get data once
database
    .ref("/Control")
    .get()
    .then((snapshot) => {
        if (snapshot.exists()) console.log(snapshot.val());
        else console.log("No data available!");
    });

database
    .ref("/Sensor")
    .get()
    .then((snapshot) => {
        if (snapshot.exists()) console.log(snapshot.val());
        else console.log("No data available!");
    });

// Hiển thị thời gian
function sokhongconghia(value) {
    if (value < 10) {
        value = '0' + value
    }
    return value
}

function hienthithoigian() {
    const time = new Date()
    let date = sokhongconghia(time.getDate())
    let month = sokhongconghia(time.getMonth())
    let year = time.getFullYear()

    let hour = sokhongconghia(time.getHours())
    let minute = sokhongconghia(time.getMinutes())
    let second = sokhongconghia(time.getSeconds())

    document.getElementById('timeDate').innerHTML = `${date}/${month}/${year}`
    document.getElementById('timeCurrent').innerHTML = `${hour}:${minute}:${second}`

    setTimeout(hienthithoigian, 1000)
}

hienthithoigian()
